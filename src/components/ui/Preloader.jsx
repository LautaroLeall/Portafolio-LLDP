import { useState, useEffect, useRef, useCallback } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { useLanguage } from '../../hooks/useLanguage';
import '../../styles/preloader.css';

const Preloader = ({ onComplete }) => {
    const { t } = useLanguage();
    const canvasRef = useRef(null);
    const [progress, setProgress] = useState(0);

    const completedRef = useRef(false);
    const handleFinish = useCallback(() => {
        if (completedRef.current) return;
        completedRef.current = true;
        if (onComplete) {
            onComplete();
        }
    }, [onComplete]);

    // 1. Subtle Background Particle Canvas
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId;
        let width = (canvas.width = window.innerWidth);
        let height = (canvas.height = window.innerHeight);

        const handleResize = () => {
            if (!canvas) return;
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        };
        window.addEventListener('resize', handleResize);

        // Spawn 45 subtle cyber nodes
        const particleCount = Math.min(Math.floor((width * height) / 24000), 55);
        const particles = Array.from({ length: particleCount }, () => ({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            radius: Math.random() * 1.8 + 1,
            baseAlpha: Math.random() * 0.3 + 0.2
        }));

        const mouse = { x: -1000, y: -1000, active: false };

        const handlePointerMove = (e) => {
            const clientX = e.clientX || (e.touches && e.touches[0]?.clientX);
            const clientY = e.clientY || (e.touches && e.touches[0]?.clientY);
            if (clientX !== undefined && clientY !== undefined) {
                mouse.x = clientX;
                mouse.y = clientY;
                mouse.active = true;
            }
        };

        window.addEventListener('mousemove', handlePointerMove);
        window.addEventListener('touchmove', handlePointerMove, { passive: true });

        const render = () => {
            ctx.clearRect(0, 0, width, height);

            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];

                if (mouse.active) {
                    const dx = p.x - mouse.x;
                    const dy = p.y - mouse.y;
                    const dist = Math.hypot(dx, dy);
                    if (dist < 120 && dist > 0) {
                        const force = ((120 - dist) / 120) * 2.5;
                        p.vx += (dx / dist) * force * 0.1;
                        p.vy += (dy / dist) * force * 0.1;
                    }
                }

                p.x += p.vx;
                p.y += p.vy;
                p.vx *= 0.98;
                p.vy *= 0.98;

                if (p.x < 0 || p.x > width) p.vx *= -1;
                if (p.y < 0 || p.y > height) p.vy *= -1;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(0, 240, 255, ${p.baseAlpha})`;
                ctx.fill();

                for (let j = i + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const pDist = Math.hypot(p.x - p2.x, p.y - p2.y);
                    if (pDist < 100) {
                        const lineAlpha = (1 - pDist / 100) * 0.22;
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.strokeStyle = `rgba(0, 240, 255, ${lineAlpha})`;
                        ctx.lineWidth = 0.8;
                        ctx.stroke();
                    }
                }
            }

            animationFrameId = requestAnimationFrame(render);
        };

        animationFrameId = requestAnimationFrame(render);

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handlePointerMove);
            window.removeEventListener('touchmove', handlePointerMove);
        };
    }, []);

    // 2. Realistic Terminal Boot Progress Progression
    useEffect(() => {
        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        const startTime = performance.now();
        const duration = 1350; // 1.35 seconds
        let animationFrameId;

        const handleTick = (currentTime) => {
            const elapsed = currentTime - startTime;
            const ratio = Math.min(elapsed / duration, 1);

            const eased = 1 - Math.pow(1 - ratio, 3);
            const val = Math.min(Math.round(eased * 100), 100);
            setProgress(val);

            if (ratio < 1) {
                animationFrameId = requestAnimationFrame(handleTick);
            } else {
                const exitTimer = setTimeout(() => {
                    handleFinish();
                }, 260);
                return () => clearTimeout(exitTimer);
            }
        };

        animationFrameId = requestAnimationFrame(handleTick);

        return () => {
            cancelAnimationFrame(animationFrameId);
            document.body.style.overflow = prevOverflow;
        };
    }, [handleFinish]);

    return (
        <motion.div
            className="terminal-preloader-backdrop"
            initial={{ opacity: 1 }}
            exit={{
                opacity: 0,
                scale: 1.02,
                filter: 'blur(6px)',
                transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] }
            }}
            aria-live="polite"
            aria-label="Cargando portafolio de Lautaro Leal Del Prete"
        >
            {/* Subtle Reactive Particle Canvas */}
            <canvas ref={canvasRef} className="terminal-interactive-canvas" />

            {/* Developer Terminal Window */}
            <div className="terminal-window">
                {/* Titlebar with native macOS / Unix window buttons */}
                <div className="terminal-titlebar">
                    <div className="terminal-dots">
                        <span className="terminal-dot dot-close" />
                        <span className="terminal-dot dot-min" />
                        <span className="terminal-dot dot-max" />
                    </div>

                    <span className="terminal-window-title">
                        {t('preloader.windowTitle')}
                    </span>

                    <div className="terminal-titlebar-spacer" />
                </div>

                {/* Console Terminal Body */}
                <div className="terminal-body">
                    {/* Prompt command line */}
                    <div className="terminal-prompt-line">
                        <span className="term-prompt-user">lldp@system:~$</span>
                        <span className="term-prompt-cmd">{t('preloader.command')}</span>
                    </div>

                    {/* System info block */}
                    <div className="terminal-info-block">
                        <div className="term-info-row">
                            <span className="term-info-tag">[info]</span>
                            <span>{t('preloader.role')}</span>
                        </div>
                        <div className="term-info-row">
                            <span className="term-info-tag">[info]</span>
                            <span>{t('preloader.stack')}</span>
                        </div>
                    </div>

                    {/* Step-by-step compilation log */}
                    <div className="terminal-log-stream">
                        <div className="terminal-log-item">
                            <span className="term-check">✔</span>
                            <span>{t('preloader.step1')}</span>
                            <span className="term-status-ok">[OK]</span>
                        </div>

                        {progress >= 35 && (
                            <div className="terminal-log-item">
                                <span className="term-check">✔</span>
                                <span>{t('preloader.step2')}</span>
                                <span className="term-status-ok">[OK]</span>
                            </div>
                        )}

                        {progress >= 70 && (
                            <div className="terminal-log-item">
                                <span className="term-check">✔</span>
                                <span>{t('preloader.step3')}</span>
                                <span className={progress >= 95 ? 'term-status-ok' : 'term-status-spin'}>
                                    {progress >= 95 ? '[OK]' : '...'}
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Progress track */}
                    <div className="terminal-progress-section">
                        <div className="terminal-progress-header">
                            <span className="terminal-progress-label">Building modules</span>
                            <span className="terminal-progress-percentage">[{progress}%]</span>
                        </div>

                        <div className="terminal-bar-track">
                            <div
                                className="terminal-bar-fill"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                    </div>

                    {/* Ready line on completion */}
                    {progress >= 95 && (
                        <div className="terminal-ready-line">
                            <span>✔ {t('preloader.ready')}</span>
                            <span className="term-cursor">▋</span>
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default Preloader;
