"use client";

import { useRef, useState, useSyncExternalStore } from "react";
import dynamic from "next/dynamic";
import { gsap, useGSAP, SplitText, EASE, fontsReady } from "@/lib/gsap";
import { finishIntro, introPending } from "@/lib/intro";
import styles from "./PageLoader.module.css";

// Stew only downloads on the visits that actually show the loader
const NewStew = dynamic(() => import("@/components/animation/microanimation/NewStew"), { ssr: false });

const noSubscribe = () => () => {};
const serverPending = () => false;

/**
 * First visit of the session only: Stew pops in, says hello, and the
 * curtain lifts into the page. Always in the server HTML so it covers the
 * very first paint; CSS hides it unless <html data-intro="play"> (set by
 * the boot script in layout.tsx).
 */
export default function PageLoader() {
    const root = useRef<HTMLDivElement>(null);
    const pending = useSyncExternalStore(noSubscribe, introPending, serverPending);
    const [gone, setGone] = useState(false);

    useGSAP((_, contextSafe) => {
        if (!pending || !root.current || !contextSafe) return;
        const q = gsap.utils.selector(root);

        // Split the greeting once the web fonts are in (they're preloaded)
        fontsReady().then(contextSafe(() => {
            const hello = SplitText.create(q(`.${styles.hello}`), { type: "chars", mask: "chars" });

            gsap.timeline({ defaults: { ease: EASE.out } })
                .set(q(`.${styles.hello}`), { autoAlpha: 1 })
                .from(q(`.${styles.stew}`), { scale: 0.4, yPercent: 30, autoAlpha: 0, duration: 0.9, ease: "back.out(1.8)" }, 0.15)
                .from(hello.chars, { yPercent: 110, duration: 0.8, stagger: 0.022 }, 0.35)
                .to(q(`.${styles.inner}`), { yPercent: -18, autoAlpha: 0, duration: 0.6, ease: "power2.in" }, "+=0.55")
                .to(root.current, { yPercent: -100, duration: 1, ease: EASE.inOut }, "-=0.25")
                // the hero starts rising while the curtain is still lifting
                .add(() => finishIntro(), "-=0.55")
                .add(() => setGone(true));
        }));
    }, { dependencies: [pending], scope: root });

    if (gone) return null;

    return (
        // Once playing, JS keeps it on screen: finishIntro() clears the html
        // flag before the curtain is fully up
        <div ref={root} className={styles.loader} style={pending ? { display: "flex" } : undefined} aria-hidden>
            <div className={styles.inner}>
                <div className={styles.stew}>{pending && <NewStew style={{ width: "100%", height: "100%" }} />}</div>
                <p className={styles.hello} data-anim>Hello there, traveller!</p>
            </div>
        </div>
    );
}
