import { useState } from 'react';
import { Eye, Layers, LayoutTemplate, Boxes } from 'lucide-react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../hooks/useLanguage';
import ProjectDetail from './ProjectDetail';
// Icons
import { TiCloudStorageOutline } from "react-icons/ti";
import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaBootstrap, FaKey, FaEnvelope, FaFileUpload, FaRegBell, FaWhatsapp } from 'react-icons/fa';
import { SiTailwindcss, SiVite, SiFramer, SiNodedotjs, SiExpress, SiMongodb, SiCloudinary, SiReactrouter, SiSocketdotio, SiSupabase, SiPostgresql, SiZod, SiDeno, SiMercadopago, SiGoogle } from "react-icons/si";
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
    Supabase: <SiSupabase />,
    PostgreSQL: <SiPostgresql />,
    Zod: <SiZod />,
    Deno: <SiDeno />,
    Zustand: <Boxes />,
    Vite: <SiVite />,
    'Mercado Pago': <SiMercadopago />,
    'Google OAuth': <SiGoogle />,
    EmailJS: <FaEnvelope color="#ff7849" />,
    WhatsApp: <FaWhatsapp color="#25D366" />
};

const projectList = [
    {
        title: 'Club Natación y Gimnasia',
        descriptionKey: 'projects.nyg.desc',
        longDescKey: 'projects.nyg.longDesc',
        featuresKey: 'projects.nyg.features',
        techs: ['React', 'Tailwind', 'Nodejs', 'Express', 'MongoDB', 'Cloudinary', 'JWT', 'Zustand', 'Zod'],
        code: 'https://github.com/LautaroLeall/NYG-Front',
        codeBack: 'https://github.com/LautaroLeall/NYG-Back',
        demo: 'https://natacionygimanacia.vercel.app/',
        image: '/projects/nyg.png',
        imageMobile: '/projects-mobile/nyg.png',
        category: 'Full Stack',
        inProgress: true
    },
    {
        title: 'NutriOliva',
        descriptionKey: 'projects.nutrioliva.desc',
        longDescKey: 'projects.nutrioliva.longDesc',
        featuresKey: 'projects.nutrioliva.features',
        techs: ['React', 'Tailwind', 'Supabase', 'PostgreSQL', 'JWT', 'Deno'],
        code: 'https://github.com/LautaroLeall/NutriOliva-Front',
        codeBack: 'https://github.com/LautaroLeall/NutriOliva-Back',
        demo: 'https://nutri-oliva.vercel.app/',
        image: '/projects/nutrioliva.png',
        imageMobile: '/projects-mobile/nutrioliva.png',
        category: 'Full Stack',
        inProgress: true
    },
    {
        title: 'Nova-SetUp',
        descriptionKey: 'projects.novaSetup.desc',
        longDescKey: 'projects.novaSetup.longDesc',
        featuresKey: 'projects.novaSetup.features',
        techs: ['React', 'Tailwind', 'Framer', 'Nodejs', 'Express', 'MongoDB', 'Cloudinary', 'JWT', 'Vite'],
        code: 'https://github.com/LautaroLeall/Nova-Setup-Front',
        codeBack: 'https://github.com/LautaroLeall/Nova-Setup-Back',
        demo: 'https://nova-setup.vercel.app/',
        image: '/projects/nova-setup.png',
        imageMobile: '/projects-mobile/nova-setup.png',
        category: 'Full Stack'
    },
    {
        title: 'CONFIA-CAR',
        descriptionKey: 'projects.confiaCar.desc',
        longDescKey: 'projects.confiaCar.longDesc',
        featuresKey: 'projects.confiaCar.features',
        techs: ['React', 'Nodejs', 'Express', 'MongoDB', 'Socket.IO', 'Mercado Pago', 'Google OAuth', 'JWT', 'Vite'],
        code: 'https://github.com/LautaroLeall/Confia-CAR-Front',
        codeBack: 'https://github.com/LautaroLeall/Confia-CAR-Back',
        demo: 'https://confia-car-rent.vercel.app/',
        image: '/projects/confia-car.png',
        imageMobile: '/projects-mobile/confia-car.png',
        category: 'Full Stack'
    },
    {
        title: 'Fleeswap',
        descriptionKey: 'projects.fleeswap.desc',
        longDescKey: 'projects.fleeswap.longDesc',
        featuresKey: 'projects.fleeswap.features',
        techs: ['React', 'Tailwind', 'Zustand', 'Nodejs', 'Express', 'MongoDB', 'Socket.IO', 'Cloudinary', 'JWT'],
        code: 'https://github.com/BenjaZelaya/Fleeswap-Frontend',
        codeBack: 'https://github.com/STCzao/fleeswap-backend',
        demo: 'https://fleeswap.vercel.app/',
        image: '/projects/fleeswap.png',
        imageMobile: '/projects-mobile/fleeswap.png',
        category: 'Full Stack'
    },
    {
        title: 'Servicios Web LLDP',
        descriptionKey: 'projects.servicios.desc',
        longDescKey: 'projects.servicios.longDesc',
        featuresKey: 'projects.servicios.features',
        techs: ['React', 'Tailwind', 'Framer', 'EmailJS', 'Responsive', 'Vite'],
        code: 'https://github.com/LautaroLeall/Servicios-LLDP',
        demo: 'https://servicios-lldp.vercel.app/',
        image: '/projects/mis-servicios.png',
        imageMobile: '/projects-mobile/mis-servicios.png',
        category: 'Landing'
    },
    {
        title: 'MyM Decoraciones',
        descriptionKey: 'projects.mym.desc',
        longDescKey: 'projects.mym.longDesc',
        featuresKey: 'projects.mym.features',
        techs: ['React', 'ReactRouter', 'Tailwind', 'Framer', 'Responsive'],
        code: 'https://github.com/LautaroLeall/MyM_Decoraciones',
        demo: 'https://mym-decoraciones.netlify.app/',
        image: '/projects/mym-decoraciones.png',
        imageMobile: '/projects-mobile/mym-decoraciones.png',
        category: 'Landing'
    },
    {
        title: 'Levels GYM',
        descriptionKey: 'projects.levels.desc',
        longDescKey: 'projects.levels.longDesc',
        featuresKey: 'projects.levels.features',
        techs: ['React', 'Tailwind', 'Framer', 'Responsive'],
        code: 'https://github.com/LautaroLeall/Levels-GYM',
        demo: 'https://levels-ar.netlify.app/',
        image: '/projects/levels-gym.png',
        imageMobile: '/projects-mobile/levels-gym.png',
        category: 'Landing'
    },
    {
        title: 'Cesar Aparicio Estilista',
        descriptionKey: 'projects.cesar.desc',
        longDescKey: 'projects.cesar.longDesc',
        featuresKey: 'projects.cesar.features',
        techs: ['React', 'ReactRouter', 'Tailwind', 'Framer', 'Responsive'],
        code: 'https://github.com/LautaroLeall/Cesar_Aparicio_Estilista',
        demo: 'https://cesar-aparicio-estilista.netlify.app/',
        image: '/projects/cesar-estista.png',
        imageMobile: '/projects-mobile/cesar-estista.png',
        category: 'Landing'
    },
    {
        title: 'BGA Habilitaciones',
        descriptionKey: 'projects.bga.desc',
        longDescKey: 'projects.bga.longDesc',
        featuresKey: 'projects.bga.features',
        techs: ['React', 'Tailwind', 'Framer', 'Responsive'],
        code: 'https://github.com/LautaroLeall/BG-Habilitaciones',
        demo: 'https://bga-habilitaciones.netlify.app/',
        image: '/projects/bga-habilitaciones.png',
        imageMobile: '/projects-mobile/bga-habilitaciones.png',
        category: 'Landing'
    },
    {
        title: 'Krauft Marketing Inmobiliario',
        descriptionKey: 'projects.krauft.desc',
        longDescKey: 'projects.krauft.longDesc',
        featuresKey: 'projects.krauft.features',
        techs: ['React', 'ReactRouter', 'Tailwind', 'Framer', 'Responsive'],
        code: 'https://github.com/LautaroLeall/Krauft',
        demo: 'https://krauft-marketing-inmobiliaria.netlify.app/',
        image: '/projects/krauft.png',
        imageMobile: '/projects-mobile/krauft.png',
        category: 'Landing'
    },
];

