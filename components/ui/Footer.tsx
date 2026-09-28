"use client";

import { useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUp, ArrowUpRight } from "lucide-react";
import { gsap, useGSAP, MOTION } from "@/lib/gsap";
import { profile, socials } from "@/data/profile";
import { NAV_LINKS } from "@/components/navbar/navLinks";
import SplitReveal from "@/components/animation/motion/SplitReveal";
import CopyEmail from "./CopyEmail";
import DynamicButton from "./DynamicButton";
import LocalTime from "./LocalTime";
import styles from "./Footer.module.css";

export default function Footer() {
    const pathname = usePathname();
    const panel = useRef<HTMLElement>(null);
    // The contact page already is the call to action
    const showCta = pathname !== "/contact";

    // The dark card rises up to full size as it comes into view
    useGSAP(() => {
        if (!panel.current) return;
        gsap.matchMedia().add(MOTION.ok, () => {
            gsap.fromTo(panel.current, { scale: 0.94, yPercent: 6 }, {
                scale: 1,
                yPercent: 0,
                ease: "none",
                scrollTrigger: { trigger: panel.current, start: "top bottom", end: "top 45%", scrub: true },
            });
        });
    }, { dependencies: [showCta], scope: panel });

    return (
        <footer className={styles.footer}>
            {showCta && (
                <section ref={panel} className={styles.cta} aria-labelledby="footer-cta-title">
                    <span className="t-eyebrow">Got an idea?</span>
                    <SplitReveal as="h2" id="footer-cta-title" className={`t-display ${styles.ctaTitle}`}>
                        Let&apos;s make something that <span className="t-serif">moves.</span>
                    </SplitReveal>
                    <div className={styles.ctaRow}>
                        <CopyEmail />
                        <DynamicButton href="/contact" variant="inverse" size="lg">
                            Say hello <ArrowUpRight size={20} />
                        </DynamicButton>
                    </div>
                </section>
            )}

            <div className={`shell ${styles.bottom}`}>
                <div className={styles.col}>
                    <Link href="/" className={styles.signature}>{profile.signature}</Link>
                    <LocalTime className={styles.muted} />
                </div>

                <nav className={styles.col} aria-label="Footer">
                    {NAV_LINKS.map((link) => (
                        <Link key={link.href} href={link.href} className={styles.link}>{link.label}</Link>
                    ))}
                </nav>

                <div className={styles.col}>
                    {socials.map((s) => (
                        <a
                            key={s.id}
                            href={s.href}
                            className={styles.link}
                            target={s.id === "email" ? undefined : "_blank"}
                            rel={s.id === "email" ? undefined : "noopener noreferrer"}
                        >
                            {s.label}
                        </a>
                    ))}
                </div>

                <div className={`${styles.col} ${styles.end}`}>
                    <button type="button" className={styles.top} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                        Back to top <ArrowUp size={16} />
                    </button>
                    <span className={styles.muted}>
                        &copy; {new Date().getFullYear()} {profile.name}
                        <br />
                        Designed and built in New York
                    </span>
                </div>
            </div>
        </footer>
    );
}
