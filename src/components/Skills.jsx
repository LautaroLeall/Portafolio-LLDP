import React from 'react'
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion'
import { Terminal, ShieldCheck, Wrench, Layers } from 'lucide-react'
import { useLanguage } from '../hooks/useLanguage'

// Official Technology Logos (SVGs)
import {
    FaHtml5, FaCss3Alt, FaJs, FaReact, FaBootstrap, FaGitAlt, FaGithub, FaFigma,
    FaUsers, FaComments, FaLightbulb, FaBug, FaRobot, FaCode, FaVial
} from 'react-icons/fa'
import {
    SiVite, SiTailwindcss, SiNodedotjs, SiExpress, SiMongodb, SiPostman,
    SiCypress, SiMocha, SiChai, SiSlack, SiJira, SiTrello,
    SiSocketdotio, SiJsonwebtokens
} from 'react-icons/si'
import { FaLinesLeaning } from 'react-icons/fa6'
import { RiGeminiFill } from 'react-icons/ri'
import '../styles/skills.css'

const Skills = () => {
    const { t, language } = useLanguage()

    const technicalDomains = [
        {
            index: '01',
            icon: <Layers size={17} className="text-primary me-2 shrink-0" />,
            domain: language === 'es' ? 'Frontend & Interfaces' : 'Frontend Engineering',
            summary: language === 'es'
                ? 'Construcción de interfaces interactivas, accesibles y de alto rendimiento con renderizado veloz y diseño adaptativo a todo dispositivo.'
                : 'Building interactive, accessible, and high-performance interfaces with fluid rendering and responsive, mobile-first design.',
            skills: [
                { name: 'React.js', icon: <FaReact color="#61DAFB" /> },
                { name: 'JavaScript (ES6+)', icon: <FaJs color="#F7DF1E" /> },
                { name: 'Tailwind CSS', icon: <SiTailwindcss color="#06B6D4" /> },
                { name: 'HTML5', icon: <FaHtml5 color="#E34F26" /> },
                { name: 'CSS3', icon: <FaCss3Alt color="#1572B6" /> },
                { name: 'Vite', icon: <SiVite color="#646CFF" /> },
                { name: 'Bootstrap', icon: <FaBootstrap color="#7952B3" /> }
            ]
        },
        {
            index: '02',
            icon: <Terminal size={17} className="text-primary me-2 shrink-0" />,
            domain: language === 'es' ? 'Backend & Arquitectura de Datos' : 'Backend & Data Architecture',
            summary: language === 'es'
                ? 'Servicios y APIs RESTful escalables, bases de datos NoSQL con MongoDB, control de acceso JWT y WebSockets bidireccionales en tiempo real.'
                : 'Scalable RESTful services and APIs, NoSQL data modeling with MongoDB, JWT security pipelines, and real-time WebSockets.',
            skills: [
                { name: 'Node.js', icon: <SiNodedotjs color="#339933" /> },
                { name: 'Express.js', icon: <SiExpress color="#fff" className="dark-icon" /> },
                { name: 'MongoDB', icon: <SiMongodb color="#47A248" /> },
                { name: 'Socket.IO', icon: <SiSocketdotio color="#fff" className="dark-icon" /> },
                { name: 'JWT', icon: <SiJsonwebtokens color="#D63AFF" /> },
                { name: 'REST APIs', icon: <FaCode color="#0dcaf0" /> }
            ]
        },
        {
            index: '03',
            icon: <ShieldCheck size={17} className="text-primary me-2 shrink-0" />,
            domain: language === 'es' ? 'Calidad de Software & Testing (QA)' : 'Software Quality & Testing (QA)',
            summary: language === 'es'
                ? 'Sólida formación universitaria en UNSTA enfocada en clean code, patrones de diseño, testing automatizado E2E y validación rigurosa de software.'
                : 'Academic foundation from UNSTA focused on clean architecture, design patterns, automated E2E testing, and rigorous software validation.',
            skills: [
                { name: 'Cypress', icon: <SiCypress color="#fff" className="dark-icon" /> },
                { name: 'Mocha', icon: <SiMocha color="#8D6748" /> },
                { name: 'Chai', icon: <SiChai color="#A30701" /> },
                { name: 'Katalon', icon: <FaBug color="#32A952" /> },
                { name: 'Testing E2E', icon: <FaVial color="#ffc107" /> }
            ]
        },
        {
            index: '04',
            icon: <Wrench size={17} className="text-primary me-2 shrink-0" />,
            domain: language === 'es' ? 'Herramientas de Desarrollo & Workflow' : 'Development Ecosystem & Workflow',
            summary: language === 'es'
                ? 'Control de versiones con Git/GitHub, testeo de endpoints con Postman, prototipado de diseño en Figma y gestión ágil mediante Jira y Slack.'
                : 'Version control with Git/GitHub, API contract testing with Postman, UI prototyping in Figma, and agile delivery via Jira and Slack.',
            skills: [
                { name: 'Git', icon: <FaGitAlt color="#F05032" /> },
                { name: 'GitHub', icon: <FaGithub color="#fff" className="dark-icon" /> },
                { name: 'Postman', icon: <SiPostman color="#FF6C37" /> },
                { name: 'Figma', icon: <FaFigma color="#F24E1E" /> },
                { name: 'Jira', icon: <SiJira color="#0052CC" /> },
                { name: 'Trello', icon: <SiTrello color="#0052CC" /> },
                { name: 'Slack', icon: <SiSlack color="#4A154B" /> }
            ]
        }
    ]

    const professionalCompetencies = [
        {
            number: '01',
            title: language === 'es' ? 'IA Generativa & Copilots' : 'Generative AI & Copilots',
            desc: language === 'es'
                ? 'Integración activa de modelos LLM y herramientas de IA para optimizar tiempos de codificación, refactorización y resolución de bugs.'
                : 'Active adoption of LLMs and AI coding assistants to accelerate development velocity, refactoring, and automated debugging.',
            icon: <RiGeminiFill />
        },
        {
            number: '02',
            title: language === 'es' ? 'Comunicación Técnica' : 'Technical Communication',
            desc: language === 'es'
                ? 'Capacidad para documentar código, articular decisiones de diseño técnico y comunicar avances de manera clara a equipos multidisciplinarios.'
                : 'Clear code documentation, articulation of technical design decisions, and transparent updates across multidisciplinary teams.',
            icon: <FaComments />
        },
        {
            number: '03',
            title: language === 'es' ? 'Trabajo en Equipo & Scrum' : 'Teamwork & Agile Delivery',
            desc: language === 'es'
                ? 'Experiencia colaborativa bajo ceremonias ágiles (Scrum/Kanban), code reviews constructivos y dinámicas de pair programming.'
                : 'Collaborative delivery within agile sprints (Scrum/Kanban), constructive peer code reviews, and pair programming practices.',
            icon: <FaUsers />
        },
        {
            number: '04',
            title: language === 'es' ? 'Resolución Analítica' : 'Analytical Problem Solving',
            desc: language === 'es'
                ? 'Enfoque metódico para descomponer problemas complejos, aislar incidentes y diseñar soluciones robustas y mantenibles.'
                : 'Methodical approach to deconstruct complex challenges, isolate root causes, and engineer resilient, maintainable solutions.',
            icon: <FaLightbulb />
        },
        {
            number: '05',
            title: language === 'es' ? 'Adaptabilidad Continua' : 'Continuous Adaptability',
            desc: language === 'es'
                ? 'Curva de aprendizaje acelerada ante nuevas tecnologías, librerías y paradigmas modernos del ecosistema web.'
                : 'Rapid learning curve and intellectual curiosity when adopting modern frameworks, libraries, and web standards.',
            icon: <FaLinesLeaning />
        },
        {
            number: '06',
            title: language === 'es' ? 'Innovación & Calidad' : 'Applied Innovation & Quality',
            desc: language === 'es'
                ? 'Foco constante en entregar software confiable, con código testeable, buenas prácticas de desarrollo y alto impacto funcional.'
                : 'Persistent commitment to reliable delivery, testable software architecture, best engineering practices, and user value.',
            icon: <FaRobot />
        }
    ]

    return (
        <section className="skills-editorial-section container py-5">
            {/* Encabezado Editorial Abierto (Sin cajas pesadas) */}
            <div className="skills-editorial-header mb-5">
                <motion.div
                    className="editorial-eyebrow mb-2"
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                >
                    <span className="eyebrow-line" />
                    <span>{t('skills.title')}</span>
                </motion.div>

                <motion.h2
                    className="editorial-lead-title"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >
                    {language === 'es'
                        ? 'Stack tecnológico, arquitectura de software y metodologías de ingeniería.'
                        : 'Core technical stack, software architecture, and engineering practices.'}
                </motion.h2>

                <motion.p
                    className="skills-lead-desc"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.15 }}
                >
                    {t('skills.subtitle')}
                </motion.p>
            </div>

            {/* Stream de Dominios Técnicos (Unboxed Editorial Lanes) */}
            <div className="skills-domains-stream">
                {technicalDomains.map((domain, index) => (
                    <motion.div
                        key={index}
                        className="domain-lane-row"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.45, delay: index * 0.1 }}
                    >
                        {/* Columna Izquierda: Información del Dominio */}
                        <div className="domain-info-col">
                            <div className="domain-index-row mb-2">
                                <span className="domain-index-badge">{domain.index}</span>
                                <div className="d-flex align-items-center">
                                    {domain.icon}
                                    <h3 className="domain-title m-0">{domain.domain}</h3>
                                </div>
                            </div>
                            <p className="domain-summary mb-0">{domain.summary}</p>
                        </div>

                        {/* Columna Derecha: Cluster de Chips Tecnológicos */}
                        <div className="domain-chips-col">
                            <div className="domain-tech-cluster">
                                {domain.skills.map((skill, idx) => (
                                    <div key={idx} className="domain-tech-chip">
                                        <span className="tech-chip-icon">{skill.icon}</span>
                                        <span className="tech-chip-name">{skill.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Separador Editorial Fino */}
            <div className="skills-section-divider" />

            {/* Competencias Profesionales & Habilidades Blandas (Unboxed Editorial Grid) */}
            <div className="competencies-editorial-wrapper">
                <div className="competencies-editorial-header mb-4">
                    <div className="editorial-eyebrow mb-2">
                        <span className="eyebrow-line" />
                        <span>{t('skills.softTitle')}</span>
                    </div>
                    <h3 className="competencies-lead-title">
                        {language === 'es'
                            ? 'Dinámica Profesional, Metodologías & Trabajo en Equipo'
                            : 'Professional Mindset, Methodologies & Collaborative Delivery'}
                    </h3>
                </div>

                <div className="competencies-editorial-grid">
                    {professionalCompetencies.map((comp, idx) => (
                        <motion.div
                            key={idx}
                            className="competency-editorial-item"
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: idx * 0.08 }}
                        >
                            <div className="competency-top-line">
                                <span className="competency-number">{comp.number}</span>
                                <span className="competency-icon-node">{comp.icon}</span>
                            </div>
                            <h4 className="competency-name">{comp.title}</h4>
                            <p className="competency-desc">{comp.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Skills
