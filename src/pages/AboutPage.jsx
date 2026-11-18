import { useRef, useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Terminal,
  ArrowRight
} from 'lucide-react';
import Dossier3DCard from '../components/about/Dossier3DCard';
import { useLanguage } from '../hooks/useLanguage';

/**
 * AboutPage — Perfil Profesional & Filosofía de Ingeniería
 * Disposición editorial limpia con tarjeta interactiva sticky sincronizada en tiempo real.
 */
export default function AboutPage() {
  const { language } = useLanguage();
  const isEs = language === 'es';

  const containerRef = useRef(null);
  const pillarRefs = useRef({});
  const [activePillarNumber, setActivePillarNumber] = useState(null);
  const [hoveredPillarNumber, setHoveredPillarNumber] = useState(null);
  const [scrollRatio, setScrollRatio] = useState(0.15);

  const principles = useMemo(
    () => [
      {
        number: '01',
        shortTitle: isEs ? 'Arquitectura de Datos' : 'System Architecture',
        title: isEs ? 'Arquitectura por Encima de la Improvisación' : 'Architecture Over Improvisation',
        desc: isEs
          ? 'Cada proyecto comienza con el diseño del esquema de datos, el flujo de autenticación y la selección tecnológica adecuada. No escribo código sin entender primero el dominio del problema.'
          : 'Every build begins with data schema modeling, authentication flows, and tailored tech selection. Code is engineered after thoroughly mastering the problem domain.'
      },
      {
        number: '02',
        shortTitle: isEs ? 'Calidad & QA (UNSTA)' : 'Quality & QA (UNSTA)',
        title: isEs ? 'Calidad, Tipado Estricto & Testing' : 'Quality Assurance, Typing & Testing',
        desc: isEs
          ? 'Formado en la UNSTA con énfasis en QA, aplico validación de datos en capas (Zod/Joi), manejo centralizado de excepciones y pruebas para garantizar estabilidad continua en producción.'
          : 'Educated at UNSTA with QA emphasis, I implement layered data validation (Zod/Joi), centralized error handling, and testing strategies to ensure uninterrupted production uptime.'
      },
      {
        number: '03',
        shortTitle: isEs ? 'Código Limpio & Modular' : 'Clean & Modular Code',
        title: isEs ? 'Código Limpio & Mantenible' : 'Clean, Maintainable Codebase',
        desc: isEs
          ? 'Estructura modular, separación clara de responsabilidades (controladores, servicios, modelos) y documentación precisa. Código que cualquier otro desarrollador puede leer, auditar y escalar.'
          : 'Modular component architecture, clean separation of concerns (controllers, services, repositories), and precise technical documentation that scales effortlessly.'
      },
      {
        number: '04',
        shortTitle: isEs ? 'Seguridad & Rendimiento' : 'Security & Performance',
        title: isEs ? 'Rendimiento y Seguridad como Prioridad' : 'Performance & Security by Default',
        desc: isEs
          ? 'Consultas SQL indexadas, paginación en base de datos, protección contra inyecciones SQL/NoSQL, cabeceras seguras (Helmet), CORS restrictivo y optimización de activos para Core Web Vitals.'
          : 'Indexed database queries, cursor pagination, SQL/NoSQL injection prevention, security headers (Helmet), restrictive CORS, and Core Web Vitals optimization.'
      }
    ],
    [isEs]
  );

  // Sincronización suave del scroll con la tarjeta Dossier y el pilar activo
  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const viewportH = window.innerHeight;
        const totalScrollable = Math.max(1, rect.height - viewportH * 0.55);
        const currentScrolled = Math.max(0, -rect.top + viewportH * 0.25);
        const progress = Math.min(1, Math.max(0.15, currentScrolled / totalScrollable));
        setScrollRatio(progress);
      }

      let foundPillar = null;
      for (const pr of principles) {
        const el = pillarRefs.current[pr.number];
        if (el) {
          const r = el.getBoundingClientRect();
          if (r.top <= window.innerHeight * 0.62) {
            foundPillar = pr.number;
          }
        }
      }
      setActivePillarNumber(foundPillar);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    if (window.__lenis) {
      window.__lenis.on('scroll', handleScroll);
    }
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (window.__lenis) {
        window.__lenis.off('scroll', handleScroll);
      }
    };
  }, [principles]);

  const currentFocusNumber = hoveredPillarNumber || activePillarNumber;
  const activePillarObj = principles.find((p) => p.number === currentFocusNumber) || null;

  return (
    <div className="w-full min-h-screen pt-28 sm:pt-32 pb-28 text-slate-900 dark:text-[#f5f7fa] transition-colors duration-300 relative">
      <div ref={containerRef} className="w-full max-w-[1240px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] xl:grid-cols-[1fr_380px] gap-10 lg:gap-12 items-start">
          {/* Columna Izquierda: Narrativa Profesional + Pilares de Ingeniería */}
          <div className="flex flex-col min-w-0">
            {/* Sección 1: Perfil Profesional */}
            <section className="pb-16 sm:pb-20 border-b border-slate-200 dark:border-white/[0.08]">
              <div className="flex items-center gap-3.5 mb-5 flex-wrap">
                <span className="font-mono text-xs font-bold tracking-widest text-blue-600 dark:text-[#3b82f6] whitespace-nowrap">
                  {isEs ? 'PERFIL PROFESIONAL' : 'PROFESSIONAL PROFILE'}
                </span>
                <span className="w-7 h-px bg-blue-500/40" />
                <span className="font-mono text-[0.7rem] text-slate-500 dark:text-slate-400 tracking-wider whitespace-nowrap">
                  {isEs ? 'INGENIERO DE SOFTWARE • UNSTA' : 'SOFTWARE ENGINEER • UNSTA'}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.12] tracking-tight text-slate-900 dark:text-white mb-3">
                Lautaro Leal{' '}
                <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 dark:from-blue-400 dark:via-blue-500 dark:to-sky-300 bg-clip-text text-transparent">
                  Del Prete
                </span>
              </h1>

              <span className="inline-flex items-center gap-2 font-mono text-sm text-blue-600 dark:text-[#3b82f6] font-semibold mb-6 whitespace-nowrap">
                <Terminal size={16} className="shrink-0" /> Full Stack Developer &amp; QA Engineer
              </span>

              <p className="text-base sm:text-lg leading-relaxed text-slate-800 dark:text-white mb-5 font-normal">
                {isEs ? (
                  <>
                    Soy desarrollador Full Stack graduado de la Tecnicatura Universitaria en Desarrollo y Calidad de Software
                    en la <strong className="text-slate-900 dark:text-white font-semibold">Universidad del Norte Santo Tomás de Aquino (UNSTA)</strong>. Mi pasión es diseñar y construir
                    aplicaciones web completas, arquitecturas de backend sólidas y soluciones escalables.
                  </>
                ) : (
                  <>
                    I am a Full Stack developer graduated with an Associate Degree in Software Development and Quality Assurance
                    from <strong className="text-slate-900 dark:text-white font-semibold">Universidad del Norte Santo Tomás de Aquino (UNSTA)</strong>. I engineer resilient web applications,
                    scalable backend architectures, and high-performance digital products.
                  </>
                )}
              </p>

              <p className="text-sm sm:text-base leading-relaxed text-slate-600 dark:text-slate-300 mb-5">
                {isEs
                  ? 'Mi enfoque une la rigurosidad de la ingeniería de software con el sentido práctico de producto: cada línea de código que escribo está pensada para ser limpia, legible, testeable y orientada a brindar valor tangible y seguridad a los usuarios finales.'
                  : 'My methodology combines software engineering discipline with pragmatic product focus: every line of code is written to be clean, readable, testable, and oriented toward delivering tangible value and security.'}
              </p>

              <p className="text-sm sm:text-base leading-relaxed text-slate-600 dark:text-slate-300 mb-6">
                {isEs
                  ? 'Desde San Miguel de Tucumán, Argentina, trabajo en proyectos independientes y en equipo de forma remota, aplicando metodologías ágiles Scrum, control de versiones semántico y estándares internacionales de calidad.'
                  : 'Based in San Miguel de Tucumán, Argentina, I build both standalone software solutions and collaborate with distributed engineering teams, practicing agile Scrum workflows and international quality standards.'}
              </p>

              <div className="flex items-center gap-4 mt-8 flex-wrap">
                <Link
                  to="/proyectos"
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl shadow-lg shadow-blue-500/25 transition-all duration-200 hover:-translate-y-0.5 whitespace-nowrap select-none"
                  data-cursor="pointer"
                >
                  <span>{isEs ? 'Ver Mis 11 Proyectos' : 'View My 11 Projects'}</span>
                  <ArrowRight size={17} />
                </Link>
                <Link
                  to="/contacto"
                  className="inline-flex items-center px-5 py-3.5 bg-white dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 text-slate-800 dark:text-white text-sm font-medium rounded-xl transition-all duration-200 whitespace-nowrap select-none shadow-sm hover:-translate-y-0.5"
                  data-cursor="pointer"
                >
                  <span>{isEs ? 'Contactar Conmigo' : 'Get in Touch'}</span>
                </Link>
              </div>

              {/* Tarjeta Dossier en Mobile / Tablet */}
              <div className="lg:hidden mt-10">
                <Dossier3DCard
                  isEs={isEs}
                  activePillar={activePillarObj}
                  scrollProgress={scrollRatio}
                />
              </div>
            </section>

            {/* Sección 2: Filosofía de Trabajo */}
            <section className="pt-14 sm:pt-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="mb-10"
              >
                <span className="font-mono text-xs font-bold tracking-widest text-blue-600 dark:text-[#3b82f6] whitespace-nowrap">
                  {isEs ? 'FILOSOFÍA DE TRABAJO' : 'ENGINEERING PHILOSOPHY'}
                </span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mt-2 tracking-tight">
                  {isEs
                    ? 'Pilares de Ingeniería & Compromiso de Entrega'
                    : 'Engineering Pillars & Delivery Principles'}
                </h2>
              </motion.div>

              <div className="flex flex-col gap-3">
                {principles.map((pr, idx) => {
                  const isHighlighted = currentFocusNumber === pr.number;

                  return (
                    <motion.article
                      key={pr.number}
                      ref={(el) => (pillarRefs.current[pr.number] = el)}
                      onMouseEnter={() => setHoveredPillarNumber(pr.number)}
                      onMouseLeave={() => setHoveredPillarNumber(null)}
                      initial={{ opacity: 0, y: 18 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-40px' }}
                      transition={{ duration: 0.4, delay: idx * 0.06 }}
                      className={`group relative grid grid-cols-1 sm:grid-cols-[64px_1fr] items-start gap-3 sm:gap-6 p-5 sm:p-6 rounded-2xl border transition-all duration-300 overflow-hidden ${isHighlighted
                        ? 'bg-blue-50/50 dark:bg-blue-500/[0.06] border-blue-200 dark:border-blue-500/30 shadow-sm'
                        : 'bg-white/60 dark:bg-white/[0.015] border-slate-200/80 dark:border-white/[0.07] hover:border-slate-300 dark:hover:border-white/15'
                        }`}
                    >
                      {isHighlighted && (
                        <motion.div
                          layoutId="about-active-pillar-indicator"
                          className="absolute left-0 top-0 bottom-0 w-1 bg-blue-600 dark:bg-[#3b82f6] shadow-[0_0_12px_rgba(59,130,246,0.85)]"
                          transition={{ type: 'spring', stiffness: 360, damping: 30 }}
                        />
                      )}

                      <span
                        className={`font-mono text-2xl font-extrabold transition-colors duration-200 shrink-0 ${isHighlighted
                          ? 'text-blue-600 dark:text-[#3b82f6]'
                          : 'text-slate-300 dark:text-slate-600 group-hover:text-blue-500'
                          }`}
                      >
                        {pr.number}
                      </span>

                      <div>
                        <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-2">
                          {pr.title}
                        </h3>
                        <p className="text-sm sm:text-base leading-relaxed text-slate-600 dark:text-slate-300 m-0">
                          {pr.desc}
                        </p>
                      </div>
                    </motion.article>
                  );
                })}
              </div>
            </section>
          </div>

          {/* Columna Derecha: Tarjeta Dossier Interactiva Sticky en Desktop */}
          <aside className="hidden lg:block lg:sticky lg:top-[104px] z-20 self-start">
            <Dossier3DCard
              isEs={isEs}
              activePillar={activePillarObj}
              scrollProgress={scrollRatio}
            />
          </aside>
        </div>
      </div>
    </div>
  );
}
