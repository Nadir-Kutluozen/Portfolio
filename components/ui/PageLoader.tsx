"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CodeScanStew2 } from "../animation/microanimation/CodeScanStew2";

export default function PageLoader() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Hide loader after 2 seconds
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2400);

        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    initial={{ y: 0 }}
                    exit={{ y: "-100%" }}
                    transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }} // Smooth snap up
                    className="fixed-top w-100 vh-100 d-flex flex-column align-items-center justify-content-center"
                    style={{
                        backgroundColor: '#ffffff', // User specifically requested white background
                        color: '#000000',
                        zIndex: 9999,
                    }}
                >
                    <div className="d-flex flex-column align-items-center justify-content-center flex-grow-1">
                        <CodeScanStew2 size={120} stroke="#000000" />
                    </div>

                    {/* Bottom message */}
                    <div className="pb-5">
                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.5 }}
                            className="fs-6 fw-medium text-uppercase tracking-widest"
                            style={{ letterSpacing: '0.1em' }}
                        >
                            Hello there traveller!
                        </motion.p>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
