import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const framesDir = path.join(__dirname, "public", "frames");
if (!fs.existsSync(framesDir)) {
  fs.mkdirSync(framesDir, { recursive: true });
}

const TOTAL_FRAMES = 48;
const WIDTH = 1920;
const HEIGHT = 1080;

async function generateFrames() {
  console.log(`Generating ${TOTAL_FRAMES} SVG frames...`);

  for (let i = 0; i < TOTAL_FRAMES; i++) {
    const progress = i / (TOTAL_FRAMES - 1);

    const r = Math.floor(5 + progress * 20);
    const g = Math.floor(5 + progress * 10);
    const b = Math.floor(5 + progress * 30);

    const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}">
  <rect width="100%" height="100%" fill="rgb(${r},${g},${b})" />

  <circle 
    cx="${WIDTH / 2}" 
    cy="${HEIGHT / 2}" 
    r="${100 + progress * 500}" 
    fill="none" 
    stroke="white" 
    stroke-opacity="${0.15 + progress * 0.4}" 
    stroke-width="8" 
  />

  <rect x="120" y="${HEIGHT - 120}" width="${WIDTH - 240}" height="16" fill="#222"/>
  <rect x="120" y="${HEIGHT - 120}" width="${(WIDTH - 240) * progress}" height="16" fill="#fff"/>
</svg>
    `;

    const fileName = `frame_${String(i).padStart(4, "0")}.svg`;
    fs.writeFileSync(path.join(framesDir, fileName), svg.trim());
  }

  console.log("✅ Frames generated successfully");
}

generateFrames();
