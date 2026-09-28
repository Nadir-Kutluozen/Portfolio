"use client";

import { useRef, type CSSProperties } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap";
import { profile } from "@/data/profile";
import SplitReveal from "@/components/animation/motion/SplitReveal";
import Reveal from "@/components/animation/motion/Reveal";
import { ARTWORK } from "@/data/artwork";
import styles from "./ArtSection.module.css";

/** The sketchbook: a strip of drawings that drifts sideways as you scroll past. */
export default function ArtSection() {
    const root = useRef<HTMLElement>(null);
    const track = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        // Desktop only; on phones the strip is a normal swipeable row
        gsap.matchMedia().add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
            gsap.fromTo(track.current, { x: () => window.innerWidth * 0.08 }, {
                x: () => -(track.current!.scrollWidth - window.innerWidth * 0.92),
                ease: "none",
                scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: 0.8, invalidateOnRefresh: true },
            });
        });
    }, { scope: root });

    return (
        <section ref={root} className={`section ${styles.art}`} aria-labelledby="art-title">
            <div className={`shell ${styles.head}`}>
                <span className="t-eyebrow">Sketchbook</span>
                <SplitReveal as="h2" id="art-title" className="t-display t-l">
                    I still draw <span className="t-serif">every day</span>
                </SplitReveal>
                <Reveal as="p" className={`t-lead ${styles.lead}`}>
                    {profile.drawingYears} years in, I draw on paper and on the iPad, and I sign everything {profile.signature}
                </Reveal>
            </div>

            <div className={styles.viewport}>
                <div ref={track} className={styles.track}>
                    {ARTWORK.map((piece) => (
                        <figure key={piece.src} className={styles.piece} style={{ "--ratio": piece.width / piece.height } as CSSProperties}>
                            <div className={styles.frame}>
                                <Image src={piece.src} alt={piece.alt} fill sizes="(max-width: 767px) 80vw, 45vw" style={{ objectFit: "cover" }} />
                            </div>
                            <figcaption className={styles.caption}>{piece.title}</figcaption>
                        </figure>
                    ))}
                </div>
            </div>
        </section>
    );
}
