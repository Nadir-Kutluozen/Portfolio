"use client";

import { Children, useRef, type ReactNode } from "react";
import { gsap, useGSAP, MOTION } from "@/lib/gsap";
import styles from "./motion.module.css";

interface PinnedStackProps {
    children: ReactNode;
    className?: string;
}

const SLIDE = 1;   // scroll share of a card sliding in
const HOLD = 0.8;  // scroll share of a card resting fully up, so it can be read

/**
 * Full-screen cards that slide up over each other while the section is
 * pinned: the same engine as Stew's about page. The card underneath sinks
 * back and dims a little, so the stack reads as real paper.
 * Each child becomes one card.
 */
export default function PinnedStack({ children, className = "" }: PinnedStackProps) {
    const root = useRef<HTMLDivElement>(null);
    const cards = Children.toArray(children);

    useGSAP(() => {
        const el = root.current;
        if (!el) return;
        const panels = gsap.utils.toArray<HTMLElement>("[data-stack-panel]", el);
        const shades = gsap.utils.toArray<HTMLElement>("[data-stack-shade]", el);
        const mm = gsap.matchMedia();

        mm.add(MOTION.ok, () => {
            gsap.set(panels.slice(1), { yPercent: 104 });
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: el,
                    start: "top top",
                    end: `+=${panels.length * 120}%`,
                    pin: true,
                    scrub: 1,
                    anticipatePin: 1,
                },
            });
            tl.to({}, { duration: HOLD });
            panels.slice(1).forEach((panel, i) => {
                tl.to(panel, { yPercent: 0, ease: "none", duration: SLIDE })
                    .to(panels[i], { scale: 0.92, ease: "none", duration: SLIDE }, "<")
                    .to(shades[i], { opacity: 0.6, ease: "none", duration: SLIDE }, "<")
                    .to({}, { duration: HOLD });
            });
        });

        // No motion: the cards simply follow each other down the page
        mm.add(MOTION.reduce, () => {
            el.classList.add(styles.stackStatic);
            return () => el.classList.remove(styles.stackStatic);
        });
    }, { scope: root });

    return (
        <div ref={root} className={`${styles.stack} ${className}`}>
            {cards.map((card, i) => (
                <div key={i} className={styles.stackPanel} style={{ zIndex: i + 1 }} data-stack-panel>
                    {card}
                    <div className={styles.stackShade} data-stack-shade aria-hidden />
                </div>
            ))}
        </div>
    );
}
