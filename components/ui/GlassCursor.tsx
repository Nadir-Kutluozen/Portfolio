"use client";

import { useRef } from "react";
import { useGlassCursor } from "@/hooks/useGlassCursor";
import { ARROW, FIST, OPEN_HAND } from "@/lib/cursorShapes";
import GlassShape from "./GlassShape";
import styles from "./GlassCursor.module.css";

/**
 * The pointer, in clear liquid glass: my Mouse arrow, turning to face where
 * you're going, and over anything grabbable (me) a cartoon hand that snaps
 * into a fist when it catches hold and springs open when it lets go.
 * Mouse and trackpad only; it steps aside for the View lens (CursorLabel).
 */
export default function GlassCursor() {
    const root = useRef<HTMLDivElement>(null);
    useGlassCursor({ root, rest: -24 });

    return (
        <div ref={root} className={styles.cursor} data-state="off" data-mode="arrow" aria-hidden>
            <div className={styles.press}>
                {/* each layer pops in with CSS; the pivot inside is GSAP's to turn */}
                <div className={`${styles.layer} ${styles.arrow}`}>
                    <div className={styles.pivot} data-pivot="arrow">
                        <GlassShape shape={ARROW} />
                    </div>
                </div>
                <div className={`${styles.layer} ${styles.hand}`}>
                    <div className={styles.pivot} data-pivot="hand">
                        <div className={`${styles.pivot} ${styles.open}`} data-part="open">
                            <GlassShape shape={OPEN_HAND} />
                        </div>
                        <div className={`${styles.pivot} ${styles.fist}`} data-part="fist">
                            <GlassShape shape={FIST} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
