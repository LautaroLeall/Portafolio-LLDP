import {
  Globe,
  Cpu,
  ShoppingCart,
  Sparkles,
  Zap,
  Calculator,
  ArrowRight
} from 'lucide-react';

/**
 * QuoteStepServices — Paso 1 del Cotizador Interactivo
 * Selección del tipo de solución de software
 */
export default function QuoteStepServices({
  services = [],
  selectedService,
  setSelectedService,
  isEs = true,
  onNext
}) {
  const getServiceIcon = (id) => {
    switch (id) {
      case 'paginas-web':
        return <Globe size={20} />;
      case 'sistemas-gestion':
      case 'sistemas-de-gestion':
        return <Cpu size={20} />;
      case 'tienda-online':
        return <ShoppingCart size={20} />;
      case 'invitaciones-digitales':
        return <Sparkles size={20} />;
      case 'mejora-web':
      case 'mejora-de-tu-web':
        return <Zap size={20} />;
      default:
        return <Calculator size={20} />;
    }
  };

  return (
    <div>
      <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-6">
        {isEs ? '1. Selecciona el Tipo de Solución' : '1. Select the Solution Type'}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {services.map((svc) => (
          <button
            key={svc.id}
            type="button"
            onClick={() => setSelectedService(svc.id)}
            className={`flex items-center gap-4 p-4 sm:p-5 rounded-xl border text-left transition-all duration-200 cursor-pointer ${selectedService === svc.id
              ? 'bg-blue-50 border-blue-600 shadow-md shadow-blue-500/10 dark:bg-blue-500/15 dark:border-[#3b82f6]'
              : 'bg-slate-50/70 dark:bg-white/[0.02] border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/[0.05]'
              }`}
            data-cursor="pointer"
          >
            <div className="w-11 h-11 rounded-xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-600 dark:text-[#3b82f6] shrink-0">
              {getServiceIcon(svc.id)}
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-sm sm:text-base font-semibold text-slate-900 dark:text-white mb-0.5 truncate">
                {svc.shortTitle}
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                {svc.subtitle}
              </span>
            </div>
          </button>
        ))}
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          onClick={onNext}
          className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 cursor-pointer whitespace-nowrap shadow-md"
          data-cursor="pointer"
        >
          <span>{isEs ? 'Siguiente' : 'Next'}</span>
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}
