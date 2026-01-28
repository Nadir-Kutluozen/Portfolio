"use client";

import styles from "./HeroSection.module.css";
import { Github, Linkedin, Twitter, Mail, Instagram } from "lucide-react";
import { motion, Variants, AnimatePresence } from "framer-motion";
import { ConnectMe } from "@/components/animation/microanimation/ConnectMe";
import { FolderSearch } from "@/components/animation/microanimation/FolderSearch";
import { useTheme } from "@/context/ThemeProvider";

const containerVariants: Variants = {
    hidden: { opacity: 0, filter: "blur(10px)" },
    visible: {
        opacity: 1,
        filter: "blur(0px)",
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.3,
            duration: 0.8
        }
    }
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30, filter: "blur(10px)" }, // Add blur to items too for smoother effect
    visible: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: {
            duration: 1.2,
            ease: [0.25, 1, 0.5, 1]
        }
    }
};

export default function HeroSection() {
    const { theme } = useTheme();

    return (
        <section className={`${styles.heroSection} d-flex align-items-center justify-content-center`}>
            <div className="container position-relative z-1 h-100 d-flex flex-column align-items-center justify-content-center">

                {/* Main Centered Content */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="d-flex flex-column align-items-center justify-content-center w-100"
                >
                    <motion.h1 className={styles.name} variants={itemVariants}>
                        NADIR KUTLUOZEN
                    </motion.h1>

                    {/* Newspaper Grid Layout */}
                    <div className="row w-100 justify-content-center align-items-center mt-3 gap-4 gap-md-5">

                        {/* Column 1: Social Icons */}
                        <div className="col-12 col-md-auto d-flex flex-row flex-md-column justify-content-center align-items-center align-items-md-end gap-3 order-3 order-md-1 mt-4 mt-md-0">
                            {[
                                { icon: Linkedin, href: "https://www.linkedin.com/in/nadir-kutluozen/" },
                                { icon: Github, href: "https://github.com/nadir-kutluozen" },
                                { icon: Instagram, href: "https://instagram.com/nadirkutluozen" },
                                { icon: Mail, href: "mailto:nadirkutluozen.nk@gmail.com" }
                            ].map((social, index) => (
                                <motion.a
                                    key={index}
                                    href={social.href}
                                    target={social.href.startsWith("mailto") ? "_self" : "_blank"}
                                    rel="noopener noreferrer"
                                    className={styles.iconLink}
                                    whileHover={{ scale: 1.2, x: 5 }}
                                    whileTap={{ scale: 0.9 }}
                                    variants={itemVariants}
                                >
                                    <social.icon size={36} />
                                </motion.a>
                            ))}
                        </div>

                        {/* Column 2: Profile Photo */}
                        <div className="col-12 col-md-auto d-flex justify-content-center order-1 order-md-2 mb-3 mb-md-0 px-0">
                            <motion.div
                                variants={itemVariants}
                                className={`rounded-4 overflow-hidden shadow-lg border border-2 border-white border-opacity-25 bg-black ${styles.imageContainer}`}
                                style={{ position: 'relative' }}
                            >
                                <AnimatePresence>
                                    <motion.img
                                        key={theme}
                                        src={theme === "dark" ? "/heroPhoto.JPG" : "/nadirk.jpg"}
                                        alt="Nadir Kutluozen"
                                        className="w-100 h-100 object-fit-cover position-absolute top-0 start-0"
                                        initial={{ opacity: 0, filter: "blur(15px)", scale: 1.1 }}
                                        animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
                                        exit={{ opacity: 0, filter: "blur(15px)", scale: 1.1 }}
                                        transition={{ duration: 0.8, ease: "easeInOut" }}
                                    />
                                </AnimatePresence>
                            </motion.div>
                        </div>

                        {/* Column 3: Bio & Buttons */}
                        <div className="col-12 col-md-5 text-center text-md-start order-2 order-md-3">
                            <motion.h2 className={`${styles.subtitle} text-md-start`} variants={itemVariants}>
                                Full Stack Software<br />and Design Engineer
                            </motion.h2>

                            <motion.p className={`${styles.bio} mx-auto mx-md-0 text-md-start ps-1`} style={{ maxWidth: '450px' }} variants={itemVariants}>
                                I build digital products that look good and work even better. Merging technical depth with creative design.
                            </motion.p>

                            <motion.div
                                className="d-flex gap-3 mt-3 justify-content-center justify-content-md-start align-items-center flex-wrap flex-md-nowrap"
                                variants={itemVariants}
                            >
                                <motion.a
                                    href="/projects"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className={`btn btn-outline-dark rounded-4 border-opacity-75 d-flex align-items-center shadow-sm ${styles.ctaButton}`}
                                    style={{ backdropFilter: 'blur(5px)' }}
                                >
                                    Projects <FolderSearch size={22} className="ms-2" />
                                </motion.a>
                                <motion.a
                                    href="mailto:nadirkutluozen.nk@gmail.com"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className={`btn btn-dark rounded-4 fw-bold d-flex align-items-center text-white shadow-sm ${styles.ctaButton}`}
                                >
                                    Contact <ConnectMe size={22} className="ms-2" />
                                </motion.a>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}
