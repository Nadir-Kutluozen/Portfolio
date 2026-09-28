import type { ReactNode } from "react";
import ParallaxImage from "@/components/animation/motion/ParallaxImage";
import styles from "./SplitPanel.module.css";

export type PanelTone = "orange" | "purple" | "cyan" | "green";

interface SplitPanelProps {
    image: { src: string; alt: string; position?: string };
    tone: PanelTone;
    /** Put the color half on the left */
    reverse?: boolean;
    /** What goes on the color half */
    children: ReactNode;
    className?: string;
    id?: string;
    "aria-labelledby"?: string;
}

/**
 * The Spotify-style split from Stew's about page: a photo half and a solid
 * color half, each its own squircle, with the page gutter around them.
 */
export default function SplitPanel({ image, tone, reverse, children, className = "", ...rest }: SplitPanelProps) {
    return (
        <section className={`${styles.split} ${reverse ? styles.reverse : ""} ${className}`} {...rest}>
            <ParallaxImage
                src={image.src}
                alt={image.alt}
                sizes="(max-width: 991px) 100vw, 50vw"
                className={styles.photo}
                objectPosition={image.position}
            />
            <div className={`${styles.panel} ${styles[tone]}`}>{children}</div>
        </section>
    );
}
