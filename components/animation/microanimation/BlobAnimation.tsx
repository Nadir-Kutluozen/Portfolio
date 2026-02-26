import { motion, Easing } from "framer-motion";

export interface BlobAnimationProps {
    /** The background color of the blob (e.g., "#eb00f7" or "rgba(255,0,0,0.5)") */
    color: string;
    /** The size of the blob as a CSS value (e.g., "300px" or "50%") */
    size: string;
    /** The blur radius for the CSS filter (e.g., "80px" or "4px") */
    blur: string;
    /** The CSS border-radius value to give it an organic shape (e.g., "40% 60% 70% 30% / 40% 50% 60% 50%") */
    borderRadius: string;
    /** The framer-motion easing function to use (e.g., "linear", "easeInOut") */
    transition?: Easing;
    /** The duration of one full rotation in seconds */
    duration: number;
    /** Additional CSS classes to apply to the animated inner div */
    className?: string;
    /** The z-index of the container layer (defaults to 0) */
    zIndex?: number;
}

/**
 * BlobAnimation
 * 
 * An ambient, purely visual rotating blob component. Useful for background glows and
 * organic, slow-moving abstract shapes. Uses framer-motion for smooth, infinite looping rotation
 * and subtle scale pulsing. 
 */
export default function BlobAnimation({
    color,
    size,
    blur,
    borderRadius,
    transition = "linear",
    className = "",
    duration,
    zIndex = 0,
}: BlobAnimationProps) {
    return (
        <div className={`position-absolute top-50 start-50 translate-middle z-${zIndex}`} style={{ pointerEvents: 'none' }}>
            <motion.div
                animate={{ rotate: [0, 360], scale: [1, 1.1, 1] }}
                transition={{ duration: duration, repeat: Infinity, ease: transition }}
                className={className}
                style={{
                    width: size,
                    height: size,
                    backgroundColor: color,
                    filter: `blur(${blur})`,
                    borderRadius: borderRadius,
                }}
            />
        </div>
    );
}