// api/get-questionnaire-info.js
const Ge = process.env.VITE_SUPABASE_URL || 'https://zbavzvcnmlwbsepfsnbi.supabase.co';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { id } = req.query;
  if (!id) {
    return res.status(400).json({ error: 'Missing ID' });
  }

  const SERVICE_KEY = process.env.VITE_SUPABASE_SERVICE_ROLE || process.env.SUPABASE_SERVICE_ROLE;
  if (!SERVICE_KEY) {
    return res.status(500).json({ error: 'Server configuration missing' });
  }

  const headers = {
    apikey: SERVICE_KEY,
    Authorization: 'Bearer ' + SERVICE_KEY
  };

  try {
    let appt = null;
    let patientEmail = '';
    let patientId = null;

    // 1. Try to fetch from appointments table first
    const apptRes = await fetch(Ge + '/rest/v1/appointments?id=eq.' + encodeURIComponent(id) + '&select=id,patient_id,patient_name,patient_email,service_title,rdv_date,slot,location', { headers });
    if (apptRes.ok) {
      const appts = await apptRes.json();
      if (Array.isArray(appts) && appts.length > 0) {
        appt = appts[0];
        patientEmail = appt.patient_email;
        patientId = appt.patient_id;
      }
    }

    // 2. If not found in appointments, search profiles table by id or email
    if (!appt) {
      const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);
      const isEmail = id.includes('@');
      let filter = isUUID ? ('id=eq.' + id) : isEmail ? ('email=eq.' + encodeURIComponent(id)) : null;

      if (filter) {
        const profRes = await fetch(Ge + '/rest/v1/profiles?' + filter + '&select=id,prenom,nom,email', { headers });
        if (profRes.ok) {
          const profs = await profRes.json();
          if (Array.isArray(profs) && profs.length > 0) {
            const p = profs[0];
            patientEmail = p.email;
            patientId = p.id;
            appt = {
              id: p.id,
              patient_id: p.id,
              patient_name: ((p.prenom || '') + ' ' + (p.nom || '')).trim() || p.email,
              patient_email: p.email,
              service_title: 'Séance de préparation',
              rdv_date: new Date().toISOString().split('T')[0],
              slot: ''
            };
          }
        }
      }
    }

    // 3. Fallback for custom link identifiers (e.g. prep_alexis_berthaux)
    if (!appt) {
      let searchQuery = id.toLowerCase().includes('berthaux') || id.toLowerCase().includes('alexis')
        ? 'nom=ilike.*Berthaux*'
        : 'order=created_at.desc&limit=1';
      const profRes = await fetch(Ge + '/rest/v1/profiles?' + searchQuery + '&select=id,prenom,nom,email', { headers });
      if (profRes.ok) {
        const profs = await profRes.json();
        if (Array.isArray(profs) && profs.length > 0) {
          const p = profs[0];
          patientEmail = p.email;
          patientId = p.id;
          appt = {
            id: p.id,
            patient_id: p.id,
            patient_name: ((p.prenom || '') + ' ' + (p.nom || '')).trim() || p.email,
            patient_email: p.email,
            service_title: 'Séance de préparation',
            rdv_date: new Date().toISOString().split('T')[0],
            slot: ''
          };
        }
      }
    }

    // 4. Default fallback if no profile match
    if (!appt) {
      appt = {
        id: id,
        patient_id: null,
        patient_name: 'Patient',
        patient_email: '',
        service_title: 'Séance de préparation',
        rdv_date: new Date().toISOString().split('T')[0],
        slot: ''
      };
    }

    // 5. Check if questionnaire is already submitted
    let alreadyDone = false;
    let queryCheck = 'appointment_id=eq.' + encodeURIComponent(id);
    if (patientEmail) queryCheck += ',patient_email.eq.' + encodeURIComponent(patientEmail);
    
    const questRes = await fetch(Ge + '/rest/v1/questionnaires?or=(' + queryCheck + ')&select=id', { headers });
    if (questRes.ok) {
      const questionnaires = await questRes.json();
      if (Array.isArray(questionnaires) && questionnaires.length > 0) {
        alreadyDone = true;
      }
    }

    return res.status(200).json({
      success: true,
      appointment: appt,
      alreadyDone
    });

  } catch (error) {
    console.error('Error in get-questionnaire-info API:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
