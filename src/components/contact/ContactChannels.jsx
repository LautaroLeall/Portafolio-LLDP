import {
  Mail,
  Check,
  Copy,
  Clock,
  ArrowUpRight
} from 'lucide-react';
import { FaWhatsapp, FaLinkedin, FaGithub } from 'react-icons/fa';
import { CONTACT_INFO, buildWhatsAppUrl } from '../../data/servicesData';

/**
 * ContactChannels — Canales Directos y Enlaces Profesionales
 * WhatsApp, LinkedIn, GitHub y Copiar Correo con feedback
 */
export default function ContactChannels({
  isEs = true,
  emailCopied = false,
  onCopyEmail
}) {
  return (
    <aside className="lg:col-span-4 flex flex-col gap-3.5">

      {/* WhatsApp Direct */}
      <a
        href={buildWhatsAppUrl(
          isEs
            ? 'Hola Lautaro, me contacto desde tu portafolio web para consultar por un proyecto.'
            : 'Hello Lautaro, reaching out from your portfolio regarding a project.'
        )}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-between p-3.5 sm:p-4 rounded-xl bg-slate-50 dark:bg-white/[0.03] hover:bg-emerald-50 dark:hover:bg-emerald-500/10 border border-slate-200 dark:border-white/5 hover:border-emerald-300 dark:hover:border-emerald-500/30 text-slate-800 dark:text-slate-200 transition-all no-underline group select-none shadow-xs"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
            <FaWhatsapp size={19} />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-sm font-semibold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors truncate">
              WhatsApp Directo
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 truncate">
              {CONTACT_INFO.whatsappDisplay} • {isEs ? 'Respuesta rápida' : 'Fast replies'}
            </span>
          </div>
        </div>
        <ArrowUpRight size={16} className="text-slate-400 group-hover:text-emerald-500 transition-colors shrink-0 ml-2" />
      </a>

      {/* LinkedIn */}
      <a
        href={CONTACT_INFO.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-between p-3.5 sm:p-4 rounded-xl bg-slate-50 dark:bg-white/[0.03] hover:bg-blue-50 dark:hover:bg-blue-500/10 border border-slate-200 dark:border-white/5 hover:border-blue-300 dark:hover:border-blue-500/30 text-slate-800 dark:text-slate-200 transition-all no-underline group select-none shadow-xs"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-500/15 text-blue-600 dark:text-[#3b82f6] flex items-center justify-center shrink-0">
            <FaLinkedin size={18} />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-sm font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">
              LinkedIn Profesional
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 truncate">
              /in/lauldp • {isEs ? 'Perfil & Trayectoria' : 'Profile & Career'}
            </span>
          </div>
        </div>
        <ArrowUpRight size={16} className="text-slate-400 group-hover:text-blue-500 transition-colors shrink-0 ml-2" />
      </a>

      {/* GitHub */}
      <a
        href={CONTACT_INFO.github}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-between p-3.5 sm:p-4 rounded-xl bg-slate-50 dark:bg-white/[0.03] hover:bg-slate-100 dark:hover:bg-slate-500/10 border border-slate-200 dark:border-white/5 hover:border-slate-300 dark:hover:border-slate-500/30 text-slate-800 dark:text-slate-200 transition-all no-underline group select-none shadow-xs"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-200 dark:bg-slate-500/15 text-slate-800 dark:text-slate-300 flex items-center justify-center shrink-0">
            <FaGithub size={18} />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-sm font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors truncate">
              GitHub Developer
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 truncate">
              /LautaroLeall • {isEs ? 'Repositorios & Código' : 'Code & Repositories'}
            </span>
          </div>
        </div>
        <ArrowUpRight size={16} className="text-slate-400 group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors shrink-0 ml-2" />
      </a>

      {/* Email Copy Card */}
      <div
        className="flex items-center justify-between p-3.5 sm:p-4 rounded-xl bg-slate-50 dark:bg-white/[0.03] hover:bg-blue-50 dark:hover:bg-cyan-500/10 border border-slate-200 dark:border-white/5 hover:border-blue-300 dark:hover:border-cyan-500/30 text-slate-800 dark:text-slate-200 transition-all cursor-pointer select-none group shadow-xs"
        onClick={onCopyEmail}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-500/15 text-blue-600 dark:text-cyan-400 flex items-center justify-center shrink-0">
            <Mail size={18} />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-sm font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors truncate">
              {isEs ? 'Correo Electrónico' : 'Email Address'}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 truncate">{CONTACT_INFO.email}</span>
          </div>
        </div>
        <button
          type="button"
          className="px-2.5 py-1.5 rounded-md text-xs font-semibold bg-white dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-cyan-400/20 text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-cyan-300 border border-slate-200 dark:border-white/10 transition-all cursor-pointer shrink-0 ml-2"
          title={emailCopied ? (isEs ? 'Copiado' : 'Copied') : (isEs ? 'Copiar correo' : 'Copy email')}
          aria-label={emailCopied ? (isEs ? 'Correo copiado al portapapeles' : 'Email copied to clipboard') : (isEs ? 'Copiar correo al portapapeles' : 'Copy email to clipboard')}
          onClick={(e) => {
            e.stopPropagation();
            onCopyEmail();
          }}
        >
          {emailCopied ? <Check size={14} className="text-emerald-500 dark:text-emerald-400" /> : <Copy size={14} />}
        </button>
      </div>

      {/* Response Time Notice */}
      <div className="flex items-center gap-2 pt-2 px-1 text-xs text-slate-500 dark:text-slate-400">
        <Clock size={15} className="text-blue-500 dark:text-blue-400 shrink-0" />
        <span>{isEs ? 'Tiempo medio de respuesta: menos de 24 horas.' : 'Average response time: under 24 hours.'}</span>
      </div>
    </aside>
  );
}
