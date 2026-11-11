import { useState, useRef, useEffect } from 'react';
import {
  Award,
  GraduationCap,
  Building2,
  FileDown,
  ExternalLink,
  Eye
} from 'lucide-react';
import { sileo } from 'sileo';
import PagesHero3D from '../components/ui/PagesHero3D';
import { useLanguage } from '../hooks/useLanguage';

export default function EducationPage() {
  const { language } = useLanguage();
  const isEs = language === 'es';

  // State to track currently viewed certificate in viewport
  const [activeCertId, setActiveCertId] = useState('cert-ms-genai');
  const certRefs = useRef({});

  // Clean Verified Certifications Catalog
  const certificationsData = [
    {
      id: 'cert-ms-genai',
      title: 'Career Essentials in Generative AI',
      institution: 'Microsoft & LinkedIn Learning',
      year: '2024',
      issuer: 'LinkedIn Learning',
      link: 'https://www.linkedin.com/learning/certificates/5181b220b78f85b0d0c2430c8eabeacc81a4666d076cd285db8da4ace938a24c',
      imgSrc: '/certifications/fundProfDeIAGenerativa.png'
    },
    {
      id: 'cert-ms-softdev',
      title: 'Career Essentials in Software Development',
      institution: 'Microsoft & LinkedIn Learning',
      year: '2024',
      issuer: 'LinkedIn Learning',
      link: 'https://www.linkedin.com/learning/certificates/e07e0fec757116348e2e1a95a977efee635420ddc2569afdc068d5aa7287a26a',
      imgSrc: '/certifications/fundDesarrolloDeSoft.png'
    },
    {
      id: 'cert-fcc-frontlib',
      title: 'Front End Development Libraries',
      institution: 'freeCodeCamp',
      year: '2023',
      issuer: 'freeCodeCamp.org',
      link: 'https://www.freecodecamp.org/certification/lautaroleall/front-end-development-libraries',
      imgSrc: '/certifications/frontEndLibraries.png'
    },
    {
      id: 'cert-fcc-jsdata',
      title: 'JavaScript Algorithms and Data Structures',
      institution: 'freeCodeCamp',
      year: '2023',
      issuer: 'freeCodeCamp.org',
      link: 'https://www.freecodecamp.org/certification/lautaroleall/javascript-algorithms-and-data-structures-v8',
      imgSrc: '/certifications/javaS-Algorith-DataStructures.png'
    },
    {
      id: 'cert-fcc-legacy',
      title: 'Legacy Front End Development',
      institution: 'freeCodeCamp',
      year: '2022',
      issuer: 'freeCodeCamp.org',
      link: 'https://www.freecodecamp.org/certification/lautaroleall/legacy-front-end',
      imgSrc: '/certifications/legacyFrontEnd.png'
    },
    {
      id: 'cert-digitalers',
      title: 'Desarrollo Web & Tecnologías Digitales',
      institution: 'Digitalers Academy • Telecom & Educación IT',
      year: '2023',
      issuer: 'Educación IT',
      link: 'https://perfil.educacionit.com/perfil/lautaro-leal-del-prete-1069835/certificado/81949',
      imgSrc: '/certifications/devWeb.png'
    },
    {
      id: 'cert-nexus-english',
      title: 'Certificado de Finalización Adults 1 - English Language',
      institution: 'Instituto Nexus • Lenguas Vivas',
      year: '2024',
      issuer: 'Nexus Lenguas',
      link: '/certifications/nexusEnglish.pdf',
      imgSrc: '/certifications/nexusEnglish.png'
    }
  ];

  // Set up IntersectionObserver to update activeCertId as user scrolls
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -55% 0px',
      threshold: 0
    };

    const handleIntersect = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const certId = entry.target.getAttribute('data-cert-id');
          if (certId) {
            setActiveCertId(certId);
          }
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    Object.values(certRefs.current).forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Smooth scroll to a specific certificate
  const scrollToCert = (id) => {
    const element = document.getElementById(id);
    if (element) {
      if (window.__lenis) {
        window.__lenis.scrollTo(element, { offset: -96, duration: 1.1 });
      } else {
        const top = element.getBoundingClientRect().top + window.pageYOffset - 96;
        window.scrollTo({ top, behavior: 'smooth' });
      }
      setActiveCertId(id);
    }
  };

  return (
    <div className="w-full min-h-screen pt-28 sm:pt-32 pb-28 text-slate-900 dark:text-[#f5f7fa] transition-colors duration-300 relative">
      {/* 1. Header Section */}
      <section className="mb-14 sm:mb-16">
        <div className="w-full max-w-[1240px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] xl:grid-cols-[1fr_340px] gap-8 items-center">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3.5 mb-5 flex-wrap">
                <span className="font-mono text-xs font-bold tracking-widest text-blue-600 dark:text-[#3b82f6] whitespace-nowrap">
                  {isEs ? 'TRAYECTORIA ACADÉMICA' : 'ACADEMIC PATHWAY'}
                </span>
                <span className="w-7 h-px bg-blue-500/40" />
                <span className="font-mono text-[0.7rem] text-slate-500 dark:text-slate-400 tracking-wider whitespace-nowrap">
                  {isEs ? 'ESTUDIOS & CERTIFICACIONES VERIFICABLES' : 'DEGREES & VERIFIABLE CREDENTIALS'}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight text-slate-900 dark:text-white mb-5">
                {isEs ? (
                  <>Educación Formal, Calidad &amp; <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 dark:from-blue-400 dark:via-blue-500 dark:to-sky-300 bg-clip-text text-transparent">Certificaciones</span></>
                ) : (
                  <>Formal Education, QA &amp; <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 dark:from-blue-400 dark:via-blue-500 dark:to-sky-300 bg-clip-text text-transparent">Certifications</span></>
                )}
              </h1>

              <p className="text-base sm:text-lg leading-relaxed text-slate-600 dark:text-slate-300 font-normal">
                {isEs
                  ? 'Mi formación técnica combina rigurosidad académica universitaria en Calidad de Software (UNSTA) con certificaciones internacionales continuas en desarrollo web, algoritmos e idioma inglés. Haz scroll para inspeccionar cada certificación de manera secuencial.'
                  : 'My technical background combines university academic rigor in Software Quality (UNSTA) with continuous international credentials in web development, algorithms, and English. Scroll to inspect each verified credential sequentially.'}
              </p>
            </div>

            {/* 3D Cyber Artifact Header */}
            <div className="hidden lg:flex items-center justify-center relative w-full h-[240px] xl:h-[280px]">
              <PagesHero3D />
            </div>
          </div>
        </div>
      </section>

      <div className="w-full max-w-[1240px] mx-auto px-4 sm:px-6">
        {/* 1. Academic Timeline */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8 border-b border-slate-200 dark:border-white/[0.08] pb-4">
            <GraduationCap size={22} className="text-blue-600 dark:text-[#3b82f6] shrink-0" />
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white m-0">
              {isEs ? 'Formación Universitaria & Especialización' : 'University Degree & Specialization'}
            </h2>
          </div>

          <div className="flex flex-col gap-6 sm:gap-8">
            {/* UNSTA */}
            <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-6 md:gap-10 p-6 sm:p-8 bg-white dark:bg-white/[0.015] border border-slate-200 dark:border-white/[0.08] rounded-2xl shadow-md dark:shadow-xl">
              <div className="flex flex-col gap-2">
                <span className="font-mono text-base font-bold text-slate-900 dark:text-white whitespace-nowrap">2024 — 2026</span>
                <span className="font-mono text-xs text-emerald-600 dark:text-emerald-400 font-semibold whitespace-nowrap flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  {isEs ? 'Graduado • Título Obtenido' : 'Graduated • Degree Conferred'}
                </span>
              </div>
              <div className="flex flex-col">
                <div className="inline-flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-2">
                  <Building2 size={16} className="shrink-0" />
                  <span>UNSTA — Universidad del Norte Santo Tomás de Aquino</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-2.5">
                  {isEs
                    ? 'Tecnicatura Universitaria en Desarrollo y Calidad de Software'
                    : 'Associate Degree in Software Development and Quality Assurance'}
                </h3>
                <p className="text-sm sm:text-base leading-relaxed text-slate-600 dark:text-slate-300 m-0">
                  {isEs
                    ? 'Formación especializada en ingeniería de requerimientos, diseño de arquitecturas robustas, bases de datos relacionales y NoSQL, testing automatizado (Cypress, Mocha), métricas de calidad de software y metodologías ágiles de trabajo en equipo.'
                    : 'Specialized education in requirements engineering, robust system architecture, relational and NoSQL databases, automated testing (Cypress, Mocha), software quality metrics, and agile team workflows.'}
                </p>
              </div>
            </div>

            {/* Instituto Nexus */}
            <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-6 md:gap-10 p-6 sm:p-8 bg-white dark:bg-white/[0.015] border border-slate-200 dark:border-white/[0.08] rounded-2xl shadow-md dark:shadow-xl">
              <div className="flex flex-col gap-2">
                <span className="font-mono text-base font-bold text-slate-900 dark:text-white whitespace-nowrap">2025 — {isEs ? 'Presente' : 'Present'}</span>
                <span className="font-mono text-xs text-emerald-600 dark:text-emerald-400 font-semibold whitespace-nowrap">
                  {isEs ? 'Capacitación Activa' : 'Active Training'}
                </span>
              </div>
              <div className="flex flex-col">
                <div className="inline-flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-2">
                  <Building2 size={16} className="shrink-0" />
                  <span>Instituto Nexus — SM de Tucumán</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-2.5">
                  {isEs
                    ? 'Inglés Comunicativo & Preparación para Exámenes Internacionales'
                    : 'Communicative English & International Examination Prep'}
                </h3>
                <p className="text-sm sm:text-base leading-relaxed text-slate-600 dark:text-slate-300 m-0">
                  {isEs
                    ? 'Entrenamiento intensivo en fluidez comunicativa técnica, redacción de documentación de software, comunicación fluida en entornos internacionales y preparación para certificaciones de nivel B2/C1.'
                    : 'Intensive training in technical communicative fluency, software documentation writing, distributed international team collaboration, and B2/C1 examination prep.'}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Official Curriculum Vitae Downloads */}
        <section className="mb-20">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-6 sm:p-10 bg-blue-50/80 dark:bg-blue-500/[0.06] border border-blue-200 dark:border-blue-500/20 rounded-2xl gap-8 shadow-md dark:shadow-xl">
            <div className="flex items-center gap-5">
              <FileDown size={28} className="text-blue-600 dark:text-[#3b82f6] shrink-0" />
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-1">
                  {isEs ? 'Descarga mi Curriculum Vitae Oficial' : 'Download Official Curriculum Vitae'}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 m-0">
                  {isEs
                    ? 'Documento formal en PDF con resumen ejecutivo, trayectoria académica, stack técnico y enlaces a proyectos.'
                    : 'Formal PDF dossier with executive summary, academic trajectory, full-stack technologies, and verified project links.'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 flex-wrap w-full md:w-auto">
              <a
                href="/Lautaro-Leal-Del-Prete-Spanish.pdf"
                download="Lautaro-Leal-Del-Prete-CV-ES.pdf"
                className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl shadow-lg shadow-blue-500/20 transition-all duration-200 hover:-translate-y-0.5 whitespace-nowrap select-none"
                data-cursor="pointer"
                onClick={() => sileo.info({
                  title: isEs ? 'Descarga iniciada' : 'Download started',
                  description: isEs ? 'Descargando Curriculum Vitae en Español (PDF)...' : 'Downloading Spanish Resume (PDF)...'
                })}
              >
                <span>{isEs ? 'Versión en Español (PDF)' : 'Spanish Version (PDF)'}</span>
              </a>

              <a
                href="/Lautaro-Leal-Del-Prete-English.pdf"
                download="Lautaro-Leal-Del-Prete-CV-EN.pdf"
                className="inline-flex items-center justify-center px-6 py-3 bg-white dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 border border-slate-200 dark:border-white/15 text-slate-800 dark:text-white text-sm font-medium rounded-xl transition-all duration-200 whitespace-nowrap select-none shadow-sm hover:-translate-y-0.5"
                data-cursor="pointer"
                onClick={() => sileo.info({
                  title: isEs ? 'Descarga iniciada' : 'Download started',
                  description: isEs ? 'Descargando Curriculum Vitae en Inglés (PDF)...' : 'Downloading English Resume (PDF)...'
                })}
              >
                <span>English Resume (PDF)</span>
              </a>
            </div>
          </div>
        </section>

        {/* 3. Interactive Scroll-Driven Certificate Sidebar & Stream */}
        <section className="mb-20">
          <div className="flex items-center gap-3 mb-8 border-b border-slate-200 dark:border-white/[0.08] pb-4">
            <Award size={22} className="text-blue-600 dark:text-[#3b82f6] shrink-0" />
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white m-0">
              {isEs ? 'Directorio de Certificaciones Verificables' : 'Directory of Verifiable Certifications'}
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-12 items-start">
            {/* Left: Sticky Sidebar Navigator */}
            <aside className="lg:sticky lg:top-[104px] z-20">
              <div className="bg-white dark:bg-[#020a15]/85 border border-slate-200 dark:border-white/10 rounded-2xl overflow-hidden backdrop-blur-xl shadow-lg dark:shadow-2xl shadow-slate-200/50 dark:shadow-black/40">
                <div className="flex justify-between items-center px-6 py-4 border-b border-slate-100 dark:border-white/[0.07] bg-slate-50 dark:bg-black/30">
                  <span className="font-mono text-xs font-bold tracking-wider text-slate-500 dark:text-slate-400 whitespace-nowrap">
                    {isEs ? 'CERTIFICACIONES' : 'CERTIFICATIONS'}
                  </span>
                  <span className="font-mono text-xs text-blue-600 dark:text-[#3b82f6] font-semibold whitespace-nowrap">
                    {certificationsData.length} {isEs ? 'VERIFICADAS' : 'VERIFIED'}
                  </span>
                </div>

                <nav className="flex flex-col" aria-label="Navegación de certificaciones">
                  {certificationsData.map((cert, idx) => {
                    const isActive = cert.id === activeCertId;
                    const formattedIdx = String(idx + 1).padStart(2, '0');

                    return (
                      <button
                        key={cert.id}
                        type="button"
                        onClick={() => scrollToCert(cert.id)}
                        className={`group relative flex items-center gap-4 px-6 py-4 text-left border-b border-slate-100 dark:border-white/[0.05] last:border-b-0 transition-all duration-200 cursor-pointer ${isActive
                          ? 'bg-blue-50/80 dark:bg-blue-500/[0.09]'
                          : 'hover:bg-slate-50 dark:hover:bg-white/[0.03]'
                          }`}
                        data-cursor="pointer"
                      >
                        <span
                          className={`font-mono text-xs font-bold transition-colors duration-200 shrink-0 ${isActive ? 'text-blue-600 dark:text-[#3b82f6]' : 'text-slate-400 dark:text-slate-500/60'
                            }`}
                        >
                          {formattedIdx}
                        </span>
                        <div className="flex-1 flex flex-col gap-0.5 min-w-0">
                          <span
                            className={`text-sm leading-snug truncate transition-colors duration-200 ${isActive
                              ? 'text-slate-900 dark:text-white font-bold'
                              : 'text-slate-600 dark:text-slate-400 font-medium'
                              }`}
                          >
                            {cert.title}
                          </span>
                          <span className="text-xs text-slate-400 dark:text-slate-400/60 truncate">{cert.institution}</span>
                        </div>
                        {isActive && (
                          <div className="absolute left-0 top-0 bottom-0 w-[3.5px] bg-blue-600 dark:bg-[#3b82f6] shadow-[0_0_10px_rgba(59,130,246,0.9)]" />
                        )}
                      </button>
                    );
                  })}
                </nav>
              </div>
            </aside>

            {/* Right: Scrolling Stream of Full-Resolution Certificates */}
            <section aria-label={isEs ? 'Lista de certificaciones' : 'Certifications list'} className="flex flex-col gap-14">
              {certificationsData.map((cert) => {
                return (
                  <article
                    key={cert.id}
                    id={cert.id}
                    data-cert-id={cert.id}
                    ref={(el) => (certRefs.current[cert.id] = el)}
                    className="bg-white dark:bg-[#020a15]/85 border border-slate-200 dark:border-white/10 hover:border-blue-400 dark:hover:border-blue-500/35 rounded-2xl overflow-hidden shadow-lg dark:shadow-2xl shadow-slate-200/40 dark:shadow-black/45 scroll-mt-[104px] transition-colors duration-300"
                  >
                    {/* Header Chrome */}
                    <div className="flex justify-between items-center px-6 py-3.5 bg-slate-50 dark:bg-black/40 border-b border-slate-200 dark:border-white/[0.08] gap-4">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                      </div>
                      <a
                        href={cert.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 font-mono text-xs text-blue-600 dark:text-[#3b82f6] hover:text-blue-700 dark:hover:text-blue-300 transition-colors whitespace-nowrap"
                        data-cursor="link"
                      >
                        <span>{isEs ? `Validar en ${cert.issuer}` : `Verify on ${cert.issuer}`}</span>
                        <ExternalLink size={14} />
                      </a>
                    </div>

                    {/* Image Frame */}
                    <div className="p-4 sm:p-8 bg-slate-100 dark:bg-black flex items-center justify-center min-h-[380px] sm:min-h-[460px]">
                      <img
                        src={cert.imgSrc}
                        alt={`Certificado ${cert.title}`}
                        className="max-w-full max-h-[560px] rounded-lg shadow-xl shadow-black/10 dark:shadow-2xl dark:shadow-black object-contain transition-transform duration-300 hover:scale-[1.01]"
                        loading="lazy"
                      />
                    </div>

                    {/* Footer Info */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center px-6 sm:px-8 py-5 border-t border-slate-200 dark:border-white/[0.08] bg-slate-50/50 dark:bg-white/[0.015] gap-4">
                      <div>
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">{cert.title}</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400 m-0">
                          {isEs
                            ? `${cert.institution} • Año ${cert.year}`
                            : `${cert.institution} • Year ${cert.year}`}
                        </p>
                      </div>
                      <a
                        href={cert.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-500/10 hover:bg-blue-600 dark:hover:bg-[#3b82f6] border border-blue-200 dark:border-blue-500/30 text-blue-600 dark:text-blue-400 hover:text-white rounded-xl text-xs font-semibold transition-all duration-200 whitespace-nowrap"
                        data-cursor="link"
                      >
                        <Eye size={15} />
                        <span>{isEs ? 'Ver Credencial' : 'View Credential'}</span>
                      </a>
                    </div>
                  </article>
                );
              })}
            </section>
          </div>
        </section>
      </div>
    </div>
  );
}
