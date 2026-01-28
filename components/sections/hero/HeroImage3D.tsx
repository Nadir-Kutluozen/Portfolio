
"use client";
import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useTexture, shaderMaterial } from "@react-three/drei";
import * as THREE from "three";
import { useTheme } from "@/context/ThemeProvider";

// Shader Material
const ImageTransitionMaterial = shaderMaterial(
    {
        uTexture1: new THREE.Texture(),
        uTexture2: new THREE.Texture(),
        uProgress: 0,
        uPixels: new THREE.Vector2(1, 1),
        uUVOffset: new THREE.Vector2(0, 0)
    },
    // Vertex Shader
    `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
    // Fragment Shader
    `
    uniform sampler2D uTexture1;
    uniform sampler2D uTexture2;
    uniform float uProgress;
    uniform vec2 uPixels;
    varying vec2 vUv;

    void main() {
      vec2 uv = vUv;

      // Pixelation effect: snap UVs to grid
      // As uProgress moves away from 0 or 1, we want fewer pixels (larger blocks)
      // We can modulate resolution based on uProgress.
      
      // Calculate pixelation intensity based on transition progress (0 -> 0.5 -> 1)
      // When progress is 0 or 1, intensity is 0. At 0.5, intensity is max.
      float intensity = 1.0 - abs(uProgress - 0.5) * 2.0;
      
      // If we want a noticeable pixel effect, we divide UVs.
      // But we need high resolution normally.
      // Let's say normally pixels are infinite (using raw UV).
      // During transition, we snap.
      
      float pixels = 100.0 + (1.0 - intensity) * 4000.0; // 100 at max effect, 4100 at none
      
      vec2 dx = vec2(1.0 / pixels, 1.0 / pixels);
      vec2 coord = floor(uv / dx) * dx;
      
      vec4 tex1 = texture2D(uTexture1, coord);
      vec4 tex2 = texture2D(uTexture2, coord);
      
      gl_FragColor = mix(tex1, tex2, uProgress);
    }
  `
);

import { extend } from "@react-three/fiber";
extend({ ImageTransitionMaterial });

// Declare the material as a JSX element
declare module "@react-three/fiber" {
    interface ThreeElements {
        imageTransitionMaterial: any;
    }
}

const Scene = ({ theme }: { theme: string }) => {
    const materialRef = useRef<any>(null);

    // Load Textures
    const [tex1, tex2] = useTexture(["/nadirk.jpg", "/heroPhoto.JPG"]);

    // Target value: 0 = Light, 1 = Dark
    const target = theme === "dark" ? 1 : 0;

    // Store current value in a ref to persist across renders
    const currentProgress = useRef(target);

    useFrame((state, delta) => {
        if (materialRef.current) {
            // Lerp current progress towards target
            // Use standard lerp for smoothness
            // Speed factor of 5 provides a nice snappy responsiveness
            currentProgress.current = THREE.MathUtils.lerp(currentProgress.current, target, 5 * delta);

            // Update uniforms
            materialRef.current.uProgress = currentProgress.current;
            materialRef.current.uTexture1 = tex1;
            materialRef.current.uTexture2 = tex2;
        }
    });

    return (
        <mesh>
            <planeGeometry args={[2, 2]} />
            {/* Plane fills the view if camera is set up right or we scale it */}
            <imageTransitionMaterial ref={materialRef} transparent />
        </mesh>
    );
};

export default function HeroImage3D({ className }: { className?: string }) {
    const { theme } = useTheme();

    return (
        <div className={className}>
            <Canvas
                camera={{ position: [0, 0, 1], fov: 75 }} // Orthographic might be better for 2D image but Perspective is fine
                style={{ width: '100%', height: '100%' }}
                gl={{ preserveDrawingBuffer: true, antialias: true }}
                dpr={[1, 2]}
            >
                <Scene theme={theme} />
            </Canvas>
        </div>
    );
}
