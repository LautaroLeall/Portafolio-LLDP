// src/components/Networks.jsx
import React from 'react'
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion'
// Icons
import { Github, Linkedin, Mail } from 'lucide-react'
import { useModal } from '../hooks/useModal'
import '../styles/networks.css'

const socialLinks = [
    {
        icon: <Github size={25} />,
        href: 'https://github.com/LautaroLeall',
        label: 'GitHub',
    },
    {
        icon: <Linkedin size={25} />,
        href: 'https://www.linkedin.com/in/lauldp/',
        label: 'LinkedIn',
    },
    {
        icon: <Mail size={25} />,
        href: 'mailto:lautaroleal4@gmail.com?subject=Consulta%20profesional%20-%20Portafolio%20de%20Lautaro%20Leal&body=Hola%20Lautaro,%20me%20gustaría%20ponerme%20en%20contacto%20contigo%20para...',
        label: 'Email',
    }
]

const Networks = () => {
    const { isModalOpen } = useModal()

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
