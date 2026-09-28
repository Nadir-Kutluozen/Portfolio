"use client";

import { useRef, useState, type CSSProperties, type ReactNode } from "react";
import Image from "next/image";
import { Pause, Play } from "lucide-react";
import { gsap, useGSAP, SplitText, ScrollTrigger, EASE, MOTION, fontsReady } from "@/lib/gsap";
import { onIntroDone } from "@/lib/intro";
import LocalTime from "@/components/ui/LocalTime";
import { useLiquidGlass } from "@/hooks/useLiquidGlass";
import styles from "./MediaHero.module.css";

type Framing = { position?: string; mobilePosition?: string };

export type HeroMedia =
    | ({ kind: "image"; src: string; alt: string } & Framing)
    | ({ kind: "video"; src: string; poster: string; label: string } & Framing);

interface MediaHeroProps {
    /** aria-label for the section */
    label: string;
    media: HeroMedia;
    eyebrow: string;
    /** Each entry is one line of the heading */
    titleLines: string[];
    /** Small print under the heading, e.g. what the artwork is */
    caption?: string;
    intro: ReactNode;
    actions?: ReactNode;
    /**
     * "corners": name bottom left, intro bottom right (for art with an open
     * middle). "stack": intro under the name, bottom left (for busy art).
     */
    layout?: "corners" | "stack";
}

const DESKTOP_MOTION = "(min-width: 768px) and (prefers-reduced-motion: no-preference)";

/**
 * A full-screen photo or video in a squircle frame. The words live in the
 * corners (label top left, time top right, name bottom left, intro bottom
 * right) so the middle stays free for the artwork. On phones the words sit
 * under the frame instead. Plays after the first-visit loader lifts.
 */
