import HeroSection from "@/components/sections/hero/HeroSection";
import IntroSection from "@/components/sections/intro/IntroSection";
import ResearchSection from "@/components/sections/research/ResearchSection";
import StewSection from "@/components/sections/stew/StewSection";
import SelectedWork from "@/components/sections/work/SelectedWork";
import ArtSection from "@/components/sections/art/ArtSection";

export default function Home() {
    return (
        <>
            <HeroSection />
            <IntroSection />
            <ResearchSection />
            <StewSection />
            <SelectedWork />
            <ArtSection />
        </>
    );
}
