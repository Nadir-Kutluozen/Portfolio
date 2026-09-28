"use client";

import { Children, cloneElement, isValidElement, useRef, type HTMLAttributes, type ReactNode, type Ref } from "react";
import { gsap, useGSAP, MOTION } from "@/lib/gsap";

interface ScrubTextProps extends HTMLAttributes<HTMLElement> {
    as?: "p" | "h2" | "div";
}

/**
 * Every word of the text in `node` gets its own span, recursing into plain
 * elements (an italic accent). Components (a live logo) stay whole and out
 * of the scrub. Split by React rather than SplitText: its revert rebuilds
 * the paragraph from an HTML string, which would kill anything live inside.
 */
function splitWords(node: ReactNode): ReactNode {
    return Children.map(node, (child) => {
        if (typeof child === "string") {
            return child.split(/(\s+)/).map((part, i) => (part.trim() ? <span key={i} data-word="">{part}</span> : part));
        }
        if (isValidElement<{ children?: ReactNode }>(child) && typeof child.type === "string") {
            return cloneElement(child, undefined, splitWords(child.props.children));
        }
        return child;
    });
}

/** Words light up one by one as you scroll through the paragraph. */
export default function ScrubText({ as = "p", children, ...rest }: ScrubTextProps) {
    const ref = useRef<HTMLElement>(null);

    useGSAP(() => {
        const el = ref.current;
        if (!el) return;

        gsap.matchMedia().add(MOTION.ok, () => {
            gsap.fromTo(el.querySelectorAll("[data-word]"), { opacity: 0.14 }, {
                opacity: 1,
                ease: "none",
                stagger: 0.1,
                scrollTrigger: { trigger: el, start: "top 80%", end: "bottom 48%", scrub: 0.6 },
            });
        });
    }, { scope: ref });

    const Tag = as as "p";
    return (
        <Tag ref={ref as Ref<HTMLParagraphElement>} {...rest}>
            {splitWords(children)}
        </Tag>
    );
}
