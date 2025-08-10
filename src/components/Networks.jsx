// src/components/Networks.jsx
import React from 'react'
// Icons
import { Github, Linkedin, Mail } from 'lucide-react'
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
        href: 'mailto:lautaroleal4@gmail',
        label: 'Email',
    },
]

const Networks = () => {
    return (
        <div className="social-bar">
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
        </div>
    )
}

export default Networks
