import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { sileo } from 'sileo';
import { sendContactEmail } from '../services/emailService';
import { buildWhatsAppUrl } from '../data/servicesData';
import { getServicePricingConfig } from '../data/pricingData';
import {
  sanitizePhoneInput,
  validateQuoteField,
  validateQuoteStep3,
  buildQuoteBriefText
} from '../utils/quoteValidation';

/**
 * useQuoteWizard — Custom Hook de Estado, Validaciones y Despacho del Cotizador
 */
export function useQuoteWizard({
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
  const lastPreselectedRef = useRef(preselectedServiceId);

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
    if (
      serviceConfig.selectOptions?.length > 0 &&
      !serviceConfig.selectOptions.find((o) => o.id === selectedCustomOption)
    ) {
      setSelectedCustomOption(serviceConfig.selectOptions[0]?.id || '');
    }
  }, [serviceConfig, selectedTier, selectedCustomOption]);

  const toggleAddon = useCallback((addonId) => {
    setSelectedAddons((prev) =>
      prev.includes(addonId)
        ? prev.filter((id) => id !== addonId)
        : [...prev, addonId]
    );
  }, []);

  const handleStep3FieldChange = (field, rawValue) => {
    const value = field === 'phone' ? sanitizePhoneInput(rawValue) : rawValue;

    const nextName = field === 'name' ? value : clientName;
    const nextEmail = field === 'email' ? value : clientEmail;
    const nextPhone = field === 'phone' ? value : clientPhone;

    if (field === 'name') setClientName(value);
    if (field === 'email') setClientEmail(value);
    if (field === 'phone') setClientPhone(value);

    const currentErrors = validateQuoteStep3(
      { name: nextName, email: nextEmail, phone: nextPhone },
      isEs
    );
    if (Object.keys(currentErrors).length === 0 && quoteToastRef.current) {
      sileo.dismiss(quoteToastRef.current);
      quoteToastRef.current = null;
    }

    if (touched[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: validateQuoteField(field, value, isEs)
      }));
    }
  };

  const handleStep3Blur = (field, value) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors((prev) => ({
      ...prev,
      [field]: validateQuoteField(field, value, isEs)
    }));
  };

  const showValidationErrorToast = (formErrors) => {
    if (quoteToastRef.current) {
      sileo.dismiss(quoteToastRef.current);
    }

    const missingKeys = Object.keys(formErrors);
    let title = isEs ? 'Campos obligatorios incompletos' : 'Required fields missing';
    let desc = isEs
      ? 'Por favor completá los campos señalados en rojo.'
      : 'Please fix the fields highlighted in red.';

    if (missingKeys.length === 1) {
      if (missingKeys.includes('name')) {
        title = isEs ? 'Falta tu nombre' : 'Name is required';
        desc = formErrors.name;
      } else if (missingKeys.includes('email')) {
        title = isEs ? 'Correo inválido' : 'Invalid email';
        desc = formErrors.email;
      } else if (missingKeys.includes('phone')) {
        title = isEs ? 'Número de celular inválido' : 'Invalid phone number';
        desc = formErrors.phone;
      }
    }

    quoteToastRef.current = sileo.error({
      title,
      description: desc,
      duration: 4500
    });
  };

  const resetQuoteForm = () => {
    setClientName('');
    setClientEmail('');
    setClientPhone('');
    setProjectDescription('');
    setSelectedAddons([]);
    setTouched({});
    setErrors({});
  };

  const getBriefText = () =>
    buildQuoteBriefText({
      services,
      selectedService,
      serviceConfig,
      selectedTier,
      selectedCustomOption,
      selectedAddons,
      clientName,
      clientEmail,
      clientPhone,
      projectDescription,
      isEs
    });

  // Despacho 100% automático mediante EmailJS
  const handleSendQuoteEmail = async (e) => {
    e.preventDefault();
    setTouched({ name: true, email: true, phone: true });
    const formErrors = validateQuoteStep3(
      { name: clientName, email: clientEmail, phone: clientPhone },
      isEs
    );
    setErrors(formErrors);

    if (Object.keys(formErrors).length > 0) {
      showValidationErrorToast(formErrors);
      return;
    }

    setIsSubmittingEmail(true);

    try {
      const currentSvc = services.find((s) => s.id === selectedService);
      const tierObj = serviceConfig.tiers?.[selectedTier];
      const briefMessage = getBriefText();

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

      resetQuoteForm();

      sileo.success({
        title: isEs ? '¡Cotización enviada con éxito!' : 'Quote dispatched successfully!',
        description: isEs
          ? 'Lautaro recibió tu requerimiento técnico por correo y te responderá en menos de 24 horas.'
          : 'Lautaro received your technical brief by email and will reply within 24 hours.',
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

  // Despacho alternativo por WhatsApp (mismo comportamiento de validación y limpieza)
  const handleSendQuoteWhatsApp = () => {
    setTouched({ name: true, email: true, phone: true });
    const formErrors = validateQuoteStep3(
      { name: clientName, email: clientEmail, phone: clientPhone },
      isEs
    );
    setErrors(formErrors);

    if (Object.keys(formErrors).length > 0) {
      showValidationErrorToast(formErrors);
      return;
    }

    const message = getBriefText();
    const whatsappUrl = buildWhatsAppUrl(message);

    if (quoteToastRef.current) {
      sileo.dismiss(quoteToastRef.current);
      quoteToastRef.current = null;
    }

    resetQuoteForm();

    sileo.success({
      title: isEs ? '¡Cotización lista para enviar!' : 'Quote ready to send!',
      description: isEs
        ? 'Se limpió el formulario y se abrió WhatsApp con tu ficha técnica.'
        : 'Form cleared and WhatsApp launched with your technical brief.',
      duration: 4500
    });
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return {
    wizardStep,
    setWizardStep,
    selectedService,
    handleSelectService,
    currentServiceObj,
    serviceConfig,
    selectedTier,
    setSelectedTier,
    selectedCustomOption,
    setSelectedCustomOption,
    selectedCustomOptionObj,
    selectedAddons,
    toggleAddon,
    projectDescription,
    setProjectDescription,
    clientName,
    clientEmail,
    clientPhone,
    errors,
    touched,
    isSubmittingEmail,
    handleStep3FieldChange,
    handleStep3Blur,
    handleSendQuoteEmail,
    handleSendQuoteWhatsApp
  };
}
