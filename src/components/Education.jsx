import React from 'react'
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowDownFromLine } from 'lucide-react'
import { useLanguage } from '../hooks/useLanguage'
import '../styles/education.css'

// Componente Education
const Education = ({ isOpen, onToggle }) => {
    const { t } = useLanguage()
    const educationsList = t('qualifications.educationList') || []

    const links = [
        'https://www.unsta.edu.ar/ingenieria/desarrollo-y-calidad-de-software/',
        'https://www.instagram.com/instituto_nexus/?hl=es-la'
    ]

    return (
        <div className="education-section mt-5 mx-3">
            {/* Encabezado clickeable */}
            <button
                className="education-header"
                onClick={onToggle}
                aria-expanded={isOpen}
            >
                <h3 className="education-title">{t('qualifications.educationTitle')}</h3>

                {/* Icono que rota dinámicamente */}
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

            {/* Contenido expandible */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="education-cards d-flex justify-content-center gap-5 flex-wrap"
                        initial={{ opacity: 0, y: -40 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -50 }}
                        transition={{ duration: 0.6, ease: "easeInOut" }}
                    >
                        {educationsList.map(
                            ({ institution, type, degree, period }, idx) => (
                                <motion.a
                                    key={idx}
                                    href={links[idx] || '#'}
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
                                    aria-label={`Ver educación en ${institution}`}
                                >
                                    <div className="card-inner">
                                        <motion.div
                                            className="card-front"
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.25 }}
                                        >
                                            <h4 className="education-institution">{institution}</h4>
                                            <p className="education-typeof">{type}</p>
                                            <p className="education-degree">{degree}</p>
                                            <p className="education-period">{period}</p>
                                        </motion.div>
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