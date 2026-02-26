"use client";

import React from "react";
import styles from "./Contact.module.css";
import { motion, Variants } from "framer-motion";
import { useTheme } from "@/context/ThemeProvider";
import { GithubIcon } from "@/components/animation/microanimation/GithubIcon";
import { InstagramIcon } from "@/components/animation/microanimation/InstagramIcon";
import { MailboxIcon } from "@/components/animation/microanimation/MailboxIcon";
import { LinkedinIcon } from "@/components/animation/microanimation/LinkedinIcon";
import { ArrowUpRight } from "lucide-react";

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2
        }
    }
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: "easeOut" }
    }
};

export default function Contact() {
    const { theme } = useTheme();

    const contactMethods = [
        {
            name: "Email",
            handle: "nadirkutluozen.nk@gmail.com",
            href: "mailto:nadirkutluozen.nk@gmail.com",
            icon: <MailboxIcon size={40} fill={theme === "dark" ? "#ffffff" : "#000000"} />
        },
        {
            name: "GitHub",
            handle: "github.com/nadir-kutluozen",
            href: "https://github.com/nadir-kutluozen",
            icon: <GithubIcon size={40} stroke={theme === "dark" ? "#ffffff" : "#000000"} />
        },
        {
            name: "LinkedIn",
            handle: "linkedin.com/in/nadir-kutluozen",
            href: "https://linkedin.com/in/nadir-kutluozen",
            icon: <LinkedinIcon size={40} fill={theme === "dark" ? "#ffffff" : "#000000"} />
        },
        {
            name: "Instagram",
            handle: "@nadirkutluozen",
            href: "https://instagram.com/nadirkutluozen",
            icon: <InstagramIcon size={40} fill={theme === "dark" ? "#ffffff" : "#000000"} />
        }
    ];

    return (
        <main className="container-fluid p-0 m-0 overflow-hidden">
            <div className={styles.container}>
                <motion.div
                    className="w-100 h-100"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.div className={styles.grid} variants={itemVariants}>
                        {contactMethods.map((method, index) => (
                            <motion.a
                                key={index}
                                href={method.href}
                                target={method.href.startsWith("mailto") ? "_self" : "_blank"}
                                rel="noopener noreferrer"
                                className={`${styles.card} flex-column flex-md-row text-center text-md-start`}
                                variants={itemVariants}
                                whileHover={{ scale: 1.0 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <div className={styles.iconWrapper}>
                                    {method.icon}
                                </div>
                                <div className={styles.cardContent}>
                                    <h2 className={styles.platformName}>{method.name}</h2>
                                    <p className={styles.platformHandle}>{method.handle}</p>
                                </div>
                                <ArrowUpRight size={32} className="ms-md-auto opacity-50 d-none d-md-block" />
                            </motion.a>
                        ))}
                    </motion.div>
                </motion.div>
            </div>
        </main>
    );
}
