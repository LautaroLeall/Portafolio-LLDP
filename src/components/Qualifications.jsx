import React from 'react'
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion'
import Education from './Education'
import Certifications from './Certifications'
import { useLanguage } from '../hooks/useLanguage'
import '../styles/education.css'
import '../styles/certifications.css'

const Qualifications = () => {
    const { language } = useLanguage()

    return (
        <section className="qualifications-editorial-section container py-5" id="qualifications">
            {/* Header Editorial Abierto (Sin cajas ni tabs innecesarios) */}
            <div className="editorial-eyebrow mb-2">
                <span className="eyebrow-line" />
                <span>{language === 'es' ? 'Trayectoria' : 'Background'}</span>
            </div>

            <motion.h2
                className="editorial-lead-title mb-5"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
            >
                {language === 'es'
                    ? 'Educación académica y certificaciones profesionales validadas.'
                    : 'Academic education and validated professional credentials.'}
            </motion.h2>

            {/* Bloque 1: Educación (Timeline Vertical Auténtico) */}
            <div className="mb-5 pb-4">
                <Education />
            </div>

            {/* Bloque 2: Certificaciones (Directorio Interactivo Minimalista) */}
            <div>
                <Certifications />
            </div>
        </section>
    )
}

export default Qualifications
