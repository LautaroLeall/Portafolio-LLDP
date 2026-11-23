import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, Plus, ArrowUpRight, Calculator, MessageCircle } from 'lucide-react';
import { getServicesFaq } from '../../data/faqData';
import { CONTACT_INFO } from '../../data/servicesData';

/**
 * ServicesFaq — Sección interactiva de Preguntas Frecuentes (SEO Local Tucumán & GEO)
 * Layout asimétrico sticky en desktop, cómodo y táctil en mobile, con animaciones al scroll y al abrir.
 */
export default function ServicesFaq({ isEs = true }) {
  const faqs = getServicesFaq(isEs);
  const [openId, setOpenId] = useState(faqs[0]?.id || null);

  const activeIndex = Math.max(
    0,
    faqs.findIndex((item) => item.id === openId)
  );

  const whatsappHref = `https://wa.me/${CONTACT_INFO.whatsappNumber}?text=${encodeURIComponent(
    isEs
      ? 'Hola Lautaro, te escribo desde la sección de Servicios porque tengo una consulta sobre un proyecto web/software.'
      : 'Hi Lautaro, I am reaching out from your Services page with a project question.'
  )}`;

  const scrollToWizard = () => {
    const wiz = document.getElementById('cotizador-wizard');
    if (!wiz) return;
    if (window.__lenis) {
      window.__lenis.scrollTo(wiz, { offset: -90, duration: 0.9 });
    } else {
      wiz.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      aria-label={
        isEs
          ? 'Preguntas frecuentes sobre desarrollo web y software'
          : 'Frequently asked questions'
      }
      className="relative pt-16 sm:pt-20 pb-8 mt-14 border-t border-slate-200 dark:border-white/[0.08] overflow-x-clip"
    >
      {/* Halo ambiental sutil */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[540px] h-[220px] rounded-full bg-blue-500/10 dark:bg-[#3b82f6]/10 blur-[90px]"
      />

      <div className="relative w-full max-w-[1240px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-8 lg:gap-12 items-start">
          {/* Columna izquierda: Presentación sticky en PC */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="lg:sticky lg:top-[104px]"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-4">
              <HelpCircle size={14} className="text-blue-600 dark:text-[#3b82f6]" />
              <span className="font-mono text-[0.7rem] font-bold tracking-widest text-blue-600 dark:text-[#3b82f6] uppercase">
                {isEs ? 'FAQ • Tucumán & Remoto' : 'FAQ • Local & Global'}
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.15] mb-3">
              {isEs
                ? 'Preguntas frecuentes antes de empezar'
                : 'Frequently asked questions'}
            </h2>

            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
              {isEs
                ? 'Respuestas claras sobre desarrollo web, sistemas a medida, propiedad del código, SEO y forma de trabajo desde Tucumán.'
                : 'Clear answers on custom software, source code ownership, SEO performance, and remote collaboration.'}
            </p>

            {/* Indicador numérico de progreso */}
            <div className="hidden lg:flex items-center gap-3 mb-6">
              <span className="font-mono text-xs font-bold text-blue-600 dark:text-cyan-400">
                {openId
                  ? `0${activeIndex + 1} / 0${faqs.length}`
                  : `00 / 0${faqs.length}`}
              </span>
              <div className="flex-1 h-[2px] rounded-full bg-slate-200 dark:bg-white/[0.08] overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-blue-600 to-cyan-400"
                  initial={false}
                  animate={{
                    width: openId
                      ? `${((activeIndex + 1) / faqs.length) * 100}%`
                      : '0%'
                  }}
                  transition={{ type: 'spring', stiffness: 260, damping: 28 }}
                />
              </div>
            </div>

            {/* Tarjeta compacta de acción directa (desktop) */}
            <div className="hidden lg:block p-4 rounded-2xl bg-slate-50/90 dark:bg-white/[0.025] border border-slate-200/80 dark:border-white/[0.08] backdrop-blur-md">
              <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 mb-3">
                {isEs
                  ? '¿Tenés una idea o necesitás asesoramiento técnico?'
                  : 'Have a project in mind or need technical advice?'}
              </p>
              <div className="flex flex-col gap-2">
                <button
                  type="button"
                  onClick={scrollToWizard}
                  className="inline-flex items-center justify-between gap-2 w-full px-3.5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition-all cursor-pointer shadow-xs"
                  data-cursor="pointer"
                >
                  <span className="inline-flex items-center gap-2">
                    <Calculator size={14} />
                    {isEs ? 'Ir al Cotizador' : 'Open Quoter'}
                  </span>
                  <ArrowUpRight size={14} />
                </button>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-between gap-2 w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-white/[0.03] hover:bg-slate-100 dark:hover:bg-white/[0.07] border border-slate-200 dark:border-white/[0.08] text-slate-800 dark:text-slate-200 text-xs font-semibold transition-all"
                  data-cursor="pointer"
                >
                  <span className="inline-flex items-center gap-2">
                    <MessageCircle size={14} className="text-emerald-500" />
                    {isEs ? 'Consultar por WhatsApp' : 'Chat on WhatsApp'}
                  </span>
                  <ArrowUpRight size={14} className="text-slate-400" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Columna derecha: Lista interactiva de preguntas */}
          <div className="flex flex-col gap-3 sm:gap-3.5">
            {faqs.map((item, idx) => {
              const isOpen = openId === item.id;
              const panelId = `faq-panel-${item.id}`;
              const indexLabel = String(idx + 1).padStart(2, '0');

              return (
                <motion.article
                  key={item.id}
                  initial={{ opacity: 0, y: 18, scale: 0.985 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{
                    duration: 0.38,
                    delay: idx * 0.06,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                  className={`group relative rounded-2xl border transition-all duration-300 overflow-hidden ${isOpen
                      ? 'bg-white dark:bg-[#081326]/90 border-blue-300/90 dark:border-blue-500/40 shadow-[0_10px_30px_-12px_rgba(37,99,235,0.22)] dark:shadow-[0_12px_36px_-14px_rgba(59,130,246,0.28)]'
                      : 'bg-white/80 dark:bg-white/[0.02] border-slate-200/90 dark:border-white/[0.08] hover:border-blue-200 dark:hover:border-blue-400/25 hover:bg-white dark:hover:bg-white/[0.04]'
                    }`}
                >
                  {/* Barra lateral animada con layoutId al cambiar de pregunta */}
                  {isOpen && (
                    <motion.span
                      layoutId="faqActiveRail"
                      aria-hidden="true"
                      transition={{ type: 'spring', stiffness: 360, damping: 32 }}
                      className="absolute left-0 top-3 bottom-3 w-[3px] rounded-r-full bg-gradient-to-b from-blue-600 via-blue-500 to-cyan-400"
                    />
                  )}

                  {/* Brillo sutil superior cuando está activa */}
                  <div
                    aria-hidden="true"
                    className={`pointer-events-none absolute inset-x-0 top-0 h-px transition-opacity duration-300 bg-gradient-to-r from-transparent via-blue-400/50 to-transparent ${isOpen ? 'opacity-100' : 'opacity-0 group-hover:opacity-60'
                      }`}
                  />

                  <motion.button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    whileTap={{ scale: 0.992 }}
                    onClick={() => setOpenId(isOpen ? null : item.id)}
                    className="w-full flex items-center justify-between gap-3 sm:gap-4 px-4 sm:px-6 py-4 sm:py-5 text-left cursor-pointer select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60"
                    data-cursor="pointer"
                  >
                    <div className="flex items-start sm:items-center gap-3 sm:gap-4 min-w-0">
                      <span
                        className={`shrink-0 inline-flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-lg font-mono text-[0.7rem] sm:text-xs font-bold transition-all duration-300 mt-0.5 sm:mt-0 ${isOpen
                            ? 'bg-blue-600 text-white shadow-sm shadow-blue-600/30 dark:bg-blue-500/20 dark:text-cyan-300 dark:border dark:border-blue-400/35'
                            : 'bg-slate-100 dark:bg-white/[0.05] text-slate-500 dark:text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-300'
                          }`}
                      >
                        {indexLabel}
                      </span>

                      <h3
                        className={`text-sm sm:text-[1.02rem] font-bold leading-snug m-0 transition-colors duration-200 ${isOpen
                            ? 'text-slate-950 dark:text-white'
                            : 'text-slate-800 dark:text-slate-100 group-hover:text-blue-700 dark:group-hover:text-white'
                          }`}
                      >
                        {item.question}
                      </h3>
                    </div>

                    <span
                      aria-hidden="true"
                      className={`shrink-0 inline-flex items-center justify-center w-8 h-8 rounded-full border transition-all duration-300 ${isOpen
                          ? 'bg-blue-50 dark:bg-blue-500/15 border-blue-200 dark:border-blue-400/35 text-blue-600 dark:text-cyan-300 rotate-45'
                          : 'bg-slate-50 dark:bg-white/[0.03] border-slate-200 dark:border-white/[0.08] text-slate-500 dark:text-slate-400 group-hover:border-blue-200 dark:group-hover:border-white/20 group-hover:text-slate-800 dark:group-hover:text-white'
                        }`}
                    >
                      <Plus size={16} strokeWidth={2.25} />
                    </span>
                  </motion.button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={panelId}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{
                          height: 'auto',
                          opacity: 1,
                          transition: {
                            height: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
                            opacity: { duration: 0.22, delay: 0.06 }
                          }
                        }}
                        exit={{
                          height: 0,
                          opacity: 0,
                          transition: {
                            height: { duration: 0.24, ease: [0.22, 1, 0.36, 1] },
                            opacity: { duration: 0.14 }
                          }
                        }}
                        className="overflow-hidden"
                      >
                        <motion.div
                          initial={{ y: -6 }}
                          animate={{ y: 0 }}
                          exit={{ y: -4 }}
                          transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                          className="px-4 sm:px-6 pb-5 pt-0 pl-[3.25rem] sm:pl-[4.5rem]"
                        >
                          <div className="h-px w-full bg-gradient-to-r from-blue-500/25 via-slate-200 dark:via-white/[0.08] to-transparent mb-3.5" />
                          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed m-0">
                            {item.answer}
                          </p>
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.article>
              );
            })}

            {/* CTA compacto solo en mobile/tablet debajo de las preguntas */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.35 }}
              className="lg:hidden mt-2 p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.025] border border-slate-200 dark:border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                {isEs
                  ? '¿Querés cotizar tu proyecto ahora?'
                  : 'Ready to quote your project?'}
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={scrollToWizard}
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold cursor-pointer"
                >
                  <Calculator size={13} />
                  <span>{isEs ? 'Cotizar' : 'Quote'}</span>
                </button>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-white dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.1] text-slate-800 dark:text-slate-200 text-xs font-semibold"
                >
                  <MessageCircle size={13} className="text-emerald-500" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
