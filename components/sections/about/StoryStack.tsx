import Image from "next/image";
import PinnedStack from "@/components/animation/motion/PinnedStack";
import styles from "./StoryStack.module.css";

/**
 * Full-screen cards that slide over each other while the section is pinned:
 * what I believe, then what I'm working on right now.
 */
export default function StoryStack() {
    return (
        <PinnedStack className={styles.stack}>
            {/* 1 · What I believe, over LoFi Magnify */}
            <div className={styles.art}>
                <div className={styles.media}>
                    <Image src="/about/lofi-magnify.webp" alt="An astronaut standing in a watercolor galaxy" fill quality={85} sizes="100vw" style={{ objectFit: "cover" }} />
                    <div className={styles.scrim} />
                </div>
                <div className={styles.artCopy}>
                    <span className="t-eyebrow">What I believe</span>
                    <h2 className={`t-display ${styles.headline}`}>AI should hand you the pencil.</h2>
                    <p className={styles.sub}>
                        Not make the art for you. The best tools help you learn faster and clear the busywork, so the
                        fun part stays yours. Every pixel matters, and so does every line of code.
                    </p>
                </div>
            </div>

            {/* 2 · Right now, over Wired Raccoon */}
            <div className={styles.art}>
                <div className={styles.media}>
                    <Image src="/about/wired-raccoon.webp" alt="A raccoon face painted in vivid color splashes" fill quality={85} sizes="100vw" style={{ objectFit: "cover" }} />
                    <div className={styles.scrim} />
                </div>
                <div className={styles.artCopy}>
                    <span className="t-eyebrow">What I&apos;m working on now</span>
                    <h2 className={`t-display ${styles.headline}`}>Emotionally intelligent models.</h2>
                    <p className={styles.sub}>
                        After the research at Cold Spring Harbor Laboratory and the paper at NeurIPS, I&apos;m working on
                        AI that understands how people feel.
                    </p>
                </div>
            </div>
        </PinnedStack>
    );
}
