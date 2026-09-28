"use client";

import { useRef, useState } from "react";
import { CATEGORY_LABELS, type Project, type ProjectCategory } from "@/data/projects";
import { gsap, useGSAP, Flip, ScrollTrigger, EASE } from "@/lib/gsap";
import ProjectCard from "./ProjectCard";
import styles from "./ProjectIndex.module.css";

type Filter = "all" | ProjectCategory;

const FILTERS: Filter[] = ["all", "product", "client", "ai"];

/** Every project in one grid, with filter chips. Cards glide to their new spots (GSAP Flip). */
export default function ProjectIndex({ projects }: { projects: Project[] }) {
    const [filter, setFilter] = useState<Filter>("all");
    const grid = useRef<HTMLDivElement>(null);
    const before = useRef<Flip.FlipState | null>(null);
    const beforeHeight = useRef(0);

    const count = (f: Filter) => (f === "all" ? projects.length : projects.filter((p) => p.categories.includes(f)).length);

    const choose = (next: Filter) => {
        const el = grid.current;
        if (next === filter || !el) return;
        // Cards that never scrolled into view still owe their picture reveal;
        // finish it now so they fly in whole instead of wiping in afterwards
        ScrollTrigger.getAll().forEach((st) => {
            const trigger = st.trigger;
            if (st.vars.once && trigger && el.contains(trigger) && st.animation && st.animation.progress() < 1) {
                st.animation.progress(1);
                st.kill();
            }
        });
        before.current = Flip.getState(el.querySelectorAll("[data-card]"));
        beforeHeight.current = el.offsetHeight;
        setFilter(next);
    };

    // After React shows the new set, animate from where everything was
    useGSAP(() => {
        const state = before.current;
        const el = grid.current;
        if (!state || !el) return;
        before.current = null;
        // The cards go absolute while they fly, so hold the grid open (the
        // taller of the old and new layout) or the footer jumps up under them
        el.style.minHeight = `${Math.max(beforeHeight.current, el.offsetHeight)}px`;
        Flip.from(state, {
            duration: 0.8,
            ease: EASE.inOut,
            absolute: true,
            nested: true,
            onEnter: (els) => gsap.fromTo(els, { autoAlpha: 0, scale: 0.94 }, { autoAlpha: 1, scale: 1, duration: 0.6, delay: 0.2, ease: EASE.out }),
            onLeave: (els) => gsap.to(els, { autoAlpha: 0, scale: 0.94, duration: 0.35, ease: "power2.in" }),
            onComplete: () => {
                el.style.minHeight = "";
                ScrollTrigger.refresh();
            },
        });
    }, { dependencies: [filter], scope: grid });

    return (
        <>
            <div className={`shell ${styles.filters}`} role="toolbar" aria-label="Filter projects">
                {FILTERS.map((f) => (
                    <button
                        key={f}
                        type="button"
                        onClick={() => choose(f)}
                        className={`${styles.chip} ${filter === f ? styles.active : ""}`}
                        aria-pressed={filter === f}
                    >
                        {f === "all" ? "All" : CATEGORY_LABELS[f]}
                        <span className={styles.count}>{count(f)}</span>
                    </button>
                ))}
            </div>

            <div ref={grid} className={styles.grid}>
                {projects.map((project, i) => {
                    const shown = filter === "all" || project.categories.includes(filter);
                    return (
                        <div key={project.slug} className={shown ? styles.item : styles.hidden} data-card>
                            <ProjectCard project={project} aspect="4 / 3" priority={i < 2} />
                        </div>
                    );
                })}
            </div>
        </>
    );
}
