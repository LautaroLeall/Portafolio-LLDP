// src/components/About.jsx
import React from 'react'
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion'
import '../styles/about.css'

const About = () => {
    return (
        <div className="about-container container" id="profile" data-aos="fade-up">
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
                I'm an advanced Software Development and Quality student focused on modern web development and real client projects.
                <br />
                I build responsive, performance-oriented web applications using technologies such as React, Tailwind and modern frontend tooling, always aiming to align design, usability and business goals.
                <br />
                I'm motivated by solving problems, collaborating with teams and turning ideas into functional digital products.
                I'm looking for opportunities to grow as a developer and contribute to projects that create real impact.
            </motion.p>
        </div>
    )
}

export default About
