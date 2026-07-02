// src/components/Home.jsx
import { useState } from 'react'
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'

import '../styles/home.css'

const bgImages = [
    '/home/img-home.png',
    '/home/img-home2.png',
    '/home/img-home3.png'
]

const Home = () => {
    const [bgIndex, setBgIndex] = useState(0)

    return (
        <section className="home-section" id="home">
            {/* Background Images Crossfade */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={bgIndex}
                    className="carousel-slide"
                    style={{ backgroundImage: `url(${bgImages[bgIndex]})` }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                />
            </AnimatePresence>

            <div className="overlay-home d-flex justify-content-center align-items-center text-center">
                <motion.div
                    className="home-text-container"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <motion.p
                        className="greeting-text mb-2 text-light"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                    >
                        Hi, my name is
                    </motion.p>

                    <motion.h1
                        className="title-home display-2 fw-bold mb-3"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                    >
                        Lautaro Leal
                    </motion.h1>

                    <motion.div
                        className="type-animation-container mb-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.6 }}
                    >
                        <TypeAnimation
                            sequence={[
                                () => setBgIndex(0),
                                'Full Stack Developer',
                                3000,
                                () => setBgIndex(1),
                                'Creative Problem Solver',
                                3000,
                                () => setBgIndex(2),
                                'Building Scalable Products',
                                3000
                            ]}
                            wrapper="h2"
                            speed={50}
                            className="subtitle-home"
                            repeat={Infinity}
                        />
                    </motion.div>

                    <motion.div
                        className="home-buttons d-flex gap-3 justify-content-center mt-5"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.7, duration: 0.6 }}
                    >
                        <a href="#projects" className="btn btn-home btn-lg px-4 py-2 rounded-pill shadow">
                            View My Work
                        </a>
                        <a href="#contact" className="btn btn-outline-light btn-lg px-4 py-2 rounded-pill">
                            Contact Me
                        </a>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    )
}

export default Home
