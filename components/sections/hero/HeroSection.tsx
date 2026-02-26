"use client";

import styles from "./HeroSection.module.css";
import { Github, Linkedin, Twitter, Mail, Instagram } from "lucide-react";
import { motion, Variants, AnimatePresence } from "framer-motion";
import { ConnectMe } from "@/components/animation/microanimation/ConnectMe";
import { FolderSearch } from "@/components/animation/microanimation/FolderSearch";
import TextType from "@/components/animation/microanimation/TextType";
import DynamicButton from "@/components/ui/DynamicButton";
import { useTheme } from "@/context/ThemeProvider";
import { GithubIcon } from "@/components/animation/microanimation/GithubIcon";
import { InstagramIcon } from "@/components/animation/microanimation/InstagramIcon";
import { MailboxIcon } from "@/components/animation/microanimation/MailboxIcon";
import { LinkedinIcon } from "@/components/animation/microanimation/LinkedinIcon";

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.3,
            duration: 0.8
        }
    }
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 10 }, // Add blur to items too for smoother effect
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 1,
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
                    <motion.div variants={itemVariants}>
                        <TextType
                            as="h1"
                            text="NADIR KUTLUOZEN"
                            typingSpeed={90}
                            showCursor={true}
                            loop={false}
                            className={`${styles.name} m-0 p-0`}
                            cursorClassName="text-accent"
                        />
                    </motion.div>

                    <div className="row w-100 justify-content-center align-items-center mt-4 mt-md-5">

                        {/* Column 1: Social Icons */}
                        <div className="col-12 col-md-auto d-flex flex-row flex-md-column justify-content-center align-items-center align-items-md-end gap-3 order-3 order-md-1 mt-4 mt-md-0">
                            {[
                                { icon: <MailboxIcon size={34} fill={theme === "dark" ? "#ffffff" : "#000000"} />, href: "mailto:nadirkutluozen.nk@gmail.com" },
                                { icon: <GithubIcon size={34} stroke={theme === "dark" ? "#ffffff" : "#000000"} />, href: "https://github.com/nadir-kutluozen" },
                                { icon: <InstagramIcon size={34} fill={theme === "dark" ? "#ffffff" : "#000000"} />, href: "https://instagram.com/nadirkutluozen" },
                                { icon: <LinkedinIcon size={34} fill={theme === "dark" ? "#ffffff" : "#000000"} />, href: "https://linkedin.com/in/nadir-kutluozen" }
                            ].map((social, index) => (
                                <motion.a
                                    key={index}
                                    href={social.href}
                                    target={social.href.startsWith("mailto") ? "_self" : "_blank"}
                                    rel="noopener noreferrer"
                                    className={styles.iconLink}
                                    whileHover={{ scale: 1.1 }}
                                    transition={{ duration: 0.2, ease: "easeOut" }}
                                    whileTap={{ scale: 0.9 }}
                                    variants={itemVariants}
                                >
                                    {social.icon}
                                </motion.a>
                            ))}
                        </div>

                        {/* Column 2: Profile Photo (Left aligned now) */}
                        <div className="col-12 col-md-5 d-flex justify-content-center justify-content-md-end order-1 order-md-2 mb-4 mb-md-0 pe-md-4">
                            <motion.div
                                variants={itemVariants}
                                className={` overflow-hidden shadow-lg border border-2 border-white border-opacity-25  ${styles.imageContainer}`}
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

                        {/* Column 3: Bio & Buttons (Right aligned text block) */}
                        <div className={`col-12 col-md-6 text-center text-md-start order-2 order-md-3 ps-md-4 d-flex flex-column ${styles.textContentWrapper}`}>
                            <div>
                                <motion.h2 className={`${styles.subtitle} text-md-start`} variants={itemVariants}>
                                    Full Stack Software<br />and Design Engineer
                                </motion.h2>

                                <motion.p className={`${styles.bio} mx-auto mx-md-0 text-md-start mt-4`} style={{ maxWidth: '480px' }} variants={itemVariants}>
                                    I build digital products that look good and work even better. Merging technical depth with creative design.
                                </motion.p>
                            </div>

                            <motion.div
                                className="d-flex gap-3 mt-auto justify-content-center justify-content-md-start align-items-center pt-4 pt-md-0"
                                variants={itemVariants}
                            >
                                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                    <DynamicButton
                                        href="/projects"
                                        className={`btn btn-outline-dark border-opacity-75 d-flex align-items-center justify-content-center shadow-sm ${styles.ctaButton}`}
                                        style={{ backdropFilter: 'blur(10px)', textDecoration: 'none' }}
                                    >
                                        Projects <FolderSearch size={22} className="ms-2" />
                                    </DynamicButton>
                                </motion.div>
                                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                    <DynamicButton
                                        href="mailto:nadirkutluozen.nk@gmail.com"
                                        className={`btn btn-dark fw-bold d-flex align-items-center justify-content-center text-white shadow-sm ${styles.ctaButton}`}
                                        style={{ textDecoration: 'none' }}
                                    >
                                        Contact <ConnectMe size={22} className="ms-2" />
                                    </DynamicButton>
                                </motion.div>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}
