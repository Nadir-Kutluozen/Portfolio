"use client";

import { useEffect, useRef } from "react";

export default function DistortBackground({ inside = false }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current!;
        const ctx = canvas.getContext("2d")!;

        function resize() {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        }
        resize();
        window.addEventListener("resize", resize);

        let t = 0;

        function animate() {
            t += 0.03; // speed

            const w = canvas.width;
            const h = canvas.height;
            ctx.clearRect(0, 0, w, h);

            // Fire-like distortion
            const wobbleX = Math.sin(t * 1.8) * 40;
            const wobbleY = Math.cos(t * 1.2) * 30;

            // Fast pulse (scale change)
            const pulse = 0.9 + Math.sin(t * 4) * 0.1;

            const cx = w * 0.5 + wobbleX;
            const cy = h * 0.5 + wobbleY;
            const radius = Math.max(w, h) * 0.45 * pulse;

            const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
            g.addColorStop(0, "#b200ff");
            g.addColorStop(0.3, "#8a00f0");
            g.addColorStop(0.6, "#4200a7");
            g.addColorStop(1, "#07000d");

            ctx.fillStyle = g;
            ctx.fillRect(0, 0, w, h);

            requestAnimationFrame(animate);
        }

        animate();
        return () => window.removeEventListener("resize", resize);
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fire-pulse-blob"
            style={{
                position: inside ? "absolute" : "fixed",
                inset: inside ? undefined : 0,
                width: inside ? "100%" : "100vw",
                height: inside ? "100%" : "100vh",
                zIndex: inside ? 0 : -1,
                filter: "blur(40px)",
            }}
        />
    );
}
