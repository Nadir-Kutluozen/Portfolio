"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { ScrollTrigger } from "@/lib/gsap";

/**
 * The navbar and footer live across pages, but their scroll triggers were
 * measured on the page you came from. After each navigation (once the new
 * page has set up its own animations) every trigger measures again.
 */
export default function RouteScrollRefresh() {
    const pathname = usePathname();

    useEffect(() => {
        const frame = requestAnimationFrame(() => ScrollTrigger.refresh());
        return () => cancelAnimationFrame(frame);
    }, [pathname]);

    return null;
}
