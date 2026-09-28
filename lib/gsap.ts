/**
 * The one place GSAP gets its plugins. Components import gsap (and friends)
 * from here, so every plugin is registered exactly once before it's used.
 */

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";
import { Flip } from "gsap/Flip";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
    gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText, DrawSVGPlugin, MorphSVGPlugin, Flip, ScrambleTextPlugin);
}

/** House eases: long, soft landings everywhere */
export const EASE = {
    out: "expo.out",
    inOut: "expo.inOut",
    soft: "power3.out",
} as const;

/** Media queries for gsap.matchMedia(), so every component asks the same way */
export const MOTION = {
    ok: "(prefers-reduced-motion: no-preference)",
    reduce: "(prefers-reduced-motion: reduce)",
} as const;

/** Resolves once web fonts are in, so letter splits measure the real glyphs */
export function fontsReady(): Promise<unknown> {
    return typeof document !== "undefined" && document.fonts ? document.fonts.ready : Promise.resolve();
}

export { gsap, ScrollTrigger, SplitText, Flip, useGSAP };
