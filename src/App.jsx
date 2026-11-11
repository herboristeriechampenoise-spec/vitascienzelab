import React, { useState, useEffect, useRef } from 'react';
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from 'react/jsx-runtime';

const Ge = import.meta.env.VITE_SUPABASE_URL || "https://zbavzvcnmlwbsepfsnbi.supabase.co";
const j = import.meta.env.VITE_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpiYXZ6dmNubWx3YnNlcGZzbmJpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzczNzE1MzEsImV4cCI6MjA5Mjk0NzUzMX0.yn8SfqytABe0DxjMGgJMK-ZFo3yrDDbn4Lx-b-uGz0I";
const adminPost = async (table, data) => {
  try {
    const res = await fetch("/api/admin-write", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ operation: "post", table, data })
    });
    if (res.ok) {
      return await res.json().catch(() => ({ ok: true }));
    }
    const errBody = await res.json().catch(() => ({ error: "HTTP " + res.status }));
    return { error: errBody.error || "Database insert failed", status: res.status };
  } catch (err) {
    console.error("adminPost error:", err);
    return { error: err.message || "Network error" };
  }
};

const adminPatch = async (table, id, data) => {
  try {
    const res = await fetch("/api/admin-write", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ operation: "patch", table, id, data })
    });
    if (res.ok) {
      return true;
    }
    const errBody = await res.json().catch(() => ({}));
    if (res.status !== 409 && !ee) {
      const cleanData = { ...(data || {}) };
      delete cleanData._check_conflict;
      await X.patch(table, id, cleanData, j).catch(() => {});
    }
    return { error: errBody.error || "HTTP " + res.status };
  } catch (err) {
    console.error("adminPatch error:", err);
    return { error: err.message || "Network error" };
  }
};

const adminDelete = async (table, id) => {
  try {
    const res = await fetch("/api/admin-write", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ operation: "delete", table, id })
    });
    return res.ok;
  } catch (err) {
    console.error("adminDelete error:", err);
    return false;
  }
};

const adminGet = async (table, query = "select=*") => {
  try {
    const res = await fetch("/api/admin-write", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ operation: "get", table, query })
    });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data)) return data;
    }
  } catch (err) {
    console.error("adminGet error:", err);
  }
  return X.get(table, query, j).catch(() => []);
};

let activeSessionToken = null;
const ee = Ge.includes("VOTRE");
const Sg = "692312814786-4mrf2rt3us6kkrhqdai4624puhisrog2.apps.googleusercontent.com";
const ju = (e, t) => {
  let n = ["R\xE9f\xE9rence", "Date", "Heure", "Patient", "Email", "T\xE9l\xE9phone", "Prestation", "Dur\xE9e", "Statut", "Notes", "Documents", "R\xE9current"],
    l = e.map(r => [r.id, Ke(r.rdv_date), r.slot, r.patient_name, r.patient_email, r.patient_tel, r.service_title, r.service_dur, r.status, (r.notes || "").replace(/,/g, ";"), (r.docs || []).join("|"), r.recurring ? "Oui" : "Non"]),
    a = [n, ...l].map(r => r.map(v => `"${v || ""}"`).join(",")).join(`
`),
    i = new Blob(["\uFEFF" + a], {
      type: "text/csv;charset=utf-8"
    }),
    u = URL.createObjectURL(i),
    s = document.createElement("a");
  s.href = u, s.download = t, s.click(), URL.revokeObjectURL(u);
};
const xg = "https://www.googleapis.com/auth/calendar.events";
const Eg = "https://www.googleapis.com/calendar/v3/calendars/primary/events";
const yn = {
  conseil: 60,
  suivi: 45
};
const jn = async (e, t, n) => {
  if (!e || e === "\u2014") return !1;
  try {
    let l = await fetch("/api/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        to: e,
        subject: t,
        htmlContent: n
      })
    });
    if (!l.ok) {
      let a = await l.text();
      console.error("Email proxy error:", a);
    }
    return l.ok;
  } catch (l) {
    return console.error("sendEmail error:", l), !1;
  }
};
const Ji = (e, t) => {
  let n = t === "48h",
    l = e.patient_name?.split(" ")[0] || "",
    loc = e.location && e.location.trim() ? e.location.trim() : "9 Rue du Champ Pile, 10320 Bouilly";
  return `<!DOCTYPE html><html><body style="font-family:Arial,sans-serif;background:#f4f4f4;padding:20px">
<div style="max-width:560px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden">
  <div style="background:linear-gradient(135deg,#003891,#1565C0);padding:28px;text-align:center">
    <div style="font-size:28px">\u2697\uFE0F</div>
    <div style="font-size:20px;color:#fff;font-weight:700;margin-top:6px">VITASCIENZELAB</div>
    <div style="font-size:11px;color:rgba(255,255,255,.7)">Herboristerie Champenoise \xB7 Bouilly (Aube)</div>
  </div>
  <div style="padding:28px">
    <h2 style="font-size:18px;color:#1A237E;margin:0 0 12px">${n ? "\u23F0 Rappel \u2014 Votre s\xE9ance est dans 48h" : "\u2705 Votre s\xE9ance est confirm\xE9e"}</h2>
    <p style="color:#546E7A;font-size:13px;line-height:1.7;margin-bottom:16px">
      Bonjour <strong>${l}</strong>,<br>
      ${n ? "Nous vous rappelons votre prochaine s\xE9ance de bien-\xEAtre." : "Votre s\xE9ance a bien \xE9t\xE9 enregistr\xE9e."}
    </p>
    <div style="background:#E8F0FE;border-radius:12px;padding:18px;margin-bottom:16px;font-size:13px">
      <div style="display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid rgba(21,101,192,.1)"><span style="color:#78909C">\u{1F9EC} Prestation</span><strong style="color:#1A237E">${e.service_title}</strong></div>
      <div style="display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid rgba(21,101,192,.1)"><span style="color:#78909C">\u{1F4C5} Date</span><strong style="color:#1A237E">${vt(e.rdv_date)}</strong></div>
      <div style="display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid rgba(21,101,192,.1)"><span style="color:#78909C">\u{1F550} Heure</span><strong style="color:#1A237E">${e.slot}</strong></div>
      <div style="display:flex;justify-content:space-between;padding:6px 0"><span style="color:#78909C">\u{1F4CD} Lieu</span><strong style="color:#1A237E">${loc}</strong></div>
    </div>
    <div style="background:#FFF8E1;border-radius:10px;padding:12px 14px;margin-bottom:12px;font-size:12px;color:#E65100;line-height:1.6">
      <strong>\u{1F4CE} \xC0 apporter :</strong> Pensez \xE0 ramener tout document utile (bilan sanguin, ordonnance\u2026). Non obligatoire mais tr\xE8s pr\xE9cieux.
    </div>
    <div style="margin:20px 0;text-align:center;">
      <a href="https://vitascienzelab.vercel.app" style="background:#1565C0;color:#fff;padding:12px 24px;text-decoration:none;border-radius:8px;font-weight:bold;font-size:13px;display:inline-block;">🌐 Accéder à VitaScienzeLab</a>
    </div>
    ${n ? `<div style="background:#FCE4EC;border-radius:10px;padding:12px 14px;font-size:12px;color:#880E4F;line-height:1.6">
      \u26A0\uFE0F En cas d'emp\xEAchement, merci d'annuler au moins 24h \xE0 l'avance \xE0 contact@herboristeriechampenoise.com
    </div>` : ""}
    <p style="font-size:10px;color:#90A4AE;line-height:1.6;margin-top:20px;border-top:1px solid #ECEFF1;padding-top:14px">
      Les s\xE9ances de VITASCIENZELAB rel\xE8vent du bien-\xEAtre et ne constituent pas un acte m\xE9dical. SIRET : 841 057 730 00019
    </p>
  </div>
</div></body></html>`;
};
const Yu = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=DM+Sans:wght@400;500;600&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'DM Sans', sans-serif; }
  button { transition: all .15s; cursor: pointer; }
  button:hover:not(:disabled) { filter: brightness(1.06); transform: translateY(-1px); }
  button:disabled { opacity: .5; cursor: not-allowed; }
  input, textarea, select { font-family: 'DM Sans', sans-serif; }
  @keyframes spin { to { transform: rotate(360deg); } }
  @keyframes pulse-glow {
    0% { transform: scale(0.95); opacity: 0.6; box-shadow: 0 0 0 0 rgba(255, 82, 82, 0.7); }
    70% { transform: scale(1.1); opacity: 1; box-shadow: 0 0 0 5px rgba(255, 82, 82, 0); }
    100% { transform: scale(0.95); opacity: 0.6; box-shadow: 0 0 0 0 rgba(255, 82, 82, 0); }
  }
`;
const q = "#1565C0";
const z = "#003891";
const V = "#E8F0FE";
const zg = "herboristeriechampenoise@gmail.com";
const ye = {
  name: "VITASCIENZELAB",
  sub: "Herboristerie Champenoise",
  owner: "Alexis BERTHAUX-MALARMEY",
  role: "Sp\xE9cialiste en Bien-\xEAtre & Conseil en Compl\xE9ments Alimentaires",
  addr: "9 Rue du Champ Pile, 10320 Bouilly (Aube)",
  email: "contact@herboristeriechampenoise.com",
  siret: "841 057 730 00019",
  siren: "841 057 730",
  naf: "1089Z",
  tva: "FR84841057730"
};
const $l = [{
  id: "conseil",
  icon: "\u{1F9EC}",
  title: "S\xE9ance de Conseil en Compl\xE9ments",
  sub: "Sans engagement \xB7 Aucun achat obligatoire",
  dur: "60 min",
  desc: "\xC9change personnalis\xE9 sur vos habitudes de vie pour vous orienter vers une s\xE9lection de compl\xE9ments alimentaires et de plantes adapt\xE9s \xE0 vos objectifs bien-\xEAtre. S\xE9ance offerte par VITASCIENZELAB."
}, {
  id: "suivi",
  icon: "\u{1F4CB}",
  title: "S\xE9ance de Suivi Bien-\xEAtre",
  sub: "Sans engagement \xB7 Aucun achat obligatoire",
  dur: "45 min",
  desc: "Point d'\xE9tape sur votre programme bien-\xEAtre en cours, ajustement de votre s\xE9lection de compl\xE9ments alimentaires et renouvellement si souhait\xE9. S\xE9ance offerte par VITASCIENZELAB."
}];
const Je = ["12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00"];
const Gu = ["Janvier", "F\xE9vrier", "Mars", "Avril", "Mai", "Juin", "Juillet", "Ao\xFBt", "Septembre", "Octobre", "Novembre", "D\xE9cembre"];
const Pr = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
const Vu = [{
  k: "objectif_bienetre",
  q: "Quel est votre objectif bien-\xEAtre principal pour cette s\xE9ance ?",
  type: "radio",
  opts: ["Soutenir mon niveau d'\xE9nergie et ma vitalit\xE9 au quotidien", "Accompagner mon \xE9quilibre de poids par une approche nutritionnelle", "Soutenir mon confort digestif", "Renforcer mes d\xE9fenses naturelles de fa\xE7on pr\xE9ventive", "Am\xE9liorer la qualit\xE9 de mon sommeil", "Soutenir ma gestion du stress", "Bilan de mes habitudes nutritionnelles et s\xE9lection de compl\xE9ments adapt\xE9s", "Autre objectif de bien-\xEAtre personnel"]
}];
const Wi = [{
  k: "objectif_bienetre",
  q: "Quel est votre objectif bien-être principal pour cette séance ?",
  type: "radio",
  opts: ["Soutenir mon niveau d'énergie et ma vitalité au quotidien", "Accompagner mon équilibre de poids par une approche nutritionnelle", "Soutenir mon confort digestif", "Renforcer mes défenses naturelles de façon préventive", "Améliorer la qualité de mon sommeil", "Soutenir ma gestion du stress", "Bilan de mes habitudes nutritionnelles et sélection de compléments adaptés", "Autre objectif de bien-être personnel"]
}, {
  k: "vitalite_quotidienne",
  q: "Comment évaluez-vous votre vitalité générale au quotidien ? (1 = très faible / 5 = excellente)",
  type: "scale"
}, {
  k: "niveau_stress",
  q: "Comment évaluez-vous votre niveau de stress habituel au quotidien ? (1 = très serein / 5 = stress très élevé)",
  type: "scale"
}, {
  k: "traitements_en_cours",
  q: "Prenez-vous actuellement des médicaments ou des compléments alimentaires ?",
  type: "medlist",
  ph: "Précisez vos éventuels médicaments ou compléments alimentaires..."
}];
const Ln = () => Math.random().toString(36).slice(2, 9);
const it = e => {
  let t = new Date();
  return t.setDate(t.getDate() + e), t.toISOString().split("T")[0];
};
const ue = {
  users: [{
    id: "u1",
    email: "sophie.martin@email.fr",
    pw: "demo123",
    prenom: "Sophie",
    nom: "Martin",
    tel: "06 11 22 33 44",
    created_at: it(-30)
  }, {
    id: "u2",
    email: "pierre.leblanc@email.fr",
    pw: "demo123",
    prenom: "Pierre",
    nom: "Leblanc",
    tel: "06 55 44 33 22",
    created_at: it(-60)
  }],
  appointments: [{
    id: "RDV001",
    patient_id: "u1",
    patient_name: "Sophie Martin",
    patient_email: "sophie.martin@email.fr",
    patient_tel: "06 11 22 33 44",
    service_id: "conseil",
    service_title: "Rendez-vous Conseil",
    service_icon: "\u{1F9EC}",
    service_dur: "45 min",
    rdv_date: it(1),
    slot: "14:30",
    status: "confirmed",
    notes: "Fatigue chronique depuis 6 mois",
    recurring: !1,
    docs: ["bilan_sanguin_mars2024.pdf"],
    reminder_sent: !1,
    created_at: it(0)
  }, {
    id: "RDV002",
    patient_id: "u1",
    patient_name: "Sophie Martin",
    patient_email: "sophie.martin@email.fr",
    patient_tel: "06 11 22 33 44",
    service_id: "suivi",
    service_title: "Suivi & Renouvellement",
    service_icon: "\u{1F4CB}",
    service_dur: "30 min",
    rdv_date: it(-20),
    slot: "15:00",
    status: "completed",
    notes: "",
    recurring: !1,
    docs: [],
    reminder_sent: !0,
    created_at: it(-25)
  }, {
    id: "RDV003",
    patient_id: "u2",
    patient_name: "Pierre Leblanc",
    patient_email: "pierre.leblanc@email.fr",
    patient_tel: "06 55 44 33 22",
    service_id: "suivi",
    service_title: "R\xE9\xE9quilibrage M\xE9tabolique",
    service_icon: "\u2697\uFE0F",
    service_dur: "60 min",
    rdv_date: it(3),
    slot: "16:00",
    status: "confirmed",
    notes: "Objectif perte de poids",
    recurring: !0,
    docs: [],
    reminder_sent: !1,
    created_at: it(-1)
  }],
  notes: [{
    id: Ln(),
    patient_id: "u1",
    note: "Patiente tr\xE8s motiv\xE9e. Carence en fer suspect\xE9e. Suivi alimentaire rigoureux.",
    created_at: it(-5)
  }, {
    id: Ln(),
    patient_id: "u2",
    note: "Objectif -8kg sur 3 mois. Protocole phytoth\xE9rapie d\xE9marr\xE9.",
    created_at: it(-2)
  }],
  questionnaires: [],
  blocked: []
};
const vt = e => e ? new Date(e + "T12:00:00").toLocaleDateString("fr-FR", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric"
}) : "";
const Ke = e => e ? new Date(e + "T12:00:00").toLocaleDateString("fr-FR", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric"
}) : "";
const ed = () => "RDV" + Date.now().toString().slice(-6);
const Qu = (e, t) => {
  if (!e || !t) return null;
  let [n, l] = t.split(":").map(Number),
    a = new Date(e + "T12:00:00");
  return a.setHours(n, l, 0, 0), Math.round((a - Date.now()) / 36e5);
};
const at = e => {
  let t = Qu(e.rdv_date, e.slot);
  return t !== null && t < 0;
};
const tn = e => {
  let t = Qu(e.rdv_date, e.slot);
  return t > 0 && t <= 50 && !e.reminder_sent && e.status === "confirmed";
};
const Ki = e => ({
  apikey: j,
  Authorization: `Bearer ${e && e !== j ? e : (activeSessionToken || j)}`,
  "Content-Type": "application/json"
});
const Ii = {
  signIn: (e, t) => fetch(`${Ge}/auth/v1/token?grant_type=password`, {
    method: "POST",
    headers: {
      apikey: j,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email: e,
      password: t
    })
  }).then(n => n.json()),
  signUp: (e, t, n) => fetch(`${Ge}/auth/v1/signup`, {
    method: "POST",
    headers: {
      apikey: j,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email: e,
      password: t,
      data: n
    })
  }).then(l => l.json())
};
const X = {
  get: (e, t, n) => fetch(`${Ge}/rest/v1/${e}?${t || ""}`, {
    headers: Ki(n)
  }).then(l => l.json()),
  post: (e, t, n) => fetch(`${Ge}/rest/v1/${e}`, {
    method: "POST",
    headers: { ...Ki(n), Prefer: "return=minimal" },
    body: JSON.stringify(t)
  }).then(l => l.text().then(text => text ? JSON.parse(text) : {})),
  patch: (e, t, n, l) => fetch(`${Ge}/rest/v1/${e}?id=eq.${t}`, {
    method: "PATCH",
    headers: { ...Ki(l), Prefer: "return=minimal" },
    body: JSON.stringify(n)
  }).then(a => a.text().then(text => text ? JSON.parse(text) : {})),
  del: (e, t, n) => fetch(`${Ge}/rest/v1/${e}?id=eq.${t}`, {
    method: "DELETE",
    headers: Ki(n)
  }).then(l => l.ok)
};
const downloadBase64File = (base64Data, filename) => {
  if (!base64Data) {
    alert("Le fichier est vide ou indisponible.");
    return;
  }
  try {
    let cleanData = String(base64Data).trim();
    if (!cleanData.startsWith("data:")) {
      let downloadUrl = cleanData;
      if (cleanData.includes("/storage/v1/object/public/")) {
        const sep = cleanData.includes("?") ? "&" : "?";
        downloadUrl = `${cleanData}${sep}download=${encodeURIComponent(filename || "document")}`;
      }
      const a = document.createElement("a");
      a.href = downloadUrl;
      a.download = filename || "document";
      a.rel = "noopener noreferrer";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      return;
    }
    fetch(cleanData)
      .then(res => res.blob())
      .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = filename || "document";
        document.body.appendChild(a);
        a.click();
        setTimeout(() => {
          document.body.removeChild(a);
          window.URL.revokeObjectURL(url);
        }, 2000);
      })
      .catch(() => {
        const parts = cleanData.split(";base64,");
        if (parts.length < 2) {
          const a = document.createElement("a");
          a.href = cleanData;
          a.download = filename || "document";
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          return;
        }
        const contentType = parts[0].replace("data:", "") || "application/octet-stream";
        let rawBase64 = parts[1].replace(/[\r\n\s]/g, "").replace(/-/g, "+").replace(/_/g, "/");
        while (rawBase64.length % 4 !== 0) {
          rawBase64 += "=";
        }
        const raw = window.atob(rawBase64);
        const rawLength = raw.length;
        const uInt8Array = new Uint8Array(rawLength);
        for (let i = 0; i < rawLength; ++i) {
          uInt8Array[i] = raw.charCodeAt(i);
        }
        const blob = new Blob([uInt8Array], { type: contentType });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = filename || "document";
        document.body.appendChild(a);
        a.click();
        setTimeout(() => {
          document.body.removeChild(a);
          window.URL.revokeObjectURL(url);
        }, 2000);
      });
  } catch (err) {
    console.error("Download error:", err);
    alert("Erreur lors du téléchargement du fichier.");
  }
};
const compressAndReadFile = async (file, patientId = "shared") => {
  if (file.size > 30 * 1024 * 1024) {
    throw new Error(`Le fichier "${file.name}" dépasse la taille maximale autorisée (30 Mo).`);
  }
  if (!ee) {
    try {
      const signRes = await fetch("/api/admin-write", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          operation: "create_upload_url",
          fileName: file.name,
          contentType: file.type || "application/octet-stream",
          patientId
        })
      });
      if (signRes.ok) {
        const signData = await signRes.json();
        if (signData && signData.signedUrl) {
          const uploadRes = await fetch(signData.signedUrl, {
            method: "PUT",
            headers: {
              "Content-Type": file.type || "application/octet-stream"
            },
            body: file
          });
          if (uploadRes.ok) {
            return {
              name: file.name,
              type: file.type || "application/octet-stream",
              size: file.size,
              data: signData.publicUrl,
              storage_path: signData.storagePath
            };
          }
        }
      }
    } catch (storageErr) {
      console.warn("Direct storage upload fallback:", storageErr);
    }
  }
  return new Promise((resolve, reject) => {
    const isImage = file.type.startsWith("image/");
    if (isImage) {
      const img = new Image();
      const reader = new FileReader();
      reader.onload = (e) => {
        img.src = e.target.result;
      };
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let width = img.width;
        let height = img.height;
        const maxDim = 1600;
        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);
        const compressedDataUrl = canvas.toDataURL("image/jpeg", 0.75);
        resolve({
          name: file.name.replace(/\.[^/.]+$/, ".jpg"),
          type: "image/jpeg",
          size: file.size,
          data: compressedDataUrl
        });
      };
      img.onerror = () => {
        const readerRaw = new FileReader();
        readerRaw.onload = (ev) => resolve({ name: file.name, type: file.type, size: file.size, data: ev.target.result });
        readerRaw.onerror = reject;
        readerRaw.readAsDataURL(file);
      };
      reader.readAsDataURL(file);
    } else {
      const reader = new FileReader();
      reader.onload = (e) => resolve({ name: file.name, type: file.type, size: file.size, data: e.target.result });
      reader.onerror = reject;
      reader.readAsDataURL(file);
    }
  });
};
function Ag() {
  return _jsx("div", {
    style: {
      display: "flex",
      justifyContent: "center",
      padding: 40
    },
    children: _jsx("div", {
      style: {
        width: 30,
        height: 30,
        border: "3px solid #E3F0FF",
        borderTop: `3px solid ${q}`,
        borderRadius: "50%",
        animation: "spin .8s linear infinite"
      }
    })
  });
}
function We({
  color: e,
  bg: t,
  children: n
}) {
  return _jsx("span", {
    style: {
      background: t || V,
      color: e || q,
      fontSize: 11,
      fontWeight: 600,
      padding: "3px 10px",
      borderRadius: 20,
      whiteSpace: "nowrap"
    },
    children: n
  });
}
function ze({
  children: e,
  style: t = {},
  ...n
}) {
  return _jsx("button", {
    style: {
      background: `linear-gradient(135deg,${q},${z})`,
      color: "#fff",
      border: "none",
      borderRadius: 12,
      padding: "12px 24px",
      fontSize: 14,
      fontWeight: 600,
      ...t
    },
    ...n,
    children: e
  });
}
function ot({
  children: e,
  style: t = {},
  ...n
}) {
  return _jsx("button", {
    style: {
      background: "#fff",
      color: q,
      border: `2px solid ${V}`,
      borderRadius: 12,
      padding: "12px 18px",
      fontSize: 14,
      fontWeight: 600,
      ...t
    },
    ...n,
    children: e
  });
}
function Ie({
  label: e,
  error: t,
  children: n
}) {
  return _jsxs("div", {
    style: {
      marginBottom: 14
    },
    children: [e && _jsx("label", {
      style: {
        display: "block",
        fontSize: 12,
        fontWeight: 600,
        color: z,
        marginBottom: 6
      },
      children: e
    }), n, t && _jsx("span", {
      style: {
        fontSize: 11,
        color: "#E53935",
        display: "block",
        marginTop: 4
      },
      children: t
    })]
  });
}
function ut({
  error: e,
  ...t
}) {
  return _jsx("input", {
    style: {
      width: "100%",
      border: `2px solid ${e ? "#E53935" : V}`,
      borderRadius: 10,
      padding: "11px 13px",
      fontSize: 13,
      color: z,
      outline: "none",
      background: "#FAFCFF"
    },
    ...t
  });
}
function _g({
  selected: e,
  onSelect: t,
  blocked: n = []
}) {
  let l = new Date(),
    initD = e && /^\d{4}-\d{2}-\d{2}$/.test(e) ? new Date(e + "T12:00:00") : l,
    [a, i] = useState(initD.getFullYear()),
    [u, s] = useState(initD.getMonth()),
    r = new Date(a, u + 1, 0).getDate(),
    v = new Date(a, u, 1).getDay() - 1;
  v < 0 && (v = 6);
  let S = () => {
      u === 0 ? (s(11), i(f => f - 1)) : s(f => f - 1);
    },
    E = () => {
      u === 11 ? (s(0), i(f => f + 1)) : s(f => f + 1);
    },
    g = f => {
      let m = `${a}-${String(u + 1).padStart(2, "0")}-${String(f).padStart(2, "0")}`,
        d = `${l.getFullYear()}-${String(l.getMonth() + 1).padStart(2, "0")}-${String(l.getDate()).padStart(2, "0")}`,
        h = new Date(a, u, f, 12, 0, 0),
        w = n.some(B => B.blocked_date === m && (!B.slot || B.slot === ""));
      return m <= d || h.getDay() === 0 || w;
    },
    p = f => {
      if (!e) return !1;
      let m = `${a}-${String(u + 1).padStart(2, "0")}-${String(f).padStart(2, "0")}`;
      return e === m;
    },
    R = f => {
      let m = `${a}-${String(u + 1).padStart(2, "0")}-${String(f).padStart(2, "0")}`,
        d = `${l.getFullYear()}-${String(l.getMonth() + 1).padStart(2, "0")}-${String(l.getDate()).padStart(2, "0")}`;
      return m === d;
    },
    k = f => `${a}-${String(u + 1).padStart(2, "0")}-${String(f).padStart(2, "0")}`,
    Q = [...Array(v).fill(null), ...Array.from({
      length: r
    }, (f, m) => m + 1)];
  return _jsxs("div", {
    style: {
      background: "#fff",
      borderRadius: 16,
      padding: 20,
      boxShadow: "0 2px 20px rgba(21,101,192,.08)"
    },
    children: [_jsxs("div", {
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 16
      },
      children: [_jsx("button", {
        onClick: S,
        style: {
          background: V,
          border: "none",
          borderRadius: 8,
          width: 32,
          height: 32,
          fontSize: 18,
          color: q
        },
        children: "\u2039"
      }), _jsxs("span", {
        style: {
          fontFamily: "'Playfair Display',serif",
          fontSize: 16,
          fontWeight: 700,
          color: q
        },
        children: [Gu[u], " ", a]
      }), _jsx("button", {
        onClick: E,
        style: {
          background: V,
          border: "none",
          borderRadius: 8,
          width: 32,
          height: 32,
          fontSize: 18,
          color: q
        },
        children: "\u203A"
      })]
    }), _jsx("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "repeat(7,1fr)",
        gap: 3,
        marginBottom: 6
      },
      children: Pr.map(f => _jsx("div", {
        style: {
          textAlign: "center",
          fontSize: 10,
          fontWeight: 700,
          color: "#90A4AE",
          padding: "4px 0"
        },
        children: f
      }, f))
    }), _jsx("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "repeat(7,1fr)",
        gap: 3
      },
      children: Q.map((f, m) => f ? _jsx("button", {
        disabled: g(f),
        onClick: () => t(k(f)),
        style: {
          width: "100%",
          aspectRatio: "1",
          border: "none",
          borderRadius: 8,
          fontSize: 13,
          background: p(f) ? q : R(f) ? V : "transparent",
          color: p(f) ? "#fff" : g(f) ? "#CFD8DC" : z,
          fontWeight: p(f) || R(f) ? 700 : 400,
          outline: R(f) && !p(f) ? `2px solid ${q}` : "none"
        },
        children: f
      }, m) : _jsx("div", {}, m))
    })]
  });
}
function td({
  onClose: e
}) {
  let t = [{
    t: "Identit\xE9 de l'entreprise",
    c: `Raison sociale : VITASCIENZELAB \u2013 Herboristerie Champenoise
Propri\xE9taire : ${ye.owner}
Statut : Entreprise individuelle \u2013 Affaire personnelle commer\xE7ant
SIRET : ${ye.siret} | SIREN : ${ye.siren} | NAF : ${ye.naf}
TVA : ${ye.tva}
Adresse : ${ye.addr}`
  }, {
    t: "Nature des prestations & cadre l\xE9gal",
    c: `VITASCIENZELAB est une entreprise de fabrication et de vente de compl\xE9ments alimentaires (SIRET ${ye.siret} \u2014 NAF ${ye.naf}). Les s\xE9ances propos\xE9es constituent exclusivement des actes de conseil commercial relatifs \xE0 la s\xE9lection de compl\xE9ments alimentaires et \xE0 l'accompagnement du mode de vie, dans le cadre d\xE9fini par la Directive europ\xE9enne 2002/46/CE et le D\xE9cret fran\xE7ais n\xB02006-352 relatif aux compl\xE9ments alimentaires.

Ces s\xE9ances sont r\xE9alis\xE9es par ${ye.owner}, sp\xE9cialiste en bien-\xEAtre et biochimie alimentaire, dans le cadre d'une activit\xE9 de conseil en compl\xE9ments alimentaires et phytoth\xE9rapie. Elles n'entrent \xE0 aucun titre dans le champ de l'exercice de la m\xE9decine (art. L4111-1 CSP), de la pharmacie (art. L4211-1 CSP), de la biologie m\xE9dicale (art. L6211-1 CSP), ni d'aucune profession de sant\xE9 r\xE9glement\xE9e.

Aucune prestation ne constitue un acte m\xE9dical, un diagnostic, une prescription m\xE9dicale, une analyse biologique, ni une pratique th\xE9rapeutique r\xE9glement\xE9e.`
  }, {
    t: "Absence de diagnostic \u2014 Non-substitution \xE0 l'avis m\xE9dical",
    c: `Les conseils d\xE9livr\xE9s lors des s\xE9ances ont une vocation exclusivement pr\xE9ventive et de soutien au bien-\xEAtre g\xE9n\xE9ral. Ils ne constituent en aucun cas :
\u2022 Un diagnostic m\xE9dical ou biologique
\u2022 Une prescription m\xE9dicamenteuse
\u2022 Un acte de t\xE9l\xE9m\xE9decine (art. L6316-1 CSP)
\u2022 Un suivi th\xE9rapeutique

En pr\xE9sence de tout sympt\xF4me persistant, pathologie av\xE9r\xE9e ou suspect\xE9e, le client est express\xE9ment invit\xE9 \xE0 consulter son m\xE9decin traitant ou un sp\xE9cialiste.`
  }, {
    t: "Documents et informations recueillis",
    c: `Les informations recueillies (liste de traitements, compl\xE9ments en cours, habitudes de vie) sont collect\xE9es dans l'unique but de pr\xE9venir d'\xE9ventuelles interactions connues entre les plantes m\xE9dicinales, les nutraceutiques propos\xE9s et les m\xE9dicaments en cours.

Ces informations ne font l'objet d'aucune interpr\xE9tation m\xE9dicale, biologique ou diagnostique. Elles sont utilis\xE9es exclusivement pour adapter la s\xE9lection de compl\xE9ments alimentaires propos\xE9e et trait\xE9es de fa\xE7on strictement confidentielle (RGPD).`
  }, {
    t: "Protection des donn\xE9es personnelles (RGPD \u2014 UE 2016/679)",
    c: `Responsable de traitement : ${ye.owner} \u2014 ${ye.name}
Finalit\xE9 : gestion des s\xE9ances de conseil en compl\xE9ments alimentaires
Dur\xE9e de conservation : 3 ans \xE0 compter du dernier contact
Aucune cession \xE0 des tiers
H\xE9bergement : Supabase (conforme RGPD, Union Europ\xE9enne)
Droits d'acc\xE8s, rectification, suppression : ${ye.email}
Droit de r\xE9clamation aupr\xE8s de la CNIL : www.cnil.fr`
  }, {
    t: "Conformit\xE9 r\xE9glementaire",
    c: `VITASCIENZELAB op\xE8re dans le strict respect du cadre l\xE9gal applicable :
\u2022 Directive europ\xE9enne 2002/46/CE \u2014 compl\xE9ments alimentaires
\u2022 D\xE9cret fran\xE7ais n\xB02006-352 du 20 mars 2006 \u2014 compl\xE9ments alimentaires
\u2022 R\xE8glement CE n\xB01924/2006 \u2014 all\xE9gations nutritionnelles et de sant\xE9
\u2022 Articles L4111-1, L4161-1, L4211-1 et L6211-1 du Code de la sant\xE9 publique
\u2022 Code de la consommation \u2014 conseil commercial en nutrition`
  }, {
    t: "Protection des donn\xE9es (RGPD)",
    c: `\u2022 Donn\xE9es utilis\xE9es uniquement pour la gestion des s\xE9ances de bien-\xEAtre
