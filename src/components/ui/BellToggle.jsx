import { useState } from 'react'
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion'
import { Bell, Check } from 'lucide-react'
import './BellToggle.css'

const BellToggle = ({
    offLabel = 'Copiar',
    onLabel = '¡Copiado!',
    pressed,
    defaultPressed = false,
    onChange,
    size = 'md',
    radius = 12,
    waves = true,
    color = '#e0f2fe',
    background = 'rgba(13, 110, 253, 0.14)',
    onColor = '#4ade80',
    onBackground = 'rgba(34, 197, 94, 0.16)',
    disabled = false,
    className = ''
}) => {
    const [internalPressed, setInternalPressed] = useState(defaultPressed)
    const [isHovered, setIsHovered] = useState(false)
    const isPressed = pressed !== undefined ? pressed : internalPressed

    const iconSize = size === 'sm' ? 15 : size === 'lg' ? 19 : 16

    const handleClick = () => {
        if (disabled) return
        const nextState = !isPressed
        if (pressed === undefined) {
            setInternalPressed(nextState)
        }
        if (onChange) {
            onChange(nextState)
        }
    }

    return (
        <motion.button
            layout
            type="button"
            className={`bell-toggle-btn size-${size} ${isPressed ? 'is-active' : ''} ${className}`}
            onClick={handleClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            disabled={disabled}
            aria-pressed={isPressed}
            whileHover={{ y: -2, scale: 1.04 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 320, damping: 22 }}
            style={{
                borderRadius: `${radius}px`,
                backgroundColor: isPressed ? onBackground : background,
                color: isPressed ? onColor : color
            }}
        >
            {/* Contenedor del icono y las ondas acústicas laterales */}
            <span className="bell-icon-wrapper" aria-hidden="true">
                <motion.span
                    className="bell-icon-glyph"
                    animate={
                        isPressed
                            ? { rotate: [0, -20, 18, -14, 12, -8, 6, -3, 0], scale: [1, 1.15, 1] }
                            : isHovered
                                ? { rotate: [0, -10, 10, -5, 0] }
                                : { rotate: 0, scale: 1 }
                    }
                    transition={{
                        duration: isPressed ? 0.9 : 0.45,
                        ease: 'easeInOut'
                    }}
                >
                    {isPressed ? (
                        <Check size={iconSize} strokeWidth={2.5} />
                    ) : (
                        <Bell size={iconSize} strokeWidth={2.1} />
                    )}
                </motion.span>

                {/* Ondas acústicas SVG en ambos lados al activarse */}
                <AnimatePresence>
                    {waves && isPressed && (
                        <>
                            <motion.svg
                                key="wave-left"
                                className="bell-wave-svg bell-wave-left"
                                viewBox="0 0 14 14"
                                initial={{ opacity: 0, scale: 0.5, x: 2 }}
                                animate={{
                                    opacity: [0, 0.95, 0.7, 0],
                                    scale: [0.55, 1.15, 1.3],
                                    x: [2, -2, -4]
                                }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.85, ease: 'easeOut' }}
                            >
                                <path d="M14 8a6 6 0 0 0-6 6" />
                                <path d="M14 4A10 10 0 0 0 4 14" />
                            </motion.svg>

                            <motion.svg
                                key="wave-right"
                                className="bell-wave-svg bell-wave-right"
                                viewBox="0 0 14 14"
                                initial={{ opacity: 0, scale: 0.5, x: -2 }}
                                animate={{
                                    opacity: [0, 0.95, 0.7, 0],
                                    scale: [0.55, 1.15, 1.3],
                                    x: [-2, 2, 4]
                                }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.85, delay: 0.08, ease: 'easeOut' }}
                            >
                                <path d="M0 8a6 6 0 0 1 6 6" />
                                <path d="M0 4a10 10 0 0 1 10 10" />
                            </motion.svg>
                        </>
                    )}
                </AnimatePresence>
            </span>

            {/* Texto animado con entrada y salida suave */}
            <span className="bell-label-container">
                <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                        key={isPressed ? 'on' : 'off'}
                        className="bell-label-text"
                        initial={{ opacity: 0, y: 6, filter: 'blur(3px)' }}
                        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                        exit={{ opacity: 0, y: -6, filter: 'blur(3px)' }}
                        transition={{ duration: 0.22, ease: 'easeOut' }}
                    >
                        {isPressed ? onLabel : offLabel}
                    </motion.span>
                </AnimatePresence>
            </span>
        </motion.button>
    )
}

export default BellToggle
