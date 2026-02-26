"use client";

import { motion, Variants } from "framer-motion";
import BlobAnimation from "@/components/animation/microanimation/BlobAnimation";
import DynamicButton from "@/components/ui/DynamicButton";
import { ArrowUpRight } from "lucide-react";

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: "easeOut"
        }
    }
};

export default function CallToAction({ title, description, buttonLink, buttonTitle }: { title: string, description: string, buttonLink: string, buttonTitle: string }) {
    return (
        <section className="col-12 w-100">
            <motion.div variants={itemVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <div className="p-5 vh-100 text-center d-flex flex-column align-items-center justify-content-center overflow-hidden position-relative w-100">
                    {/* Ambient Background blob */}
                    <BlobAnimation
                        color="var(--blob-color)"
                        size="200px"
                        blur="8px"
                        borderRadius="50% 50% 60% 40% / 60% 40% 50% 50%"
                        transition="linear"
                        className="opacity-50"
                        duration={10}
                    />
                    <BlobAnimation
                        color="var(--blob-color)"
                        size="250px"
                        blur="8px"
                        borderRadius="60% 40% 30% 70% / 50% 60% 40% 50%"
                        transition="linear"
                        className="opacity-50"
                        duration={8}
                    />
                    <BlobAnimation
                        color="var(--blob-color)"
                        size="340px"
                        blur="8px"
                        borderRadius="50% 50% 60% 40% / 60% 40% 50% 50%"
                        transition="linear"
                        className="opacity-50"
                        duration={6}
                    />
                    <BlobAnimation
                        color="var(--blob-color)"
                        size="360px"
                        blur="80px"
                        borderRadius="60% 40% 30% 70% / 50% 60% 40% 50%"
                        transition="linear"
                        className="opacity-50"
                        duration={12}
                    />
                    <BlobAnimation
                        color="var(--blob-color-2)"
                        size="60px"
                        blur="3px"
                        borderRadius="60% 40% 30% 70% / 50% 60% 40% 50%"
                        transition="linear"
                        className="opacity-100"
                        duration={12}
                    />

                    <div className="z-1 position-relative d-flex flex-column align-items-center">
                        <h2 className="display-6 fw-light text-uppercase mb-3" style={{ fontFamily: 'var(--font-couplin)', letterSpacing: '0.05em', color: 'var(--foreground)' }}>
                            {title}
                        </h2>
                        <p className="lead opacity-75 mb-4 fw-light" style={{ color: 'var(--foreground)' }}>{description}</p>
                        <DynamicButton
                            href={buttonLink}
                            className="btn btn-lg rounded-0 fw-bold text-uppercase tracking-wider shadow-sm d-inline-flex align-items-center px-5 py-3"
                            style={{ backgroundColor: 'var(--foreground)', color: 'var(--background)', border: 'none' }}
                        >
                            {buttonTitle} <ArrowUpRight className="ms-2" size={20} />
                        </DynamicButton>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
