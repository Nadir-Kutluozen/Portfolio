"use client";
import React from "react";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { ArrowUpRight, Code, Cpu, Globe, Zap, Coffee, Layers } from "lucide-react";
import { useTheme } from "@/context/ThemeProvider";

export default function AboutPage() {
    const { theme } = useTheme();

    // Staggered animation variants for grid items
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    };

    return (
        <div className="min-vh-100 w-100 overflow-hidden pt-5" style={{ color: 'var(--foreground)' }}>

            <div className="container py-5 mt-5">
                {/* Header - Compact & Clean */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="d-flex align-items-baseline gap-3 mb-5"
                >
                    <h1 className="fw-bold text-uppercase m-0 lh-1"
                        style={{
                            fontFamily: 'var(--font-couplin)',
                            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                            color: 'var(--foreground)'
                        }}>
                        About Nadir
                    </h1>
                    <span className="h5 opacity-50 fw-normal">/ Creative Technologist</span>
                </motion.div>

                {/* BENTO GRID */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="row g-3 g-md-4"
                >
                    {/* 1. PHOTO CARD (Top Left - Visual Anchor) */}
                    <motion.div variants={itemVariants} className="col-12 col-md-5 col-lg-4">
                        <div className="h-100 w-100 rounded-3 overflow-hidden position-relative shadow-sm" style={{ minHeight: '350px' }}>
                            <Image
                                src="/nadirk.jpg"
                                alt="Nadir Kutluozen"
                                fill
                                className="object-fit-cover"
                                style={{ filter: 'grayscale(10%) contrast(105%)' }}
                            />
                            <div className="position-absolute bottom-0 start-0 w-100 p-4"
                                style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)' }}>
                                <div className="badge rounded-pill px-3 py-2 text-uppercase tracking-wider fw-bold"
                                    style={{ backgroundColor: 'var(--accent)', color: '#000' }}>
                                    Based in NYC
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* 2. BIO CARD (Top Right - Main content) */}
                    <motion.div variants={itemVariants} className="col-12 col-md-7 col-lg-8">
                        <div className="p-4 p-md-5 h-100 rounded-3 d-flex flex-column justify-content-center border border-secondary border-opacity-25 shadow-sm"
                            style={{ backgroundColor: 'var(--nav-bg)' }}>
                            <h2 className="fs-3 fw-bold mb-3">Code as Craft.</h2>
                            <p className="lead fs-5 opacity-90 mb-3">
                                I'm a Full Stack Developer who believes that software should feel as good as it looks.
                                My work bridges the gap between robust engineering and fluid, artistic design.
                            </p>
                            <p className="opacity-75 mb-0">
                                I specialize in building high-performance web applications using the modern React ecosystem.
                                Whether it's 3D visualizations with Three.js or complex state management, I obsess over the details that make digital products feel "alive."
                            </p>
                        </div>
                    </motion.div>

                    {/* 3. "NOW" CARD (Middle Left - Status) */}
                    <motion.div variants={itemVariants} className="col-12 col-md-6">
                        <div className="p-4 h-100 rounded-3 border border-secondary border-opacity-25 shadow-sm position-relative overflow-hidden"
                            style={{ backgroundColor: 'var(--nav-bg)' }}>

                            <div className="d-flex align-items-center gap-2 mb-3">
                                <span className="position-relative d-flex h-3 w-3">
                                    <span className="animate-ping position-absolute d-inline-flex h-100 w-100 rounded-circle opacity-75" style={{ backgroundColor: 'var(--accent)' }}></span>
                                    <span className="position-relative d-inline-flex rounded-circle h-3 w-3" style={{ width: '10px', height: '10px', backgroundColor: 'var(--accent)' }}></span>
                                </span>
                                <span className="text-uppercase x-small fw-bold tracking-widest opacity-50">Right Now</span>
                            </div>

                            <h3 className="fs-4 fw-bold mb-2">Building Agentic Workflows</h3>
                            <p className="opacity-75 mb-4 text-justify small">
                                Exploring the frontiers of AI-assisted development. Currently building a system for automated component generation and "smart" UI adaptability.
                            </p>

                            <div className="d-flex gap-2">
                                <span className="badge bg-body bg-opacity-10 border border-secondary border-opacity-25 text-body py-2 px-3 rounded-pill fw-normal">RAG Systems</span>
                                <span className="badge bg-body bg-opacity-10 border border-secondary border-opacity-25 text-body py-2 px-3 rounded-pill fw-normal">Generative UI</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* 4. TECH STACK (Middle Right - Dense Info) */}
                    <motion.div variants={itemVariants} className="col-12 col-md-6">
                        <div className="p-4 h-100 rounded-3 border border-secondary border-opacity-25 shadow-sm"
                            style={{ backgroundColor: 'var(--nav-bg)' }}>
                            <div className="d-flex align-items-center justify-content-between mb-4">
                                <span className="text-uppercase x-small fw-bold tracking-widest opacity-50">Toolkit</span>
                                <Cpu size={18} className="opacity-50" />
                            </div>

                            <div className="d-grid grid-cols-2 gap-3" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))' }}>
                                {[
                                    { n: "Next.js", i: <Globe size={16} /> },
                                    { n: "React", i: <Code size={16} /> },
                                    { n: "Three.js", i: <Layers size={16} /> },
                                    { n: "Tailwind", i: <Zap size={16} /> },
                                    { n: "TypeScript", i: <Code size={16} /> },
                                    { n: "Node.js", i: <Coffee size={16} /> }
                                ].map((t, idx) => (
                                    <div key={idx} className="d-flex align-items-center gap-2 p-2 rounded-2 bg-body bg-opacity-10 border border-secondary border-opacity-10">
                                        <span style={{ color: 'var(--accent)' }}>{t.i}</span>
                                        <span className="small fw-bold">{t.n}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* 5. CTA Footer (Bottom - Full Width) */}
                    <motion.div variants={itemVariants} className="col-12">
                        <div className="p-5 rounded-3 border border-secondary border-opacity-25 shadow-sm text-center d-flex flex-column align-items-center justify-content-center overflow-hidden position-relative"
                            style={{
                                backgroundColor: 'var(--nav-bg)',
                                minHeight: '250px'
                            }}>
                            {/* Ambient Background Glow */}
                            <div className="position-absolute top-50 start-50 translate-middle w-50 h-50 rounded-circle opacity-20"
                                style={{ backgroundColor: 'var(--accent)', filter: 'blur(80px)' }}></div>

                            <div className="z-1 position-relative">
                                <h2 className="display-5 fw-bold text-uppercase mb-3" style={{ fontFamily: 'var(--font-couplin)' }}>
                                    Got a Vision?
                                </h2>
                                <p className="lead opacity-75 mb-4">Let's turn that idea into a digital reality.</p>
                                <a href="mailto:nadir@example.com"
                                    className="btn btn-lg rounded-pill px-5 py-3 fw-bold text-uppercase tracking-wider hover-scale shadow-lg border-0"
                                    style={{ backgroundColor: 'var(--accent)', color: '#000' }}>
                                    Let's Talk <ArrowUpRight className="ms-2" size={20} />
                                </a>
                            </div>
                        </div>
                    </motion.div>

                </motion.div>
            </div>
        </div>
    );
}
