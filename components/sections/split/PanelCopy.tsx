import type { ReactNode } from "react";
import Reveal from "@/components/animation/motion/Reveal";
import styles from "./PanelCopy.module.css";

interface PanelCopyProps {
    eyebrow: string;
    title: ReactNode;
    titleId: string;
    /** One bold line under the title */
    quote: string;
    /** The paragraph under the quote */
    children: ReactNode;
    actions?: ReactNode;
}

/** The words on a color half of a SplitPanel: eyebrow, big title, a bold line, a paragraph, buttons. */
export default function PanelCopy({ eyebrow, title, titleId, quote, children, actions }: PanelCopyProps) {
    return (
        <Reveal className={styles.copy} stagger={0.1}>
            <span className="t-eyebrow">{eyebrow}</span>
            <h2 id={titleId} className={`t-display ${styles.title}`}>
                {title}
            </h2>
            <p className={styles.quote}>{quote}</p>
            <p className={styles.sub}>{children}</p>
            {actions && <div className={styles.actions}>{actions}</div>}
        </Reveal>
    );
}
