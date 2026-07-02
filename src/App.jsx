import React, { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
// eslint-disable-next-line no-unused-vars
import { motion, useScroll, useSpring } from 'framer-motion'

// Secciones del portafolio
import Home from './components/Home'
import About from './components/About'
import Qualifications from './components/Qualifications'
import BtnCV from './components/BtnCV'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Contact from './components/Contact'
// import Footer from './components/Footer'

import BottomNavbar from './components/BottomNavbar' // el navbar minimalista con icons
import ThemeToggle from './components/ThemeToggle'   // el switch de tema
import Networks from './components/Networks'

import { useTheme } from './hooks/useTheme'

function App() {
  const { theme } = useTheme()
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    AOS.init({ duration: 800, once: true })
  }, [])

  return (
    <div className={`App ${theme}`}>
      <motion.div
        className="scroll-progress-bar"
        style={{ scaleX }}
      />
      {/* Botón para cambiar tema (lo podés poner donde quieras) */}
      <div className="theme-toggle-wrapper">
        <ThemeToggle />
      </div>

      <Networks />

      <section id="home">
        <Home />
      </section>

      <section id="profile" className='py-5'>
        <About />
        <Qualifications />
        <BtnCV />
      </section>

      <section id="skills">
        <Skills />
      </section>

      <section id="projects">
        <Projects />
      </section>

      <section id="contact">
        <Contact />
      </section>

      {/* <Footer /> */}

      <BottomNavbar />

    </div>
  )
}

export default App
