"use client";

import { useRef, useState } from "react";
import { Check, Copy } from "lucide-react";
import { profile } from "@/data/profile";
import styles from "./CopyEmail.module.css";

/** The email address as a big link, with a one-click copy next to it. */
export default function CopyEmail({ className = "" }: { className?: string }) {
    const [copied, setCopied] = useState(false);
    const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

    const copy = async () => {
        try {
            await navigator.clipboard.writeText(profile.email);
            setCopied(true);
            clearTimeout(timer.current);
            timer.current = setTimeout(() => setCopied(false), 1800);
        } catch {
            // no clipboard permission: the mailto link still works
        }
    };

    return (
        <div className={`${styles.row} ${className}`}>
            <a href={`mailto:${profile.email}`} className={styles.email}>
                {profile.email}
            </a>
            <button type="button" onClick={copy} className={styles.copy} aria-label="Copy email address">
                {copied ? <Check size={18} /> : <Copy size={18} />}
                <span aria-live="polite">{copied ? "Copied" : "Copy"}</span>
            </button>
        </div>
    );
}
