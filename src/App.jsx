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
import { projectList } from './data/projectsData';

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
  const { language, t } = useLanguage();
  const { isPageLoading } = usePageLoader();
  const location = useLocation();

  // Mostrar Preloader solo en la primera carga de la sesión en la portada (/)
  const [isLoading, setIsLoading] = useState(() => {
    try {
      if (sessionStorage.getItem('lldp_preloader_shown') === '1') {
        return false;
      }
      if (window.location.pathname !== '/') {
        sessionStorage.setItem('lldp_preloader_shown', '1');
        return false;
      }
      return true;
    } catch {
      return true;
    }
  });

  const handlePreloaderComplete = () => {
    try {
      sessionStorage.setItem('lldp_preloader_shown', '1');
    } catch {
      // Ignore storage restrictions
    }
    setIsLoading(false);
  };

  const validStaticRoutes = [
    '/',
    '/servicios',
    '/proyectos',
    '/habilidades',
    '/educacion',
    '/sobre-mi',
    '/contacto'
  ];
  const slugMatch = location.pathname.startsWith('/proyectos/')
    ? location.pathname.replace('/proyectos/', '').replace(/\/+$/, '')
    : null;
  const matchedProject = slugMatch
    ? projectList.find((p) => p.slug === slugMatch || p.id === slugMatch)
    : null;
  const isProjectDetail = Boolean(matchedProject);
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

  // Actualización dinámica integral de SEO (Title, Description, Canonical, Open Graph, Twitter y Robots)
  useEffect(() => {
    const isEs = language === 'es';
    const path = location.pathname;
    const baseTitle = 'Lautaro Leal Del Prete';
    const baseUrl = 'https://lautarolealdev.com';

    let pageTitle = '';
    let pageDescription = '';
    let canonicalUrl = `${baseUrl}${path === '/' ? '/' : path.replace(/\/+$/, '')}`;

    if (path === '/') {
      pageTitle = isEs
        ? `${baseTitle} | Programador & Desarrollo Web Tucumán`
        : `${baseTitle} | Full Stack Web & Software Engineer`;
      pageDescription = isEs
        ? 'Programador y desarrollador web en Tucumán. Desarrollo de software a medida, diseño web y sistemas Full Stack en Argentina con React 19 y Node.js.'
        : 'Lautaro Leal Del Prete: Custom Web Development and Software Engineering. Full Stack apps with React 19, Node.js, PostgreSQL & MongoDB.';
    } else if (path === '/servicios') {
      pageTitle = isEs
        ? `Servicios & Cotizador Interactivo | ${baseTitle}`
        : `Services & Instant Quoter | ${baseTitle}`;
      pageDescription = isEs
        ? 'Desarrollo de Páginas Web, Sistemas de Gestión a medida, Tiendas Online, Invitaciones Digitales y optimización SEO. Cotizá tu software online.'
        : 'Custom Websites, Management Systems, Online Stores, Digital Invitations, and SEO optimization. Quote your software project interactively online.';
    } else if (path === '/proyectos') {
      pageTitle = isEs
        ? `Proyectos & Casos de Estudio | ${baseTitle}`
        : `Projects & Case Studies | ${baseTitle}`;
      pageDescription = isEs
        ? 'Catálogo de 11 proyectos en producción: sistemas Full Stack con React 19, Node.js, PostgreSQL, MongoDB, Mercado Pago y WebSockets en tiempo real.'
        : 'Showcase of 11 production projects: Full Stack platforms built with React 19, Node.js, PostgreSQL, MongoDB, Mercado Pago, and real-time WebSockets.';
    } else if (matchedProject) {
      pageTitle = `${matchedProject.title} — ${isEs ? 'Caso de Estudio' : 'Case Study'} | ${baseTitle}`;
      pageDescription = t(matchedProject.descriptionKey);
      canonicalUrl = `${baseUrl}/proyectos/${matchedProject.slug}`;
    } else if (path === '/habilidades') {
      pageTitle = isEs
        ? `Stack Tecnológico & Habilidades | ${baseTitle}`
        : `Tech Stack & Engineering Skills | ${baseTitle}`;
      pageDescription = isEs
        ? 'Stack técnico de ingeniería: React 19, Zustand, Three.js, Tailwind CSS, Node.js, PostgreSQL, Supabase, MongoDB, Socket.IO, Zod y testing QA.'
        : 'Engineering skills matrix: React 19, Zustand, Three.js, Tailwind CSS, Node.js, PostgreSQL, Supabase, MongoDB, Socket.IO, Zod, and QA testing.';
    } else if (path === '/educacion') {
      pageTitle = isEs
        ? `Educación & Certificaciones | ${baseTitle}`
        : `Education & Verified Credentials | ${baseTitle}`;
      pageDescription = isEs
        ? 'Formación universitaria en Desarrollo y Calidad de Software (UNSTA), inglés técnico, certificaciones verificables y descarga oficial de CV en PDF.'
        : 'University degree in Software Development & Quality Assurance (UNSTA), technical English, verifiable certifications, and official PDF resume.';
    } else if (path === '/sobre-mi') {
      pageTitle = isEs
        ? `Sobre Mí & Filosofía de Ingeniería | ${baseTitle}`
        : `About Me & Engineering Philosophy | ${baseTitle}`;
      pageDescription = isEs
        ? 'Perfil profesional de Lautaro Leal Del Prete: arquitectura limpia, calidad de software (QA UNSTA), seguridad de datos y desarrollo Full Stack.'
        : 'Professional profile of Lautaro Leal Del Prete: clean architecture, software quality assurance (UNSTA), data security, and Full Stack engineering.';
    } else if (path === '/contacto') {
      pageTitle = isEs
        ? `Contacto & Propuestas de Software | ${baseTitle}`
        : `Contact & Software Inquiries | ${baseTitle}`;
      pageDescription = isEs
        ? 'Canales directos de contacto con Lautaro Leal Del Prete: formulario automático, WhatsApp, LinkedIn y GitHub. Respuestas en menos de 24 horas.'
        : 'Direct contact channels with Lautaro Leal Del Prete: automated inquiry form, WhatsApp, LinkedIn, and GitHub. Replies within 24 hours.';
    } else {
      pageTitle = isEs
        ? `Página no encontrada (404) | ${baseTitle}`
        : `Page Not Found (404) | ${baseTitle}`;
      pageDescription = isEs
        ? 'La ruta solicitada no existe o ha sido reubicada en lautarolealdev.com.'
        : 'The requested route does not exist or has been relocated on lautarolealdev.com.';
    }

    document.title = pageTitle;

    const setMetaTag = (selector, attr, value) => {
      const el = document.querySelector(selector);
      if (el) el.setAttribute(attr, value);
    };

    setMetaTag('meta[name="title"]', 'content', pageTitle);
    setMetaTag('meta[name="description"]', 'content', pageDescription);
    setMetaTag('link[rel="canonical"]', 'href', canonicalUrl);
    setMetaTag('meta[property="og:title"]', 'content', pageTitle);
    setMetaTag('meta[property="og:description"]', 'content', pageDescription);
    setMetaTag('meta[property="og:url"]', 'content', canonicalUrl);
    setMetaTag('meta[name="twitter:title"]', 'content', pageTitle);
    setMetaTag('meta[name="twitter:description"]', 'content', pageDescription);
    setMetaTag('meta[name="twitter:url"]', 'content', canonicalUrl);

    const robotsDirective = isNotFound
      ? 'noindex, nofollow'
      : 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1';
    setMetaTag('meta[name="robots"]', 'content', robotsDirective);
    setMetaTag('meta[name="googlebot"]', 'content', robotsDirective);
  }, [location.pathname, language, matchedProject, isNotFound, t]);

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

        {/* Preloader with Smooth Terminal Exit (Solo en el arranque inicial de sesión) */}
        <AnimatePresence mode="wait">
          {isLoading && <Preloader onComplete={handlePreloaderComplete} />}
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
