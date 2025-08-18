// Componente Education.jsx
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

// Componente Education
// Recibe props desde el contenedor padre:
// - isOpen (boolean): indica si la sección está abierta
// - onToggle (función): ejecuta el cambio de estado al clickear
const Education = ({ isOpen, onToggle }) => {
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
                        {educations.map((edu, idx) => (
                            <motion.div
                                key={idx}
                                className="education-card"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8 }}
                                whileHover={{
                                    scale: 1.05,
                                    boxShadow: '0 10px 20px rgba(13,110,253,0.3)',
                                }}
                            >
                                {/* Link de institución */}
                                <a
                                    href={edu.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="education-institution"
                                    title={`Open certification for ${edu.institution}`}
                                >
                                    {edu.institution}
                                </a>

                                {/* Tipo de formación */}
                                <p className="education-typeof">{edu.type}</p>

                                {/* Título / grado */}
                                <p className="education-degree">{edu.degree}</p>

                                {/* Período */}
                                <p className="education-period">{edu.period}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default Education
