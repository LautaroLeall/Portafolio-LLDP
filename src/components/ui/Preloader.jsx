import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../hooks/useLanguage';

/**
 * Preloader — Terminal de Arranque Minimalista y Real
 * Se ejecuta EXCLUSIVAMENTE una vez al abrir o recargar el portafolio.
 * Rápido (~1.25s), sin badges ni iconos innecesarios, 100% natural.
 */
export default function Preloader({ onComplete }) {
  const { language } = useLanguage();
  const isEs = language === 'es';

  const [step, setStep] = useState(0);
  const completedRef = useRef(false);

  const handleFinish = useCallback(() => {
    if (completedRef.current) return;
    completedRef.current = true;
    if (onComplete) {
      onComplete();
    }
  }, [onComplete]);

  // Teclas rápidas para saltar al instante (ESC, Enter, Espacio)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleFinish();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleFinish]);

  // Secuencia rápida y natural de terminal (~1.25s total)
  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const t1 = setTimeout(() => setStep(1), 180);
    const t2 = setTimeout(() => setStep(2), 420);
    const t3 = setTimeout(() => setStep(3), 680);
    const t4 = setTimeout(() => setStep(4), 920);
    const t5 = setTimeout(() => handleFinish(), 1250);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
      document.body.style.overflow = prevOverflow;
    };
  }, [handleFinish]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        scale: 1.02,
        filter: 'blur(6px)',
        transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] }
      }}
      onClick={handleFinish}
      className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#070b14] text-white select-none overflow-hidden cursor-pointer"
      aria-live="polite"
      aria-label="Cargando portafolio de Lautaro Leal Del Prete"
    >
      {/* Ventana de Terminal Limpia */}
      <motion.div
        initial={{ opacity: 0, scale: 0.97, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.24, ease: 'easeOut' }}
        onClick={(e) => e.stopPropagation()}
        className="relative z-10 w-[92%] max-w-[500px] bg-[#0c111d] border border-white/[0.08] rounded-xl shadow-2xl shadow-black/80 overflow-hidden font-mono text-xs sm:text-[13px]"
      >
        {/* Barra superior de ventana */}
        <div className="px-4 py-2.5 bg-[#090d16] border-b border-white/[0.06] flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
          </div>

          <span className="text-[11px] text-slate-500 font-medium">
            portafolio-lldp — zsh
          </span>

          <button
            type="button"
            onClick={handleFinish}
            className="text-[11px] text-slate-500 hover:text-slate-300 transition-colors cursor-pointer select-none"
            data-cursor="pointer"
          >
            {isEs ? 'esc para omitir' : 'esc to skip'}
          </button>
        </div>

        {/* Cuerpo de la Terminal */}
        <div className="p-4 sm:p-5 text-slate-300 leading-relaxed space-y-2">
          {/* Prompt inicial */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-emerald-400 font-bold">$</span>
            <span className="text-cyan-400">portafolio</span>
            <span className="text-blue-400">git:(main)</span>
            <span className="text-white">npm run dev</span>
          </div>

          {/* Línea 1: Vite listo */}
          {step >= 1 && (
            <div className="pt-2 text-slate-400">
              <span className="text-emerald-400 font-bold">VITE v7.1.3</span>{' '}
              <span className="text-slate-500">ready in 184 ms</span>
            </div>
          )}

          {/* Línea 2: Localhost */}
          {step >= 2 && (
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-emerald-400 font-bold">&gt;</span>
                <span className="text-slate-400">Local:</span>
                <span className="text-cyan-300">http://localhost:5173/</span>
              </div>
              <div className="flex items-center gap-2 text-slate-500 text-[11px] sm:text-xs">
                <span className="opacity-0">&gt;</span>
                <span>Network:</span>
                <span>use --host to expose</span>
              </div>
            </div>
          )}

          {/* Línea 3: Autor / Identidad */}
          {step >= 3 && (
            <div className="pt-1 flex items-center gap-2">
              <span className="text-emerald-400 font-bold">&gt;</span>
              <span className="text-slate-400">{isEs ? 'Autor:' : 'Author:'}</span>
              <span className="text-slate-100 font-medium">Lautaro Leal Del Prete</span>
            </div>
          )}

          {/* Línea 4: Listo y cursor parpadeante */}
          {step >= 4 && (
            <div className="pt-2 flex items-center gap-1.5 text-slate-400">
              <span className="text-slate-500">{isEs ? 'iniciando sesión...' : 'starting session...'}</span>
              <span className="inline-block w-1.5 h-3.5 bg-slate-300 animate-pulse" />
            </div>
          )}
        </div>
      </motion.div>

      {/* Indicador discreto al pie */}
      <span className="relative z-10 text-[11px] font-mono text-slate-600 mt-3 select-none">
        {isEs ? 'clic o [ESC] para continuar' : 'click or [ESC] to continue'}
      </span>
    </motion.div>
  );
}
