"use client";

import React from 'react';
import { motion, Variants } from 'framer-motion';

const variants_group_1770830222192: Variants = {};

const variants_path_1_0crb1: Variants = {
    initial: {},
    animate: {
        d: "M 15.8 52.1 C 9 47.7 6.3 30.6 8.5 22.9 C 10.1 17.1 16.3 8.6 21.9 6.4 C 26.6 4.5 37.4 4.5 42 6.4 C 47.6 8.6 53.8 17.1 55.4 22.9 C 57.6 30.7 55.9 47.7 49.2 52.1 C 35 61.3 30 61.3 15.8 52.1"
    },
    whileHover: {
        d: "M 15.8 52.1 C 9 47.7 6.3 30.6 8.5 22.9 C 10.1 17.1 16.3 8.6 27.192 18.536 C 26.6 4.5 37.4 4.5 37.457 18.536 C 47.6 8.6 53.8 17.1 55.4 22.9 C 57.6 30.7 55.9 47.7 49.2 52.1 C 35 61.3 30 61.3 15.8 52.1",
        transition: {
            duration: 0.5
        }
    },
    whileTap: {}
};

const variants_g_15_9i7eg: Variants = {};

interface DogfaceProps extends React.SVGProps<SVGSVGElement> {
    size?: number | string;
    stroke?: string;
    fill?: string;
}

