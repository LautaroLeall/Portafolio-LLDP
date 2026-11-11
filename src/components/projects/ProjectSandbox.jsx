import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  ShieldCheck,
  Smartphone,
  Tablet,
  Monitor,
  RotateCw,
  Play,
  Eye
} from 'lucide-react';

/**
 * ProjectSandbox — Viewport Responsivo de Previsualización en Vivo y Capturas
 */
export default function ProjectSandbox({ project, isEs }) {
  const [deviceMode, setDeviceMode] = useState('desktop'); // 'desktop' | 'tablet' | 'mobile'
  const [viewType, setViewType] = useState('sandbox'); // 'sandbox' | 'snapshot'
  const [iframeKey, setIframeKey] = useState(0);
  const [iframeLoaded, setIframeLoaded] = useState(false);

  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1200
  );

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isDesktopScreen = windowWidth >= 1024;
  const isTabletScreen = windowWidth >= 768 && windowWidth < 1024;
  const isMobileScreen = windowWidth < 768;

  const deviceWidths = {
    desktop: '100%',
    tablet: '768px',
    mobile: '390px'
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
      className="mb-20"
    >
      <div className="w-full max-w-[1240px] mx-auto px-4 sm:px-6">
        <div className="flex flex-wrap sm:flex-nowrap justify-between items-center gap-3 mb-4">
          {/* View Type Toggle */}
          <div className="inline-flex p-1 bg-slate-100 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 rounded-xl gap-1 shrink-0">
            <button
              onClick={() => setViewType('sandbox')}
              className={`inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer whitespace-nowrap select-none ${viewType === 'sandbox'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              data-cursor="pointer"
            >
              <Play size={14} />
              <span>{isEs ? 'Vivo' : 'Live'}</span>
            </button>
            <button
              onClick={() => {
                setViewType('snapshot');
                if (isDesktopScreen) setDeviceMode('desktop');
                else if (isTabletScreen) setDeviceMode('tablet');
                else setDeviceMode('mobile');
              }}
              className={`inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer whitespace-nowrap select-none ${viewType === 'snapshot'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              data-cursor="pointer"
            >
              <Eye size={15} />
              <span>{isEs ? 'Captura' : 'Snapshot'}</span>
            </button>
          </div>

          {/* Device Resolution Selector */}
          {viewType === 'sandbox' && (
            <div className="inline-flex items-center p-1 bg-slate-100 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 rounded-xl gap-1 shrink-0">
              {isDesktopScreen && (
                <button
                  onClick={() => setDeviceMode('desktop')}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 cursor-pointer whitespace-nowrap select-none ${deviceMode === 'desktop'
                    ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-semibold shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  title={isEs ? 'Vista Escritorio' : 'Desktop View'}
                  data-cursor="pointer"
                >
                  <Monitor size={14} />
                  <span>Desktop</span>
                </button>
              )}

              {(isDesktopScreen || isTabletScreen) && (
                <button
                  onClick={() => setDeviceMode('tablet')}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 cursor-pointer whitespace-nowrap select-none ${deviceMode === 'tablet'
                    ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-semibold shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  title={isEs ? 'Vista Tablet' : 'Tablet View'}
                  data-cursor="pointer"
                >
                  <Tablet size={14} />
                  <span>Tablet</span>
                </button>
              )}

              <button
                onClick={() => setDeviceMode('mobile')}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 cursor-pointer whitespace-nowrap select-none ${deviceMode === 'mobile'
                  ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-semibold shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                title={isEs ? 'Vista Móvil' : 'Mobile View'}
                data-cursor="pointer"
              >
                <Smartphone size={14} />
                <span>Mobile</span>
              </button>

              <button
                onClick={() => {
                  setIframeLoaded(false);
                  setIframeKey((prev) => prev + 1);
                }}
                className="p-1.5 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer select-none rounded-md hover:bg-slate-200 dark:hover:bg-slate-800"
                title={isEs ? 'Recargar entorno' : 'Reload frame'}
                aria-label={isEs ? 'Recargar entorno interactivo' : 'Reload interactive preview'}
                data-cursor="pointer"
              >
                <RotateCw size={14} />
              </button>
            </div>
          )}
        </div>

        {/* Interactive Screen Display Area */}
        <div className="w-full flex justify-center bg-slate-100/80 dark:bg-black/40 border border-slate-200 dark:border-white/10 rounded-2xl p-2.5 sm:p-4 md:p-8 backdrop-blur-md">
          <div
            className="w-full transition-all duration-300 bg-white dark:bg-[#020a15] border border-slate-200 dark:border-white/15 rounded-xl overflow-hidden shadow-2xl shadow-slate-300/50 dark:shadow-black/80"
            style={{ maxWidth: viewType === 'snapshot' || isMobileScreen ? '100%' : deviceWidths[deviceMode] }}
          >
            {/* Browser Mock Chrome */}
            <div className="flex items-center justify-between px-3 sm:px-4 py-2.5 sm:py-3 bg-slate-50 dark:bg-white/[0.03] border-b border-slate-200 dark:border-white/10 gap-3 sm:gap-4">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500/80" />
                <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-amber-500/80" />
                <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-emerald-500/80" />
              </div>
              <div className="flex-1 max-w-md mx-auto flex items-center justify-center gap-2 px-2.5 sm:px-3 py-1 bg-white dark:bg-black/50 border border-slate-200 dark:border-white/10 rounded-md text-[11px] sm:text-xs font-mono text-slate-600 dark:text-slate-400 truncate shadow-inner">
                <ShieldCheck size={13} className="text-emerald-500 dark:text-emerald-400 shrink-0" />
                <span className="truncate">{project.demo}</span>
              </div>
              <div className="w-8 sm:w-12 hidden sm:block" />
            </div>

            {/* Viewport Content */}
            <div
              data-cursor="native"
              data-sandbox-container="true"
              onMouseEnter={() => {
                window.dispatchEvent(new CustomEvent('lldp-cursor-hide'));
              }}
              onMouseLeave={() => {
                window.dispatchEvent(new CustomEvent('lldp-cursor-show'));
              }}
              className="relative w-full h-[720px] sm:h-[750px] md:h-[660px] bg-slate-50 dark:bg-black cursor-auto"
            >
              {viewType === 'sandbox' ? (
                <div className="relative w-full h-full overflow-hidden">
                  {!iframeLoaded && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-white dark:bg-[#020a15] gap-3 z-10">
                      <div className="w-8 h-8 rounded-full border-2 border-blue-600 dark:border-[#3b82f6] border-t-transparent animate-spin" />
                      <span className="font-mono text-xs text-slate-500 dark:text-slate-400 whitespace-nowrap">
                        {isEs ? 'Cargando sandbox interactivo...' : 'Loading interactive sandbox...'}
                      </span>
                    </div>
                  )}
                  <iframe
                    key={iframeKey}
                    src={project.demo}
                    title={`${project.title} Live Preview`}
                    className="border-none cursor-auto origin-top-left"
                    style={{
                      width: '111.111%',
                      height: '111.111%',
                      transform: 'scale(0.9)',
                      transformOrigin: '0 0'
                    }}
                    onLoad={() => setIframeLoaded(true)}
                    sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                  />
                </div>
              ) : (
                <div className="w-full h-full p-2 sm:p-4 md:p-6 flex items-center justify-center bg-slate-100 dark:bg-black/60 overflow-hidden">
                  <picture className="w-full h-full flex items-center justify-center">
                    {project.imageMobile && isMobileScreen && (
                      <source media="(max-width: 768px)" srcSet={project.imageMobile} />
                    )}
                    <img
                      src={isMobileScreen && project.imageMobile ? project.imageMobile : project.image}
                      alt={`Captura oficial de ${project.title}`}
                      className="w-full h-full rounded-lg object-contain shadow-2xl transition-all duration-300"
                      loading="lazy"
                    />
                  </picture>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
