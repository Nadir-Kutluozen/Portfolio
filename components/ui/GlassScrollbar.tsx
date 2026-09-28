"use client";

import { useRef } from "react";
import { useGlassScrollbar } from "@/hooks/useGlassScrollbar";
import { useLiquidGlass } from "@/hooks/useLiquidGlass";
import styles from "./GlassScrollbar.module.css";

/**
 * The page's scrollbar, in liquid glass to match the cursor and the navbar.
 * It shows while you scroll (or come near the edge), stretches with the
 * speed, and the glass hand grabs it. Mouse and trackpad only; touch keeps
 * its own indicator.
 */
export default function GlassScrollbar() {
    const track = useRef<HTMLDivElement>(null);
    const { ref: thumb, filter } = useLiquidGlass<HTMLDivElement>({ strength: 10, bezel: 4, dispersion: 0.08, blur: 0, saturate: 1.3 });
    useGlassScrollbar({ track, thumb });

    return (
        <div ref={track} className={styles.track} aria-hidden="true">
            <div ref={thumb} className={`liquid-glass ${styles.thumb}`} data-cursor-grab="">
                {filter}
            </div>
        </div>
    );
}
