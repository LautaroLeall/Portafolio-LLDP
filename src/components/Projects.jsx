// src/components/Projects.jsx
import React from 'react'
import { Github, Radio } from 'lucide-react'
// Icons
import { TiCloudStorageOutline } from "react-icons/ti";
import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaBootstrap } from 'react-icons/fa';
import { LuTabletSmartphone } from "react-icons/lu";
// Images
import imageCard from '/public/projects/confia-car.png';
import imageGimnasio from '/public/projects/gestion-gym.png';
import imageCalculadora from '/public/projects/calculadora.png';
import imageGames from '/public/projects/games.png';
import imageLautyDeporte from '/public/projects/lautyDeporte.png';
import imageBooking from '/public/projects/booking.png';
import '../styles/projects.css';

const techIcons = {
    HTML: <FaHtml5 />,
    CSS: <FaCss3Alt />,
    JavaScript: <FaJs />,
    React: <FaReact />,
    Bootstrap: <FaBootstrap />,
    LocalStorage: <TiCloudStorageOutline />,
    Responsive: <LuTabletSmartphone />,
};

const projectList = [
    {
        title: 'CONFIA-CAR',
        description: 'App de reservas y pagos para alquiler de autos.',
        techs: ['HTML', 'CSS', 'JavaScript', 'React', 'Bootstrap', 'LocalStorage', 'Responsive'],
        code: 'https://github.com/LautaroLeall/Confia-CAR',
        demo: 'https://confia-car-renta.netlify.app/',
        image: imageCard,
    },
    {
        title: 'Gestion-GYM',
        description: 'Turnos, sedes y coaches con filtros por especialidad.',
        techs: ['HTML', 'CSS', 'JavaScript', 'React', 'Bootstrap', 'LocalStorage'],
        code: 'https://github.com/LautaroLeall/Gestion-GYM',
        demo: 'https://gestion-gym.netlify.app/',
        image: imageGimnasio,
    },
    {
        title: 'LautyDeporte',
        description: 'E-Commerce tienda Deportiva.',
        techs: ['HTML', 'CSS', 'JavaScript', 'Bootstrap', 'LocalStorage', 'Responsive'],
        code: 'https://github.com/LautaroLeall/LautyDeporte',
        demo: 'https://lauty-deporte.netlify.app/',
        image: imageLautyDeporte,
    },
    {
        title: 'Games',
        description: 'Juegos "TA TE TI" - "Piedra | Papel | Tijera"',
        techs: ['HTML', 'CSS', 'JavaScript', 'React', 'Bootstrap', 'Responsive'],
        code: 'https://github.com/LautaroLeall/Games',
        demo: 'https://games-lau.netlify.app/',
        image: imageGames,
    },
    {
        title: 'Calculadora',
        description: 'Calculadora "Basica" de Iphone',
        techs: ['HTML', 'CSS', 'JavaScript', 'LocalStorage', 'Responsive'],
        code: 'https://github.com/LautaroLeall/Calculadora',
        demo: 'https://cal-iphone.netlify.app/',
        image: imageCalculadora,
    },
    {
        title: 'Booking.com',
        description: 'Interfaz de Booking.com',
        techs: ['HTML', 'CSS', 'Bootstrap', 'LocalStorage'],
        code: 'https://github.com/LautaroLeall/Booking.com',
        demo: 'https://booking-lldp.netlify.app/',
        image: imageBooking,
    },
];

const Projects = () => {
    return (
        <div className="projects-container container py-5" id="projects" data-aos="fade-up">
            <h2 className="section-title">My Projects</h2>
            <div className="project-grid mt-4">
                {projectList.map((proj, i) => (
                    <div className="project-card" key={i}>
                        <img src={proj.image} alt={proj.title} className="project-image" />
                        <div className="overlay d-flex flex-column justify-content-center text-center p-3">
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