export const Dogface = ({ size, width, height, stroke, fill, ...props }: DogfaceProps) => {

    // INTERACTIVE & BEHAVIORAL ACTIONS
    React.useEffect(() => {
        const actionConfigs: any[] = [{ id: 'action-wrapper-circle-8-apqf6', type: 'followMouse', strength: 0.1, maxMove: 10 }, { id: 'action-wrapper-circle-9-x233s', type: 'followMouse', strength: 0.1, maxMove: 10 }, { id: 'action-wrapper-circle-7-cgbso', type: 'followMouse', strength: 0.1, maxMove: 10 }, { id: 'action-wrapper-circle-6-3t0o1', type: 'followMouse', strength: 0.1, maxMove: 10 }];

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
        <svg width={width || size || "212"} height={height || size || "212"} {...props} xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 64 64" aria-hidden="true" role="img" className="iconify iconify--emojione" preserveAspectRatio="xMidYMid meet" overflow="visible" id="svg-root-lmkx44l5g">

            <motion.g xmlns="" id="group-1770830222192" data-name="New Group" variants={variants_group_1770830222192} initial="initial" animate="animate" whileHover="whileHover" whileTap="whileTap" pointerEvents="bounding-box"><motion.path d="M 15.8 52.1 C 9 47.7 6.3 30.6 8.5 22.9 C 10.1 17.1 16.3 8.6 21.9 6.4 C 26.6 4.5 37.4 4.5 42 6.4 C 47.6 8.6 53.8 17.1 55.4 22.9 C 57.6 30.7 55.9 47.7 49.2 52.1 C 35 61.3 30 61.3 15.8 52.1" fill={fill || "#f5d1ac"} id="path-1-0crb1" variants={variants_path_1_0crb1}>

            </motion.path><path xmlns="http://www.w3.org/2000/svg" d="M 5.1 24.7 C 8.7 32.6 9.6 32.9 13 23.5 C 14.8 18.5 13.5 15.5 15.7 12.3 C 16.9 10.5 19.6 7.5 19.6 7.5 S -1.7 9.7 5.1 24.7" fill={fill || "#423223"} id="path-2-n13sh">

                </path><path xmlns="http://www.w3.org/2000/svg" d="M 14.2 7.2 C 8.8 10.7 -2.7 9.3 4.1 24.2 C 7.7 32.1 8.6 32.4 12 23 C 13.8 18 12.5 15 14.7 11.8 C 15.9 10 19.6 7.5 19.6 7.5 S 17.9 4.8 14.2 7.2" fill={fill || "#947151"} id="path-3-mp967">

                </path><path xmlns="http://www.w3.org/2000/svg" d="M 58.9 24.6 C 55.3 32.5 54.4 32.8 51 23.4 C 49.2 18.4 50.5 15.4 48.3 12.2 C 47.1 10.4 44.4 7.4 44.4 7.4 S 65.7 9.7 58.9 24.6" fill={fill || "#423223"} id="path-4-gazob">

                </path><path xmlns="http://www.w3.org/2000/svg" d="M 49.8 7.2 C 55.2 10.7 66.7 9.3 59.9 24.2 C 56.3 32.1 55.4 32.4 52 23 C 50.2 18 51.5 15 49.3 11.8 C 48.1 10 44.4 7.5 44.4 7.5 S 46.1 4.8 49.8 7.2" fill={fill || "#947151"} id="path-5-bnmg2">

                </path><g xmlns="http://www.w3.org/2000/svg" id="action-wrapper-circle-6-3t0o1"><circle cx="17.7" cy="30.7" fill={fill || "#ffffff"} r="6" id="circle-6-3t0o1">

                </circle></g><g xmlns="http://www.w3.org/2000/svg" id="action-wrapper-circle-7-cgbso"><circle cx="16.2" cy="30.7" fill={fill || "#3e4347"} r="4.5" id="circle-7-cgbso">

                </circle></g><g xmlns="http://www.w3.org/2000/svg" id="action-wrapper-circle-8-apqf6"><circle cx="46.3" cy="30.7" fill={fill || "#ffffff"} r="6" id="circle-8-apqf6">

                </circle></g><g xmlns="http://www.w3.org/2000/svg" id="action-wrapper-circle-9-x233s"><circle cx="47.8" cy="30.7" fill={fill || "#3e4347"} r="4.5" id="circle-9-x233s">

                </circle></g><path xmlns="http://www.w3.org/2000/svg" d="M 21.7 48.8 L 26.3 53.7 C 29.1 56.6 34.8 56.6 37.6 53.7 L 42.3 48.8 L 37.5 43.8 H 26.5 43.8 L 21.7 48.8" fill={fill || "#7d644b"} id="path-10-e5j20">

                </path><path xmlns="http://www.w3.org/2000/svg" d="M 32 39.6 S 27.1 46.6 27.7 49.9 C 28.5 54.7 35.4 54.7 36.3 49.9 C 36.9 46.6 32 39.6 32 39.6" fill={fill || "#f15a61"} id="path-11-st05x">

                </path><path xmlns="http://www.w3.org/2000/svg" d="M 32 51.7 L 33.1 45 H 30.9 45 L 32 51.7" fill={fill || "#ba454b"} id="path-12-fi4pg">

                </path><path xmlns="http://www.w3.org/2000/svg" fill={fill || "#423223"} d="M 27 41.5 H 37 41.5 V 37 46.1 H 27 46.1 Z" id="path-13-s7874">

                </path><path xmlns="http://www.w3.org/2000/svg" d="M 47.8 42.6 L 40.7 35.1 C 36.4 30.6 27.6 30.6 23.3 35.1 L 16.2 42.6 C 14.2 44.7 14.2 48.2 16.2 50.3 C 18.2 52.4 21.5 52.4 23.5 50.3 L 30.6 42.8 C 31.3 42.1 32.6 42.1 33.3 42.8 L 40.4 50.3 C 42.4 52.4 45.7 52.4 47.7 50.3 C 49.9 48.2 49.9 44.7 47.8 42.6" fill={fill || "#947151"} id="path-14-ufgyd">

                </path><motion.g fill={fill || "#3e4347"} id="g-15-9i7eg" variants={variants_g_15_9i7eg} pointerEvents="bounding-box">

                    <path xmlns="http://www.w3.org/2000/svg" d="M 26.1 35.7 C 26.1 33.1 28.7 32.6 32 32.6 C 35.3 32.6 37.9 33.1 37.9 35.7 C 37.9 37.8 33.2 39.6 32 39.6 C 30.8 39.6 26.1 37.7 26.1 35.7" id="path-16-ihqyp">

                    </path>

                    <path xmlns="http://www.w3.org/2000/svg" d="M 23.31 39.012 L 24.299 38.02 L 25.29 39.009 L 24.301 40 Z" id="path-17-aexcg">

                    </path>

                    <path xmlns="http://www.w3.org/2000/svg" d="M 20.947 41.811 L 21.936 40.82 L 22.926 41.809 L 21.938 42.799 Z" id="path-18-p5s0f">

                    </path>

                    <path xmlns="http://www.w3.org/2000/svg" d="M 24.125 42.763 L 25.114 41.772 L 26.105 42.76 L 25.117 43.752 Z" id="path-19-w8ejo">

                    </path>

                    <path xmlns="http://www.w3.org/2000/svg" d="M 38.703 38.988 L 39.695 38 L 40.683 38.991 L 39.692 39.98 Z" id="path-20-eu06b">

                    </path>

                    <path xmlns="http://www.w3.org/2000/svg" d="M 41.128 41.762 L 42.12 40.773 L 43.108 41.764 L 42.117 42.753 Z" id="path-21-janwe">

                    </path>

                    <path xmlns="http://www.w3.org/2000/svg" d="M 37.947 42.811 L 38.938 41.823 L 39.927 42.813 L 38.936 43.803 Z" id="path-22-m04qk">

                    </path>

                </motion.g></motion.g>





























        </svg>
    );
};
