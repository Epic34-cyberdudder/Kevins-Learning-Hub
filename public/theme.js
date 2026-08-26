"use strict";

const THEMES = {
  purple: {
    "--accent-1": "#2e1065",
    "--accent-2": "#7e22ce",
    "--accent-2-hover": "#6b21a8",
    "--accent-3": "#a855f7",
    "--accent-4": "#c084fc",
    "--accent-5": "#f0abfc",
    "--accent-glow": "rgba(168, 85, 247, 0.15)",
  },
  blue: {
    "--accent-1": "#0c2461",
    "--accent-2": "#1d4ed8",
    "--accent-2-hover": "#1e40af",
    "--accent-3": "#60a5fa",
    "--accent-4": "#93c5fd",
    "--accent-5": "#bfdbfe",
    "--accent-glow": "rgba(96, 165, 250, 0.15)",
  },
  teal: {
    "--accent-1": "#064e3b",
    "--accent-2": "#059669",
    "--accent-2-hover": "#047857",
    "--accent-3": "#34d399",
    "--accent-4": "#6ee7b7",
    "--accent-5": "#a7f3d0",
    "--accent-glow": "rgba(52, 211, 153, 0.15)",
  },
  rose: {
    "--accent-1": "#831843",
    "--accent-2": "#db2777",
    "--accent-2-hover": "#be185d",
    "--accent-3": "#f472b6",
    "--accent-4": "#f9a8d4",
    "--accent-5": "#fbcfe8",
    "--accent-glow": "rgba(244, 114, 182, 0.15)",
  },
  amber: {
    "--accent-1": "#78350f",
    "--accent-2": "#d97706",
    "--accent-2-hover": "#b45309",
    "--accent-3": "#fbbf24",
    "--accent-4": "#fcd34d",
    "--accent-5": "#fde68a",
    "--accent-glow": "rgba(251, 191, 36, 0.15)",
  },
};

const SEARCH_ENGINES = {
  bing: "https://www.bing.com/search?q=%s",
  google: "https://www.google.com/search?q=%s",
};

function loadSettings() {
  try {
    return JSON.parse(localStorage.getItem("sj-settings")) || {};
  } catch {
    return {};
  }
}

function saveSettings(settings) {
  localStorage.setItem("sj-settings", JSON.stringify(settings));
}

function applyTheme(themeName) {
  const theme = THEMES[themeName] || THEMES.purple;
  for (const [key, value] of Object.entries(theme)) {
    document.documentElement.style.setProperty(key, value);
  }
}

applyTheme(loadSettings().theme);
