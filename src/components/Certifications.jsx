// src/components/Certifications.jsx
import React from 'react'
// Framer Motion para animaciones
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowDownFromLine } from 'lucide-react'
import '../styles/certifications.css'

// Datos de certificaciones centralizados
const certificationsData = [
    {
        title: 'Professional Foundations of Software Development',
        institution: 'Microsoft & LinkedIn Learning',
        link: 'https://www.linkedin.com/learning/certificates/e07e0fec757116348e2e1a95a977efee635420ddc2569afdc068d5aa7287a26a',
        date: '2025-08-12',
        imgSrc: '/certifications/fundDesarrolloDeSoft.png'
    },
    {
        title: 'Legacy Front End',
        institution: 'FreeCodeCamp',
        link: 'https://www.freecodecamp.org/certification/lautaroleall/legacy-front-end',
        date: '2025-08-05',
        imgSrc: '/certifications/legacyFrontEnd.png'
    },
    {
        title: 'JavaScript Algorithms And Data Structures',
        institution: 'FreeCodeCamp',
        link: 'https://www.freecodecamp.org/certification/lautaroleall/javascript-algorithms-and-data-structures-v8',
        date: '2025-08-04',
        imgSrc: '/certifications/javaS-Algorith-DataStructures.png'
    },
    {
        title: 'Front End Development Libraries',
        institution: 'FreeCodeCamp',
        link: 'https://www.freecodecamp.org/certification/lautaroleall/front-end-development-libraries',
        date: '2025-07-24',
        imgSrc: '/certifications/frontEndLibraries.png'
    },
    {
        title: 'Responsive Web Design',
        institution: 'FreeCodeCamp',
        link: 'https://www.freecodecamp.org/certification/lautaroleall/responsive-web-design',
        date: '2025-07-23',
        imgSrc: '/certifications/responsiveWeb.png'
    },
    {
        title: 'Web Development | Digitalers Academy',
        institution: 'Educacion IT',
        link: 'https://www.educacionit.com/perfil/lautaro-leal-del-prete-1069835/certificado/81949',
        date: '2024-05-27',
        imgSrc: '/certifications/devWeb.png'
    },
    {
        title: 'Introduction to Programming',
        institution: 'Educacion IT',
        link: 'https://www.educacionit.com/perfil/lautaro-leal-del-prete-1069835/certificado/54677',
        date: '2025-05-08',
        imgSrc: '/certifications/introdProg.png'
    },
    {
        title: 'Programming Logic',
        institution: 'Rolling Code School',
        link: 'https://certs.rollingcodeschool.com/bGF1dGFyb2xlYWw0QGdtYWlsLmNvbQ==-1743082204316-1.png',
        date: '2025-03-30',
        imgSrc: '/certifications/logProg.png'
    },
]

// Componente Certifications
// Recibe props desde Qualifications.jsx
// - isOpen (boolean): si la sección está abierta
// - onToggle (función): dispara toggle de apertura/cierre
const Certifications = ({ isOpen, onToggle }) => {
    const [hoveredIndex, setHoveredIndex] = React.useState(null)

    return (
        <div className="certifications-section mt-5 mx-3">
            {/* Encabezado clickeable */}
            <button
                className="certifications-header"
                onClick={onToggle}
                aria-expanded={isOpen}
            >
                <h3 className="certifications-title">My Certifications</h3>

                {/* Icono que rota dinámicamente según el estado */}
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <ArrowDownFromLine
                        size={28}
                        strokeWidth={2}
                        className="certifications-icon"
                    />
                </motion.div>
            </button>

            {/* Contenido que se expande/colapsa */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="certifications-cards d-grid align-items-center justify-content-center"
                        initial={{ opacity: 0, y: -40 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -50 }}
                        transition={{ duration: 0.6, ease: "easeInOut" }}
                    >
                        {certificationsData.map(
                            ({ title, institution, link, date, imgSrc }, index) => (
                                <motion.a
                                    key={index}
                                    href={link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="certification-card"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8 }}
                                    whileHover={{ scale: 1.05, boxShadow: '0 10px 20px rgba(13,110,253,0.3)' }}
                                    onMouseEnter={() => setHoveredIndex(index)}
                                    onMouseLeave={() => setHoveredIndex(null)}
                                    aria-label={`Ver certificación ${title} de ${institution}`}
                                >
                                    <div className="card-inner">
                                        {/* FRONT */}
                                        <motion.div
                                            className="card-front"
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{
                                                opacity: hoveredIndex === index ? 0 : 1,
                                                y: hoveredIndex === index ? -8 : 0
                                            }}
                                            transition={{ duration: 0.25 }}
                                        >
                                            <h4 className="certification-link">{title}</h4>
                                            <p className="certification-institution">{institution}</p>
                                            <p className="certification-date">{date}</p>
                                        </motion.div>

                                        {/* BACK */}
                                        <AnimatePresence>
                                            {hoveredIndex === index && (
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
                                                        alt={`Certification: ${title}`}
                                                        className="certification-image-full"
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

export default Certifications
