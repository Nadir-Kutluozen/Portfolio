import HeroSection from "@/components/sections/hero/HeroSection";
import AboutSection from "@/components/sections/about/AboutSection";
import WorkTimeline from "@/components/sections/work/WorkTimeline";
import CallToAction from "@/components/sections/cta/CallToAction";

export default function Home() {
  return (
    <div style={{ paddingBottom: "2rem" }}>
      <HeroSection />
      <AboutSection />
      <WorkTimeline />
      <CallToAction title="If You like my work, let's talk!" description="I'm here to work and create something amazing!" buttonLink="/contact" buttonTitle="Let's Connect" />
    </div>
  );
}
