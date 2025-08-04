# 🌐 Portafolio Web LLDP

Portfolio web personal desarrollado con ReactJS + Vite, diseñado para presentar mis habilidades, proyectos, y ofrecer un canal de contacto directo. La interfaz es moderna, fluida, con animaciones visuales atractivas, interacción responsiva y una experiencia profesional.

---

## 🎯 Funcionalidades Principales

✅ Carrusel animado de bienvenida con frases personalizadas y CTA dinámico <br>
✅ Sección "About Me" con descripción personal y descarga de CV en PDF <br>
✅ Sección de Skills con animaciones, categorías e íconos <br>
✅ Galería de Proyectos con efecto hover revelador e interacción clara <br>
✅ Filtro interactivo de coaches por especialidad <br>
✅ Formulario de contacto funcional con EmailJS y feedback con SweetAlert2 <br>
✅ Modo claro/oscuro con toggle animado y persistencia <br>
✅ Navegación responsiva con BottomNavbar animado + scrollspy activo <br>
✅ Totalmente responsive: mobile-first y adaptable a cualquier resolución <br>

---

## 🛠️ Tecnologías Usadas

- ⚛ ReactJS + Vite
- 🎨 Bootstrap 5 + CSS personalizado
- 💥 Framer Motion (animaciones fluidas)
- 🌀 AOS (animaciones on scroll)
- 📩 EmailJS (envío de mensajes)
- 🧠 React Context API (modo dark/light)
- 📍 Custom Hook `useScrollSpy`
- 💾 LocalStorage (persistencia de temas y datos de usuario)
- 🧰 Lucide React Icons + react-scroll + sweetalert2

---

## 📁 Estructura del Proyecto

```
PORTAFOLIO-LLDP/
├── public/
├── src/
│   ├── assets/                 # Imágenes y recursos
│   ├── components/             # Componentes reutilizables
│   │   ├── About.jsx
│   │   └── BottomNavbar.jsx
│   │   ├── Contact.jsx
│   │   ├── Footer.jsx
│   │   ├── Home.jsx
│   │   ├── Networks.jsx
│   │   ├── Projects.jsx
│   │   ├── Skills.jsx
│   │   ├── ThemeToggle.jsx
│   ├── context/
│   │   └── ThemeContext.jsx
│   ├── hooks/
│   │   └── useScrollSpy.js
│   ├── styles/                 # Estilos globales y locales
│   ├── App.jsx
│   ├── index.css
│   ├── main.jsx
├── index.html
├── vite.config.js
└── README.md
```

---

## 🚀 Probar el Portafolio

[![Portafolio Web LLDP](https://img.shields.io/badge/Portafolio%20Web%20LLDP-000000?style=for-the-badge&logo=vercel&logoColor=white&labelColor=000000)](https://portafolio-lldp.vercel.app/)

---

## ⚙ Instalación y Ejecución Local

```bash
# Clonar el repositorio
git clone https://github.com/lautygod/portafolio-lldp.git

# Entrar al proyecto
cd portafolio-lldp

# Instalar dependencias
npm install

# Ejecutar modo desarrollo
npm run dev
```

---

## 👨‍💻 Autor

**Lautaro Leal Del Prete**
Desarrollador Frontend | Apasionado por la calidad de software

- GitHub: [@lautygod](https://github.com/lautygod)
- LinkedIn: [lautaro-leal-del-prete](https://www.linkedin.com/in/lautaro-leal-del-prete)
- Email: [lautaroleal4@gmail.com](mailto:lautaroleal4@gmail.com)

---

> Este portafolio es un reflejo vivo de mi aprendizaje constante y evolución como desarrollador. ¡Gracias por visitarlo!
