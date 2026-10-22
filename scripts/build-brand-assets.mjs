// Builds the favicon set and the Open Graph image from the logo SVGs in
// public/brand/ and the hero still made by `npm run media`.
//
//   npm run brand
//
// Writes src/app/favicon.ico (16/32/48), public/icon.svg,
// public/apple-touch-icon.png (180) and public/og.jpg (1200x630).
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");
const brand = (file) => fs.readFileSync(path.join(ROOT, "public/brand", file), "utf8");
const HERO_STILL = path.join(ROOT, "public/media/video/hero-loop.webp");

const NAVY_PANEL = "#073B61";

// Inner markup and viewBox of a brand SVG, so it can be nested in a new canvas.
function parts(svg) {
  const viewBox = svg.match(/viewBox="([^"]+)"/)[1];
  const body = svg.replace(/^<svg[^>]*>/, "").replace(/<\/svg>\s*$/, "").replace(/<title[^>]*>.*?<\/title>/, "");
  return { viewBox, body };
}

// The mark on white, as the favicon and app icon source.
const mark = parts(brand("logo-mark.svg"));
const iconSvg = (size, pad, radius) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}">` +
  `<rect width="${size}" height="${size}" rx="${radius}" fill="#ffffff"/>` +
  `<svg x="${pad}" y="${pad}" width="${size - pad * 2}" height="${size - pad * 2}" viewBox="${mark.viewBox}">${mark.body}</svg></svg>\n`;

fs.writeFileSync(path.join(ROOT, "public/icon.svg"), iconSvg(64, 5, 12));

await sharp(Buffer.from(iconSvg(180, 22, 0)), { density: 300 })
  .resize(180, 180).flatten({ background: "#ffffff" }).png().toFile(path.join(ROOT, "public/apple-touch-icon.png"));

// favicon.ico: PNG-compressed entries (supported by every current browser).
const sizes = [16, 32, 48];
const pngs = await Promise.all(sizes.map((s) =>
  sharp(Buffer.from(iconSvg(64, 3, 10)), { density: 300 }).resize(s, s).png().toBuffer()));
const header = Buffer.alloc(6 + 16 * sizes.length);
header.writeUInt16LE(0, 0);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(sizes.length, 4);
let offset = header.length;
sizes.forEach((s, i) => {
  const e = 6 + i * 16;
  header.writeUInt8(s, e);
  header.writeUInt8(s, e + 1);
  header.writeUInt16LE(1, e + 4);
  header.writeUInt16LE(32, e + 6);
  header.writeUInt32LE(pngs[i].length, e + 8);
  header.writeUInt32LE(offset, e + 12);
  offset += pngs[i].length;
});
fs.writeFileSync(path.join(ROOT, "src/app/favicon.ico"), Buffer.concat([header, ...pngs]));

// Open Graph: white logo on a window-grid navy panel, hero still beside it.
const W = 1200, H = 630, PANEL = 560;
const logo = parts(brand("logo-full-white.svg"));
const [, , lw, lh] = logo.viewBox.split(" ").map(Number);
const logoH = 430;
const logoW = Math.round((logoH * lw) / lh);
const lines = [];
for (let x = 0; x <= PANEL; x += 96) lines.push(`<rect x="${x}" y="0" width="1" height="${H}"/>`);
for (let y = 0; y <= H; y += 72) lines.push(`<rect x="0" y="${y}" width="${PANEL}" height="1"/>`);
const panel = `<svg xmlns="http://www.w3.org/2000/svg" width="${PANEL}" height="${H}">` +
  `<rect width="${PANEL}" height="${H}" fill="${NAVY_PANEL}"/>` +
  `<g fill="#ffffff" fill-opacity="0.05">${lines.join("")}</g>` +
  `<svg x="${(PANEL - logoW) / 2}" y="${(H - logoH) / 2}" width="${logoW}" height="${logoH}" viewBox="${logo.viewBox}">${logo.body}</svg></svg>`;

if (!fs.existsSync(HERO_STILL)) throw new Error("Hero still missing: run `npm run media` first.");
const photo = await sharp(HERO_STILL).resize(W - PANEL, H, { fit: "cover", position: "centre" }).toBuffer();
await sharp({ create: { width: W, height: H, channels: 3, background: NAVY_PANEL } })
  .composite([
    { input: await sharp(Buffer.from(panel), { density: 144 }).resize(PANEL, H).png().toBuffer(), left: 0, top: 0 },
    { input: photo, left: PANEL, top: 0 },
  ])
  .jpeg({ quality: 84, mozjpeg: true })
  .toFile(path.join(ROOT, "public/og.jpg"));

console.log("Wrote favicon.ico, icon.svg, apple-touch-icon.png, og.jpg");
