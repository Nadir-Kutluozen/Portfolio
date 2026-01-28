"use client";

import React from "react";
import { motion } from "framer-motion";
import { Camera, Gamepad2, Plane, Music } from "lucide-react"; // Example icons

export default function HobbiesSection() {
    const hobbies = [
        { icon: Camera, title: "Photography", desc: "Capturing moments and landscapes." },
        { icon: Gamepad2, title: "Gaming", desc: "Immersive storytelling and strategy." },
        { icon: Plane, title: "Travel", desc: "Exploring new cultures and cuisines." },
        { icon: Music, title: "Music", desc: "Playing guitar and discovering new genres." },
    ];

    return (
        <section className="py-5 vh-100 position-relative overflow-hidden" style={{ minHeight: '60vh' }}>
            <div className="container px-4 px-lg-5">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-5"
                >
                    <h2 className="display-4 fw-bold mb-4">Dummy Section</h2>
                    <p className="lead opacity-75" style={{ maxWidth: '600px' }}>
                        When I'm not coding, you can find me exploring these passions.
                    </p>
                </motion.div>

                <div className="row g-4">
                    {hobbies.map((hobby, index) => (
                        <div key={index} className="col-12 col-md-6 col-lg-3">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="p-4 rounded-4 h-100 border border-secondary border-opacity-10 d-flex flex-column gap-3"
                                style={{
                                    backgroundColor: 'var(--nav-bg)', // Use theme-aware bg
                                    backdropFilter: 'blur(10px)'
                                }}
                            >
                                <div className="p-3 rounded-circle d-inline-flex align-items-center justify-content-center"
                                    style={{ width: 'fit-content', backgroundColor: 'var(--background)', color: 'var(--accent)' }}>
                                    <hobby.icon size={28} />
                                </div>
                                <div>
                                    <h3 className="h4 fw-bold mb-2">{hobby.title}</h3>
                                    <p className="opacity-75 mb-0 small">{hobby.desc}</p>
                                </div>
                            </motion.div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
