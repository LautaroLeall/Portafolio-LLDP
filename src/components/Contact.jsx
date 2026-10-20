import { useRef, useState, useEffect } from 'react'
import emailjs from 'emailjs-com'
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '../hooks/useLanguage'
import { useTheme } from '../hooks/useTheme'
import BellToggle from './ui/BellToggle'
import CodeWavesCanvas from './ui/CodeWavesCanvas'
// Icons
import {
    Mail,
    User,
    MessageSquareText,
    Send,
    Copy,
    Check,
    CheckCircle2,
    AlertCircle,
    X,
    ArrowUpRight,
    MapPin
} from 'lucide-react'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import '../styles/contact.css'

// Sub-component for individual toast items in the queue with self-contained auto-dismiss
const ToastItem = ({ toast, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose(toast.id)
        }, 4000)
        return () => clearTimeout(timer)
    }, [toast.id, toast.timestamp, onClose])

    return (
        <motion.div
            layout
            key={toast.id}
            className={`floating-toast toast-${toast.type}`}
            initial={{ opacity: 0, x: -45, y: -10, scale: 0.92 }}
            animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
            exit={{ opacity: 0, x: -35, scale: 0.9 }}
            transition={{ type: 'spring', damping: 26, stiffness: 360 }}
            role="alert"
        >
            <div className="toast-glow" />
            <div className="toast-icon-wrap">
                {toast.type === 'copy' && <Copy size={19} className="toast-icon-svg text-info" />}
                {toast.type === 'success' && <CheckCircle2 size={19} className="toast-icon-svg text-success" />}
                {toast.type === 'error' && <AlertCircle size={19} className="toast-icon-svg text-danger" />}
            </div>
            <div className="toast-text-wrap">
                <h6 className="toast-title m-0">{toast.title}</h6>
                <p className="toast-msg m-0">{toast.message}</p>
            </div>
            <button
                type="button"
                className="toast-close-btn"
                onClick={() => onClose(toast.id)}
                aria-label="Cerrar notificación"
            >
                <X size={15} />
            </button>
            <div key={toast.timestamp || toast.id} className="toast-progress-bar" />
        </motion.div>
    )
}

