"use client";

import styles from "./HeroSection.module.css";
import { Github, Linkedin, Twitter, Mail, Instagram } from "lucide-react";
import { motion, Variants } from "framer-motion";
import { ConnectMe } from "@/components/animation/microanimation/ConnectMe";
import { FolderSearch } from "@/components/animation/microanimation/FolderSearch";

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.3,
        }
    }
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 1.2,
            ease: [0.25, 1, 0.5, 1] // Smooth "premium" bezier curve
        }
    }
};

const imageVariants: Variants = {
    hidden: { opacity: 0, scale: 1.1, x: 50 },
    visible: {
        opacity: 1,
        scale: 1,
        x: 0,
        transition: {
            duration: 1.8,
            ease: [0.16, 1, 0.3, 1]
        }
    }
};

export default function HeroSection() {
    return (
        <section className={`${styles.heroSection} d-flex position-relative`}>
            {/* Hero Section Container */}
            <div className="container-fluid p-0 overflow-hidden position-relative z-1">
                <div className="row align-items-stretch min-vh-100 g-0">
                    {/* Content (Left) */}
                    <div className="col-12 col-md-12 col-lg-6 order-2 order-lg-1 d-flex flex-column min-vh-100 position-relative z-index-2 justify-content-end p-3">
                        <div className="w-100">
                            <motion.div
                                variants={containerVariants}
                                initial="hidden"
                                animate="visible"
                            >
                                {/* Title & Bio */}
                                <div className="mb-4 position-relative z-2 p-2">
                                    <motion.h1 className={`${styles.name} fw-bold mb-2 `} style={{ lineHeight: 0.8 }} variants={itemVariants}>
                                        NADIR<br />
                                        KUTLUOZEN
                                    </motion.h1>
                                    <motion.h2 className={`${styles.subtitle} fs-5 text-uppercase tracking-widest ps-1 mb-2 `} style={{ opacity: 0.9 }} variants={itemVariants}>
                                        Full Stack Software Engineer
                                    </motion.h2>
                                    <motion.p className="lead fs-6 ps-1 mb-3 " style={{ letterSpacing: '0.5px', opacity: 0.75 }} variants={itemVariants}>
                                        Crafting digital experiences that merge high-performance code with premium aesthetics.
                                        I turn complex problems into elegant, user-centric solutions.
                                    </motion.p>
                                </div>
                            </motion.div>
                        </div>

                        {/* Buttons (Bottom, Separate, Full Width) */}
                        <motion.div
                            className="row g-2  "
                            variants={itemVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            <div className="col-6">
                                <motion.a
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="btn btn-dark w-100 h-100 p-4 d-flex flex-column justify-content-between text-uppercase fw-bold tracking-wide border-0 transition-all text-white rounded-3"
                                    style={{ aspectRatio: '1/0.6', background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)' }}
                                >
                                    {/* Icon Top Right */}
                                    <div className="w-100 d-flex justify-content-end">
                                        <FolderSearch size={50} />
                                    </div>
                                    {/* Text Bottom Left */}
                                    <div className="text-start lh-1">
                                        <span className="h3 d-block mb-0">View</span>
                                        <span className="h3 d-block mb-0">Projects</span>
                                    </div>
                                </motion.a>
                            </div>
                            <div className="col-6">
                                <motion.a
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="btn btn-outline-dark w-100 h-100 p-4 d-flex flex-column justify-content-between text-uppercase fw-bold tracking-wide rounded-3"
                                    style={{ aspectRatio: '1/0.6', color: 'white', borderColor: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(5px)' }}
                                >
                                    {/* Icon Top Right */}
                                    <div className="w-100 d-flex justify-content-end">
                                        <ConnectMe size={40} />
                                    </div>
                                    {/* Text Bottom Left */}
                                    <div className="text-start lh-1">
                                        <span className="h3 d-block mb-0">Contact</span>
                                        <span className="h3 d-block mb-0">Me</span>
                                    </div>
                                </motion.a>
                            </div>
                        </motion.div>
                    </div>

                    {/* Image (Right) */}
                    <div className="col-12 col-md-12 col-lg-6 order-1 order-lg-2 p-3 position-relative vh-100">
                        <div className="w-100 h-100 position-relative rounded-4 overflow-hidden">
                            <motion.div
                                className="h-100 w-100"
                                variants={imageVariants}
                                initial="hidden"
                                animate="visible"
                            >
                                <img
                                    src="/nadirk.jpg"
                                    alt="Nadir Kutluozen"
                                    className="img-fluid w-100 h-100 object-fit-cover"
                                    style={{ opacity: 1 }}
                                />
                            </motion.div>

                            {/* Social Icons Cutout */}
                            <motion.div
                                className={styles.iconCutout}
                                variants={itemVariants}
                                initial="hidden"
                                animate="visible"
                            >
                                <div className="d-flex gap-4">
                                    {[
                                        { icon: Github, href: "https://github.com/nadir-kutluozen" },
                                        { icon: Linkedin, href: "https://www.linkedin.com/in/nadir-kutluozen/" },
                                        { icon: Instagram, href: "https://twitter.com/nadir_kutluozen" },
                                        { icon: Mail, href: "mailto:nadirkutluozen.nk@gmail.com" }
                                    ].map((social, index) => (
                                        <motion.a
                                            key={index}
                                            href={social.href}
                                            target={social.href.startsWith("mailto") ? "_self" : "_blank"}
                                            rel="noopener noreferrer"
                                            className={styles.iconLink}
                                            whileHover={{ scale: 1.2 }}
                                            whileTap={{ scale: 0.9 }}
                                        >
                                            <social.icon size={24} />
                                        </motion.a>
                                    ))}
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
