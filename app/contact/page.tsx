import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { socials } from "@/data/profile";
import SplitReveal from "@/components/animation/motion/SplitReveal";
import Reveal from "@/components/animation/motion/Reveal";
import CopyEmail from "@/components/ui/CopyEmail";
import LocalTime from "@/components/ui/LocalTime";
import NadirToy from "@/components/ui/NadirToy";
import SocialIcon from "@/components/ui/SocialIcon";
import styles from "./Contact.module.css";

export const metadata: Metadata = {
    title: "Contact",
    description: "Got a project, a role, or just want to say hi? Email Nadir Kutluozen or find him on GitHub, LinkedIn and Instagram.",
};

/** The words and links on one side, a cartoon me to play with on the other. */
export default function Contact() {
    return (
        <section className={`shell ${styles.contact}`} aria-labelledby="contact-title">
            <div className={styles.head}>
                <span className="t-eyebrow">Contact</span>
                <SplitReveal as="h1" id="contact-title" by="chars" wave className={`t-display ${styles.title}`} data-anim>
                    Let&apos;s talk.
                </SplitReveal>
                <Reveal as="p" className={`t-lead ${styles.lead}`} delay={0.35} data-anim>
                    Got a project, a role, or just want to say hi? My inbox is always open.
                </Reveal>
                <Reveal delay={0.5} data-anim>
                    <CopyEmail />
                </Reveal>
            </div>

            <Reveal className={styles.stage} delay={0.25} data-anim>
                <NadirToy size="tall" />
            </Reveal>

            <Reveal className={styles.socials} stagger={0.07} delay={0.45} data-anim>
                {socials.map((s) => (
                    <a
                        key={s.id}
                        href={s.href}
                        target={s.id === "email" ? undefined : "_blank"}
                        rel={s.id === "email" ? undefined : "noopener noreferrer"}
                        className={styles.tile}
                        data-hover-root
                    >
                        <span className={styles.icon}>
                            <SocialIcon id={s.id} size={28} />
                        </span>
                        <span className={styles.tileText}>
                            <span className={styles.platform}>{s.label}</span>
                            <span className={styles.handle}>{s.handle}</span>
                        </span>
                        <ArrowUpRight className={styles.arrow} size={20} />
                    </a>
                ))}
            </Reveal>

            <p className={styles.where}>
                Based in <LocalTime />
            </p>
        </section>
    );
}
