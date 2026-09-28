"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { profile } from "@/data/profile";
import ThemeToggle from "@/components/ui/ThemeToggle";
import DynamicButton from "@/components/ui/DynamicButton";
import LiquidGlass from "@/components/ui/LiquidGlass";
import MobileMenu from "./MobileMenu";
import PageLinks from "./PageLinks";
import styles from "./navbar.module.css";

/** Stays in view the whole way down: three floating glass capsules */
export default function Navbar() {
    const pathname = usePathname();
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <>
            <header className={styles.bar}>
                <nav className={`shell ${styles.inner}`} aria-label="Main">
                    {/* Three floating glass capsules: me, the pages, the actions */}
                    <LiquidGlass className={styles.capsule}>
                        <Link href="/" className={styles.brand} aria-label={`${profile.name}, home`}>
                            <span className={styles.avatar}>
                                <Image src="/photos/avatar.jpg" alt="" width={34} height={34} priority />
                            </span>
                            <span className={styles.full}>{profile.name}</span>
                            <span className={styles.short}>{profile.signature}</span>
                        </Link>
                    </LiquidGlass>

                    <PageLinks pathname={pathname} />

                    <LiquidGlass className={`${styles.capsule} ${styles.actions}`}>
                        <ThemeToggle className={styles.plain} />
                        <DynamicButton href="/contact" className={styles.cta}>
                            Let&apos;s talk
                        </DynamicButton>
                        <button
                            type="button"
                            className={`${styles.burger} ${menuOpen ? styles.burgerOpen : ""}`}
                            onClick={() => setMenuOpen((open) => !open)}
                            aria-expanded={menuOpen}
                            aria-controls="mobile-menu"
                            aria-label={menuOpen ? "Close menu" : "Open menu"}
                        >
                            <span />
                            <span />
                        </button>
                    </LiquidGlass>
                </nav>
            </header>
            <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
        </>
    );
}
