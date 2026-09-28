"use client";

import { useRef, type HTMLAttributes, type Ref } from "react";
import { gsap, useGSAP, EASE, MOTION } from "@/lib/gsap";

type RevealTag = "div" | "section" | "header" | "ul" | "ol" | "li" | "p" | "span" | "article" | "figure";

interface RevealProps extends HTMLAttributes<HTMLElement> {
    as?: RevealTag;
    /** Animate each direct child in turn instead of the block as one */
    stagger?: number;
    /** How far it rises, in px */
    y?: number;
    delay?: number;
    /** ScrollTrigger start, e.g. "top 85%" */
    start?: string;
}

/** Rises and fades in the first time it scrolls into view. */
export default function Reveal({ as = "div", stagger, y = 48, delay = 0, start = "top 86%", children, ...rest }: RevealProps) {
    const ref = useRef<HTMLElement>(null);

    useGSAP(() => {
        const el = ref.current;
        if (!el) return;
        const targets = stagger === undefined ? [el] : Array.from(el.children);

        gsap.matchMedia().add(MOTION.ok, () => {
            // A staggered block may carry data-anim itself; its children do the fading
            if (stagger !== undefined) gsap.set(el, { autoAlpha: 1 });
            gsap.from(targets, {
                y,
                autoAlpha: 0,
                duration: 1.15,
                ease: EASE.out,
                delay,
                stagger: stagger ?? 0,
                scrollTrigger: { trigger: el, start, once: true },
            });
        });
    }, { scope: ref });

    const Tag = as as "div";
    return (
        <Tag ref={ref as Ref<HTMLDivElement>} {...rest}>
            {children}
        </Tag>
    );
}
