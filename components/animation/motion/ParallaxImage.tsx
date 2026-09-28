"use client";

import { useRef, type ReactNode } from "react";
import Image from "next/image";
import { gsap, useGSAP, EASE, MOTION } from "@/lib/gsap";
import styles from "./motion.module.css";

interface ParallaxImageProps {
    src: string;
    alt: string;
    sizes: string;
    /** Size the frame from outside (height or aspect-ratio) */
    className?: string;
    priority?: boolean;
    quality?: number;
    objectPosition?: string;
    /** How much taller the picture is than its frame, in percent */
    strength?: number;
    /** Wipe the picture in the first time it scrolls into view */
    reveal?: boolean;
    /** Overlays drawn on top of the picture: scrims, captions */
    children?: ReactNode;
}

/** A squircle photo frame whose picture drifts slower than the page. */
export default function ParallaxImage({
    src,
    alt,
    sizes,
    className = "",
    priority,
    quality,
    objectPosition = "50% 50%",
    strength = 14,
    reveal = true,
    children,
}: ParallaxImageProps) {
    const frame = useRef<HTMLDivElement>(null);
    const inner = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!frame.current || !inner.current) return;
        // The inner layer is (100 + strength)% of the frame, so it can travel
        // exactly its overhang without ever showing an edge
        const travel = (strength / 2 / (100 + strength)) * 100;

        gsap.matchMedia().add(MOTION.ok, () => {
            gsap.fromTo(inner.current, { yPercent: -travel }, {
                yPercent: travel,
                ease: "none",
                scrollTrigger: { trigger: frame.current, start: "top bottom", end: "bottom top", scrub: true },
            });

            if (reveal) {
                const trigger = { trigger: frame.current, start: "top 90%", once: true };
                gsap.from(frame.current, { clipPath: "inset(100% 0% 0% 0%)", duration: 1.5, ease: EASE.inOut, scrollTrigger: trigger, clearProps: "clipPath" });
                gsap.from(inner.current!.firstElementChild, { scale: 1.28, duration: 2, ease: EASE.out, scrollTrigger: trigger });
            }
        });
    }, { scope: frame });

    return (
        <div ref={frame} className={`${styles.frame} ${className}`}>
            <div ref={inner} className={styles.frameInner} style={{ top: `${-strength / 2}%`, bottom: `${-strength / 2}%` }}>
                <div className={styles.frameImage}>
                    <Image src={src} alt={alt} fill sizes={sizes} priority={priority} quality={quality} style={{ objectFit: "cover", objectPosition }} />
                </div>
            </div>
            {children}
        </div>
    );
}
