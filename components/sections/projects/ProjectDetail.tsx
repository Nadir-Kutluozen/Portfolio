import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowUpRight, Github } from "lucide-react";
import { type Project, projectYear } from "@/data/projects";
import SplitReveal from "@/components/animation/motion/SplitReveal";
import Reveal from "@/components/animation/motion/Reveal";
import ParallaxImage from "@/components/animation/motion/ParallaxImage";
import DynamicButton from "@/components/ui/DynamicButton";
import styles from "./ProjectDetail.module.css";

/** One project: big title, the real screenshot, the story, what it's built with, then the next one. */
export default function ProjectDetail({ project, next }: { project: Project; next: Project }) {
    const facts = [
        { label: "Year", value: projectYear(project) },
        { label: "Role", value: project.role?.join(", ") },
        { label: "Type", value: project.type },
    ].filter((f): f is { label: string; value: string } => Boolean(f.value));

    return (
        <article>
            <header className={`shell ${styles.header}`}>
                <Link href="/projects" className={styles.back}>
                    <ArrowLeft size={17} /> All projects
                </Link>
                <span className="t-eyebrow">{project.tags.join(" · ")}</span>
                <SplitReveal as="h1" className={`t-display t-l ${styles.title}`} data-anim>
                    {project.title}
                </SplitReveal>

                <Reveal className={styles.lead} stagger={0.08} delay={0.2} data-anim>
                    <p className="t-lead">{project.description}</p>
                    <div className={styles.actions}>
                        <DynamicButton href={project.link} size="lg">
                            Visit the site <ArrowUpRight size={19} />
                        </DynamicButton>
                        {project.repoUrl && (
                            <DynamicButton href={project.repoUrl} variant="soft" size="lg">
                                <Github size={18} /> Code
                            </DynamicButton>
                        )}
                    </div>
                </Reveal>

                <Reveal as="ul" className={styles.facts} stagger={0.06} delay={0.3} data-anim>
                    {facts.map((fact) => (
                        <li key={fact.label}>
                            <span className={styles.factLabel}>{fact.label}</span>
                            <span className={styles.factValue}>{fact.value}</span>
                        </li>
                    ))}
                </Reveal>
            </header>

            <div className={styles.media}>
                <ParallaxImage
                    src={project.image}
                    alt={`${project.title}, screenshot`}
                    sizes="100vw"
                    priority
                    className={styles.shot}
                    objectPosition="50% 0%"
                    strength={8}
                />
            </div>

            <section className={`shell section ${styles.body}`} aria-label="About the project">
                <div>
                    <span className="t-eyebrow">The story</span>
                    <Reveal as="p" className={styles.story}>
                        {project.longDescription ?? project.description}
                    </Reveal>
                </div>
                <aside className={styles.stackCard}>
                    <span className="t-eyebrow">Built with</span>
                    <Reveal as="ul" className={styles.chips} stagger={0.03} y={16}>
                        {project.stack.map((tech) => (
                            <li key={tech}>{tech}</li>
                        ))}
                    </Reveal>
                </aside>
            </section>

            <Link href={`/projects/${next.slug}`} className={styles.next} data-cursor="Next">
                <div className={styles.nextCopy}>
                    <span className="t-eyebrow">Next project</span>
                    <span className={`t-display ${styles.nextTitle}`}>{next.title}</span>
                </div>
                <div className={styles.nextImage}>
                    <Image src={next.cover ?? next.image} alt="" fill sizes="(max-width: 767px) 100vw, 40vw" style={{ objectFit: "cover" }} />
                </div>
            </Link>
        </article>
    );
}
