// api/submit-questionnaire.js
// Serverless endpoint to submit questionnaire responses using service role key (bypasses RLS)

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const SERVICE_KEY = process.env.VITE_SUPABASE_SERVICE_ROLE || process.env.SUPABASE_SERVICE_ROLE;
  const SUPABASE_URL = process.env.VITE_SUPABASE_URL || 'https://zbavzvcnmlwbsepfsnbi.supabase.co';

  if (!SERVICE_KEY) {
    return res.status(500).json({ error: 'Server configuration missing' });
  }

  let body;
  try {
    body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
  } catch (e) {
    return res.status(400).json({ error: 'Invalid JSON body' });
  }

  const { appointment_id, patient_id, patient_email, responses } = body || {};

  if (!appointment_id) {
    return res.status(400).json({ error: 'Missing appointment_id' });
  }

  try {
    const r = await fetch(SUPABASE_URL + '/rest/v1/questionnaires', {
      method: 'POST',
      headers: {
        apikey: SERVICE_KEY,
        Authorization: 'Bearer ' + SERVICE_KEY,
        'Content-Type': 'application/json',
        Prefer: 'return=representation'
      },
      body: JSON.stringify({
        appointment_id: appointment_id,
        patient_id: patient_id || null,
        patient_email: patient_email || '',
        responses: responses || {},
        created_at: new Date().toISOString()
      })
    });

    if (!r.ok) {
      const err = await r.text();
      console.error('Failed to submit questionnaire:', err);
      return res.status(r.status).json({ error: err });
    }

    const data = await r.json();
    return res.status(200).json({ success: true, questionnaire: data[0] });

  } catch (err) {
    console.error('submit-questionnaire error:', err);
    return res.status(500).json({ error: err.message });
  }
}
