"use client";

import { useSyncExternalStore } from "react";

// One shared ticker for every clock on the page, checked every 15s so the
// minute flips on time without a timer per component.
const listeners = new Set<() => void>();
let timer: ReturnType<typeof setInterval> | undefined;

function subscribe(onTick: () => void) {
    listeners.add(onTick);
    if (!timer) timer = setInterval(() => listeners.forEach((fn) => fn()), 15_000);
    return () => {
        listeners.delete(onTick);
        if (!listeners.size && timer) {
            clearInterval(timer);
            timer = undefined;
        }
    };
}

const currentMinute = () => Math.floor(Date.now() / 60_000);
const noClockOnServer = () => null;

/**
 * The current time, rounded to the minute, as epoch ms. null during server
 * rendering and hydration, so a clock never causes a hydration mismatch.
 */
export function useMinuteClock(): number | null {
    const minute = useSyncExternalStore(subscribe, currentMinute, noClockOnServer);
    return minute === null ? null : minute * 60_000;
}
