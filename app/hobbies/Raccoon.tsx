"use client";
import React from 'react';
import { motion, Variants } from 'framer-motion';

const variants_g_1_ml392: Variants = {
    initial: {},
    animate: {
        x: 0,
        y: 0
    },
    whileHover: {
        x: -1.0134909624192066,
        y: -21.283310210803336,
        transition: {
            duration: 0.30471820537449323
        }
    },
    whileTap: {}
};

const variants_g_2_7eyg4: Variants = {
    initial: {},
    animate: {
        scale: 1,
        rotate: 0
    },
    whileHover: {
        scale: 0.95,
        rotate: -6.8438700068884515,
        transition: {
            duration: 0.4963957861745778
        }
    },
    whileTap: {}
};

const variants_g_5_jaznj: Variants = {
    initial: {
        originX: 1,
        originY: 0.9023697943366915
    },
    animate: {
        rotate: 0,
        x: 0,
        y: 0
    },
    whileHover: {
        rotate: -64.3496631457705,
        x: -25.337274060480162,
        y: -55.74200293305636,
        transition: {
            duration: 0.4963957861745778
        }
    },
    whileTap: {}
};

const variants_g_8_w6fpx: Variants = {
    initial: {},
    animate: {
        rotate: 0,
        x: 0,
        y: 0,
        scale: 1
    },
    whileHover: {
        rotate: 10.04489155494592,
        x: -9.121418661772857,
        y: -8.10792769935365,
        scale: 0.91,
        transition: {
            duration: 0.4963957861745778
        }
    },
    whileTap: {}
};

const variants_path_11_nhsds: Variants = {
    initial: {},
    animate: {
        x: 0,
        y: 0,
        scale: 1
    },
    whileHover: {
        x: [0, -8.107927699353652],
        transition: {
            x: {
                duration: 0.39809959089248315,
                times: [0, 1],
                ease: [
                    [0.1, 0.8, 0.2, 1],
                    "linear"
                ]
            },
            y: {
                duration: 0.39809959089248315,
                times: [0, 1],
                ease: [
                    [0.42, 0, 1, 1],
                    "linear"
                ]
            },
            duration: 0.39809959089248315
        },
        y: [0, -28.377746947737784],
        scale: 1.08
    },
    whileTap: {}
};

const variants_g_12_rm95b: Variants = {
    initial: {},
    animate: {
        scale: 1,
        rotate: 0,
        x: 0,
        y: 0
    },
    whileHover: {
        scale: 1.1,
        rotate: -12.374273204549283,
        x: -6.449487802878795,
        y: -10.134909404523821,
        transition: {
            duration: 0.4963957861745778
        }
    },
    whileTap: {}
};

const variants_g_13_jqpo2: Variants = {
    initial: {},
    animate: {
        rotate: 0,
        x: 0,
        y: 0
    },
    whileHover: {
        rotate: -19.877259934119806,
        x: -20.26981924838413,
        y: -5.067454812096033,
        transition: {
            duration: 0.4963957861745778
        }
    },
    whileTap: {}
};

const variants_g_16_fbf6s: Variants = {
    initial: {},
    animate: {
        rotate: 0,
        x: 0,
        y: 0
    },
    whileHover: {
        rotate: 19.84884484399049,
        x: 21.283310210803336,
        y: -6.080945774515239,
        transition: {
            duration: 0.4963957861745778
        }
    },
    whileTap: {}
};

const variants_g_26_74n63: Variants = {
    initial: {},
    animate: {
        rotate: 0,
        scale: 1,
        x: 0,
        y: 0
    },
    whileHover: {
        rotate: 18.21006894253651,
        scale: 1.12,
        x: -8.144123770480936,
        y: -1.8098052823290969,
        transition: {
            duration: 0.4963957861745778
        }
    },
    whileTap: {}
};

const variants_g_29_kt0h6: Variants = {
    initial: {},
    animate: {
        scale: 1,
        rotate: 0
    },
    whileHover: {
        scale: 1.2,
        rotate: -13.792076365048587,
        transition: {
            duration: 0.4963957861745778
        }
    },
    whileTap: {}
};

interface RaccoonProps extends React.SVGProps<SVGSVGElement> {
    size?: number | string;
    stroke?: string;
    fill?: string;
}

