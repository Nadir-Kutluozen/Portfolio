"use client";

import { useRef } from "react";
import { gsap, useGSAP, MOTION } from "@/lib/gsap";

type Selector = (selector: string) => Element[];

/**
 * For the little animated icons: builds a paused GSAP timeline, plays it on
 * hover and rewinds it on leave. Hover is read from the nearest ancestor
 * marked [data-hover-root] (a whole card or link), or the svg itself.
 * `setup` can also start ambient loops; return a cleanup if it adds listeners.
 */
export function useHoverTimeline(
    build: (tl: gsap.core.Timeline, q: Selector) => void,
    setup?: (q: Selector, svg: SVGSVGElement) => void | (() => void),
) {
    const ref = useRef<SVGSVGElement>(null);

    useGSAP(() => {
        const svg = ref.current;
        if (!svg) return;
        const q = gsap.utils.selector(svg);

        gsap.matchMedia().add(MOTION.ok, () => {
            const tl = gsap.timeline({ paused: true });
            build(tl, q);
            const target = svg.closest("[data-hover-root]") ?? svg;
            const enter = () => tl.timeScale(1).restart();
            const leave = () => tl.timeScale(1.6).reverse();
            target.addEventListener("pointerenter", enter);
            target.addEventListener("pointerleave", leave);
            const undoSetup = setup?.(q, svg);

            return () => {
                target.removeEventListener("pointerenter", enter);
                target.removeEventListener("pointerleave", leave);
                undoSetup?.();
            };
        });
    }, { scope: ref });

    return ref;
}
