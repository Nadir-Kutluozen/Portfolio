"use client";

import { useRef, type MouseEvent } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/context/ThemeProvider";
import { gsap } from "@/lib/gsap";
import styles from "./ThemeToggle.module.css";

/** Sun/moon switch. The new theme grows out of the button as a circle. */
export default function ThemeToggle({ className = "" }: { className?: string }) {
    const { theme, toggleTheme } = useTheme();
    const icon = useRef<HTMLSpanElement>(null);

    const onClick = (e: MouseEvent<HTMLButtonElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        toggleTheme({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
        // a one-off spin on click; nothing to clean up
        gsap.fromTo(icon.current, { rotation: -90, scale: 0.6 }, { rotation: 0, scale: 1, duration: 0.6, ease: "back.out(2)" });
    };

    return (
        <button
            type="button"
            onClick={onClick}
            className={`${styles.toggle} ${className}`}
            aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
            title={theme === "dark" ? "Light theme" : "Dark theme"}
        >
            <span ref={icon} className={styles.icon}>
                {theme === "dark" ? <Sun size={19} strokeWidth={2} /> : <Moon size={19} strokeWidth={2} />}
            </span>
        </button>
    );
}
