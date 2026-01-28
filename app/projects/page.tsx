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
                    <div className="col-12 col-lg-10 h-100 overflow-y-auto no-scrollbar">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeProject.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                                className="w-100 min-h-100 p-3 p-lg-5"
                            >
                                <div className="container-lg mx-auto" style={{ maxWidth: '1400px' }}>

                                    {/* MASSIVE TITLE */}
                                    <div className="mb-5">
                                        <h1 className="fw-bold text-uppercase lh-1 mb-2"
                                            style={{
                                                fontFamily: 'var(--font-couplin)',
                                                letterSpacing: '-2px',
                                                fontSize: 'clamp(3rem, 8vw, 8rem)', // Massive responsive size
                                            }}>
                                            {activeProject.title}
                                        </h1>
                                        <p className="lead fs-4 opacity-75 mb-0" style={{ maxWidth: '800px' }}>
                                            {activeProject.description}
                                        </p>
                                    </div>

                                    {/* BENTO GRID LAYOUT */}
                                    <div className="row g-4">

                                        {/* 1. MEDIA BLOCK (Large, spans full width or large portion) */}
                                        <div className="col-12 col-xl-8">
                                            <div className="h-100 w-100 rounded-3 overflow-hidden shadow-sm bg-black bg-opacity-10 position-relative" style={{ minHeight: '400px', aspectRatio: '16/9' }}>

                                                <Image
                                                    src={activeProject.image}
                                                    alt={activeProject.title}
                                                    fill
                                                    className=""
                                                />

                                            </div>
                                        </div>

                                        {/* 2. ACTIONS & DETAILS BLOCK (Side column) */}
                                        <div className="col-12 col-xl-4 d-flex flex-column gap-4">

                                            {/* Action Buttons */}
                                            <div className="p-4 rounded-3 d-flex flex-column gap-2 border border-secondary border-opacity-25 justify-content-center shadow-sm" style={{ backgroundColor: 'var(--nav-bg)' }}>
                                                <a href={activeProject.link} target="_blank" className="btn btn-dark rounded-3 py-3 px-4 d-flex align-items-center justify-content-center gap-2 fw-bold text-uppercase tracking-wider hover-scale w-100">
                                                    View Live <ArrowUpRight size={20} />
                                                </a>
                                                <a href={activeProject.repoUrl} target="_blank" className="btn btn-outline-dark rounded-3 py-3 px-4 d-flex align-items-center justify-content-center gap-2 hover-scale w-100">
                                                    <Github size={20} /> View Code
                                                </a>
                                            </div>

                                            {/* Stats / Info */}
                                            <div className="p-4 rounded-3 flex-grow-1 border border-secondary border-opacity-25 shadow-sm d-flex flex-column justify-content-center gap-4" style={{ backgroundColor: 'var(--nav-bg)' }}>
                                                <div className="d-flex align-items-center gap-3">
                                                    <div className="p-2 ">
                                                        <Calendar size={24} className="opacity-75" />
                                                    </div>
                                                    <div>
                                                        <span className="d-block text-uppercase x-small opacity-50 fw-bold tracking-widest">Timeline</span>
                                                        <span className="fw-bold font-monospace">{activeProject.date}</span>
                                                    </div>
                                                </div>
                                                <div className="d-flex align-items-center gap-3">
                                                    <div className="p-2">
                                                        <User size={24} className="opacity-75" />
                                                    </div>
                                                    <div>
                                                        <span className="d-block text-uppercase x-small opacity-50 fw-bold tracking-widest">Role</span>
                                                        <span className="fw-bold font-monospace">Full Stack Developer</span>
                                                    </div>
                                                </div>
                                                <div className="d-flex align-items-center gap-3">
                                                    <div className="p-2">
                                                        <Code size={24} className="opacity-75" />
                                                    </div>
                                                    <div>
                                                        <span className="d-block text-uppercase x-small opacity-50 fw-bold tracking-widest">Type</span>
                                                        <span className="fw-bold font-monospace">Web Application</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* 3. ABOUT BLOCK */}
                                        <div className="col-12 col-lg-7">
                                            <div className="p-4 p-md-5 rounded-3 h-100 border border-secondary border-opacity-25 shadow-sm" style={{ backgroundColor: 'var(--nav-bg)' }}>
                                                <h3 className="fw-bold text-uppercase mb-4 opacity-90" style={{ letterSpacing: '-0.5px' }}>About the Project</h3>
                                                <div className="lead fs-6" style={{ lineHeight: '1.8', opacity: 0.85 }}>
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
                                            <div className="p-4 p-md-5 rounded-3 h-100 border border-secondary border-opacity-25 shadow-sm" style={{ backgroundColor: 'var(--nav-bg)' }}>
                                                <h3 className="fw-bold text-uppercase mb-4 opacity-90" style={{ letterSpacing: '-0.5px' }}>Technologies</h3>
                                                <div className="d-flex flex-wrap gap-2">
                                                    {activeProject.technologies.map((tech, i) => (
                                                        <div key={i} className="px-3 py-2 rounded-3 d-flex align-items-center gap-2 border border-secondary border-opacity-25 shadow-sm" style={{ transition: 'transform 0.2s' }}>
                                                            <tech.icon size={18} style={{ color: 'var(--accent)' }} />
                                                            <span className="fw-bold small">{tech.name}</span>
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
