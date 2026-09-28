"use client";

import type { SVGProps } from "react";
import { useHoverTimeline } from "@/hooks/useHoverTimeline";

interface IconProps extends SVGProps<SVGSVGElement> {
    size?: number | string;
}

// You've got mail: the flag spins all the way round on its hinge and the
// box settles a little.
export const MailboxIcon = ({ size = 24, ...props }: IconProps) => {
    const ref = useHoverTimeline((tl, q) => {
        tl.to(q(".mb-flag"), { rotation: 360, transformOrigin: "12% 100%", duration: 0.3, ease: "none" }, 0)
            .to(q(".mb-door"), { x: 0.04, y: 0.74, duration: 0.5, ease: "power2.out" }, 0)
            .to(q(".mb-front"), { x: 0.52, y: 0.52, duration: 0.5, ease: "power2.out" }, 0);
    });

    return (
        <svg ref={ref} width={size} height={size} viewBox="0 0 24 24" fill="currentColor" overflow="visible" aria-hidden {...props}>
            <path d="M 9.5 20 V 22 C 9.5 22.414 9.836 22.75 10.25 22.75 C 10.664 22.75 11 22.414 11 22 V 20 H 9.5 Z" />
            <path d="M 15 20 H 13.5 V 22 C 13.5 22.414 13.836 22.75 14.25 22.75 C 14.664 22.75 15 22.414 15 22 V 20 Z" />
            <path
                className="mb-flag"
                fillRule="evenodd"
                clipRule="evenodd"
                d="M 17.385 6.585 L 17.641 6.533 C 18.056 6.45 18.486 6.49 18.881 6.648 C 19.572 6.925 20.327 6.976 21.046 6.796 L 21.107 6.781 C 21.631 6.65 22 6.163 22 5.603 V 3.473 C 22 2.735 21.336 2.191 20.645 2.364 C 20.249 2.463 19.833 2.435 19.452 2.283 L 19.379 2.253 C 18.742 1.998 18.049 1.934 17.379 2.068 L 16.93 2.158 C 16.39 2.266 16 2.757 16 3.328 V 10.281 C 16 10.678 16.31 11 16.692 11 C 17.075 11 17.385 10.678 17.385 10.281 V 6.585 Z"
            />
            <path
                className="mb-door"
                d="M 14.5 6 V 10.281 C 14.5 11.452 15.428 12.5 16.692 12.5 C 17.957 12.5 18.885 11.452 18.885 10.281 V 8.228 C 19.645 8.433 20.445 8.457 21.22 8.295 C 21.712 9.137 22 10.154 22 11.25 V 17.425 C 22 18.847 21.012 20 19.793 20 H 12.5 V 11.25 C 12.5 9.22 11.668 7.276 10.283 6 H 14.5 Z"
            />
            <path
                className="mb-front"
                fillRule="evenodd"
                clipRule="evenodd"
                d="M 2 11.25 C 2 8.351 4.015 6 6.5 6 C 8.985 6 11 8.351 11 11.25 V 20 H 4.233 C 3 20 2 18.834 2 17.395 V 11.25 Z M 4.25 16 C 4.25 15.586 4.586 15.25 5 15.25 H 8 C 8.414 15.25 8.75 15.586 8.75 16 C 8.75 16.414 8.414 16.75 8 16.75 H 5 C 4.586 16.75 4.25 16.414 4.25 16 Z"
            />
        </svg>
    );
};
