"use client";

import React from 'react';
import { motion, Variants } from 'framer-motion';



interface RoyalcrownofanorientalkingsvgrepocomProps extends React.SVGProps<SVGSVGElement> {
    size?: number | string;
    stroke?: string;
    fill?: string;
}

export const Rolay = ({ size, width, height, stroke, fill, ...props }: RoyalcrownofanorientalkingsvgrepocomProps) => {

    // INTERACTIVE & BEHAVIORAL ACTIONS
    React.useEffect(() => {
        const elements: any[] = [{ id: 'action-wrapper-group-1770080524879', type: 'followMouse', strength: 0.1, maxMove: 17 }, { id: 'action-wrapper-group-1770080509582', type: 'followMouse', strength: 0.1, maxMove: 17 }, { id: 'action-wrapper-g-1-7g2d8', type: 'float', speed: 1, amplitude: 10 }, { id: 'action-wrapper-path-2-eblbs', type: 'float', speed: 1, amplitude: 10 }];
        const mouseRef = { x: 0, y: 0 };

        const onMove = (e: MouseEvent) => {
            mouseRef.x = (e.clientX / window.innerWidth - 0.5) * 2;
            mouseRef.y = (e.clientY / window.innerHeight - 0.5) * 2;
        };
        window.addEventListener('mousemove', onMove);

        // Initialize Styles for Transform Origin
        elements.forEach(el => {
            const domEl = document.getElementById(el.id);
            if (domEl) {
                domEl.style.transformBox = 'fill-box';
                domEl.style.transformOrigin = 'center';
            }
        });

        let rafId: number;
        const startTime = performance.now();

        const animate = () => {
            const time = performance.now() - startTime; // Time in ms
            const seconds = time / 1000;

            elements.forEach(el => {
                const domEl = document.getElementById(el.id);
                if (!domEl) return;

                let tx = 0, ty = 0;
                let scaleY = 1;

                // 1. FOLLOW MOUSE LOGIC
                if (el.type === 'followMouse') {
                    const currentX = parseFloat(domEl.getAttribute('data-tx') || '0');
                    const currentY = parseFloat(domEl.getAttribute('data-ty') || '0');

                    const targetX = mouseRef.x * el.maxMove;
                    const targetY = mouseRef.y * el.maxMove;
                    const k = 0.08; // Smoothness

                    const nextX = currentX + (targetX - currentX) * k;
                    const nextY = currentY + (targetY - currentY) * k;

                    // Update State
                    domEl.setAttribute('data-tx', nextX.toFixed(3));
                    domEl.setAttribute('data-ty', nextY.toFixed(3));

                    tx += nextX;
                    ty += nextY;
                }

                // 2. FLOAT LOGIC
                if (el.type === 'float') {
                    const floatY = Math.sin(seconds * el.speed * 2) * el.amplitude;
                    ty += floatY;
                }

                // 3. BLINK LOGIC
                if (el.type === 'blink') {
                    const totalCycle = el.delay + el.duration;
                    const currentInCycle = time % totalCycle;

                    if (currentInCycle > el.delay) {
                        const blinkTime = currentInCycle - el.delay;
                        const progress = blinkTime / el.duration;
                        const closeAmount = Math.sin(progress * Math.PI);
                        scaleY = 1 - (0.9 * closeAmount);
                    }
                }

                // Apply Combined Transform
                domEl.style.transform = `translate(${tx}px, ${ty}px) scaleY(${scaleY.toFixed(3)})`;
            });

            rafId = requestAnimationFrame(animate);
        };

        rafId = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener('mousemove', onMove);
            cancelAnimationFrame(rafId);
        };
    }, []);

    return (
        <svg width={width || size || "300"} height={height || size || "300"} {...props} xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" fill={fill || "#000000"} version="1.1" id="Capa_1" viewBox="0 0 198.509 198.509" xmlSpace="preserve" overflow="visible"><g id="action-wrapper-path-2-eblbs"><path d="M196.325,71.68c-2.18-1.373-5.061-0.719-6.448,1.458l-32.809,52.068L106.412,74.56c6.899-2.831,11.789-9.603,11.789-17.509   c0-10.449-8.494-18.943-18.943-18.943c-10.443,0-18.943,8.495-18.943,18.943c0,7.907,4.884,14.678,11.779,17.509l-50.649,50.646   L8.639,73.138c-1.376-2.183-4.263-2.831-6.452-1.458c-2.189,1.376-2.844,4.265-1.467,6.445l38.286,60.757   c0.861,1.364,2.35,2.192,3.961,2.192h112.579c1.62,0,3.1-0.828,3.97-2.192l38.277-60.757   C199.162,75.945,198.511,73.056,196.325,71.68z M94.588,131.71H48.173l46.415-46.4V131.71z M103.946,85.31l46.405,46.4h-46.405   V85.31z M99.264,47.46c5.279,0,9.591,4.296,9.591,9.59c0,5.282-4.299,9.578-9.591,9.578c-5.294,0-9.59-4.296-9.59-9.578   C89.68,51.762,93.981,47.46,99.264,47.46z M160.624,155.726c0,2.569-2.095,4.676-4.676,4.676H42.592   c-2.582,0-4.677-2.106-4.677-4.676c0-2.582,2.095-4.677,4.677-4.677h113.356C158.529,151.049,160.624,153.144,160.624,155.726z" id="path-2-eblbs" /></g></svg>
    );
};
