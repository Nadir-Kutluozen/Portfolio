import { ArrowUpRight } from "lucide-react";
import { paper } from "@/data/profile";
import SplitPanel from "@/components/sections/split/SplitPanel";
import PanelCopy from "@/components/sections/split/PanelCopy";
import DynamicButton from "@/components/ui/DynamicButton";

/** My research: the NeurIPS 2026 paper, Cold Spring Harbor, and what I'm working on now. */
export default function ResearchSection() {
    const coauthors = paper.authors.slice(1).join(" and ");

    return (
        <SplitPanel
            tone="purple"
            reverse
            image={{ src: "/heroPhoto.JPG", alt: "Nadir Kutluozen at a table under blue stage lights", position: "40% 35%" }}
            aria-labelledby="research-title"
        >
            <PanelCopy
                eyebrow={`Research · ${paper.venue} ${paper.format.toLowerCase()}`}
                title={
                    <>
                        Published at <span className="t-serif">NeurIPS</span>
                    </>
                }
                titleId="research-title"
                quote={paper.title}
                actions={
                    <>
                        {paper.href && (
                            <DynamicButton href={paper.href} variant="light" size="lg">
                                Read the paper <ArrowUpRight size={19} />
                            </DynamicButton>
                        )}
                        <DynamicButton href="/about#research" variant={paper.href ? "tint" : "light"} size="lg">
                            My research <ArrowUpRight size={19} />
                        </DynamicButton>
                    </>
                }
            >
                With {coauthors}, I show that linear probing is too lenient a test for the linear representation
                hypothesis, and that the structure it ignores matters for generalization. I also conducted AI research
                at Cold Spring Harbor Laboratory, and right now I&apos;m working on emotionally intelligent models.
            </PanelCopy>
        </SplitPanel>
    );
}
