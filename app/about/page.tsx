import type { Metadata } from "next";
import { ArrowDown } from "lucide-react";
import MediaHero from "@/components/sections/hero/MediaHero";
import AboutIntro from "@/components/sections/about/AboutIntro";
import AboutChapters from "@/components/sections/about/AboutChapters";
import ExperienceSection from "@/components/sections/about/ExperienceSection";
import ToolkitSection from "@/components/sections/about/ToolkitSection";
import StoryStack from "@/components/sections/about/StoryStack";
import DynamicButton from "@/components/ui/DynamicButton";

export const metadata: Metadata = {
    title: "About",
    description:
        "Engineer, artist and AI researcher. Twenty years of drawing, 20+ websites and web apps delivered, a paper at NeurIPS and research at Cold Spring Harbor Laboratory.",
};

export default function AboutPage() {
    return (
        <>
            <MediaHero
                label="About Nadir"
                media={{
                    kind: "image",
                    src: "/about/lofibaker.webp",
                    alt: "LoFi Baker, a skateboarding illustration seen through a fisheye camera lens",
                    position: "50% 50%",
                    mobilePosition: "50% 50%",
                }}
                eyebrow="About me"
                caption="LoFi Baker, drawn by me"
                layout="stack"
                titleLines={["Hi, I'm", "Nadir."]}
                intro={
                    <>
                        Engineer, artist and AI researcher. I&apos;ve been drawing for over twenty years and building
                        software for the last few, and I&apos;m happiest where the two meet.
                    </>
                }
                actions={
                    <DynamicButton href="#story" variant="glass">
                        Read my story <ArrowDown size={19} />
                    </DynamicButton>
                }
            />
            <AboutIntro />
            <AboutChapters />
            <ExperienceSection />
            <ToolkitSection />
            <StoryStack />
        </>
    );
}
