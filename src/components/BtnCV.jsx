// src/components/About.jsx
import React from 'react'
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion'
import { Download } from 'lucide-react'
import '../styles/btnCV.css'

const BtnCV = () => {
    return (
        <motion.div className="d-flex justify-content-center align-items-center container-cv mt-2" >
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
    )
}

export default BtnCV
