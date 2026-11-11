import { useState, useEffect, useRef, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import PagesHero3D from '../components/ui/PagesHero3D';
import { useLanguage } from '../hooks/useLanguage';
import { frequentStack, getSkillDomains } from '../data/skillsData';

export default function SkillsPage() {
  const { language } = useLanguage();
  const isEs = language === 'es';

  // Engineering domains with verified brand icons and context
  const skillDomains = useMemo(() => getSkillDomains(isEs), [isEs]);

  // Scroll tracking: automatically updates activeDomainId as user scrolls (identical to Services & Education)
  const sectionRefs = useRef({});
  const [activeDomainId, setActiveDomainId] = useState(skillDomains[0]?.id || 'frontend');

  useEffect(() => {
    const handleScroll = () => {
      let currentId = skillDomains[0]?.id;
      for (const domain of skillDomains) {
        const el = sectionRefs.current[domain.id] || document.getElementById(domain.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 320) {
            currentId = domain.id;
          }
        }
      }
      if (currentId) {
        setActiveDomainId((prev) => (prev !== currentId ? currentId : prev));
      }
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
  }, [skillDomains]);

  const scrollToDomain = (id) => {
    setActiveDomainId(id);
    const element = sectionRefs.current[id] || document.getElementById(id);
    if (element) {
      if (window.__lenis) {
        window.__lenis.scrollTo(element, { offset: -110, duration: 0.9 });
      } else {
        const yOffset = -110;
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="w-full min-h-screen pt-28 sm:pt-32 pb-28 text-slate-900 dark:text-[#f5f7fa] transition-colors duration-300 relative">
      <div className="w-full max-w-[1240px] mx-auto px-4 sm:px-6">
        {/* 1. Header Section */}
        <section className="mb-14 sm:mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] xl:grid-cols-[1fr_340px] gap-8 items-center">
            <div className="max-w-4xl">
              <div className="flex items-center gap-3.5 mb-5 flex-wrap">
                <span className="font-mono text-xs font-bold tracking-widest text-blue-600 dark:text-[#3b82f6] whitespace-nowrap">
                  {isEs ? 'STACK TÉCNICO & HABILIDADES' : 'TECHNICAL STACK & ENGINEERING'}
                </span>
                <span className="w-7 h-px bg-blue-500/40" />
                <span className="font-mono text-[0.7rem] text-slate-500 dark:text-slate-400 tracking-wider whitespace-nowrap">
                  {isEs ? 'DESARROLLO FULL STACK • QA UNSTA' : 'FULL STACK DEV • QA UNSTA'}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight text-slate-900 dark:text-white mb-5">
                {isEs ? (
                  <>
                    Tecnologías, Arquitectura &amp;{' '}
                    <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 dark:from-blue-400 dark:via-blue-500 dark:to-sky-300 bg-clip-text text-transparent">
                      Prácticas de Software
                    </span>
                  </>
                ) : (
                  <>
                    Technologies, Architecture &amp;{' '}
                    <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 dark:from-blue-400 dark:via-blue-500 dark:to-sky-300 bg-clip-text text-transparent">
                      Software Practices
                    </span>
                  </>
                )}
              </h1>

              <p className="text-base sm:text-lg leading-relaxed text-slate-600 dark:text-slate-300 font-normal mb-8">
                {isEs
                  ? 'Mi formación en la Tecnicatura Universitaria en Desarrollo y Calidad de Software (UNSTA) y mi experiencia en proyectos en producción me permiten construir soluciones completas: desde interfaces intuitivas hasta arquitecturas de datos seguras y escalables.'
                  : 'My background in Software Development and Quality Assurance (UNSTA) combined with production project experience enables me to build end-to-end solutions: from intuitive interfaces to secure and scalable data architectures.'}
              </p>

              {/* Stack Principal: 
                  - En Mobile: vertical centrado, uno debajo de otro.
                  - En Pantalla Grande: una sola fila que no se rompe (mismo renglón).
              */}
              <div className="flex flex-col lg:flex-row lg:items-center items-center justify-center lg:justify-start gap-3 w-full">
                <span className="text-xs font-mono text-slate-500 dark:text-slate-400 select-none shrink-0 text-center lg:text-left">
                  {isEs ? 'Stack principal:' : 'Core stack:'}
                </span>

                {/* Contenedor responsivo: columna en móvil, fila sin saltos en desktop */}
                <div className="flex flex-col sm:flex-row sm:flex-wrap lg:flex-nowrap items-center justify-center lg:justify-start gap-2 w-full lg:w-auto">
                  {frequentStack.map((tech) => {
                    const Icon = tech.icon;
                    return (
                      <span
                        key={tech.name}
                        className="inline-flex items-center justify-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono bg-white dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] text-slate-800 dark:text-slate-200 select-none shadow-2xs hover:border-blue-500/40 transition-colors whitespace-nowrap w-full max-w-[260px] sm:w-auto"
                      >
                        <Icon size={15} className={`${tech.color} shrink-0`} />
                        <span className="font-medium">{tech.name}</span>
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* 3D Cyber Artifact Header */}
            <div className="hidden lg:flex items-center justify-center relative w-full h-[240px] xl:h-[280px]">
              <PagesHero3D />
            </div>
          </div>
        </section>

        {/* 2. Interactive Sidebar + Scroll Stream Experience (Idéntico a Servicios y Educación) */}
        <section className="border-t border-slate-200 dark:border-white/[0.08] pt-12 sm:pt-16 mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-8 lg:gap-12 items-start">
            {/* Left: Sticky Sidebar Navigator con animación y funcionalidad idéntica a Servicios y Educación */}
            <aside className="lg:sticky lg:top-[104px] z-20 self-start">
              <div className="bg-white dark:bg-[#020a15]/90 border border-slate-200 dark:border-white/10 rounded-2xl overflow-hidden backdrop-blur-xl shadow-lg dark:shadow-2xl shadow-slate-200/50 dark:shadow-black/40">
                <div className="flex justify-between items-center px-6 py-4 border-b border-slate-100 dark:border-white/[0.07] bg-slate-50 dark:bg-black/40">
                  <span className="font-mono text-xs font-bold tracking-wider text-slate-500 dark:text-slate-400 uppercase">
                    {isEs ? 'Dominio' : 'Domains'}
                  </span>
                  <span className="font-mono text-xs text-blue-600 dark:text-[#3b82f6] font-semibold">
                    {skillDomains.length} {isEs ? 'ÁREAS' : 'AREAS'}
                  </span>
                </div>

                <nav className="flex flex-col" aria-label="Navegación de habilidades">
                  {skillDomains.map((domain) => {
                    const isActive = domain.id === activeDomainId;

                    return (
                      <button
                        key={domain.id}
                        type="button"
                        onClick={() => scrollToDomain(domain.id)}
                        className="group relative flex items-center gap-3.5 px-5 sm:px-6 py-4 text-left border-b border-slate-100 dark:border-white/[0.05] last:border-b-0 transition-all duration-200 cursor-pointer hover:bg-slate-50 dark:hover:bg-white/[0.03]"
                        data-cursor="pointer"
                      >
                        {isActive && (
                          <motion.div
                            layoutId="active-skill-domain-bg"
                            className="absolute inset-0 bg-blue-50 dark:bg-blue-500/[0.14] pointer-events-none"
                            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                          />
                        )}
                        {isActive && (
                          <motion.div
                            layoutId="active-skill-domain-bar"
                            className="absolute left-0 top-0 bottom-0 w-[3.5px] bg-blue-600 dark:bg-[#3b82f6] shadow-[0_0_12px_rgba(59,130,246,0.95)] z-10"
                            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                          />
                        )}
                        <span
                          className={`relative z-10 font-mono text-xs font-bold transition-colors duration-200 shrink-0 ${isActive ? 'text-blue-600 dark:text-[#3b82f6]' : 'text-slate-400 dark:text-slate-500'
                            }`}
                        >
                          {domain.number}
                        </span>
                        <div className="relative z-10 flex-1 min-w-0">
                          <span
                            className={`block text-sm font-semibold truncate transition-colors duration-200 ${isActive
                              ? 'text-slate-900 dark:text-white'
                              : 'text-slate-600 dark:text-slate-400 group-hover:text-slate-950 dark:group-hover:text-slate-200'
                              }`}
                          >
                            {domain.title}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </nav>
              </div>
            </aside>

            {/* Right: Tecnologías organizadas por Dominio - Presentación Natural (Sin Card) */}
            <section aria-label={isEs ? 'Habilidades por categoría' : 'Skills by category'} className="flex flex-col">
              {skillDomains.map((domain) => (
                <section
                  key={domain.id}
                  id={domain.id}
                  data-domain-id={domain.id}
                  ref={(el) => (sectionRefs.current[domain.id] = el)}
                  className="scroll-mt-[110px] pb-14 sm:pb-18 mb-14 sm:mb-18 border-b border-slate-200 dark:border-white/[0.08] last:border-b-0 last:pb-0 last:mb-0"
                >
                  {/* Encabezado Natural del Dominio (Sin marco de ventana ni caja) */}
                  <div className="mb-7">
                    <div className="flex items-center gap-3 mb-2.5">
                      <span className="font-mono text-xs font-bold tracking-wider text-blue-600 dark:text-[#3b82f6]">
                        {domain.number} // {isEs ? 'ESPECIALIDAD' : 'SPECIALTY'}
                      </span>
                      <span className="w-6 h-px bg-blue-500/30" />
                      <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                        {domain.skills.length} {isEs ? 'tecnologías' : 'technologies'}
                      </span>
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-3">
                      {domain.title}
                    </h2>

                    <p className="text-sm sm:text-base leading-relaxed text-slate-600 dark:text-slate-300 max-w-3xl m-0">
                      {domain.description}
                    </p>
                  </div>

                  {/* Lista Limpia & Natural de Tecnologías (Sin Cards, Integrada con el fondo) */}
                  <div className="flex flex-col divide-y divide-slate-100 dark:divide-white/[0.06]">
                    {domain.skills.map((skill, sIdx) => {
                      const IconComp = skill.icon;
                      return (
                        <div
                          key={sIdx}
                          className="group py-4 px-2 sm:px-3 -mx-2 sm:-mx-3 rounded-xl transition-all duration-200 hover:bg-slate-50/80 dark:hover:bg-white/[0.02] flex flex-col md:flex-row md:items-baseline justify-between gap-2 md:gap-8 cursor-default"
                        >
                          {/* Izquierda de la fila: Icono de marca + Nombre de tecnología (sin truncar) */}
                          <div className="flex items-center gap-3 shrink-0 md:min-w-[280px]">
                            <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-white/[0.04] border border-slate-200/80 dark:border-white/10 flex items-center justify-center shrink-0 group-hover:border-blue-500/40 group-hover:bg-blue-50/50 dark:group-hover:bg-blue-500/10 transition-colors shadow-2xs">
                              <IconComp
                                size={17}
                                className={`${skill.iconColor} group-hover:scale-115 transition-transform duration-200`}
                              />
                            </div>
                            <span className="font-semibold text-sm sm:text-base text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-[#3b82f6] transition-colors whitespace-nowrap">
                              {skill.name}
                            </span>
                          </div>

                          {/* Derecha de la fila: Detalle práctico de ingeniería */}
                          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed m-0 flex-1 pl-11 md:pl-0">
                            {skill.detail}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </section>
              ))}
            </section>
          </div>
        </section>

        {/* 3. Bottom Call to Action */}
        <section className="mt-8 pt-10 border-t border-slate-200 dark:border-white/[0.08]">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 p-6 sm:p-8 bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 rounded-2xl">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-1.5">
                {isEs
                  ? 'Ver este stack en proyectos reales en producción'
                  : 'See this stack applied in production projects'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 m-0">
                {isEs
                  ? 'Conoce la arquitectura, capturas y sandboxes interactivos de mis 11 casos de estudio.'
                  : 'Explore the architecture, snapshots, and live sandboxes of my 11 case studies.'}
              </p>
            </div>
            <div className="flex items-center gap-3 w-full sm:w-auto shrink-0">
              <Link
                to="/proyectos"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold rounded-xl transition-all shadow-md shadow-blue-500/20 whitespace-nowrap select-none w-full sm:w-auto hover:-translate-y-0.5"
                data-cursor="pointer"
              >
                <span>{isEs ? 'Ver Proyectos' : 'View Projects'}</span>
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