const categories = ['All', 'Full Stack', 'Landing'];

const Projects = () => {
    const [filter, setFilter] = useState('All');
    const [selectedProject, setSelectedProject] = useState(null);
    const { t, language } = useLanguage();

    const categoryLabels = {
        'All': t('projects.categories.all'),
        'Full Stack': t('projects.categories.fullstack'),
        'Landing': t('projects.categories.landing')
    };

    const counts = {
        'All': projectList.length,
        'Full Stack': projectList.filter(p => p.category === 'Full Stack').length,
        'Landing': projectList.filter(p => p.category === 'Landing').length,
    };

    const filteredProjects = projectList.filter(proj =>
        filter === 'All' ? true : proj.category === filter
    );

    return (
        <section className="projects-container container py-5">
            {/* Encabezado Editorial Abierto (Sin cajas pesadas) */}
            <div className="projects-editorial-header mb-4 mb-md-5">
                <motion.div
                    className="editorial-eyebrow mb-2"
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                >
                    <span className="eyebrow-line" />
                    <span>{t('projects.title')}</span>
                </motion.div>

                <motion.h2
                    className="editorial-lead-title"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >
                    {language === 'es'
                        ? 'Aplicaciones Full Stack y experiencias web interactivas diseñadas con foco en arquitectura, rendimiento y producto.'
                        : 'Full Stack applications and interactive web experiences engineered for performance, clean architecture, and product impact.'}
                </motion.h2>

                <motion.p
                    className="projects-editorial-desc"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.15 }}
                >
                    {t('projects.subtitle')}
                </motion.p>
            </div>

            {/* Barra de Filtros & Control Editorial */}
            <div className="projects-filter-toolbar mb-4 mb-md-5">
                <div className="projects-status-indicator">
                    <span className="projects-beacon-dot" />
                    <span className="projects-status-text">
                        {language === 'es'
                            ? `${projectList.length} Proyectos en Producción`
                            : `${projectList.length} Production Projects`}
                    </span>
                </div>

                <div className="filter-nav-pill-container">
                    {categories.map((cat) => {
                        const isActive = filter === cat;
                        return (
                            <button
                                key={cat}
                                onClick={() => setFilter(cat)}
                                className={`filter-tab-btn ${isActive ? 'active' : ''}`}
                                type="button"
                            >
                                {isActive && (
                                    <motion.div
                                        layoutId="activeFilterPill"
                                        className="filter-active-indicator"
                                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                                    />
                                )}
                                <span className="filter-tab-label">{categoryLabels[cat] || cat}</span>
                                <span className="filter-tab-count">{counts[cat]}</span>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Grid of Projects with Scroll Appear/Disappear Animation */}
            <motion.div layout className="project-grid">
                <AnimatePresence mode="popLayout">
                    {filteredProjects.map((proj, idx) => (
                        <motion.div
                            layout
                            key={proj.title}
                            initial={{ opacity: 0, y: 55, scale: 0.94 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            viewport={{ once: false, amount: 0.15 }}
                            transition={{
                                duration: 0.55,
                                ease: [0.25, 0.1, 0.25, 1.0],
                                delay: (idx % 2) * 0.08
                            }}
                            className="project-card"
                            onClick={() => setSelectedProject(proj)}
                        >
                            {/* Card Top Badges with Clean SVG Icons & In-Progress Beacon */}
                            <div className="card-top-badges">
                                <span className={`category-tag ${proj.category === 'Full Stack' ? 'tag-fullstack' : 'tag-landing'}`}>
                                    {proj.category === 'Full Stack' ? (
                                        <>
                                            <Layers size={12} className="me-1" />
                                            <span>Full Stack</span>
                                        </>
                                    ) : (
                                        <>
                                            <LayoutTemplate size={12} className="me-1" />
                                            <span>Landing</span>
                                        </>
                                    )}
                                </span>

                                <div className="card-status-badges-group">
                                    {proj.inProgress ? (
                                        <span className="in-progress-pill" title={language === 'es' ? 'Proyecto en Desarrollo' : 'Work in Progress'}>
                                            <span className="progress-beacon">
                                                <span className="progress-ping" />
                                                <span className="progress-dot" />
                                            </span>
                                            <span className="progress-text">{language === 'es' ? 'En Proceso' : 'In Progress'}</span>
                                        </span>
                                    ) : proj.demo ? (
                                        <span className="live-status-pill">
                                            <span className="live-dot" />
                                            <span>Live</span>
                                        </span>
                                    ) : null}
                                </div>
                            </div>

                            {/* Project Image */}
                            <div className="project-image-wrapper">
                                <img
                                    src={proj.image}
                                    alt={proj.title}
                                    className="project-image"
                                    loading="lazy"
                                    decoding="async"
                                />
                                <div className="image-overlay-vignette" />
                            </div>

                            {/* Interactive Hover Content Surface */}
                            {/* Interactive Hover Content: Only Project Title & View Details Button */}
                            <div className="overlay d-flex flex-column justify-content-center align-items-center text-center p-4">
                                <h4 className="project-title mb-3">{proj.title}</h4>

                                <button
                                    type="button"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setSelectedProject(proj);
                                    }}
                                    className="btn-project-action btn-inspect px-4 py-2"
                                >
                                    <Eye size={17} />
                                    <span>{t('projects.detail.viewDetails') || 'Ver Detalle'}</span>
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>

            {/* Interactive Project Detail Modal */}
            {selectedProject && (
                <ProjectDetail
                    project={selectedProject}
                    onClose={() => setSelectedProject(null)}
                    techIcons={techIcons}
                />
            )}
        </section>
    );
};

export default Projects;
