import { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';

/**
 * ServiceMockupCard — Componente Presentacional Modular para Consolas de Servicios
 */
export default function ServiceMockupCard({
  capabilities = [],
  activeColor = 'bg-blue-600',
  iconColor = 'bg-blue-500/20 text-blue-400',
  benefitColor = 'text-blue-400',
  badgeText = 'Incluido',
  footerIcon: FooterIcon,
  footerIconColor = 'text-blue-400',
  footerLeft = '',
  footerRight = ''
}) {
  const [activeIdx, setActiveIdx] = useState(0);
  const current = capabilities[activeIdx] || capabilities[0];
  if (!current) return null;

  const IconComp = current.icon;

  return (
    <div className="w-full max-w-[500px] h-[195px] min-h-[195px] max-h-[195px] sm:h-[200px] sm:min-h-[200px] sm:max-h-[200px] select-none rounded-xl bg-slate-900 border border-slate-800 text-slate-100 p-3 sm:p-4 flex flex-col justify-between shadow-xl overflow-hidden">
      {/* Botones de Capacidades en Grid */}
      <div className="grid grid-cols-3 gap-1 sm:gap-1.5 pb-1.5 border-b border-white/10 w-full" role="tablist">
        {capabilities.map((c, idx) => (
          <button
            key={c.id}
            type="button"
            role="tab"
            aria-selected={activeIdx === idx}
            onClick={() => setActiveIdx(idx)}
            className={`px-1.5 sm:px-2.5 py-1 rounded-lg text-[0.68rem] sm:text-xs font-semibold text-center truncate transition-all cursor-pointer ${activeIdx === idx
              ? `${activeColor} text-white shadow-xs`
              : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
              }`}
            data-cursor="pointer"
          >
            {c.button}
          </button>
        ))}
      </div>

      {/* Detalle del Servicio con Separación Garantizada */}
      <div className="flex flex-col gap-1 py-0.5 min-w-0">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 min-w-0 flex-1">
            <div className={`w-5 h-5 sm:w-6 sm:h-6 rounded-md ${iconColor} flex items-center justify-center shrink-0`}>
              <IconComp size={12} />
            </div>
            <span className="text-xs sm:text-sm font-bold text-white truncate">{current.title}</span>
          </div>
          <span className="text-[0.6rem] sm:text-[0.62rem] font-mono text-emerald-400 flex items-center gap-1 shrink-0 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
            <CheckCircle2 size={10} />
            <span>{badgeText}</span>
          </span>
        </div>

        <p className="text-[0.72rem] sm:text-xs text-slate-300 line-clamp-2 leading-relaxed">
          {current.desc}
        </p>

        <span className={`text-[0.65rem] sm:text-[0.68rem] font-mono ${benefitColor} font-medium truncate block`}>
          {current.benefit}
        </span>
      </div>

      {/* Pie Informativo en 1 Solo Renglón Conciso */}
      <div className="flex items-center justify-between gap-2 pt-1.5 border-t border-white/10 text-xs">
        <span className="text-[0.65rem] sm:text-[0.68rem] font-mono text-slate-400 truncate max-w-[62%]">
          {footerLeft}
        </span>
        <div className="inline-flex items-center gap-1 text-[0.65rem] sm:text-[0.68rem] font-mono text-slate-300 shrink-0">
          {FooterIcon && <FooterIcon size={10} className={footerIconColor} />}
          <span>{footerRight}</span>
        </div>
      </div>
    </div>
  );
}
