"use client";
import React from 'react';
import { motion, Variants } from 'framer-motion';

const variants_path_3_zhrup: Variants = {
    initial: {},
    animate: {
        x: 0,
        y: [47, -1, -1, -71],
        transition: {
            y: {
                duration: 1.1812778603268945,
                times: [0, 0.33647798742138363, 0.6666666666666666, 1],
                ease: "linear"
            },
            duration: 1.1812778603268945
        }
    },
    whileHover: {},
    whileTap: {}
};

interface UploadingProps extends React.SVGProps<SVGSVGElement> {
    size?: number | string;
    stroke?: string;
    fill?: string;
}

export const Uploading = ({ size, width, height, stroke, fill, ...props }: UploadingProps) => {
    return (
        <svg width={width || size || "61"} height={height || size || "77"} {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 61 77" fill={fill || "none"} overflow="visible" id="svg-root-y4qh2eg3o">
            <path d="M7.25175 0C3.24622 0 0 3.24622 0 7.25175V69.5315C0 73.537 3.24622 76.7832 7.25175 76.7832H53.7483C57.7538 76.7832 61 73.537 61 69.5315V28.1538C61 27.4457 60.4284 26.8741 59.7203 26.8741H40.0979C36.8005 26.8741 34.1259 24.1995 34.1259 20.9021V1.27972C34.1259 0.571608 33.5543 0 32.8462 0H7.25175Z" fill={fill || "#576993"} id="path-1-eg74x" />
            <path d="M36.9434 1.47037C36.9434 0.708289 37.8672 0.329379 38.4037 0.874329L59.7887 22.634C60.3166 23.1747 59.9334 24.0815 59.1799 24.0815H42.0523C39.2296 24.0815 36.9434 21.7953 36.9434 18.9726V1.47037Z" fill={fill || "#C0CDE0"} id="path-2-cu1jc" />
            <motion.path xmlns="" d="M31.038 31C31.7612 31.0003 32.4837 31.2788 33.0356 31.8343L44.172 43.0487C45.276 44.1607 45.276 45.9621 44.172 47.0742C43.0676 48.1863 41.2766 48.1863 40.1722 47.0742L33.871 40.7289V66.1518C33.871 67.7246 32.6044 69 31.0426 69C29.4811 68.9996 28.2164 67.7243 28.2164 66.1518V40.6408L21.8278 47.0742C20.7234 48.1863 18.9323 48.1863 17.8279 47.0742C16.724 45.9621 16.724 44.1607 17.8279 43.0487L28.9644 31.8343C29.5168 31.2782 30.2403 30.9997 30.9643 31H31.038Z" fill={fill || "#D9D9D9"} id="path-3-zhrup" variants={variants_path_3_zhrup} initial="initial" animate="animate" />
        </svg>
    );
};
