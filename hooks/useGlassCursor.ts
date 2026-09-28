"use client";

import type { RefObject } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

interface GlassCursorRig {
    /** the cursor: a point kept on the pointer, holding [data-pivot] arrow / hand
     *  (turned here, popped in by CSS on their parents) and, inside the hand,
     *  [data-part] open / fist */
    root: RefObject<HTMLElement | null>;
    /** the arrow's tilt before it has anywhere to go */
    rest: number;
}

/** px of travel before the arrow turns, so a trembling hand doesn't wobble it */
const STEP = 6;
/** Where the system cursor stays: text fields, and anything marked data-native-cursor */
const NATIVE = "[data-native-cursor], input, textarea, select, [contenteditable]";
/** Where the arrow grows a little */
const PRESSABLE = "a, button, [role='button'], label, summary";
/** Where the arrow becomes a hand */
const GRABBABLE = "[data-cursor-grab]";

/**
 * Drives the glass cursor (mouse and trackpad only). It follows the pointer
 * and reports data-state (on / hover / off), data-pressed and data-mode:
 * "arrow" turns to face the way it's going; over anything data-cursor-grab
 * it's a "hand" that leans into the move; and when a Stew drag action
 * catches hold (stew:grab) it's a "fist" that squashes, stretches along the
 * pull, then springs open and shakes it out on stew:release (and spins
 * away on stew:throw).
 */
