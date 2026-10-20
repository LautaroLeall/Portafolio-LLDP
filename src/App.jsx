import { useEffect } from 'react'
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

import BottomNavbar from './components/BottomNavbar'
import ThemeToggle from './components/ThemeToggle'
import LanguageToggle from './components/LanguageToggle'
import Networks from './components/Networks'
import CodeWavesCanvas from './components/ui/CodeWavesCanvas'
import './styles/globalControls.css'

import { useTheme } from './hooks/useTheme'
import { useLanguage } from './hooks/useLanguage'
import { useModal } from './hooks/useModal'

function App() {
  const { theme } = useTheme()
  const { language } = useLanguage()
  const { isModalOpen } = useModal()
  const isLight = theme === 'light'
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  return (
    <div className={`App ${theme}`}>
      <motion.div
        className="scroll-progress-bar"
        style={{ scaleX }}
        animate={isModalOpen ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* Controles Unificados (Tema + Idioma en una sola barra glassmorphism) */}
      <motion.div
        className="global-controls"
        initial={{ y: 0, opacity: 1, scale: 1 }}
        animate={isModalOpen ? { y: 85, opacity: 0, scale: 0.92 } : { y: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      >
        <ThemeToggle />
        <div className="controls-divider"></div>
        <LanguageToggle />
      </motion.div>

      <Networks />

      {/* Unified Cyber Constellation Background across all post-Hero sections */}
      <CodeWavesCanvas
        isLight={isLight}
        showLogo={false}
        showParticles={true}
        isFixed={true}
        fadeOnHero={true}
      />

      <section id="home">
        <Home />
      </section>

      {/* Post-Hero Container */}
      <div className="post-hero-container">
        <section id="profile">
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

        <section id="contact" className="pb-5">
          <Contact />
        </section>
      </div>

      <BottomNavbar />

    </div>
  )
}

export default App
