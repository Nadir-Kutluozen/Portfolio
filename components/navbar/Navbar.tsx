'use client'
import Link from 'next/link'
import { motion, useScroll, useMotionValueEvent } from 'framer-motion'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { Briefcase, Home, User, Heart, Mail } from 'lucide-react'
import ThemeToggle from '../ui/ThemeToggle'


export default function Navbar() {
    const { scrollY } = useScroll()
    const [isScrolled, setIsScrolled] = useState(false)
    const pathname = usePathname()
    // Check if we are on the projects page to optionally move navbar
    const isProjectsPage = pathname === '/projects'

    useMotionValueEvent(scrollY, "change", (latest) => {
        setIsScrolled(latest > 20)
    })

    const navLinks = [
        { name: 'Projects', href: '/projects', icon: Briefcase },
        { name: 'About', href: '/about', icon: User },
        { name: 'Hobbies', href: '/hobbies', icon: Heart },
        { name: 'Contact', href: '/contact', icon: Mail },
    ]

    return (
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
                className={`d-flex align-items-center shadow-sm ${isScrolled ? 'justify-content-center' : 'justify-content-between'}`}
                initial={{ borderRadius: '1rem', width: '50%' }}
                animate={{
                    // Logic: Fit content if scrolled.
                    // If Projects Page: 'fit-content' (looks best centered over content area)
                    // If Home: 50%
                    width: isScrolled || isProjectsPage ? 'fit-content' : 'calc(50% - 0.5rem)',

                    // Positioning Logic:
                    // Projects Page OR Scrolled: margin-left auto (pushes to right/center)
                    // Home (Unscrolled): margin-left 0 (starts left)
                    marginLeft: isProjectsPage || isScrolled ? 'auto' : '0',

                    // Projects Page: margin-right 0 (sticks to right)
                    // Home/Scrolled: margin-right auto (centers it)
                    marginRight: isProjectsPage ? '0' : 'auto',

                    padding: isScrolled ? '0.2rem 1rem' : '0.5rem 1rem',
                    gap: isScrolled ? '1rem' : '0',
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
                <motion.div layout className="d-flex align-items-center">
                    <ThemeToggle />
                </motion.div>
            </motion.div>
        </motion.nav>
    )
}
