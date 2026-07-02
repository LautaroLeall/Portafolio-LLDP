// src/components/Skills.jsx
import React from 'react'
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion'
// Icons
import {
    FaHtml5, FaCss3Alt, FaJs, FaReact, FaBootstrap, FaGitAlt, FaGithub, FaFigma,
    FaUsers, FaComments, FaUserCheck, FaLightbulb, FaBug, FaRobot,
    FaCode, FaDatabase, FaTools, FaVial
} from 'react-icons/fa'
import {
    SiVite, SiTailwindcss, SiNodedotjs, SiExpress, SiMongodb, SiPostman,
    SiCypress, SiMocha, SiChai, SiSlack, SiJira, SiTrello
} from 'react-icons/si'
import { FaLinesLeaning } from "react-icons/fa6";
import { RiGeminiFill } from "react-icons/ri";
import '../styles/skills.css'

const skillCategories = [
    {
        title: "Frontend Development",
        icon: <FaCode className="category-icon" style={{ color: '#0dcaf0' }} />,
        skills: [
            { name: 'React.js', icon: <FaReact color="#61DAFB" /> },
            { name: 'JavaScript', icon: <FaJs color="#F7DF1E" /> },
            { name: 'Tailwind CSS', icon: <SiTailwindcss color="#06B6D4" /> },
            { name: 'HTML5', icon: <FaHtml5 color="#E34F26" /> },
            { name: 'CSS3', icon: <FaCss3Alt color="#1572B6" /> },
            { name: 'Vite', icon: <SiVite color="#646CFF" /> },
            { name: 'Bootstrap', icon: <FaBootstrap color="#7952B3" /> },
        ]
    },
    {
        title: "Backend & Database",
        icon: <FaDatabase className="category-icon" style={{ color: '#198754' }} />,
        skills: [
            { name: 'Node.js', icon: <SiNodedotjs color="#339933" /> },
            { name: 'Express.js', icon: <SiExpress color="#fff" className="dark-icon" /> },
            { name: 'MongoDB', icon: <SiMongodb color="#47A248" /> },
        ]
    },
    {
        title: "QA & Testing",
        icon: <FaVial className="category-icon" style={{ color: '#ffc107' }} />,
        skills: [
            { name: 'Cypress', icon: <SiCypress color="#fff" className="dark-icon" /> },
            { name: 'Mocha', icon: <SiMocha color="#8D6748" /> },
            { name: 'Chai', icon: <SiChai color="#A30701" /> },
            { name: 'Katalon', icon: <FaBug color="#32A952" /> },
        ]
    },
    {
        title: "Tools & Workspace",
        icon: <FaTools className="category-icon" style={{ color: '#fd7e14' }} />,
        skills: [
            { name: 'Git', icon: <FaGitAlt color="#F05032" /> },
            { name: 'GitHub', icon: <FaGithub color="#fff" className="dark-icon" /> },
            { name: 'Postman', icon: <SiPostman color="#FF6C37" /> },
            { name: 'Figma', icon: <FaFigma color="#F24E1E" /> },
            { name: 'Jira', icon: <SiJira color="#0052CC" /> },
            { name: 'Trello', icon: <SiTrello color="#0052CC" /> },
            { name: 'Slack', icon: <SiSlack color="#4A154B" /> },
        ]
    }
]

const softSkills = [
    { name: 'Generative AI', icon: <FaRobot /> },
    { name: 'Communication', icon: <FaComments /> },
    { name: 'Teamwork', icon: <FaUsers /> },
    { name: 'Problem Solving', icon: <FaLightbulb /> },
    { name: 'Adaptability', icon: <FaLinesLeaning /> },
    { name: 'Innovation', icon: <RiGeminiFill /> },
]

const Skills = () => {
    return (
        <section className="skills-section py-5" id="skills">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-5"
                >
                    <h2 className="section-title">Technical Expertise</h2>
                    <p className="section-subtitle">Technologies and tools I use to build scalable and high-quality solutions.</p>
                </motion.div>

                <div className="skills-grid">
                    {skillCategories.map((category, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="skill-card"
                        >
                            <div className="skill-card-header">
                                {category.icon}
                                <h3 className="skill-card-title">{category.title}</h3>
                            </div>
                            <div className="skill-card-body">
                                {category.skills.map((skill, idx) => (
                                    <div key={idx} className="skill-item">
                                        <span className="skill-icon">{skill.icon}</span>
                                        <span className="skill-name">{skill.name}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="soft-skills-container mt-5"
                >
                    <h3 className="text-center mb-4 text-gradient">Core Competencies & Soft Skills</h3>
                    <div className="soft-skills-flex">
                        {softSkills.map((skill, i) => (
                            <div key={i} className="soft-skill-badge">
                                {skill.icon}
                                <span>{skill.name}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    )
}

export default Skills
