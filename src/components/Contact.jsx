import { useRef } from 'react'
import emailjs from 'emailjs-com'
import Swal from 'sweetalert2'
import { Mail, User, MessageSquareText } from 'lucide-react'
import '../styles/contact.css'

const Contact = () => {
    const form = useRef()

    const sendEmail = (e) => {
        e.preventDefault()

        emailjs
            .sendForm(
                'service_m2xi21i',       // Reemplazá con tu Service ID
                'template_y8mh8jg',      // Reemplazá con tu Template ID
                form.current,
                'TxYC4I9s0Lubvu7l2'        // Reemplazá con tu Public Key
            )
            .then(
                () => {
                    Swal.fire({
                        icon: 'success',
                        title: '¡Mensaje enviado!',
                        text: 'Te responderé lo antes posible.',
                        showConfirmButton: false,
                        timer: 2000,
                        toast: true,
                        position: 'bottom-end',
                    })
                    form.current.reset()
                },
                () => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Ups...',
                        text: 'Hubo un problema al enviar el mensaje.',
                    })
                }
            )
    }

    return (
        <div className="contact-container container py-5 mb-5" id="contact" data-aos="fade-up">
            <h2 className="section-title mb-3">Shall we Chat??</h2>
            <p className="mb-2">Send me a direct message here and I'll reply by email.</p>

            <form ref={form} onSubmit={sendEmail} className="contact-form shadow-lg p-4 rounded">
                <label className="form-label">
                    <User size={25} className="text-primary" />
                </label>
                <input type="text" name="user_name" placeholder="Your name" required />

                <label className="form-label">
                    <Mail size={25} className="text-primary" />
                </label>
                <input type="email" name="user_email" placeholder="Your email" required />

                <label className="form-label">
                    <MessageSquareText size={25} className="text-primary" />
                </label>
                <textarea name="message" placeholder="Your message" rows="5" required />

                <div className="btn-send d-flex justify-content-center align-items-center">
                    <button type="submit" className="btn btn-outline-primary mt-2 w-50 shadow">
                        Send Message
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Contact
