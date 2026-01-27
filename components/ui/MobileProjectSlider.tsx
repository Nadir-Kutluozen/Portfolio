
"use client";
import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { projects } from "@/data/projects";

interface MobileProjectSliderProps {
    selectedId: string;
    setSelectedId: (id: string) => void;
}

export default function MobileProjectSlider({ selectedId, setSelectedId }: MobileProjectSliderProps) {
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    // Scroll active item into view when selected
    useEffect(() => {
        if (scrollContainerRef.current) {
            const activeBtn = scrollContainerRef.current.querySelector<HTMLButtonElement>(`[data-id="${selectedId}"]`);
            if (activeBtn) {
                activeBtn.scrollIntoView({
                    behavior: 'smooth',
                    block: 'nearest',
                    inline: 'center'
                });
            }
        }
    }, [selectedId]);

    return (
        <div
            className="d-lg-none fixed-bottom w-100 z-3 border-top border-secondary border-opacity-25"
            style={{
                backgroundColor: 'var(--nav-bg)', // Solid background
                boxShadow: '0 -4px 20px rgba(0,0,0,0.2)',
                paddingBottom: 'env(safe-area-inset-bottom, 20px)' // Handle bottom safe area
            }}
        >
            <div
                className="d-flex overflow-x-auto no-scrollbar py-2 px-2 gap-2"
                ref={scrollContainerRef}
            >
                {projects.map((project) => (
                    <button
                        key={project.id}
                        data-id={project.id}
                        onClick={() => setSelectedId(project.id)}
                        className="btn btn-sm border-0 rounded-4 px-3 text-nowrap d-flex align-items-center"
                        style={{
                            backgroundColor: selectedId === project.id ? 'var(--accent)' : 'rgba(255,255,255,0.05)',
                            color: selectedId === project.id ? '#000' : 'var(--foreground)',
                            opacity: selectedId === project.id ? 1 : 0.7,
                            transition: 'all 0.3s ease',
                            height: '42px', // Comfortable touch target
                        }}
                    >
                        <span className="fw-semibold text-uppercase small tracking-wider" style={{ fontSize: '0.8rem' }}>
                            {project.title}
                        </span>
                    </button>
                ))}
            </div>
        </div>
    );
}
