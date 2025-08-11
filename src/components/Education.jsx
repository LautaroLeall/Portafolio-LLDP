// src/components/Education.jsx
import React from 'react'
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion'
import '../styles/education.css'

const educations = [
    {
        institution: 'UNSTA',
        link: 'https://www.unsta.edu.ar/ingenieria/desarrollo-y-calidad-de-software/',
        type: 'Technique',
        degree: 'Desarrollo y Calidad de Software',
        period: '2024 - Present',
    },
    {
        institution: 'Institute Nexus',
        link: 'https://www.instagram.com/instituto_nexus/?hl=es-la',
        type: 'English Language Training',
        degree: 'English',
        period: '2025 - Present',
    },
]

const Education = () => {
    return (
        < motion.div
            className="education-section mt-5 mx-3"
            initial="hidden"
            animate="visible"
            variants={{
                hidden: {},
                visible: {
                    transition: {
                        staggerChildren: 0.2,
                    },
                },
            }
            }
        >
            <h3 className="education-title">Education</h3>
            <div className="education-cards d-flex justify-content-center gap-5 flex-wrap">
                {educations.map(({ institution, link, type, degree, period }, index) => (
                    <motion.div
                        key={index}
                        className="education-card"
                        variants={{
                            hidden: { opacity: 0, y: 30 },
                            visible: { opacity: 1, y: 0 },
                        }}
                        transition={{ duration: 0.5, ease: 'easeOut' }}
                        whileHover={{ scale: 1.05, boxShadow: '0 10px 20px rgba(13,110,253,0.3)' }}
                    >
                        <a
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="education-institution"
                            title={`Open certification for ${institution}`}
                        >
                            {institution}
                        </a>
                        <p className="education-typeof">{type}</p>
                        <p className="education-degree">{degree}</p>
                        <p className="education-period">{period}</p>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    )
}

export default Education
