// Optimises the media listed in scripts/media-manifest.mjs and regenerates
// src/content/media.ts.
//
//   npm run media                          build anything that is missing
//   npm run media -- --force               rebuild everything
//   npm run media -- --force --only=hero,tower-orbit
//
// Images: WebP at max 2000px on the long edge, plus an 800px variant.
// Videos: H.264 MP4 (720p, 30fps, no audio) trimmed to 8s, with WebP posters.
// Homepage loops (hero, process) are cropped, crossfaded so they wrap without
// a jump, and re-encoded until they fit their byte budget.
//
// Originals live in public/content/ (gitignored). Without them, or without
// ffmpeg, existing outputs are reused and anything missing is left out of
// media.ts, so the site never points at a file that does not exist.
import { execFile, execFileSync } from "node:child_process";
import { promisify } from "node:util";
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";
import { projects, items, slots } from "./media-manifest.mjs";

const run = promisify(execFile);
const ROOT = path.resolve(import.meta.dirname, "..");
const CONTENT = path.join(ROOT, "public/content");
const VIDEO_DIR = path.join(ROOT, "public/media/video");
const IMAGE_DIR = path.join(ROOT, "public/media/images");
const MEDIA_TS = path.join(ROOT, "src/content/media.ts");
const META_CACHE = path.join(ROOT, "scripts/media-meta.json");

const IMAGE_MAX = 2000;
const THUMB_MAX = 800;
const POSTER_MAX = 1600;
const VIDEO_MAX = 1280;
const CLIP_MAX = 8;
const CRF = 30;
const JOBS = 3;

const args = process.argv.slice(2);
const force = args.includes("--force");
const only = args.find((a) => a.startsWith("--only="))?.slice(7).split(",");
const wanted = (id) => !only || only.includes(id);

const hasFfmpeg = (() => {
  try {
    execFileSync("ffmpeg", ["-version"], { stdio: "ignore" });
    execFileSync("ffprobe", ["-version"], { stdio: "ignore" });
    return true;
  } catch {
    return false;
  }
})();

const todo = [];
const metaCache = fs.existsSync(META_CACHE) ? JSON.parse(fs.readFileSync(META_CACHE, "utf8")) : {};
fs.mkdirSync(VIDEO_DIR, { recursive: true });
fs.mkdirSync(IMAGE_DIR, { recursive: true });

const sourcePath = (src) =>
  src.startsWith("repo:") ? path.join(ROOT, src.slice(5)) : path.join(CONTENT, src);
const publicUrl = (file) => "/" + path.relative(path.join(ROOT, "public"), file).split(path.sep).join("/");
const missing = (...files) => files.some((f) => !fs.existsSync(f));
const round = (n, d = 1) => Math.round(n * 10 ** d) / 10 ** d;
const even = (n) => Math.round(n / 2) * 2;
const quote = (s) => `"${s}"`;

// true: build it. false: reuse what is on disk. null: unavailable, leave it out.
function plan(id, source, ...outputs) {
  const absent = missing(...outputs);
  if (!absent && !(force && wanted(id))) return false;
  if (!wanted(id)) return absent ? null : false;
  if (!fs.existsSync(sourcePath(source))) {
    console.warn(`  skip   ${id}: source not found (${source})`);
    return absent ? null : false;
  }
  return true;
}

async function probe(file) {
  const { stdout } = await run("ffprobe", ["-v", "error", "-select_streams", "v:0", "-show_entries",
    "stream=width,height:format=duration", "-of", "json", file]);
  const j = JSON.parse(stdout);
  return { width: j.streams[0].width, height: j.streams[0].height, duration: parseFloat(j.format.duration) };
}

// Dimensions of an encoded output, from ffprobe or (without ffmpeg) the cache.
async function outputMeta(mp4) {
  const key = publicUrl(mp4);
  if (hasFfmpeg) {
    const { width, height, duration } = await probe(mp4);
    metaCache[key] = { width, height, duration: round(duration) };
  }
  return metaCache[key] ?? null;
}

async function frame(src, seconds, filter) {
  const { stdout } = await run("ffmpeg", ["-v", "error", "-ss", String(seconds), "-i", src, "-frames:v", "1",
    "-vf", `${filter ? filter + "," : ""}format=rgb24`, "-f", "image2pipe", "-c:v", "png", "-"],
    { encoding: "buffer", maxBuffer: 256 * 1024 * 1024 });
  return stdout;
}

async function writeStills(input, base, max) {
  const resize = (size) => ({ width: size, height: size, fit: "inside", withoutEnlargement: true });
  await sharp(input).rotate().resize(resize(max)).webp({ quality: 78, effort: 5 }).toFile(`${base}.webp`);
  await sharp(input).rotate().resize(resize(THUMB_MAX)).webp({ quality: 72, effort: 5 }).toFile(`${base}-800.webp`);
}

