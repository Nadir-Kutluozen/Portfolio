import type { CSSProperties, ReactNode } from "react";
import styles from "./StewScene.module.css";

/** A drawing's box inside a Stew scene, in scene units */
export interface SceneCrop {
    x: number;
    y: number;
    width: number;
    height: number;
}

interface StewSceneProps {
    /** everything outside this box is cropped away */
    crop: SceneCrop;
    /** the scene's size (Stew scenes are square) */
    scene?: number;
    /** the Stew export */
    children: ReactNode;
}

/**
 * A Stew export fitted to its drawing. It fills its parent (positioned, sized
 * at the crop's aspect) with the rest of the scene cropped away and the
 * scene's background square dropped. Only the drawing's own shapes catch the
 * pointer, so a hover built into the export fires on the drawing, not on the
 * empty scene around it.
 */
export default function StewScene({ crop, scene = 512, children }: StewSceneProps) {
    const frame: CSSProperties = {
        left: `${(-crop.x / crop.width) * 100}%`,
        top: `${(-crop.y / crop.height) * 100}%`,
        width: `${(scene / crop.width) * 100}%`,
        height: `${(scene / crop.height) * 100}%`,
    };
    return (
        <span className={styles.scene} style={frame}>
            {children}
        </span>
    );
}
