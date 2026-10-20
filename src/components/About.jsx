import React from 'react'
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion'
import {
    MapPin,
    GraduationCap,
} from 'lucide-react'
import { useLanguage } from '../hooks/useLanguage'
import '../styles/about.css'

const About = () => {
    const { t, language } = useLanguage()

    const principles = [
        {
            number: '01',
            title: language === 'es' ? 'Desarrollo Full Stack' : 'Full Stack Engineering',
            desc: language === 'es'
                ? 'Construcción de aplicaciones web de extremo a extremo con React, Node.js, Express, MongoDB y Tailwind, priorizando rendimiento y escalabilidad.'
                : 'End-to-end web applications built with React, Node.js, Express, MongoDB, and Tailwind, focused on performance and scalability.'
        },
        {
            number: '02',
            title: language === 'es' ? 'Calidad & Buenas Prácticas' : 'Quality & Clean Architecture',
            desc: language === 'es'
                ? 'Formación universitaria en UNSTA con foco en patrones de diseño, código limpio, testing riguroso y arquitectura mantenible a largo plazo.'
                : 'Academic foundation from UNSTA emphasizing design patterns, clean code, rigorous testing, and maintainable architecture.'
        },
        {
            number: '03',
            title: language === 'es' ? 'Experiencia de Usuario' : 'User Experience & UI',
            desc: language === 'es'
                ? 'Interfaces pensadas para personas: navegación intuitiva, 100% responsivas, con micro-interacciones suaves que enriquecen el uso diario.'
                : 'Interfaces designed for people: intuitive navigation, responsive, with subtle micro-interactions that elevate everyday use.'
        },
        {
            number: '04',
            title: language === 'es' ? 'Innovación Aplicada' : 'Applied Innovation & APIs',
            desc: language === 'es'
                ? 'Integración de IA Generativa, WebSockets en tiempo real y servicios en la nube para resolver problemas concretos de manera eficiente.'
                : 'Practical adoption of Generative AI, real-time WebSockets, and modern cloud platforms to solve real problems efficiently.'
        }
    ]

    return (
        <section className="about-editorial-section container py-5">
            {/* Encabezado Editorial Abierto (Sin cajas) */}
            <div className="about-editorial-header mb-5">
                <motion.div
                    className="editorial-eyebrow mb-2"
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                >
                    <span className="eyebrow-line" />
                    <span>{t('about.title')}</span>
                </motion.div>

                <motion.h2
                    className="editorial-lead-title"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >
                    {language === 'es'
                        ? 'Desarrollo soluciones digitales combinando ingeniería de software, código limpio y experiencias interactivas.'
                        : 'Building digital solutions at the intersection of software engineering, clean code, and interactive experiences.'}
                </motion.h2>
            </div>

            {/* Contenido Editorial en 2 Columnas Naturales (Sin cards pesadas) */}
            <div className="about-editorial-grid">
                {/* Columna Izquierda: Historia & Trayectoria */}
                <motion.div
                    className="about-bio-column"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.15 }}
                >
                    <div className="bio-greeting mb-3">
                        <span className="greeting-pill">Lautaro Leal Del Prete</span>
                    </div>

                    <p className="bio-paragraph bio-paragraph-primary">
                        {t('about.text2')}
                    </p>

                    <p className="bio-paragraph">
                        {t('about.text3')}
                    </p>

                    <p className="bio-paragraph">
                        {t('about.text4')}
                    </p>

                    {/* Metadata Natural en Línea */}
                    <div className="bio-meta-row mt-4 pt-3">
                        <div className="meta-item">
                            <span className="meta-beacon" />
                            <span>{language === 'es' ? 'Disponible para nuevos proyectos' : 'Available for new projects'}</span>
                        </div>
                        <div className="meta-item">
                            <MapPin size={14} className="text-primary shrink-0" />
                            <span>Tucumán, Argentina</span>
                        </div>
                        <div className="meta-item">
                            <GraduationCap size={14} className="text-primary shrink-0" />
                            <span>UNSTA Graduate</span>
                        </div>
                    </div>
                </motion.div>

                {/* Columna Derecha: Principios & Enfoque Técnico (Lista elegante con divisores sutiles) */}
                <motion.div
                    className="about-focus-column"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.25 }}
                >
                    <h4 className="focus-column-title mb-4">
                        {language === 'es' ? 'Pilares de Trabajo' : 'Core Principles'}
                    </h4>

                    <div className="focus-list">
                        {principles.map((item, idx) => (
                            <div className="focus-row" key={idx}>
                                <div className="focus-num">{item.number}</div>
                                <div className="focus-content">
                                    <h5 className="focus-title mb-1">{item.title}</h5>
                                    <p className="focus-desc mb-0">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    )
}

export default About
