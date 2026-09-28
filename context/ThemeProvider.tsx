"use client";

import React, { createContext, useCallback, useContext, useSyncExternalStore } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
    theme: Theme;
    /** Flip the theme. Pass the click position to grow the new theme out of it. */
    toggleTheme: (origin?: { x: number; y: number }) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Minimal typing for the View Transitions API (not in every TS lib yet)
type ViewTransitionDoc = Document & {
    startViewTransition?: (update: () => void) => { ready: Promise<void> };
};

// The data-theme attribute on <html> is the single source of truth. The boot
// script in layout.tsx sets it before the first paint; React just listens.
function subscribe(onChange: () => void) {
    const observer = new MutationObserver(onChange);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => observer.disconnect();
}

const readTheme = (): Theme => (document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light");
const serverTheme = (): Theme => "light";

function applyTheme(theme: Theme) {
    document.documentElement.setAttribute("data-theme", theme);
    try {
        localStorage.setItem("theme", theme);
    } catch {
        // storage blocked: the theme still applies for this visit
    }
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const theme = useSyncExternalStore(subscribe, readTheme, serverTheme);

    const toggleTheme = useCallback((origin?: { x: number; y: number }) => {
        const next: Theme = readTheme() === "dark" ? "light" : "dark";
        const doc = document as ViewTransitionDoc;
        const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        if (!doc.startViewTransition || calm) {
            applyTheme(next);
            return;
        }

        // The new theme grows as a circle out of the toggle
        const x = origin?.x ?? window.innerWidth - 40;
        const y = origin?.y ?? 32;
        const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
        const transition = doc.startViewTransition(() => applyTheme(next));
        transition.ready.then(() => {
            document.documentElement.animate(
                { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
                { duration: 650, easing: "cubic-bezier(0.7, 0, 0.2, 1)", pseudoElement: "::view-transition-new(root)" },
            );
        });
    }, []);

    return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
}
