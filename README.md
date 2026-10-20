# 🌐 Portafolio Web — Lautaro Leal Del Prete (LLDP)

Portafolio profesional **Full Stack Developer** desarrollado con **React 19 + Vite**, diseñado bajo una estética editorial moderna, motores gráficos interactivos en **Canvas 2D**, soporte bilingüe completo (**ES / EN**) y un visor de proyectos con **Sandbox en vivo** y adaptación móvil inteligente.

[![Portafolio Web LLDP](https://img.shields.io/badge/Ver%20Portafolio%20en%20Vivo-000000?style=for-the-badge&logo=vercel&logoColor=white&labelColor=000000)](https://portafolio-lldp.vercel.app/)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/lauldp)
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/LautaroLeall)

---

## 🎯 Funcionalidades Principales

- ✅ **Hero Interactivo con Motor ASCII (`GradientASCII`)**: Horizonte luminoso procedural renderizado en Canvas 2D con interpolación de color en espacio **OKLab**, ruido Perlin 2D y ondas de decodificación al pasar el mouse o hacer clic.
- ✅ **Constelación Cyber Interactiva (`CodeWavesCanvas`)**: Fondo unificado post-Hero con red de partículas, símbolos de código y ondas expansivas de doble anillo con chispas radiales al hacer clic.
- ✅ **Editorial About & Trayectoria**: Presentación profesional en dos columnas con pilares de ingeniería, línea de tiempo académica (**UNSTA** & **Instituto Nexus**), directorio de certificaciones verificables con **Lightbox en Portal (`createPortal`)** y descarga directa de CV en PDF (**Español e Inglés**).
- ✅ **Stack Tecnológico & Competencias**: Dominios técnicos desglosados (_Frontend, Backend & Arquitectura de Datos, QA & Testing, Workflow_) y habilidades profesionales.
- ✅ **Showcase de 10 Proyectos con Modal Interactivo (`ProjectDetail`)**:
  - Filtro dinámico con contadores por categoría (_Todos_, _Full Stack_, _Landing Pages_) e indicadores de estado (_Live_ / _En Proceso_).
  - **Modo Interactivo (Live Sandbox)** con selector de resolución (_Desktop, Tablet, Mobile_) y detección inteligente de seguridad `X-Frame-Options`.
  - **Modo Captura (Snapshot)** con dirección de arte responsiva (`<picture>`): muestra capturas de escritorio en pantallas grandes y capturas móviles verticales completas (`782×1600`) sin recortes en dispositivos móviles.
  - Ficha técnica completa con arquitectura, características clave y enlaces a repositorios Frontend y Backend.
- ✅ **Sección de Contacto Avanzada**:
  - Envío de mensajes en tiempo real mediante **EmailJS**.
  - Copiado rápido de correo con componente interactivo **`BellToggle`** y ondas acústicas.
  - Cola de notificaciones flotantes (**Floating Toasts**) animadas con barra de progreso.
- ✅ **Internacionalización (ES / EN) & Tema (Dark / Light)**: Cambio instantáneo de idioma y modo visual con persistencia en `localStorage` y controles flotantes sincronizados con el estado de los modales.
- ✅ **SEO & Rendimiento Optimizado**: Datos estructurados `JSON-LD` (`schema.org/Person`), Open Graph, Twitter Cards, `robots.txt`, `sitemap.xml`, cabeceras de caché en Vercel y división de bundles (`manualChunks`) en Vite.

---

## 🛠️ Tecnologías y Herramientas

- **Core:** React 19, JavaScript (ES6+), Vite 7
- **Estilos & UI:** CSS3 Modular, Variables CSS (Design Tokens), Bootstrap 5 Grid & Utilities
- **Animaciones & Gráficos:** Framer Motion, HTML5 Canvas 2D API (OKLab & Perlin Noise), `react-type-animation`
- **Estado & Arquitectura:** React Context API (`ThemeContext`, `LanguageContext`, `ModalContext`), Custom Hooks (`useScrollSpy`, `useTheme`, `useLanguage`, `useModal`)
- **Iconografía:** Lucide React, React Icons
- **Servicios & Despliegue:** EmailJS, Vercel (con `vercel.json` optimizado para caché y cabeceras de seguridad)

---

## 📁 Estructura del Proyecto

```text
Portafolio-LLDP/
├── public/
│   ├── certifications/             # Certificados oficiales en alta resolución
│   ├── projects/                   # Capturas de proyectos versión Desktop
│   ├── projects-mobile/            # Capturas de proyectos versión Mobile completa
│   ├── Lautaro-Leal-Del-Prete-English.pdf
│   ├── Lautaro-Leal-Del-Prete-Spanish.pdf
│   ├── Logo_LLDP.png
│   ├── robots.txt
│   └── sitemap.xml
├── src/
│   ├── components/
│   │   ├── ui/
│   │   │   ├── ascii/              # Matemática OKLab, ruido Perlin 2D y grilla ASCII
│   │   │   ├── BellToggle.jsx      # Botón interactivo con onda acústica
│   │   │   ├── CodeWavesCanvas.jsx # Red de partículas y ondas de choque interactivas
│   │   │   └── GradientASCII.jsx   # Motor visual ASCII del Hero
│   │   ├── About.jsx
│   │   ├── BottomNavbar.jsx
│   │   ├── BtnCV.jsx
│   │   ├── Certifications.jsx
│   │   ├── Contact.jsx
│   │   ├── Education.jsx
│   │   ├── Home.jsx
│   │   ├── LanguageToggle.jsx
│   │   ├── Networks.jsx
│   │   ├── ProjectDetail.jsx       # Modal con Live Sandbox + Snapshot + Dossier
│   │   ├── Projects.jsx
│   │   ├── Qualifications.jsx
│   │   ├── Skills.jsx
│   │   └── ThemeToggle.jsx
│   ├── context/                    # Providers globales (Theme, Language, Modal)
│   ├── hooks/                      # Custom Hooks (useScrollSpy, useTheme, useLanguage, useModal)
│   ├── styles/                     # Hojas de estilo modulares por componente y sección
│   ├── translations/               # Diccionario bilingüe completo (ES / EN)
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── vercel.json
├── vite.config.js
└── README.md
```

---

## ⚙️ Instalación y Ejecución Local

```bash
# 1. Clonar el repositorio
git clone https://github.com/LautaroLeall/Portafolio-LLDP.git

# 2. Entrar al directorio del proyecto
cd Portafolio-LLDP

# 3. Instalar dependencias
npm install

# 4. Iniciar servidor de desarrollo
npm run dev

# 5. Compilar para producción
npm run build
```

---

> Desarrollado por **Lautaro Leal Del Prete** — _Full Stack Developer_.  
> Tucumán, Argentina.
