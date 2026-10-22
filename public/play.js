"use strict";

const params = new URLSearchParams(location.search);
const src = params.get("src");
const title = params.get("title") || "";

document.getElementById("play-title").textContent = title;

const frame = document.getElementById("play-frame");
if (src) {
  const isRemote = src.startsWith("http://") || src.startsWith("https://");
  if (isRemote) {
    window.open(src, "_blank");
    location.href = "/games.html";
  } else {
    frame.src = src;
  }
} else {
  location.href = "/games.html";
}
