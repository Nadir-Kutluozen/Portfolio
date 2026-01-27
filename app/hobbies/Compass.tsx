"use client";

import React from 'react';
import { motion, Variants } from 'framer-motion';

const variants_group_1767809915965: Variants = {
    initial: {},
    animate: {
        y: 0,
        x: 0
    },
    whileHover: {},
    whileTap: {
        y: [0, 0, 21.729442647028353],
        transition: {
            y: {
                duration: 0.4193970998702703,
                times: [0, 0.0078125, 1],
                ease: [
                    "linear",
                    [0.68, -0.55, 0.265, 1.55],
                    "linear"
                ]
            },
            duration: 0.4193970998702703
        },
        x: -5.43236074270557
    }
};

const variants_group_1767809826888: Variants = {
    initial: {},
    animate: {
        x: 0,
        y: 0
    },
    whileHover: {},
    whileTap: {
        x: [0, -8.148540992635633],
        transition: {
            x: {
                duration: 0.4193970998702703,
                times: [0, 1],
                ease: [
                    [0.68, -0.55, 0.265, 1.55],
                    "linear"
                ]
            },
            y: {
                duration: 0.4193970998702703,
                times: [0, 1],
                ease: [
                    [0.68, -0.55, 0.265, 1.55],
                    "linear"
                ]
            },
            duration: 0.4193970998702703
        },
        y: [0, -51.60742628669234]
    }
};

const variants_group_1767809719610: Variants = {
    initial: {},
    animate: {
        rotate: 0
    },
    whileHover: {},
    whileTap: {
        rotate: [0, 0, 360],
        transition: {
            rotate: {
                duration: 0.4193970998702703,
                times: [0, 0.021220166706344457, 1],
                ease: [
                    "linear",
                    [0.8864286150251116, 0.020982088361467633, 1, 1],
                    "linear"
                ]
            },
            duration: 0.4193970998702703
        }
    }
};

interface CompasssvgrepocomProps extends React.SVGProps<SVGSVGElement> {
    size?: number | string;
    stroke?: string;
    fill?: string;
}

export const Compass = ({ size, width, height, stroke, fill, ...props }: CompasssvgrepocomProps) => {
    return (
        <svg width={width || size || "377"} height={height || size || "377"} {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" className="icon" version="1.1" overflow="visible" id="svg-root-d0aaextoi"><motion.g xmlns="" id="group-1767809915965" data-name="WholeThing" name="WholeThing" variants={variants_group_1767809915965} initial="initial" animate="animate" whileHover="whileHover" whileTap="whileTap" pointerEvents="bounding-box"><motion.g id="group-1767809826888" data-name="stars" name="stars" variants={variants_group_1767809826888} pointerEvents="bounding-box"><path xmlns="http://www.w3.org/2000/svg" d="M798 193l-49-13 49-14 13-48 13 48 48 14-48 13-13 48-13-48zM845 245l-19-4 19-4 5-19 4 19 19 4-19 4-4 19-5-19z" fill={fill || "#FDCD60"} id="path-1-rduyq" /><path xmlns="http://www.w3.org/2000/svg" d="M197 835l-32-8 32-7 8-33 7 33 33 7-33 8-7 32-8-32zM98 665l-14-3 14-3 4-15 3 15 15 3-15 3-3 15-4-15z" fill={fill || "#FDCD60"} id="path-3-jiy4a" /></motion.g><path xmlns="http://www.w3.org/2000/svg" d="M180 191m-9 0a9 9 0 1 0 18 0 9 9 0 1 0-18 0Z" fill={fill || "#5546CB"} id="path-2-imo4y" /><path xmlns="http://www.w3.org/2000/svg" d="M832 856a25 25 0 1 1 25-25 25 25 0 0 1-25 25z m0-36a10 10 0 1 0 10 10 10 10 0 0 0-10-9z" fill={fill || "#5546CB"} id="path-4-nmeul" /><path xmlns="http://www.w3.org/2000/svg" d="M514 490m-52 0a52 52 0 1 0 104 0 52 52 0 1 0-104 0Z" fill={fill || "#AFBCF3"} id="path-5-iaowr" /><path xmlns="http://www.w3.org/2000/svg" d="M771 533a10 10 0 0 1 10-10h78a349 349 0 0 0-346-347 10 10 0 0 1 7 10v81a10 10 0 1 1-20 0v-81a10 10 0 0 1 7-10 349 349 0 0 0-346 348h84a10 10 0 0 1 0 20h-84c4 86 40 167 102 228a347 347 0 0 0 237 101v-75a10 10 0 0 1 20 0v75a347 347 0 0 0 237-102c62-61 97-142 102-228h-78a10 10 0 0 1-10-10zM513 759c-126 0-227-102-227-227s101-228 227-228 227 102 227 228-102 227-227 227z" fill={fill || "#FF8859"} id="path-6-bwuzd" /><path xmlns="http://www.w3.org/2000/svg" d="M850 381a369 369 0 1 0 29 143 367 367 0 0 0-29-143z m-93 390a347 347 0 0 1-237 102v-75a10 10 0 0 0-20 0v76a347 347 0 0 1-237-103c-62-62-97-142-102-228h83a10 10 0 0 0 0-20h-83a349 349 0 0 1 346-347 10 10 0 0 0-7 10v81a10 10 0 1 0 20 0v-81a10 10 0 0 0-7-10 349 349 0 0 1 346 347h-78a10 10 0 0 0 0 20h77c-4 86-40 167-101 228z" fill={fill || "#5546CB"} id="path-7-yif2b" /><motion.g id="group-1767809719610" data-name="stick" name="stick" variants={variants_group_1767809719610} pointerEvents="bounding-box"><path xmlns="http://www.w3.org/2000/svg" d="M513 304c-126 0-227 102-227 227s101 228 227 228 227-101 227-227-102-228-227-228z m126 354a10 10 0 0 1-7 3h-5l-163-91h-1a10 10 0 0 1-6-5l-72-148a10 10 0 0 1 14-13l145 80 3 3 3 3 91 155a10 10 0 0 1-2 13z" fill={fill || "#FFFFFF"} id="path-8-z1ne9" /><path xmlns="http://www.w3.org/2000/svg" d="M417 437l52 106 52-48-104-58z" fill={fill || "#FDCD60"} id="path-9-96tnf" /><path xmlns="http://www.w3.org/2000/svg" d="M486 559l119 66-67-114-52 48z" fill={fill || "#AFBCF3"} id="path-10-i9q32" /><path xmlns="http://www.w3.org/2000/svg" d="M550 490l-3-3-3-3-145-80a10 10 0 0 0-14 13l72 147a10 10 0 0 0 6 5h1l163 90h5a10 10 0 0 0 9-15z m-133-53l105 58-52 48z m69 122l53-48 66 113z" fill={fill || "#5546CB"} id="path-11-jnyl3" /></motion.g></motion.g></svg>
    );
};
