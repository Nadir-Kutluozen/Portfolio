"use client";

import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { gsap, useGSAP, EASE, MOTION } from "@/lib/gsap";
import { certifications, education, experience, research } from "@/data/profile";
import SplitReveal from "@/components/animation/motion/SplitReveal";
import styles from "./About.module.css";

/** The resume, read like a list: a line draws in over each role as it arrives. */
export default function ExperienceSection() {
    const root = useRef<HTMLElement>(null);

    useGSAP(() => {
        gsap.matchMedia().add(MOTION.ok, () => {
            gsap.utils.toArray<HTMLElement>("[data-row]", root.current).forEach((row) => {
                const trigger = { trigger: row, start: "top 85%", once: true };
                gsap.from(row.querySelector("[data-rule]"), { scaleX: 0, transformOrigin: "0% 50%", duration: 1.4, ease: EASE.inOut, scrollTrigger: trigger });
                gsap.from(row.querySelectorAll("[data-cell]"), { y: 30, autoAlpha: 0, duration: 1.1, stagger: 0.08, ease: EASE.out, delay: 0.15, scrollTrigger: trigger });
            });
        });
    }, { scope: root });

    return (
        <section ref={root} className="shell section" aria-labelledby="experience-title">
            <span className="t-eyebrow">Experience</span>
            <SplitReveal as="h2" id="experience-title" className={`t-display t-l ${styles.sectionTitle}`}>
                Where I&apos;ve <span className="t-serif">worked</span>
            </SplitReveal>

            <ol className={styles.rows}>
                {experience.map((role) => (
                    <li key={role.company} className={styles.row} data-row>
                        <span className={styles.rule} data-rule aria-hidden />
                        <p className={styles.period} data-cell>{role.period}</p>
                        <div data-cell>
                            <h3 className={styles.company}>
                                {role.href ? (
                                    <a href={role.href} target="_blank" rel="noopener noreferrer">
                                        {role.company} <ArrowUpRight size={20} />
                                    </a>
                                ) : (
                                    role.company
                                )}
                            </h3>
                            <p className={styles.roleTitle}>{role.title}</p>
                        </div>
                        <ul className={styles.points} data-cell>
                            {role.points.map((point) => (
                                <li key={point}>{point}</li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ol>

            <div className={styles.schooling}>
                {[
                    { heading: "Research", items: research },
                    { heading: "Education", items: education },
                    { heading: "Certifications", items: certifications },
                ].map((group) => (
                    <div key={group.heading} className={styles.row} data-row>
                        <span className={styles.rule} data-rule aria-hidden />
                        <p className={styles.period} data-cell>{group.heading}</p>
                        <ul className={styles.schools} data-cell>
                            {group.items.map((item) => (
                                <li key={item.name}>
                                    <span className={styles.school}>
                                        {item.href ? (
                                            <a href={item.href} target="_blank" rel="noopener noreferrer">
                                                {item.name} <ArrowUpRight size={16} />
                                            </a>
                                        ) : (
                                            item.name
                                        )}
                                    </span>
                                    <span className={styles.degree}>{item.detail} · {item.period}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </section>
    );
}
