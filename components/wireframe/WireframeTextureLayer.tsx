"use client";

import { useEffect, useRef } from "react";

function randomRange(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export function WireframeTextureLayer() {
  const crayonRootRef = useRef<HTMLDivElement>(null);
  const pencilCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let disposed = false;
    let removeResize: (() => void) | null = null;
    let p5Instance: import("p5").default | null = null;

    const initialize = async () => {
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

      const drawPencilLayer = () => {
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

        const rc = rough.canvas(pencilCanvas);

        for (let i = 0; i < 18; i += 1) {
          const y = (height / 18) * i;
          rc.line(-40, y + randomRange(-14, 14), width + 40, y + randomRange(-14, 14), {
            stroke: "rgba(43, 58, 74, 0.1)",
            strokeWidth: randomRange(0.5, 1.4),
            roughness: randomRange(1.5, 2.2),
            bowing: randomRange(1.2, 2.4),
          });
        }

        for (let i = 0; i < 8; i += 1) {
          const x = randomRange(32, width - 32);
          const y = randomRange(32, height - 120);
          rc.rectangle(x, y, randomRange(90, 180), randomRange(60, 140), {
            stroke: "rgba(43, 58, 74, 0.06)",
            strokeWidth: randomRange(0.5, 1),
            roughness: randomRange(2, 3),
          });
        }
      };

      const sketch = (p: import("p5").default) => {
        const drawCrayonLayer = () => {
          p.clear();
          p.noFill();

          for (let pass = 0; pass < 3; pass += 1) {
            for (let y = -30; y <= p.height + 30; y += 13) {
              p.stroke(
                p.random(211, 231),
                p.random(229, 244),
                p.random(235, 248),
                p.random(28, 58),
              );
              p.strokeWeight(p.random(8, 18));
              p.beginShape();
              for (let x = -50; x <= p.width + 50; x += 48) {
                p.vertex(x, y + pass * 3 + p.random(-6, 6));
              }
              p.endShape();
            }
          }

          for (let i = 0; i < Math.floor(p.width / 13); i += 1) {
            const x = p.random(0, p.width);
            const y1 = p.random(-20, p.height * 0.72);
            const y2 = y1 + p.random(p.height * 0.1, p.height * 0.45);
            p.stroke(242, 249, 250, p.random(15, 40));
            p.strokeWeight(p.random(3, 9));
            p.line(x, y1, x + p.random(-3, 3), y2);
          }

          p.noStroke();
          const dots = Math.max(700, Math.floor((p.width * p.height) / 320));
          for (let i = 0; i < dots; i += 1) {
            const isLight = Math.random() > 0.45;
            if (isLight) {
              p.fill(248, 252, 252, p.random(10, 24));
            } else {
              p.fill(189, 213, 214, p.random(8, 20));
            }
            p.circle(p.random(0, p.width), p.random(0, p.height), p.random(1, 2.8));
          }
        };

        p.setup = () => {
          const width = crayonRoot.clientWidth || window.innerWidth;
          const height = crayonRoot.clientHeight || window.innerHeight;
          p.pixelDensity(1);
          const canvas = p.createCanvas(width, height);
          canvas.parent(crayonRoot);
          drawCrayonLayer();
          p.noLoop();
        };

        p.windowResized = () => {
          const width = crayonRoot.clientWidth || window.innerWidth;
          const height = crayonRoot.clientHeight || window.innerHeight;
          p.resizeCanvas(width, height);
          drawCrayonLayer();
          drawPencilLayer();
        };
      };

      p5Instance = new P5(sketch, crayonRoot);
      drawPencilLayer();

      const onResize = () => {
        drawPencilLayer();
      };

      window.addEventListener("resize", onResize);
      removeResize = () => {
        window.removeEventListener("resize", onResize);
      };
    };

    void initialize();

    return () => {
      disposed = true;
      removeResize?.();
      p5Instance?.remove();
    };
  }, []);

  return (
    <div className="wf-texture-layer" aria-hidden>
      <div ref={crayonRootRef} className="wf-texture-crayon" />
      <canvas ref={pencilCanvasRef} className="wf-texture-pencil" />
    </div>
  );
}
