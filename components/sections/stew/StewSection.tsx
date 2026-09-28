import { ArrowUpRight } from "lucide-react";
import { profile } from "@/data/profile";
import SplitPanel from "@/components/sections/split/SplitPanel";
import PanelCopy from "@/components/sections/split/PanelCopy";
import DynamicButton from "@/components/ui/DynamicButton";
import StewMascot from "@/components/animation/microanimation/StewMascot";
import styles from "./StewSection.module.css";

/** The company I run: photo on one side, Stew green on the other, Stew himself in the corner. */
export default function StewSection() {
    return (
        <SplitPanel
            tone="green"
            image={{ src: "/about/nadir.webp", alt: "Nadir drawing on an iPad at a cafe table", position: "60% 40%" }}
            aria-labelledby="stew-title"
        >
            <PanelCopy
                eyebrow="My company · CEO"
                title="Stew Factory"
                titleId="stew-title"
                quote="Type a sentence, get a real vector, make it move."
                actions={
                    <>
                        <DynamicButton href={profile.stewUrl} variant="light" size="lg">
                            Visit stewfactory.app <ArrowUpRight size={19} />
                        </DynamicButton>
                        <DynamicButton href="/projects/stew-factory" variant="tint" size="lg">
                            The story
                        </DynamicButton>
                    </>
                }
            >
                It&apos;s the full-stack vector animation editor I&apos;m building with my brothers Ali and Erkan. You
                animate on a real GSAP timeline, then export production code for React, Vue, Angular or plain HTML.
                Video too.
            </PanelCopy>

            <div className={styles.mascot}>
                <span className={styles.caption}>Hover me. I&apos;m Stew.</span>
                <div className={styles.stew}>
                    <StewMascot />
                </div>
            </div>
        </SplitPanel>
    );
}
