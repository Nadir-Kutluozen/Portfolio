import SplitReveal from "@/components/animation/motion/SplitReveal";
import Reveal from "@/components/animation/motion/Reveal";
import styles from "./About.module.css";

/** The short version, centered, before the chapters start. */
export default function AboutIntro() {
    return (
        <section className={`shell section ${styles.intro}`} aria-labelledby="about-intro-title">
            <span className="t-eyebrow">The short version</span>
            <SplitReveal as="h2" id="about-intro-title" className="t-display t-l">
                Half engineer,
                <br />
                <span className="t-serif">half artist.</span>
            </SplitReveal>
            <Reveal as="p" className={`t-lead ${styles.introText}`}>
                I grew up drawing, got hooked on how things work under the hood, and never picked one. So I build tools
                where the complexity stays hidden and the fun stays with you. Hide the complexity, deliver simplicity.
                That&apos;s pretty much my whole philosophy.
            </Reveal>
        </section>
    );
}
