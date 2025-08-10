// src/components/BottomNavbar.jsx
import { useState } from 'react'
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion'
import useScrollSpy from '../hooks/useScrollSpy'
// Icons
import {
    Home,
    User,
    ChartNoAxesGantt,
    CodeXml,
    BookUser,
    Menu
} from 'lucide-react'
import '../styles/bottomNavbar.css'

const navItems = [
    { icon: <Home size={20} />, label: 'Home', href: '#home', id: 'home' },
    { icon: <User size={20} />, label: 'About Me', href: '#profile', id: 'profile' },
    { icon: <ChartNoAxesGantt size={20} />, label: 'Skills', href: '#skills', id: 'skills' },
    { icon: <CodeXml size={20} />, label: 'Projects', href: '#projects', id: 'projects' },
    { icon: <BookUser size={20} />, label: 'Contact', href: '#contact', id: 'contact' },
]

export default function BottomNavbar() {
    const activeSection = useScrollSpy(navItems.map((item) => item.id), 200)
    const [menuOpen, setMenuOpen] = useState(false)

    return (
        <>
            {/* Desktop navbar */}
            <motion.nav
                className="bottom-navbar d-none d-md-flex p-2 shadow"
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 80, damping: 14 }}
            >
                <ul className="nav gap-2 mb-0">
                    {navItems.map((item, idx) => (
                        <motion.li
                            className="nav-item"
                            key={idx}
                            whileHover={{ scale: 0.9 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ type: 'spring', stiffness: 300 }}
                        >
                            <a
                                href={item.href}
                                className={`nav-link btn-nav ${activeSection === item.id ? 'active' : ''}`}
                            >
                                {item.icon}
                                <span className="ms-2">{item.label}</span>
                            </a>
                        </motion.li>
                    ))}
                </ul>
            </motion.nav>

            {/* Mobile navbar */}
            <div className="hamburger-menu d-md-none">
                <button className="menu-button" onClick={() => setMenuOpen((prev) => !prev)}>
                    <Menu size={28} />
                </button>

                <AnimatePresence>
                    {menuOpen && (
                        <motion.ul
                            className="mobile-nav shadow"
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -20, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            {navItems.map((item, idx) => (
                                <motion.li
                                    key={idx}
                                    className="nav-item"
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setMenuOpen(false)}
                                >
                                    <a
                                        href={item.href}
                                        className={`nav-link btn-nav ${activeSection === item.id ? 'active' : ''}`}
                                    >
                                        {item.icon}
                                        <span className="ms-2">{item.label}</span>
                                    </a>
                                </motion.li>
                            ))}
                        </motion.ul>
                    )}
                </AnimatePresence>
            </div>
        </>
    )
}
