"use client";

import type { CSSProperties } from "react";
import NewStew from "./NewStew";

/**
 * Stew the raccoon, safe to drop into server components. NewStew.tsx is a
 * Stew Factory export (regenerated on every export), so it stays untouched
 * and this wrapper carries the "use client" line instead.
 */
export default function StewMascot({ className, style }: { className?: string; style?: CSSProperties }) {
    return <NewStew className={className} style={{ width: "100%", height: "100%", ...style }} />;
}
