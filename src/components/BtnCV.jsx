import React from 'react'
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion'
import { ArrowDownToLine } from 'lucide-react'
import { useLanguage } from '../hooks/useLanguage'
import '../styles/btnCV.css'

const BtnCV = () => {
    const { t, language } = useLanguage()

    return (
        <div className="cv-minimal-section container py-4">
            <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 cv-minimal-bar">
                <div className="cv-prompt-text">
                    <span className="cv-prompt-title">
                        {language === 'es' ? '¿Quieres revisar mi perfil completo?' : 'Would you like to review my full profile?'}
                    </span>
                    <span className="cv-prompt-sub d-block">
                        {language === 'es' ? 'Descarga mi currículum actualizado en formato PDF' : 'Download my updated resume in PDF format'}
                    </span>
                </div>

                <div className="d-flex align-items-center flex-wrap gap-2">
                    <motion.a
                        href="/Lautaro-Leal-Del-Prete-Spanish.pdf"
                        download
                        className="btn-cv-pill btn-cv-es"
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <ArrowDownToLine size={15} />
                        <span>{t('cv.spanish')}</span>
                    </motion.a>

                    <motion.a
                        href="/Lautaro-Leal-Del-Prete-English.pdf"
                        download
                        className="btn-cv-pill btn-cv-en"
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <ArrowDownToLine size={15} />
                        <span>{t('cv.english')}</span>
                    </motion.a>
                </div>
            </div>
        </div>
    )
}

export default BtnCV
