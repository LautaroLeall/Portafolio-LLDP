import emailjs from '@emailjs/browser';

export const EMAILJS_CONFIG = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_y9njvrc',
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE || import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_erui2te',
  userId: import.meta.env.VITE_EMAILJS_USER_ID || import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'hk3ctGIGJ_kN-_Fai'
};

/**
 * Envia un correo mediante EmailJS de forma 100% automatica y en segundo plano.
 * Nunca abre el cliente de correo ni redirige fuera de la pagina.
 */
export async function sendContactEmail({
  name,
  email,
  service = 'General',
  subject = '',
  message = '',
  phone = '',
  extraDetails = ''
}) {
  const { serviceId, templateId, userId } = EMAILJS_CONFIG;

  if (!serviceId || !templateId || !userId) {
    throw new Error('Configuración de EmailJS incompleta en variables de entorno.');
  }

  const cleanPhone = phone ? phone.replace(/[^0-9]/g, '') : '';
  const now = new Date();
  const formattedDate = now.toLocaleDateString('es-AR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  // Prepara los parametros compatibles con las plantillas habituales de EmailJS
  const templateParams = {
    // Nombres
    name: name.trim(),
    user_name: name.trim(),
    from_name: name.trim(),
    // Correos
    email: email.trim(),
    user_email: email.trim(),
    reply_to: email.trim(),
    // Telefonos
    phone: phone && phone.trim() ? phone.trim() : 'No especificado',
    user_phone: phone && phone.trim() ? phone.trim() : 'No especificado',
    whatsapp_url: cleanPhone ? `https://wa.me/${cleanPhone}` : 'https://wa.me/5491121852002',
    // Asunto y Servicio
    service: service.trim(),
    project_service: service.trim(),
    subject: subject.trim() || `Nueva consulta de ${service} - ${name.trim()}`,
    // Mensaje
    message: message.trim(),
    extra_details: extraDetails ? extraDetails.trim() : '',
    // Metadata
    date_time: formattedDate,
    // Destinatario
    to_name: 'Lautaro Leal Del Prete'
  };

  const response = await emailjs.send(serviceId, templateId, templateParams, userId);
  return response;
}
