"use client";
import React from "react";
import { motion } from "framer-motion";
import { projects } from "@/data/projects";

interface ProjectSidebarProps {
    selectedId: string;
    setSelectedId: (id: string) => void;
}

export default function ProjectSidebar({ selectedId, setSelectedId }: ProjectSidebarProps) {
    return (
        <div className="col-lg-2 d-none d-lg-flex flex-column justify-content-center h-100 p-4 overflow-hidden position-relative" style={{ borderColor: 'var(--foreground)' }}>


            <div className="position-relative z-1 d-flex flex-column h-100 justify-content-center">
                <h5 className="text-secondary text-uppercase tracking-widest fs-7 mb-4 ps-1 opacity-50 small">Selected Works</h5>
                <div className="d-flex flex-column gap-4 overflow-y-auto overflow-x-hidden pe-1 no-scrollbar align-items-start pb-5 w-100">
                    {projects.map((project) => (
                        <button
                            key={project.id}
                            onClick={() => setSelectedId(project.id)}
                            className={`btn text-start border-0 p-0 transition-all d-flex align-items-center position-relative group bg-transparent`}
                            style={{
                                color: selectedId === project.id ? 'var(--foreground)' : 'var(--text-secondary)',
                                opacity: selectedId === project.id ? 1 : 0.6,
                                zIndex: 10,
                                cursor: 'pointer'
                            }}
                        >
                            <div className="d-flex flex-column pointer-events-none w-100">
                                <motion.span
                                    className="text-uppercase mb-2"
                                    style={{
                                        fontSize: '1rem',
                                        fontWeight: selectedId === project.id ? 500 : 300,
                                        letterSpacing: '0.1em',
                                        transformOrigin: 'left',
                                        pointerEvents: 'auto'
                                    }}
                                    whileHover={{ x: 5, color: 'var(--foreground)', opacity: 1 }}
                                    animate={{
                                        x: selectedId === project.id ? 5 : 0,
                                        color: selectedId === project.id ? 'var(--foreground)' : 'var(--text-secondary)'
                                    }}
                                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                >
                                    {project.title}
                                </motion.span>

                                {/* Underline Animation */}
                                <motion.div
                                    style={{
                                        height: '1px',
                                        backgroundColor: 'var(--foreground)',
                                        originX: 0
                                    }}
                                    initial={{ scaleX: 0 }}
                                    animate={{ scaleX: selectedId === project.id ? 1 : 0 }}
                                    whileHover={{ scaleX: 1 }}
                                    transition={{ duration: 0.3 }}
                                />
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
