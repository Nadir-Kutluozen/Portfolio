"use client";
import React from 'react';
import { motion, Variants } from 'framer-motion';

const variants_rect_2_irbkx: Variants = {
    initial: {
        originX: 0.5,
        originY: 0.5847620392091399
    },
    animate: {
        x: 0,
        scale: 1,
        rotate: 0,
        opacity: 1
    },
    whileHover: {},
    whileTap: {
        x: 0,
        scale: 1.4100000000000001,
        rotate: -35,
        opacity: 0.8,
        transition: {
            duration: 0.5
        }
    }
};

const variants_rect_7_u66yo: Variants = {
    initial: {},
    animate: {
        rotate: 0
    },
    whileHover: {},
    whileTap: {
        rotate: 37.21868481367715,
        transition: {
            duration: 0.5
        }
    }
};

interface Frame148Props extends React.SVGProps<SVGSVGElement> {
    size?: number | string;
    stroke?: string;
    fill?: string;
}

export const Frame148 = ({ size, width, height, stroke, fill, ...props }: Frame148Props) => {
    return (
        <svg width={width || size || "238"} height={height || size || "238"} {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill={fill || "none"} overflow="visible" id="svg-root-0gmdv518d">
            <rect width="64" height="64" fill={fill || "white"} id="rect-1-it6r2" />
            <motion.rect xmlns="" x="6" y="5" width="52" height="54" rx="6" fill={fill || "url(#paint0_linear_2162_4609)"} id="rect-2-irbkx" variants={variants_rect_2_irbkx} initial="initial" animate="animate" whileTap="whileTap" />
            <rect x="9" y="48" width="7" height="7" rx="2" fill={fill || "white"} id="rect-3-e86hj" />
            <rect x="47" y="48" width="8" height="7" rx="2" fill={fill || "white"} id="rect-4-zp4eb" />
            <rect x="9" y="38" width="7" height="7" rx="2" fill={fill || "white"} id="rect-5-s35qw" />
            <rect x="47" y="38" width="8" height="7" rx="2" fill={fill || "white"} id="rect-6-rqmk4" data-name="f=kvnlbmt" name="f=kvnlbmt" />
            <motion.rect xmlns="" x="9" y="28" width="7" height="7" rx="2" fill={fill || "white"} id="rect-7-u66yo" variants={variants_rect_7_u66yo} initial="initial" animate="animate" whileTap="whileTap" />
            <rect x="47" y="28" width="8" height="7" rx="2" fill={fill || "white"} id="rect-8-sjfas" />
            <rect x="9" y="18" width="7" height="7" rx="2" fill={fill || "white"} id="rect-9-ik1n0" />
            <rect x="47" y="18" width="8" height="7" rx="2" fill={fill || "white"} id="rect-10-ik3jq" />
            <rect x="9" y="8" width="7" height="7" rx="2" fill={fill || "white"} id="rect-11-x63gm" />
            <rect x="47" y="8" width="8" height="7" rx="2" fill={fill || "white"} id="rect-12-og5hw" />
            <path d="M19.2869 36.4432V34.0213L25.3594 24.4545H27.4474V27.8068H26.2116L22.3835 33.8651V33.9787H31.0128V36.4432H19.2869ZM26.2685 39V35.7045L26.3253 34.6321V24.4545H29.2088V39H26.2685ZM33.147 39V24.4545H36.2223V30.8679H36.4141L41.6484 24.4545H45.3345L39.9368 30.9673L45.3984 39H41.7195L37.7351 33.0199L36.2223 34.8665V39H33.147Z" fill={fill || "white"} id="path-13-j3rxo" />
            <defs id="defs-14-8blpc">
                <linearGradient id="paint0_linear_2162_4609" x1="14" y1="6" x2="53" y2="59" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#18134E" id="stop-15-pzxja" />
                    <stop offset="1" stopColor="#6C7496" id="stop-16-xx2kd" />
                </linearGradient>
            </defs>
        </svg>
    );
};
