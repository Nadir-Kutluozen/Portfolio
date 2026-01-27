'use client'
import Link from 'next/link'
import { motion, useScroll, useMotionValueEvent } from 'framer-motion'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { Briefcase, Home, User, Heart, Mail, Menu, X } from 'lucide-react'
import ThemeToggle from '../ui/ThemeToggle'
import { AnimatePresence } from 'framer-motion'


export default function Navbar() {
    const { scrollY } = useScroll()
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const pathname = usePathname()
    // Check if we are on the projects page to optionally move navbar
    const isProjectsPage = pathname === '/projects'

    // Close menu when route changes (handles back button, etc)
    useEffect(() => {
        setIsMobileMenuOpen(false)
    }, [pathname])

    useMotionValueEvent(scrollY, "change", (latest) => {
        setIsScrolled(latest > 20)
    })

    const navLinks = [
        { name: 'Projects', href: '/projects', icon: Briefcase },
        { name: 'About', href: '/about', icon: User },
        { name: 'Hobbies', href: '/hobbies', icon: Heart },
        { name: 'Contact', href: '/contact', icon: Mail },
    ]

    // Prevent body scroll when menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }
    }, [isMobileMenuOpen])

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
                className={`fixed-top w-100 p-2 d-flex ${isProjectsPage ? 'justify-content-end px-4' : 'justify-content-center'}`}
                style={{
                    zIndex: 1000,
                    // Remove the paddingLeft offset, just let Flexbox align it to the end
                    paddingLeft: '0.5rem'
                }}
            >
                <motion.div
                    layout
                    className={`d-flex align-items-center shadow-sm justify-content-center`}
                    initial={{ borderRadius: '1rem', width: 'fit-content', opacity: 0 }}
                    animate={{
                        width: 'fit-content',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        opacity: 1,
                        padding: isScrolled ? '0.2rem 1rem' : '0.5rem 3rem',
                        gap: '1rem',
                    }}
                    transition={{
                        type: "spring",
                        stiffness: 70, // Slower (was 120)
                        damping: 25 // Smoother/Less bounce (was 20)
                    }}
                    style={{
                        backgroundColor: 'var(--nav-bg)', // Solid consistent color
                        color: 'var(--foreground)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                        // Removed backdropFilter for solid look
                    }}
                >
                    {/* Logo */}
                    <Link href="/" className="text-decoration-none d-flex align-items-center gap-2" style={{ color: 'var(--foreground)' }}>
                        <motion.div
                            whileHover={{ rotate: 15 }}
                            transition={{ type: "spring", stiffness: 300 }}
                            layout
                        >
                            <Home size={20} />
                        </motion.div>
                        <motion.span layout className="fw-bold tracking-tight small">Nadir</motion.span>
                    </Link>

                    {/* Divider - Only show when centered/compact or adjusted for layout? */}
                    <motion.div
                        layout
                        style={{
                            width: '1px',
                            height: '20px',
                            backgroundColor: 'var(--foreground)',
                            opacity: 0.2,
                            margin: '0 1rem'
                        }}
                    />

                    {/* Desktop Links */}
                    <motion.div layout className="d-none d-md-flex align-items-center gap-1">
                        {navLinks.map((link) => (
                            <Link key={link.name} href={link.href} className="text-decoration-none">
                                <motion.div
                                    className="px-3 py-1 rounded-pill d-flex align-items-center gap-2 hover-bg-light-transparent"
                                    whileHover={{
                                        scale: 1.05,
                                        backgroundColor: 'rgba(125,125,125,0.1)',
                                    }}
                                    whileTap={{ scale: 0.95 }}
                                    style={{ color: 'var(--foreground)' }}
                                >
                                    <span className="fw-medium small">{link.name}</span>
                                </motion.div>
                            </Link>
                        ))}
                    </motion.div>

                    {/* Divider */}
                    <motion.div
                        layout
                        className="d-none d-md-block"
                        style={{
                            width: '1px',
                            height: '20px',
                            backgroundColor: 'var(--foreground)',
                            opacity: 0.2,
                            margin: '0 1rem'
                        }}
                    />

                    {/* Mobile Toggle / Extra Actions */}
                    <div className="d-flex align-items-center gap-2">
                        <motion.div layout className="d-flex align-items-center">
                            <ThemeToggle />
                        </motion.div>

                        {/* Mobile Menu Toggle */}
                        <motion.button
                            className="btn btn-link p-0 text-decoration-none d-flex d-md-none align-items-center justify-content-center"
                            style={{ color: 'var(--foreground)' }}
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            whileTap={{ scale: 0.9 }}
                        >
                            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </motion.button>
                    </div>
                </motion.div>
            </motion.nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: "-100%" }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: "-100%" }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="fixed-top w-100 vh-100 d-flex flex-column align-items-center justify-content-center d-md-none"
                        style={{
                            backgroundColor: 'var(--nav-bg)', // Consistent background
                            color: 'var(--foreground)',
                            zIndex: 999, // Just below the navbar (or same if we want to cover everything, but navbar has high z-index)
                            // Actually, let's make it cover underneath or be part of the flow.
                            // If we want it to cover screen, zIndex should be high, but navbar is 1000.
                            // Let's set it to 999 and add padding top to account for navbar, or just cover everything?
                            // User asked to "expand and cover the phone screen".
                            // Let's place it fullscreen.
                            top: 0,
                            left: 0,
                        }}
                    >
                        <div className="d-flex flex-column align-items-start gap-4 mt-5 ps-4 w-100">
                            {navLinks.map((link, index) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="text-decoration-none w-100"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    <motion.div
                                        initial={{ opacity: 0, x: -40 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{
                                            delay: 0.1 + index * 0.1,
                                            type: "spring",
                                            stiffness: 50,
                                            damping: 20
                                        }}
                                        className="d-flex align-items-center gap-4 py-2"
                                        style={{ color: 'var(--foreground)' }}
                                    >
                                        <link.icon size={42} strokeWidth={1} style={{ opacity: 0.8 }} />
                                        <span className="fw-light tracking-tighter" style={{ fontSize: '3.5rem', lineHeight: 1 }}>{link.name}</span>
                                    </motion.div>
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
