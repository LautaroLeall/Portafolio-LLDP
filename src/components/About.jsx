import React from 'react'
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion'
import { useLanguage } from '../hooks/useLanguage'
import '../styles/about.css'

const About = () => {
    const { t } = useLanguage()

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
                    {t('about.title')}
                </motion.h2>
            </motion.div>


            {/* Texto con animación sutil */}
            <motion.p
                className="about-text"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
            >
                {t('about.text1')}
                <br />
                {t('about.text2')}
                <br />
                {t('about.text3')}
                <br />
                {t('about.text4')}
            </motion.p>
        </div>
    )
}

export default About
