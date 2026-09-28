"use client";

import { useRef, type HTMLAttributes, type Ref } from "react";
import { gsap, useGSAP, SplitText, EASE, MOTION } from "@/lib/gsap";

type HeadingTag = "h1" | "h2" | "h3" | "p" | "span" | "div";

interface SplitRevealProps extends HTMLAttributes<HTMLElement> {
    as?: HeadingTag;
    delay?: number;
    start?: string;
    /** "lines" slides whole lines up; "chars" rolls letters in one by one */
    by?: "lines" | "chars";
    /** With by="chars": the letters do a little wave when you hover the heading */
    wave?: boolean;
}

/**
 * A heading whose lines rise out of their own masks as it scrolls into view.
 * Re-splits by itself when fonts load or the width changes, so line breaks
 * always match what's on screen. Give it data-anim when it's visible on
 * load, so it never flashes before the split.
 */
export default function SplitReveal({ as = "h2", delay = 0, start = "top 88%", by = "lines", wave = false, children, ...rest }: SplitRevealProps) {
    const ref = useRef<HTMLElement>(null);

    useGSAP(() => {
        const el = ref.current;
        if (!el) return;

        gsap.matchMedia().add(MOTION.ok, (ctx) => {
            // Above-the-fold headings carry data-anim (hidden until now)
            gsap.set(el, { autoAlpha: 1 });
            let letters: Element[] = [];
            SplitText.create(el, {
                type: by === "chars" ? "lines,chars" : "lines",
                mask: "lines",
                linesClass: "split-line",
                autoSplit: true,
                onSplit: (self) => {
                    letters = self.chars;
                    return gsap.from(by === "chars" ? self.chars : self.lines, {
                        yPercent: 110,
                        duration: by === "chars" ? 1.1 : 1.25,
                        ease: EASE.out,
                        stagger: by === "chars" ? 0.028 : 0.09,
                        delay,
                        scrollTrigger: { trigger: el, start, once: true },
                    });
                },
            });

            if (!wave || by !== "chars") return;
            // A quick wave through the letters, small enough to stay inside
            // each line's mask
            const play = () =>
                ctx.add(() => {
                    gsap.to(letters, {
                        keyframes: [
                            { yPercent: -7, rotation: -4, duration: 0.16, ease: "power2.out" },
                            { yPercent: 0, rotation: 0, duration: 0.45, ease: "elastic.out(1, 0.45)" },
                        ],
                        stagger: 0.035,
                        transformOrigin: "50% 100%",
                        overwrite: "auto",
                    });
                });
            el.addEventListener("pointerenter", play);
            return () => el.removeEventListener("pointerenter", play);
        });
    }, { scope: ref });

    const Tag = as as "h2";
    return (
        <Tag ref={ref as Ref<HTMLHeadingElement>} {...rest}>
            {children}
        </Tag>
    );
}
