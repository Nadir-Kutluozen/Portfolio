import type { ReactNode } from "react";
import StewScene, { type SceneCrop } from "./StewScene";
import styles from "./InlineLogo.module.css";

interface InlineLogoProps {
    /** what the logo says, read out in its place */
    label: string;
    /** the logo's box inside its Stew scene */
    crop: SceneCrop;
    scene?: number;
    /** how tall it stands, in em. Past a line's height it rises into the
     *  space above instead of pushing the lines apart. */
    size?: number;
    className?: string;
    /** the logo, a Stew export, playing whatever it was made to play */
    children: ReactNode;
}

/** A logo set into a line of text in place of its words. */
export default function InlineLogo({ label, crop, scene, size = 1, className = "", children }: InlineLogoProps) {
    return (
        <span
            className={`${styles.logo} ${className}`}
            role="img"
            aria-label={label}
            style={{
                height: `${size}em`,
                aspectRatio: `${crop.width} / ${crop.height}`,
                marginTop: `${Math.min(0, 1 - size)}em`,
            }}
        >
            <StewScene crop={crop} scene={scene}>
                {children}
            </StewScene>
        </span>
    );
}
