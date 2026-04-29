// src/components/Projects.jsx
import { Github, Radio } from 'lucide-react'
// Icons
import { TiCloudStorageOutline } from "react-icons/ti";
import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaBootstrap } from 'react-icons/fa';
import { SiTailwindcss, SiVite, SiFramer } from "react-icons/si";
import { LuTabletSmartphone } from "react-icons/lu";
// Images
import imageMym from '/public/projects/mym-decoraciones.png';
import imageLevels from '/public/projects/levels-gym.png';
import imageCesar from '/public/projects/cesar-estista.png';
import imageBGA from '/public/projects/bga-habilitaciones.png';
import imageKrauft from '/public/projects/krauft.png';
import imageCard from '/public/projects/confia-car.png';
import imageGimnasio from '/public/projects/gestion-gym.png';
import imageLautyDeporte from '/public/projects/lautyDeporte.png';
// import imageGames from '/public/projects/games.png';
// import imageCalculadora from '/public/projects/calculadora.png';
// import imageBooking from '/public/projects/booking.png';
import '../styles/projects.css';

const techIcons = {
    HTML: <FaHtml5 />,
    CSS: <FaCss3Alt />,
    JavaScript: <FaJs />,
    React: <FaReact />,
    Bootstrap: <FaBootstrap />,
    LocalStorage: <TiCloudStorageOutline />,
    Responsive: <LuTabletSmartphone />,
    Tailwind: <SiTailwindcss />,
    Vite: <SiVite />,
    Framer: <SiFramer />,
};

const projectList = [
    {
        title: 'MyM Decoraciones',
        description: 'Landing para decoraciones con sus propuestas y contacto.',
        techs: ['React', 'Tailwind', 'Vite', 'Framer', 'Responsive'],
        code: 'https://github.com/LautaroLeall/MyM_Decoraciones',
        demo: 'https://mym-decoraciones.netlify.app/',
        image: imageMym,
    },
    {
        title: 'Levels GYM',
        description: 'Sitio web para centro de alto rendimiento con planes y contacto.',
        techs: ['React', 'Tailwind', 'Vite', 'Framer', 'Responsive'],
        code: 'https://github.com/LautaroLeall/Levels-GYM',
        demo: 'https://levels-ar.netlify.app/',
        image: imageLevels,
    },
    {
        title: 'Cesar Aparicio Estilista',
        description: 'Landing para estilista con galería y reservas vía WhatsApp.',
        techs: ['React', 'Tailwind', 'Vite', 'Framer', 'Responsive'],
        code: 'https://github.com/LautaroLeall/Cesar_Aparicio_Estilista',
        demo: 'https://cesar-aparicio-estilista.netlify.app/',
        image: imageCesar,
    },
    {
        title: 'BGA Habilitaciones',
        description: 'Sitio profesional para gestor de habilitaciones comerciales.',
        techs: ['React', 'Tailwind', 'Vite', 'Framer', 'Responsive'],
        code: 'https://github.com/LautaroLeall/BG-Habilitaciones',
        demo: 'https://bga-habilitaciones.netlify.app/',
        image: imageBGA,
    },
    {
        title: 'Krauft Marketing Inmobiliario',
        description: 'Sitio corporativo para agencia inmobiliaria.',
        techs: ['React', 'JavaScript', 'Tailwind', 'Vite', 'Framer', 'Responsive'],
        code: 'https://github.com/LautaroLeall/Krauft',
        demo: 'https://krauft-marketing-inmobiliaria.netlify.app/',
        image: imageKrauft,
    },
    {
        title: 'CONFIA-CAR',
        description: 'App de reservas y pagos para alquiler de autos.',
        techs: ['React', 'JavaScript', 'CSS', 'Bootstrap', 'LocalStorage', 'Responsive'],
        code: 'https://github.com/LautaroLeall/Confia-CAR',
        demo: 'https://confia-car-renta.netlify.app/',
        image: imageCard,
    },
    {
        title: 'Gestion-GYM',
        description: 'Turnos, sedes y coaches con filtros por especialidad.',
        techs: ['React', 'JavaScript', 'CSS', 'Bootstrap', 'LocalStorage'],
        code: 'https://github.com/LautaroLeall/Gestion-GYM',
        demo: 'https://gimnasio-lg.netlify.app/',
        image: imageGimnasio,
    },
    {
        title: 'LautyDeporte',
        description: 'E-Commerce tienda Deportiva.',
        techs: ['HTML', 'CSS', 'JavaScript', 'Bootstrap', 'LocalStorage', 'Responsive'],
        code: 'https://github.com/LautaroLeall/LautyDeporte',
        demo: 'https://lauty-deporte.netlify.app/',
        image: imageLautyDeporte,
    }
];

const Projects = () => {
    return (
        <div className="projects-container container py-5" id="projects" data-aos="fade-up">
            <h2 className="section-title">My Projects</h2>
            <div className="project-grid mt-4">
                {projectList.map((proj, i) => (
                    <div className="project-card" key={i}>
                        <img src={proj.image} alt={proj.title} className="project-image" />
                        <div className="overlay d-flex flex-column justify-content-center text-center p-2">
                            <h5 className="project-title">{proj.title}</h5>
                            <p className="project-description m-0">{proj.description}</p>
                            <div className="project-techs d-flex justify-content-center align-items-center gap-3 my-3">
                                {proj.techs.map((tech, idx) => (
                                    <span className="tech-icon" key={idx} data-tooltip={tech}>
                                        {techIcons[tech]}
                                    </span>
                                ))}
                            </div>
                            <div className="d-flex justify-content-center align-items-center gap-3">
                                {proj.code && (
                                    <a
                                        href={proj.code}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn btn-outline-custom py-2 px-3"
                                    >
                                        <Github className="me-2" />
                                        CODE
                                    </a>
                                )}
                                {proj.demo && (
                                    <a
                                        href={proj.demo}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn btn-outline-custom py-2 px-3"
                                    >
                                        <Radio className="me-2" />
                                        DEMO
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Projects;