export default function MediaHero({ label, media, eyebrow, titleLines, caption, intro, actions, layout = "corners" }: MediaHeroProps) {
    const root = useRef<HTMLElement>(null);
    const video = useRef<HTMLVideoElement>(null);
    const userPaused = useRef(false);
    const [playing, setPlaying] = useState(false);
    const { ref: controlRef, filter: controlGlass } = useLiquidGlass<HTMLButtonElement>({ enabled: media.kind === "video", strength: 22, bezel: 11 });

    useGSAP(() => {
        const q = gsap.utils.selector(root);
        const mm = gsap.matchMedia();

        mm.add(MOTION.ok, (ctx) => {
            let live = true;
            let stop = () => {};
            // Letters are split once the web fonts are in (preloaded, so quick)
            fontsReady().then(() => {
                if (!live) return;
                ctx.add(() => {
                    const letters = SplitText.create(q(`.${styles.word}`), { type: "chars" });
                    const tl = gsap.timeline({ paused: true, defaults: { ease: EASE.out } })
                        .set(q("[data-anim]"), { autoAlpha: 1 })
                        .from(q(`.${styles.frame}`), { scale: 0.94, duration: 1.6, ease: EASE.inOut }, 0)
                        .from(q(`.${styles.media}`), { scale: 1.25, duration: 2.2 }, 0)
                        .from(letters.chars, { yPercent: 118, duration: 1.1, stagger: 0.03 }, 0.5)
                        .from(q("[data-hero-fade]"), { y: 22, autoAlpha: 0, duration: 1, stagger: 0.08 }, 0.8);
                    stop = onIntroDone(() => tl.play());
                });
            });

            // The artwork drifts as you scroll away; a video rests while it's
            // off screen, unless you paused it yourself
            gsap.to(q(`.${styles.drift}`), {
                yPercent: 10,
                ease: "none",
                scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
            });
            const v = video.current;
            if (v) {
                v.play().catch(() => {});
                ScrollTrigger.create({
                    trigger: root.current,
                    start: "top top",
                    end: "bottom top",
                    onLeave: () => v.pause(),
                    onEnterBack: () => {
                        if (!userPaused.current) v.play().catch(() => {});
                    },
                });
            }

            return () => {
                live = false;
                stop();
            };
        });

        // Desktop only: the corner words float off as you scroll, and the
        // artwork leans a few pixels away from the pointer, like a window
        mm.add(DESKTOP_MOTION, () => {
            gsap.to(q("[data-hero-float]"), {
                yPercent: -30,
                opacity: 0,
                ease: "none",
                scrollTrigger: { trigger: root.current, start: "top top", end: "70% top", scrub: true },
            });

            const inner = q(`.${styles.lean}`)[0];
            if (!inner || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
            const xTo = gsap.quickTo(inner, "x", { duration: 1.2, ease: "power3.out" });
            const yTo = gsap.quickTo(inner, "y", { duration: 1.2, ease: "power3.out" });
            const move = (e: PointerEvent) => {
                xTo((e.clientX / window.innerWidth - 0.5) * -18);
                yTo((e.clientY / window.innerHeight - 0.5) * -12);
            };
            window.addEventListener("pointermove", move);
            return () => window.removeEventListener("pointermove", move);
        });

        // Reduced motion: everything visible, the video waits on its poster
        mm.add(MOTION.reduce, () => {
            gsap.set(q("[data-anim]"), { autoAlpha: 1 });
            video.current?.pause();
        });
    }, { scope: root });

    const toggleVideo = () => {
        const v = video.current;
        if (!v) return;
        userPaused.current = !v.paused;
        if (v.paused) v.play().catch(() => {});
        else v.pause();
    };

    const framing = {
        "--pos": media.position ?? "50% 50%",
        "--pos-mobile": media.mobilePosition ?? media.position ?? "50% 50%",
    } as CSSProperties;

    return (
        <section ref={root} className={styles.hero} aria-label={label} style={framing}>
            <div className={styles.frame}>
                <div className={styles.drift}>
                    <div className={styles.lean}>
                        {media.kind === "video" ? (
                            <video
                                ref={video}
                                className={styles.media}
                                src={media.src}
                                poster={media.poster}
                                muted
                                loop
                                playsInline
                                preload="auto"
                                aria-label={media.label}
                                onPlay={() => setPlaying(true)}
                                onPause={() => setPlaying(false)}
                            />
                        ) : (
                            <Image src={media.src} alt={media.alt} fill priority quality={85} sizes="100vw" className={styles.media} />
                        )}
                    </div>
                </div>
                <div className={styles.scrim} />

                <div className={styles.top} data-anim>
                    <span className="t-eyebrow" data-hero-fade>{eyebrow}</span>
                    <span className={styles.aside} data-hero-fade>
                        <LocalTime className={styles.time} />
                        {media.kind === "video" && (
                            <button
                                ref={controlRef}
                                type="button"
                                className={`liquid-glass ${styles.control}`}
                                onClick={toggleVideo}
                                aria-label={playing ? "Pause the video" : "Play the video"}
                                title={playing ? "Pause" : "Play"}
                            >
                                {controlGlass}
                                {playing ? <Pause size={14} fill="currentColor" /> : <Play size={14} fill="currentColor" />}
                            </button>
                        )}
                    </span>
                </div>
            </div>

            <div className={`${styles.bottom} ${layout === "stack" ? styles.stack : ""}`}>
                <div className={styles.cornerLeft} data-hero-float>
                    <h1 className={`t-display ${styles.title}`} data-anim>
                        {titleLines.map((line) => (
                            <span key={line} className={styles.line}>
                                <span className={styles.word}>{line}</span>
                            </span>
                        ))}
                    </h1>
                    {caption && (
                        <p className={styles.caption} data-anim>
                            <span data-hero-fade>{caption}</span>
                        </p>
                    )}
                </div>

                <div className={styles.cornerRight} data-hero-float>
                    <div className={styles.cornerInner} data-anim>
                        <p className={styles.intro} data-hero-fade>{intro}</p>
                        {actions && <div className={styles.actions} data-hero-fade>{actions}</div>}
                    </div>
                </div>
            </div>
        </section>
    );
}
