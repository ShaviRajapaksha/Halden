
"use client";

import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

import { useCallback, useEffect, useRef, useState } from "react";
import { FRAME_BG, FRAME_COUNT, frameSrc } from "@/lib/frames";
import Beat from "./Beat";

export default function ScrollSequence() {
  const trackRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const images = useRef<Array<HTMLImageElement | undefined>>([]);
  const size = useRef({ w: 0, h: 0 });
  const lastDrawn = useRef<HTMLImageElement | null>(null);

  const [loaded, setLoaded] = useState(0);
  const ready = loaded >= FRAME_COUNT;

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  const progress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 32,
    mass: 0.35,
  });

  const draw = useCallback((value: number) => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");

    if (!canvas || !context) return;

    const { w, h } = size.current;

    if (!w || !h) return;

    const index = Math.min(
      FRAME_COUNT - 1,
      Math.max(0, Math.round(value * (FRAME_COUNT - 1)))
    );

    let image = images.current[index];

    // Find the nearest available frame in either direction.
    if (!image) {
      for (let distance = 1; distance < FRAME_COUNT; distance++) {
        const previous = images.current[index - distance];
        const next = images.current[index + distance];

        if (previous) {
          image = previous;
          break;
        }

        if (next) {
          image = next;
          break;
        }
      }
    }

    if (!image) return;
    if (image === lastDrawn.current) return;

    lastDrawn.current = image;

    context.clearRect(0, 0, w, h);
    context.fillStyle = FRAME_BG;
    context.fillRect(0, 0, w, h);

    const scale =
      Math.max(w / image.naturalWidth, h / image.naturalHeight) *
      (w < 700 ? 0.8 : 1);

    const drawWidth = image.naturalWidth * scale;
    const drawHeight = image.naturalHeight * scale;

    context.drawImage(
      image,
      (w - drawWidth) / 2,
      (h - drawHeight) / 2,
      drawWidth,
      drawHeight
    );
  }, []);

  useMotionValueEvent(progress, "change", draw);

  // Fit the canvas to the available viewport and device pixel ratio.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const fit = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;

      if (!width || !height) return;

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);

      context.setTransform(dpr, 0, 0, dpr, 0, 0);

      size.current = { w: width, h: height };
      lastDrawn.current = null;

      draw(progress.get());
    };

    fit();

    const observer = new ResizeObserver(fit);
    observer.observe(canvas);

    window.addEventListener("resize", fit);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", fit);
    };
  }, [draw, progress]);

  // Load the opening frame first, then preload the remaining frames
  // in small batches instead of starting all image requests together.
  useEffect(() => {
    let cancelled = false;
    let count = 0;

    const loadFrame = (frameNumber: number) =>
      new Promise<void>((resolve) => {
        const image = new Image();

        image.decoding = "async";

        image.onload = () => {
          if (!cancelled) {
            images.current[frameNumber - 1] = image;
            count += 1;
            setLoaded(count);
            draw(progress.get());
          }

          resolve();
        };

        image.onerror = () => {
          if (!cancelled) {
            count += 1;
            setLoaded(count);
          }

          resolve();
        };

        image.src = frameSrc(frameNumber);
      });

    async function preload() {
      await loadFrame(1);

      const batchSize = 12;

      for (
        let start = 2;
        start <= FRAME_COUNT && !cancelled;
        start += batchSize
      ) {
        const batch = Array.from(
          {
            length: Math.min(batchSize, FRAME_COUNT - start + 1),
          },
          (_, index) => loadFrame(start + index)
        );

        await Promise.all(batch);
      }

      if (!cancelled) {
        draw(progress.get());
      }
    }

    void preload();

    return () => {
      cancelled = true;
    };
  }, [draw, progress]);

  const hintOpacity = useTransform(progress, [0, 0.03], [1, 0]);

  return (
    <>
      <AnimatePresence>
        {!ready && (
          <motion.div
            className="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.65 }}
          >
            <div className="loader-inner">
              <div className="loader-heading">
                <strong>Halden.</strong>
                <span>
                  {Math.round((loaded / FRAME_COUNT) * 100)}%
                </span>
              </div>

              <p className="loader-caption">
                Preparing the experience
              </p>

              <div
                className="bar"
                role="progressbar"
                aria-label="Loading product animation"
                aria-valuemin={0}
                aria-valuemax={FRAME_COUNT}
                aria-valuenow={loaded}
              >
                <i
                  style={{
                    width: `${(loaded / FRAME_COUNT) * 100}%`,
                  }}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div ref={trackRef} className="track" id="experience">
        <div className="stage">
          <canvas
            ref={canvasRef}
            role="img"
            aria-label="Halden H1 headphones in an animated product breakdown"
          />

          <div className="vignette" />

          <Beat progress={progress} from={0} to={0.11} className="hero">
            <div className="eyebrow">Introducing Halden H1</div>

            <h2>
              Sound.
              <em>Uncovered.</em>
            </h2>

            <p>
              An obsession with the details. A different perspective
              on everything you hear.
            </p>
          </Beat>

          <Beat progress={progress} from={0.17} to={0.34} className="left">
            <div className="eyebrow">01 / Acoustic engineering</div>

            <h2>
              Hear what
              <br />
              matters.
            </h2>

            <p>
              Precision-tuned drivers bring definition to every
              instrument, every vocal, and every quiet detail.
            </p>

            <span className="spec">
              40 mm driver architecture
            </span>
          </Beat>

          <Beat progress={progress} from={0.37} to={0.54} className="right">
            <div className="eyebrow">02 / All-day comfort</div>

            <h2>
              Made to
              <br />
              disappear.
            </h2>

            <p>
              Soft-touch surfaces and carefully considered
              cushioning create a listening experience that feels
              natural from the first track to the last.
            </p>

            <span className="spec">
              Comfort-led construction
            </span>
          </Beat>

          <Beat progress={progress} from={0.57} to={0.72} className="left">
            <div className="eyebrow">03 / Material intelligence</div>

            <h2>
              Form
              <br />
              follows <em>function.</em>
            </h2>

            <p>
              Refined geometry. Clean transitions. Every visible
              surface has a reason to exist.
            </p>

            <span className="spec">
              Precision-crafted design
            </span>
          </Beat>

          <Beat progress={progress} from={0.84} to={1.01} className="end">
            <div className="eyebrow">The Halden H1</div>

            <h2>
              Nothing
              <br />
              unnecessary.
            </h2>

            <p>
              Thoughtful engineering, considered materials, and
              sound designed to bring you closer.
            </p>

            <a className="cta" href="#product">
              Discover H1 <span className="arrow">↗</span>
            </a>
          </Beat>

          <motion.div className="hint" style={{ opacity: hintOpacity }}>
            Scroll to explore
          </motion.div>

          <div className="progress" aria-hidden="true">
            <motion.i
              style={{
                scaleX: progress,
                display: "block",
                transformOrigin: "0 50%",
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
