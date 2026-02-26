"use client";

import React from 'react';
import { motion, Variants } from 'framer-motion';

const variants_group_1772086886471: Variants = {};

const variants_path_2_zv9hz: Variants = {
    initial: {},
    animate: {
        fill: "#00000000",
        stroke: "#000000",
        transition: {
            duration: 0.5
        },
        pathLength: 2
    },
    whileHover: {
        pathLength: [1, 0, 1],
        transition: {
            pathLength: {
                duration: 0.9956656346749226,
                times: [0, 0.5286069651741294, 1],
                ease: [
                    [0, 0, 0.58, 1],
                    [0, 0, 0.58, 1],
                    "linear"
                ]
            },
            duration: 0.9956656346749226
        }
    },
    whileTap: {}
};

const variants_rect_3_3j7q9: Variants = {
    initial: {},
    animate: {
        fill: "#00000000",
        stroke: "#000000",
        transition: {
            duration: 0.5
        },
        pathLength: 2
    },
    whileHover: {
        pathLength: [1, 0, 1],
        transition: {
            pathLength: {
                duration: 0.9956656346749226,
                times: [0, 0.5286069651741294, 1],
                ease: "linear"
            },
            duration: 0.9956656346749226
        }
    },
    whileTap: {}
};

const variants_path_4_n01u3: Variants = {
    initial: {},
    animate: {
        fill: "#00000000",
        stroke: "#000000",

        transition: {
            duration: 0.5
        },
        pathLength: 2
    },
    whileHover: {
        pathLength: [1, 0, 1],
        transition: {
            pathLength: {
                duration: 0.9956656346749226,
                times: [0, 0.5286069651741294, 1],
                ease: "linear"
            },
            duration: 0.9956656346749226
        }
    },
    whileTap: {}
};

const variants_circle_5_ubiev: Variants = {
    initial: {
        originX: 0.8733333333333334,
        originY: 1.1933333333333334
    },
    animate: {
        fill: "#00000000",
        stroke: "#000000",
        transition: {
            duration: 0.5
        },
        rotate: 0
    },
    whileHover: {
        rotate: [0, 360, 360],
        transition: {
            rotate: {
                duration: 0.9956656346749226,
                times: [0, 0.5181607538630834, 1],
                ease: "linear"
            },
            duration: 0.9956656346749226
        }
    },
    whileTap: {}
};

interface LinkedinIconProps extends React.SVGProps<SVGSVGElement> {
    size?: number | string;
    stroke?: string;
    fill?: string;
}

export const LinkedinIcon = ({ size, width, height, stroke, fill, ...props }: LinkedinIconProps) => {

    return (
        <svg width={width || size || "300"} height={height || size || "300"} {...props} xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" id="Icons" viewBox="0 0 32 32" xmlSpace="preserve" overflow="visible">

            <motion.g xmlns="" id="group-1772086886471" data-name="New Group" variants={variants_group_1772086886471} initial="initial" animate="animate" whileHover="whileHover" whileTap="whileTap" pointerEvents="bounding-box"><motion.path d="M 23 31 H 9 C 4.6 31 1 27.4 1 23 V 9 C 1 4.6 4.6 1 9 1 H 23 C 27.4 1 31 4.6 31 9 V 23 C 31 27.4 27.4 31 23 31 Z" id="path-2-zv9hz" variants={variants_path_2_zv9hz} /><motion.rect x="7" y="13" width="4" height="12" id="rect-3-3j7q9" variants={variants_rect_3_3j7q9} /><motion.path d="M 20.5 13 C 19.6 13 18.7 13.3 18 13.8 V 13 H 14 V 25 H 16 H 18 V 18.5 C 18 17.7 18.7 17 19.5 17 S 21 17.7 21 18.5 V 25 H 25 V 17.5 C 25 15 23 13 20.5 13 Z" id="path-4-n01u3" variants={variants_path_4_n01u3} /><motion.circle cx="9" cy="8" r="2" id="circle-5-ubiev" variants={variants_circle_5_ubiev} /></motion.g>



        </svg>
    );
};
