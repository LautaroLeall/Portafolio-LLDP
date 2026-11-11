import { useEffect, useRef } from 'react';
import { useTheme } from '../../hooks/useTheme';
import './AuroraMeshBackground.css';

const AuroraMeshBackground = ({ isLight }) => {
    const { theme } = useTheme();
    const isLightMode = isLight !== undefined ? isLight : theme === 'light';
    const containerRef = useRef(null);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        // En pantallas táctiles (iOS/Android), no registrar listener para ahorrar 100% de CPU
        if (!window.matchMedia('(pointer: fine)').matches) return;

        let rafId = null;
        const handleMouseMove = (e) => {
            if (rafId) return;
            rafId = requestAnimationFrame(() => {
                if (containerRef.current) {
                    const x = (e.clientX / window.innerWidth) * 100;
                    const y = (e.clientY / window.innerHeight) * 100;
                    containerRef.current.style.setProperty('--cursor-x', `${x}%`);
                    containerRef.current.style.setProperty('--cursor-y', `${y}%`);
                }
                rafId = null;
            });
        };

        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            if (rafId) cancelAnimationFrame(rafId);
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className={`aurora-mesh-bg ${isLightMode ? 'is-light' : 'is-dark'}`}
            aria-hidden="true"
        >
            {/* Ambient Aurora Mesh Spheres */}
            <div className="aurora-orb orb-cyan" />
            <div className="aurora-orb orb-indigo" />
            <div className="aurora-orb orb-emerald" />
            <div className="aurora-orb orb-cursor" />

            {/* Architectural Grid Overlay */}
            <div className="architectural-grid" />

            {/* Subtle Radial Vignette */}
            <div className="aurora-vignette" />
        </div>
    );
};

export default AuroraMeshBackground;
