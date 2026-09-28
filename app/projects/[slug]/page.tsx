import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProject, nextProject, projects } from "@/data/projects";
import ProjectDetail from "@/components/sections/projects/ProjectDetail";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
    return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
    const project = getProject((await params).slug);
    if (!project) return {};
    return {
        title: project.title,
        description: project.description,
        openGraph: { title: project.title, description: project.description, images: [project.cover ?? project.image] },
    };
}

export default async function ProjectPage({ params }: Params) {
    const { slug } = await params;
    const project = getProject(slug);
    if (!project) notFound();
    return <ProjectDetail project={project} next={nextProject(slug)} />;
}
