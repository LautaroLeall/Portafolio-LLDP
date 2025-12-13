// src/components/Education.jsx
import React from 'react'
// Framer Motion para animaciones
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowDownFromLine } from 'lucide-react'
import '../styles/education.css'

// Datos de la educación
const educations = [
    {
        institution: 'UNSTA',
        link: 'https://www.unsta.edu.ar/ingenieria/desarrollo-y-calidad-de-software/',
        type: 'Technique',
        degree: 'Software Development and Quality',
        period: '2024 - 2026',
        imgSrc: '/education/Campus-Unsta.png'
    },
    {
        institution: 'Institute Nexus',
        link: 'https://www.instagram.com/instituto_nexus/?hl=es-la',
        type: 'English Language Training',
        degree: 'English',
        period: '2025 - 2028',
        imgSrc: '/education/Institute-Nexus.png'
    },
]

// Componente Education
// Recibe props desde el contenedor padre:
// - isOpen (boolean): indica si la sección está abierta
// - onToggle (función): ejecuta el cambio de estado al clickear
const Education = ({ isOpen, onToggle }) => {
    const [hoveredIdx, setHoveredIdx] = React.useState(null)

    return (
        <div className="education-section mt-5 mx-3">
            {/* Encabezado clickeable */}
            <button
                className="education-header"
                onClick={onToggle}
                aria-expanded={isOpen}
            >
                <h3 className="education-title">Education</h3>

                {/* Icono que rota dinámicamente según el estado */}
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <ArrowDownFromLine
                        size={28}
                        strokeWidth={2}
                        className="education-icon"
                    />
                </motion.div>
            </button>

            {/* Contenido que se expande/colapsa */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="education-cards d-flex justify-content-center gap-5 flex-wrap"
                        initial={{ opacity: 0, y: -40 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -50 }}
                        transition={{ duration: 0.6, ease: "easeInOut" }}
                    >
                        {educations.map(
                            ({ institution, link, type, degree, period, imgSrc }, idx) => (
                                <motion.a
                                    key={idx}
                                    href={link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="education-card"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8 }}
                                    whileHover={{
                                        scale: 1.05,
                                        boxShadow: '0 10px 20px rgba(13,110,253,0.3)',
                                    }}
                                    onMouseEnter={() => setHoveredIdx(idx)}
                                    onMouseLeave={() => setHoveredIdx(null)}
                                    aria-label={`Ver educación en ${institution}`}
                                >
                                    <div className="card-inner">
                                        {/* FRONT */}
                                        <motion.div
                                            className="card-front"
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{
                                                opacity: hoveredIdx === idx ? 0 : 1,
                                                y: hoveredIdx === idx ? -8 : 0,
                                            }}
                                            transition={{ duration: 0.25 }}
                                        >
                                            <h4 className="education-institution">{institution}</h4>
                                            <p className="education-typeof">{type}</p>
                                            <p className="education-degree">{degree}</p>
                                            <p className="education-period">{period}</p>
                                        </motion.div>

                                        {/* BACK */}
                                        <AnimatePresence>
                                            {hoveredIdx === idx && (
                                                <motion.div
                                                    className="card-back"
                                                    key="back"
                                                    initial={{ opacity: 0, scale: 0.98 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    exit={{ opacity: 0, scale: 0.98 }}
                                                    transition={{ duration: 0.25 }}
                                                >
                                                    <img
                                                        src={imgSrc}
                                                        alt={`Education: ${institution}`}
                                                        className="education-image-full"
                                                        loading="lazy"
                                                        draggable={false}
                                                    />
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </motion.a>
                            )
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default Education
