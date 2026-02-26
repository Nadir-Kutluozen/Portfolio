"use client";

import React from 'react';
import { motion, Variants } from 'framer-motion';

const variants_group_1772086174827: Variants = {};

const variants_path_3_rr9i7: Variants = {
    initial: {
        originX: 0.11846153846153847,
        originY: 1
    },
    animate: {
        rotate: 0
    },
    whileHover: {
        rotate: [0, 360],
        transition: {
            rotate: {
                duration: 0.2996904024767802,
                times: [0, 1],
                ease: "linear"
            },
            duration: 0.2996904024767802
        }
    },
    whileTap: {}
};

const variants_path_4_bscw9: Variants = {
    initial: {},
    animate: {
        x: 0,
        y: 0
    },
    whileHover: {
        x: 0.036923076923076927,
        y: 0.7384615384615385,
        transition: {
            duration: 0.5
        }
    },
    whileTap: {}
};

const variants_path_5_hymtv: Variants = {
    initial: {},
    animate: {
        x: 0,
        y: 0
    },
    whileHover: {
        x: 0.5169230769230769,
        y: 0.5169230769230769,
        transition: {
            duration: 0.5
        }
    },
    whileTap: {}
};

interface MailboxIconProps extends React.SVGProps<SVGSVGElement> {
    size?: number | string;
    stroke?: string;
    fill?: string;
}

export const MailboxIcon = ({ size, width, height, stroke, fill, ...props }: MailboxIconProps) => {
    
    return (
        <svg width={width || size || "650"} height={height || size || "650"} {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={fill || "none"} overflow="visible" id="svg-root-pa33zd890">
<motion.g xmlns="" id="group-1772086174827" data-name="New Group" variants={variants_group_1772086174827} initial="initial" animate="animate" whileHover="whileHover" whileTap="whileTap" pointerEvents="bounding-box"><path xmlns="http://www.w3.org/2000/svg" d="M 9.5 20 V 22 C 9.5 22.414 9.836 22.75 10.25 22.75 C 10.664 22.75 11 22.414 11 22 V 20 H 9.5 Z" fill={fill || "#1C274C"} id="path-1-atfis"/><path xmlns="http://www.w3.org/2000/svg" d="M 15 20 H 13.5 V 22 C 13.5 22.414 13.836 22.75 14.25 22.75 C 14.664 22.75 15 22.414 15 22 V 20 Z" fill={fill || "#1C274C"} id="path-2-c1c0k"/><motion.path fillRule="evenodd" clipRule="evenodd" d="M 17.385 6.585 L 17.641 6.533 C 18.056 6.45 18.486 6.49 18.881 6.648 C 19.572 6.925 20.327 6.976 21.046 6.796 L 21.107 6.781 C 21.631 6.65 22 6.163 22 5.603 V 3.473 C 22 2.735 21.336 2.191 20.645 2.364 C 20.249 2.463 19.833 2.435 19.452 2.283 L 19.379 2.253 C 18.742 1.998 18.049 1.934 17.379 2.068 L 16.93 2.158 C 16.39 2.266 16 2.757 16 3.328 V 10.281 C 16 10.678 16.31 11 16.692 11 C 17.075 11 17.385 10.678 17.385 10.281 V 6.585 Z" fill={fill || "#1C274C"} id="path-3-rr9i7" variants={variants_path_3_rr9i7}/><motion.path d="M 14.5 6 V 10.281 C 14.5 11.452 15.428 12.5 16.692 12.5 C 17.957 12.5 18.885 11.452 18.885 10.281 V 8.228 C 19.645 8.433 20.445 8.457 21.22 8.295 C 21.712 9.137 22 10.154 22 11.25 V 17.425 C 22 18.847 21.012 20 19.793 20 H 12.5 V 11.25 C 12.5 9.22 11.668 7.276 10.283 6 H 14.5 Z" fill={fill || "#1C274C"} id="path-4-bscw9" variants={variants_path_4_bscw9}/><motion.path fillRule="evenodd" clipRule="evenodd" d="M 2 11.25 C 2 8.351 4.015 6 6.5 6 C 8.985 6 11 8.351 11 11.25 V 20 H 4.233 C 3 20 2 18.834 2 17.395 V 11.25 Z M 4.25 16 C 4.25 15.586 4.586 15.25 5 15.25 H 8 C 8.414 15.25 8.75 15.586 8.75 16 C 8.75 16.414 8.414 16.75 8 16.75 H 5 C 4.586 16.75 4.25 16.414 4.25 16 Z" fill={fill || "#1C274C"} id="path-5-hymtv" variants={variants_path_5_hymtv}/></motion.g>




</svg>
    );
};
