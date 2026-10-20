import React from 'react'
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { useLanguage } from '../hooks/useLanguage'
import '../styles/education.css'

const Education = () => {
    const { language } = useLanguage()

    const educationData = [
        {
            period: '2024 — 2026',
            institution: 'UNSTA — Universidad del Norte Santo Tomás de Aquino',
            degree: language === 'es'
                ? 'Tecnicatura Universitaria en Desarrollo y Calidad de Software'
                : 'Associate Degree in Software Development and Quality Assurance',
            status: language === 'es' ? 'Graduado' : 'Graduate',
            desc: language === 'es'
                ? 'Formación universitaria técnica con sólida base en ingeniería de software: desarrollo Front End, Back End y aplicaciones web, diseño de algoritmos y bases de datos relacionales y NoSQL. Especialización en aseguramiento de la calidad (QA), diseño y ejecución de testing manual y automatizado, mitigación de riesgos de software y certificación institucional de inglés nivel B1.'
                : 'University technical degree with a solid foundation in software engineering: Front End, Back End, and web application development, algorithms, and relational/NoSQL databases. Specialization in Quality Assurance (QA), manual and automated test design and execution, risk mitigation strategies, and institutional B1 English certification.',
            link: 'https://www.unsta.edu.ar/ingenieria/desarrollo-y-calidad-de-software/',
            linkText: language === 'es' ? 'Ver plan de estudios oficial UNSTA' : 'View official UNSTA curriculum'
        },
        {
            period: '2025 — Presente',
            institution: 'Instituto Nexus — San Miguel de Tucumán',
            degree: language === 'es'
                ? 'Formación en Idioma Inglés (Comunicativo y Exámenes Internacionales)'
                : 'English Language Training (Communicative & International Exams)',
            status: language === 'es' ? 'En Curso' : 'In Progress',
            desc: language === 'es'
                ? 'Capacitación continua en idioma inglés con enfoque sumamente práctico y comunicativo en grupos reducidos. Desarrollo de fluidez conversacional, comprensión auditiva y lectura técnica orientada a entornos profesionales y de tecnología, con preparación para certificaciones y exámenes internacionales.'
                : 'Continuous English language training with a practical and communicative approach in small cohorts. Focus on conversational fluency, listening comprehension, and technical reading tailored for professional technology environments, alongside preparation for international examinations.',
            link: 'https://www.instagram.com/instituto_nexus/?hl=es-la',
            linkText: language === 'es' ? 'Ver perfil oficial Instituto Nexus' : 'View official Instituto Nexus profile'
        }
    ]

    return (
        <div className="education-timeline-wrapper">
            <h3 className="timeline-heading mb-4">
                {language === 'es' ? 'Educación Universitaria' : 'Academic Education'}
            </h3>

            <div className="timeline-track">
                {educationData.map((item, idx) => (
                    <motion.div
                        className="timeline-item"
                        key={idx}
                        initial={{ opacity: 0, x: -15 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.45, delay: idx * 0.15 }}
                    >
                        {/* Timeline Node Point */}
                        <div className="timeline-node">
                            <span className="node-dot" />
                        </div>

                        {/* Content */}
                        <div className="timeline-content">
                            <div className="d-flex align-items-center gap-3 flex-wrap mb-1">
                                <span className="timeline-period">{item.period}</span>
                                <span className="timeline-status-tag">{item.status}</span>
                            </div>

                            <h4 className="timeline-degree mb-1">{item.degree}</h4>
                            <p className="timeline-institution mb-2">{item.institution}</p>
                            <p className="timeline-desc mb-3">{item.desc}</p>

                            <a
                                href={item.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="timeline-link"
                            >
                                <span>{item.linkText}</span>
                                <ArrowUpRight size={14} className="timeline-arrow" />
                            </a>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}

export default Education