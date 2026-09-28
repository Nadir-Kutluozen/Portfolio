/**
 * Every project on the site. The home page, /projects and each
 * /projects/[slug] page read from here, so a new project is one new entry.
 * Plain data only (no React), so server components can read it too.
 */

export type ProjectCategory = "product" | "client" | "ai";

export interface Project {
    /** Old numeric id: /projects?id=3 links redirect to the slug (next.config.ts) */
    id: string;
    slug: string;
    title: string;
    description: string;
    longDescription?: string;
    /** "YYYY-MM" */
    date: string;
    link: string; // Live URL
    repoUrl?: string; // GitHub URL
    /** Screenshot of the real thing, shown on the project page */
    image: string;
    /** Illustration for cards. Falls back to the screenshot. */
    cover?: string;
    /** Draw the card with live artwork instead of a picture */
    art?: "stew";
    stack: string[];
    tags: string[];
    categories: ProjectCategory[];
    role?: string[];
    type?: string;
    /** Shown in "Selected work" on the home page */
    featured?: boolean;
}

export const projects: Project[] = [
    {
        id: "1",
        slug: "stew-factory",
        title: "Stew Factory",
        description: "The full-stack vector animation editor. Type a sentence, get a real vector, animate it and export production code.",
        longDescription:
            "Stew Factory is the tool my brothers and I always wanted. You type a sentence and get a real, editable vector, not a flat picture. You animate it on a full GSAP timeline, and you export production-ready code for React, Vue, Angular or plain HTML, or render it out as a video. It started as StewLab, my sandbox for testing an AI-to-SVG pipeline end to end: structured prompts, strict responses, validation and cleanup so the output stays editable. It grew into a full editor with timelines, effects and a code exporter, all named after a raccoon called Stew. The hardest engineering stays under the hood so the fun stays with you.",
        date: "2026-02",
        link: "https://www.stewfactory.app",
        image: "/stewfactory.png",
        art: "stew",
        stack: ["Next.js", "TypeScript", "GSAP", "Supabase", "PostgreSQL", "Stripe", "OpenAI API", "Gemini API", "MCP", "Vercel"],
        tags: ["Animation", "AI Tooling", "SVG", "SaaS"],
        categories: ["product", "ai"],
        role: ["CEO", "Full Stack Developer"],
        type: "Web App",
    },
    {
        id: "2",
        slug: "bandit-animation",
        title: "Bandit Animation",
        description: "A visual animation tool that lets you animate a static SVG and export it as a React component.",
        longDescription:
            "What inspired this tool was an everyday problem I had grown tired of. For school and work I kept having to animate static SVGs, which meant spending half the day in heavy tools with long load times, only to hit an enormous paywall at the end. So I built my own, with an upfront price and a real trial. It's for all the coders out there who are tired of not seeing the animations they're coding: Bandit Animation shows you, in real time, what your code is creating.",
        date: "2026-01",
        link: "https://www.banditanimation.com",
        image: "/banditthumb.png",
        cover: "/racoon(banditanimation).jpg",
        stack: ["Next.js", "TypeScript", "Motion", "Three.js", "Bootstrap", "PostgreSQL", "Supabase", "Stripe", "Vercel", "REST API"],
        tags: ["Full Stack", "Animation", "SaaS"],
        categories: ["product"],
        role: ["Founder", "Full Stack Developer"],
        type: "Web Application",
        featured: true,
    },
    {
        id: "3",
        slug: "openhand",
        title: "OpenHand",
        description: "An open source, real-time ASL learning tool that teaches you sign language in a fun way.",
        longDescription:
            "OpenHand was special to me because it was the first time I combined machine learning and education. I trained a Random Forest classifier on MediaPipe and OpenCV hand landmarks, and actually looked inside it instead of treating it like a black box. The tricky part was making it run live. The Python backend was processing frames while the Next.js frontend expected instant predictions, and at first it lagged and felt clunky. I had to clean up the socket flow, cut unnecessary data and optimize how the frontend and backend talked to each other. That showed me how much the data flow between the parts of a system matters.",
        date: "2025-10",
        link: "https://openhand-eight.vercel.app/",
        image: "/openhand.png",
        cover: "/openhand(homepage).jpg",
        stack: ["TypeScript", "Python", "FastAPI", "PyTorch", "MediaPipe", "Firebase", "Bootstrap", "REST API", "Render"],
        tags: ["Open Source", "Machine Learning", "Education"],
        categories: ["product", "ai"],
        role: ["Founder", "Full Stack Developer"],
        type: "Web Application",
        featured: true,
    },
    {
        id: "4",
        slug: "med-brokerage",
        title: "Med Brokerage",
        description: "A professional front-end website for a dry bulk shipping company.",
        longDescription:
            "This project had me working one on one with the client to decide what was best for them, including how to market and present themselves. Completed under Domino Media.",
        date: "2024-11",
        link: "https://medbrokerage.com/",
        image: "/medbrokerage.png",
        cover: "/oceanview.jpg",
        stack: ["PHP", "JavaScript", "TailwindCSS", "Bootstrap", "HTML", "CSS"],
        tags: ["Web Design", "Web Development"],
        categories: ["client"],
        role: ["Front-end Developer"],
        type: "Website",
    },
    {
        id: "5",
        slug: "northshore-aviary",
        title: "Northshore Aviary",
        description: "A professional front-end website for a bird shipping company.",
        longDescription:
            "I worked directly with the client to understand their bird business and how they wanted to show up online. We talked through branding, trust and how to explain their services clearly, and I shaped the structure and layout of the site to put professionalism and reliability first. Completed under Domino Media.",
        date: "2024-12",
        link: "https://northshoreaviary.com",
        image: "/northshoreAviary.png",
        cover: "/birdsaviary(homepage).png",
        stack: ["PHP", "JavaScript", "TailwindCSS", "Bootstrap", "HTML", "CSS"],
        tags: ["Web Design", "Web Development"],
        categories: ["client"],
        role: ["Front-end Developer"],
        type: "Website",
        featured: true,
    },
    {
        id: "6",
        slug: "deniz-trading",
        title: "Deniz Trading Corporation",
        description: "A professional front-end website for a dry bulk shipping company.",
        longDescription:
            "I worked directly with the client to understand their dry bulk shipping business and how they wanted to present themselves online. We discussed branding, trust and how to clearly communicate their services, and I shaped the structure and layout of the site to highlight professionalism and reliability. Completed under Domino Media.",
        date: "2024-11",
        link: "https://deniztradingco.com",
        image: "/deniztradingco.png",
        cover: "/deniztradingco(homepage).png",
        stack: ["PHP", "JavaScript", "TailwindCSS", "Bootstrap", "HTML", "CSS"],
        tags: ["Web Design", "Web Development"],
        categories: ["client"],
        role: ["Front-end Developer"],
        type: "Website",
    },
    {
        id: "7",
        slug: "punchcard",
        title: "Punchcard",
        description: "A loyalty app that gives local businesses and shops digital punch cards to keep customers coming back.",
        longDescription:
            "PunchCard started while I was working in restaurants. I kept thinking about how a restaurant could make more money, and the answer felt simple: \"Hey, we remember you. Here's your reward for coming back.\" The problem was that they still handed out physical punch cards instead of digital ones, which are more secure and harder to fake. I wanted to bring that idea not just to one restaurant, but to all of them.",
        date: "2024-05",
        link: "http://54.147.192.29/",
        image: "/punchcard.png",
        cover: "/punchcard(homepage).png",
        stack: ["React", "Node.js", "MongoDB", "JavaScript", "Bootstrap", "REST API", "HTML", "CSS"],
        tags: ["Mobile App", "Productivity"],
        categories: ["product"],
        role: ["Founder", "Full Stack Developer"],
        type: "Mobile & Web Application",
        featured: true,
    },
    {
        id: "8",
        slug: "course-compare",
        title: "Course Compare",
        description: "A directory for comparing online courses so you can pick the best one for you.",
        longDescription:
            "OnlineCourseCompare makes online learning easier to compare without jumping between ten tabs. I built a pipeline that fetches course data from multiple platforms and turns it into one clean, searchable dataset. The backend collects course links from category pages (paginated results included), then scrapes the public details: title, rating, instructor, image, level and URL. A cleanup step normalizes everything, since every platform formats data differently: it removes duplicates, standardizes ratings and durations, and tags each course by platform. The scraper runs on a schedule to keep listings fresh. The goal is simple: a clean comparison for users, and a reliable data layer for me that stays up to date as courses change.",
        date: "2023-12",
        link: "https://www.onlinecoursecompare.com/",
        image: "/onlinecoursecompare.png",
        cover: "/onlinecoursecompare(homepage).png",
        stack: ["Next.js", "React", "Python", "BeautifulSoup4", "REST API", "Bootstrap", "HTML", "CSS"],
        tags: ["Education", "Directory", "Data"],
        categories: ["product"],
        role: ["Full Stack Developer"],
        type: "Web Application",
        featured: true,
    },
    {
        id: "9",
        slug: "free-nyc-events",
        title: "Free NYC Events",
        description: "A website for everyone to find free events in New York City.",
        longDescription:
            "Free NYC Events helps people find free things to do in New York City. Every night at 2:00 AM it scrapes several public NYC pages, gathers everything it can about upcoming events, and shows it all in one friendly interface.",
        date: "2023-03",
        link: "https://freenycevents.com",
        image: "/freenyc.png",
        cover: "/freenycevents(homepage).jpg",
        stack: ["Next.js", "TypeScript", "React", "Node.js", "PostgreSQL", "Cron", "REST API", "Bootstrap"],
        tags: ["Website", "Scraping", "NYC"],
        categories: ["product"],
        role: ["Full Stack Developer"],
        type: "Website",
        featured: true,
    },
];

export const CATEGORY_LABELS: Record<ProjectCategory, string> = {
    product: "Products",
    client: "Client work",
    ai: "AI",
};

/** Newest first */
export const projectsByDate = [...projects].sort((a, b) => b.date.localeCompare(a.date));

export const featuredProjects = projectsByDate.filter((p) => p.featured);

export function getProject(slug: string): Project | undefined {
    return projects.find((p) => p.slug === slug);
}

export function projectYear(p: Project): string {
    return p.date.slice(0, 4);
}

/** The project after this one (newest first), wrapping around */
export function nextProject(slug: string): Project {
    const i = projectsByDate.findIndex((p) => p.slug === slug);
    return projectsByDate[(i + 1) % projectsByDate.length];
}
