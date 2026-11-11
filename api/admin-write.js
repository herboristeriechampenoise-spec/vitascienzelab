// api/admin-write.js
// Server-side endpoint for admin reads/writes and Supabase Storage signed URLs requiring service role key (bypasses RLS)
// The service key stays server-side — never exposed in the browser bundle

import crypto from 'crypto';

let bucketInitialized = false;

async function ensureStorageBucket(SUPABASE_URL, SERVICE_KEY, bucketName = 'client-documents') {
  if (bucketInitialized) return;
  const headers = {
    apikey: SERVICE_KEY,
    Authorization: 'Bearer ' + SERVICE_KEY,
    'Content-Type': 'application/json'
  };
  try {
    const checkRes = await fetch(`${SUPABASE_URL}/storage/v1/bucket/${bucketName}`, {
      method: 'GET',
      headers
    });
    if (!checkRes.ok) {
      await fetch(`${SUPABASE_URL}/storage/v1/bucket`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          id: bucketName,
          name: bucketName,
          public: true,
          file_size_limit: 52428800 // 50 MB
        })
      });
    } else {
      await fetch(`${SUPABASE_URL}/storage/v1/bucket/${bucketName}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify({
          id: bucketName,
          name: bucketName,
          public: true,
          file_size_limit: 52428800 // 50 MB
        })
      });
    }
    bucketInitialized = true;
  } catch (e) {
    console.error('ensureStorageBucket warning:', e);
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const origin = String(req.headers.origin || req.headers.referer || '');
  if (origin && !origin.includes('vitascienzelab') && !origin.includes('localhost') && !origin.includes('127.0.0.1')) {
    return res.status(403).json({ error: 'Forbidden origin' });
  }

  const SERVICE_KEY = process.env.VITE_SUPABASE_SERVICE_ROLE || process.env.SUPABASE_SERVICE_ROLE;
  const SUPABASE_URL = process.env.VITE_SUPABASE_URL || 'https://zbavzvcnmlwbsepfsnbi.supabase.co';

  if (!SERVICE_KEY) {
    console.error('admin-write: VITE_SUPABASE_SERVICE_ROLE not configured');
    return res.status(500).json({ error: 'Service key not configured on server' });
  }

  let body;
  try {
    body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
  } catch (e) {
    return res.status(400).json({ error: 'Invalid JSON body' });
  }

  const { operation, table, id, data, query } = body || {};

  if (!operation) {
    return res.status(400).json({ error: 'Missing required field: operation' });
  }

  const svcHeaders = {
    apikey: SERVICE_KEY,
    Authorization: 'Bearer ' + SERVICE_KEY,
    'Content-Type': 'application/json',
    Prefer: 'return=minimal'
  };

  try {
    // 1. Create a signed upload URL for direct browser-to-Supabase Storage uploads (supports up to 30MB+ without Vercel 4.5MB limit)
    if (operation === 'create_upload_url') {
      const bucketName = 'client-documents';
      await ensureStorageBucket(SUPABASE_URL, SERVICE_KEY, bucketName);

      const rawName = String(body.fileName || 'document').replace(/[^a-zA-Z0-9._-]/g, '_');
      const folder = String(body.patientId || 'shared').replace(/[^a-zA-Z0-9_-]/g, '_');
      const storagePath = `${folder}/${Date.now()}_${Math.random().toString(36).slice(2, 7)}_${rawName}`;

      const signRes = await fetch(`${SUPABASE_URL}/storage/v1/object/upload/sign/${bucketName}/${storagePath}`, {
        method: 'POST',
        headers: {
          apikey: SERVICE_KEY,
          Authorization: 'Bearer ' + SERVICE_KEY,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({})
      });

      if (!signRes.ok) {
        const errText = await signRes.text();
        console.error('create_upload_url failed:', signRes.status, errText);
        return res.status(signRes.status).json({ error: errText });
      }

      const signData = await signRes.json();
      const signedUrl = `${SUPABASE_URL}/storage/v1${signData.url}`;
      const publicUrl = `${SUPABASE_URL}/storage/v1/object/public/${bucketName}/${storagePath}`;

      return res.status(200).json({
        ok: true,
        signedUrl,
        publicUrl,
        storagePath,
        token: signData.token
      });
    }

    // 2. Append or update files in profiles.client_files server-side (avoids re-uploading existing large client_files from client)
    if (operation === 'append_client_files') {
      const { patientId, newFiles = [], replaceByName = false, notePrefix = '' } = body;
      if (!patientId) return res.status(400).json({ error: 'Missing patientId' });

      const profRes = await fetch(`${SUPABASE_URL}/rest/v1/profiles?id=eq.${encodeURIComponent(patientId)}&select=id,client_files`, {
        method: 'GET',
        headers: {
          apikey: SERVICE_KEY,
          Authorization: 'Bearer ' + SERVICE_KEY
        }
      });

      let currentFiles = [];
      if (profRes.ok) {
        const rows = await profRes.json();
        if (Array.isArray(rows) && rows[0] && Array.isArray(rows[0].client_files)) {
          currentFiles = rows[0].client_files;
        }
      }

      const newNamesLower = new Set(newFiles.map(nf => String(nf?.name || '').trim().toLowerCase()).filter(Boolean));
      const updatedFiles = [
        ...currentFiles.filter(f => f && !newNamesLower.has(String(f.name || '').trim().toLowerCase())),
        ...newFiles
      ];

      const patchRes = await fetch(`${SUPABASE_URL}/rest/v1/profiles?id=eq.${encodeURIComponent(patientId)}`, {
        method: 'PATCH',
        headers: svcHeaders,
        body: JSON.stringify({ client_files: updatedFiles })
      });

      if (!patchRes.ok) {
        const errText = await patchRes.text();
        console.error('append_client_files patch failed:', errText);
        return res.status(patchRes.status).json({ error: errText });
      }

      return res.status(200).json({ ok: true, client_files: updatedFiles });
    }

    // 3. Fast atomic file deletion across profiles.client_files, admin_notes, and Supabase Storage
    if (operation === 'delete_client_file') {
      const { patientId, fileName, noteId, storagePath } = body;
      if (!patientId || !fileName) {
        return res.status(400).json({ error: 'Missing patientId or fileName' });
      }

      const targetNameLower = String(fileName).trim().toLowerCase();
      let pathsToDelete = storagePath ? [storagePath] : [];

      const [profRes, notesRes] = await Promise.all([
        fetch(`${SUPABASE_URL}/rest/v1/profiles?id=eq.${encodeURIComponent(patientId)}&select=id,client_files`, {
          headers: { apikey: SERVICE_KEY, Authorization: 'Bearer ' + SERVICE_KEY }
        }),
        fetch(`${SUPABASE_URL}/rest/v1/admin_notes?patient_id=eq.${encodeURIComponent(patientId)}&select=id,note`, {
          headers: { apikey: SERVICE_KEY, Authorization: 'Bearer ' + SERVICE_KEY }
        })
      ]);

      const tasks = [];

      if (profRes.ok) {
        const rows = await profRes.json();
        if (Array.isArray(rows) && rows[0] && Array.isArray(rows[0].client_files)) {
          const currentFiles = rows[0].client_files;
          currentFiles.forEach(f => {
            if (f && String(f.name || '').trim().toLowerCase() === targetNameLower) {
              if (f.storage_path) pathsToDelete.push(f.storage_path);
              else if (typeof f.data === 'string' && f.data.includes('/client-documents/')) {
                const p = f.data.split('/client-documents/')[1]?.split('?')[0];
                if (p) pathsToDelete.push(p);
              }
            }
          });
          const remaining = currentFiles.filter(f => !f || String(f.name || '').trim().toLowerCase() !== targetNameLower);
          tasks.push(
            fetch(`${SUPABASE_URL}/rest/v1/profiles?id=eq.${encodeURIComponent(patientId)}`, {
              method: 'PATCH',
              headers: svcHeaders,
              body: JSON.stringify({ client_files: remaining })
            })
          );
        }
      }

      if (notesRes.ok) {
        const notes = await notesRes.json();
        if (Array.isArray(notes)) {
          const noteIdsToDelete = new Set();
          if (noteId) noteIdsToDelete.add(noteId);
          notes.forEach(n => {
            if (!n || !n.note || !n.note.includes('FICHIER')) return;
            try {
              const sIdx = n.note.indexOf('{');
              const eIdx = n.note.lastIndexOf('}');
              if (sIdx !== -1 && eIdx !== -1) {
                const obj = JSON.parse(n.note.substring(sIdx, eIdx + 1));
                if (obj && String(obj.name || '').trim().toLowerCase() === targetNameLower) {
                  noteIdsToDelete.add(n.id);
                  if (obj.storage_path) pathsToDelete.push(obj.storage_path);
                }
              }
            } catch (_) {}
          });
          for (const nid of noteIdsToDelete) {
            tasks.push(
              fetch(`${SUPABASE_URL}/rest/v1/admin_notes?id=eq.${encodeURIComponent(nid)}`, {
                method: 'DELETE',
                headers: svcHeaders
              })
            );
          }
        }
      }

      const uniquePaths = [...new Set(pathsToDelete.filter(Boolean))];
      for (const sp of uniquePaths) {
        tasks.push(
          fetch(`${SUPABASE_URL}/storage/v1/object/client-documents/${sp}`, {
            method: 'DELETE',
            headers: { apikey: SERVICE_KEY, Authorization: 'Bearer ' + SERVICE_KEY }
          }).catch(() => {})
        );
      }

      await Promise.all(tasks);
      return res.status(200).json({ ok: true });
    }

    // 4. Delete patient completely using service key
    if (operation === 'delete_patient') {
      const { patientId, email } = body;
      const tasks = [];
      if (email) {
        tasks.push(fetch(`${SUPABASE_URL}/rest/v1/appointments?patient_email=eq.${encodeURIComponent(email)}`, { method: 'DELETE', headers: svcHeaders }));
        tasks.push(fetch(`${SUPABASE_URL}/rest/v1/questionnaires?patient_email=eq.${encodeURIComponent(email)}`, { method: 'DELETE', headers: svcHeaders }));
      }
      if (patientId) {
        tasks.push(fetch(`${SUPABASE_URL}/rest/v1/admin_notes?patient_id=eq.${encodeURIComponent(patientId)}`, { method: 'DELETE', headers: svcHeaders }));
        if (!patientId.includes('@')) {
          tasks.push(fetch(`${SUPABASE_URL}/rest/v1/profiles?id=eq.${encodeURIComponent(patientId)}`, { method: 'DELETE', headers: svcHeaders }));
        }
      }
      if (email && (!patientId || patientId.includes('@'))) {
        tasks.push(fetch(`${SUPABASE_URL}/rest/v1/profiles?email=eq.${encodeURIComponent(email)}`, { method: 'DELETE', headers: svcHeaders }));
      }
      await Promise.all(tasks);
      return res.status(200).json({ ok: true });
    }

    // 5. Register or update client auth account (seamless signup / password reset & appointment linking)
    if (operation === 'register_or_update_client') {
      const cleanEmail = String(body.email || '').trim().toLowerCase();
      const password = String(body.password || '');
      const meta = body.meta || {};
      if (!cleanEmail || password.length < 6) {
        return res.status(400).json({ error: 'Email valide et mot de passe (6 caractères min.) requis.' });
      }

      const authHeaders = {
        apikey: SERVICE_KEY,
        Authorization: 'Bearer ' + SERVICE_KEY,
        'Content-Type': 'application/json'
      };

      // Check if user already exists in Supabase Auth
      const listRes = await fetch(`${SUPABASE_URL}/auth/v1/admin/users?per_page=1000`, { headers: authHeaders });
      const listData = listRes.ok ? await listRes.json() : { users: [] };
      const existingUser = (listData.users || []).find(u => String(u.email || '').trim().toLowerCase() === cleanEmail);

      // Also check existing profile by email
      const profCheckRes = await fetch(`${SUPABASE_URL}/rest/v1/profiles?email=ilike.${encodeURIComponent(cleanEmail)}&select=id,email,prenom,nom,tel,dob`, {
        headers: authHeaders
      });
      const existingProfs = profCheckRes.ok ? await profCheckRes.json() : [];
      const existingProf = Array.isArray(existingProfs) && existingProfs[0] ? existingProfs[0] : null;

      const mergedMeta = {
        ...(existingUser?.user_metadata || {}),
        email: cleanEmail,
        email_verified: true,
        prenom: meta.prenom || existingUser?.user_metadata?.prenom || existingProf?.prenom || '',
        nom: meta.nom || existingUser?.user_metadata?.nom || existingProf?.nom || '',
        tel: meta.tel || existingUser?.user_metadata?.tel || existingProf?.tel || '',
        ...(meta.dob || existingUser?.user_metadata?.dob || existingProf?.dob ? { dob: meta.dob || existingUser?.user_metadata?.dob || existingProf?.dob } : {})
      };

      let userId = existingUser?.id || null;

      if (existingUser) {
        const updRes = await fetch(`${SUPABASE_URL}/auth/v1/admin/users/${existingUser.id}`, {
          method: 'PUT',
          headers: authHeaders,
          body: JSON.stringify({
            password,
            email_confirm: true,
            user_metadata: mergedMeta
          })
        });
        if (!updRes.ok) {
          const errText = await updRes.text();
          return res.status(updRes.status).json({ error: errText });
        }
      } else {
        const createPayload = {
          email: cleanEmail,
          password,
          email_confirm: true,
          user_metadata: mergedMeta
        };
        if (existingProf?.id && !existingProf.id.includes('@')) {
          createPayload.id = existingProf.id;
        }
        const createRes = await fetch(`${SUPABASE_URL}/auth/v1/admin/users`, {
          method: 'POST',
          headers: authHeaders,
          body: JSON.stringify(createPayload)
        });
        if (!createRes.ok) {
          const errText = await createRes.text();
          return res.status(createRes.status).json({ error: errText });
        }
        const createdUser = await createRes.json();
        userId = createdUser.id;
      }

      if (userId) {
        // Ensure profile exists and is linked
        if (!existingProf) {
          await fetch(`${SUPABASE_URL}/rest/v1/profiles`, {
            method: 'POST',
            headers: { ...svcHeaders, Prefer: 'resolution=merge-duplicates,return=minimal' },
            body: JSON.stringify({
              id: userId,
              email: cleanEmail,
              prenom: mergedMeta.prenom || '',
              nom: mergedMeta.nom || '',
              tel: mergedMeta.tel || '',
              dob: mergedMeta.dob || null,
              created_at: new Date().toISOString()
            })
          }).catch(() => {});
        } else {
          await fetch(`${SUPABASE_URL}/rest/v1/profiles?id=eq.${encodeURIComponent(existingProf.id)}`, {
            method: 'PATCH',
            headers: svcHeaders,
            body: JSON.stringify({
              prenom: mergedMeta.prenom || existingProf.prenom || '',
              nom: mergedMeta.nom || existingProf.nom || '',
              tel: mergedMeta.tel || existingProf.tel || ''
            })
          }).catch(() => {});
        }

        // Link all existing appointments with this email to this userId
        await fetch(`${SUPABASE_URL}/rest/v1/appointments?patient_email=ilike.${encodeURIComponent(cleanEmail)}`, {
          method: 'PATCH',
          headers: svcHeaders,
          body: JSON.stringify({ patient_id: userId })
        }).catch(() => {});
      }

      return res.status(200).json({
        ok: true,
        userId,
        email: cleanEmail,
        prenom: mergedMeta.prenom || '',
        nom: mergedMeta.nom || '',
        tel: mergedMeta.tel || ''
      });
    }

    const ALLOWED_TABLES = ['appointments', 'profiles', 'admin_notes', 'questionnaires', 'blocked_slots'];
    if (!table || !ALLOWED_TABLES.includes(table)) {
      return res.status(400).json({ error: 'Invalid or missing table' });
    }

    if (operation === 'get') {
      const qStr = query || 'select=*';
      const r = await fetch(SUPABASE_URL + '/rest/v1/' + table + '?' + qStr, {
        method: 'GET',
        headers: {
          apikey: SERVICE_KEY,
          Authorization: 'Bearer ' + SERVICE_KEY
        }
      });
      if (!r.ok) {
        const errText = await r.text();
        console.error('admin-write get failed ' + r.status + ':', errText);
        return res.status(r.status).json({ error: errText });
      }
      const json = await r.json();
      return res.status(200).json(json);
    }

    if (operation === 'post') {
      const payloadData = { ...(data || {}) };
      const checkConflict = payloadData._check_conflict === true;
      delete payloadData._check_conflict;

      if (table === 'appointments') {
        // 1. Atomic slot availability check when requested by online booking
        if (checkConflict && payloadData.rdv_date && payloadData.slot) {
          const [existingApptsRes, blockedRes] = await Promise.all([
            fetch(`${SUPABASE_URL}/rest/v1/appointments?rdv_date=eq.${encodeURIComponent(payloadData.rdv_date)}&slot=eq.${encodeURIComponent(payloadData.slot)}&status=eq.confirmed&select=id`, {
              headers: { apikey: SERVICE_KEY, Authorization: 'Bearer ' + SERVICE_KEY }
            }),
            fetch(`${SUPABASE_URL}/rest/v1/blocked_slots?blocked_date=eq.${encodeURIComponent(payloadData.rdv_date)}&select=id,slot`, {
              headers: { apikey: SERVICE_KEY, Authorization: 'Bearer ' + SERVICE_KEY }
            })
          ]);
          const existingAppts = existingApptsRes.ok ? await existingApptsRes.json() : [];
          const blockedSlots = blockedRes.ok ? await blockedRes.json() : [];
          const isSlotBlocked = Array.isArray(blockedSlots) && blockedSlots.some(b => !b.slot || b.slot === '' || b.slot === payloadData.slot);
          if ((Array.isArray(existingAppts) && existingAppts.length > 0) || isSlotBlocked) {
            return res.status(409).json({ error: 'Ce créneau vient d\'être réservé ou rendu indisponible. Veuillez choisir un autre horaire.' });
          }
        }

        // 2. Automatic profile linking / creation for every new appointment with a valid email
        const cleanEmail = String(payloadData.patient_email || '').trim().toLowerCase();
        if (cleanEmail && cleanEmail.includes('@') && cleanEmail !== '—') {
          payloadData.patient_email = cleanEmail;
          if (!payloadData.patient_id || String(payloadData.patient_id).includes('@')) {
            try {
              const profRes = await fetch(`${SUPABASE_URL}/rest/v1/profiles?email=ilike.${encodeURIComponent(cleanEmail)}&select=id`, {
                headers: { apikey: SERVICE_KEY, Authorization: 'Bearer ' + SERVICE_KEY }
              });
              const profRows = profRes.ok ? await profRes.json() : [];
              if (Array.isArray(profRows) && profRows[0]?.id) {
                payloadData.patient_id = profRows[0].id;
              } else {
                const newProfId = crypto.randomUUID();
                const nameParts = String(payloadData.patient_name || '').trim().split(/\s+/);
                const prenom = nameParts[0] || '';
                const nom = nameParts.slice(1).join(' ') || '';
                const createProfRes = await fetch(`${SUPABASE_URL}/rest/v1/profiles`, {
                  method: 'POST',
                  headers: { ...svcHeaders, Prefer: 'resolution=merge-duplicates,return=minimal' },
                  body: JSON.stringify({
                    id: newProfId,
                    email: cleanEmail,
                    prenom,
                    nom,
                    tel: payloadData.patient_tel && payloadData.patient_tel !== '—' ? payloadData.patient_tel : '',
                    created_at: new Date().toISOString()
                  })
                });
                if (createProfRes.ok) {
                  payloadData.patient_id = newProfId;
                }
              }
            } catch (linkErr) {
              console.error('Auto-link profile warning:', linkErr);
            }
          }
        }
      }

      const r = await fetch(SUPABASE_URL + '/rest/v1/' + table, {
        method: 'POST',
        headers: { ...svcHeaders, Prefer: 'return=representation' },
        body: JSON.stringify(payloadData)
      });
      if (!r.ok) {
        const errText = await r.text();
        console.error('admin-write post failed ' + r.status + ':', errText);
        return res.status(r.status).json({ error: errText });
      }
      const json = await r.json().catch(() => ({ ok: true }));
      return res.status(200).json(json);
    }

    if (operation === 'patch') {
      if (!id) return res.status(400).json({ error: 'Missing id for patch' });
      const payloadData = { ...(data || {}) };
      const checkConflict = payloadData._check_conflict === true;
      delete payloadData._check_conflict;

      if (table === 'appointments' && checkConflict && payloadData.rdv_date && payloadData.slot) {
        const [existingApptsRes, blockedRes] = await Promise.all([
          fetch(`${SUPABASE_URL}/rest/v1/appointments?rdv_date=eq.${encodeURIComponent(payloadData.rdv_date)}&slot=eq.${encodeURIComponent(payloadData.slot)}&status=eq.confirmed&id=neq.${encodeURIComponent(id)}&select=id`, {
            headers: { apikey: SERVICE_KEY, Authorization: 'Bearer ' + SERVICE_KEY }
          }),
          fetch(`${SUPABASE_URL}/rest/v1/blocked_slots?blocked_date=eq.${encodeURIComponent(payloadData.rdv_date)}&select=id,slot`, {
            headers: { apikey: SERVICE_KEY, Authorization: 'Bearer ' + SERVICE_KEY }
          })
        ]);
        const existingAppts = existingApptsRes.ok ? await existingApptsRes.json() : [];
        const blockedSlots = blockedRes.ok ? await blockedRes.json() : [];
        const isSlotBlocked = Array.isArray(blockedSlots) && blockedSlots.some(b => !b.slot || b.slot === '' || b.slot === payloadData.slot);
        if ((Array.isArray(existingAppts) && existingAppts.length > 0) || isSlotBlocked) {
          return res.status(409).json({ error: 'Ce créneau est déjà occupé ou indisponible. Veuillez choisir un autre horaire.' });
        }
      }

      const r = await fetch(SUPABASE_URL + '/rest/v1/' + table + '?id=eq.' + encodeURIComponent(id), {
        method: 'PATCH',
        headers: svcHeaders,
        body: JSON.stringify(payloadData)
      });
      if (!r.ok) {
        const errText = await r.text();
        console.error('admin-write patch failed ' + r.status + ':', errText);
        return res.status(r.status).json({ error: errText });
      }
      return res.status(200).json({ ok: true });
    }

    if (operation === 'delete') {
      if (!id) return res.status(400).json({ error: 'Missing id for delete' });
      const r = await fetch(SUPABASE_URL + '/rest/v1/' + table + '?id=eq.' + encodeURIComponent(id), {
        method: 'DELETE',
        headers: svcHeaders
      });
      if (!r.ok) {
        const errText = await r.text();
        console.error('admin-write delete failed ' + r.status + ':', errText);
        return res.status(r.status).json({ error: errText });
      }
      return res.status(200).json({ ok: true });
    }

    return res.status(400).json({ error: 'Unknown operation.' });

  } catch (err) {
    console.error('admin-write error:', err);
    return res.status(500).json({ error: err.message });
  }
}
