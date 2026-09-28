"use client";

import { useRef, type RefObject } from "react";
import { gsap, useGSAP, MOTION } from "@/lib/gsap";
import Arrow from "@/components/animation/microanimation/Arrow";
import { useArrowBetween } from "@/hooks/useArrowBetween";
import type { GrabPhase } from "@/hooks/useStewGrab";
import styles from "./ShirtDare.module.css";

const LINES: Record<GrabPhase, string> = {
    idle: "Don't grab\nthe shirt.",
    holding: "Hey!",
    caught: "I saw that.",
};

// Arrow.tsx's own tail and tip, in px of its 674.73 x 438.64 box (its viewBox
// starts at -164.52, 125.3): where the dashes start, and the point of the
// head at rest
const TAIL = { x: 36.15, y: 306.84 };
const TIP = { x: 633.52, y: 51.7 };

interface ShirtDareProps {
    phase: GrabPhase;
    /** the box the card fills: both arrow copies are laid out in it */
    frame: RefObject<HTMLElement | null>;
    /** holds the Nadir svg the arrow points into */
    target: RefObject<HTMLElement | null>;
}

/**
 * Reverse psychology, scribbled next to the card: a note and a looping arrow
 * that dives in to the corner of my shirt you can pull. The arrow is drawn
 * twice so it reads everywhere: one copy under the card in the page's ink
 * (only the part outside the card shows), one clipped to the card in dark
 * ink on the sky. The note answers back once you pull.
 */
export default function ShirtDare({ phase, frame, target }: ShirtDareProps) {
    const underRef = useRef<HTMLDivElement>(null);
    const overRef = useRef<HTMLDivElement>(null);
    const noteRef = useRef<HTMLParagraphElement>(null);

    useArrowBetween({ frame, note: noteRef, target, tail: TAIL, tip: TIP });

    // The arrow is a Stew export that loops forever: hold both copies still,
    // pointing at the shirt, for anyone who asked for less motion
    useGSAP(() => {
        gsap.matchMedia().add(MOTION.reduce, () => {
            const parts = [underRef.current, overRef.current].flatMap((layer) => [
                ...(layer?.querySelectorAll("svg *") ?? []),
            ]);
            const loops = new Set<gsap.core.Animation>();
            for (const t of gsap.getTweensOf(parts)) {
                loops.add(t.parent && t.parent !== gsap.globalTimeline ? t.parent : t);
            }
            loops.forEach((a) => a.pause(0));
            return () => loops.forEach((a) => a.resume());
        });
    });

    // Every new line pops in
    useGSAP(() => {
        if (phase === "idle" || window.matchMedia(MOTION.reduce).matches) return;
        gsap.fromTo(noteRef.current,
            { scale: 0.6, rotation: -14 },
            { scale: 1, rotation: -4, duration: 0.55, ease: "back.out(3)" });
    }, { dependencies: [phase] });

    return (
        <>
            <div ref={underRef} className={styles.under} aria-hidden="true">
                <span className={styles.arrow}>
                    <Arrow style={{ width: "100%", height: "100%" }} />
                </span>
                <p ref={noteRef} className={styles.note}>{LINES[phase]}</p>
            </div>
            <div ref={overRef} className={styles.over} aria-hidden="true">
                <span className={styles.arrow}>
                    <Arrow style={{ width: "100%", height: "100%" }} />
                </span>
            </div>
        </>
    );
}
