// src/components/Home.jsx
import React from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import HomeImage from '../assets/img-home.png'
import '../styles/home.css'

const Home = () => {
    const { scrollY } = useScroll()

    const opacity = useTransform(scrollY, [0, 300], [1, 0])
    const translateY = useTransform(scrollY, [0, 300], [0, -50])

    return (
        <motion.section
            className="home-section d-flex align-items-center justify-content-center"
            style={{
                backgroundImage: `url(${HomeImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed',
                opacity,
                y: translateY,
            }}
        >
            <div className="overlay d-flex justify-content-center align-items-center text-center">
                <motion.div
                    className="text-light"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    <h1 className="display-4 fw-bold">
                        Hi, I'm  <span className="highlight">Lautaro Leal Del Prete</span>
                    </h1>
                    <p className="lead mt-3">
                        Developer Frontend | Passionate about code and design
                    </p>
                    <a href="#projects" className="btn btn-outline-primary mt-1">
                        See Projects
                    </a>
                </motion.div>
            </div>
        </motion.section>
    )
}

export default Home
