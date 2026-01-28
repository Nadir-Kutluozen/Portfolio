"use client";

import React, { useRef, useMemo } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import FootprintIcon from "@/components/icons/FootprintIcon";

interface FootstepPathProps {
    height: number;
}

// --- Calibration Controls ---
const CALIBRATION = {
    scale: 1.2,              // Size of the footprint
    stepWidth: 44,           // Horizontal width between left and right feet
    rotationOffsetLeft: 0,   // Rotation adjustment for left foot
    rotationOffsetRight: 0,  // Rotation adjustment for right foot
    centerOffset: { x: 2, y: 12 }, // Since viewBox is 24x24, center is 12,12
    stepStride: 60           // Distance between steps 
};

export default function FootstepPath({ height }: FootstepPathProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    // --- Configuration ---
    const amplitude = 60; // Width of the wave
    const frequency = 0.012; // How tight the wave is
    const strokeWidth = 2;

    // --- Generate SVG Path Data & Footstep Positions ---
    const { pathData, steps } = useMemo(() => {
        if (height <= 0) return { pathData: "", steps: [] };

        let d = `M 50 0`; // Start in the middle (assuming 100px width viewBox)
        const newSteps = [];

        // Draw the sine wave down
        for (let y = 0; y <= height; y += 5) {
            const x = 50 + amplitude * Math.sin(y * frequency);
            d += ` L ${x} ${y}`;
        }

        // Calculate footstep positions
        for (let y = CALIBRATION.stepStride; y < height; y += CALIBRATION.stepStride) {
            const x = 50 + amplitude * Math.sin(y * frequency);
            // Calculate tangent for rotation
            const derivative = amplitude * frequency * Math.cos(y * frequency);
            const angle = Math.atan(derivative) * (180 / Math.PI);

            // Alternate left/right offset from the line
            const isLeft = (y / CALIBRATION.stepStride) % 2 === 0;

            // Use calibration width
            const xOffset = CALIBRATION.stepWidth / 2;
            const xPos = x + (isLeft ? -xOffset : xOffset);

            newSteps.push({ x: xPos, y, angle, isLeft });
        }

        return { pathData: d, steps: newSteps };
    }, [height]);

    return (
        <div
            ref={containerRef}
            style={{
                position: 'absolute',
                top: 0,
                left: '50%',
                transform: 'translateX(-50%)',
                width: '100px', // Fixed width for the sine wave visual
                height: '100%',
                zIndex: 0,
                pointerEvents: 'none'
            }}
        >
            <svg
                width="100%"
                height="100%"
                viewBox={`0 0 100 ${height}`}
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ overflow: 'visible' }}
            >
                {/* The Path */}
                <motion.path
                    d={pathData}
                    stroke="var(--accent)"
                    strokeWidth={strokeWidth}
                    strokeOpacity="0.5" // Changed to 0.1 for subtle path
                    fill="none"
                    initial={{ pathLength: 0 }}
                    style={{ pathLength: scrollYProgress }}
                />

                {/* The Footsteps */}
                {steps.map((step, index) => (
                    <Footstep
                        key={index}
                        x={step.x}
                        y={step.y}
                        angle={step.angle}
                        isLeft={step.isLeft}
                        progress={scrollYProgress}
                        totalSteps={steps.length}
                        index={index}
                    />
                ))}
            </svg>
        </div>
    );
}

// Sub-component for individual footstep to handle transform logic cleanly
function Footstep({ x, y, angle, isLeft, progress, index, totalSteps }: { x: number, y: number, angle: number, isLeft: boolean, progress: MotionValue<number>, index: number, totalSteps: number }) {
    // Show the step when scroll progress reaches its relative position
    const stepProgressStart = (index / totalSteps) * 0.9; // Scale to finish before very end

    const opacity = useTransform(
        progress,
        [stepProgressStart - 0.05, stepProgressStart, stepProgressStart + 0.1],
        [0, 1, 0.5]
    );

    // Scale up slightly when "active"
    const scale = useTransform(
        progress,
        [stepProgressStart - 0.05, stepProgressStart],
        [0.5, CALIBRATION.scale]
    );

    // Calculate final rotation
    // Add 180 degrees because the SVG points UP (0 deg) but we are walking DOWN
    const rotationBase = angle + 180 + (isLeft ? CALIBRATION.rotationOffsetLeft : CALIBRATION.rotationOffsetRight);

    // Additional rotation to orient the feet forward correctly if the SVG is pointing up
    // Assuming SVG points UP (0 deg). If walking down, we might need 180 flip or dependent on path tangent.
    // The previous logic had angle. Let's ensure it maps well.
    // Typically path tangent angle is 0 for vertical down? No, vertical down is 90 deg in CSS?
    // Let's stick to the base logic but rely on user calibration for the final tweak.
    // Added 180 to rotation base if feet are pointing wrong way

    return (
        <motion.foreignObject
            x={x - CALIBRATION.centerOffset.x}
            y={y - CALIBRATION.centerOffset.y}
            width={24}
            height={24}
            style={{
                overflow: 'visible',
                transformOrigin: 'center',
                opacity,
                scale
            }}
        >
            <div style={{
                width: '100%',
                height: '100%',
                // Rotate to face direction, then flip X if it's the "Right" foot (swapped based on user feedback)
                transform: `rotate(${rotationBase}deg) scaleX(${isLeft ? 1 : -1})`,
                color: 'var(--accent)'
            }}>
                <FootprintIcon width="100%" height="100%" />
            </div>
        </motion.foreignObject>
    );
}
