import { useState, useRef, useEffect } from 'react';
import {
  Send,
  MapPin,
  AlertCircle,
  Loader2
} from 'lucide-react';
import { sileo } from 'sileo';
import AuroraMeshBackground from '../components/ui/AuroraMeshBackground';
import ContactChannels from '../components/contact/ContactChannels';
import ServiceSelectDropdown from '../components/contact/ServiceSelectDropdown';
import { CONTACT_INFO } from '../data/servicesData';
import { sendContactEmail } from '../services/emailService';
import { useLanguage } from '../hooks/useLanguage';
import { useTheme } from '../hooks/useTheme';

export default function ContactPage() {
  const { language } = useLanguage();
  const { theme } = useTheme();
  const isEs = language === 'es';
  const isLight = theme === 'light';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);
  const errorToastIdRef = useRef(null);

  // Limpiar toasts con animación suave al salir de la página o desmontar
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

  // Validación individual por campo
  const validateField = (field, value) => {
    const val = (value || '').trim();
    switch (field) {
      case 'name':
        if (!val) return isEs ? 'Ingresá tu nombre o empresa.' : 'Please enter your name or company.';
        if (val.length < 2) return isEs ? 'El nombre debe tener al menos 2 caracteres.' : 'Name must be at least 2 characters.';
        return '';
      case 'email':
        if (!val) return isEs ? 'Ingresá tu correo electrónico.' : 'Please enter your email address.';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
          return isEs ? 'Ingresá un correo válido (ej: nombre@empresa.com).' : 'Please enter a valid email address.';
        }
        return '';
      case 'service':
        if (!val) return isEs ? 'Seleccioná el tipo de servicio que necesitás.' : 'Please select the required service.';
        return '';
      case 'message':
        if (!val) return isEs ? 'Escribí tu mensaje o alcance del proyecto.' : 'Please write your message or project scope.';
        if (val.length < 10) return isEs ? 'El mensaje debe tener al menos 10 caracteres.' : 'Message must be at least 10 characters.';
        return '';
      default:
        return '';
    }
  };

  const validateAll = (data = formData) => {
    const newErrors = {};
    ['name', 'email', 'service', 'message'].forEach((field) => {
      const error = validateField(field, data[field]);
      if (error) newErrors[field] = error;
    });
    return newErrors;
  };

  // Cuando se corrige un error, descarta la notificación de Sileo activa
  const handleFieldChange = (name, value) => {
    setFormData((prev) => {
      const nextData = { ...prev, [name]: value };
      const currentErrors = validateAll(nextData);

      // Si ya no quedan errores en el formulario, descartar el toast de error inmediatamente
      if (Object.keys(currentErrors).length === 0 && errorToastIdRef.current) {
        sileo.dismiss(errorToastIdRef.current);
        errorToastIdRef.current = null;
      }
      return nextData;
    });

    if (touched[name]) {
      setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  };

  // Copiar correo al portapapeles
  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_INFO.email);
      setEmailCopied(true);
      sileo.success({
        title: isEs ? 'Correo copiado al portapapeles' : 'Email copied to clipboard',
        description: CONTACT_INFO.email,
        duration: 3000
      });
      setTimeout(() => setEmailCopied(false), 2500);
    } catch {
      sileo.error({
        title: isEs ? 'No se pudo copiar' : 'Failed to copy',
        description: CONTACT_INFO.email,
        duration: 3000
      });
    }
  };

  // Envío 100% automático por EmailJS en segundo plano
  const handleSubmitEmail = async (e) => {
    e.preventDefault();
    setTouched({ name: true, email: true, service: true, subject: true, message: true });
    const formErrors = validateAll();
    setErrors(formErrors);

    if (Object.keys(formErrors).length > 0) {
      if (errorToastIdRef.current) {
        sileo.dismiss(errorToastIdRef.current);
      }

      const missingKeys = Object.keys(formErrors);
      let title = isEs ? 'Campos obligatorios incompletos' : 'Required fields missing';
      let desc = isEs ? 'Por favor completá los campos señalados en rojo.' : 'Please fix the fields highlighted in red.';

      if (missingKeys.length === 1) {
        if (missingKeys.includes('name')) {
          title = isEs ? 'Falta tu nombre' : 'Name is required';
          desc = isEs ? 'Ingresá tu nombre o empresa para identificar tu consulta.' : 'Enter your name or company.';
        } else if (missingKeys.includes('email')) {
          title = isEs ? 'Correo inválido' : 'Invalid email';
          desc = isEs ? 'Ingresá una dirección válida (ej: nombre@empresa.com).' : 'Provide a valid email address.';
        } else if (missingKeys.includes('service')) {
          title = isEs ? 'Seleccioná un servicio' : 'Select a service';
          desc = isEs ? 'Elegí la especialidad técnica requerida para tu proyecto.' : 'Choose the technical service.';
        } else if (missingKeys.includes('message')) {
          title = isEs ? 'Mensaje muy breve' : 'Message too short';
          desc = isEs ? 'Escribí al menos 10 caracteres sobre el alcance esperado.' : 'Write at least 10 characters.';
        }
      }

      errorToastIdRef.current = sileo.error({
        title,
        description: desc,
        duration: 4500
      });
      return;
    }

    setIsSubmitting(true);

    try {
      await sendContactEmail({
        name: formData.name,
        email: formData.email,
        service: formData.service,
        subject: formData.subject || (isEs ? `Consulta de ${formData.service}` : `Inquiry for ${formData.service}`),
        message: formData.message
      });

      if (errorToastIdRef.current) {
        sileo.dismiss(errorToastIdRef.current);
        errorToastIdRef.current = null;
      }

      setFormData({ name: '', email: '', service: '', subject: '', message: '' });
      setTouched({});
      setErrors({});

      sileo.success({
        title: isEs ? '¡Mensaje despachado con éxito!' : 'Message dispatched successfully!',
        description: isEs
          ? 'Lautaro recibió tu consulta automáticamente y te responderá en menos de 24 horas.'
          : 'Lautaro received your note automatically and will reply within 24 hours.',
        duration: 5500
      });
    } catch (err) {
      console.error('[ContactPage] Error al despachar EmailJS:', err);
      sileo.error({
        title: isEs ? 'Error al enviar el mensaje' : 'Failed to send message',
        description: isEs
          ? 'No se pudo despachar el correo automáticamente. Verificá tu conexión o contactame por WhatsApp.'
          : 'Automatic dispatch failed. Please check your connection or reach out on WhatsApp.',
        duration: 5000
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full min-h-screen pt-28 sm:pt-32 pb-24 text-slate-900 dark:text-slate-100 transition-colors duration-300 relative overflow-x-hidden">
      <AuroraMeshBackground isLight={isLight} />

      {/* 1. Header Section */}
      <section className="mb-12 sm:mb-16 relative z-10">
        <div className="w-full max-w-[1240px] mx-auto px-4 sm:px-6">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4 flex-wrap">
              <span className="font-mono text-xs font-bold tracking-widest text-blue-600 dark:text-[#3b82f6] whitespace-nowrap">
                {isEs ? 'CANALES DIRECTOS & CONTRATACIÓN' : 'DIRECT CHANNELS & HIRING'}
              </span>
              <span className="w-6 h-px bg-blue-500/40" />
              <span className="font-mono text-[0.7rem] text-slate-500 dark:text-slate-400 tracking-wider whitespace-nowrap">
                {isEs ? 'RESPUESTAS EN MENOS DE 24 HS' : 'DIRECT REPLIES WITHIN 24H'}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight text-slate-900 dark:text-white mb-4">
              {isEs ? (
                <>¿Tenés un proyecto en mente? <span className="text-blue-600 dark:text-[#3b82f6]">Hablemos.</span></>
              ) : (
                <>Have a project in mind? <span className="text-blue-600 dark:text-[#3b82f6]">Let&apos;s build it.</span></>
              )}
            </h1>

            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
              {isEs
                ? 'Completá el formulario de contacto para enviar tu consulta de forma directa y automática, o elegí cualquiera de mis canales oficiales.'
                : 'Fill out the contact form to dispatch your inquiry directly and automatically, or select any of my official channels.'}
            </p>
          </div>
        </div>
      </section>

      {/* 2. Main Grid: Channels & Form */}
      <section className="relative z-10">
        <div className="w-full max-w-[1240px] mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Channels */}
          <ContactChannels
            isEs={isEs}
            emailCopied={emailCopied}
            onCopyEmail={handleCopyEmail}
          />

          {/* Right Column: Contact & Service Form */}
          <div className="lg:col-span-7 bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-white/10 rounded-2xl p-5 sm:p-8 backdrop-blur-xl shadow-lg dark:shadow-xl flex flex-col">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-1.5">
              {isEs ? 'Enviar Mensaje Directo' : 'Send a Direct Message'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mb-6">
              {isEs
                ? 'El correo se despacha automáticamente a mi casilla por EmailJS. No abre clientes de correo externos.'
                : 'Emails are dispatched automatically to my inbox via EmailJS without opening external mail clients.'}
            </p>

            <form onSubmit={handleSubmitEmail} noValidate className="flex flex-col gap-4">
              {/* Row 1: Nombre y Correo */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                <div className="flex flex-col gap-1">
                  <label htmlFor="user_name" className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                    {isEs ? 'Tu Nombre o Empresa *' : 'Your Name or Company *'}
                  </label>
                  <input
                    id="user_name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={(e) => handleFieldChange('name', e.target.value)}
                    onBlur={handleBlur}
                    placeholder={isEs ? 'Ej: Martín Silva' : 'E.g., Martin Smith'}
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
                  <label htmlFor="user_email" className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                    {isEs ? 'Tu Correo Electrónico *' : 'Your Email Address *'}
                  </label>
                  <input
                    id="user_email"
                    type="email"
                    name="email"
                    inputMode="email"
                    value={formData.email}
                    onChange={(e) => handleFieldChange('email', e.target.value)}
                    onBlur={handleBlur}
                    placeholder="tu-correo@empresa.com"
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

              {/* Row 2: Selector de Servicio & Asunto */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                    {isEs ? 'Tipo de Servicio *' : 'Service Type *'}
                  </label>
                  <ServiceSelectDropdown
                    value={formData.service}
                    onChange={(val) => handleFieldChange('service', val)}
                    onBlur={() => {
                      setTouched((prev) => ({ ...prev, service: true }));
                      setErrors((prev) => ({ ...prev, service: validateField('service', formData.service) }));
                    }}
                    error={touched.service ? errors.service : ''}
                    isEs={isEs}
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label htmlFor="contact_subject" className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                    {isEs ? 'Asunto / Objetivo (opcional)' : 'Subject / Goal (optional)'}
                  </label>
                  <input
                    id="contact_subject"
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={(e) => handleFieldChange('subject', e.target.value)}
                    placeholder={isEs ? 'Ej: Cotización o Consulta técnica' : 'E.g., Quote or Technical inquiry'}
                    className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-base sm:text-sm focus:border-blue-500 dark:focus:border-cyan-400 focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-cyan-400/20 transition-all outline-none"
                  />
                </div>
              </div>

              {/* Row 3: Mensaje */}
              <div className="flex flex-col gap-1">
                <label htmlFor="contact_message" className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                  {isEs ? 'Mensaje o Alcance del Trabajo *' : 'Message or Scope of Work *'}
                </label>
                <textarea
                  id="contact_message"
                  name="message"
                  rows="4"
                  value={formData.message}
                  onChange={(e) => handleFieldChange('message', e.target.value)}
                  onBlur={handleBlur}
                  placeholder={
                    isEs
                      ? 'Describí los objetivos de tu proyecto, requerimientos particulares o fecha estimada...'
                      : 'Describe your project objectives, specific requirements, or estimated timeline...'
                  }
                  className={`w-full px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-slate-50 dark:bg-slate-950/70 border text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-base sm:text-sm transition-all outline-none resize-y ${errors.message && touched.message
                    ? 'border-rose-500 dark:border-rose-500 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20'
                    : 'border-slate-200 dark:border-white/10 focus:border-blue-500 dark:focus:border-cyan-400 focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-cyan-400/20'
                    }`}
                />
                {errors.message && touched.message && (
                  <span className="text-[11px] sm:text-xs text-rose-500 dark:text-rose-400 font-medium flex items-center gap-1 mt-0.5">
                    <AlertCircle size={12} className="shrink-0" /> {errors.message}
                  </span>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-12 rounded-xl sm:rounded-full font-bold text-sm text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 shadow-md shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 cursor-pointer mt-2 select-none disabled:opacity-50"
                data-cursor="pointer"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    <span>{isEs ? 'Despachando correo automático...' : 'Dispatching automatic email...'}</span>
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    <span>{isEs ? 'Enviar Mensaje Directo' : 'Send Direct Message'}</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Location Indicator */}
        <div className="flex flex-col items-center justify-center text-center gap-1.5 text-slate-500 dark:text-slate-400 text-xs mt-8 select-none">
          <div className="p-2 rounded-full bg-blue-50 dark:bg-blue-500/10 border border-blue-100 dark:border-blue-500/20 text-blue-600 dark:text-blue-400 mb-0.5 shadow-2xs">
            <MapPin size={16} />
          </div>
          <span className="font-semibold text-slate-700 dark:text-slate-200 text-xs sm:text-sm">
            San Miguel de Tucumán, Argentina
          </span>
          <span className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400">
            {isEs
              ? 'Disponible para desarrollo web y contratos remotos globales'
              : 'Available for web development & global remote contracts'}
          </span>
        </div>
      </section>
    </div>
  );
}
