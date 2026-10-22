"use strict";

const params = new URLSearchParams(location.search);
const src = params.get("src");
const title = params.get("title") || "";

document.getElementById("play-title").textContent = title;

const frame = document.getElementById("play-frame");
if (src) {
  if (src.startsWith("https://") || src.startsWith("http://")) {
    window.location.href = src;
  } else {
    frame.src = src;
  }
} else {
  location.href = "/games.html";
}
