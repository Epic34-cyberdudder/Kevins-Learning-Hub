"use strict";

const engineButtons = document.querySelectorAll("#engine-options .option-btn");
const swatches = document.querySelectorAll("#theme-swatches .swatch");

const settings = loadSettings();
const currentEngine = settings.searchEngine || "bing";
const currentTheme = settings.theme || "purple";

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
