"use strict";

const engineButtons = document.querySelectorAll("#engine-options .option-btn");
const swatches = document.querySelectorAll("#theme-swatches .swatch");
const cloakButtons = document.querySelectorAll("#cloak-options .option-btn");
const panicKeyButtons = document.querySelectorAll("#panic-key-options .option-btn");
const panicActionButtons = document.querySelectorAll("#panic-action-options .option-btn");

const settings = loadSettings();
const currentEngine = settings.searchEngine || "bing";
const currentTheme = settings.theme || "purple";
const currentCloak = settings.cloak || "none";
const currentPanicKey = settings.panicKey || "";
const currentPanicAction = settings.panicAction || "overlay";

for (const btn of engineButtons) {
  if (btn.dataset.engine === currentEngine) btn.classList.add("selected");
  btn.addEventListener("click", () => {
    for (const b of engineButtons) b.classList.remove("selected");
    btn.classList.add("selected");
    const s = loadSettings();
    s.searchEngine = btn.dataset.engine;
    saveSettings(s);
  });
}

for (const swatch of swatches) {
  if (swatch.dataset.theme === currentTheme) swatch.classList.add("selected");
  swatch.addEventListener("click", () => {
    for (const s of swatches) s.classList.remove("selected");
    swatch.classList.add("selected");
    const s = loadSettings();
    s.theme = swatch.dataset.theme;
    saveSettings(s);
    applyTheme(s.theme);
  });
}

for (const btn of cloakButtons) {
  if (btn.dataset.cloak === currentCloak) btn.classList.add("selected");
  btn.addEventListener("click", () => {
    for (const b of cloakButtons) b.classList.remove("selected");
    btn.classList.add("selected");
    const s = loadSettings();
    s.cloak = btn.dataset.cloak;
    saveSettings(s);
    applyCloak();
  });
}

for (const btn of panicKeyButtons) {
  if (btn.dataset.panickey === currentPanicKey) btn.classList.add("selected");
  btn.addEventListener("click", () => {
    for (const b of panicKeyButtons) b.classList.remove("selected");
    btn.classList.add("selected");
    const s = loadSettings();
    s.panicKey = btn.dataset.panickey;
    saveSettings(s);
  });
}

for (const btn of panicActionButtons) {
  if (btn.dataset.panicaction === currentPanicAction) btn.classList.add("selected");
  btn.addEventListener("click", () => {
    for (const b of panicActionButtons) b.classList.remove("selected");
    btn.classList.add("selected");
    const s = loadSettings();
    s.panicAction = btn.dataset.panicaction;
    saveSettings(s);
  });
}
