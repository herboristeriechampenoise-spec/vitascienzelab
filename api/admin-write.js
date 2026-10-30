// api/admin-write.js
// Server-side endpoint for admin reads/writes and Supabase Storage signed URLs requiring service role key (bypasses RLS)
// The service key stays server-side — never exposed in the browser bundle

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

      let updatedFiles;
      if (replaceByName) {
        updatedFiles = [...currentFiles];
        for (const nf of newFiles) {
          const idx = updatedFiles.findIndex(f => f && f.name === nf.name);
          if (idx !== -1) updatedFiles[idx] = nf;
          else updatedFiles.push(nf);
        }
      } else {
        updatedFiles = [...currentFiles, ...newFiles];
      }

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

      if (notePrefix && newFiles.length > 0) {
        await Promise.all(newFiles.map(fileObj =>
          fetch(`${SUPABASE_URL}/rest/v1/admin_notes`, {
            method: 'POST',
            headers: svcHeaders,
            body: JSON.stringify({
              patient_id: patientId,
              note: `${notePrefix}${JSON.stringify(fileObj)}`,
              created_at: new Date().toISOString()
            })
          }).catch(() => {})
        ));
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

    if (!table) {
      return res.status(400).json({ error: 'Missing required field: table' });
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
      const r = await fetch(SUPABASE_URL + '/rest/v1/' + table, {
        method: 'POST',
        headers: { ...svcHeaders, Prefer: 'return=representation' },
        body: JSON.stringify(data)
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
      const r = await fetch(SUPABASE_URL + '/rest/v1/' + table + '?id=eq.' + encodeURIComponent(id), {
        method: 'PATCH',
        headers: svcHeaders,
        body: JSON.stringify(data)
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
