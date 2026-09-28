"use client";

import { useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { profile } from "@/data/profile";
import { useStewGrab } from "@/hooks/useStewGrab";
import Nadir from "@/components/animation/microanimation/Nadir";
import LiquidGlass from "./LiquidGlass";
import ShirtDare from "./ShirtDare";
import styles from "./NadirToy.module.css";

interface NadirToyProps {
    /** "tall" fills its column (Contact), "card" sizes to me (Home) */
    size?: "tall" | "card";
    className?: string;
}

/**
 * Cartoon me, made in Stew Factory: my eyes follow you, my hair dodges the
 * cursor, my shirt stretches when you grab it (a note outside the card dares
 * you not to), the glasses do a thing on hover. Where it was made only shows
 * up once you play with it.
 */
export default function NadirToy({ size = "card", className = "" }: NadirToyProps) {
    // Touch screens have no hover: the note appears after the first touch
    const [touched, setTouched] = useState(false);
    const frameRef = useRef<HTMLDivElement>(null);
    const artRef = useRef<HTMLDivElement>(null);
    const phase = useStewGrab(frameRef);

    return (
        <div ref={frameRef} className={`${styles.frame} ${className}`} data-size={size}>
            <figure
                className={`${styles.toy} ${styles[size]} ${touched ? styles.touched : ""}`}
                onPointerDown={() => setTouched(true)}
            >
                <div ref={artRef} className={styles.art} data-cursor-grab>
                    <Nadir style={{ width: "100%", height: "100%" }} />
                </div>
                <figcaption className={styles.note}>
                    <LiquidGlass as="span" className={styles.chip} strength={18} bezel={12}>
                        Want to animate like this?
                        <a href={profile.stewUrl} target="_blank" rel="noopener noreferrer" className={styles.link}>
                            Try Stew Factory <ArrowUpRight size={14} />
                        </a>
                    </LiquidGlass>
                </figcaption>
            </figure>
            <ShirtDare phase={phase} frame={frameRef} target={artRef} />
        </div>
    );
}
