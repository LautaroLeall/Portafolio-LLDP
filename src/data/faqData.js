/**
 * faqData.js — Preguntas Frecuentes (SEO Local, Servicios & Software a Medida)
 * Fuente única compartida entre ServicesFaq.jsx y el generador de JSON-LD (FAQPage) en build.
 */
export const getServicesFaq = (isEs = true) => [
  {
    id: 'who-is-lautaro',
    question: isEs
      ? '¿Quién es Lautaro Leal Del Prete y qué tipo de desarrollo web y software realiza en Tucumán?'
      : 'Who is Lautaro Leal Del Prete and what web & software services do you offer?',
    answer: isEs
      ? 'Lautaro Leal Del Prete es Desarrollador Full Stack y Técnico Universitario en Desarrollo y Calidad de Software graduado en la UNSTA (San Miguel de Tucumán). Diseña y programa páginas web corporativas, tiendas online (e-commerce), sistemas de gestión a medida (turnos, stock, finanzas) y plataformas web escalables con React 19, Node.js, PostgreSQL y MongoDB.'
      : 'Lautaro Leal Del Prete is a Full Stack Developer with a university degree in Software Development and Quality Assurance from UNSTA (Tucumán, Argentina). He builds corporate websites, online stores, custom management systems, and scalable web applications using React 19, Node.js, PostgreSQL, and MongoDB.'
  },
  {
    id: 'ownership-no-lockin',
    question: isEs
      ? '¿El código fuente y el dominio quedan 100% a mi nombre sin abonos mensuales cautivos?'
      : 'Do I own 100% of my source code and domain with zero monthly lock-in?',
    answer: isEs
      ? 'Sí. A diferencia de las agencias que cobran abonos mensuales obligatorios por alquilarte una plantilla, cada sitio web o sistema de gestión se entrega llave en mano con código 100% propio en GitHub, dominio registrado a tu nombre y despliegue optimizado en Vercel o Netlify.'
      : 'Yes. Every website or custom management system is delivered turnkey with 100% source code ownership on GitHub, your domain registered in your name, and cloud deployment on Vercel or Netlify without captive monthly fees.'
  },
  {
    id: 'seo-and-speed',
    question: isEs
      ? '¿Las páginas web y sistemas incluyen SEO para aparecer en Google y carga ultrarrápida en celulares?'
      : 'Do websites and custom software include Google SEO and fast mobile performance?',
    answer: isEs
      ? 'Sí. Todos los desarrollos se construyen con arquitectura mobile-first, imágenes WebP optimizadas, datos estructurados JSON-LD, sitemap automático y meta etiquetas calibradas para Google Search y buscadores con IA, logrando tiempos de carga menores a 1.2 segundos.'
      : 'Yes. Every build follows mobile-first architecture, WebP image optimization, structured JSON-LD data, automated sitemaps, and calibrated meta tags for Google and AI search engines, achieving sub-1.2s load times.'
  },
  {
    id: 'tucuman-and-remote',
    question: isEs
      ? '¿Trabajás únicamente en Tucumán o también para empresas de toda Argentina y el exterior?'
      : 'Do you work only in Tucumán or also remotely across Argentina and worldwide?',
    answer: isEs
      ? 'Atiendo de forma presencial en San Miguel de Tucumán, Yerba Buena y alrededores, y trabajo de manera remota para empresas, comercios y equipos de software de toda Argentina, Latinoamérica, Estados Unidos y Europa.'
      : 'I work on-site in San Miguel de Tucumán, Argentina, and collaborate remotely with businesses, startups, and software teams across Argentina, Latin America, the US, and Europe.'
  },
  {
    id: 'how-to-quote',
    question: isEs
      ? '¿Cómo puedo pedir un presupuesto o revisar una cotización que ya me pasaron?'
      : 'How can I request a quote or audit an existing software proposal?',
    answer: isEs
      ? 'Podés configurar el alcance de tu proyecto en el Cotizador Interactivo de esta página y enviarlo directo por WhatsApp (+54 381 339 9463) o correo electrónico. También podés solicitar una revisión gratuita de cualquier presupuesto web previo para detectar sobreprecios o faltantes técnicos.'
      : 'You can configure your project scope in the Interactive Quoter on this page and dispatch it directly via WhatsApp or email. You can also request a free technical audit of any existing web proposal.'
  }
];
