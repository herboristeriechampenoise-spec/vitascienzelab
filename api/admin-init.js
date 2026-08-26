// api/admin-init.js
// Server-side endpoint to fetch initial admin data in a single parallel call with service role key (bypasses RLS & avoids multiple round-trips)

export default async function handler(req, res) {
  if (req.method !== 'POST' && req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const SERVICE_KEY = process.env.VITE_SUPABASE_SERVICE_ROLE || process.env.SUPABASE_SERVICE_ROLE;
  const SUPABASE_URL = process.env.VITE_SUPABASE_URL || 'https://zbavzvcnmlwbsepfsnbi.supabase.co';

  if (!SERVICE_KEY) {
    console.error('admin-init: VITE_SUPABASE_SERVICE_ROLE not configured');
    return res.status(500).json({ error: 'Service key missing on server' });
  }

  const headers = {
    apikey: SERVICE_KEY,
    Authorization: 'Bearer ' + SERVICE_KEY,
    'Content-Type': 'application/json'
  };

  try {
    const [apptsRes, profsRes, blockedRes] = await Promise.all([
      fetch(`${SUPABASE_URL}/rest/v1/appointments?status=neq.archived&order=rdv_date.asc`, { headers }),
      fetch(`${SUPABASE_URL}/rest/v1/profiles?select=*&order=created_at.desc`, { headers }),
      fetch(`${SUPABASE_URL}/rest/v1/blocked_slots?order=blocked_date.asc`, { headers })
    ]);

    if (!apptsRes.ok || !profsRes.ok || !blockedRes.ok) {
      console.error('admin-init query error:', apptsRes.status, profsRes.status, blockedRes.status);
    }

    const appointments = apptsRes.ok ? await apptsRes.json() : [];
    const profiles = profsRes.ok ? await profsRes.json() : [];
    const blockedSlots = blockedRes.ok ? await blockedRes.json() : [];

    return res.status(200).json({
      appointments: Array.isArray(appointments) ? appointments : [],
      profiles: Array.isArray(profiles) ? profiles : [],
      blockedSlots: Array.isArray(blockedSlots) ? blockedSlots : []
    });

  } catch (err) {
    console.error('admin-init error:', err);
    return res.status(500).json({ error: err.message });
  }
}
