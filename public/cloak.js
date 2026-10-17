"use strict";

const CLOAK_PRESETS = {
  none: null,
  "google-docs": {
    title: "Untitled document - Google Docs",
    favicon: "https://ssl.gstatic.com/docs/documents/images/kix-favicon7.ico",
    url: "/document/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgVE2upms/edit",
  },
  kahoot: {
    title: "Kahoot!",
    favicon: "https://www.google.com/s2/favicons?domain=kahoot.it&sz=32",
    url: "/game?gameId=823419",
  },
  desmos: {
    title: "Desmos | Graphing Calculator",
    favicon: "https://www.google.com/s2/favicons?domain=desmos.com&sz=32",
    url: "/calculator",
  },
  khan: {
    title: "Khan Academy | Free Online Courses",
    favicon: "https://www.google.com/s2/favicons?domain=khanacademy.org&sz=32",
    url: "/math/algebra",
  },
  classroom: {
    title: "Google Classroom",
    favicon: "https://www.google.com/s2/favicons?domain=classroom.google.com&sz=32",
    url: "/c/MTIzNDU2Nzg5",
  },
  canvas: {
    title: "Dashboard",
    favicon: "https://www.google.com/s2/favicons?domain=canvas.instructure.com&sz=32",
    url: "/courses/48291/assignments",
  },
};

function applyCloak() {
  const s = loadSettings();
  const preset = CLOAK_PRESETS[s.cloak];
  if (!preset) return;

  document.title = preset.title;

  if (preset.favicon) {
    let link = document.querySelector("link[rel~='icon']");
    if (!link) {
      link = document.createElement("link");
      link.rel = "shortcut icon";
      document.head.appendChild(link);
    }
    link.type = "image/x-icon";
    link.href = preset.favicon;
  }

  if (preset.url) {
    try { history.replaceState(null, "", preset.url); } catch {}
  }
}

// --- Classroom overlay for GoGuardian ---
let overlayEl = null;
let overlayVisible = false;

function buildOverlay() {
  if (overlayEl) return;
  overlayEl = document.createElement("div");
  overlayEl.id = "sj-panic-overlay";
  overlayEl.style.cssText = `
    display:none; position:fixed; inset:0; z-index:2147483647;
    background:#fff; overflow:auto; font-family:'Google Sans',Roboto,Arial,sans-serif;
  `;
  overlayEl.innerHTML = `
    <div style="background:#1a73e8;color:#fff;padding:0 16px;height:64px;display:flex;align-items:center;gap:12px;position:sticky;top:0;z-index:1;">
      <svg width="28" height="28" viewBox="0 0 24 24" fill="white"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/></svg>
      <svg width="32" height="32" viewBox="0 0 64 64"><rect width="64" height="64" rx="8" fill="#fff"/><path d="M32 12L12 20v24l20 8 20-8V20L32 12z" fill="#0f9d58"/><path d="M32 12v32l20-8V20L32 12z" fill="#0f9d58" opacity=".7"/><path d="M12 20l20 8 20-8-20-8-20 8z" fill="#34a853"/></svg>
      <span style="font-size:22px;font-weight:400;">Classroom</span>
      <div style="margin-left:auto;width:36px;height:36px;background:rgba(255,255,255,.2);border-radius:50%;display:flex;align-items:center;justify-content:center;">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/></svg>
      </div>
    </div>
    <div style="max-width:1200px;margin:24px auto;padding:0 24px;">
      <div style="color:#202124;font-size:14px;margin-bottom:24px;font-weight:500;">Enrolled classes</div>
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:20px;">
        ${[
          ["Period 3 — English","Mrs. Johnson","#1565c0"],
          ["Algebra II","Mr. Rodriguez","#2e7d32"],
          ["AP Biology","Ms. Chen","#bf360c"],
          ["US History","Mr. Thompson","#4a148c"],
        ].map(([name, teacher, bg]) => `
          <div style="border-radius:8px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,.3);cursor:pointer;">
            <div style="background:${bg};color:#fff;padding:20px 24px;min-height:90px;position:relative;">
              <div style="font-size:20px;font-weight:500;">${name}</div>
              <div style="font-size:13px;margin-top:6px;opacity:.85;">${teacher}</div>
              <div style="position:absolute;bottom:12px;right:12px;width:44px;height:44px;border-radius:50%;background:rgba(255,255,255,.25);display:flex;align-items:center;justify-content:center;">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
              </div>
            </div>
            <div style="background:#fff;padding:12px 24px;display:flex;justify-content:flex-end;gap:8px;">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="#5f6368"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/></svg>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="#5f6368"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/></svg>
            </div>
          </div>
        `).join("")}
      </div>
    </div>
  `;
  document.body.appendChild(overlayEl);
}

function showOverlay() {
  buildOverlay();
  overlayEl.style.display = "block";
  overlayVisible = true;
}

function hideOverlay() {
  if (overlayEl) overlayEl.style.display = "none";
  overlayVisible = false;
}

// --- Panic key — reads settings fresh on every keydown ---
window.addEventListener("keydown", (e) => {
  const s = loadSettings();
  if (!s.panicKey || e.code !== s.panicKey) return;
  e.preventDefault();
  e.stopImmediatePropagation();

  if (overlayVisible) { hideOverlay(); return; }

  const action = s.panicAction || "overlay";
  if (action === "overlay") {
    showOverlay();
  } else if (action === "close") {
    window.location.replace("about:blank");
    window.close();
  } else if (action === "classroom") {
    window.location.replace("https://classroom.google.com");
  } else {
    window.location.replace("https://google.com");
  }
}, { capture: true });

applyCloak();
