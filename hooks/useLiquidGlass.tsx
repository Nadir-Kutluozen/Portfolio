"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { canRefract, lensMap, shapeLensMap } from "@/lib/liquidGlass";

interface LiquidGlassOptions {
    /** Turn the refraction off without breaking the rules of hooks */
    enabled?: boolean;
    /** How far the rim bends the backdrop, in px */
    strength?: number;
    /** Width of the curved rim, in px */
    bezel?: number;
    /** How much the colors split at the rim (0 to ~0.2) */
    dispersion?: number;
    /** Extra frost behind the bend, in px */
    blur?: number;
    saturate?: number;
    /** A non-rectangular pane: its outline, in px of the element's box */
    shape?: (width: number, height: number) => Path2D;
}

interface LensMap {
    w: number;
    h: number;
    href: string;
}

/**
 * Refraction for a .liquid-glass element (Chromium only; see lib/liquidGlass).
 * Measures the element, draws a lens map at its exact size, and runs it as a
 * backdrop-filter with a slightly different bend per color channel, so the
 * rim splits light like real glass. Render `filter` inside the element.
 */
export function useLiquidGlass<T extends HTMLElement>({
    enabled = true,
    strength = 44,
    bezel = 18,
    dispersion = 0.14,
    blur = 0.3,
    saturate = 1.5,
    shape,
}: LiquidGlassOptions = {}): { ref: React.RefObject<T | null>; filter: ReactNode } {
    const ref = useRef<T>(null);
    const id = `lg${useId().replace(/[^a-zA-Z0-9]/g, "")}`;
    const [map, setMap] = useState<LensMap | null>(null);

    // (Re)draw the lens whenever the element changes size
    useEffect(() => {
        const el = ref.current;
        if (!el || !enabled || !canRefract()) return;
        let frame = 0;
        const draw = () => {
            const w = Math.round(el.offsetWidth);
            const h = Math.round(el.offsetHeight);
            if (!w || !h) return;
            const radius = parseFloat(getComputedStyle(el).borderTopLeftRadius) || 0;
            const rim = Math.min(bezel, w / 2, h / 2);
            setMap((prev) => (prev && prev.w === w && prev.h === h ? prev : {
                w,
                h,
                href: shape ? shapeLensMap(w, h, shape(w, h), rim) : lensMap(w, h, radius, rim),
            }));
        };
        const observer = new ResizeObserver(() => {
            cancelAnimationFrame(frame);
            frame = requestAnimationFrame(draw);
        });
        observer.observe(el);
        return () => {
            observer.disconnect();
            cancelAnimationFrame(frame);
        };
    }, [enabled, bezel, shape]);

    // Swap the plain CSS frost for the real bend once the lens exists
    useEffect(() => {
        const el = ref.current;
        if (!el || !map || !enabled) return;
        const value = `url(#${id}) blur(${blur}px) saturate(${saturate})`;
        el.style.setProperty("backdrop-filter", value);
        el.style.setProperty("-webkit-backdrop-filter", value);
        el.dataset.refract = "";
        return () => {
            el.style.removeProperty("backdrop-filter");
            el.style.removeProperty("-webkit-backdrop-filter");
            delete el.dataset.refract;
        };
    }, [map, id, enabled, blur, saturate]);

    const filter =
        map && enabled ? (
            <svg aria-hidden width="0" height="0" style={{ position: "absolute", pointerEvents: "none" }}>
                <filter
                    id={id}
                    x="0"
                    y="0"
                    width={map.w}
                    height={map.h}
                    filterUnits="userSpaceOnUse"
                    primitiveUnits="userSpaceOnUse"
                    colorInterpolationFilters="sRGB"
                >
                    <feImage href={map.href} x="0" y="0" width={map.w} height={map.h} preserveAspectRatio="none" result="lens" />
                    {/* red, green and blue each bend a little differently: the color split at the rim */}
                    <feDisplacementMap in="SourceGraphic" in2="lens" scale={strength} xChannelSelector="R" yChannelSelector="G" result="bentR" />
                    <feColorMatrix in="bentR" type="matrix" values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" result="red" />
                    <feDisplacementMap in="SourceGraphic" in2="lens" scale={strength * (1 - dispersion)} xChannelSelector="R" yChannelSelector="G" result="bentG" />
                    <feColorMatrix in="bentG" type="matrix" values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0" result="green" />
                    <feDisplacementMap in="SourceGraphic" in2="lens" scale={strength * (1 - dispersion * 2)} xChannelSelector="R" yChannelSelector="G" result="bentB" />
                    <feColorMatrix in="bentB" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0" result="blue" />
                    <feBlend in="red" in2="green" mode="screen" result="redGreen" />
                    <feBlend in="redGreen" in2="blue" mode="screen" />
                </filter>
            </svg>
        ) : null;

    return { ref, filter };
}
