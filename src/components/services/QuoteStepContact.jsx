import {
  Mail,
  AlertCircle,
  Loader2,
  Sliders,
  Check
} from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';

/**
 * QuoteStepContact — Paso 3 del Cotizador Interactivo
 * Muestra la Ficha Técnica Ejecutiva (Dossier) y el Formulario Validado de Despacho Dual (EmailJS + WhatsApp).
 */
export default function QuoteStepContact({
  serviceName,
  serviceConfig = {},
  selectedTier,
  selectedCustomOptionObj,
  selectedAddons = [],
  clientName,
  clientEmail,
  clientPhone,
  projectDescription,
  setProjectDescription,
  errors = {},
  touched = {},
  isSubmittingEmail = false,
  onFieldChange,
  onFieldBlur,
  onSubmitEmail,
  onSendWhatsApp,
  onEditOptions,
  isEs = true
}) {
  return (
    <div>
      <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-6">
        {isEs ? '3. Resumen & Solicitud' : '3. Summary & Project'}
      </h3>

      {/* Dossier Ejecutivo de Configuración */}
      <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50/70 dark:bg-white/[0.03] p-4 sm:p-5 mb-6 shadow-xs">
        {/* Header de la Ficha Técnica */}
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-200 dark:border-white/[0.08] flex-wrap gap-2">
          <div className="flex items-center gap-2.5">
            <div className="flex flex-col">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold">
                {isEs ? 'Ficha de Configuración' : 'Technical Spec'}
              </span>
              <span className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                {serviceName}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={onEditOptions}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-blue-600 dark:text-[#3b82f6] hover:bg-blue-50 dark:hover:bg-blue-500/10 border border-blue-200 dark:border-blue-500/25 transition-colors cursor-pointer"
            data-cursor="pointer"
          >
            <Sliders size={13} />
            <span>{isEs ? 'Modificar' : 'Edit'}</span>
          </button>
        </div>

        {/* Detalles Clave en Pills / Chips elegantes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 text-xs">
          <div className="flex items-center justify-between p-2.5 sm:p-3 rounded-xl bg-white dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/5">
            <span className="text-slate-500 dark:text-slate-400 font-medium">
              {isEs ? 'Alcance:' : 'Scope:'}
            </span>
            <span className="font-semibold text-slate-900 dark:text-white text-right">
              {serviceConfig.tiers?.[selectedTier]?.label || selectedTier}
            </span>
          </div>

          {selectedCustomOptionObj && (
            <div className="flex items-center justify-between p-2.5 sm:p-3 rounded-xl bg-white dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/5">
              <span className="text-slate-500 dark:text-slate-400 font-medium shrink-0">
                {isEs ? 'Enfoque:' : 'Focus:'}
              </span>
              <span className="font-semibold text-slate-900 dark:text-white text-right ml-2 break-words">
                {selectedCustomOptionObj.label}
              </span>
            </div>
          )}

          <div
            className={`flex flex-col gap-1.5 p-2.5 sm:p-3 rounded-xl bg-white dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/5 ${selectedCustomOptionObj ? 'sm:col-span-2' : ''}`}
          >
            <div className="flex items-center justify-between">
              <span className="text-slate-500 dark:text-slate-400 font-medium">
                {isEs ? 'Módulos & Capacidades:' : 'Selected Modules:'}
              </span>
              <span className="font-mono text-[11px] font-bold text-blue-600 dark:text-[#3b82f6]">
                {selectedAddons.length > 0
                  ? `${selectedAddons.length} ${isEs ? 'elegidos' : 'selected'}`
                  : isEs
                    ? 'Plan base'
                    : 'Base setup'}
              </span>
            </div>

            {selectedAddons.length > 0 && (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {selectedAddons.map((addonId) => {
                  const addonLabel = serviceConfig.addons?.find((a) => a.id === addonId)?.label;
                  if (!addonLabel) return null;
                  return (
                    <span
                      key={addonId}
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-500/15 border border-blue-200 dark:border-blue-500/30 text-[11px] font-medium text-blue-700 dark:text-blue-300"
                    >
                      <Check size={11} strokeWidth={3} className="text-blue-600 dark:text-[#3b82f6]" />
                      <span>{addonLabel}</span>
                    </span>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Formulario Validado de Contacto & Despacho */}
      <form onSubmit={onSubmitEmail} noValidate className="flex flex-col gap-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="quote_name" className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
              {isEs ? 'Tu Nombre o Empresa *' : 'Your Name or Company *'}
            </label>
            <input
              id="quote_name"
              type="text"
              placeholder={isEs ? 'Ej: Martín Rodríguez' : 'e.g., John Smith'}
              value={clientName}
              onChange={(e) => onFieldChange('name', e.target.value)}
              onBlur={(e) => onFieldBlur('name', e.target.value)}
              className={`w-full px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-slate-50 dark:bg-slate-950/70 border text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-base sm:text-sm transition-all outline-none ${errors.name && touched.name
                  ? 'border-rose-500 dark:border-rose-500 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20'
                  : 'border-slate-200 dark:border-white/10 focus:border-blue-500 dark:focus:border-cyan-400 focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-cyan-400/20'
                }`}
            />
            {errors.name && touched.name && (
              <span className="text-[11px] sm:text-xs text-rose-500 dark:text-rose-400 font-medium flex items-center gap-1 mt-0.5">
                <AlertCircle size={12} className="shrink-0" /> {errors.name}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="quote_email" className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
              {isEs ? 'Correo Electrónico *' : 'Email Address *'}
            </label>
            <input
              id="quote_email"
              type="email"
              inputMode="email"
              placeholder={isEs ? 'martin@empresa.com' : 'john@company.com'}
              value={clientEmail}
              onChange={(e) => onFieldChange('email', e.target.value)}
              onBlur={(e) => onFieldBlur('email', e.target.value)}
              className={`w-full px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-slate-50 dark:bg-slate-950/70 border text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-base sm:text-sm transition-all outline-none ${errors.email && touched.email
                  ? 'border-rose-500 dark:border-rose-500 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20'
                  : 'border-slate-200 dark:border-white/10 focus:border-blue-500 dark:focus:border-cyan-400 focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-cyan-400/20'
                }`}
            />
            {errors.email && touched.email && (
              <span className="text-[11px] sm:text-xs text-rose-500 dark:text-rose-400 font-medium flex items-center gap-1 mt-0.5">
                <AlertCircle size={12} className="shrink-0" /> {errors.email}
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="quote_phone" className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
            {isEs ? 'WhatsApp / Celular *' : 'WhatsApp / Mobile Phone *'}
          </label>
          <input
            id="quote_phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            maxLength={22}
            placeholder={isEs ? 'Ej: +54 9 381 339 9463 o 381 339 9463' : 'E.g., +54 9 381 339 9463'}
            value={clientPhone}
            onChange={(e) => onFieldChange('phone', e.target.value)}
            onBlur={(e) => onFieldBlur('phone', e.target.value)}
            className={`w-full px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-slate-50 dark:bg-slate-950/70 border text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-base sm:text-sm transition-all outline-none ${errors.phone && touched.phone
                ? 'border-rose-500 dark:border-rose-500 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20'
                : 'border-slate-200 dark:border-white/10 focus:border-blue-500 dark:focus:border-cyan-400 focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-cyan-400/20'
              }`}
          />
          {errors.phone && touched.phone && (
            <span className="text-[11px] sm:text-xs text-rose-500 dark:text-rose-400 font-medium flex items-center gap-1 mt-0.5">
              <AlertCircle size={12} className="shrink-0" /> {errors.phone}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="quote_description" className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
            {isEs ? 'Detalles o requerimientos específicos (opcional):' : 'Project Details & Specific Goals (optional):'}
          </label>
          <textarea
            id="quote_description"
            rows={3}
            placeholder={
              isEs
                ? 'Describí el objetivo de tu software, necesidades particulares o fecha estimada...'
                : 'Describe your software goals, key requirements, or target timeline...'
            }
            value={projectDescription}
            onChange={(e) => setProjectDescription(e.target.value)}
            className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-base sm:text-sm outline-none focus:border-blue-500 dark:focus:border-cyan-400 focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-cyan-400/20 transition-all resize-y"
          />
        </div>

        {/* Dual Dispatch Actions: EmailJS (Automatic) and WhatsApp */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 pt-4">
          <button
            type="button"
            onClick={onEditOptions}
            className="w-full sm:w-auto px-5 py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 rounded-xl text-sm cursor-pointer transition-colors text-center"
            data-cursor="pointer"
          >
            {isEs ? 'Atrás' : 'Back'}
          </button>

          <div className="flex flex-col sm:flex-row items-center gap-2.5 w-full sm:w-auto">
            <button
              type="button"
              onClick={onSendWhatsApp}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer shadow-xs hover:-translate-y-0.5 whitespace-nowrap"
              data-cursor="pointer"
            >
              <FaWhatsapp size={16} />
              <span>{isEs ? 'Enviar a WhatsApp' : 'Send to WhatsApp'}</span>
            </button>

            <button
              type="submit"
              disabled={isSubmittingEmail}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 cursor-pointer shadow-md shadow-blue-500/25 whitespace-nowrap disabled:opacity-50"
              data-cursor="pointer"
            >
              {isSubmittingEmail ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  <span>{isEs ? 'Despachando...' : 'Dispatching...'}</span>
                </>
              ) : (
                <>
                  <Mail size={16} />
                  <span>{isEs ? 'Enviar por Correo' : 'Send via Email'}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
