"use client";

import { useRef, useMemo, useEffect, useState } from "react";
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
                color: { value: new THREE.Color("#c64aff") },
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


// Background Layer with Parallax
// Background Layer with Parallax
function BackgroundLayer() {
    const meshRef = useRef<THREE.Mesh>(null);
    const texture = useMemo(() => new THREE.TextureLoader().load("/space-image.jpg"), []);
    const scrollRef = useRef(0);

    useEffect(() => {
        const handleScroll = () => {
            scrollRef.current = window.scrollY;
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useFrame((state) => {
        if (!meshRef.current) return;

        // Mouse Parallax (existing)
        const mouseX = (state.pointer.x * window.innerWidth) / window.innerWidth;
        const mouseY = -(state.pointer.y * window.innerHeight) / window.innerHeight;

        // target rotations based on mouse
        const targetRotX = mouseY * 0.02;
        const targetRotY = -mouseX * 0.02;

        // Apply mouse rotation
        meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, targetRotX, 0.02);
        meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, targetRotY, 0.02);

        // Scroll Parallax
        // We move the background slightly up/down based on scroll
        const targetY = scrollRef.current * 0.01;
        meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, targetY, 0.05);
    });

    return (
        <mesh ref={meshRef} position={[0, 0, -50]} scale={[120, 120, 1]}>
            <planeGeometry />
            <meshBasicMaterial map={texture} transparent opacity={0.3} />
        </mesh>
    );
}


export function NeonTunnel() {
    const { theme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return <div style={{ position: 'fixed', top: 0, left: 0, width: "100vw", height: "100vh", zIndex: -1, background: "#1A1A1B" }} />;

    const isDark = theme === "dark";

    const config = isDark ? {
        // bg: "#1A1A1B", // REMOVED: We want transparent-ish background to show space
        // Use a very dark overlay for the seamless blend if needed, or just let space show
        // But for "tunnel" feel, maybe we keep a base color but rely on the image
        bg: "#050505",
        line: "#c64aff",
        opacity: 0.1,
        bloomIntensity: 0.5
    } : {
        bg: "#F5F5F7",
        line: "#133500",
        opacity: 0.2,
        bloomIntensity: 0.0
    };

    return (
        <div style={{ position: 'fixed', top: 0, left: 0, width: "100vw", height: "100vh", zIndex: -1, background: isDark ? '#111' : config.bg, pointerEvents: "none", transition: "background 0.5s ease" }}>
            <Canvas camera={{ position: [0, 0, 5], fov: 60 }} gl={{ antialias: false, alpha: false }}>
                {/* Only attach solid color in light mode, or if we want to mix it. 
                    For space mode (dark), we rely on the image. 
                */}
                {!isDark && <color attach="background" args={[config.bg]} />}
                {isDark && <color attach="background" args={["#151515"]} />}

                {isDark && <BackgroundLayer />}

                <TunnelContent lineColor={config.line} opacity={config.opacity} />

                <EffectComposer enabled={isDark}>
                    <Bloom luminanceThreshold={0.0} luminanceSmoothing={0.9} height={300} intensity={config.bloomIntensity} />
                </EffectComposer>
            </Canvas>
        </div>
    );
}
