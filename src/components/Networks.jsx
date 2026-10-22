// src/components/Networks.jsx
import React from 'react'
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion'
// Icons
import { Github, Linkedin, Briefcase } from 'lucide-react'
import { FaWhatsapp } from 'react-icons/fa'
import { useModal } from '../hooks/useModal'
import { useLanguage } from '../hooks/useLanguage'
import '../styles/networks.css'

const Networks = () => {
    const { isModalOpen } = useModal()
    const { language } = useLanguage()

    const socialLinks = [
        {
            icon: <Github size={24} />,
            href: 'https://github.com/LautaroLeall',
            label: 'GitHub',
        },
        {
            icon: <Linkedin size={24} />,
            href: 'https://www.linkedin.com/in/lauldp/',
            label: 'LinkedIn',
        },
        {
            icon: <FaWhatsapp size={24} />,
            href: 'https://wa.me/5493813399463?text=Hola%20Lautaro,%20vi%20tu%20portafolio%20y%20me%20gustar%C3%ADa%20hacerte%20una%20consulta.',
            label: 'WhatsApp',
        },
        {
            icon: <Briefcase size={22} />,
            href: 'https://servicios-lldp.vercel.app/',
            label: language === 'es' ? 'Servicios Web' : 'Web Services',
        }
    ]

    return (
        <motion.div
            className="social-bar"
            initial={{ x: 0, y: '-50%', opacity: 1, scale: 1 }}
            animate={
                isModalOpen
                    ? { x: -85, y: '-50%', opacity: 0, scale: 0.92 }
                    : { x: 0, y: '-50%', opacity: 1, scale: 1 }
            }
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        >
            <ul>
                {socialLinks.map((item, i) => (
                    <li key={i}>
                        <a
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="icon-link"
                            title={item.label}
                        >
                            {item.icon}
                        </a>
                    </li>
                ))}
            </ul>
        </motion.div>
    )
}

export default Networks