const Contact = () => {
    const form = useRef()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [copiedEmail, setCopiedEmail] = useState(false)
    const [toasts, setToasts] = useState([])
    const { t, language } = useLanguage()
    const { theme } = useTheme()
    const isLight = theme === 'light'

    // Add toast to queue: avoids duplicate toasts of the same type (e.g. repeated copy)
    const addToast = (newToast) => {
        setToasts((prev) => {
            const existingIndex = prev.findIndex((item) => item.type === newToast.type)
            if (existingIndex !== -1) {
                // If a toast of the same type already exists, refresh its timestamp & timer without duplicating the card
                const updated = [...prev]
                updated[existingIndex] = {
                    ...newToast,
                    id: updated[existingIndex].id,
                    timestamp: Date.now()
                }
                return updated
            }
            // If it's a different type (e.g. email copied AND message sent), display both stacked in row
            return [...prev, { ...newToast, id: `${newToast.type}-${Date.now()}`, timestamp: Date.now() }]
        })
    }

    const removeToast = (id) => {
        setToasts((prev) => prev.filter((item) => item.id !== id))
    }

    const handleCopyEmail = () => {
        navigator.clipboard.writeText('lautaroleal4@gmail.com')
        setCopiedEmail(true)
        addToast({
            type: 'copy',
            title: language === 'es' ? '¡Correo copiado!' : 'Email copied!',
            message: 'lautaroleal4@gmail.com'
        })
        setTimeout(() => {
            setCopiedEmail(false)
        }, 2500)
    }

    const sendEmail = (e) => {
        e.preventDefault()
        if (isSubmitting) return
        setIsSubmitting(true)

        emailjs
            .sendForm(
                import.meta.env.VITE_EMAILJS_SERVICE_ID,
                import.meta.env.VITE_EMAILJS_TEMPLATE,
                form.current,
                import.meta.env.VITE_EMAILJS_USER_ID
            )
            .then(
                () => {
                    addToast({
                        type: 'success',
                        title: t('contact.alertSuccessTitle'),
                        message: t('contact.alertSuccessText')
                    })
                    form.current.reset()
                    setIsSubmitting(false)
                },
                (error) => {
                    console.error('Error al enviar el correo:', error)
                    addToast({
                        type: 'error',
                        title: t('contact.alertErrorTitle'),
                        message: t('contact.alertErrorText')
                    })
                    setIsSubmitting(false)
                }
            )
    }

    return (
        <div className="contact-section-wrapper">
            {/* Top-Left Stacked Toasts Container (Highest Z-Index) */}
            <div className="toasts-top-left-container" aria-live="polite">
                <AnimatePresence mode="popLayout">
                    {toasts.map((item) => (
                        <ToastItem key={item.id} toast={item} onClose={removeToast} />
                    ))}
                </AnimatePresence>
            </div>

            {/* Interactive Cyber Code Waves Background with Monolithic </> Logo */}
            <div className="contact-bg-waves-wrapper" aria-hidden="true">
                <CodeWavesCanvas isLight={isLight} showLogo={true} showParticles={false} />
            </div>

            <div className="contact-editorial-section container py-5">
                {/* Encabezado Editorial Abierto (Sin cajas pesadas) */}
                <div className="contact-editorial-header mb-5">
                    <motion.div
                        className="editorial-eyebrow mb-2"
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4 }}
                    >
                        <span className="eyebrow-line" />
                        <span>{language === 'es' ? 'Contacto' : 'Contact'}</span>
                    </motion.div>

                    <motion.h2
                        className="editorial-lead-title"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        {language === 'es'
                            ? '¿Tienes un proyecto en mente o una propuesta? Hablemos y construyamos algo extraordinario.'
                            : 'Have a project in mind or an opportunity to explore? Let’s connect and build something exceptional.'}
                    </motion.h2>

                    <motion.p
                        className="contact-editorial-desc"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.15 }}
                    >
                        {t('contact.subtitle')}
                    </motion.p>
                </div>

                {/* Grid Principal Editorial en 2 Columnas Naturales */}
                <div className="contact-editorial-grid">
                    {/* Columna Izquierda: Canales Directos & Disponibilidad */}
                    <motion.div
                        className="contact-channels-column"
                        initial={{ opacity: 0, y: 25 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.55 }}
                    >
                        <div className="channels-section-label mb-3">
                            <span className="label-text">{language === 'es' ? 'Canales Directos' : 'Direct Channels'}</span>
                        </div>

                        <div className="contact-channels-stream">
                            {/* Canal 1: GitHub */}
                            <a
                                href="https://github.com/LautaroLeall"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="channel-stream-row"
                            >
                                <div className="channel-icon-node">
                                    <FaGithub size={20} />
                                </div>
                                <div className="channel-info-wrap">
                                    <span className="channel-title">GitHub</span>
                                    <span className="channel-subtitle">{t('contact.githubCard')}</span>
                                </div>
                                <ArrowUpRight size={18} className="channel-arrow-icon" />
                            </a>

                            {/* Canal 2: LinkedIn */}
                            <a
                                href="https://www.linkedin.com/in/lauldp"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="channel-stream-row"
                            >
                                <div className="channel-icon-node linkedin-node">
                                    <FaLinkedin size={20} />
                                </div>
                                <div className="channel-info-wrap">
                                    <span className="channel-title">LinkedIn</span>
                                    <span className="channel-subtitle">{t('contact.linkedinCard')}</span>
                                </div>
                                <ArrowUpRight size={18} className="channel-arrow-icon" />
                            </a>

                            {/* Canal 3: Email Directo con Copiado Rápido */}
                            <div className="channel-stream-row email-stream-row">
                                <div className="channel-icon-node email-node">
                                    <Mail size={20} />
                                </div>
                                <div className="channel-info-wrap">
                                    <span className="channel-title">Email</span>
                                    <span className="channel-subtitle email-value">lautaroleal4@gmail.com</span>
                                </div>
                                <div className="channel-action-wrap ms-auto">
                                    <BellToggle
                                        offLabel={language === 'es' ? 'Copiar' : 'Copy'}
                                        onLabel={language === 'es' ? '¡Copiado!' : 'Copied!'}
                                        pressed={copiedEmail}
                                        size="sm"
                                        radius={12}
                                        waves={true}
                                        onChange={handleCopyEmail}
                                        color={isLight ? '#0d6efd' : '#e0f2fe'}
                                        background={isLight ? 'rgba(13, 110, 253, 0.08)' : 'rgba(13, 110, 253, 0.14)'}
                                        onColor={isLight ? '#15803d' : '#4ade80'}
                                        onBackground={isLight ? 'rgba(34, 197, 94, 0.12)' : 'rgba(34, 197, 94, 0.16)'}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Ficha de Disponibilidad & Ubicación (Unboxed) */}
                        <div className="contact-availability-card mt-4 pt-4">
                            <div className="availability-item mb-2">
                                <span className="live-status-dot" />
                                <span className="availability-text">
                                    {language === 'es'
                                        ? 'Disponible para nuevos proyectos & puestos Full Stack'
                                        : 'Available for new projects & Full Stack roles'}
                                </span>
                            </div>
                            <div className="availability-item">
                                <MapPin size={15} className="text-primary flex-shrink-0" />
                                <span className="availability-text">
                                    {language === 'es'
                                        ? 'Tucumán, Argentina • Remoto / Híbrido'
                                        : 'Tucumán, Argentina • Remote / Hybrid'}
                                </span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Columna Derecha: Formulario de Contacto Editorial */}
                    <motion.div
                        className="contact-form-column"
                        initial={{ opacity: 0, y: 25 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.55, delay: 0.15 }}
                    >
                        <form
                            ref={form}
                            onSubmit={sendEmail}
                            className="contact-editorial-form"
                        >
                            <div className="form-header mb-4">
                                <h4 className="form-lead-title m-0">{t('contact.formTitle')}</h4>
                                <span className="form-header-divider" />
                            </div>

                            <div className="form-group-field mb-4">
                                <label className="field-label" htmlFor="user_name">
                                    {language === 'es' ? 'Nombre completo' : 'Full Name'}
                                </label>
                                <div className="field-input-wrapper">
                                    <User size={18} className="field-icon" />
                                    <input
                                        id="user_name"
                                        type="text"
                                        name="user_name"
                                        className="editorial-input"
                                        placeholder={t('contact.namePlaceholder')}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-group-field mb-4">
                                <label className="field-label" htmlFor="user_email">
                                    {language === 'es' ? 'Correo electrónico' : 'Email Address'}
                                </label>
                                <div className="field-input-wrapper">
                                    <Mail size={18} className="field-icon" />
                                    <input
                                        id="user_email"
                                        type="email"
                                        name="user_email"
                                        className="editorial-input"
                                        placeholder={t('contact.emailPlaceholder')}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-group-field mb-4">
                                <label className="field-label" htmlFor="message">
                                    {language === 'es' ? 'Mensaje o propuesta' : 'Message or Proposal'}
                                </label>
                                <div className="field-input-wrapper">
                                    <MessageSquareText size={18} className="field-icon textarea-icon" />
                                    <textarea
                                        id="message"
                                        name="message"
                                        className="editorial-input editorial-textarea"
                                        placeholder={t('contact.messagePlaceholder')}
                                        rows="4"
                                        required
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`btn-editorial-submit ${isSubmitting ? 'submitting' : ''}`}
                            >
                                {isSubmitting ? (
                                    <span className="d-flex align-items-center justify-content-center gap-2">
                                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
                                        <span>{t('contact.btnSending')}</span>
                                    </span>
                                ) : (
                                    <span className="d-flex align-items-center justify-content-center gap-2">
                                        <span>{t('contact.btnSend')}</span>
                                        <Send size={17} className="send-arrow-icon" />
                                    </span>
                                )}
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}

export default Contact
