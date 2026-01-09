"use client";

import React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/context/ThemeProvider";
import { motion } from "framer-motion";

export default function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();

    return (
        <motion.button
            onClick={toggleTheme}
            className="btn btn-link p-2 text-decoration-none d-flex align-items-center justify-content-center"
            style={{ color: "var(--foreground)" }}
            whileHover={{ scale: 1.1, rotate: 15 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Toggle Theme"
        >
            {theme === "light" ? (
                <Moon size={22} className="text-secondary" />
            ) : (
                <Sun size={22} className="text-warning" />
            )}
        </motion.button>
    );
}
