// api/admin-write.js
// Server-side endpoint for admin reads/writes requiring service role key (bypasses RLS)
// The service key stays server-side — never exposed in the browser bundle

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

  if (!operation || !table) {
    return res.status(400).json({ error: 'Missing required fields: operation, table' });
  }

  const svcHeaders = {
    apikey: SERVICE_KEY,
    Authorization: 'Bearer ' + SERVICE_KEY,
    'Content-Type': 'application/json',
    Prefer: 'return=minimal'
  };

  try {
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

    if (operation === 'patch') {
      if (!id) return res.status(400).json({ error: 'Missing id for patch' });
      const r = await fetch(SUPABASE_URL + '/rest/v1/' + table + '?id=eq.' + id, {
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
      const r = await fetch(SUPABASE_URL + '/rest/v1/' + table + '?id=eq.' + id, {
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

    return res.status(400).json({ error: 'Unknown operation. Use: get, patch, delete' });

  } catch (err) {
    console.error('admin-write error:', err);
    return res.status(500).json({ error: err.message });
  }
}
