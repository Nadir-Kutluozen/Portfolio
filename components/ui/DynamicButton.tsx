"use client";

import Link from "next/link";
import type { CSSProperties, MouseEvent, ReactNode, Ref } from "react";
import { useLiquidGlass } from "@/hooks/useLiquidGlass";
import styles from "./DynamicButton.module.css";

type Variant = "solid" | "soft" | "inverse" | "tint" | "light" | "glass";

interface DynamicButtonProps {
    children: ReactNode;
    href?: string;
    onClick?: (e: MouseEvent<HTMLElement>) => void;
    /** solid = ink, soft = quiet fill, inverse = on an ink card,
     *  tint = on a colored panel with dark ink, light = white (on color), glass = on photos */
    variant?: Variant;
    size?: "md" | "lg";
    className?: string;
    style?: CSSProperties;
    title?: string;
    type?: "button" | "submit";
    "aria-label"?: string;
}

// The fill slides in from the side the pointer came from and leaves toward
// the side it exits. Set on the element directly: no re-render per hover.
function fillFrom(e: MouseEvent<HTMLElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--fill-origin", e.clientX - rect.left < rect.width / 2 ? "left" : "right");
}

/** The site's squircle button. Internal links route, external ones open a new tab. */
export default function DynamicButton({
    children,
    href,
    onClick,
    variant = "solid",
    size = "md",
    className = "",
    type = "button",
    ...rest
}: DynamicButtonProps) {
    // The glass variant is real liquid glass: it bends what's behind it
    const glass = variant === "glass";
    const { ref, filter } = useLiquidGlass<HTMLElement>({ enabled: glass, strength: 30, bezel: 15 });
    const classes = `${styles.button} ${styles[variant]} ${styles[size]} ${glass ? "liquid-glass" : ""} ${className}`;
    const shared = { className: classes, onMouseEnter: fillFrom, onMouseLeave: fillFrom, onClick, ...rest };
    const content = (
        <>
            {filter}
            <span className={styles.label}>{children}</span>
        </>
    );

    if (href) {
        const external = /^(https?:|mailto:)/.test(href);
        if (external) {
            const newTab = href.startsWith("http");
            return (
                <a ref={ref as Ref<HTMLAnchorElement>} href={href} target={newTab ? "_blank" : undefined} rel={newTab ? "noopener noreferrer" : undefined} {...shared}>
                    {content}
                </a>
            );
        }
        return (
            <Link ref={ref as Ref<HTMLAnchorElement>} href={href} {...shared}>
                {content}
            </Link>
        );
    }

    return (
        <button ref={ref as Ref<HTMLButtonElement>} type={type} {...shared}>
            {content}
        </button>
    );
}
