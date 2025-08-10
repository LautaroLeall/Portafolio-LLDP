// src/components/About.jsx
import React from 'react'
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion'
import { Download } from 'lucide-react'
import '../styles/about.css'

const About = () => {
    return (
        <div className="about-container container py-5" id="profile" data-aos="fade-up">
            {/* Título con animación de entrada */}
            <motion.h2
                className="section-title"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                About Me
            </motion.h2>

            {/* Imagen centrada con animación de entrada */}
            {/* <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
            >
                <img src="/lldp-my.png" alt="Lautaro Leal" className="profile-image" />
            </motion.div> */}

            {/* Texto con animación sutil */}
            <motion.p
                className="about-text"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
            >
                Hello, I'm Lautaro Leal Del Prete.
                <br />
                I'm a Software Development and Quality student at Universidad del Norte Santo Tomás de Aquino.
                <br />
                I'm continuing my training in web development, programming, problem-solving, and teamwork. I already have experience in web development, customer service, and inventory control thanks to previous academic projects and jobs.
                <br />
                I'm especially motivated by teamwork. I have experience applying agile methodologies such as SCRUM, which has allowed me to develop organizational, communication, and effective collaboration skills in group projects.
                <br />
                I'm looking for opportunities to continue learning, add value to technology teams, and participate in projects that represent real challenges.
            </motion.p>

            {/* Botón centrado para descargar el CV */}
            <motion.div className="d-flex justify-content-center align-items-center container-cv mt-5">
                <motion.div
                    className="d-flex justify-content-center btn-download align-items-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                >
                    <a
                        href="/Lautaro-Leal-Del-Prete-Spanish.pdf"
                        download
                        className="btn btn-outline-primary btn-cv shadow d-flex align-items-center gap-2"
                    >
                        <Download size={20} />
                        Download CV - Espanish Version
                    </a>
                </motion.div>
                <motion.div
                    className="d-flex justify-content-center btn-download align-items-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                >
                    <a
                        href="/Lautaro-Leal-Del-Prete-English.pdf"
                        download
                        className="btn btn-outline-primary btn-cv shadow d-flex align-items-center gap-2"
                    >
                        <Download size={20} />
                        Download CV - English Version
                    </a>
                </motion.div>
            </motion.div>
        </div>
    )
}

export default About
