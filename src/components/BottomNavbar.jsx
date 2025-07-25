import React from 'react'
import { motion } from 'framer-motion'
import { Home, User, ChartNoAxesGantt, FolderOpenDot, BookUser } from 'lucide-react'
import useScrollSpy from '../hooks/useScrollSpy'
import '../styles/bottomNavbar.css'

const navItems = [
    { icon: <Home size={20} />, label: 'Home', href: '#home', id: 'home' },
    { icon: <User size={20} />, label: 'About Me', href: '#profile', id: 'profile' },
    { icon: <ChartNoAxesGantt size={20} />, label: 'Skills', href: '#skills', id: 'skills' },
    { icon: <FolderOpenDot size={20} />, label: 'Projects', href: '#projects', id: 'projects' },
    { icon: <BookUser size={20} />, label: 'Contact', href: '#contact', id: 'contact' },
]

export default function BottomNavbar() {
    const activeSection = useScrollSpy(navItems.map((item) => item.id), 200)

    return (
        <motion.nav
            className="bottom-navbar d-flex justify-content-center align-items-center p-2 shadow"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
                type: 'spring',
                stiffness: 80,
                damping: 14,
            }}
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
    )
}