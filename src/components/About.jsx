// src/components/About.jsx
import React from 'react'
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion'
import '../styles/about.css'

const About = () => {
    return (
        <div className="about-container container" id="profile" data-aos="fade-up">
            {/* Encabezado con animación de entrada */}
            <motion.div
                className="d-flex align-items-center gap-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
            >
                {/* Título con animación de entrada */}
                <motion.h2
                    className="section-title"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    About Me
                </motion.h2>
            </motion.div>


            {/* Texto con animación sutil */}
            <motion.p
                className="about-text"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
            >
                Hello, I'm Lautaro Leal Del Prete.
                <br />
                I am an advanced Software Development and Quality student with experience building Full Stack web applications.
                <br />
                I focus on developing scalable products, implementing responsive interfaces, and applying best development practices and agile methodologies.
                <br />
                I am motivated by solving problems, integrating REST APIs, and optimizing the user experience. 
                I'm always ready to take on new challenges for my personal and professional growth.
            </motion.p>
        </div>
    )
}

export default About
