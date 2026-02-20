"use client";

import React from 'react';
import { motion, Variants } from 'framer-motion';



interface DetectiveProps extends React.SVGProps<SVGSVGElement> {
    size?: number | string;
    stroke?: string;
    fill?: string;
}

export const Detective = ({ size, width, height, stroke, fill, ...props }: DetectiveProps) => {
    
    // INTERACTIVE & BEHAVIORAL ACTIONS
    // INTERACTIVE & BEHAVIORAL ACTIONS
    React.useEffect(() => {
        const actionConfigs: any[] = [{ id: 'action-wrapper-group-1770080524879', type: 'followMouse', strength: 0.1, maxMove: 17 }, { id: 'action-wrapper-group-1770080509582', type: 'followMouse', strength: 0.1, maxMove: 17 }, { id: 'action-wrapper-group-1770080570904', type: 'blink', delay: 2000, duration: 150 }, { id: 'action-wrapper-g-1-7g2d8', type: 'float', speed: 1, amplitude: 10 }, { id: 'action-wrapper-g-1-7g2d8', type: 'blink', delay: 2000, duration: 150 }, { id: 'action-wrapper-path-2-eblbs', type: 'followMouse', strength: 0.1, maxMove: 10 }, { id: 'action-wrapper-path-2-eblbs', type: 'float', speed: 1, amplitude: 10 }, { id: 'action-wrapper-path-2-eblbs', type: 'blink', delay: 2000, duration: 150 }, { id: 'action-wrapper-path-5-u6m8t', type: 'float', speed: 1, amplitude: 10 }];
        const mouseRef = { x: 0, y: 0 };
        
        // Group Actions by Element ID
        // This prevents multiple actions on the same element from overwriting each other
        const elementsMap = new Map();
        actionConfigs.forEach(config => {
            if (!elementsMap.has(config.id)) {
                elementsMap.set(config.id, []);
            }
            elementsMap.get(config.id).push(config);
        });
        const uniqueElements = Array.from(elementsMap.entries());

        const onMove = (e: MouseEvent) => {
            mouseRef.x = (e.clientX / window.innerWidth - 0.5) * 2;
            mouseRef.y = (e.clientY / window.innerHeight - 0.5) * 2;
        };
        window.addEventListener('mousemove', onMove);

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

                        // Update State (unique per element, shared across actions if duplicates exist)
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
                            
                            // Multiplicative scale if we ever have multiple scaling actions
                            // For now, since it's the only one, replacement is fine but 
                            // let's apply it relatively if needed. 
                            // Current logic: simple squash.
                            scaleY = 1 - (0.9 * closeAmount);
                        }
                    }
                });

                // Apply Combined Transform ONCE
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
        <svg width={width || size || "300"} height={height || size || "300"} {...props} xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 36 36" aria-hidden="true" role="img" className="iconify iconify--twemoji" preserveAspectRatio="xMidYMid meet" overflow="visible" id="svg-root-xmvs58wn8"><path fill={fill || "#66757F"} d="M33 36v-1a6 6 0 0 0-6-6H9a6 6 0 0 0-6 6v1h30zm-6.25-15.565c1.188.208 2.619.129 2.416.917c-.479 1.854-2.604 1.167-2.979 1.188c-.375.02.563-2.105.563-2.105z" id="path-1-tmgui"/><path fill={fill || "#292F33"} d="M27.062 20.645c1.875.25 2.541.416 1.166.958c-.772.305-2.243 4.803-3.331 4.118c-1.087-.685 2.165-5.076 2.165-5.076z" id="path-2-r128d"/><path fill={fill || "#66757F"} d="M9.255 20.435c-1.188.208-2.619.129-2.416.917c.479 1.854 2.604 1.167 2.979 1.188c.375.02-.563-2.105-.563-2.105z" id="path-3-0i2bl"/><path fill={fill || "#292F33"} d="M8.943 20.645c-1.875.25-2.541.416-1.166.958c.772.305 2.243 4.803 3.331 4.118c1.088-.685-2.165-5.076-2.165-5.076z" id="path-4-aiav6"/><path fill={fill || "#292F33"} d="M21.771 4.017c-1.958-.634-6.566-.461-7.718 1.037c-2.995.058-6.508 2.764-6.969 6.335c-.456 3.534.56 5.175.922 7.833c.409 3.011 2.102 3.974 3.456 4.377c1.947 2.572 4.017 2.462 7.492 2.462c6.787 0 10.019-4.541 10.305-12.253c.172-4.665-2.565-8.198-7.488-9.791z" id="path-5-l4t3m"/><path fill={fill || "#F7DECE"} d="M25.652 14.137c-.657-.909-1.497-1.641-3.34-1.901c.691.317 1.353 1.411 1.44 2.016c.086.605.173 1.094-.374.49c-2.192-2.423-4.579-1.469-6.944-2.949c-1.652-1.034-2.155-2.177-2.155-2.177s-.202 1.526-2.707 3.081c-.726.451-1.593 1.455-2.073 2.937c-.346 1.066-.238 2.016-.238 3.64c0 4.74 3.906 8.726 8.726 8.726s8.726-4.02 8.726-8.726c-.004-2.948-.312-4.1-1.061-5.137z" id="path-6-zoskr"/><path fill={fill || "#C1694F"} d="M18.934 21.565h-1.922a.481.481 0 0 1-.481-.481v-.174c0-.265.215-.482.481-.482h1.922c.265 0 .482.216.482.482v.174a.481.481 0 0 1-.482.481" id="path-7-zdeln"/><g id="action-wrapper-path-8-zn0pf"><path fillRule="evenodd" clipRule="evenodd" fill={fill || "#292F33"} d="M7.657 14.788c.148.147.888.591 1.036 1.034c.148.443.445 2.954 1.333 3.693c.916.762 4.37.478 5.032.149c1.48-.738 1.662-2.798 1.924-3.842c.148-.591 1.036-.591 1.036-.591s.888 0 1.036.591c.262 1.044.444 3.104 1.924 3.841c.662.33 4.116.614 5.034-.147c.887-.739 1.183-3.25 1.331-3.694c.146-.443.888-.886 1.035-1.034c.148-.148.148-.739 0-.887c-.296-.295-3.788-.559-7.548-.148c-.75.082-1.035.295-2.812.295c-1.776 0-2.062-.214-2.812-.295c-3.759-.411-7.252-.148-7.548.148c-.149.148-.149.74-.001.887z" id="path-8-zn0pf"/></g><path fill={fill || "#66757F"} d="M7.858 8.395S9.217-.506 13.79.023c3.512.406 4.89.825 7.833.097c1.947-.482 4.065 1.136 5.342 4.379a27.72 27.72 0 0 1 1.224 4.041s3.938-.385 4.165 1.732c.228 2.117-4.354 4.716-15.889 4.716C10 14.987 3.33 12.63 3.013 10.657c-.317-1.973 4.845-2.262 4.845-2.262z" id="path-9-ymgse"/><path fill={fill || "#292F33"} d="M8.125 7.15s-.27 1.104-.406 1.871c-.136.768.226 1.296 2.705 1.824c3.287.7 10.679.692 15.058-.383c1.759-.432 2.886-.72 2.751-1.583c-.167-1.068-.196-1.066-.541-2.208c0 0-1.477.502-3.427.96c-2.66.624-9.964.911-13.481.144c-1.874-.41-2.659-.625-2.659-.625zm-.136 13.953c-.354.145 2.921 1.378 7.48 1.458c4.771.084 6.234.39 5.146 1.459c-1.146 1.125-.852 2.894-.771 3.418c.081.524 2.047 1.916 2.208 2.56c.161.645-1.229 5.961-1.229 5.961l-8.729-.252c-2.565-8.844-2.883-8.501-4.105-13.604c-.241-1.008 0-1 0-1z" id="path-10-liyux"/><path fill={fill || "#66757F"} d="M6.989 21.144c-.354.146 2.921 1.378 7.48 1.458c4.771.084 6.234.39 5.146 1.459c-1.146 1.125-.664 2.894-.583 3.418c.081.524 1.859 1.916 2.021 2.561c.16.644-1.231 5.96-1.231 5.96l-8.729-.252c-2.565-8.844-2.883-8.501-4.105-13.604c-.24-1.008.001-1 .001-1z" id="path-11-iblf5"/><path fill={fill || "#292F33"} d="M28.052 21.103c.354.145-2.921 1.378-7.479 1.458c-4.771.084-6.234.39-5.146 1.459c1.146 1.125 2.976 2.892 2.896 3.416c-.081.524-4.172 1.918-4.333 2.562c-.161.645 1.229 5.961 1.229 5.961l8.729-.252c2.565-8.844 2.883-8.501 4.104-13.604c.241-1.008 0-1 0-1z" id="path-12-pfaec"/><path fill={fill || "#66757F"} d="M28.958 21.103c.354.145-2.921 1.378-7.479 1.458c-4.771.084-6.234.39-5.146 1.459c1.146 1.125 2.977 2.892 2.896 3.416c-.081.524-4.172 1.918-4.333 2.562c-.161.645 1.229 5.961 1.229 5.961l8.657.01c2.565-8.844 2.955-8.763 4.177-13.866c.24-1.008-.001-1-.001-1z" id="path-13-0vsnt"/></svg>
    );
};
