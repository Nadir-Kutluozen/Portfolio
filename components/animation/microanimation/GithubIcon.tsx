"use client";

import type { SVGProps } from "react";
import { useHoverTimeline } from "@/hooks/useHoverTimeline";

// The cat's head folds its ears in, then the tail flicks: the same keyframes
// as the original Bandit export, now on GSAP.
const HEAD_ALT =
    "M 16 22.027 V 19.157 C 16.038 18.68 15.973 18.201 15.811 17.751 C 15.649 17.301 15.393 16.89 15.06 16.547 C 18.2 16.197 21.5 15.007 21.5 9.547 C 21.5 8.151 20.963 6.808 20 5.797 C 20.456 4.575 20.424 3.225 16.16 6.61 C 15.28 7.25 18.73 1.677 16 3.507 C 13.708 2.886 11.292 2.886 9 3.507 C 6.27 1.677 11.76 6.85 8.56 5.97 C 6.08 6.05 4.544 4.575 4.72 5.81 C 4.03 6.815 3.493 8.17 3.5 9.577 C 3.5 14.997 6.8 16.187 9.94 16.577 C 9.611 16.917 9.357 17.322 9.195 17.767 C 9.033 18.211 8.967 18.685 9 19.157 V 22.027";
const TAIL_KEYS = [
    { d: "M 9 20.027 C 6 21 3.5 20.027 2.08 23.97", duration: 0.195 },
    { d: "M 9 20.027 C 6 21 3.5 20.027 2.48 15.97", duration: 0.053 },
    { d: "M 9 20.027 C 6 21 3.5 20.027 2.16 18.77", duration: 0.055 },
    { d: "M 9 20.027 C 6 21 3.5 20.027 2.48 17.65", duration: 0.017 },
];

interface IconProps extends SVGProps<SVGSVGElement> {
    size?: number | string;
}

export const GithubIcon = ({ size = 24, ...props }: IconProps) => {
    const ref = useHoverTimeline((tl, q) => {
        tl.to(q(".gh-head"), { morphSVG: HEAD_ALT, duration: 0.124, ease: "none" }, 0);
        TAIL_KEYS.forEach(({ d, duration }) => tl.to(q(".gh-tail"), { morphSVG: d, duration, ease: "none" }));
    });

    return (
        <svg ref={ref} width={size} height={size} viewBox="0 0 24 24" fill="none" overflow="visible" aria-hidden {...props}>
            <g stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <path
                    className="gh-head"
                    d="M 16 22.027 V 19.157 C 16.038 18.68 15.973 18.201 15.811 17.751 C 15.649 17.301 15.393 16.89 15.06 16.547 C 18.2 16.197 21.5 15.007 21.5 9.547 C 21.5 8.151 20.963 6.808 20 5.797 C 20.456 4.575 20.424 3.225 19.91 2.027 C 19.91 2.027 18.73 1.677 16 3.507 C 13.708 2.886 11.292 2.886 9 3.507 C 6.27 1.677 5.09 2.027 5.09 2.027 C 4.576 3.225 4.544 4.575 5 5.797 C 4.03 6.815 3.493 8.17 3.5 9.577 C 3.5 14.997 6.8 16.187 9.94 16.577 C 9.611 16.917 9.357 17.322 9.195 17.767 C 9.033 18.211 8.967 18.685 9 19.157 V 22.027"
                />
                <path className="gh-tail" d="M 9 20.027 C 6 21 3.5 20.027 2 17.027" />
            </g>
        </svg>
    );
};