export const Raccoon = ({ size, width, height, stroke, fill, ...props }: RaccoonProps) => {
    return (
        <svg width={width || size || "387"} height={height || size || "387"} {...props} xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" viewBox="0 0 392.221 392.221" xmlSpace="preserve" overflow="visible">
            <motion.g xmlns="" id="g-1-ml392" variants={variants_g_1_ml392} initial="initial" animate="animate" whileHover="whileHover" whileTap="whileTap" pointerEvents="bounding-box">
                <motion.g id="g-2-7eyg4" variants={variants_g_2_7eyg4} pointerEvents="bounding-box">
                    <path xmlns="http://www.w3.org/2000/svg" d="M94.748,269.977v61.92h39.277v-29.914c19.173-12.734,31.817-34.515,31.817-59.257L94.748,269.977z" id="path-3-xbq8e" fill={fill || "rgb(84, 93, 102)"} />
                    <path xmlns="http://www.w3.org/2000/svg" d="M142.769,331.897H94.748v12.07c0,6.667,5.403,12.07,12.07,12.07h41.985    c3.332,0,6.035-2.702,6.035-6.035v-6.036C154.839,337.301,149.435,331.897,142.769,331.897z" id="path-4-8b702" fill={fill || "rgb(51, 62, 72)"} />
                </motion.g>
                <motion.g id="g-5-jaznj" variants={variants_g_5_jaznj} pointerEvents="bounding-box">
                    <path xmlns="http://www.w3.org/2000/svg" d="M43.681,36.185C19.557,36.185,0,55.742,0,79.866v119.18c0,24.124,19.557,43.681,43.681,43.681    s43.681-19.557,43.681-43.681V79.866C87.361,55.742,67.805,36.185,43.681,36.185z" id="path-6-2emia" fill={fill || "rgb(84, 93, 102)"} />
                    <path xmlns="http://www.w3.org/2000/svg" d="M0,199.046c0,3.538,0.432,6.975,1.226,10.27h84.91c0.794-3.295,1.226-6.732,1.226-10.27v-9.255H0    V199.046z M0,169.251h87.361v-19.525H0V169.251z M0,129.186h87.361v-19.525H0V129.186z M86.136,69.596H1.226    C0.432,72.891,0,76.327,0,79.866v9.255h87.361v-9.255C87.361,76.327,86.93,72.891,86.136,69.596z" id="path-7-y6nxl" fill={fill || "rgb(51, 62, 72)"} />
                </motion.g>
                <motion.g id="g-8-w6fpx" variants={variants_g_8_w6fpx} pointerEvents="bounding-box">
                    <rect xmlns="http://www.w3.org/2000/svg" x="237.643" y="269.977" width="39.277" height="61.92" id="rect-9-sahku" fill={fill || "rgb(84, 93, 102)"} />
                    <path xmlns="http://www.w3.org/2000/svg" d="M285.664,331.897h-48.021v12.07c0,6.667,5.404,12.07,12.07,12.07h41.985    c3.333,0,6.035-2.702,6.035-6.035v-6.036C297.733,337.301,292.329,331.897,285.664,331.897z" id="path-10-v9t8f" fill={fill || "rgb(51, 62, 72)"} />
                </motion.g>
                <motion.path d="M298.657,288.7c10.34,0,18.723-8.383,18.723-18.723c0-0.733-0.043-1.457-0.125-2.168   c-10.099-68.363-69.018-120.828-140.189-120.828S46.975,199.446,36.876,267.81c-0.082,0.711-0.125,1.435-0.125,2.168   c0,10.34,8.383,18.723,18.723,18.723L298.657,288.7L298.657,288.7z" id="path-11-nhsds" fill={fill || "rgb(92, 102, 112)"} variants={variants_path_11_nhsds} />
                <motion.g id="g-12-rm95b" data-name="face" name="face" variants={variants_g_12_rm95b} pointerEvents="bounding-box">
                    <motion.g id="g-13-jqpo2" variants={variants_g_13_jqpo2} pointerEvents="bounding-box">
                        <path xmlns="http://www.w3.org/2000/svg" d="M214.806,187.19c-10.026,0-14.128-7.104-9.115-15.787l30.765-53.285     c5.012-8.683,13.217-8.683,18.229,0l30.765,53.285c5.013,8.683,0.911,15.787-9.115,15.787H214.806z" id="path-14-klbsg" fill={fill || "rgb(92, 102, 112)"} />
                        <path xmlns="http://www.w3.org/2000/svg" d="M230.924,173.361c-6.915,0-9.744-4.899-6.287-10.888l14.646-25.369     c3.458-5.988,9.114-5.988,12.571,0l14.648,25.369c3.457,5.988,0.629,10.888-6.287,10.888H230.924z" id="path-15-8f3mz" fill={fill || "rgb(255, 156, 159)"} />
                    </motion.g>
                    <motion.g id="g-16-fbf6s" variants={variants_g_16_fbf6s} pointerEvents="bounding-box">
                        <path xmlns="http://www.w3.org/2000/svg" d="M372.636,187.19c10.026,0,14.128-7.104,9.116-15.787l-30.765-53.285     c-5.013-8.683-13.218-8.683-18.229,0l-30.766,53.285c-5.013,8.683-0.911,15.787,9.115,15.787H372.636z" id="path-17-e0wcf" fill={fill || "rgb(92, 102, 112)"} />
                        <path xmlns="http://www.w3.org/2000/svg" d="M356.519,173.361c6.914,0,9.743-4.899,6.286-10.888l-14.646-25.369     c-3.458-5.988-9.114-5.988-12.571,0l-14.647,25.369c-3.458,5.988-0.629,10.888,6.286,10.888H356.519z" id="path-18-ilz4v" fill={fill || "rgb(255, 156, 159)"} />
                    </motion.g>
                    <path xmlns="http://www.w3.org/2000/svg" d="M347.262,154.645H240.18c-11.507,0-23.012,4.39-31.791,13.169    c-17.557,17.558-17.557,46.023,0,63.58l53.542,53.516c8.778,8.779,20.284,13.168,31.79,13.168s23.011-4.389,31.79-13.168    l53.532-53.506c8.142-8.137,13.178-19.38,13.178-31.8C392.221,174.774,372.093,154.645,347.262,154.645z" id="path-19-4joq2" fill={fill || "rgb(92, 102, 112)"} />
                    <path xmlns="http://www.w3.org/2000/svg" d="M303.264,247.886h-19.086c-6.289,0-11.389,5.099-11.389,11.389c0,6.29,5.1,11.389,11.389,11.389    h19.086c6.289,0,11.389-5.099,11.389-11.389C314.652,252.985,309.553,247.886,303.264,247.886z" id="path-20-tsfzj" fill={fill || "rgb(125, 134, 140)"} />
                    <path xmlns="http://www.w3.org/2000/svg" d="M252.713,187.252c-22.579,0-42.509,11.303-54.472,28.55c2.19,5.68,5.565,11.009,10.147,15.591    l13.309,13.302c7.273-9.101,18.46-14.937,31.016-14.937c11.738,0,21.253-9.515,21.253-21.253    C273.966,196.768,264.451,187.252,252.713,187.252z" id="path-21-mdmcz" fill={fill || "rgb(51, 62, 72)"} />
                    <circle xmlns="http://www.w3.org/2000/svg" cx="252.713" cy="208.505" r="8.778" id="circle-22-b5fcv" fill={fill || "rgb(255, 255, 255)"} />
                    <path xmlns="http://www.w3.org/2000/svg" d="M334.729,187.252c22.579,0,42.509,11.303,54.472,28.55c-2.19,5.68-5.565,11.009-10.147,15.591    l-13.309,13.302c-7.273-9.101-18.46-14.937-31.016-14.937c-11.737,0-21.253-9.515-21.253-21.253    C313.476,196.768,322.991,187.252,334.729,187.252z" id="path-23-bwmay" fill={fill || "rgb(51, 62, 72)"} />
                    <circle xmlns="http://www.w3.org/2000/svg" cx="334.729" cy="208.505" r="8.778" id="circle-24-680e6" fill={fill || "rgb(255, 255, 255)"} />
                    <path xmlns="http://www.w3.org/2000/svg" d="M300.164,243.343h-12.885c-1.386,0-2.771,0.529-3.826,1.585c-2.113,2.113-2.113,5.538,0,7.65    l6.442,6.44c1.057,1.056,2.441,1.585,3.825,1.585c1.385,0,2.77-0.528,3.825-1.585l6.442-6.439    c0.979-0.979,1.585-2.332,1.585-3.826C305.573,245.766,303.151,243.343,300.164,243.343z" id="path-25-q7n8y" fill={fill || "rgb(51, 62, 72)"} />
                </motion.g>
                <motion.g id="g-26-74n63" variants={variants_g_26_74n63} pointerEvents="bounding-box">
                    <path xmlns="http://www.w3.org/2000/svg" d="M36.751,269.977v61.92h39.277v-29.914c19.173-12.734,31.817-34.515,31.817-59.257L36.751,269.977z" id="path-27-lgjsa" fill={fill || "rgb(92, 102, 112)"} />
                    <path xmlns="http://www.w3.org/2000/svg" d="M84.771,331.897h-48.02v12.07c0,6.667,5.403,12.07,12.07,12.07h41.985    c3.332,0,6.035-2.702,6.035-6.035v-6.036C96.842,337.301,91.438,331.897,84.771,331.897z" id="path-28-sddmp" fill={fill || "rgb(51, 62, 72)"} />
                </motion.g>
                <motion.g id="g-29-kt0h6" variants={variants_g_29_kt0h6} pointerEvents="bounding-box">
                    <rect xmlns="http://www.w3.org/2000/svg" x="179.646" y="269.977" width="39.277" height="61.92" id="rect-30-lnqfb" fill={fill || "rgb(92, 102, 112)"} />
                    <path xmlns="http://www.w3.org/2000/svg" d="M227.667,331.897h-48.021v12.07c0,6.667,5.404,12.07,12.071,12.07h41.984    c3.333,0,6.035-2.702,6.035-6.035v-6.036C239.736,337.301,234.333,331.897,227.667,331.897z" id="path-31-0gci3" fill={fill || "rgb(51, 62, 72)"} />
                </motion.g>
            </motion.g>
        </svg>
    );
};
