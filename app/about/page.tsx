"use client";
import React, { useState } from "react";
import Image from "next/image";
import { motion, Variants, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Code, Cpu, Globe, Zap, Coffee, Layers, Database, Server, Smartphone, Layout, Box } from "lucide-react";
import { useTheme } from "@/context/ThemeProvider";
import { projects } from "@/data/projects";
import DynamicButton from "@/components/ui/DynamicButton";
import BlobAnimation from "@/components/animation/microanimation/BlobAnimation";
import CallToAction from "@/components/sections/cta/CallToAction";

export default function AboutPage() {
    const { theme } = useTheme();
    const [activeTab, setActiveTab] = useState(0);

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

    // Filter to only the projects in the resume
    const resumeProjects = projects.filter(p => ["Bandit Animation", "OpenHand", "Punchcard"].includes(p.title));

    const toolCategories = [
        {
            name: "Languages",
            items: [
                { n: "TypeScript", i: <Code size={16} /> },
                { n: "Python", i: <Code size={16} /> },
                { n: "Java", i: <Code size={16} /> },
                { n: "C", i: <Code size={16} /> },
                { n: "JavaScript", i: <Code size={16} /> },
                { n: "PHP", i: <Code size={16} /> },
                { n: "SQL", i: <Database size={16} /> }
            ]
        },
        {
            name: "Frameworks/Libraries",
            items: [
                { n: "React.js", i: <Globe size={16} /> },
                { n: "Next.js", i: <Globe size={16} /> },
                { n: "Node.js", i: <Server size={16} /> },
                { n: "FastAPI", i: <Zap size={16} /> },
                { n: "Tailwind", i: <Layout size={16} /> },
                { n: "Bootstrap", i: <Layout size={16} /> }
            ]
        },
        {
            name: "AI/ML",
            items: [
                { n: "PyTorch", i: <Cpu size={16} /> },
                { n: "SAEs", i: <Cpu size={16} /> },
                { n: "NumPy", i: <Box size={16} /> },
                { n: "Pandas", i: <Database size={16} /> },
                { n: "Computer Vision", i: <Cpu size={16} /> }
            ]
        },
        {
            name: "Tools/Databases",
            items: [
                { n: "PostgreSQL", i: <Database size={16} /> },
                { n: "MongoDB", i: <Database size={16} /> },
                { n: "SQLite", i: <Database size={16} /> },
                { n: "Firebase", i: <Database size={16} /> },
                { n: "AWS EC2", i: <Server size={16} /> },
                { n: "Vercel", i: <Server size={16} /> },
                { n: "GitHub", i: <Code size={16} /> }
            ]
        }
    ];

    return (
        <div className="min-vh-100 w-100 overflow-hidden pt-5" style={{ color: 'var(--foreground)' }}>

            <div className="container py-5 mt-5">
                {/* Header - Compact & Clean */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="d-flex align-items-baseline gap-3 mb-5"
                >
                    <h1 className="fw-light text-uppercase m-0 lh-1"
                        style={{
                            fontFamily: 'var(--font-couplin)',
                            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                            color: 'var(--foreground)',
                            letterSpacing: '0.15em'
                        }}>
                        About Nadir
                    </h1>
                    <span className="h5 opacity-50 fw-normal">/ Software Engineer & AI Researcher</span>
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
                        <div className="h-100 w-100 overflow-hidden position-relative shadow-sm" style={{ minHeight: '350px' }}>
                            <Image
                                src="/nadirk.jpg"
                                alt="Nadir Kutluozen"
                                fill
                                className="object-fit-cover"
                                style={{ filter: 'grayscale(10%) contrast(105%)' }}
                            />
                            <div className="position-absolute bottom-0 start-0 w-100 p-4"
                                style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)' }}>
                                <div className="badge px-3 py-2 text-uppercase tracking-wider fw-bold "
                                    style={{ backgroundColor: 'var(--accent)', color: '#000' }}>
                                    Based in NYC
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* 2. EXPERIENCE CARD (Top Right - Main content) */}
                    <motion.div variants={itemVariants} className="col-12 col-md-7 col-lg-8">
                        <div className="p-4 p-md-5 h-100 d-flex flex-column justify-content-center border border-secondary border-opacity-25 shadow-sm"
                            style={{ backgroundColor: 'var(--nav-bg)' }}>
                            <h2 className="fs-3 fw-light mb-4 text-uppercase" style={{ letterSpacing: '0.05em' }}>Experience</h2>

                            <div className="mb-4">
                                <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center mb-1">
                                    <h3 className="fs-5 fw-bold mb-0">Cold Spring Harbor Laboratory</h3>
                                    <span className="opacity-50 small fw-bold mt-1 mt-sm-0 text-uppercase tracking-widest">1/2026 – Present</span>
                                </div>
                                <p className="opacity-75 mb-2 fw-medium" style={{ color: 'var(--accent)' }}>Research Intern (AI / Mechanistic Interpretability)</p>
                                <ul className="opacity-90 small mb-0 ps-3 lh-lg">
                                    <li className="mb-1">Applied Sparse Autoencoders (SAEs) to analyze transformer activations and extracted interpretable feature directions.</li>
                                    <li className="mb-1">Investigated feature stability, sparsity, and representation structure in large language models.</li>
                                    <li>Built internal analysis and visualization tools to evaluate feature convergence and interpretability metrics.</li>
                                </ul>
                            </div>

                            <div>
                                <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center mb-1">
                                    <h3 className="fs-5 fw-bold mb-0">Domino Media</h3>
                                    <span className="opacity-50 small fw-bold mt-1 mt-sm-0 text-uppercase tracking-widest">2/2022 – 3/2025</span>
                                </div>
                                <p className="opacity-75 mb-2 fw-medium" style={{ color: 'var(--accent)' }}>Web Developer</p>
                                <ul className="opacity-90 small mb-0 ps-3 lh-lg">
                                    <li className="mb-1">Developed and launched custom websites for restaurants and local businesses using PHP-based custom themes.</li>
                                    <li className="mb-1">Implemented SEO optimization strategies and performance improvements to enhance search visibility and site speed.</li>
                                    <li>Designed internal tools and managed deployments to streamline workflows and ensure reliable client delivery.</li>
                                </ul>
                            </div>
                        </div>
                    </motion.div>

                    {/* 3. EDUCATION & CERTS (Middle Left) */}
                    <motion.div variants={itemVariants} className="col-12 col-md-6">
                        <div className="p-4 h-100 border border-secondary border-opacity-25 shadow-sm position-relative overflow-hidden"
                            style={{ backgroundColor: 'var(--nav-bg)', borderLeftWidth: '4px', borderLeftColor: 'var(--accent)' }}>

                            <div className="d-flex align-items-center gap-2 mb-4">
                                <span className="position-relative d-flex h-3 w-3">
                                    <span className="animate-ping position-absolute d-inline-flex h-100 w-100 rounded-circle opacity-75" style={{ backgroundColor: 'var(--accent)' }}></span>
                                    <span className="position-relative d-inline-flex rounded-circle h-3 w-3" style={{ width: '10px', height: '10px', backgroundColor: 'var(--accent)' }}></span>
                                </span>
                                <span className="text-uppercase x-small fw-bold tracking-widest opacity-50">Education & Certifications</span>
                            </div>

                            <div className="mb-4">
                                <h4 className="fs-6 fw-bold mb-1">Farmingdale State College</h4>
                                <p className="opacity-75 small mb-0">B.S. Computer Science Exp. <><small className="opacity-50 ms-1">May 2026</small></></p>
                            </div>

                            <div className="mb-4">
                                <h4 className="fs-6 fw-bold mb-1">Nassau Community College</h4>
                                <p className="opacity-75 small mb-0">A.S. Computer Science <small className="opacity-50 ms-1">Dec 2023</small></p>
                            </div>

                            <hr className="border-secondary border-opacity-25 my-4" />

                            <div>
                                <h4 className="fs-6 fw-bold mb-2">Certifications</h4>
                                <ul className="opacity-75 small mb-0 ps-3 lh-lg">
                                    <li>React & TypeScript The Practical Guide <small className="opacity-50 ms-1">2025</small></li>
                                    <li>Learning GitHub and IntelliJ IDEA <small className="opacity-50 ms-1">2025</small></li>
                                </ul>
                            </div>
                        </div>
                    </motion.div>

                    {/* 4. TECH STACK (Middle Right - Tabbed Info) */}
                    <motion.div variants={itemVariants} className="col-12 col-md-6">
                        <div className="p-4 h-100 d-flex flex-column border border-secondary border-opacity-25 shadow-sm "
                            style={{ backgroundColor: 'var(--nav-bg)' }}>
                            <div className="d-flex align-items-center justify-content-between mb-4">
                                <span className="text-uppercase x-small fw-bold tracking-widest opacity-50">Toolkit & Skills</span>
                                <Cpu size={18} className="opacity-50" />
                            </div>

                            {/* Tabs Navigation */}
                            <div className="d-flex flex-wrap gap-2 mb-4 pb-3 border-bottom border-secondary border-opacity-25">
                                {toolCategories.map((cat, idx) => (
                                    <DynamicButton
                                        key={idx}
                                        onClick={() => setActiveTab(idx)}
                                        className={`btn btn-sm px-3 py-1 fw-bold transition-all`}
                                        style={{
                                            fontSize: '0.75rem',
                                            borderRadius: '0px',
                                            textTransform: 'uppercase',
                                            letterSpacing: '0.05em',
                                            backgroundColor: activeTab === idx ? 'var(--foreground)' : 'transparent',
                                            color: activeTab === idx ? 'var(--background)' : 'var(--foreground)',
                                            border: '1px solid',
                                            borderColor: activeTab === idx ? 'var(--foreground)' : 'transparent',
                                            opacity: activeTab === idx ? 1 : 0.6
                                        }}
                                    >
                                        {cat.name}
                                    </DynamicButton>
                                ))}
                            </div>

                            {/* Tab Content Display */}
                            <div className="flex-grow-1 position-relative">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={activeTab}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.2 }}
                                        className="d-grid gap-3"
                                        style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))' }}
                                    >
                                        {toolCategories[activeTab].items.map((t, idx) => (
                                            <div key={idx} className="d-flex align-items-center gap-2 p-2 bg-body bg-opacity-10 border border-secondary border-opacity-10 ">
                                                <span style={{ color: 'var(--accent)' }}>{t.i}</span>
                                                <span className="small fw-bold">{t.n}</span>
                                            </div>
                                        ))}
                                    </motion.div>
                                </AnimatePresence>
                            </div>

                            <div className="mt-4 pt-3 border-top border-secondary border-opacity-25">
                                <p className="small opacity-50 mb-0">
                                    <strong style={{ color: 'var(--foreground)' }}>Research Practices:</strong> Data pipelines, Agile/Scrum, CI/CD, Unit testing, Dataset cleaning/manipulation.
                                </p>
                            </div>

                        </div>
                    </motion.div>

                    {/* 5. PROJECTS (Bottom Row addition - List View) */}
                    <motion.div variants={itemVariants} className="col-12">
                        <div className="p-4 p-md-5 border border-secondary border-opacity-25 shadow-sm "
                            style={{ backgroundColor: 'var(--nav-bg)' }}>
                            <div className="d-flex flex-column flex-sm-row align-items-sm-center justify-content-between mb-4 pb-3 border-bottom border-secondary border-opacity-25">
                                <h2 className="fs-3 fw-light text-uppercase mb-3 mb-sm-0" style={{ letterSpacing: '0.05em' }}>Featured Work</h2>
                                <DynamicButton
                                    href="/projects"
                                    style={{ borderRadius: '0px', color: 'var(--foreground)' }}
                                    className="btn btn-sm fw-bold d-flex align-items-center justify-content-center px-4 "
                                >
                                    View All Projects <ArrowUpRight size={16} className="ms-2" />
                                </DynamicButton>
                            </div>

                            <div className="d-flex flex-column gap-3">
                                {resumeProjects.map((project, idx) => (
                                    <div key={idx} className="p-3 border border-secondary border-opacity-10 d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3 rounded-1 transition-all hover-scale cursor-pointer"
                                        style={{ background: 'rgba(255,255,255,0.02)' }}>
                                        <div className="d-flex flex-column gap-1">
                                            <div className="d-flex align-items-center gap-2">
                                                <h3 className="fs-5 fw-bold m-0">{project.title}</h3>
                                                <span className="opacity-50 small text-uppercase tracking-widest"> <small className="opacity-50 ms-1">{project.date}</small></span>
                                            </div>
                                            <p className="opacity-75 small m-0" style={{ maxWidth: '600px' }}>{project.description}</p>
                                        </div>

                                        <div className="d-flex align-items-center gap-2 flex-wrap justify-content-md-end">
                                            {project.tags.slice(0, 2).map((tag, tIdx) => (
                                                <span key={tIdx} className="badge  bg-opacity-10 border border-secondary border-opacity-25  py-1 px-2 fw-normal " style={{ fontSize: '0.7rem', color: 'var(--foreground)', borderRadius: '0px' }}>
                                                    {tag}
                                                </span>
                                            ))}
                                            <DynamicButton
                                                href="/projects"
                                                className="btn  opacity-50 opacity-100-hover p-1 d-flex align-items-center ms-2"
                                                style={{ border: 'none', backgroundColor: 'var(--accent)', color: 'var(--nav-bg)', borderRadius: '0px' }}
                                                title="Learn More"
                                            >
                                                <ArrowUpRight size={20} />
                                            </DynamicButton>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* 6. CTA Footer (Bottom - Full Width) */}
                    <motion.div variants={itemVariants} className="col-12 mt-5">
                        <CallToAction title="Did you have something in mind?" description="Let's connect and dicsuss how I can help you." buttonTitle="Connect Me" buttonLink="/contact" />
                    </motion.div>

                </motion.div>
            </div>
        </div>
    );
}
