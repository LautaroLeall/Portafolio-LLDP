import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, CheckCircle2, ChevronDown, Check } from 'lucide-react';

/**
 * QuoteStepOptions — Paso 2 del Cotizador Interactivo
 */
export default function QuoteStepOptions({
  serviceConfig = {},
  selectedTier,
  setSelectedTier,
  selectedCustomOption,
  setSelectedCustomOption,
  selectedAddons = [],
  toggleAddon,
  isEs = true,
  onBack,
  onNext
}) {
  const {
    tierQuestion = isEs ? 'Nivel de Complejidad:' : 'Complexity Tier:',
    tiers = {},
    selectQuestion,
    selectOptions = [],
    addonsQuestion = isEs ? 'Módulos & Capacidades Opcionales:' : 'Optional Capabilities:',
    addons = []
  } = serviceConfig;

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Cerrar al hacer clic fuera del dropdown
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Cerrar al presionar la tecla Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsDropdownOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const selectedOptionObj = selectOptions.find((opt) => opt.id === selectedCustomOption) || selectOptions[0];
  const selectedOptionIndex = selectOptions.findIndex((opt) => opt.id === selectedCustomOption);

  return (
    <div className="flex flex-col gap-7">
      {/* Header del Paso 2 */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-white/10">
        <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white m-0">
          {isEs ? `2. Personalización:` : `2. Customization:`}
        </h3>
      </div>

      {/* 1. Selector de Tiers de Escala / Estructura del Servicio */}
      <div>
        <label className="block text-xs font-mono uppercase tracking-wider text-slate-700 dark:text-slate-300 font-semibold mb-3">
          {tierQuestion}
        </label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
          {Object.entries(tiers).map(([key, val], idx) => {
            const isSelected = selectedTier === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => setSelectedTier(key)}
                className={`flex items-start gap-3 p-4 sm:p-4.5 rounded-xl border text-left transition-all duration-200 cursor-pointer ${isSelected
                  ? 'bg-blue-50 border-blue-600 shadow-md shadow-blue-500/10 dark:bg-blue-500/15 dark:border-[#3b82f6]'
                  : 'bg-slate-50/70 dark:bg-white/[0.02] border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/[0.05]'
                  }`}
                data-cursor="pointer"
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-mono text-xs font-bold shrink-0 transition-colors ${isSelected
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-blue-500/15 border border-blue-500/30 text-blue-600 dark:text-[#3b82f6]'
                  }`}>
                  {String(idx + 1).padStart(2, '0')}
                </div>
                <div className="flex flex-col min-w-0 flex-1">
                  <span className="text-sm font-semibold text-slate-900 dark:text-white mb-1 leading-snug">
                    {val.label}
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    {val.desc}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Selector Personalizado del Servicio (Idéntico a ServiceSelectDropdown de Contacto) */}
      {selectQuestion && selectOptions.length > 0 && (
        <div className="flex flex-col gap-2">
          <label className="block text-xs font-mono uppercase tracking-wider text-slate-700 dark:text-slate-300 font-semibold">
            {selectQuestion}
          </label>

          <div ref={dropdownRef} className="relative w-full">
            {/* Trigger Button */}
            <button
              type="button"
              onClick={() => setIsDropdownOpen((prev) => !prev)}
              aria-haspopup="listbox"
              aria-expanded={isDropdownOpen}
              className={`w-full flex items-center justify-between px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-slate-50 dark:bg-slate-950/70 border text-left text-xs sm:text-sm transition-all outline-none cursor-pointer select-none ${isDropdownOpen
                ? 'border-blue-500 dark:border-cyan-400 ring-2 ring-blue-500/20 dark:ring-cyan-400/20'
                : 'border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20'
                }`}
              data-cursor="pointer"
            >
              <div className="flex items-center gap-2.5 min-w-0 pr-2">
                <span className="font-mono text-xs font-bold text-blue-600 dark:text-[#3b82f6]">
                  {String((selectedOptionIndex >= 0 ? selectedOptionIndex : 0) + 1).padStart(2, '0')}
                </span>
                <span className="font-medium text-slate-900 dark:text-white truncate">
                  {selectedOptionObj?.label || (isEs ? 'Seleccionar opción...' : 'Select an option...')}
                </span>
              </div>
              <ChevronDown
                size={16}
                className={`text-slate-400 shrink-0 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180 text-blue-600 dark:text-cyan-400' : ''
                  }`}
              />
            </button>

            {/* Menú Flotante de Cristal (Mismo diseño de Contacto) */}
            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -6, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -6, scale: 0.98 }}
                  transition={{ duration: 0.18, ease: 'easeOut' }}
                  role="listbox"
                  className="absolute left-0 right-0 top-full mt-2 z-50 bg-white/95 dark:bg-[#030914]/95 backdrop-blur-2xl border border-slate-200 dark:border-white/10 rounded-2xl shadow-2xl p-2 max-h-80 overflow-y-auto space-y-1"
                >
                  {selectOptions.map((opt, idx) => {
                    const isSelected = selectedCustomOption === opt.id;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        role="option"
                        aria-selected={isSelected}
                        onClick={() => {
                          setSelectedCustomOption(opt.id);
                          setIsDropdownOpen(false);
                        }}
                        className={`w-full flex items-center justify-between p-2.5 sm:p-3 rounded-xl text-left transition-all cursor-pointer gap-2 ${isSelected
                          ? 'bg-blue-50 dark:bg-blue-500/15 border border-blue-200 dark:border-blue-500/30'
                          : 'border border-transparent hover:bg-slate-100/70 dark:hover:bg-white/[0.04]'
                          }`}
                        data-cursor="pointer"
                      >
                        <div className="flex items-center gap-2.5 min-w-0 flex-1">
                          <span className="font-mono text-xs font-bold text-blue-600 dark:text-[#3b82f6] shrink-0">
                            {String(idx + 1).padStart(2, '0')}
                          </span>
                          <span className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white leading-snug break-words">
                            {opt.label}
                          </span>
                        </div>
                        {isSelected && (
                          <div className="w-5 h-5 rounded-full bg-blue-600 dark:bg-cyan-400 text-white dark:text-slate-950 flex items-center justify-center shrink-0 shadow-xs">
                            <Check size={12} strokeWidth={3} />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      )}

      {/* 3. Módulos & Funcionalidades Opcionales Específicas */}
      <div>
        <label className="block text-xs font-mono uppercase tracking-wider text-slate-700 dark:text-slate-300 font-semibold mb-3">
          {addonsQuestion}
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {addons.map((addon) => {
            const isChecked = selectedAddons.includes(addon.id);
            return (
              <button
                key={addon.id}
                type="button"
                onClick={() => toggleAddon(addon.id)}
                className={`flex justify-between items-center p-3.5 rounded-xl border text-left transition-all duration-200 cursor-pointer gap-2 ${isChecked
                  ? 'bg-blue-50 border-blue-600 shadow-xs dark:bg-blue-500/15 dark:border-[#3b82f6]'
                  : 'bg-slate-50/70 dark:bg-white/[0.02] border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/[0.04]'
                  }`}
                data-cursor="pointer"
              >
                <span className="text-xs sm:text-[0.82rem] font-medium text-slate-800 dark:text-slate-200 leading-snug">
                  {addon.label}
                </span>
                <CheckCircle2
                  size={16}
                  className={`shrink-0 transition-colors ${isChecked ? 'text-blue-600 dark:text-[#3b82f6]' : 'text-slate-300 dark:text-slate-700'
                    }`}
                />
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. Navegación entre Pasos */}
      <div className="flex justify-between items-center pt-3 border-t border-slate-200 dark:border-white/10">
        <button
          type="button"
          onClick={onBack}
          className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 rounded-xl text-xs sm:text-sm font-semibold cursor-pointer transition-colors"
          data-cursor="pointer"
        >
          {isEs ? 'Atrás' : 'Back'}
        </button>
        <button
          type="button"
          onClick={onNext}
          className="inline-flex items-center gap-2 px-6 py-2.5 sm:py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 cursor-pointer whitespace-nowrap shadow-md shadow-blue-500/25"
          data-cursor="pointer"
        >
          <span>{isEs ? 'Continuar al Resumen' : 'Proceed to Summary'}</span>
          <ArrowRight size={15} />
        </button>
      </div>
    </div>
  );
}
