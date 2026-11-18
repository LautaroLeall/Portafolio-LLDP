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
            categoryLabel: isEs ? 'Desarrollo Web' : 'Web Development',
            shortTitle: isEs ? 'Páginas Web' : 'Websites',
            subtitle: isEs
                ? 'Sitios profesionales, rápidos y adaptables a celular y PC.'
                : 'Professional, fast websites tailored for mobile and desktop.',
            longDescription: isEs
                ? 'Diseño y desarrollo sitios web modernos, veloces y adaptables a celulares y computadoras, reflejando la identidad de tu negocio con contacto directo a tu WhatsApp.'
                : 'Modern, fast websites that look great on phones and desktops, reflecting your brand identity with direct WhatsApp contact.',
            deliverables: isEs
                ? ['Landing Page', '100% Responsive', 'SEO & Velocidad', 'WhatsApp Directo']
                : ['Landing Page', '100% Responsive', 'SEO & Speed', 'Direct WhatsApp']
        },

        /* 02. SISTEMAS DE GESTIÓN */
        {
            id: 'sistemas-gestion',
            number: '02',
            categoryLabel: isEs ? 'Software a Medida' : 'Custom Software',
            shortTitle: isEs ? 'Sistemas de Gestión' : 'Management Systems',
            subtitle: isEs
                ? 'Sistemas a medida para comercios, consultorios, clubes y talleres.'
                : 'Custom systems for shops, clinics, clubs, and workshops.',
            longDescription: isEs
                ? 'Sistemas web a medida que centralizan tu operación diaria: agenda de turnos, control de stock, tablas deportivas o reservas y balance de finanzas accesible desde cualquier dispositivo.'
                : 'Custom web systems that centralize daily operations: client bookings, stock control, and finance tracking from any device.',
            deliverables: isEs
                ? ['Turnos de Hoy', 'Control de Stock', 'Balance Financiero', 'Multi-dispositivo']
                : ['Today Bookings', 'Stock Control', 'Financial Balance', 'Multi-device']
        },

        /* 03. TIENDA ONLINE */
        {
            id: 'tienda-online',
            number: '03',
            categoryLabel: 'E-Commerce',
            shortTitle: isEs ? 'Tienda Online' : 'Online Store',
            subtitle: isEs
                ? 'Tiendas con carrito, pagos y panel autoadministrable.'
                : 'Online stores with cart, payments, and easy admin panel.',
            longDescription: isEs
                ? 'Tus clientes recorren tu catálogo desde el celular, arman su carrito y pagan online, mientras vos administrás productos, precios, stock y órdenes desde un panel simple.'
                : 'Customers browse your catalog on mobile, fill their cart, and pay online while you manage products and orders from a simple dashboard.',
            deliverables: isEs
                ? ['Catálogo Online', 'Carrito & Pagos', 'Panel Admin', 'Alertas de Venta']
                : ['Online Catalog', 'Cart & Payments', 'Admin Panel', 'Sale Alerts']
        },

        /* 04. INVITACIONES DIGITALES */
        {
            id: 'invitaciones-digitales',
            number: '04',
            categoryLabel: isEs ? 'Eventos & Cards' : 'Event Cards',
            shortTitle: isEs ? 'Invitaciones Digitales' : 'Digital Invitations',
            subtitle: isEs
                ? 'Contanos tu temática ¡y la hacemos realidad! Con RSVP, Maps y música.'
                : 'Tell us your theme and we build it! With RSVP, Maps, and music.',
            longDescription: isEs
                ? 'Tarjetas digitales interactivas y mobile-first para Cumpleaños Infantiles, 15 Años, 18 Años, Casamientos y Eventos. Incluyen pantalla de bienvenida con música, cuenta regresiva en vivo, personajes o animaciones temáticas, ubicación con Google Maps, sección de regalos (CBU/Alias con copiado rápido) y confirmación de asistencia (RSVP) directo a tu WhatsApp.'
                : 'Interactive mobile-first digital invitations for Kids Birthdays, Sweet 15s, 18th Birthdays, and Weddings. Featuring welcome screen with music, live countdown, themed animations, Google Maps location, gift modal (Alias/CBU copy), and direct WhatsApp RSVP.',
            deliverables: isEs
                ? ['Cumple', 'Fiestas', 'Regalos', 'Cards', 'RSVP', 'Música']
                : ['Birthdays', 'Parties', 'Gifts', 'Cards', 'RSVP', 'Music']
        },

        /* 05. MEJORA DE TU WEB */
        {
            id: 'mejora-web',
            number: '05',
            categoryLabel: isEs ? 'Optimización' : 'Optimization',
            shortTitle: isEs ? 'Mejora de tu Web' : 'Website Upgrade',
            subtitle: isEs
                ? 'Optimizo la velocidad, el diseño y las funciones de tu sitio actual.'
                : 'I upgrade the speed, design, and features of your current site.',
            longDescription: isEs
                ? 'Si tu sitio tarda en cargar o quedó desactualizado en celulares, realizo una revisión previa y transformo su Velocidad, Diseño y Funciones.'
                : 'If your existing site is slow or looks outdated on mobile, I audit it and upgrade its Speed, Design, and Features.',
            deliverables: isEs
                ? ['Auditoría Previa', 'Más Velocidad', 'Rediseño UI', 'Nuevas Funciones']
                : ['Initial Audit', 'Speed Boost', 'UI Redesign', 'New Features']
        },

        /* 06. REVISIÓN DE PRESUPUESTO */
        {
            id: 'revision-presupuesto',
            number: '06',
            categoryLabel: isEs ? 'Asesoría' : 'Advisory',
            shortTitle: isEs ? 'Revisión de Presupuesto' : 'Quote Review',
            subtitle: isEs
                ? 'Te ayudo a mejorarlo o a encontrar una opción más conveniente.'
                : 'I help you improve it or find a more convenient option.',
            longDescription: isEs
                ? 'Revisamos juntos el presupuesto que te pasaron (Diseño, Desarrollo, Contenido, Soporte y Extras), sin compromiso, para que elijas con seguridad y ahorres.'
                : 'We review the quote you received item by item (Design, Dev, Content, Support, Extras) with zero obligation so you get a better deal.',
            deliverables: isEs
                ? ['Checklist Completo', 'Costos Ocultos', 'Comparativa', 'Mejor Propuesta']
                : ['Full Checklist', 'Hidden Costs', 'Comparison', 'Better Proposal']
        }
    ];
};
