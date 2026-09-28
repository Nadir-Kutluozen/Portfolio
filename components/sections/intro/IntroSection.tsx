"use client";

import { useRef } from "react";
import { gsap, useGSAP, MOTION } from "@/lib/gsap";
import { highlights } from "@/data/profile";
import ScrubText from "@/components/animation/motion/ScrubText";
import FoxKids from "@/components/animation/microanimation/FoxKids";
import JetixLogo from "@/components/animation/microanimation/JetixLogo";
import InlineLogo from "@/components/ui/InlineLogo";
import NadirToy from "@/components/ui/NadirToy";
import PeekWord from "@/components/ui/PeekWord";
import styles from "./IntroSection.module.css";

/** The Jetix mark's visible edges in the JetixLogo export's 512 x 512 scene
 *  (its picture has wide transparent margins) */
const JETIX_CROP = { x: 122.55, y: 164.24, width: 224.71, height: 169.32 };
/** The Fox Kids logo's edges in the FoxKids export's 512 x 512 scene (its black backing) */
const FOX_KIDS_CROP = { x: 128, y: 134.04, width: 256, height: 225.5 };

/** Who I am in one breath (with a cartoon me to play with), then the highlights: numbers count up, words decode in. */
export default function IntroSection() {
    const strip = useRef<HTMLUListElement>(null);

    useGSAP(() => {
        const values = gsap.utils.toArray<HTMLElement>("[data-value]", strip.current);
        gsap.matchMedia().add(MOTION.ok, () => {
            const trigger = { trigger: strip.current, start: "top 88%", once: true };
            values.forEach((el, i) => {
                const count = Number(el.dataset.count);
                const text = el.dataset.value ?? "";
                if (count) {
                    // "20+": the number part counts up, the rest stays put
                    const suffix = text.replace(String(count), "");
                    const counter = { v: 0 };
                    el.textContent = `0${suffix}`;
                    gsap.to(counter, {
                        v: count,
                        duration: 1.6,
                        ease: "power2.out",
                        onUpdate: () => {
                            el.textContent = `${Math.round(counter.v)}${suffix}`;
                        },
                        scrollTrigger: trigger,
                    });
                } else {
                    // Words start blank (a no-break space keeps the line height)
                    // and decode into place
                    el.textContent = String.fromCharCode(160);
                    gsap.to(el, {
                        scrambleText: { text, chars: "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789", speed: 0.6 },
                        duration: 1.1,
                        delay: i * 0.08,
                        ease: "none",
                        scrollTrigger: trigger,
                    });
                }
            });
        });
    }, { scope: strip });

    return (
        <section className={`shell section ${styles.intro}`} aria-label="About me in short">
            <span className="t-eyebrow">Hello, I&apos;m Nadir</span>
            <div className={styles.opening}>
                <ScrubText className={styles.statement}>
                    I grew up on{" "}
                    <PeekWord word="Jetix" crop={JETIX_CROP} scene={512}>
                        <JetixLogo />
                    </PeekWord>{" "}
                    and{" "}
                    <InlineLogo label="Fox Kids" crop={FOX_KIDS_CROP} size={1.45} className={styles.foxKids}>
                        <FoxKids />
                    </InlineLogo>, and all I ever wanted was to make things move. Twenty years of drawing later,
                    I <span className="t-serif">write the code</span> too.
                </ScrubText>
                <NadirToy className={styles.toy} />
            </div>

            <ul ref={strip} className={styles.facts}>
                {highlights.map((h) => (
                    <li key={h.label} className={styles.fact}>
                        <span className={`t-display ${styles.number}`} data-value={h.value} data-count={h.count}>
                            {h.value}
                        </span>
                        <span className={styles.label}>{h.label}</span>
                    </li>
                ))}
            </ul>
        </section>
    );
}
