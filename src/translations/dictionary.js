export const translations = {
    en: {
        nav: {
            home: 'Home',
            about: 'About Me',
            skills: 'Skills',
            projects: 'Projects',
            contact: 'Contact'
        },
        home: {
            greeting: 'Hi, my name is',
            name: 'Lautaro Leal Del Prete',
            titles: [
                'Full Stack Developer',
                'Creative Problem Solver',
                'Building Scalable Products'
            ],
            btnWork: 'View My Work',
            btnContact: 'Contact Me',
            btnServices: 'Web Services'
        },
        about: {
            title: 'About Me',
            text1: "Hello, I'm Lautaro Leal Del Prete.",
            text2: 'I am a Software Development and Quality graduate with experience building Full Stack web applications.',
            text3: 'I focus on developing scalable products, implementing responsive interfaces, and applying best development practices and agile methodologies.',
            text4: "I am motivated by solving problems, integrating REST APIs, and optimizing the user experience. I'm always ready to take on new challenges for my personal and professional growth."
        },
        qualifications: {
            educationTitle: 'Education',
            educationList: [
                {
                    institution: 'UNSTA — Universidad del Norte Santo Tomás de Aquino',
                    type: 'Associate Degree',
                    degree: 'Software Development and Quality Assurance',
                    period: '2024 - 2026'
                },
                {
                    institution: 'Instituto Nexus — SM de Tucumán',
                    type: 'English Language Training',
                    degree: 'Communicative English & International Exams',
                    period: '2025 - Present'
                }
            ],
            certificationsTitle: 'My Certifications'
        },
        cv: {
            spanish: 'Download CV - Spanish Version',
            english: 'Download CV - English Version'
        },
        skills: {
            title: 'Technical Expertise',
            subtitle: 'Technologies and tools I use to build scalable and high-quality solutions.',
            softTitle: 'Core Competencies & Soft Skills',
            softSkills: {
                ai: 'Generative AI',
                comm: 'Communication',
                team: 'Teamwork',
                problem: 'Problem Solving',
                adapt: 'Adaptability',
                innov: 'Innovation'
            }
        },
        projects: {
            title: 'My Projects',
            subtitle: 'Explore my most recent work in Full Stack development and Landing Pages.',
            featuredBadge: 'Featured Portfolio',
            categories: {
                all: 'All',
                fullstack: 'Full Stack',
                landing: 'Landing'
            },
            detail: {
                viewDetails: 'View Details',
                exploreInteractive: 'Live Interactive Sandbox',
                visualSnapshot: 'HD Snapshot',
                interactiveNotice: 'You can interact, click and test the app right here without leaving the portfolio.',
                featuresTitle: 'Key Highlights',
                techTitle: 'Technologies Used',
                visitSite: 'Visit Website',
                viewCode: 'Source Code',
                deviceDesktop: 'Desktop',
                deviceTablet: 'Tablet',
                deviceMobile: 'Mobile',
                close: 'Close',
                reload: 'Reload',
                protectedBadge: 'Secure Production Server',
                protectedDesc: 'Due to X-Frame-Options server security, this web app runs protected in its own secure production environment.',
                launchLive: 'Launch Full App in New Tab',
                tryEmbed: 'Try embedded preview'
            },
            nyg: {
                desc: 'Full stack sports platform for Club Natación y Gimnasia (Rugby) with live fixtures, standings & admin suite.',
                longDesc: 'Comprehensive Full Stack digital platform built for Club Natación y Gimnasia, dedicated to rugby operations and tournament administration. Features a high-performance public interface for club members and supporters (real-time news, player rosters, tournament fixtures, and an automated standings engine with offensive and defensive bonus points calculations) alongside an enterprise-grade private Administration Suite protected by JWT authentication via secure httpOnly cookies.',
                features: [
                    'Interactive public portal with live match fixtures, schedules, and dynamic standings calculation with bonus points rules',
                    'Secure private administration panel with role-based JWT authentication and httpOnly cookie management',
                    'High-performance backend API with Node.js, Express 5, MongoDB Mongoose, and Cloudinary media optimization',
                    'Mobile-first responsive architecture built with React 19, Tailwind CSS v4, Zustand state management, and Zod validation'
                ]
            },
            nutrioliva: {
                desc: 'Comprehensive web platform for nutritional management, meal plan creation, and real-time patient tracking.',
                longDesc: 'Full Stack healthcare and nutrition platform connecting clinical dietitians with their patients in an interactive, collaborative ecosystem. Nutritionists manage clinical records, design tailored meal plans with real-time calorie and macronutrient computation, and govern plan versions. Patients access active nutritional plans, log meals from a global food catalog, track workouts, and monitor their progress along an interactive health timeline.',
                features: [
                    'Interactive meal plan builder with dynamic calorie balancing and automated macronutrient distribution breakdown',
                    'Patient portal featuring daily meal logging, workout records, and an interactive health timeline calendar',
                    'PostgreSQL relational database hosted on Supabase with rigorous Row Level Security (RLS) tenant isolation',
                    'Multi-role authentication (Dietitian, Patient, Admin) and serverless Deno Edge Functions for nutritional processing'
                ]
            },
            confiaCar: {
                desc: 'Full Stack vehicle rental platform with Mercado Pago payments, Google OAuth, real-time WebSocket chat, and RBAC admin dashboard.',
                longDesc: 'Comprehensive Full Stack car rental web platform engineered for Confia-CAR with a modern, high-contrast dark visual identity. Features an interactive fleet catalog organized by category, dynamic date range picker with UTC normalization and booked-date locking, online payment processing via official Mercado Pago SDK with real-time webhooks, dual authentication (Google OAuth 2.0 and local Bcryptjs + JWT), private live WebSocket chat rooms per booking (booking:id) via Socket.io, and a robust administrative control panel for revenue analytics, vehicle fleet CRUD, and customer inquiry management.',
                features: [
                    'Live payment processing with official Mercado Pago SDK: ARS preference generation and automated webhook confirmation',
                    'Real-time bidirectional chat rooms powered by Socket.io per booking (booking:id) with persistent MongoDB message logs',
                    'Dual authentication architecture with Google OAuth 2.0 and encrypted Bcryptjs + JWT credential protection',
                    'Full RBAC Admin Dashboard: revenue analytics, end-to-end vehicle fleet management (CRUD), bookings, and customer chats',
                    'Interactive smart date picker with automatic booked-date locking and 12:00:00 UTC timezone normalization',
                    'Intelligent Global Loader with background server health checks and automatic retries preventing cold-start freezes'
                ]
            },
            fleeswap: {
                desc: 'Full Stack barter & trade marketplace featuring bilateral confirmation, Socket.IO chat, live notifications, and reputation system.',
                longDesc: 'Comprehensive Full Stack peer-to-peer barter, trade, and direct-sale platform built on a scalable Feature-Slice architecture. Features an end-to-end transactional pipeline with a unified "My Exchanges" dashboard, 3-step trade proposal wizard (supporting item-for-item plus monetary balance adjustments), and bilateral trade confirmation. Includes contextual real-time WebSocket messaging per active trade via Socket.IO, live notification hub with hash-based deep linking, keyword-based active searches with automated matching, public peer reputation reviews, robust anti-XSS JWT authentication (in-memory tokens via Zustand and httpOnly refresh cookie), and an admin dashboard for moderation and platform metrics.',
                features: [
                    'Complete barter & purchase transaction pipeline: unified exchange inbox, bilateral confirmation, and silent background status updates',
                    'Contextual real-time trade chat via Socket.IO: private room isolation, message logs, and automated read-only transition upon completion',
                    'Active keyword searches with automated publication matching and persistent realtime notification dispatch to private user rooms',
                    'Peer reputation & rating engine: 7-day post-trade review window, visible public rating average, and duplicate-vote prevention',
                    'Strict anti-XSS security model: access tokens held strictly in-memory via Zustand 5, transparent httpOnly refresh cookies, and input sanitization',
                    'Clean layered architecture leveraging React 19, Vite, Tailwind CSS v4, Express 5, MongoDB Mongoose, Cloudinary media, and admin moderation'
                ]
            },
            novaSetup: {
                desc: 'Full Stack e-commerce for premium setups & hardware featuring interactive "PC Builder" simulator, drawer cart, and admin panel.',
                longDesc: 'Comprehensive Full Stack e-commerce platform engineered for Nova SetUp, specialists in high-tier hardware and workstation gear for professionals and gamers. Features a dark-mode immersive aesthetic with interactive Framer Motion scroll parallax. Highlights include the custom step-by-step "PC Builder" simulator with real-time component compatibility checks and live budget calculations, an asynchronous slide-out cart drawer, integrated checkout workflow, secure JWT authentication with password recovery via Nodemailer, cloud asset uploads via Cloudinary & Multer, and an administrative control panel for sales analytics and stock control.',
                features: [
                    'Interactive "PC Builder" simulator: step-by-step guided wizard with hardware compatibility validation and real-time pricing computation',
                    'Immersive Framer Motion interactions: interactive Mac scroll parallax on Hero section, micro-interactions, and 100% responsive layout',
                    'Asynchronous slide-out cart drawer with live subtotal updates and integrated checkout pipeline (Mercado Pago)',
                    'Full-featured Admin Dashboard: sales and revenue metrics, product inventory management (CRUD), and customer purchase order status',
                    'Node.js, Express & MongoDB RESTful API: Cloudinary media uploads via Multer, transactional Nodemailer emails, and paginated queries',
                    'Secure JWT authentication with Bcrypt encryption, role-based access control (Admin/User), verified user reviews, and wishlist'
                ]
            },
            mym: {
                desc: 'Event decoration landing page with pricing and contact.',
                longDesc: 'Commercial high-conversion landing page designed for an event decoration and party staging brand. Features a curated gallery of previous setups, transparent service tiers, client testimonials, and automated direct WhatsApp inquiry buttons.',
                features: [
                    'Fluid animations and interactive galleries built with Framer Motion',
                    'Direct booking and consultation channel via WhatsApp integration',
                    'Optimized Core Web Vitals for instant loading and mobile performance',
                    'Modern responsive design matching client branding guidelines'
                ]
            },
            levels: {
                desc: 'High-performance gym website with plans and contact.',
                longDesc: 'Modern, high-energy gym web portal showcasing workout programs, fitness facilities, personalized membership plans, and trainer profiles. Built with mobile-first approach and lightning-fast responsiveness.',
                features: [
                    'Interactive membership tier pricing selector with benefit comparison',
                    'Trainer rosters, workout schedules, and class routines',
                    'Direct registration contact form and geolocation gym locator',
                    'Tailwind CSS & Framer Motion performance optimization'
                ]
            },
            cesar: {
                desc: 'Stylist landing page with WhatsApp booking.',
                longDesc: 'Chic, premium portfolio and appointment landing page for professional hair stylist Cesar Aparicio. Includes visual lookbook, service catalogue with pricing, customer reviews, and single-click appointment scheduling.',
                features: [
                    'Visual hairstyle lookbook with responsive before/after presentation',
                    'One-tap appointment reservation linked to WhatsApp Business',
                    'Intuitive navigation built with React Router',
                    'Sleek dark/light aesthetics with fast asset delivery'
                ]
            },
            bga: {
                desc: 'Professional site for commercial permits consulting.',
                longDesc: 'Corporate consulting website for BGA Habilitaciones, experts in commercial licensing, fire safety permits, and architectural inspections for business establishments.',
                features: [
                    'Step-by-step commercial permit advisory guides and requirement lists',
                    'Direct consultation request intake form and contact channel',
                    'SEO architecture targeting local businesses and commercial real estate',
                    'Clean institutional aesthetic establishing high credibility'
                ]
            },
            krauft: {
                desc: 'Corporate website for real estate marketing.',
                longDesc: 'Corporate agency platform for Krauft Real Estate Marketing, highlighting architectural visualization, real estate branding campaigns, property marketing strategies, and client case studies.',
                features: [
                    'Interactive project portfolio showcase highlighting real estate developments',
                    'Service breakdown spanning branding, 3D renders, and ad campaigns',
                    'Fast, responsive modern layout designed with Tailwind CSS and Framer',
                    'Clear call-to-action sections driving qualified client inquiries'
                ]
            },
            servicios: {
                desc: 'High-conversion web services platform with interactive mockups, 3D holographic preloader & instant quote calculator.',
                longDesc: 'Official commercial platform for Lautaro Leal Del Prete web development services. Features an interactive 3D CSS gyroscope preloader, asymmetric Bento Grid layout, 6 live interactive service mockups with real-time UI state, coverflow 3D showcase, and a 3-step interactive quote calculator with direct WhatsApp brief generation and automated EmailJS delivery. Engineered with high-performance code splitting, achieving an ultra-lightweight initial JS bundle of only 58.9 kB and hardware GPU acceleration on mobile Safari.',
                features: [
                    'Interactive 3-step project quote calculator with live brief preview and dual dispatch (WhatsApp API & EmailJS)',
                    '6 functional interactive mockups demonstrating real client solutions (Websites, Management Systems, E-Commerce, Digital Invites, Performance Audits)',
                    '3D Holographic Gyroscope Preloader built with pure native CSS 3D transforms and sub-second fade transition',
                    'High-performance architecture: 80% initial JS reduction (58.9 kB bundle), requestIdleCallback lazy loading, and WebKit GPU optimization'
                ]
            }
        },
        contact: {
            title: "Let's build something together!",
            subtitle: "I'm currently open for new opportunities. Whether you have a question, a project idea, or just want to say hi, feel free to drop a message.",
            servicesBannerBadge: 'Commercial Platform',
            servicesBannerTitle: 'Looking to quote a website or system for your business?',
            servicesBannerDesc: 'Visit my official Services Platform with live interactive mockups and an instant 3-step quote calculator.',
            servicesBannerBtn: 'Instant Quote Calculator',
            whatsappCard: 'Direct chat & quick inquiry',
            servicesCardTitle: 'Web Services Platform',
            servicesCardSubtitle: 'Catalogue & instant quote calculator',
            githubCard: 'Check out my repositories',
            linkedinCard: "Let's connect professionally",
            formTitle: 'Send a Message',
            namePlaceholder: 'Your name',
            emailPlaceholder: 'Your email',
            messagePlaceholder: 'Your message',
            btnSending: 'Sending...',
            btnSend: 'Send Message',
            alertSuccessTitle: 'Message Sent!',
            alertSuccessText: "I'll reply as soon as possible.",
            alertErrorTitle: 'Oops...',
            alertErrorText: 'There was a problem sending the message.',
            copyEmail: 'Copy Email',
            emailCopied: 'Email Copied!'
        }
    },
    es: {
        nav: {
            home: 'Inicio',
            about: 'Sobre mí',
            skills: 'Habilidades',
            projects: 'Proyectos',
            contact: 'Contacto'
        },
        home: {
            greeting: 'Hola, mi nombre es',
            name: 'Lautaro Leal Del Prete',
            titles: [
                'Desarrollador Full Stack',
                'Solucionador Creativo de Problemas',
                'Construyendo Productos Escalables'
            ],
            btnWork: 'Ver Trabajos',
            btnContact: 'Contáctame',
            btnServices: 'Servicios Web'
        },
        about: {
            title: 'Sobre mí',
            text1: 'Hola, soy Lautaro Leal Del Prete.',
            text2: 'Soy graduado en Desarrollo y Calidad de Software con experiencia construyendo aplicaciones web Full Stack.',
            text3: 'Me enfoco en desarrollar productos escalables, implementar interfaces adaptativas y aplicar las mejores prácticas de desarrollo y metodologías ágiles.',
            text4: 'Me motiva resolver problemas, integrar APIs REST y optimizar la experiencia del usuario. Siempre listo para asumir nuevos desafíos para mi crecimiento personal y profesional.'
        },
        qualifications: {
            educationTitle: 'Educación',
            educationList: [
                {
                    institution: 'UNSTA — Universidad del Norte Santo Tomás de Aquino',
                    type: 'Tecnicatura Universitaria',
                    degree: 'Desarrollo y Calidad de Software',
                    period: '2024 - 2026'
                },
                {
                    institution: 'Instituto Nexus — SM de Tucumán',
                    type: 'Formación en Idioma Inglés',
                    degree: 'Inglés Comunicativo y Exámenes Internacionales',
                    period: '2025 - Presente'
                }
            ],
            certificationsTitle: 'Mis Certificaciones'
        },
        cv: {
            spanish: 'Descargar CV - Versión Español',
            english: 'Descargar CV - Versión Inglés'
        },
        skills: {
            title: 'Conocimientos Técnicos',
            subtitle: 'Tecnologías y herramientas que utilizo para construir soluciones escalables y de alta calidad.',
            softTitle: 'Competencias & Habilidades Blandas',
            softSkills: {
                ai: 'IA Generativa',
                comm: 'Comunicación',
                team: 'Trabajo en equipo',
                problem: 'Resolución de problemas',
                adapt: 'Adaptabilidad',
                innov: 'Innovación'
            }
        },
        projects: {
            title: 'Mis Proyectos',
            subtitle: 'Explora mis trabajos más recientes en desarrollo Full Stack y Landing Pages.',
            featuredBadge: 'Portafolio Destacado',
            categories: {
                all: 'Todos',
                fullstack: 'Full Stack',
                landing: 'Landing'
            },
            detail: {
                viewDetails: 'Ver Detalles',
                exploreInteractive: 'Probar Modo Interactivo',
                visualSnapshot: 'Captura HD',
                interactiveNotice: 'Puedes interactuar, hacer clic y probar la aplicación aquí mismo sin salir del portafolio.',
                featuresTitle: 'Características Principales',
                techTitle: 'Stack Tecnológico',
                visitSite: 'Visitar Sitio Web',
                viewCode: 'Código Fuente',
                deviceDesktop: 'Escritorio',
                deviceTablet: 'Tablet',
                deviceMobile: 'Móvil',
                close: 'Cerrar',
                reload: 'Recargar',
                protectedBadge: 'Servidor Seguro en Producción',
                protectedDesc: 'Por políticas de seguridad (X-Frame-Options) del servidor, esta aplicación se ejecuta en su propio entorno seguro.',
                launchLive: 'Lanzar App en Pantalla Completa',
                tryEmbed: 'Intentar carga embebida'
            },
            nyg: {
                desc: 'Plataforma web integral para Club Natación y Gimnasia (Rugby) con fixture, posiciones y panel de administración.',
                longDesc: 'Plataforma web Full Stack desarrollada para el Club Natación y Gimnasia, enfocada en la gestión deportiva integral de la sección de Rugby. Cuenta con una interfaz pública moderna para socios e hinchas (noticias, planteles oficiales, fixture de partidos y un motor de cálculo de posiciones con puntos bonus ofensivos y defensivos) y un Panel de Administración privado y seguro con autenticación JWT mediante cookies httpOnly para gestionar torneos, partidos y contenidos del club.',
                features: [
                    'Portal público interactivo con fixture, resultados en vivo y cálculo automático de posiciones con puntos bonus',
                    'Panel de administración privado protegido con JWT (cookies seguras httpOnly y refresh tokens) para torneos y planteles',
                    'Arquitectura Backend MVC construida con Node.js, Express 5, MongoDB Mongoose y optimización en Cloudinary',
                    'Interfaz responsiva mobile-first desarrollada con React 19, Tailwind CSS v4, estado global con Zustand y validación Zod'
                ]
            },
            nutrioliva: {
                desc: 'Plataforma para gestión nutricional, diseño de planes alimenticios y seguimiento diario de pacientes en tiempo real.',
                longDesc: 'Plataforma web Full Stack de salud y nutrición que conecta a profesionales nutricionistas con sus pacientes en un entorno interactivo y colaborativo. Los nutricionistas gestionan expedientes clínicos, diseñan planes personalizados con cálculo dinámico de macronutrientes y controlan versiones de planes. Los pacientes acceden a su plan vigente, registran comidas diarias y actividad física, y visualizan su balance calórico en una línea de tiempo interactiva.',
                features: [
                    'Constructor interactivo de planes de alimentación con cálculo dinámico de calorías y distribución de macronutrientes',
                    'Portal del paciente con diario alimentario, registro de actividad física y calendario de progreso en timeline',
                    'Arquitectura robusta sobre Supabase con base de datos relacional PostgreSQL y políticas Row Level Security (RLS)',
                    'Autenticación multi-rol segura (Nutricionista, Paciente, Superadmin) y Edge Functions en Deno para lógica de negocio'
                ]
            },
            confiaCar: {
                desc: 'Plataforma integral de alquiler de vehículos con pagos Mercado Pago, Google OAuth, chat en vivo por WebSockets y panel administrativo.',
                longDesc: 'Plataforma web Full Stack de alquiler de vehículos de alta fidelidad visual desarrollada para Confia-CAR con diseño Dark Mode moderno. Ofrece un catálogo interactivo con filtros por categoría, reserva con selector inteligente de fechas y normalización UTC, pasarela de pagos en vivo integrada con la SDK oficial de Mercado Pago y webhooks automáticos, autenticación dual (Google OAuth 2.0 y JWT local encriptado con Bcryptjs), salas de mensajería en tiempo real con Socket.io por cada reserva (booking:id) y un Panel de Administración completo (RBAC) para el control de flota, métricas de ingresos y usuarios.',
                features: [
                    'Integración de pagos en vivo con Mercado Pago SDK: generación de checkout en ARS y procesamiento automático de Webhooks',
                    'Chat bidireccional en tiempo real con Socket.io por sala de reserva (booking:id) con historial persistente en MongoDB',
                    'Autenticación dual con Google OAuth 2.0 y credenciales locales encriptadas con Bcryptjs + JWT',
                    'Panel de control administrativo (RBAC): métricas de ingresos, gestión integral de flota (CRUD), reservas y chat con clientes',
                    'Selector inteligente de fechas con bloqueo dinámico de días ocupados y normalización horaria UTC (12:00:00)',
                    'Global Loader y verificación de disponibilidad de servidor en segundo plano con reintentos automáticos'
                ]
            },
            fleeswap: {
                desc: 'Marketplace Full Stack para trueques y compras con confirmación bilateral, chat Socket.IO, notificaciones y reputación.',
                longDesc: 'Plataforma web Full Stack orientada al intercambio colaborativo de objetos, trueques directos y compras entre usuarios desarrollada bajo arquitectura en capas con Feature Slices. Cuenta con un flujo transaccional completo con panel unificado de "Mis Intercambios", modal de propuestas de 3 pasos (con ofrecimiento de objeto propio y dinero complementario) y confirmación bilateral. Integra chat en tiempo real contextualizado por intercambio activo con Socket.IO, centro de notificaciones en vivo con navegación por hashes, búsquedas activas con matching automático de keywords, sistema de calificación y reputación visible, autenticación segura con JWT (token en memoria en Zustand y refresh en cookie httpOnly) y panel administrativo para usuarios, publicaciones y reportes.',
                features: [
                    'Flujo transaccional integral de intercambios y compras: bandeja unificada de solicitudes, confirmación bilateral y actualización en segundo plano',
                    'Chat en tiempo real contextualizado por intercambio activo con Socket.IO, control de salas privadas y paso automático a solo lectura',
                    'Búsquedas activas con algoritmo de matching automático de keywords y centro de notificaciones persistente con entrega en tiempo real',
                    'Sistema de reputación comunitaria con ventana de calificación post-operación de 7 días, promedio visible y prevención de doble voto',
                    'Seguridad robusta contra XSS: tokens de acceso en memoria con Zustand 5, renovación transparente por cookie httpOnly y validaciones estrictas',
                    'Arquitectura limpia en capas con React 19, Vite, Tailwind CSS v4, Express 5, MongoDB Mongoose, Cloudinary y panel de moderación'
                ]
            },
            novaSetup: {
                desc: 'E-commerce Full Stack para setups y hardware premium con simulador "Arma tu PC", carrito lateral y panel admin.',
                longDesc: 'Plataforma de comercio electrónico Full Stack desarrollada para Nova SetUp, tienda especializada en equipamiento de alta gama para setups profesionales y gamers. Presenta una interfaz inmersiva con estética Dark Mode y animaciones de scroll con efecto Parallax en Framer Motion. Destaca por su simulador interactivo "Arma tu PC" con validación de compatibilidad de componentes en tiempo real, un carrito lateral asíncrono con Drawer, flujo de checkout integrado, autenticación JWT con recuperación de contraseña por email (Nodemailer), carga de imágenes a la nube con Cloudinary + Multer, y un Panel de Administración con métricas de ventas y control de inventario.',
                features: [
                    'Simulador interactivo "Arma tu PC": asistente guiado paso a paso con validación de compatibilidad de hardware y presupuesto en tiempo real',
                    'Experiencia visual inmersiva con Framer Motion: Hero con Parallax interactivo de Mac, transiciones fluidas y diseño responsive',
                    'Carrito de compras lateral asíncrono (Drawer) con cálculo de totales en tiempo real y flujo de checkout con Mercado Pago',
                    'Panel de Administración integral: métricas de facturación, gestión CRUD de catálogo con stock y control de órdenes de compra',
                    'Backend RESTful con Node.js, Express y MongoDB: subida multimedia a Cloudinary vía Multer y consultas optimizadas con paginación',
                    'Autenticación segura JWT con encriptación Bcryptjs, gestión de roles (Admin/User), lista de favoritos y reviews verificadas'
                ]
            },
            mym: {
                desc: 'Landing page para decoración de eventos con precios y contacto.',
                longDesc: 'Landing page comercial de alta conversión desarrollada para empresa de ambientación y decoración de eventos. Cuenta con galería interactiva de montajes realizados, catálogo de paquetes de servicios, testimonios y enlace directo a consultas por WhatsApp.',
                features: [
                    'Animaciones fluidas y galería visual interactiva con Framer Motion',
                    'Canal de reserva y cotización inmediata con enlace a WhatsApp',
                    'Optimización de Core Web Vitals para máxima velocidad y SEO local',
                    'Diseño 100% responsivo alineado a la identidad visual de la marca'
                ]
            },
            levels: {
                desc: 'Sitio web de alto rendimiento para gimnasio con planes y contacto.',
                longDesc: 'Sitio web moderno y dinámico para gimnasio de alto rendimiento. Muestra programas de entrenamiento, instalaciones, planes de membresía personalizados, perfiles de entrenadores y ubicación geográfica interactiva.',
                features: [
                    'Selector interactivo de planes y membresías con comparativa de beneficios',
                    'Horarios semanales de clases y presentación de entrenadores',
                    'Canal de inscripción rápida y consulta de rutinas',
                    'Diseño mobile-first ultrarrápido con Tailwind CSS y Framer Motion'
                ]
            },
            cesar: {
                desc: 'Landing page para estilista con reservas vía WhatsApp.',
                longDesc: 'Landing page premium y portafolio estilístico para el salón de belleza y estilista profesional Cesar Aparicio. Presenta lookbook de cortes y tratamientos, lista detallada de servicios con precios y agenda directa de turnos.',
                features: [
                    'Lookbook visual de cortes y peinados con visualización adaptativa',
                    'Sistema de reserva de turnos en un clic vinculado a WhatsApp Business',
                    'Navegación fluida desarrollada con React Router y Tailwind CSS',
                    'Estética elegante y carga instantánea en dispositivos móviles'
                ]
            },
            bga: {
                desc: 'Sitio profesional para consultoría de habilitaciones comerciales.',
                longDesc: 'Sitio web corporativo para la consultora BGA Habilitaciones, especialistas en trámites de habilitaciones comerciales, planos de evacuación y asesoría técnica para comercios e industrias.',
                features: [
                    'Guía paso a paso sobre requisitos para habilitaciones municipales',
                    'Formulario de solicitud de presupuesto y asesoramiento técnico',
                    'Arquitectura SEO estructurada para comercios y pymes locales',
                    'Diseño sobrio, profesional y de alta confiabilidad corporativa'
                ]
            },
            krauft: {
                desc: 'Sitio web corporativo para marketing inmobiliario.',
                longDesc: 'Plataforma web de agencia para Krauft Marketing Inmobiliario, orientada a la comercialización de desarrollos inmobiliarios, visualización arquitectónica 3D, branding y campañas publicitarias de alto impacto.',
                features: [
                    'Catálogo interactivo de desarrollos y campañas de marketing exitosas',
                    'Desglose integral de servicios: renders 3D, branding y captación digital',
                    'Diseño moderno de alto contraste con animaciones suaves',
                    'Llamados a la acción estratégicos para captación de clientes e inversores'
                ]
            },
            servicios: {
                desc: 'Plataforma comercial de servicios web de alta conversión con mockups interactivos, preloader 3D y cotizador en tiempo real.',
                longDesc: 'Plataforma comercial oficial de servicios de desarrollo web de Lautaro Leal Del Prete. Incluye un preloader con giroscopio 3D holográfico en CSS puro, catálogo en Bento Grid asimétrico, 6 mockups interactivos con estado en tiempo real, carrusel coverflow 3D y cotizador interactivo en 3 pasos con generación automática de brief para WhatsApp y despacho por EmailJS. Diseñada bajo una arquitectura crítica de alto rendimiento, logrando un bundle inicial de solo 58.9 kB de JavaScript y aceleración por GPU para Safari en iOS.',
                features: [
                    'Cotizador interactivo en 3 pasos con previsualización en vivo y despacho dual (WhatsApp directo y EmailJS)',
                    '6 mockups interactivos funcionales con casos reales (Páginas Web, Sistemas de Gestión, Tiendas Online, Invitaciones Digitales, Auditoría Técnica)',
                    'Preloader 3D holográfico con tres anillos orbitales en CSS 3D nativo y transición suave de salida',
                    'Arquitectura ultraligera con 80% de reducción de bundle (58.9 kB JS), carga bajo demanda con requestIdleCallback y optimización GPU para móviles'
                ]
            }
        },
        contact: {
            title: '¡Construyamos algo juntos!',
            subtitle: 'Actualmente estoy abierto a nuevas oportunidades. Ya sea que tengas una pregunta, una idea de proyecto o simplemente quieras saludar, no dudes en enviar un mensaje.',
            servicesBannerBadge: 'Plataforma Comercial',
            servicesBannerTitle: '¿Buscás cotizar una web o sistema para tu negocio?',
            servicesBannerDesc: 'Conocé mi plataforma oficial de servicios con mockups interactivos y cotizador en vivo en 3 simples pasos.',
            servicesBannerBtn: 'Abrir Cotizador en Vivo',
            whatsappCard: 'Chat directo y consultas rápidas',
            servicesCardTitle: 'Plataforma de Servicios Web',
            servicesCardSubtitle: 'Catálogo oficial y cotizador en vivo',
            githubCard: 'Explora mis repositorios',
            linkedinCard: 'Conectemos profesionalmente',
            formTitle: 'Enviar un Mensaje',
            namePlaceholder: 'Tu nombre',
            emailPlaceholder: 'Tu correo electrónico',
            messagePlaceholder: 'Tu mensaje',
            btnSending: 'Enviando...',
            btnSend: 'Enviar Mensaje',
            alertSuccessTitle: '¡Mensaje Enviado!',
            alertSuccessText: 'Te responderé lo antes posible.',
            alertErrorTitle: 'Ups...',
            alertErrorText: 'Hubo un problema al enviar el mensaje.',
            copyEmail: 'Copiar Correo',
            emailCopied: '¡Correo Copiado!'
        }
    }
}
