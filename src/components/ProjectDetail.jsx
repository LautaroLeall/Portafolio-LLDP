import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import {
    X,
    ExternalLink,
    Github,
    RotateCcw,
    Monitor,
    Tablet,
    Smartphone,
    Layers,
    LayoutTemplate,
    Code2,
    Lock,
    Eye,
    Sparkles,
    Radio,
    ArrowUpRight,
    ShieldCheck
} from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import { useModal } from '../hooks/useModal';
import '../styles/projectDetail.css';

// Fixed scale level for the interactive live preview: permanently locked to 90%
const PREVIEW_SCALE = 0.9;

const ProjectDetail = ({ project, onClose, techIcons = {} }) => {
    const { t, language } = useLanguage();
    const { openModal, closeModal } = useModal();

    useEffect(() => {
        openModal();
        return () => {
            closeModal();
        };
    }, [openModal, closeModal]);
    const [iframeLoading, setIframeLoading] = useState(true);
    const [iframeKey, setIframeKey] = useState(0);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [forceEmbed, setForceEmbed] = useState(false);
    const [hasIframeError, setHasIframeError] = useState(false);

    // Track user's actual screen width to dynamically lock device preview modes
    const [windowWidth, setWindowWidth] = useState(
        typeof window !== 'undefined' ? window.innerWidth : 1200
    );

    // Responsive initial view mode & device:
    // On mobile screens (<768px), default to 'snapshot' for maximum clarity and breathing space.
    // On desktop, default to 'interactive'.
    const [viewMode, setViewMode] = useState(() => {
        if (typeof window !== 'undefined' && window.innerWidth < 768) {
            return 'snapshot';
        }
        return 'interactive';
    });

    const [device, setDevice] = useState(() => {
        if (typeof window !== 'undefined') {
            if (window.innerWidth < 768) return 'mobile';
            if (window.innerWidth < 1024) return 'tablet';
        }
        return 'desktop';
    });

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            setWindowWidth(width);
            if (width < 768) {
                setDevice('mobile');
            } else if (width < 1024) {
                setDevice((prev) => (prev === 'desktop' ? 'tablet' : prev));
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        return () => {
            window.removeEventListener('resize', handleResize);
            document.body.style.overflow = originalOverflow;
        };
    }, []);

    useEffect(() => {
        setForceEmbed(false);
        setIframeLoading(true);
        setHasIframeError(false);
    }, [project, iframeKey]);

    useEffect(() => {
        if (viewMode !== 'interactive' || !project?.demo || project?.hasFrameProtection) return;

        const timer = setTimeout(() => {
            if (iframeLoading) {
                setHasIframeError(true);
                setIframeLoading(false);
            }
        }, 12000);

        return () => clearTimeout(timer);
    }, [viewMode, project, iframeKey, iframeLoading]);

    if (!project) return null;

    const isMobileScreen = windowWidth < 768;
    const isTabletScreen = windowWidth >= 768 && windowWidth < 1024;
    const isDesktopScreen = windowWidth >= 1024;

    const handleReloadIframe = () => {
        setIframeLoading(true);
        setIframeKey((prev) => prev + 1);
    };

    const handleModalScroll = (e) => {
        const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
        const total = scrollHeight - clientHeight;
        if (total > 0) {
            setScrollProgress((scrollTop / total) * 100);
        }
    };

    const isFullStack = project.category === 'Full Stack';
    const features = t(project.featuresKey);
    const featureList = Array.isArray(features) ? features : [];
    const shouldShowFallback = (project.hasFrameProtection && !forceEmbed) || hasIframeError;

    if (typeof document === 'undefined') return null;

    return createPortal(
        <AnimatePresence>
            {/* Modal Backdrop: NO onClick={onClose} here so clicking outside will NOT close the modal! Only the X button closes it. */}
            <div className="project-detail-backdrop" role="dialog" aria-modal="true">
                <motion.div
                    className="project-detail-modal"
                    initial={{ opacity: 0, scale: 0.94, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 16 }}
                    transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                >
                    {/* Synchronized Scroll Progress Bar matching the main page */}
                    <div
                        className="modal-scroll-progress-bar"
                        style={{ width: `${scrollProgress}%` }}
                    />

                    {/* Top Modal Header Bar */}
                    <div className="modal-header-bar">
                        <div className="d-flex align-items-center gap-2 flex-wrap">
                            <span className={`modal-category-pill ${isFullStack ? 'pill-fullstack' : 'pill-landing'}`}>
                                {isFullStack ? (
                                    <>
                                        <Layers size={13} className="me-1" />
                                        <span>Full Stack</span>
                                    </>
                                ) : (
                                    <>
                                        <LayoutTemplate size={13} className="me-1" />
                                        <span>Landing Page</span>
                                    </>
                                )}
                            </span>
                            {project.inProgress && (
                                <span className="modal-in-progress-pill">
                                    <span className="progress-beacon">
                                        <span className="progress-ping" />
                                        <span className="progress-dot" />
                                    </span>
                                    <span>{language === 'es' ? 'En Proceso' : 'In Progress'}</span>
                                </span>
                            )}
                            <h4 className="modal-project-title m-0">{project.title}</h4>
                        </div>

                        {/* Explicit X Close Button */}
                        <button
                            type="button"
                            className="modal-close-btn"
                            onClick={onClose}
                            aria-label={t('projects.detail.close') || 'Cerrar'}
                            title={t('projects.detail.close') || 'Cerrar'}
                        >
                            <X size={22} />
                        </button>
                    </div>

                    <div className="modal-body-scrollable" onScroll={handleModalScroll}>
                        {/* Enlarged Interactive Sandbox Viewport */}
                        <div className="interactive-sandbox-wrapper mb-4 mb-md-5">
                            {/* Browser Mockup Header Bar */}
                            <div className="browser-mockup-header">
                                {/* Traffic Lights: Red closes, Yellow toggles snapshot, Green opens live */}
                                <div className="browser-traffic-lights">
                                    <span className="traffic-dot dot-red" onClick={onClose} title={t('projects.detail.close')} />
                                    <span
                                        className="traffic-dot dot-yellow"
                                        onClick={() => setViewMode((m) => (m === 'interactive' ? 'snapshot' : 'interactive'))}
                                        title={viewMode === 'interactive' ? t('projects.detail.visualSnapshot') : t('projects.detail.exploreInteractive')}
                                    />
                                    <span
                                        className="traffic-dot dot-green"
                                        onClick={() => window.open(project.demo, '_blank')}
                                        title={t('projects.detail.visitSite')}
                                    />
                                </div>

                                {/* URL Bar */}
                                <div className="browser-url-bar">
                                    <Lock size={12} className="text-success shrink-0" />
                                    <span className="browser-url-text">
                                        {project.demo ? project.demo.replace(/^https?:\/\//, '') : project.title}
                                    </span>
                                    {project.hasFrameProtection && !forceEmbed && (
                                        <span className="browser-security-badge ms-auto shrink-0" title="X-Frame-Options Protected">
                                            <ShieldCheck size={12} className="text-primary me-1" />
                                            <span>Secure</span>
                                        </span>
                                    )}
                                </div>

                                {/* Controls: Mode Selector & Responsive Device Toggles */}
                                <div className="browser-controls-group">
                                    {/* View Mode Toggle */}
                                    <div className="view-mode-toggle">
                                        <button
                                            type="button"
                                            className={`mode-btn ${viewMode === 'interactive' ? 'active' : ''}`}
                                            onClick={() => setViewMode('interactive')}
                                            title={t('projects.detail.exploreInteractive')}
                                        >
                                            <Sparkles size={13} />
                                            <span>{language === 'es' ? 'Interactivo' : 'Live'}</span>
                                        </button>
                                        <button
                                            type="button"
                                            className={`mode-btn ${viewMode === 'snapshot' ? 'active' : ''}`}
                                            onClick={() => setViewMode('snapshot')}
                                            title={t('projects.detail.visualSnapshot')}
                                        >
                                            <Eye size={13} />
                                            <span>{language === 'es' ? 'Captura' : 'Snapshot'}</span>
                                        </button>
                                    </div>

                                    {/* Smart Device Toggles based on real screen width */}
                                    {viewMode === 'interactive' && (
                                        <>
                                            {isMobileScreen && (
                                                <div className="device-locked-pill">
                                                    <Smartphone size={13} className="text-primary" />
                                                    <span>Móvil</span>
                                                    <button
                                                        type="button"
                                                        className="device-btn reload-btn ms-1"
                                                        onClick={handleReloadIframe}
                                                        title={t('projects.detail.reload')}
                                                    >
                                                        <RotateCcw size={13} className={iframeLoading ? 'spin-anim' : ''} />
                                                    </button>
                                                </div>
                                            )}

                                            {isTabletScreen && (
                                                <div className="device-toggle-group">
                                                    <button
                                                        type="button"
                                                        className={`device-btn ${device === 'tablet' ? 'active' : ''}`}
                                                        onClick={() => setDevice('tablet')}
                                                        title={t('projects.detail.deviceTablet')}
                                                    >
                                                        <Tablet size={15} />
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className={`device-btn ${device === 'mobile' ? 'active' : ''}`}
                                                        onClick={() => setDevice('mobile')}
                                                        title={t('projects.detail.deviceMobile')}
                                                    >
                                                        <Smartphone size={15} />
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className="device-btn reload-btn"
                                                        onClick={handleReloadIframe}
                                                        title={t('projects.detail.reload')}
                                                    >
                                                        <RotateCcw size={14} className={iframeLoading ? 'spin-anim' : ''} />
                                                    </button>
                                                </div>
                                            )}

                                            {isDesktopScreen && (
                                                <div className="device-toggle-group">
                                                    <button
                                                        type="button"
                                                        className={`device-btn ${device === 'desktop' ? 'active' : ''}`}
                                                        onClick={() => setDevice('desktop')}
                                                        title={t('projects.detail.deviceDesktop')}
                                                    >
                                                        <Monitor size={15} />
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className={`device-btn ${device === 'tablet' ? 'active' : ''}`}
                                                        onClick={() => setDevice('tablet')}
                                                        title={t('projects.detail.deviceTablet')}
                                                    >
                                                        <Tablet size={15} />
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className={`device-btn ${device === 'mobile' ? 'active' : ''}`}
                                                        onClick={() => setDevice('mobile')}
                                                        title={t('projects.detail.deviceMobile')}
                                                    >
                                                        <Smartphone size={15} />
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className="device-btn reload-btn"
                                                        onClick={handleReloadIframe}
                                                        title={t('projects.detail.reload')}
                                                    >
                                                        <RotateCcw size={14} className={iframeLoading ? 'spin-anim' : ''} />
                                                    </button>
                                                </div>
                                            )}
                                        </>
                                    )}
                                </div>
                            </div>

                            {/* Viewport Stage */}
                            <div className="browser-viewport-stage">
                                {viewMode === 'interactive' && project.demo ? (
                                    <div className={`sandbox-frame-container device-${device}`}>
                                        {shouldShowFallback ? (
                                            /* High-End Protected Production Showcase (Avoids Chrome's connection refused error or server downtime) */
                                            <div className="protected-preview-wrapper">
                                                <div className="snapshot-preview-container protected-snapshot">
                                                    <picture className="snapshot-picture">
                                                        {project.imageMobile && (
                                                            <source media="(max-width: 768px)" srcSet={project.imageMobile} />
                                                        )}
                                                        <img
                                                            src={project.image}
                                                            alt={project.title}
                                                            className="snapshot-image"
                                                            loading="lazy"
                                                        />
                                                    </picture>
                                                </div>
                                                <div className="protected-overlay-backdrop">
                                                    <div className="protected-overlay-card">
                                                        <div className="protected-badge-row">
                                                            <span className="live-status-pill">
                                                                <span className="live-beacon" />
                                                                <span>
                                                                    {hasIframeError
                                                                        ? (language === 'es' ? 'Despliegue Protegido' : 'Protected Deployment')
                                                                        : (language === 'es' ? 'Servidor Activo' : 'Live Production')}
                                                                </span>
                                                            </span>
                                                            <span className="security-pill">
                                                                <ShieldCheck size={13} />
                                                                <span>{hasIframeError ? (language === 'es' ? 'Seguridad / Fallback' : 'Fallback Mode') : 'X-Frame-Options'}</span>
                                                            </span>
                                                        </div>

                                                        <h5 className="protected-title">
                                                            {hasIframeError
                                                                ? (language === 'es' ? 'Vista Previa en Entorno Seguro' : 'Secure Environment Preview')
                                                                : (language === 'es' ? 'Aplicación en Producción Protegida' : 'Protected Production Web App')}
                                                        </h5>

                                                        <p className="protected-desc">
                                                            {hasIframeError
                                                                ? (language === 'es'
                                                                    ? 'La aplicación se ejecuta en su propio entorno seguro o el servidor está en reposo. Puedes abrirla en pantalla completa o explorar la vista previa.'
                                                                    : 'The application runs in its own secure environment or the server is in standby. You can launch it in full screen or inspect the preview.')
                                                                : t('projects.detail.protectedDesc')}
                                                        </p>

                                                        <div className="protected-actions-row">
                                                            <a
                                                                href={project.demo}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="btn-launch-protected"
                                                            >
                                                                <ExternalLink size={16} />
                                                                <span>{t('projects.detail.launchLive')}</span>
                                                                <ArrowUpRight size={16} />
                                                            </a>

                                                            <button
                                                                type="button"
                                                                className="btn-force-embed"
                                                                onClick={() => {
                                                                    setHasIframeError(false);
                                                                    setForceEmbed(true);
                                                                    handleReloadIframe();
                                                                }}
                                                                title={t('projects.detail.tryEmbed')}
                                                            >
                                                                <RotateCcw size={13} />
                                                                <span>{hasIframeError ? (language === 'es' ? 'Reintentar Carga' : 'Retry Loading') : t('projects.detail.tryEmbed')}</span>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            <>
                                                {iframeLoading && (
                                                    <div className="iframe-loader-overlay">
                                                        <div className="spinner-border iframe-loader-spinner" role="status" />
                                                        <span className="iframe-loader-text">
                                                            {language === 'es' ? 'Cargando app interactiva...' : 'Loading interactive app...'}
                                                        </span>
                                                    </div>
                                                )}
                                                {/* Fixed 90% Scale Wrapper permanently locked */}
                                                <div
                                                    className="sandbox-scale-wrapper"
                                                    style={{
                                                        width: '111.111%',
                                                        height: '111.111%',
                                                        transform: `scale(${PREVIEW_SCALE})`,
                                                        transformOrigin: 'top left'
                                                    }}
                                                >
                                                    <iframe
                                                        key={iframeKey}
                                                        src={project.demo}
                                                        title={project.title}
                                                        className="sandbox-iframe"
                                                        onLoad={() => {
                                                            setIframeLoading(false);
                                                            setHasIframeError(false);
                                                        }}
                                                        onError={() => {
                                                            setHasIframeError(true);
                                                            setIframeLoading(false);
                                                        }}
                                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                        sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                                                    />
                                                </div>
                                            </>
                                        )}
                                    </div>
                                ) : (
                                    /* Scrollable snapshot preview container: enables scrolling the full page screenshot */
                                    <div className="snapshot-preview-container">
                                        <picture className="snapshot-picture">
                                            {project.imageMobile && (
                                                <source media="(max-width: 768px)" srcSet={project.imageMobile} />
                                            )}
                                            <img
                                                src={project.image}
                                                alt={project.title}
                                                className="snapshot-image"
                                                loading="lazy"
                                            />
                                        </picture>
                                    </div>
                                )}
                            </div>

                            {/* Interactive Tip Banner */}
                            <div className="sandbox-notice-banner">
                                <div className="d-flex align-items-center justify-content-between flex-wrap gap-2">
                                    {shouldShowFallback ? (
                                        <div className="d-flex align-items-center gap-2">
                                            <ShieldCheck size={15} className="text-primary shrink-0" />
                                            <span>
                                                {language === 'es'
                                                    ? 'Vista previa asegurada • Puedes hacer scroll en la pantalla o abrir la app completa.'
                                                    : 'Secure preview • Scroll through the mockup or launch the full application.'}
                                            </span>
                                        </div>
                                    ) : (
                                        <div className="d-flex align-items-center gap-2">
                                            <Radio size={14} className="text-success live-pulse-icon shrink-0" />
                                            <span>{t('projects.detail.interactiveNotice')}</span>
                                        </div>
                                    )}
                                    {project.demo && (
                                        <a
                                            href={project.demo}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="sandbox-direct-link"
                                        >
                                            <span>{language === 'es' ? 'Abrir en pestaña nueva' : 'Open in new tab'}</span>
                                            <ArrowUpRight size={13} />
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Project Technical Dossier & Narrative (Natural Editorial Layout - Zero Heavy Cards) */}
                        <div className="project-editorial-dossier">
                            {/* Dossier Header & Description */}
                            <div className="editorial-overview-header">
                                <div className="detail-editorial-eyebrow mb-2">
                                    <span className="eyebrow-line" />
                                    <span>{language === 'es' ? 'Ficha Técnica & Arquitectura' : 'Technical Dossier & Architecture'}</span>
                                </div>
                                <h4 className="editorial-overview-title mb-3">
                                    {language === 'es' ? 'Sobre el Proyecto' : 'About the Project'}
                                </h4>
                                <p className="editorial-overview-desc">
                                    {t(project.longDescKey) || t(project.descriptionKey)}
                                </p>
                            </div>

                            {/* Fine Editorial Divider */}
                            <div className="editorial-content-divider" />

                            {/* 2-Column Unboxed Content Stream */}
                            <div className="detail-editorial-columns">
                                {/* Left Column: Key Engineering Highlights */}
                                {featureList.length > 0 && (
                                    <div className="editorial-col-features">
                                        <div className="editorial-col-header mb-3">
                                            <Sparkles size={16} className="text-primary me-2" />
                                            <h5 className="editorial-col-title m-0">
                                                {t('projects.detail.featuresTitle')}
                                            </h5>
                                        </div>

                                        <div className="editorial-features-stream">
                                            {featureList.map((feat, idx) => (
                                                <div key={idx} className="editorial-feature-row">
                                                    <span className="feature-number">
                                                        {String(idx + 1).padStart(2, '0')}
                                                    </span>
                                                    <span className="feature-text">{feat}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Right Column: Tech Stack & Project Specs */}
                                <div className="editorial-col-meta">
                                    {/* Tech Stack Cluster */}
                                    <div className="editorial-tech-section mb-4">
                                        <div className="editorial-col-header mb-3">
                                            <Code2 size={16} className="text-primary me-2" />
                                            <h5 className="editorial-col-title m-0">
                                                {t('projects.detail.techTitle')}
                                            </h5>
                                        </div>
                                        <div className="editorial-tech-cluster">
                                            {project.techs.map((tech, idx) => (
                                                <div className="editorial-tech-tag" key={idx}>
                                                    <span className="tech-tag-icon">{techIcons[tech]}</span>
                                                    <span className="tech-tag-name">{tech}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Project Quick Specs Directory */}
                                    <div className="editorial-specs-list">
                                        <div className="editorial-spec-row">
                                            <span className="spec-label">
                                                {language === 'es' ? 'Categoría' : 'Category'}
                                            </span>
                                            <span className="spec-value">
                                                {isFullStack ? 'Full Stack Application' : 'High-Conversion Landing'}
                                            </span>
                                        </div>
                                        <div className="editorial-spec-row">
                                            <span className="spec-label">
                                                {language === 'es' ? 'Estado' : 'Status'}
                                            </span>
                                            {project.inProgress ? (
                                                <span className="spec-value in-progress-spec">
                                                    <span className="spec-progress-beacon">
                                                        <span className="spec-progress-ping" />
                                                        <span className="spec-progress-dot" />
                                                    </span>
                                                    {language === 'es' ? 'En Desarrollo Activo' : 'Active Development (WIP)'}
                                                </span>
                                            ) : (
                                                <span className="spec-value live-spec">
                                                    <span className="spec-live-dot" />
                                                    {language === 'es' ? 'Producción Activa' : 'Live Production'}
                                                </span>
                                            )}
                                        </div>
                                        <div className="editorial-spec-row">
                                            <span className="spec-label">
                                                {language === 'es' ? 'Desarrollo' : 'Engineering & UI'}
                                            </span>
                                            <span className="spec-value">Lautaro Leal Del Prete</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Unboxed Action Dock */}
                            <div className="editorial-actions-dock">
                                {project.demo && (
                                    <a
                                        href={project.demo}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn-editorial-action btn-editorial-demo"
                                    >
                                        <div className="d-flex align-items-center gap-2">
                                            <ExternalLink size={18} />
                                            <span>{t('projects.detail.visitSite')}</span>
                                        </div>
                                        <ArrowUpRight size={18} className="btn-arrow-icon" />
                                    </a>
                                )}

                                {project.code && (
                                    <a
                                        href={project.code}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn-editorial-action btn-editorial-code"
                                    >
                                        <div className="d-flex align-items-center gap-2">
                                            <Github size={18} />
                                            <span>
                                                {project.codeBack
                                                    ? (language === 'es' ? 'Repo Frontend' : 'Frontend Repo')
                                                    : t('projects.detail.viewCode')}
                                            </span>
                                        </div>
                                        <ArrowUpRight size={18} className="btn-arrow-icon" />
                                    </a>
                                )}

                                {project.codeBack && (
                                    <a
                                        href={project.codeBack}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn-editorial-action btn-editorial-code"
                                    >
                                        <div className="d-flex align-items-center gap-2">
                                            <Github size={18} />
                                            <span>
                                                {language === 'es' ? 'Repo Backend' : 'Backend Repo'}
                                            </span>
                                        </div>
                                        <ArrowUpRight size={18} className="btn-arrow-icon" />
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>,
        document.body
    );
};

export default ProjectDetail;
