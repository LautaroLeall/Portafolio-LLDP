/**
 * pricingData.js — Configuración Dinámica de Requerimientos y Opciones por Servicio
 * Proporciona preguntas, tiers de escala, selects específicos y módulos adicionales
 * adaptados a la realidad práctica de cada una de las 6 especialidades de software.
 * Opciones optimizadas y concisas para visualización impecable en dispositivos móviles.
 */

export const getServicePricingConfig = (serviceId = 'paginas-web', lang = 'es') => {
  const isEs = lang === 'es';

  switch (serviceId) {
    /* 01. PÁGINAS WEB */
    case 'paginas-web':
      return {
        tierQuestion: isEs ? 'Tipo de Desarrollo Web:' : 'Website Structure & Scope:',
        tiers: {
          landing: {
            id: 'landing',
            label: isEs ? 'Landing Page (1 Página)' : 'Single-Page Landing',
            desc: isEs
              ? 'Foco en 1 producto o servicio, con llamado directo a WhatsApp.'
              : 'Focused on one product, offer, or service with direct conversion.'
          },
          multi: {
            id: 'multi',
            label: isEs ? 'Sitio Web Completo (Multi-página)' : 'Full Multi-Page Website',
            desc: isEs
              ? 'Inicio, Nosotros, Servicios, Galería, FAQ y Contacto.'
              : 'Home, About Us, Detailed Services, Portfolio, FAQ, and Contact.'
          },
          portal: {
            id: 'portal',
            label: isEs ? 'Portal Corporativo / Catálogo' : 'Corporate / Catalog Showcase',
            desc: isEs
              ? 'Estructura empresarial con fichas técnicas y catálogo.'
              : 'Enterprise showcase with product sheets, specs, and team areas.'
          }
        },
        selectQuestion: isEs ? '¿Contás con diseño o identidad de marca?' : 'Do you have existing branding or designs?',
        selectOptions: [
          {
            id: 'from_scratch',
            label: isEs ? 'Diseño e identidad desde cero' : 'Branding from scratch'
          },
          {
            id: 'has_branding',
            label: isEs ? 'Tengo logo y colores definidos' : 'Have logo and brand colors'
          },
          {
            id: 'has_figma',
            label: isEs ? 'Tengo diseño en Figma / PDF' : 'Have Figma / PDF designs'
          }
        ],
        addonsQuestion: isEs ? 'Funcionalidades & Módulos opcionales:' : 'Optional Capabilities & Features:',
        addons: [
          {
            id: 'seo_google',
            label: isEs ? 'Optimización SEO en Google' : 'Google Search SEO'
          },
          {
            id: 'wp_messages',
            label: isEs ? 'Botones WhatsApp con mensajes pre-cargados' : 'WhatsApp CTAs with pre-filled inquiries'
          },
          {
            id: 'multilang_web',
            label: isEs ? 'Soporte Bilingüe (Español / Inglés)' : 'Bilingual Support (Spanish / English)'
          },
          {
            id: 'blog_news',
            label: isEs ? 'Sección de Novedades / Blog CMS' : 'News / Blog CMS Section'
          },
          {
            id: 'form_intake',
            label: isEs ? 'Formulario de contacto anti-spam' : 'Validated contact form with anti-spam'
          },
          {
            id: 'analytics_pixel',
            label: isEs ? 'Google Analytics 4 & Pixel de Meta' : 'Google Analytics 4 & Meta Pixel'
          }
        ]
      };

    /* 02. SISTEMAS DE GESTIÓN */
    case 'sistemas-gestion':
    case 'sistemas-de-gestion':
      return {
        tierQuestion: isEs ? 'Alcance del Sistema de Gestión:' : 'System Scope & Capacity:',
        tiers: {
          core: {
            id: 'core',
            label: isEs ? 'Gestión Esencial de Negocio' : 'Core Business Management',
            desc: isEs
              ? 'Panel simple enfocado en 1 flujo clave: turnos, ventas o stock.'
              : 'Streamlined dashboard focused on one core flow: booking, sales, or stock.'
          },
          advanced: {
            id: 'advanced',
            label: isEs ? 'Sistema Integral para Negocio' : 'All-in-One Business Software',
            desc: isEs
              ? 'Turnos + Stock + Caja diaria + Clientes + Historial.'
              : 'Bookings + Inventory + Cash register + Customers + Operations history.'
          },
          enterprise: {
            id: 'enterprise',
            label: isEs ? 'Plataforma Multi-Sucursal' : 'Multi-Branch Enterprise Suite',
            desc: isEs
              ? 'Gestión centralizada de varias sucursales, roles y reportes.'
              : 'Multi-branch control, employee permissions, and advanced reporting.'
          }
        },
        selectQuestion: isEs ? 'Rubro o Tipo de Operación de tu Negocio:' : 'Industry & Business Operation Model:',
        selectOptions: [
          {
            id: 'services_salon_health',
            label: isEs ? 'Salud, Estética y Turnos' : 'Clinics, Salons & Booking'
          },
          {
            id: 'retail_food_shop',
            label: isEs ? 'Comercio, Gastronomía y Stock' : 'Retail, Food & Stock'
          },
          {
            id: 'corporate_admin',
            label: isEs ? 'Empresa y Procesos Internos' : 'Corporate & Internal Ops'
          }
        ],
        addonsQuestion: isEs ? 'Módulos Operativos requeridos:' : 'Required Operational Modules:',
        addons: [
          {
            id: 'turnos_online',
            label: isEs ? 'Turnero Online 24/7 (clientes reservan solos)' : '24/7 Online Client Self-Scheduling'
          },
          {
            id: 'stock_alerts',
            label: isEs ? 'Alertas de Stock mínimo y reposición' : 'Low-stock warnings & supplier tracking'
          },
          {
            id: 'caja_balances',
            label: isEs ? 'Cierre de caja y balance diario' : 'Daily POS cash register & revenue balance'
          },
          {
            id: 'user_roles',
            label: isEs ? 'Roles de usuario (Admin, Empleado, Auditor)' : 'Granular user roles & access permissions'
          },
          {
            id: 'export_reports',
            label: isEs ? 'Exportación a Excel / PDF descargable' : 'Downloadable Excel & PDF reports'
          },
          {
            id: 'cloud_backups',
            label: isEs ? 'Copias de seguridad diarias en la nube' : 'Automated daily cloud backups'
          }
        ]
      };

    /* 03. TIENDA ONLINE */
    case 'tienda-online':
      return {
        tierQuestion: isEs ? 'Tamaño y Escala de tu Catálogo:' : 'Catalog Size & Inventory Scale:',
        tiers: {
          boutique: {
            id: 'boutique',
            label: isEs ? 'Tienda Boutique (Hasta 50 productos)' : 'Boutique Store (Up to 50 products)',
            desc: isEs
              ? 'Catálogo ágil para marcas con pocas referencias y venta directa.'
              : 'Curated catalog for direct-to-consumer boutique brands.'
          },
          medium: {
            id: 'medium',
            label: isEs ? 'Tienda Completa (50 a 500 productos)' : 'Full Scale Store (50 to 500 items)',
            desc: isEs
              ? 'Categorías, filtros avanzados, talles/colores y stock en tiempo real.'
              : 'Categories, smart filters, size/color variants, and live inventory.'
          },
          enterprise: {
            id: 'enterprise',
            label: isEs ? 'E-Commerce Masivo (+500 productos)' : 'Enterprise E-Commerce (500+ items)',
            desc: isEs
              ? 'Carga masiva en Excel, múltiples depósitos y alto tráfico.'
              : 'Bulk spreadsheet imports, multiple warehouses, and high volume.'
          }
        },
        selectQuestion: isEs ? 'Pasarela de Cobro Principal Deseada:' : 'Preferred Payment Processing Method:',
        selectOptions: [
          {
            id: 'mp_argentina',
            label: isEs ? 'Mercado Pago (Tarjetas y Cuotas)' : 'Mercado Pago (Cards & Credit)'
          },
          {
            id: 'stripe_global',
            label: isEs ? 'Stripe (Cobros en USD / EUR)' : 'Stripe (Global USD / EUR)'
          },
          {
            id: 'hybrid_gateway',
            label: isEs ? 'Cobro Dual (Nacional + Exterior)' : 'Dual Gateway (Local + Global)'
          },
          {
            id: 'manual_transfer',
            label: isEs ? 'Transferencia Bancaria directa' : 'Direct Bank Transfer'
          }
        ],
        addonsQuestion: isEs ? 'Capacidades de Venta y Logística:' : 'E-Commerce & Logistics Features:',
        addons: [
          {
            id: 'wp_alerts',
            label: isEs ? 'Alerta inmediata de compra a WhatsApp' : 'Instant WhatsApp purchase alerts'
          },
          {
            id: 'variants_matrix',
            label: isEs ? 'Talles, colores y stock por variante' : 'Size, color & variant inventory'
          },
          {
            id: 'coupons_discounts',
            label: isEs ? 'Cupones de descuento y promociones' : 'Discount coupon & flash sale engine'
          },
          {
            id: 'shipping_calc',
            label: isEs ? 'Calculador de envíos (Correo / Encomienda)' : 'Automated shipping rates calculation'
          },
          {
            id: 'product_reviews',
            label: isEs ? 'Reseñas y calificaciones de clientes' : 'Customer reviews & star ratings'
          },
          {
            id: 'admin_dashboard',
            label: isEs ? 'Panel autoadministrable desde celular' : 'Mobile-friendly store admin dashboard'
          }
        ]
      };

    /* 04. INVITACIONES DIGITALES */
    case 'invitaciones-digitales':
      return {
        tierQuestion: isEs ? 'Tipo de Celebración o Evento:' : 'Celebration or Event Category:',
        tiers: {
          wedding: {
            id: 'wedding',
            label: isEs ? 'Boda / Casamiento' : 'Wedding Celebration',
            desc: isEs
              ? 'Diseño romántico de alta gama con itinerario, padrinos y dress code.'
              : 'Romantic high-end design with timeline, party, and dress code.'
          },
          fifteen: {
            id: 'fifteen',
            label: isEs ? '15 Años / 18 Años' : '15th Birthday / Sweet 16',
            desc: isEs
              ? 'Estética juvenil moderna, playlist de música y momentos destacados.'
              : 'Modern energetic aesthetics, music playlist, and countdown.'
          },
          special: {
            id: 'special',
            label: isEs ? 'Cumpleaños / Bautismo / Fiesta' : 'Birthday / Baptism / Party',
            desc: isEs
              ? 'Tarjeta ágil, elegante y fácil de compartir por WhatsApp.'
              : 'Elegant card designed for frictionless WhatsApp sharing.'
          }
        },
        selectQuestion: isEs ? 'Formato de Entrega y Envío Principal:' : 'Primary Delivery Format:',
        selectOptions: [
          {
            id: 'wp_link',
            label: isEs ? 'Link web para enviar por WhatsApp' : 'Web link for WhatsApp'
          },
          {
            id: 'qr_print',
            label: isEs ? 'Código QR para imprimir' : 'Printable QR Code'
          },
          {
            id: 'dual_format',
            label: isEs ? 'Ambos (Link web + QR impreso)' : 'Both (Web link + Print QR)'
          }
        ],
        addonsQuestion: isEs ? 'Detalles Interactivos de la Tarjeta:' : 'Interactive Invitation Features:',
        addons: [
          {
            id: 'bg_music',
            label: isEs ? 'Música de fondo a elección con botón play' : 'Background music soundtrack with play button'
          },
          {
            id: 'live_countdown',
            label: isEs ? 'Cuenta regresiva en vivo hasta el evento' : 'Live countdown clock to the event day'
          },
          {
            id: 'gps_navigation',
            label: isEs ? 'Botón GPS a Google Maps y Waze' : '1-click GPS navigation (Maps & Waze)'
          },
          {
            id: 'rsvp_intake',
            label: isEs ? 'Confirmación RSVP (asistencia / menú)' : 'RSVP check-in form with dietary menu'
          },
          {
            id: 'cbu_copy',
            label: isEs ? 'Botón para copiar Alias / CBU para regalos' : '1-click copy bank Alias / CBU for gifts'
          },
          {
            id: 'photo_carousel',
            label: isEs ? 'Galería de fotos o video del agasajado' : 'Photo gallery or highlight video reel'
          }
        ]
      };

    /* 05. MEJORA DE TU WEB ACTUAL */
    case 'mejora-web':
    case 'mejora-de-tu-web':
      return {
        tierQuestion: isEs ? 'Objetivo Principal de la Optimización:' : 'Primary Optimization Goal:',
        tiers: {
          speed: {
            id: 'speed',
            label: isEs ? 'Velocidad y Carga Rápida' : 'Speed & Loading Boost',
            desc: isEs
              ? 'Para sitios que tardan más de 3 segundos o pierden visitas por lentitud.'
              : 'For websites taking >3s to load or losing visitors to lag.'
          },
          mobile: {
            id: 'mobile',
            label: isEs ? 'Rediseño Responsive Moderno' : 'Mobile-First UI Redesign',
            desc: isEs
              ? 'Para webs desactualizadas que se cortan en celulares.'
              : 'For outdated sites that look broken or unreadable on phones.'
          },
          overhaul: {
            id: 'overhaul',
            label: isEs ? 'Transformación Total (Velocidad + UI)' : 'Full Overhaul (Speed + UI)',
            desc: isEs
              ? 'Renovación completa de tecnología manteniendo tu dominio actual.'
              : 'Complete tech upgrade while preserving your existing domain.'
          }
        },
        selectQuestion: isEs ? '¿En qué plataforma está construido tu sitio?' : 'What platform is your current website on?',
        selectOptions: [
          {
            id: 'wp_woo',
            label: isEs ? 'WordPress / WooCommerce' : 'WordPress / WooCommerce'
          },
          {
            id: 'custom_code',
            label: isEs ? 'Desarrollo a medida (Código)' : 'Custom Code (React / HTML)'
          },
          {
            id: 'wix_shopify',
            label: isEs ? 'Wix / Tiendanube / Shopify' : 'Wix / Shopify / Tiendanube'
          },
          {
            id: 'unknown_cms',
            label: isEs ? 'Revisar plataforma actual' : 'Need technical review'
          }
        ],
        addonsQuestion: isEs ? 'Puntos Críticos a Resolver:' : 'Critical Items to Address:',
        addons: [
          {
            id: 'cwv_under_1s',
            label: isEs ? 'Carga récord < 1 segundo (Core Web Vitals)' : 'Sub-1s loading (Google Core Web Vitals)'
          },
          {
            id: 'ssl_lock',
            label: isEs ? 'Certificado SSL HTTPS (Candado seguro)' : 'SSL HTTPS Certificate setup & padlock'
          },
          {
            id: 'mobile_overflow_fix',
            label: isEs ? 'Adaptación a celulares (Sin desbordes)' : 'Mobile layout fix (Zero overflow)'
          },
          {
            id: 'seo_broken_links',
            label: isEs ? 'Corrección de SEO y enlaces 404 caídos' : 'SEO cleanup & broken 404 links repair'
          },
          {
            id: 'purge_plugins',
            label: isEs ? 'Limpieza de plugins y scripts pesados' : 'Purge heavy plugins & slow scripts'
          },
          {
            id: 'whatsapp_floating',
            label: isEs ? 'Botón flotante de WhatsApp directo' : 'Add modern floating WhatsApp button'
          }
        ]
      };

    /* 06. REVISIÓN DE PRESUPUESTO */
    case 'revision-presupuesto':
      return {
        tierQuestion: isEs ? 'Tipo de Presupuesto que te Cotizaron:' : 'Type of Proposal You Received:',
        tiers: {
          web: {
            id: 'web',
            label: isEs ? 'Presupuesto de Página Web' : 'Website Proposal',
            desc: isEs
              ? 'Landing page o sitio institucional de otra agencia o programador.'
              : 'Website or landing proposal from another agency or freelancer.'
          },
          software: {
            id: 'software',
            label: isEs ? 'Presupuesto de Software o Sistema' : 'Custom Software / App Quote',
            desc: isEs
              ? 'Sistema de gestión, panel de control o aplicación web.'
              : 'Management system, custom dashboard, or app quote.'
          },
          ecommerce: {
            id: 'ecommerce',
            label: isEs ? 'Presupuesto de Tienda Online' : 'E-Commerce Proposal',
            desc: isEs
              ? 'Tienda virtual con catálogo o pasarela de pagos.'
              : 'Online store proposal with catalog or payment gateway.'
          }
        },
        selectQuestion: isEs ? '¿Qué no te cierra de ese presupuesto?' : 'What is your main concern regarding that quote?',
        selectOptions: [
          {
            id: 'price_concern',
            label: isEs ? 'Precio excesivo o fuera de mercado' : 'Price feels too expensive'
          },
          {
            id: 'lockin_concern',
            label: isEs ? 'Abonos mensuales / No ser dueño' : 'Monthly lock-in / No code rights'
          },
          {
            id: 'tech_clarity',
            label: isEs ? 'Dudas con la tecnología o alcance' : 'Unclear tech or missing scope'
          },
          {
            id: 'missing_features',
            label: isEs ? 'Verificar que no falte nada clave' : 'Verify missing key features'
          }
        ],
        addonsQuestion: isEs ? 'Aspectos que querés que verifiquemos (Gratis):' : 'Key Items to Verify (Free):',
        addons: [
          {
            id: 'detect_overpricing',
            label: isEs ? 'Detección de sobreprecios en hosting y funciones' : 'Detection of overpriced hosting & features'
          },
          {
            id: 'verify_code_ownership',
            label: isEs ? 'Garantía de código 100% de tu propiedad' : 'Guarantee of 100% source code ownership'
          },
          {
            id: 'recommend_modern_stack',
            label: isEs ? 'Alternativa técnica más conveniente' : 'Cost-effective tech stack alternative'
          },
          {
            id: 'audit_hidden_costs',
            label: isEs ? 'Análisis de costos ocultos futuros' : 'Analysis of future hidden maintenance fees'
          },
          {
            id: 'free_direct_consult',
            label: isEs ? 'Asesoría directa 1 a 1 por WhatsApp (Sin cargo)' : '1-on-1 direct consult via WhatsApp (Free)'
          }
        ]
      };

    default:
      return getServicePricingConfig('paginas-web', lang);
  }
};

/**
 * getPricingConfig — Compatibilidad retroactiva
 */
export const getPricingConfig = (lang = 'es') => {
  return getServicePricingConfig('paginas-web', lang);
};

export const pricingConfig = getPricingConfig('es');
