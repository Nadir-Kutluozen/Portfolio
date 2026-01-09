import React from 'react';
import { motion } from 'framer-motion';

const variants_group_1767750800342 = {
    initial: {},
    animate: {
        scale: 1
    },
    whileHover: {
        scale: [1, 1, 1.16],
        transition: {
            scale: {
                duration: 0.4505501449102441,
                times: [0, 0.00002967812395365445, 1],
                ease: [
                    "linear",
                    [0.68, -0.55, 0.265, 1.55],
                    "linear"
                ]
            },
            duration: 0.4505501449102441
        }
    },
    whileTap: {}
};

const variants_path_1_bqq62 = {
    initial: {
        originX: 0.8578863703537425,
        originY: 0.8638710922660124
    },
    animate: {
        rotate: 0,
        x: 0,
        y: 0
    },
    whileHover: {
        rotate: [0, 0, 19.48863818749338],
        transition: {
            rotate: {
                duration: 0.4505501449102441,
                times: [0, 0.00002967812395365445, 1],
                ease: [
                    "linear",
                    [0.68, -0.55, 0.265, 1.55],
                    "linear"
                ]
            },
            duration: 0.4505501449102441
        },
        x: -0.19917154524034375,
        y: 0
    },
    whileTap: {}
};

const variants_circle_2_gth9t = {
    initial: {},
    animate: {
        scale: 1,
        x: 0,
        y: 0
    },
    whileHover: {
        scale: [1, 1, 1.21],
        transition: {
            scale: {
                duration: 0.4505501449102441,
                times: [0, 0.00002967812395365445, 1],
                ease: [
                    "linear",
                    [0.68, -0.55, 0.265, 1.55],
                    "linear"
                ]
            },
            duration: 0.4505501449102441
        },
        x: 0.205755722067332,
        y: -0.2880580108942648
    },
    whileTap: {}
};

const variants_path_3_eakrf = {
    initial: {
        originX: -1.5581059674835513,
        originY: -1.7904727702639525
    },
    animate: {
        rotate: 0
    },
    whileHover: {
        rotate: [0, 109.61073228707718],
        transition: {
            rotate: {
                duration: 0.4505501449102441,
                times: [0, 1],
                ease: [
                    [0.68, -0.55, 0.265, 1.55],
                    "linear"
                ]
            },
            duration: 0.4505501449102441
        }
    },
    whileTap: {}
};

interface FolderSearchProps extends React.SVGProps<SVGSVGElement> {
    size?: number | string;
    color?: string;
}

export const FolderSearch = ({ size, color, width, height, ...props }: FolderSearchProps) => {
    return (
        <svg width={width || size || "482"} height={height || size || "482"} style={{ color: color, ...props.style }} {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" overflow="visible" id="svg-root-s1hlikn6o">
            <motion.g xmlns="" id="group-1767750800342" data-name="New Group" variants={variants_group_1767750800342} initial="initial" animate="animate" whileHover="whileHover" pointerEvents="bounding-box"><motion.path d="M19.5 12V12C19.5 10.5955 19.5 9.89331 19.1629 9.38886C19.017 9.17048 18.8295 8.98298 18.6111 8.83706C18.1067 8.5 17.4045 8.5 16 8.5H14.1569C13.3394 8.5 12.9306 8.5 12.5631 8.34776C12.1955 8.19552 11.9065 7.90649 11.3284 7.32843L10.6716 6.67157C10.0935 6.09351 9.80448 5.80448 9.43694 5.65224C9.0694 5.5 8.66065 5.5 7.84315 5.5H7.5C5.61438 5.5 4.67157 5.5 4.08579 6.08579C3.5 6.67157 3.5 7.61438 3.5 9.5V14.5C3.5 16.3856 3.5 17.3284 4.08579 17.9142C4.67157 18.5 5.61438 18.5 7.5 18.5H12" stroke="currentColor" id="path-1-bqq62" variants={variants_path_1_bqq62} /><motion.circle cx="16.5" cy="16.5" r="2.5" stroke="currentColor" id="circle-2-gth9t" variants={variants_circle_2_gth9t} /><motion.path d="M19.5 19.5L21 21" stroke="currentColor" strokeLinecap="round" id="path-3-eakrf" variants={variants_path_3_eakrf} /></motion.g>


        </svg>
    );
};
