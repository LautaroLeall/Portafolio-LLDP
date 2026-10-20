import React, { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, ShieldCheck, X } from 'lucide-react'
import { useLanguage } from '../hooks/useLanguage'
import { useModal } from '../hooks/useModal'
import '../styles/certifications.css'

const certificationsData = [
    {
        title: 'Professional Foundations of Generative AI',
        institution: 'Microsoft & LinkedIn Learning',
        issuer: 'Microsoft',
        year: '2025',
        link: 'https://www.linkedin.com/learning/certificates/5181b220b78f85b0d0c2430c8eabeacc81a4666d076cd285db8da4ace938a24c',
        imgSrc: '/certifications/fundProfDeIAGenerativa.png'
    },
    {
        title: 'Professional Foundations of Software Development',
        institution: 'Microsoft & LinkedIn Learning',
        issuer: 'Microsoft',
        year: '2025',
        link: 'https://www.linkedin.com/learning/certificates/e07e0fec757116348e2e1a95a977efee635420ddc2569afdc068d5aa7287a26a',
        imgSrc: '/certifications/fundDesarrolloDeSoft.png'
    },
    {
        title: 'Legacy Front End',
        institution: 'FreeCodeCamp',
        issuer: 'FreeCodeCamp',
        year: '2025',
        link: 'https://www.freecodecamp.org/certification/lautaroleall/legacy-front-end',
        imgSrc: '/certifications/legacyFrontEnd.png'
    },
    {
        title: 'JavaScript Algorithms And Data Structures',
        institution: 'FreeCodeCamp',
        issuer: 'FreeCodeCamp',
        year: '2025',
        link: 'https://www.freecodecamp.org/certification/lautaroleall/javascript-algorithms-and-data-structures-v8',
        imgSrc: '/certifications/javaS-Algorith-DataStructures.png'
    },
    {
        title: 'Front End Development Libraries',
        institution: 'FreeCodeCamp',
        issuer: 'FreeCodeCamp',
        year: '2025',
        link: 'https://www.freecodecamp.org/certification/lautaroleall/front-end-development-libraries',
        imgSrc: '/certifications/frontEndLibraries.png'
    },
    {
        title: 'Web Development | Digitalers Academy',
        institution: 'Educación IT',
        issuer: 'Educación IT',
        year: '2025',
        link: 'https://www.educacionit.com/perfil/lautaro-leal-del-prete-1069835/certificado/81949',
        imgSrc: '/certifications/devWeb.png'
    }
]

const Certifications = () => {
    const { language } = useLanguage()
    const { openModal, closeModal } = useModal()
    const [selectedCert, setSelectedCert] = useState(null)

    useEffect(() => {
        if (!selectedCert) return

        openModal()

        const originalOverflow = document.body.style.overflow
        const originalPaddingRight = document.body.style.paddingRight
        const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth

        document.body.style.overflow = 'hidden'
        if (scrollbarWidth > 0) {
            document.body.style.paddingRight = `${scrollbarWidth}px`
        }

        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                setSelectedCert(null)
            }
        }

        window.addEventListener('keydown', handleKeyDown)

        return () => {
            closeModal()
            document.body.style.overflow = originalOverflow
            document.body.style.paddingRight = originalPaddingRight
            window.removeEventListener('keydown', handleKeyDown)
        }
    }, [selectedCert, openModal, closeModal])

    return (
        <div className="certifications-directory-wrapper">
            <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-4">
                <h3 className="timeline-heading m-0">
                    {language === 'es' ? 'Certificaciones Oficiales' : 'Official Certifications'}
                </h3>
                <span className="cert-directory-count">
                    {certificationsData.length} {language === 'es' ? 'credenciales validadas' : 'verified credentials'}
                </span>
            </div>

            {/* Directorio de Credenciales Minimalista (Sin cards pesadas) */}
            <div className="cert-directory-table">
                {certificationsData.map((cert, idx) => (
                    <motion.div
                        className="cert-directory-row"
                        key={idx}
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.35, delay: idx * 0.06 }}
                    >
                        <div className="cert-col-year">
                            <span className="cert-year-tag">{cert.year}</span>
                        </div>

                        <div className="cert-col-main">
                            <h5 className="cert-entry-title mb-1">{cert.title}</h5>
                            <span className="cert-entry-issuer">{cert.institution}</span>
                        </div>

                        <div className="cert-col-actions">
                            <button
                                type="button"
                                className="btn-cert-preview-inline"
                                onClick={() => setSelectedCert(cert)}
                                title={language === 'es' ? 'Vista previa del certificado' : 'Preview certificate'}
                            >
                                <span>{language === 'es' ? 'Previsualizar' : 'Preview'}</span>
                            </button>

                            <a
                                href={cert.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-cert-verify-inline"
                            >
                                <span>{language === 'es' ? 'Verificar' : 'Verify'}</span>
                                <ArrowUpRight size={14} className="cert-arrow" />
                            </a>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Lightbox Modal renderizado en document.body por encima de toda la web */}
            {typeof document !== 'undefined' &&
                createPortal(
                    <AnimatePresence>
                        {selectedCert && (
                            <motion.div
                                className="cert-lightbox-backdrop"
                                role="dialog"
                                aria-modal="true"
                                aria-labelledby="cert-lightbox-title"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                                onClick={() => setSelectedCert(null)}
                                onTouchMove={(e) => {
                                    if (e.target === e.currentTarget) {
                                        e.preventDefault()
                                    }
                                }}
                            >
                                <motion.div
                                    className="cert-lightbox-modal"
                                    initial={{ opacity: 0, scale: 0.94, y: 16 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.94, y: 16 }}
                                    transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <div className="cert-lightbox-header">
                                        <div className="d-flex align-items-center gap-2 overflow-hidden">
                                            <ShieldCheck size={18} className="text-primary shrink-0" />
                                            <h6 id="cert-lightbox-title" className="m-0 text-truncate text-white">{selectedCert.title}</h6>
                                        </div>
                                        <button
                                            type="button"
                                            className="cert-lightbox-close"
                                            onClick={() => setSelectedCert(null)}
                                            aria-label={language === 'es' ? 'Cerrar vista previa' : 'Close preview'}
                                        >
                                            <X size={20} />
                                        </button>
                                    </div>
                                    <div className="cert-lightbox-body">
                                        <img
                                            src={selectedCert.imgSrc}
                                            alt={selectedCert.title}
                                            className="cert-lightbox-img"
                                        />
                                    </div>
                                    <div className="cert-lightbox-footer">
                                        <a
                                            href={selectedCert.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="btn-modal-verify"
                                        >
                                            <span>{language === 'es' ? 'Verificar en Plataforma Oficial' : 'Verify on Official Platform'}</span>
                                            <ArrowUpRight size={15} />
                                        </a>
                                    </div>
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>,
                    document.body
                )}
        </div>
    )
}

export default Certifications
