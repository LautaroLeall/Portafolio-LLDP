import { useRef, useState } from 'react'
import emailjs from 'emailjs-com'
import Swal from 'sweetalert2'
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion'
import { useLanguage } from '../hooks/useLanguage'
// Icons
import { Mail, User, MessageSquareText, Send } from 'lucide-react'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import '../styles/contact.css'

const Contact = () => {
    const form = useRef()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const { t } = useLanguage()

    const sendEmail = (e) => {
        e.preventDefault()
        if (isSubmitting) return;
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
                    Swal.fire({
                        icon: 'success',
                        title: t('contact.alertSuccessTitle'),
                        text: t('contact.alertSuccessText'),
                        showConfirmButton: false,
                        timer: 3000,
                        toast: true,
                        position: 'bottom-end',
                        customClass: {
                            popup: 'custom-swal-popup'
                        }
                    })
                    form.current.reset()
                    setIsSubmitting(false)
                },
                (error) => {
                    console.error('Error al enviar el correo:', error);
                    Swal.fire({
                        icon: 'error',
                        title: t('contact.alertErrorTitle'),
                        text: t('contact.alertErrorText'),
                        customClass: {
                            popup: 'custom-swal-popup'
                        }
                    })
                    setIsSubmitting(false)
                }
            )
    }

    return (
        <div className="contact-container container py-5 mb-5" id="contact">
            <div className="row align-items-center justify-content-center mx-auto">

                {/* Left Column: Text & Socials */}
                <motion.div
                    className="col-lg-6 pe-lg-4"
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h3 className="section-title mb-3">{t('contact.title')}</h3>
                    <p className="contact-subtitle mb-4">
                        {t('contact.subtitle')}
                    </p>

                    <div className="contact-info-cards mt-4">
                        <a href="https://github.com/LautaroLeall" target="_blank" rel="noopener noreferrer" className="contact-social-card">
                            <FaGithub size={24} className="social-icon" />
                            <div>
                                <h6 className="mb-1 fw-bold">GitHub</h6>
                                <span>{t('contact.githubCard')}</span>
                            </div>
                        </a>

                        <a href="https://www.linkedin.com/in/lauldp" target="_blank" rel="noopener noreferrer" className="contact-social-card mt-3">
                            <FaLinkedin size={24} className="social-icon text-primary" />
                            <div>
                                <h6 className="mb-1 fw-bold">LinkedIn</h6>
                                <span>{t('contact.linkedinCard')}</span>
                            </div>
                        </a>
                    </div>
                </motion.div>

                {/* Right Column: Form */}
                <motion.div
                    className="col-lg-6 d-flex justify-content-center"
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <form ref={form} onSubmit={sendEmail} className="contact-form-modern shadow-lg p-4 rounded-4 w-100" style={{ maxWidth: '450px' }}>
                        <h4 className="mb-4 fw-bold text-center">{t('contact.formTitle')}</h4>

                        <div className="position-relative mb-4">
                            <User size={20} className="position-absolute top-50 translate-middle-y text-primary" style={{ left: '15px' }} />
                            <input type="text" name="user_name" className="form-control custom-input ps-5 py-3" placeholder={t('contact.namePlaceholder')} required />
                        </div>

                        <div className="position-relative mb-4">
                            <Mail size={20} className="position-absolute top-50 translate-middle-y text-primary" style={{ left: '15px' }} />
                            <input type="email" name="user_email" className="form-control custom-input ps-5 py-3" placeholder={t('contact.emailPlaceholder')} required />
                        </div>

                        <div className="position-relative mb-4">
                            <MessageSquareText size={20} className="position-absolute text-primary" style={{ top: '15px', left: '15px' }} />
                            <textarea name="message" className="form-control custom-input ps-5 pt-3" placeholder={t('contact.messagePlaceholder')} rows="4" required></textarea>
                        </div>

                        <button type="submit" disabled={isSubmitting} className="btn btn-primary w-100 py-3 fw-bold rounded-3 d-flex align-items-center justify-content-center gap-2" style={{ opacity: isSubmitting ? 0.7 : 1 }}>
                            {isSubmitting ? t('contact.btnSending') : t('contact.btnSend')} <Send size={20} />
                        </button>
                    </form>
                </motion.div>

            </div>
        </div>
    )
}

export default Contact
