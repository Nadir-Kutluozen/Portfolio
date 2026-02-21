"use client";

import React from 'react';
import { motion, Variants } from 'framer-motion';

const variants_group_1771638604908: Variants = {
    initial: {},
    animate: {
        filter: 0
    },
    whileHover: {},
    whileTap: {
        filter: ["blur(0px)", "blur(2px)", "blur(0px)"],
        transition: {
            filter: {
                duration: 0.19337015807450256,
                times: [0, 0.7142857142857143, 1],
                ease: "linear"
            },
            duration: 0.19337015807450256
        }
    }
};

const variants_path_1_v9gi6: Variants = {
    initial: {},
    animate: {
        pathLength: 1
    },
    whileHover: {
        pathLength: [1, 0, 1],
        transition: {
            pathLength: {
                duration: 1.2747362376667042,
                times: [0, 0.31551128002271944, 1],
                ease: "linear"
            },
            duration: 1.2747362376667042
        }
    },
    whileTap: {}
};

const variants_path_2_89585: Variants = {
    initial: {},
    animate: {
        pathLength: 1
    },
    whileHover: {
        pathLength: [1, 0, 1],
        transition: {
            pathLength: {
                duration: 1.2771732807211316,
                times: [0, 0.45992892510433087, 1],
                ease: "linear"
            },
            duration: 1.2771732807211316
        }
    },
    whileTap: {}
};

const variants_path_3_yhjqb: Variants = {
    initial: {},
    animate: {
        pathLength: 1
    },
    whileHover: {
        pathLength: [1, 0, 1],
        transition: {
            pathLength: {
                duration: 1.2771732807211316,
                times: [0, 0.46753984064354653, 1],
                ease: "linear"
            },
            duration: 1.2771732807211316
        }
    },
    whileTap: {}
};

const variants_path_4_rtrni: Variants = {
    initial: {},
    animate: {
        pathLength: 1
    },
    whileHover: {
        pathLength: [1, 0, 1],
        transition: {
            pathLength: {
                duration: 1.2771732807211316,
                times: [0, 0.47139055758315274, 1],
                ease: "linear"
            },
            duration: 1.2771732807211316
        }
    },
    whileTap: {}
};

const variants_path_6_tgg90: Variants = {
    initial: {},
    animate: {
        pathLength: 1
    },
    whileHover: {
        pathLength: [1, 0, 1],
        transition: {
            pathLength: {
                duration: 1.2771732807211316,
                times: [0, 0.47139055758315274, 1],
                ease: "linear"
            },
            duration: 1.2771732807211316
        }
    },
    whileTap: {}
};

const variants_path_7_mq3yw: Variants = {
    initial: {},
    animate: {
        pathLength: 1
    },
    whileHover: {
        pathLength: [1, 0, 1],
        transition: {
            pathLength: {
                duration: 1.2771732807211316,
                times: [0, 0.47139055758315274, 1],
                ease: "linear"
            },
            duration: 1.2771732807211316
        }
    },
    whileTap: {}
};

interface Home1svgrepocomProps extends React.SVGProps<SVGSVGElement> {
    size?: number | string;
    stroke?: string;
    fill?: string;
}

export const HomeIconAnimated = ({ size, width, height, stroke, fill, ...props }: Home1svgrepocomProps) => {

    return (
        <svg width={width || size || "300"} height={height || size || "300"} {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={fill || "none"} overflow="visible" id="svg-root-o4zx4fli6">
            <motion.g xmlns="" id="group-1771638604908" data-name="New Group" variants={variants_group_1771638604908} initial="initial" animate="animate" whileHover="whileHover" whileTap="whileTap" pointerEvents="bounding-box"><motion.path d="M 22 22 L 2 22" stroke={stroke || "#1C274C"} strokeWidth="1.5" strokeLinecap="round" id="path-1-v9gi6" variants={variants_path_1_v9gi6} /><motion.path d="M 2 11 L 6.063 7.75 M 22 11 L 13.874 4.499 C 12.778 3.623 11.222 3.623 10.126 4.499 L 9.344 5.125" stroke={stroke || "#1C274C"} strokeWidth="1.5" strokeLinecap="round" id="path-2-89585" variants={variants_path_2_89585} /><motion.path d="M 15.5 5.5 V 3.5 C 15.5 3.224 15.724 3 16 3 H 18.5 C 18.776 3 19 3.224 19 3.5 V 8.5" stroke={stroke || "#1C274C"} strokeWidth="1.5" strokeLinecap="round" id="path-3-yhjqb" variants={variants_path_3_yhjqb} /><motion.path d="M 4 22 V 9.5" stroke={stroke || "#1C274C"} strokeWidth="1.5" strokeLinecap="round" id="path-4-rtrni" variants={variants_path_4_rtrni} /><path xmlns="http://www.w3.org/2000/svg" d="M 20 9.5 V 13.5 M 20 22 V 17.5" stroke={stroke || "#1C274C"} strokeWidth="1.5" strokeLinecap="round" id="path-5-rak4n" /><motion.path d="M 15 22 V 17 C 15 15.586 15 14.879 14.561 14.439 C 14.121 14 13.414 14 12 14 C 10.586 14 9.879 14 9.439 14.439 M 9 22 V 17" stroke={stroke || "#1C274C"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" id="path-6-tgg90" variants={variants_path_6_tgg90} /><motion.path d="M 14 9.5 C 14 10.605 13.105 11.5 12 11.5 C 10.895 11.5 10 10.605 10 9.5 C 10 8.395 10.895 7.5 12 7.5 C 13.105 7.5 14 8.395 14 9.5 Z" stroke={stroke || "#1C274C"} strokeWidth="1.5" id="path-7-mq3yw" variants={variants_path_7_mq3yw} /></motion.g>






        </svg>
    );
};
