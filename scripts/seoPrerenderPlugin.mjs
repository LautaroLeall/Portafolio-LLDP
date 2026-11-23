import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { projectCatalog } from '../src/data/projectsCatalog.js';
import { translations } from '../src/translations/dictionary.js';
import { getServicesData } from '../src/data/servicesData.js';
import { getServicesFaq } from '../src/data/faqData.js';

const BASE_URL = 'https://lautarolealdev.com';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(__dirname, '..');

function escapeHtml(str = '') {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function unescapeBasicHtml(str = '') {
  return String(str)
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');
}

function getTranslation(lang, keyPath) {
  const keys = keyPath.split('.');
  let cur = translations[lang];
  for (const k of keys) {
    if (cur && cur[k] !== undefined) {
      cur = cur[k];
    } else {
      return '';
    }
  }
  return cur;
}

function clampMetaDescription(text = '') {
  let clean = String(text).replace(/\s+/g, ' ').trim();
  if (clean.length < 115) {
    const suffix = ' — Desarrollo web y software por Lautaro Leal Del Prete (Tucumán).';
    if (clean.length + suffix.length <= 158) {
      clean = `${clean}${suffix}`;
    }
  }
  if (clean.length <= 158) return clean;
  return `${clean.slice(0, 155).replace(/\s+\S*$/, '')}...`;
}

function buildStaticRoutesConfig() {
  const services = getServicesData('es');
  const faqs = getServicesFaq(true);

  const staticPages = [
    {
      path: '/servicios',
      changefreq: 'weekly',
      priority: '0.9',
      breadcrumbName: 'Servicios',
      title: 'Desarrollo Web & Software a Medida en Tucumán | Lautaro Leal',
      description:
        'Diseño web, sistemas a medida, e-commerce y optimización SEO en Tucumán y remoto. Cotizá tu proyecto online con Lautaro Leal Del Prete.',
      h1: 'Servicios de Desarrollo Web, Software a Medida & Cotizador',
      eyebrow: 'SERVICIOS & INGENIERÍA DE SOFTWARE EN TUCUMÁN',
      mainHtml: `
        <p style="font-size: 1.05rem; line-height: 1.65; color: #cbd5e1; margin: 0 0 1.5rem;">
          Soluciones digitales rápidas, responsivas y sin abonos cautivos desarrolladas por <strong>Lautaro Leal Del Prete</strong> en San Miguel de Tucumán, Argentina.
        </p>
        <ul style="padding-left: 1.25rem; color: #cbd5e1; line-height: 1.8; margin-bottom: 2rem;">
          ${services
          .map(
            (s) =>
              `<li><strong>${escapeHtml(s.shortTitle)}:</strong> ${escapeHtml(s.subtitle)}</li>`
          )
          .join('\n          ')}
        </ul>
        <h2 style="font-size: 1.2rem; font-weight: 700; color: #ffffff; margin: 0 0 0.75rem;">Preguntas Frecuentes sobre Desarrollo Web y Software en Tucumán</h2>
        <dl style="color: #cbd5e1; line-height: 1.75; margin-bottom: 2rem;">
          ${faqs
          .map(
            (faq) =>
              `<dt style="font-weight: 700; color: #ffffff; margin-top: 0.9rem;">${escapeHtml(faq.question)}</dt>\n          <dd style="margin: 0.25rem 0 0 0;">${escapeHtml(faq.answer)}</dd>`
          )
          .join('\n          ')}
        </dl>`
    },
    {
      path: '/proyectos',
      changefreq: 'weekly',
      priority: '0.9',
      breadcrumbName: 'Proyectos',
      title: 'Proyectos Web & Sistemas en Producción | Lautaro Leal',
      description:
        'Catálogo de 11 proyectos reales en producción: plataformas Full Stack con React 19, Node.js, PostgreSQL, Supabase, MongoDB y Mercado Pago.',
      h1: 'Proyectos de Software & Casos de Estudio en Producción',
      eyebrow: 'PORTAFOLIO VERIFICABLE • 11 PROYECTOS LIVE',
      mainHtml: `
        <p style="font-size: 1.05rem; line-height: 1.65; color: #cbd5e1; margin: 0 0 1.5rem;">
          Sistemas web Full Stack, marketplaces, plataformas deportivas, e-commerce y sitios comerciales desplegados en producción con código verificable en GitHub.
        </p>
        <ul style="padding-left: 1.25rem; color: #cbd5e1; line-height: 1.8; margin-bottom: 2rem;">
          ${projectCatalog
          .map((p) => {
            const desc = getTranslation('es', p.descriptionKey);
            return `<li><a href="${BASE_URL}/proyectos/${p.slug}" style="color: #60a5fa;"><strong>${escapeHtml(p.title)}</strong></a> (${escapeHtml(p.category)}): ${escapeHtml(desc)}</li>`;
          })
          .join('\n          ')}
        </ul>`
    },
    {
      path: '/habilidades',
      changefreq: 'monthly',
      priority: '0.8',
      breadcrumbName: 'Habilidades',
      title: 'Stack Full Stack & Calidad QA | Lautaro Leal Del Prete',
      description:
        'Stack técnico de ingeniería: React 19, Zustand, Three.js, Tailwind CSS, Node.js, PostgreSQL, Supabase, MongoDB, Socket.IO, Zod y QA (Cypress, Mocha).',
      h1: 'Stack Tecnológico, Arquitectura & Calidad de Software',
      eyebrow: 'COMPETENCIAS TÉCNICAS • FULL STACK & QA UNSTA',
      mainHtml: `
        <p style="font-size: 1.05rem; line-height: 1.65; color: #cbd5e1; margin: 0 0 1.5rem;">
          Dominios de ingeniería aplicados en producción por Lautaro Leal Del Prete en Tucumán y proyectos remotos:
        </p>
        <ul style="padding-left: 1.25rem; color: #cbd5e1; line-height: 1.8; margin-bottom: 2rem;">
          <li><strong>Frontend &amp; Interfaces:</strong> React 19, Vite, JavaScript (ES6+), Tailwind CSS, Zustand, Framer Motion, Three.js &amp; WebGL.</li>
          <li><strong>Backend, APIs &amp; Seguridad:</strong> Node.js, Express, Socket.IO (WebSockets), JWT en cookies httpOnly, Mercado Pago SDK, Cloudinary.</li>
          <li><strong>Bases de Datos:</strong> PostgreSQL, Supabase (Row Level Security), MongoDB &amp; Mongoose.</li>
          <li><strong>Calidad de Software &amp; QA (UNSTA):</strong> Validación Zod / Joi, Cypress, Mocha, Chai, Postman, Scrum, Git &amp; GitHub.</li>
        </ul>`
    },
    {
      path: '/educacion',
      changefreq: 'monthly',
      priority: '0.8',
      breadcrumbName: 'Educación',
      title: 'Educación UNSTA, Certificados & CV | Lautaro Leal Del Prete',
      description:
        'Técnico Universitario en Desarrollo y Calidad de Software (UNSTA Tucumán), certificaciones verificables y descarga de CV oficial en PDF.',
      h1: 'Educación Formal, Certificaciones & Currículum Vitae',
      eyebrow: 'TRAYECTORIA ACADÉMICA • UNSTA',
      mainHtml: `
        <p style="font-size: 1.05rem; line-height: 1.65; color: #cbd5e1; margin: 0 0 1.5rem;">
          <strong>Tecnicatura Universitaria en Desarrollo y Calidad de Software</strong> — Universidad del Norte Santo Tomás de Aquino (UNSTA, Tucumán, 2024–2026).
        </p>
        <ul style="padding-left: 1.25rem; color: #cbd5e1; line-height: 1.8; margin-bottom: 2rem;">
          <li>Certificaciones verificables de Microsoft &amp; LinkedIn Learning, freeCodeCamp, Digitalers (Telecom / Educación IT) e Instituto Nexus.</li>
          <li><a href="${BASE_URL}/Lautaro-Leal-Del-Prete-Spanish.pdf" style="color: #60a5fa;">Descargar CV en Español (PDF)</a></li>
          <li><a href="${BASE_URL}/Lautaro-Leal-Del-Prete-English.pdf" style="color: #60a5fa;">Descargar CV en Inglés (PDF)</a></li>
        </ul>`
    },
    {
      path: '/sobre-mi',
      changefreq: 'monthly',
      priority: '0.8',
      breadcrumbName: 'Sobre Mí',
      title: 'Sobre Mí — Programador en Tucumán | Lautaro Leal Del Prete',
      description:
        'Lautaro Leal Del Prete, programador y desarrollador Full Stack (UNSTA) en Tucumán, Argentina. Arquitectura limpia, seguridad y QA de software.',
      h1: 'Lautaro Leal Del Prete — Programador & Software Engineer',
      eyebrow: 'SOBRE MÍ • SOFTWARE ENGINEER & QA',
      mainHtml: `
        <p style="font-size: 1.05rem; line-height: 1.65; color: #cbd5e1; margin: 0 0 1.5rem;">
          Programador Full Stack y Técnico Universitario en Desarrollo y Calidad de Software (UNSTA) desde San Miguel de Tucumán, Argentina. Enfocado en arquitectura por capas, seguridad de datos, código mantenible y rendimiento web.
        </p>`
    },
    {
      path: '/contacto',
      changefreq: 'monthly',
      priority: '0.9',
      breadcrumbName: 'Contacto',
      title: 'Contacto Directo & Presupuestos | Lautaro Leal Del Prete',
      description:
        'Contactá a Lautaro Leal Del Prete por formulario automático, WhatsApp (+54 381 339 9463), LinkedIn o GitHub. Respuestas en menos de 24 horas.',
      h1: 'Contacto Directo & Propuestas de Software',
      eyebrow: 'CANALES OFICIALES • TUCUMÁN & REMOTO',
      mainHtml: `
        <p style="font-size: 1.05rem; line-height: 1.65; color: #cbd5e1; margin: 0 0 1.5rem;">
          Disponible para proyectos web a medida, sistemas de gestión y posiciones Full Stack remotas o presenciales en Tucumán.
        </p>
        <ul style="padding-left: 1.25rem; color: #cbd5e1; line-height: 1.8; margin-bottom: 2rem;">
          <li>Email: <a href="mailto:lautaroleal4@gmail.com" style="color: #60a5fa;">lautaroleal4@gmail.com</a></li>
          <li>WhatsApp: <a href="https://wa.me/5493813399463" style="color: #60a5fa;">+54 9 381 339-9463</a></li>
          <li>LinkedIn: <a href="https://www.linkedin.com/in/lauldp" style="color: #60a5fa;">linkedin.com/in/lauldp</a></li>
          <li>GitHub: <a href="https://github.com/LautaroLeall" style="color: #60a5fa;">github.com/LautaroLeall</a></li>
        </ul>`
    }
  ];

  const projectPages = projectCatalog.map((project) => {
    const desc = getTranslation('es', project.descriptionKey);
    const longDesc = getTranslation('es', project.longDescKey) || desc;
    const features = getTranslation('es', project.featuresKey) || [];
    const candidateTitle = `${project.title} — Caso de Estudio | Lautaro Leal`;
    const safeTitle =
      candidateTitle.length <= 68
        ? candidateTitle
        : `${project.title} | Lautaro Leal Del Prete`.slice(0, 68);
    const safeDesc = clampMetaDescription(`${project.title}: ${desc}`);

    return {
      path: `/proyectos/${project.slug}`,
      changefreq: 'monthly',
      priority: '0.8',
      breadcrumbName: project.title,
      title: safeTitle,
      description: safeDesc,
      h1: project.title,
      eyebrow: `CASO DE ESTUDIO • ${project.category.toUpperCase()}`,
      project,
      mainHtml: `
        <p style="font-size: 1.05rem; line-height: 1.65; color: #cbd5e1; margin: 0 0 1.5rem;">
          ${escapeHtml(longDesc)}
        </p>
        <p style="font-family: 'Geist Mono', monospace; font-size: 0.9rem; color: #94a3b8; margin: 0 0 1.25rem;">
          <strong>Stack:</strong> ${escapeHtml(project.techs.join(' • '))}
        </p>
        ${Array.isArray(features) && features.length > 0
          ? `<h2 style="font-size: 1.15rem; font-weight: 700; color: #ffffff; margin: 0 0 0.75rem;">Características Técnicas</h2>
        <ul style="padding-left: 1.25rem; color: #cbd5e1; line-height: 1.8; margin-bottom: 1.75rem;">
          ${features.map((f) => `<li>${escapeHtml(f)}</li>`).join('\n          ')}
        </ul>`
          : ''
        }
        <p style="margin-bottom: 2rem;">
          <a href="${escapeHtml(project.demo)}" style="color: #60a5fa; margin-right: 1.25rem;">Visitar Sitio en Vivo</a>
          ${project.code ? `<a href="${escapeHtml(project.code)}" style="color: #60a5fa; margin-right: 1.25rem;">Repositorio Frontend (GitHub)</a>` : ''}
          ${project.codeBack ? `<a href="${escapeHtml(project.codeBack)}" style="color: #60a5fa;">Repositorio Backend (GitHub)</a>` : ''}
        </p>`
    };
  });

  return { staticPages, projectPages };
}

function generateSitemapXml(today) {
  const { staticPages, projectPages } = buildStaticRoutesConfig();

  const homeEntry = `  <!-- 01. Home -->
  <url>
    <loc>${BASE_URL}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
    <xhtml:link rel="alternate" hreflang="es" href="${BASE_URL}/?lang=es" />
    <xhtml:link rel="alternate" hreflang="en" href="${BASE_URL}/?lang=en" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${BASE_URL}/" />
    <image:image>
      <image:loc>${BASE_URL}/og-banner.png</image:loc>
      <image:title>Lautaro Leal Del Prete — Desarrollo Web &amp; Software</image:title>
      <image:caption>Portafolio oficial de Lautaro Leal Del Prete, Desarrollador Full Stack en Tucumán</image:caption>
    </image:image>
  </url>`;

  const staticEntries = staticPages
    .map(
      (page) => `  <url>
    <loc>${BASE_URL}${page.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
    )
    .join('\n\n');

  const projectEntries = projectPages
    .map(
      (page) => `  <url>
    <loc>${BASE_URL}${page.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
    <image:image>
      <image:loc>${BASE_URL}${page.project.image}</image:loc>
      <image:title>${escapeHtml(page.project.title)} — Caso de Estudio</image:title>
    </image:image>
  </url>`
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${homeEntry}

${staticEntries}

  <!-- Casos de Estudio Individuales -->
${projectEntries}
</urlset>
`;
}

function generateLlmsTxt(today) {
  const services = getServicesData('es');
  const faqs = getServicesFaq(true);

  return `# Lautaro Leal Del Prete — Programador, Desarrollo Web & Software Engineering (${BASE_URL})
> Última actualización: ${today}
> Portafolio oficial de Lautaro Leal Del Prete (Lautaro Leal, Lautaro Del Prete, Leal Del Prete, Lautaro Tucumán, LLDP).

## Perfil Profesional
- **Nombre completo:** Lautaro Leal Del Prete
- **Rol:** Programador Web, Full Stack Developer & Software Engineer
- **Ubicación:** San Miguel de Tucumán, Tucumán, Argentina (disponible presencial y remoto global)
- **Formación Universitaria:** Técnico Universitario en Desarrollo y Calidad de Software — Universidad del Norte Santo Tomás de Aquino (UNSTA, Tucumán)
- **Idiomas:** Español (Nativo), Inglés (Técnico / B2-C1 en formación en Instituto Nexus)

## Secciones Principales
- [Inicio](${BASE_URL}/): Presentación, stack principal y desarrollos recientes en producción.
- [Servicios y Cotizador](${BASE_URL}/servicios): Diseño web, software a medida y cotizador interactivo en Tucumán y remoto.
- [Proyectos y Casos de Estudio](${BASE_URL}/proyectos): 11 aplicaciones web verificables con código fuente y sandboxes en vivo.
- [Habilidades Técnicas](${BASE_URL}/habilidades): React 19, Vite, Zustand, Tailwind CSS, Three.js, Node.js, Express, PostgreSQL, Supabase (RLS), MongoDB, Socket.IO, Zod, Cypress, Mocha y Chai.
- [Educación y Certificaciones](${BASE_URL}/educacion): Título universitario UNSTA, certificaciones Microsoft/freeCodeCamp/Digitalers y descarga de CV en PDF.
- [Sobre Mí](${BASE_URL}/sobre-mi): Filosofía de arquitectura limpia, calidad de software y seguridad.
- [Contacto](${BASE_URL}/contacto): Formulario directo, WhatsApp, LinkedIn y GitHub.

## Especialidades de Servicio
${services.map((s) => `- **${s.shortTitle}** (${BASE_URL}/servicios): ${s.longDescription}`).join('\n')}

## Preguntas Frecuentes (Tucumán & Remoto)
${faqs.map((faq) => `- **${faq.question}**\n  ${faq.answer}`).join('\n')}

## Proyectos en Producción (${projectCatalog.length} Casos de Estudio)
${projectCatalog
      .map((p) => {
        const desc = getTranslation('es', p.descriptionKey);
        return `- **${p.title}** (${p.category}) — Caso de estudio: ${BASE_URL}/proyectos/${p.slug} | Demo: ${p.demo} | Stack: ${p.techs.join(', ')}\n  ${desc}`;
      })
      .join('\n')}

## Canales Oficiales Verificados
- Web oficial: ${BASE_URL}/
- Email: lautaroleal4@gmail.com
- WhatsApp: https://wa.me/5493813399463
- LinkedIn: https://www.linkedin.com/in/lauldp
- GitHub: https://github.com/LautaroLeall
`;
}

function buildRouteJsonLd(routeObj) {
  const fullUrl = `${BASE_URL}${routeObj.path}`;
  const breadcrumbItems = [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Inicio',
      item: `${BASE_URL}/`
    }
  ];

  if (routeObj.project) {
    breadcrumbItems.push({
      '@type': 'ListItem',
      position: 2,
      name: 'Proyectos',
      item: `${BASE_URL}/proyectos`
    });
    breadcrumbItems.push({
      '@type': 'ListItem',
      position: 3,
      name: routeObj.breadcrumbName || routeObj.h1,
      item: fullUrl
    });
  } else {
    breadcrumbItems.push({
      '@type': 'ListItem',
      position: 2,
      name: routeObj.breadcrumbName || routeObj.h1,
      item: fullUrl
    });
  }

  const graph = [
    {
      '@type': 'Person',
      '@id': `${BASE_URL}/#person`,
      name: 'Lautaro Leal Del Prete',
      url: `${BASE_URL}/`,
      sameAs: [
        'https://www.linkedin.com/in/lauldp',
        'https://github.com/LautaroLeall'
      ]
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${fullUrl}#breadcrumb`,
      itemListElement: breadcrumbItems
    }
  ];

  if (routeObj.path === '/servicios') {
    const services = getServicesData('es');
    const faqs = getServicesFaq(true);

    graph.push({
      '@type': 'Service',
      '@id': `${fullUrl}#service-catalog`,
      serviceType: 'Desarrollo Web, Diseño Web & Software a Medida',
      name: 'Servicios de Programación y Software en Tucumán — Lautaro Leal Del Prete',
      url: fullUrl,
      provider: { '@id': `${BASE_URL}/#person` },
      areaServed: ['San Miguel de Tucumán', 'Tucumán', 'Argentina', 'Global Remote'],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Catálogo de Servicios de Ingeniería de Software',
        itemListElement: services.map((s) => ({
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: s.shortTitle,
            description: s.subtitle
          }
        }))
      }
    });

    graph.push({
      '@type': 'FAQPage',
      '@id': `${fullUrl}#faq`,
      mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer
        }
      }))
    });
  } else if (routeObj.path === '/proyectos') {
    graph.push({
      '@type': 'CollectionPage',
      '@id': `${fullUrl}#collection`,
      url: fullUrl,
      name: routeObj.title,
      description: routeObj.description,
      isPartOf: { '@id': `${BASE_URL}/#website` },
      about: { '@id': `${BASE_URL}/#person` }
    });
    graph.push({
      '@type': 'ItemList',
      '@id': `${fullUrl}#project-list`,
      name: 'Proyectos en Producción — Lautaro Leal Del Prete',
      itemListElement: projectCatalog.map((p, idx) => ({
        '@type': 'ListItem',
        position: idx + 1,
        name: p.title,
        url: `${BASE_URL}/proyectos/${p.slug}`
      }))
    });
  } else if (routeObj.project) {
    graph.push({
      '@type': 'SoftwareApplication',
      '@id': `${fullUrl}#software`,
      name: routeObj.project.title,
      description: routeObj.description,
      applicationCategory: 'WebApplication',
      operatingSystem: 'Web',
      url: fullUrl,
      sameAs: routeObj.project.demo,
      image: `${BASE_URL}${routeObj.project.image}`,
      author: { '@id': `${BASE_URL}/#person` },
      keywords: routeObj.project.techs.join(', ')
    });
  } else {
    const pageType =
      routeObj.path === '/contacto'
        ? 'ContactPage'
        : routeObj.path === '/sobre-mi'
          ? 'AboutPage'
          : 'WebPage';

    graph.push({
      '@type': pageType,
      '@id': `${fullUrl}#webpage`,
      url: fullUrl,
      name: routeObj.title,
      description: routeObj.description,
      about: { '@id': `${BASE_URL}/#person` },
      breadcrumb: { '@id': `${fullUrl}#breadcrumb` }
    });
  }

  return JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }, null, 2).replace(
    /</g,
    '\\u003c'
  );
}

