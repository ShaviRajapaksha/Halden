// Usage: npm run frames -- /path/to/your/jpgs [#backgroundHex]
// Natural-sorts your JPGs, copies them to public/frames/frame_0001.jpg..., writes lib/frames.json
import fs from "node:fs";
import path from "node:path";

const src = process.argv[2];
const bg = process.argv[3] || "#121a2b";
if (!src || !fs.existsSync(src)) { console.error("Pass the folder containing your JPGs."); process.exit(1); }

const files = fs.readdirSync(src).filter(f => /\.jpe?g$/i.test(f))
  .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
if (!files.length) { console.error("No JPG files found."); process.exit(1); }

const out = path.join(process.cwd(), "public", "frames");
fs.mkdirSync(out, { recursive: true });
for (const f of fs.readdirSync(out)) if (f.startsWith("frame_")) fs.unlinkSync(path.join(out, f));
files.forEach((f, i) => fs.copyFileSync(path.join(src, f), path.join(out, `frame_${String(i + 1).padStart(4, "0")}.jpg`)));
fs.writeFileSync(path.join(process.cwd(), "lib", "frames.json"), JSON.stringify({ count: files.length, bg }, null, 2));
console.log(`Copied ${files.length} frames. lib/frames.json updated.`);
