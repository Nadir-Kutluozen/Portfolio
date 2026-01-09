import { Github, Globe, Code, Cpu, Layout, Database, Server, Smartphone, Layers, Box, Terminal, Zap } from 'lucide-react';

export interface Project {
    id: string;
    title: string;
    description: string;
    longDescription?: string;
    date: string;
    link: string; // Live URL
    repoUrl?: string; // GitHub URL
    image: string; // Thumbnail path
    video?: string; // Video preview path
    technologies: { name: string; icon: any }[]; // List of tech with icons
    tags: string[]; // Categories like "Frontend", "Full Stack"
}

export const projects: Project[] = [
    {
        id: "1",
        title: "Bandit Animation",
        description: "A futuristic analytics dashboard featuring real-time data visualization and a glassmorphic UI.",
        longDescription: "Built with Next.js and Framer Motion, this dashboard visualizes complex datasets in real-time. It features a custom-built charting library, dark mode by default, and a responsive bento-grid layout.",
        date: "2024-12",
        link: "https://www.banditanimation.com",
        repoUrl: "https://github.com/nadir-kutluozen",
        image: "/bandit-thumb.png",
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
        title: "Aurora E-Commerce",
        description: "A premium shopping experience with seamless page transitions and 3D product previews.",
        date: "2024-10",
        link: "https://example.com/aurora",
        repoUrl: "https://github.com/nadir-kutluozen/aurora-shop",
        image: "/projects/aurora-thumb.jpg",
        technologies: [
            { name: "React", icon: Code },
            { name: "Three.js", icon: Box },
            { name: "TailwindCSS", icon: Layout },
            { name: "Shopify API", icon: Database }
        ],
        tags: ["E-Commerce", "3D"]
    },
    {
        id: "3",
        title: "Zenith Task Manager",
        description: "A minimalist productivity tool focused on flow state and gesture-based interactions.",
        date: "2024-08",
        link: "https://example.com/zenith",
        repoUrl: "https://github.com/nadir-kutluozen/zenith-tasks",
        image: "/projects/zenith-thumb.jpg",
        technologies: [
            { name: "Flutter", icon: Smartphone },
            { name: "Firebase", icon: Database },
            { name: "Dart", icon: Code }
        ],
        tags: ["Mobile App", "Productivity"]
    },
    {
        id: "4",
        title: "Echo Social Graph",
        description: "Visualizing social connections through an interactive, force-directed graph engine.",
        date: "2024-05",
        link: "https://example.com/echo",
        image: "/projects/echo-thumb.jpg",
        technologies: [
            { name: "Vue.js", icon: Code },
            { name: "WebGL", icon: Layers },
            { name: "Node.js", icon: Server },
            { name: "GraphQL", icon: Zap }
        ],
        tags: ["Social", "WebGL"]
    }
];