async function encode(src, outFile, inputArgs, filterArgs, crf) {
  await run("ffmpeg", ["-v", "error", "-y", ...inputArgs, "-i", src, ...filterArgs, "-an",
    "-c:v", "libx264", "-preset", "slow", "-crf", String(crf), "-profile:v", "high", "-pix_fmt", "yuv420p",
    "-movflags", "+faststart", "-tag:v", "avc1", outFile]);
}

async function processImage(item) {
  const base = path.join(IMAGE_DIR, item.id);
  const build = plan(item.id, item.source, `${base}.webp`, `${base}-800.webp`);
  if (build === null) return null;
  if (build) {
    await writeStills(sourcePath(item.source), base, IMAGE_MAX);
    console.log(`  image  ${item.id}`);
  }
  const { width, height } = await sharp(`${base}.webp`).metadata();
  return { src: publicUrl(`${base}.webp`), thumb: publicUrl(`${base}-800.webp`), width, height };
}

async function processVideo(item) {
  const base = path.join(VIDEO_DIR, item.id);
  const mp4 = `${base}.mp4`;
  const src = sourcePath(item.source);
  const build = plan(item.id, item.source, mp4, `${base}.webp`, `${base}-800.webp`);
  if (build === null) return null;
  if (build && !hasFfmpeg) {
    const [start, end] = item.trim ?? [0, CLIP_MAX];
    todo.push(`ffmpeg -ss ${start} -t ${Math.min(end - start, CLIP_MAX)} -i ${quote(src)} -vf "scale='if(gt(iw,ih),${VIDEO_MAX},-2)':'if(gt(iw,ih),-2,${VIDEO_MAX})',fps=30,format=yuv420p" -an -c:v libx264 -preset slow -crf ${CRF} -movflags +faststart ${quote(mp4)}`,
      `ffmpeg -ss ${item.poster ?? start} -i ${quote(src)} -frames:v 1 ${quote(`${base}.png`)}   # then save as ${item.id}.webp (1600px) and ${item.id}-800.webp`);
    return null;
  }
  if (build) {
    const meta = await probe(src);
    const [start, end] = item.trim ?? [0, meta.duration];
    const length = round(Math.min(Math.min(end, meta.duration - 0.05) - start, CLIP_MAX), 2);
    const scale = meta.width >= meta.height ? `scale=${VIDEO_MAX}:-2` : `scale=-2:${VIDEO_MAX}`;
    await encode(src, mp4, ["-ss", String(start), "-t", String(length)],
      ["-vf", `${scale}:flags=lanczos,fps=30,format=yuv420p`], CRF);
    await writeStills(await frame(src, item.poster ?? start + length / 2), base, POSTER_MAX);
    console.log(`  video  ${item.id}  ${round(fs.statSync(mp4).size / 1e6, 2)}MB`);
  }
  const out = await outputMeta(mp4);
  if (!out) return null;
  return { src: publicUrl(mp4), poster: publicUrl(`${base}.webp`), thumb: publicUrl(`${base}-800.webp`), ...out };
}

// A loop of `length` seconds whose last `crossfade` seconds dissolve into its
// first frame, so playback wraps around without a visible jump.
async function processLoop(name, slot) {
  const base = path.join(VIDEO_DIR, `${name}-loop`);
  const mp4 = `${base}.mp4`;
  const src = sourcePath(slot.source);
  const [aw, ah] = slot.aspect;
  const width = slot.width;
  const height = even((width * ah) / aw);
  const { start, length, crossfade: fade } = slot;
  const build = plan(name, slot.source, mp4, `${base}.webp`, `${base}-800.webp`);
  if (build === null) return null;
  if (build) {
    const graph = (crop) => `[0:v]${crop},scale=${width}:${height}:flags=lanczos,fps=30,format=yuv420p,split[a][b];` +
      `[a]trim=start=${fade},setpts=PTS-STARTPTS[main];[b]trim=end=${fade},setpts=PTS-STARTPTS[head];` +
      `[main][head]xfade=transition=fade:duration=${fade}:offset=${length - fade},format=yuv420p[v]`;
    if (!hasFfmpeg) {
      todo.push(`ffmpeg -ss ${start} -t ${length + fade} -i ${quote(src)} -filter_complex "${graph(`crop=ih*${aw}/${ah}:ih`)}" -map "[v]" -an -c:v libx264 -preset slow -crf 26 -movflags +faststart ${quote(mp4)}`);
      return null;
    }
    const meta = await probe(src);
    const crop = meta.width / meta.height > aw / ah
      ? `crop=${even((meta.height * aw) / ah)}:${meta.height}`
      : `crop=${meta.width}:${even((meta.width * ah) / aw)}`;
    for (let crf = 23; ; crf += 2) {
      await encode(src, mp4, ["-ss", String(start), "-t", String(length + fade)],
        ["-filter_complex", graph(crop), "-map", "[v]"], crf);
      const size = fs.statSync(mp4).size;
      if (size <= slot.maxBytes || crf >= 35) {
        console.log(`  loop   ${name}  crf ${crf}  ${round(size / 1e6, 2)}MB (budget ${slot.maxBytes / 1e6}MB)`);
        break;
      }
    }
    // Poster = the loop's first frame, rendered sharper than the video itself.
    const posterWidth = aw >= ah ? POSTER_MAX : 1080;
    await writeStills(await frame(src, start + fade, `${crop},scale=${posterWidth}:-2:flags=lanczos`), base, POSTER_MAX);
  }
  const out = await outputMeta(mp4);
  if (!out) return null;
  return { src: publicUrl(mp4), poster: publicUrl(`${base}.webp`), thumb: publicUrl(`${base}-800.webp`), alt: slot.alt, ...out };
}

