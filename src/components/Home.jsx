// src/components/Home.jsx
import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Imágenes del carousel
import HomeImage1 from '/public/home/img-home.png'
import HomeImage2 from '/public/home/img-home2.png'
import HomeImage3 from '/public/home/img-home3.png'

import '../styles/home.css'

// Slides del carrusel
const slides = [
    {
        image: HomeImage1,
        title: "Hi, I'm Lautaro Leal Del Prete",
        subtitle: "Frontend Developer",
        button: "About Me",
    },
    {
        image: HomeImage2,
        title: "Developer Frontend",
        subtitle: "Passionate about code and design",
        button: "My Projects",
    },
    {
        image: HomeImage3,
        title: "Shall we work together?",
        subtitle: "Explore my projects and find out how I can help you.",
        button: "Contact Me",
    },
]

// Mapea el texto del botón a su sección destino
const getButtonHref = (label) => {
    switch (label) {
        case 'About Me':
            return '#profile'
        case 'My Projects':
            return '#projects'
        case 'Contact Me':
            return '#contact'
        default:
            return '#'
    }
}

const Home = () => {
    const [index, setIndex] = useState(0) // Slide actual
    const [show, setShow] = useState(true) // Control de visibilidad

    // Cambia de slide con animación fluida
    useEffect(() => {
        const timer = setInterval(() => {
            setShow(false) // Oculta el actual
            setTimeout(() => {
                setIndex((prev) => (prev + 1) % slides.length) // Avanza
                setShow(true) // Muestra nuevo
            }, 500)
        }, 4000)

        return () => clearInterval(timer) // Limpieza
    }, [])

    return (
        <section className="home-section">
            <AnimatePresence mode="wait">
                {show && (
                    <motion.div
                        key={index}
                        className="carousel-slide"
                        style={{ backgroundImage: `url(${slides[index].image})` }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="overlay-home d-flex justify-content-center align-items-center text-center">
                            <motion.div
                                className="text-light"
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8 }}
                            >
                                <motion.h1
                                    className="title-home display-4 fw-bold"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2, duration: 0.6 }}
                                >
                                    {slides[index].title}
                                </motion.h1>

                                <motion.p
                                    className="lead m-0"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4, duration: 0.6 }}
                                >
                                    {slides[index].subtitle}
                                </motion.p>

                                {/* Botón dinámico según el slide */}
                                <motion.a
                                    href={getButtonHref(slides[index].button)}
                                    className="btn btn-outline-primary mt-3"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.6, duration: 0.6 }}
                                >
                                    {slides[index].button}
                                </motion.a>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    )
}

export default Home
