"use client";

import type { SVGProps } from "react";
import { gsap } from "@/lib/gsap";
import { useHoverTimeline } from "@/hooks/useHoverTimeline";

// Hover: the ears perk up. Always: the eyes follow the pointer around.
const FACE_PERKED =
    "M 15.8 52.1 C 9 47.7 6.3 30.6 8.5 22.9 C 10.1 17.1 16.3 8.6 27.192 18.536 C 26.6 4.5 37.4 4.5 37.457 18.536 C 47.6 8.6 53.8 17.1 55.4 22.9 C 57.6 30.7 55.9 47.7 49.2 52.1 C 35 61.3 30 61.3 15.8 52.1";
const EYE_REACH = 10; // how far the eyes wander, in viewBox units

interface DogfaceProps extends SVGProps<SVGSVGElement> {
    size?: number | string;
}

export const Dogface = ({ size = 212, ...props }: DogfaceProps) => {
    const ref = useHoverTimeline(
        (tl, q) => {
            tl.to(q(".dog-face"), { morphSVG: FACE_PERKED, duration: 0.5, ease: "power2.out" });
        },
        (q) => {
            const eyes = q(".dog-eye").map((eye) => ({
                x: gsap.quickTo(eye, "x", { duration: 0.8, ease: "power3.out" }),
                y: gsap.quickTo(eye, "y", { duration: 0.8, ease: "power3.out" }),
            }));
            const look = (e: PointerEvent) => {
                const x = (e.clientX / window.innerWidth - 0.5) * 2 * EYE_REACH;
                const y = (e.clientY / window.innerHeight - 0.5) * 2 * EYE_REACH;
                eyes.forEach((eye) => {
                    eye.x(x);
                    eye.y(y);
                });
            };
            window.addEventListener("pointermove", look);
            return () => window.removeEventListener("pointermove", look);
        },
    );

    return (
        <svg ref={ref} width={size} height={size} viewBox="0 0 64 64" overflow="visible" aria-hidden {...props}>
            <path className="dog-face" d="M 15.8 52.1 C 9 47.7 6.3 30.6 8.5 22.9 C 10.1 17.1 16.3 8.6 21.9 6.4 C 26.6 4.5 37.4 4.5 42 6.4 C 47.6 8.6 53.8 17.1 55.4 22.9 C 57.6 30.7 55.9 47.7 49.2 52.1 C 35 61.3 30 61.3 15.8 52.1" fill="#f5d1ac" />
            <path d="M 5.1 24.7 C 8.7 32.6 9.6 32.9 13 23.5 C 14.8 18.5 13.5 15.5 15.7 12.3 C 16.9 10.5 19.6 7.5 19.6 7.5 S -1.7 9.7 5.1 24.7" fill="#423223" />
            <path d="M 14.2 7.2 C 8.8 10.7 -2.7 9.3 4.1 24.2 C 7.7 32.1 8.6 32.4 12 23 C 13.8 18 12.5 15 14.7 11.8 C 15.9 10 19.6 7.5 19.6 7.5 S 17.9 4.8 14.2 7.2" fill="#947151" />
            <path d="M 58.9 24.6 C 55.3 32.5 54.4 32.8 51 23.4 C 49.2 18.4 50.5 15.4 48.3 12.2 C 47.1 10.4 44.4 7.4 44.4 7.4 S 65.7 9.7 58.9 24.6" fill="#423223" />
            <path d="M 49.8 7.2 C 55.2 10.7 66.7 9.3 59.9 24.2 C 56.3 32.1 55.4 32.4 52 23 C 50.2 18 51.5 15 49.3 11.8 C 48.1 10 44.4 7.5 44.4 7.5 S 46.1 4.8 49.8 7.2" fill="#947151" />
            <circle className="dog-eye" cx="17.7" cy="30.7" r="6" fill="#ffffff" />
            <circle className="dog-eye" cx="16.2" cy="30.7" r="4.5" fill="#3e4347" />
            <circle className="dog-eye" cx="46.3" cy="30.7" r="6" fill="#ffffff" />
            <circle className="dog-eye" cx="47.8" cy="30.7" r="4.5" fill="#3e4347" />
            <path d="M 21.7 48.8 L 26.3 53.7 C 29.1 56.6 34.8 56.6 37.6 53.7 L 42.3 48.8 L 37.5 43.8 H 26.5 43.8 L 21.7 48.8" fill="#7d644b" />
            <path d="M 32 39.6 S 27.1 46.6 27.7 49.9 C 28.5 54.7 35.4 54.7 36.3 49.9 C 36.9 46.6 32 39.6 32 39.6" fill="#f15a61" />
            <path d="M 32 51.7 L 33.1 45 H 30.9 45 L 32 51.7" fill="#ba454b" />
            <path d="M 27 41.5 H 37 41.5 V 37 46.1 H 27 46.1 Z" fill="#423223" />
            <path d="M 47.8 42.6 L 40.7 35.1 C 36.4 30.6 27.6 30.6 23.3 35.1 L 16.2 42.6 C 14.2 44.7 14.2 48.2 16.2 50.3 C 18.2 52.4 21.5 52.4 23.5 50.3 L 30.6 42.8 C 31.3 42.1 32.6 42.1 33.3 42.8 L 40.4 50.3 C 42.4 52.4 45.7 52.4 47.7 50.3 C 49.9 48.2 49.9 44.7 47.8 42.6" fill="#947151" />
            <g fill="#3e4347">
                <path d="M 26.1 35.7 C 26.1 33.1 28.7 32.6 32 32.6 C 35.3 32.6 37.9 33.1 37.9 35.7 C 37.9 37.8 33.2 39.6 32 39.6 C 30.8 39.6 26.1 37.7 26.1 35.7" />
                <path d="M 23.31 39.012 L 24.299 38.02 L 25.29 39.009 L 24.301 40 Z" />
                <path d="M 20.947 41.811 L 21.936 40.82 L 22.926 41.809 L 21.938 42.799 Z" />
                <path d="M 24.125 42.763 L 25.114 41.772 L 26.105 42.76 L 25.117 43.752 Z" />
                <path d="M 38.703 38.988 L 39.695 38 L 40.683 38.991 L 39.692 39.98 Z" />
                <path d="M 41.128 41.762 L 42.12 40.773 L 43.108 41.764 L 42.117 42.753 Z" />
                <path d="M 37.947 42.811 L 38.938 41.823 L 39.927 42.813 L 38.936 43.803 Z" />
            </g>
        </svg>
    );
};
