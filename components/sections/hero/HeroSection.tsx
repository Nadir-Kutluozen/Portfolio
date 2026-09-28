import { ArrowDown, ArrowUpRight } from "lucide-react";
import DynamicButton from "@/components/ui/DynamicButton";
import MediaHero from "./MediaHero";

/** Home hero: "Nadir in Motion" playing in the frame, the words in its empty corners. */
export default function HeroSection() {
    return (
        <MediaHero
            label="Intro"
            media={{
                kind: "video",
                src: "/videos/nadirinmotion-web.mp4",
                poster: "/videos/nadirinmotion-poster.jpg",
                label: "Nadir in Motion: a painting of a man playing guitar under a spotlight, gently moving",
                position: "50% 62%",
                mobilePosition: "56% 50%",
            }}
            eyebrow="Engineer · Artist · Researcher"
            titleLines={["Nadir", "Kutluozen"]}
            caption="Nadir in Motion, painted by me"
            intro={<>Engineer, artist and AI researcher in New York. I&apos;ve shipped 20+ websites and apps, published at NeurIPS, and I still draw every day.</>}
            actions={
                <>
                    <DynamicButton href="#work" variant="glass">
                        See my work <ArrowDown size={17} />
                    </DynamicButton>
                    <DynamicButton href="/about" variant="light">
                        About me <ArrowUpRight size={17} />
                    </DynamicButton>
                </>
            }
        />
    );
}
