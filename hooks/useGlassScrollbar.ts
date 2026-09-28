"use client";

import type { RefObject } from "react";
import { gsap, useGSAP, MOTION } from "@/lib/gsap";

interface GlassScrollbarRig {
    /** the strip down the right edge: a click on it jumps there */
    track: RefObject<HTMLElement | null>;
    /** the thumb inside it, dragged to scroll */
    thumb: RefObject<HTMLElement | null>;
}

/** The thumb never gets shorter than this, in px */
const MIN_THUMB = 44;
/** How long it stays after the page stops moving, in ms */
const LINGER = 1100;

/**
 * Drives a drawn scrollbar for the page (mouse and trackpad only: touch keeps
 * its own). The page still scrolls natively; this shows where you are and
 * lets you drag or click to move. It wakes while the page moves or the pointer
 * comes near (data-awake), stretches with the speed, and announces its drag as
 * stew:grab / stew:release, so the glass cursor turns into a fist.
 */
export function useGlassScrollbar({ track, thumb }: GlassScrollbarRig) {
    useGSAP(() => {
        const bar = track.current;
        const knob = thumb.current;
        if (!bar || !knob) return;

        const conditions = { fine: "(hover: hover) and (pointer: fine)", reduce: MOTION.reduce };
        gsap.matchMedia().add(conditions, (ctx) => {
            const { fine, reduce } = ctx.conditions ?? {};
            const html = document.documentElement;
            if (!fine) {
                html.classList.remove("glass-scrollbar");
                return;
            }
            html.classList.add("glass-scrollbar");
            const page = document.scrollingElement ?? html;
            const setY = gsap.quickSetter(knob, "y", "px");
            const stretchTo = reduce ? null : gsap.quickTo(knob, "scaleY", { duration: 0.3, ease: "power3.out" });

            let span = 0; // how far the page scrolls
            let size = 0; // the thumb's length
            let travel = 0; // how far the thumb moves
            let dragging = false;
            let hovering = false;
            let grabAt = 0;
            let sleep = 0;
            let settle = 0;
            let last = { y: window.scrollY, t: performance.now() };

            const place = () => setY(span > 0 ? (window.scrollY / span) * travel : 0);
            const measure = () => {
                const view = window.innerHeight;
                span = page.scrollHeight - view;
                size = span > 0 ? Math.max(MIN_THUMB, (bar.clientHeight * view) / page.scrollHeight) : 0;
                travel = bar.clientHeight - size;
                knob.style.height = `${size}px`;
                bar.toggleAttribute("data-scrollable", span > 0);
                place();
            };
            const wake = () => {
                bar.toggleAttribute("data-awake", true);
                window.clearTimeout(sleep);
                sleep = window.setTimeout(() => {
                    if (!dragging && !hovering) bar.removeAttribute("data-awake");
                }, LINGER);
            };

            // The faster the page goes, the longer the thumb; it eases back when it stops
            const onScroll = () => {
                place();
                wake();
                if (!stretchTo) return;
                const now = performance.now();
                const speed = Math.abs(window.scrollY - last.y) / Math.max(now - last.t, 1);
                last = { y: window.scrollY, t: now };
                stretchTo(1 + Math.min(speed * 0.08, 0.3));
                window.clearTimeout(settle);
                settle = window.setTimeout(() => stretchTo(1), 120);
            };

            const scrollToPointer = (clientY: number, behavior: ScrollBehavior) => {
                const progress = gsap.utils.clamp(0, 1, (clientY - bar.getBoundingClientRect().top - grabAt) / (travel || 1));
                window.scrollTo({ top: progress * span, behavior });
            };
            const down = (e: PointerEvent) => {
                if (e.button !== 0 || span <= 0) return;
                e.preventDefault();
                if (!knob.contains(e.target as Node)) {
                    // A click on the strip: bring the thumb's middle there
                    grabAt = size / 2;
                    scrollToPointer(e.clientY, "smooth");
                    return;
                }
                grabAt = e.clientY - knob.getBoundingClientRect().top;
                dragging = true;
                bar.toggleAttribute("data-dragging", true);
                bar.setPointerCapture(e.pointerId);
                knob.dispatchEvent(new CustomEvent("stew:grab", { bubbles: true }));
            };
            const drag = (e: PointerEvent) => {
                if (dragging) scrollToPointer(e.clientY, "instant");
            };
            const drop = () => {
                if (!dragging) return;
                dragging = false;
                bar.removeAttribute("data-dragging");
                knob.dispatchEvent(new CustomEvent("stew:release", { bubbles: true }));
                wake();
            };
            const enter = () => {
                hovering = true;
                wake();
            };
            const leave = () => {
                hovering = false;
                wake();
            };

            measure();
            const ro = new ResizeObserver(measure);
            ro.observe(document.body);
            ro.observe(bar);
            window.addEventListener("resize", measure);
            window.addEventListener("scroll", onScroll, { passive: true });
            bar.addEventListener("pointerdown", down);
            bar.addEventListener("pointermove", drag);
            bar.addEventListener("pointerup", drop);
            bar.addEventListener("pointercancel", drop);
            bar.addEventListener("pointerenter", enter);
            bar.addEventListener("pointerleave", leave);
            return () => {
                ro.disconnect();
                window.removeEventListener("resize", measure);
                window.removeEventListener("scroll", onScroll);
                bar.removeEventListener("pointerdown", down);
                bar.removeEventListener("pointermove", drag);
                bar.removeEventListener("pointerup", drop);
                bar.removeEventListener("pointercancel", drop);
                bar.removeEventListener("pointerenter", enter);
                bar.removeEventListener("pointerleave", leave);
                window.clearTimeout(sleep);
                window.clearTimeout(settle);
                html.classList.remove("glass-scrollbar");
            };
        });
    });
}
