import React, { useRef, useState } from 'react';
import emailjs from 'emailjs-com';
import '../styles/contact.css';

const Contact = () => {
    const form = useRef();
    const [success, setSuccess] = useState(false);

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm(
            'YOUR_SERVICE_ID',
            'YOUR_TEMPLATE_ID',
            form.current,
            'YOUR_PUBLIC_KEY'
        )
            .then((result) => {
                console.log(result.text);
                setSuccess(true);
                form.current.reset();
            }, (error) => {
                console.log(error.text);
                alert("Hubo un error al enviar el mensaje. 😥");
            });
    };

    return (
        <div className="contact-container container py-5" id="contact" data-aos="fade-up">
            <h2 className="section-title">¿Charlamos?</h2>
            <p>Mandame un mensaje directo por acá y te respondo por mail 💌</p>

            <form ref={form} onSubmit={sendEmail} className="contact-form mt-4">
                <input type="text" name="user_name" placeholder="Tu nombre" required />
                <input type="email" name="user_email" placeholder="Tu correo" required />
                <textarea name="message" placeholder="Tu mensaje" rows="5" required />
                <button type="submit" className="btn btn-primary mt-3">Enviar mensaje</button>
            </form>

            {success && <p className="success-msg mt-3">¡Mensaje enviado con éxito! 📬</p>}
        </div>
    );
};

export default Contact;
