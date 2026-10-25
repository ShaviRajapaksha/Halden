import cfg from "./frames.json";

export const FRAME_COUNT: number = cfg.count;
export const FRAME_BG: string = cfg.bg;
// Frames live in /public/frames as ezgif-frame-001.jpg ... ezgif-frame-240.jpg
export const frameSrc = (i: number) => `/frames/ezgif-frame-${String(i).padStart(3, "0")}.jpg`;