import { useState } from 'react';
import { Github, Radio } from 'lucide-react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../hooks/useLanguage';
// Icons
import { TiCloudStorageOutline } from "react-icons/ti";
import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaBootstrap, FaKey, FaEnvelope, FaFileUpload, FaRegBell } from 'react-icons/fa';
import { SiTailwindcss, SiVite, SiFramer, SiNodedotjs, SiExpress, SiMongodb, SiCloudinary, SiReactrouter, SiSocketdotio } from "react-icons/si";
import { LuTabletSmartphone } from "react-icons/lu";
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
    Framer: <SiFramer />,
    Nodejs: <SiNodedotjs />,
    Express: <SiExpress />,
    MongoDB: <SiMongodb />,
    Cloudinary: <SiCloudinary />,
    ReactRouter: <SiReactrouter />,
    JWT: <FaKey />,
    Nodemailer: <FaEnvelope />,
    Multer: <FaFileUpload />,
    SweetAlert2: <FaRegBell />,
    'Socket.IO': <SiSocketdotio />,
};

const projectList = [
    {
        title: 'Nova-SetUp',
        descriptionKey: 'projects.novaSetup.desc',
        techs: ['React', 'Tailwind', 'Nodejs', 'Express', 'MongoDB', 'JWT'],
        code: 'https://github.com/LautaroLeall/Nova-Setup-Front',
        demo: 'https://nova-setup.vercel.app/',
        image: '/projects/nova-setup.png',
        category: 'Full Stack'
    },
    {
        title: 'CONFIA-CAR',
        descriptionKey: 'projects.confiaCar.desc',
        techs: ['React', 'Tailwind', 'Nodejs', 'Express', 'MongoDB', 'Socket.IO', 'JWT'],
        code: 'https://github.com/LautaroLeall/Confia-CAR-Front',
        demo: 'https://confia-car-renta.vercel.app/',
        image: '/projects/confia-car.png',
        category: 'Full Stack'
    },
    {
        title: 'Fleeswap',
        descriptionKey: 'projects.fleeswap.desc',
        techs: ['React', 'Tailwind', 'Vite', 'Nodejs', 'Express', 'MongoDB', 'Socket.IO'],
        code: 'https://github.com/BenjaZelaya/Fleeswap-Frontend',
        demo: 'https://fleeswap.vercel.app/',
        image: '/projects/fleeswap.png',
        category: 'Full Stack'
    },
    {
        title: 'MyM Decoraciones',
        descriptionKey: 'projects.mym.desc',
        techs: ['React', 'ReactRouter', 'Tailwind', 'Framer', 'Responsive'],
        code: 'https://github.com/LautaroLeall/MyM_Decoraciones',
        demo: 'https://mym-decoraciones.netlify.app/',
        image: '/projects/mym-decoraciones.png',
        category: 'Landing Pages'
    },
    {
        title: 'Levels GYM',
        descriptionKey: 'projects.levels.desc',
        techs: ['React', 'Tailwind', 'Framer', 'Responsive'],
        code: 'https://github.com/LautaroLeall/Levels-GYM',
        demo: 'https://levels-ar.netlify.app/',
        image: '/projects/levels-gym.png',
        category: 'Landing Pages'
    },
    {
        title: 'Cesar Aparicio Estilista',
        descriptionKey: 'projects.cesar.desc',
        techs: ['React', 'ReactRouter', 'Tailwind', 'Framer', 'Responsive'],
        code: 'https://github.com/LautaroLeall/Cesar_Aparicio_Estilista',
        demo: 'https://cesar-aparicio-estilista.netlify.app/',
        image: '/projects/cesar-estista.png',
        category: 'Landing Pages'
    },
    {
        title: 'BGA Habilitaciones',
        descriptionKey: 'projects.bga.desc',
        techs: ['React', 'Tailwind', 'Framer', 'Responsive'],
        code: 'https://github.com/LautaroLeall/BG-Habilitaciones',
        demo: 'https://bga-habilitaciones.netlify.app/',
        image: '/projects/bga-habilitaciones.png',
        category: 'Landing Pages'
    },
    {
        title: 'Krauft Marketing Inmobiliario',
        descriptionKey: 'projects.krauft.desc',
        techs: ['React', 'ReactRouter', 'Tailwind', 'Framer', 'Responsive'],
        code: 'https://github.com/LautaroLeall/Krauft',
        demo: 'https://krauft-marketing-inmobiliaria.netlify.app/',
        image: '/projects/krauft.png',
        category: 'Landing Pages'
    },
];

const categories = ['All', 'Full Stack', 'Landing Pages'];

const Projects = () => {
    const [filter, setFilter] = useState('All');
    const { t } = useLanguage();

    const categoryLabels = {
        'All': t('projects.categories.all'),
        'Full Stack': t('projects.categories.fullstack'),
        'Landing Pages': t('projects.categories.landing')
    };

    const filteredProjects = projectList.filter(proj =>
        filter === 'All' ? true : proj.category === filter
    );

    return (
        <div className="projects-container container py-5" id="projects" data-aos="fade-up">
            <h2 className="section-title text-center mb-4">{t('projects.title')}</h2>

            {/* Filter Buttons */}
            <div className="d-flex flex-wrap justify-content-center gap-3 mb-5">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setFilter(cat)}
                        className={`btn-filter ${filter === cat ? 'active' : ''}`}
                    >
                        {categoryLabels[cat] || cat}
                    </button>
                ))}
            </div>

            <motion.div layout className="project-grid mt-4">
                <AnimatePresence>
                    {filteredProjects.map((proj) => (
                        <motion.div
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.3 }}
                            className="project-card"
                            key={proj.title}
                        >
                            <img src={proj.image} alt={proj.title} className="project-image" />
                            <div className="overlay d-flex flex-column justify-content-center text-center p-2">
                                <h5 className="project-title">{proj.title}</h5>
                                <p className="project-description m-0">{t(proj.descriptionKey)}</p>
                                <div className="project-techs d-flex flex-wrap justify-content-center align-items-center gap-3 my-3">
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
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>
        </div>
    );
};

export default Projects;
