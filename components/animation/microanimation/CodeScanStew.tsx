"use client";

import React from 'react';
import { motion, Variants } from 'framer-motion';

const variants_group_1771647434299: Variants = {
    initial: {},
    animate: {
        rotate: [0, 0, 360],
        transition: {
            rotate: {
                duration: 1.2967175306172525,
                times: [0, 0.5385603566300805, 1],
                ease: [
                    "linear",
                    [0.68, -0.55, 0.265, 1.55],
                    "linear"
                ]
            },
            duration: 1.2967175306172525
        }
    },
    whileHover: {},
    whileTap: {}
};

const variants_path_1_ya5b6: Variants = {
    initial: {},
    animate: {
        pathLength: [1, 0, 1],
        transition: {
            pathLength: {
                duration: 0.6922326667204881,
                times: [0, 0.43661971830985913, 1],
                ease: "linear"
            },
            duration: 0.6922326667204881
        }
    },
    whileHover: {},
    whileTap: {}
};

const variants_path_2_zzrdf: Variants = {
    initial: {},
    animate: {
        pathLength: [1, 0, 1],
        transition: {
            pathLength: {
                duration: 0.6922326667204881,
                times: [0, 0.43661971830985913, 1],
                ease: "linear"
            },
            duration: 0.6922326667204881
        }
    },
    whileHover: {},
    whileTap: {}
};

const variants_path_3_42c4h: Variants = {
    initial: {},
    animate: {
        pathLength: [1, 0, 1],
        transition: {
            pathLength: {
                duration: 0.6922326667204881,
                times: [0, 0.43661971830985913, 1],
                ease: "linear"
            },
            duration: 0.6922326667204881
        }
    },
    whileHover: {},
    whileTap: {}
};

const variants_path_4_doxlm: Variants = {
    initial: {},
    animate: {
        pathLength: [1, 0, 1],
        transition: {
            pathLength: {
                duration: 0.6922326667204881,
                times: [0, 0.43661971830985913, 1],
                ease: "linear"
            },
            duration: 0.6922326667204881
        }
    },
    whileHover: {},
    whileTap: {}
};

const variants_group_1771647485490: Variants = {
    initial: {},
    animate: {
        rotate: [0, 0, -360, -360],
        transition: {
            rotate: {
                duration: 1.7147503175024985,
                times: [0, 0.40917872246509895, 0.75621361161542, 1],
                ease: [
                    "linear",
                    [0.68, -0.55, 0.265, 1.55],
                    "linear",
                    "linear"
                ]
            },
            scale: {
                duration: 1.7147503175024985,
                times: [0, 0.756215816518442, 1],
                ease: [
                    "linear",
                    [0.68, -0.55, 0.265, 1.55],
                    "linear"
                ]
            },
            duration: 1.7147503175024985
        },
        scale: [1, 1, 1.24]
    },
    whileHover: {},
    whileTap: {}
};

const variants_path_5_sy9u0: Variants = {
    initial: {},
    animate: {
        pathLength: [1, 0, 1],
        transition: {
            pathLength: {
                duration: 0.6922326667204881,
                times: [0, 0.43661971830985913, 1],
                ease: "linear"
            },
            duration: 0.6922326667204881
        }
    },
    whileHover: {},
    whileTap: {}
};

const variants_path_6_a04w7: Variants = {
    initial: {},
    animate: {
        pathLength: [1, 0, 1],
        transition: {
            pathLength: {
                duration: 0.6922326667204881,
                times: [0, 0.43661971830985913, 1],
                ease: "linear"
            },
            duration: 0.6922326667204881
        }
    },
    whileHover: {},
    whileTap: {}
};

const variants_path_7_yi1f8: Variants = {
    initial: {},
    animate: {
        pathLength: [1, 0, 1],
        transition: {
            pathLength: {
                duration: 0.6922326667204881,
                times: [0, 0.43661971830985913, 1],
                ease: "linear"
            },
            duration: 0.6922326667204881
        }
    },
    whileHover: {},
    whileTap: {}
};

const variants_path_8_zs69b: Variants = {
    initial: {},
    animate: {
        pathLength: [1, 0, 1],
        transition: {
            pathLength: {
                duration: 0.6922326667204881,
                times: [0, 0.43661971830985913, 1],
                ease: "linear"
            },
            duration: 0.6922326667204881
        }
    },
    whileHover: {},
    whileTap: {}
};

interface CodeScanStewProps extends React.SVGProps<SVGSVGElement> {
    size?: number | string;
    stroke?: string;
    fill?: string;
}

