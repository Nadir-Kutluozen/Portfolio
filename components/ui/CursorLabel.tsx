"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { useLiquidGlass } from "@/hooks/useLiquidGlass";
import styles from "./CursorLabel.module.css";

/**
 * A small liquid glass lens that trails the pointer over anything marked
 * data-cursor="View", bending the picture under it. Mouse and trackpad
 * only, never on touch.
 */
export default function CursorLabel() {
    const { ref: root, filter } = useLiquidGlass<HTMLDivElement>({ strength: 52, bezel: 26 });
    const text = useRef<HTMLSpanElement>(null);

    useGSAP(() => {
        const el = root.current;
        if (!el || !text.current) return;

        gsap.matchMedia().add("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
            gsap.set(el, { xPercent: -50, yPercent: -50, scale: 0, autoAlpha: 0 });
            const xTo = gsap.quickTo(el, "x", { duration: 0.45, ease: "power3.out" });
            const yTo = gsap.quickTo(el, "y", { duration: 0.45, ease: "power3.out" });
            let active: Element | null = null;

            const show = (target: Element | null) => {
                if (target === active) return;
                active = target;
                // the glass arrow (GlassCursor) steps aside while the lens is the cursor
                document.documentElement.toggleAttribute("data-cursor-lens", !!target);
                if (target) {
                    text.current!.textContent = target.getAttribute("data-cursor");
                    gsap.to(el, { scale: 1, autoAlpha: 1, duration: 0.35, ease: "back.out(2)", overwrite: "auto" });
                } else {
                    gsap.to(el, { scale: 0, autoAlpha: 0, duration: 0.2, ease: "power2.in", overwrite: "auto" });
                }
            };
            const move = (e: PointerEvent) => {
                xTo(e.clientX);
                yTo(e.clientY);
                show((e.target as Element | null)?.closest("[data-cursor]") ?? null);
            };
            const hide = () => show(null);

            window.addEventListener("pointermove", move);
            window.addEventListener("scroll", hide, { passive: true });
            document.documentElement.addEventListener("pointerleave", hide);
            return () => {
                window.removeEventListener("pointermove", move);
                window.removeEventListener("scroll", hide);
                document.documentElement.removeEventListener("pointerleave", hide);
                document.documentElement.removeAttribute("data-cursor-lens");
            };
        });
    });

    return (
        <div ref={root} className={`liquid-glass ${styles.cursor}`} aria-hidden>
            {filter}
            <span ref={text} />
        </div>
    );
}
