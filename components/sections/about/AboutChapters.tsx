import SplitPanel, { type PanelTone } from "@/components/sections/split/SplitPanel";
import Reveal from "@/components/animation/motion/Reveal";
import styles from "./About.module.css";

interface Chapter {
    /** Anchor for links like /about#research */
    id: string;
    tone: PanelTone;
    reverse?: boolean;
    image: { src: string; alt: string; position?: string };
    eyebrow: string;
    quote: string;
    body: string;
}

const CHAPTERS: Chapter[] = [
    {
        id: "artist",
        tone: "orange",
        image: { src: "/about/nadir-drawing.webp", alt: "Nadir drawing a charcoal mountain landscape", position: "50% 55%" },
        eyebrow: "01 · The artist",
        quote: "All I wanted was to make things move.",
        body: "As a kid I lived on Jetix and Fox Kids. Twenty years of sketchbooks later I'm still that kid. I draw every day, on paper or on the iPad, and I sign my work Nadir K.",
    },
    {
        id: "engineer",
        tone: "purple",
        reverse: true,
        image: { src: "/nadirk.jpg", alt: "Nadir smiling in a park in New York", position: "50% 40%" },
        eyebrow: "02 · The engineer",
        quote: "Hide the complexity. Deliver simplicity.",
        body: "I've delivered more than 20 websites and web apps. It started with sites for restaurants and local businesses at Domino Media and kept going: full stack products of my own, scrapers that run every night, and an ASL tutor that runs a model live.",
    },
    {
        id: "research",
        tone: "cyan",
        image: { src: "/heroPhoto.JPG", alt: "Nadir under blue stage lights, deep in thought", position: "40% 40%" },
        eyebrow: "03 · The researcher",
        quote: "Probing on its own is not enough.",
        body: "At Cold Spring Harbor Laboratory I applied sparse autoencoders to see what models actually learn. My NeurIPS 2026 paper with Christian Internò and David Klindt, Is a Linear Probe Evidence of a Linear Representation?, argues that a high probe score doesn't prove what interpretability claims it does. Right now I'm working on emotionally intelligent models.",
    },
];

/** Three Spotify-style panels: the artist, the engineer, the researcher. */
export default function AboutChapters() {
    return (
        <div id="story" className={styles.chapters}>
            {CHAPTERS.map((c) => (
                <SplitPanel key={c.id} id={c.id} tone={c.tone} reverse={c.reverse} image={c.image} className={styles.chapter}>
                    <Reveal className={styles.chapterCopy} stagger={0.1}>
                        <span className="t-eyebrow">{c.eyebrow}</span>
                        <p className={`t-quote ${styles.chapterQuote}`}>{c.quote}</p>
                        <p className={styles.chapterBody}>{c.body}</p>
                    </Reveal>
                </SplitPanel>
            ))}
        </div>
    );
}
