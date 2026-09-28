"use client";

import type { SVGProps } from "react";
import { gsap } from "@/lib/gsap";
import { useHoverTimeline } from "@/hooks/useHoverTimeline";

interface IconProps extends SVGProps<SVGSVGElement> {
    size?: number | string;
}

// The lens is an eye: it watches the pointer and blinks every couple of
// seconds, and pops when you hover. The flash dot never sits still.
export const InstagramIcon = ({ size = 24, ...props }: IconProps) => {
    const ref = useHoverTimeline(
        (tl, q) => {
            tl.to(q(".ig-lens"), { scale: 1.3, transformOrigin: "50% 50%", duration: 0.13, ease: "none" });
        },
        (q) => {
            const eye = q(".ig-eye");
            gsap.set(eye, { transformOrigin: "50% 50%" });
            gsap.timeline({ repeat: -1, repeatDelay: 2 }).to(eye, { scaleY: 0.1, duration: 0.075, yoyo: true, repeat: 1, ease: "sine.inOut" });
            gsap.to(q(".ig-flash"), { x: "random(-1.2, 1.2)", y: "random(-1.2, 1.2)", duration: 0.4, ease: "sine.inOut", repeat: -1, repeatRefresh: true });

            const xTo = gsap.quickTo(eye, "x", { duration: 0.5, ease: "power3.out" });
            const yTo = gsap.quickTo(eye, "y", { duration: 0.5, ease: "power3.out" });
            const look = (e: PointerEvent) => {
                xTo((e.clientX / window.innerWidth - 0.5) * 2);
                yTo((e.clientY / window.innerHeight - 0.5) * 2);
            };
            window.addEventListener("pointermove", look);
            return () => window.removeEventListener("pointermove", look);
        },
    );

    return (
        <svg ref={ref} width={size} height={size} viewBox="0 0 24 24" fill="currentColor" overflow="visible" aria-hidden {...props}>
            <g className="ig-eye">
                <path
                    className="ig-lens"
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M 12 18 C 15.314 18 18 15.314 18 12 C 18 8.686 15.314 6 12 6 C 8.686 6 6 8.686 6 12 C 6 15.314 8.686 18 12 18 Z M 12 16 C 14.209 16 16 14.209 16 12 C 16 9.791 14.209 8 12 8 C 9.791 8 8 9.791 8 12 C 8 14.209 9.791 16 12 16 Z"
                />
            </g>
            <path className="ig-flash" d="M 18 5 C 17.448 5 17 5.448 17 6 C 17 6.552 17.448 7 18 7 C 18.552 7 19 6.552 19 6 C 19 5.448 18.552 5 18 5 Z" />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M 1.654 4.276 C 1 5.56 1 7.24 1 10.6 V 13.4 C 1 16.76 1 18.441 1.654 19.724 C 2.229 20.853 3.147 21.771 4.276 22.346 C 5.56 23 7.24 23 10.6 23 H 13.4 C 16.76 23 18.441 23 19.724 22.346 C 20.853 21.771 21.771 20.853 22.346 19.724 C 23 18.441 23 16.76 23 13.4 V 10.6 C 23 7.24 23 5.56 22.346 4.276 C 21.771 3.147 20.853 2.229 19.724 1.654 C 18.441 1 16.76 1 13.4 1 H 10.6 C 7.24 1 5.56 1 4.276 1.654 C 3.147 2.229 2.229 3.147 1.654 4.276 Z M 13.4 3 H 10.6 C 8.887 3 7.722 3.002 6.822 3.075 C 5.945 3.147 5.497 3.277 5.184 3.436 C 4.431 3.819 3.819 4.431 3.436 5.184 C 3.277 5.497 3.147 5.945 3.075 6.822 C 3.002 7.722 3 8.887 3 10.6 V 13.4 C 3 15.113 3.002 16.278 3.075 17.178 C 3.147 18.055 3.277 18.503 3.436 18.816 C 3.819 19.569 4.431 20.18 5.184 20.564 C 5.497 20.723 5.945 20.853 6.822 20.925 C 7.722 20.998 8.887 21 10.6 21 H 13.4 C 15.113 21 16.278 20.998 17.178 20.925 C 18.055 20.853 18.503 20.723 18.816 20.564 C 19.569 20.18 20.18 19.569 20.564 18.816 C 20.723 18.503 20.853 18.055 20.925 17.178 C 20.998 16.278 21 15.113 21 13.4 V 10.6 C 21 8.887 20.998 7.722 20.925 6.822 C 20.853 5.945 20.723 5.497 20.564 5.184 C 20.18 4.431 19.569 3.819 18.816 3.436 C 18.503 3.277 18.055 3.147 17.178 3.075 C 16.278 3.002 15.113 3 13.4 3 Z"
            />
        </svg>
    );
};
