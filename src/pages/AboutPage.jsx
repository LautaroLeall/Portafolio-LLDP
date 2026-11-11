import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue
} from 'framer-motion';
import {
  Terminal,
  ArrowRight
} from 'lucide-react';
import Dossier3DCard from '../components/about/Dossier3DCard';
import { useLanguage } from '../hooks/useLanguage';

/**
 * AboutPage — Perfil Profesional & Filosofía de Ingeniería
 */
export default function AboutPage() {
  const { language } = useLanguage();
  const isEs = language === 'es';

  const containerRef = useRef(null);
  const innerBoundsRef = useRef(null);
  const cardRef = useRef(null);

  // Dynamic horizontal shift distance for desktop screen size
  const shiftXMotion = useMotionValue(0);

  useEffect(() => {
    const updateShift = () => {
      if (!innerBoundsRef.current || !cardRef.current) return;
      if (window.innerWidth < 1024) {
        shiftXMotion.set(0);
      } else {
        const containerWidth = innerBoundsRef.current.clientWidth;
        const cardWidth = cardRef.current.clientWidth;
        const shift = Math.max(0, containerWidth - cardWidth);
        shiftXMotion.set(shift);
      }
    };

    updateShift();
    window.addEventListener('resize', updateShift);
    const timer = setTimeout(updateShift, 100);
    return () => {
      window.removeEventListener('resize', updateShift);
      clearTimeout(timer);
    };
  }, [shiftXMotion]);

  // Track scroll progress within the orchestrated section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  // Calculate 3D card journey: start right (0) -> glide left (-shift)
  const cardXRaw = useTransform(
    [scrollYProgress, shiftXMotion],
    ([progress, shift]) => {
      if (progress <= 0.12) return 0;
      if (progress >= 0.46) return -shift;
      const t = (progress - 0.12) / (0.46 - 0.12);
      // Smooth cubic ease-in-out curve
      const ease = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      return -shift * ease;
    }
  );

  // 3D Banking and spatial scale during flight
  const cardRotateYRaw = useTransform(scrollYProgress, [0.12, 0.29, 0.46], [0, 16, 0]);
  const cardRotateZRaw = useTransform(scrollYProgress, [0.12, 0.29, 0.46], [0, -2.5, 0]);
  const cardScaleRaw = useTransform(scrollYProgress, [0.12, 0.29, 0.46], [1, 1.03, 1]);

  // Spring physics for organic flight feel
  const springFlight = { stiffness: 85, damping: 22, mass: 0.8 };
  const cardX = useSpring(cardXRaw, springFlight);
  const cardRotateY = useSpring(cardRotateYRaw, springFlight);
  const cardRotateZ = useSpring(cardRotateZRaw, springFlight);
  const cardScale = useSpring(cardScaleRaw, springFlight);

  const principles = [
    {
      number: '01',
      title: isEs ? 'Arquitectura por Encima de la Improvisación' : 'Architecture Over Improvisation',
      desc: isEs
        ? 'Cada proyecto comienza con el diseño del esquema de datos, el flujo de autenticación y la selección tecnológica adecuada. No escribo código sin entender primero el dominio del problema.'
        : 'Every build begins with data schema modeling, authentication flows, and tailored tech selection. Code is engineered after thoroughly mastering the problem domain.'
    },
    {
      number: '02',
      title: isEs ? 'Calidad, Tipado Estricto & Testing' : 'Quality Assurance, Typing & Testing',
      desc: isEs
        ? 'Formado en la UNSTA con énfasis en QA, aplico validación de datos en capas (Zod/Joi), manejo centralizado de excepciones y pruebas para garantizar estabilidad continua en producción.'
        : 'Educated at UNSTA with QA emphasis, I implement layered data validation (Zod/Joi), centralized error handling, and testing strategies to ensure uninterrupted production uptime.'
    },
    {
      number: '03',
      title: isEs ? 'Código Limpio & Mantenible' : 'Clean, Maintainable Codebase',
      desc: isEs
        ? 'Estructura modular, separación clara de responsabilidades (controladores, servicios, modelos) y documentación precisa. Código que cualquier otro desarrollador puede leer, auditar y escalar.'
        : 'Modular component architecture, clean separation of concerns (controllers, services, repositories), and precise technical documentation that scales effortlessly.'
    },
    {
      number: '04',
      title: isEs ? 'Rendimiento y Seguridad como Prioridad' : 'Performance & Security by Default',
      desc: isEs
        ? 'Consultas SQL indexadas, paginación en base de datos, protección contra inyecciones SQL/NoSQL, cabeceras seguras (Helmet), CORS restrictivo y optimización de activos para Core Web Vitals.'
        : 'Indexed database queries, cursor pagination, SQL/NoSQL injection prevention, security headers (Helmet), restrictive CORS, and Core Web Vitals optimization.'
    }
  ];

  return (
    <div className="w-full min-h-screen pt-28 sm:pt-32 pb-28 text-slate-900 dark:text-[#f5f7fa] transition-colors duration-300 relative">
      <div ref={containerRef} className="w-full max-w-[1240px] mx-auto px-4 sm:px-6 relative">
        <div ref={innerBoundsRef} className="relative w-full">
          {/* Desktop Orchestrated 3D Dossier Card Companion Track */}
          <div className="hidden lg:block absolute top-0 right-0 h-full pointer-events-none z-30">
            <div className="sticky top-[104px] pointer-events-auto">
              <motion.div
                ref={cardRef}
                style={{
                  x: cardX,
                  rotateY: cardRotateY,
                  rotateZ: cardRotateZ,
                  scale: cardScale
                }}
                className="w-[360px] xl:w-[380px]"
              >
                <Dossier3DCard isEs={isEs} />
              </motion.div>
            </div>
          </div>

          {/* Section 1: Hero Narrative (Left Column on Desktop) */}
          <section className="mb-24 lg:mb-32 pt-2">
            <div className="flex items-center gap-3.5 mb-5 flex-wrap">
              <span className="font-mono text-xs font-bold tracking-widest text-blue-600 dark:text-[#3b82f6] whitespace-nowrap">
                {isEs ? 'PERFIL PROFESIONAL' : 'PROFESSIONAL PROFILE'}
              </span>
              <span className="w-7 h-px bg-blue-500/40" />
              <span className="font-mono text-[0.7rem] text-slate-500 dark:text-slate-400 tracking-wider whitespace-nowrap">
                {isEs ? 'INGENIERO DE SOFTWARE • UNSTA' : 'SOFTWARE ENGINEER • UNSTA'}
              </span>
            </div>

            <div className="w-full lg:max-w-[calc(100%-410px)] xl:max-w-[calc(100%-430px)]">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.12] tracking-tight text-slate-900 dark:text-white mb-3">
                Lautaro Leal <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 dark:from-blue-400 dark:via-blue-500 dark:to-sky-300 bg-clip-text text-transparent">Del Prete</span>
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
            </div>

            {/* Mobile / Tablet 3D Dossier Card Flow */}
            <div className="lg:hidden mt-10">
              <Dossier3DCard isEs={isEs} />
            </div>
          </section>

          {/* Section 2: Filosofía de Trabajo (Right Column on Desktop, card docked on Left) */}
          <section className="border-t border-slate-200 dark:border-white/[0.08] pt-16 mb-20">
            <div className="w-full lg:max-w-[calc(100%-410px)] xl:max-w-[calc(100%-430px)] lg:ml-auto">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="mb-12"
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

              <div className="flex flex-col">
                {principles.map((pr, idx) => (
                  <motion.div
                    key={pr.number}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.45, delay: idx * 0.08 }}
                    className="group grid grid-cols-1 md:grid-cols-[80px_1fr] items-start gap-4 md:gap-8 py-8 px-4 sm:px-6 border-b border-slate-200 dark:border-white/[0.06] last:border-b-0 hover:bg-slate-50 dark:hover:bg-blue-500/[0.03] hover:pl-8 transition-all duration-200 rounded-xl"
                  >
                    <span className="font-mono text-2xl font-extrabold text-slate-300 dark:text-slate-500/40 group-hover:text-blue-600 dark:group-hover:text-[#3b82f6] transition-colors duration-200 shrink-0">
                      {pr.number}
                    </span>
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-2">{pr.title}</h3>
                      <p className="text-sm sm:text-base leading-relaxed text-slate-600 dark:text-slate-300 max-w-3xl m-0">{pr.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
