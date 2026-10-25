# Halden H1: scrollytelling landing page (Next.js App Router + Framer Motion)

## Run
    npm install
    npm run frames -- /path/to/your/jpg/folder "#121a2b"   # copies + renames frames, sets the count
    npm run dev

The frames script natural-sorts your JPGs (so img2 comes before img10), writes them to
public/frames/frame_0001.jpg ..., and updates lib/frames.json. The second argument is the
letterbox colour; match it to your frames' background.

## Tuning
- Scroll length: `.track { height: 800vh }` in app/globals.css. Longer means slower scrubbing.
- Text timing: the `from` / `to` props on each <Beat> in components/ScrollSequence.tsx (0 to 1).
  Line them up with the frame ranges where parts separate.
- Smoothing: the useSpring values in ScrollSequence.
- File size: 200+ full-HD JPGs can total 40 MB or more. Export at about 1920 px wide, quality 70-80,
  or convert to WebP, to keep loading quick. If you convert, change the extension in lib/frames.ts
  and scripts/prepare-frames.mjs.
