import {
  Smartphone,
  Layers,
  ShieldAlert,
  FlaskConical,
  Kanban,
  Gauge
} from 'lucide-react';
import {
  SiReact,
  SiTailwindcss,
  SiJavascript,
  SiFramer,
  SiNodedotjs,
  SiPostgresql,
  SiMongodb,
  SiSupabase,
  SiZod,
  SiGit,
  SiVite,
  SiVercel,
  SiPostman,
  SiFigma
} from 'react-icons/si';
import { FaKey } from 'react-icons/fa';

export const frequentStack = [
  { name: 'React', icon: SiReact, color: 'text-[#087ea4]' },
  { name: 'Node.js', icon: SiNodedotjs, color: 'text-[#5fa04e]' },
  { name: 'PostgreSQL', icon: SiPostgresql, color: 'text-[#4169e1]' },
  { name: 'MongoDB', icon: SiMongodb, color: 'text-[#13aa52]' },
  { name: 'Tailwind CSS', icon: SiTailwindcss, color: 'text-[#06b6d4]' },
  { name: 'Zod', icon: SiZod, color: 'text-[#3068b7]' },
  { name: 'Git', icon: SiGit, color: 'text-[#f05032]' },
  { name: 'Vite', icon: SiVite, color: 'text-[#bd34fe]' }
];