\u2022 Jamais c\xE9d\xE9es \xE0 des tiers
\u2022 Conservation : 3 ans \xE0 compter du dernier contact
\u2022 Droits (acc\xE8s, rectification, suppression) : ${ye.email}
\u2022 H\xE9bergement : Supabase (conforme RGPD, Union Europ\xE9enne)`
  }];
  return _jsx("div", {
    style: {
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,.55)",
      zIndex: 9999,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 16
    },
    onClick: e,
    children: _jsxs("div", {
      style: {
        background: "#fff",
        borderRadius: 20,
        maxWidth: 660,
        width: "100%",
        maxHeight: "88vh",
        overflowY: "auto",
        padding: 36
      },
      onClick: n => n.stopPropagation(),
      children: [_jsxs("div", {
        style: {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 24
        },
        children: [_jsx("h2", {
          style: {
            fontFamily: "'Playfair Display',serif",
            fontSize: 20,
            color: z
          },
          children: "Mentions L\xE9gales & Cadre R\xE9glementaire"
        }), _jsx("button", {
          onClick: e,
          style: {
            background: "none",
            border: "none",
            fontSize: 24,
            color: "#90A4AE",
            cursor: "pointer"
          },
          children: "\xD7"
        })]
      }), t.map(({
        t: n,
        c: l
      }) => _jsxs("div", {
        style: {
          marginBottom: 20
        },
        children: [_jsx("h3", {
          style: {
            fontSize: 11,
            fontWeight: 700,
            color: q,
            marginBottom: 8,
            letterSpacing: 0.8,
            textTransform: "uppercase"
          },
          children: n
        }), _jsx("p", {
          style: {
            fontSize: 13,
            color: "#455A64",
            lineHeight: 1.7,
            whiteSpace: "pre-line"
          },
          children: l
        })]
      }, n)), _jsx("div", {
        style: {
          padding: "14px 18px",
          background: "#E8F5E9",
          borderRadius: 12,
          borderLeft: "4px solid #43A047",
          marginBottom: 20
        },
        children: _jsxs("p", {
          style: {
            fontSize: 12,
            color: "#2E7D32",
            lineHeight: 1.6,
            margin: 0
          },
          children: [_jsx("strong", {
            children: "\u2696\uFE0F Conformit\xE9 :"
          }), " VITASCIENZELAB op\xE8re dans le strict respect du Code de la sant\xE9 publique fran\xE7ais, de la r\xE9glementation sur les compl\xE9ments alimentaires (Directive 2002/46/CE) et de la r\xE9glementation relative aux activit\xE9s de conseil en bien-\xEAtre."]
        })
      }), _jsx(ze, {
        onClick: e,
        style: {
          width: "100%"
        },
        children: "Fermer"
      })]
    })
  });
}
function Cg({
  rdv: e,
  type: t,
  onClose: n
}) {
  let l = t === "48h";
  return _jsx("div", {
    style: {
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,.55)",
      zIndex: 9999,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 16
    },
    onClick: n,
    children: _jsxs("div", {
      style: {
        background: "#F8FAFF",
        borderRadius: 20,
        maxWidth: 560,
        width: "100%",
        maxHeight: "88vh",
        overflowY: "auto"
      },
      onClick: a => a.stopPropagation(),
      children: [_jsxs("div", {
        style: {
          background: `linear-gradient(135deg,${z},${q})`,
          borderRadius: "20px 20px 0 0",
          padding: "16px 24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        },
        children: [_jsxs("div", {
          children: [_jsx("div", {
            style: {
              color: "rgba(255,255,255,.7)",
              fontSize: 11
            },
            children: l ? "\u23F0 Rappel 48h avant la s\xE9ance" : "\u2705 Confirmation de s\xE9ance"
          }), _jsxs("div", {
            style: {
              color: "#fff",
              fontSize: 13,
              fontWeight: 600
            },
            children: ["\xC0 : ", e.patient_email]
          })]
        }), _jsx("button", {
          onClick: n,
          style: {
            background: "rgba(255,255,255,.2)",
            border: "none",
            color: "#fff",
            borderRadius: 8,
            padding: "6px 14px",
            fontSize: 12
          },
          children: "Fermer"
        })]
      }), _jsx("div", {
        style: {
          padding: 24
        },
        children: _jsxs("div", {
          style: {
            background: "#fff",
            borderRadius: 16,
            overflow: "hidden",
            boxShadow: "0 4px 20px rgba(0,0,0,.08)"
          },
          children: [_jsxs("div", {
            style: {
              background: `linear-gradient(135deg,${z},${q})`,
              padding: 28,
              textAlign: "center"
            },
            children: [_jsx("div", {
              style: {
                fontSize: 28,
                marginBottom: 6
              },
              children: "\u2697\uFE0F"
            }), _jsx("div", {
              style: {
                fontFamily: "'Playfair Display',serif",
                fontSize: 20,
                color: "#fff",
                fontWeight: 700
              },
              children: "VITASCIENZELAB"
            }), _jsx("div", {
              style: {
                fontSize: 10,
                color: "rgba(255,255,255,.7)",
                letterSpacing: 1
              },
              children: "Herboristerie Champenoise \xB7 Bouilly (Aube)"
            })]
          }), _jsxs("div", {
            style: {
              padding: 28
            },
            children: [_jsx("h2", {
              style: {
                fontFamily: "'Playfair Display',serif",
                fontSize: 18,
                color: z,
                marginBottom: 12
              },
              children: l ? "\u23F0 Rappel \u2014 Votre s\xE9ance est dans 48h" : "\u2705 Votre s\xE9ance est confirm\xE9e"
            }), _jsxs("p", {
              style: {
                color: "#546E7A",
                fontSize: 13,
                lineHeight: 1.7,
                marginBottom: 16
              },
              children: ["Bonjour ", _jsx("strong", {
                children: e.patient_name?.split(" ")[0]
              }), ",", _jsx("br", {}), l ? "Nous vous rappelons votre prochaine s\xE9ance de bien-\xEAtre." : "Votre s\xE9ance a bien \xE9t\xE9 enregistr\xE9e. Voici votre r\xE9capitulatif."]
            }), _jsx("div", {
              style: {
                background: V,
                borderRadius: 12,
                padding: 18,
                marginBottom: 16
              },
              children: [["\u{1F9EC} Prestation", e.service_title], ["\u23F1 Dur\xE9e", e.service_dur], ["\u{1F4C5} Date", vt(e.rdv_date)], ["\u{1F550} Heure", e.slot], ["\u{1F4CD} Lieu", ye.addr]].map(([a, i]) => _jsxs("div", {
                style: {
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "7px 0",
                  borderBottom: "1px solid rgba(21,101,192,.1)",
                  fontSize: 12
                },
                children: [_jsx("span", {
                  style: {
                    color: "#78909C"
                  },
                  children: a
                }), _jsx("span", {
                  style: {
                    fontWeight: 700,
                    color: z
                  },
                  children: i
                })]
              }, a))
            }), _jsx("div", {
              style: {
                background: "#FFF8E1",
                borderRadius: 10,
                padding: "12px 14px",
                marginBottom: 12
              },
              children: _jsxs("p", {
                style: {
                  fontSize: 12,
                  color: "#E65100",
                  lineHeight: 1.6,
                  margin: 0
                },
                children: [_jsx("strong", {
                  children: "\u{1F4CE} \xC0 apporter :"
                }), " Si vous en disposez, n'oubliez pas de ramener tout document utile \xE0 votre dossier bien-\xEAtre (bilan sanguin, ordonnance\u2026). Non obligatoire mais tr\xE8s pr\xE9cieux."]
              })
            }), l && _jsx("div", {
              style: {
                background: "#FCE4EC",
                borderRadius: 10,
                padding: "12px 14px",
                marginBottom: 12
              },
              children: _jsxs("p", {
                style: {
                  fontSize: 12,
                  color: "#880E4F",
                  lineHeight: 1.6,
                  margin: 0
                },
                children: ["\u26A0\uFE0F En cas d'emp\xEAchement, merci d'annuler au moins ", _jsx("strong", {
                  children: "24h \xE0 l'avance"
                }), " \xE0 ", ye.email]
              })
            }), _jsxs("p", {
              style: {
                fontSize: 10,
                color: "#90A4AE",
                lineHeight: 1.6,
                marginTop: 16,
                borderTop: "1px solid #ECEFF1",
                paddingTop: 14
              },
              children: ["Les s\xE9ances de VITASCIENZELAB rel\xE8vent exclusivement du bien-\xEAtre et ne constituent pas un acte m\xE9dical. Elles ne se substituent pas \xE0 l'avis d'un m\xE9decin. SIRET : ", ye.siret]
            })]
          })]
        })
      })]
    })
  });
}
function Dg({
  onAuth: e,
  onBack: t
}) {
  let [n, l] = useState("login"),
    [a, i] = useState({
      email: "",
      pw: "",
      prenom: "",
      nom: "",
      tel: ""
    }),
    [u, s] = useState(""),
    [r, v] = useState(""),
    [S, E] = useState(""),
    [g, p] = useState(""),
    [R, k] = useState(!1),
    Q = d => h => i(w => ({
      ...w,
      [d]: h.target.value
    })),
    f = async () => {
      let cleanEmail = (a.email || "").trim();
      if (!cleanEmail || !a.pw) {
        p("Email et mot de passe requis");
        return;
      }
      k(!0), p("");
      try {
        if (ee) {
          let d = ue.users.find(h => h.email === cleanEmail && h.pw === a.pw);
          if (!d) {
            p("Email ou mot de passe incorrect"), k(!1);
            return;
          }
          e({
            id: d.id,
            email: d.email,
            prenom: d.prenom,
            nom: d.nom,
            token: "demo_" + d.id
          });
        } else {
          let d = await Ii.signIn(cleanEmail, a.pw),
            h = d.error?.message || d.msg || "",
            w = d.error_code || d.error?.status || "";
          if (h.includes("confirmed") || String(w).includes("email_not_confirmed")) {
            await fetch("/api/admin-write", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                operation: "register_or_update_client",
                email: cleanEmail,
                password: a.pw
              })
            }).catch(() => {});
            d = await Ii.signIn(cleanEmail, a.pw);
            h = d.error?.message || d.msg || "";
            w = d.error_code || d.error?.status || "";
          }
          if (h || w) {
            h.includes("Invalid") || String(w).includes("invalid_credentials") ? p("Email ou mot de passe incorrect. Si vous avez oublié votre mot de passe ou n'en avez pas encore, cliquez sur « Mot de passe oublié / Créer un accès » ci-dessous.") : p("Erreur : " + (h || w)), k(!1);
            return;
          }
          let B = d.session?.access_token || d.access_token,
            M = d.user || d.session?.user;
          if (!B || !M) {
            p("Email ou mot de passe incorrect."), k(!1);
            return;
          }
          let Y = M?.user_metadata || {},
            O = [],
            L = [];
          try {
            let de = await adminGet("profiles", `id=eq.${M.id}&select=client_files,guests`);
            Array.isArray(de) && de[0] && (O = de[0].client_files || [], L = de[0].guests || []);
          } catch {}
          // Store client JWT in activeSessionToken so Ki(j) uses it for all subsequent requests
          activeSessionToken = B;
          e({
            id: M.id,
            email: M.email,
            prenom: Y.prenom || "",
            nom: Y.nom || "",
            tel: Y.tel || "",
            token: B,
            client_files: O,
            guests: L
          });
        }
      } catch (d) {
        p("Erreur : " + d.message);
      }
      k(!1);
    },
    m = async () => {
      let cleanEmail = (a.email || "").trim();
      if (n === "register" && (!a.prenom || !a.nom || !cleanEmail || !a.pw)) {
        p("Tous les champs marqu\xE9s * sont requis");
        return;
      }
      if (n === "reset" && (!cleanEmail || !a.pw)) {
        p("Veuillez renseigner votre email et votre nouveau mot de passe");
        return;
      }
      if (a.pw.length < 6) {
        p("Mot de passe : 6 caract\xE8res minimum");
        return;
      }
      if (!cleanEmail.match(/^[^@]+@[^@]+\.[^@]+$/)) {
        p("Adresse email invalide");
        return;
      }
      k(!0), p("");
      try {
        if (ee) {
          let existingDemo = ue.users.find(h => h.email === cleanEmail);
          if (existingDemo) {
            existingDemo.pw = a.pw;
            e({
              id: existingDemo.id,
              email: existingDemo.email,
              prenom: existingDemo.prenom,
              nom: existingDemo.nom,
              token: "demo_" + existingDemo.id
            });
            k(!1);
            return;
          }
          let d = {
            id: Ln(),
            email: cleanEmail,
            pw: a.pw,
            prenom: a.prenom,
            nom: a.nom,
            tel: a.tel,
            created_at: it(0)
          };
          ue.users.push(d), e({
            id: d.id,
            email: d.email,
            prenom: d.prenom,
            nom: d.nom,
            token: "demo_" + d.id
          });
        } else {
          let d = S && r && u ? `${S}-${r}-${u}` : null;
          let regRes = await fetch("/api/admin-write", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              operation: "register_or_update_client",
              email: cleanEmail,
              password: a.pw,
              meta: {
                prenom: a.prenom ? a.prenom.trim() : "",
                nom: a.nom ? a.nom.trim() : "",
                tel: a.tel ? a.tel.trim() : "",
                dob: d
              }
            })
          }).then(res => res.json()).catch(() => null);

          if (!regRes || regRes.error) {
            p("Erreur : " + (regRes?.error || "Impossible d'enregistrer le compte."));
            k(!1);
            return;
          }

          let signRes = await Ii.signIn(cleanEmail, a.pw),
            O = signRes.session?.access_token || signRes.access_token,
            Y = signRes.user || signRes.session?.user;
          if (!O || !Y) {
            p("Compte activé ! Vous pouvez maintenant vous connecter.");
            l("login"), k(!1);
            return;
          }
          let L = Y?.user_metadata || {},
            files = [],
            guests = [];
          try {
            let de = await adminGet("profiles", `id=eq.${Y.id}&select=client_files,guests`);
            Array.isArray(de) && de[0] && (files = de[0].client_files || [], guests = de[0].guests || []);
          } catch {}
          activeSessionToken = O;
          e({
            id: Y.id,
            email: Y.email,
            prenom: L.prenom || regRes.prenom || a.prenom || "",
            nom: L.nom || regRes.nom || a.nom || "",
            tel: L.tel || regRes.tel || a.tel || "",
            token: O,
            client_files: files,
            guests
          });
        }
      } catch {
        p("Erreur r\xE9seau. V\xE9rifiez votre connexion.");
      }
      k(!1);
    };
  return n === "confirm" ? _jsx("div", {
    style: {
      maxWidth: 420,
      margin: "40px auto",
      padding: "0 20px 60px"
    },
    children: _jsxs("div", {
      style: {
        background: "#fff",
        borderRadius: 24,
        padding: "36px 32px",
        boxShadow: "0 8px 40px rgba(21,101,192,.12)",
        textAlign: "center"
      },
      children: [_jsx("div", {
        style: {
          fontSize: 48,
          marginBottom: 16
        },
        children: "\u{1F4E7}"
      }), _jsx("h3", {
        style: {
          fontFamily: "'Playfair Display',serif",
          fontSize: 18,
          color: z,
          marginBottom: 10
        },
        children: "V\xE9rifiez vos emails !"
      }), _jsxs("p", {
        style: {
          fontSize: 13,
          color: "#546E7A",
          lineHeight: 1.7,
          marginBottom: 20
        },
        children: ["Un lien de confirmation a \xE9t\xE9 envoy\xE9 \xE0 ", _jsx("strong", {
          children: a.email
        }), ".", _jsx("br", {}), "Cliquez sur le lien dans l'email, puis revenez vous connecter."]
      }), _jsx(ze, {
        onClick: () => {
          l("login"), p("");
        },
        style: {
          width: "100%"
        },
        children: "\u2192 Se connecter"
      })]
    })
  }) : _jsx("div", {
    style: {
      maxWidth: 420,
      margin: "40px auto",
      padding: "0 20px 60px"
    },
    children: _jsxs("div", {
      style: {
        background: "#fff",
        borderRadius: 24,
        padding: "36px 32px",
        boxShadow: "0 8px 40px rgba(21,101,192,.12)"
      },
      children: [_jsxs("div", {
        style: {
          textAlign: "center",
          marginBottom: 24
        },
        children: [_jsx("div", {
          style: {
            fontSize: 36,
            marginBottom: 8
          },
          children: "\u2697\uFE0F"
        }), _jsx("h2", {
          style: {
            fontFamily: "'Playfair Display',serif",
            fontSize: 22,
            color: z,
            marginBottom: 6
          },
          children: "Espace Client"
        }), _jsxs("p", {
          style: {
            color: "#78909C",
            fontSize: 12
          },
          children: [ye.name, " \u2013 ", ye.sub]
        })]
      }), _jsx("div", {
        style: {
          display: "flex",
          background: "#F0F4FF",
          borderRadius: 12,
          padding: 4,
          marginBottom: 24
        },
        children: [["login", "Se connecter"], ["register", "Cr\xE9er un compte"]].map(([d, h]) => _jsx("button", {
          onClick: () => {
            l(d), p("");
          },
          style: {
            flex: 1,
            padding: "9px",
            border: "none",
            borderRadius: 9,
            background: n === d ? "#fff" : "transparent",
            color: n === d ? q : "#90A4AE",
            fontWeight: n === d ? 700 : 500,
            fontSize: 13,
            boxShadow: n === d ? "0 2px 8px rgba(0,0,0,.08)" : "none"
          },
          children: h
        }, d))
      }), ee && n === "login" && _jsx("div", {
        style: {
          background: "#E8F5E9",
          borderRadius: 10,
          padding: "10px 14px",
          marginBottom: 16,
          fontSize: 12,
          color: "#2E7D32"
        },
        children: "\u{1F3AD} D\xE9mo : sophie.martin@email.fr / demo123"
      }), n === "register" && _jsxs("div", {
        style: {
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 10
        },
        children: [_jsx(Ie, {
          label: "Pr\xE9nom *",
          children: _jsx(ut, {
            value: a.prenom,
            onChange: Q("prenom"),
            placeholder: "Marie"
          })
        }), _jsx(Ie, {
          label: "Nom *",
          children: _jsx(ut, {
            value: a.nom,
            onChange: Q("nom"),
            placeholder: "Dupont"
          })
        })]
      }), n === "register" && _jsx(Ie, {
        label: "Date de naissance *",
        children: _jsxs("div", {
          style: {
            display: "flex",
            gap: 8
          },
          children: [_jsxs("select", {
            value: u,
            onChange: d => s(d.target.value),
            style: {
              flex: 1,
              border: `1px solid ${V}`,
              borderRadius: 8,
              padding: "9px 8px",
              fontSize: 13,
              color: z,
              background: "#fff",
              outline: "none"
            },
            children: [_jsx("option", {
              value: "",
              children: "Jour"
            }), Array.from({
              length: 31
            }, (d, h) => h + 1).map(d => _jsx("option", {
              value: String(d).padStart(2, "0"),
              children: d
            }, d))]
          }), _jsxs("select", {
            value: r,
            onChange: d => v(d.target.value),
            style: {
              flex: 1.5,
              border: `1px solid ${V}`,
              borderRadius: 8,
              padding: "9px 8px",
              fontSize: 13,
              color: z,
              background: "#fff",
              outline: "none"
            },
            children: [_jsx("option", {
              value: "",
              children: "Mois"
            }), ["Janvier", "F\xE9vrier", "Mars", "Avril", "Mai", "Juin", "Juillet", "Ao\xFBt", "Septembre", "Octobre", "Novembre", "D\xE9cembre"].map((d, h) => _jsx("option", {
              value: String(h + 1).padStart(2, "0"),
              children: d
            }, h))]
          }), _jsxs("select", {
            value: S,
            onChange: d => E(d.target.value),
            style: {
              flex: 1.5,
              border: `1px solid ${V}`,
              borderRadius: 8,
              padding: "9px 8px",
              fontSize: 13,
              color: z,
              background: "#fff",
              outline: "none"
            },
            children: [_jsx("option", {
              value: "",
              children: "Ann\xE9e"
            }), Array.from({
              length: 96
            }, (d, h) => new Date().getFullYear() - h).map(d => _jsx("option", {
              value: String(d),
              children: d
            }, d))]
          })]
        })
      }), n === "register" && _jsx(Ie, {
        label: "T\xE9l\xE9phone",
        children: _jsx(ut, {
          value: a.tel,
          onChange: Q("tel"),
          placeholder: "06 12 34 56 78"
        })
      }), n === "reset" && _jsx("div", {
        style: {
          background: "#E8F0FE",
          borderRadius: 10,
          padding: "10px 14px",
          marginBottom: 14,
          fontSize: 12,
          color: "#1565C0",
          lineHeight: 1.5
        },
        children: "\u{1F511} Entrez l'adresse email de votre rendez-vous et choisissez un nouveau mot de passe (6 caract\xE8res min.) pour acc\xE9der imm\xE9diatement \xE0 votre espace personnel."
      }), _jsx(Ie, {
        label: "Email *",
        children: _jsx(ut, {
          type: "email",
          value: a.email,
          onChange: Q("email"),
          placeholder: "marie@email.com"
        })
      }), _jsx(Ie, {
        label: n === "reset" ? "Nouveau mot de passe * (6 car. min.)" : n === "register" ? "Mot de passe * (6 car. min.)" : "Mot de passe *",
        children: _jsx(ut, {
          type: "password",
          value: a.pw,
          onChange: Q("pw"),
          placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022"
        })
      }), g && _jsx("p", {
        style: {
          color: "#E53935",
          fontSize: 12,
          textAlign: "center",
          marginBottom: 12
        },
        children: g
      }), _jsx(ze, {
        onClick: n === "login" ? f : m,
        disabled: R,
        style: {
          width: "100%",
          marginBottom: 10
        },
        children: R ? "Chargement\u2026" : n === "login" ? "\u2192 Se connecter" : n === "reset" ? "\u2713 Valider mon nouveau mot de passe" : "\u2192 Cr\xE9er mon compte"
      }), n === "login" && _jsx("button", {
        onClick: () => {
          l("reset"), p("");
        },
        style: {
          background: "none",
          border: "none",
          color: "#1565C0",
          fontSize: 12,
          fontWeight: 600,
          cursor: "pointer",
          textDecoration: "underline",
          width: "100%",
          marginBottom: 8,
          padding: "4px 0"
        },
        children: "Mot de passe oubli\xE9 ou premier acc\xE8s ?"
      }), n === "reset" && _jsx("button", {
        onClick: () => {
          l("login"), p("");
        },
        style: {
          background: "none",
          border: "none",
          color: "#90A4AE",
          fontSize: 12,
          cursor: "pointer",
          textDecoration: "underline",
          width: "100%",
          marginBottom: 8,
          padding: "4px 0"
        },
        children: "\u2190 Retour \xE0 la connexion"
      }), _jsx(ot, {
        onClick: t,
        style: {
          width: "100%"
        },
        children: "\u2190 Retour"
      })]
    })
  });
}
function Tg({
  user: e,
  onUpdateUser: t,
  onBook: n,
  onLogout: l
}) {
  let [a, i] = useState([]),
    [u, s] = useState(!0),
    [r, v] = useState(""),
    [S, E] = useState("upcoming"),
    [g, p] = useState(!1),
    [R, k] = useState(""),
    [Q, f] = useState(""),
    [m, d] = useState(!1);
  let [clientNoteFiles, setClientNoteFiles] = useState([]);
  let [freshProfileFiles, setFreshProfileFiles] = useState(null);
  useEffect(() => {
    if (e?.id && !ee) {
      adminGet("profiles", `id=eq.${e.id}&select=client_files,guests`).then(profs => {
        if (Array.isArray(profs) && profs[0] && Array.isArray(profs[0].client_files)) {
          setFreshProfileFiles(profs[0].client_files);
        }
      }).catch(() => {});
      adminGet("admin_notes", `patient_id=eq.${e.id}&note=like.*FICHIER*`).then(notes => {
        if (Array.isArray(notes)) {
          let extracted = [];
          notes.forEach(n => {
            if (n.note && n.note.includes("FICHIER")) {
              try {
                let isFromAdmin = n.note.includes("FICHIER ADMIN");
                let sIdx = n.note.indexOf("{");
                let eIdx = n.note.lastIndexOf("}");
                if (sIdx !== -1 && eIdx !== -1) {
                  let fileObj = JSON.parse(n.note.substring(sIdx, eIdx + 1));
                  fileObj.uploaded_by = isFromAdmin ? "admin" : "client";
                  extracted.push({ ...fileObj, _note_id: n.id });
                }
              } catch(err) {}
            }
          });
          setClientNoteFiles(extracted);
        }
      }).catch(() => {});
    }
  }, [e?.id]);

  // Merge e.client_files (updated immediately by t() on upload) with freshProfileFiles (from DB on mount)
  // This ensures new uploads appear instantly AND DB files are always loaded
  let eMerged = e.client_files || [];
  let dbMerged = freshProfileFiles || [];
  let mergedProfileFiles = [...eMerged];
  let mergedNames = new Set(eMerged.map(f => f.name?.trim().toLowerCase()));
  dbMerged.forEach(f => {
    let k = f.name?.trim().toLowerCase();
    if (k && !mergedNames.has(k)) { mergedNames.add(k); mergedProfileFiles.push(f); }
  });

  let rawCombined = [...mergedProfileFiles, ...clientNoteFiles];
  let combinedFiles = [];
  let seenFileKeys = new Set();
  rawCombined.forEach(f => {
    if (!f || !f.name) return;
    let key = `${f.name.trim().toLowerCase()}_${f.date || ""}`;
    if (!seenFileKeys.has(key)) {
      seenFileKeys.add(key);
      combinedFiles.push(f);
    }
  });

  // adminFiles = everything NOT explicitly uploaded by a client (includes legacy files without uploaded_by)
  let adminFiles = combinedFiles.filter(C => C.uploaded_by !== "client");
  let clientFiles = combinedFiles.filter(C => C.uploaded_by === "client");
  let [busyAppts, setBusyAppts] = useState([]),
    [busyBlocked, setBusyBlocked] = useState([]),
    [modSaving, setModSaving] = useState(!1),
    [modError, setModError] = useState("");
  useEffect(() => {
    (async () => {
      s(!0);
      let C = [];
      try {
        let cleanEmail = (e.email || "").trim();
        if (ee) {
          C = ue.appointments.filter(W => W.patient_id === e.id || (W.patient_email || "").toLowerCase() === cleanEmail.toLowerCase());
          setBusyAppts(ue.appointments);
        } else {
          let [W, le, busyRes] = await Promise.all([
              adminGet("appointments", `patient_id=eq.${e.id}&status=neq.archived&order=rdv_date.desc`),
              cleanEmail ? adminGet("appointments", `patient_email=ilike.${encodeURIComponent(cleanEmail)}&status=neq.archived&order=rdv_date.desc`) : Promise.resolve([]),
              fetch("/api/get-busy-slots").then(res => res.json()).catch(() => ({}))
            ]),
            Ne = [...(Array.isArray(W) ? W : []), ...(Array.isArray(le) ? le : [])],
            De = new Set();
          C = Ne.filter(st => De.has(st.id) ? !1 : (De.add(st.id), !0)), C.sort((st, ke) => (ke.rdv_date || "").localeCompare(st.rdv_date || ""));
          if (Array.isArray(busyRes?.appointments)) setBusyAppts(busyRes.appointments);
          if (Array.isArray(busyRes?.blockedSlots)) setBusyBlocked(busyRes.blockedSlots);
        }
      } catch (W) {
        console.error("Patient RDV load error:", W);
      }
      i(C), s(!1);
    })();
  }, [e.id]);
  let h = async () => {
      if (R.trim().toLowerCase() !== e.email.toLowerCase()) {
        f("L'email ne correspond pas. Veuillez r\xE9essayer.");
        return;
      }
      d(!0);
      try {
        ee ? (ue.appointments = ue.appointments.filter(C => C.patient_email !== e.email), ue.questionnaires = ue.questionnaires.filter(C => C.patient_email !== e.email), ue.notes.push({
          id: Math.random().toString(36).slice(2),
          patient_id: e.id,
          note: `\u{1F534} COMPTE SUPPRIM\xC9 PAR LE CLIENT \u2014 ${e.email} a demand\xE9 la suppression le ${new Date().toLocaleDateString("fr-FR")}.`,
          created_at: new Date().toISOString()
        })) : (await fetch("/api/admin-write", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            operation: "delete_patient",
            patientId: e.id,
            email: e.email
          })
        }), await adminPost("admin_notes", {
          patient_id: e.id,
          note: `\u{1F534} COMPTE SUPPRIM\xC9 PAR LE CLIENT \u2014 ${e.prenom} ${e.nom} (${e.email}) a demand\xE9 la suppression de son compte le ${new Date().toLocaleDateString("fr-FR")}.`,
          created_at: new Date().toISOString()
        })), d(!1), p(!1), l(), alert("Votre compte a bien \xE9t\xE9 supprim\xE9. Vos identifiants de connexion seront d\xE9finitivement effac\xE9s sous 48h par VITASCIENZELAB.");
      } catch (C) {
        console.error(C), f("Erreur lors de la suppression. Contactez contact@herboristeriechampenoise.com"), d(!1);
      }
    },
    w = async C => {
      if (window.confirm("Confirmer l'annulation de cette s\xE9ance ?")) {
        if (ee) {
          let W = ue.appointments.find(le => le.id === C.id);
          W && (W.status = "cancelled");
        } else if (C.id && (C.id.startsWith("RDV_PREP_") || C.id.startsWith("RDV_BERTHAUX_"))) {
          await adminDelete("appointments", C.id);
        } else {
          await adminPatch("appointments", C.id, {
            status: "cancelled"
          });
        }
        i(W => W.filter(le => le.id !== C.id)), await jn(e.email, "\u274C S\xE9ance annul\xE9e \u2014 VITASCIENZELAB", `<div style="font-family:sans-serif;padding:20px;max-width:500px">
        <h2 style="color:#C62828">S\xE9ance annul\xE9e</h2>
        <p>Votre s\xE9ance du <strong>${vt(C.rdv_date)}</strong> \xE0 <strong>${C.slot}</strong> a bien \xE9t\xE9 annul\xE9e.</p>
        <p style="color:#546E7A">Pour reprendre rendez-vous : <a href="https://vitascienzelab.vercel.app">vitascienzelab.vercel.app</a></p>
        <p style="font-size:11px;color:#90A4AE;margin-top:20px">VITASCIENZELAB \u2013 SIRET : 841 057 730 00019</p>
      </div>`), ee || adminPost("admin_notes", {
          patient_id: e?.id || "unknown",
          note: `\u{1F4F1} ANNULATION CLIENT \u2014 ${e?.prenom || ""} ${e?.nom || ""} (${e?.email}) a annul\xE9 sa s\xE9ance du ${Ke(C.rdv_date)} \xE0 ${C.slot} (${C.service_title}).`,
          created_at: new Date().toISOString()
        });
      }
    },
    [B, M] = useState(null),
    [Y, O] = useState(""),
    [L, de] = useState(""),
    gt = useRef(null),
    [Oe, Ce] = useState(null),
    yl = useRef(null),
    qt = async () => {
      if (!Y || !L || !B) return;
      setModSaving(!0), setModError("");
      let oldDate = B.rdv_date,
        oldSlot = B.slot,
        C = {
          rdv_date: Y,
          slot: L,
          ...(e?.id && !String(e.id).includes("@") ? { patient_id: e.id } : {})
        };
      try {
        if (ee) {
          let le = ue.appointments.find(Ne => Ne.id === B.id);
          le && Object.assign(le, C);
        } else {
          let patchRes = await adminPatch("appointments", B.id, { ...C, _check_conflict: !0 });
          if (!patchRes || patchRes.error) {
            setModError("Erreur lors de la modification : " + (patchRes?.error || "Veuillez r\xE9essayer."));
            setModSaving(!1);
            return;
          }
          adminPost("admin_notes", {
            patient_id: e?.id || B.patient_id || "unknown",
            note: `\u{1F4F1} MODIFICATION CLIENT \u2014 ${e?.prenom || ""} ${e?.nom || ""} (${e?.email || B.patient_email}) a modifi\xE9 sa s\xE9ance du ${Ke(oldDate)} (${oldSlot}) au ${Ke(Y)} \xE0 ${L} (${B.service_title}).`,
            created_at: new Date().toISOString()
          }).catch(() => {});
        }
        i(le => le.map(Ne => Ne.id === B.id ? {
          ...Ne,
          ...C
        } : Ne));
        setBusyAppts(prev => prev.map(Ne => Ne.id === B.id ? {
          ...Ne,
          ...C
        } : Ne));
        let W = {
          ...B,
          ...C
        };
        jn(e.email || B.patient_email, "\u{1F4C5} S\xE9ance modifi\xE9e \u2014 VITASCIENZELAB", Ji(W, "confirm")).catch(() => {});
        setModSaving(!1), M(null), O(""), de("");
        alert(`\u2705 Votre rendez-vous a bien \xE9t\xE9 modifi\xE9 au ${vt(Y)} \xE0 ${L} !`);
      } catch (err) {
        console.error("Error modifying RDV:", err);
        setModError("Erreur r\xE9seau. Veuillez r\xE9essayer.");
        setModSaving(!1);
      }
    },
    Wt = a.filter(C => !at(C) && C.status === "confirmed"),
    It = a.filter(C => at(C) || C.status === "completed" || C.status === "cancelled"),
    Ll = S === "upcoming" ? Wt : It,
    Ha = C => C === "confirmed" ? _jsx(We, {
      bg: "#E8F5E9",
      color: "#2E7D32",
      children: "\u2713 Confirm\xE9"
    }) : C === "cancelled" ? _jsx(We, {
      bg: "#FCE4EC",
      color: "#C62828",
      children: "\u2717 Annul\xE9"
    }) : C === "completed" ? _jsx(We, {
      bg: "#EDE7F6",
      color: "#4527A0",
      children: "\u2713 Effectu\xE9"
    }) : null;
  return _jsxs("div", {
    style: {
      maxWidth: 700,
      margin: "0 auto",
      padding: "28px 20px 60px"
    },
    children: [Oe && _jsx("div", {
      style: {
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,.55)",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 16
      },
      children: _jsxs("div", {
        style: {
          background: "#fff",
          borderRadius: 20,
          padding: 28,
          maxWidth: 420,
          width: "100%",
          boxShadow: "0 8px 40px rgba(0,0,0,.15)"
        },
        children: [_jsx("h3", {
          style: {
            fontFamily: "'Playfair Display',serif",
            fontSize: 17,
            color: z,
            marginBottom: 6
          },
          children: "\u{1F4CE} Documents joints"
        }), _jsxs("p", {
          style: {
            fontSize: 12,
            color: "#78909C",
            marginBottom: 16
          },
          children: [Oe.service_title, " \xB7 ", Ke(Oe.rdv_date), " \xE0 ", Oe.slot]
        }), (Oe.docs || []).length === 0 ? _jsx("p", {
          style: {
            fontSize: 13,
            color: "#90A4AE",
            textAlign: "center",
            padding: "20px 0"
          },
          children: "Aucun document joint pour l'instant."
        }) : (Oe.docs || []).map((C, W) => _jsxs("div", {
          style: {
            display: "flex",
            alignItems: "center",
            gap: 10,
            background: "#F3E5F5",
            borderRadius: 8,
            padding: "10px 12px",
            marginBottom: 8
          },
          children: [_jsx("span", {
            style: {
              fontSize: 18
            },
            children: "\u{1F4C4}"
          }), _jsx("span", {
            style: {
              flex: 1,
              fontSize: 13,
              color: "#6A1B9A",
              fontWeight: 600,
              wordBreak: "break-all"
            },
            children: C
          }), _jsx("button", {
            onClick: async () => {
              if (!window.confirm(`Supprimer "${C}" ?`)) return;
              let le = (Oe.docs || []).filter((st, ke) => ke !== W),
                Ne = (Oe.docs_data || []).filter((st, ke) => ke !== W),
                De = {
                  ...Oe,
                  docs: le,
                  docs_data: Ne
                };
              Ce(De), i(st => st.map(ke => ke.id === Oe.id ? De : ke));
              ee || (await adminPatch("appointments", Oe.id, {
                docs: le,
                docs_data: Ne
              }).catch(() => {}));
            },
            style: {
              background: "#FCE4EC",
              border: "none",
              color: "#C62828",
              borderRadius: 8,
              padding: "5px 10px",
              fontSize: 12,
              fontWeight: 600,
              cursor: "pointer"
            },
            children: "\u{1F5D1} Supprimer"
          })]
        }, W)), _jsx("input", {
          ref: yl,
          type: "file",
          multiple: !0,
          accept: ".pdf,.jpg,.jpeg,.png,.doc,.docx",
          style: {
            display: "none"
          },
          onChange: async C => {
            let W = Array.from(C.target.files);
            if (!W.length) return;
            try {
              let processed = await Promise.all(W.map(De => compressAndReadFile(De, e?.id || "client")));
              let le = {
                ...Oe,
                docs: [...(Oe.docs || []), ...processed.map(f => f.name)],
                docs_data: [...(Oe.docs_data || []), ...processed.map(f => ({
                  name: f.name,
                  type: f.type,
                  data: f.data,
                  storage_path: f.storage_path || null
                }))]
              };
              Ce(le), i(vl => vl.map(Ut => Ut.id === Oe.id ? le : Ut));
              ee || (await adminPatch("appointments", Oe.id, {
                docs: le.docs,
                docs_data: le.docs_data
              }).catch(() => {}));
            } catch (err) {
              alert(err.message || "Erreur lors de l'envoi du document.");
            } finally {
              C.target.value = "";
            }
          }
        }), _jsx("button", {
          onClick: () => yl.current?.click(),
          style: {
            background: V,
            border: `1px dashed ${q}`,
            color: q,
            borderRadius: 8,
            padding: "10px",
            fontSize: 13,
            cursor: "pointer",
            width: "100%",
            marginTop: 8,
            fontWeight: 600
          },
          children: "+ Ajouter un document"
        }), _jsx(ot, {
          onClick: () => Ce(null),
          style: {
            width: "100%",
            marginTop: 12
          },
          children: "Fermer"
        })]
      })
    }), B && _jsx("div", {
      style: {
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,.55)",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
        overflowY: "auto"
      },
      children: _jsxs("div", {
        style: {
          background: "#fff",
          borderRadius: 20,
          padding: "24px 20px",
          maxWidth: 480,
          width: "100%",
          maxHeight: "92vh",
          overflowY: "auto",
          boxShadow: "0 8px 40px rgba(0,0,0,.15)"
        },
        children: [_jsx("h3", {
          style: {
            fontFamily: "'Playfair Display',serif",
            fontSize: 18,
            color: z,
            marginBottom: 4
          },
          children: "Modifier votre s\xE9ance"
        }), _jsxs("p", {
          style: {
            fontSize: 12,
            color: "#78909C",
            marginBottom: 14
          },
          children: [B.service_icon, " ", B.service_title, " \xB7 Actuellement le ", Ke(B.rdv_date), " \xE0 ", B.slot]
        }), _jsxs("div", {
          style: {
            marginBottom: 14
          },
          children: [_jsx("label", {
            style: {
              display: "block",
              fontSize: 12,
              fontWeight: 600,
              color: z,
              marginBottom: 8
            },
            children: "1. Choisissez une nouvelle date"
          }), _jsx(_g, {
            selected: Y,
            onSelect: C => {
              O(C), setModError("");
            },
            blocked: busyBlocked
          })]
        }), Y && _jsxs("div", {
          style: {
            marginBottom: 18
          },
          children: [_jsxs("label", {
            style: {
              display: "block",
              fontSize: 12,
              fontWeight: 600,
              color: z,
              marginBottom: 8
            },
            children: ["2. Choisissez un cr\xE9neau pour le ", vt(Y)]
          }), _jsx("div", {
            style: {
              display: "grid",
              gridTemplateColumns: "repeat(3,1fr)",
              gap: 8
            },
            children: Je.map(C => {
              let [sh, sm] = C.split(":").map(Number),
                sMin = sh * 60 + sm,
                eMin = sMin + (yn[B.service_id] || 45),
                isBooked = busyAppts.filter(x => x.id !== B.id && x.rdv_date === Y && x.status === "confirmed").some(x => {
                  if (!x.slot || !x.slot.includes(":")) return !1;
                  let [bh, bm] = x.slot.split(":").map(Number),
                    bStart = bh * 60 + bm,
                    bEnd = bStart + (yn[x.service_id] || 45);
                  return sMin < bEnd && eMin > bStart;
                }),
                isBlocked = busyBlocked.some(x => x.blocked_date === Y && (!x.slot || x.slot === "" || x.slot === C)),
                unavail = isBooked || isBlocked;
              return _jsxs("button", {
                disabled: unavail,
                onClick: () => {
                  if (!unavail) {
                    de(C), setModError("");
                  }
                },
                style: {
                  padding: "10px 6px",
                  borderRadius: 9,
                  border: `2px solid ${unavail ? "#F0F0F0" : L === C ? q : V}`,
                  background: unavail ? "#FAFAFA" : L === C ? q : "#fff",
                  color: unavail ? "#CFD8DC" : L === C ? "#fff" : z,
                  fontWeight: 600,
                  fontSize: 13,
                  cursor: unavail ? "not-allowed" : "pointer"
                },
                children: [C, unavail && _jsx("div", {
                  style: {
                    fontSize: 9
                  },
                  children: isBlocked ? "\u{1F512}" : "Indispo."
                })]
              }, C);
            })
          })]
        }), modError && _jsx("p", {
          style: {
            color: "#E53935",
            fontSize: 12,
            textAlign: "center",
            marginBottom: 12
          },
          children: modError
        }), _jsxs("div", {
          style: {
            display: "flex",
            gap: 10
          },
          children: [_jsx(ot, {
            onClick: () => {
              M(null), setModError("");
            },
            style: {
              flex: 1
            },
            children: "Annuler"
          }), _jsx(ze, {
            onClick: qt,
            disabled: !Y || !L || modSaving,
            style: {
              flex: 2,
              opacity: Y && L && !modSaving ? 1 : 0.4
            },
            children: modSaving ? "Enregistrement\u2026" : "\u2713 Confirmer la modification"
          })]
        })]
      })
    }), g && _jsx("div", {
      style: {
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,.6)",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 16
      },
      children: _jsxs("div", {
        style: {
          background: "#fff",
          borderRadius: 20,
          padding: 32,
          maxWidth: 420,
          width: "100%",
          boxShadow: "0 8px 40px rgba(0,0,0,.15)"
        },
        children: [_jsxs("div", {
          style: {
            textAlign: "center",
            marginBottom: 20
          },
          children: [_jsx("div", {
            style: {
              fontSize: 40,
              marginBottom: 10
            },
            children: "\u26A0\uFE0F"
          }), _jsx("h3", {
            style: {
              fontFamily: "'Playfair Display',serif",
              fontSize: 18,
              color: "#C62828",
              marginBottom: 8
            },
            children: "Supprimer mon compte"
          }), _jsxs("p", {
            style: {
              fontSize: 13,
              color: "#546E7A",
              lineHeight: 1.7
            },
            children: ["Cette action supprimera toutes vos s\xE9ances et donn\xE9es de bien-\xEAtre.", _jsx("br", {}), _jsx("strong", {
              children: "Elle est irr\xE9versible."
            })]
          })]
        }), _jsx("div", {
          style: {
            background: "#FFF3E0",
            borderRadius: 10,
            padding: "12px 14px",
            marginBottom: 20,
            fontSize: 12,
            color: "#E65100",
            lineHeight: 1.6
          },
          children: "\u2139\uFE0F Votre demande sera notifi\xE9e \xE0 VITASCIENZELAB qui proc\xE8dera \xE0 la suppression d\xE9finitive de vos identifiants de connexion sous 48h."
        }), _jsx("p", {
          style: {
            fontSize: 12,
            color: "#78909C",
            marginBottom: 16,
            textAlign: "center"
          },
          children: "Confirmez votre email pour valider :"
        }), _jsx("input", {
          value: R,
          onChange: C => k(C.target.value),
          placeholder: e.email,
          style: {
            width: "100%",
            border: "2px solid #FFCDD2",
            borderRadius: 10,
            padding: "10px 12px",
            fontSize: 13,
            color: z,
            outline: "none",
            marginBottom: 16
          }
        }), Q && _jsx("p", {
          style: {
            color: "#E53935",
            fontSize: 12,
            textAlign: "center",
            marginBottom: 10
          },
          children: Q
        }), _jsxs("div", {
          style: {
            display: "flex",
            gap: 10
          },
          children: [_jsx(ot, {
            onClick: () => {
              p(!1), k(""), f("");
            },
            style: {
              flex: 1
            },
            children: "Annuler"
          }), _jsx("button", {
            onClick: h,
            disabled: m,
            style: {
              flex: 2,
              background: "linear-gradient(135deg,#C62828,#E53935)",
              color: "#fff",
              border: "none",
              borderRadius: 12,
              padding: "12px",
              fontSize: 14,
              fontWeight: 700,
              cursor: "pointer"
            },
            children: m ? "Suppression\u2026" : "Confirmer la suppression"
          })]
        })]
      })
    }), _jsxs("div", {
      style: {
        background: `linear-gradient(135deg,${z},${q})`,
        borderRadius: 20,
        padding: "22px 26px",
        marginBottom: 24,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 12
      },
      children: [_jsxs("div", {
        children: [_jsxs("div", {
          style: {
            fontFamily: "'Playfair Display',serif",
            fontSize: 20,
            color: "#fff"
          },
          children: ["Bonjour, ", e.prenom, " \u{1F44B}"]
        }), _jsx("div", {
          style: {
            fontSize: 12,
            color: "rgba(255,255,255,.7)"
          },
          children: e.email
        })]
      }), _jsxs("div", {
        style: {
          display: "flex",
          gap: 10,
          flexWrap: "wrap"
        },
        children: [_jsx(ze, {
          onClick: n,
          style: {
            fontSize: 13,
            padding: "9px 18px",
            background: "rgba(255,255,255,.25)",
            border: "1px solid rgba(255,255,255,.4)"
          },
          children: "+ Nouvelle s\xE9ance"
        }), _jsx("button", {
          onClick: l,
          style: {
            background: "rgba(255,255,255,.1)",
            border: "1px solid rgba(255,255,255,.2)",
            color: "rgba(255,255,255,.8)",
            borderRadius: 10,
            padding: "9px 14px",
            fontSize: 12
          },
          children: "D\xE9connexion"
        }), _jsx("button", {
          onClick: () => p(!0),
          style: {
            background: "rgba(220,53,69,.2)",
            border: "1px solid rgba(220,53,69,.4)",
            color: "#FFCDD2",
            borderRadius: 10,
            padding: "9px 14px",
            fontSize: 12
          },
          children: "\u{1F5D1} Supprimer mon compte"
        })]
      })]
    }), _jsx("div", {
      style: {
        display: "flex",
        gap: 10,
        marginBottom: 20
      },
      children: [["upcoming", `\xC0 venir (${Wt.length})`], ["history", `Historique (${It.length})`]].map(([C, W]) => _jsx("button", {
        onClick: () => E(C),
        style: {
          padding: "8px 18px",
          borderRadius: 20,
          border: `2px solid ${S === C ? q : "#E0E0E0"}`,
          background: S === C ? q : "#fff",
          color: S === C ? "#fff" : "#546E7A",
          fontSize: 13,
          fontWeight: 600
        },
        children: W
      }, C))
    }), u ? _jsx(Ag, {}) : Ll.length === 0 ? _jsx("div", {
      style: {
        textAlign: "center",
        padding: "40px 20px",
        color: "#90A4AE"
      },
      children: S === "upcoming" ? _jsxs(_Fragment, {
        children: [_jsx("div", {
          style: {
            fontSize: 40,
            marginBottom: 12
          },
          children: "\u{1F4C5}"
        }), _jsx("p", {
          style: {
            marginBottom: 16
          },
          children: "Aucune s\xE9ance \xE0 venir."
        }), _jsx(ze, {
          onClick: n,
          children: "R\xE9server une s\xE9ance"
        })]
      }) : _jsx("p", {
        children: "Aucun historique de s\xE9ance."
      })
    }) : Ll.map(C => _jsxs("div", {
      style: {
        background: "#fff",
        borderRadius: 16,
        padding: "18px 20px",
        marginBottom: 12,
        boxShadow: "0 2px 12px rgba(21,101,192,.06)",
        borderLeft: `4px solid ${C.status === "cancelled" ? "#FFCDD2" : at(C) ? "#B0BEC5" : q}`,
        opacity: C.status === "cancelled" ? 0.7 : 1
      },
      children: [_jsxs("div", {
        style: {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          flexWrap: "wrap",
          gap: 10
        },
        children: [_jsxs("div", {
          children: [_jsxs("div", {
            style: {
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 6,
              flexWrap: "wrap"
            },
            children: [_jsx("span", {
              style: {
                fontSize: 20
              },
              children: C.service_icon
            }), _jsx("span", {
              style: {
                fontFamily: "'Playfair Display',serif",
                fontSize: 16,
                color: z
              },
              children: C.service_title
            }), Ha(C.status), C.recurring && _jsx(We, {
              bg: "#FFF8E1",
              color: "#F57F17",
              children: "\u{1F501} Mensuel"
            })]
          }), _jsxs("div", {
            style: {
              fontSize: 13,
              color: "#546E7A"
            },
            children: ["\u{1F4C5} ", vt(C.rdv_date), " \xB7 \u{1F550} ", C.slot, " \xB7 \u23F1 ", C.service_dur]
          }), C.docs?.length > 0 && _jsx("div", {
            style: {
              marginTop: 8,
              display: "flex",
              gap: 6,
              flexWrap: "wrap"
            },
            children: C.docs.map(W => _jsxs(We, {
              bg: "#F3E5F5",
              color: "#6A1B9A",
              children: ["\u{1F4CE} ", W]
            }, W))
          })]
        }), C.status === "confirmed" && !at(C) && _jsxs("div", {
          style: {
            display: "flex",
            gap: 8,
            flexWrap: "wrap"
          },
          children: [_jsx("button", {
            onClick: () => {
              M(C), O(C.rdv_date), de(C.slot);
            },
            style: {
              background: V,
              border: "none",
              color: q,
              borderRadius: 8,
              padding: "7px 14px",
              fontSize: 12,
              fontWeight: 600,
              cursor: "pointer"
            },
            children: "\u270F\uFE0F Modifier"
          }), _jsx("button", {
            onClick: () => Ce(C),
            style: {
              background: "#F3E5F5",
              border: "none",
              color: "#6A1B9A",
              borderRadius: 8,
              padding: "7px 14px",
              fontSize: 12,
              fontWeight: 600,
              cursor: "pointer"
            },
            children: "\u{1F4CE} Documents"
          }), _jsx("button", {
            onClick: () => w(C),
            style: {
              background: "#FCE4EC",
              border: "none",
              color: "#C62828",
              borderRadius: 8,
              padding: "7px 14px",
              fontSize: 12,
              fontWeight: 600,
              cursor: "pointer"
            },
            children: "\u2717 Annuler"
          })]
        })]
      }), C.status === "confirmed" && !at(C) && _jsx("div", {
        style: {
          marginTop: 10,
          padding: "10px 12px",
          background: "#FFF8E1",
          borderRadius: 8,
          fontSize: 12,
          color: "#E65100"
        },
        children: "\u{1F4CE} N'oubliez pas d'apporter votre liste de compl\xE9ments alimentaires et produits naturels actuels si vous en prenez."
      })]
    }, C.id)), _jsx("div", {
      style: {
        maxWidth: 560,
        margin: "16px auto 0",
        padding: "0 20px"
      },
      children: _jsxs("div", {
        style: {
          background: "#fff",
          borderRadius: 16,
          padding: 20,
          boxShadow: "0 2px 12px rgba(21,101,192,.08)",
          marginBottom: 12
        },
        children: [_jsx("h4", {
          style: {
            fontFamily: "'Playfair Display',serif",
            fontSize: 15,
            color: z,
            marginBottom: 6
          },
          children: "\u{1F468}\u200D\u{1F469}\u200D\u{1F467} Famille & Proches"
        }), _jsx("p", {
          style: {
            fontSize: 11,
            color: "#78909C",
            marginBottom: 12
          },
          children: "Ajoutez vos proches pour r\xE9server une s\xE9ance en leur nom."
        }), (e?.guests || []).length === 0 && _jsx("p", {
          style: {
            fontSize: 12,
            color: "#B0BEC5",
            textAlign: "center",
            padding: "8px 0"
          },
          children: "Aucun proche ajout\xE9."
        }), (e?.guests || []).map((C, W) => _jsxs("div", {
          style: {
            display: "flex",
            alignItems: "center",
            gap: 8,
            background: "#F0F4FF",
            borderRadius: 8,
            padding: "8px 12px",
            marginBottom: 6
          },
          children: [_jsx("span", {
            style: {
              fontSize: 16
            },
            children: "\u{1F464}"
          }), _jsx("span", {
            style: {
              flex: 1,
              fontSize: 13,
              fontWeight: 600,
              color: z
            },
            children: C.name
          }), _jsx("button", {
            onClick: async () => {
              if (!window.confirm(`Retirer "${C.name}" ?`)) return;
              let le = (e.guests || []).filter((Ne, De) => De !== W);
              t({
                ...e,
                guests: le
              });
              ee || (await adminPatch("profiles", e.id, {
                guests: le
              }).catch(() => {}));
            },
            style: {
              background: "#FCE4EC",
              border: "none",
              color: "#C62828",
              borderRadius: 7,
              padding: "5px 8px",
              fontSize: 11,
              cursor: "pointer"
            },
            children: "\u{1F5D1}"
          })]
        }, W)), _jsxs("div", {
          style: {
            display: "flex",
            gap: 8,
            marginTop: 10
          },
          children: [_jsx(ut, {
            value: r,
            onChange: C => v(C.target.value),
            placeholder: "Pr\xE9nom Nom du proche\u2026",
            onKeyDown: async C => {
              if (C.key === "Enter" && r.trim()) {
                let W = [...(e.guests || []), {
                  name: r.trim()
                }];
                t({
                  ...e,
                  guests: W
                }), v("");
                ee || (await adminPatch("profiles", e.id, {
                  guests: W
                }).catch(() => {}));
              }
            }
          }), _jsx(ze, {
            onClick: async () => {
              if (!r.trim()) return;
              let C = [...(e.guests || []), {
                name: r.trim()
              }];
              t({
                ...e,
                guests: C
              }), v("");
              ee || (await adminPatch("profiles", e.id, {
                guests: C
              }).catch(() => {}));
            },
            style: {
              padding: "10px 16px",
              fontSize: 13
            },
            children: "+ Ajouter"
          })]
        })]
      })
    }), _jsx("div", {
      style: {
        maxWidth: 560,
        margin: "16px auto 0",
        padding: "0 20px"
      },
      children: _jsxs("div", {
        style: {
          background: "#fff",
          borderRadius: 16,
          padding: 20,
          boxShadow: "0 2px 12px rgba(21,101,192,.08)"
        },
        children: [
          _jsx("h4", {
            style: {
              fontFamily: "'Playfair Display',serif",
              fontSize: 15,
              color: "#6A1B9A",
              marginBottom: 6
            },
            children: "⬇️ Documents reçus de VitaScienzeLab"
          }),
          _jsx("p", {
            style: {
              fontSize: 11,
              color: "#78909C",
              marginBottom: 10
            },
            children: "Factures, protocoles et documents transmis par VITASCIENZELAB."
          }),
          adminFiles.length === 0 ? _jsx("p", {
            style: {
              fontSize: 12,
              color: "#B0BEC5",
              textAlign: "center",
              padding: "10px 0"
            },
            children: "Aucun document disponible pour l'instant."
          }) : adminFiles.map((C, W) => _jsxs("div", {
            style: {
              display: "flex",
              alignItems: "center",
              gap: 10,
              background: "#F3E5F5",
              borderRadius: 8,
              padding: "10px 12px",
              marginBottom: 6
            },
            children: [
              _jsx("span", {
                style: {
                  fontSize: 20
                },
                children: C.type?.includes("pdf") ? "📕" : C.type?.includes("image") ? "🖼️" : "📄"
              }),
              _jsxs("div", {
                style: {
                  flex: 1
                },
                children: [
                  _jsx("div", {
                    style: {
                      fontSize: 13,
                      fontWeight: 600,
                      color: "#6A1B9A"
                    },
                    children: C.name
                  }),
                  _jsx("div", {
                    style: {
                      fontSize: 10,
                      color: "#90A4AE"
                    },
                    children: C.date
                  })
                ]
              }),
              C.data && _jsx("button", {
                onClick: () => downloadBase64File(C.data, C.name),
                style: {
                  background: "#6A1B9A",
                  color: "#fff",
                  borderRadius: 8,
                  padding: "7px 14px",
                  fontSize: 12,
                  fontWeight: 600,
                  border: "none",
                  cursor: "pointer"
                },
                children: "⬇️ Télécharger"
              })
            ]
          }, W)),
          _jsx("hr", {
            style: {
              border: "none",
              borderTop: "1px solid #E0E0E0",
              margin: "20px 0"
            }
          }),
          _jsx("h4", {
            style: {
              fontFamily: "'Playfair Display',serif",
              fontSize: 15,
              color: "#00695C",
              marginBottom: 6
            },
            children: "⬆️ Mes documents partagés"
          }),
          _jsx("p", {
            style: {
              fontSize: 11,
              color: "#78909C",
              marginBottom: 10,
              lineHeight: "1.4"
            },
            children: "Déposez ici vos documents (analyses, ordonnances, comptes rendus…) pour faciliter votre suivi bien-être. Partage sécurisé et confidentiel à titre informatif (ne remplace pas un avis médical)."
          }),
          clientFiles.length === 0 ? _jsx("p", {
            style: {
              fontSize: 12,
              color: "#B0BEC5",
              textAlign: "center",
              padding: "10px 0",
              marginBottom: 12
            },
            children: "Vous n'avez partagé aucun document pour l'instant."
          }) : clientFiles.map((C, W) => _jsxs("div", {
            style: {
              display: "flex",
              alignItems: "center",
              gap: 10,
              background: "#E0F2F1",
              borderRadius: 8,
              padding: "10px 12px",
              marginBottom: 6
            },
            children: [
              _jsx("span", {
                style: {
                  fontSize: 20
                },
                children: C.type?.includes("pdf") ? "📕" : C.type?.includes("image") ? "🖼️" : "📄"
              }),
              _jsxs("div", {
                style: {
                  flex: 1
                },
                children: [
                  _jsx("div", {
                    style: {
                      fontSize: 13,
                      fontWeight: 600,
                      color: "#00695C"
                    },
                    children: C.name
                  }),
                  _jsx("div", {
                    style: {
                      fontSize: 10,
                      color: "#80CBC4"
                    },
                    children: C.date
                  })
                ]
              }),
              _jsxs("div", {
                style: {
                  display: "flex",
                  gap: 8
                },
                children: [
                  C.data && _jsx("button", {
                    onClick: () => downloadBase64File(C.data, C.name),
                    style: {
                      background: "#00695C",
                      color: "#fff",
                      borderRadius: 8,
                      padding: "7px 12px",
                      fontSize: 12,
                      fontWeight: 600,
                      border: "none",
                      cursor: "pointer"
                    },
                    children: "⬇️"
                  }),
                  _jsx("button", {
                    onClick: async () => {
                      if (!window.confirm(`Supprimer "${C.name}" ?`)) return;
                      const targetLower = (C.name || "").trim().toLowerCase();
                      const filterFn = f => f && (f.name || "").trim().toLowerCase() !== targetLower;
                      const remainingFiles = (e.client_files || []).filter(filterFn);
                      // Optimistic instant removal across all client file states (0ms)
                      t({
                        ...e,
                        client_files: remainingFiles
                      });
                      setFreshProfileFiles(prev => (prev || []).filter(filterFn));
                      setClientNoteFiles(prev => (prev || []).filter(filterFn));
                      try {
                        if (!ee) {
                          await fetch("/api/admin-write", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                              operation: "delete_client_file",
                              patientId: e.id,
                              fileName: C.name,
                              noteId: C._note_id || null,
                              storagePath: C.storage_path || null
                            })
                          });
                        }
                      } catch (err) {
                        console.error("Error deleting file:", err);
                      }
                    },
                    style: {
                      background: "#FFEBEE",
                      border: "none",
                      color: "#C62828",
                      borderRadius: 8,
                      padding: "7px 12px",
                      fontSize: 12,
                      cursor: "pointer"
                    },
                    children: "🗑️"
                  })
                ]
              })
            ]
          }, W)),
          _jsx("input", {
            type: "file",
            id: "clientSelfFileInput",
            multiple: true,
            accept: ".pdf,.jpg,.jpeg,.png,.doc,.docx,.xls,.xlsx",
            style: {
              display: "none"
            },
            onChange: async c => {
              const selectedFiles = Array.from(c.target.files);
              if (selectedFiles.length === 0) return;
              try {
                const processedFiles = await Promise.all(selectedFiles.map(file => compressAndReadFile(file, e.id)));
                const newFilesList = processedFiles.map(f => ({
                  name: f.name,
                  type: f.type,
                  size: f.size || 0,
                  data: f.data,
                  storage_path: f.storage_path || null,
                  date: new Date().toLocaleDateString("fr-FR"),
                  uploaded_by: "client",
                  is_new_for_admin: true
                }));
                const newNamesSet = new Set(newFilesList.map(f => (f.name || "").trim().toLowerCase()));
                const currentFiles = (e.client_files || []).filter(f => f && !newNamesSet.has((f.name || "").trim().toLowerCase()));
                const finalFiles = [...currentFiles, ...newFilesList];

                // Optimistic UI update immediately
                t({
                  ...e,
                  client_files: finalFiles
                });
                setFreshProfileFiles(finalFiles);

                if (!ee) {
                  const saveRes = await fetch("/api/admin-write", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      operation: "append_client_files",
                      patientId: e.id,
                      newFiles: newFilesList,
                      notePrefix: "📁 FICHIER CLIENT — "
                    })
                  }).then(r => r.json()).catch(() => null);

                  if (!saveRes || saveRes.error) {
                    console.error("Supabase client append_client_files failed:", saveRes);
                    alert("Erreur lors de la sauvegarde du fichier.");
                    return;
                  }

                  const clientFullName = `${e.prenom || ''} ${e.nom || ''}`.trim() || e.email;
                  const uploadedNames = newFilesList.map(f => f.name).join(", ");
                  adminPost("admin_notes", {
                    patient_id: e.id,
                    note: `📁 NOUVEAU FICHIER CLIENT — ${clientFullName} a déposé le(s) fichier(s) : ${uploadedNames}`,
                    created_at: new Date().toISOString()
                  }).catch(() => {});
                }

                alert(`✅ ${newFilesList.length} fichier(s) déposé(s) avec succès !`);
              } catch (err) {
                console.error("Client upload error:", err);
                alert(err.message || "Une erreur est survenue lors de l'enregistrement.");
              } finally {
                c.target.value = "";
              }
            }
          }),
          _jsx("button", {
            onClick: () => document.getElementById("clientSelfFileInput").click(),
            style: {
              background: "#E0F2F1",
              border: "1px dashed #004D40",
              color: "#004D40",
              borderRadius: 10,
              padding: "10px",
              fontSize: 12,
              cursor: "pointer",
              width: "100%",
              marginTop: 10,
              fontWeight: 600
            },
            children: "+ Déposer un document (PDF, analyses, ordonnances…)"
          })
        ]
      })
    })]
  });
}
const Lu = ["Service", "Date", "Cr\xE9neau", "Documents", "Vos infos", "Confirmation"];
function Bg({
  user: e,
  onDone: t
}) {
  let [n, l] = useState(0),
    [a, i] = useState(null),
    [u, s] = useState(""),
    [r, v] = useState(""),
    [S, E] = useState([]),
    [g, p] = useState(0),
    [R, k] = useState({}),
    [Q, f] = useState([]),
    [m, d] = useState([]);
  useEffect(() => {
    if (ee) {
      f(ue.appointments);
      return;
    }
    fetch("/api/get-busy-slots").then(res => res.json()).then(res => {
      Array.isArray(res.appointments) && f(res.appointments), Array.isArray(res.blockedSlots) && d(res.blockedSlots);
    }).catch(() => {});
  }, []);
  let [h, w] = useState(!1),
    [B, M] = useState({
      prenom: e?.prenom || "",
      nom: e?.nom || "",
      email: e?.email || "",
      tel: e?.tel || "",
      notes: "",
      supplements: [],
      suppInput: ""
    }),
    [Y, O] = useState(!1),
    [L, de] = useState({}),
    [gt, Oe] = useState(!1),
    [Ce, yl] = useState(null),
    [qt, Wt] = useState(!1),
    [It, Ll] = useState(""),
    [Ha, C] = useState(""),
    [W, le] = useState(""),
    [Ne, De] = useState(!1),
    [st, ke] = useState(!1),
    vl = useRef(),
    Ut = x => U => M(re => ({
      ...re,
      [x]: U.target.value
    })),
    ja = x => {
      let U = g + x;
      U >= Wi.length ? l(5) : U < 0 ? l(3) : p(U);
    },
    Pt = () => {
      let x = {};
      return B.prenom.trim() || (x.prenom = "Requis"), B.nom.trim() || (x.nom = "Requis"), B.email.match(/^[^@]+@[^@]+\.[^@]+$/) || (x.email = "Email invalide"), B.tel && B.tel.trim().length > 0 && B.tel.trim().length < 8 && (x.tel = "Num\xE9ro trop court"), Y || (x.consent = "Veuillez accepter les conditions"), de(x), Object.keys(x).length > 0 && (x.prenom || x.nom || x.email || x.tel) && l(4), Object.keys(x).length === 0;
    },
    hl = async () => {
      if (!Pt()) return;
      Oe(!0);
      let x = {
        id: ed(),
        patient_id: e?.id || null,
        patient_name: `${B.prenom} ${B.nom}`,
        patient_email: B.email,
        patient_tel: B.tel,
        service_id: a.id,
        service_title: a.title,
        service_icon: a.icon,
        service_dur: a.dur,
        rdv_date: u,
        slot: r,
        status: "confirmed",
        notes: B.notes,
        recurring: h,
        docs: S.map(U => U.name),
        docs_data: S.map(U => ({
          name: U.name,
          type: U.type,
          data: U.data
        })),
        supplements: B.supplements || [],
        reminder_sent: !1,
        created_at: new Date().toISOString()
      };
      try {
        if (ee) ue.appointments.push(x), Object.keys(R).length > 0 && ue.questionnaires.push({
          id: Ln(),
          appointment_id: x.id,
          patient_id: e?.id || null,
          patient_email: x.patient_email,
          responses: R,
          created_at: new Date().toISOString()
        });else {
          let U = {
            ...x,
            _check_conflict: !0
          };
          delete U.supplements, delete U.docs_data;
          let re = await adminPost("appointments", U);
          console.log("Save result:", re);
          if (!re || re.error || re.code) {
            throw new Error(re?.error || re?.message || "Database insert failed");
          }
          let savedRow = Array.isArray(re) ? re[0] : re;
          if (savedRow?.patient_id) {
            x.patient_id = savedRow.patient_id;
          }
          try {
            await adminPatch("appointments", x.id, {
              supplements: x.supplements || [],
              docs_data: x.docs_data || []
            });
          } catch (wt) {
            console.log("Extra fields not saved:", wt);
          }
          if (Object.keys(R).length > 0) {
            await adminPost("questionnaires", {
              appointment_id: x.id,
              patient_id: x.patient_id || e?.id || null,
              patient_email: x.patient_email,
              responses: R,
              created_at: new Date().toISOString()
            }).catch(() => {});
          }
        }
      } catch (U) {
        console.error("Booking error:", U), alert(U?.message && U.message.includes("créneau") ? U.message : "Erreur r\xE9seau lors de l'enregistrement du rendez-vous. Veuillez r\xE9essayer."), Oe(!1);
        return;
      }
      if (jn(x.patient_email, "\u2705 Votre s\xE9ance est confirm\xE9e \u2014 VITASCIENZELAB", Ji(x, "confirm")).catch(U => console.error("Email confirm error:", U)), !ee) {
        adminPost("admin_notes", {
          patient_id: x.patient_id || e?.id || "unknown",
          note: `\u{1F4F1} R\xC9SERVATION CLIENT \u2014 ${x.patient_name} (${x.patient_email}) a r\xE9serv\xE9 : ${x.service_title} le ${Ke(x.rdv_date)} \xE0 ${x.slot}.`,
          created_at: new Date().toISOString()
        }).catch(() => {});
        let U = `https://vitascienzelab.vercel.app?questionnaire=${x.id}`;
        jn(x.patient_email, "\u{1F4CB} Pr\xE9parez votre s\xE9ance VITASCIENZELAB (optionnel)", `<html><body style="font-family:Arial,sans-serif;padding:20px;background:#f4f4f4"><div style="max-width:500px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden"><div style="background:linear-gradient(135deg,#003891,#1565C0);padding:24px;text-align:center"><div style="font-size:28px">\u2697\uFE0F</div><div style="font-size:18px;color:#fff;font-weight:700;margin-top:6px">VITASCIENZELAB</div></div><div style="padding:24px"><h2 style="color:#1A237E;font-size:16px;margin-bottom:12px">\u{1F4CB} Questionnaire optionnel de pr\xE9paration</h2><p style="color:#546E7A;font-size:13px;line-height:1.7;margin-bottom:16px">Bonjour <strong>${x.patient_name?.split(" ")[0] || ""}</strong>,<br/>Pour pr\xE9parer au mieux votre s\xE9ance du <strong>${vt(x.rdv_date)}</strong> \xE0 <strong>${x.slot}</strong>, vous pouvez r\xE9pondre \xE0 quelques questions sur vos habitudes de vie. C'est <strong>enti\xE8rement facultatif</strong>.</p><div style="background:#FFF8E1;border-radius:8px;padding:12px;margin-bottom:16px;font-size:12px;color:#E65100">\u2139\uFE0F Ces informations servent uniquement \xE0 adapter notre s\xE9lection de compl\xE9ments. Aucun acte m\xE9dical.</div><a href="${U}" style="display:block;text-align:center;background:#1565C0;color:#fff;border-radius:10px;padding:12px;font-size:14px;font-weight:700;text-decoration:none;margin-bottom:12px">\u{1F4CB} Remplir le questionnaire (5 min)</a><p style="font-size:10px;color:#90A4AE;text-align:center">VITASCIENZELAB \xB7 SIRET 841 057 730 00019</p></div></div></body></html>`).catch(() => {});
      }
      if (!ee && e?.id && e.id.length > 20) try {
        let U = await adminGet("profiles", `id=eq.${e.id}&select=client_docs,all_supplements`);
        if (Array.isArray(U) && U[0]) {
          let re = U[0].client_docs || [],
            rt = (x.docs_data || []).map(wn => ({
              ...wn,
              from_rdv: x.rdv_date,
              from_slot: x.slot,
              patient_name: x.patient_name || ""
            })),
            wt = U[0].all_supplements || [],
            bl = (x.supplements || []).map(wn => ({
              name: wn,
              from_rdv: x.rdv_date,
              patient_name: x.patient_name || ""
            }));
          await adminPatch("profiles", e.id, {
            client_docs: [...re, ...rt],
            all_supplements: [...wt, ...bl]
          });
        }
      } catch (U) {
        console.error("Profile docs save:", U);
      }
      yl(x), Oe(!1);
    };
  return Ce ? _jsx("div", {
    style: {
      maxWidth: 540,
      margin: "40px auto",
      padding: "20px 20px 60px"
    },
    children: _jsxs("div", {
      style: {
        background: "#fff",
        borderRadius: 24,
        padding: "40px 32px",
        boxShadow: "0 8px 40px rgba(21,101,192,.12)",
        textAlign: "center"
      },
      children: [_jsx("div", {
        style: {
          width: 68,
          height: 68,
          borderRadius: "50%",
          background: "linear-gradient(135deg,#1565C0,#42A5F5)",
          margin: "0 auto 18px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 26,
          color: "#fff"
        },
        children: "\u2713"
      }), _jsx("h2", {
        style: {
          fontFamily: "'Playfair Display',serif",
          fontSize: 22,
          color: "#1A237E",
          marginBottom: 10
        },
        children: "S\xE9ance confirm\xE9e !"
      }), _jsxs("p", {
        style: {
          color: "#78909C",
          fontSize: 13,
          lineHeight: 1.7,
          marginBottom: 24
        },
        children: ["Email envoy\xE9 \xE0 ", _jsx("strong", {
          children: Ce.patient_email
        }), ".", _jsx("br", {}), "Rappel ", _jsx("strong", {
          children: "48h avant"
        }), " votre s\xE9ance."]
      }), _jsx("div", {
        style: {
          background: "#F0F4FF",
          borderRadius: 14,
          padding: 20,
          textAlign: "left",
          marginBottom: 20
        },
        children: [["Prestation", Ce.service_title], ["Date", vt(Ce.rdv_date)], ["Heure", Ce.slot], ["Dur\xE9e", Ce.service_dur]].map(([x, U]) => _jsxs("div", {
          style: {
            display: "flex",
            justifyContent: "space-between",
            padding: "8px 0",
            borderBottom: "1px solid #E8EEFF",
            fontSize: 13
          },
          children: [_jsx("span", {
            style: {
              color: "#78909C"
            },
            children: x
          }), _jsx("span", {
            style: {
              fontWeight: 700,
              color: "#1A237E"
            },
            children: U
          })]
        }, x))
      }), _jsx(ze, {
        onClick: t,
        style: {
          width: "100%",
          marginBottom: 12
        },
        children: e ? "Voir mes s\xE9ances \u2192" : "\u2190 Retour accueil"
      }), !e && qt !== "skip" && _jsxs("div", {
        style: {
          background: "#E8F0FE",
          borderRadius: 16,
          padding: "20px 24px",
          border: "1px solid #C5D8F8",
          textAlign: "left",
          marginTop: 4
        },
        children: [(!qt || qt === !1) && _jsxs("div", {
          children: [_jsxs("div", {
            style: {
              textAlign: "center",
              marginBottom: 10
            },
            children: [_jsx("div", {
              style: {
                fontSize: 22,
                marginBottom: 4
              },
              children: "\u{1F464}"
            }), _jsx("h4", {
              style: {
                fontFamily: "'Playfair Display',serif",
                fontSize: 14,
                color: "#1A237E",
                marginBottom: 4
              },
              children: "Cr\xE9er votre espace client ?"
            }), _jsx("p", {
              style: {
                fontSize: 12,
                color: "#546E7A",
                lineHeight: 1.5
              },
              children: "Retrouvez et g\xE9rez vos s\xE9ances \xE0 tout moment."
            })]
          }), _jsxs("div", {
            style: {
              display: "flex",
              gap: 10,
              marginTop: 10
            },
            children: [_jsx(ze, {
              onClick: () => Wt("form"),
              style: {
                flex: 2,
                fontSize: 12
              },
              children: "\u2705 Cr\xE9er mon compte"
            }), _jsx(ot, {
              onClick: () => Wt("skip"),
              style: {
                flex: 1,
                fontSize: 11
              },
              children: "Plus tard"
            })]
          })]
        }), qt === "done" && _jsxs("div", {
          style: {
            textAlign: "center"
          },
          children: [_jsx("div", {
            style: {
              fontSize: 28,
              marginBottom: 6
            },
            children: "\u{1F389}"
          }), _jsx("p", {
            style: {
              fontSize: 13,
              fontWeight: 700,
              color: "#1A237E"
            },
            children: "Compte cr\xE9\xE9 !"
          }), _jsx("p", {
            style: {
              fontSize: 12,
              color: "#546E7A",
              marginTop: 4
            },
            children: 'Connectez-vous depuis "Mon espace client".'
          })]
        }), qt === "form" && _jsxs("div", {
          children: [_jsx("h4", {
            style: {
              fontFamily: "'Playfair Display',serif",
              fontSize: 14,
              color: "#1A237E",
              marginBottom: 8
            },
            children: "Choisissez un mot de passe"
          }), _jsxs("p", {
            style: {
              fontSize: 11,
              color: "#546E7A",
              marginBottom: 10
            },
            children: ["Email : ", _jsx("strong", {
              children: Ce.patient_email
            })]
          }), _jsx(Ie, {
            label: "Mot de passe * (6 car. min.)",
            children: _jsx(ut, {
              type: "password",
              value: It,
              onChange: x => Ll(x.target.value),
              placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022"
            })
          }), _jsx(Ie, {
            label: "Confirmer *",
            children: _jsx(ut, {
              type: "password",
              value: Ha,
              onChange: x => C(x.target.value),
              placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022"
            })
          }), W && _jsx("p", {
            style: {
              color: "#E53935",
              fontSize: 12,
              marginBottom: 8
            },
            children: W
          }), _jsxs("div", {
            style: {
              display: "flex",
              gap: 10,
              marginTop: 8
            },
            children: [_jsx(ze, {
              onClick: async () => {
                if (!It || It.length < 6) {
                  le("Minimum 6 caract\xE8res");
                  return;
                }
                if (It !== Ha) {
                  le("Mots de passe diff\xE9rents");
                  return;
                }
                le("");
                try {
                  let regRes = await fetch("/api/admin-write", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      operation: "register_or_update_client",
                      email: (Ce.patient_email || "").trim(),
                      password: It,
                      meta: {
                        prenom: (Ce.patient_name || "").split(" ")[0] || "",
                        nom: (Ce.patient_name || "").split(" ").slice(1).join(" ") || "",
                        tel: Ce.patient_tel || ""
                      }
                    })
                  }).then(res => res.json()).catch(() => null);
                  if (!regRes || regRes.error) {
                    le(regRes?.error || "Erreur lors de la cr\xE9ation du compte");
                    return;
                  }
                  regRes.userId && (await adminPatch("appointments", Ce.id, {
                    patient_id: regRes.userId
                  }).catch(() => {})), Wt("done");
                } catch {
                  le("Erreur r\xE9seau");
                }
              },
              style: {
                flex: 2
              },
              children: "\u2192 Cr\xE9er"
            }), _jsx(ot, {
              onClick: () => Wt("skip"),
              style: {
                flex: 1
              },
              children: "Annuler"
            })]
          })]
        })]
      })]
    })
  }) : _jsxs("div", {
    children: [Ne && _jsx(td, {
      onClose: () => De(!1)
    }), _jsxs("div", {
      style: {
        background: `linear-gradient(135deg,${z},${q})`,
        padding: "10px 20px",
        display: "flex",
        alignItems: "center",
        gap: 10
      },
      children: [_jsxs("div", {
        onClick: t,
        style: {
          display: "flex",
          alignItems: "center",
          gap: 8,
          cursor: "pointer"
        },
        title: "\u2190 Retour \xE0 l'accueil",
        children: [_jsx("span", {
          style: {
            fontSize: 18
          },
          children: "\u2697\uFE0F"
        }), _jsx("span", {
          style: {
            fontFamily: "'Playfair Display',serif",
            fontSize: 13,
            color: "#fff",
            fontWeight: 700
          },
          children: "VITASCIENZELAB"
        })]
      }), _jsx("span", {
        style: {
          color: "rgba(255,255,255,.4)",
          marginLeft: 4
        },
        children: "\xB7"
      }), _jsx("span", {
        style: {
          fontSize: 11,
          color: "rgba(255,255,255,.6)"
        },
        children: "R\xE9servation"
      })]
    }), _jsx("div", {
      style: {
        background: "#fff",
        borderBottom: "1px solid #E3F0FF",
        padding: "0 20px"
      },
      children: _jsx("div", {
        style: {
          maxWidth: 800,
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          padding: "12px 0",
          overflowX: "auto",
          gap: 0
        },
        children: Lu.map((x, U) => _jsxs("div", {
          style: {
            display: "flex",
            alignItems: "center",
            flex: U < Lu.length - 1 ? 1 : "none"
          },
          children: [_jsxs("div", {
            style: {
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 3,
              flexShrink: 0
            },
            children: [_jsx("div", {
              style: {
                width: 26,
                height: 26,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: U < n || U === n ? q : "#E3F0FF",
                color: U <= n ? "#fff" : "#90A4AE",
                fontSize: 11,
                fontWeight: 700
              },
              children: U < n ? "\u2713" : U + 1
            }), _jsx("span", {
              style: {
                fontSize: 9,
                color: U <= n ? q : "#90A4AE",
                fontWeight: U === n ? 700 : 400,
                whiteSpace: "nowrap"
              },
              children: x
            })]
          }), U < Lu.length - 1 && _jsx("div", {
            style: {
              flex: 1,
              height: 2,
              background: U < n ? q : "#E3F0FF",
              margin: "0 4px 16px",
              minWidth: 8
            }
          })]
        }, x))
      })
    }), _jsxs("div", {
      style: {
        maxWidth: 800,
        margin: "0 auto",
        padding: "28px 20px 80px"
      },
      children: [n === 0 && _jsxs("div", {
        children: [_jsx("h2", {
          style: {
            fontFamily: "'Playfair Display',serif",
            fontSize: 22,
            color: z,
            marginBottom: 8
          },
          children: "Choisissez votre s\xE9ance"
        }), _jsxs("p", {
          style: {
            color: "#78909C",
            fontSize: 13,
            marginBottom: 20
          },
          children: [ye.owner, " \xB7 ", ye.role]
        }), _jsx("div", {
          style: {
            display: "flex",
            flexDirection: "column",
            gap: 12
          },
          children: $l.map(x => _jsxs("div", {
            onClick: () => {
              i(x), l(1);
            },
            style: {
              background: "#fff",
              borderRadius: 16,
              padding: "20px 22px",
              border: `2px solid ${a?.id === x.id ? q : V}`,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 16,
              boxShadow: "0 2px 12px rgba(21,101,192,.06)",
              transition: "all .2s"
            },
            children: [_jsx("div", {
              style: {
                fontSize: 32,
                minWidth: 40,
                textAlign: "center"
              },
              children: x.icon
            }), _jsxs("div", {
              style: {
                flex: 1
              },
              children: [_jsxs("div", {
                style: {
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 4,
                  flexWrap: "wrap"
                },
                children: [_jsx("span", {
                  style: {
                    fontFamily: "'Playfair Display',serif",
                    fontSize: 17,
                    color: z
                  },
                  children: x.title
                }), _jsx(We, {
                  children: x.dur
                })]
              }), _jsx("p", {
                style: {
                  color: "#90A4AE",
                  fontSize: 12,
                  lineHeight: 1.5
                },
                children: x.desc
              })]
            }), _jsx("span", {
              style: {
                color: q,
                fontSize: 20
              },
              children: "\u203A"
            })]
          }, x.id))
        })]
      }), n === 1 && _jsxs("div", {
        children: [_jsx("h2", {
          style: {
            fontFamily: "'Playfair Display',serif",
            fontSize: 22,
            color: z,
            marginBottom: 8
          },
          children: "Choisissez une date"
        }), _jsxs("p", {
          style: {
            color: "#78909C",
            fontSize: 13,
            marginBottom: 20
          },
          children: [a?.title, " \xB7 Les dimanches ne sont pas disponibles"]
        }), _jsx(_g, {
          selected: u,
          blocked: m,
          onSelect: x => {
            s(x), v("");
          }
        }), u && _jsxs("div", {
          style: {
            marginTop: 12,
            background: V,
            borderRadius: 10,
            padding: "12px 16px",
            fontSize: 14,
            fontWeight: 600,
            color: z
          },
          children: ["\u{1F4C5} ", vt(u)]
        }), _jsxs("div", {
          style: {
            display: "flex",
            justifyContent: "space-between",
            marginTop: 20,
            gap: 12
          },
          children: [_jsx(ot, {
            onClick: () => l(0),
            children: "\u2190 Retour"
          }), _jsx(ze, {
            onClick: () => l(2),
            disabled: !u,
            style: {
              opacity: u ? 1 : 0.4
            },
            children: "Continuer \u2192"
          })]
        })]
      }), n === 2 && _jsxs("div", {
        children: [_jsx("h2", {
          style: {
            fontFamily: "'Playfair Display',serif",
            fontSize: 22,
            color: z,
            marginBottom: 8
          },
          children: "Choisissez un cr\xE9neau"
        }), _jsxs("p", {
          style: {
            color: "#78909C",
            fontSize: 13,
            marginBottom: 20
          },
          children: [vt(u), " \xB7 ", a?.dur]
        }), _jsxs("div", {
          style: {
            background: "#fff",
            borderRadius: 16,
            padding: 22,
            boxShadow: "0 2px 20px rgba(21,101,192,.08)"
          },
          children: [_jsx("p", {
            style: {
              color: q,
              fontWeight: 700,
              fontSize: 11,
              marginBottom: 14,
              letterSpacing: 1
            },
            children: "\u{1F550} Cr\xE9neaux disponibles \xB7 12h00 \u2013 19h00 \xB7 Lundi au Samedi"
          }), _jsx("div", {
            style: {
              display: "grid",
              gridTemplateColumns: "repeat(4,1fr)",
              gap: 8,
              marginBottom: 16
            },
            children: Je.map(x => {
              let U = yn[a?.id] || 60,
                re = Math.ceil(U / 30),
                rt = Je.indexOf(x),
                bl = (Array.isArray(Q) ? Q.filter(en => en.rdv_date === u && en.status === "confirmed") : []).some(en => {
                  let mn = Je.indexOf(en.slot),
                    La = yn[en.service_id] || 60,
                    yt = Math.ceil(La / 30);
                  return rt >= mn && rt < mn + yt || rt < mn && rt + re > mn;
                }),
                wn = rt + re <= Je.length,
                Yl = Array.isArray(m) && m.some(en => en.blocked_date === u && en.slot === x),
                Fn = bl || !wn || Yl;
              return _jsxs("button", {
                onClick: () => !Fn && v(x),
                style: {
                  padding: "12px 6px",
                  borderRadius: 10,
                  border: `2px solid ${r === x ? q : Fn ? "#ECEFF1" : V}`,
                  background: r === x ? q : Fn ? "#F5F5F5" : "#fff",
                  color: r === x ? "#fff" : Fn ? "#BDBDBD" : z,
                  fontWeight: 600,
                  fontSize: 14,
                  cursor: Fn ? "not-allowed" : "pointer",
                  position: "relative"
                },
                children: [x, Fn && _jsx("span", {
                  style: {
                    fontSize: 8,
                    display: "block",
                    color: "#BDBDBD"
                  },
                  children: "Indispo."
                })]
              }, x);
            })
          }), a?.id === "suivi" && _jsxs("div", {
            style: {
              marginTop: 16,
              padding: "14px 16px",
              background: "#FFF8E1",
              borderRadius: 10,
              display: "flex",
              gap: 10,
              alignItems: "flex-start"
            },
            children: [_jsx("input", {
              type: "checkbox",
              id: "rec",
              checked: h,
              onChange: x => w(x.target.checked),
              style: {
                marginTop: 3,
                accentColor: q,
                width: 16,
                height: 16,
                flexShrink: 0
              }
            }), _jsxs("label", {
              htmlFor: "rec",
              style: {
                fontSize: 13,
                color: "#E65100",
                lineHeight: 1.6,
                cursor: "pointer"
              },
              children: ["\u{1F501} ", _jsx("strong", {
                children: "Programmer un suivi mensuel"
              }), " \u2014 M\xEAme cr\xE9neau chaque mois pour un accompagnement r\xE9gulier"]
            })]
          })]
        }), _jsxs("div", {
          style: {
            display: "flex",
            justifyContent: "space-between",
            marginTop: 20,
            gap: 12
          },
          children: [_jsx(ot, {
            onClick: () => l(1),
            children: "\u2190 Retour"
          }), _jsx(ze, {
            onClick: () => l(3),
            disabled: !r,
            style: {
              opacity: r ? 1 : 0.4
            },
            children: "Continuer \u2192"
          })]
        })]
      }), n === 3 && _jsxs("div", {
        children: [_jsx("h2", {
          style: {
            fontFamily: "'Playfair Display',serif",
            fontSize: 22,
            color: z,
            marginBottom: 8
          },
          children: "Liste de vos traitements en cours"
        }), _jsx("p", {
          style: {
            color: "#78909C",
            fontSize: 13,
            marginBottom: 20
          },
          children: "Facultatif \u2014 Uniquement pour pr\xE9venir les interactions avec nos plantes et compl\xE9ments"
        }), _jsxs("div", {
          style: {
            background: "#E8F5E9",
            border: "1px solid #A5D6A7",
            borderRadius: 12,
            padding: "14px 18px",
            marginBottom: 16,
            display: "flex",
            gap: 12
          },
          children: [_jsx("span", {
            children: "\u{1F4A1}"
          }), _jsxs("p", {
            style: {
              fontSize: 13,
              color: "#2E7D32",
              lineHeight: 1.6,
              margin: 0
            },
            children: ["Si vous prenez des m\xE9dicaments ou des compl\xE9ments alimentaires, vous pouvez nous transmettre leur liste. Cette information est recueillie ", _jsx("strong", {
              children: "uniquement pour v\xE9rifier l'absence d'interactions connues"
            }), " avec les plantes m\xE9dicinales et nutraceutiques que nous proposons. Aucune interpr\xE9tation m\xE9dicale n'est r\xE9alis\xE9e."]
          })]
        }), _jsxs("div", {
          style: {
            background: "#fff",
            borderRadius: 16,
            padding: 24,
            boxShadow: "0 2px 20px rgba(21,101,192,.08)"
          },
          children: [_jsx("div", {
            style: {
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 10,
              marginBottom: 18
            },
            children: [["\u{1F48A}", "Liste de vos m\xE9dicaments en cours"], ["\u{1F33F}", "Compl\xE9ments alimentaires actuels"], ["\u{1F4C4}", "Liste de vos plantes / huiles essentielles"], ["\u{1F4CB}", "Tout document utile \xE0 votre suivi bien-\xEAtre"]].map(([x, U]) => _jsxs("div", {
              style: {
                background: "#F8FAFF",
                borderRadius: 10,
                padding: "12px 14px",
                border: `1px solid ${V}`,
                display: "flex",
                gap: 10,
                alignItems: "center"
              },
              children: [_jsx("span", {
                style: {
                  fontSize: 20
                },
                children: x
              }), _jsx("span", {
                style: {
                  fontSize: 12,
                  fontWeight: 600,
                  color: z
                },
                children: U
              })]
            }, U))
          }), _jsx("input", {
            type: "file",
            ref: vl,
            onChange: async x => {
              let files = Array.from(x.target.files);
              if (!files.length) return;
              try {
                let processed = await Promise.all(files.map(re => compressAndReadFile(re, e?.id || "booking")));
                E(bl => [...bl, ...processed]);
              } catch (err) {
                alert(err.message || "Erreur lors de l'ajout du document.");
              } finally {
                if (vl.current) vl.current.value = "";
              }
            },
            multiple: !0,
            accept: ".pdf,.jpg,.jpeg,.png,.doc,.docx",
            style: {
              display: "none"
            }
          }), _jsx(ot, {
            onClick: () => vl.current.click(),
            style: {
              width: "100%",
              padding: 13
            },
            children: "\u{1F4CE} Ajouter un document (liste de traitements\u2026)"
          }), _jsx("p", {
            style: {
              fontSize: 11,
              color: "#90A4AE",
              textAlign: "center",
              marginTop: 8
            },
            children: "PDF, JPG, PNG, Word accept\xE9s \u2014 Ces documents ne sont pas analys\xE9s m\xE9dicalement"
          }), S.length > 0 && _jsxs("div", {
            style: {
              marginTop: 14
            },
            children: [_jsxs("p", {
              style: {
                fontSize: 12,
                fontWeight: 600,
                color: z,
                marginBottom: 8
              },
              children: ["\u2705 ", S.length, " document", S.length > 1 ? "s" : "", " charg\xE9", S.length > 1 ? "s" : "", " :"]
            }), S.map((x, U) => _jsxs("div", {
              style: {
                display: "flex",
                alignItems: "center",
                gap: 10,
                background: "#E8F5E9",
                borderRadius: 8,
                padding: "9px 12px",
                marginBottom: 8,
                border: "1px solid #A5D6A7"
              },
              children: [_jsx("span", {
                style: {
                  fontSize: 18
                },
                children: x.type?.includes("image") ? "\u{1F5BC}\uFE0F" : x.type?.includes("pdf") ? "\u{1F4D5}" : "\u{1F4C4}"
              }), _jsxs("div", {
                style: {
                  flex: 1
                },
                children: [_jsx("div", {
                  style: {
                    fontSize: 12,
                    color: "#2E7D32",
                    fontWeight: 600,
                    wordBreak: "break-all"
                  },
                  children: x.name
                }), _jsx("div", {
                  style: {
                    fontSize: 10,
                    color: "#78909C"
                  },
                  children: x.size ? `${Math.round(x.size / 1024)} Ko` : ""
                })]
              }), _jsx("button", {
                onClick: () => E(re => re.filter((rt, wt) => wt !== U)),
                style: {
                  background: "none",
                  border: "none",
                  color: "#E53935",
                  fontSize: 20,
                  cursor: "pointer",
                  lineHeight: 1
                },
                children: "\xD7"
              })]
            }, U))]
          })]
        }), _jsx("div", {
          style: {
            background: "#FFF9E6",
            border: "1px solid #FFE082",
            borderRadius: 10,
            padding: "12px 14px",
            marginTop: 14,
            fontSize: 12,
            color: "#F57F17",
            lineHeight: 1.6
          },
          children: "\u2139\uFE0F Cette \xE9tape est enti\xE8rement facultative. Vous pouvez \xE9galement communiquer verbalement la liste de vos traitements lors de la s\xE9ance. Ces informations servent exclusivement \xE0 adapter notre s\xE9lection de compl\xE9ments alimentaires et ne font l'objet d'aucune analyse m\xE9dicale ou biologique."
        }), _jsxs("div", {
          style: {
            background: "#fff",
            borderRadius: 14,
            padding: 20,
            marginTop: 14,
            boxShadow: "0 2px 12px rgba(21,101,192,.06)"
          },
          children: [_jsx("h4", {
            style: {
              fontFamily: "'Playfair Display',serif",
              fontSize: 15,
              color: z,
              marginBottom: 6
            },
            children: "\u{1F48A} Vos compl\xE9ments actuels (optionnel)"
          }), _jsx("p", {
            style: {
              fontSize: 12,
              color: "#78909C",
              marginBottom: 12
            },
            children: "Saisissez directement vos compl\xE9ments alimentaires, m\xE9dicaments ou plantes en cours. Cela nous permet uniquement de v\xE9rifier l'absence d'interactions."
          }), _jsx("div", {
            style: {
              marginBottom: 8
            },
            children: (B.supplements || []).map((x, U) => _jsxs("div", {
              style: {
                display: "flex",
                alignItems: "center",
                gap: 8,
                background: "#E8F0FE",
                borderRadius: 8,
                padding: "8px 12px",
                marginBottom: 6
              },
              children: [_jsx("span", {
                style: {
                  fontSize: 16
                },
                children: "\u{1F48A}"
              }), _jsx("span", {
                style: {
                  flex: 1,
                  fontSize: 13,
                  color: z,
                  fontWeight: 500
                },
                children: x
              }), _jsx("button", {
                onClick: () => M(re => ({
                  ...re,
                  supplements: (re.supplements || []).filter((rt, wt) => wt !== U)
                })),
                style: {
                  background: "none",
                  border: "none",
                  color: "#E53935",
                  fontSize: 18,
                  cursor: "pointer"
                },
                children: "\xD7"
              })]
            }, U))
          }), _jsxs("div", {
            style: {
              display: "flex",
              gap: 8
            },
            children: [_jsx(ut, {
              value: B.suppInput || "",
              onChange: x => M(U => ({
                ...U,
                suppInput: x.target.value
              })),
              onKeyDown: x => {
                x.key === "Enter" && B.suppInput?.trim() && (M(U => ({
                  ...U,
                  supplements: [...(U.supplements || []), U.suppInput.trim()],
                  suppInput: ""
                })), x.preventDefault());
              },
              placeholder: "Ex: Om\xE9ga-3, Magn\xE9sium\u2026 puis Entr\xE9e",
              style: {
                flex: 1
              }
            }), _jsx(ze, {
              onClick: () => {
                B.suppInput?.trim() && M(x => ({
                  ...x,
                  supplements: [...(x.supplements || []), x.suppInput.trim()],
                  suppInput: ""
                }));
              },
              style: {
                padding: "10px 16px",
                fontSize: 13
              },
              children: "+"
            })]
          })]
        }), _jsxs("div", {
          style: {
            display: "flex",
            justifyContent: "space-between",
            marginTop: 20,
            gap: 12
          },
          children: [_jsx(ot, {
            onClick: () => l(2),
            children: "\u2190 Retour"
          }), _jsx(ze, {
            onClick: () => l(4),
            children: "Continuer \u2192"
          })]
        })]
      }), n === 4 && _jsxs("div", {
        children: [_jsx("h2", {
          style: {
            fontFamily: "'Playfair Display',serif",
            fontSize: 22,
            color: z,
            marginBottom: 8
          },
          children: "Vos coordonn\xE9es"
        }), _jsx("p", {
          style: {
            color: "#78909C",
            fontSize: 13,
            marginBottom: 20
          },
          children: "Pour recevoir la confirmation et le rappel de votre s\xE9ance"
        }), e && (e.guests || []).length > 0 && _jsxs("div", {
          style: {
            background: "#E8F0FE",
            borderRadius: 12,
            padding: "12px 16px",
            marginBottom: 16
          },
          children: [_jsx("p", {
            style: {
              fontSize: 12,
              fontWeight: 600,
              color: z,
              marginBottom: 8
            },
            children: "\u{1F468}\u200D\u{1F469}\u200D\u{1F467} Pour qui est cette s\xE9ance ?"
          }), _jsxs("div", {
            style: {
              display: "flex",
              gap: 8,
              flexWrap: "wrap"
            },
            children: [_jsxs("button", {
              onClick: () => M(x => ({
                ...x,
                prenom: e.prenom || "",
                nom: e.nom || ""
              })),
              style: {
                background: !B.prenom || B.prenom === e.prenom && B.nom === e.nom ? "#1565C0" : "#fff",
                color: !B.prenom || B.prenom === e.prenom && B.nom === e.nom ? "#fff" : z,
                border: `1px solid ${V}`,
                borderRadius: 8,
                padding: "6px 14px",
                fontSize: 12,
                fontWeight: 600,
                cursor: "pointer"
              },
              children: ["\u{1F464} Moi (", e.prenom, ")"]
            }), (e.guests || []).map((x, U) => _jsxs("button", {
              onClick: () => M(re => ({
                ...re,
                prenom: x.name.split(" ")[0] || x.name,
                nom: x.name.split(" ").slice(1).join(" ") || ""
              })),
              style: {
                background: B.prenom === x.name.split(" ")[0] && B.nom === x.name.split(" ").slice(1).join(" ") ? "#1565C0" : "#fff",
                color: B.prenom === x.name.split(" ")[0] && B.nom === x.name.split(" ").slice(1).join(" ") ? "#fff" : z,
                border: `1px solid ${V}`,
                borderRadius: 8,
                padding: "6px 14px",
                fontSize: 12,
                fontWeight: 600,
                cursor: "pointer"
              },
              children: ["\u{1F464} ", x.name]
            }, U))]
          })]
        }), _jsxs("div", {
          style: {
            background: "#fff",
            borderRadius: 16,
            padding: 24,
            boxShadow: "0 2px 20px rgba(21,101,192,.08)"
          },
          children: [_jsxs("div", {
            style: {
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 12,
              marginBottom: 12
            },
            children: [_jsxs(Ie, {
              label: "Pr\xE9nom *",
              children: [_jsx(ut, {
                value: B.prenom,
                onChange: x => M(U => ({
                  ...U,
                  prenom: x.target.value
                })),
                placeholder: "Marie"
              }), L.prenom && _jsx("span", {
                style: {
                  fontSize: 11,
                  color: "#E53935"
                },
                children: L.prenom
              })]
            }), _jsxs(Ie, {
              label: "Nom *",
              children: [_jsx(ut, {
                value: B.nom,
                onChange: x => M(U => ({
                  ...U,
                  nom: x.target.value
                })),
                placeholder: "Dupont"
              }), L.nom && _jsx("span", {
                style: {
                  fontSize: 11,
                  color: "#E53935"
                },
                children: L.nom
              })]
            })]
          }), _jsxs(Ie, {
            label: "Email *",
            children: [_jsx(ut, {
              type: "email",
              value: B.email,
              onChange: x => M(U => ({
                ...U,
                email: x.target.value
              })),
              placeholder: "marie@email.com"
            }), L.email && _jsx("span", {
              style: {
                fontSize: 11,
                color: "#E53935"
              },
              children: L.email
            })]
          }), _jsxs(Ie, {
            label: "T\xE9l\xE9phone *",
            children: [_jsx(ut, {
              type: "tel",
              value: B.tel,
              onChange: x => M(U => ({
                ...U,
                tel: x.target.value
              })),
              placeholder: "06 12 34 56 78"
            }), L.tel && _jsx("span", {
              style: {
                fontSize: 11,
                color: "#E53935"
              },
              children: L.tel
            })]
          }), _jsx(Ie, {
            label: "Notes (optionnel)",
            children: _jsx(ut, {
              value: B.notes,
              onChange: x => M(U => ({
                ...U,
                notes: x.target.value
              })),
              placeholder: "Informations compl\xE9mentaires\u2026"
            })
          })]
        }), _jsxs("div", {
          style: {
            display: "flex",
            justifyContent: "space-between",
            gap: 12,
            marginTop: 20
          },
          children: [_jsx(ot, {
            onClick: () => l(3),
            children: "\u2190 Retour"
          }), _jsx(ze, {
            onClick: () => {
              let x = {};
              B.prenom.trim() || (x.prenom = "Requis"), B.nom.trim() || (x.nom = "Requis"), B.email.match(/^[^@]+@[^@]+\.[^@]+$/) || (x.email = "Email invalide"), B.tel.match(/[\d\s\+\-\.]{8,}/) || (x.tel = "Invalide"), de(x), Object.keys(x).length === 0 && l(5);
            },
            style: {
              flex: 2
            },
            children: "Suivant \u2192"
          })]
        })]
      }), n === 5 && _jsxs("div", {
        children: [_jsx("h2", {
          style: {
            fontFamily: "'Playfair Display',serif",
            fontSize: 22,
            color: z,
            marginBottom: 8
          },
          children: "R\xE9capitulatif & Confirmation"
        }), _jsx("p", {
          style: {
            color: "#78909C",
            fontSize: 13,
            marginBottom: 20
          },
          children: "V\xE9rifiez vos informations avant de valider"
        }), _jsxs("div", {
          style: {
            background: "#fff",
            borderRadius: 18,
            padding: 26,
            boxShadow: "0 4px 30px rgba(21,101,192,.10)",
            marginBottom: 16
          },
          children: [_jsxs("div", {
            style: {
              display: "flex",
              alignItems: "center",
              gap: 12,
              paddingBottom: 16,
              marginBottom: 16,
              borderBottom: `1px solid ${V}`
            },
            children: [_jsx("span", {
              style: {
                fontSize: 34
              },
              children: a?.icon
            }), _jsxs("div", {
              children: [_jsx("div", {
                style: {
                  fontFamily: "'Playfair Display',serif",
                  fontSize: 19,
                  color: z
                },
                children: a?.title
              }), _jsxs("div", {
                style: {
                  color: "#78909C",
                  fontSize: 12
                },
                children: [a?.sub, " \xB7 ", a?.dur, h ? " \xB7 \u{1F501} Mensuel" : ""]
              })]
            })]
          }), [["\u{1F4C5} Date", vt(u)], ["\u{1F550} Heure", r], ["\u{1F464} Nom", `${B.prenom} ${B.nom}`], ["\u{1F4E7} Email", B.email], ["\u{1F4DE} T\xE9l.", B.tel]].map(([x, U]) => _jsxs("div", {
            style: {
              display: "flex",
              justifyContent: "space-between",
              padding: "9px 0",
              borderBottom: "1px solid #F0F4FF",
              fontSize: 13
            },
            children: [_jsx("span", {
              style: {
                color: "#78909C"
              },
              children: x
            }), _jsx("span", {
              style: {
                fontWeight: 600,
                color: z
              },
              children: U
            })]
          }, x)), S.length > 0 && _jsx("div", {
            style: {
              paddingTop: 12,
              display: "flex",
              gap: 8,
              flexWrap: "wrap"
            },
            children: S.map((x, U) => _jsxs(We, {
              bg: "#F3E5F5",
              color: "#6A1B9A",
              children: ["\u{1F4CE} ", x.name]
            }, U))
          }), Object.keys(R).length > 0 && _jsxs("div", {
            style: {
              marginTop: 12,
              padding: "10px 12px",
              background: "#F0F4FF",
              borderRadius: 8,
              fontSize: 12,
              color: "#546E7A"
            },
            children: ["\u2705 Formulaire bien-\xEAtre compl\xE9t\xE9 (", Object.keys(R).length, " r\xE9ponses)"]
          })]
        }), _jsxs("div", {
          style: {
            background: "#FFF8E1",
            border: "1px solid #FFD54F",
            borderRadius: 12,
            padding: "14px 16px",
            marginBottom: 14,
            fontSize: 12,
            color: "#BF360C",
            lineHeight: 1.6
          },
          children: ["\u{1F4CE} ", _jsx("strong", {
            children: "Le jour de la s\xE9ance :"
          }), " Si vous le souhaitez, pensez \xE0 noter la liste de vos m\xE9dicaments et compl\xE9ments alimentaires actuels. Non obligatoire \u2014 ces informations nous permettent uniquement d'adapter votre s\xE9lection de compl\xE9ments alimentaires et ne font l'objet d'aucune interpr\xE9tation m\xE9dicale."]
        }), _jsxs("div", {
          style: {
            background: "#fff",
            borderRadius: 12,
            padding: "16px 18px",
            boxShadow: "0 2px 12px rgba(21,101,192,.06)",
            marginBottom: 16
          },
          children: [_jsxs("label", {
            style: {
              display: "flex",
              gap: 12,
              alignItems: "flex-start",
              cursor: "pointer"
            },
            children: [_jsx("input", {
              type: "checkbox",
              checked: Y,
              onChange: x => O(x.target.checked),
              style: {
                marginTop: 3,
                accentColor: q,
                width: 15,
                height: 15,
                flexShrink: 0
              }
            }), _jsxs("span", {
              style: {
                fontSize: 12,
                color: "#546E7A",
                lineHeight: 1.7
              },
              children: ["J'ai pris connaissance que les s\xE9ances de VITASCIENZELAB sont des ", _jsx("strong", {
                children: "actes de conseil commercial en compl\xE9ments alimentaires"
              }), ", r\xE9alis\xE9s par un sp\xE9cialiste en bien-\xEAtre et biochimie alimentaire. Elles ne constituent en aucun cas un acte m\xE9dical, un diagnostic ou une prescription, et ne remplacent pas l'avis d'un m\xE9decin. J'accepte les", " ", _jsx("button", {
                onClick: x => {
                  x.preventDefault(), De(!0);
                },
                style: {
                  background: "none",
                  border: "none",
                  color: q,
                  textDecoration: "underline",
                  cursor: "pointer",
                  fontSize: 12,
                  padding: 0
                },
                children: "mentions l\xE9gales"
              }), "."]
            })]
          }), L.consent && _jsx("span", {
            style: {
              fontSize: 11,
              color: "#E53935",
              display: "block",
              marginTop: 6
            },
            children: L.consent
          })]
        }), _jsxs("div", {
          style: {
            display: "flex",
            justifyContent: "space-between",
            gap: 12
          },
          children: [_jsx(ot, {
            onClick: () => l(4),
            children: "\u2190 Modifier"
          }), _jsx(ze, {
            onClick: hl,
            disabled: gt,
            style: {
              background: `linear-gradient(135deg,${q},${z})`
            },
            children: gt ? "Enregistrement\u2026" : "\u2713 Confirmer ma s\xE9ance"
          })]
        })]
      })]
    })]
  });
}
function Rg({
  onBack: e
}) {
  let [t, n] = useState(!1),
    [l, a] = useState(""),
    [i, u] = useState(""),
    [s, r] = useState(!1),
    [v, S] = useState(!1),
    [E, g] = useState("agenda"),
    [p, R] = useState([]),
    [k, Q] = useState(null),
    [f, m] = useState(""),
    [d, h] = useState(""),
    [w, B] = useState([]),
    [M, Y] = useState([]),
    [O, L] = useState(null),
    [de, gt] = useState([]),
    [Oe, Ce] = useState([]),
    [yl, qt] = useState([]),
    [Wt, It] = useState(""),
    [Ll, Ha] = useState(0),
    [C, W] = useState(null),
    [le, Ne] = useState("confirm"),
    [De, st] = useState(""),
    [ke, vl] = useState("all"),
    [Ut, ja] = useState({
      blocked_date: "",
      slot: "",
      reason: ""
    }),
    [Pt, hl] = useState(new Date().getMonth()),
    [sendingEmails, setSendingEmails] = useState(!1),
    [x, U] = useState(new Date().getFullYear()),
    [re, rt] = useState("all"),
    [wt, bl] = useState("nom"),
    [wn, Yl] = useState([]),
    [Fn, en] = useState(-1),
    [mn, La] = useState(null),
    [yt, Bu] = useState(!1),
    [_r, Cr] = useState(!1),
    [Ya, Dr] = useState([]),
    [Ga, gn] = useState(""),
    [ie, Ft] = useState({
      prenom: "",
      nom: "",
      email: "",
      tel: "",
      service_id: "conseil",
      rdv_date: "",
      slot: "",
      notes: "",
      recurring: !1
    }),
    [dt, w0] = useState({}),
    [prepClient, setPrepClient] = useState(""),
    [prepDate, setPrepDate] = useState(""),
    [prepSlot, setPrepSlot] = useState("17:00"),
    [prepService, setPrepService] = useState("Séance de Conseil en Compléments"),
    [prepStatus, setPrepStatus] = useState(""),
    [prepLoading, setPrepLoading] = useState(!1),
    [F0, Tr] = useState(!1),
    [Br, Rr] = useState(!1);

  const handleSendPrepEmail = async () => {
    if (!prepClient) {
      setPrepStatus("⚠️ Veuillez sélectionner un client dans la liste.");
      return;
    }
    if (!prepDate || !prepSlot) {
      setPrepStatus("⚠️ Veuillez indiquer la date et l'horaire du rendez-vous.");
      return;
    }
    const targetClient = w.find(c => c.id === prepClient || c.email === prepClient);
    if (!targetClient || !targetClient.email) {
      setPrepStatus("⚠️ Le client sélectionné n'a pas d'adresse email valide.");
      return;
    }

    setPrepLoading(!0);
    setPrepStatus("");

    try {
      const res = await fetch("/api/send-prep-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clientName: `${targetClient.prenom || ''} ${targetClient.nom || ''}`.trim(),
          clientEmail: targetClient.email,
          patientId: targetClient.id,
          rdvDate: prepDate,
          slot: prepSlot,
          serviceTitle: prepService
        })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setPrepStatus(`✅ Mail de préparation envoyé avec succès à ${targetClient.prenom || ''} ${targetClient.nom || ''} (${targetClient.email}) pour le ${data.formattedDate || prepDate} à ${prepSlot} !`);
      } else {
        setPrepStatus("❌ Erreur lors de l'envoi : " + (data.error || "Échec"));
      }
    } catch(err) {
      setPrepStatus("❌ Erreur serveur : " + err.message);
    } finally {
      setPrepLoading(!1);
    }
  };
  const H0 = "VitaAdmin2024";
  const Ru = async () => {
      if (ee) {
        l === H0 ? n(!0) : r(!0);
        return;
      }
      if (!i || !l) {
        r(!0);
        return;
      }
      S(!0), r(!1);
      try {
        let c = await Ii.signIn(i, l);
        if (c.error || c.msg || !c.user) {
          r(!0);
        } else {
          activeSessionToken = c.access_token;
          n(!0);
        }
      } catch {
        r(!0);
      }
      S(!1);
    };
  useEffect(() => {
    return () => {
      activeSessionToken = null;
    };
  }, []);
  useEffect(() => {
    if (t) if (ee) {
      R([...ue.appointments]);
      try {
        let localSynced = JSON.parse(localStorage.getItem("gcal_synced_ids") || "[]");
        let syncedIds = ue.appointments.filter(y => y.gcal_event_id || localSynced.includes(y.id)).map(y => y.id);
        Dr(syncedIds);
      } catch (e) {
        console.error("Local mock sync init error:", e);
      }
      let c = {};
      ue.appointments.forEach(y => {
        y.patient_email && !c[y.patient_email] && (c[y.patient_email] = {
          id: y.patient_id || y.patient_email,
          email: y.patient_email,
          prenom: y.patient_name?.split(" ")[0] || "",
          nom: y.patient_name?.split(" ").slice(1).join(" ") || "",
          tel: y.patient_tel || "",
          created_at: y.created_at
        });
      }), B(Object.values(c).filter(y => y.email && y.email.trim() !== "").sort((y, b) => (y.nom || "").localeCompare(b.nom || ""))), Y([...ue.blocked]);
    } else fetch("/api/admin-init", { method: "POST" })
      .then(res => res.json())
      .then(({ appointments: c = [], profiles: y = [], blockedSlots: b = [] }) => {
      if (Array.isArray(c)) {
        R(c);
        try {
          let localSynced = JSON.parse(localStorage.getItem("gcal_synced_ids") || "[]");
          let syncedIds = c.filter(item => item.gcal_event_id || localSynced.includes(item.id)).map(item => item.id);
          Dr(syncedIds);
        } catch (e) {
          console.error("Local sync init error:", e);
        }
      }
      Array.isArray(b) && Y(b);
      let _ = {},
        G = {};
      Array.isArray(y) && y.forEach(N => {
        if (!N.id || N.email && N.email.toLowerCase() === zg.toLowerCase()) return;
        let K = {
          id: N.id,
          email: N.email || "",
          prenom: N.prenom || "",
          nom: N.nom || "",
          tel: N.tel || "",
          dob: N.dob || "",
          client_files: Array.isArray(N.client_files) ? N.client_files : [],
          client_docs: Array.isArray(N.client_docs) ? N.client_docs : [],
          all_supplements: Array.isArray(N.all_supplements) ? N.all_supplements : [],
          guests: Array.isArray(N.guests) ? N.guests : [],
          created_at: N.created_at,
          has_account: !0
        };
        _[N.id] = K, N.email && (G[N.email.toLowerCase()] = K);
      }), Array.isArray(c) && c.forEach(N => {
        if (!N.patient_email) return;
        let K = N.patient_email.toLowerCase();
        if (N.patient_id && _[N.patient_id]) {
          let P = _[N.patient_id];
          P.email || (P.email = N.patient_email, G[K] = P), P.tel || (P.tel = N.patient_tel || ""), P.prenom || (P.prenom = N.patient_name?.split(" ")[0] || ""), P.nom || (P.nom = N.patient_name?.split(" ").slice(1).join(" ") || "");
        } else if (G[K]) {
          let P = G[K];
          P.tel || (P.tel = N.patient_tel || ""), P.prenom || (P.prenom = N.patient_name?.split(" ")[0] || ""), P.nom || (P.nom = N.patient_name?.split(" ").slice(1).join(" ") || "");
        } else {
          let P = N.patient_id || K;
          if (!_[P]) {
            let Ye = {
              id: N.patient_id || K,
              email: N.patient_email,
              prenom: N.patient_name?.split(" ")[0] || "",
              nom: N.patient_name?.split(" ").slice(1).join(" ") || "",
              tel: N.patient_tel || "",
              created_at: N.created_at,
              has_account: !1
            };
            _[P] = Ye, G[K] = Ye;
          }
        }
      });
      let H = Object.values(_).filter(N => N.prenom || N.nom || N.email).sort((N, K) => (N.nom || N.email || "").localeCompare(K.nom || K.email || ""));
      B(H);
      return adminGet("admin_notes", "note=not.like.*FICHIER%20ADMIN*&note=not.like.*FICHIER%20CLIENT*&order=created_at.desc&limit=100");
    }).then(c => {
      if (Array.isArray(c)) {
        let y = c.filter(b => b.note && (b.note.includes("\u{1F4F1}") || b.note.includes("\u270F\uFE0F") || b.note.includes("\u{1F4E7}") || b.note.includes("\u{1F5D1}"))).map(b => ({
          type: "note",
          msg: b.note.split(" \u2014 ")[0] || b.note.slice(0, 50),
          detail: b.note.split(" \u2014 ")[1] || "",
          time: b.created_at ? new Date(b.created_at).toLocaleTimeString("fr-FR", {
            hour: "2-digit",
            minute: "2-digit"
          }) : "",
          icon: b.note.startsWith("\u{1F4F1}") ? "\u{1F4F1}" : b.note.startsWith("\u{1F5D1}") ? "\u{1F5D1}\uFE0F" : "\u{1F4CB}",
          full: b.note
        }));
        Yl(y);
      }
    }).catch(c => console.error("Admin load error:", c));
  }, [t]);
  let Mr = c => {
      try {
        if (!c) return;
        if (L(c), gt([]), Ce([]), qt([]), ee) gt(ue.appointments.filter(y => c.email ? y.patient_email === c.email : y.patient_id === c.id)), Ce(ue.notes.filter(y => y.patient_id === c.id)), qt(ue.questionnaires.filter(y => c.email ? y.patient_email === c.email : y.patient_id === c.id));else {
          let y = c.email && c.email.trim() !== "",
            b = c.id && !c.id.includes("@") && c.id.length > 20,
            _ = y ? `patient_email=eq.${encodeURIComponent(c.email)}&status=neq.archived&order=rdv_date.desc` : `patient_id=eq.${c.id}&status=neq.archived&order=rdv_date.desc`,
            G = b ? `patient_id=eq.${c.id}&order=created_at.desc` : `patient_id=eq.${c.id}&order=created_at.desc`,
            H = b && y ? `or=(patient_id.eq.${c.id},patient_email.eq.${encodeURIComponent(c.email)})&order=created_at.desc` : y ? `patient_email=eq.${encodeURIComponent(c.email)}&order=created_at.desc` : `patient_id=eq.${c.id}&order=created_at.desc`,
            profParam = b ? `id=eq.${c.id}` : y ? `email=eq.${encodeURIComponent(c.email)}` : null;
          profParam && adminGet("profiles", profParam).then(async F => {
            if (Array.isArray(F) && F[0]) {
              let targetProf = F[0];
              let files = Array.isArray(targetProf.client_files) ? targetProf.client_files : [];
              let hasNew = files.some(f => f.uploaded_by === "client" && f.is_new_for_admin === true);
              if (hasNew) {
                files = files.map(f => f.uploaded_by === "client" && f.is_new_for_admin === true ? { ...f, is_new_for_admin: false } : f);
                await adminPatch("profiles", targetProf.id, { client_files: files });
                B(prev => prev.map(p => (p.id === targetProf.id || p.email === targetProf.email) ? { ...p, client_files: files } : p));
              }
              L(N => ({
                ...N,
                id: targetProf.id || N.id,
                client_files: files,
                client_docs: Array.isArray(targetProf.client_docs) ? targetProf.client_docs : [],
                all_supplements: Array.isArray(targetProf.all_supplements) ? targetProf.all_supplements : [],
                guests: Array.isArray(targetProf.guests) ? targetProf.guests : [],
                has_account: true
              }));
            }
          }).catch(() => {}), Promise.all([adminGet("appointments", _), adminGet("admin_notes", G), adminGet("questionnaires", H)]).then(([F, N, K]) => {
            if (Array.isArray(F)) {
              let P = new Date(),
                Ye = F.filter(D => {
                  if (D.status !== "confirmed") return !1;
                  let He = yn[D.service_id] || 60,
                    [$, Xe] = (D.slot || "00:00").split(":").map(Number),
                    $e = new Date(`${D.rdv_date}T${String($).padStart(2, "0")}:${String(Xe).padStart(2, "0")}:00`);
                  return $e.setMinutes($e.getMinutes() + He), $e < P;
                });
              Ye.forEach(D => adminPatch("appointments", D.id, {
                status: "completed"
              }).catch(() => {}));
              let Ht = F.map(D => Ye.find(He => He.id === D.id) ? {
                ...D,
                status: "completed"
              } : D);
              gt(Ht);
            }
            Array.isArray(N) && Ce(N), Array.isArray(K) && qt(K);
          }).catch(F => console.error("Fiche patient erreur:", F));
        }
        g("fiche");
      } catch (y) {
        console.error("openPat error:", y), g("fiche");
      }
    },
    j0 = async () => {
      if (!Wt.trim()) return;
      let c = {
        id: Ln(),
        patient_id: O.id,
        note: Wt,
        created_at: new Date().toISOString()
      };
      ee ? ue.notes.push(c) : await adminPost("admin_notes", c), Ce(y => [c, ...y]), It("");
    },
    Mu = async c => {
      if (await jn(c.patient_email, "\u23F0 Rappel \u2014 Votre s\xE9ance VITASCIENZELAB est dans 48h", Ji(c, "48h")), ee) {
        let y = ue.appointments.find(b => b.id === c.id);
        y && (y.reminder_sent = !0);
      } else await adminPatch("appointments", c.id, {
        reminder_sent: !0
      });
      R(y => y.map(b => b.id === c.id ? {
        ...b,
        reminder_sent: !0
      } : b)), Yl(y => [{
        type: "reminder_sent",
        msg: `Rappel 48h envoy\xE9 \xE0 ${c.patient_name}`,
        detail: `${c.service_title} \u2014 ${Ke(c.rdv_date)} \xE0 ${c.slot}`,
        time: new Date().toLocaleTimeString("fr-FR", {
          hour: "2-digit",
          minute: "2-digit"
        }),
        icon: "\u{1F4E7}"
      }, ...y.slice(0, 49)]);
    };
  useEffect(() => {
    if (!t || ee) return;
    let c = async () => {
      let b = p.filter(tn);
      for (let _ of b) await Mu(_);
    };
    c();
    let y = setInterval(c, 36e5);
    return () => clearInterval(y);
  }, [t, p.length]);
  let L0 = async () => {
      if (!Ut.blocked_date) return;
      let c = {
        blocked_date: Ut.blocked_date,
        slot: Ut.slot || null,
        reason: Ut.reason || ""
      };
      if (ee) ue.blocked.push({
        ...c,
        id: Ln()
      }), Y(y => [...y, {
        ...c,
        id: Ln()
      }]);else {
        let y = await adminPost("blocked_slots", c);
        if (y?.error || y?.code) {
          alert("Erreur: " + (y.error || y.message || JSON.stringify(y)));
          return;
        }
        let b = Array.isArray(y) ? y[0] : y;
        Y(_ => [..._, {
          ...c,
          id: b?.id || Ln()
        }]);
      }
      ja({
        blocked_date: "",
        slot: "",
        reason: ""
      });
    },
    Y0 = c => {
      ee ? ue.blocked = ue.blocked.filter(y => y.id !== c) : adminDelete("blocked_slots", c).catch(() => {}), Y(y => y.filter(b => b.id !== c));
    },
    G0 = () => new Promise(c => {
      if (window.google?.accounts) {
        c();
        return;
      }
      let y = document.createElement("script");
      y.src = "https://accounts.google.com/gsi/client", y.onload = c, document.head.appendChild(y);
    }),
    V0 = (c, y) => {
      let [b, _] = y.split(":").map(Number),
        G = new Date(c + "T00:00:00");
      return G.setHours(b, _, 0, 0), G.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
    },
    Or = c => {
      let b = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//VITASCIENZELAB//FR", "CALSCALE:GREGORIAN", "METHOD:PUBLISH", ...c.map(F => {
          let N = yn[F.service_id] || 45,
            K = V0(F.rdv_date, F.slot),
            [P, Ye] = F.slot.split(":").map(Number),
            Ht = new Date(F.rdv_date + "T00:00:00");
          Ht.setHours(P, Ye + N, 0, 0);
          let D = Ht.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
          return ["BEGIN:VEVENT", `UID:${F.id}@vitascienzelab.fr`, `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, "").split(".")[0]}Z`, `DTSTART:${K}`, `DTEND:${D}`, `SUMMARY:${F.service_icon} ${F.patient_name} \u2014 ${F.service_title}`, "LOCATION:9 Rue du Champ Pile, 10320 Bouilly (Aube)", `DESCRIPTION:Patient : ${F.patient_name}
Email : ${F.patient_email}
T\xE9l : ${F.patient_tel}
Notes : ${F.notes || "\u2014"}
R\xE9f : ${F.id}`, "BEGIN:VALARM", "TRIGGER:-PT24H", "ACTION:DISPLAY", "DESCRIPTION:Rappel s\xE9ance demain", "END:VALARM", "END:VEVENT"].join(`\r
`);
        }), "END:VCALENDAR"].join(`\r
`),
        _ = new Blob([b], {
          type: "text/calendar;charset=utf-8"
        }),
        G = URL.createObjectURL(_),
        H = document.createElement("a");
      H.href = G, H.download = "vitascienzelab-seances.ics", H.click(), URL.revokeObjectURL(G);
    },
    Q0 = async () => {
      gn("");
      try {
        await G0(), window.google.accounts.oauth2.initTokenClient({
          client_id: Sg,
          scope: xg,
          callback: y => {
            if (y.error) {
              gn("Connexion Google refus\xE9e : " + y.error);
              return;
            }
            La(y.access_token), Bu(!0);
          }
        }).requestAccessToken();
      } catch {
        gn("Erreur lors de la connexion Google.");
      }
    },
    Z0 = c => {
      let y = yn[c.service_id] || 45,
        [b, _] = c.slot.split(":").map(Number),
        G = new Date(c.rdv_date + "T00:00:00");
      G.setHours(b, _, 0, 0);
      let H = new Date(G.getTime() + y * 6e4);
      return {
        summary: `${c.service_icon} ${c.patient_name} \u2014 ${c.service_title}`,
        location: "9 Rue du Champ Pile, 10320 Bouilly (Aube)",
        description: `Patient : ${c.patient_name}
Email : ${c.patient_email}
T\xE9l : ${c.patient_tel}
Notes : ${c.notes || "\u2014"}

R\xE9f. : ${c.id}

Secr\xE9tariat VITASCIENZELAB \u2013 Herboristerie Champenoise`,
        start: {
          dateTime: G.toISOString(),
          timeZone: "Europe/Paris"
        },
        end: {
          dateTime: H.toISOString(),
          timeZone: "Europe/Paris"
        },
        colorId: c.service_id === "conseil" ? "1" : c.service_id === "suivi" ? "2" : "6",
        reminders: {
          useDefault: !1,
          overrides: [{
            method: "email",
            minutes: 1440
          }, {
            method: "popup",
            minutes: 60
          }]
        }
      };
    },
    Ou = async c => {
      if (!mn) return gn("Connectez d'abord votre Google Agenda."), !1;
      try {
        let y = await fetch(Eg, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${mn}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify(Z0(c))
        });
        if (y.ok) {
          try {
            const eventData = await y.json();
            const gcalEventId = eventData.id || "synced";
            try {
              let localSynced = JSON.parse(localStorage.getItem("gcal_synced_ids") || "[]");
              if (!localSynced.includes(c.id)) {
                localSynced.push(c.id);
                localStorage.setItem("gcal_synced_ids", JSON.stringify(localSynced));
              }
            } catch (err) {
              console.error("Local storage sync save error:", err);
            }
            if (!ee) {
              await adminPatch("appointments", c.id, {
                gcal_event_id: gcalEventId
              }).catch(err => {
                console.error("Supabase patch error:", err);
              });
            } else {
              let appt = ue.appointments.find(item => item.id === c.id);
              if (appt) appt.gcal_event_id = gcalEventId;
            }
            R(prev => prev.map(item => item.id === c.id ? { ...item, gcal_event_id: gcalEventId } : item));
            gt(prev => prev.map(item => item.id === c.id ? { ...item, gcal_event_id: gcalEventId } : item));
          } catch (e) {
            console.error("Error processing GCal response:", e);
          }
          Dr(_ => [..._, c.id]);
          return !0;
        } else {
          let errBody = await y.json().catch(() => ({}));
          if (errBody.error?.code === 401) {
            Bu(!1);
            La(null);
            gn("Session Google expirée. Reconnectez-vous.");
          }
          return !1;
        }
      } catch {
        return gn("Erreur réseau Google Calendar."), !1;
      }
    },
    X0 = async () => {
      if (!mn) {
        gn("Connectez d'abord votre Google Agenda.");
        return;
      }
      Cr(!0), gn("");
      let c = p.filter(b => !at(b) && b.status === "confirmed" && !Ya.includes(b.id)),
        y = 0;
      for (let b of c) (await Ou(b)) && y++;
      Cr(!1), y > 0 && gn(`\u2705 ${y} s\xE9ance${y > 1 ? "s" : ""} synchronis\xE9e${y > 1 ? "s" : ""} !`);
    },
    $0 = async () => {
      let c = {};
      if (ie.prenom.trim() || (c.prenom = "Requis"), ie.nom.trim() || (c.nom = "Requis"), ie.rdv_date || (c.rdv_date = "Requis"), ie.slot || (c.slot = "Requis"), !ie.email.match(/^[^@]+@[^@]+\.[^@]+$/) && ie.email && (c.email = "Email invalide"), w0(c), Object.keys(c).length > 0) return;
      Rr(!0);
      let matchedProf = ie.email ? w.find(_ => _.email && _.email.toLowerCase() === ie.email.trim().toLowerCase() && _.id && !_.id.includes("@")) : null,
        y = $l.find(_ => _.id === ie.service_id),
        b = {
          id: ed(),
          patient_id: matchedProf?.id || null,
          patient_name: `${ie.prenom.trim()} ${ie.nom.trim()}`,
          patient_email: ie.email ? ie.email.trim() : "\u2014",
          patient_tel: ie.tel ? ie.tel.trim() : "\u2014",
          service_id: y.id,
          service_title: y.title,
          service_icon: y.icon,
          service_dur: y.dur,
          rdv_date: ie.rdv_date,
          slot: ie.slot,
          status: "confirmed",
          notes: ie.notes,
          location: ie.location || "",
          recurring: ie.recurring,
          docs: [],
          reminder_sent: !1,
          created_at: new Date().toISOString()
        };
      try {
        if (ee) ue.appointments.push(b);else {
          let _ = {
            ...b
          };
          delete _.docs_data;
          let G = await adminPost("appointments", _);
          if (!G || G.error || G.code) {
            console.error("Erreur Supabase manual RDV:", G);
            alert("❌ Erreur lors de l'enregistrement du rendez-vous dans la base de données : " + (G?.error || G?.message || "Veuillez réessayer."));
            Rr(!1);
            return;
          }
          let savedAppt = Array.isArray(G) ? G[0] : G;
          if (savedAppt?.patient_id) {
            b.patient_id = savedAppt.patient_id;
          }
          adminPost("admin_notes", {
            patient_id: b.patient_id || b.patient_email || "admin",
            note: `\u270F\uFE0F S\xC9ANCE AJOUT\xC9E \u2014 ${b.patient_name} (${b.patient_email}) : ${b.service_title} le ${Ke(b.rdv_date)} \xE0 ${b.slot}.`,
            created_at: new Date().toISOString()
          }).catch(() => {});
        }
        if (R(_ => [..._, b]), !w.find(_ => _.email && _.email.toLowerCase() === b.patient_email.toLowerCase())) {
          let _ = {
            id: b.patient_id || b.patient_email,
            email: b.patient_email,
            prenom: ie.prenom.trim(),
            nom: ie.nom.trim(),
            tel: ie.tel.trim(),
            created_at: new Date().toISOString(),
            has_account: Boolean(b.patient_id && !String(b.patient_id).includes("@"))
          };
          B(G => [...G, _].sort((H, F) => (H.nom || "").localeCompare(F.nom || "")));
        }
        Yl(_ => [{
          type: "rdv_added",
          msg: `S\xE9ance ajout\xE9e pour ${b.patient_name}`,
          detail: `${b.service_title} \u2014 ${Ke(b.rdv_date)} \xE0 ${b.slot}`,
          time: new Date().toLocaleTimeString("fr-FR", {
            hour: "2-digit",
            minute: "2-digit"
          }),
          icon: "\u270F\uFE0F"
        }, ..._.slice(0, 49)]), Tr(!0), Ft({
          prenom: "",
          nom: "",
          email: "",
          tel: "",
          service_id: "conseil",
          rdv_date: "",
          slot: "",
          notes: "",
          location: "",
          recurring: !1
        }), setTimeout(() => Tr(!1), 4e3), b.patient_email && b.patient_email !== "\u2014" && (await jn(b.patient_email, "\u2705 Votre s\xE9ance est confirm\xE9e \u2014 VITASCIENZELAB", Ji(b, "confirm")));
      } catch (_) {
        console.error(_);
      }
      Rr(!1);
    },
    Nr = async c => {
      if (!c || !c.email || c.email.trim() === "") {
        alert("Impossible de supprimer ce client : email manquant.");
        return;
      }
      let y = `${c.prenom || ""} ${c.nom || ""}`.trim() || c.email;
      if (window.confirm(`Supprimer d\xE9finitivement le client "${y}" ?

Toutes ses s\xE9ances et notes seront aussi supprim\xE9es.

Cette action est irr\xE9versible.`)) try {
        let b = c.email.trim();
        R(_ => _.filter(G => G.patient_email !== b)), B(_ => _.filter(G => G.email !== b)), Yl(_ => [{
          type: "patient_deleted",
          msg: `Client supprim\xE9 : ${y}`,
          detail: b,
          time: new Date().toLocaleTimeString("fr-FR", {
            hour: "2-digit",
            minute: "2-digit"
          }),
          icon: "\u{1F5D1}\uFE0F"
        }, ..._.slice(0, 49)]), E === "fiche" && (g("clients"), L(null));
        if (ee) {
          ue.appointments = ue.appointments.filter(_ => _.patient_email !== b);
          ue.notes = ue.notes.filter(_ => _.patient_id !== c.id);
          ue.questionnaires = ue.questionnaires.filter(_ => _.patient_email !== b);
        } else {
          await fetch("/api/admin-write", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              operation: "delete_patient",
              patientId: c.id || null,
              email: b
            })
          });
        }
      } catch (b) {
        console.error("Erreur suppression patient:", b), alert("Erreur lors de la suppression. R\xE9essayez.");
      }
    },
    kr = async c => {
      if (window.confirm(`Supprimer le RDV de ${c.patient_name} (${Ke(c.rdv_date)} \xE0 ${c.slot}) ?

Les documents transmis seront conserv\xE9s sur la fiche client.`)) try {
        if ((c.docs_data || []).length > 0 && O?.id && O.id.length > 20) {
          let y = [...(O.historical_docs || []), ...(c.docs_data || []).map(b => ({
            ...b,
            from_rdv: c.rdv_date,
            from_slot: c.slot,
            from_name: c.patient_name
          }))];
          await adminPatch("profiles", O.id, {
            historical_docs: y
          }), L(b => ({
            ...b,
            historical_docs: y
          }));
        }
        if (c.gcal_event_id) {
          try {
            let localSynced = JSON.parse(localStorage.getItem("gcal_synced_ids") || "[]");
            localSynced = localSynced.filter(id => id !== c.id);
            localStorage.setItem("gcal_synced_ids", JSON.stringify(localSynced));
          } catch (e) {
            console.error("Local storage delete sync error:", e);
          }
          if (mn) {
            try {
              await fetch(`https://www.googleapis.com/calendar/v3/calendars/primary/events/${c.gcal_event_id}`, {
                method: "DELETE",
                headers: {
                  Authorization: `Bearer ${mn}`
                }
              });
            } catch (gcalErr) {
              console.error("GCal delete error:", gcalErr);
            }
          }
        }
        if (ee) {
          ue.appointments = ue.appointments.filter(y => y.id !== c.id);
        } else {
          await adminDelete("appointments", c.id);
        }
        R(y => y.filter(b => b.id !== c.id));
        gt(y => y.filter(b => b.id !== c.id));
      } catch (y) {
        console.error(y);
      }
    },
    Gl = p.filter(tn),
    qr = p.filter(c => {
      if (ke === "upcoming") return !at(c) && c.status === "confirmed";
      if (ke === "today") {
        let y = Qu(c.rdv_date, c.slot);
        return y !== null && y >= 0 && y < 24;
      }
      return ke === "past" ? at(c) && c.status === "confirmed" : ke === "reminder" ? tn(c) : ke === "cancelled" ? c.status === "cancelled" : c.status !== "archived";
    }).filter(c => !De || `${c.patient_name} ${c.patient_email}`.toLowerCase().includes(De.toLowerCase())),
    uv = Array.from({
      length: 7
    }, (c, y) => {
      let b = new Date(),
        _ = b.getDay(),
        G = new Date(b);
      G.setDate(b.getDate() - (_ === 0 ? 6 : _ - 1) + Ll * 7);
      let H = new Date(G);
      return H.setDate(G.getDate() + y), H;
    }),
    Hn = {
      total: p.length,
      upcoming: p.filter(c => !at(c) && c.status === "confirmed").length,
      patients: w.length,
      withDocs: p.filter(c => c.docs?.length > 0).length,
      recurring: p.filter(c => c.recurring).length,
      byService: $l.map(c => ({
        ...c,
        count: p.filter(y => y.service_id === c.id).length
      })),
      monthly: Array.from({
        length: 6
      }, (c, y) => {
        let b = new Date();
        b.setMonth(b.getMonth() - 5 + y);
        let _ = b.toISOString().slice(0, 7);
        return {
          label: Gu[b.getMonth()].slice(0, 3),
          count: p.filter(G => G.rdv_date?.startsWith(_)).length
        };
      })
    };
  if (!t) return _jsxs("div", {
    style: {
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 20,
      background: "linear-gradient(180deg,#EBF0FE,#F8FAFF)"
    },
    children: [_jsx("style", {
      children: Yu
    }), _jsxs("div", {
      style: {
        background: "#fff",
        borderRadius: 20,
        padding: 40,
        maxWidth: 380,
        width: "100%",
        boxShadow: "0 8px 40px rgba(21,101,192,.12)",
        textAlign: "center"
      },
      children: [_jsxs("form", {
        onSubmit: c => {
          c.preventDefault(), Ru();
        },
        autoComplete: "on",
        children: [_jsx("div", {
          style: {
            fontSize: 36,
            marginBottom: 12
          },
          children: "\u{1F510}"
        }), _jsx("h2", {
          style: {
            fontFamily: "'Playfair Display',serif",
            fontSize: 20,
            color: z,
            marginBottom: 6
          },
          children: "Espace Administrateur"
        }), _jsx("p", {
          style: {
            color: "#78909C",
            fontSize: 12,
            marginBottom: 22
          },
          children: "VITASCIENZELAB \u2013 Acc\xE8s restreint"
        }), _jsx("input", {
          type: "email",
          autoComplete: "username",
          value: i,
          onChange: c => u(c.target.value),
          onKeyDown: c => c.key === "Enter" && Ru(),
          placeholder: "Email administrateur",
          style: {
            width: "100%",
            border: `2px solid ${s ? "#E53935" : V}`,
            borderRadius: 10,
            padding: "11px 13px",
            fontSize: 13,
            color: z,
            outline: "none",
            marginBottom: 8
          }
        }), _jsx("input", {
          type: "password",
          autoComplete: "current-password",
          value: l,
          onChange: c => a(c.target.value),
          onKeyDown: c => c.key === "Enter" && Ru(),
          placeholder: "Mot de passe",
          style: {
            width: "100%",
            border: `2px solid ${s ? "#E53935" : V}`,
            borderRadius: 10,
            padding: "11px 13px",
            fontSize: 13,
            color: z,
            outline: "none",
            letterSpacing: 4,
            marginBottom: 8
          }
        }), s && _jsx("p", {
          style: {
            color: "#E53935",
            fontSize: 12,
            marginBottom: 8
          },
          children: "Email ou mot de passe incorrect"
        }), _jsx("button", {
          type: "submit",
          disabled: v,
          style: {
            width: "100%",
            background: `linear-gradient(135deg,${q},${z})`,
            color: "#fff",
            border: "none",
            borderRadius: 12,
            padding: "13px",
            fontSize: 14,
            fontWeight: 700,
            cursor: "pointer",
            marginBottom: 10
          },
          children: v ? "Connexion\u2026" : "Acc\xE9der"
        })]
      }), _jsx(ot, {
        onClick: e,
        style: {
          width: "100%"
        },
        children: "\u2190 Retour"
      })]
    })]
  });
  let newFileNotes = yl.filter(n => n.full && n.full.includes("NOUVEAU FICHIER CLIENT")),
    Ur = p.filter(tn).length,
    newFilesClientsCount = newFileNotes.length || w.filter(c => (c.client_files || []).some(f => f.uploaded_by === "client" && f.is_new_for_admin === true)).length,
    K0 = [["agenda", "\u{1F4C5} Agenda"], ["nouveau", "\u270F\uFE0F Nouveau RDV"], ["mail_prep", "✉️ Mail Préparation"], ["gcal", "\u{1F4C6} Google Agenda"], ["rdvs", Ur > 0 ? `\u{1F4CB} S\xE9ances \u{1F534}${Ur}` : "\u{1F4CB} S\xE9ances"], ["clients", newFilesClientsCount > 0 ? `\u{1F465} Clients 🔴${newFilesClientsCount}` : "\u{1F465} Clients"], ["activite", newFileNotes.length > 0 ? `\u26A1 Activit\xE9 📁${newFileNotes.length}` : "\u26A1 Activit\xE9"], ["stats", "\u{1F4CA} Statistiques"], ["dispo", "\u{1F512} Disponibilit\xE9s"]],
    Vl = {
      width: "100%",
      border: `2px solid ${V}`,
      borderRadius: 10,
      padding: "9px 12px",
      fontSize: 12,
      color: z,
      outline: "none"
    };
  return _jsxs("div", {
    style: {
      minHeight: "100vh",
      background: "linear-gradient(180deg,#EBF0FE,#F8FAFF)"
    },
    children: [_jsx("style", {
      children: Yu
    }), k && _jsx("div", {
      style: {
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,.55)",
        zIndex: 99999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 16
      },
      children: _jsxs("div", {
        style: {
          background: "#fff",
          borderRadius: 20,
          padding: 28,
          maxWidth: 400,
          width: "100%",
          boxShadow: "0 8px 40px rgba(0,0,0,.2)"
        },
        children: [_jsx("h3", {
          style: {
            fontFamily: "'Playfair Display',serif",
            fontSize: 17,
            color: z,
            marginBottom: 6
          },
          children: "\u270F\uFE0F Modifier le RDV"
        }), _jsxs("p", {
          style: {
            fontSize: 12,
            color: "#78909C",
            marginBottom: 16
          },
          children: [k.patient_name, " \xB7 ", k.service_title]
        }), _jsx(Ie, {
          label: "Nouvelle date *",
          children: _jsx(ut, {
            type: "date",
            value: f,
            onChange: c => m(c.target.value),
            min: new Date().toISOString().split("T")[0]
          })
        }), _jsx(Ie, {
          label: "Nouvel horaire *",
          children: _jsxs("select", {
            value: d,
            onChange: c => h(c.target.value),
            style: {
              width: "100%",
              border: `1px solid ${V}`,
              borderRadius: 8,
              padding: "9px 12px",
              fontSize: 13,
              color: z,
              background: "#fff",
              outline: "none"
            },
            children: [_jsx("option", {
              value: "",
              children: "Choisir un cr\xE9neau"
            }), Je.map(c => _jsx("option", {
              value: c,
              children: c
            }, c))]
          })
        }), _jsxs("div", {
          style: {
            display: "flex",
            gap: 10,
            marginTop: 16
          },
          children: [_jsx(ot, {
            onClick: () => {
              Q(null), m(""), h("");
            },
            style: {
              flex: 1
            },
            children: "Annuler"
          }), _jsx(ze, {
            onClick: async () => {
              !f || !d || (await adminPatch("appointments", k.id, {
                rdv_date: f,
                slot: d
              }), R(c => c.map(y => y.id === k.id ? {
                ...y,
                rdv_date: f,
                slot: d
              } : y)), gt(c => c.map(y => y.id === k.id ? {
                ...y,
                rdv_date: f,
                slot: d
              } : y)), jn(k.patient_email, "\u{1F4C5} Votre s\xE9ance a \xE9t\xE9 modifi\xE9e \u2014 VITASCIENZELAB", `<div style="font-family:sans-serif;padding:20px;max-width:500px"><h2 style="color:#1565C0">S\xE9ance modifi\xE9e</h2><p>Bonjour ${k.patient_name?.split(" ")[0] || ""},</p><p>Votre s\xE9ance <strong>${k.service_title}</strong> a \xE9t\xE9 modifi\xE9e :</p><table style="margin:16px 0;font-size:14px"><tr><td style="color:#78909C;padding:4px 12px 4px 0">Nouvelle date</td><td><strong>${vt(f)}</strong></td></tr><tr><td style="color:#78909C;padding:4px 12px 4px 0">Nouvel horaire</td><td><strong>${d}</strong></td></tr></table><p style="color:#546E7A;font-size:12px">VITASCIENZELAB \xB7 SIRET ${ye.siret}</p></div>`).catch(() => {}), Q(null), m(""), h(""));
            },
            style: {
              flex: 2
            },
            children: "\u{1F4BE} Enregistrer + Email"
          })]
        })]
      })
    }), C && _jsx(Cg, {
      rdv: C,
      type: le,
      onClose: () => W(null)
    }), _jsx("div", {
      style: {
        background: `linear-gradient(135deg,${z},${q})`,
        padding: "0 20px",
        position: "sticky",
        top: 0,
        zIndex: 100
      },
      children: _jsxs("div", {
        style: {
          maxWidth: 1100,
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "11px 0",
          gap: 10,
          flexWrap: "wrap"
        },
        children: [_jsxs("div", {
          style: {
            display: "flex",
            alignItems: "center",
            gap: 10
          },
          children: [_jsx("div", {
            style: {
              width: 34,
              height: 34,
              borderRadius: 9,
              background: "rgba(255,255,255,.15)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 17
            },
            children: "\u2697\uFE0F"
          }), _jsxs("div", {
            children: [_jsx("div", {
              style: {
                fontFamily: "'Playfair Display',serif",
                fontSize: 14,
                color: "#fff",
                fontWeight: 700
              },
              children: "VITASCIENZELAB"
            }), _jsx("div", {
              style: {
                fontSize: 10,
                color: "rgba(255,255,255,.6)"
              },
              children: "Tableau de bord"
            })]
          })]
        }), _jsx("div", {
          style: {
            display: "flex",
            gap: 5,
            flexWrap: "wrap"
          },
          children: K0.map(([c, y]) => {
            const isClientsTab = c === "clients";
            const showDot = isClientsTab && newFilesClientsCount > 0;
            return _jsxs("button", {
              onClick: () => {
                g(c), L(null);
              },
              style: {
                padding: "6px 12px",
                borderRadius: 7,
                border: `1px solid ${E === c ? "#fff" : "rgba(255,255,255,.25)"}`,
                background: E === c ? "rgba(255,255,255,.25)" : "transparent",
                color: "#fff",
                fontSize: 11,
                fontWeight: E === c ? 700 : 400,
                position: "relative",
                display: "flex",
                alignItems: "center",
                gap: 4
              },
              children: [
                y,
                showDot && _jsx("span", {
                  style: {
                    width: 7,
                    height: 7,
                    borderRadius: "50%",
                    background: "#FF5252",
                    display: "inline-block",
                    boxShadow: "0 0 6px #FF5252",
                    animation: "pulse-glow 1.5s infinite"
                  }
                })
              ]
            }, c);
          })
        }), _jsx("button", {
          onClick: e,
          style: {
            background: "rgba(255,255,255,.12)",
            border: "1px solid rgba(255,255,255,.3)",
            color: "#fff",
            borderRadius: 8,
            padding: "6px 12px",
            fontSize: 11
          },
          children: "\u2190 Site"
        })]
      })
    }), _jsxs("div", {
      style: {
        maxWidth: 1100,
        margin: "0 auto",
        padding: "22px 20px 60px"
      },
      children: [newFileNotes.length > 0 && _jsxs("div", {
        style: {
          background: "linear-gradient(135deg, #E0F2F1, #E8F5E9)",
          border: "1.5px solid #00897B",
          borderRadius: 14,
          padding: "14px 18px",
          marginBottom: 20,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
          boxShadow: "0 3px 12px rgba(0,77,64,.08)",
          flexWrap: "wrap"
        },
        children: [
          _jsxs("div", {
            style: { display: "flex", alignItems: "center", gap: 12 },
            children: [
              _jsx("span", { style: { fontSize: 24 }, children: "📁" }),
              _jsxs("div", {
                children: [
                  _jsx("strong", { style: { color: "#004D40", fontSize: 14 }, children: `🔔 ${newFileNotes.length} nouveau(x) document(s) client(s) reçu(s) !` }),
                  _jsx("div", { style: { color: "#00695C", fontSize: 12, marginTop: 2 }, children: newFileNotes[0].full.replace("📁 NOUVEAU FICHIER CLIENT — ", "") })
                ]
              })
            ]
          }),
          _jsx("button", {
            onClick: () => {
              let noteItem = newFileNotes[0];
              let matchedClient = w.find(p => noteItem.patient_id ? p.id === noteItem.patient_id : (p.email && noteItem.full.toLowerCase().includes(p.email.toLowerCase())) || (p.nom && noteItem.full.toLowerCase().includes(p.nom.toLowerCase())));
              if (matchedClient) {
                Mr(matchedClient);
              } else {
                g("activite");
              }
            },
            style: {
              background: "#00695C",
              color: "#fff",
              border: "none",
              padding: "9px 16px",
              borderRadius: 8,
              fontWeight: 700,
              fontSize: 12,
              cursor: "pointer",
              whiteSpace: "nowrap"
            },
            children: "👁️ Voir le document client"
          })
        ]
      }), Gl.length > 0 && E !== "fiche" && _jsxs("div", {
        style: {
          background: "linear-gradient(135deg,#FFF8E1,#FFF3E0)",
          border: "1px solid #FFB300",
          borderRadius: 14,
          padding: "14px 18px",
          marginBottom: 20,
          display: "flex",
          alignItems: "center",
          gap: 12,
          flexWrap: "wrap"
        },
        children: [_jsx("span", {
          style: {
            fontSize: 22
          },
          children: "\u23F0"
        }), _jsxs("div", {
          style: {
            flex: 1
          },
          children: [_jsxs("div", {
            style: {
              fontWeight: 700,
              color: "#E65100",
              fontSize: 13
            },
            children: ["Rappels 48h \xE0 envoyer (", Gl.length, ")"]
          }), _jsx("div", {
            style: {
              fontSize: 11,
              color: "#BF360C"
            },
            children: Gl.map(c => `${c.patient_name} \u2014 ${Ke(c.rdv_date)} \xE0 ${c.slot}`).join(" \u2022 ")
          })]
        }), _jsxs("div", {
          style: {
            display: "flex",
            gap: 8
          },
          children: [_jsx("button", {
            onClick: () => {
              W(Gl[0]), Ne("48h");
            },
            style: {
              background: "#FF8F00",
              color: "#fff",
              border: "none",
              borderRadius: 8,
              padding: "8px 14px",
              fontSize: 12,
              fontWeight: 700
            },
            children: "Aper\xE7u email"
          }), _jsx("button", {
            onClick: () => Mu(Gl[0]),
            style: {
              background: "#fff",
              color: "#E65100",
              border: "1px solid #FFB300",
              borderRadius: 8,
              padding: "8px 12px",
              fontSize: 12
            },
            children: "\u2713 Marqu\xE9 envoy\xE9"
          })]
        })]
      }), E === "nouveau" && _jsxs("div", {
        children: [_jsxs("div", {
          style: {
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 24
          },
          children: [_jsx("div", {
            style: {
              width: 44,
              height: 44,
              borderRadius: 12,
              background: `linear-gradient(135deg,${q},${z})`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 20
            },
            children: "\u270F\uFE0F"
          }), _jsxs("div", {
            children: [_jsx("h3", {
              style: {
                fontFamily: "'Playfair Display',serif",
                fontSize: 20,
                color: z,
                margin: 0
              },
              children: "Ajouter un rendez-vous manuellement"
            }), _jsx("p", {
              style: {
                fontSize: 12,
                color: "#78909C",
                margin: 0
              },
              children: "Le cr\xE9neau sera automatiquement bloqu\xE9 pour les patients"
            })]
          })]
        }), F0 && _jsxs("div", {
          style: {
            background: "#E8F5E9",
            border: "1px solid #A5D6A7",
            borderRadius: 12,
            padding: "14px 18px",
            marginBottom: 20,
            display: "flex",
            alignItems: "center",
            gap: 12
          },
          children: [_jsx("span", {
            style: {
              fontSize: 22
            },
            children: "\u2705"
          }), _jsx("span", {
            style: {
              fontWeight: 700,
              color: "#2E7D32",
              fontSize: 14
            },
            children: "Rendez-vous ajout\xE9 avec succ\xE8s ! Le cr\xE9neau est maintenant r\xE9serv\xE9."
          })]
        }), _jsxs("div", {
          style: {
            background: "#fff",
            borderRadius: 16,
            padding: 26,
            boxShadow: "0 2px 20px rgba(21,101,192,.08)"
          },
          children: [_jsx("p", {
            style: {
              fontSize: 11,
              fontWeight: 700,
              color: q,
              letterSpacing: 1,
              marginBottom: 14
            },
            children: "\u{1F464} INFORMATIONS PATIENT"
          }), _jsxs("div", {
            style: {
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 12,
              marginBottom: 12
            },
            children: [_jsxs("div", {
              children: [_jsx("label", {
                style: {
                  display: "block",
                  fontSize: 12,
                  fontWeight: 600,
                  color: z,
                  marginBottom: 5
                },
                children: "Pr\xE9nom *"
              }), _jsx("input", {
                value: ie.prenom,
                onChange: c => Ft(y => ({
                  ...y,
                  prenom: c.target.value
                })),
                placeholder: "Marie",
                style: {
                  width: "100%",
                  border: `2px solid ${dt.prenom ? "#E53935" : V}`,
                  borderRadius: 10,
                  padding: "10px 12px",
                  fontSize: 13,
                  color: z,
                  outline: "none"
                }
              }), dt.prenom && _jsx("span", {
                style: {
                  fontSize: 11,
                  color: "#E53935"
                },
                children: dt.prenom
              })]
            }), _jsxs("div", {
              children: [_jsx("label", {
                style: {
                  display: "block",
                  fontSize: 12,
                  fontWeight: 600,
                  color: z,
                  marginBottom: 5
                },
                children: "Nom *"
              }), _jsx("input", {
                value: ie.nom,
                onChange: c => Ft(y => ({
                  ...y,
                  nom: c.target.value
                })),
                placeholder: "Dupont",
                style: {
                  width: "100%",
                  border: `2px solid ${dt.nom ? "#E53935" : V}`,
                  borderRadius: 10,
                  padding: "10px 12px",
                  fontSize: 13,
                  color: z,
                  outline: "none"
                }
              }), dt.nom && _jsx("span", {
                style: {
                  fontSize: 11,
                  color: "#E53935"
                },
                children: dt.nom
              })]
            })]
          }), _jsxs("div", {
            style: {
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 12,
              marginBottom: 20
            },
            children: [_jsxs("div", {
              children: [_jsx("label", {
                style: {
                  display: "block",
                  fontSize: 12,
                  fontWeight: 600,
                  color: z,
                  marginBottom: 5
                },
                children: "Email"
              }), _jsx("input", {
                value: ie.email,
                onChange: c => Ft(y => ({
                  ...y,
                  email: c.target.value
                })),
                placeholder: "marie@email.com",
                type: "email",
                style: {
                  width: "100%",
                  border: `2px solid ${dt.email ? "#E53935" : V}`,
                  borderRadius: 10,
                  padding: "10px 12px",
                  fontSize: 13,
                  color: z,
                  outline: "none"
                }
              }), dt.email && _jsx("span", {
                style: {
                  fontSize: 11,
                  color: "#E53935"
                },
                children: dt.email
              })]
            }), _jsxs("div", {
              children: [_jsx("label", {
                style: {
                  display: "block",
                  fontSize: 12,
                  fontWeight: 600,
                  color: z,
                  marginBottom: 5
                },
                children: "T\xE9l\xE9phone"
              }), _jsx("input", {
                value: ie.tel,
                onChange: c => Ft(y => ({
                  ...y,
                  tel: c.target.value
                })),
                placeholder: "06 12 34 56 78",
                style: {
                  width: "100%",
                  border: `2px solid ${V}`,
                  borderRadius: 10,
                  padding: "10px 12px",
                  fontSize: 13,
                  color: z,
                  outline: "none"
                }
              })]
            })]
          }), _jsx("p", {
            style: {
              fontSize: 11,
              fontWeight: 700,
              color: q,
              letterSpacing: 1,
              marginBottom: 14
            },
            children: "\u{1F4C5} S\xC9ANCE"
          }), _jsxs("div", {
            style: {
              marginBottom: 12
            },
            children: [_jsx("label", {
              style: {
                display: "block",
                fontSize: 12,
                fontWeight: 600,
                color: z,
                marginBottom: 5
              },
              children: "Type de s\xE9ance *"
            }), _jsx("select", {
              value: ie.service_id,
              onChange: c => Ft(y => ({
                ...y,
                service_id: c.target.value
              })),
              style: {
                width: "100%",
                border: `2px solid ${V}`,
                borderRadius: 10,
                padding: "10px 12px",
                fontSize: 13,
                color: z,
                outline: "none",
                background: "#FAFCFF"
              },
              children: $l.map(c => _jsxs("option", {
                value: c.id,
                children: [c.icon, " ", c.title, " (", c.dur, ")"]
              }, c.id))
            })]
          }), _jsxs("div", {
            style: {
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 12,
              marginBottom: 12
            },
            children: [_jsxs("div", {
              children: [_jsxs("label", {
                style: {
                  display: "block",
                  fontSize: 12,
                  fontWeight: 600,
                  color: z,
                  marginBottom: 5
                },
                children: ["Date * ", _jsx("span", {
                  style: {
                    fontWeight: 400,
                    color: "#90A4AE"
                  },
                  children: "(lun.\u2013sam.)"
                })]
              }), _jsx("input", {
                type: "date",
                value: ie.rdv_date,
                onChange: c => Ft(y => ({
                  ...y,
                  rdv_date: c.target.value
                })),
                min: new Date().toISOString().split("T")[0],
                style: {
                  width: "100%",
                  border: `2px solid ${dt.rdv_date ? "#E53935" : V}`,
                  borderRadius: 10,
                  padding: "10px 12px",
                  fontSize: 13,
                  color: z,
                  outline: "none"
                }
              }), dt.rdv_date && _jsx("span", {
                style: {
                  fontSize: 11,
                  color: "#E53935"
                },
                children: dt.rdv_date
              })]
            }), _jsxs("div", {
              children: [_jsxs("label", {
                style: {
                  display: "block",
                  fontSize: 12,
                  fontWeight: 600,
                  color: z,
                  marginBottom: 5
                },
                children: ["Cr\xE9neau * ", _jsx("span", {
                  style: {
                    fontWeight: 400,
                    color: "#90A4AE"
                  },
                  children: "(14h\u201319h)"
                })]
              }), _jsxs("select", {
                value: ie.slot,
                onChange: c => Ft(y => ({
                  ...y,
                  slot: c.target.value
                })),
                style: {
                  width: "100%",
                  border: `2px solid ${dt.slot ? "#E53935" : V}`,
                  borderRadius: 10,
                  padding: "10px 12px",
                  fontSize: 13,
                  color: z,
                  outline: "none",
                  background: "#FAFCFF"
                },
                children: [_jsx("option", {
                  value: "",
                  children: "-- Choisir --"
                }), Je.map(c => {
                  let y = yn[ie.service_id] || 60,
                    b = Math.ceil(y / 30),
                    _ = Je.indexOf(c),
                    isConflict = p.filter(F => F.rdv_date === ie.rdv_date && F.status === "confirmed").some(F => {
                      let N = Je.indexOf(F.slot),
                        K = yn[F.service_id] || 60,
                        P = Math.ceil(K / 30);
                      return _ >= N && _ < N + P || _ < N && _ + b > N;
                    }),
                    isOverflow = _ + b > Je.length;
                  return _jsxs("option", {
                    value: c,
                    disabled: isOverflow,
                    children: [c, isOverflow ? " — dépasse l'horaire" : isConflict ? " — occupé (double réservation autorisée)" : ""]
                  }, c);
                })]
              }), dt.slot && _jsx("span", {
                style: {
                  fontSize: 11,
                  color: "#E53935"
                },
                children: dt.slot
              })]
            })]
          }), ie.rdv_date && _jsxs("div", {
            style: {
              background: "#F8FAFF",
              borderRadius: 12,
              padding: "14px 16px",
              marginBottom: 12,
              border: `1px solid ${V}`
            },
            children: [_jsxs("p", {
              style: {
                fontSize: 11,
                fontWeight: 700,
                color: z,
                marginBottom: 10
              },
              children: ["Vue des cr\xE9neaux \u2014 ", new Date(ie.rdv_date + "T12:00:00").toLocaleDateString("fr-FR", {
                weekday: "long",
                day: "numeric",
                month: "long"
              })]
            }), _jsx("div", {
              style: {
                display: "flex",
                gap: 6,
                flexWrap: "wrap"
              },
              children: Je.map(c => {
                let y = yn[ie.service_id] || 60,
                  b = Math.ceil(y / 30),
                  _ = Je.indexOf(c),
                  H = p.filter(K => K.rdv_date === ie.rdv_date && K.status === "confirmed").find(K => {
                    let P = Je.indexOf(K.slot),
                      Ye = yn[K.service_id] || 60,
                      Ht = Math.ceil(Ye / 30);
                    return _ >= P && _ < P + Ht || _ < P && _ + b > P;
                  }),
                  F = _ + b > Je.length;
                return _jsxs("div", {
                  onClick: () => !F && Ft(K => ({
                    ...K,
                    slot: c
                  })),
                  style: {
                    padding: "7px 12px",
                    borderRadius: 8,
                    fontSize: 12,
                    fontWeight: 600,
                    cursor: F ? "not-allowed" : "pointer",
                    background: ie.slot === c ? q : F ? "#ECEFF1" : H ? "#FFEBEE" : "#E8F0FE",
                    color: ie.slot === c ? "#fff" : F ? "#BDBDBD" : H ? "#C62828" : q,
                    userSelect: "none"
                  },
                  children: [c, H ? ` (${H.patient_name?.split(" ")[0]})` : ""]
                }, c);
              })
            })]
          }), _jsxs("div", {
            style: {
              marginBottom: 12
            },
            children: [_jsx("label", {
              style: {
                display: "block",
                fontSize: 12,
                fontWeight: 600,
                color: z,
                marginBottom: 5
              },
              children: "Notes internes"
            }), _jsx("textarea", {
              value: ie.notes,
              onChange: c => Ft(y => ({
                ...y,
                notes: c.target.value
              })),
              placeholder: "Motif du rendez-vous, informations particuli\xE8res\u2026",
              style: {
                width: "100%",
                border: `2px solid ${V}`,
                borderRadius: 10,
                padding: "10px 12px",
                fontSize: 13,
                color: z,
                outline: "none",
                minHeight: 70,
                resize: "vertical"
              }
            })]
          }), _jsxs("div", {
            style: {
              marginBottom: 12
            },
            children: [_jsx("label", {
              style: {
                display: "block",
                fontSize: 12,
                fontWeight: 600,
                color: z,
                marginBottom: 5
              },
              children: "\u{1F4CD} Lieu du rendez-vous (Optionnel)"
            }), _jsx("input", {
              value: ie.location || "",
              onChange: c => Ft(y => ({
                ...y,
                location: c.target.value
              })),
              placeholder: "Par d\xE9faut : 9 Rue du Champ Pile, 10320 Bouilly (ou rdv \xE0 domicile, point spécifique...)",
              style: {
                width: "100%",
                border: `2px solid ${V}`,
                borderRadius: 10,
                padding: "10px 12px",
                fontSize: 13,
                color: z,
                outline: "none"
              }
            })]
          }), _jsxs("div", {
            style: {
              marginBottom: 20,
              padding: "12px 14px",
              background: "#FFF8E1",
              borderRadius: 10,
              display: "flex",
              gap: 10,
              alignItems: "center"
            },
            children: [_jsx("input", {
              type: "checkbox",
              id: "manRec",
              checked: ie.recurring,
              onChange: c => Ft(y => ({
                ...y,
                recurring: c.target.checked
              })),
              style: {
                width: 15,
                height: 15,
                accentColor: q,
                flexShrink: 0
              }
            }), _jsx("label", {
              htmlFor: "manRec",
              style: {
                fontSize: 12,
                color: "#E65100",
                cursor: "pointer"
              },
              children: "\u{1F501} Suivi mensuel r\xE9current \u2014 bloquer le m\xEAme cr\xE9neau chaque mois"
            })]
          }), _jsx("button", {
            onClick: $0,
            disabled: Br,
            style: {
              background: `linear-gradient(135deg,${q},${z})`,
              color: "#fff",
              border: "none",
              borderRadius: 12,
              padding: "13px 28px",
              fontSize: 14,
              fontWeight: 700,
              cursor: "pointer",
              width: "100%"
            },
            children: Br ? "Enregistrement\u2026" : "\u2713 Ajouter ce rendez-vous"
          })]
        })]
      }), E === "gcal" && _jsxs("div", {
        children: [_jsxs("div", {
          style: {
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 24
          },
          children: [_jsx("div", {
            style: {
              width: 44,
              height: 44,
              borderRadius: 12,
              background: "linear-gradient(135deg,#4285F4,#34A853)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 22
            },
            children: "\u{1F4C6}"
          }), _jsxs("div", {
            children: [_jsx("h3", {
              style: {
                fontFamily: "'Playfair Display',serif",
                fontSize: 20,
                color: z,
                margin: 0
              },
              children: "Synchronisation Google Agenda"
            }), _jsx("p", {
              style: {
                fontSize: 12,
                color: "#78909C",
                margin: 0
              },
              children: "Vos s\xE9ances appara\xEEtront directement dans votre Google Calendar"
            })]
          })]
        }), _jsxs("div", {
          style: {
            background: yt ? "#E8F5E9" : "#fff",
            border: `2px solid ${yt ? "#A5D6A7" : V}`,
            borderRadius: 16,
            padding: "22px 24px",
            marginBottom: 20,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 14
          },
          children: [_jsxs("div", {
            style: {
              display: "flex",
              alignItems: "center",
              gap: 14
            },
            children: [_jsx("div", {
              style: {
                width: 48,
                height: 48,
                borderRadius: 14,
                background: yt ? "#43A047" : "#E0E0E0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 24
              },
              children: yt ? "\u2705" : "\u{1F517}"
            }), _jsxs("div", {
              children: [_jsx("div", {
                style: {
                  fontWeight: 700,
                  color: yt ? "#2E7D32" : z,
                  fontSize: 15
                },
                children: yt ? "Google Agenda connect\xE9" : "Google Agenda non connect\xE9"
              }), _jsx("div", {
                style: {
                  fontSize: 12,
                  color: "#78909C"
                },
                children: yt ? `${Ya.length} s\xE9ance${Ya.length > 1 ? "s" : ""} synchronis\xE9e${Ya.length > 1 ? "s" : ""}` : "Cliquez pour autoriser l'acc\xE8s \xE0 votre agenda"
              })]
            })]
          }), yt ? _jsxs("div", {
            style: {
              display: "flex",
              gap: 10,
              flexWrap: "wrap"
            },
            children: [_jsx("button", {
              onClick: X0,
              disabled: _r,
              style: {
                background: "linear-gradient(135deg,#34A853,#2E7D32)",
                color: "#fff",
                border: "none",
                borderRadius: 12,
                padding: "12px 20px",
                fontSize: 13,
                fontWeight: 700,
                cursor: "pointer"
              },
              children: _r ? "\u23F3 Sync en cours\u2026" : "\u{1F504} Sync toutes les s\xE9ances \xE0 venir"
            }), _jsx("button", {
              onClick: () => {
                Bu(!1), La(null), Dr([]);
              },
              style: {
                background: "#fff",
                border: "2px solid #FFCDD2",
                color: "#C62828",
                borderRadius: 12,
                padding: "12px 16px",
                fontSize: 12,
                fontWeight: 600,
                cursor: "pointer"
              },
              children: "D\xE9connecter"
            })]
          }) : _jsxs("button", {
            onClick: Q0,
            style: {
              background: "linear-gradient(135deg,#4285F4,#1a73e8)",
              color: "#fff",
              border: "none",
              borderRadius: 12,
              padding: "12px 22px",
              fontSize: 14,
              fontWeight: 700,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 8
            },
            children: [_jsx("span", {
              style: {
                fontSize: 18
              },
              children: "G"
            }), " Connecter Google Agenda"]
          })]
        }), Ga && _jsx("div", {
          style: {
            background: Ga.startsWith("\u2705") ? "#E8F5E9" : "#FFF3E0",
            border: `1px solid ${Ga.startsWith("\u2705") ? "#A5D6A7" : "#FFB300"}`,
            borderRadius: 12,
            padding: "12px 16px",
            marginBottom: 16,
            fontSize: 13,
            color: Ga.startsWith("\u2705") ? "#2E7D32" : "#E65100"
          },
          children: Ga
        }), _jsxs("div", {
          style: {
            background: "#fff",
            borderRadius: 16,
            padding: 22,
            boxShadow: "0 2px 20px rgba(21,101,192,.08)"
          },
          children: [_jsx("p", {
            style: {
              fontSize: 11,
              fontWeight: 700,
              color: q,
              letterSpacing: 1,
              marginBottom: 16
            },
            children: "\u{1F4C5} S\xC9ANCES \xC0 VENIR \u2014 \xC9TAT DE SYNCHRONISATION"
          }), p.filter(c => !at(c) && c.status === "confirmed").length === 0 ? _jsx("p", {
            style: {
              color: "#90A4AE",
              fontSize: 13,
              textAlign: "center",
              padding: 20
            },
            children: "Aucune s\xE9ance \xE0 venir."
          }) : p.filter(c => !at(c) && c.status === "confirmed").sort((c, y) => c.rdv_date.localeCompare(y.rdv_date)).map(c => {
            let y = Ya.includes(c.id);
            return _jsxs("div", {
              style: {
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "12px 0",
                borderBottom: "1px solid #F0F4FF",
                flexWrap: "wrap",
                gap: 10
              },
              children: [_jsxs("div", {
                children: [_jsxs("div", {
                  style: {
                    fontSize: 14,
                    fontWeight: 600,
                    color: z
                  },
                  children: [c.service_icon, " ", c.patient_name]
                }), _jsxs("div", {
                  style: {
                    fontSize: 12,
                    color: "#78909C"
                  },
                  children: ["\u{1F4C5} ", new Date(c.rdv_date + "T12:00:00").toLocaleDateString("fr-FR", {
                    weekday: "short",
                    day: "numeric",
                    month: "short"
                  }), " \xB7 \u{1F550} ", c.slot, " \xB7 ", c.service_title]
                })]
              }), _jsx("div", {
                style: {
                  display: "flex",
                  alignItems: "center",
                  gap: 8
                },
                children: y ? _jsx("span", {
                  style: {
                    background: "#E8F5E9",
                    color: "#2E7D32",
                    fontSize: 11,
                    fontWeight: 700,
                    padding: "4px 12px",
                    borderRadius: 20
                  },
                  children: "\u2713 Dans Google Agenda"
                }) : _jsx("button", {
                  onClick: () => Ou(c),
                  disabled: !yt,
                  style: {
                    background: yt ? "linear-gradient(135deg,#4285F4,#1a73e8)" : "#E0E0E0",
                    color: "#fff",
                    border: "none",
                    borderRadius: 8,
                    padding: "6px 14px",
                    fontSize: 12,
                    fontWeight: 600,
                    cursor: yt ? "pointer" : "not-allowed"
                  },
                  children: yt ? "Ajouter \xE0 Google" : "Connectez-vous d'abord"
                })
              })]
            }, c.id);
          })]
        }), _jsxs("div", {
          style: {
            background: "#fff",
            borderRadius: 16,
            padding: 22,
            boxShadow: "0 2px 20px rgba(21,101,192,.08)",
            marginTop: 20
          },
          children: [_jsx("p", {
            style: {
              fontSize: 11,
              fontWeight: 700,
              color: q,
              letterSpacing: 1,
              marginBottom: 16
            },
            children: "\u{1F4E5} EXPORT FICHIER CALENDRIER (.ICS) \u2014 DISPONIBLE MAINTENANT"
          }), _jsxs("p", {
            style: {
              fontSize: 13,
              color: "#546E7A",
              marginBottom: 18,
              lineHeight: 1.6
            },
            children: ["T\xE9l\xE9chargez vos s\xE9ances au format ", _jsx("strong", {
              children: ".ics"
            }), " (compatible Google Agenda, Apple Calendrier, Outlook). Double-cliquez sur le fichier t\xE9l\xE9charg\xE9 et vos s\xE9ances s'importent automatiquement."]
          }), _jsxs("div", {
            style: {
              display: "flex",
              gap: 12,
              flexWrap: "wrap"
            },
            children: [_jsx("button", {
              onClick: () => Or(p.filter(c => !at(c) && c.status === "confirmed")),
              style: {
                background: `linear-gradient(135deg,${q},${z})`,
                color: "#fff",
                border: "none",
                borderRadius: 12,
                padding: "12px 22px",
                fontSize: 13,
                fontWeight: 700,
                cursor: "pointer"
              },
              children: "\u{1F4E5} T\xE9l\xE9charger toutes les s\xE9ances \xE0 venir"
            }), _jsx("button", {
              onClick: () => Or(p.filter(c => c.status === "confirmed")),
              style: {
                background: "#fff",
                color: q,
                border: `2px solid ${V}`,
                borderRadius: 12,
                padding: "12px 18px",
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer"
              },
              children: "\u{1F4E5} T\xE9l\xE9charger tout l'historique"
            })]
          })]
        }), _jsxs("div", {
          style: {
            background: "#E8F0FE",
            borderRadius: 14,
            padding: "18px 20px",
            marginTop: 16
          },
          children: [_jsx("p", {
            style: {
              fontSize: 12,
              color: q,
              fontWeight: 700,
              marginBottom: 8
            },
            children: "\u2139\uFE0F Connexion directe Google (OAuth)"
          }), _jsxs("p", {
            style: {
              fontSize: 12,
              color: "#546E7A",
              lineHeight: 1.7
            },
            children: [`La connexion OAuth directe (bouton "Connecter Google Agenda") fonctionnera automatiquement une fois l'application d\xE9ploy\xE9e sur votre domaine. En attendant, utilisez l'export `, _jsx("strong", {
              children: ".ics"
            }), " ci-dessus \u2014 c'est la m\xE9thode la plus universelle et elle fonctionne partout."]
          })]
        })]
      }), k && _jsx("div", {
        style: {
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,.55)",
          zIndex: 9999,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 16
        },
        children: _jsxs("div", {
          style: {
            background: "#fff",
            borderRadius: 20,
            padding: 28,
            maxWidth: 400,
            width: "100%",
            boxShadow: "0 8px 40px rgba(0,0,0,.15)"
          },
          children: [_jsx("h3", {
            style: {
              fontFamily: "'Playfair Display',serif",
              fontSize: 17,
              color: z,
              marginBottom: 6
            },
            children: "\u270F\uFE0F Modifier le RDV"
          }), _jsxs("p", {
            style: {
              fontSize: 12,
              color: "#78909C",
              marginBottom: 16
            },
            children: [k.patient_name, " \xB7 ", k.service_title]
          }), _jsx(Ie, {
            label: "Nouvelle date *",
            children: _jsx(ut, {
              type: "date",
              value: f,
              onChange: c => m(c.target.value),
              min: new Date().toISOString().split("T")[0]
            })
          }), _jsx(Ie, {
            label: "Nouvel horaire *",
            children: _jsxs("select", {
              value: d,
              onChange: c => h(c.target.value),
              style: {
                width: "100%",
                border: `1px solid ${V}`,
                borderRadius: 8,
                padding: "9px 12px",
                fontSize: 13,
                color: z,
                background: "#fff",
                outline: "none"
              },
              children: [_jsx("option", {
                value: "",
                children: "Choisir un cr\xE9neau"
              }), Je.map(c => _jsx("option", {
                value: c,
                children: c
              }, c))]
            })
          }), _jsxs("div", {
            style: {
              display: "flex",
              gap: 10,
              marginTop: 16
            },
            children: [_jsx(ot, {
              onClick: () => {
                Q(null), m(""), h("");
              },
              style: {
                flex: 1
              },
              children: "Annuler"
            }), _jsx(ze, {
              onClick: async () => {
                !f || !d || (await adminPatch("appointments", k.id, {
                  rdv_date: f,
                  slot: d
                }), R(c => c.map(y => y.id === k.id ? {
                  ...y,
                  rdv_date: f,
                  slot: d
                } : y)), gt(c => c.map(y => y.id === k.id ? {
                  ...y,
                  rdv_date: f,
                  slot: d
                } : y)), jn(k.patient_email, "\u{1F4C5} Votre s\xE9ance a \xE9t\xE9 modifi\xE9e \u2014 VITASCIENZELAB", `<div style="font-family:sans-serif;padding:20px;max-width:500px"><h2 style="color:#1565C0">S\xE9ance modifi\xE9e</h2><p>Bonjour ${k.patient_name?.split(" ")[0] || ""},</p><p>Votre s\xE9ance <strong>${k.service_title}</strong> a \xE9t\xE9 modifi\xE9e :</p><table style="margin:16px 0;font-size:14px"><tr><td style="color:#78909C;padding:4px 12px 4px 0">Nouvelle date</td><td><strong>${vt(f)}</strong></td></tr><tr><td style="color:#78909C;padding:4px 12px 4px 0">Nouvel horaire</td><td><strong>${d}</strong></td></tr></table><p style="color:#546E7A;font-size:12px">Si vous avez des questions, contactez-nous \xE0 ${ye.email}</p><p style="font-size:11px;color:#90A4AE">VITASCIENZELAB \xB7 SIRET ${ye.siret}</p></div>`).catch(() => {}), Q(null), m(""), h(""));
              },
              style: {
                flex: 2
              },
              children: "\u{1F4BE} Enregistrer + Email"
            })]
          })]
        })
      }), E === "mail_prep" && _jsxs("div", {
        style: {
          background: "#fff",
          borderRadius: 16,
          padding: "24px 28px",
          boxShadow: "0 4px 20px rgba(21,101,192,.08)",
          maxWidth: 680,
          margin: "0 auto"
        },
        children: [
          _jsxs("div", {
            style: {
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 24
            },
            children: [
              _jsx("div", {
                style: {
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  background: `linear-gradient(135deg,${q},${z})`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 22,
                  color: "#fff"
                },
                children: "✉️"
              }),
              _jsxs("div", {
                children: [
                  _jsx("h3", {
                    style: {
                      fontFamily: "'Playfair Display',serif",
                      fontSize: 20,
                      color: z,
                      margin: 0
                    },
                    children: "Envoyer l'email de préparation de séance"
                  }),
                  _jsx("p", {
                    style: {
                      fontSize: 12,
                      color: "#78909C",
                      margin: 0
                    },
                    children: "Sélectionnez le client de votre base de données et indiquez la date et l'horaire retenus."
                  })
                ]
              })
            ]
          }),
          _jsxs("div", {
            style: { display: "flex", flexDirection: "column", gap: 16 },
            children: [
              _jsxs("div", {
                children: [
                  _jsx("label", {
                    style: { display: "block", fontSize: 13, fontWeight: 700, color: z, marginBottom: 6 },
                    children: "👤 Client (liste effective de la base de données) *"
                  }),
                  _jsxs("select", {
                    value: prepClient,
                    onChange: ev => {
                      const val = ev.target.value;
                      setPrepClient(val);
                      const found = w.find(c => c.id === val || c.email === val);
                      if (found) {
                        const pAppts = p.filter(a => a.patient_id === found.id || a.patient_email === found.email);
                        if (pAppts.length > 0) {
                          const latest = pAppts[0];
                          if (latest.rdv_date) setPrepDate(latest.rdv_date);
                          if (latest.slot) setPrepSlot(latest.slot);
                        }
                      }
                    },
                    style: Vl,
                    children: [
                      _jsx("option", { value: "", children: "-- Choisir un client dans la liste --" }),
                      w.map(c => _jsx("option", {
                        value: c.id,
                        children: `${(c.nom || '').toUpperCase()} ${c.prenom || ''} (${c.email || 'Sans email'})`
                      }, c.id))
                    ]
                  })
                ]
              }),
              prepClient && (() => {
                const cObj = w.find(c => c.id === prepClient || c.email === prepClient);
                if (!cObj) return null;
                return _jsxs("div", {
                  style: {
                    background: "#E8F0FE",
                    borderRadius: 10,
                    padding: "10px 14px",
                    fontSize: 12,
                    color: "#1565C0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between"
                  },
                  children: [
                    _jsxs("div", {
                      children: [
                        _jsxs("strong", { children: [`${cObj.prenom || ''} ${cObj.nom || ''}`.trim()] }),
                        _jsxs("span", { style: { marginLeft: 8, opacity: 0.85 }, children: [`📧 ${cObj.email || ''}`] }),
                        cObj.tel && _jsxs("span", { style: { marginLeft: 8, opacity: 0.85 }, children: [`📞 ${cObj.tel}`] })
                      ]
                    }),
                    _jsx("span", { style: { fontSize: 11, background: "#1565C0", color: "#fff", padding: "2px 8px", borderRadius: 12 }, children: "Client sélectionné" })
                  ]
                });
              })(),
              _jsxs("div", {
                style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 },
                children: [
                  _jsxs("div", {
                    children: [
                      _jsx("label", {
                        style: { display: "block", fontSize: 13, fontWeight: 700, color: z, marginBottom: 6 },
                        children: "📅 Date de la séance *"
                      }),
                      _jsx("input", {
                        type: "date",
                        value: prepDate,
                        onChange: ev => setPrepDate(ev.target.value),
                        style: Vl
                      })
                    ]
                  }),
                  _jsxs("div", {
                    children: [
                      _jsx("label", {
                        style: { display: "block", fontSize: 13, fontWeight: 700, color: z, marginBottom: 6 },
                        children: "⏰ Horaire / Créneau retenu *"
                      }),
                      _jsxs("select", {
                        value: prepSlot,
                        onChange: ev => setPrepSlot(ev.target.value),
                        style: Vl,
                        children: [
                          ["08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00"].map(s => _jsx("option", {
                            value: s,
                            children: s
                          }, s))
                        ]
                      })
                    ]
                  })
                ]
              }),
              _jsxs("div", {
                children: [
                  _jsx("label", {
                    style: { display: "block", fontSize: 13, fontWeight: 700, color: z, marginBottom: 6 },
                    children: "🌿 Intitulé du motif / prestation"
                  }),
                  _jsx("input", {
                    type: "text",
                    value: prepService,
                    onChange: ev => setPrepService(ev.target.value),
                    placeholder: "Ex: Séance de Conseil en Compléments",
                    style: Vl
                  })
                ]
              }),
              _jsxs("div", {
                style: {
                  background: "#F8FAFC",
                  border: `1px solid #E2E8F0`,
                  borderRadius: 12,
                  padding: 14
                },
                children: [
                  _jsx("div", {
                    style: { fontSize: 11, fontWeight: 700, color: "#64748B", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 6 },
                    children: "👁️ Aperçu du mail qui sera envoyé :"
                  }),
                  _jsxs("div", {
                    style: { fontSize: 12, color: z, lineHeight: 1.5 },
                    children: [
                      _jsxs("p", { style: { margin: "0 0 4px 0" }, children: [_jsx("strong", { children: "À : " }), prepClient ? (w.find(c => c.id === prepClient || c.email === prepClient)?.email || "Non renseigné") : "Sélectionnez un client"] }),
                      _jsxs("p", { style: { margin: "0 0 4px 0" }, children: [_jsx("strong", { children: "Objet : " }), `📋 Préparation de votre séance du ${prepDate ? prepDate : '[Date]'} à ${prepSlot} – VITASCIENZELAB`] }),
                      _jsxs("div", {
                        style: { background: "#fff", border: "1px solid #E2E8F0", borderRadius: 8, padding: 10, marginTop: 6, fontSize: 12, color: "#475569" },
                        children: [
                          _jsxs("p", { style: { margin: "0 0 4px 0" }, children: [`Bonjour ${prepClient ? (w.find(c => c.id === prepClient || c.email === prepClient)?.prenom || "Client") : "Client"},`] }),
                          _jsxs("p", { style: { margin: "0 0 4px 0" }, children: [`Nous avons le plaisir de vous confirmer notre séance prévue le `, _jsx("strong", { children: `${prepDate ? prepDate : '[Date]'} à ${prepSlot}` }), `.`] }),
                          _jsx("p", { style: { margin: "0 0 4px 0" }, children: "• 📋 Remplir votre questionnaire de préparation (objectifs & compléments actuels)" }),
                          _jsx("p", { style: { margin: "0" }, children: "• 📁 Déposer vos documents médicaux sur votre espace personnel" })
                        ]
                      })
                    ]
                  })
                ]
              }),
              prepStatus && _jsx("div", {
                style: {
                  padding: "12px 16px",
                  borderRadius: 10,
                  fontSize: 13,
                  fontWeight: 600,
                  background: prepStatus.includes("✅") ? "#E8F5E9" : "#FFEBEE",
                  color: prepStatus.includes("✅") ? "#2E7D32" : "#C62828",
                  border: `1px solid ${prepStatus.includes("✅") ? "#A5D6A7" : "#EF9A9A"}`
                },
                children: prepStatus
              }),
              _jsx(ze, {
                onClick: handleSendPrepEmail,
                disabled: prepLoading,
                style: {
                  width: "100%",
                  marginTop: 6,
                  padding: "14px",
                  fontSize: 14,
                  fontWeight: 700,
                  background: prepLoading ? "#B0BEC5" : "linear-gradient(135deg,#1565C0,#0D47A1)"
                },
                children: prepLoading ? "⏳ Envoi du mail en cours..." : "🚀 Envoyer l'email de préparation au client"
              })
            ]
          })
        ]
      }), E === "agenda" && _jsxs("div", {
        children: [_jsxs("div", {
          style: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 16,
            flexWrap: "wrap",
            gap: 10
          },
          children: [_jsxs("h3", {
            style: {
              fontFamily: "'Playfair Display',serif",
              fontSize: 20,
              color: z
            },
            children: ["Agenda \u2014 ", Gu[Pt], " ", x]
          }), _jsxs("div", {
            style: {
              display: "flex",
              gap: 8,
              alignItems: "center",
              flexWrap: "wrap"
            },
            children: [_jsx("div", {
              style: {
                display: "flex",
                gap: 6
              },
              children: $l.map(c => _jsxs("span", {
                style: {
                  fontSize: 11,
                  padding: "3px 8px",
                  borderRadius: 20,
                  background: c.id === "conseil" ? "#E3F0FF" : c.id === "suivi" ? "#E8F5E9" : "#EDE7F6",
                  color: z
                },
                children: [c.icon, " ", c.title.split(" ")[0]]
              }, c.id))
            }), _jsx("button", {
              onClick: () => {
                Pt === 0 ? (hl(11), U(c => c - 1)) : hl(c => c - 1);
              },
              style: {
                background: V,
                border: "none",
                borderRadius: 8,
                padding: "6px 14px",
                color: q,
                fontSize: 13,
                fontWeight: 700,
                cursor: "pointer"
              },
              children: "\u2190 Pr\xE9c."
            }), _jsx("button", {
              onClick: () => {
                let c = new Date();
                hl(c.getMonth()), U(c.getFullYear());
              },
              style: {
                background: q,
                border: "none",
                borderRadius: 8,
                padding: "6px 12px",
                color: "#fff",
                fontSize: 12,
                fontWeight: 600,
                cursor: "pointer"
              },
              children: "Aujourd'hui"
            }), _jsx("button", {
              onClick: () => {
                Pt === 11 ? (hl(0), U(c => c + 1)) : hl(c => c + 1);
              },
              style: {
                background: V,
                border: "none",
                borderRadius: 8,
                padding: "6px 14px",
                color: q,
                fontSize: 13,
                fontWeight: 700,
                cursor: "pointer"
              },
              children: "Suiv. \u2192"
            })]
          })]
        }), _jsx("div", {
          style: {
            display: "flex",
            gap: 10,
            marginBottom: 14,
            flexWrap: "wrap"
          },
          children: [["#E3F0FF", "S\xE9ance Conseil"], ["#E8F5E9", "Suivi Bien-\xEAtre"], ["#EDE7F6", "Bilan Nutritionnel"], ["#FFF3E0", "Rappel 48h"]].map(([c, y]) => _jsxs("div", {
            style: {
              display: "flex",
              alignItems: "center",
              gap: 5,
              fontSize: 11,
              color: "#546E7A"
            },
            children: [_jsx("div", {
              style: {
                width: 12,
                height: 12,
                borderRadius: 3,
                background: c,
                border: "1px solid rgba(0,0,0,.1)"
              }
            }), y]
          }, y))
        }), _jsx("div", {
          style: {
            display: "grid",
            gridTemplateColumns: "repeat(7,1fr)",
            gap: 4,
            marginBottom: 4
          },
          children: Pr.map(c => _jsx("div", {
            style: {
              textAlign: "center",
              fontSize: 11,
              fontWeight: 700,
              color: "#90A4AE",
              padding: "6px 0",
              background: "#fff",
              borderRadius: 6
            },
            children: c
          }, c))
        }), _jsx("div", {
          style: {
            display: "grid",
            gridTemplateColumns: "repeat(7,1fr)",
            gap: 4
          },
          children: (() => {
            let c = new Date().toISOString().split("T")[0],
              y = new Date(x, Pt, 1).getDay(),
              b = y === 0 ? 6 : y - 1,
              _ = new Date(x, Pt + 1, 0).getDate(),
              G = [...Array(b).fill(null), ...Array.from({
                length: _
              }, (H, F) => F + 1)];
            for (; G.length % 7 !== 0;) G.push(null);
            return G.map((H, F) => {
              if (!H) return _jsx("div", {
                style: {
                  minHeight: 80
                }
              }, F);
              let N = `${x}-${String(Pt + 1).padStart(2, "0")}-${String(H).padStart(2, "0")}`,
                K = N === c,
                P = new Date(x, Pt, H).getDay() === 0,
                Ye = p.filter($ => $.rdv_date === N && $.status === "confirmed"),
                Ht = Ye.some($ => tn($)),
                D = N < c,
                He = M.some($ => $.blocked_date === N && (!$.slot || $.slot === ""));
              return _jsxs("div", {
                style: {
                  background: He ? "#FFF3E0" : P ? "#F8FAFF" : D ? "#FAFAFA" : "#fff",
                  borderRadius: 10,
                  padding: "6px 8px",
                  border: `2px solid ${K ? q : He ? "#FF8F00" : V}`,
                  minHeight: 80,
                  opacity: P ? 0.4 : 1,
                  position: "relative",
                  backgroundImage: He ? "repeating-linear-gradient(45deg,transparent,transparent 4px,rgba(255,143,0,.15) 4px,rgba(255,143,0,.15) 8px)" : "none"
                },
                children: [_jsxs("div", {
                  style: {
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 4
                  },
                  children: [_jsx("span", {
                    style: {
                      fontSize: 13,
                      fontWeight: 700,
                      color: K ? "#fff" : D ? "#B0BEC5" : He ? "#E65100" : z,
                      background: K ? q : "transparent",
                      borderRadius: "50%",
                      width: 22,
                      height: 22,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center"
                    },
                    children: H
                  }), He && _jsx("span", {
                    style: {
                      fontSize: 9,
                      color: "#E65100",
                      fontWeight: 700
                    },
                    children: "\u{1F512} Bloqu\xE9"
                  }), Ye.length > 0 && _jsx("span", {
                    style: {
                      fontSize: 9,
                      background: Ht ? "#FF8F00" : q,
                      color: "#fff",
                      borderRadius: 10,
                      padding: "1px 5px",
                      fontWeight: 700
                    },
                    children: Ye.length
                  })]
                }), P ? _jsx("div", {
                  style: {
                    fontSize: 8,
                    color: "#BDBDBD",
                    textAlign: "center"
                  },
                  children: "Ferm\xE9"
                }) : Ye.slice(0, 3).map($ => _jsxs("div", {
                  onClick: () => {
                    let Xe = w.find($e => $e.email === $.patient_email) || {
                      id: $.patient_id || $.patient_email,
                      email: $.patient_email,
                      prenom: $.patient_name?.split(" ")[0] || "",
                      nom: $.patient_name?.split(" ").slice(1).join(" ") || "",
                      created_at: $.created_at
                    };
                    Mr(Xe);
                  },
                  style: {
                    background: tn($) ? "#FFF3E0" : $.service_id === "conseil" ? "#E3F0FF" : $.service_id === "suivi" ? "#E8F5E9" : "#EDE7F6",
                    borderRadius: 5,
                    padding: "3px 5px",
                    marginBottom: 3,
                    fontSize: 9,
                    color: z,
                    cursor: "pointer",
                    borderLeft: `2px solid ${$.service_id === "conseil" ? q : $.service_id === "suivi" ? "#43A047" : "#7B1FA2"}`
                  },
                  children: [_jsx("span", {
                    style: {
                      fontWeight: 700
                    },
                    children: $.slot
                  }), " ", $.service_icon, " ", _jsx("span", {
                    style: {
                      opacity: 0.8
                    },
                    children: $.patient_name?.split(" ")[0]
                  })]
                }, $.id)), Ye.length > 3 && _jsxs("div", {
                  style: {
                    fontSize: 8,
                    color: "#90A4AE",
                    textAlign: "center"
                  },
                  children: ["+", Ye.length - 3, " autres"]
                })]
              }, F);
            });
          })()
        }), _jsx("div", {
          style: {
            display: "flex",
            gap: 12,
            marginTop: 16,
            flexWrap: "wrap"
          },
          children: [[`\u{1F4C5} ${p.filter(c => c.rdv_date?.startsWith(`${x}-${String(Pt + 1).padStart(2, "0")}`)).length} s\xE9ance(s) ce mois`, V, q], [`\u23F0 ${p.filter(c => c.rdv_date?.startsWith(`${x}-${String(Pt + 1).padStart(2, "0")}`) && tn(c)).length} rappel(s) 48h`, "#FFF3E0", "#E65100"]].map(([c, y, b]) => _jsx("div", {
            style: {
              background: y,
              borderRadius: 10,
              padding: "8px 14px",
              fontSize: 12,
              color: b,
              fontWeight: 600
            },
            children: c
          }, c))
        })]
      }), E === "rdvs" && _jsxs("div", {
        children: [_jsxs("div", {
          style: {
            display: "flex",
            gap: 8,
            marginBottom: 16,
            flexWrap: "wrap",
            alignItems: "center"
          },
          children: [[["all", "Toutes"], ["upcoming", "\xC0 venir"], ["today", "Aujourd'hui"], ["past", "Pass\xE9es"], ["reminder", "Rappels 48h"], ["cancelled", "Annul\xE9es"]].map(([c, y]) => _jsx("button", {
            onClick: () => vl(c),
            style: {
              padding: "7px 13px",
              borderRadius: 20,
              border: `2px solid ${ke === c ? q : "#E0E0E0"}`,
              background: ke === c ? q : "#fff",
              color: ke === c ? "#fff" : "#546E7A",
              fontSize: 12,
              fontWeight: 600
            },
            children: y
          }, c)), _jsx("input", {
            value: De,
            onChange: c => st(c.target.value),
            placeholder: "\u{1F50D} Rechercher\u2026",
            style: {
              ...Vl,
              flex: 1,
              minWidth: 140
            }
          })]
        }), qr.length === 0 ? _jsx("p", {
          style: {
            textAlign: "center",
            color: "#90A4AE",
            padding: 30
          },
          children: "Aucune s\xE9ance trouv\xE9e."
        }) : qr.map(c => _jsx("div", {
          style: {
            background: "#fff",
            borderRadius: 14,
            padding: "16px 18px",
            marginBottom: 10,
            boxShadow: "0 2px 10px rgba(21,101,192,.06)",
            borderLeft: `4px solid ${c.status === "cancelled" ? "#FFCDD2" : tn(c) ? "#FF8F00" : at(c) ? "#CFD8DC" : q}`,
            opacity: c.status === "cancelled" ? 0.7 : 1
          },
          children: _jsxs("div", {
            style: {
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 10
            },
            children: [_jsxs("div", {
              children: [_jsxs("div", {
                style: {
                  display: "flex",
                  gap: 8,
                  alignItems: "center",
                  flexWrap: "wrap",
                  marginBottom: 5
                },
                children: [_jsx("span", {
                  style: {
                    fontFamily: "'Playfair Display',serif",
                    fontSize: 15,
                    color: z,
                    fontWeight: 700
                  },
                  children: c.patient_name
                }), _jsxs(We, {
                  children: [c.service_icon, " ", c.service_title]
                }), c.status === "cancelled" && _jsx(We, {
                  bg: "#FCE4EC",
                  color: "#C62828",
                  children: "\u2717 Annul\xE9"
                }), tn(c) && _jsx(We, {
                  bg: "#FFF3E0",
                  color: "#E65100",
                  children: "\u23F0 Rappel 48h"
                }), c.recurring && _jsx(We, {
                  bg: "#FFF8E1",
                  color: "#F57F17",
                  children: "\u{1F501}"
                })]
              }), _jsxs("div", {
                style: {
                  fontSize: 12,
                  color: "#546E7A"
                },
                children: ["\u{1F4C5} ", vt(c.rdv_date), " \xB7 \u{1F550} ", c.slot, " \xB7 \u{1F4E7} ", c.patient_email]
              }), c.notes && _jsxs("div", {
                style: {
                  fontSize: 11,
                  color: "#78909C",
                  marginTop: 3,
                  fontStyle: "italic"
                },
                children: ["\u{1F4AC} ", c.notes]
              }), c.docs?.length > 0 && _jsx("div", {
                style: {
                  marginTop: 5,
                  display: "flex",
                  gap: 6,
                  flexWrap: "wrap"
                },
                children: c.docs.map(y => _jsxs(We, {
                  bg: "#F3E5F5",
                  color: "#6A1B9A",
                  children: ["\u{1F4CE} ", y]
                }, y))
              })]
            }), _jsxs("div", {
              style: {
                display: "flex",
                flexDirection: "column",
                gap: 5,
                alignItems: "flex-end"
              },
              children: [_jsx("span", {
                style: {
                  fontFamily: "monospace",
                  fontSize: 10,
                  color: "#90A4AE"
                },
                children: c.id
              }), _jsx("button", {
                onClick: () => {
                  W(c), Ne("confirm");
                },
                style: {
                  background: V,
                  border: "none",
                  color: q,
                  borderRadius: 7,
                  padding: "5px 10px",
                  fontSize: 11,
                  fontWeight: 600
                },
                children: "\u{1F4E7} Aper\xE7u"
              }), tn(c) && _jsx("button", {
                onClick: () => {
                  W(c), Ne("48h");
                },
                style: {
                  background: "#FFF3E0",
                  border: "none",
                  color: "#E65100",
                  borderRadius: 7,
                  padding: "5px 10px",
                  fontSize: 11,
                  fontWeight: 600
                },
                children: "\u23F0 Rappel"
              }), tn(c) && _jsx("button", {
                onClick: () => Mu(c),
                style: {
                  background: "#E8F5E9",
                  border: "none",
                  color: "#2E7D32",
                  borderRadius: 7,
                  padding: "5px 10px",
                  fontSize: 11
                },
                children: "\u2713 Envoy\xE9"
              }), _jsx("button", {
                onClick: () => kr(c),
                style: {
                  background: "#FCE4EC",
                  border: "none",
                  color: "#C62828",
                  borderRadius: 7,
                  padding: "5px 10px",
                  fontSize: 11,
                  fontWeight: 600
                },
                children: "\u{1F5D1} Supprimer"
              })]
            })]
          })
        }, c.id))]
      }), E === "clients" && !O && _jsxs("div", {
        children: [_jsxs("div", {
          style: {
            display: "flex",
            gap: 10,
            marginBottom: 16,
            flexWrap: "wrap",
            alignItems: "center"
          },
          children: [_jsx("input", {
            value: De,
            onChange: c => st(c.target.value),
            placeholder: "\u{1F50D} Rechercher un client\u2026",
            style: {
              ...Vl,
              flex: 1,
              minWidth: 180
            }
          }), _jsxs("select", {
            value: wt || "nom",
            onChange: c => bl(c.target.value),
            style: {
              ...Vl,
              width: "auto",
              padding: "8px 12px"
            },
            children: [_jsx("option", {
              value: "nom",
              children: "Trier par nom"
            }), _jsx("option", {
              value: "date",
              children: "Trier par inscription"
            }), _jsx("option", {
              value: "seances",
              children: "Trier par nb de séances"
            }), _jsx("option", {
              value: "suivi",
              children: "Trier par suivi requis"
            })]
          }), _jsx("button", {
            disabled: sendingEmails,
            onClick: async () => {
              if (!window.confirm("Envoyer l'e-mail de suivi métabolique mensuel à tous vos clients (avec ou sans compte) ?")) return;
              setSendingEmails(!0);
              try {
                const res = await fetch("/api/send-monthly-reminders", {
                  method: "POST",
                  headers: {
                    Authorization: `Bearer ${activeSessionToken || j}`
                  }
                });
                const data = await res.json();
                if (res.ok && data.success) {
                  alert(`📧 Succès : e-mails envoyés à ${data.sent} client(s) (${data.failed} échec(s)).`);
                } else {
                  alert(`❌ Erreur : ${data.error || "Impossible d'envoyer les e-mails."}`);
                }
              } catch (err) {
                console.error("Manual reminders trigger error:", err);
                alert("❌ Une erreur est survenue lors de la communication avec le serveur.");
              } finally {
                setSendingEmails(!1);
              }
            },
            style: {
              background: sendingEmails ? "#E0E0E0" : "#E0F2F1",
              border: "1px solid #80CBC4",
              color: "#004D40",
              borderRadius: 10,
              padding: "8px 16px",
              fontSize: 12,
              fontWeight: 600,
              cursor: sendingEmails ? "not-allowed" : "pointer",
              display: "flex",
              alignItems: "center",
              gap: 6
            },
            children: sendingEmails ? "Envoi en cours..." : "✉️ Rappel mensuel global"
          })]
        }), [...w].filter(c => !De || `${c.prenom} ${c.nom} ${c.email}`.toLowerCase().includes(De.toLowerCase())).sort((a, b) => {
          if (wt === "date") {
            return (b.created_at || "").localeCompare(a.created_at || "");
          }
          if (wt === "seances") {
            const countA = p.filter(h => h.patient_id === a.id).length;
            const countB = p.filter(h => h.patient_id === b.id).length;
            return countB - countA;
          }
          if (wt === "suivi") {
            const getFollowUpDays = c => {
              const sessions = p.filter(h => h.patient_id === c.id && h.status !== "cancelled");
              if (sessions.length === 0) return -1;
              const last = [...sessions].sort((x, y) => (y.rdv_date || "").localeCompare(x.rdv_date || ""))[0];
              if (!last || !last.rdv_date) return -1;
              return Math.floor((Date.now() - new Date(last.rdv_date + "T12:00:00")) / 864e5);
            };
            return getFollowUpDays(b) - getFollowUpDays(a);
          }
          // Default: sort alphabetically by last name (nom), then first name (prenom)
          const getSortName = c => {
            const nom = (c.nom || "").replace(/^[^a-zA-ZÀ-ÿ0-9]+/g, "").trim().toLowerCase();
            const prenom = (c.prenom || "").replace(/^[^a-zA-ZÀ-ÿ0-9]+/g, "").trim().toLowerCase();
            if (nom && prenom) return `${nom} ${prenom}`;
            if (nom) return nom;
            if (prenom) return prenom;
            return (c.email || "").trim().toLowerCase();
          };
          return getSortName(a).localeCompare(getSortName(b));
        }).map(c => {
          let y = p.filter(H => H.patient_id === c.id || (c.email && H.patient_email === c.email)),
            b = y.filter(H => !at(H) && H.status === "confirmed").sort((H, F) => (H.rdv_date || "").localeCompare(F.rdv_date || ""))[0],
            _ = y.filter(H => at(H)).sort((H, F) => (F.rdv_date || "").localeCompare(H.rdv_date || ""))[0],
            G = ((c.prenom || "?")[0] + (c.nom || "?")[0]).toUpperCase();
          return _jsxs("div", {
            onClick: () => Mr(c),
            style: {
              background: "#fff",
              borderRadius: 14,
              padding: "16px 18px",
              marginBottom: 10,
              boxShadow: "0 2px 10px rgba(21,101,192,.06)",
              display: "flex",
              alignItems: "center",
              gap: 14,
              cursor: "pointer",
              flexWrap: "wrap"
            },
            children: [_jsx("div", {
              style: {
                width: 42,
                height: 42,
                borderRadius: 12,
                background: `linear-gradient(135deg,${q},#42A5F5)`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 15,
                color: "#fff",
                fontWeight: 700,
                fontFamily: "'Playfair Display',serif",
                flexShrink: 0
              },
              children: G
            }), _jsxs("div", {
              style: {
                flex: 1
              },
              children: [_jsxs("div", {
                style: {
                  fontFamily: "'Playfair Display',serif",
                  fontSize: 15,
                  color: z,
                  display: "flex",
                  alignItems: "center",
                  gap: 6
                },
                children: [
                  c.prenom || c.nom ? `${(c.nom || "").toUpperCase()} ${c.prenom || ""}`.trim() : c.email,
                  (c.client_files || []).some(f => f.uploaded_by === "client" && f.is_new_for_admin === true) && _jsx("span", {
                    style: {
                      width: 7,
                      height: 7,
                      borderRadius: "50%",
                      background: "#FF5252",
                      display: "inline-block",
                      boxShadow: "0 0 6px #FF5252",
                      animation: "pulse-glow 1.5s infinite"
                    }
                  })
                ]
              }), _jsxs("div", {
                style: {
                  display: "flex",
                  gap: 6,
                  flexWrap: "wrap",
                  marginTop: 3
                },
                children: [
                  c.has_account ? _jsx("span", {
                    style: {
                      background: "#E3F2FD",
                      color: "#1565C0",
                      fontSize: 10,
                      fontWeight: 700,
                      padding: "2px 8px",
                      borderRadius: 20
                    },
                    children: "\u{1F464} Compte cr\xE9\xE9"
                  }) : _jsx("span", {
                    style: {
                      background: "#ECEFF1",
                      color: "#455A64",
                      fontSize: 10,
                      fontWeight: 700,
                      padding: "2px 8px",
                      borderRadius: 20
                    },
                    children: "\u{1F4CB} Fiche admin"
                  }),
                  _jsx("button", {
                    onClick: ev => {
                      ev.stopPropagation();
                      setPrepClient(c.id);
                      if (c.email) setPrepClient(c.id);
                      g("mail_prep");
                    },
                    style: {
                      background: "linear-gradient(135deg, #1565C0, #0D47A1)",
                      color: "#fff",
                      border: "none",
                      borderRadius: 20,
                      padding: "2px 10px",
                      fontSize: 10,
                      fontWeight: 700,
                      cursor: "pointer",
                      boxShadow: "0 2px 6px rgba(21,101,192,.2)",
                      marginLeft: 4
                    },
                    children: "✉️ Mail Préparation"
                  }),
                  y.length === 0 && _jsx("span", {
                    style: {
                      background: "#E8F5E9",
                      color: "#2E7D32",
                      fontSize: 10,
                      fontWeight: 700,
                      padding: "2px 8px",
                      borderRadius: 20
                    },
                    children: "\u{1F195} Nouveau"
                  }), (() => {
                  let H = y.filter(N => N.status !== "cancelled").sort((N, K) => (K.rdv_date || "").localeCompare(N.rdv_date || ""))[0];
                  if (!H) return null;
                  let F = Math.floor((Date.now() - new Date(H.rdv_date + "T12:00:00")) / 864e5);
                  return F >= 30 && F < 90 ? _jsxs("span", {
                    style: {
                      background: "#FFF3E0",
                      color: "#E65100",
                      fontSize: 10,
                      fontWeight: 700,
                      padding: "2px 8px",
                      borderRadius: 20
                    },
                    children: ["\u26A0\uFE0F Suivi requis (", F, "j)"]
                  }) : F >= 90 ? _jsxs("span", {
                    style: {
                      background: "#FCE4EC",
                      color: "#C62828",
                      fontSize: 10,
                      fontWeight: 700,
                      padding: "2px 8px",
                      borderRadius: 20
                    },
                    children: ["\u{1F534} Inactif (", F, "j)"]
                  }) : null;
                })()]
              }), _jsxs("div", {
                style: {
                  fontSize: 12,
                  color: "#78909C",
                  marginTop: 2
                },
                children: [c.email, " \xB7 ", y.length, " s\xE9ance", y.length > 1 ? "s" : ""]
              })]
            }), _jsxs("div", {
              style: {
                textAlign: "right",
                fontSize: 11,
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
                gap: 6
              },
              children: [b && _jsxs("div", {
                style: {
                  color: "#2E7D32"
                },
                children: ["Prochain : ", Ke(b.rdv_date)]
              }), _ && _jsxs("div", {
                style: {
                  color: "#78909C"
                },
                children: ["Dernier : ", Ke(_.rdv_date)]
              }), _jsx("button", {
                onClick: H => {
                  H.stopPropagation(), Nr(c);
                },
                style: {
                  background: "#FCE4EC",
                  border: "none",
                  color: "#C62828",
                  borderRadius: 7,
                  padding: "4px 10px",
                  fontSize: 11,
                  fontWeight: 600,
                  cursor: "pointer",
                  marginTop: 4
                },
                children: "\u{1F5D1} Supprimer"
              })]
            })]
          }, c.id);
        })]
      }), E === "fiche" && O && _jsxs("div", {
        children: [_jsxs("div", {
          style: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 16
          },
          children: [_jsx("button", {
            onClick: () => {
              g("clients"), L(null);
            },
            style: {
              background: "#fff",
              border: `2px solid ${V}`,
              color: q,
              borderRadius: 10,
              padding: "8px 16px",
              fontSize: 13,
              fontWeight: 600
            },
            children: "\u2190 Liste clients"
          }), _jsxs("div", {
            style: {
              display: "flex",
              gap: 10
            },
            children: [_jsx("button", {
              onClick: () => {
                g("nouveau"), Ft(c => ({
                  ...c,
                  prenom: O.prenom,
                  nom: O.nom,
                  email: O.email,
                  tel: O.tel
                }));
              },
              style: {
                background: V,
                border: "none",
                color: q,
                borderRadius: 10,
                padding: "8px 16px",
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer"
              },
              children: "\u{1F4C5} Nouveau RDV pour ce client"
            }), _jsx("button", {
              onClick: () => Nr(O),
              style: {
                background: "#FCE4EC",
                border: "none",
                color: "#C62828",
                borderRadius: 10,
                padding: "8px 16px",
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer"
              },
              children: "\u{1F5D1} Supprimer ce client"
            })]
          })]
        }), _jsxs("div", {
          style: {
            background: `linear-gradient(135deg,${z},${q})`,
            borderRadius: 16,
            padding: "20px 24px",
            marginBottom: 20,
            display: "flex",
            gap: 16,
            alignItems: "center",
            flexWrap: "wrap"
          },
          children: [_jsx("div", {
            style: {
              width: 50,
              height: 50,
              borderRadius: 12,
              background: "rgba(255,255,255,.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 20,
              color: "#fff",
              fontFamily: "'Playfair Display',serif",
              fontWeight: 700
            },
            children: ((O.prenom || "?")[0] + (O.nom || "?")[0]).toUpperCase()
          }), _jsxs("div", {
            children: [_jsxs("div", {
              style: {
                fontFamily: "'Playfair Display',serif",
                fontSize: 20,
                color: "#fff"
              },
              children: [O.prenom, " ", O.nom]
            }), _jsxs("div", {
              style: {
                fontSize: 12,
                color: "rgba(255,255,255,.7)"
              },
              children: [O.email, O.tel ? ` \xB7 ${O.tel}` : "", O.dob ? ` \xB7 N\xE9(e) le ${new Date(O.dob).toLocaleDateString("fr-FR")}` : ""]
            })]
          }), _jsxs("div", {
            style: {
              marginLeft: "auto",
              textAlign: "right"
            },
            children: [_jsx("div", {
              style: {
                fontSize: 22,
                fontWeight: 800,
                color: "#fff",
                fontFamily: "'Playfair Display',serif"
              },
              children: de.length
            }), _jsxs("div", {
              style: {
                fontSize: 10,
                color: "rgba(255,255,255,.7)"
              },
              children: ["s\xE9ance", de.length > 1 ? "s" : ""]
            })]
          })]
        }), _jsxs("div", {
          style: {
            background: "#fff",
            borderRadius: 14,
            padding: 20,
            boxShadow: "0 2px 12px rgba(21,101,192,.06)",
            marginBottom: 14
          },
          children: [_jsx("h4", {
            style: {
              fontFamily: "'Playfair Display',serif",
              fontSize: 16,
              color: z,
              marginBottom: 14
            },
            children: "\u{1F4C5} Historique des s\xE9ances"
          }), de.filter(c => c.status !== "archived").length === 0 ? _jsx("p", {
            style: {
              color: "#90A4AE",
              fontSize: 13
            },
            children: "Aucune s\xE9ance."
          }) : de.filter(c => c.status !== "archived" && c.status !== "cancelled" && !c.id?.startsWith("RDV_PREP_") && !c.id?.startsWith("RDV_BERTHAUX_")).map(c => _jsxs("div", {
            style: {
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "9px 0",
              borderBottom: "1px solid #F0F4FF",
              fontSize: 12,
              flexWrap: "wrap",
              gap: 6,
              opacity: c.status === "archived" ? 0.6 : 1
            },
            children: [_jsxs("span", {
              children: [_jsxs("span", {
                style: {
                  color: "#78909C"
                },
                children: [Ke(c.rdv_date), " \xE0 ", c.slot]
              }), " \xB7 ", _jsxs("strong", {
                style: {
                  color: z
                },
                children: [c.service_icon, " ", c.service_title]
              }), " ", c.status === "cancelled" && _jsx(We, {
                bg: "#FCE4EC",
                color: "#C62828",
                children: "Annul\xE9"
              }), c.status === "completed" && _jsx(We, {
                bg: "#E8F5E9",
                color: "#2E7D32",
                children: "\u2713 Effectu\xE9e"
              }), c.status === "confirmed" && c.rdv_date >= new Date().toISOString().split("T")[0] && _jsx(We, {
                bg: "#E3F0FF",
                color: "#1565C0",
                children: "Confirm\xE9"
              })]
            }), _jsxs("div", {
              style: {
                display: "flex",
                gap: 6,
                alignItems: "center",
                flexWrap: "wrap"
              },
              children: [c.docs?.length > 0 && _jsx("div", {
                style: {
                  display: "flex",
                  gap: 4,
                  flexWrap: "wrap"
                },
                children: c.docs.map(y => _jsxs(We, {
                  bg: "#F3E5F5",
                  color: "#6A1B9A",
                  children: ["\u{1F4CE} ", y]
                }, y))
              }), c.status !== "completed" && _jsx("button", {
                onClick: () => Q(c),
                style: {
                  background: V,
                  border: "none",
                  color: q,
                  borderRadius: 7,
                  padding: "4px 10px",
                  fontSize: 11,
                  fontWeight: 600,
                  cursor: "pointer"
                },
                children: "\u270F\uFE0F Modifier"
              }), _jsx("button", {
                onClick: () => kr(c),
                style: {
                  background: "#FCE4EC",
                  border: "none",
                  color: "#C62828",
                  borderRadius: 7,
                  padding: "4px 10px",
                  fontSize: 11,
                  fontWeight: 600,
                  cursor: "pointer"
                },
                children: "\u{1F5D1} Supprimer"
              })]
            })]
          }, c.id))]
        }), _jsxs("div", {
          style: {
            background: "#fff",
            borderRadius: 14,
            padding: 20,
            boxShadow: "0 2px 12px rgba(21,101,192,.06)",
            marginBottom: 14
          },
          children: [_jsx("h4", {
            style: {
              fontFamily: "'Playfair Display',serif",
              fontSize: 16,
              color: z,
              marginBottom: 14
            },
            children: "\u{1F4DD} Formulaires bien-\xEAtre"
          }), yl.length === 0 ? _jsx("p", {
            style: {
              color: "#90A4AE",
              fontSize: 13
            },
            children: "Aucun formulaire rempli pour l'instant."
          }) : yl.map((c, y) => {
            let b = Fn === y,
              _ = vt(c.created_at?.split("T")[0]),
              G = Object.entries(c.responses || {}).filter(([H, F]) => F ? H.endsWith("_detail") ? !0 : Wi.find(N => N.k === H) || Vu.find(N => N.k === H) : !1);
            return _jsxs("div", {
              style: {
                borderRadius: 10,
                marginBottom: 10,
                border: `1px solid ${V}`,
                overflow: "hidden"
              },
              children: [_jsxs("div", {
                style: {
                  background: b ? "#1565C0" : "#F8FAFF",
                  display: "flex",
                  alignItems: "center",
                  transition: "all .2s"
                },
                children: [_jsxs("div", {
                  onClick: () => en(b ? -1 : y),
                  style: {
                    flex: 1,
                    padding: "12px 16px",
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                  },
                  children: [_jsxs("div", {
                    children: [_jsxs("div", {
                      style: {
                        fontSize: 13,
                        fontWeight: 700,
                        color: b ? "#fff" : z
                      },
                      children: ["\u{1F4CB} Formulaire du ", _]
                    }), _jsxs("div", {
                      style: {
                        fontSize: 11,
                        color: b ? "rgba(255,255,255,.7)" : "#90A4AE"
                      },
                      children: [G.length, " r\xE9ponse", G.length > 1 ? "s" : ""]
                    })]
                  }), _jsx("span", {
                    style: {
                      color: b ? "#fff" : q,
                      fontSize: 18,
                      display: "inline-block",
                      transform: b ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "transform .2s"
                    },
                    children: "\u25BE"
                  })]
                }), _jsx("button", {
                  onClick: async H => {
                    if (H.stopPropagation(), !!window.confirm("Supprimer ce formulaire d\xE9finitivement ?")) try {
                      qt(F => F.filter((N, K) => K !== y)), en(-1);
                      ee || (await adminDelete("questionnaires", c.id).catch(() => {}));
                    } catch (F) {
                      console.error(F);
                    }
                  },
                  style: {
                    background: "#FCE4EC",
                    border: "none",
                    color: "#C62828",
                    padding: "8px 12px",
                    cursor: "pointer",
                    fontSize: 13,
                    borderLeft: `1px solid ${b ? "rgba(255,255,255,.2)" : "#E3F0FF"}`
                  },
                  title: "Supprimer ce formulaire",
                  children: "\u{1F5D1}"
                })]
              }), b && _jsx("div", {
                style: {
                  padding: "14px 16px",
                  background: "#fff"
                },
                children: G.map(([H, F]) => {
                  let N = Wi.find(P => P.k === H) || Vu.find(P => P.k === H),
                    K = H.endsWith("_detail") ? "\u2192 Pr\xE9cisions (Autre objectif)" : N?.q || H;
                  return _jsxs("div", {
                    style: {
                      fontSize: 12,
                      color: "#546E7A",
                      marginBottom: 10,
                      padding: "8px 0",
                      borderBottom: "1px solid #F0F4FF"
                    },
                    children: [_jsx("div", {
                      style: {
                        fontWeight: 600,
                        color: z,
                        marginBottom: 4
                      },
                      children: K
                    }), _jsxs("div", {
                      style: {
                        color: "#1565C0",
                        background: "#E8F0FE",
                        borderRadius: 6,
                        padding: "4px 10px",
                        display: "inline-block"
                      },
                      children: ["\u2192 ", F]
                    })]
                  }, H);
                })
              })]
            }, y);
          })]
        }), (() => {
          let c = `${O.prenom || ""} ${O.nom || ""}`.trim();
          return [{
            name: c,
            isMain: !0
          }, ...(O.guests || []).map(b => ({
            name: b.name,
            isMain: !1
          }))].map((b, _) => {
            let G = (O.client_docs || []).filter(D => b.isMain ? !D.patient_name || D.patient_name === c || D.patient_name === "" : D.patient_name === b.name),
              H = de.filter(D => b.isMain ? !D.patient_name || D.patient_name === c || D.patient_name === "" : D.patient_name === b.name).flatMap(D => (D.docs || []).map((He, $) => ({
                name: He,
                data: D.docs_data?.[$]?.data || null,
                type: D.docs_data?.[$]?.type || "",
                date: D.rdv_date,
                slot: D.slot,
                rdv: D,
                rdvDocIdx: $
              }))),
              F = (O.all_supplements || []).filter(D => b.isMain ? !D.patient_name || D.patient_name === c || D.patient_name === "" : D.patient_name === b.name),
              N = de.filter(D => b.isMain ? !D.patient_name || D.patient_name === c || D.patient_name === "" : D.patient_name === b.name).flatMap(D => (D.supplements || []).map((He, $) => ({
                s: He,
                si: $,
                rdv: D
              }))),
              K = new Set(G.map(D => D.name + "_" + D.from_rdv)),
              P = [...G.map(D => ({
                ...D,
                fromProfile: !0
              })), ...H.filter(D => !K.has(D.name + "_" + D.date))],
              Ye = new Set(F.map(D => D.name + "_" + D.from_rdv)),
              Ht = [...F.map((D, He) => ({
                s: D.name,
                date: D.from_rdv,
                fromProfile: !0,
                idx: He
              })), ...N.filter(D => !Ye.has(D.s + "_" + D.rdv.rdv_date)).map(D => ({
                s: D.s,
                date: D.rdv.rdv_date,
                si: D.si,
                rdv: D.rdv
              }))];
            return P.length === 0 && Ht.length === 0 ? null : _jsxs("div", {
              style: {
                background: "#fff",
                borderRadius: 14,
                padding: 20,
                boxShadow: "0 2px 12px rgba(21,101,192,.06)",
                marginBottom: 14,
                border: b.isMain ? "none" : "2px solid #E3F0FF"
              },
              children: [_jsxs("h4", {
                style: {
                  fontFamily: "'Playfair Display',serif",
                  fontSize: 15,
                  color: b.isMain ? z : q,
                  marginBottom: 14
                },
                children: [b.isMain ? "\u{1F4CE} Documents & Compl\xE9ments \u2014 " : "\u{1F4CE} ", b.name, !b.isMain && _jsx("span", {
                  style: {
                    fontSize: 11,
                    color: "#90A4AE",
                    fontWeight: 400
                  },
                  children: " (proche)"
                })]
              }), Ht.length > 0 && _jsxs("div", {
                style: {
                  background: "#E8F0FE",
                  borderRadius: 10,
                  padding: "10px 14px",
                  marginBottom: 12
                },
                children: [_jsx("p", {
                  style: {
                    fontSize: 12,
                    fontWeight: 700,
                    color: z,
                    marginBottom: 8
                  },
                  children: "\u{1F48A} Compl\xE9ments alimentaires :"
                }), Ht.map((D, He) => _jsxs("div", {
                  style: {
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    background: "#fff",
                    borderRadius: 6,
                    padding: "5px 10px",
                    marginBottom: 4
                  },
                  children: [_jsx("span", {
                    style: {
                      fontSize: 14
                    },
                    children: "\u{1F48A}"
                  }), _jsx("span", {
                    style: {
                      fontSize: 13,
                      color: z,
                      flex: 1
                    },
                    children: D.s
                  }), _jsx("span", {
                    style: {
                      fontSize: 10,
                      color: "#90A4AE"
                    },
                    children: D.date ? Ke(D.date) : ""
                  }), _jsx("button", {
                    onClick: async () => {
                      if (window.confirm(`Supprimer "${D.s}" ?`)) {
                        if (D.fromProfile) {
                          let $ = (O.all_supplements || []).filter((Xe, $e) => $e !== D.idx);
                          ee || (await adminPatch("profiles", O.id, {
                            all_supplements: $
                          })), L(Xe => ({
                            ...Xe,
                            all_supplements: $
                          }));
                        } else if (D.rdv) {
                          let $ = (D.rdv.supplements || []).filter((Xe, $e) => $e !== D.si);
                          ee || (await adminPatch("appointments", D.rdv.id, {
                            supplements: $
                          })), gt(Xe => Xe.map($e => $e.id === D.rdv.id ? {
                            ...$e,
                            supplements: $
                          } : $e));
                        }
                      }
                    },
                    style: {
                      background: "#FCE4EC",
                      border: "none",
                      color: "#C62828",
                      borderRadius: 6,
                      padding: "3px 7px",
                      fontSize: 11,
                      cursor: "pointer"
                    },
                    children: "\u{1F5D1}"
                  })]
                }, He))]
              }), P.map((D, He) => _jsx("div", {
                style: {
                  background: "#F3E5F5",
                  borderRadius: 8,
                  padding: "10px 14px",
                  marginBottom: 8
                },
                children: _jsxs("div", {
                  style: {
                    display: "flex",
                    alignItems: "center",
                    gap: 10
                  },
                  children: [_jsx("span", {
                    style: {
                      fontSize: 18
                    },
                    children: D.type?.includes("pdf") ? "\u{1F4D5}" : D.type?.includes("image") ? "\u{1F5BC}\uFE0F" : "\u{1F4C4}"
                  }), _jsxs("div", {
                    style: {
                      flex: 1
                    },
                    children: [_jsx("div", {
                      style: {
                        fontSize: 13,
                        color: "#6A1B9A",
                        fontWeight: 600
                      },
                      children: D.name
                    }), _jsx("div", {
                      style: {
                        fontSize: 11,
                        color: "#90A4AE"
                      },
                      children: D.fromProfile ? `S\xE9ance du ${Ke(D.from_rdv)} \xE0 ${D.from_slot || ""}` : `S\xE9ance du ${Ke(D.date)} \xE0 ${D.slot}`
                    })]
                  }), D.data && _jsx("button", {
                    onClick: () => downloadBase64File(D.data, D.name),
                    style: {
                      background: "#6A1B9A",
                      color: "#fff",
                      borderRadius: 7,
                      padding: "5px 12px",
                      fontSize: 11,
                      fontWeight: 600,
                      border: "none",
                      cursor: "pointer"
                    },
                    children: "⬇ DL"
                  }), _jsx("button", {
                    onClick: async () => {
                      if (window.confirm(`Supprimer "${D.name}" ?`)) {
                        if (D.fromProfile) {
                          let $ = (O.client_docs || []).filter(Xe => !(Xe.name === D.name && Xe.from_rdv === D.from_rdv));
                          ee || (await adminPatch("profiles", O.id, {
                            client_docs: $
                          })), L(Xe => ({
                            ...Xe,
                            client_docs: $
                          }));
                        } else if (D.rdv) {
                          let $ = (D.rdv.docs || []).filter(($e, Sl) => Sl !== D.rdvDocIdx),
                            Xe = (D.rdv.docs_data || []).filter(($e, Sl) => Sl !== D.rdvDocIdx);
                          ee || (await adminPatch("appointments", D.rdv.id, {
                            docs: $,
                            docs_data: Xe
                          })), gt($e => $e.map(Sl => Sl.id === D.rdv.id ? {
                            ...Sl,
                            docs: $,
                            docs_data: Xe
                          } : Sl));
                        }
                      }
                    },
                    style: {
                      background: "#FCE4EC",
                      border: "none",
                      color: "#C62828",
                      borderRadius: 7,
                      padding: "5px 8px",
                      fontSize: 12,
                      cursor: "pointer"
                    },
                    children: "\u{1F5D1}"
                  })]
                })
              }, He))]
            }, _);
          }).filter(Boolean);
        })(), (O.guests || []).length > 0 && _jsxs("div", {
          style: {
            background: "#fff",
            borderRadius: 14,
            padding: 20,
            boxShadow: "0 2px 12px rgba(21,101,192,.06)",
            marginBottom: 14,
            border: "2px solid #E8F0FE"
          },
          children: [_jsx("h4", {
            style: {
              fontFamily: "'Playfair Display',serif",
              fontSize: 15,
              color: z,
              marginBottom: 12
            },
            children: "\u{1F468}\u200D\u{1F469}\u200D\u{1F467} Famille / Proches"
          }), (O.guests || []).map((c, y) => {
            let b = de.filter(_ => _.patient_name && _.patient_name.trim() === c.name.trim());
            return _jsxs("div", {
              style: {
                marginBottom: 12,
                paddingBottom: 12,
                borderBottom: y < (O.guests || []).length - 1 ? `1px solid ${V}` : "none"
              },
              children: [_jsxs("div", {
                style: {
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  marginBottom: 6
                },
                children: [_jsx("span", {
                  style: {
                    fontSize: 16
                  },
                  children: "\u{1F464}"
                }), _jsx("span", {
                  style: {
                    fontSize: 13,
                    fontWeight: 700,
                    color: z
                  },
                  children: c.name
                }), _jsxs("span", {
                  style: {
                    fontSize: 10,
                    color: "#90A4AE"
                  },
                  children: ["\u2014 proche de ", O.prenom]
                })]
              }), b.length === 0 ? _jsx("p", {
                style: {
                  fontSize: 11,
                  color: "#B0BEC5",
                  marginLeft: 24
                },
                children: "Aucune s\xE9ance pour l'instant."
              }) : b.map(_ => _jsxs("div", {
                style: {
                  background: "#F0F4FF",
                  borderRadius: 8,
                  padding: "6px 12px",
                  marginBottom: 4,
                  fontSize: 12,
                  color: "#546E7A",
                  display: "flex",
                  justifyContent: "space-between"
                },
                children: [_jsxs("span", {
                  children: [_.service_icon, " ", _.service_title]
                }), _jsxs("span", {
                  style: {
                    color: _.status === "cancelled" ? "#E53935" : "#546E7A"
                  },
                  children: [Ke(_.rdv_date), " \xE0 ", _.slot, _.status === "cancelled" ? " \u2014 Annul\xE9" : ""]
                })]
              }, _.id))]
            }, y);
          })]
        }), _jsxs("div", {
          style: {
            background: "#fff",
            borderRadius: 14,
            padding: 20,
            boxShadow: "0 2px 12px rgba(21,101,192,.06)",
            marginBottom: 14,
            border: "2px solid #EDE7F6"
          },
          children: [_jsx("h4", {
            style: {
              fontFamily: "'Playfair Display',serif",
              fontSize: 15,
              color: "#6A1B9A",
              marginBottom: 6
            },
            children: "\u{1F5C2} Dossier client (factures & documents)"
          }), _jsx("p", {
            style: {
              fontSize: 11,
              color: "#78909C",
              marginBottom: 12
            },
            children: "Le client peut t\xE9l\xE9charger ces fichiers depuis son espace, mais ne peut pas les supprimer."
          }), (() => {
            let drawerNoteFiles = [];
            if (Array.isArray(Oe)) {
              Oe.forEach(n => {
                if (n.note && (n.note.includes("📁 FICHIER CLIENT — ") || n.note.includes("📁 FICHIER ADMIN — "))) {
                  try {
                    let sIdx = n.note.indexOf("{");
                    let eIdx = n.note.lastIndexOf("}");
                    if (sIdx !== -1 && eIdx !== -1) {
                      let fileObj = JSON.parse(n.note.substring(sIdx, eIdx + 1));
                      drawerNoteFiles.push({ ...fileObj, _note_id: n.id });
                    }
                  } catch(err) {}
                }
              });
            }
            // Merge: start from O.client_files (source of truth), add note files not already present by name
            let profileFiles = O.client_files || [];
            let profileNames = new Set(profileFiles.map(f => f.name?.trim().toLowerCase()));
            let extraNoteFiles = drawerNoteFiles.filter(f => f.name && !profileNames.has(f.name.trim().toLowerCase()));
            let allDrawerFiles = [...profileFiles, ...extraNoteFiles];
            return allDrawerFiles.length === 0 ? _jsx("p", {
              style: {
                fontSize: 12,
                color: "#B0BEC5",
                textAlign: "center",
                padding: "8px 0"
              },
              children: "Aucun fichier d\xE9pos\xE9."
            }) : allDrawerFiles.map((c, y) => {
              const isFromClient = c.uploaded_by === "client";
              return _jsxs("div", {
                style: {
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  background: isFromClient ? "#E0F2F1" : "#F3E5F5",
                  borderRadius: 8,
                  padding: "8px 12px",
                  marginBottom: 6
                },
                children: [_jsx("span", {
                  style: {
                    fontSize: 18
                  },
                  children: c.type?.includes("pdf") ? "📕" : c.type?.includes("image") ? "🖼️" : "📄"
                }), _jsxs("div", {
                  style: {
                    flex: 1
                  },
                  children: [_jsxs("div", {
                    style: {
                      fontSize: 12,
                      fontWeight: 600,
                      color: isFromClient ? "#00695C" : "#6A1B9A",
                      display: "flex",
                      alignItems: "center",
                      gap: 6
                    },
                    children: [
                      c.name,
                      _jsx("span", {
                        style: {
                          fontSize: 9,
                          background: isFromClient ? "#004D40" : "#4A148C",
                          color: "#fff",
                          padding: "1px 5px",
                          borderRadius: 4,
                          fontWeight: 700
                        },
                        children: isFromClient ? "Client" : "VitaScienzeLab"
                      })
                    ]
                  }), _jsx("div", {
                    style: {
                      fontSize: 10,
                      color: isFromClient ? "#80CBC4" : "#90A4AE"
                    },
                    children: c.date
                  })
                ]
              }), c.data ? _jsx("button", {
                  onClick: () => downloadBase64File(c.data, c.name),
                  style: {
                    background: isFromClient ? "#00695C" : "#6A1B9A",
                    color: "#fff",
                    borderRadius: 7,
                    padding: "4px 10px",
                    fontSize: 11,
                    fontWeight: 600,
                    border: "none",
                    cursor: "pointer"
                  },
                  children: "⬇️"
                }) : _jsx("label", {
                  style: {
                    background: "#FFF3E0",
                    color: "#E65100",
                    borderRadius: 7,
                    padding: "3px 8px",
                    fontSize: 10,
                    fontWeight: 600,
                    cursor: "pointer",
                    border: "1px solid #FFE0B2",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 4
                  },
                  children: [
                    "📤 Joindre PDF",
                    _jsx("input", {
                      type: "file",
                      accept: "application/pdf,image/*",
                      style: { display: "none" },
                      onChange: async (e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        try {
                          const processed = await compressAndReadFile(file, O.id);
                          const updatedDoc = {
                            ...c,
                            data: processed.data,
                            storage_path: processed.storage_path,
                            date: new Date().toLocaleDateString("fr-FR")
                          };
                          let updatedList = (O.client_files || []).map(f => f.name === c.name ? updatedDoc : f);
                          if (!updatedList.some(f => f.name === c.name)) updatedList.push(updatedDoc);
                          L(prev => ({ ...prev, client_files: updatedList }));
                          B(prev => prev.map(p => p.id === O.id ? { ...p, client_files: updatedList } : p));
                          if (!ee) {
                            await fetch("/api/admin-write", {
                              method: "POST",
                              headers: { "Content-Type": "application/json" },
                              body: JSON.stringify({
                                operation: "append_client_files",
                                patientId: O.id,
                                newFiles: [updatedDoc],
                                replaceByName: true
                              })
                            });
                          }
                        } catch (err) {
                          alert(err.message || "Erreur lors de l'ajout du PDF.");
                        } finally {
                          e.target.value = "";
                        }
                      }
                    })
                  ]
                }), _jsx("button", {
                  onClick: async () => {
                    if (!window.confirm(`Supprimer "${c.name}" du dossier ?`)) return;
                    const targetNameLower = String(c.name || "").trim().toLowerCase();
                    // 1. Optimistic immediate UI update (instantaneous removal)
                    let b = (O.client_files || []).filter(f => String(f.name || "").trim().toLowerCase() !== targetNameLower);
                    L(_ => ({ ..._, client_files: b }));
                    B(_ => _.map(G => G.id === O.id ? { ...G, client_files: b } : G));
                    Ce(prev => Array.isArray(prev) ? prev.filter(n => {
                      if (c._note_id && n.id === c._note_id) return false;
                      if (!n.note || !n.note.includes("FICHIER")) return true;
                      try {
                        let sIdx = n.note.indexOf("{");
                        let eIdx = n.note.lastIndexOf("}");
                        if (sIdx === -1 || eIdx === -1) return true;
                        let obj = JSON.parse(n.note.substring(sIdx, eIdx + 1));
                        return String(obj.name || "").trim().toLowerCase() !== targetNameLower;
                      } catch (_) { return true; }
                    }) : []);

                    // 2. Server-side atomic cleanup (profiles + admin_notes + Supabase Storage)
                    if (!ee) {
                      try {
                        await fetch("/api/admin-write", {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({
                            operation: "delete_client_file",
                            patientId: O.id,
                            fileName: c.name,
                            noteId: c._note_id || null,
                            storagePath: c.storage_path || null
                          })
                        });
                      } catch (err) {
                        console.error("Delete file error:", err);
                      }
                    }
                  },
                  style: {
                    background: "#FCE4EC",
                    border: "none",
                    color: "#C62828",
                    borderRadius: 7,
                    padding: "4px 8px",
                    fontSize: 12,
                    cursor: "pointer"
                  },
                  children: "🗑️"
                })]
              }, y);
            });
          })(), _jsx("input", {
            type: "file",
            id: "clientFileInput",
            multiple: !0,
            accept: ".pdf,.jpg,.jpeg,.png,.doc,.docx,.xls,.xlsx",
            style: {
              display: "none"
            },
            onChange: async c => {
              const selectedFiles = Array.from(c.target.files);
              if (selectedFiles.length === 0) return;
              try {
                const processedFiles = await Promise.all(selectedFiles.map(file => compressAndReadFile(file, O.id)));
                const newFilesList = processedFiles.map(f => ({
                  name: f.name,
                  type: f.type,
                  data: f.data,
                  storage_path: f.storage_path || null,
                  date: new Date().toLocaleDateString("fr-FR"),
                  uploaded_by: "admin"
                }));
                const newNamesSet = new Set(newFilesList.map(f => (f.name || "").trim().toLowerCase()));
                const currentFiles = (O.client_files || []).filter(f => f && !newNamesSet.has((f.name || "").trim().toLowerCase()));
                const finalFiles = [...currentFiles, ...newFilesList];

                // Immediate UI update
                L(N => ({
                  ...N,
                  client_files: finalFiles
                }));
                B(N => N.map(K => K.id === O.id ? {
                  ...K,
                  client_files: finalFiles
                } : K));

                if (!ee) {
                  await fetch("/api/admin-write", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      operation: "append_client_files",
                      patientId: O.id,
                      newFiles: newFilesList,
                      notePrefix: "📁 FICHIER ADMIN — "
                    })
                  });
                  if (O.email && O.email !== "—" && O.email.includes("@")) {
                    const emailSubject = "📄 Nouveau document disponible — VITASCIENZELAB";
                    const emailHtml = `<div style="font-family:sans-serif;padding:20px;max-width:500px">
                      <h2 style="color:#1565C0">Nouveau document disponible</h2>
                      <p>Bonjour ${O.prenom || ""},</p>
                      <p>Un ou plusieurs nouveaux documents ont été ajoutés à votre dossier sur votre espace client :</p>
                      <blockquote style="background:#F5F5F5;padding:12px;border-left:4px solid #1565C0;margin:16px 0;border-radius:4px;">
                        <strong>${selectedFiles.length > 1 ? "Fichiers ajoutés :" : "Fichier ajouté :"}</strong><br/>
                        ${newFilesList.map(f => `• ${f.name}`).join("<br/>")}
                      </blockquote>
                      <p>Vous pouvez vous connecter à votre compte pour les consulter et les télécharger :</p>
                      <div style="margin:20px 0;">
                        <a href="https://vitascienzelab.vercel.app" style="background:#1565C0;color:#fff;padding:10px 20px;text-decoration:none;border-radius:5px;font-weight:bold;display:inline-block;">Accéder à mon espace client</a>
                      </div>
                      <p style="color:#546E7A;font-size:12px">Si vous n'avez pas encore créé de compte, vous pouvez le faire en utilisant cette même adresse e-mail (${O.email}) pour y retrouver automatiquement vos documents.</p>
                      <hr style="border:none;border-top:1px solid #ECEFF1;margin:20px 0;"/>
                      <p style="color:#90A4AE;font-size:11px">VITASCIENZELAB &middot; Herboristerie Champenoise</p>
                    </div>`;
                    jn(O.email, emailSubject, emailHtml).catch(() => {});
                  }
                }
                alert(`✅ ${newFilesList.length} fichier(s) déposé(s) avec succès !`);
              } catch (err) {
                console.error("Admin upload error:", err);
                alert(err.message || "Une erreur est survenue lors de l'enregistrement.");
              } finally {
                c.target.value = "";
              }
            }
          }), O.has_account ? _jsx("button", {
            onClick: () => document.getElementById("clientFileInput").click(),
            style: {
              background: "#F3E5F5",
              border: "1px dashed #6A1B9A",
              color: "#6A1B9A",
              borderRadius: 8,
              padding: "9px",
              fontSize: 12,
              cursor: "pointer",
              width: "100%",
              marginTop: 4,
              fontWeight: 600
            },
            children: "+ Déposer un fichier (facture, document…)"
          }) : _jsx("div", {
            style: {
              background: "#FFF3E0",
              border: "1px solid #FFE0B2",
              color: "#E65100",
              borderRadius: 8,
              padding: "10px 12px",
              fontSize: 11,
              marginTop: 4,
              fontWeight: 500,
              textAlign: "center",
              lineHeight: "1.4"
            },
            children: "⚠️ Pour déposer des fichiers, ce client doit d'abord créer son compte en ligne avec l'adresse : " + (O.email || "—")
          })]
        }), _jsxs("div", {
          style: {
            background: "#fff",
            borderRadius: 14,
            padding: 20,
            boxShadow: "0 2px 12px rgba(21,101,192,.06)"
          },
          children: [_jsx("h4", {
            style: {
              fontFamily: "'Playfair Display',serif",
              fontSize: 16,
              color: z,
              marginBottom: 14
            },
            children: "\u{1F512} Notes priv\xE9es (visibles uniquement par vous)"
          }), _jsx("textarea", {
            value: Wt,
            onChange: c => It(c.target.value),
            placeholder: "Ajouter une note priv\xE9e\u2026",
            style: {
              width: "100%",
              border: `2px solid ${V}`,
              borderRadius: 10,
              padding: "10px 12px",
              fontSize: 13,
              color: z,
              outline: "none",
              minHeight: 60,
              resize: "vertical",
              marginBottom: 8
            }
          }), _jsx(ze, {
            onClick: j0,
            style: {
              fontSize: 12,
              padding: "8px 16px"
            },
            children: "+ Ajouter"
          }), Oe.filter(c => c.note && !c.note.includes("📁 FICHIER CLIENT — ") && !c.note.includes("📁 FICHIER ADMIN — ") && !c.note.includes("📁 NOUVEAU FICHIER CLIENT")).map(c => _jsxs("div", {
            style: {
              background: "#FFF8E1",
              borderRadius: 10,
              padding: "12px 14px",
              marginTop: 10,
              borderLeft: "3px solid #FFD54F"
            },
            children: [_jsx("div", {
              style: {
                fontSize: 10,
                color: "#90A4AE",
                marginBottom: 6
              },
              children: Ke(c.created_at)
            }), _jsx("p", {
              style: {
                margin: 0,
                fontSize: 13,
                color: "#546E7A",
                lineHeight: 1.6
              },
              children: c.note
            })]
          }, c.id))]
        })]
      }), E === "activite" && _jsxs("div", {
        children: [_jsx("h3", {
          style: {
            fontFamily: "'Playfair Display',serif",
            fontSize: 20,
            color: z,
            marginBottom: 16
          },
          children: "\u26A1 Journal d'activit\xE9"
        }), wn.length === 0 ? _jsxs("div", {
          style: {
            textAlign: "center",
            padding: "40px 20px",
            color: "#90A4AE"
          },
          children: [_jsx("div", {
            style: {
              fontSize: 40,
              marginBottom: 12
            },
            children: "\u{1F4CB}"
          }), _jsx("p", {
            children: "Aucune activit\xE9 enregistr\xE9e pour l'instant."
          }), _jsx("p", {
            style: {
              fontSize: 12,
              marginTop: 8
            },
            children: "Les actions (ajout de RDV, suppression, etc.) appara\xEEtront ici en temps r\xE9el."
          })]
        }) : _jsx("div", {
          children: wn.map((c, y) => _jsxs("div", {
            style: {
              background: "#fff",
              borderRadius: 12,
              padding: "14px 18px",
              marginBottom: 10,
              boxShadow: "0 2px 8px rgba(21,101,192,.06)",
              display: "flex",
              gap: 14,
              alignItems: "flex-start"
            },
            children: [_jsx("div", {
              style: {
                width: 36,
                height: 36,
                borderRadius: 10,
                background: V,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 18,
                flexShrink: 0
              },
              children: c.icon
            }), _jsxs("div", {
              style: {
                flex: 1
              },
              children: [_jsx("div", {
                style: {
                  fontSize: 13,
                  fontWeight: 700,
                  color: z
                },
                children: c.msg
              }), c.detail && _jsx("div", {
                style: {
                  fontSize: 12,
                  color: "#78909C",
                  marginTop: 2
                },
                children: c.detail
              })]
            }), _jsx("div", {
              style: {
                fontSize: 11,
                color: "#90A4AE",
                whiteSpace: "nowrap"
              },
              children: c.time
            })]
          }, y))
        })]
      }), E === "stats" && _jsxs("div", {
        children: [_jsxs("div", {
          style: {
            background: "#fff",
            borderRadius: 14,
            padding: 20,
            boxShadow: "0 2px 12px rgba(21,101,192,.06)",
            marginBottom: 16,
            display: "flex",
            gap: 20,
            alignItems: "center",
            flexWrap: "wrap"
          },
          children: [_jsxs("div", {
            style: {
              textAlign: "center"
            },
            children: [_jsx("img", {
              src: `https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=${encodeURIComponent("https://vitascienzelab.vercel.app")}&color=1565C0&bgcolor=ffffff`,
              alt: "QR Code",
              style: {
                width: 100,
                height: 100,
                borderRadius: 8
              }
            }), _jsx("div", {
              style: {
                fontSize: 10,
                color: "#90A4AE",
                marginTop: 6
              },
              children: "Scanner pour r\xE9server"
            })]
          }), _jsxs("div", {
            children: [_jsx("h4", {
              style: {
                fontFamily: "'Playfair Display',serif",
                fontSize: 16,
                color: z,
                marginBottom: 8
              },
              children: "\u{1F4F1} QR Code de r\xE9servation"
            }), _jsx("p", {
              style: {
                fontSize: 13,
                color: "#546E7A",
                lineHeight: 1.6,
                marginBottom: 12
              },
              children: "Imprimez ce QR code et affichez-le dans votre boutique. Vos clients le scannent et arrivent directement sur votre page de r\xE9servation."
            }), _jsx("a", {
              href: `https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${encodeURIComponent("https://vitascienzelab.vercel.app")}&color=1565C0&bgcolor=ffffff`,
              download: "qrcode-vitascienzelab.png",
              target: "_blank",
              style: {
                background: `linear-gradient(135deg,${q},${z})`,
                color: "#fff",
                borderRadius: 10,
                padding: "8px 18px",
                fontSize: 13,
                fontWeight: 700,
                textDecoration: "none",
                display: "inline-block"
              },
              children: "\u2B07 T\xE9l\xE9charger le QR Code"
            })]
          })]
        }), _jsx("div", {
          style: {
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(130px,1fr))",
            gap: 12,
            marginBottom: 22
          },
          children: [["Total s\xE9ances", Hn.total, "\u{1F4C5}", q], ["\xC0 venir", Hn.upcoming, "\u2705", "#2E7D32"], ["Rappels 48h", Gl.length, "\u23F0", "#E65100"], ["Avec docs", Hn.withDocs, "\u{1F4CE}", "#6A1B9A"], ["Clients", Hn.patients, "\u{1F465}", z], ["R\xE9currents", Hn.recurring, "\u{1F501}", "#F57F17"]].map(([c, y, b, _]) => _jsxs("div", {
            style: {
              background: "#fff",
              borderRadius: 14,
              padding: "16px 14px",
              boxShadow: "0 2px 12px rgba(21,101,192,.06)"
            },
            children: [_jsx("div", {
              style: {
                fontSize: 20,
                marginBottom: 4
              },
              children: b
            }), _jsx("div", {
              style: {
                fontSize: 26,
                fontWeight: 800,
                color: _,
                fontFamily: "'Playfair Display',serif"
              },
              children: y
            }), _jsx("div", {
              style: {
                fontSize: 11,
                color: "#78909C"
              },
              children: c
            })]
          }, c))
        }), _jsxs("div", {
          style: {
            background: "#fff",
            borderRadius: 14,
            padding: 20,
            boxShadow: "0 2px 12px rgba(21,101,192,.06)",
            marginBottom: 14
          },
          children: [_jsx("h4", {
            style: {
              fontFamily: "'Playfair Display',serif",
              fontSize: 15,
              color: z,
              marginBottom: 14
            },
            children: "R\xE9partition par type de s\xE9ance"
          }), Hn.byService.map(c => _jsxs("div", {
            style: {
              marginBottom: 12
            },
            children: [_jsxs("div", {
              style: {
                display: "flex",
                justifyContent: "space-between",
                fontSize: 13,
                marginBottom: 4
              },
              children: [_jsxs("span", {
                children: [c.icon, " ", c.title]
              }), _jsx("strong", {
                children: c.count
              })]
            }), _jsx("div", {
              style: {
                background: "#E3F0FF",
                borderRadius: 20,
                height: 8,
                overflow: "hidden"
              },
              children: _jsx("div", {
                style: {
                  height: "100%",
                  background: q,
                  width: `${p.length ? Math.round(c.count / p.length * 100) : 0}%`,
                  borderRadius: 20,
                  transition: "width .5s"
                }
              })
            })]
          }, c.id))]
        }), _jsxs("div", {
          style: {
            background: "#fff",
            borderRadius: 14,
            padding: 20,
            boxShadow: "0 2px 12px rgba(21,101,192,.06)",
            marginBottom: 14
          },
          children: [_jsx("h4", {
            style: {
              fontFamily: "'Playfair Display',serif",
              fontSize: 15,
              color: z,
              marginBottom: 14
            },
            children: "\u{1F4E5} Export des donn\xE9es"
          }), _jsxs("div", {
            style: {
              display: "flex",
              gap: 10,
              flexWrap: "wrap"
            },
            children: [_jsx("button", {
              onClick: () => ju(p.filter(c => !at(c) && c.status === "confirmed"), `vita-rdv-avenir-${it(0)}.csv`),
              style: {
                background: `linear-gradient(135deg,${q},${z})`,
                color: "#fff",
                border: "none",
                borderRadius: 10,
                padding: "10px 18px",
                fontSize: 12,
                fontWeight: 700,
                cursor: "pointer"
              },
              children: "\u{1F4CA} Export s\xE9ances \xE0 venir (.csv)"
            }), _jsx("button", {
              onClick: () => ju(p, `vita-historique-${it(0)}.csv`),
              style: {
                background: "#fff",
                color: q,
                border: `2px solid ${V}`,
                borderRadius: 10,
                padding: "10px 16px",
                fontSize: 12,
                fontWeight: 600,
                cursor: "pointer"
              },
              children: "\u{1F4CA} Export historique complet (.csv)"
            }), _jsx("button", {
              onClick: () => ju(p.filter(c => {
                let y = new Date(),
                  b = c.rdv_date?.slice(0, 7),
                  _ = `${y.getFullYear()}-${String(y.getMonth() + 1).padStart(2, "0")}`;
                return b === _;
              }), `vita-mois-${it(0)}.csv`),
              style: {
                background: "#fff",
                color: q,
                border: `2px solid ${V}`,
                borderRadius: 10,
                padding: "10px 16px",
                fontSize: 12,
                fontWeight: 600,
                cursor: "pointer"
              },
              children: "\u{1F4CA} Export ce mois-ci (.csv)"
            })]
          }), _jsx("p", {
            style: {
              fontSize: 11,
              color: "#90A4AE",
              marginTop: 10
            },
            children: "Fichier CSV compatible Excel, Google Sheets, LibreOffice"
          })]
        }), _jsxs("div", {
          style: {
            background: "#fff",
            borderRadius: 14,
            padding: 20,
            boxShadow: "0 2px 12px rgba(21,101,192,.06)",
            marginBottom: 14
          },
          children: [_jsx("h4", {
            style: {
              fontFamily: "'Playfair Display',serif",
              fontSize: 15,
              color: z,
              marginBottom: 14
            },
            children: "\u{1F4CA} Taux de remplissage"
          }), (() => {
            let b = Je.length * 26,
              _ = `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, "0")}`,
              G = p.filter(F => F.rdv_date?.startsWith(_) && F.status === "confirmed").length,
              H = Math.min(100, Math.round(G / b * 100));
            return _jsxs("div", {
              children: [_jsxs("div", {
                style: {
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: 13,
                  marginBottom: 8,
                  fontWeight: 600
                },
                children: [_jsxs("span", {
                  style: {
                    color: "#546E7A"
                  },
                  children: ["Ce mois (", G, " s\xE9ances / ", b, " cr\xE9neaux disponibles)"]
                }), _jsxs("span", {
                  style: {
                    color: H > 80 ? "#E53935" : H > 50 ? "#FF8F00" : "#2E7D32",
                    fontWeight: 700
                  },
                  children: [H, "%"]
                })]
              }), _jsx("div", {
                style: {
                  background: "#E3F0FF",
                  borderRadius: 20,
                  height: 12,
                  overflow: "hidden"
                },
                children: _jsx("div", {
                  style: {
                    height: "100%",
                    background: H > 80 ? "linear-gradient(135deg,#E53935,#FF8F00)" : H > 50 ? "#FF8F00" : `linear-gradient(135deg,${q},#42A5F5)`,
                    width: `${H}%`,
                    borderRadius: 20,
                    transition: "width .5s"
                  }
                })
              }), _jsx("p", {
                style: {
                  fontSize: 11,
                  color: "#90A4AE",
                  marginTop: 8
                },
                children: H < 30 ? "\u{1F4C8} Agenda bien disponible \u2014 partagez votre lien de r\xE9servation !" : H < 70 ? "\u2705 Bonne activit\xE9 ce mois" : "\u{1F525} Agenda tr\xE8s charg\xE9 ce mois"
              })]
            });
          })()]
        }), _jsxs("div", {
          style: {
            background: "#fff",
            borderRadius: 14,
            padding: 20,
            boxShadow: "0 2px 12px rgba(21,101,192,.06)"
          },
          children: [_jsx("h4", {
            style: {
              fontFamily: "'Playfair Display',serif",
              fontSize: 15,
              color: z,
              marginBottom: 14
            },
            children: "Activit\xE9 sur 6 mois"
          }), _jsx("div", {
            style: {
              display: "flex",
              gap: 10,
              alignItems: "flex-end",
              height: 90
            },
            children: Hn.monthly.map(c => {
              let y = Math.max(...Hn.monthly.map(b => b.count), 1);
              return _jsxs("div", {
                style: {
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 4
                },
                children: [c.count > 0 && _jsx("span", {
                  style: {
                    fontSize: 10,
                    color: q,
                    fontWeight: 700
                  },
                  children: c.count
                }), _jsx("div", {
                  style: {
                    width: "100%",
                    background: q,
                    borderRadius: "4px 4px 0 0",
                    height: `${Math.round(c.count / y * 64) + 4}px`,
                    minHeight: 4
                  }
                }), _jsx("span", {
                  style: {
                    fontSize: 10,
                    color: "#90A4AE"
                  },
                  children: c.label
                })]
              }, c.label);
            })
          })]
        }), _jsxs("div", {
          style: {
            background: "#fff",
            borderRadius: 14,
            padding: 20,
            boxShadow: "0 2px 12px rgba(21,101,192,.06)",
            marginTop: 14
          },
          children: [_jsx("h4", {
            style: {
              fontFamily: "'Playfair Display',serif",
              fontSize: 15,
              color: z,
              marginBottom: 14
            },
            children: "\u{1F3C6} Fid\xE9lit\xE9 patients"
          }), (() => {
            let c = (b, _) => w.filter(G => {
                let H = p.filter(F => F.patient_email === G.email && F.status !== "cancelled").length;
                return H >= b && (_ === null || H < _);
              }).length,
              y = Math.max(w.length, 1);
            return [["\u{1F195} Inscrits sans s\xE9ance", c(0, 1), "#E8F5E9", "#2E7D32"], ["1\uFE0F\u20E3 Venue une seule fois", c(1, 2), "#E3F0FF", q], ["\u{1F504} Clients r\xE9guliers (2-4 s\xE9ances)", c(2, 5), "#FFF8E1", "#F57F17"], ["\u2B50 Clients fid\xE8les (5+ s\xE9ances)", c(5, null), "#EDE7F6", "#6A1B9A"]].map(([b, _, G, H]) => _jsxs("div", {
              style: {
                marginBottom: 10
              },
              children: [_jsxs("div", {
                style: {
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: 12,
                  marginBottom: 4
                },
                children: [_jsx("span", {
                  style: {
                    color: "#546E7A"
                  },
                  children: b
                }), _jsxs("strong", {
                  style: {
                    color: H
                  },
                  children: [_, " (", Math.round(_ / y * 100), "%)"]
                })]
              }), _jsx("div", {
                style: {
                  background: "#F0F4FF",
                  borderRadius: 20,
                  height: 8,
                  overflow: "hidden"
                },
                children: _jsx("div", {
                  style: {
                    height: "100%",
                    background: H,
                    width: `${Math.round(_ / y * 100)}%`,
                    borderRadius: 20
                  }
                })
              })]
            }, b));
          })()]
        })]
      }), E === "dispo" && _jsxs("div", {
        children: [_jsxs("div", {
          style: {
            background: "#fff",
            borderRadius: 14,
            padding: 20,
            boxShadow: "0 2px 12px rgba(21,101,192,.06)",
            marginBottom: 14
          },
          children: [_jsx("h4", {
            style: {
              fontFamily: "'Playfair Display',serif",
              fontSize: 15,
              color: z,
              marginBottom: 14
            },
            children: "\u{1F512} Bloquer une date ou un cr\xE9neau"
          }), _jsxs("div", {
            style: {
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 12,
              marginBottom: 10
            },
            children: [_jsxs("div", {
              children: [_jsx("label", {
                style: {
                  display: "block",
                  fontSize: 11,
                  fontWeight: 700,
                  color: z,
                  marginBottom: 5
                },
                children: "Date *"
              }), _jsx("input", {
                type: "date",
                value: Ut.blocked_date,
                onChange: c => ja(y => ({
                  ...y,
                  blocked_date: c.target.value
                })),
                style: Vl
              })]
            }), _jsxs("div", {
              children: [_jsx("label", {
                style: {
                  display: "block",
                  fontSize: 11,
                  fontWeight: 700,
                  color: z,
                  marginBottom: 5
                },
                children: "Cr\xE9neau (vide = journ\xE9e enti\xE8re)"
              }), _jsxs("select", {
                value: Ut.slot,
                onChange: c => ja(y => ({
                  ...y,
                  slot: c.target.value
                })),
                style: Vl,
                children: [_jsx("option", {
                  value: "",
                  children: "Toute la journ\xE9e"
                }), Je.map(c => _jsx("option", {
                  value: c,
                  children: c
                }, c))]
              })]
            })]
          }), _jsxs("div", {
            style: {
              marginBottom: 12
            },
            children: [_jsx("label", {
              style: {
                display: "block",
                fontSize: 11,
                fontWeight: 700,
                color: z,
                marginBottom: 5
              },
              children: "Motif"
            }), _jsx("input", {
              value: Ut.reason,
              onChange: c => ja(y => ({
                ...y,
                reason: c.target.value
              })),
              placeholder: "Ex : Cong\xE9s, Formation\u2026",
              style: Vl
            })]
          }), _jsx(ze, {
            onClick: L0,
            disabled: !Ut.blocked_date,
            children: "Bloquer ce cr\xE9neau"
          })]
        }), M.length === 0 ? _jsx("p", {
          style: {
            textAlign: "center",
            color: "#90A4AE",
            padding: 20
          },
          children: "Aucun cr\xE9neau bloqu\xE9."
        }) : M.map(c => _jsxs("div", {
          style: {
            background: "#fff",
            borderRadius: 12,
            padding: "14px 18px",
            marginBottom: 10,
            boxShadow: "0 2px 8px rgba(0,0,0,.06)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 10
          },
          children: [_jsxs("div", {
            children: [_jsxs("div", {
              style: {
                fontSize: 14,
                fontWeight: 700,
                color: z
              },
              children: ["\u{1F6AB} ", Ke(c.blocked_date || c.date), " ", c.slot ? `\xE0 ${c.slot}` : "\u2014 Journ\xE9e enti\xE8re"]
            }), c.reason && _jsx("div", {
              style: {
                fontSize: 12,
                color: "#78909C"
              },
              children: c.reason
            })]
          }), _jsx("button", {
            onClick: () => Y0(c.id),
            style: {
              background: "#FCE4EC",
              border: "none",
              color: "#C62828",
              borderRadius: 8,
              padding: "6px 12px",
              fontSize: 12,
              fontWeight: 600
            },
            children: "Supprimer"
          })]
        }, c.id))]
      })]
    })]
  });
}
function Mg({
  rdvId: e,
  onDone: t
}) {
  let [n, l] = useState(null),
    [a, i] = useState({}),
    [u, s] = useState("loading"),
    [r, v] = useState(""),
    [medsList, setMedsList] = useState([""]);

  let E = (g, p) => i(R => ({
    ...R,
    [g]: p
  }));

  let updateMedItem = (idx, val) => {
    let newList = [...medsList];
    newList[idx] = val;
    setMedsList(newList);
    let formatted = newList.map(item => item.trim()).filter(Boolean).map((item, k) => `${k + 1}. ${item}`).join("\n");
    E("traitements_en_cours", formatted);
  };

  let addMedField = () => {
    setMedsList(prev => [...prev, ""]);
  };

  let removeMedField = (idx) => {
    let newList = medsList.filter((_, k) => k !== idx);
    if (newList.length === 0) newList = [""];
    setMedsList(newList);
    let formatted = newList.map(item => item.trim()).filter(Boolean).map((item, k) => `${k + 1}. ${item}`).join("\n");
    E("traitements_en_cours", formatted);
  };
  useEffect(() => {
    if (!e) return;
    fetch(`/api/get-questionnaire-info?id=${e}`).then(res => res.json()).then(data => {
      if (data && data.success && data.appointment) {
        l(data.appointment);
        if (data.alreadyDone) {
          s("already_done");
        } else {
          s("form");
        }
      } else {
        X.get("appointments", `id=eq.${e}`, j).then(g => {
          Array.isArray(g) && g.length > 0 ? (l(g[0]), X.get("questionnaires", `appointment_id=eq.${e}`, j).then(p => {
            Array.isArray(p) && p.length > 0 ? s("already_done") : s("form");
          })) : s("error");
        }).catch(() => s("error"));
      }
    }).catch(() => s("error"));
  }, [e]);
  let S = async () => {
    if (Object.keys(a).length < 1) {
      v("Merci de répondre à au moins la première question.");
      return;
    }
    try {
      const res = await fetch("/api/submit-questionnaire", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          appointment_id: e,
          patient_id: n?.patient_id || n?.id || null,
          patient_email: n?.patient_email || "",
          responses: a
        })
      });
      if (res.ok) {
        s("done");
      } else {
        await X.post("questionnaires", {
          appointment_id: e,
          patient_id: n?.patient_id || null,
          patient_email: n?.patient_email || "",
          responses: a,
          created_at: new Date().toISOString()
        }, j);
        s("done");
      }
    } catch {
      v("Erreur lors de l'envoi. Réessayez.");
    }
  };
  if (u === "loading") return _jsx("div", {
    style: {
      textAlign: "center",
      padding: "60px 20px",
      color: q
    },
    children: "\u2697\uFE0F Chargement..."
  });
  if (u === "error") return _jsx("div", {
    style: {
      textAlign: "center",
      padding: "60px 20px",
      color: "#E53935"
    },
    children: "Lien invalide ou expir\xE9."
  });
  if (u === "already_done") return _jsx("div", {
    style: {
      maxWidth: 480,
      margin: "40px auto",
      padding: "0 20px"
    },
    children: _jsxs("div", {
      style: {
        background: "#fff",
        borderRadius: 20,
        padding: 32,
        textAlign: "center",
        boxShadow: "0 4px 20px rgba(21,101,192,.1)"
      },
      children: [_jsx("div", {
        style: {
          fontSize: 48,
          marginBottom: 12
        },
        children: "\u2705"
      }), _jsx("h3", {
        style: {
          fontFamily: "'Playfair Display',serif",
          color: z
        },
        children: "Questionnaire d\xE9j\xE0 compl\xE9t\xE9"
      }), _jsx("p", {
        style: {
          color: "#546E7A",
          fontSize: 13,
          marginTop: 8,
          marginBottom: 20
        },
        children: "Merci, vos r\xE9ponses ont d\xE9j\xE0 \xE9t\xE9 enregistr\xE9es pour cette s\xE9ance."
      }), _jsx(ze, {
        onClick: t,
        children: "\u2190 Retour au site"
      })]
    })
  });
  if (u === "done") return _jsx("div", {
    style: {
      maxWidth: 480,
      margin: "40px auto",
      padding: "0 20px"
    },
    children: _jsxs("div", {
      style: {
        background: "#fff",
        borderRadius: 20,
        padding: 32,
        textAlign: "center",
        boxShadow: "0 4px 20px rgba(21,101,192,.1)"
      },
      children: [_jsx("div", {
        style: {
          fontSize: 48,
          marginBottom: 12
        },
        children: "\u{1F389}"
      }), _jsx("h3", {
        style: {
          fontFamily: "'Playfair Display',serif",
          color: z
        },
        children: "Merci !"
      }), _jsx("p", {
        style: {
          color: "#546E7A",
          fontSize: 13,
          marginTop: 8,
          marginBottom: 20
        },
        children: "Vos r\xE9ponses ont bien \xE9t\xE9 enregistr\xE9es. Alexis les consultera avant votre s\xE9ance pour vous proposer les compl\xE9ments les plus adapt\xE9s."
      }), _jsx(ze, {
        onClick: t,
        children: "\u2190 Retour au site"
      })]
    })
  });
  return _jsxs("div", {
    style: {
      maxWidth: 560,
      margin: "0 auto",
      padding: "20px 20px 60px"
    },
    children: [_jsxs("div", {
      style: {
        textAlign: "center",
        marginBottom: 24
      },
      children: [_jsx("div", {
        style: {
          fontSize: 36
        },
        children: "\u2697\uFE0F"
      }), _jsx("h2", {
        style: {
          fontFamily: "'Playfair Display',serif",
          fontSize: 22,
          color: z,
          marginTop: 8
        },
        children: "Questionnaire de pr\xE9paration"
      }), _jsxs("p", {
        style: {
          color: "#78909C",
          fontSize: 13,
          marginTop: 4
        },
        children: ["Pour votre s\xE9ance du ", n ? vt(n.rdv_date) : "", " \xE0 ", n?.slot]
      })]
    }), _jsxs("div", {
      style: {
        background: "#FFF8E1",
        borderRadius: 12,
        padding: "12px 16px",
        marginBottom: 20,
        fontSize: 12,
        color: "#E65100",
        lineHeight: 1.6
      },
      children: ["\u2139\uFE0F Ce questionnaire est ", _jsx("strong", {
        children: "enti\xE8rement facultatif"
      }), ". Les informations recueillies servent uniquement \xE0 adapter notre s\xE9lection de compl\xE9ments alimentaires. Elles ne constituent pas un acte m\xE9dical."]
    }), Wi.map(g => _jsxs("div", {
      style: {
        background: "#fff",
        borderRadius: 14,
        padding: "18px 20px",
        marginBottom: 12,
        boxShadow: "0 2px 10px rgba(21,101,192,.06)"
      },
      children: [_jsx("p", {
        style: {
          fontSize: 14,
          fontWeight: 600,
          color: z,
          marginBottom: 12,
          lineHeight: 1.5
        },
        children: g.q
      }), g.type === "radio" && g.opts.map(p => _jsxs("div", {
        children: [_jsxs("label", {
          style: {
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "8px 12px",
            borderRadius: 8,
            cursor: "pointer",
            background: a[g.k] === p ? "#E8F0FE" : "#F8FAFF",
            marginBottom: 6,
            border: `1px solid ${a[g.k] === p ? q : V}`
          },
          children: [_jsx("input", {
            type: "radio",
            name: g.k,
            value: p,
            checked: a[g.k] === p,
            onChange: () => E(g.k, p),
            style: {
              accentColor: q
            }
          }), _jsx("span", {
            style: {
              fontSize: 13,
              color: a[g.k] === p ? q : "#546E7A"
            },
            children: p
          })]
        }), p === "Autre objectif de bien-\xEAtre personnel" && a[g.k] === p && _jsx("textarea", {
          value: a[g.k + "_detail"] || "",
          onChange: R => E(g.k + "_detail", R.target.value),
          placeholder: "D\xE9crivez votre objectif bien-\xEAtre personnel\u2026",
          rows: 3,
          style: {
            width: "100%",
            border: `1px solid ${q}`,
            borderRadius: 8,
            padding: "10px 12px",
            fontSize: 13,
            color: z,
            resize: "vertical",
            outline: "none",
            marginBottom: 6
          }
        })]
      }, p)), g.type === "scale" && _jsx("div", {
        style: {
          display: "flex",
          gap: 8,
          justifyContent: "center"
        },
        children: [1, 2, 3, 4, 5].map(p => _jsx("button", {
          onClick: () => E(g.k, String(p)),
          style: {
            width: 44,
            height: 44,
            borderRadius: "50%",
            border: `2px solid ${a[g.k] === String(p) ? q : V}`,
            background: a[g.k] === String(p) ? q : "#fff",
            color: a[g.k] === String(p) ? "#fff" : z,
            fontWeight: 700,
            fontSize: 16,
            cursor: "pointer"
          },
          children: p
        }, p))
      }), g.type === "text" && _jsx("textarea", {
        value: a[g.k] || "",
        onChange: p => E(g.k, p.target.value),
        placeholder: g.ph || "",
        rows: 2,
        style: {
          width: "100%",
          border: `1px solid ${V}`,
          borderRadius: 10,
          padding: "10px 12px",
          fontSize: 13,
          color: z,
          resize: "vertical",
          outline: "none"
        }
      }), g.type === "medlist" && _jsxs("div", {
        children: [
          medsList.map((medVal, idx) => _jsxs("div", {
            style: {
              display: "flex",
              gap: 8,
              marginBottom: 10,
              alignItems: "flex-start"
            },
            children: [
              _jsx("textarea", {
                value: medVal,
                onChange: ev => updateMedItem(idx, ev.target.value),
                placeholder: `Médicament ou complément #${idx + 1} (ex: Paracétamol 1000mg, Vitamine D, Magnésium...)`,
                rows: 2,
                style: {
                  flex: 1,
                  border: `1px solid ${V}`,
                  borderRadius: 10,
                  padding: "10px 12px",
                  fontSize: 13,
                  color: z,
                  resize: "vertical",
                  outline: "none"
                }
              }),
              medsList.length > 1 && _jsx("button", {
                type: "button",
                onClick: () => removeMedField(idx),
                style: {
                  background: "#FCE4EC",
                  border: "none",
                  color: "#C62828",
                  borderRadius: 8,
                  padding: "8px 12px",
                  cursor: "pointer",
                  fontSize: 13,
                  marginTop: 4
                },
                title: "Supprimer",
                children: "✕"
              })
            ]
          }, idx)),
          _jsx("button", {
            type: "button",
            onClick: addMedField,
            style: {
              width: "100%",
              background: "#E8F0FE",
              border: `1px dashed ${q}`,
              color: q,
              borderRadius: 10,
              padding: "10px 14px",
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
              marginTop: 6,
              textAlign: "center"
            },
            children: "➕ Ajouter un médicament dans la liste, cliquez ici"
          })
        ]
      })]
    }, g.k)), r && _jsx("p", {
      style: {
        color: "#E53935",
        fontSize: 13,
        textAlign: "center",
        marginBottom: 12
      },
      children: r
    }), _jsx(ze, {
      onClick: S,
      style: {
        width: "100%",
        marginTop: 8
      },
      children: "\u2705 Envoyer mes r\xE9ponses"
    }), _jsx("button", {
      onClick: t,
      style: {
        width: "100%",
        marginTop: 10,
        background: "none",
        border: "none",
        color: "#90A4AE",
        fontSize: 12,
        cursor: "pointer",
        textDecoration: "underline"
      },
      children: "Passer \u2014 Je ne souhaite pas remplir le questionnaire"
    })]
  });
}
function Zu() {
  let [e, t] = useState("home"),
    [n, l] = useState(null),
    [a, i] = useState(!1),
    [u, s] = useState(null),
    [r, v] = useState(null);
  useEffect(() => {
    let g = new URL(window.location.href),
      p = window.location.hash,
      R = g.searchParams.get("questionnaire");
    if (R) {
      s(R), t("questionnaire"), window.history.replaceState({}, document.title, window.location.pathname);
      return;
    }
    (p.includes("access_token") || p.includes("error") || g.searchParams.has("code") || g.searchParams.has("error")) && window.history.replaceState({}, document.title, window.location.pathname);
  }, []);
  let S = g => {
      l(g), t("dashboard");
    },
    E = () => {
      l(null), t("home");
    };
  return e === "questionnaire" && u ? _jsx(Mg, {
    rdvId: u,
    onDone: () => {
      t("home"), s(null);
    }
  }) : e === "admin" ? _jsx(Rg, {
    onBack: () => t("home")
  }) : _jsxs("div", {
    style: {
      minHeight: "100vh",
      background: "linear-gradient(180deg,#EBF0FE,#F8FAFF)"
    },
    children: [_jsx("style", {
      children: Yu
    }), a && _jsx(td, {
      onClose: () => i(!1)
    }), _jsx("header", {
      style: {
        background: `linear-gradient(135deg,${z},${q})`,
        padding: "0 20px"
      },
      children: _jsxs("div", {
        style: {
          maxWidth: 1100,
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "15px 0",
          gap: 10,
          flexWrap: "wrap"
        },
        children: [_jsxs("div", {
          onClick: () => window.scrollTo({
            top: 0,
            behavior: "smooth"
          }),
          style: {
            display: "flex",
            cursor: "pointer",
            alignItems: "center",
            gap: 12
          },
          children: [_jsx("div", {
            style: {
              width: 42,
              height: 42,
              borderRadius: 12,
              background: "rgba(255,255,255,.15)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 22
            },
            children: "\u2697\uFE0F"
          }), _jsxs("div", {
            children: [_jsx("div", {
              style: {
                fontFamily: "'Playfair Display',serif",
                fontSize: 18,
                color: "#fff",
                fontWeight: 700
              },
              children: "VITASCIENZELAB"
            }), _jsx("div", {
              style: {
                fontSize: 10,
                color: "rgba(255,255,255,.6)"
              },
              children: "Herboristerie Champenoise \xB7 Bouilly (Aube)"
            })]
          })]
        }), _jsxs("div", {
          style: {
            display: "flex",
            gap: 8,
            alignItems: "center",
            flexWrap: "wrap"
          },
          children: [n ? _jsxs(_Fragment, {
            children: [_jsxs("span", {
              style: {
                fontSize: 12,
                color: "rgba(255,255,255,.8)"
              },
              children: ["\u{1F464} ", n.prenom]
            }), _jsx("button", {
              onClick: () => t("dashboard"),
              style: {
                background: "rgba(255,255,255,.15)",
                border: "1px solid rgba(255,255,255,.3)",
                color: "#fff",
                borderRadius: 8,
                padding: "6px 12px",
                fontSize: 11
              },
              children: "Mon espace"
            }), _jsx("button", {
              onClick: E,
              style: {
                background: "rgba(255,255,255,.08)",
                border: "1px solid rgba(255,255,255,.15)",
                color: "rgba(255,255,255,.7)",
                borderRadius: 8,
                padding: "6px 10px",
                fontSize: 11
              },
              children: "D\xE9co."
            })]
          }) : _jsx("button", {
            onClick: () => t("auth"),
            style: {
              background: "rgba(255,255,255,.15)",
              border: "1px solid rgba(255,255,255,.3)",
              color: "#fff",
              borderRadius: 8,
              padding: "7px 14px",
              fontSize: 12
            },
            children: "\u{1F464} Espace client"
          }), _jsx("button", {
            onClick: () => t("admin"),
            style: {
              background: "rgba(255,255,255,.08)",
              border: "1px solid rgba(255,255,255,.15)",
              color: "rgba(255,255,255,.6)",
              borderRadius: 8,
              padding: "6px 10px",
              fontSize: 11
            },
            children: "\u{1F510} Admin"
          })]
        })]
      })
    }), e === "home" && _jsxs("div", {
      style: {
        maxWidth: 800,
        margin: "0 auto",
        padding: "44px 20px 80px"
      },
      children: [ee && _jsxs("div", {
        style: {
          background: "#FFF8E1",
          border: "1px solid #FFD54F",
          borderRadius: 12,
          padding: "12px 16px",
          marginBottom: 24,
          textAlign: "center",
          fontSize: 12,
          color: "#F57F17"
        },
        children: ["\u{1F3AD} ", _jsx("strong", {
          children: "Mode d\xE9mo"
        }), " \u2014 Remplacez SB_URL et SB_KEY pour connecter Supabase"]
      }), _jsxs("div", {
        style: {
          textAlign: "center",
          marginBottom: 40
        },
        children: [_jsx("div", {
          style: {
            fontSize: 52,
            marginBottom: 14
          },
          children: "\u2697\uFE0F"
        }), _jsx("h1", {
          style: {
            fontFamily: "'Playfair Display',serif",
            fontSize: 30,
            color: z,
            marginBottom: 8
          },
          children: "VITASCIENZELAB"
        }), _jsx("p", {
          style: {
            color: "#78909C",
            fontSize: 13,
            marginBottom: 6
          },
          children: "Herboristerie Champenoise \xB7 Bouilly (Aube)"
        }), _jsxs("p", {
          style: {
            color: "#546E7A",
            fontSize: 13,
            lineHeight: 1.7,
            marginBottom: 28
          },
          children: [ye.owner, " \xB7 ", ye.role, _jsx("br", {}), "Compl\xE9ments Alimentaires \xB7 Phytoth\xE9rapie \xB7 Nutraceutiques \xB7 Aromath\xE9rapie"]
        }), _jsxs("div", {
          style: {
            display: "flex",
            gap: 12,
            justifyContent: "center",
            flexWrap: "wrap"
          },
          children: [_jsx(ze, {
            onClick: () => t("booking"),
            style: {
              fontSize: 15,
              padding: "14px 28px"
            },
            children: "\u{1F4C5} R\xE9server une s\xE9ance"
          }), _jsx(ot, {
            onClick: () => t("auth"),
            style: {
              fontSize: 15,
              padding: "14px 28px"
            },
            children: "\u{1F464} Mon espace client"
          })]
        })]
      }), _jsx("div", {
        style: {
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
          gap: 14
        },
        children: $l.map(g => _jsxs("div", {
          onClick: () => t("booking"),
          style: {
            background: "#fff",
            borderRadius: 16,
            padding: "22px 20px",
            boxShadow: "0 2px 16px rgba(21,101,192,.08)",
            cursor: "pointer",
            border: `2px solid ${V}`,
            transition: "all .2s"
          },
          children: [_jsx("div", {
            style: {
              fontSize: 28,
              marginBottom: 10
            },
            children: g.icon
          }), _jsx("div", {
            style: {
              fontFamily: "'Playfair Display',serif",
              fontSize: 16,
              color: z,
              marginBottom: 6
            },
            children: g.title
          }), _jsx(We, {
            children: g.dur
          }), _jsx("p", {
            style: {
              fontSize: 12,
              color: "#90A4AE",
              lineHeight: 1.5,
              marginTop: 10
            },
            children: g.desc
          })]
        }, g.id))
      })]
    }), e === "auth" && _jsx(Dg, {
      onAuth: S,
      onBack: () => t("home")
    }), e === "dashboard" && n && _jsx(Tg, {
      user: n,
      onUpdateUser: g => l(g),
      onBook: g => {
        g && g.guestPrenom ? v(g) : v(null), t("booking");
      },
      onLogout: E
    }), e === "booking" && _jsx(Bg, {
      user: n,
      guestBooking: r,
      onDone: () => {
        v(null), t(n ? "dashboard" : "home");
      }
    }), _jsx("footer", {
      style: {
        background: "#fff",
        borderTop: `1px solid ${V}`,
        padding: "14px 20px",
        textAlign: "center"
      },
      children: _jsxs("div", {
        style: {
          maxWidth: 800,
          margin: "0 auto",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 8,
          alignItems: "center"
        },
        children: [_jsxs("span", {
          style: {
            fontSize: 10,
            color: "#B0BEC5"
          },
          children: ["\xA9 ", new Date().getFullYear(), " VITASCIENZELAB \u2013 Herboristerie Champenoise \xB7 SIRET ", ye.siret, " \xB7 NAF ", ye.naf]
        }), _jsx("span", {
          style: {
            color: "#CFD8DC"
          },
          children: "\xB7"
        }), _jsx("button", {
          onClick: () => i(!0),
          style: {
            background: "none",
            border: "none",
            color: "#90A4AE",
            fontSize: 10,
            cursor: "pointer",
            textDecoration: "underline",
            padding: 0
          },
          children: "Mentions l\xE9gales & cadre r\xE9glementaire"
        }), _jsx("span", {
          style: {
            color: "#CFD8DC"
          },
          children: "\xB7"
        }), _jsx("span", {
          style: {
            fontSize: 10,
            color: "#B0BEC5"
          },
          children: "Conseil en compl\xE9ments alimentaires \u2014 Ne constitue pas un acte m\xE9dical \u2014 Ne se substitue pas \xE0 l'avis d'un m\xE9decin"
        })]
      })
    })]
  });
}
export default Zu;
