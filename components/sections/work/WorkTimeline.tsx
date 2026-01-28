
"use client";

import React, { useRef } from "react";
import styles from "./WorkTimeline.module.css";
import { projects } from "@/data/projects";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import FootstepPath from "./FootstepPath";

export default function WorkTimeline() {
    const sectionRef = useRef<HTMLElement>(null);
    const [sectionHeight, setSectionHeight] = React.useState(0);

    // Measure height for path calculation
    React.useEffect(() => {
        if (!sectionRef.current) return;

        const observer = new ResizeObserver((entries) => {
            for (let entry of entries) {
                setSectionHeight(entry.contentRect.height);
            }
        });

        observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    // Sort projects by date descending (newest first) just in case
    const sortedProjects = [...projects].sort((a, b) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    return (
        <section ref={sectionRef} className={styles.timelineSection}>
            <div className="container position-relative">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-5"
                >
                    <h2 className="display-2 fw-bold mb-3">My Work</h2>
                    <p className="lead opacity-75">A timeline of my recent projects and experiments.</p>
                </motion.div>

                <div className={styles.timelineContainer}>
                    {/* Animated Path & Footsteps */}
                    <FootstepPath height={sectionHeight} />

                    {sortedProjects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            className={styles.timelineItem}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.5 }}
                        >
                            {/* Dot */}
                            {/* We just use a simple dot now, the path handles the connection visual */}
                            <div className={styles.timelineDot} />

                            {/* Content Card */}
                            <div className={styles.timelineContent}>
                                <span className={styles.dateBadge}>
                                    {new Date(project.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}
                                </span>

                                <div className="d-flex align-items-center gap-3 mb-3">
                                    <div className="position-relative overflow-hidden rounded-3 shadow-sm border border-secondary border-opacity-10" style={{ width: '50px', height: '50px', flexShrink: 0 }}>
                                        <Image
                                            src={project.image}
                                            alt={project.title}
                                            fill
                                            className="object-fit-cover"
                                            sizes="50px"
                                        />
                                    </div>
                                    <h3 className="h4 fw-bold m-0">{project.title}</h3>
                                </div>

                                <p className="opacity-75 mb-3">{project.description}</p>

                                <Link href={`/projects?id=${project.id}`} className={styles.ctaLink}>
                                    Learn More <ArrowUpRight size={16} className="ms-1" />
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
