import { Github, Globe, Code, Cpu, Layout, Database, Server, Smartphone, Layers, Box, Terminal, Zap, LucideIcon } from 'lucide-react';
import { Stew } from '@/components/animation/microanimation/Stew';

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
    role?: string[];
    type?: string;
    animatedIcon?: React.ComponentType;
}

export const projects: Project[] = [
    {
        id: "1",
        title: "StewLab",
        description: "An AI-enabled SVG generation sandbox with a live preview + collaboration-ready editor workflow",
        longDescription: "StewLab is my separate sandbox project where I test a full SVG generation pipeline end-to-end. The idea is simple: you type a prompt, Stew generates an SVG, and you see it update live in real time inside an iframe while keeping the output safe through sanitization before injection. The core focus is building a reliable pipeline, not just a one-shot prompt: structured prompts, strict JSON responses, validation checks, and cleanup so the SVG stays usable for editing. It’s built as a RESTful API workflow where the frontend talks to my endpoints, receives clean SVG output, and can later evolve into a collaboration/editor tool experience. This project is where I experiment with OpenAI integration, SVG safety, multi-step generation logic, and turning AI output into something people can actually use in a real product.",
        date: "2026-02",
        link: "https://www.banditanimation.com/editor/stew-lab",
        image: "/stewlab.png",
        homepageimage: "/stewlab(homepage).png",
        technologies: [
            { name: "Next.js", icon: Code },
            { name: "TypeScript", icon: Code },
            { name: "OpenAI API", icon: Code },
            { name: "RESTful API", icon: Code },
            { name: "Bootstrap", icon: Layers },
            { name: "HTML", icon: Code },
            { name: "CSS", icon: Code },
            { name: "Bandit Animation", icon: Code }
        ],
        tags: ["AI Tooling", "SVG", "Pipeline", "Web App"],
        role: ["Full-Stack Developer"],
        type: "Web App",
        animatedIcon: Stew
    },
    {
        id: "2",
        title: "Bandit Animation",
        description: "A Visual Animation tool that lets you animate your static SVG and export as React Component",
        longDescription: "What originally inspired me to build this software tool was an everyday problem I had grown tired of facing. Often, for school and work, I’m required to animate static SVGs. Doing this meant I’d be spending half of the day using heavy tools with long runtimes just to always end up hitting an enormous paywall at the end of my efforts. I wanted to build my own tool that gave users like me an upfront price and trial opportunity! I’ve created a solution for all the coders out there who are tired of not being able to see the animations they are coding. Bandit Animation is a software tool for anyone who wants to see in real time what their code is creating!",
        date: "2026-01",
        link: "https://www.banditanimation.com",
        image: "/banditthumb.png",
        homepageimage: "/racoon(banditanimation).jpg",
        video: "/bandit-demo.mp4",
        technologies: [
            { name: "Next.js", icon: Layout },
            { name: "TypeScript", icon: Code },
            { name: "Motion", icon: Code },
            { name: "Three.js", icon: Code },
            { name: "Bootstrap", icon: Layers },
            { name: "PostgreSQL", icon: Database },
            { name: "Supabase", icon: Database },
            { name: "Vercel", icon: Database },
            { name: "Stripe", icon: Box },
            { name: "RESTful API", icon: Server }
        ],
        tags: ["Full Stack", "Animation", "SaaS"],
        role: ["Full Stack Developer", "Founder"],
        type: "Web Application"
    },
    {
        id: "3",
        title: "OpenHand",
        description: "An Open Source real-time ASL Learning Tool that Designed to teach you sign language in Fun way!",
        longDescription: "OpenHand was a special project for me because it was the first time I was able to combine my interests in machine learning and education. I trained the Random Forest classifier using MediaPipe and OpenCV, and actually looked inside it instead of treating it like a black box. The tricky part was making it run live. The Python backend was processing frames while the Next.js frontend expected instant predictions. At first it lagged and felt clunky. I had to clean up the socket flow, reduce unnecessary data, and optimize how the frontend and backend talked to each other. That right there show me how signiofact the data flwo between parts of the code in itself",
        date: "2025-10",
        link: "https://openhand-eight.vercel.app/",
        image: "/openhand.png",
        homepageimage: "/openhand(homepage).jpg",
        technologies: [
            { name: "TypeScript", icon: Code },
            { name: "Python", icon: Server },
            { name: "Firebase", icon: Database },
            { name: "PyTorch", icon: Layers },
            { name: "MediaPipe", icon: Layers },
            { name: "HTML", icon: Code },
            { name: "CSS", icon: Code },
            { name: "RESTful API", icon: Server },
            { name: "FastAPI", icon: Layers },
            { name: "Bootstrap", icon: Layers },
            { name: "Render", icon: Database }
        ],
        tags: ["Open Source", "Random Forest", "AI", "Machine Learning", "Education"],
        role: ["Full Stack Developer", "Founder"],
        type: "Web Application"
    },
    {
        id: "4",
        title: "Med Brokerage",
        description: "A professinoal Front-end Website for a Dry bulk Shipping comany",
        longDescription: "This project required me to work one-on-one with the client and decide what was best for them, including how they could market and present themselves effectively. This was done under the company Domino Media.",
        date: "2024-11",
        link: "https://medbrokerage.com/",
        homepageimage: "/oceanview.jpg",
        image: "/medbrokerage.png",
        technologies: [
            { name: "PHP", icon: Code },
            { name: "JavaScript", icon: Code },
            { name: "TailwindCSS", icon: Layers },
            { name: "Bootstrap", icon: Layers },
            { name: "HTML", icon: Code },
            { name: "CSS", icon: Code }

        ],
        tags: ["Web Design", "Web Development"],
        role: ["Front-end Developer"],
        type: "Website"
    },
    {
        id: "5",
        title: "Northshore Aviary",
        description: "A professinoal Front-end Website for a Bird Shipping company",
        longDescription: "This project required me to work directly with the client to understand their bird shipping business and how they wanted to present themselves online. We discussed branding, trust, and how to clearly communicate their services to customers. I helped shape the structure and layout of the site to highlight professionalism and reliability. This was completed under Domino Media.",
        date: "2024-12",
        link: "https://northshoreaviary.com",
        image: "/northshoreAviary.png",
        homepageimage: "/birdsaviary(homepage).png",
        technologies: [
            { name: "PHP", icon: Code },
            { name: "JavaScript", icon: Code },
            { name: "TailwindCSS", icon: Layers },
            { name: "Bootstrap", icon: Layers },
            { name: "HTML", icon: Code },
            { name: "CSS", icon: Code }
        ],
        tags: ["Conservation", "Web App"],
        role: ["Front-end Developer"],
        type: "Website"
    },
    {
        id: "6",
        title: "Deniz Trading Corporation",
        date: "2024-11",
        description: "A professinoal Front-end Website for a Dry Bulk Shipping company",
        longDescription: "A professinoal Front-end Website for a Dry Bulk Shipping company. This project required me to work directly with the client to understand their dry bulk shipping business and how they wanted to present themselves online. We discussed branding, trust, and how to clearly communicate their services to customers. I helped shape the structure and layout of the site to highlight professionalism and reliability. This was completed under Domino Media.",
        link: "https://deniztradingco.com",
        image: "/deniztradingco.png",
        homepageimage: "/deniztradingco(homepage).png",
        technologies: [
            { name: "PHP", icon: Code },
            { name: "JavaScript", icon: Code },
            { name: "TailwindCSS", icon: Layers },
            { name: "Bootstrap", icon: Layers },
            { name: "HTML", icon: Code },
            { name: "CSS", icon: Code }
        ],
        tags: ["Web Design", "Web Development"],
        role: ["Front-end Developer"],
        type: "Website"
    },
    {
        id: "7",
        title: "Punchcard",
        description: "A Loyalty App that creates Digital Punchcards for a local businesses and shops to boost the engegement of customers",
        longDescription: "PunchCard was a project I started when I was working in restaurants. I always thought about how a specific restaurant could make more money, and the answer felt simple: “Hey, we remember you. Here’s your reward for coming back. The problem was that they were still giving out physical punch cards instead of digital ones, which are more secure and harder to fake. I wanted to bring that idea not just to one restaurant, but to all of them.",
        date: "2024-05",
        link: "http://54.147.192.29/",
        image: "/punchcard.png",
        homepageimage: "/punchcard(homepage).png",
        technologies: [
            { name: "React", icon: Code },
            { name: "MongoDB", icon: Database },
            { name: "Node.js", icon: Server },
            { name: "HTML", icon: Code },
            { name: "CSS", icon: Code },
            { name: "JavaScript", icon: Code },
            { name: "Bootstrap", icon: Layers },
            { name: "RESTful API", icon: Server }
        ],
        tags: ["Mobile App", "Productivity"],
        role: ["Full Stack Developer", "Founder"],
        type: "Mobile Application, Web Application"
    },
    {
        id: "8",
        title: "Course Compare",
        description: "A directory for comparing online courses to pick the best one for you",
        longDescription: "OnlineCourseCompare is my project to make online learning easier to compare without jumping between ten tabs. I built a pipeline that fetches course data from multiple platforms and turns it into one clean, searchable dataset. On the backend, I collect course links from category pages (including paginated results), then scrape the public course details like title, rating, instructor, image, level, and course URL. After that, I run a cleanup step to normalize everything, since each platform formats data differently. I remove duplicates, standardize fields (like ratings and durations), and tag each course by platform so it stays consistent in the database. To keep the listings fresh, I designed it so the scraper can run on a schedule, re-check categories, and update the stored data regularly. The goal is simple: give users a clean comparison experience, and give me a reliable data layer that stays up to date as courses change over time.",
        date: "2023-12",
        role: ["Full Stack Developer"],
        link: "https://www.onlinecoursecompare.com/",
        image: "/onlinecoursecompare.png",
        homepageimage: "/onlinecoursecompare(homepage).png",
        technologies: [
            { name: "Next.js", icon: Layout },
            { name: "Python", icon: Server },
            { name: "Bootstrap", icon: Layers },
            { name: "HTML", icon: Code },
            { name: "CSS", icon: Code },
            { name: "React.js", icon: Code },
            { name: "RESTful API", icon: Server },
            { name: "Beatifulsoup4", icon: Layers }
        ],
        tags: ["Education", "Directory"]
    },
    {
        id: "9",
        title: "Free NYC events",
        description: "A Website for everyone to find free events in NYC",
        longDescription: "Free NYC Events is a website that I built to help people find free events in New York City. It was a simple website that just scrapes multiple Public NYC webpages everynight at 2:00 AM and gather all he informaiton about the events and display it in a user friendly interface.",
        date: "2023-03",
        role: ["Full Stack Developer"],
        link: "https://freenycevents.com",
        image: "/freenyc.png",
        homepageimage: "/freenycevents(homepage).jpg",
        technologies: [
            { name: "Next.js", icon: Layout },
            { name: "TypeScript", icon: Code },
            { name: "React", icon: Code },
            { name: "RESTful API", icon: Server },
            { name: "Node.js", icon: Server },
            { name: "PostgreSQL", icon: Database },
            { name: "Cron", icon: Server },
            { name: "Bootstrap", icon: Layers },
            { name: "HTML", icon: Code },
            { name: "CSS", icon: Code },


        ],
        tags: ["Website", "Design"],
        type: "Website"
    }
];
