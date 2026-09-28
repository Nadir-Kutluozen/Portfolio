import type { Metadata } from "next";
import { projectsByDate, projectYear } from "@/data/projects";
import SplitReveal from "@/components/animation/motion/SplitReveal";
import Reveal from "@/components/animation/motion/Reveal";
import ProjectIndex from "@/components/sections/projects/ProjectIndex";
import styles from "./projects.module.css";

export const metadata: Metadata = {
    title: "Work",
    description: "Products I've founded, sites I've built for clients, and experiments with AI. Everything here shipped.",
};

// Old /projects?id=3 links are redirected to the project's own page in next.config.ts
export default function ProjectsPage() {
    const newest = projectYear(projectsByDate[0]);
    const oldest = projectYear(projectsByDate[projectsByDate.length - 1]);

    return (
        <>
            <header className={`shell ${styles.header}`}>
                <span className="t-eyebrow">
                    Work · {oldest} - {newest}
                </span>
                <SplitReveal as="h1" by="chars" className={`t-display t-xl ${styles.title}`} data-anim>
                    Projects
                </SplitReveal>
                <Reveal as="p" className={`t-lead ${styles.lead}`} delay={0.3} data-anim>
                    Products I&apos;ve founded, sites I&apos;ve built for clients, and experiments with AI. Everything
                    here shipped.
                </Reveal>
            </header>
            <ProjectIndex projects={projectsByDate} />
        </>
    );
}
