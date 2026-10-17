"use strict";

const CLOAK_PRESETS = {
  none: null,
  "google-docs": {
    title: "Untitled document - Google Docs",
    favicon: "https://ssl.gstatic.com/docs/documents/images/kix-favicon7.ico",
  },
  kahoot: {
    title: "Kahoot!",
    favicon: "https://www.google.com/s2/favicons?domain=kahoot.it&sz=32",
  },
  desmos: {
    title: "Desmos | Graphing Calculator",
    favicon: "https://www.google.com/s2/favicons?domain=desmos.com&sz=32",
  },
  khan: {
    title: "Khan Academy | Free Online Courses",
    favicon: "https://www.google.com/s2/favicons?domain=khanacademy.org&sz=32",
  },
  classroom: {
    title: "Google Classroom",
    favicon: "https://www.google.com/s2/favicons?domain=classroom.google.com&sz=32",
  },
  canvas: {
    title: "Dashboard",
    favicon: "https://www.google.com/s2/favicons?domain=canvas.instructure.com&sz=32",
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
}

function installPanicKey() {
  const s = loadSettings();
  if (!s.panicKey) return;
  const action = s.panicAction || "google";
  window.addEventListener("keydown", (e) => {
    if (e.code !== s.panicKey) return;
    e.preventDefault();
    e.stopImmediatePropagation();
    if (action === "close") {
      window.location.replace("about:blank");
      window.close();
    } else if (action === "classroom") {
      window.location.replace("https://classroom.google.com");
    } else {
      window.location.replace("https://google.com");
    }
  }, { capture: true });
}

applyCloak();
installPanicKey();
