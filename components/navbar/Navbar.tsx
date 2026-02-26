'use client'
import Link from 'next/link'
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { Briefcase, User, Heart, Mail, Menu, X } from 'lucide-react'
import ThemeToggle from '../ui/ThemeToggle'
import { HomeIconAnimated } from '../animation/microanimation/HomeIconAnimated'
import DynamicButton from '../ui/DynamicButton'
export default function Navbar() {
    const { scrollY } = useScroll()
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const pathname = usePathname()

    useEffect(() => {
        setIsMobileMenuOpen(false)
    }, [pathname])

    useMotionValueEvent(scrollY, "change", (latest) => {
        setIsScrolled(latest > 10)
    })

    // Listen to custom scroll events for pages that use internal scrolling divs instead of window scroll
    useEffect(() => {
        const handleProjectScroll = (e: Event) => {
            const customEvent = e as CustomEvent<number>;
            setIsScrolled(customEvent.detail > 10);
        };

        window.addEventListener('projectScroll', handleProjectScroll);
        return () => window.removeEventListener('projectScroll', handleProjectScroll);
    }, []);

    const navLinks = [
        { name: 'Projects', href: '/projects', icon: Briefcase },
        { name: 'About', href: '/about', icon: User },
        { name: 'Contact', href: '/contact', icon: Mail },
    ]

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
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="fixed-top w-100"
                style={{
                    zIndex: 1000,
                    backgroundColor: isScrolled ? 'var(--nav-bg)' : 'transparent',
                    borderBottom: isScrolled ? '1px solid rgba(125, 125, 125, 0.2)' : '1px solid transparent',
                    boxShadow: isScrolled ? '0 4px 20px rgba(0, 0, 0, 0.05)' : 'none',
                    transition: 'box-shadow 0.2s ease, background-color 0.3s ease, border-bottom 0.3s ease',
                }}
            >
                <div className="container px-4 pe-md-5">
                    <div className="d-flex align-items-center justify-content-between" style={{ height: '60px' }}>

                        {/* Logo - Left */}
                        <div className="d-flex align-items-center" style={{ width: '120px' }}>
                            <Link href="/" className="text-decoration-none d-flex align-items-center gap-2" style={{ color: 'var(--foreground)' }}>
                                <div className="d-flex align-items-center justify-content-center" style={{
                                    width: '32px',
                                    height: '32px',
                                    color: 'var(--foreground)'
                                }}>
                                    <HomeIconAnimated size={32} stroke='var(--foreground)' />
                                </div>
                            </Link>
                        </div>

                        {/* Desktop Links - Center */}
                        <div className="d-none d-md-flex align-items-center justify-content-center flex-grow-1">
                            {navLinks.map((link) => {
                                const isActive = pathname === link.href;
                                return (
                                    <DynamicButton
                                        key={link.name}
                                        href={link.href}
                                        className="text-decoration-none position-relative px-3 py-2 mx-1"
                                        style={{
                                            color: 'var(--foreground)',
                                            fontWeight: isActive ? 600 : 400,
                                            border: isActive ? '1px solid rgba(125,125,125,0.2)' : '1px solid transparent',
                                        }}
                                    >
                                        <span className="small text-uppercase tracking-wide" style={{ letterSpacing: '0.5px', fontSize: '0.75rem' }}>{link.name}</span>
                                    </DynamicButton>
                                )
                            })}
                        </div>

                        {/* Actions - Right */}
                        <div className="d-flex align-items-center justify-content-end gap-3" style={{ width: '120px' }}>
                            <ThemeToggle />

                            {/* Mobile Menu Toggle */}
                            <button
                                className="btn btn-link p-0 text-decoration-none d-flex d-md-none align-items-center justify-content-center"
                                style={{ color: 'var(--foreground)', transition: 'all 0.2s ease' }}
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            >
                                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={{ duration: 0.2, ease: 'easeOut' }}
                        className="fixed-top w-100 vh-100 d-flex flex-column align-items-center justify-content-center d-md-none"
                        style={{
                            backgroundColor: 'var(--background)',
                            color: 'var(--foreground)',
                            zIndex: 999,
                            top: 0,
                            left: 0,
                        }}
                    >
                        <div className="d-flex flex-column align-items-center gap-2 w-100 px-4">
                            {navLinks.map((link, index) => {
                                const isActive = pathname === link.href;
                                return (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        className="text-decoration-none w-100"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.05 * index, duration: 0.2 }}
                                            className="d-flex align-items-center justify-content-center gap-3 py-4"
                                            style={{
                                                color: 'var(--foreground)',
                                                border: '1px solid rgba(125,125,125,0.2)',
                                                backgroundColor: isActive ? 'var(--nav-bg)' : 'transparent',
                                                transition: 'background-color 0.1s ease'
                                            }}
                                        >
                                            <link.icon size={20} style={{ opacity: isActive ? 1 : 0.6 }} />
                                            <span className="fw-bold text-uppercase" style={{ fontSize: '1.2rem', letterSpacing: '1px', opacity: isActive ? 1 : 0.8 }}>{link.name}</span>
                                        </motion.div>
                                    </Link>
                                )
                            })}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
