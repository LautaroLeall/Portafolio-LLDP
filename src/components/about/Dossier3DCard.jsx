import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { GraduationCap, MapPin, Languages, ShieldCheck } from 'lucide-react';
import LogoLLDP from '../ui/LogoLLDP';

/**
 * Dossier3DCard — Interactive 3D Holographic Engineering Badge
 * Features:
 * - Real-time 3D cursor tilt with spring dampening
 * - Layered stereoscopic depth (translateZ)
 * - Dynamic specular holographic glint tracking the mouse
 */
export default function Dossier3DCard({ isEs = true, className = '' }) {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse coordinates normalized (-0.5 to 0.5)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Organic spring physics for rotation
  const springConfig = { stiffness: 240, damping: 22, mass: 0.6 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  // 3D rotation angles (-12deg to +12deg)
  const rotateX = useTransform(smoothMouseY, [-0.5, 0.5], [12, -12]);
  const rotateY = useTransform(smoothMouseX, [-0.5, 0.5], [-12, 12]);

  // Dynamic glare coordinates (percentage)
  const glareX = useTransform(smoothMouseX, [-0.5, 0.5], [10, 90]);
  const glareY = useTransform(smoothMouseY, [-0.5, 0.5], [10, 90]);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`select-none perspective-[1200px] ${className}`}
      data-cursor="pointer"
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d'
        }}
        className="relative rounded-2xl bg-white/95 dark:bg-[#020a15]/90 border border-slate-200/90 dark:border-white/10 p-6 sm:p-8 shadow-xl dark:shadow-2xl shadow-blue-500/5 dark:shadow-black/60 backdrop-blur-xl transition-shadow duration-300 hover:shadow-2xl hover:shadow-blue-500/10 dark:hover:shadow-blue-900/20"
      >
        {/* Holographic Specular Glint */}
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-300 z-30"
          style={{
            opacity: isHovered ? 0.4 : 0,
            background: useTransform(
              [glareX, glareY],
              ([gx, gy]) =>
                `radial-gradient(circle 320px at ${gx}% ${gy}%, rgba(59, 130, 246, 0.3), rgba(147, 51, 234, 0.12) 40%, transparent 75%)`
            )
          }}
        />

        {/* Ambient Top Cyber Accent Line */}
        <div className="absolute top-0 left-8 right-8 h-[2px] bg-gradient-to-r from-transparent via-blue-500/40 dark:via-blue-400/50 to-transparent pointer-events-none" />

        {/* Internal 3D Content Layers */}
        <div style={{ transformStyle: 'preserve-3d' }}>
          {/* Card Header with Brand Icon + Status Chip */}
          <div
            style={{ transform: 'translateZ(30px)' }}
            className="flex items-start justify-between gap-4 mb-7 border-b border-slate-100 dark:border-white/[0.08] pb-6"
          >
            <div className="flex items-center gap-4">
              <div className="relative">
                <LogoLLDP variant="icon" size={46} />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                    Lautaro Leal Del Prete
                  </h3>
                </div>
                <span className="font-mono text-xs text-blue-600 dark:text-[#3b82f6] font-semibold whitespace-nowrap">
                  Software Engineer
                </span>
              </div>
            </div>
          </div>

          {/* Dossier Credential Fields */}
          <div className="flex flex-col gap-5">
            {/* Universidad */}
            <div
              style={{ transform: 'translateZ(20px)' }}
              className="flex items-start gap-3.5 group/row"
            >
              <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-500/10 border border-blue-100 dark:border-blue-500/20 flex items-center justify-center shrink-0 text-blue-600 dark:text-[#3b82f6] transition-transform duration-200 group-hover/row:scale-110">
                <GraduationCap size={16} />
              </div>
              <div>
                <span className="block font-mono text-[0.72rem] text-slate-500 dark:text-slate-400 mb-0.5 whitespace-nowrap">
                  {isEs ? 'Universidad:' : 'University:'}
                </span>
                <span className="text-sm text-slate-800 dark:text-white font-medium">
                  {isEs ? 'UNSTA (Desarrollo & QA)' : 'UNSTA (Software Dev & QA)'}
                </span>
              </div>
            </div>

            {/* Ubicación */}
            <div
              style={{ transform: 'translateZ(20px)' }}
              className="flex items-start gap-3.5 group/row"
            >
              <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-500/10 border border-blue-100 dark:border-blue-500/20 flex items-center justify-center shrink-0 text-blue-600 dark:text-[#3b82f6] transition-transform duration-200 group-hover/row:scale-110">
                <MapPin size={16} />
              </div>
              <div>
                <span className="block font-mono text-[0.72rem] text-slate-500 dark:text-slate-400 mb-0.5 whitespace-nowrap">
                  {isEs ? 'Ubicación:' : 'Location:'}
                </span>
                <span className="text-sm text-slate-800 dark:text-white font-medium">
                  {isEs ? 'Tucumán, Argentina (Remoto)' : 'Tucumán, Argentina (Remote)'}
                </span>
              </div>
            </div>

            {/* Idiomas */}
            <div
              style={{ transform: 'translateZ(20px)' }}
              className="flex items-start gap-3.5 group/row"
            >
              <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-500/10 border border-blue-100 dark:border-blue-500/20 flex items-center justify-center shrink-0 text-blue-600 dark:text-[#3b82f6] transition-transform duration-200 group-hover/row:scale-110">
                <Languages size={16} />
              </div>
              <div>
                <span className="block font-mono text-[0.72rem] text-slate-500 dark:text-slate-400 mb-0.5 whitespace-nowrap">
                  {isEs ? 'Idiomas:' : 'Languages:'}
                </span>
                <span className="text-sm text-slate-800 dark:text-white font-medium">
                  {isEs ? 'Español (Nativo) • Inglés (Técnico)' : 'Spanish (Native) • English (Technical)'}
                </span>
              </div>
            </div>

            {/* Dominio Oficial */}
            <div
              style={{ transform: 'translateZ(24px)' }}
              className="flex items-start gap-3.5 group/row pt-5 border-t border-slate-100 dark:border-white/[0.06]"
            >
              <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-100 dark:border-emerald-500/20 flex items-center justify-center shrink-0 text-emerald-600 dark:text-emerald-400 transition-transform duration-200 group-hover/row:scale-110">
                <ShieldCheck size={16} />
              </div>
              <div>
                <span className="block font-mono text-[0.72rem] text-slate-500 dark:text-slate-400 mb-0.5 whitespace-nowrap">
                  {isEs ? 'Dominio Oficial:' : 'Official Domain:'}
                </span>
                <span className="text-sm font-mono text-blue-600 dark:text-blue-400 font-medium whitespace-nowrap">
                  lautarolealdev.com
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