export function useGlassCursor({ root, rest }: GlassCursorRig) {
    useGSAP(() => {
        const el = root.current;
        const arrow = el?.querySelector<HTMLElement>('[data-pivot="arrow"]');
        const hand = el?.querySelector<HTMLElement>('[data-pivot="hand"]');
        const open = el?.querySelector<HTMLElement>('[data-part="open"]');
        const fist = el?.querySelector<HTMLElement>('[data-part="fist"]');
        if (!el || !arrow || !hand || !open || !fist) return;

        const conditions = { fine: "(hover: hover) and (pointer: fine)", reduce: "(prefers-reduced-motion: reduce)" };
        gsap.matchMedia().add(conditions, (ctx) => {
            const { fine, reduce } = ctx.conditions ?? {};
            if (!fine) return;
            const html = document.documentElement;
            html.classList.add("glass-cursor");
            gsap.set(arrow, { rotation: rest });
            const setX = gsap.quickSetter(el, "x", "px");
            const setY = gsap.quickSetter(el, "y", "px");
            const turnTo = reduce ? null : gsap.quickTo(arrow, "rotation", { duration: 0.35, ease: "power3.out" });
            const leanTo = reduce ? null : gsap.quickTo(hand, "rotation", { duration: 0.4, ease: "power3.out" });
            let heading = rest;
            let from: { x: number; y: number } | null = null;
            let last: { x: number; y: number; t: number } | null = null;
            let vx = 0;
            let vy = 0;
            let holding = false;
            let overGrab = false;
            let settle = 0;
            let untint = 0;

            const setMode = () => (el.dataset.mode = holding ? "fist" : overGrab ? "hand" : "arrow");

            // The arrow's tip leads: face the way the last few px went, the short way round
            const turn = (x: number, y: number) => {
                if (!turnTo) return;
                from ??= { x, y };
                const dx = x - from.x;
                const dy = y - from.y;
                if (dx * dx + dy * dy < STEP * STEP) return;
                const angle = (Math.atan2(dy, dx) * 180) / Math.PI + 90;
                heading += ((((angle - heading) % 360) + 540) % 360) - 180;
                turnTo(heading);
                from = { x, y };
            };

            // The hand leans into the move; a fist also stretches along the
            // pull, the faster the longer. Both ease back when the hand stops.
            const follow = (e: PointerEvent) => {
                if (last) {
                    const dt = Math.max(e.timeStamp - last.t, 1);
                    vx = vx * 0.5 + ((e.clientX - last.x) / dt) * 0.5;
                    vy = vy * 0.5 + ((e.clientY - last.y) / dt) * 0.5;
                }
                last = { x: e.clientX, y: e.clientY, t: e.timeStamp };
                if (reduce) return;
                leanTo?.(gsap.utils.clamp(-16, 16, vx * 14));
                if (holding) {
                    const s = 1 + Math.min(Math.hypot(vx, vy) * 0.3, 0.45);
                    const alongX = Math.abs(vx) > Math.abs(vy);
                    gsap.to(fist, {
                        scaleX: alongX ? s : 1 / Math.sqrt(s),
                        scaleY: alongX ? 1 / Math.sqrt(s) : s,
                        duration: 0.2,
                        ease: "power2.out",
                        overwrite: "auto",
                    });
                }
                window.clearTimeout(settle);
                settle = window.setTimeout(() => {
                    vx = vy = 0;
                    leanTo?.(0);
                    if (holding) gsap.to(fist, { scaleX: 1, scaleY: 1, duration: 0.35, ease: "power3.out", overwrite: "auto" });
                }, 90);
            };

            const move = (e: PointerEvent) => {
                if (e.pointerType !== "mouse") {
                    el.dataset.state = "off";
                    return;
                }
                setX(e.clientX);
                setY(e.clientY);
                turn(e.clientX, e.clientY);
                follow(e);
                const target = e.target as Element | null;
                overGrab = !!target?.closest(GRABBABLE);
                setMode();
                el.dataset.state = target?.closest(NATIVE) ? "off" : !overGrab && target?.closest(PRESSABLE) ? "hover" : "on";
            };
            const leave = () => (el.dataset.state = "off");
            const down = () => el.toggleAttribute("data-pressed", true);
            const up = () => el.toggleAttribute("data-pressed", false);

            // Stew drag actions announce stew:grab / stew:release / stew:throw
            const grab = () => {
                holding = true;
                window.clearTimeout(untint);
                el.toggleAttribute("data-tint", true);
                setMode();
                if (reduce) return;
                gsap.fromTo(fist,
                    { scaleX: 1.35, scaleY: 0.7, rotation: -12 },
                    { scaleX: 1, scaleY: 1, rotation: 0, duration: 0.5, ease: "elastic.out(1, 0.4)", overwrite: "auto" });
            };
            // Always show the letting go, even off the grabbable thing; the
            // next move puts the right cursor back
            const release = () => {
                holding = false;
                el.dataset.mode = "hand";
                window.clearTimeout(settle);
                // the wash stays through the letting go, then fades
                window.clearTimeout(untint);
                untint = window.setTimeout(() => el.removeAttribute("data-tint"), 420);
                gsap.set(fist, { scaleX: 1, scaleY: 1, rotation: 0 });
                if (reduce) return;
                gsap.fromTo(open, { scale: 0.7 }, { scale: 1, duration: 0.7, ease: "elastic.out(1.1, 0.35)", overwrite: "auto" });
                gsap.to(open, { keyframes: { rotation: [0, -18, 14, -8, 4, 0], easeEach: "sine.inOut" }, duration: 0.7 });
            };
            const fling = () => {
                if (reduce) return;
                gsap.fromTo(open, { rotation: 0 }, { rotation: 360, duration: 0.6, ease: "power3.out", overwrite: "auto" });
            };

            window.addEventListener("pointermove", move, { passive: true });
            window.addEventListener("pointerdown", down);
            window.addEventListener("pointerup", up);
            html.addEventListener("pointerleave", leave);
            window.addEventListener("stew:grab", grab);
            window.addEventListener("stew:release", release);
            window.addEventListener("stew:throw", fling);
            return () => {
                window.removeEventListener("pointermove", move);
                window.removeEventListener("pointerdown", down);
                window.removeEventListener("pointerup", up);
                html.removeEventListener("pointerleave", leave);
                window.removeEventListener("stew:grab", grab);
                window.removeEventListener("stew:release", release);
                window.removeEventListener("stew:throw", fling);
                window.clearTimeout(settle);
                window.clearTimeout(untint);
                el.removeAttribute("data-tint");
                html.classList.remove("glass-cursor");
                el.dataset.state = "off";
                el.dataset.mode = "arrow";
            };
        });
    });
}
