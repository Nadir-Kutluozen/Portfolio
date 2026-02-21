"use client";

import React, { useRef, useState, useEffect } from "react";
import { projects } from "@/data/projects";
import { motion, useMotionValue, useMotionValueEvent } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import PixelTransition from "@/components/animation/microanimation/PixelTransition";

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
            className="position-relative d-flex flex-column"
            style={{ height: '100vh', overflowX: 'hidden' }}
        >
            <style dangerouslySetInnerHTML={{
                __html: `
                .timeline-card {
                    aspect-ratio: 1 / 1.05;
                }
                @media (max-width: 768px) {
                    .timeline-card {
                        aspect-ratio: auto !important;
                        width: 85vw !important;
                    }
                }
            `}} />
            {/* Top 30% Header Area */}
            <div className="container d-flex flex-column justify-content-end pb-4" style={{ height: '30vh' }}>
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                >
                    <h2 className="fw-light mb-1 text-uppercase" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', letterSpacing: '0.15em', color: 'var(--foreground)' }}>
                        Selected Works
                    </h2>

                </motion.div>
            </div>

            {/* Bottom 70% Carousel Area */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
                style={{ height: '70vh' }}
                className="w-100"
            >
                <div
                    className="position-relative h-100 w-100"
                >
                    {/* Left Shadow */}
                    <div
                        className="position-absolute top-0 bottom-0"
                        style={{
                            left: 0,
                            width: '40px',
                            background: 'linear-gradient(to right, var(--background) 0%, transparent 100%)',
                            zIndex: 10,
                            opacity: isScrolled ? 0.4 : 0,
                            transition: 'opacity 0.3s ease',
                            pointerEvents: 'none'
                        }}
                    />

                    {/* Right Shadow */}
                    <div
                        className="position-absolute top-0 bottom-0"
                        style={{
                            right: 0,
                            width: '40px',
                            background: 'linear-gradient(to left, var(--background) 0%, transparent 100%)',
                            zIndex: 10,
                            opacity: 0.4,
                            pointerEvents: 'none'
                        }}
                    />

                    <motion.div
                        ref={carouselRef}
                        className="h-100 w-100 overflow-hidden"
                        style={{
                            cursor: "grab",
                        }}
                        whileTap={{ cursor: "grabbing" }}
                    >
                        <motion.div
                            drag="x"
                            className="h-100 d-flex align-items-stretch"
                            style={{
                                x,
                                width: "max-content",
                            }}
                            dragConstraints={{ right: 0, left: -dragWidth }}
                            dragElastic={0.15}
                            dragTransition={{ bounceStiffness: 100, bounceDamping: 20 }}
                        >
                            {/* The projects array is mapped to create the massive flush cards */}
                            {sortedProjects.map((project, index) => (
                                <motion.div
                                    key={project.id}
                                    className="d-flex flex-column position-relative overflow-hidden group timeline-card"
                                    style={{
                                        height: '100%',
                                        backgroundColor: 'var(--nav-bg)',
                                        borderRight: index === sortedProjects.length - 1 ? 'none' : '1px solid rgba(125, 125, 125, 0.2)',
                                        borderTop: '1px solid rgba(125, 125, 125, 0.2)',
                                        borderBottom: 'none',
                                        borderRadius: '0px',
                                        flexShrink: 0
                                    }}
                                >
                                    {/* Massive Image Background Covering the Card with Pixel Transition */}
                                    <PixelTransition
                                        gridSize={10}
                                        pixelColor="var(--foreground)"
                                        animationStepDuration={0.3}
                                        aspectRatio="0"
                                        className="position-absolute w-100 h-100 top-0 start-0 z-0"
                                        firstContent={
                                            <div className="w-100 h-100 position-relative">
                                                {(project.image) && (
                                                    <Image
                                                        src={project.homepageimage || project.image}
                                                        alt={project.title}
                                                        fill
                                                        className="object-fit-cover "
                                                        sizes="(max-width: 768px) 92vw, 850px"
                                                        draggable={false}
                                                        style={{ filter: 'grayscale(10%)' }}
                                                    />
                                                )}
                                                {/* Overlay gradient so text is readable */}
                                                <div className="position-absolute w-100 h-100 top-0 start-0" style={{
                                                    background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 40%)',
                                                    opacity: 1
                                                }} />
                                            </div>
                                        }
                                        secondContent={
                                            <div className="w-100 h-100 d-flex align-items-center justify-content-center" style={{ backgroundColor: 'var(--foreground)' }}>
                                                <h3 className="display-3 fw-bold text-uppercase m-0 text-center px-4" style={{ color: 'var(--background)' }}>
                                                    {project.title}
                                                </h3>
                                            </div>
                                        }
                                    />

                                    {/* Content Area overlaying the bottom of the card */}
                                    <div className="mt-auto position-relative z-1 d-flex flex-column text-white h-100 justify-content-end p-0" style={{ pointerEvents: 'none' }}>


                                        <div className="d-flex w-100" style={{ pointerEvents: 'auto' }}>
                                            <Link href={`/projects?id=${project.id}`} className="btn text-uppercase tracking-wider fw-medium d-inline-flex align-items-center justify-content-center m-0" style={{
                                                backgroundColor: 'var(--foreground)',
                                                color: 'var(--background)',
                                                borderRadius: '0px',
                                                border: 'none',
                                                fontSize: '1.1rem',
                                                padding: '1.5rem 3rem',
                                            }}
                                                draggable={false}
                                            >
                                                Learn More <ArrowUpRight size={22} className="ms-2" />
                                            </Link>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
}
