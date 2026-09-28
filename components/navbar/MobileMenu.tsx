"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { gsap, useGSAP, EASE } from "@/lib/gsap";
import { socials } from "@/data/profile";
import LocalTime from "@/components/ui/LocalTime";
import { NAV_LINKS, isActive } from "./navLinks";
import styles from "./navbar.module.css";

const LINKS = [{ label: "Home", href: "/" }, ...NAV_LINKS];

/** Phone menu: a paper sheet drops down and the big links roll up into place. */
export default function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
    const root = useRef<HTMLDivElement>(null);
    const tl = useRef<gsap.core.Timeline | null>(null);
    const pathname = usePathname();

    useGSAP(() => {
        const q = gsap.utils.selector(root);
        tl.current = gsap
            .timeline({ paused: true })
            .set(root.current, { visibility: "visible" })
            .fromTo(q(`.${styles.menuPanel}`), { clipPath: "inset(0% 0% 100% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.7, ease: EASE.inOut })
            .from(q(`.${styles.menuWord}`), { yPercent: 110, duration: 0.8, stagger: 0.06, ease: EASE.out }, "-=0.35")
            .from(q(`.${styles.menuFoot} > *`), { y: 16, autoAlpha: 0, duration: 0.5, stagger: 0.05, ease: EASE.out }, "-=0.6");
    }, { scope: root });

    useEffect(() => {
        const t = tl.current;
        if (!t) return;
        if (open) t.timeScale(1).play();
        else t.timeScale(1.8).reverse();
        document.body.style.overflow = open ? "hidden" : "";
        if (!open) return;
        const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [open, onClose]);

    return (
        <div ref={root} id="mobile-menu" className={styles.menu} role="dialog" aria-modal="true" aria-label="Menu" aria-hidden={!open}>
            <div className={styles.menuPanel}>
                <ul className={styles.menuLinks}>
                    {LINKS.map((link, i) => (
                        <li key={link.href}>
                            <Link
                                href={link.href}
                                onClick={onClose}
                                tabIndex={open ? 0 : -1}
                                className={`${styles.menuLink} ${isActive(pathname, link.href) && link.href !== "/" ? styles.menuLinkActive : ""}`}
                            >
                                <span className={styles.menuMask}>
                                    <span className={styles.menuWord}>{link.label}</span>
                                </span>
                                <span className={styles.menuIndex}>0{i + 1}</span>
                            </Link>
                        </li>
                    ))}
                </ul>

                <div className={styles.menuFoot}>
                    <div className={styles.menuSocials}>
                        {socials.map((s) => (
                            <a
                                key={s.id}
                                href={s.href}
                                target={s.id === "email" ? undefined : "_blank"}
                                rel={s.id === "email" ? undefined : "noopener noreferrer"}
                                tabIndex={open ? 0 : -1}
                            >
                                {s.label}
                            </a>
                        ))}
                    </div>
                    <LocalTime className={styles.menuTime} />
                </div>
            </div>
        </div>
    );
}