export const CodeScanStew = ({ size, width, height, stroke, fill, ...props }: CodeScanStewProps) => {

    // INTERACTIVE & BEHAVIORAL ACTIONS
    React.useEffect(() => {
        const actionConfigs: any[] = [{ id: 'action-wrapper-path-4-doxlm', type: 'followMouse', strength: 0.1, maxMove: 16 }, { id: 'action-wrapper-path-3-42c4h', type: 'followMouse', strength: 0.1, maxMove: 15 }, { id: 'action-wrapper-path-2-zzrdf', type: 'followMouse', strength: 0.1, maxMove: 15 }, { id: 'action-wrapper-path-1-ya5b6', type: 'followMouse', strength: 0.1, maxMove: 15 }];

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
        <svg width={width || size || "300"} height={height || size || "300"} {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={fill || "none"} overflow="visible" id="svg-root-6lyu7955e">
            <motion.g xmlns="" id="group-1771647434299" data-name="inner" name="inner" variants={variants_group_1771647434299} initial="initial" animate="animate"><g xmlns="http://www.w3.org/2000/svg" id="action-wrapper-path-1-ya5b6"><motion.path xmlns="" d="M 5.5 15.5 C 5.5 14.557 5.5 14.086 5.793 13.793 C 6.086 13.5 6.557 13.5 7.5 13.5 H 8.5 C 9.443 13.5 9.914 13.5 10.207 13.793 C 10.5 14.086 10.5 14.557 10.5 15.5 V 16.5 C 10.5 17.443 10.5 17.914 10.207 18.207 C 9.914 18.5 9.443 18.5 8.5 18.5 C 7.086 18.5 6.379 18.5 5.939 18.061 C 5.5 17.621 5.5 16.914 5.5 15.5 Z" stroke={stroke || "#1C274C"} strokeWidth="1.5" id="path-1-ya5b6" variants={variants_path_1_ya5b6} initial="initial" animate="animate" /></g><g xmlns="http://www.w3.org/2000/svg" id="action-wrapper-path-2-zzrdf"><motion.path xmlns="" d="M 5.5 8.5 C 5.5 7.086 5.5 6.379 5.939 5.939 C 6.379 5.5 7.086 5.5 8.5 5.5 C 9.443 5.5 9.914 5.5 10.207 5.793 C 10.5 6.086 10.5 6.557 10.5 7.5 V 8.5 C 10.5 9.443 10.5 9.914 10.207 10.207 C 9.914 10.5 9.443 10.5 8.5 10.5 H 7.5 C 6.557 10.5 6.086 10.5 5.793 10.207 C 5.5 9.914 5.5 9.443 5.5 8.5 Z" stroke={stroke || "#1C274C"} strokeWidth="1.5" id="path-2-zzrdf" variants={variants_path_2_zzrdf} initial="initial" animate="animate" /></g><g xmlns="http://www.w3.org/2000/svg" id="action-wrapper-path-3-42c4h"><motion.path xmlns="" d="M 13.5 15.5 C 13.5 14.557 13.5 14.086 13.793 13.793 C 14.086 13.5 14.557 13.5 15.5 13.5 H 16.5 C 17.443 13.5 17.914 13.5 18.207 13.793 C 18.5 14.086 18.5 14.557 18.5 15.5 C 18.5 16.914 18.5 17.621 18.061 18.061 C 17.621 18.5 16.914 18.5 15.5 18.5 C 14.557 18.5 14.086 18.5 13.793 18.207 C 13.5 17.914 13.5 17.443 13.5 16.5 V 15.5 Z" stroke={stroke || "#1C274C"} strokeWidth="1.5" id="path-3-42c4h" variants={variants_path_3_42c4h} initial="initial" animate="animate" /></g><g xmlns="http://www.w3.org/2000/svg" id="action-wrapper-path-4-doxlm"><motion.path xmlns="" d="M 13.5 7.5 C 13.5 6.557 13.5 6.086 13.793 5.793 C 14.086 5.5 14.557 5.5 15.5 5.5 C 16.914 5.5 17.621 5.5 18.061 5.939 C 18.5 6.379 18.5 7.086 18.5 8.5 C 18.5 9.443 18.5 9.914 18.207 10.207 C 17.914 10.5 17.443 10.5 16.5 10.5 H 15.5 C 14.557 10.5 14.086 10.5 13.793 10.207 C 13.5 9.914 13.5 9.443 13.5 8.5 V 7.5 Z" stroke={stroke || "#1C274C"} strokeWidth="1.5" id="path-4-doxlm" variants={variants_path_4_doxlm} initial="initial" animate="animate" /></g></motion.g>



            <motion.g xmlns="" id="group-1771647485490" data-name="outer" name="outer" variants={variants_group_1771647485490} initial="initial" animate="animate"><motion.path d="M 22 14 C 22 17.771 22 19.657 20.828 20.828 C 19.657 22 17.771 22 14 22" stroke={stroke || "#1C274C"} strokeWidth="1.5" strokeLinecap="round" id="path-5-sy9u0" variants={variants_path_5_sy9u0} initial="initial" animate="animate" /><motion.path d="M 10 22 C 6.229 22 4.343 22 3.172 20.828 C 2 19.657 2 17.771 2 14" stroke={stroke || "#1C274C"} strokeWidth="1.5" strokeLinecap="round" id="path-6-a04w7" variants={variants_path_6_a04w7} initial="initial" animate="animate" /><motion.path d="M 10 2 C 6.229 2 4.343 2 3.172 3.172 C 2 4.343 2 6.229 2 10" stroke={stroke || "#1C274C"} strokeWidth="1.5" strokeLinecap="round" id="path-7-yi1f8" variants={variants_path_7_yi1f8} initial="initial" animate="animate" /><motion.path d="M 14 2 C 17.771 2 19.657 2 20.828 3.172 C 22 4.343 22 6.229 22 10" stroke={stroke || "#1C274C"} strokeWidth="1.5" strokeLinecap="round" id="path-8-zs69b" variants={variants_path_8_zs69b} initial="initial" animate="animate" /></motion.g>

        </svg>
    );
};
