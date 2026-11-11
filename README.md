# 🌐 Plataforma Web & Portafolio de Ingeniería — Lautaro Leal Del Prete (LLDP)

Plataforma profesional de **Ingeniería de Software & Full Stack Development** desarrollada con **React 19 + Vite 7**, arquitectura multi-página con **React Router DOM v7**, estilizado utilitario de vanguardia con **Tailwind CSS v3**, renderizado 3D interactivo en **Three.js (WebGL)**, scroll inercial suave con **Lenis**, soporte bilingüe completo (**ES / EN**), catálogo modular de servicios con **cotizador interactivo de proyectos** y visor de casos de estudio con **Live Sandbox** y adaptación multipantalla.

[![Plataforma Oficial LLDP](https://img.shields.io/badge/lautarolealdev.com-En%20Vivo-020A15?style=for-the-badge&logo=vercel&logoColor=3B82F6&labelColor=020A15)](https://lautarolealdev.com/)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/lautaro-leal-del-prete-32a249339/)
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/LautaroLeall)

---

## 🎯 Arquitectura & Funcionalidades Principales

- 🏛️ **Arquitectura Multi-Página & Code-Splitting (`React Router DOM v7` + `React.lazy()`)**:
  - Rutas dedicadas (`/`, `/servicios`, `/proyectos`, `/proyectos/:slug`, `/habilidades`, `/educacion`, `/sobre-mi`, `/contacto`).
  - Bundle modular optimizado con carga bajo demanda, reduciendo el chunk principal de 556 kB a < 390 kB (129 kB gzip).
  - Títulos dinámicos de pestaña (`document.title`) reactivos por ruta e idioma para optimización SEO e historial de navegación.
  - Componente global `<ScrollToTop>` sincronizado con Lenis y reseteo inmediato a `(0, 0)`.

- 💎 **Transiciones Fluidas & UX de Carga (`PageTransition` + `LoaderContext`)**:
  - **Animación de Entrada de Alta Fidelidad:** Cada página ingresa suavemente con fade-in y desplazamiento sutil ascendente (`opacity: 0 → 1`, `y: 16px → 0px`, `0.35s` con aceleración natural).
  - **Navbar Persistente & Ocultamiento del Footer:** Al cambiar de página, el Navbar institucional permanece fijo en la parte superior junto a la barra láser de progreso (`PageLoader`), mientras el Footer se oculta instantáneamente para evitar saltos visuales y reaparece suavemente al finalizar el montaje de la nueva ruta.

- 💼 **Plataforma de Servicios Web & Cotizador Interactivo (`/servicios`)**:
  - **Catálogo de 6 Soluciones Especializadas:** _Páginas Web, Sistemas de Gestión a Medida, Tiendas Online, Invitaciones Digitales Interactivas, Optimización de Rendimiento & SEO y Auditoría de Presupuestos_.
  - **Mockups Vivos y Modulares (`ServiceMockupCard.jsx`):** Arquitectura limpia (< 95 líneas) desacoplada en `mockupsData.js` con consolas interactivas en tiempo real.
  - **Cotizador Dinámico en 3 Pasos (`QuoteWizard.jsx`):**
    - **Paso 1 (Alcance):** Selección de especialidad con tarjetas interactivas.
    - **Paso 2 (Requerimientos Técnicos):** Preguntas de alcance personalizadas por especialidad (`pricingData.js`), selector desplegable de cristal pulido y módulos adicionales opcionales.
    - **Paso 3 (Dossier & Despacho):** Ficha técnica ejecutiva con chips interactivos y botón de modificación rápida. Despacho 100% automático mediante **EmailJS** o coordinación directa con brief preformateado en **WhatsApp**.
    - **Stepper 100% Responsivo:** Línea de progreso de una sola fila calibrada para evitar saltos en pantallas móviles reducidas.

- 🚀 **Showcase de Proyectos de Ingeniería (`/proyectos`)**:
  - Buscador reactivo en tiempo real y filtrado dinámico por categorías con contadores (_Todos, Full Stack, Landing Pages_).
  - Página de caso de estudio dedicada **`/proyectos/:slug`** con **Live Sandbox (`iframe`)**, selector de resolución (_Desktop, Tablet, Mobile_), botón de recarga de entorno, modo pantalla completa HD y ficha técnica arquitectónica con proveedor dinámico de hosting.

- 🌌 **Experiencia Gráfica & Motores Visuales**:
  - **`PagesHero3D` (Three.js WebGL):** Artefacto geométrico interactivo en cabeceras de sección con constelación de partículas y rotación sensible al puntero.
  - **`SmoothScroll` (Lenis v1.3):** Desplazamiento inercial suave sincronizado con anclajes internos y transiciones de ruta.
  - **`AuroraMeshBackground` (GPU Shaders):** Malla ambiental de gradientes optimizada con pausa selectiva en pantallas táctiles para maximizar autonomía de batería.
  - **`CustomCursor`:** Puntero magnético de física reactiva con estados contextuales (_VER, OPEN, COPIAR_).
  - **`Preloader` (Terminal Unix):** Consola de booteo reactiva en el arranque inicial de la plataforma con salida suave.

- 🎓 **Trayectoria Académica & Certificaciones (`/educacion`)**:
  - Línea de tiempo formal de estudios universitarios (**UNSTA**) y carreras de especialización (**Instituto Nexus**).
  - Directorio de certificaciones oficiales verificables con enlaces validados y soporte local de respaldo en PDF (`/certifications/nexusEnglish.pdf`).
  - Descarga directa de CV actualizado en formato PDF bilingüe (**Español e Inglés**).

- ⚡ **Stack Tecnológico & Competencias (`/habilidades`)**:
  - Auditoría de dominios de ingeniería: _Frontend Architecture, Backend & Data Engineering, QA & Reliability, Workflow & DevOps_.

- 📬 **Centro de Contacto & Canales Directos (`/contacto`)**:
  - Formulario en tiempo real con validación preventiva conectado a `@emailjs/browser`.
  - Plantilla HTML ejecutiva estilo Vercel/Linear (dark cyber-tech) con tipografía de ingeniería, iconos SVG puros, sin emojis y botones de acción rápida dual (Email directo + WhatsApp).
  - Sistema de notificaciones toast con física de resortes mediante **Sileo**.

- 🔍 **SEO Técnico, Accesibilidad & Performance Web**:
  - Estructura semántica estricta (jerarquía H1 → H2 → H3 normalizada, eliminación de `<main>` anidados, `aria-label` en controles interactivos).
  - `boxShadow` extendido en Tailwind CSS (`shadow-xs` y `shadow-2xs`).
  - Metadatos optimizados para dominio personalizado `lautarolealdev.com`, datos estructurados `JSON-LD` (`schema.org/Person`), Open Graph, Twitter Cards, `robots.txt` limpio y `sitemap.xml` multi-página.
  - Reglas de cabeceras de seguridad y rewrites SPA en `vercel.json`.

---

## 🛠️ Stack Tecnológico

| Capa                          | Tecnologías                                                                          |
| :---------------------------- | :----------------------------------------------------------------------------------- |
| **Core & Framework**          | React 19, JavaScript (ES6+), Vite 7, React Router DOM v7                             |
| **Estilos & Diseño**          | Tailwind CSS v3, PostCSS, Tokens de Marca LLDP, Geist Sans & Mono                    |
| **Animaciones & Gráficos**    | Three.js (WebGL), Framer Motion, Lenis Scroll, GPU Aurora Mesh                       |
| **Estado & Notificaciones**   | React Context API (`ThemeContext`, `LanguageContext`, `LoaderContext`), Sileo Toasts |
| **Iconografía**               | Lucide React, React Icons (FontAwesome, Simple Icons), SVG Inline                    |
| **Servicios & Integraciones** | @emailjs/browser, WhatsApp API Direct Builder                                        |
| **Despliegue & Hosting**      | Vercel Edge Network (`vercel.json`), Git Version Control                             |

---

## 📁 Estructura del Proyecto

```text
Portafolio-LLDP/
├── public/
│   ├── brand/                      # Logotipos y monogramas vectoriales oficiales LLDP
│   ├── certifications/             # Certificados oficiales (PDF y PNG de alta resolución)
│   ├── projects/                   # Capturas Desktop oficiales de casos de estudio
│   ├── projects-mobile/            # Capturas Mobile responsive
│   ├── Lautaro-Leal-Del-Prete-English.pdf
│   ├── Lautaro-Leal-Del-Prete-Spanish.pdf
│   ├── Logo_LLDP.png               # Isotipo oficial de alta definición
│   ├── Logo_LLDP.svg               # Isotipo vectorial escalable
│   ├── favicon.ico
│   ├── robots.txt
│   └── sitemap.xml
├── src/
│   ├── components/
│   │   ├── about/                  # Módulos específicos de Sobre Mí
│   │   ├── contact/                # Canales y formulario de contacto
│   │   ├── layout/                 # Componentes estructurales globales
│   │   │   ├── Footer.jsx          # Pie institucional con enlaces y estado SSL
│   │   │   ├── Navbar.jsx          # Barra HUD flotante de cristal con drawer móvil
│   │   │   ├── ScrollToTop.jsx     # Reset y sincronización de scroll entre rutas
│   │   │   └── SmoothScroll.jsx    # Envoltorio de scroll inercial Lenis
│   │   ├── projects/               # Componentes del visor de proyectos y Sandbox
│   │   ├── services/               # Ecosistema de servicios y cotización
│   │   │   ├── mockups/            # Mockups interactivos de software
│   │   │   ├── mockupsData.js      # Definición de datos y consolas interactivas
│   │   │   ├── QuoteStepServices.jsx # Paso 1: Selección de Especialidad
│   │   │   ├── QuoteStepOptions.jsx  # Paso 2: Configuración Técnica & Select Personalizado
│   │   │   ├── QuoteWizard.jsx     # Orquestador del Cotizador Interactivo & Dossier
│   │   │   ├── ServiceMockup.jsx   # Envoltorio de mockup
│   │   │   └── ServiceMockupCard.jsx # Tarjeta modular unificada de mockup
│   │   └── ui/
│   │       ├── AuroraMeshBackground.jsx # Gradiente dinámico de fondo por GPU
│   │       ├── CustomCursor.jsx    # Cursor de física magnética para desktop
│   │       ├── LogoLLDP.jsx        # Componente oficial de identidad corporativa
│   │       ├── PageLoader.jsx      # Indicador láser minimalista superior
│   │       ├── PagesHero3D.jsx     # Render 3D interactivo en Three.js WebGL
│   │       └── Preloader.jsx       # Consola de booteo Unix inicial
│   ├── context/                    # Providers globales (Theme, Language, Loader)
│   ├── data/
│   │   ├── pricingData.js          # Preguntas, opciones y adicionales por especialidad
│   │   ├── projectsData.jsx        # Catálogo centralizado de proyectos y stacks
│   │   └── servicesData.js         # Catálogo de servicios y generador de URL WhatsApp
│   ├── hooks/                      # Custom Hooks (useTheme, useLanguage, usePageLoader)
│   ├── pages/                      # Vistas principales de la aplicación (React.lazy)
│   │   ├── AboutPage.jsx           # Perfil Profesional & Filosofía de Ingeniería
│   │   ├── ContactPage.jsx         # Formulario EmailJS & Canales Directos
│   │   ├── EducationPage.jsx       # Trayectoria Académica & Certificaciones
│   │   ├── HomePage.jsx            # Portada principal (FCP instantáneo)
│   │   ├── ProjectDetailPage.jsx   # Caso de Estudio con Live Sandbox Iframe
│   │   ├── ProjectsPage.jsx        # Catálogo de 11 Proyectos con Filtros
│   │   ├── ServicesPage.jsx        # Catálogo de Especialidades & Cotizador
│   │   ├── SkillsPage.jsx          # Dominios Técnicos & Matriz de Habilidades
│   │   └── NotFoundPage.jsx        # Vista 404 interactiva con Canvas 3D
│   ├── services/
│   │   └── emailService.js         # Servicio centralizado de EmailJS con metadatos
│   ├── translations/
│   │   └── dictionary.js           # Diccionario bilingüe (ES / EN)
│   ├── App.jsx                     # Enrutador central con PageTransition y Suspense
│   ├── index.css                   # Directivas Tailwind, tokens de color y utilidades
│   └── main.jsx                    # Punto de entrada de la aplicación
├── .env.example                    # Plantilla de variables de entorno requeridas
├── index.html                      # SEO, Open Graph y JSON-LD estructurado
├── tailwind.config.js              # Configuración y extensión de tema Tailwind
├── vercel.json                     # Cabeceras de seguridad, caché perimetral y rewrites SPA
└── vite.config.js                  # Configuración de compilación y optimización de chunks
```

---

## ⚙️ Instalación y Ejecución Local

```bash
# 1. Clonar el repositorio
git clone https://github.com/LautaroLeall/Portafolio-LLDP.git

# 2. Ingresar al directorio
cd Portafolio-LLDP

# 3. Configurar variables de entorno
cp .env.example .env
# Completar las credenciales de EmailJS en el archivo .env

# 4. Instalar dependencias
npm install

# 5. Iniciar servidor de desarrollo local
npm run dev

# 6. Compilar y verificar para producción
npm run build

# 7. Ejecutar linter de código
npm run lint
```

---

## 📄 Licencia & Atribución

Desarrollado con rigurosidad de ingeniería por **Lautaro Leal Del Prete** — _Software Engineer & Full Stack Developer_.  
San Miguel de Tucumán, Argentina.
