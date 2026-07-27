import React from 'react'
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion'
import { Download } from 'lucide-react'
import { useLanguage } from '../hooks/useLanguage'
import '../styles/btnCV.css'

const BtnCV = () => {
    const { t } = useLanguage()

    return (
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
                    {t('cv.spanish')}
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
                    {t('cv.english')}
                </a>
            </motion.div>
        </motion.div>
    )
}

export default BtnCV
