import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Home,
  Terminal,
  ArrowLeft,
  Layers
} from 'lucide-react';
import LogoLLDP from '../components/ui/LogoLLDP';
import NotFound3DCanvas from '../components/ui/NotFound3DCanvas';
import { useLanguage } from '../hooks/useLanguage';
import { useTheme } from '../hooks/useTheme';

export default function NotFoundPage() {
  const { language } = useLanguage();
  const { theme } = useTheme();
  const isEs = language === 'es';
  const location = useLocation();
  const navigate = useNavigate();

  const [timestamp, setTimestamp] = useState('');

  useEffect(() => {
    const now = new Date();
    setTimestamp(now.toLocaleTimeString());
  }, []);

  return (
    <div className="w-full h-[100dvh] max-h-screen overflow-hidden flex flex-col justify-between items-center relative bg-slate-50 dark:bg-[#020813] text-slate-900 dark:text-[#f5f7fa] transition-colors duration-300 px-4 sm:px-8 py-4 sm:py-6 selection:bg-blue-500 selection:text-white select-none">
      {/* 1. Ambient Background Glowing Auras */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[480px] h-[300px] sm:h-[480px] rounded-full bg-blue-600/[0.08] dark:bg-blue-500/[0.12] blur-[80px] sm:blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[240px] sm:w-[360px] h-[240px] sm:h-[360px] rounded-full bg-cyan-500/[0.05] dark:bg-cyan-400/[0.08] blur-[70px] sm:blur-[100px] pointer-events-none" />

      {/* 2. Top Header Bar (Compact & Fixed within viewport) */}
      <header className="w-full max-w-[1100px] flex items-center justify-between z-10 shrink-0">
        <Link
          to="/"
          className="flex items-center gap-2 group transition-transform duration-200 hover:scale-105"
          data-cursor="pointer"
        >
          <LogoLLDP variant="icon" size={34} className="rounded-xl shadow-xs" />
        </Link>

        {/* Live Diagnostics Error Badge */}
        <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-red-500/25 bg-red-500/10 text-red-600 dark:text-red-400 font-mono text-[11px] shadow-xs backdrop-blur-md">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
          </span>
          <span className="font-bold tracking-wider whitespace-nowrap">
            404 // HTTP_ROUTE_UNRESOLVED
          </span>
        </div>
      </header>

      {/* 3. Center Hero Stage (Compact, Natural, Fits 100vh with Zero Scroll) */}
      <section className="w-full max-w-[1100px] flex-1 flex items-center justify-center my-auto py-2 sm:py-4 z-10 min-h-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-center w-full">
          {/* Left Column: Natural 3D Canvas Artifact (Compact & Parallax) */}
          <div className="flex flex-col items-center justify-center relative w-full h-[220px] sm:h-[260px] md:h-[300px] lg:h-[340px]">
            {/* Background 404 Watermark */}
            <span className="absolute inset-0 flex items-center justify-center font-extrabold text-[100px] sm:text-[140px] md:text-[170px] lg:text-[190px] text-slate-200/50 dark:text-white/[0.03] select-none pointer-events-none tracking-tighter leading-none font-mono">
              404
            </span>

            {/* Seamless 3D Canvas (Follows mouse, no click rotation) */}
            <div className="w-full h-full relative z-10 flex items-center justify-center">
              <NotFound3DCanvas theme={theme} />
            </div>
          </div>

          {/* Right Column: Narrative, Diagnostics & Interactive Controls */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-2 leading-tight">
              {isEs ? (
                <>
                  Página Fuera de{' '}
                  <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 dark:from-blue-400 dark:via-blue-500 dark:to-cyan-300 bg-clip-text text-transparent">
                    Órbita Web
                  </span>
                </>
              ) : (
                <>
                  Page Outside of{' '}
                  <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 dark:from-blue-400 dark:via-blue-500 dark:to-cyan-300 bg-clip-text text-transparent">
                    Web Orbit
                  </span>
                </>
              )}
            </h1>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-md mb-4">
              {isEs
                ? 'El recurso o endpoint que estás intentando consultar no existe en este servidor, ha sido reubicado o la dirección fue tipeada de forma incorrecta.'
                : 'The resource or endpoint you are attempting to query does not exist on this server, has been relocated, or was mistyped in the address bar.'}
            </p>

            {/* Diagnostic Terminal Card */}
            <div className="w-full max-w-md bg-white dark:bg-[#030d1d] border border-slate-200 dark:border-white/10 rounded-xl p-3 font-mono text-xs text-left mb-5 shadow-xs dark:shadow-md">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/[0.08] pb-2 mb-2">
                <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
                  <Terminal size={13} className="text-blue-500" />
                  <span className="font-bold text-[10px] uppercase">
                    {isEs ? 'Consola de Diagnóstico' : 'Diagnostic Console'}
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 dark:text-slate-500">
                  {timestamp || 'SYS_ACTIVE'}
                </span>
              </div>
              <div className="space-y-1 text-slate-600 dark:text-slate-300 text-[11px]">
                <p className="m-0 truncate">
                  <span className="text-blue-500 font-bold">&gt; REQUEST_PATH:</span>{' '}
                  <span className="text-amber-600 dark:text-amber-400 font-semibold">{location.pathname}</span>
                </p>
                <p className="m-0">
                  <span className="text-blue-500 font-bold">&gt; HTTP_STATUS:</span>{' '}
                  <span className="text-rose-500 font-bold">404 NOT FOUND</span>
                </p>
              </div>
            </div>

            {/* Interactive Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-md">
              {/* Primary: Return Home */}
              <Link
                to="/"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold rounded-xl shadow-md shadow-blue-500/20 hover:shadow-blue-500/35 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 whitespace-nowrap select-none w-full sm:w-auto flex-1 cursor-pointer"
                data-cursor="pointer"
              >
                <Home size={16} />
                <span>{isEs ? 'Volver al Inicio' : 'Return Home'}</span>
              </Link>

              {/* Secondary: Explore Projects */}
              <Link
                to="/proyectos"
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-white dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 text-slate-800 dark:text-white text-xs sm:text-sm font-semibold rounded-xl transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 whitespace-nowrap select-none w-full sm:w-auto shadow-2xs cursor-pointer"
                data-cursor="pointer"
              >
                <Layers size={15} className="text-blue-500" />
                <span>{isEs ? 'Ver Proyectos' : 'View Projects'}</span>
              </Link>

              {/* Tertiary: Go Back */}
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 bg-transparent hover:bg-slate-100/70 dark:hover:bg-white/5 border border-transparent hover:border-slate-200 dark:hover:border-white/10 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white text-xs sm:text-sm font-medium rounded-xl transition-all duration-200 whitespace-nowrap select-none w-full sm:w-auto cursor-pointer"
                data-cursor="pointer"
                title={isEs ? 'Regresar' : 'Go back'}
              >
                <ArrowLeft size={15} />
                <span>{isEs ? 'Atrás' : 'Back'}</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Bottom Empty Spacer to balance layout without footer */}
      <div className="h-2 shrink-0 pointer-events-none" />
    </div>
  );
}
