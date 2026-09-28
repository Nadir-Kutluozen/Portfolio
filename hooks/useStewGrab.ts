"use client";

import { useEffect, useState, type RefObject } from "react";

/** idle = nobody has touched it, holding = someone is pulling, caught = they let go */
export type GrabPhase = "idle" | "holding" | "caught";

/**
 * Follows the drag actions of a Stew export: a grabbed path dispatches
 * stew:grab and stew:release, and both bubble up to `ref`.
 */
export function useStewGrab(ref: RefObject<HTMLElement | null>): GrabPhase {
    const [phase, setPhase] = useState<GrabPhase>("idle");

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const grab = () => setPhase("holding");
        const release = () => setPhase("caught");
        el.addEventListener("stew:grab", grab);
        el.addEventListener("stew:release", release);
        return () => {
            el.removeEventListener("stew:grab", grab);
            el.removeEventListener("stew:release", release);
        };
    }, [ref]);

    return phase;
}
