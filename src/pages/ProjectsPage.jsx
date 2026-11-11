import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, ArrowUpRight, ExternalLink, Code2, Filter } from 'lucide-react';
import { projectList, techIcons } from '../data/projectsData';
import PagesHero3D from '../components/ui/PagesHero3D';
import { useLanguage } from '../hooks/useLanguage';

export default function ProjectsPage() {
  const { t, language } = useLanguage();
  const isEs = language === 'es';

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [hoveredProjectId, setHoveredProjectId] = useState(null);

  const categories = [
    { id: 'All', label: isEs ? 'Todos' : 'All' },
    { id: 'Full Stack', label: 'Full Stack' },
    { id: 'Landing', label: isEs ? 'Landing' : 'Landing' }
  ];

  const filteredProjects = useMemo(() => {
    return projectList.filter((project) => {
      const matchesCategory =
        selectedCategory === 'All' || project.category === selectedCategory;
      const matchesSearch =
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.techs.some((tech) =>
          tech.toLowerCase().includes(searchTerm.toLowerCase())
        );
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchTerm]);

  return (
    <div className="w-full min-h-screen pt-28 sm:pt-32 pb-28 text-slate-900 dark:text-slate-100 transition-colors duration-300 relative overflow-x-hidden">
      {/* 1. Header Section */}
      <section className="mb-14 sm:mb-16">
        <div className="w-full max-w-[1240px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] xl:grid-cols-[1fr_340px] gap-8 items-center">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3.5 mb-5 flex-wrap">
                <span className="font-mono text-xs font-bold tracking-widest text-blue-600 dark:text-[#3b82f6] whitespace-nowrap">
                  {isEs ? 'INGENIERÍA DE SOFTWARE' : 'SOFTWARE ENGINEERING'}
                </span>
                <span className="w-7 h-px bg-blue-500/40" />
                <span className="font-mono text-[0.7rem] text-slate-500 dark:text-slate-400 tracking-wider whitespace-nowrap">
                  {projectList.length} {isEs ? 'PROYECTOS VERIFICABLES' : 'VERIFIABLE DEPLOYMENTS'}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight text-slate-900 dark:text-white mb-5">
                {isEs ? (
                  <>Proyectos, Arquitecturas &amp; <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 dark:from-blue-400 dark:via-blue-500 dark:to-sky-300 bg-clip-text text-transparent">Casos de Estudio</span></>
                ) : (
                  <>Projects, Architectures &amp; <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 dark:from-blue-400 dark:via-blue-500 dark:to-sky-300 bg-clip-text text-transparent">Case Studies</span></>
                )}
              </h1>

              <p className="text-base sm:text-lg leading-relaxed text-slate-600 dark:text-slate-300 font-normal">
                {isEs
                  ? 'Sistemas web completos en producción, aplicaciones full stack con pasarelas de pago, chats en tiempo real por WebSockets y plataformas de alto rendimiento. Haz clic en cualquier proyecto para abrir su caso de estudio y sandbox en vivo.'
                  : 'Production web platforms, full stack applications with integrated payment gateways, real-time WebSocket messaging, and high-performance landing pages. Click on any project to view its case study and live sandbox.'}
              </p>
            </div>

            {/* 3D Cyber Artifact Header */}
            <div className="hidden lg:flex items-center justify-center relative w-full h-[240px] xl:h-[280px]">
              <PagesHero3D />
            </div>
          </div>

          {/* Interactive Filter & Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-2 bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-white/10 rounded-2xl mt-8 backdrop-blur-xl shadow-md dark:shadow-xl"
          >
            {/* Filter buttons - Segmented & Responsive without horizontal scrollbars */}
            <div className="w-full md:w-auto flex items-center gap-1 sm:gap-1.5 p-1 bg-slate-100/70 dark:bg-slate-950/50 rounded-xl">
              <div className="hidden sm:flex items-center text-slate-400 pl-2 pr-1 shrink-0">
                <Filter size={14} />
              </div>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`inline-flex items-center justify-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-1.5 rounded-lg text-xs transition-all cursor-pointer select-none whitespace-nowrap flex-1 sm:flex-initial ${selectedCategory === cat.id
                    ? 'bg-blue-600 text-white font-semibold shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-white/5'
                    }`}
                  data-cursor="pointer"
                >
                  <span className="truncate">{cat.label}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono ${selectedCategory === cat.id ? 'bg-white/20' : 'bg-slate-200/80 dark:bg-white/10'
                    }`}>
                    {cat.id === 'All'
                      ? projectList.length
                      : projectList.filter((p) => p.category === cat.id).length}
                  </span>
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder={isEs ? 'Buscar por tecnología (React, Node, Socket.io...)' : 'Search by technology (React, Node, Socket.io...)'}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                aria-label={isEs ? 'Buscar proyectos' : 'Search projects'}
                className="w-full pl-9 pr-8 py-2 rounded-xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-xs focus:outline-none focus:border-blue-500 dark:focus:border-cyan-400 transition-all"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-900 dark:hover:text-white text-base leading-none cursor-pointer"
                  title={isEs ? 'Limpiar búsqueda' : 'Clear search'}
                >
                  ×
                </button>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Editorial Projects Matrix */}
      <section>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col divide-y divide-slate-200 dark:divide-slate-800/80 border-y border-slate-200 dark:border-slate-800/80">
            {filteredProjects.map((project, index) => {
              const isHovered = hoveredProjectId === project.id;
              const formattedIndex = String(index + 1).padStart(2, '0');

              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.4, delay: index * 0.04 }}
                  className={`group py-6 hover:bg-slate-100/70 dark:hover:bg-slate-900/40 px-4 -mx-4 rounded-xl transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-6 ${isHovered ? 'bg-slate-100/50 dark:bg-slate-900/30' : ''
                    }`}
                  onMouseEnter={() => setHoveredProjectId(project.id)}
                  onMouseLeave={() => setHoveredProjectId(null)}
                >
                  {/* Left Column: Number + Name + Category */}
                  <div className="flex items-start sm:items-center gap-4 sm:gap-6 flex-1 min-w-0">
                    <span className="font-mono text-sm font-bold text-slate-400 dark:text-slate-500 shrink-0">
                      {formattedIndex}
                    </span>
                    <div className="flex flex-col gap-1 max-w-xl min-w-0">
                      <Link
                        to={`/proyectos/${project.slug}`}
                        className="inline-flex items-center gap-2 text-lg sm:text-xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors"
                        data-cursor="view"
                      >
                        <h2 className="text-lg sm:text-xl font-bold m-0 p-0 truncate">{project.title}</h2>
                        <ArrowUpRight size={18} className="opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all text-blue-600 dark:text-cyan-400 shrink-0" />
                      </Link>
                      <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed m-0">
                        {t(project.descriptionKey)}
                      </p>
                    </div>
                  </div>

                  {/* Middle Column: Tech Stack Icons */}
                  <div className="flex flex-wrap items-center gap-4 shrink-0">
                    <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300 text-lg">
                      {project.techs.slice(0, 5).map((techName, tIdx) => (
                        <span
                          key={tIdx}
                          className="hover:text-slate-950 dark:hover:text-white transition-colors"
                          title={techName}
                        >
                          {techIcons[techName] || <span className="text-xs font-mono">{techName}</span>}
                        </span>
                      ))}
                      {project.techs.length > 5 && (
                        <span className="text-xs font-mono font-bold text-slate-400 dark:text-slate-500 whitespace-nowrap">
                          +{project.techs.length - 5}
                        </span>
                      )}
                    </div>
                    <span className="text-xs px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60 text-slate-600 dark:text-slate-400 font-mono whitespace-nowrap">
                      {project.category}
                    </span>
                  </div>

                  {/* Right Column: Actions */}
                  <div className="flex items-center gap-3 shrink-0">
                    <Link
                      to={`/proyectos/${project.slug}`}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-blue-50 dark:bg-blue-600/10 hover:bg-blue-100 dark:hover:bg-blue-600/25 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-500/30 transition-all select-none whitespace-nowrap hover:-translate-y-0.5"
                      data-cursor="view"
                    >
                      <span>{isEs ? 'Ver Caso de Estudio' : 'View Case Study'}</span>
                    </Link>

                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 rounded-xl flex items-center justify-center bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white transition-all select-none hover:-translate-y-0.5"
                      title={isEs ? 'Abrir sitio web oficial' : 'Open live website'}
                      aria-label={isEs ? `Abrir sitio oficial de ${project.title}` : `Open live website of ${project.title}`}
                      data-cursor="link"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ExternalLink size={16} />
                    </a>

                    {project.code && (
                      <a
                        href={project.code}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-9 h-9 rounded-xl flex items-center justify-center bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white transition-all select-none hover:-translate-y-0.5"
                        title={isEs ? 'Ver repositorio de código' : 'View source repository'}
                        aria-label={isEs ? `Ver repositorio de ${project.title}` : `View source repository of ${project.title}`}
                        data-cursor="link"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Code2 size={16} />
                      </a>
                    )}
                  </div>
                </motion.div>
              );
            })}

            {filteredProjects.length === 0 && (
              <div className="py-16 text-center flex flex-col items-center justify-center gap-4 text-slate-500 dark:text-slate-400">
                <p>
                  {isEs
                    ? 'No se encontraron proyectos para los filtros seleccionados.'
                    : 'No projects found matching the selected filters.'}
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory('All');
                    setSearchTerm('');
                  }}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/15 text-slate-800 dark:text-white transition-all cursor-pointer select-none"
                >
                  {isEs ? 'Restablecer filtros' : 'Reset filters'}
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
