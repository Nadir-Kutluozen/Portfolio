"use client";

import { useRef, type CSSProperties, type ReactNode } from "react";
import { gsap, useGSAP, MOTION, fontsReady } from "@/lib/gsap";
import StewScene, { type SceneCrop } from "./StewScene";
import styles from "./PeekWord.module.css";

interface PeekWordProps {
    /** the word itself, set as text */
    word: string;
    /** the logo's box inside its Stew scene */
    crop: SceneCrop;
    scene?: number;
    /** how tall the logo stands, in em */
    size?: number;
    /** how far its feet tuck down behind the letters, in em (0: standing right on them) */
    tuck?: number;
    /** the logo, a Stew export. A looping animation of its own is held still
     *  (the jump is ours); a hover interaction of its own keeps working. */
    children: ReactNode;
}

/** How far below the top of `el`'s line box its letters start, in em */
function lettersTop(el: HTMLElement): number {
    const cs = getComputedStyle(el);
    const size = parseFloat(cs.fontSize);
    const ctx = document.createElement("canvas").getContext("2d");
    if (!ctx || !size) return 0.17;
    ctx.font = `${cs.fontStyle} ${cs.fontWeight} ${size}px ${cs.fontFamily}`;
    const m = ctx.measureText(el.textContent || "H");
    const lineHeight = parseFloat(cs.lineHeight) || size * 1.2;
    const baseline = (lineHeight - m.fontBoundingBoxAscent - m.fontBoundingBoxDescent) / 2 + m.fontBoundingBoxAscent;
    return (baseline - m.actualBoundingBoxAscent) / size;
}

/**
 * A word with its logo hiding behind it. A block the color of the page covers
 * the letters, so when the word scrolls into view the logo jumps up out from
 * behind them, lands on top with a squash, and stays there.
 */
export default function PeekWord({ word, crop, scene, size = 1.35, tuck = 0, children }: PeekWordProps) {
    const root = useRef<HTMLSpanElement>(null);
    const peek = useRef<HTMLSpanElement>(null);

    useGSAP((ctx) => {
        const el = root.current;
        const logo = peek.current;
        if (!el || !logo) return;

        // The export's own loops, held at their first frame
        for (const t of gsap.getTweensOf(logo.querySelectorAll("svg *"))) {
            const owner = t.parent && t.parent !== gsap.globalTimeline ? t.parent : t;
            if (owner.repeat() !== 0) owner.pause(0);
        }

        // Font metrics decide where the letters start, so wait for the font
        let alive = true;
        fontsReady().then(() => {
            if (!alive) return;
            ctx.add(() => {
                const top = lettersTop(el);
                el.style.setProperty("--letters-top", `${top}em`);
                // Resting on top: its feet `tuck` em below the top of the letters
                const rest = () => -(el.offsetHeight - (top + tuck) * parseFloat(getComputedStyle(el).fontSize));

                const mm = gsap.matchMedia();
                mm.add(MOTION.reduce, () => {
                    gsap.set(logo, { y: rest });
                });
                mm.add(MOTION.ok, () => {
                    gsap.set(logo, { transformOrigin: "50% 100%" });
                    gsap.timeline({ scrollTrigger: { trigger: el, start: "top 80%", once: true, invalidateOnRefresh: true } })
                        // from below the word (the clip hides it there) up past its spot...
                        .fromTo(logo, { y: () => logo.offsetHeight }, {
                            y: () => rest() - logo.offsetHeight * 0.45,
                            duration: 0.45,
                            ease: "power2.out",
                            immediateRender: true,
                        })
                        // ...then down onto the letters, bouncing, squashing as it lands
                        .to(logo, { y: rest, duration: 0.6, ease: "bounce.out" })
                        .fromTo(logo, { scaleX: 1.16, scaleY: 0.8 }, { scaleX: 1, scaleY: 1, duration: 0.5, ease: "elastic.out(1, 0.45)" }, "-=0.42");
                });
            });
        });
        return () => {
            alive = false;
        };
    }, { scope: root });

    const width = size * (crop.width / crop.height);

    return (
        <span ref={root} className={styles.word} style={{ "--logo-width": `${width}em` } as CSSProperties}>
            <span className={styles.clip} aria-hidden="true">
                <span ref={peek} className={styles.peek} style={{ width: `${width}em`, height: `${size}em`, marginLeft: `${-width / 2}em` }}>
                    <StewScene crop={crop} scene={scene}>
                        {children}
                    </StewScene>
                </span>
            </span>
            <span className={styles.cover} aria-hidden="true" />
            <span className={styles.text} data-word="">
                {word}
            </span>
        </span>
    );
}
