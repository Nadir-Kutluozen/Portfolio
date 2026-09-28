import { toolkit } from "@/data/profile";
import SplitReveal from "@/components/animation/motion/SplitReveal";
import Reveal from "@/components/animation/motion/Reveal";
import styles from "./About.module.css";

/** What I build with, grouped, as soft squircle chips. */
export default function ToolkitSection() {
    return (
        <section className="shell section" aria-labelledby="toolkit-title">
            <span className="t-eyebrow">Toolkit</span>
            <SplitReveal as="h2" id="toolkit-title" className={`t-display t-l ${styles.sectionTitle}`}>
                What I build <span className="t-serif">with</span>
            </SplitReveal>

            <Reveal className={styles.toolGroups} stagger={0.08}>
                {toolkit.map((group) => (
                    <div key={group.name} className={styles.toolGroup}>
                        <h3 className={styles.toolName}>{group.name}</h3>
                        <ul className={styles.chips}>
                            {group.items.map((item) => (
                                <li key={item}>{item}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </Reveal>
        </section>
    );
}
