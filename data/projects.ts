import { Github, Globe, Code, Cpu, Layout, Database, Server, Smartphone, Layers, Box, Terminal, Zap, LucideIcon } from 'lucide-react';

export interface Project {
    id: string;
    title: string;
    description: string;
    longDescription?: string;
    date: string;
    link: string; // Live URL
    repoUrl?: string; // GitHub URL
    image: string; // Thumbnail path
    homepageimage?: string; // Homepage image path
    video?: string; // Video preview path
    technologies: { name: string; icon: LucideIcon }[]; // List of tech with icons
    tags: string[]; // Categories like "Frontend", "Full Stack"
}

export const projects: Project[] = [
    {
        id: "1",
        title: "Bandit Animation",
        description: "A Visual Animation tool that lets you animate your static SVG and export as React Component",
        longDescription: "Built with Next.js and Framer Motion, this dashboard visualizes complex datasets in real-time. It features a custom-built charting library, dark mode by default, and a responsive bento-grid layout.",
        date: "2026-01",
        link: "https://www.banditanimation.com",
        image: "/banditthumb.png",
        homepageimage: "/racoon(banditanimation).jpg",
        video: "/bandit-demo.mp4",
        technologies: [
            { name: "Next.js", icon: Layout },
            { name: "TypeScript", icon: Code },
            { name: "Framer Motion", icon: Layers },
            { name: "D3.js", icon: Box }
        ],
        tags: ["Full Stack", "Data Viz"]
    },
    {
        id: "2",
        title: "OpenHand",
        description: "An intuitive platform designed for open-source project management and seamless developer collaboration.",
        date: "2025-10",
        link: "https://example.com/openhand",
        image: "/openhand.png",
        homepageimage: "/openhand(homepage).jpg",
        technologies: [
            { name: "React", icon: Code },
            { name: "Node.js", icon: Server },
            { name: "PostgreSQL", icon: Database }
        ],
        tags: ["Open Source", "Platform"]
    },
    {
        id: "3",
        title: "MedBrokerage",
        description: "A comprehensive healthcare brokerage platform tailored for medical professionals and clinics.",
        date: "2025-06",
        link: "https://example.com/medbrokerage",
        homepageimage: "/oceanview(medbrokerage).jpg",
        image: "/medbrokerage.png",
        technologies: [
            { name: "Next.js", icon: Layout },
            { name: "TypeScript", icon: Code },
            { name: "TailwindCSS", icon: Layers }
        ],
        tags: ["Healthcare", "B2B"]
    },
    {
        id: "4",
        title: "Northshore Aviary",
        description: "An engaging and visually rich website built for managing bird conservation and aviary data.",
        date: "2024-11",
        link: "https://example.com/northshore",
        image: "/northshoreAviary.png",
        homepageimage: "/birdsaviary(homepage).png",
        technologies: [
            { name: "Vue.js", icon: Code },
            { name: "Firebase", icon: Database },
            { name: "Figma", icon: Box }
        ],
        tags: ["Conservation", "Web App"]
    },
    {
        id: "5",
        title: "Punchcard",
        description: "A modern time-tracking and employee management application focusing on minimal workflows.",
        date: "2024-05",
        link: "https://example.com/punchcard",
        image: "/punchcard.png",
        homepageimage: "/punchcard(homepage).png",
        technologies: [
            { name: "React Native", icon: Smartphone },
            { name: "GraphQL", icon: Zap },
            { name: "Node.js", icon: Server }
        ],
        tags: ["Mobile App", "Productivity"]
    },
    {
        id: "6",
        title: "Course Compare",
        description: "An analytics-driven directory for comparing online courses, complete with real-time reviews.",
        date: "2023-12",
        link: "https://example.com/coursecompare",
        image: "/onlinecoursecompare.png",
        homepageimage: "/onlinecoursecompare(homepage).png",
        technologies: [
            { name: "Next.js", icon: Layout },
            { name: "Prisma", icon: Database },
            { name: "TailwindCSS", icon: Layers }
        ],
        tags: ["Education", "Directory"]
    }
];
