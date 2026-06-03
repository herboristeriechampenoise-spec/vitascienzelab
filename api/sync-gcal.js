// Force redeploy to apply new Vercel env variables
import crypto from "crypto";

// Helper method to obtain access token from Google OAuth
async function getAccessToken(clientEmail, privateKey) {
  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + 3600;

  const header = {
    alg: "RS256",
    typ: "JWT"
  };

  const claim = {
    iss: clientEmail,
    scope: "https://www.googleapis.com/auth/calendar.events",
    aud: "https://oauth2.googleapis.com/token",
    exp: exp,
    iat: iat
  };

  const base64Header = Buffer.from(JSON.stringify(header)).toString("base64url");
  const base64Claim = Buffer.from(JSON.stringify(claim)).toString("base64url");
  const signatureInput = `${base64Header}.${base64Claim}`;

  const sign = crypto.createSign("RSA-SHA256");
  sign.update(signatureInput);
  const signature = sign.sign(privateKey, "base64url");

  const jwt = `${signatureInput}.${signature}`;

  const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: `grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=${jwt}`
  });

  if (!tokenRes.ok) {
    const errorText = await tokenRes.text();
    throw new Error(`Google token error: ${errorText}`);
  }

  const tokenData = await tokenRes.json();
  return tokenData.access_token;
}

// Helper to format event payload for Google Calendar
function makeGCalEvent(record) {
  const serviceDurations = {
    conseil: 60,
    suivi: 45
  };
  const duration = serviceDurations[record.service_id] || 45;
  const [hours, minutes] = record.slot.split(":").map(Number);

  const startTime = new Date(record.rdv_date + "T00:00:00");
  startTime.setHours(hours, minutes, 0, 0);

  const endTime = new Date(startTime.getTime() + duration * 60000);

  return {
    summary: `${record.service_icon || "📋"} ${record.patient_name} — ${record.service_title}`,
    location: "9 Rue du Champ Pile, 10320 Bouilly (Aube)",
    description: `Patient : ${record.patient_name}\nEmail : ${record.patient_email}\nTél : ${record.patient_tel}\nNotes : ${record.notes || "—"}\nRéf. : ${record.id}\n\nSecrétariat VITASCIENZELAB – Herboristerie Champenoise`,
    start: {
      dateTime: startTime.toISOString(),
      timeZone: "Europe/Paris"
    },
    end: {
      dateTime: endTime.toISOString(),
      timeZone: "Europe/Paris"
    },
    colorId: record.service_id === "conseil" ? "1" : record.service_id === "suivi" ? "2" : "6",
    reminders: {
      useDefault: false,
      overrides: [
        { method: "email", minutes: 1440 },
        { method: "popup", minutes: 60 }
      ]
    }
  };
}

