// Backend Vercel serverless function to securely retrieve booked slots without exposing patient details
export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const supabaseUrl = process.env.VITE_SUPABASE_URL || "https://zbavzvcnmlwbsepfsnbi.supabase.co";
  const supabaseServiceKey = process.env.VITE_SUPABASE_SERVICE_ROLE;

  if (!supabaseServiceKey) {
    console.error("VITE_SUPABASE_SERVICE_ROLE is not configured in Vercel env");
    return res.status(500).json({ error: "Missing database credentials" });
  }

  try {
    // 1. Fetch confirmed appointments (only need rdv_date, slot, service_id)
    const apptsRes = await fetch(`${supabaseUrl}/rest/v1/appointments?select=rdv_date,slot,service_id,status&status=eq.confirmed`, {
      headers: {
        apikey: supabaseServiceKey,
        Authorization: `Bearer ${supabaseServiceKey}`
      }
    });

    if (!apptsRes.ok) {
      const errText = await apptsRes.text();
      console.error("Failed to fetch appointments:", errText);
      return res.status(500).json({ error: "Failed to fetch appointments" });
    }

    const appointments = await apptsRes.json();

    // 2. Fetch blocked slots
    const blockedRes = await fetch(`${supabaseUrl}/rest/v1/blocked_slots?select=blocked_date,slot`, {
      headers: {
        apikey: supabaseServiceKey,
        Authorization: `Bearer ${supabaseServiceKey}`
      }
    });

    if (!blockedRes.ok) {
      const errText = await blockedRes.text();
      console.error("Failed to fetch blocked slots:", errText);
      return res.status(500).json({ error: "Failed to fetch blocked slots" });
    }

    const blockedSlots = await blockedRes.json();

    // 3. Return both sets of slot data safely without patient info
    return res.status(200).json({
      appointments,
      blockedSlots
    });

  } catch (error) {
    console.error("Error in get-busy-slots API:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
