"use client";

import { useEffect, useRef } from "react";

function randomBetween(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export function TextureLayer() {
  const crayonRootRef = useRef<HTMLDivElement>(null);
  const pencilCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let disposed = false;
    let p5Instance: import("p5").default | null = null;
    let removeResizeListener: (() => void) | null = null;

    const initializeTexture = async () => {
      const [{ default: P5 }, { default: rough }] = await Promise.all([
        import("p5"),
        import("roughjs"),
      ]);

      if (disposed) {
        return;
      }

      const crayonRoot = crayonRootRef.current;
      const pencilCanvas = pencilCanvasRef.current;
      if (!crayonRoot || !pencilCanvas) {
        return;
      }

      const drawPencilTexture = () => {
        const width = window.innerWidth;
        const height = window.innerHeight;
        const dpr = window.devicePixelRatio || 1;

        pencilCanvas.width = Math.floor(width * dpr);
        pencilCanvas.height = Math.floor(height * dpr);
        pencilCanvas.style.width = `${width}px`;
        pencilCanvas.style.height = `${height}px`;

        const context = pencilCanvas.getContext("2d");
        if (!context) {
          return;
        }

        context.setTransform(dpr, 0, 0, dpr, 0, 0);
        context.clearRect(0, 0, width, height);

        const roughCanvas = rough.canvas(pencilCanvas);
        const lineCount = 18;

        for (let index = 0; index < lineCount; index += 1) {
          const ratio = index / lineCount;
          const baseY = ratio * height;
          roughCanvas.line(
            -24,
            baseY + randomBetween(-18, 18),
            width + 24,
            baseY + randomBetween(-18, 18),
            {
              stroke: "rgba(32, 32, 32, 0.08)",
              strokeWidth: randomBetween(0.6, 1.2),
              roughness: randomBetween(1.6, 2.4),
              bowing: randomBetween(1.4, 2.4),
            },
          );
        }
      };

      const sketch = (p: import("p5").default) => {
        const drawCrayonTexture = () => {
          p.clear();
          p.background(150, 196, 75, 255);
          p.noFill();

          for (let pass = 0; pass < 3; pass += 1) {
            for (let y = -40; y <= p.height + 40; y += 16) {
              p.stroke(
                p.random(136, 166),
                p.random(178, 212),
                p.random(65, 96),
                p.random(22, 44),
              );
              p.strokeWeight(p.random(13, 25));
              p.beginShape();
              for (let x = -80; x <= p.width + 80; x += 60) {
                p.vertex(x, y + pass * 5 + p.random(-10, 10));
              }
              p.endShape();
            }
          }

          for (let streak = 0; streak < Math.floor(p.width / 10); streak += 1) {
            const startX = p.random(0, p.width);
            const startY = p.random(-40, p.height * 0.4);
            const endY = startY + p.random(p.height * 0.12, p.height * 0.58);
            p.stroke(
              p.random(210, 240),
              p.random(225, 250),
              p.random(165, 200),
              p.random(10, 36),
            );
            p.strokeWeight(p.random(4, 12));
            p.line(startX, startY, startX + p.random(-8, 8), endY);
          }

          p.noStroke();
          for (let patch = 0; patch < Math.floor((p.width * p.height) / 5000); patch += 1) {
            p.fill(
              p.random(132, 172),
              p.random(176, 214),
              p.random(58, 94),
              p.random(18, 42),
            );
            p.rect(
              p.random(-20, p.width),
              p.random(-20, p.height),
              p.random(18, 56),
              p.random(9, 20),
              3,
            );
          }

          const grainCount = Math.max(1000, Math.floor((p.width * p.height) / 240));
          for (let point = 0; point < grainCount; point += 1) {
            const isLight = Math.random() > 0.45;
            if (isLight) {
              p.fill(255, 255, 235, p.random(7, 20));
            } else {
              p.fill(90, 116, 42, p.random(6, 16));
            }
            p.circle(p.random(0, p.width), p.random(0, p.height), p.random(1, 2.7));
          }
        };

        p.setup = () => {
          const width = crayonRoot.clientWidth || window.innerWidth;
          const height = crayonRoot.clientHeight || window.innerHeight;
          p.pixelDensity(1);
          const canvas = p.createCanvas(width, height);
          canvas.parent(crayonRoot);
          drawCrayonTexture();
          p.noLoop();
        };

        p.windowResized = () => {
          const width = crayonRoot.clientWidth || window.innerWidth;
          const height = crayonRoot.clientHeight || window.innerHeight;
          p.resizeCanvas(width, height);
          drawCrayonTexture();
          drawPencilTexture();
        };
      };

      p5Instance = new P5(sketch, crayonRoot);
      drawPencilTexture();

      const handleResize = () => {
        drawPencilTexture();
      };

      window.addEventListener("resize", handleResize);
      removeResizeListener = () => {
        window.removeEventListener("resize", handleResize);
      };
    };

    void initializeTexture();

    return () => {
      disposed = true;
      removeResizeListener?.();
      p5Instance?.remove();
    };
  }, []);

  return (
    <div className="texture-layer" aria-hidden>
      <div ref={crayonRootRef} className="texture-crayon" />
      <canvas ref={pencilCanvasRef} className="texture-pencil" />
    </div>
  );
}
