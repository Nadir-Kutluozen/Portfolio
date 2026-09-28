import type { SocialId } from "@/data/profile";
import { MailboxIcon } from "@/components/animation/microanimation/MailboxIcon";
import { GithubIcon } from "@/components/animation/microanimation/GithubIcon";
import { LinkedinIcon } from "@/components/animation/microanimation/LinkedinIcon";
import { InstagramIcon } from "@/components/animation/microanimation/InstagramIcon";

/** The animated icon for a social link. Wrap it in [data-hover-root] to play it on hover of the whole link. */
export default function SocialIcon({ id, size = 24 }: { id: SocialId; size?: number }) {
    switch (id) {
        case "email":
            return <MailboxIcon size={size} />;
        case "github":
            return <GithubIcon size={size} />;
        case "linkedin":
            return <LinkedinIcon size={size} />;
        case "instagram":
            return <InstagramIcon size={size} />;
    }
}
