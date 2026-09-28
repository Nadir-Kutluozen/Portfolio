/**
 * Everything about me that more than one page shows: contact, socials,
 * highlights, experience, research, education and toolkit. Edit it here and
 * every page updates.
 */

export type SocialId = "email" | "github" | "linkedin" | "instagram";

export interface Social {
    id: SocialId;
    label: string;
    handle: string;
    href: string;
}

export interface Role {
    company: string;
    title: string;
    period: string;
    points: string[];
    href?: string;
}

/** One line of the resume's lists: a degree, a certificate, a paper */
export interface Credential {
    name: string;
    detail: string;
    period: string;
    href?: string;
}

/** A headline number (or word) for the home page strip */
export interface Highlight {
    value: string;
    label: string;
    /** When the value is a number, it counts up from 0 to this */
    count?: number;
}

export interface ToolGroup {
    name: string;
    items: string[];
}

export const profile = {
    name: "Nadir Kutluozen",
    signature: "Nadir K.",
    headline: "Engineer, artist & AI researcher",
    location: "New York, NY",
    timeZone: "America/New_York",
    /** Where this site lives: share previews and search results resolve against it */
    siteUrl: "https://www.nadirkutluozen.com",
    email: "nadirkutluozen.nk@gmail.com",
    stewUrl: "https://www.stewfactory.app",
    /** Years I've been drawing, as I tell it */
    drawingYears: 20,
};

export const socials: Social[] = [
    { id: "email", label: "Email", handle: "Write me a note", href: `mailto:${profile.email}` },
    { id: "github", label: "GitHub", handle: "nadir-kutluozen", href: "https://github.com/nadir-kutluozen" },
    { id: "linkedin", label: "LinkedIn", handle: "in/nadir-kutluozen", href: "https://linkedin.com/in/nadir-kutluozen" },
    { id: "instagram", label: "Instagram", handle: "@nadirkutluozen", href: "https://instagram.com/nadirkutluozen" },
];

/** My NeurIPS 2026 paper. `href` (OpenReview) is what the "Read the paper" button opens. */
export const paper = {
    title: "Is a Linear Probe Evidence of a Linear Representation?",
    authors: ["Nadir Kutluozen", "Christian Internò", "David Klindt"],
    venue: "NeurIPS 2026",
    format: "Poster",
    tldr: "Linear probing is too lenient a test for the linear representation hypothesis, and the structure it ignores matters for generalization.",
    href: "https://openreview.net/forum?id=YSsvDcEXdV" as string | undefined,
};

export const highlights: Highlight[] = [
    { value: "20+", count: 20, label: "websites and web apps delivered" },
    { value: "NeurIPS", label: "2026 paper on linear probes and representations" },
    { value: "CSHL", label: "AI research at Cold Spring Harbor Laboratory" },
    { value: "Now", label: "working on emotionally intelligent models" },
    { value: "CEO", label: "of Stew Factory" },
];

export const experience: Role[] = [
    {
        company: "Stew Factory",
        title: "CEO",
        period: "2026 - Present",
        href: profile.stewUrl,
        points: [
            "Building a full-stack vector animation editor with my brothers Ali and Erkan.",
            "Type a sentence, get a real vector, animate it on a GSAP timeline and export code for React, Vue, Angular or plain HTML.",
        ],
    },
    {
        company: "Cold Spring Harbor Laboratory",
        title: "Research Intern, AI / Mechanistic Interpretability",
        period: "2026",
        points: [
            "Applied sparse autoencoders (SAEs) to transformer activations and extracted interpretable feature directions.",
            "Investigated feature stability, sparsity and representation structure in large language models.",
            "Built internal analysis and visualization tools to evaluate feature convergence and interpretability metrics.",
        ],
    },
    {
        company: "Domino Media",
        title: "Web Developer",
        period: "Feb 2022 - Mar 2025",
        points: [
            "Built and launched custom websites for restaurants and local businesses on PHP-based custom themes.",
            "Improved SEO and site speed so clients showed up and loaded fast.",
            "Designed internal tools and managed deployments to keep client delivery reliable.",
        ],
    },
];

export const research: Credential[] = [
    {
        name: paper.title,
        detail: `With ${paper.authors.slice(1).join(" and ")}`,
        period: `${paper.venue} ${paper.format.toLowerCase()}`,
        href: paper.href,
    },
    { name: "Emotionally intelligent models", detail: "What I'm working on right now", period: "Now" },
];

export const education: Credential[] = [
    { name: "Farmingdale State College", detail: "B.S. Computer Science", period: "Class of 2026" },
    { name: "Nassau Community College", detail: "A.S. Computer Science", period: "Dec 2023" },
];

export const certifications: Credential[] = [
    { name: "React & TypeScript: The Practical Guide", detail: "Certification", period: "2025" },
    { name: "Learning GitHub and IntelliJ IDEA", detail: "Certification", period: "2025" },
];

export const toolkit: ToolGroup[] = [
    { name: "Languages", items: ["TypeScript", "JavaScript", "Python", "Java", "C", "PHP", "SQL"] },
    { name: "Frameworks", items: ["React", "Next.js", "Node.js", "FastAPI", "Tailwind", "Bootstrap"] },
    { name: "Motion", items: ["GSAP", "SVG", "Three.js", "Framer Motion"] },
    { name: "AI / ML", items: ["PyTorch", "Sparse Autoencoders", "NumPy", "Pandas", "Computer Vision", "MediaPipe"] },
    { name: "Data & Cloud", items: ["PostgreSQL", "Supabase", "MongoDB", "SQLite", "Firebase", "AWS EC2", "Vercel", "Stripe"] },
];
