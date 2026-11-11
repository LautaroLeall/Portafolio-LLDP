import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import {
  Calculator,
  Mail,
  AlertCircle,
  Loader2,
  Sliders,
  Check
} from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { sileo } from 'sileo';
import QuoteStepServices from './QuoteStepServices';
import QuoteStepOptions from './QuoteStepOptions';
import { sendContactEmail } from '../../services/emailService';
import { buildWhatsAppUrl } from '../../data/servicesData';
import { getServicePricingConfig } from '../../data/pricingData';

/**
 * QuoteWizard — Cotizador Interactivo de Proyectos Web en 3 Pasos
 * Permite configurar requerimientos técnicos y despachar la cotización
 * automáticamente por EmailJS o coordinar vía WhatsApp.
 */
export default function QuoteWizard({
  services = [],
  isEs = true,
  preselectedServiceId = null
}) {
  const [wizardStep, setWizardStep] = useState(1);
  const [selectedService, setSelectedService] = useState(services[0]?.id || 'paginas-web');

  const currentServiceObj = useMemo(
    () => services.find((s) => s.id === selectedService),
    [services, selectedService]
  );

  const serviceConfig = useMemo(
    () => getServicePricingConfig(selectedService, isEs ? 'es' : 'en'),
    [selectedService, isEs]
  );

  const [selectedTier, setSelectedTier] = useState(
    () => Object.keys(serviceConfig.tiers)[0] || 'landing'
  );
  const [selectedCustomOption, setSelectedCustomOption] = useState(
    () => serviceConfig.selectOptions?.[0]?.id || ''
  );
  const [selectedAddons, setSelectedAddons] = useState([]);

  const selectedCustomOptionObj = useMemo(
    () => serviceConfig.selectOptions?.find((o) => o.id === selectedCustomOption),
    [serviceConfig, selectedCustomOption]
  );
  const [projectDescription, setProjectDescription] = useState('');
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmittingEmail, setIsSubmittingEmail] = useState(false);
  const quoteToastRef = useRef(null);

  // Limpiar toasts de Sileo con animación suave al desmontar la sección
  useEffect(() => {
    return () => {
      const viewport = document.querySelector('[data-sileo-viewport]');
      if (viewport) {
        viewport.classList.add('sileo-route-exit');
        setTimeout(() => {
          sileo.clear();
          viewport.classList.remove('sileo-route-exit');
        }, 360);
      } else {
        sileo.clear();
      }
    };
  }, []);

  const lastPreselectedRef = useRef(preselectedServiceId);

  const handleSelectService = useCallback((serviceId) => {
    setSelectedService(serviceId);
    const newConfig = getServicePricingConfig(serviceId, isEs ? 'es' : 'en');
    const firstTier = Object.keys(newConfig.tiers)[0] || '';
    const firstOption = newConfig.selectOptions?.[0]?.id || '';
    setSelectedTier(firstTier);
    setSelectedCustomOption(firstOption);
    setSelectedAddons([]);
  }, [isEs]);

  useEffect(() => {
    if (preselectedServiceId && preselectedServiceId !== lastPreselectedRef.current) {
      lastPreselectedRef.current = preselectedServiceId;
      handleSelectService(preselectedServiceId);
    }
  }, [preselectedServiceId, handleSelectService]);

  useEffect(() => {
    if (!serviceConfig.tiers[selectedTier]) {
      setSelectedTier(Object.keys(serviceConfig.tiers)[0] || '');
    }
    if (serviceConfig.selectOptions?.length > 0 && !serviceConfig.selectOptions.find((o) => o.id === selectedCustomOption)) {
      setSelectedCustomOption(serviceConfig.selectOptions[0]?.id || '');
    }
  }, [serviceConfig, selectedTier, selectedCustomOption]);

  const toggleAddon = (addonId) => {
    setSelectedAddons((prev) =>
      prev.includes(addonId)
        ? prev.filter((id) => id !== addonId)
        : [...prev, addonId]
    );
  };

  const validateField = (field, value) => {
    const val = (value || '').trim();
    if (field === 'name') {
      if (!val) return isEs ? 'Ingresá tu nombre o empresa.' : 'Please enter your name or company.';
      if (val.length < 2) return isEs ? 'Mínimo 2 caracteres.' : 'At least 2 characters.';
    }
    if (field === 'email') {
      if (!val) return isEs ? 'Ingresá tu correo.' : 'Please enter your email.';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
        return isEs ? 'Correo inválido (ej: nombre@empresa.com).' : 'Invalid email address.';
      }
    }
    return '';
  };

  const validateStep3 = (nameVal = clientName, emailVal = clientEmail) => {
    const nameErr = validateField('name', nameVal);
    const emailErr = validateField('email', emailVal);
    const newErrors = {};
    if (nameErr) newErrors.name = nameErr;
    if (emailErr) newErrors.email = emailErr;
    setErrors(newErrors);

    // Si ambos son válidos, descartar el toast de error si estaba abierto
    if (Object.keys(newErrors).length === 0 && quoteToastRef.current) {
      sileo.dismiss(quoteToastRef.current);
      quoteToastRef.current = null;
    }
    return Object.keys(newErrors).length === 0;
  };

  const buildBriefText = () => {
    const currentSvc = services.find((s) => s.id === selectedService);
    const tierObj = serviceConfig.tiers?.[selectedTier];
    const selectOptObj = serviceConfig.selectOptions?.find((o) => o.id === selectedCustomOption);
    const addonNames = selectedAddons
      .map((id) => serviceConfig.addons?.find((a) => a.id === id)?.label)
      .filter(Boolean);

    let brief = `*SOLICITUD DE PROYECTO WEB — lautarolealdev.com*\n----------------------------------------\n`;
    brief += `*Cliente / Contacto:* ${clientName.trim()}\n`;
    brief += `*Correo:* ${clientEmail.trim()}\n`;
    if (clientPhone) brief += `*Teléfono / WhatsApp:* ${clientPhone.trim()}\n`;
    brief += `*Servicio Seleccionado:* ${currentSvc?.shortTitle || selectedService}\n`;
    brief += `*${serviceConfig.tierQuestion || (isEs ? 'Tipo / Alcance:' : 'Scope / Tier:')}* ${tierObj?.label || selectedTier}\n`;
    if (selectOptObj) {
      brief += `*${serviceConfig.selectQuestion || (isEs ? 'Preferencia:' : 'Preference:')}* ${selectOptObj.label}\n`;
    }
    brief += `*${serviceConfig.addonsQuestion || (isEs ? 'Módulos / Adicionales:' : 'Add-ons:')}* ${addonNames.length > 0 ? addonNames.join(', ') : (isEs ? 'Ninguno especificado' : 'None specified')}\n`;
    if (projectDescription.trim()) {
      brief += `\n*Detalles / Requerimientos:* ${projectDescription.trim()}\n`;
    }
    brief += `----------------------------------------\n_Generado desde el cotizador interactivo de Lautaro Leal._`;
    return brief;
  };

  // Despacho 100% automático mediante EmailJS (no abre mailto ni pestañas externas)
  const handleSendQuoteEmail = async (e) => {
    e.preventDefault();
    setTouched({ name: true, email: true });

    if (!validateStep3()) {
      if (quoteToastRef.current) sileo.dismiss(quoteToastRef.current);
      quoteToastRef.current = sileo.warning({
        title: isEs ? 'Campos obligatorios incompletos' : 'Required fields missing',
        description: isEs
          ? 'Por favor completá tu nombre y un correo válido para despachar la cotización.'
          : 'Please provide your name and a valid email address.',
        duration: 4500
      });
      return;
    }

    setIsSubmittingEmail(true);

    try {
      const currentSvc = services.find((s) => s.id === selectedService);
      const tierObj = serviceConfig.tiers?.[selectedTier];
      const briefMessage = buildBriefText();

      await sendContactEmail({
        name: clientName,
        email: clientEmail,
        phone: clientPhone,
        service: currentSvc?.shortTitle || selectedService,
        subject: `Cotización Web: ${currentSvc?.shortTitle || selectedService} (${tierObj?.label || selectedTier})`,
        message: briefMessage
      });

      if (quoteToastRef.current) {
        sileo.dismiss(quoteToastRef.current);
        quoteToastRef.current = null;
      }

      sileo.success({
        title: isEs ? '¡Cotización enviada con éxito!' : 'Quote dispatched successfully!',
        description: isEs
          ? 'Lautaro recibió tu requerimiento técnico por correo y te responderá en breve.'
          : 'Lautaro received your technical brief by email and will reply shortly.',
        duration: 5500
      });
    } catch (err) {
      console.error('[QuoteWizard] Error al enviar cotización por correo:', err);
      sileo.error({
        title: isEs ? 'Error en el envío automático' : 'Automatic sending failed',
        description: isEs
          ? 'No se pudo despachar el correo. Podés usar la opción de WhatsApp directo.'
          : 'Could not send the email. You may use direct WhatsApp instead.',
        duration: 5000
      });
    } finally {
      setIsSubmittingEmail(false);
    }
  };

  // Despacho alternativo por WhatsApp
  const handleSendQuoteWhatsApp = () => {
    setTouched({ name: true, email: true });
    if (!validateStep3()) {
      if (quoteToastRef.current) sileo.dismiss(quoteToastRef.current);
      quoteToastRef.current = sileo.warning({
        title: isEs ? 'Campos requeridos incompletos' : 'Required fields missing',
        description: isEs
          ? 'Completá tu nombre y correo antes de abrir WhatsApp.'
          : 'Provide your name and email before launching WhatsApp.',
        duration: 4500
      });
      return;
    }

    const message = buildBriefText();
    const whatsappUrl = buildWhatsAppUrl(message);

    if (quoteToastRef.current) {
      sileo.dismiss(quoteToastRef.current);
      quoteToastRef.current = null;
    }

    sileo.success({
      title: isEs ? 'Brief preparado' : 'Brief prepared',
      description: isEs ? 'Abriendo WhatsApp con tu cotización...' : 'Launching WhatsApp with your quote...',
      duration: 3500
    });
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="cotizador-wizard" className="pt-16 pb-8 border-t border-slate-200 dark:border-white/[0.08]">
      <div className="w-full max-w-[1240px] mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Calculator size={16} className="text-blue-600 dark:text-[#3b82f6]" />
            <span className="font-mono text-xs font-bold tracking-widest text-blue-600 dark:text-[#3b82f6] uppercase">
              {isEs ? 'Solicitud de Proyecto' : 'Project Proposal'}
            </span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-3 tracking-tight">
            {isEs ? (
              <>Cotizador de <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 dark:from-blue-400 dark:via-blue-500 dark:to-sky-300 bg-clip-text text-transparent">Proyectos Web</span></>
            ) : (
              <>Interactive Project <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 dark:from-blue-400 dark:via-blue-500 dark:to-sky-300 bg-clip-text text-transparent">Quoter</span></>
            )}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
            {isEs
              ? 'Configura el alcance y requerimientos técnicos de tu software para despachar el brief automáticamente por correo o WhatsApp.'
              : 'Configure the scope and technical requirements of your software to dispatch the brief automatically via email or WhatsApp.'}
          </p>
        </div>

        <div className="max-w-4xl mx-auto bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/[0.09] rounded-2xl p-5 sm:p-8 md:p-10 backdrop-blur-md shadow-xl dark:shadow-2xl shadow-slate-200/50 dark:shadow-black/50">
          {/* Step Indicators — Centrado perfecto y 100% responsive sin saltos de línea */}
          <div className="w-full max-w-sm sm:max-w-md mx-auto flex items-center justify-between gap-1 sm:gap-2 mb-8 sm:mb-10 select-none">
            <button
              type="button"
              onClick={() => setWizardStep(1)}
              className={`inline-flex items-center gap-1.5 sm:gap-2 bg-transparent border-none p-0 cursor-pointer transition-colors ${wizardStep >= 1 ? 'text-slate-900 dark:text-white' : 'text-slate-400 dark:text-slate-500'}`}
              data-cursor="pointer"
            >
              <span className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-mono text-xs font-bold transition-all duration-200 shrink-0 ${wizardStep >= 1 ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25' : 'bg-slate-100 dark:bg-white/[0.06] border border-slate-200 dark:border-white/10 text-slate-600 dark:text-white'}`}>
                1
              </span>
              <span className="text-[11px] sm:text-xs md:text-sm font-semibold whitespace-nowrap">{isEs ? 'Alcance' : 'Scope'}</span>
            </button>

            <div className={`flex-1 h-0.5 mx-1.5 sm:mx-2.5 transition-colors duration-300 ${wizardStep >= 2 ? 'bg-blue-600 dark:bg-[#3b82f6]' : 'bg-slate-200 dark:bg-white/10'}`} />

            <button
              type="button"
              onClick={() => setWizardStep(2)}
              className={`inline-flex items-center gap-1.5 sm:gap-2 bg-transparent border-none p-0 cursor-pointer transition-colors ${wizardStep >= 2 ? 'text-slate-900 dark:text-white' : 'text-slate-400 dark:text-slate-500'}`}
              data-cursor="pointer"
            >
              <span className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-mono text-xs font-bold transition-all duration-200 shrink-0 ${wizardStep >= 2 ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25' : 'bg-slate-100 dark:bg-white/[0.06] border border-slate-200 dark:border-white/10 text-slate-600 dark:text-white'}`}>
                2
              </span>
              <span className="text-[11px] sm:text-xs md:text-sm font-semibold whitespace-nowrap">{isEs ? 'Requisitos' : 'Requirements'}</span>
            </button>

            <div className={`flex-1 h-0.5 mx-1.5 sm:mx-2.5 transition-colors duration-300 ${wizardStep >= 3 ? 'bg-blue-600 dark:bg-[#3b82f6]' : 'bg-slate-200 dark:bg-white/10'}`} />

            <button
              type="button"
              onClick={() => setWizardStep(3)}
              className={`inline-flex items-center gap-1.5 sm:gap-2 bg-transparent border-none p-0 cursor-pointer transition-colors ${wizardStep >= 3 ? 'text-slate-900 dark:text-white' : 'text-slate-400 dark:text-slate-500'}`}
              data-cursor="pointer"
            >
              <span className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-mono text-xs font-bold transition-all duration-200 shrink-0 ${wizardStep >= 3 ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25' : 'bg-slate-100 dark:bg-white/[0.06] border border-slate-200 dark:border-white/10 text-slate-600 dark:text-white'}`}>
                3
              </span>
              <span className="text-[11px] sm:text-xs md:text-sm font-semibold whitespace-nowrap">{isEs ? 'Contacto' : 'Contact'}</span>
            </button>
          </div>

          {/* Wizard Steps Form */}
          <div>
            {wizardStep === 1 && (
              <QuoteStepServices
                services={services}
                selectedService={selectedService}
                setSelectedService={handleSelectService}
                isEs={isEs}
                onNext={() => setWizardStep(2)}
              />
            )}

            {wizardStep === 2 && (
              <QuoteStepOptions
                serviceName={currentServiceObj?.shortTitle || selectedService}
                serviceConfig={serviceConfig}
                selectedTier={selectedTier}
                setSelectedTier={setSelectedTier}
                selectedCustomOption={selectedCustomOption}
                setSelectedCustomOption={setSelectedCustomOption}
                selectedAddons={selectedAddons}
                toggleAddon={toggleAddon}
                isEs={isEs}
                onBack={() => setWizardStep(1)}
                onNext={() => setWizardStep(3)}
              />
            )}

            {wizardStep === 3 && (
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
                          {currentServiceObj?.shortTitle || selectedService}
                        </span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setWizardStep(2)}
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

                    <div className={`flex flex-col gap-1.5 p-2.5 sm:p-3 rounded-xl bg-white dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/5 ${selectedCustomOptionObj ? 'sm:col-span-2' : ''}`}>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500 dark:text-slate-400 font-medium">
                          {isEs ? 'Módulos & Capacidades:' : 'Selected Modules:'}
                        </span>
                        <span className="font-mono text-[11px] font-bold text-blue-600 dark:text-[#3b82f6]">
                          {selectedAddons.length > 0 ? `${selectedAddons.length} elegidos` : (isEs ? 'Plan base' : 'Base setup')}
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

                <form onSubmit={handleSendQuoteEmail} noValidate className="flex flex-col gap-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                    <div className="flex flex-col gap-1">
                      <label htmlFor="quote_name" className="text-xs font-mono uppercase tracking-wider text-slate-600 dark:text-slate-400">
                        {isEs ? 'Tu Nombre o Empresa *' : 'Your Name or Company *'}
                      </label>
                      <input
                        id="quote_name"
                        type="text"
                        placeholder={isEs ? 'Ej: Martín Rodríguez' : 'e.g., John Smith'}
                        value={clientName}
                        onChange={(e) => {
                          setClientName(e.target.value);
                          if (touched.name) validateStep3(e.target.value, clientEmail);
                        }}
                        onBlur={() => {
                          setTouched((prev) => ({ ...prev, name: true }));
                          validateStep3(clientName, clientEmail);
                        }}
                        className={`w-full bg-slate-50 dark:bg-slate-950/70 border rounded-xl px-4 py-2.5 sm:py-3 text-slate-900 dark:text-white text-base sm:text-sm outline-none transition-colors ${errors.name && touched.name
                          ? 'border-rose-500 focus:border-rose-500 focus:ring-1 focus:ring-rose-500'
                          : 'border-slate-200 dark:border-white/10 focus:border-blue-500 dark:focus:border-[#3b82f6]'
                          }`}
                      />
                      {errors.name && touched.name && (
                        <span className="text-[11px] sm:text-xs text-rose-500 dark:text-rose-400 font-medium flex items-center gap-1 mt-0.5">
                          <AlertCircle size={12} className="shrink-0" /> {errors.name}
                        </span>
                      )}
                    </div>

                    <div className="flex flex-col gap-1">
                      <label htmlFor="quote_email" className="text-xs font-mono uppercase tracking-wider text-slate-600 dark:text-slate-400">
                        {isEs ? 'Correo Electrónico *' : 'Email Address *'}
                      </label>
                      <input
                        id="quote_email"
                        type="email"
                        inputMode="email"
                        placeholder={isEs ? 'martin@empresa.com' : 'john@company.com'}
                        value={clientEmail}
                        onChange={(e) => {
                          setClientEmail(e.target.value);
                          if (touched.email) validateStep3(clientName, e.target.value);
                        }}
                        onBlur={() => {
                          setTouched((prev) => ({ ...prev, email: true }));
                          validateStep3(clientName, clientEmail);
                        }}
                        className={`w-full bg-slate-50 dark:bg-slate-950/70 border rounded-xl px-4 py-2.5 sm:py-3 text-slate-900 dark:text-white text-base sm:text-sm outline-none transition-colors ${errors.email && touched.email
                          ? 'border-rose-500 focus:border-rose-500 focus:ring-1 focus:ring-rose-500'
                          : 'border-slate-200 dark:border-white/10 focus:border-blue-500 dark:focus:border-[#3b82f6]'
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
                    <label htmlFor="quote_phone" className="text-xs font-mono uppercase tracking-wider text-slate-600 dark:text-slate-400">
                      {isEs ? 'WhatsApp / Teléfono (opcional):' : 'WhatsApp / Phone (optional):'}
                    </label>
                    <input
                      id="quote_phone"
                      type="tel"
                      inputMode="tel"
                      placeholder="+54 9 381 ..."
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2.5 sm:py-3 text-slate-900 dark:text-white text-base sm:text-sm outline-none focus:border-blue-500 dark:focus:border-[#3b82f6] transition-colors"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label htmlFor="quote_description" className="text-xs font-mono uppercase tracking-wider text-slate-600 dark:text-slate-400">
                      {isEs ? 'Detalles o requerimientos específicos:' : 'Project Details & Specific Goals:'}
                    </label>
                    <textarea
                      id="quote_description"
                      rows={3}
                      placeholder={
                        isEs
                          ? 'Describe el objetivo de tu software, necesidades particulares o fecha estimada...'
                          : 'Describe your software goals, key requirements, or target timeline...'
                      }
                      value={projectDescription}
                      onChange={(e) => setProjectDescription(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2.5 sm:py-3 text-slate-900 dark:text-white text-base sm:text-sm outline-none focus:border-blue-500 dark:focus:border-[#3b82f6] transition-colors resize-none"
                    />
                  </div>

                  {/* Dual Dispatch Actions: EmailJS (Automatic) and WhatsApp */}
                  <div className="flex flex-col sm:flex-row justify-between items-center gap-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setWizardStep(2)}
                      className="w-full sm:w-auto px-5 py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 rounded-xl text-sm cursor-pointer transition-colors text-center"
                      data-cursor="pointer"
                    >
                      {isEs ? 'Atrás' : 'Back'}
                    </button>

                    <div className="flex flex-col sm:flex-row items-center gap-2.5 w-full sm:w-auto">
                      <button
                        type="button"
                        onClick={handleSendQuoteWhatsApp}
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
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
