"use client";

import styles from "./AboutSection.module.css";
import { motion, Variants } from "framer-motion";

const textVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8,
            ease: "easeOut"
        }
    }
};

export default function AboutSection() {
    return (
        <section className={`${styles.aboutSection} px-3 px-md-0`}>
            <div className="container">
                <div className="row">

                    {/* Sticky Left Column: Title */}
                    <div className="col-12 col-md-4">
                        <div className={styles.stickyColumn}>
                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.8 }}
                            >
                                <h2 className={styles.heading}>
                                    ABOUT<br />ME
                                    <span className={styles.titleDecoration}></span>
                                </h2>
                            </motion.div>
                        </div>
                    </div>

                    {/* Scrolling Right Column: Content */}
                    <div className="col-12 col-md-7 offset-md-1">
                        <div className="d-flex flex-column gap-5">
                            <motion.p
                                className={styles.bioText}
                                variants={textVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: "-10%" }}
                            >
                                I am a <span className={styles.highlight}>Full Stack Software Engineer</span> with a passion for building digital products that live at the intersection of complex engineering and beautiful design.
                            </motion.p>

                            <motion.p
                                className={styles.bioText}
                                variants={textVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: "-10%" }}
                            >
                                My journey started with a curiosity for how things work under the hood, but it quickly evolved into an obsession with how they <span className={styles.highlight}>feel</span> to the user. I believe that code is just a tool to tell a story, and I strive to make that story as compelling as possible.
                            </motion.p>

                            <motion.p
                                className={styles.bioText}
                                variants={textVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: "-10%" }}
                            >
                                Whether I'm architecting a scalable backend, fine-tuning a 3D interaction, or obsessing over pixel-perfect typography, my goal remains the same: <span className={styles.highlight}>Creation without compromise.</span>
                            </motion.p>

                            <motion.div
                                variants={textVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: "-10%" }}
                            >
                                <div className="d-flex gap-4 border-top border-white border-opacity-25 pt-4 mt-2">
                                    <div>
                                        <h4 className="h6 text-uppercase tracking-widest opacity-50 mb-2">Location</h4>
                                        <p className="lead m-0">New York, NY</p>
                                    </div>
                                    <div>
                                        <h4 className="h6 text-uppercase tracking-widest opacity-50 mb-2">Status</h4>
                                        <p className="lead m-0 text-success">Available for new projects</p>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
