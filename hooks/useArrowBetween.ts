"use client";

import { useEffect, type RefObject } from "react";
import { arrowTransform, type Point } from "@/lib/arrowTransform";

interface ArrowBetween {
    /** the box every copy of the arrow is laid out in: gets --arrow and --arrow-shown */
    frame: RefObject<HTMLElement | null>;
    /** the arrow leaves from just under this */
    note: RefObject<HTMLElement | null>;
    /** holds the svg the arrow points into */
    target: RefObject<HTMLElement | null>;
    /** the drawing's own tail and tip, in px of its box */
    tail: Point;
    tip: Point;
}

/**
 * Lays an arrow drawing from a note to a spot on an svg, both live. Where
 * exactly is CSS's call, read from custom properties on the note: --tail-x
 * (0-1 across it), --tail-y (px below it), --aim-x / --aim-y (the svg's own
 * units), --aim-gap (px short of the spot) and --mirror (0 or 1).
 */
export function useArrowBetween({ frame, note, target, tail, tip }: ArrowBetween) {
    // A passive effect: the frame is this component's parent, and its ref only
    // lands after every child's layout effect has run
    useEffect(() => {
        const f = frame.current;
        const n = note.current;
        const box = target.current;
        if (!f || !n || !box) return;

        let raf = 0;
        const place = () => {
            const m = box.querySelector("svg")?.getScreenCTM();
            if (!m) return;
            const css = getComputedStyle(n);
            const num = (name: string, fallback: number) => {
                const v = parseFloat(css.getPropertyValue(name));
                return Number.isFinite(v) ? v : fallback;
            };
            // The note's layout box, so its tilt and pop don't move the tail
            const from = {
                x: n.offsetLeft + n.offsetWidth * num("--tail-x", 0.5),
                y: n.offsetTop + n.offsetHeight + num("--tail-y", 8),
            };
            const fr = f.getBoundingClientRect();
            const spot = new DOMPoint(num("--aim-x", 0), num("--aim-y", 0)).matrixTransform(m);
            const dx = spot.x - fr.left - from.x;
            const dy = spot.y - fr.top - from.y;
            const short = 1 - num("--aim-gap", 6) / (Math.hypot(dx, dy) || 1);
            const to = { x: from.x + dx * short, y: from.y + dy * short };
            f.style.setProperty("--arrow", arrowTransform(tail, tip, from, to, num("--mirror", 0) > 0));
            f.style.setProperty("--arrow-shown", "1");
        };
        const schedule = () => {
            cancelAnimationFrame(raf);
            raf = requestAnimationFrame(place);
        };

        place();
        const ro = new ResizeObserver(schedule);
        ro.observe(f);
        ro.observe(n);
        window.addEventListener("resize", schedule);
        return () => {
            cancelAnimationFrame(raf);
            ro.disconnect();
            window.removeEventListener("resize", schedule);
        };
    }, [frame, note, target, tail, tip]);
}
