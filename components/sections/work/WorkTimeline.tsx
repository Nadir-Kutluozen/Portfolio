"use client";

import React, { useRef, useState, useEffect } from "react";
import { projects } from "@/data/projects";
import { motion, useMotionValue, useMotionValueEvent } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function WorkTimeline() {
    const carouselRef = useRef<HTMLDivElement>(null);
    const [dragWidth, setDragWidth] = useState(0);
    const x = useMotionValue(0);
    const [isScrolled, setIsScrolled] = useState(false);

    useMotionValueEvent(x, "change", (latest) => {
        setIsScrolled(latest < -10);
    });

    useEffect(() => {
        const updateWidth = () => {
            if (carouselRef.current) {
                setDragWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth);
            }
        };

        // Slight delay to ensure images/layout are ready
        setTimeout(updateWidth, 100);
        window.addEventListener("resize", updateWidth);
        return () => window.removeEventListener("resize", updateWidth);
    }, []);

    useEffect(() => {
        const el = carouselRef.current;
        if (!el) return;

        const onWheel = (e: WheelEvent) => {
            const isHorizontal = Math.abs(e.deltaX) > Math.abs(e.deltaY);
            const delta = isHorizontal ? e.deltaX : e.deltaY;

            if (delta !== 0) {
                let currentX = x.get();
                let newX = currentX - delta;

                // Do not trap scroll if we are at the boundaries
                if ((currentX === 0 && delta < 0) || (currentX <= -dragWidth && delta > 0)) {
                    return;
                }

                e.preventDefault();

                if (newX > 0) newX = 0;
                if (newX < -dragWidth) newX = -dragWidth;
                x.set(newX);
            }
        };

        el.addEventListener("wheel", onWheel, { passive: false });
        return () => el.removeEventListener("wheel", onWheel);
    }, [dragWidth, x]);

    // Sort projects by date descending
    const sortedProjects = [...projects].sort((a, b) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    return (
        <section
            className="position-relative py-5 d-flex flex-column justify-content-center"
            style={{ minHeight: '100vh', overflowX: 'hidden' }}
        >
            <div className="container py-3">
                <div className="mb-5">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                    >
                        <h2 className="display-6 fw-light mb-1 tracking-tight" style={{ letterSpacing: '0.15em', color: 'var(--foreground)' }}>Featured Work</h2>
                        <p className="mb-0" style={{ color: 'var(--text-secondary)', fontSize: '1.05rem' }}>A selection of my recent projects and experiments.</p>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
                >
                    <div
                        className="position-relative"
                        style={{
                            marginLeft: 'calc(50% - 50vw)',
                            marginRight: 'calc(50% - 50vw)'
                        }}
                    >
                        {/* Left Shadow */}
                        <div
                            className="position-absolute top-0 bottom-0"
                            style={{
                                left: 0,
                                width: '80px',
                                background: 'linear-gradient(to right, var(--background) 0%, transparent 100%)',
                                zIndex: 10,
                                opacity: isScrolled ? 1 : 0,
                                transition: 'opacity 0.3s ease',
                                pointerEvents: 'none'
                            }}
                        />

                        {/* Right Shadow */}
                        <div
                            className="position-absolute top-0 bottom-0"
                            style={{
                                right: 0,
                                width: '100px',
                                background: 'linear-gradient(to left, var(--background) 0%, transparent 100%)',
                                zIndex: 10,
                                pointerEvents: 'none'
                            }}
                        />

                        <motion.div
                            ref={carouselRef}
                            style={{
                                cursor: "grab",
                                paddingLeft: 'calc(50vw - 50%)',
                                paddingRight: 'calc(50vw - 50%)'
                            }}
                            whileTap={{ cursor: "grabbing" }}
                        >
                            <motion.div
                                drag="x"
                                style={{
                                    x,
                                    width: "max-content",
                                    paddingBottom: "0rem",
                                    paddingLeft: "1rem",
                                    paddingRight: "1rem"
                                }}
                                dragConstraints={{ right: 0, left: -dragWidth }}
                                dragElastic={0.15}
                                dragTransition={{ bounceStiffness: 100, bounceDamping: 20 }}
                                className="d-flex gap-3"
                            >
                                {sortedProjects.map((project) => (
                                    <motion.div
                                        key={project.id}
                                        className="d-flex flex-column"
                                        style={{
                                            width: '320px',
                                            backgroundColor: 'var(--background)',
                                            border: '1px solid rgba(125, 125, 125, 0.2)',
                                            borderRadius: '0px',
                                        }}
                                    >
                                        <div className="position-relative w-100" style={{ height: '180px', backgroundColor: 'var(--nav-bg)', borderBottom: '1px solid rgba(125, 125, 125, 0.2)' }}>
                                            {project.image && (
                                                <Image
                                                    src={project.image}
                                                    alt={project.title}
                                                    fill
                                                    className="object-fit-cover"
                                                    sizes="320px"
                                                    draggable={false}
                                                />
                                            )}
                                        </div>

                                        <div className="p-3 d-flex flex-column h-100">
                                            <div className="d-flex justify-content-between align-items-start mb-2">
                                                <h3 className="h6 fw-bold m-0" style={{ color: 'var(--foreground)' }}>{project.title}</h3>
                                                <span className="small fw-medium" style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>
                                                    {new Date(project.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}
                                                </span>
                                            </div>

                                            <p className="flex-grow-1" style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                                                {project.description}
                                            </p>

                                            <div className="d-flex flex-wrap gap-2 mb-3">
                                                {project.tags.map(tag => (
                                                    <span key={tag} className="px-2 py-1" style={{
                                                        fontSize: '0.7rem',
                                                        backgroundColor: 'var(--nav-bg)',
                                                        color: 'var(--foreground)',
                                                        border: '1px solid rgba(125,125,125,0.2)',
                                                        borderRadius: '0px'
                                                    }}>
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>

                                            <div className="d-flex align-items-center gap-2 mt-auto pt-3" style={{ borderTop: '1px solid rgba(125,125,125,0.2)' }}>
                                                <Link href={`/projects?id=${project.id}`} className="btn btn-sm d-flex align-items-center justify-content-center gap-2 flex-grow-1" style={{
                                                    backgroundColor: 'var(--foreground)',
                                                    color: 'var(--background)',
                                                    borderRadius: '0px',
                                                    fontWeight: 500,
                                                    border: '1px solid var(--foreground)'
                                                }}
                                                    draggable={false}
                                                >
                                                    Learn More <ArrowUpRight size={14} />
                                                </Link>
                                                {project.repoUrl && (
                                                    <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="btn btn-sm d-flex align-items-center justify-content-center" style={{
                                                        border: '1px solid rgba(125,125,125,0.2)',
                                                        color: 'var(--foreground)',
                                                        backgroundColor: 'transparent',
                                                        borderRadius: '0px',
                                                        width: '32px',
                                                        height: '32px',
                                                        padding: 0
                                                    }}
                                                        aria-label="Github Repo"
                                                        draggable={false}
                                                    >
                                                        <Github size={14} />
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
