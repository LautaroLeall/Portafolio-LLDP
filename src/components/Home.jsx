// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'
import { ArrowDown, Mail, Briefcase } from 'lucide-react'
import { useLanguage } from '../hooks/useLanguage'
import { useTheme } from '../hooks/useTheme'
import GradientASCII from './ui/GradientASCII'

import '../styles/home.css'

const Home = () => {
    const { t, language } = useLanguage()
    const { theme } = useTheme()
    const titles = t('home.titles') || []

    const isLight = theme === 'light'
    const asciiColors = isLight
        ? ['#002855', '#0d6efd', '#78adff', '#e0f2fe']
        : ['#1e3fd8', '#f6f8ff', '#a5d8ff', '#38bdf8']

    // Orchestrated staggered entrance variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.12,
                delayChildren: 0.1
            }
        }
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 22 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.65,
                ease: [0.16, 1, 0.3, 1]
            }
        }
    }

    return (
        <section className="home-section">
            {/* Interactive ASCII Background */}
            <div className="ascii-bg-wrapper">
                <GradientASCII
                    phrases={[
                        'LAUTARO LEAL DEL PRETE',
                        'FULL STACK DEVELOPER',
                        'INNOVATION & DESIGN',
                        'REACT • NODE.JS • ARCHITECTURE',
                        'CREATIVE CODE & EXPERIENCES',
                        'BUILDING SCALABLE WEB PRODUCTS',
                        'PROBLEM SOLVER • CLEAN CODE',
                        'FRONTEND & BACKEND ENGINEERING'
                    ]}
                    colors={asciiColors}
                    shape="horizon"
                    characters=" =+xX0S8#@"
                    cellSize={18}
                    density={0.8}
                    glyphOpacity={0.75}
                    glow={0.22}
                    depthOfField={0}
                    flicker={0.18}
                    softness={0.5}
                    scale={1}
                    flow={0.5}
                    speed={1}
                    gradientOpacity={0.8}
                    grain={0.08}
                    variation={0}
                    mouseInteraction
                    scrambleRadius={0.045}
                    clickEffect="wave"
                    intro
                    lightMode={isLight}
                />
            </div>

            <div className="overlay-home d-flex justify-content-center align-items-center text-center">
                <motion.div
                    className="home-text-container"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.p
                        className="greeting-text mb-2"
                        variants={itemVariants}
                    >
                        {t('home.greeting')}
                    </motion.p>

                    <motion.h1
                        className="title-home display-2 fw-bold mb-3"
                        variants={itemVariants}
                    >
                        {t('home.name')}
                    </motion.h1>

                    <motion.div
                        className="type-animation-container mb-4"
                        variants={itemVariants}
                    >
                        <TypeAnimation
                            key={language}
                            sequence={[
                                titles[0] || 'Full Stack Developer',
                                2600,
                                titles[1] || 'Creative Problem Solver',
                                2600,
                                titles[2] || 'Building Scalable Products',
                                2600
                            ]}
                            wrapper="h2"
                            speed={50}
                            className="subtitle-home"
                            repeat={Infinity}
                        />
                    </motion.div>

                    {/* Elevated Editorial Buttons */}
                    <motion.div
                        className="home-buttons d-flex gap-3 justify-content-center mt-4 pt-2"
                        variants={itemVariants}
                    >
                        <a href="#projects" className="btn-hero-primary">
                            <span>{t('home.btnWork')}</span>
                            <ArrowDown size={17} className="btn-hero-icon" />
                        </a>
                        <a
                            href="https://servicios-lldp.vercel.app/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-hero-services"
                        >
                            <span>{t('home.btnServices')}</span>
                            <Briefcase size={16} className="btn-hero-icon" />
                        </a>
                        <a href="#contact" className="btn-hero-secondary">
                            <span>{t('home.btnContact')}</span>
                            <Mail size={17} className="btn-hero-icon" />
                        </a>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    )
}

export default Home