async function pool(tasks, size) {
  const results = new Array(tasks.length);
  let next = 0;
  await Promise.all(Array.from({ length: size }, async () => {
    while (next < tasks.length) {
      const i = next++;
      results[i] = await tasks[i]();
    }
  }));
  return results;
}

console.log(`Media: ${items.length} items${only ? `, building ${only.join(", ")}` : ""}${hasFfmpeg ? "" : " (ffmpeg not found)"}`);

const built = await pool(items.map((item) => async () => {
  const out = item.type === "image" ? await processImage(item) : await processVideo(item);
  if (!out) return null;
  const project = projects[item.project];
  return {
    id: item.id, src: out.src, type: item.type, category: item.category,
    ...(project.sector && { sector: project.sector }),
    title: project.title, alt: item.alt, width: out.width, height: out.height,
    ...(out.duration && { duration: out.duration }),
    ...(out.poster && { poster: out.poster }),
    thumb: out.thumb,
  };
}), JOBS);

const heroLoop = await processLoop("hero", slots.hero);
const processLoopMedia = await processLoop("process", slots.process);

const media = built.filter(Boolean);
const ids = new Set(media.map((m) => m.id));
const keep = (id) => (id && ids.has(id) ? id : null);
const bento = Object.fromEntries(Object.entries(slots.bento).map(([k, list]) => [k, list.filter((id) => ids.has(id))]));
const json = (value) => JSON.stringify(value, null, 2);

fs.writeFileSync(META_CACHE, json(Object.fromEntries(Object.entries(metaCache).sort())) + "\n");
fs.mkdirSync(path.dirname(MEDIA_TS), { recursive: true });
fs.writeFileSync(MEDIA_TS, `// Generated by scripts/optimise-media.mjs from scripts/media-manifest.mjs.
// Do not edit by hand: change the manifest, then run \`npm run media\`.

export type MediaCategory =
  | "facade"
  | "balcony-railing"
  | "windows-glazing"
  | "office-partition"
  | "shower-cubicle"
  | "interior"
  | "automotive"
  | "workshop"
  | "team";

export type MediaSector = "residential" | "commercial" | "automotive";

export interface MediaItem {
  id: string;
  src: string;
  type: "image" | "video";
  category: MediaCategory;
  sector?: MediaSector;
  title: string;
  alt: string;
  width: number;
  height: number;
  duration?: number;
  poster?: string;
  thumb: string;
}

export interface MediaLoop {
  src: string;
  poster: string;
  thumb: string;
  alt: string;
  width: number;
  height: number;
  duration: number;
}

export const media: MediaItem[] = ${json(media)};

export const heroLoop: MediaLoop | null = ${json(heroLoop)};

export const processLoop: MediaLoop | null = ${json(processLoopMedia)};

export const pillarMedia: { automotive: string | null; architectural: string | null } = ${json({
  automotive: keep(slots.pillars.automotive), architectural: keep(slots.pillars.architectural),
})};

export const bentoPicks: Record<"all" | "residential" | "commercial", string[]> = ${json(bento)};
`);
console.log(`Wrote ${path.relative(ROOT, MEDIA_TS)}: ${media.length} of ${items.length} items`);

if (todo.length) {
  console.log("\nTODO: install ffmpeg (https://ffmpeg.org) and run `npm run media`, or run these by hand:\n");
  for (const cmd of todo) console.log(cmd);
}
