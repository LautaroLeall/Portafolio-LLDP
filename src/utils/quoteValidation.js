/**
 * quoteValidation.js — Validaciones Estrictas, Sanitización y Formateador de Brief
 * Utilidades puras para el Cotizador Interactivo (QuoteWizard).
 */

/**
 * Filtra en tiempo real cualquier letra o símbolo inválido en el campo de celular.
 * Permite únicamente números, espacios, guiones, paréntesis y '+' al inicio (máx. 15 dígitos ITU-T E.164).
 */
export function sanitizePhoneInput(raw = '') {
  let cleaned = raw.replace(/[^\d+\s()-]/g, '');
  cleaned = cleaned.replace(/(?!^)\+/g, '');

  let digitCount = 0;
  let result = '';
  for (const ch of cleaned) {
    if (/\d/.test(ch)) {
      if (digitCount >= 15) continue;
      digitCount++;
    }
    result += ch;
  }
  return result.slice(0, 22);
}

/**
 * Valida un campo individual del Paso 3 (Contacto) del cotizador.
 */
export function validateQuoteField(field, value, isEs = true) {
  const val = (value || '').trim();

  if (field === 'name') {
    if (!val) return isEs ? 'Ingresá tu nombre o empresa.' : 'Please enter your name or company.';
    if (val.length < 2) return isEs ? 'El nombre debe tener al menos 2 caracteres.' : 'Name must be at least 2 characters.';
    return '';
  }

  if (field === 'email') {
    if (!val) return isEs ? 'Ingresá tu correo electrónico.' : 'Please enter your email address.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
      return isEs ? 'Ingresá un correo válido (ej: nombre@empresa.com).' : 'Please enter a valid email address.';
    }
    return '';
  }

  if (field === 'phone') {
    if (!val) return isEs ? 'Ingresá tu número de celular o WhatsApp.' : 'Please enter your mobile or WhatsApp number.';
    if (/[a-zA-Z]/.test(val)) {
      return isEs ? 'El número no puede contener letras.' : 'Phone number cannot contain letters.';
    }

    const digits = val.replace(/\D/g, '');
    if (digits.length < 10) {
      return isEs
        ? 'Ingresá al menos 10 dígitos (código de área + número, ej: 381 339 9463).'
        : 'Enter at least 10 digits (area code + number).';
    }
    if (digits.length > 15) {
      return isEs
        ? 'El número no puede superar los 15 dígitos.'
        : 'Phone number cannot exceed 15 digits.';
    }
    if ((val.startsWith('+54') || digits.startsWith('549')) && (digits.length < 12 || digits.length > 13)) {
      return isEs
        ? 'Para Argentina (+54), ingresá código de área + número (12 o 13 dígitos).'
        : 'For Argentina (+54), enter area code + number (12–13 digits).';
    }
    if (/(\d)\1{6,}/.test(digits) || /^0{3,}/.test(digits)) {
      return isEs
        ? 'Ingresá un número de celular real y válido.'
        : 'Please enter a real, valid mobile number.';
    }

    const last8 = digits.slice(-8);
    if ('0123456789012345'.includes(last8) || '9876543210987654'.includes(last8)) {
      return isEs
        ? 'Ingresá un número de celular real (sin secuencias de prueba).'
        : 'Please enter a real mobile number (no test sequences).';
    }
    return '';
  }

  return '';
}

/**
 * Valida todos los campos obligatorios del Paso 3 y devuelve un mapa de errores.
 */
export function validateQuoteStep3({ name, email, phone }, isEs = true) {
  const errors = {};
  const nameErr = validateQuoteField('name', name, isEs);
  const emailErr = validateQuoteField('email', email, isEs);
  const phoneErr = validateQuoteField('phone', phone, isEs);

  if (nameErr) errors.name = nameErr;
  if (emailErr) errors.email = emailErr;
  if (phoneErr) errors.phone = phoneErr;

  return errors;
}

/**
 * Construye el texto estructurado del brief técnico para enviar por EmailJS o WhatsApp.
 */
export function buildQuoteBriefText({
  services = [],
  selectedService,
  serviceConfig = {},
  selectedTier,
  selectedCustomOption,
  selectedAddons = [],
  clientName = '',
  clientEmail = '',
  clientPhone = '',
  projectDescription = '',
  isEs = true
}) {
  const currentSvc = services.find((s) => s.id === selectedService);
  const tierObj = serviceConfig.tiers?.[selectedTier];
  const selectOptObj = serviceConfig.selectOptions?.find((o) => o.id === selectedCustomOption);
  const addonNames = selectedAddons
    .map((id) => serviceConfig.addons?.find((a) => a.id === id)?.label)
    .filter(Boolean);

  let brief = `*SOLICITUD DE PROYECTO WEB — lautarolealdev.com*\n----------------------------------------\n`;
  brief += `*Cliente / Contacto:* ${clientName.trim()}\n`;
  brief += `*Correo:* ${clientEmail.trim()}\n`;
  if (clientPhone.trim()) brief += `*Teléfono / WhatsApp:* ${clientPhone.trim()}\n`;
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
}
