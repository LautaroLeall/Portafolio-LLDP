import { motion, AnimatePresence } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { usePageLoader } from '../../hooks/usePageLoader';
import { useLanguage } from '../../hooks/useLanguage';

/**
 * PageLoader — Indicador Minimalista de Transición de Rutas y Cargas Asíncronas
 * Se activa al navegar entre páginas o cuando un proceso/sección demora en cargar.
 * No bloquea la pantalla completa; muestra una barra láser superior y una píldora flotante sutil.
 */
export default function PageLoader({ isLoading: propLoading, message: propMessage }) {
  const { isPageLoading, loadingMessage } = usePageLoader();
  const { language } = useLanguage();
  const isEs = language === 'es';

  const active = propLoading !== undefined ? propLoading : isPageLoading;
  const currentMsg = propMessage || loadingMessage;

  return (
    <AnimatePresence>
      {active && (
        <div className="fixed inset-0 pointer-events-none z-[9999] select-none" aria-live="polite">
          {/* 1. Barra Láser Superior de Navegación */}
          <motion.div
            initial={{ scaleX: 0, originX: 0 }}
            animate={{ scaleX: [0, 0.7, 1] }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.35,
              ease: [0.16, 1, 0.3, 1]
            }}
            className="fixed top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-blue-600 via-cyan-400 to-indigo-500 shadow-[0_0_12px_rgba(6,182,212,0.85)]"
          />

          {/* 2. Píldora Flotante Elegante (Se muestra cuando hay mensaje explícito o procesos con demora) */}
          {currentMsg && (
            <motion.div
              initial={{ opacity: 0, y: -12, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="fixed top-20 sm:top-24 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-slate-950/85 border border-white/15 text-white shadow-2xl backdrop-blur-md flex items-center gap-2.5 text-xs font-mono tracking-wide"
            >
              <Loader2 size={13} className="text-cyan-400 animate-spin shrink-0" />
              <span>{currentMsg || (isEs ? 'Cargando contenido...' : 'Loading content...')}</span>
            </motion.div>
          )}
        </div>
      )}
    </AnimatePresence>
  );
}
