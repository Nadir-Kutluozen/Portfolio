"use client";

import React, { useState, useEffect, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "@/data/projects";
import { ArrowUpRight, Github, Menu, X, Calendar, User, Code } from "lucide-react";
import ProjectSidebar from "@/components/ui/ProjectSidebar";
import MobileProjectSlider from "@/components/ui/MobileProjectSlider";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

function ProjectsContent() {
    const searchParams = useSearchParams();
    const initialId = searchParams.get("id");
    const [selectedId, setSelectedId] = useState(initialId || projects[0].id);

    // Update selectedId if URL changes (optional, but good for back/forward)
    useEffect(() => {
        const id = searchParams.get("id");
        if (id && projects.find(p => p.id === id)) {
            setSelectedId(id);
        }
    }, [searchParams]);

    const activeProject = projects.find((p) => p.id === selectedId) || projects[0];

    return (
        <div
            className="d-flex flex-column"
            style={{
                height: '100vh',
                width: '100vw',
                overflow: 'hidden',
                color: 'var(--foreground)',
                transition: 'background-color 0.3s ease, color 0.3s ease'
            }}
        >
            {/* Mobile Project Slider (Sticky Bottom) */}
            <MobileProjectSlider selectedId={selectedId} setSelectedId={setSelectedId} />

            {/* Main Content Area */}
            {/* Use padding top to accommodate fixed navbar without pushing layout bounds */}
            <div className="container-fluid flex-grow-1 d-flex p-0 overflow-hidden position-relative" style={{ paddingTop: '80px' }}>
                <div className="row g-0 w-100 h-100">

                    {/* LEFT SIDEBAR: Navigation (Desktop Only) */}
                    <ProjectSidebar selectedId={selectedId} setSelectedId={setSelectedId} />

                    {/* RIGHT CONTENT: Scrollable Details */}
                    <div
                        className="col-12 col-lg-10 h-100 overflow-y-auto no-scrollbar"
                        onScroll={(e) => {
                            // Dispatch a custom event for the Navbar to listen to, since window won't scroll
                            window.dispatchEvent(new CustomEvent('projectScroll', {
                                detail: e.currentTarget.scrollTop
                            }));
                        }}
                    >
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeProject.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                                className="w-100 min-h-100 p-3 p-lg-5 pt-5 mt-5 pt-md-5 mt-md-5 pt-lg-5 mt-lg-5"
                                style={{ paddingBottom: '100px' }}
                            >
                                <div className="container-lg mx-auto" style={{ maxWidth: '1400px' }}>

                                    {/* MASSIVE TITLE */}
                                    <div className="mb-5">
                                        <h1 className="fw-light text-uppercase lh-1 mb-3"
                                            style={{
                                                letterSpacing: '0.15em',
                                                fontSize: 'clamp(2.5rem, 6vw, 5rem)',
                                            }}>
                                            {activeProject.title}
                                        </h1>
                                        <p className="fs-5 mb-0" style={{ maxWidth: '800px', color: 'var(--text-secondary)', lineHeight: '1.6', fontWeight: 300 }}>
                                            {activeProject.description}
                                        </p>
                                    </div>

                                    {/* BENTO GRID LAYOUT */}
                                    <div className="row g-4">

                                        {/* 1. MEDIA BLOCK (Large, spans full width or large portion) */}
                                        <div className="col-12 col-xl-8">
                                            <div className="w-100 overflow-hidden position-relative d-flex align-items-center justify-content-center" style={{ height: '100%', border: '1px solid rgba(125, 125, 125, 0.2)', backgroundColor: 'var(--nav-bg)' }}>

                                                <Image
                                                    src={activeProject.image}
                                                    alt={activeProject.title}
                                                    fill
                                                    style={{ objectFit: 'contain' }}
                                                />

                                            </div>
                                        </div>

                                        {/* 2. ACTIONS & DETAILS BLOCK (Side column) */}
                                        <div className="col-12 col-xl-4 d-flex flex-column gap-4">

                                            {/* Action Buttons */}
                                            <div className="p-4 d-flex flex-column gap-2 justify-content-center" style={{ backgroundColor: 'var(--nav-bg)', border: '1px solid rgba(125, 125, 125, 0.2)' }}>
                                                <a href={activeProject.link} target="_blank" className="btn d-flex align-items-center justify-content-center gap-2 fw-medium tracking-wider w-100" style={{ borderRadius: '0px', backgroundColor: 'var(--foreground)', color: 'var(--background)', padding: '0.75rem 1.5rem', border: '1px solid var(--foreground)' }}>
                                                    View Live <ArrowUpRight size={18} />
                                                </a>
                                                {activeProject.repoUrl && (
                                                    <a href={activeProject.repoUrl} target="_blank" className="btn d-flex align-items-center justify-content-center gap-2 fw-medium tracking-wider w-100" style={{ borderRadius: '0px', backgroundColor: 'transparent', color: 'var(--foreground)', padding: '0.75rem 1.5rem', border: '1px solid rgba(125, 125, 125, 0.2)' }}>
                                                        <Github size={18} /> View Code
                                                    </a>
                                                )}
                                            </div>

                                            {/* Stats / Info */}
                                            <div className="p-4 flex-grow-1 d-flex flex-column justify-content-center gap-4" style={{ backgroundColor: 'var(--nav-bg)', border: '1px solid rgba(125, 125, 125, 0.2)' }}>
                                                <div className="d-flex align-items-center gap-3">
                                                    <div className="p-2 " style={{ color: 'var(--foreground)' }}>
                                                        <Calendar size={24} className="opacity-75" />
                                                    </div>
                                                    <div>
                                                        <span className="d-block text-uppercase x-small opacity-50 fw-medium" style={{ letterSpacing: '0.1em' }}>Timeline</span>
                                                        <span className="fw-medium font-monospace" style={{ color: 'var(--foreground)' }}>{activeProject.date}</span>
                                                    </div>
                                                </div>
                                                <div className="d-flex align-items-center gap-3">
                                                    <div className="p-2" style={{ color: 'var(--foreground)' }}>
                                                        <User size={24} className="opacity-75" />
                                                    </div>
                                                    <div>
                                                        <span className="d-block text-uppercase x-small opacity-50 fw-medium" style={{ letterSpacing: '0.1em' }}>Role</span>
                                                        <span className="fw-medium font-monospace" style={{ color: 'var(--foreground)' }}>Full Stack Developer</span>
                                                    </div>
                                                </div>
                                                <div className="d-flex align-items-center gap-3">
                                                    <div className="p-2" style={{ color: 'var(--foreground)' }}>
                                                        <Code size={24} className="opacity-75" />
                                                    </div>
                                                    <div>
                                                        <span className="d-block text-uppercase x-small opacity-50 fw-medium" style={{ letterSpacing: '0.1em' }}>Type</span>
                                                        <span className="fw-medium font-monospace" style={{ color: 'var(--foreground)' }}>Web Application</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* 3. ABOUT BLOCK */}
                                        <div className="col-12 col-lg-7">
                                            <div className="p-4 p-md-5 h-100" style={{ backgroundColor: 'var(--nav-bg)', border: '1px solid rgba(125, 125, 125, 0.2)' }}>
                                                <h3 className="fw-light text-uppercase mb-4" style={{ letterSpacing: '0.1em', color: 'var(--foreground)' }}>About the Project</h3>
                                                <div className="fs-6" style={{ lineHeight: '1.8', color: 'var(--text-secondary)' }}>
                                                    {activeProject.longDescription ? (
                                                        <div dangerouslySetInnerHTML={{ __html: activeProject.longDescription }} />
                                                    ) : (
                                                        <p>{activeProject.description}</p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        {/* 4. TECH STACK BLOCK */}
                                        <div className="col-12 col-lg-5">
                                            <div className="p-4 p-md-5 h-100" style={{ backgroundColor: 'var(--nav-bg)', border: '1px solid rgba(125, 125, 125, 0.2)' }}>
                                                <h3 className="fw-light text-uppercase mb-4" style={{ letterSpacing: '0.1em', color: 'var(--foreground)' }}>Technologies</h3>
                                                <div className="d-flex flex-wrap gap-2">
                                                    {activeProject.technologies.map((tech, i) => (
                                                        <div key={i} className="px-3 py-2 d-flex align-items-center gap-2" style={{ border: '1px solid rgba(125, 125, 125, 0.2)', backgroundColor: 'var(--background)' }}>
                                                            <tech.icon size={16} style={{ color: 'var(--foreground)' }} />
                                                            <span className="fw-medium small" style={{ color: 'var(--text-secondary)' }}>{tech.name}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                    </div>

                                    {/* Bottom Spacer */}
                                    <div style={{ height: '100px' }}></div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function ProjectsPage() {
    return (
        <Suspense fallback={<div></div>}>
            <ProjectsContent />
        </Suspense>
    );
}
