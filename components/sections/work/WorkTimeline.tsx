"use client";

import React, { useRef, useState, useEffect } from "react";
import { projects } from "@/data/projects";
import { motion, useMotionValue, useMotionValueEvent, useSpring } from "framer-motion";
import { ArrowUpRight, Github, MoveHorizontal } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import PixelTransition from "@/components/animation/microanimation/PixelTransition";

export default function WorkTimeline() {
    const carouselRef = useRef<HTMLDivElement>(null);
    const [dragWidth, setDragWidth] = useState(0);
    const x = useMotionValue(0);
    const [isScrolled, setIsScrolled] = useState(false);
    const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});
    const [isDragging, setIsDragging] = useState(false);

    // Custom Cursor State
    const [isHovering, setIsHovering] = useState(false);
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    // Smooth cursor movement
    const springConfig = { damping: 28, stiffness: 400, mass: 0.5 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
        };

        window.addEventListener('mousemove', moveCursor);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
        };
    }, [cursorX, cursorY]);

    useMotionValueEvent(x, "change", (latest) => {
        setIsScrolled(latest < -10);
    });

    const innerCarouselRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const updateWidth = () => {
            if (carouselRef.current && innerCarouselRef.current) {
                setDragWidth(innerCarouselRef.current.scrollWidth - carouselRef.current.offsetWidth);
            }
        };

        updateWidth();
        window.addEventListener("resize", updateWidth);

        // Robust tracking of the inner max-content width using ResizeObserver
        let observer: ResizeObserver | null = null;
        if (innerCarouselRef.current) {
            observer = new ResizeObserver(() => updateWidth());
            observer.observe(innerCarouselRef.current);
        }

        return () => {
            window.removeEventListener("resize", updateWidth);
            if (observer) observer.disconnect();
        };
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

    // Track mobile to reduce pixel complexity
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth <= 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

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

            {/* Custom Drag Cursor */}
            <motion.div
                className="position-fixed d-none d-lg-flex align-items-center justify-content-center flex-column shadow-lg"
                style={{
                    left: 0,
                    top: 0,
                    width: '90px',
                    height: '90px',
                    backgroundColor: 'var(--foreground)',
                    color: 'var(--background)',
                    x: cursorXSpring,
                    y: cursorYSpring,
                    marginLeft: '-45px',
                    marginTop: '-45px',
                    opacity: isHovering ? 1 : 0,
                    scale: isHovering ? 1 : 0.5,
                    pointerEvents: 'none',
                    zIndex: 9999,
                }}
            >
                <MoveHorizontal size={24} className="mb-1" />
                <span className="fw-light text-uppercase" style={{ letterSpacing: '0.1em', fontSize: '0.9rem' }}>Drag</span>
            </motion.div>

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
                            width: '10px',
                            background: 'linear-gradient(to right, rgba(255, 255, 255, 0.1) 0%, transparent 100%)',
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
                            width: '10px',
                            background: 'linear-gradient(to left, rgba(255, 255, 255, 0.1) 0%, transparent 100%)',
                            zIndex: 10,
                            opacity: 0.4,
                            pointerEvents: 'none'
                        }}
                    />

                    <motion.div
                        ref={carouselRef}
                        className="h-100 w-100 overflow-hidden"
                        style={{
                            cursor: "none",
                            touchAction: "pan-y"
                        }}
                        whileTap={{ cursor: "none" }}
                        onMouseEnter={() => setIsHovering(true)}
                        onMouseLeave={() => setIsHovering(false)}
                    >
                        <motion.div
                            ref={innerCarouselRef}
                            drag="x"
                            dragDirectionLock={true}
                            onDragStart={() => setIsDragging(true)}
                            onDragEnd={() => {
                                setTimeout(() => setIsDragging(false), 150);
                            }}
                            className="h-100 d-flex align-items-stretch"
                            style={{
                                x,
                                width: "max-content",
                            }}
                            dragConstraints={{ right: 0, left: -dragWidth }}
                            dragElastic={0.2}
                            dragTransition={{ bounceStiffness: 100, bounceDamping: 20 }}
                        >
                            {/* The projects array is mapped to create the massive flush cards */}
                            {sortedProjects.map((project, index) => (
                                <Link
                                    href={`/projects?id=${project.id}`}
                                    onClick={(e) => {
                                        if (isDragging) {
                                            e.preventDefault();
                                        }
                                    }}
                                    key={project.id}
                                    className="text-decoration-none"
                                    style={{ flexShrink: 0, display: 'block', height: '100%', cursor: 'none' }}
                                    draggable={false}
                                >
                                    <motion.div
                                        className="d-flex flex-column position-relative overflow-hidden group timeline-card"
                                        style={{
                                            height: '100%',
                                            backgroundColor: 'var(--nav-bg)',
                                            borderRight: index === sortedProjects.length - 1 ? 'none' : '1px solid rgba(125, 125, 125, 0.2)',
                                            borderTop: '1px solid rgba(125, 125, 125, 0.2)',
                                            borderBottom: 'none',
                                            borderRadius: '0px',
                                        }}
                                    >
                                        {/* Massive Image Background Covering the Card with Pixel Transition */}
                                        <PixelTransition
                                            gridSize={isMobile ? 0 : 10}
                                            pixelColor="var(--foreground)"
                                            animationStepDuration={0.15}
                                            aspectRatio="0"
                                            className="position-absolute w-100 h-100 top-0 start-0 z-0"
                                            firstContent={
                                                <div className="w-100 h-100 position-relative">

                                                    {project.animatedIcon ? (
                                                        <div className="w-100 h-100 d-flex align-items-center justify-content-center">
                                                            <project.animatedIcon />
                                                        </div>
                                                    ) : project.image && !imageErrors[project.id] ? (
                                                        <Image
                                                            src={project.homepageimage || project.image}
                                                            alt={project.title}
                                                            fill
                                                            className="object-fit-cover"
                                                            sizes="(max-width: 768px) 92vw, 850px"
                                                            draggable={false}
                                                            style={{ filter: 'grayscale(10%)' }}
                                                            onError={() => setImageErrors(prev => ({ ...prev, [project.id]: true }))}
                                                        />
                                                    ) : null}
                                                    {/* Overlay gradient so text is readable */}
                                                    <div className="position-absolute w-100 h-100 top-0 start-0" style={{
                                                        background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 40%)',
                                                        opacity: 1
                                                    }} />
                                                </div>
                                            }
                                            secondContent={
                                                <div className="w-100 h-100 d-flex align-items-center justify-content-center" style={{ backgroundColor: 'var(--foreground)' }}>
                                                    <h3 className="display-6 fw-light text-uppercase m-0 text-center px-4" style={{ color: 'var(--background)', letterSpacing: '0.1em' }}>
                                                        {project.title}
                                                    </h3>
                                                </div>
                                            }
                                        />

                                        {/* Content Area overlaying the bottom of the card */}
                                        <div className="mt-auto position-relative z-1 d-flex flex-column text-white h-100 justify-content-end p-0" style={{ pointerEvents: 'none' }}>
                                            {/* Button removed since the whole card is now clickable */}
                                        </div>
                                    </motion.div>
                                </Link>
                            ))}
                        </motion.div>
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
}
