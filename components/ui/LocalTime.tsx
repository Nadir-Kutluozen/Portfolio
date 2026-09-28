"use client";

import { useMinuteClock } from "@/hooks/useMinuteClock";
import { profile } from "@/data/profile";

const format = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    timeZone: profile.timeZone,
});

/** "New York · 9:41 AM", live. Shows just the city until the page hydrates. */
export default function LocalTime({ className }: { className?: string }) {
    const now = useMinuteClock();
    return (
        <span className={className} suppressHydrationWarning>
            New York{now !== null && <> · <time dateTime={new Date(now).toISOString()}>{format.format(now)}</time></>}
        </span>
    );
}
