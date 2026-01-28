import HeroSection from "@/components/sections/hero/HeroSection";
import AboutSection from "@/components/sections/about/AboutSection";
import WorkTimeline from "@/components/sections/work/WorkTimeline";
import HobbiesSection from "@/components/sections/hobbies/HobbiesSection";


export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <WorkTimeline />
      <HobbiesSection />
    </>
  );
}
