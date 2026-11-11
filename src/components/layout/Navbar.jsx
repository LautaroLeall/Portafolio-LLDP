import { useState, useEffect } from 'react';
import { NavLink, Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Sun,
    Moon,
    Menu,
    X,
    ArrowUpRight
} from 'lucide-react';
import { FaWhatsapp, FaLinkedin, FaGithub } from 'react-icons/fa';
import { useLanguage } from '../../hooks/useLanguage';
import { useTheme } from '../../hooks/useTheme';
import LogoLLDP from '../ui/LogoLLDP';
import { CONTACT_INFO, buildWhatsAppUrl } from '../../data/servicesData';

export default function Navbar() {
    const { t, language, toggleLanguage } = useLanguage();
    const { theme, toggleTheme } = useTheme();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const isEs = language === 'es';
    const isLight = theme === 'light';

    // Track scroll for subtle elevation adjustment
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile drawer on route change
    useEffect(() => {
        setMobileOpen(false);
    }, [location.pathname]);

    // Prevent background scrolling & pause Lenis when mobile drawer is open
    useEffect(() => {
        if (mobileOpen) {
            document.body.style.overflow = 'hidden';
            if (window.__lenis) {
                window.__lenis.stop();
            }
        } else {
            document.body.style.overflow = '';
            if (window.__lenis) {
                window.__lenis.start();
            }
        }
        return () => {
            document.body.style.overflow = '';
            if (window.__lenis) {
                window.__lenis.start();
            }
        };
    }, [mobileOpen]);

    // Handle Logo click: Smooth scroll to top if already on home, or navigate to home
    const handleLogoClick = (e) => {
        e.preventDefault();
        setMobileOpen(false);
        if (location.pathname === '/') {
            if (window.__lenis) {
                window.__lenis.scrollTo(0, {
                    duration: 1.0,
                    easing: (val) => Math.min(1, 1.001 - Math.pow(2, -10 * val))
                });
            } else {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        } else {
            navigate('/');
            if (window.__lenis) {
                window.__lenis.resize();
                window.__lenis.scrollTo(0, { immediate: true });
            }
            window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
            document.documentElement.scrollTop = 0;
            document.body.scrollTop = 0;
        }
    };

    // Handle NavLink click: smooth scroll to top if already on active route, or instant reset
    const handleNavLinkClick = (e, targetPath) => {
        setMobileOpen(false);
        if (location.pathname === targetPath) {
            e.preventDefault();
            if (window.__lenis) {
                window.__lenis.scrollTo(0, {
                    duration: 1.0,
                    easing: (val) => Math.min(1, 1.001 - Math.pow(2, -10 * val))
                });
            } else {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        } else {
            if (window.__lenis) {
                window.__lenis.resize();
                window.__lenis.scrollTo(0, { immediate: true });
            }
            window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
            document.documentElement.scrollTop = 0;
            document.body.scrollTop = 0;
        }
    };

    const navLinks = [
        { path: '/', label: t('nav.home') },
        { path: '/servicios', label: t('nav.services') },
        { path: '/proyectos', label: t('nav.projects') },
        { path: '/habilidades', label: t('nav.skills') },
        { path: '/educacion', label: t('nav.education') },
        { path: '/sobre-mi', label: t('nav.about') },
        { path: '/contacto', label: t('nav.contact') }
    ];

    return (
        <header className="fixed top-3 sm:top-5 left-0 right-0 z-50 px-3 sm:px-6 flex justify-center pointer-events-none transition-all duration-300">
            {/* Natural Minimalist Floating Bar */}
            <motion.div
                className={`pointer-events-auto relative w-full max-w-5xl rounded-full transition-all duration-300 border ${scrolled
                    ? isLight
                        ? 'bg-white/95 border-slate-200/90 shadow-md shadow-slate-200/50'
                        : 'bg-[#020A15]/95 border-white/[0.12] shadow-xl shadow-black/40'
                    : isLight
                        ? 'bg-white/80 border-slate-200/70 shadow-sm backdrop-blur-xl'
                        : 'bg-[#020A15]/75 border-white/[0.08] shadow-md shadow-black/20 backdrop-blur-xl'
                    }`}
                initial={{ y: -40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
                <div className="h-14 sm:h-15 flex items-center justify-between px-3.5 sm:px-5 gap-3">
                    {/* Brand Identity: Clean, Human, Natural */}
                    <motion.a
                        href="/"
                        onClick={handleLogoClick}
                        className="inline-flex items-center gap-2.5 no-underline select-none shrink-0 group"
                        aria-label="Lautaro Leal — Inicio"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <LogoLLDP
                            variant="icon"
                            size={40}
                            className="rounded-lg shadow-sm group-hover:opacity-90 transition-opacity"
                        />
                        <span className={`text-sm sm:text-base font-semibold tracking-tight transition-colors ${isLight
                            ? 'text-slate-900 group-hover:text-blue-600'
                            : 'text-white group-hover:text-slate-200'
                            }`}>
                            Lautaro.Dev
                        </span>
                    </motion.a>

                    {/* Desktop Center Navigation Links */}
                    <nav className="hidden lg:flex items-center gap-0.5" aria-label="Navegación principal">
                        {navLinks.map((item) => {
                            const isActive = item.path === '/'
                                ? location.pathname === '/'
                                : location.pathname.startsWith(item.path);

                            return (
                                <NavLink
                                    key={item.path}
                                    to={item.path}
                                    end={item.path === '/'}
                                    onClick={(e) => handleNavLinkClick(e, item.path)}
                                    className={`relative px-3.5 py-1.5 text-xs font-medium rounded-full transition-colors select-none whitespace-nowrap ${isActive
                                        ? isLight
                                            ? 'text-slate-900 font-semibold'
                                            : 'text-white font-semibold'
                                        : isLight
                                            ? 'text-slate-600 hover:text-slate-950 hover:bg-slate-100/70'
                                            : 'text-slate-400 hover:text-white hover:bg-white/[0.05]'
                                        }`}
                                >
                                    {isActive && (
                                        <motion.span
                                            layoutId="natural-nav-pill"
                                            className={`absolute inset-0 rounded-full z-0 ${isLight
                                                ? 'bg-slate-100 border border-slate-200/80 shadow-sm'
                                                : 'bg-white/[0.1] border border-white/10'
                                                }`}
                                            transition={{
                                                type: 'spring',
                                                stiffness: 400,
                                                damping: 32
                                            }}
                                        />
                                    )}
                                    <span className="relative z-10">{item.label}</span>
                                </NavLink>
                            );
                        })}
                    </nav>

                    {/* Right Controls: Minimalist & Clean */}
                    <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                        {/* Clean Language Switch */}
                        <button
                            type="button"
                            onClick={toggleLanguage}
                            className={`px-2.5 py-1 text-xs font-medium rounded-full transition-colors cursor-pointer select-none ${isLight
                                ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                                : 'text-slate-300 hover:text-white hover:bg-white/10'
                                }`}
                            title={isEs ? 'Switch to English' : 'Cambiar a Español'}
                            aria-label="Cambiar idioma"
                        >
                            {language === 'es' ? 'EN' : 'ES'}
                        </button>

                        {/* Clean Theme Toggle */}
                        <button
                            type="button"
                            onClick={toggleTheme}
                            className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors cursor-pointer select-none ${isLight
                                ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                                : 'text-slate-300 hover:text-white hover:bg-white/10'
                                }`}
                            title={theme === 'dark' ? (isEs ? 'Modo Claro' : 'Light Mode') : (isEs ? 'Modo Oscuro' : 'Dark Mode')}
                            aria-label="Cambiar tema"
                        >
                            {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
                        </button>

                        {/* Clean CTA Button */}
                        <Link
                            to="/contacto"
                            onClick={(e) => handleNavLinkClick(e, '/contacto')}
                            className={`hidden sm:inline-flex items-center gap-1 px-4 py-1.5 text-xs font-medium rounded-full transition-all duration-200 select-none shadow-sm ${isLight
                                ? 'bg-slate-900 text-white hover:bg-slate-800'
                                : 'bg-white text-slate-950 hover:bg-slate-100'
                                }`}
                        >
                            <span>{isEs ? 'Hablemos' : "Let's Talk"}</span>
                            <ArrowUpRight size={13} className="opacity-70" />
                        </Link>

                        {/* Clean Mobile Menu Toggle */}
                        <button
                            type="button"
                            onClick={() => setMobileOpen((prev) => !prev)}
                            className={`w-9 h-9 rounded-full flex items-center justify-center cursor-pointer lg:hidden transition-colors ${isLight
                                ? 'text-slate-700 hover:bg-slate-100'
                                : 'text-slate-200 hover:bg-white/10'
                                }`}
                            aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
                            aria-expanded={mobileOpen}
                        >
                            {mobileOpen ? <X size={19} /> : <Menu size={19} />}
                        </button>
                    </div>
                </div>
            </motion.div>

            {/* Clean, Natural Mobile Drawer */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        className="fixed inset-0 z-[999] bg-black/60 backdrop-blur-md flex flex-col p-4 pt-20 lg:hidden pointer-events-auto"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        {/* Backdrop Click Closes */}
                        <div
                            className="absolute inset-0 z-0"
                            onClick={() => setMobileOpen(false)}
                            aria-hidden="true"
                        />

                        {/* Minimalist Floating Card */}
                        <motion.div
                            className={`relative z-10 w-full rounded-3xl p-5 shadow-2xl flex flex-col max-h-[calc(100vh-100px)] overflow-y-auto border ${isLight
                                ? 'bg-white border-slate-200'
                                : 'bg-[#020A15] border-white/10 text-white'
                                }`}
                            initial={{ y: -16, opacity: 0, scale: 0.98 }}
                            animate={{ y: 0, opacity: 1, scale: 1 }}
                            exit={{ y: -16, opacity: 0, scale: 0.98 }}
                            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                        >
                            {/* Drawer Header */}
                            <div className="flex items-center justify-between pb-3.5 border-b border-slate-100 dark:border-white/10 mb-3">
                                <div className="flex items-center gap-2.5">
                                    <LogoLLDP variant="icon" size={28} className="rounded-lg shadow-sm" />
                                    <span className="text-sm font-semibold">Lautaro Leal</span>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setMobileOpen(false)}
                                    className="w-8 h-8 rounded-full flex items-center justify-center text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                                    aria-label="Cerrar"
                                >
                                    <X size={18} />
                                </button>
                            </div>

                            {/* Nav Links */}
                            <nav className="flex flex-col gap-1 mb-5">
                                {navLinks.map((item, idx) => {
                                    const isActive = item.path === '/'
                                        ? location.pathname === '/'
                                        : location.pathname.startsWith(item.path);

                                    return (
                                        <motion.div
                                            key={item.path}
                                            initial={{ opacity: 0, x: -8 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.02 * idx, duration: 0.2 }}
                                        >
                                            <NavLink
                                                to={item.path}
                                                end={item.path === '/'}
                                                onClick={(e) => handleNavLinkClick(e, item.path)}
                                                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-colors ${isActive
                                                    ? isLight
                                                        ? 'bg-slate-100 text-slate-950 font-semibold'
                                                        : 'bg-white/10 text-white font-semibold'
                                                    : isLight
                                                        ? 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                                                        : 'text-slate-300 hover:bg-white/5 hover:text-white'
                                                    }`}
                                            >
                                                <span className="text-sm">{item.label}</span>
                                                <ArrowUpRight size={15} className="opacity-40" />
                                            </NavLink>
                                        </motion.div>
                                    );
                                })}
                            </nav>

                            {/* Bottom Controls */}
                            <div className="pt-3.5 border-t border-slate-100 dark:border-white/10 flex flex-col gap-3 mt-auto">
                                <div className="flex items-center justify-between">
                                    <button
                                        type="button"
                                        onClick={toggleLanguage}
                                        className={`px-3 py-1.5 text-xs font-medium rounded-full border transition-colors ${isLight
                                            ? 'border-slate-200 text-slate-700 hover:bg-slate-50'
                                            : 'border-white/10 text-slate-300 hover:bg-white/5'
                                            }`}
                                    >
                                        {language === 'es' ? 'English (EN)' : 'Español (ES)'}
                                    </button>

                                    <button
                                        type="button"
                                        onClick={toggleTheme}
                                        className={`w-8 h-8 rounded-full border flex items-center justify-center transition-colors ${isLight
                                            ? 'border-slate-200 text-slate-700 hover:bg-slate-50'
                                            : 'border-white/10 text-slate-300 hover:bg-white/5'
                                            }`}
                                    >
                                        {isLight ? <Moon size={15} /> : <Sun size={15} />}
                                    </button>
                                </div>

                                <Link
                                    to="/contacto"
                                    onClick={(e) => handleNavLinkClick(e, '/contacto')}
                                    className={`flex items-center justify-center gap-1.5 w-full h-10 rounded-full text-xs font-medium transition-colors shadow-sm ${isLight
                                        ? 'bg-slate-900 text-white hover:bg-slate-800'
                                        : 'bg-white text-slate-950 hover:bg-slate-100'
                                        }`}
                                >
                                    <span>{isEs ? 'Hablemos' : "Let's Talk"}</span>
                                    <ArrowUpRight size={14} />
                                </Link>

                                <div className="flex items-center justify-center gap-5 pt-1 text-slate-500 dark:text-slate-400">
                                    <a
                                        href={buildWhatsAppUrl(isEs ? 'Hola Lautaro! Te contacto desde lautarolealdev.com' : 'Hi Lautaro! Contacting you from lautarolealdev.com')}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="hover:text-emerald-500 transition-colors"
                                        title="WhatsApp"
                                        aria-label="WhatsApp"
                                    >
                                        <FaWhatsapp size={17} />
                                    </a>
                                    <a
                                        href={CONTACT_INFO.linkedin}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="hover:text-blue-500 transition-colors"
                                        title="LinkedIn"
                                        aria-label="LinkedIn"
                                    >
                                        <FaLinkedin size={17} />
                                    </a>
                                    <a
                                        href={CONTACT_INFO.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="hover:text-slate-900 dark:hover:text-white transition-colors"
                                        title="GitHub"
                                        aria-label="GitHub"
                                    >
                                        <FaGithub size={17} />
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