export const getSkillDomains = (isEs = true) => [
  {
    number: '01',
    id: 'frontend',
    title: isEs ? 'Frontend & Interfaces' : 'Frontend & Interfaces',
    description: isEs
      ? 'Desarrollo de interfaces web reactivas, accesibles y optimizadas. Enfoque centrado en la experiencia de usuario, diseño responsive fluido y renderizado de alto rendimiento.'
      : 'Reactive, accessible, and high-performance web interfaces. Focused on user experience, fluid mobile-first responsiveness, and efficient rendering.',
    skills: [
      {
        name: 'React & Vite',
        icon: SiReact,
        iconColor: 'text-[#087ea4]',
        detail: isEs
          ? 'Arquitectura de componentes modulares, hooks personalizados, Context API, renderizado condicional optimizado y tooling de build instantáneo.'
          : 'Modular component architecture, custom hooks, Context API, optimized conditional rendering, and instant build tooling.'
      },
      {
        name: 'Tailwind CSS',
        icon: SiTailwindcss,
        iconColor: 'text-[#06b6d4]',
        detail: isEs
          ? 'Diseño atómico escalable, maquetación utilitaria, consistencia visual y soporte completo para modo oscuro y claro.'
          : 'Scalable atomic design, utility-first layout systems, visual consistency, and full light/dark theme support.'
      },
      {
        name: 'JavaScript Moderno (ES6+)',
        icon: SiJavascript,
        iconColor: 'text-[#eab308]',
        detail: isEs
          ? 'Programación asíncrona, promesas, async/await, manejo estructurado de datos, closures y manipulación eficiente del DOM.'
          : 'Asynchronous programming, promises, async/await, structured data manipulation, closures, and efficient DOM interaction.'
      },
      {
        name: 'Framer Motion',
        icon: SiFramer,
        iconColor: 'text-[#0055ff]',
        detail: isEs
          ? 'Micro-interacciones táctiles, transiciones de pantalla con físicas fluidas y animaciones aceleradas por GPU.'
          : 'Tactile micro-interactions, spring-based UI transitions, and GPU-accelerated motion choreography.'
      },
      {
        name: 'Diseño Responsive Fluido',
        icon: Smartphone,
        iconColor: 'text-emerald-500',
        detail: isEs
          ? 'Adaptabilidad nativa y ergonómica en cualquier resolución: desde smartphones hasta laptops y pantallas ultra-wide.'
          : 'Native, ergonomic responsiveness across all viewports: from mobile smartphones to ultra-wide desktop monitors.'
      }
    ]
  },
  {
    number: '02',
    id: 'backend',
    title: isEs ? 'Backend, APIs & Seguridad' : 'Backend, APIs & Security',
    description: isEs
      ? 'Construcción de servidores modulares y APIs RESTful. Estructura de capas bien definida, control de acceso riguroso y manejo centralizado de excepciones.'
      : 'Modular server architectures and RESTful APIs. Clean layered structure, strict access control, and centralized error handling.',
    skills: [
      {
        name: 'Node.js & Express',
        icon: SiNodedotjs,
        iconColor: 'text-[#5fa04e]',
        detail: isEs
          ? 'Servicios backend organizados en capas (controladores, servicios y modelos), enrutamiento semántico y middlewares personalizados.'
          : 'Layered backend services (controllers, services, repositories), semantic routing, and custom middleware pipelines.'
      },
      {
        name: 'JWT & Autenticación Segura',
        icon: FaKey,
        iconColor: 'text-amber-500',
        detail: isEs
          ? 'Tokens criptográficos almacenados en cookies httpOnly, protección de rutas privadas y mitigación de ataques XSS y CSRF.'
          : 'Cryptographic tokens stored in httpOnly cookies, protected route guards, and robust XSS/CSRF mitigation.'
      },
      {
        name: 'Integraciones & Webhooks',
        icon: Layers,
        iconColor: 'text-cyan-500',
        detail: isEs
          ? 'Conexión con pasarelas de pago (Mercado Pago), almacenamiento multimedia en la nube (Cloudinary) y recepción de eventos.'
          : 'Payment gateway integrations (Mercado Pago), cloud media storage (Cloudinary), and live webhook listeners.'
      },
      {
        name: 'Manejo de Errores',
        icon: ShieldAlert,
        iconColor: 'text-rose-500',
        detail: isEs
          ? 'Middlewares globales de captura de excepciones, respuestas JSON estandarizadas y trazabilidad de fallos en desarrollo y producción.'
          : 'Global exception-catching middlewares, standardized JSON error responses, and clean debug traceability.'
      }
    ]
  },
  {
    number: '03',
    id: 'databases',
    title: isEs ? 'Bases de Datos & Persistencia' : 'Databases & Persistence',
    description: isEs
      ? 'Modelado de esquemas relacionales y no relacionales adaptados al modelo de negocio de cada aplicación.'
      : 'Relational and NoSQL data modeling tailored to each application’s operational requirements.',
    skills: [
      {
        name: 'PostgreSQL',
        icon: SiPostgresql,
        iconColor: 'text-[#4169e1]',
        detail: isEs
          ? 'Esquemas relacionales estrictos, claves foráneas, integridad referencial, transacciones ACID y consultas indexadas (Supabase / Sequelize).'
          : 'Strict relational schemas, foreign keys, referential integrity, ACID transactions, and indexed queries (Supabase / Sequelize).'
      },
      {
        name: 'MongoDB & Mongoose',
        icon: SiMongodb,
        iconColor: 'text-[#13aa52]',
        detail: isEs
          ? 'Bases de datos orientadas a documentos, esquemas tipados con Mongoose, operaciones de agregación y lectura ágil.'
          : 'Document-oriented collections, Mongoose schema modeling, aggregation pipelines, and high-read performance.'
      },
      {
        name: 'Supabase',
        icon: SiSupabase,
        iconColor: 'text-[#3ecf8e]',
        detail: isEs
          ? 'Backend-as-a-Service con PostgreSQL administrado, autenticación nativa y políticas de seguridad por fila (RLS).'
          : 'Backend-as-a-Service with managed PostgreSQL, native authentication, and Row Level Security (RLS).'
      }
    ]
  },
  {
    number: '04',
    id: 'qa',
    title: isEs ? 'Calidad de Software & QA (UNSTA)' : 'Software Quality & QA (UNSTA)',
    description: isEs
      ? 'Criterios de ingeniería aprendidos en la formación universitaria de la UNSTA, asegurando estabilidad, tipado riguroso y procesos de trabajo ordenados.'
      : 'Engineering discipline acquired during formal university education at UNSTA, ensuring stability, strict typing, and organized development.',
    skills: [
      {
        name: 'Validación en Capas (Zod / Joi)',
        icon: SiZod,
        iconColor: 'text-[#3068b7]',
        detail: isEs
          ? 'Sanitización estricta de datos en la entrada de las APIs para blindar la base de datos contra entradas no válidas o maliciosas.'
          : 'Strict data validation at API entry points, protecting databases against invalid or malicious inputs.'
      },
      {
        name: 'Testing & Verificación',
        icon: FlaskConical,
        iconColor: 'text-indigo-500',
        detail: isEs
          ? 'Pruebas de endpoints, verificación de contratos de API y aserciones de lógica crítica de negocio.'
          : 'Endpoint testing, API contract verification, and business logic assertions.'
      },
      {
        name: 'Metodología Ágil (Scrum)',
        icon: Kanban,
        iconColor: 'text-blue-500',
        detail: isEs
          ? 'Gestión de proyectos por sprints, estimación de requerimientos, retrospectivas y entregas continuas y medibles de valor.'
          : 'Sprint-based project management, requirement estimation, retrospectives, and continuous value delivery.'
      },
      {
        name: 'Optimización',
        icon: Gauge,
        iconColor: 'text-amber-500',
        detail: isEs
          ? 'Reducción de tiempos de carga inicial, división de código (code splitting), compresión de activos y navegación fluida.'
          : 'Optimizing initial load times, code splitting, asset compression, and smooth navigation metrics.'
      }
    ]
  },
  {
    number: '05',
    id: 'tools',
    title: isEs ? 'Herramientas & Entorno de Trabajo' : 'Tools & Developer Workflow',
    description: isEs
      ? 'Herramientas diarias para control de versiones colaborativo, auditoría de endpoints y despliegue continuo.'
      : 'Daily tooling for collaborative version control, endpoint inspection, and automated cloud deployments.',
    skills: [
      {
        name: 'Git & GitHub',
        icon: SiGit,
        iconColor: 'text-[#f05032]',
        detail: isEs
          ? 'Control de versiones semántico, trabajo ordenado con ramas (feature branches), pull requests claros y resolución limpia de conflictos.'
          : 'Semantic version control, feature-branch workflows, clean pull requests, and conflict resolution.'
      },
      {
        name: 'Vite',
        icon: SiVite,
        iconColor: 'text-[#bd34fe]',
        detail: isEs
          ? 'Entorno de build ultrarrápido con Hot Module Replacement (HMR) instantáneo y empaquetado optimizado para producción.'
          : 'Ultra-fast build tooling with instant HMR and finely optimized production bundling.'
      },
      {
        name: 'Despliegue Cloud',
        icon: SiVercel,
        iconColor: 'text-slate-900 dark:text-white',
        detail: isEs
          ? 'Gestión de entornos en Vercel y Render, configuración de variables de entorno seguras y certificados SSL nativos.'
          : 'Production hosting on Vercel and Render with secure environment variables and native SSL certificates.'
      },
      {
        name: 'Postman',
        icon: SiPostman,
        iconColor: 'text-[#ff6c37]',
        detail: isEs
          ? 'Diseño, prueba y documentación de endpoints con colecciones organizadas y variables de entorno.'
          : 'Testing, documenting, and auditing API endpoints with organized collections and environment presets.'
      },
      {
        name: 'Figma',
        icon: SiFigma,
        iconColor: 'text-[#f24e1e]',
        detail: isEs
          ? 'Inspección de maquetas, traslación precisa de prototipos a componentes de código y consistencia visual.'
          : 'Design inspection, translating UI prototypes into clean code components, and design consistency.'
      }
    ]
  }
];
