import { useEffect, useState, lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import { Toaster, sileo } from 'sileo';
import 'sileo/styles.css';

// Layout Components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ScrollToTop from './components/layout/ScrollToTop';
import SmoothScroll from './components/layout/SmoothScroll';
import Preloader from './components/ui/Preloader';
import PageLoader from './components/ui/PageLoader';
import CustomCursor from './components/ui/CustomCursor';

// Multi-Page Routes: HomePage es estático para First Contentful Paint instantáneo
import HomePage from './pages/HomePage';
const ServicesPage = lazy(() => import('./pages/ServicesPage'));
const ProjectsPage = lazy(() => import('./pages/ProjectsPage'));
const ProjectDetailPage = lazy(() => import('./pages/ProjectDetailPage'));
const SkillsPage = lazy(() => import('./pages/SkillsPage'));
const EducationPage = lazy(() => import('./pages/EducationPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

import { useTheme } from './hooks/useTheme';
import { useLanguage } from './hooks/useLanguage';
import { usePageLoader } from './hooks/usePageLoader';

/**
 * RouteSuspenseFallback — Sincroniza el loader global y el ocultamiento del Footer
 * mientras React.lazy() descarga el bundle de la ruta solicitada.
 */
function RouteSuspenseFallback() {
  const { showPageLoader, hidePageLoader } = usePageLoader();

  useEffect(() => {
    showPageLoader();
    return () => {
      hidePageLoader();
    };
  }, [showPageLoader, hidePageLoader]);

  return null;
}

/**
 * PageTransition — Envoltorio de transición y animación de entrada para cada página.
 * Garantiza que la página entre suavemente con fade-in y elevación sutil (0.35s)
 * solo cuando el componente ya terminó de cargar.
 */
function PageTransition({ children }) {
  useEffect(() => {
    if (window.__lenis) {
      window.__lenis.resize();
      window.__lenis.scrollTo(0, { immediate: true });
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);

  return (
    <Suspense fallback={<RouteSuspenseFallback />}>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{
          opacity: 1,
          y: 0,
          transitionEnd: { transform: 'none' }
        }}
        exit={{
          opacity: 0,
          y: -10,
          transition: { duration: 0.18, ease: 'easeIn' }
        }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        onAnimationComplete={() => {
          if (window.__lenis) {
            window.__lenis.resize();
          }
        }}
      >
        {children}
      </motion.div>
    </Suspense>
  );
}

function App() {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const { isPageLoading } = usePageLoader();
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  const validStaticRoutes = [
    '/',
    '/servicios',
    '/proyectos',
    '/habilidades',
    '/educacion',
    '/sobre-mi',
    '/contacto'
  ];
  const isProjectDetail = /^\/proyectos\/[^/]+$/.test(location.pathname);
  const isNotFound = !validStaticRoutes.includes(location.pathname) && !isProjectDetail;
  const hideNavbarAndFooter = isProjectDetail || isNotFound;

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  // Actualización dinámica de títulos por ruta para indexación SEO e historial
  useEffect(() => {
    const isEs = language === 'es';
    const path = location.pathname;
    const baseTitle = 'Lautaro Leal Del Prete';

    if (path === '/') {
      document.title = isEs
        ? `${baseTitle} | Desarrollador Full Stack & Software Engineer`
        : `${baseTitle} | Full Stack Developer & Software Engineer`;
    } else if (path === '/servicios') {
      document.title = isEs
        ? `Servicios & Cotizador Interactivo | ${baseTitle}`
        : `Services & Instant Quoter | ${baseTitle}`;
    } else if (path === '/proyectos') {
      document.title = isEs
        ? `Proyectos & Casos de Estudio | ${baseTitle}`
        : `Projects & Case Studies | ${baseTitle}`;
    } else if (path.startsWith('/proyectos/')) {
      const slug = path.replace('/proyectos/', '');
      const projectTitle = slug
        .split('-')
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ');
      document.title = `${projectTitle} | ${baseTitle}`;
    } else if (path === '/habilidades') {
      document.title = isEs
        ? `Stack Tecnológico & Habilidades | ${baseTitle}`
        : `Tech Stack & Engineering Skills | ${baseTitle}`;
    } else if (path === '/educacion') {
      document.title = isEs
        ? `Educación & Certificaciones | ${baseTitle}`
        : `Education & Verified Credentials | ${baseTitle}`;
    } else if (path === '/sobre-mi') {
      document.title = isEs
        ? `Sobre Mí & Filosofía de Ingeniería | ${baseTitle}`
        : `About Me & Engineering Philosophy | ${baseTitle}`;
    } else if (path === '/contacto') {
      document.title = isEs
        ? `Contacto & Propuestas de Software | ${baseTitle}`
        : `Contact & Software Inquiries | ${baseTitle}`;
    } else {
      document.title = isEs
        ? `Página no encontrada (404) | ${baseTitle}`
        : `Page Not Found (404) | ${baseTitle}`;
    }
  }, [location.pathname, language]);

  // Desvanece con animación suave cualquier notificación de Sileo activa al cambiar de ruta
  useEffect(() => {
    const viewport = document.querySelector('[data-sileo-viewport]');
    if (viewport) {
      viewport.classList.add('sileo-route-exit');
      const timer = setTimeout(() => {
        sileo.clear();
        viewport.classList.remove('sileo-route-exit');
      }, 360);
      return () => clearTimeout(timer);
    }
    sileo.clear();
  }, [location.pathname]);

  return (
    <SmoothScroll>
      <div className={`App ${theme}`} style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        {/* Global Sileo Physics Toaster Notifications */}
        <Toaster
          position="top-right"
          theme={theme === 'dark' ? 'dark' : 'light'}
          offset={{ top: hideNavbarAndFooter ? 24 : 96, right: 24 }}
          options={{
            roundness: 16
          }}
        />

        {/* Interactive Physics Custom Cursor for Desktop */}
        <CustomCursor />

        {/* Global Page Transition & Async Loader */}
        <PageLoader />

        {/* Preloader with Smooth Terminal Exit (Solo en el arranque inicial) */}
        <AnimatePresence mode="wait">
          {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
        </AnimatePresence>

        {/* Top Scroll Progress Indicator */}
        <motion.div
          className="scroll-progress-bar"
          style={{ scaleX }}
        />

        {/* Auto Scroll to top on navigation */}
        <ScrollToTop />

        {/* Executive Brand Navbar (Hidden on standalone Project Detail and 404 view with Smooth Exit) */}
        <AnimatePresence>
          {!hideNavbarAndFooter && (
            <motion.div
              key="global-navbar"
              initial={{ opacity: 0, y: -24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="fixed top-0 left-0 right-0 z-50 pointer-events-none"
            >
              <Navbar />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Content with Route Transitions & Suspense Synchronization */}
        <main style={{ flexGrow: 1, position: 'relative' }}>
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<PageTransition><HomePage /></PageTransition>} />
              <Route path="/servicios" element={<PageTransition><ServicesPage /></PageTransition>} />
              <Route path="/proyectos" element={<PageTransition><ProjectsPage /></PageTransition>} />
              <Route path="/proyectos/:slug" element={<PageTransition><ProjectDetailPage /></PageTransition>} />
              <Route path="/habilidades" element={<PageTransition><SkillsPage /></PageTransition>} />
              <Route path="/educacion" element={<PageTransition><EducationPage /></PageTransition>} />
              <Route path="/sobre-mi" element={<PageTransition><AboutPage /></PageTransition>} />
              <Route path="/contacto" element={<PageTransition><ContactPage /></PageTransition>} />
              {/* 404 Dedicated Interactive Route */}
              <Route path="*" element={<PageTransition><NotFoundPage /></PageTransition>} />
            </Routes>
          </AnimatePresence>
        </main>

        {/* Institutional Corporate Footer (Oculto durante la carga y revelado suavemente al montar la página) */}
        <AnimatePresence>
          {!hideNavbarAndFooter && !isPageLoading && (
            <motion.div
              key="global-footer"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <Footer />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </SmoothScroll>
  );
}

export default App;
