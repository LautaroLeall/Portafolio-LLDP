// src/components/Certifications.jsx
import { useState } from 'react'
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion'
import '../styles/certifications.css'

// Datos de certificaciones centralizados
const certificationsData = [
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

const Certifications = () => {
    const [hoveredIndex, setHoveredIndex] = useState(null)

    return (
        <motion.div
            className="certifications-section mt-5"
            initial="hidden"
            animate="visible"
            variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.15 } },
            }}
        >
            <h3 className="certifications-title">My Certifications</h3>
            <div className="certifications-cards">
                {certificationsData.map(({ title, institution, link, date, imgSrc }, index) => (
                    <motion.a
                        key={index}
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="certification-card"
                        variants={{
                            hidden: { opacity: 0, y: 30 },
                            visible: { opacity: 1, y: 0 },
                        }}
                        transition={{ duration: 0.4, ease: 'easeOut' }}
                        whileHover={{ scale: 1.04 }} // efecto visual
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                        aria-label={`Ver certificación ${title} de ${institution}`} // 🔹 Mejora: accesibilidad
                    >
                        <div className="card-inner">
                            {/* FRONT: texto (posición absoluta para mantener tamaño de card fijo) */}
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

                            {/* BACK: imagen (overlay absoluto). Aparece con AnimatePresence */}
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
                ))}
            </div>
        </motion.div>
    )
}

export default Certifications
