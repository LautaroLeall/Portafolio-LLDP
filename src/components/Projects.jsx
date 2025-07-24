import React from 'react';
import '../styles/projects.css';

const projectList = [
    {
        title: 'CONFIA-CAR',
        description: 'App de reservas y pagos para venta de autos.',
        tech: 'React, Bootstrap, json-server',
        link: 'https://github.com/LautyGod/confia-car'
    },
    {
        title: 'GimnasioApp',
        description: 'Turnos, sedes y coaches con filtros por especialidad.',
        tech: 'React, Bootstrap, LocalStorage',
        link: 'https://github.com/LautyGod/gimnasio-app'
    },
];

const Projects = () => {
    return (
        <div className="projects-container container py-5" data-aos="fade-up">
            <h2 className="section-title">Proyectos</h2>
            <div className="project-grid">
                {projectList.map((proj, index) => (
                    <div className="project-card" key={index}>
                        <h5>{proj.title}</h5>
                        <p>{proj.description}</p>
                        <p className="tech-used">{proj.tech}</p>
                        <a href={proj.link} target="_blank" rel="noopener noreferrer" className="btn btn-outline-primary">
                            Ver en GitHub
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Projects;
