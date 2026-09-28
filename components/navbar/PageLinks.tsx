"use client";

import { useRef } from "react";
import Link from "next/link";
import { gsap, useGSAP, MOTION } from "@/lib/gsap";
import LiquidGlass from "@/components/ui/LiquidGlass";
import { NAV_LINKS, isActive } from "./navLinks";
import styles from "./navbar.module.css";

/**
 * The page links in their glass capsule. A drop of glass rests under the
 * current page and glides to whichever link you point at (or tab to),
 * squashing a little as it travels like a liquid, then settles back.
 */
export default function PageLinks({ pathname }: { pathname: string }) {
    const list = useRef<HTMLUListElement>(null);
    const drop = useRef<HTMLLIElement>(null);

    useGSAP(() => {
        const ul = list.current;
        const lens = drop.current;
        if (!ul || !lens) return;
        const links = Array.from(ul.querySelectorAll<HTMLAnchorElement>("a"));
        const current = links.find((a) => a.getAttribute("aria-current") === "page") ?? null;
        const calm = window.matchMedia(MOTION.reduce).matches;
        let shown = false;

        const glideTo = (a: HTMLAnchorElement | null, instant = false) => {
            if (!a) {
                shown = false;
                gsap.to(lens, { autoAlpha: 0, scale: 0.85, duration: 0.22, ease: "power2.out", overwrite: "auto" });
                return;
            }
            // measure the link's list item: its offset is relative to the list
            const item = a.parentElement as HTMLElement;
            const spot = { x: item.offsetLeft, width: item.offsetWidth };
            if (!shown || instant || calm) {
                gsap.set(lens, spot);
                gsap.to(lens, { autoAlpha: 1, scale: 1, duration: instant || calm ? 0 : 0.28, ease: "back.out(2)", overwrite: "auto" });
            } else {
                gsap.to(lens, { ...spot, duration: 0.4, ease: "power3.out", overwrite: "auto" });
                gsap.fromTo(lens, { scaleX: 1.08, scaleY: 0.82 }, { scaleX: 1, scaleY: 1, duration: 0.55, ease: "elastic.out(1, 0.55)" });
            }
            shown = true;
        };

        glideTo(current, true);
        const enter = (e: Event) => glideTo(e.currentTarget as HTMLAnchorElement);
        const settle = () => glideTo(current);
        links.forEach((a) => {
            a.addEventListener("pointerenter", enter);
            a.addEventListener("focus", enter);
        });
        ul.addEventListener("pointerleave", settle);
        ul.addEventListener("focusout", settle);
        return () => {
            links.forEach((a) => {
                a.removeEventListener("pointerenter", enter);
                a.removeEventListener("focus", enter);
            });
            ul.removeEventListener("pointerleave", settle);
            ul.removeEventListener("focusout", settle);
        };
    }, { scope: list, dependencies: [pathname], revertOnUpdate: true });

    return (
        <LiquidGlass className={`${styles.capsule} ${styles.linksCapsule}`}>
            <ul ref={list} className={styles.links}>
                <li ref={drop} className={styles.lens} aria-hidden />
                {NAV_LINKS.map((link) => {
                    const active = isActive(pathname, link.href);
                    return (
                        <li key={link.href}>
                            <Link
                                href={link.href}
                                className={`${styles.link} ${active ? styles.active : ""}`}
                                aria-current={active ? "page" : undefined}
                            >
                                {link.label}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </LiquidGlass>
    );
}
