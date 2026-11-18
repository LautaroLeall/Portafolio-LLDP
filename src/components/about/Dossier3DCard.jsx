import { useRef, useState } from 'react';
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform
} from 'framer-motion';
import {
  GraduationCap,
  MapPin,
  Languages,
  ShieldCheck,
  Layers,
  Code2,
  Gauge,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import LogoLLDP from '../ui/LogoLLDP';

/**
 * Dossier3DCard — Tarjeta Interactiva de Perfil & Telemetría de Ingeniería
 * Diseño limpio, animaciones suaves con Framer Motion, pestañas interactivas
 * y sincronización en vivo con los pilares de ingeniería al hacer scroll o hover.
 */
export default function Dossier3DCard({
  isEs = true,
  activePillar = null,
  scrollProgress = 0,
  className = ''
}) {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [activeTab, setActiveTab] = useState('profile'); // 'profile' | 'metrics'

  // Coordenadas normalizadas del puntero (-0.5 a 0.5) para inclinación sutil y limpia
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 180, damping: 26, mass: 0.7 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  // Inclinación delicada (±4.5 deg) que no deforma la tipografía
  const rotateX = useTransform(smoothMouseY, [-0.5, 0.5], [4.5, -4.5]);
  const rotateY = useTransform(smoothMouseX, [-0.5, 0.5], [-4.5, 4.5]);

  // Coordenadas del brillo radial (en porcentaje)
  const glareX = useTransform(smoothMouseX, [-0.5, 0.5], [15, 85]);
  const glareY = useTransform(smoothMouseY, [-0.5, 0.5], [15, 85]);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  const credentials = [
    {
      id: 'uni',
      icon: GraduationCap,
      label: isEs ? 'Universidad' : 'University',
      value: isEs ? 'UNSTA (Desarrollo & QA)' : 'UNSTA (Software Dev & QA)',
      accent: 'text-blue-600 dark:text-[#3b82f6] bg-blue-50 dark:bg-blue-500/10 border-blue-100 dark:border-blue-500/20'
    },
    {
      id: 'loc',
      icon: MapPin,
      label: isEs ? 'Ubicación' : 'Location',
      value: isEs ? 'Tucumán, Argentina • Remoto' : 'Tucumán, Argentina • Remote',
      accent: 'text-blue-600 dark:text-[#3b82f6] bg-blue-50 dark:bg-blue-500/10 border-blue-100 dark:border-blue-500/20'
    },
    {
      id: 'lang',
      icon: Languages,
      label: isEs ? 'Idiomas' : 'Languages',
      value: isEs ? 'Español (Nativo) • Inglés (Técnico)' : 'Spanish (Native) • English (Technical)',
      accent: 'text-blue-600 dark:text-[#3b82f6] bg-blue-50 dark:bg-blue-500/10 border-blue-100 dark:border-blue-500/20'
    },
    {
      id: 'domain',
      icon: ShieldCheck,
      label: isEs ? 'Dominio Oficial' : 'Official Domain',
      value: 'lautarolealdev.com',
      isMono: true,
      accent: 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 border-emerald-100 dark:border-emerald-500/20'
    }
  ];

  const metrics = [
    {
      id: 'projects',
      icon: Layers,
      label: isEs ? 'Sistemas en Producción' : 'Production Systems',
      value: isEs ? '11 Proyectos Verificables' : '11 Verifiable Deployments'
    },
    {
      id: 'stack',
      icon: Code2,
      label: isEs ? 'Ecosistema Principal' : 'Core Ecosystem',
      value: 'React 19 • Node.js • SQL & NoSQL'
    },
    {
      id: 'perf',
      icon: Gauge,
      label: isEs ? 'Rendimiento Web' : 'Web Performance',
      value: isEs ? 'Carga < 1.2s • Core Web Vitals' : '< 1.2s Load • Core Web Vitals'
    },
    {
      id: 'qa',
      icon: CheckCircle2,
      label: isEs ? 'Estándar de Calidad' : 'Quality Standard',
      value: isEs ? 'Arquitectura Limpia & Seguridad JWT' : 'Clean Architecture & JWT Security'
    }
  ];

  const currentFocusLabel = activePillar
    ? `${activePillar.number} // ${activePillar.shortTitle || activePillar.title}`
    : isEs
      ? '00 // Perfil & Trayectoria'
      : '00 // Profile & Trajectory';

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`select-none perspective-[1200px] ${className}`}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d'
        }}
        className="relative rounded-2xl bg-white/95 dark:bg-[#020a15]/90 border border-slate-200/90 dark:border-white/10 p-5 sm:p-6 shadow-xl dark:shadow-2xl shadow-slate-200/60 dark:shadow-black/60 backdrop-blur-xl overflow-hidden transition-colors duration-300"
      >
        {/* Brillo radial limpio en tonos azul/cyan siguiendo el cursor */}
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-300 z-0"
          style={{
            opacity: isHovered ? 0.45 : 0,
            background: useTransform(
              [glareX, glareY],
              ([gx, gy]) =>
                `radial-gradient(circle 280px at ${gx}% ${gy}%, rgba(59, 130, 246, 0.18), rgba(6, 182, 212, 0.08) 45%, transparent 75%)`
            )
          }}
        />

        {/* Línea superior luminosa sutil */}
        <div className="absolute top-0 left-8 right-8 h-[2px] bg-gradient-to-r from-transparent via-blue-500/50 dark:via-cyan-400/50 to-transparent pointer-events-none" />

        <div className="relative z-10 flex flex-col">
          {/* 1. Cabecera de Identidad + Estado Activo */}
          <div className="flex items-center justify-between gap-3 pb-4 mb-4 border-b border-slate-100 dark:border-white/[0.08]">
            <div className="flex items-center gap-3.5 min-w-0">
              <LogoLLDP variant="icon" size={42} className="shrink-0 shadow-xs" />
              <div className="min-w-0">
                <h3 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white tracking-tight truncate m-0">
                  Lautaro Leal Del Prete
                </h3>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="relative flex h-2 w-2 shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                  </span>
                  <span className="font-mono text-[11px] text-blue-600 dark:text-cyan-400 font-semibold truncate">
                    Software Engineer • UNSTA
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* 2. Selector de Vista Interactivo (Credenciales vs Métricas) */}
          <div className="grid grid-cols-2 p-1 mb-4 rounded-xl bg-slate-100/80 dark:bg-white/[0.04] border border-slate-200/70 dark:border-white/[0.06]">
            {[
              { id: 'profile', label: isEs ? 'Credenciales' : 'Credentials' },
              { id: 'metrics', label: isEs ? 'Enfoque & Stack' : 'Focus & Stack' }
            ].map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative py-1.5 px-3 rounded-lg text-xs font-semibold transition-colors cursor-pointer select-none ${isActive
                    ? 'text-slate-900 dark:text-white'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                    }`}
                  data-cursor="pointer"
                >
                  {isActive && (
                    <motion.div
                      layoutId="dossier-active-tab-pill"
                      className="absolute inset-0 rounded-lg bg-white dark:bg-blue-600/20 border border-slate-200/80 dark:border-blue-500/30 shadow-2xs"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* 3. Contenido Animado por Pestaña */}
          <div className="min-h-[228px] flex flex-col justify-center">
            <AnimatePresence mode="wait">
              {activeTab === 'profile' ? (
                <motion.div
                  key="tab-profile"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.22, ease: 'easeOut' }}
                  className="flex flex-col gap-3"
                >
                  {credentials.map((item, idx) => {
                    const Icon = item.icon;
                    return (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05, duration: 0.25 }}
                        className="group flex items-center gap-3 p-2.5 rounded-xl hover:bg-blue-50/50 dark:hover:bg-white/[0.05] transition-all duration-200"
                      >
                        <div
                          className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-105 ${item.accent}`}
                        >
                          <Icon size={15} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <span className="block font-mono text-[10px] uppercase tracking-wider text-slate-400 dark:text-slate-500">
                            {item.label}
                          </span>
                          <span
                            className={`block text-xs sm:text-[13px] font-semibold truncate ${item.isMono
                              ? 'font-mono text-blue-600 dark:text-cyan-400'
                              : 'text-slate-800 dark:text-slate-100'
                              }`}
                          >
                            {item.value}
                          </span>
                        </div>
                      </motion.div>
                    );
                  })}
                </motion.div>
              ) : (
                <motion.div
                  key="tab-metrics"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.22, ease: 'easeOut' }}
                  className="flex flex-col gap-3"
                >
                  {metrics.map((item, idx) => {
                    const Icon = item.icon;
                    return (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05, duration: 0.25 }}
                        className="group flex items-center gap-3 p-2.5 rounded-xl hover:bg-blue-50/50 dark:hover:bg-white/[0.05] transition-all duration-200"
                      >
                        <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-cyan-400 flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-105">
                          <Icon size={15} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <span className="block font-mono text-[10px] uppercase tracking-wider text-slate-400 dark:text-slate-500">
                            {item.label}
                          </span>
                          <span className="block text-xs sm:text-[13px] font-semibold text-slate-800 dark:text-slate-100 truncate">
                            {item.value}
                          </span>
                        </div>
                      </motion.div>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* 4. Pie de Sincronización en Vivo con la Lectura / Pilar Activo */}
          <div className="mt-4 pt-3.5 border-t border-slate-100 dark:border-white/[0.08]">
            <div className="flex items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-1.5 min-w-0">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={currentFocusLabel}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.18 }}
                    className="font-mono text-[11px] font-bold text-slate-700 dark:text-slate-200 truncate"
                  >
                    {currentFocusLabel}
                  </motion.span>
                </AnimatePresence>
              </div>
              <span className="font-mono text-[10px] font-semibold text-blue-600 dark:text-cyan-400 shrink-0">
                {Math.round(Math.min(100, Math.max(12, scrollProgress * 100)))}%
              </span>
            </div>

            {/* Barra de progreso suave sincronizada con el scroll/pilar */}
            <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-white/[0.06] overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-400"
                animate={{
                  width: `${Math.min(100, Math.max(12, scrollProgress * 100))}%`
                }}
                transition={{ type: 'spring', stiffness: 140, damping: 24 }}
              />
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
