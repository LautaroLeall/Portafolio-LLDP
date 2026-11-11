import {
  Layout,
  Zap,
  MessageSquare,
  Calendar,
  Package,
  DollarSign,
  ShoppingCart,
  CreditCard,
  BellRing,
  Music,
  MapPin,
  Gift,
  Heart,
  Smartphone,
  ShieldCheck,
  TrendingUp,
  SearchCheck,
  LockOpen,
  Sparkles
} from 'lucide-react';

export function getServiceMockupData(serviceId, isEs = true) {
  switch (serviceId) {
    case 'sistemas-gestion':
    case 'sistemas-de-gestion':
      return {
        activeColor: 'bg-blue-600',
        iconColor: 'bg-indigo-500/20 text-indigo-400',
        benefitColor: 'text-indigo-400',
        badgeText: isEs ? 'A Medida' : 'Custom',
        footerIcon: ShieldCheck,
        footerIconColor: 'text-indigo-400',
        footerLeft: isEs ? 'Acceso multi-usuario' : 'Multi-user role access',
        footerRight: isEs ? 'Base Segura' : 'Secure Database',
        capabilities: [
          {
            id: 'bookings',
            button: isEs ? 'Turnos' : 'Bookings',
            icon: Calendar,
            title: isEs ? 'Turnero Online Automatizado' : 'Automated Scheduling',
            desc: isEs
              ? 'Tus clientes reservan citas online bloqueando automáticamente los horarios ocupados.'
              : 'Clients book appointments online, automatically locking occupied time slots.',
            benefit: isEs ? 'Cero superposiciones y recordatorios' : 'No double bookings & clear reminders'
          },
          {
            id: 'inventory',
            button: isEs ? 'Stock' : 'Stock',
            icon: Package,
            title: isEs ? 'Control de Stock e Inventario' : 'Inventory & Stock Control',
            desc: isEs
              ? 'Registro de entradas, salidas y alertas de reposición desde cualquier celular o PC.'
              : 'Track stock inputs, sales deductions, and low-inventory alerts from any device.',
            benefit: isEs ? 'Visión total de mercadería al instante' : 'Instant visibility on stock shortage'
          },
          {
            id: 'finances',
            button: isEs ? 'Finanzas' : 'Finances',
            icon: DollarSign,
            title: isEs ? 'Balance de Ingresos y Gastos' : 'Revenue & Expense Balance',
            desc: isEs
              ? 'Monitoreo diario de ventas, métodos de cobro y reportes listos para descargar.'
              : 'Daily sales overview, payment methods breakdown, and exportable reports.',
            benefit: isEs ? 'Control administrativo sin planillas' : 'Clean control with zero spreadsheets'
          }
        ]
      };

    case 'tienda-online':
      return {
        activeColor: 'bg-emerald-600',
        iconColor: 'bg-emerald-500/20 text-emerald-400',
        benefitColor: 'text-emerald-400',
        badgeText: '24/7 Activo',
        footerIcon: Sparkles,
        footerIconColor: 'text-emerald-400',
        footerLeft: isEs ? 'Panel autoadministrable' : 'Self-managed admin panel',
        footerRight: isEs ? 'Sin Comisiones' : 'Zero Extra Fees',
        capabilities: [
          {
            id: 'catalog',
            button: isEs ? 'Catálogo' : 'Catalog',
            icon: ShoppingCart,
            title: isEs ? 'Catálogo Dinámico y Carrito' : 'Dynamic Catalog & Cart',
            desc: isEs
              ? 'Productos por categorías, fotos en alta resolución, variantes de talles y carrito ágil.'
              : 'Organized categories, hi-res photos, size/color variants, and intuitive shopping cart.',
            benefit: isEs ? 'Fácil de comprar para tus clientes' : 'Frictionless buying experience'
          },
          {
            id: 'payments',
            button: isEs ? 'Cobros' : 'Payments',
            icon: CreditCard,
            title: isEs ? 'Mercado Pago y Tarjetas' : 'Integrated Payment Gateway',
            desc: isEs
              ? 'Cobro con tarjeta en cuotas, débito y transferencias. El dinero va directo a tu cuenta.'
              : 'Accept credit card installments, debit, and transfers directly to your bank account.',
            benefit: isEs ? '0% comisiones por venta adicionales' : '0% extra platform commission'
          },
          {
            id: 'orders',
            button: isEs ? 'Alertas' : 'Alerts',
            icon: BellRing,
            title: isEs ? 'Aviso Automático de Ventas' : 'Instant Order Notifications',
            desc: isEs
              ? 'Notificación inmediata a tu WhatsApp por cada compra con detalle de productos y envío.'
              : 'Instant WhatsApp alert on every purchase with full item and delivery breakdown.',
            benefit: isEs ? 'Despacho rápido y aviso al cliente' : 'Faster fulfillment and communication'
          }
        ]
      };

    case 'invitaciones-digitales':
      return {
        activeColor: 'bg-rose-600',
        iconColor: 'bg-rose-500/20 text-rose-400',
        benefitColor: 'text-rose-400',
        badgeText: 'Digital',
        footerIcon: Heart,
        footerIconColor: 'text-rose-400',
        footerLeft: isEs ? 'Envío fácil por WhatsApp' : 'Easy WhatsApp sharing',
        footerRight: isEs ? '100% Digital' : 'Eco-Friendly',
        capabilities: [
          {
            id: 'countdown',
            button: isEs ? 'Música' : 'Music',
            icon: Music,
            title: isEs ? 'Música y Cuenta Regresiva' : 'Soundtrack & Live Countdown',
            desc: isEs
              ? 'Tus invitados abren la tarjeta con música de fondo y ven la cuenta regresiva en vivo.'
              : 'Guests open the invite listening to your chosen music with a live ticking countdown.',
            benefit: isEs ? 'Emoción previa y experiencia interactiva' : 'Anticipation and interactive experience'
          },
          {
            id: 'location',
            button: isEs ? 'Mapa GPS' : 'GPS Map',
            icon: MapPin,
            title: isEs ? 'Ubicación GPS en 1 Toque' : '1-Click GPS Navigation',
            desc: isEs
              ? 'Botón directo que abre Google Maps o Waze para llegar al salón o fiesta sin perderse.'
              : 'One-tap button opening Google Maps or Waze directly on their mobile phones.',
            benefit: isEs ? 'Todos llegan a tiempo y sin confusiones' : 'Zero lost guests & on-time arrivals'
          },
          {
            id: 'rsvp',
            button: isEs ? 'RSVP' : 'RSVP',
            icon: Gift,
            title: isEs ? 'Confirmación y CBU de Regalos' : 'Guest RSVP & Gift Alias',
            desc: isEs
              ? 'Formulario online para confirmar asistencia y botón para copiar tu CBU de regalos en 1 clic.'
              : 'Online guest check-in form and a 1-click button to copy your bank alias/CBU.',
            benefit: isEs ? 'Lista de invitados ordenada sin llamados' : 'Organized guest list with zero calls'
          }
        ]
      };

    case 'mejora-web':
    case 'mejora-de-tu-web':
      return {
        activeColor: 'bg-cyan-600',
        iconColor: 'bg-cyan-500/20 text-cyan-400',
        benefitColor: 'text-cyan-400',
        badgeText: isEs ? 'Diagnóstico' : 'Audit',
        footerIcon: TrendingUp,
        footerIconColor: 'text-cyan-400',
        footerLeft: isEs ? 'Mantenemos tu dominio' : 'Keep existing domain',
        footerRight: isEs ? 'Carga < 1s' : 'Sub-1s Load',
        capabilities: [
          {
            id: 'speed',
            button: isEs ? 'Velocidad' : 'Speed',
            icon: Zap,
            title: isEs ? 'Carga Rápida en Menos de 1s' : 'Sub-Second Loading Time',
            desc: isEs
              ? 'Imágenes livianas WebP, depuración de scripts lentos y servidores CDN ultrarrápidos.'
              : 'Compress images to WebP, purge slow scripts, and serve content via CDN servers.',
            benefit: isEs ? 'Tus visitas no abandonan por lentitud' : 'Zero visitor drop-off from slow loads'
          },
          {
            id: 'responsive',
            button: isEs ? 'Celulares' : 'Mobile',
            icon: Smartphone,
            title: isEs ? 'Rediseño Responsive Moderno' : 'Mobile-First Layout',
            desc: isEs
              ? 'Adaptamos la interfaz para que se lea impecable y prolija en cualquier celular actual.'
              : 'Rebuild interface so it displays cleanly and comfortably on all mobile screens.',
            benefit: isEs ? 'Lectura cómoda sin hacer zoom incómodo' : 'Clean layout with zero zoom needed'
          },
          {
            id: 'security',
            button: isEs ? 'Seguridad' : 'Security',
            icon: ShieldCheck,
            title: isEs ? 'Candado SSL HTTPS y Google' : 'SSL HTTPS & SEO Health',
            desc: isEs
              ? 'Instalamos el candado SSL, reparamos enlaces caídos y optimizamos el SEO para Google.'
              : 'Install secure SSL certificates, repair broken links, and optimize SEO indexing.',
            benefit: isEs ? 'Sitio seguro y confiable para tus clientes' : 'Trusted and verified secure website'
          }
        ]
      };

    case 'revision-presupuesto':
      return {
        activeColor: 'bg-amber-600',
        iconColor: 'bg-amber-500/20 text-amber-400',
        benefitColor: 'text-amber-400',
        badgeText: isEs ? 'Sin Cargo' : 'Free',
        footerIcon: ShieldCheck,
        footerIconColor: 'text-amber-400',
        footerLeft: isEs ? 'Consulta sin compromiso' : 'No obligation review',
        footerRight: isEs ? '100% Gratuito' : '100% Free',
        capabilities: [
          {
            id: 'hidden',
            button: isEs ? 'Sobreprecios' : 'Hidden Fees',
            icon: SearchCheck,
            title: isEs ? 'Detección de Sobreprecios' : 'Overpricing Detection',
            desc: isEs
              ? 'Revisamos si te cobran extras por funciones básicas o si inflan el costo del hosting.'
              : 'We check if basic features are billed as expensive add-ons or hosting is inflated.',
            benefit: isEs ? 'Sabes exactamente por qué pagas' : 'Know exactly what you pay for'
          },
          {
            id: 'ownership',
            button: isEs ? 'Código Libre' : 'Code Ownership',
            icon: LockOpen,
            title: isEs ? 'Garantía de Código 100% Tuyo' : 'Full Source Code Ownership',
            desc: isEs
              ? 'Verificamos que el código sea de tu propiedad sin quedar cautivo en abonos forzosos.'
              : 'We ensure source code is 100% yours, preventing predatory captive contracts.',
            benefit: isEs ? 'Libertad total y control de tu web' : 'Total freedom with zero vendor lock-in'
          },
          {
            id: 'savings',
            button: isEs ? 'Ahorro Real' : 'Real Savings',
            icon: DollarSign,
            title: isEs ? 'Alternativa Técnica Conveniente' : 'Smarter Cost Alternative',
            desc: isEs
              ? 'Te proponemos opciones tecnológicas modernas para lograr el mejor resultado a tu presupuesto.'
              : 'We propose modern tech stacks delivering superior results fitted to your budget.',
            benefit: isEs ? 'Ahorro real sin perder calidad' : 'Real savings with zero quality loss'
          }
        ]
      };

    case 'paginas-web':
    default:
      return {
        activeColor: 'bg-blue-600',
        iconColor: 'bg-blue-500/20 text-blue-400',
        benefitColor: 'text-blue-400',
        badgeText: isEs ? 'Incluido' : 'Included',
        footerIcon: Sparkles,
        footerIconColor: 'text-blue-400',
        footerLeft: isEs ? 'Sitio propio sin abonos' : 'No monthly hosting markup',
        footerRight: isEs ? 'Llave en Mano' : 'Turnkey Ready',
        capabilities: [
          {
            id: 'design',
            button: isEs ? 'Diseño & UX' : 'Design & UX',
            icon: Layout,
            title: isEs ? 'Diseño Exclusivo y Adaptable' : 'Custom Responsive Design',
            desc: isEs
              ? 'Sitios a medida con tipografía clara y adaptación perfecta en celulares y computadoras.'
              : 'Tailored to your brand with clean typography, fully responsive on mobile & PC.',
            benefit: isEs ? 'Imagen profesional y navegación intuitiva' : 'Professional look & intuitive UX'
          },
          {
            id: 'speed',
            button: isEs ? 'Velocidad SEO' : 'Speed & SEO',
            icon: Zap,
            title: isEs ? 'Carga Rápida en < 1 Segundo' : 'Sub-Second Loading & SEO',
            desc: isEs
              ? 'Arquitectura optimizada que carga al instante y cumple estándares de Google para búsquedas.'
              : 'Optimized architecture loading under 1 second, meeting Google standards for search.',
            benefit: isEs ? 'Menos rebote y mejor posicionamiento' : 'Lower bounce rate & higher ranking'
          },
          {
            id: 'conversion',
            button: isEs ? 'WhatsApp' : 'WhatsApp',
            icon: MessageSquare,
            title: isEs ? 'Contacto Directo a Clientes' : 'Direct Client Conversion',
            desc: isEs
              ? 'Llamados a la acción para que tus visitas te consulten directo al WhatsApp en 1 toque.'
              : 'Strategic buttons connecting visitors directly to your WhatsApp in one tap.',
            benefit: isEs ? 'Consultas rápidas sin formularios lentos' : 'Instant leads with zero friction'
          }
        ]
      };
  }
}
