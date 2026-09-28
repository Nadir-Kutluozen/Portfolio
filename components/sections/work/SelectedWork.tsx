import { ArrowUpRight } from "lucide-react";
import { featuredProjects, projects } from "@/data/projects";
import SplitReveal from "@/components/animation/motion/SplitReveal";
import Reveal from "@/components/animation/motion/Reveal";
import DynamicButton from "@/components/ui/DynamicButton";
import ProjectCard from "@/components/sections/projects/ProjectCard";
import styles from "./SelectedWork.module.css";

// Two edge-to-edge columns with alternating shapes, the right one sitting a
// little lower: an editorial rhythm with tight gaps
const LEFT_SHAPES = ["1 / 1", "4 / 3", "1 / 1"];
const RIGHT_SHAPES = ["4 / 3", "4 / 3", "1 / 1"];

export default function SelectedWork() {
    const picks = featuredProjects.slice(0, 6);
    const left = picks.filter((_, i) => i % 2 === 0);
    const right = picks.filter((_, i) => i % 2 === 1);

    return (
        <section id="work" className="section" aria-labelledby="work-title">
            <header className={`shell ${styles.head}`}>
                <div>
                    <span className="t-eyebrow">Selected work</span>
                    <SplitReveal as="h2" id="work-title" className={`t-display t-l ${styles.title}`}>
                        Things I&apos;ve <span className="t-serif">shipped</span>
                    </SplitReveal>
                    <p className={`t-lead ${styles.lead}`}>A few of the 20+ websites and web apps I&apos;ve delivered.</p>
                </div>
                <DynamicButton href="/projects" variant="soft">
                    All {projects.length} projects <ArrowUpRight size={18} />
                </DynamicButton>
            </header>

            <div className={styles.grid}>
                <div className={styles.col}>
                    {left.map((p, i) => (
                        <Reveal key={p.slug} y={40}>
                            <ProjectCard project={p} aspect={LEFT_SHAPES[i % 3]} />
                        </Reveal>
                    ))}
                </div>
                <div className={`${styles.col} ${styles.lower}`}>
                    {right.map((p, i) => (
                        <Reveal key={p.slug} y={40}>
                            <ProjectCard project={p} aspect={RIGHT_SHAPES[i % 3]} />
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