// Main Vercel serverless function handler
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const payload = req.body;
  if (!payload || !payload.type || !payload.table || payload.table !== "appointments") {
    return res.status(400).json({ error: "Invalid webhook payload" });
  }

  // Load service account configuration from environment variable
  const serviceAccountKeyString = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;
  if (!serviceAccountKeyString) {
    console.error("GOOGLE_SERVICE_ACCOUNT_KEY is not configured in Vercel env");
    return res.status(500).json({ error: "Missing calendar service account credentials" });
  }

  let creds;
  try {
    creds = JSON.parse(serviceAccountKeyString);
  } catch (err) {
    console.error("Failed to parse GOOGLE_SERVICE_ACCOUNT_KEY JSON string:", err);
    return res.status(500).json({ error: "Invalid credentials format" });
  }

  const clientEmail = creds.client_email;
  const privateKey = creds.private_key;
  if (!clientEmail || !privateKey) {
    return res.status(500).json({ error: "Malformed credentials keys" });
  }

  const supabaseUrl = process.env.VITE_SUPABASE_URL || "https://zbavzvcnmlwbsepfsnbi.supabase.co";
  const supabaseServiceKey = process.env.VITE_SUPABASE_SERVICE_ROLE;
  if (!supabaseServiceKey) {
    console.error("VITE_SUPABASE_SERVICE_ROLE key is missing");
    return res.status(500).json({ error: "Missing database admin credentials" });
  }

  try {
    const accessToken = await getAccessToken(clientEmail, privateKey);

    const type = payload.type;
    const record = payload.record;
    const oldRecord = payload.old_record;

    if (type === "INSERT") {
      // Create new event in Google Calendar
      if (record.status === "confirmed") {
        const gcalEvent = makeGCalEvent(record);
        const gcalRes = await fetch("https://www.googleapis.com/calendar/v3/calendars/primary/events", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify(gcalEvent)
        });

        if (gcalRes.ok) {
          const gcalData = await gcalRes.json();
          const gcalEventId = gcalData.id;

          // Update Supabase with the generated Event ID using service role key
          await fetch(`${supabaseUrl}/rest/v1/appointments?id=eq.${record.id}`, {
            method: "PATCH",
            headers: {
              apikey: supabaseServiceKey,
              Authorization: `Bearer ${supabaseServiceKey}`,
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ gcal_event_id: gcalEventId })
          });

          return res.status(200).json({ success: true, action: "insert", eventId: gcalEventId });
        } else {
          const errMsg = await gcalRes.text();
          console.error("GCal insert failed:", errMsg);
          return res.status(500).json({ error: "Google Calendar event creation failed", details: errMsg });
        }
      } else {
        return res.status(200).json({ msg: "Insert ignored, status is not confirmed" });
      }
    }

    if (type === "UPDATE") {
      // Prevent infinite loops by checking if the update has critical changes (date, slot, status, name, service)
      const hasCriticalChanges =
        !oldRecord ||
        oldRecord.rdv_date !== record.rdv_date ||
        oldRecord.slot !== record.slot ||
        oldRecord.patient_name !== record.patient_name ||
        oldRecord.service_id !== record.service_id ||
        oldRecord.status !== record.status;

      if (!hasCriticalChanges) {
        return res.status(200).json({ msg: "No critical changes, skipped" });
      }

      const eventId = record.gcal_event_id || oldRecord.gcal_event_id;

      if (record.status === "cancelled" || record.status === "archived" || record.status === "completed") {
        // Delete Google Calendar event if appointment is cancelled/archived
        if (eventId) {
          await fetch(`https://www.googleapis.com/calendar/v3/calendars/primary/events/${eventId}`, {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          });

          // Clear event ID in Supabase
          await fetch(`${supabaseUrl}/rest/v1/appointments?id=eq.${record.id}`, {
            method: "PATCH",
            headers: {
              apikey: supabaseServiceKey,
              Authorization: `Bearer ${supabaseServiceKey}`,
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ gcal_event_id: null })
          });

          return res.status(200).json({ success: true, action: "delete_due_to_status" });
        }
        return res.status(200).json({ msg: "No GCal event to delete for cancelled status" });
      }

      if (record.status === "confirmed") {
        if (eventId) {
          // Update existing Google Calendar event
          const gcalEvent = makeGCalEvent(record);
          const gcalRes = await fetch(`https://www.googleapis.com/calendar/v3/calendars/primary/events/${eventId}`, {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json"
            },
            body: JSON.stringify(gcalEvent)
          });

          if (gcalRes.ok) {
            return res.status(200).json({ success: true, action: "update", eventId });
          } else {
            const errMsg = await gcalRes.text();
            console.error("GCal update failed:", errMsg);
            return res.status(500).json({ error: "Google Calendar event update failed", details: errMsg });
          }
        } else {
          // Re-create event if it didn't exist (self-healing)
          const gcalEvent = makeGCalEvent(record);
          const gcalRes = await fetch("https://www.googleapis.com/calendar/v3/calendars/primary/events", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json"
            },
            body: JSON.stringify(gcalEvent)
          });

          if (gcalRes.ok) {
            const gcalData = await gcalRes.json();
            const gcalEventId = gcalData.id;

            await fetch(`${supabaseUrl}/rest/v1/appointments?id=eq.${record.id}`, {
              method: "PATCH",
              headers: {
                apikey: supabaseServiceKey,
                Authorization: `Bearer ${supabaseServiceKey}`,
                "Content-Type": "application/json"
              },
              body: JSON.stringify({ gcal_event_id: gcalEventId })
            });

            return res.status(200).json({ success: true, action: "insert_missing", eventId: gcalEventId });
          }
        }
      }
    }

    if (type === "DELETE") {
      const eventId = oldRecord ? oldRecord.gcal_event_id : null;
      if (eventId) {
        await fetch(`https://www.googleapis.com/calendar/v3/calendars/primary/events/${eventId}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
        return res.status(200).json({ success: true, action: "delete", eventId });
      }
      return res.status(200).json({ msg: "No event ID to delete" });
    }

    return res.status(200).json({ msg: "Unsupported event type" });

  } catch (err) {
    console.error("GCal sync function error:", err);
    return res.status(500).json({ error: "Internal server error", details: err.message });
  }
}
