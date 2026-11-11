export const CONTACT_INFO = {
    whatsappDisplay: '+54 381 339 9463',
    whatsappNumber: '5493813399463',
    portfolioDisplay: 'lautarolealdev.com',
    portfolioUrl: 'https://lautarolealdev.com',
    email: 'lautaroleal4@gmail.com',
    github: 'https://github.com/LautaroLeall',
    linkedin: 'https://www.linkedin.com/in/lauldp'
};

export const buildWhatsAppUrl = (message) => {
    const encoded = encodeURIComponent(message);
    return `https://wa.me/${CONTACT_INFO.whatsappNumber}?text=${encoded}`;
};

export const getServicesData = (lang = 'es') => {
    const isEs = lang === 'es';

    return [
        /* 01. PÁGINAS WEB */
        {
            id: 'paginas-web',
            number: '01',
            category: 'web',
            categoryLabel: isEs ? 'Desarrollo Web' : 'Web Development',
            shortTitle: isEs ? 'Páginas Web' : 'Websites',
            header: isEs
                ? 'DESARROLLO & DISEÑO WEB | LAUTARO LEAL DEL PRETE'
                : 'WEB DEVELOPMENT & DESIGN | LAUTARO LEAL DEL PRETE',
            badge: '24/7 ONLINE',
            accentColor: '#06b6d4',
            title: isEs
                ? 'Tu negocio, abierto las 24 hs.'
                : 'Your business, open 24/7 online.',
            carouselSubtitle: isEs
                ? 'Sitios rápidos y responsive.'
                : 'Fast & responsive websites.',
            subtitle: isEs
                ? 'Sitios profesionales, rápidos y adaptables a celular y PC.'
                : 'Professional, fast websites tailored for mobile and desktop.',
            longDescription: isEs
                ? 'Diseño y desarrollo sitios web modernos, veloces y adaptables a celulares y computadoras, reflejando la identidad de tu negocio con contacto directo a tu WhatsApp.'
                : 'Modern, fast websites that look great on phones and desktops, reflecting your brand identity with direct WhatsApp contact.',
            featuresTitle: isEs ? 'Qué incluye' : 'Included',
            features: isEs
                ? [
                    'Diseño profesional y prolijo',
                    'Adaptado a celular y PC',
                    'Con la identidad de tu marca',
                    'Botón directo a WhatsApp'
                ]
                : [
                    'Clean professional design',
                    'Mobile & desktop ready',
                    'Custom brand identity',
                    'Direct WhatsApp button'
                ],
            deliverables: isEs
                ? ['Landing Page', '100% Responsive', 'SEO & Velocidad', 'WhatsApp Directo']
                : ['Landing Page', '100% Responsive', 'SEO & Speed', 'Direct WhatsApp'],
            ctaText: isEs ? 'Cotizar' : 'Quote',
            footerNote: 'LAUTARO LEAL DEL PRETE • DESARROLLO WEB',
            whatsappMessage: isEs
                ? 'Hola Lautaro! Me gustaría cotizar una Página Web para mi negocio.'
                : 'Hi Lautaro! I would like to quote a Website for my business.',
            relatedProjects: [
                {
                    name: 'Levels GYM',
                    url: 'https://levels-ar.netlify.app/',
                    tag: isEs ? 'Gimnasio & Fitness' : 'Gym & Fitness',
                    desc: isEs
                        ? 'Web para gimnasio con comparativa de planes, horarios de clases, entrenadores y mapa interactivo.'
                        : 'High-performance gym portal with membership plans, class schedules, trainers, and interactive map.'
                },
                {
                    name: 'MyM Decoraciones',
                    url: 'https://mym-decoraciones.netlify.app/',
                    tag: isEs ? 'Ambientación & Eventos' : 'Event Decoration',
                    desc: isEs
                        ? 'Landing comercial para decoración de eventos con galería de montajes, paquetes con precios y reserva por WhatsApp.'
                        : 'Event decoration landing page with interactive gallery, service packages, and direct WhatsApp booking.'
                },
                {
                    name: 'Cesar Aparicio Estilista',
                    url: 'https://cesar-aparicio-estilista.netlify.app/',
                    tag: isEs ? 'Salón & Estética' : 'Hair Stylist',
                    desc: isEs
                        ? 'Portafolio estilístico con lookbook de cortes, lista de servicios con precios y agenda de turnos a WhatsApp.'
                        : 'Stylist portfolio with hairstyle lookbook, service pricing catalog, and one-tap WhatsApp booking.'
                },
                {
                    name: 'BGA Habilitaciones',
                    url: 'https://bga-habilitaciones.netlify.app/',
                    tag: isEs ? 'Consultora Comercial' : 'Permits Consulting',
                    desc: isEs
                        ? 'Sitio corporativo para consultoría de habilitaciones municipales, guía de requisitos y formulario técnico.'
                        : 'Corporate consulting site for commercial permits, step-by-step requirement guides, and intake form.'
                },
                {
                    name: 'Krauft Inmobiliaria',
                    url: 'https://krauft-marketing-inmobiliaria.netlify.app/',
                    tag: isEs ? 'Marketing Inmobiliario' : 'Real Estate Agency',
                    desc: isEs
                        ? 'Web corporativa para desarrollos inmobiliarios, visualización 3D, campañas y captación de inversores.'
                        : 'Real estate marketing platform showcasing developments, 3D renders, and investor inquiry channels.'
                }
            ]
        },

        /* 02. SISTEMAS DE GESTIÓN */
        {
            id: 'sistemas-gestion',
            number: '02',
            category: 'systems',
            categoryLabel: isEs ? 'Software a Medida' : 'Custom Software',
            shortTitle: isEs ? 'Sistemas de Gestión' : 'Management Systems',
            header: isEs
                ? 'DESARROLLO & DISEÑO WEB | LAUTARO LEAL DEL PRETE'
                : 'WEB DEVELOPMENT & DESIGN | LAUTARO LEAL DEL PRETE',
            badge: isEs ? 'PANEL A MEDIDA' : 'CUSTOM PANEL',
            accentColor: '#6366f1',
            title: isEs
                ? 'Turnos, stock y finanzas ordenados.'
                : 'Bookings, stock & finance in order.',
            carouselSubtitle: isEs
                ? 'Turnos, stock y finanzas al día.'
                : 'Bookings, stock & finance.',
            subtitle: isEs
                ? 'Sistemas a medida para comercios, consultorios, clubes y talleres.'
                : 'Custom systems for shops, clinics, clubs, and workshops.',
            longDescription: isEs
                ? 'Sistemas web a medida que centralizan tu operación diaria: agenda de turnos, control de stock, tablas deportivas o reservas y balance de finanzas accesible desde cualquier dispositivo.'
                : 'Custom web systems that centralize daily operations: client bookings, stock control, and finance tracking from any device.',
            featuresTitle: isEs ? 'Funcionalidades' : 'Capabilities',
            features: isEs
                ? [
                    'Agenda de turnos online',
                    'Control de stock y productos',
                    'Finanzas e ingresos al día',
                    'Uso en celular, tablet y PC'
                ]
                : [
                    'Online appointment booking',
                    'Product & stock control',
                    'Up-to-date daily finances',
                    'Phone, tablet & PC access'
                ],
            deliverables: isEs
                ? ['Turnos de Hoy', 'Control de Stock', 'Balance Financiero', 'Multi-dispositivo']
                : ['Today Bookings', 'Stock Control', 'Financial Balance', 'Multi-device'],
            ctaText: isEs ? 'Cotizar' : 'Quote',
            footerNote: 'LAUTARO LEAL DEL PRETE • SISTEMAS WEB',
            whatsappMessage: isEs
                ? 'Hola Lautaro! Quería consultar por un Sistema de Gestión (turnos, stock y finanzas).'
                : 'Hi Lautaro! I would like to inquire about a custom Management System.',
            relatedProjects: [
                {
                    name: 'Club Natación y Gimnasia',
                    url: 'https://natacionygimanacia.vercel.app/',
                    tag: isEs ? 'Gestión de Club' : 'Club Management',
                    desc: isEs
                        ? 'Gestión integral para club: tabla de posiciones automática con puntos bonus, fixture, planteles de jugadores, noticias y panel admin.'
                        : 'Full club management system with live standings table, bonus points engine, match fixture, player rosters, and private admin dashboard.'
                },
                {
                    name: 'CONFIA-CAR',
                    url: 'https://confia-car-rent.vercel.app/',
                    tag: isEs ? 'Reservas & Flota' : 'Fleet & Bookings',
                    desc: isEs
                        ? 'Sistema para reserva de vehículos con bloqueo de fechas ocupadas, pagos con Mercado Pago, chat en vivo y panel de control de flota e ingresos.'
                        : 'Vehicle booking & fleet management system with dynamic date blocking, Mercado Pago checkout, live chat, and revenue dashboard.'
                },
                {
                    name: 'NutriOliva',
                    url: 'https://nutri-oliva.vercel.app/',
                    tag: isEs ? 'Gestión de Pacientes' : 'Clinic & Patients',
                    desc: isEs
                        ? 'Sistema clínico para consultorios: fichas de pacientes, armado de planes con cálculo de calorías y seguimiento diario.'
                        : 'Clinical management system for nutritionists and patients with dynamic meal plan builder and daily progress tracking.'
                }
            ]
        },

        /* 03. TIENDA ONLINE */
        {
            id: 'tienda-online',
            number: '03',
            category: 'web',
            categoryLabel: 'E-Commerce',
            shortTitle: isEs ? 'Tienda Online' : 'Online Store',
            header: isEs
                ? 'DESARROLLO & DISEÑO WEB | LAUTARO LEAL DEL PRETE'
                : 'WEB DEVELOPMENT & DESIGN | LAUTARO LEAL DEL PRETE',
            badge: isEs ? '¡NUEVA VENTA!' : 'E-COMMERCE',
            accentColor: '#10b981',
            title: isEs
                ? 'Vendé online con tu propia tienda.'
                : 'Sell online with your own store.',
            carouselSubtitle: isEs
                ? 'Carrito, pagos y panel simple.'
                : 'Cart, payments & admin panel.',
            subtitle: isEs
                ? 'Tiendas con carrito, pagos y panel autoadministrable.'
                : 'Online stores with cart, payments, and easy admin panel.',
            longDescription: isEs
                ? 'Tus clientes recorren tu catálogo desde el celular, arman su carrito y pagan online, mientras vos administrás productos, precios, stock y órdenes desde un panel simple.'
                : 'Customers browse your catalog on mobile, fill their cart, and pay online while you manage products and orders from a simple dashboard.',
            featuresTitle: isEs ? 'Características' : 'Features',
            features: isEs
                ? [
                    'Carrito de compras y pagos',
                    'Panel autoadministrable',
                    'Catálogo hecho a medida',
                    'Pensada para vender en móvil'
                ]
                : [
                    'Shopping cart & payments',
                    'Self-managed admin panel',
                    'Custom product catalog',
                    'Built for mobile sales'
                ],
            deliverables: isEs
                ? ['Catálogo Online', 'Carrito & Pagos', 'Panel Admin', 'Alertas de Venta']
                : ['Online Catalog', 'Cart & Payments', 'Admin Panel', 'Sale Alerts'],
            ctaText: isEs ? 'Cotizar' : 'Quote',
            footerNote: 'LAUTARO LEAL DEL PRETE • E-COMMERCE',
            whatsappMessage: isEs
                ? 'Hola Lautaro! Me interesa cotizar una Tienda Online con carrito y panel.'
                : 'Hi Lautaro! I am interested in quoting an Online Store.',
            relatedProjects: [
                {
                    name: 'Nova-SetUp',
                    url: 'https://nova-setup.vercel.app/',
                    tag: isEs ? 'Tienda Hardware' : 'Hardware Store',
                    desc: isEs
                        ? 'E-commerce con simulador interactivo "Arma tu PC", carrito lateral con Mercado Pago y panel administrador de stock, productos y ventas.'
                        : 'Full Stack store featuring an interactive PC Builder, slide-out cart with Mercado Pago, and inventory/sales admin dashboard.'
                },
                {
                    name: 'Fleeswap',
                    url: 'https://fleeswap.vercel.app/',
                    tag: 'Marketplace',
                    desc: isEs
                        ? 'Plataforma de compras e intercambios con propuestas en 3 pasos, chat en tiempo real, notificaciones, reputación y panel de moderación.'
                        : 'Collaborative marketplace for purchases and trades with 3-step proposals, live chat, reputation system, and admin panel.'
                }
            ]
        },

        /* 04. INVITACIONES DIGITALES */
        {
            id: 'invitaciones-digitales',
            number: '04',
            category: 'systems',
            categoryLabel: isEs ? 'Eventos & Cards' : 'Event Cards',
            shortTitle: isEs ? 'Invitaciones Digitales' : 'Digital Invitations',
            header: isEs
                ? 'DISEÑO DE INVITACIONES 100% DIGITALES'
                : '100% DIGITAL INVITATION DESIGN',
            badge: isEs ? 'CALIDAD PREMIUM' : 'PREMIUM QUALITY',
            accentColor: '#ec4899',
            title: isEs
                ? 'Invitaciones 100% Digitales.'
                : '100% Digital Invitations.',
            carouselSubtitle: isEs
                ? 'Cumple, 15 Años, Bodas y RSVP.'
                : 'Birthdays, Sweet 15 & RSVP.',
            subtitle: isEs
                ? 'Contanos tu temática ¡y la hacemos realidad! Con RSVP, Maps y música.'
                : 'Tell us your theme and we build it! With RSVP, Maps, and music.',
            longDescription: isEs
                ? 'Tarjetas digitales interactivas y mobile-first para Cumpleaños Infantiles, 15 Años, 18 Años, Casamientos y Eventos. Incluyen pantalla de bienvenida con música, cuenta regresiva en vivo, personajes o animaciones temáticas, ubicación con Google Maps, sección de regalos (CBU/Alias con copiado rápido) y confirmación de asistencia (RSVP) directo a tu WhatsApp.'
                : 'Interactive mobile-first digital invitations for Kids Birthdays, Sweet 15s, 18th Birthdays, and Weddings. Featuring welcome screen with music, live countdown, themed animations, Google Maps location, gift modal (Alias/CBU copy), and direct WhatsApp RSVP.',
            featuresTitle: isEs ? 'Lo que incluye' : 'Included',
            features: isEs
                ? [
                    'Infantil, 15 Años y Eventos',
                    '¿Cuándo? y ¿Dónde? con Maps',
                    'Botón ¡CONFIRMAR! a WhatsApp',
                    'Música, Regalos y Cards'
                ]
                : [
                    'Kids, Sweet 15 & Events',
                    'When & Where with Maps',
                    'Instant WhatsApp RSVP',
                    'Music, Gifts & Cards'
                ],
            specialties: ['Cumple', 'Fiestas', 'Regalos', 'Cards', 'RSVP', 'Música'],
            deliverables: isEs
                ? ['Cumple', 'Fiestas', 'Regalos', 'Cards', 'RSVP', 'Música']
                : ['Birthdays', 'Parties', 'Gifts', 'Cards', 'RSVP', 'Music'],
            ctaText: isEs ? 'Cotizar temática' : 'Quote theme',
            footerNote: 'LAUTARO LEAL DEL PRETE • TARJETAS VIRTUALES',
            whatsappMessage: isEs
                ? 'Hola Lautaro! Quería consultar por una Invitación Digital. Mi temática es: '
                : 'Hi Lautaro! I would like to inquire about a Digital Invitation.',
            relatedProjects: [
                {
                    name: 'Cumple 5 de Sofía (K-Pop Rumi)',
                    url: 'https://cumple-sofi-5.netlify.app/',
                    tag: 'K-Pop & Disco Party',
                    desc: isEs
                        ? 'Pase VIP con audio y confeti, Rumi bailarina interactiva, Lightstick virtual que cambia de color, cuenta regresiva, Maps, Book de fotos, Regalos (Alias/CBU) y RSVP con pedido de canción al DJ.'
                        : 'VIP Idol Pass with audio & confetti, interactive dancing Rumi, color-changing virtual Lightstick, live countdown, Maps, photo book, gift modal, and WhatsApp RSVP.'
                },
                {
                    name: 'Cumple 18 de Julián (Boca)',
                    url: 'https://cumple-18-julian.netlify.app/',
                    tag: '18 Años • Boca Juniors',
                    desc: isEs
                        ? 'Temática azul y oro con música dedicada para misa y fiesta, confeti interactivo, cuenta regresiva, vista de ceremonia y salón, modal de regalos (CBU/Alias) y formulario RSVP a WhatsApp.'
                        : 'Boca Juniors dark & gold theme with dedicated ceremony/party music, confetti effects, countdown, venue details, CBU/Alias gift modal, and WhatsApp RSVP.'
                },
                {
                    name: 'Cumple 6 de Olivia (Stitch & Angel)',
                    url: 'https://cumple-olivia-6.netlify.app/',
                    tag: '6 Añitos • Stitch & Angel',
                    desc: isEs
                        ? 'Temática hawaiana con música (Hawaiian Roller Coaster Ride), personajes interactivos de Stitch y Angel, lluvia de confeti, ubicación con Google Maps y confirmación RSVP por WhatsApp.'
                        : 'Stitch & Angel Hawaiian theme with background music, interactive characters, confetti bursts, event details with Google Maps, and direct WhatsApp RSVP.'
                },
                {
                    name: 'XV de Karla (Fiesta)',
                    url: 'https://cumple-15-karla.netlify.app/',
                    tag: '15 Años • Fiesta',
                    desc: isEs
                        ? 'Experiencia animada con banner de bienvenida, reproductor de música, cuenta regresiva, animaciones GSAP y Lottie, modales de mapa, mesa de regalos y confirmación de asistencia.'
                        : 'Animated Sweet 15 party invitation with welcome modal, audio player, countdown timer, GSAP/Lottie animations, map & gift modals, and WhatsApp confirmation.'
                },
                {
                    name: 'Misa de los 15 de Karla',
                    url: 'https://misa-15-karla.netlify.app/',
                    tag: '15 Años • Ceremonia',
                    desc: isEs
                        ? 'Tarjeta elegante en paleta rosa con animaciones suaves GSAP, botones con íconos apilados y modales interactivos para ver la foto de la iglesia y el mapa de ubicación.'
                        : 'Elegant pink-themed ceremony card with smooth GSAP animations and interactive modals displaying the church photo and embedded location map.'
                }
            ]
        },

        /* 05. MEJORA DE TU WEB */
        {
            id: 'mejora-web',
            number: '05',
            category: 'consulting',
            categoryLabel: isEs ? 'Optimización' : 'Optimization',
            shortTitle: isEs ? 'Mejora de tu Web' : 'Website Upgrade',
            header: isEs
                ? 'DESARROLLO & DISEÑO WEB | LAUTARO LEAL DEL PRETE'
                : 'WEB DEVELOPMENT & DESIGN | LAUTARO LEAL DEL PRETE',
            badge: isEs ? 'ANTES → DESPUÉS' : 'BEFORE → AFTER',
            accentColor: '#38bdf8',
            title: isEs
                ? '¿Tu web quedó lenta? Mejorémosla.'
                : 'Website slow or old? Let’s fix it.',
            carouselSubtitle: isEs
                ? 'Más velocidad, diseño y funciones.'
                : 'Better speed, UI & features.',
            subtitle: isEs
                ? 'Optimizo la velocidad, el diseño y las funciones de tu sitio actual.'
                : 'I upgrade the speed, design, and features of your current site.',
            longDescription: isEs
                ? 'Si tu sitio tarda en cargar o quedó desactualizado en celulares, realizo una revisión previa y transformo su Velocidad, Diseño y Funciones.'
                : 'If your existing site is slow or looks outdated on mobile, I audit it and upgrade its Speed, Design, and Features.',
            featuresTitle: isEs ? 'Beneficios' : 'Benefits',
            features: isEs
                ? [
                    'Más velocidad de carga',
                    'Diseño actualizado y claro',
                    'Funcionalidades nuevas',
                    'Revisión previa de tu sitio'
                ]
                : [
                    'Faster loading speed',
                    'Modern & clear redesign',
                    'New interactive features',
                    'Prior site audit included'
                ],
            deliverables: isEs
                ? ['Auditoría Previa', 'Más Velocidad', 'Rediseño UI', 'Nuevas Funciones']
                : ['Initial Audit', 'Speed Boost', 'UI Redesign', 'New Features'],
            ctaText: isEs ? 'Cotizar mejora' : 'Quote upgrade',
            footerNote: 'LAUTARO LEAL DEL PRETE • OPTIMIZACIÓN WEB',
            whatsappMessage: isEs
                ? 'Hola Lautaro! Quiero mejorar la velocidad y el diseño de mi página web actual.'
                : 'Hi Lautaro! I want to upgrade the speed and design of my current website.',
            relatedProjects: []
        },

        /* 06. REVISIÓN DE PRESUPUESTO */
        {
            id: 'revision-presupuesto',
            number: '06',
            category: 'consulting',
            categoryLabel: isEs ? 'Asesoría' : 'Advisory',
            shortTitle: isEs ? 'Revisión de Presupuesto' : 'Quote Review',
            header: isEs
                ? 'DESARROLLO & DISEÑO WEB | LAUTARO LEAL DEL PRETE'
                : 'WEB DEVELOPMENT & DESIGN | LAUTARO LEAL DEL PRETE',
            badge: isEs ? 'TE LO REVISO' : 'FREE REVIEW',
            accentColor: '#f59e0b',
            title: isEs
                ? '¿Ya tenés otro presupuesto?'
                : 'Already have another quote?',
            carouselSubtitle: isEs
                ? 'Te ayudo a mejorarlo sin cargo.'
                : 'I help you improve it for free.',
            subtitle: isEs
                ? 'Te ayudo a mejorarlo o a encontrar una opción más conveniente.'
                : 'I help you improve it or find a more convenient option.',
            longDescription: isEs
                ? 'Revisamos juntos el presupuesto que te pasaron (Diseño, Desarrollo, Contenido, Soporte y Extras), sin compromiso, para que elijas con seguridad y ahorres.'
                : 'We review the quote you received item by item (Design, Dev, Content, Support, Extras) with zero obligation so you get a better deal.',
            featuresTitle: isEs ? 'Proceso' : 'Process',
            features: isEs
                ? [
                    'Qué incluye y qué falta',
                    'Comparamos alternativas',
                    'Ajuste a tu presupuesto',
                    'Consulta sin compromiso'
                ]
                : [
                    'Check included & missing items',
                    'Compare alternatives',
                    'Fit to your budget',
                    'No-obligation consult'
                ],
            deliverables: isEs
                ? ['Checklist Completo', 'Costos Ocultos', 'Comparativa', 'Mejor Propuesta']
                : ['Full Checklist', 'Hidden Costs', 'Comparison', 'Better Proposal'],
            ctaText: isEs ? 'Revisar ahora' : 'Review quote',
            footerNote: 'LAUTARO LEAL DEL PRETE • AUDITORÍA WEB',
            whatsappMessage: isEs
                ? 'Hola Lautaro! Me pasaron un presupuesto web y quería que lo revisemos sin compromiso.'
                : 'Hi Lautaro! I received a web quote and would like you to review it.',
            relatedProjects: []
        }
    ];
};

export { getPricingConfig, pricingConfig } from './pricingData';
