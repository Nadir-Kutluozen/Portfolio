// WARNING: Element ID "path-1-75zdn" is LINKED to parent "action-wrapper-path-1-75zdn" which has NO triggers. This element will not animate.

"use client";

import React from 'react';
import { motion, Variants } from 'framer-motion';

const variants_group_1772085025922: Variants = {};

const variants_path_1_75zdn: Variants = {
    initial: {},
    animate: {
        scale: 1
    },
    whileHover: {
        scale: [1, 1.3],
        transition: {
            scale: {
                duration: 0.1325077399380805,
                times: [0, 1],
                ease: "linear"
            },
            duration: 0.1325077399380805
        }
    },
    whileTap: {}
};

interface InstagramIconProps extends React.SVGProps<SVGSVGElement> {
    size?: number | string;
    stroke?: string;
    fill?: string;
}

export const InstagramIcon = ({ size, width, height, stroke, fill, ...props }: InstagramIconProps) => {
    
    // INTERACTIVE & BEHAVIORAL ACTIONS
    React.useEffect(() => {
        const actionConfigs: any[] = [{ id: 'action-wrapper-path-1-75zdn', type: 'followMouse', strength: 0.1, maxMove: 10 }, { id: 'action-wrapper-path-1-75zdn', type: 'blink', delay: 2000, duration: 150 }, { id: 'action-wrapper-path-2-xtu74', type: 'noise', intensity: 3, speed: 0.4 }];
        
        const mouseRef = { x: 0, y: 0 };
        const onMove = (e: MouseEvent) => {
            mouseRef.x = (e.clientX / window.innerWidth - 0.5) * 2;
            mouseRef.y = (e.clientY / window.innerHeight - 0.5) * 2;
        };
        window.addEventListener('mousemove', onMove);

        // Group Actions by Element ID
        const elementsMap = new Map();
        actionConfigs.forEach(config => {
            if (!elementsMap.has(config.id)) {
                elementsMap.set(config.id, []);
            }
            elementsMap.get(config.id).push(config);
        });
        const uniqueElements = Array.from(elementsMap.entries());

        // Initialize Styles for Transform Origin
        uniqueElements.forEach(([id]) => {
            const domEl = document.getElementById(id);
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

            uniqueElements.forEach(([id, actions]) => {
                const domEl = document.getElementById(id);
                if (!domEl) return;

                let tx = 0, ty = 0;
                let scaleY = 1;

                // Accumulate Transformations from all actions
                actions.forEach((el: any) => {
                    
                    // 1. FOLLOW MOUSE LOGIC
                    if (el.type === 'followMouse') {
                        const currentX = parseFloat(domEl.getAttribute('data-tx') || '0');
                        const currentY = parseFloat(domEl.getAttribute('data-ty') || '0');
                        
                        const targetX = mouseRef.x * el.maxMove * el.strength;
                        const targetY = mouseRef.y * el.maxMove * el.strength;
                        const k = 0.08; // Smoothness
                        
                        const nextX = currentX + (targetX - currentX) * k;
                        const nextY = currentY + (targetY - currentY) * k;

                        // Update State
                        domEl.setAttribute('data-tx', nextX.toFixed(3));
                        domEl.setAttribute('data-ty', nextY.toFixed(3));
                        
                        tx += nextX;
                        ty += nextY;
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
                    // 4. NOISE LOGIC
                    if (el.type === 'noise') {
                        const intensity = el.intensity || 5;
                        const speed = el.speed || 0.5;
                        const t = (time / 1000);
                        
                        let x, y;
                        if (speed > 0.8) {
                            x = (Math.random() - 0.5) * intensity;
                            y = (Math.random() - 0.5) * intensity;
                        } else {
                            const noiseX = Math.sin(t * speed * 50) + Math.cos(t * speed * 37);
                            const noiseY = Math.cos(t * speed * 43) + Math.sin(t * speed * 61);
                            x = noiseX * intensity * 0.5; 
                            y = noiseY * intensity * 0.5;
                        }
                        
                        tx += x;
                        ty += y;
                    }
                });

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
        <svg width={width || size || "300"} height={height || size || "300"} {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={fill || "none"} overflow="visible" id="svg-root-1lgcpn6u4">
<motion.g xmlns="" id="group-1772085025922" data-name="New Group" variants={variants_group_1772085025922} initial="initial" animate="animate" whileHover="whileHover" whileTap="whileTap" pointerEvents="bounding-box"><g xmlns="http://www.w3.org/2000/svg" id="action-wrapper-path-1-75zdn"><motion.path xmlns="" fillRule="evenodd" clipRule="evenodd" d="M 12 18 C 15.314 18 18 15.314 18 12 C 18 8.686 15.314 6 12 6 C 8.686 6 6 8.686 6 12 C 6 15.314 8.686 18 12 18 Z M 12 16 C 14.209 16 16 14.209 16 12 C 16 9.791 14.209 8 12 8 C 9.791 8 8 9.791 8 12 C 8 14.209 9.791 16 12 16 Z" fill={fill || "#0F0F0F"} id="path-1-75zdn" variants={variants_path_1_75zdn}/></g><g xmlns="http://www.w3.org/2000/svg" id="action-wrapper-path-2-xtu74"><path d="M 18 5 C 17.448 5 17 5.448 17 6 C 17 6.552 17.448 7 18 7 C 18.552 7 19 6.552 19 6 C 19 5.448 18.552 5 18 5 Z" fill={fill || "#0F0F0F"} id="path-2-xtu74"/></g><path xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd" d="M 1.654 4.276 C 1 5.56 1 7.24 1 10.6 V 13.4 C 1 16.76 1 18.441 1.654 19.724 C 2.229 20.853 3.147 21.771 4.276 22.346 C 5.56 23 7.24 23 10.6 23 H 13.4 C 16.76 23 18.441 23 19.724 22.346 C 20.853 21.771 21.771 20.853 22.346 19.724 C 23 18.441 23 16.76 23 13.4 V 10.6 C 23 7.24 23 5.56 22.346 4.276 C 21.771 3.147 20.853 2.229 19.724 1.654 C 18.441 1 16.76 1 13.4 1 H 10.6 C 7.24 1 5.56 1 4.276 1.654 C 3.147 2.229 2.229 3.147 1.654 4.276 Z M 13.4 3 H 10.6 C 8.887 3 7.722 3.002 6.822 3.075 C 5.945 3.147 5.497 3.277 5.184 3.436 C 4.431 3.819 3.819 4.431 3.436 5.184 C 3.277 5.497 3.147 5.945 3.075 6.822 C 3.002 7.722 3 8.887 3 10.6 V 13.4 C 3 15.113 3.002 16.278 3.075 17.178 C 3.147 18.055 3.277 18.503 3.436 18.816 C 3.819 19.569 4.431 20.18 5.184 20.564 C 5.497 20.723 5.945 20.853 6.822 20.925 C 7.722 20.998 8.887 21 10.6 21 H 13.4 C 15.113 21 16.278 20.998 17.178 20.925 C 18.055 20.853 18.503 20.723 18.816 20.564 C 19.569 20.18 20.18 19.569 20.564 18.816 C 20.723 18.503 20.853 18.055 20.925 17.178 C 20.998 16.278 21 15.113 21 13.4 V 10.6 C 21 8.887 20.998 7.722 20.925 6.822 C 20.853 5.945 20.723 5.497 20.564 5.184 C 20.18 4.431 19.569 3.819 18.816 3.436 C 18.503 3.277 18.055 3.147 17.178 3.075 C 16.278 3.002 15.113 3 13.4 3 Z" fill={fill || "#0F0F0F"} id="path-3-826e9"/></motion.g>


</svg>
    );
};
