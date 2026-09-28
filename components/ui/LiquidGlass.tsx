"use client";

import type { HTMLAttributes, Ref } from "react";
import { useLiquidGlass } from "@/hooks/useLiquidGlass";

interface LiquidGlassProps extends HTMLAttributes<HTMLElement> {
    as?: "div" | "span";
    /** How far the rim bends what's behind it, in px */
    strength?: number;
    /** Width of the curved rim, in px */
    bezel?: number;
}

/**
 * An Apple-style liquid glass surface: tint, frost, rim light and depth in
 * every browser (.liquid-glass), plus real refraction and color dispersion
 * where the browser can run it.
 */
export default function LiquidGlass({ as = "div", strength, bezel, className = "", children, ...rest }: LiquidGlassProps) {
    const { ref, filter } = useLiquidGlass<HTMLElement>({ strength, bezel });
    const Tag = as as "div";
    return (
        <Tag ref={ref as Ref<HTMLDivElement>} className={`liquid-glass ${className}`} {...rest}>
            {filter}
            {children}
        </Tag>
    );
}
