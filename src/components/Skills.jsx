import React from 'react'
import '../styles/skills.css'
import { motion } from 'framer-motion'
import {
    FaHtml5, FaCss3Alt, FaJs, FaReact, FaBootstrap, FaGitAlt, FaNpm, FaGithub, FaFigma,
    FaUsers, FaComments, FaUserCheck, FaLightbulb,
} from 'react-icons/fa'
import { FaLinesLeaning } from "react-icons/fa6";
import { SiVite } from 'react-icons/si'
import { RiGeminiFill } from "react-icons/ri";

const techSkills = [
    { name: 'HTML', icon: <FaHtml5 /> },
    { name: 'CSS', icon: <FaCss3Alt /> },
    { name: 'JavaScript', icon: <FaJs /> },
    { name: 'React', icon: <FaReact /> },
    { name: 'Bootstrap', icon: <FaBootstrap /> },
    { name: 'npm', icon: <FaNpm /> },
    { name: 'Vite', icon: <SiVite /> },
    { name: 'Git', icon: <FaGitAlt /> },
    { name: 'GitHub', icon: <FaGithub /> },
    { name: 'Figma', icon: <FaFigma /> },
]

const softSkills = [
    { name: 'Communication', icon: <FaComments /> },
    { name: 'Teamwork', icon: <FaUsers /> },
    { name: 'Responsibility', icon: <FaUserCheck /> },
    { name: 'Troubleshooting', icon: <FaLightbulb /> },
    { name: 'Adaptability', icon: <FaLinesLeaning /> },
    { name: 'Creativity and Innovation', icon: <RiGeminiFill /> },
]

const staggerContainer = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.1,
        },
    },
}

const fadeInItem = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
}

const Skills = () => {
    return (
        <div className="skills-container container py-5" id="skills">
            <div className="row justify-content-center">
                {/* Columna Habilidades Técnicas */}
                <div className="col-md-6" data-aos="fade-up">
                    <h2 className="section-title mb-4 text-center">Tech Skills</h2>
                    <motion.div
                        className="badge-group"
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                    >
                        {techSkills.map((skill, i) => (
                            <motion.span
                                className="skill-badge tech"
                                key={i}
                                variants={fadeInItem}
                                whileHover={{ scale: 1.1 }}
                            >
                                {skill.icon} <span className="ms-2">{skill.name}</span>
                            </motion.span>
                        ))}
                    </motion.div>
                </div>

                {/* Columna Habilidades Personales */}
                <div className="col-md-6 mt-5 mt-md-0" data-aos="fade-up">
                    <h2 className="section-title mb-4 text-center">Soft Skills</h2>
                    <motion.div
                        className="badge-group"
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                    >
                        {softSkills.map((skill, i) => (
                            <motion.span
                                className="skill-badge soft"
                                key={i}
                                variants={fadeInItem}
                                whileHover={{ scale: 1.1 }}
                            >
                                {skill.icon} <span className="ms-2">{skill.name}</span>
                            </motion.span>
                        ))}
                    </motion.div>
                </div>
            </div>
        </div>
    )
}

export default Skills
