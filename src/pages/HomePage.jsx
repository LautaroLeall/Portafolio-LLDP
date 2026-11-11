import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  ArrowUpRight,
  Briefcase,
  MapPin,
  ExternalLink,
  Code2,
  Terminal,
  Layers,
  ChevronDown
} from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import HeroCode3DCanvas from '../components/ui/HeroCode3DCanvas';
import AuroraMeshBackground from '../components/ui/AuroraMeshBackground';
import { projectList } from '../data/projectsData';
import { buildWhatsAppUrl } from '../data/servicesData';
import { useLanguage } from '../hooks/useLanguage';

const heroContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1
    }
  }
};

const heroItemVariants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

export default function HomePage() {
  const { language } = useLanguage();
  const isEs = language === 'es';
  const featuredProjects = projectList.slice(0, 4);

  return (
    <div className="w-full min-h-screen pb-24 text-slate-900 dark:text-slate-100 transition-colors duration-300 relative overflow-x-hidden">
      {/* Background Ambience */}
      <AuroraMeshBackground />

      {/* 1. Hero Section: 100dvh Dynamic Full Viewport across All Devices */}
      <section className="relative z-10 min-h-[100dvh] w-full flex flex-col justify-between pt-24 sm:pt-28 lg:pt-32 pb-6 sm:pb-8">
        <div className="w-full max-w-[1240px] mx-auto px-4 sm:px-6 my-auto flex-1 flex flex-col justify-center">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center py-4 sm:py-6">
            {/* Left Column: Natural Authoritative Text */}
            <motion.div
              variants={heroContainerVariants}
              initial="hidden"
              animate="visible"
              className="lg:col-span-7 flex flex-col gap-5 sm:gap-6"
            >
              {/* Role badge */}
              <motion.div
                variants={heroItemVariants}
                className="inline-flex items-center gap-2 self-start px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-mono text-blue-600 dark:text-cyan-400"
              >
                <Terminal size={15} className="shrink-0 text-blue-600 dark:text-cyan-400" />
                <span className="font-semibold">
                  {isEs
                    ? 'Desarrollador Full Stack & Software Engineer'
                    : 'Full Stack Developer & Software Engineer'}
                </span>
              </motion.div>

              {/* Main Headline */}
              <motion.h1
                variants={heroItemVariants}
                className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.12]"
              >
                Lautaro Leal <br />
                <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 dark:from-blue-400 dark:via-blue-500 dark:to-sky-300 bg-clip-text text-transparent">
                  Del Prete
                </span>
              </motion.h1>

              {/* Natural Human Bio */}
              <motion.p
                variants={heroItemVariants}
                className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal max-w-2xl"
              >
                {isEs ? (
                  <>
                    Construyo aplicaciones web completas, arquitecturas de software robustas y sistemas
                    en producción con <strong className="text-slate-900 dark:text-white font-semibold">React 19, Node.js, Express, PostgreSQL y MongoDB</strong>.
                    Graduado de <strong className="text-slate-900 dark:text-white font-semibold">UNSTA</strong> con foco en código limpio, seguridad y alto rendimiento.
                  </>
                ) : (
                  <>
                    I build full-scale web applications, robust software architectures, and production
                    systems with <strong className="text-slate-900 dark:text-white font-semibold">React 19, Node.js, Express, PostgreSQL, and MongoDB</strong>.
                    <strong className="text-slate-900 dark:text-white font-semibold"> UNSTA</strong> graduate focused on clean code, data security, and high performance.
                  </>
                )}
              </motion.p>

              {/* Direct CTAs */}
              <motion.div
                variants={heroItemVariants}
                className="flex flex-wrap items-center gap-3.5 pt-1"
              >
                <Link
                  to="/proyectos"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-semibold text-sm bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5 transition-all select-none whitespace-nowrap"
                  data-cursor="pointer"
                >
                  <span>{isEs ? 'Explorar Proyectos Live' : 'Explore Live Projects'}</span>
                  <ArrowRight size={17} />
                </Link>

                <Link
                  to="/servicios"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-semibold text-sm bg-white dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-700/80 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700/80 shadow-xs hover:-translate-y-0.5 transition-all select-none whitespace-nowrap"
                  data-cursor="pointer"
                >
                  <Briefcase size={16} />
                  <span>{isEs ? 'Servicios & Cotizador' : 'Services & Quoter'}</span>
                </Link>
              </motion.div>

              {/* Quick Tech Terminal Tags */}
              <motion.div
                variants={heroItemVariants}
                className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-4 border-t border-slate-200 dark:border-slate-800/80 text-xs sm:text-sm font-mono text-slate-600 dark:text-slate-400"
              >
                <div className="inline-flex items-center gap-2 whitespace-nowrap">
                  <MapPin size={14} className="text-blue-500 dark:text-blue-400 shrink-0" />
                  <span>{isEs ? 'Tucumán, Argentina • Remoto' : 'Tucumán, Argentina • Remote'}</span>
                </div>
                <div className="inline-flex items-center gap-2 whitespace-nowrap">
                  <Code2 size={14} className="text-blue-600 dark:text-cyan-400 shrink-0" />
                  <span>{isEs ? 'UNSTA Grado Universitario' : 'UNSTA University Degree'}</span>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Column: Interactive 3D Canvas */}
            <motion.div
              initial={{ opacity: 0, scale: 0.88 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.85, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-5 flex justify-center items-center relative w-full h-[220px] sm:h-[300px] md:h-[360px] lg:h-[460px] xl:h-[500px]"
            >
              {/* Soft decorative radial glow behind the 3D element */}
              <div className="absolute inset-4 sm:inset-8 rounded-full bg-gradient-to-tr from-blue-500/10 via-indigo-500/10 to-transparent blur-3xl pointer-events-none" />
              <div className="w-full h-full relative">
                <HeroCode3DCanvas />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Scroll Cue Indicator */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="w-full flex flex-col items-center justify-center pt-2 pb-1"
        >
          <button
            onClick={() => {
              if (window.__lenis) {
                window.__lenis.scrollTo('#trabajo-seleccionado', { duration: 1.0 });
              } else {
                const target = document.getElementById('trabajo-seleccionado');
                if (target) {
                  target.scrollIntoView({ behavior: 'smooth' });
                }
              }
            }}
            className="group inline-flex flex-col items-center gap-1 text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors focus:outline-none select-none cursor-pointer py-1"
            aria-label={isEs ? 'Desplazarse a proyectos destacados' : 'Scroll to featured projects'}
          >
            <span className="font-mono text-[10px] sm:text-xs font-semibold tracking-widest uppercase opacity-75 group-hover:opacity-100 transition-opacity">
              {isEs ? 'Explorar' : 'Explore'}
            </span>
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            >
              <ChevronDown size={18} className="text-blue-500 dark:text-blue-400 group-hover:translate-y-0.5 transition-transform" />
            </motion.div>
          </button>
        </motion.div>
      </section>

      {/* 2. Editorial Engineering Showcase */}
      <section id="trabajo-seleccionado" className="py-16 sm:py-20 border-t border-slate-200 dark:border-slate-800/60 relative z-10 scroll-mt-20">
        <div className="w-full max-w-[1240px] mx-auto px-4 sm:px-6">
          <div className="mb-10 flex flex-col gap-3">
            <div className="flex items-center gap-3.5 mb-2 flex-wrap">
              <span className="font-mono text-xs font-bold tracking-widest text-blue-600 dark:text-[#3b82f6] whitespace-nowrap">
                {isEs ? 'TRABAJO SELECCIONADO' : 'SELECTED WORK'}
              </span>
              <span className="w-7 h-px bg-blue-500/40" />
              <span className="font-mono text-[0.7rem] text-slate-500 dark:text-slate-400 tracking-wider whitespace-nowrap">
                {isEs ? 'CASOS DE ESTUDIO VERIFICABLES' : 'VERIFIABLE CASE STUDIES'}
              </span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                {isEs ? 'Desarrollos Recientes en ' : 'Recent Deployments in '}
                <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 dark:from-blue-400 dark:via-blue-500 dark:to-sky-300 bg-clip-text text-transparent">
                  {isEs ? 'Producción' : 'Production'}
                </span>
              </h2>
              <Link
                to="/proyectos"
                className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 dark:text-cyan-400 hover:text-blue-700 dark:hover:text-cyan-300 transition-colors whitespace-nowrap"
                data-cursor="pointer"
              >
                <span>{isEs ? 'Ver los 11 Proyectos' : 'View all 11 Projects'}</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          {/* Interactive Project Rows */}
          <div className="flex flex-col divide-y divide-slate-200 dark:divide-slate-800/60 border-y border-slate-200 dark:border-slate-800/60">
            {featuredProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="py-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-100/70 dark:hover:bg-slate-900/40 px-4 -mx-4 rounded-xl transition-colors group"
              >
                <div className="flex items-center gap-4 sm:gap-6 min-w-0">
                  <span className="font-mono text-sm font-bold text-slate-400 dark:text-slate-500 shrink-0">
                    0{idx + 1}
                  </span>
                  <div className="flex flex-col min-w-0">
                    <Link
                      to={`/proyectos/${project.slug}`}
                      className="inline-flex items-center gap-2 text-lg sm:text-xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors"
                      data-cursor="view"
                    >
                      <span className="truncate">{project.title}</span>
                      <ArrowUpRight size={18} className="opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all text-blue-600 dark:text-cyan-400 shrink-0" />
                    </Link>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 truncate">{project.title} • {project.category}</p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 shrink-0">
                  {project.techs.slice(0, 4).map((tech, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-xs px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60 text-slate-700 dark:text-slate-300 font-mono whitespace-nowrap"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <Link
                    to={`/proyectos/${project.slug}`}
                    className="text-xs font-semibold px-3.5 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-600/10 hover:bg-blue-100 dark:hover:bg-blue-600/25 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-500/30 transition-all select-none whitespace-nowrap"
                    data-cursor="view"
                  >
                    <span>{isEs ? 'Caso de Estudio' : 'Case Study'}</span>
                  </Link>
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full flex items-center justify-center bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-all select-none"
                    title={isEs ? 'Sitio Oficial' : 'Official Website'}
                    aria-label={isEs ? `Sitio oficial de ${project.title}` : `Official website of ${project.title}`}
                    data-cursor="link"
                  >
                    <ExternalLink size={15} />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Engineering Pillars & Architecture */}
      <section className="py-16 sm:py-20 border-t border-slate-200 dark:border-slate-800/60 relative z-10">
        <div className="w-full max-w-[1240px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-7 flex flex-col gap-4">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-blue-600 dark:text-[#3b82f6]">
                {isEs ? 'METODOLOGÍA DE INGENIERÍA' : 'ENGINEERING METHODOLOGY'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                {isEs
                  ? 'Arquitectura Limpia, Velocidad & Seguridad de Datos'
                  : 'Clean Architecture, Speed & Data Security'}
              </h2>
              <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed">
                {isEs
                  ? 'Cada desarrollo se aborda desde el análisis de requerimientos, la selección óptima de bases de datos (SQL / NoSQL), la autenticación segura (JWT en httpOnly, OAuth 2.0) y la optimización crítica del rendimiento de carga.'
                  : 'Every software build begins with requirements analysis, optimal database selection (SQL / NoSQL), secure auth (httpOnly JWT, OAuth 2.0), and rigorous Core Web Vitals optimization.'}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-slate-200 dark:border-slate-800/80">
                <div className="flex flex-col gap-1 p-3.5 rounded-xl bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 shadow-sm dark:shadow-none">
                  <span className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 dark:from-blue-400 dark:via-blue-500 dark:to-sky-300 font-mono">
                    100%
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    {isEs ? 'Código Verificable en GitHub' : 'Verifiable GitHub Code'}
                  </span>
                </div>
                <div className="flex flex-col gap-1 p-3.5 rounded-xl bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 shadow-sm dark:shadow-none">
                  <span className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 dark:from-blue-400 dark:via-blue-500 dark:to-sky-300 font-mono">
                    &lt; 1.2s
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    {isEs ? 'Tiempo de Carga Promedio' : 'Average Page Load Time'}
                  </span>
                </div>
                <div className="flex flex-col gap-1 p-3.5 rounded-xl bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 shadow-sm dark:shadow-none">
                  <span className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 dark:from-blue-400 dark:via-blue-500 dark:to-sky-300 font-mono">
                    UNSTA
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    {isEs ? 'Formación Universitaria en Calidad' : 'University QA Education'}
                  </span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col gap-4">
              <div className="p-6 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 shadow-sm dark:shadow-none transition-all flex flex-col gap-3 group">
                <div className="flex items-center gap-2.5 text-slate-900 dark:text-white font-bold text-base">
                  <Layers size={20} className="text-blue-500 dark:text-blue-400 shrink-0" />
                  <h3 className="m-0 text-base font-bold text-slate-900 dark:text-white">{isEs ? 'Plataforma de Servicios Web' : 'Web Services Platform'}</h3>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed m-0">
                  {isEs
                    ? 'Cotizador interactivo multi-paso con mockups interactivos de software y presupuesto directo.'
                    : 'Interactive multi-step project quoter with live interactive software mockups and direct WhatsApp brief.'}
                </p>
                <Link to="/servicios" className="inline-flex items-center gap-2 text-xs font-bold text-blue-600 dark:text-cyan-400 group-hover:text-blue-700 dark:group-hover:text-cyan-300 transition-colors pt-2 select-none" data-cursor="pointer">
                  <span>{isEs ? 'Conocer Servicios' : 'Explore Services'}</span>
                  <ArrowRight size={16} />
                </Link>
              </div>

              <div className="p-6 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 shadow-sm dark:shadow-none transition-all flex flex-col gap-3 group">
                <div className="flex items-center gap-2.5 text-slate-900 dark:text-white font-bold text-base">
                  <Terminal size={20} className="text-blue-500 dark:text-blue-400 shrink-0" />
                  <h3 className="m-0 text-base font-bold text-slate-900 dark:text-white">{isEs ? 'Stack Tecnológico & QA' : 'Tech Stack & QA'}</h3>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed m-0">
                  {isEs
                    ? 'Desglose técnico de dominios: Frontend Architecture, Backend & Data Systems, Testing y Workflow.'
                    : 'Technical domain breakdown: Frontend Architecture, Backend & Data Systems, Automated Testing, and Workflow.'}
                </p>
                <Link to="/habilidades" className="inline-flex items-center gap-2 text-xs font-bold text-blue-600 dark:text-cyan-400 group-hover:text-blue-700 dark:group-hover:text-cyan-300 transition-colors pt-2 select-none" data-cursor="pointer">
                  <span>{isEs ? 'Ver Habilidades Técnicas' : 'View Technical Skills'}</span>
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Direct Contact Callout */}
      <section className="py-16 sm:py-20 border-t border-slate-200 dark:border-slate-800/60 relative z-10">
        <div className="w-full max-w-[1240px] mx-auto px-4 sm:px-6">
          <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-blue-50 to-indigo-50/50 dark:from-slate-900/90 dark:to-blue-950/40 border border-blue-200/60 dark:border-cyan-500/20 shadow-lg dark:shadow-2xl flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="flex flex-col gap-3 max-w-xl">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-blue-600 dark:text-[#3b82f6]">
                {isEs ? 'INICIEMOS UNA CONVERSACIÓN' : 'START A CONVERSATION'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                {isEs ? '¿Tienes un proyecto o desafío técnico en mente?' : 'Have a project or technical challenge in mind?'}
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 m-0">
                {isEs
                  ? 'Estoy disponible para posiciones Full Stack, desarrollo a medida y consultoría técnica.'
                  : 'Available for Full Stack roles, bespoke software development, and technical consulting.'}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <a
                href={buildWhatsAppUrl(
                  isEs
                    ? 'Hola Lautaro, vi tu sitio lautarolealdev.com y me gustaría conversar.'
                    : 'Hi Lautaro, I saw your site lautarolealdev.com and would like to talk.'
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-bold text-sm bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/30 transition-all select-none whitespace-nowrap hover:-translate-y-0.5"
                data-cursor="pointer"
              >
                <FaWhatsapp size={20} />
                <span>{isEs ? 'Contactar por WhatsApp' : 'Chat via WhatsApp'}</span>
              </a>

              <Link
                to="/contacto"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-semibold text-sm bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-900 dark:text-slate-200 border border-slate-200 dark:border-slate-700 shadow-sm transition-all select-none whitespace-nowrap hover:-translate-y-0.5"
                data-cursor="pointer"
              >
                <span>{isEs ? 'Formulario Directo' : 'Direct Contact Form'}</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
