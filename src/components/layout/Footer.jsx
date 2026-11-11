import React from 'react';
import { FaWhatsapp, FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa';
import { ArrowUp } from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';
import { useTheme } from '../../hooks/useTheme';
import LogoLLDP from '../ui/LogoLLDP';
import { CONTACT_INFO, buildWhatsAppUrl } from '../../data/servicesData';

export default function Footer() {
    const { language } = useLanguage();
    const { theme } = useTheme();
    const isEs = language === 'es';
    const isLight = theme === 'light';
    const currentYear = new Date().getFullYear();

    const scrollToTop = () => {
        if (window.__lenis) {
            window.__lenis.scrollTo(0, {
                duration: 1.0,
                easing: (val) => Math.min(1, 1.001 - Math.pow(2, -10 * val))
            });
        } else {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    };

    const socials = [
        {
            name: 'WhatsApp',
            url: buildWhatsAppUrl(
                isEs
                    ? 'Hola Lautaro! Te contacto desde lautarolealdev.com'
                    : 'Hi Lautaro! Contacting you from lautarolealdev.com'
            ),
            icon: FaWhatsapp,
            hoverClass: 'hover:text-emerald-500'
        },
        {
            name: 'LinkedIn',
            url: CONTACT_INFO.linkedin,
            icon: FaLinkedin,
            hoverClass: 'hover:text-blue-500'
        },
        {
            name: 'GitHub',
            url: CONTACT_INFO.github,
            icon: FaGithub,
            hoverClass: 'hover:text-slate-900 dark:hover:text-white'
        },
        {
            name: 'Email',
            url: `mailto:${CONTACT_INFO.email}`,
            icon: FaEnvelope,
            hoverClass: 'hover:text-cyan-500'
        }
    ];

    return (
        <footer className={`relative z-10 transition-colors border-t ${isLight
            ? 'bg-white/50 border-slate-200/80 text-slate-600'
            : 'bg-[#020A15]/60 border-white/[0.08] text-slate-400'
            }`}>
            <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-10 flex flex-col items-center justify-center text-center gap-3.5 select-none">
                {/* Brand Identity: LOGO + LAUTARO.DEV (Centered) */}
                <button
                    type="button"
                    onClick={scrollToTop}
                    className="flex flex-col items-center justify-center gap-2 group cursor-pointer"
                    title={isEs ? 'Volver al inicio' : 'Back to top'}
                    data-cursor="pointer"
                >
                    <LogoLLDP
                        variant="icon"
                        size={36}
                        className="rounded-md shadow-sm group-hover:opacity-85 transition-opacity"
                    />
                    <span className={`text-base font-bold tracking-tight transition-colors ${isLight
                        ? 'text-slate-900 group-hover:text-blue-600'
                        : 'text-white group-hover:text-slate-200'
                        }`}>
                        Lautaro.Dev
                    </span>
                </button>

                {/* Copyright Text */}
                <span className="text-xs text-slate-500 dark:text-slate-400">
                    © {currentYear} • {isEs ? 'Todos los derechos reservados' : 'All rights reserved'}
                </span>

                {/* Social Networks & Scroll to top (Centered below) */}
                <div className="flex items-center justify-center gap-2.5 pt-1.5" aria-label="Redes sociales">
                    {socials.map((social) => {
                        const Icon = social.icon;
                        const isMailto = social.url.startsWith('mailto:');
                        return (
                            <a
                                key={social.name}
                                href={social.url}
                                target={isMailto ? undefined : '_blank'}
                                rel={isMailto ? undefined : 'noopener noreferrer'}
                                className={`w-9 h-9 rounded-full flex items-center justify-center text-slate-500 dark:text-slate-400 transition-colors ${social.hoverClass} ${isLight
                                    ? 'hover:bg-slate-100'
                                    : 'hover:bg-white/10'
                                    }`}
                                title={social.name}
                                aria-label={social.name}
                                data-cursor="pointer"
                            >
                                <Icon size={17} />
                            </a>
                        );
                    })}

                    <span className="text-slate-300 dark:text-slate-700 text-xs mx-0.5">|</span>

                    {/* Back to top smooth button */}
                    <button
                        type="button"
                        onClick={scrollToTop}
                        className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors cursor-pointer text-slate-500 dark:text-slate-400 ${isLight
                            ? 'hover:text-slate-900 hover:bg-slate-100'
                            : 'hover:text-white hover:bg-white/10'
                            }`}
                        title={isEs ? 'Volver arriba' : 'Back to top'}
                        aria-label={isEs ? 'Volver arriba' : 'Back to top'}
                        data-cursor="pointer"
                    >
                        <ArrowUp size={16} />
                    </button>
                </div>
            </div>
        </footer>
    );
}
