"use client";

import type { SVGProps } from "react";
import { useHoverTimeline } from "@/hooks/useHoverTimeline";

interface IconProps extends SVGProps<SVGSVGElement> {
    size?: number | string;
}

// On hover the outline un-draws and draws itself back while the dot does a
// full loop around the corner.
export const LinkedinIcon = ({ size = 24, ...props }: IconProps) => {
    const ref = useHoverTimeline((tl, q) => {
        const lines = q(".li-line");
        tl.fromTo(lines, { drawSVG: "100%" }, { drawSVG: "0%", duration: 0.53, ease: "power1.out" }, 0)
            .to(lines, { drawSVG: "100%", duration: 0.47, ease: "none" })
            .to(q(".li-dot"), { rotation: 360, transformOrigin: "87% 119%", duration: 0.52, ease: "none" }, 0);
    });

    return (
        <svg ref={ref} width={size} height={size} viewBox="0 0 32 32" fill="none" overflow="visible" aria-hidden {...props}>
            <g stroke="currentColor" strokeWidth={2}>
                <path className="li-line" d="M 23 31 H 9 C 4.6 31 1 27.4 1 23 V 9 C 1 4.6 4.6 1 9 1 H 23 C 27.4 1 31 4.6 31 9 V 23 C 31 27.4 27.4 31 23 31 Z" />
                <rect className="li-line" x="7" y="13" width="4" height="12" />
                <path className="li-line" d="M 20.5 13 C 19.6 13 18.7 13.3 18 13.8 V 13 H 14 V 25 H 16 H 18 V 18.5 C 18 17.7 18.7 17 19.5 17 S 21 17.7 21 18.5 V 25 H 25 V 17.5 C 25 15 23 13 20.5 13 Z" />
                <circle className="li-dot" cx="9" cy="8" r="2" />
            </g>
        </svg>
    );
};