function renderRouteHtml(baseHtml, routeObj) {
  const fullUrl = `${BASE_URL}${routeObj.path}`;
  const ogImage = routeObj.ogImage || `${BASE_URL}/og-banner.png`;
  const safeTitle = escapeHtml(routeObj.title);
  const safeDesc = escapeHtml(routeObj.description);

  const navHtml = `
      <nav aria-label="Navegación principal" style="margin-bottom: 2.5rem;">
        <h2 style="font-size: 1.15rem; font-weight: 700; color: #ffffff; margin-bottom: 0.75rem;">Secciones del Portafolio</h2>
        <ul style="list-style: none; padding: 0; margin: 0; display: flex; flex-wrap: wrap; gap: 0.75rem 1.5rem;">
          <li><a href="${BASE_URL}/" style="color: #60a5fa;">Inicio</a></li>
          <li><a href="${BASE_URL}/servicios" style="color: #60a5fa;">Servicios &amp; Cotizador</a></li>
          <li><a href="${BASE_URL}/proyectos" style="color: #60a5fa;">Proyectos en Producción</a></li>
          <li><a href="${BASE_URL}/habilidades" style="color: #60a5fa;">Stack &amp; Habilidades</a></li>
          <li><a href="${BASE_URL}/educacion" style="color: #60a5fa;">Educación UNSTA &amp; CV</a></li>
          <li><a href="${BASE_URL}/sobre-mi" style="color: #60a5fa;">Sobre Mí</a></li>
          <li><a href="${BASE_URL}/contacto" style="color: #60a5fa;">Contacto Directo</a></li>
        </ul>
      </nav>`;

  const mainShell = `<main
      style="min-height: 100vh; max-width: 1240px; margin: 0 auto; padding: 7rem 1.5rem 4rem; font-family: 'Geist', system-ui, -apple-system, sans-serif; color: #f5f7fa; background-color: #020a15;">
      <header style="max-width: 820px;">
        <p style="font-family: 'Geist Mono', monospace; font-size: 0.8rem; font-weight: 700; color: #38bdf8; margin-bottom: 1rem;">
          ${escapeHtml(routeObj.eyebrow)}
        </p>
        <h1 style="font-size: clamp(2rem, 4.5vw, 3.25rem); font-weight: 800; line-height: 1.15; margin: 0 0 1.25rem; color: #ffffff;">
          ${escapeHtml(routeObj.h1)}
        </h1>
      </header>
      <section style="max-width: 860px;">
        ${routeObj.mainHtml}
      </section>
      ${navHtml}
      <footer style="border-top: 1px solid #1e293b; padding-top: 1.25rem; font-size: 0.9rem; color: #94a3b8;">
        <p>
          Lautaro Leal Del Prete — <a href="mailto:lautaroleal4@gmail.com" style="color: #60a5fa;">lautaroleal4@gmail.com</a> |
          WhatsApp: <a href="https://wa.me/5493813399463" style="color: #60a5fa;">+54 9 381 339-9463</a> |
          LinkedIn: <a href="https://www.linkedin.com/in/lauldp" style="color: #60a5fa;">linkedin.com/in/lauldp</a> |
          GitHub: <a href="https://github.com/LautaroLeall" style="color: #60a5fa;">github.com/LautaroLeall</a>
        </p>
      </footer>
    </main>`;

  let html = baseHtml;
  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${safeTitle}</title>`);
  html = html.replace(
    /<meta name="title" content="[^"]*"\s*\/>/,
    `<meta name="title" content="${safeTitle}" />`
  );
  html = html.replace(
    /<meta name="description"[\s\S]*?content="[^"]*"\s*\/>/,
    `<meta name="description" content="${safeDesc}" />`
  );
  html = html.replace(
    /<link rel="canonical" href="[^"]*"\s*\/>/,
    `<link rel="canonical" href="${fullUrl}" />`
  );
  html = html.replace(
    /<link rel="alternate" hreflang="es" href="[^"]*"\s*\/>/,
    `<link rel="alternate" hreflang="es" href="${fullUrl}?lang=es" />`
  );
  html = html.replace(
    /<link rel="alternate" hreflang="en" href="[^"]*"\s*\/>/,
    `<link rel="alternate" hreflang="en" href="${fullUrl}?lang=en" />`
  );
  html = html.replace(
    /<link rel="alternate" hreflang="x-default" href="[^"]*"\s*\/>/,
    `<link rel="alternate" hreflang="x-default" href="${fullUrl}" />`
  );
  html = html.replace(
    /<meta property="og:url" content="[^"]*"\s*\/>/,
    `<meta property="og:url" content="${fullUrl}" />`
  );
  html = html.replace(
    /<meta property="og:title" content="[^"]*"\s*\/>/,
    `<meta property="og:title" content="${safeTitle}" />`
  );
  html = html.replace(
    /<meta property="og:description"[\s\S]*?content="[^"]*"\s*\/>/,
    `<meta property="og:description" content="${safeDesc}" />`
  );
  html = html.replace(
    /<meta property="og:image" content="[^"]*"\s*\/>/,
    `<meta property="og:image" content="${ogImage}" />`
  );
  html = html.replace(
    /<meta property="og:image:secure_url" content="[^"]*"\s*\/>/,
    `<meta property="og:image:secure_url" content="${ogImage}" />`
  );
  html = html.replace(
    /<meta name="twitter:url" content="[^"]*"\s*\/>/,
    `<meta name="twitter:url" content="${fullUrl}" />`
  );
  html = html.replace(
    /<meta name="twitter:title" content="[^"]*"\s*\/>/,
    `<meta name="twitter:title" content="${safeTitle}" />`
  );
  html = html.replace(
    /<meta name="twitter:description"[\s\S]*?content="[^"]*"\s*\/>/,
    `<meta name="twitter:description" content="${safeDesc}" />`
  );
  html = html.replace(
    /<meta name="twitter:image" content="[^"]*"\s*\/>/,
    `<meta name="twitter:image" content="${ogImage}" />`
  );
  html = html.replace(
    /<script type="application\/ld\+json">[\s\S]*?<\/script>/,
    `<script type="application/ld+json">\n  ${buildRouteJsonLd(routeObj)}\n  </script>`
  );
  html = html.replace(/<main[\s\S]*?<\/main>/, mainShell);

  return html;
}

function validateRouteSeoBounds(routePath, title, description) {
  const renderedTitleLen = unescapeBasicHtml(title).length;
  const renderedDescLen = unescapeBasicHtml(description).length;
  const issues = [];
  if (renderedTitleLen > 68) {
    issues.push(`title too long (${renderedTitleLen} chars): "${title}"`);
  }
  if (renderedDescLen < 115 || renderedDescLen > 158) {
    issues.push(`description out of 115-158 range (${renderedDescLen} chars): "${description}"`);
  }
  if (issues.length > 0) {
    throw new Error(`[seoPrerenderPlugin] SEO bounds failed for ${routePath}: ${issues.join('; ')}`);
  }
}

export function seoPrerenderPlugin() {
  return {
    name: 'lldp-seo-prerender-plugin',
    buildStart() {
      try {
        const today = new Date().toISOString().slice(0, 10);
        const publicDir = path.join(PROJECT_ROOT, 'public');

        const sitemapPath = path.join(publicDir, 'sitemap.xml');
        const nextSitemap = generateSitemapXml(today);
        if (!fs.existsSync(sitemapPath) || fs.readFileSync(sitemapPath, 'utf8') !== nextSitemap) {
          fs.writeFileSync(sitemapPath, nextSitemap, 'utf8');
        }

        const llmsPath = path.join(publicDir, 'llms.txt');
        const nextLlms = generateLlmsTxt(today);
        if (!fs.existsSync(llmsPath) || fs.readFileSync(llmsPath, 'utf8') !== nextLlms) {
          fs.writeFileSync(llmsPath, nextLlms, 'utf8');
        }
      } catch (err) {
        console.warn('[seoPrerenderPlugin] buildStart warning:', err.message);
      }
    },
    closeBundle() {
      const distDir = path.join(PROJECT_ROOT, 'dist');
      const distIndexPath = path.join(distDir, 'index.html');
      if (!fs.existsSync(distIndexPath)) return;

      const baseHtml = fs.readFileSync(distIndexPath, 'utf8');
      const homeTitleMatch = baseHtml.match(/<title>([\s\S]*?)<\/title>/);
      const homeDescMatch = baseHtml.match(/<meta name="description"[\s\S]*?content="([^"]*)"\s*\/>/);
      validateRouteSeoBounds('/', homeTitleMatch?.[1] || '', homeDescMatch?.[1] || '');

      const { staticPages, projectPages } = buildStaticRoutesConfig();
      const allSubroutes = [...staticPages, ...projectPages];

      for (const routeObj of allSubroutes) {
        validateRouteSeoBounds(routeObj.path, routeObj.title, routeObj.description);
        const renderedHtml = renderRouteHtml(baseHtml, routeObj);
        const cleanRelDir = routeObj.path.replace(/^\/+/, '');
        const targetDir = path.join(distDir, cleanRelDir);
        fs.mkdirSync(targetDir, { recursive: true });
        fs.writeFileSync(path.join(targetDir, 'index.html'), renderedHtml, 'utf8');
        fs.writeFileSync(path.join(distDir, `${cleanRelDir}.html`), renderedHtml, 'utf8');
      }

      console.log(
        `[seoPrerenderPlugin] Generated ${allSubroutes.length} static SEO/GEO route HTML files (cleanUrls + index.html) & verified ${allSubroutes.length + 1} routes metadata.`
      );
    }
  };
}
