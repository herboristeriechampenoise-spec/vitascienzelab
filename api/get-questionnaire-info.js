const Ge = "https://zbavzvcnmlwbsepfsnbi.supabase.co";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { id } = req.query;
  if (!id) {
    return res.status(400).json({ error: "Missing appointment ID" });
  }

  const SERVICE_KEY = process.env.VITE_SUPABASE_SERVICE_ROLE || process.env.SUPABASE_SERVICE_ROLE;
  if (!SERVICE_KEY) {
    return res.status(500).json({ error: "Server configuration missing" });
  }

  try {
    // 1. Fetch appointment details safely without sensitive data
    const apptRes = await fetch(`${Ge}/rest/v1/appointments?id=eq.${id}&select=id,patient_name,patient_email,service_title,rdv_date,slot,location`, {
      headers: {
        apikey: SERVICE_KEY,
        Authorization: `Bearer ${SERVICE_KEY}`
      }
    });

    if (!apptRes.ok) {
      return res.status(500).json({ error: "Failed to query database" });
    }

    const appointments = await apptRes.json();
    if (!Array.isArray(appointments) || appointments.length === 0) {
      return res.status(404).json({ error: "Appointment not found" });
    }

    const appt = appointments[0];

    // 2. Check if questionnaire is already filled out
    const questRes = await fetch(`${Ge}/rest/v1/questionnaires?appointment_id=eq.${id}&select=id`, {
      headers: {
        apikey: SERVICE_KEY,
        Authorization: `Bearer ${SERVICE_KEY}`
      }
    });

    let alreadyDone = false;
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
    console.error("Error in get-questionnaire-info API:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
