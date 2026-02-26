"use client";

import React from "react";
import styles from "./Footer.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "@/context/ThemeProvider";

export default function Footer({ forceShow = false }: { forceShow?: boolean }) {
    const { theme } = useTheme();
    const pathname = usePathname();

    if ((pathname === '/projects' || pathname === '/contact') && !forceShow) {
        return null;
    }

    const navLinks = [
        { name: 'Projects', href: '/projects' },
        { name: 'About', href: '/about' },
        { name: 'Contact', href: '/contact' },
    ];

    return (
        <footer className={styles.footer}>
            <div className={`container ${styles.container}`}>
                <div className={styles.content}>
                    <div className={styles.linksWrapper}>
                        {navLinks.map((link) => (
                            <Link key={link.name} href={link.href} className={styles.link}>
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    <div className={styles.separator}></div>

                    <span className={styles.text}>
                        &copy; {new Date().getFullYear()} Nadir Kutluozen.
                    </span>
                </div>
            </div>
        </footer>
    );
}
