import { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Code2,
  Layers,
  ShieldCheck
} from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { projectList, techIcons } from '../data/projectsData';
import HeroCode3DCanvas from '../components/ui/HeroCode3DCanvas';
import ProjectSandbox from '../components/projects/ProjectSandbox';
import { useLanguage } from '../hooks/useLanguage';

export default function ProjectDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { language, t } = useLanguage();
  const isEs = language === 'es';

  // Find project by slug or id
  const projectIndex = projectList.findIndex(
    (p) => p.slug === slug || p.id === slug
  );
  const project = projectList[projectIndex];

  // Previous & Next navigation
  const prevProject =
    projectIndex > 0 ? projectList[projectIndex - 1] : projectList[projectList.length - 1];
  const nextProject =
    projectIndex < projectList.length - 1 ? projectList[projectIndex + 1] : projectList[0];

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    if (window.__lenis) {
      window.__lenis.scrollTo(0, { immediate: true });
    }
  }, [slug]);

  if (!project) {
    return (
      <div className="w-full min-h-[70vh] flex flex-col items-center justify-center pt-32 pb-20 px-6 text-center">
        <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-3">
          {isEs ? 'Proyecto no encontrado' : 'Project Not Found'}
        </h2>
        <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-md">
          {isEs
            ? 'El caso de estudio solicitado no existe o ha sido reubicado.'
            : 'The requested case study does not exist or has been relocated.'}
        </p>
        <Link
          to="/proyectos"
          className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-all duration-200 select-none whitespace-nowrap shadow-md"
        >
          <ArrowLeft size={18} /> {isEs ? 'Volver a Proyectos' : 'Back to Projects'}
        </Link>
      </div>
    );
  }

  const projectFeatures = t(project.featuresKey) || [];
  const projectLongDesc = t(project.longDescKey) || t(project.descriptionKey);
  const hostingProvider = project.demo?.includes('netlify.app')
    ? 'Netlify Edge Network'
    : project.demo?.includes('github.io')
      ? 'GitHub Pages CDN'
      : 'Vercel Edge Network';

  return (
    <div className="relative w-full pt-0 pb-24 text-slate-900 dark:text-slate-100 transition-colors duration-300 overflow-x-hidden">
      {/* Dedicated Project Header Navigation (Sticky Top-0) */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
        className="sticky top-0 z-40 w-full border-b border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-[#020A15]/90 backdrop-blur-xl mb-8 sm:mb-10 transition-colors shadow-2xs"
      >
        <div className="w-full max-w-[1240px] mx-auto px-4 sm:px-6 py-3 sm:py-3.5 flex items-center justify-between gap-3 sm:gap-4">
          {/* Back button */}
          <button
            onClick={() => navigate('/proyectos')}
            className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-1.5 sm:py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800/80 dark:hover:bg-slate-700/80 border border-slate-200 dark:border-slate-700/80 text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white text-xs sm:text-sm font-semibold rounded-xl transition-all cursor-pointer select-none whitespace-nowrap shadow-2xs hover:-translate-x-0.5"
            data-cursor="pointer"
          >
            <ArrowLeft size={16} />
            <span>{isEs ? 'Volver a Proyectos' : 'Back to Projects'}</span>
          </button>

          {/* Center info */}
          <div className="flex items-center gap-2 font-mono text-xs sm:text-sm font-bold text-slate-500 dark:text-slate-400 whitespace-nowrap">
            <span className="text-[10px] sm:text-xs tracking-wider uppercase opacity-75">{isEs ? 'CASO' : 'CASE'}</span>
            <span className="text-blue-600 dark:text-cyan-400">{String(projectIndex + 1).padStart(2, '0')}</span>
            <span>/</span>
            <span>{String(projectList.length).padStart(2, '0')}</span>
          </div>

          {/* Right paging & Live link */}
          <div className="flex items-center gap-2">
            <Link
              to={`/proyectos/${prevProject.slug}`}
              className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800/80 dark:hover:bg-slate-700/80 border border-slate-200 dark:border-slate-700/80 rounded-xl text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white text-xs font-semibold transition-all whitespace-nowrap select-none shadow-2xs"
              title={`${isEs ? 'Anterior' : 'Prev'}: ${prevProject.title}`}
              data-cursor="pointer"
            >
              <ArrowLeft size={14} />
              <span className="hidden sm:inline">{isEs ? 'Ant' : 'Prev'}</span>
            </Link>

            <Link
              to={`/proyectos/${nextProject.slug}`}
              className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800/80 dark:hover:bg-slate-700/80 border border-slate-200 dark:border-slate-700/80 rounded-xl text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white text-xs font-semibold transition-all whitespace-nowrap select-none shadow-2xs"
              title={`${isEs ? 'Siguiente' : 'Next'}: ${nextProject.title}`}
              data-cursor="pointer"
            >
              <span className="hidden sm:inline">{isEs ? 'Sig' : 'Next'}</span>
              <ArrowRight size={14} />
            </Link>

            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 text-white text-xs font-semibold transition-all whitespace-nowrap select-none shadow-sm shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5"
              data-cursor="pointer"
            >
              <span>{isEs ? 'Sitio Live' : 'Live Site'}</span>
              <ExternalLink size={13} />
            </a>
          </div>
        </div>
      </motion.header>

      {/* Hero Header Section */}
      <section className="mb-12">
        <div className="w-full max-w-[1240px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] xl:grid-cols-[1fr_340px] gap-8 items-center">
            <div className="max-w-3xl">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.12] mb-4"
              >
                {project.title}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.15 }}
                className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed mb-8 font-normal"
              >
                {t(project.descriptionKey)}
              </motion.p>

              {/* Action CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="flex items-center gap-4 flex-wrap"
              >
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-semibold transition-all duration-200 shadow-lg shadow-blue-500/25 hover:-translate-y-0.5 whitespace-nowrap select-none"
                  data-cursor="pointer"
                >
                  <ExternalLink size={17} />
                  <span>{isEs ? 'Visitar Sitio Oficial' : 'Visit Live Website'}</span>
                </a>

                {project.code && (
                  <a
                    href={project.code}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-3.5 bg-white dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-white rounded-xl text-sm font-medium transition-all duration-200 whitespace-nowrap select-none shadow-sm hover:-translate-y-0.5"
                    data-cursor="pointer"
                  >
                    <FaGithub size={17} />
                    <span>Frontend Repo</span>
                  </a>
                )}

                {project.codeBack && (
                  <a
                    href={project.codeBack}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-3.5 bg-white dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-white rounded-xl text-sm font-medium transition-all duration-200 whitespace-nowrap select-none shadow-sm hover:-translate-y-0.5"
                    data-cursor="pointer"
                  >
                    <Code2 size={17} />
                    <span>Backend API Repo</span>
                  </a>
                )}
              </motion.div>
            </div>

            {/* 3D Minimalist Code Architecture Canvas */}
            <div className="hidden lg:flex items-center justify-center relative w-full h-[240px] xl:h-[280px]">
              <HeroCode3DCanvas />
            </div>
          </div>
        </div>
      </section>

      {/* Main Interactive Sandbox / Snapshot Viewport */}
      <ProjectSandbox project={project} isEs={isEs} />

      {/* Engineering Deep Dive Case Study */}
      <section className="mb-20">
        <div className="w-full max-w-[1240px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-12 items-start">
            {/* Left Column: Architectural Dossier */}
            <div className="flex flex-col gap-10">
              <div className="p-6 sm:p-8 bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 rounded-2xl shadow-md dark:shadow-xl">
                <div className="flex items-center gap-3.5 mb-5 pb-4 border-b border-slate-200 dark:border-white/[0.08]">
                  <span className="font-mono text-xl font-bold text-blue-600 dark:text-[#3b82f6]">01</span>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white m-0">
                    {isEs ? 'Arquitectura & Solución de Ingeniería' : 'Architecture & Engineering Solution'}
                  </h2>
                </div>
                <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed m-0 font-normal">{projectLongDesc}</p>
              </div>

              {projectFeatures && projectFeatures.length > 0 && (
                <div className="p-6 sm:p-8 bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 rounded-2xl shadow-md dark:shadow-xl">
                  <div className="flex items-center gap-3.5 mb-5 pb-4 border-b border-slate-200 dark:border-white/[0.08]">
                    <span className="font-mono text-xl font-bold text-blue-600 dark:text-[#3b82f6]">02</span>
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white m-0">
                      {isEs ? 'Puntos Críticos & Características Clave' : 'Critical Points & Key Features'}
                    </h2>
                  </div>
                  <ul className="flex flex-col gap-4 list-none p-0 m-0">
                    {projectFeatures.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-3.5">
                        <div className="w-6 h-6 rounded-md bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/30 flex items-center justify-center text-blue-600 dark:text-[#3b82f6] shrink-0 mt-0.5">
                          <ShieldCheck size={14} />
                        </div>
                        <span className="text-[0.95rem] text-slate-600 dark:text-slate-300 leading-relaxed">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Right Column: Stack & Metadata */}
            <aside className="lg:sticky lg:top-[76px]">
              <div className="p-7 bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 rounded-2xl shadow-md dark:shadow-xl">
                <div className="flex items-center gap-2.5 mb-5 pb-4 border-b border-slate-200 dark:border-white/[0.08] text-slate-900 dark:text-white">
                  <Layers size={18} className="text-blue-600 dark:text-[#3b82f6]" />
                  <h2 className="text-base font-bold m-0">{isEs ? 'Stack de Tecnologías' : 'Technology Stack'}</h2>
                </div>

                <div className="flex flex-wrap gap-2 mb-8">
                  {project.techs.map((tName, i) => (
                    <div
                      key={i}
                      className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-100 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 rounded-lg text-xs font-medium text-slate-800 dark:text-slate-200 whitespace-nowrap"
                    >
                      <span className="text-blue-600 dark:text-[#3b82f6]">{techIcons[tName] || <Code2 size={14} />}</span>
                      <span>{tName}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col gap-3.5 pt-4 border-t border-slate-200 dark:border-white/[0.08]">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-500 dark:text-slate-400 whitespace-nowrap">{isEs ? 'Desarrollador:' : 'Developer:'}</span>
                    <span className="text-slate-900 dark:text-white font-medium whitespace-nowrap">Lautaro Leal Del Prete</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-500 dark:text-slate-400 whitespace-nowrap">{isEs ? 'Categoría:' : 'Category:'}</span>
                    <span className="text-slate-900 dark:text-white font-medium whitespace-nowrap">{project.category}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-500 dark:text-slate-400 whitespace-nowrap">Hosting &amp; CDN:</span>
                    <span className="text-slate-900 dark:text-white font-medium whitespace-nowrap">{hostingProvider}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-500 dark:text-slate-400 whitespace-nowrap">{isEs ? 'Licencia:' : 'License:'}</span>
                    <span className="text-slate-900 dark:text-white font-medium whitespace-nowrap">MIT / Proprietary</span>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Bottom Paging Strip */}
      <section className="pt-8 border-t border-slate-200 dark:border-white/[0.08]">
        <div className="w-full max-w-[1240px] mx-auto px-4 sm:px-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            to={`/proyectos/${prevProject.slug}`}
            className="group p-6 bg-white dark:bg-white/[0.02] hover:bg-slate-50 dark:hover:bg-white/[0.05] border border-slate-200 dark:border-white/10 hover:border-blue-400 dark:hover:border-blue-500/40 rounded-xl transition-all duration-200 shadow-sm"
            data-cursor="pointer"
          >
            <div className="flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400 group-hover:text-blue-600 dark:group-hover:text-[#3b82f6] mb-1.5 transition-colors whitespace-nowrap">
              <ArrowLeft size={14} />
              <span>{isEs ? 'Proyecto Anterior' : 'Previous Project'}</span>
            </div>
            <h4 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors m-0">
              {prevProject.title}
            </h4>
          </Link>

          <Link
            to={`/proyectos/${nextProject.slug}`}
            className="group p-6 bg-white dark:bg-white/[0.02] hover:bg-slate-50 dark:hover:bg-white/[0.05] border border-slate-200 dark:border-white/10 hover:border-blue-400 dark:hover:border-blue-500/40 rounded-xl transition-all duration-200 text-left sm:text-right shadow-sm"
            data-cursor="pointer"
          >
            <div className="flex items-center sm:justify-end gap-2 text-xs font-mono text-slate-500 dark:text-slate-400 group-hover:text-blue-600 dark:group-hover:text-[#3b82f6] mb-1.5 transition-colors whitespace-nowrap">
              <span>{isEs ? 'Siguiente Proyecto' : 'Next Project'}</span>
              <ArrowRight size={14} />
            </div>
            <h4 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors m-0">
              {nextProject.title}
            </h4>
          </Link>
        </div>
      </section>
    </div>
  );
}
