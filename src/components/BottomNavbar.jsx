import { useState, useEffect, useMemo } from 'react'
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion'
import useScrollSpy from '../hooks/useScrollSpy'
import { useLanguage } from '../hooks/useLanguage'
import { useModal } from '../hooks/useModal'
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

export default function BottomNavbar() {
    const { t } = useLanguage()
    const { isModalOpen } = useModal()

    const navItems = [
        { icon: <Home size={20} />, label: t('nav.home'), href: '#home', id: 'home' },
        { icon: <User size={20} />, label: t('nav.about'), href: '#profile', id: 'profile' },
        { icon: <ChartNoAxesGantt size={20} />, label: t('nav.skills'), href: '#skills', id: 'skills' },
        { icon: <CodeXml size={20} />, label: t('nav.projects'), href: '#projects', id: 'projects' },
        { icon: <BookUser size={20} />, label: t('nav.contact'), href: '#contact', id: 'contact' },
    ]

    const sectionIds = useMemo(() => ['home', 'profile', 'skills', 'projects', 'contact'], [])
    const activeSection = useScrollSpy(sectionIds, 160)
    const [menuOpen, setMenuOpen] = useState(false)

    useEffect(() => {
        if (isModalOpen) {
            setMenuOpen(false)
        }
    }, [isModalOpen])

    return (
        <>
            {/* Desktop navbar */}
            <motion.nav
                className="bottom-navbar d-none d-md-flex p-2 shadow"
                initial={{ y: 100, x: '-50%', opacity: 0 }}
                animate={
                    isModalOpen
                        ? { y: 110, x: '-50%', opacity: 0, scale: 0.92 }
                        : { y: 0, x: '-50%', opacity: 1, scale: 1 }
                }
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
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
            <motion.div
                className="hamburger-menu d-md-none"
                initial={{ y: 0, opacity: 1, scale: 1 }}
                animate={
                    isModalOpen
                        ? { y: -75, opacity: 0, scale: 0.85 }
                        : { y: 0, opacity: 1, scale: 1 }
                }
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
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
            </motion.div>
        </>
    )
}
