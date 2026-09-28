"use client";

import type { CSSProperties } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { type Project, projectYear } from "@/data/projects";
import ParallaxImage from "@/components/animation/motion/ParallaxImage";
import NewStew from "@/components/animation/microanimation/NewStew";
import LiquidGlass from "@/components/ui/LiquidGlass";
import styles from "./ProjectCard.module.css";

interface ProjectCardProps {
    project: Project;
    /** Shape of the picture, e.g. "4 / 5" */
    aspect?: string;
    sizes?: string;
    /** Above the fold: load the picture right away */
    priority?: boolean;
}

/** A project as a big squircle picture with its name underneath. The whole card is the link. */
export default function ProjectCard({ project, aspect = "4 / 3", sizes = "(max-width: 767px) 100vw, 50vw", priority }: ProjectCardProps) {
    return (
        <Link href={`/projects/${project.slug}`} className={styles.card} data-cursor="View" data-flip-id={project.slug}>
            <div className={styles.media} style={{ "--aspect": aspect } as CSSProperties}>
                {project.art === "stew" ? (
                    <div className={styles.stewArt}>
                        <NewStew style={{ width: "100%", height: "100%" }} />
                    </div>
                ) : (
                    <ParallaxImage
                        src={project.cover ?? project.image}
                        alt={`${project.title} cover`}
                        sizes={sizes}
                        className={styles.picture}
                        strength={10}
                        priority={priority}
                    />
                )}
                <LiquidGlass as="span" className={styles.badge} strength={20} bezel={12} aria-hidden>
                    <ArrowUpRight size={20} />
                </LiquidGlass>
            </div>

            <div className={styles.meta}>
                <h3 className={styles.title}>{project.title}</h3>
                <span className={styles.year}>{projectYear(project)}</span>
            </div>
            <p className={styles.desc}>{project.description}</p>
            <ul className={styles.tags}>
                {project.tags.slice(0, 3).map((tag) => (
                    <li key={tag}>{tag}</li>
                ))}
            </ul>
        </Link>
    );
}
