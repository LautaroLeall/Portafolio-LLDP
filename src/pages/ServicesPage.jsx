import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  Calculator,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import { getServicesData, getPricingConfig } from '../data/servicesData';
import ServiceMockup from '../components/services/ServiceMockup';
import QuoteWizard from '../components/services/QuoteWizard';
import PagesHero3D from '../components/ui/PagesHero3D';
import { useLanguage } from '../hooks/useLanguage';

/**
 * ServicesPage — Catálogo Minimalista de Especialidades & Explicación Interactiva
 */
export default function ServicesPage() {
  const { language } = useLanguage();
  const isEs = language === 'es';

  const services = getServicesData(language);
  const pricingConfig = getPricingConfig(language);

  const [activeServiceId, setActiveServiceId] = useState(services[0]?.id || 'paginas-web');
  const [wizardServiceId, setWizardServiceId] = useState(services[0]?.id || 'paginas-web');

  const sectionRefs = useRef({});

  // Scroll tracking para sincronizar el índice sticky
  useEffect(() => {
    const handleScroll = () => {
      let currentId = services[0]?.id;
      for (const service of services) {
        const el = sectionRefs.current[service.id];
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 260) {
            currentId = service.id;
          }
        }
      }
      if (currentId) {
        setActiveServiceId((prev) => (prev !== currentId ? currentId : prev));
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
  }, [services]);

  const scrollToService = (id) => {
    setActiveServiceId(id);
    const element = sectionRefs.current[id];
    if (element) {
      if (window.__lenis) {
        window.__lenis.scrollTo(element, { offset: -90, duration: 0.9 });
      } else {
        const yOffset = -90;
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }
  };

  const handleOpenWizardForService = (serviceId) => {
    setWizardServiceId(serviceId);
    const wiz = document.getElementById('cotizador-wizard');
    if (wiz) {
      if (window.__lenis) {
        window.__lenis.scrollTo(wiz, { offset: -80, duration: 1.0 });
      } else {
        wiz.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="w-full min-h-screen pt-24 sm:pt-32 pb-24 text-slate-900 dark:text-[#f5f7fa] transition-colors duration-300 relative">
      {/* 1. Cabecera Minimalista */}
      <section className="mb-10 sm:mb-16">
        <div className="w-full max-w-[1240px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] xl:grid-cols-[1fr_320px] gap-8 items-center">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 mb-3.5">
                <span className="font-mono text-xs font-bold tracking-widest text-blue-600 dark:text-[#3b82f6] whitespace-nowrap">
                  {isEs ? 'SERVICIOS & INGENIERÍA' : 'SERVICES & ENGINEERING'}
                </span>
                <span className="w-7 h-px bg-blue-500/40" />
                <span className="font-mono text-[0.7rem] text-slate-500 dark:text-slate-400 tracking-wider whitespace-nowrap">
                  {isEs ? 'DESARROLLO A MEDIDA' : 'CUSTOM SOFTWARE'}
                </span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-extrabold leading-tight tracking-tight text-slate-900 dark:text-white mb-3 sm:mb-4">
                {isEs ? (
                  <>Especialidades &amp; <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 dark:from-blue-400 dark:via-blue-500 dark:to-sky-300 bg-clip-text text-transparent">Soluciones Digitales</span></>
                ) : (
                  <>Specialties &amp; <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 dark:from-blue-400 dark:via-blue-500 dark:to-sky-300 bg-clip-text text-transparent">Digital Solutions</span></>
                )}
              </h1>

              <p className="text-xs sm:text-base leading-relaxed text-slate-600 dark:text-slate-300">
                {isEs
                  ? 'Soluciones web rápidas, adaptables a celulares y computadoras con cero costos cautivos. Explora de qué trata cada servicio y cotiza a medida.'
                  : 'Fast, responsive web solutions with zero vendor lock-in. Explore each service capability and request a custom quote.'}
              </p>
            </div>

            {/* 3D Cyber Artifact Header */}
            <div className="hidden lg:flex items-center justify-center relative w-full h-[220px]">
              <PagesHero3D />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Disposición Compacta: Menú Lateral + Lista de Servicios */}
      <section className="mb-20">
        <div className="w-full max-w-[1240px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-8 lg:gap-12 items-start">
            {/* Left: Sticky Sidebar Navigator (Estilo idéntico a Habilidades y Educación) */}
            <aside className="lg:sticky lg:top-[104px] z-20 self-start">
              <div className="bg-white dark:bg-[#020a15]/90 border border-slate-200 dark:border-white/10 rounded-2xl overflow-hidden backdrop-blur-xl shadow-lg dark:shadow-2xl shadow-slate-200/50 dark:shadow-black/40">
                <div className="flex justify-between items-center px-6 py-4 border-b border-slate-100 dark:border-white/[0.07] bg-slate-50 dark:bg-black/40">
                  <span className="font-mono text-xs font-bold tracking-wider text-slate-500 dark:text-slate-400 uppercase">
                    {isEs ? 'Especialidades' : 'Specialties'}
                  </span>
                  <span className="font-mono text-xs text-blue-600 dark:text-[#3b82f6] font-semibold">
                    {services.length} {isEs ? 'SOLUCIONES' : 'SOLUTIONS'}
                  </span>
                </div>

                <nav className="flex flex-col" aria-label="Navegación de servicios">
                  {services.map((service) => {
                    const isActive = service.id === activeServiceId;

                    return (
                      <button
                        key={service.id}
                        type="button"
                        onClick={() => scrollToService(service.id)}
                        className="group relative flex items-center gap-3.5 px-5 sm:px-6 py-4 text-left border-b border-slate-100 dark:border-white/[0.05] last:border-b-0 transition-all duration-200 cursor-pointer hover:bg-slate-50 dark:hover:bg-white/[0.03]"
                        data-cursor="pointer"
                      >
                        {isActive && (
                          <motion.div
                            layoutId="active-service-bg"
                            className="absolute inset-0 bg-blue-50 dark:bg-blue-500/[0.14] pointer-events-none"
                            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                          />
                        )}
                        {isActive && (
                          <motion.div
                            layoutId="active-service-bar"
                            className="absolute left-0 top-0 bottom-0 w-[3.5px] bg-blue-600 dark:bg-[#3b82f6] shadow-[0_0_12px_rgba(59,130,246,0.95)] z-10"
                            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                          />
                        )}
                        <span
                          className={`relative z-10 font-mono text-xs font-bold transition-colors duration-200 shrink-0 ${isActive ? 'text-blue-600 dark:text-[#3b82f6]' : 'text-slate-400 dark:text-slate-500'
                            }`}
                        >
                          {service.number}
                        </span>
                        <div className="relative z-10 flex-1 min-w-0">
                          <span
                            className={`block text-sm font-semibold truncate transition-colors duration-200 ${isActive
                              ? 'text-slate-900 dark:text-white'
                              : 'text-slate-600 dark:text-slate-400 group-hover:text-slate-950 dark:group-hover:text-slate-200'
                              }`}
                          >
                            {service.shortTitle}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </nav>

                <div className="p-4 border-t border-slate-100 dark:border-white/[0.08] bg-slate-50/50 dark:bg-white/[0.015]">
                  <button
                    type="button"
                    onClick={() => {
                      const wiz = document.getElementById('cotizador-wizard');
                      if (wiz) {
                        if (window.__lenis) {
                          window.__lenis.scrollTo(wiz, { offset: -90, duration: 1.0 });
                        } else {
                          wiz.scrollIntoView({ behavior: 'smooth' });
                        }
                      }
                    }}
                    className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-blue-50 dark:bg-blue-500/10 hover:bg-blue-600 dark:hover:bg-[#3b82f6] border border-blue-200 dark:border-blue-500/30 text-blue-600 dark:text-blue-400 hover:text-white rounded-xl text-xs font-bold tracking-wide uppercase transition-all duration-200 cursor-pointer shadow-sm"
                    data-cursor="pointer"
                  >
                    <Calculator size={15} />
                    <span>{isEs ? 'Cotizador Interactivo' : 'Interactive Quoter'}</span>
                  </button>
                </div>
              </div>
            </aside>

            {/* Right: Flujo de Servicios Compacto y Minimalista */}
            <section aria-label={isEs ? 'Listado de servicios profesionales' : 'Professional services list'} className="flex flex-col">
              {services.map((service, index) => {
                return (
                  <article
                    key={service.id}
                    id={`service-${service.id}`}
                    data-service-id={service.id}
                    ref={(el) => (sectionRefs.current[service.id] = el)}
                    className={`py-8 sm:py-10 border-b border-slate-200 dark:border-white/[0.08] scroll-mt-[85px] ${index === 0 ? 'pt-0' : ''
                      } last:border-b-0`}
                  >
                    {/* Header Minimalista */}
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1.5 mb-3 sm:mb-4">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-lg sm:text-xl font-bold text-blue-600 dark:text-[#3b82f6]">
                          {service.number}
                        </span>
                        <h2 className="text-lg sm:text-2xl font-bold text-slate-900 dark:text-white">
                          {service.shortTitle}
                        </h2>
                      </div>
                      <span className="font-mono text-[0.68rem] sm:text-xs text-slate-500 dark:text-slate-400">
                        {service.categoryLabel}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mb-3 sm:mb-4 max-w-2xl leading-relaxed">
                      {service.longDescription || service.subtitle}
                    </p>

                    {/* Visor de Demos Compacto (Fijo, Nunca Cambia de Tamaño) */}
                    <div className="mb-4">
                      <ServiceMockup serviceId={service.id} lang={language} />
                    </div>

                    {/* Entregables Básicos y Botón Cotizar */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
                      <div className="flex items-center gap-2.5 sm:gap-4 flex-wrap text-xs text-slate-600 dark:text-slate-400">
                        {service.deliverables.slice(0, 3).map((item, dIdx) => (
                          <div key={dIdx} className="flex items-center gap-1.5 whitespace-nowrap">
                            <CheckCircle2 size={13} className="text-blue-600 dark:text-[#3b82f6] shrink-0" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>

                      <button
                        type="button"
                        onClick={() => handleOpenWizardForService(service.id)}
                        className="inline-flex items-center justify-center gap-1.5 w-full sm:w-auto px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold transition-all cursor-pointer shadow-xs whitespace-nowrap"
                        data-cursor="pointer"
                      >
                        <span>{isEs ? `Cotizar ${service.shortTitle}` : `Quote ${service.shortTitle}`}</span>
                        <ArrowRight size={13} />
                      </button>
                    </div>
                  </article>
                );
              })}
            </section>
          </div>
        </div>
      </section>

      {/* 3. Cotizador Wizard */}
      <QuoteWizard
        services={services}
        pricingConfig={pricingConfig}
        isEs={isEs}
        preselectedServiceId={wizardServiceId}
      />
    </div>
  );
}
