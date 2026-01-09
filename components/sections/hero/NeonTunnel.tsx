"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";
import { useTheme } from "@/context/ThemeProvider";

interface TunnelContentProps {
    lineColor: string;
    opacity: number;
}

function TunnelContent({ lineColor, opacity }: TunnelContentProps) {
    const groupRef = useRef<THREE.Group>(null);
    // Use a ref to store mouse position to avoid re-renders
    const mouseRef = useRef({ x: 0, y: 0 });

    // Global mouse listener to bypass z-index blocking
    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            // Normalize to -1 to 1
            mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    // Configuration
    const width = 12;
    const height = 8;
    const length = 40;

    // Grid Lines Geometry
    // We want a "Box" grid - lines on floor, ceiling, left wall, right wall.
    // And cross sections.

    const gridGeometry = useMemo(() => {
        const points = [];
        const xSegs = 8;
        const ySegs = 4;
        const zSegs = 10;

        // Longitudinal lines (Z-axis)
        // Floor & Ceiling
        for (let i = 0; i <= xSegs; i++) {
            const x = (i / xSegs) * width * 2 - width;
            // Floor
            points.push(new THREE.Vector3(x, -height, 0));
            points.push(new THREE.Vector3(x, -height, -length));
            // Ceiling
            points.push(new THREE.Vector3(x, height, 0));
            points.push(new THREE.Vector3(x, height, -length));
        }

        // Walls
        for (let i = 0; i <= ySegs; i++) {
            const y = (i / ySegs) * height * 2 - height;
            // Left
            points.push(new THREE.Vector3(-width, y, 0));
            points.push(new THREE.Vector3(-width, y, -length));
            // Right
            points.push(new THREE.Vector3(width, y, 0));
            points.push(new THREE.Vector3(width, y, -length));
        }

        // Cross sections (X/Y axis frames at Z intervals)
        for (let i = 0; i <= zSegs; i++) {
            const z = -(i / zSegs) * length;

            // Frame rect
            points.push(new THREE.Vector3(-width, height, z));
            points.push(new THREE.Vector3(width, height, z));

            points.push(new THREE.Vector3(width, height, z));
            points.push(new THREE.Vector3(width, -height, z));

            points.push(new THREE.Vector3(width, -height, z));
            points.push(new THREE.Vector3(-width, -height, z));

            points.push(new THREE.Vector3(-width, -height, z));
            points.push(new THREE.Vector3(-width, height, z));
        }

        return new THREE.BufferGeometry().setFromPoints(points);
    }, []);

    // Custom Shader Material for "Reverse Fog"
    // Fades out near the camera (z = 0), bright far away
    const material = useMemo(() => {
        return new THREE.ShaderMaterial({
            uniforms: {
                color: { value: new THREE.Color("#00ffcc") },
                opacity: { value: 0.3 }
            },
            vertexShader: `
                varying float vZ;
                void main() {
                    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
                    vZ = mvPosition.z; // View space Z is negative
                    gl_Position = projectionMatrix * mvPosition;
                }
            `,
            fragmentShader: `
                uniform vec3 color;
                uniform float opacity;
                varying float vZ;
                void main() {
                    // vZ is negative. Camera is at 0.
                    // Near is close to 0. Far is negative.
                    
                    // We want fade at near (0 to -5)
                    // Bright at far (-5 to ...)
                    
                    float dist = abs(vZ);
                    float alpha = smoothstep(2.0, 15.0, dist) * opacity;
                    
                    gl_FragColor = vec4(color, alpha);
                }
            `,
            transparent: true,
            depthTest: false,
            // Default to Additive, but we will change this dynamically
            blending: THREE.AdditiveBlending
        });
    }, []);

    // Effect to update material uniforms AND blending when theme/props change
    useEffect(() => {
        if (material) {
            material.uniforms.color.value.set(lineColor);
            material.uniforms.opacity.value = opacity;

            // Check if we need to switch blending for Light Mode (Dark Lines)
            const col = new THREE.Color(lineColor);
            // If the color is dark (rgb sum < 1.0 is a safe bet for dark grey/black)
            const isDarkLine = (col.r + col.g + col.b) < 1.0;

            if (isDarkLine) {
                // Use NormalBlending for dark lines on light background
                material.blending = THREE.NormalBlending;
            } else {
                // Use AdditiveBlending for glowing light lines on dark background
                material.blending = THREE.AdditiveBlending;
            }
            material.needsUpdate = true;
        }
    }, [lineColor, opacity, material]);

    useFrame((state) => {
        if (!groupRef.current) return;

        // No auto movement

        // Parallax effect using custom global mouse tracker
        // Mouse Top-Left (x=-1, y=1) -> Camera moves Right-Bottom (x=+, y=-)

        const targetRotX = mouseRef.current.y * 0.07; // Look up/down
        const targetRotY = -mouseRef.current.x * 0.07; // Look left/right

        groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, 0.05);
        groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, 0.05);
    });

    return (
        <group ref={groupRef}>
            <lineSegments geometry={gridGeometry} material={material} />
        </group>
    );
}

export function NeonTunnel() {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    const config = isDark ? {
        bg: "#1A1A1B",
        line: "#c64aff",
        opacity: 0.1,
        vignette: 'radial-gradient(circle, rgba(0,0,0,0) 40%, rgba(0,0,0,0.9) 100%)',
        bloomIntensity: 0.5
    } : {
        bg: "#F5F5F7", // Apple-like light grey from globals
        line: "#133500", // Dark grey for contrast
        opacity: 0.2,
        vignette: 'radial-gradient(circle, rgba(255,255,255,0) 40%, rgba(0, 0, 0, 0.22) 100%)',
        bloomIntensity: 0.0 // Disable bloom for clean look
    };

    return (
        <div style={{ position: 'fixed', top: 0, left: 0, width: "100vw", height: "100vh", zIndex: -1, background: config.bg, pointerEvents: "none", transition: "background 0.5s ease" }}>
            <Canvas camera={{ position: [0, 0, 5], fov: 60 }} gl={{ antialias: false, alpha: false }}>
                <color attach="background" args={[config.bg]} />

                <TunnelContent lineColor={config.line} opacity={config.opacity} />

                <EffectComposer enabled={isDark}>
                    {/* Only enable bloom in dark mode to save perf and avoid light mode artifacts */}
                    <Bloom luminanceThreshold={0.0} luminanceSmoothing={0.9} height={300} intensity={config.bloomIntensity} />
                </EffectComposer>
            </Canvas>

            <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: config.vignette,
                pointerEvents: 'none',
                transition: "background 0.5s ease"
            }} />
        </div>
    );
}
