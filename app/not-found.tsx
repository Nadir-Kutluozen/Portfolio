import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import StewMascot from "@/components/animation/microanimation/StewMascot";
import DynamicButton from "@/components/ui/DynamicButton";
import styles from "./not-found.module.css";

export const metadata: Metadata = { title: "Page not found" };

export default function NotFound() {
    return (
        <section className={`shell ${styles.lost}`} aria-labelledby="lost-title">
            <div className={styles.stew}>
                <StewMascot />
            </div>
            <span className="t-eyebrow">404</span>
            <h1 id="lost-title" className="t-display t-l">
                Stew took <span className="t-serif">this one.</span>
            </h1>
            <p className="t-lead">The page you&apos;re looking for isn&apos;t here. He does that.</p>
            <DynamicButton href="/" size="lg">
                Back home <ArrowUpRight size={19} />
            </DynamicButton>
        </section>
    );
}
