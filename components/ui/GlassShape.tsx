"use client";

import { useCallback, useId } from "react";
import { useLiquidGlass } from "@/hooks/useLiquidGlass";
import type { CursorShape } from "@/lib/cursorShapes";
import styles from "./GlassShape.module.css";

/** Room around the drawing for the rim and the shadow */
const PAD = 8;

/**
 * One pane of clear liquid glass cut to a drawing, placed so its hotspot
 * sits on its parent's origin: a white rim just outside the outline, a soft
 * shadow below (cut away under the glass, where it would read as a tint),
 * and the drawing's inner lines on top.
 */
export default function GlassShape({ shape }: { shape: CursorShape }) {
    const id = useId().replace(/[^a-zA-Z0-9]/g, "");
    const outline = useCallback(() => new Path2D(shape.d), [shape.d]);
    const { ref, filter } = useLiquidGlass<HTMLDivElement>({
        strength: 18,
        bezel: 5,
        dispersion: 0.08,
        blur: 0,
        saturate: 1.2,
        shape: outline,
    });
    const { d, width: w, height: h, hot, detail } = shape;
    const outside = `url(#${id}out)`;

    return (
        <div className={styles.shape} style={{ left: -hot.x, top: -hot.y, width: w, height: h }}>
            <svg className={styles.layer} viewBox={`0 0 ${w} ${h}`}>
                <defs>
                    <filter id={`${id}blur`} x="-40%" y="-40%" width="180%" height="180%">
                        <feGaussianBlur stdDeviation="1.6" />
                    </filter>
                    {/* everything but the drawing itself */}
                    <mask id={`${id}out`} maskUnits="userSpaceOnUse" x={-PAD} y={-PAD} width={w + 2 * PAD} height={h + 2 * PAD}>
                        <rect x={-PAD} y={-PAD} width={w + 2 * PAD} height={h + 2 * PAD} fill="#fff" />
                        <path d={d} fill="#000" />
                    </mask>
                </defs>
                <g mask={outside} opacity="0.4">
                    <path d={d} transform="translate(0.5 2.5)" filter={`url(#${id}blur)`} />
                </g>
            </svg>
            <div ref={ref} className={styles.glass} style={{ clipPath: `path("${d}")` }}>
                {filter}
            </div>
            <div className={styles.tint} style={{ clipPath: `path("${d}")` }} />
            <svg className={`${styles.layer} ${styles.rim}`} viewBox={`0 0 ${w} ${h}`}>
                <g mask={outside}>
                    <path d={d} fill="none" stroke="#fff5f5" strokeWidth="2.4" strokeLinejoin="round" />
                </g>
                {detail && <path d={detail} fill="none" stroke="#fff5f5" strokeWidth="0.9" strokeLinecap="round" opacity="0.9" />}
            </svg>
        </div>
    );
}
