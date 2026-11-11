import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronDown,
  Check,
  AlertCircle
} from 'lucide-react';

const SERVICE_OPTIONS = [
  {
    id: 'paginas-web',
    number: '01',
    value: 'Páginas Web & Landing Pages',
    titleEs: 'Páginas Web & Landing Pages',
    titleEn: 'Websites & Landing Pages'
  },
  {
    id: 'sistemas-gestion',
    number: '02',
    value: 'Sistemas de Gestión & Paneles Admin',
    titleEs: 'Sistemas de Gestión & Paneles Admin',
    titleEn: 'Management Systems & Dashboards'
  },
  {
    id: 'ecommerce',
    number: '03',
    value: 'E-commerce & Tiendas Online',
    titleEs: 'E-commerce & Tiendas Online',
    titleEn: 'E-commerce & Online Stores'
  },
  {
    id: 'invitaciones',
    number: '04',
    value: 'Invitaciones Digitales & Eventos',
    titleEs: 'Invitaciones Digitales & Eventos',
    titleEn: 'Digital Invitations & Events'
  },
  {
    id: 'optimizacion',
    number: '05',
    value: 'Optimización Web & SEO',
    titleEs: 'Optimización Web & SEO',
    titleEn: 'Web Optimization & SEO'
  },
  {
    id: 'consultoria',
    number: '06',
    value: 'Consultoría Técnica / Otro',
    titleEs: 'Consultoría Técnica / Otro',
    titleEn: 'Technical Consulting / Other'
  }
];

/**
 * ServiceSelectDropdown — Selector Estilizado de Servicios
 * Reemplaza el select nativo con un menú flotante de cristal
 * enriquecido con números, iconos, descripciones y microanimaciones.
 */
export default function ServiceSelectDropdown({
  value,
  onChange,
  onBlur,
  error,
  isEs = true
}) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  // Cerrar al hacer clic fuera del componente
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        if (isOpen) {
          setIsOpen(false);
          if (onBlur) onBlur();
        }
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onBlur]);

  // Cerrar con Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
        if (onBlur) onBlur();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onBlur]);

  const selectedOption = SERVICE_OPTIONS.find((opt) => opt.value === value);

  const handleSelect = (val) => {
    onChange(val);
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Botón Trigger de Apertura */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className={`w-full flex items-center justify-between px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-slate-50 dark:bg-slate-950/70 border text-left text-base sm:text-sm transition-all outline-none cursor-pointer select-none ${error
          ? 'border-rose-500 dark:border-rose-500 focus:ring-2 focus:ring-rose-500/20'
          : isOpen
            ? 'border-blue-500 dark:border-cyan-400 ring-2 ring-blue-500/20 dark:ring-cyan-400/20'
            : 'border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20'
          }`}
        data-cursor="pointer"
      >
        <div className="flex items-center gap-2.5 min-w-0 pr-2">
          {selectedOption ? (
            <>
              <span className="font-medium text-slate-900 dark:text-white truncate">
                {isEs ? selectedOption.titleEs : selectedOption.titleEn}
              </span>
            </>
          ) : (
            <span className="text-slate-400 dark:text-slate-500">
              {isEs ? 'Seleccionar un servicio...' : 'Select a service...'}
            </span>
          )}
        </div>

        <ChevronDown
          size={16}
          className={`text-slate-400 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 text-blue-600 dark:text-cyan-400' : ''
            }`}
        />
      </button>

      {/* Menú Flotante de Cristal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            role="listbox"
            className="absolute left-0 right-0 top-full mt-2 z-50 bg-white/95 dark:bg-[#030914]/95 backdrop-blur-2xl border border-slate-200 dark:border-white/10 rounded-2xl shadow-2xl p-2 max-h-80 overflow-y-auto space-y-1"
          >

            {/* Lista de Opciones */}
            {SERVICE_OPTIONS.map((opt) => {
              const isSelected = value === opt.value;

              return (
                <button
                  key={opt.id}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => handleSelect(opt.value)}
                  className={`w-full flex items-start gap-3 p-2.5 sm:p-3 rounded-xl text-left transition-all cursor-pointer ${isSelected
                    ? 'bg-blue-50 dark:bg-blue-500/15 border border-blue-200 dark:border-blue-500/30'
                    : 'border border-transparent hover:bg-slate-100/70 dark:hover:bg-white/[0.04]'
                    }`}
                  data-cursor="pointer"
                >

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[11px] font-bold text-blue-600 dark:text-[#3b82f6]">
                        {opt.number}
                      </span>
                      <span className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white truncate">
                        {isEs ? opt.titleEs : opt.titleEn}
                      </span>
                    </div>
                  </div>

                  {isSelected && (
                    <div className="w-5 h-5 rounded-full bg-blue-600 dark:bg-cyan-400 text-white dark:text-slate-950 flex items-center justify-center shrink-0 mt-1 shadow-xs">
                      <Check size={12} strokeWidth={3} />
                    </div>
                  )}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Input oculto para compatibilidad con FormData y accesibilidad */}
      <input type="hidden" name="service" value={value} />

      {/* Mensaje de Error */}
      {error && (
        <span className="text-[11px] sm:text-xs text-rose-500 dark:text-rose-400 font-medium flex items-center gap-1 mt-1">
          <AlertCircle size={12} className="shrink-0" /> {error}
        </span>
      )}
    </div>
  );
}
