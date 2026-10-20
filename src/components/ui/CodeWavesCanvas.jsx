import { useEffect, useRef, useState } from 'react'
import './CodeWavesCanvas.css'

const SIMBOLOS_CODIGO = ['0', '1', '{', '}', ';', '//', '+', '<', '>', '*', '~']

// Distancia desde un punto (mouse) hasta un segmento de línea (para detectar hover en el logo </>)
const distanciaASegmento = (p, v, w) => {
    const largoCuadrado = Math.hypot(v.x - w.x, v.y - w.y) ** 2
    if (largoCuadrado === 0) return Math.hypot(p.x - v.x, p.y - v.y)
    let t = ((p.x - v.x) * (w.x - v.x) + (p.y - v.y) * (w.y - v.y)) / largoCuadrado
    t = Math.max(0, Math.min(1, t))
    return Math.hypot(p.x - (v.x + t * (w.x - v.x)), p.y - (v.y + t * (w.y - v.y)))
}

// Obtener coordenada (x, y) a lo largo de un trazo del logo según su progreso (0 a 1)
const obtenerPuntoEnSegmento = (puntos, progreso) => {
    if (puntos.length === 2) {
        return {
            x: puntos[0].x + (puntos[1].x - puntos[0].x) * progreso,
            y: puntos[0].y + (puntos[1].y - puntos[0].y) * progreso
        }
    }
    const mitad = progreso <= 0.5 ? progreso * 2 : (progreso - 0.5) * 2
    const inicio = progreso <= 0.5 ? puntos[0] : puntos[1]
    const fin = progreso <= 0.5 ? puntos[1] : puntos[2]
    return {
        x: inicio.x + (fin.x - inicio.x) * mitad,
        y: inicio.y + (fin.y - inicio.y) * mitad
    }
}

const CodeWavesCanvas = ({
    isLight = false,
    showLogo = false,
    showParticles = true,
    isFixed = false,
    fadeOnHero = false,
    particleCount = 115,
    className = ''
}) => {
    const canvasRef = useRef(null)
    const containerRef = useRef(null)
    const [opacity, setOpacity] = useState(fadeOnHero ? 0 : 1)

    // Transición suave de entrada y salida al hacer scroll desde el Home
    useEffect(() => {
        if (!isFixed || !fadeOnHero) {
            setOpacity(1)
            return
        }

        const handleScroll = () => {
            const scrollY = window.scrollY || 0
            const altoPantalla = window.innerHeight || 800
            const inicioFade = altoPantalla * 0.15
            const finFade = altoPantalla * 0.65

            if (scrollY <= inicioFade) {
                setOpacity(0)
            } else if (scrollY >= finFade) {
                setOpacity(1)
            } else {
                const ratio = (scrollY - inicioFade) / (finFade - inicioFade)
                const curvaSuave =
                    ratio < 0.5 ? 2 * ratio * ratio : 1 - Math.pow(-2 * ratio + 2, 2) / 2
                setOpacity(curvaSuave)
            }
        }

        handleScroll()
        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [isFixed, fadeOnHero])

    // Animación interactiva en Canvas 2D
    useEffect(() => {
        const canvas = canvasRef.current
        const container = containerRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        let animacionId
        let ancho = 0
        let alto = 0

        // Estado del cursor con suavizado (interpolación), velocidad y radio de repulsión
        const mouse = {
            x: -9999,
            y: -9999,
            targetX: -9999,
            targetY: -9999,
            prevX: -9999,
            prevY: -9999,
            velocidad: 0,
            activo: false,
            radio: 165
        }

        const particulas = []
        const ondasMouse = []
        const pulsosClick = []
        const chispas = []

        // Paquetes de luz que viajan por los 3 trazos del logo </>
        const puntosLogo = [
            { segmento: 0, progreso: 0.0, velocidad: 0.0055 },
            { segmento: 0, progreso: 0.5, velocidad: 0.0055 },
            { segmento: 1, progreso: 0.2, velocidad: 0.007 },
            { segmento: 1, progreso: 0.7, velocidad: 0.007 },
            { segmento: 2, progreso: 0.1, velocidad: 0.0055 },
            { segmento: 2, progreso: 0.6, velocidad: 0.0055 }
        ]

        // Paleta de colores según tema claro u oscuro
        const colores = isLight
            ? {
                logoBase: 'rgba(13, 110, 253, 0.24)',
                logoBrillo: 'rgba(13, 110, 253, 0.68)',
                logoActivo: 'rgba(2, 132, 199, 0.95)',
                puntoColor: '#0284c7',
                linea: (a) => `rgba(13, 110, 253, ${a * 0.18})`,
                particula: (a) => `rgba(13, 110, 253, ${a})`,
                simbolo: (a) => `rgba(59, 130, 246, ${a})`,
                onda: (a) => `rgba(13, 110, 253, ${a})`,
                chispa: (a) => `rgba(2, 132, 199, ${a})`,
                laserMouse: (a) => `rgba(14, 165, 233, ${a * 0.35})`
            }
            : {
                logoBase: 'rgba(37, 99, 235, 0.3)',
                logoBrillo: 'rgba(6, 182, 212, 0.75)',
                logoActivo: 'rgba(255, 255, 255, 0.95)',
                puntoColor: '#00f0ff',
                linea: (a) => `rgba(6, 182, 212, ${a * 0.22})`,
                particula: (a) => `rgba(56, 189, 248, ${a})`,
                simbolo: (a) => `rgba(147, 197, 253, ${a})`,
                onda: (a) => `rgba(6, 182, 212, ${a})`,
                chispa: (a) => `rgba(0, 240, 255, ${a})`,
                laserMouse: (a) => `rgba(0, 240, 255, ${a * 0.45})`
            }

        // Crear partícula con capa de profundidad 3D (z)
        const crearParticula = () => {
            const z = 0.45 + Math.random() * 0.75 // Profundidad 3D (0.45 fondo, 1.2 frente)
            const vx = (Math.random() - 0.5) * 0.36 * z
            const vy = (Math.random() - 0.5) * 0.36 * z
            return {
                x: Math.random() * ancho,
                y: Math.random() * alto,
                z,
                vx,
                vy,
                baseVx: vx,
                baseVy: vy,
                radio: (Math.random() * 1.8 + 1.0) * z,
                alpha: (Math.random() * 0.45 + 0.2) * Math.min(1, z),
                pulso: Math.random() * Math.PI * 2,
                velocidadPulso: 0.014 + Math.random() * 0.014,
                esSimbolo: Math.random() < 0.28,
                simbolo: SIMBOLOS_CODIGO[Math.floor(Math.random() * SIMBOLOS_CODIGO.length)],
                tamanoFuente: Math.round((Math.random() * 4 + 9) * z),
                brilloClick: 0
            }
        }

        // Ajustar dimensiones del canvas
        const actualizarTamano = () => {
            if (isFixed) {
                ancho = Math.max(100, window.innerWidth)
                alto = Math.max(100, window.innerHeight)
            } else if (container) {
                const rect = container.getBoundingClientRect()
                ancho = Math.max(100, Math.floor(rect.width))
                alto = Math.max(100, Math.floor(rect.height))
            }

            const dpr = Math.min(window.devicePixelRatio || 1, 2)
            canvas.width = Math.floor(ancho * dpr)
            canvas.height = Math.floor(alto * dpr)
            canvas.style.width = `${ancho}px`
            canvas.style.height = `${alto}px`
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

            const cantidad = ancho < 768 ? Math.min(65, particleCount) : particleCount
            if (showParticles && particulas.length === 0) {
                for (let i = 0; i < cantidad; i++) {
                    particulas.push(crearParticula())
                }
            }
        }

        // Eventos del puntero para interacción, ondas y chispas
        const handlePointerMove = (e) => {
            let x = 0
            let y = 0
            let dentro = false

            if (isFixed) {
                x = e.clientX
                y = e.clientY
                dentro = x >= 0 && y >= 0 && x <= ancho && y <= alto
            } else if (container) {
                const rect = container.getBoundingClientRect()
                x = e.clientX - rect.left
                y = e.clientY - rect.top
                dentro = x >= -40 && y >= -40 && x <= ancho + 40 && y <= alto + 40
            }

            if (dentro) {
                if (!mouse.activo) {
                    mouse.x = x
                    mouse.y = y
                }
                mouse.activo = true
                mouse.targetX = x
                mouse.targetY = y

                if (mouse.prevX !== -9999) {
                    const dist = Math.hypot(x - mouse.prevX, y - mouse.prevY)
                    mouse.velocidad = dist

                    // Generar onda expansiva suave si se mueve rápido el cursor
                    if (dist > 20 && ondasMouse.length < 5) {
                        ondasMouse.push({
                            x,
                            y,
                            radio: 8,
                            radioMax: Math.min(170, 50 + dist * 2.2),
                            alpha: 0.55,
                            velocidad: 2.5 + dist * 0.06
                        })
                    }
                }
                mouse.prevX = x
                mouse.prevY = y
            } else {
                mouse.activo = false
            }
        }

        const handlePointerLeave = () => {
            mouse.activo = false
            mouse.targetX = -9999
            mouse.targetY = -9999
        }

        // Al hacer clic: doble onda expansiva armónica + destello + ráfaga de chispas
        const handlePointerDown = (e) => {
            let x = 0
            let y = 0
            let dentro = false

            if (isFixed) {
                x = e.clientX
                y = e.clientY
                dentro = x >= 0 && y >= 0 && x <= ancho && y <= alto
            } else if (container) {
                const rect = container.getBoundingClientRect()
                x = e.clientX - rect.left
                y = e.clientY - rect.top
                dentro = x >= 0 && y >= 0 && x <= ancho && y <= alto
            }

            if (!dentro) return

            if (pulsosClick.length >= 4) {
                pulsosClick.shift()
            }
            pulsosClick.push({
                x,
                y,
                edad: 0,
                duracion: 1.45,
                radioMax: 290,
                radioActual: 0,
                alphaActual: 1
            })

            // Emitir chispas radiales limpias desde el punto de clic
            const totalChispas = 14
            for (let i = 0; i < totalChispas; i++) {
                if (chispas.length >= 80) break
                const angulo =
                    (i / totalChispas) * Math.PI * 2 + (Math.random() - 0.5) * 0.25
                const vel = 2.0 + Math.random() * 2.8
                chispas.push({
                    x,
                    y,
                    vx: Math.cos(angulo) * vel,
                    vy: Math.sin(angulo) * vel,
                    vida: 1,
                    desgaste: 0.02 + Math.random() * 0.018,
                    tamano: Math.random() * 2.2 + 1.4
                })
            }
        }

        let resizeObserver = null
        if (isFixed) {
            window.addEventListener('resize', actualizarTamano)
            actualizarTamano()
        } else if (container) {
            resizeObserver = new ResizeObserver(actualizarTamano)
            resizeObserver.observe(container)
            actualizarTamano()
        }

        window.addEventListener('pointermove', handlePointerMove, { passive: true })
        window.addEventListener('pointerdown', handlePointerDown, { passive: true })
        document.addEventListener('mouseleave', handlePointerLeave)

        // Bucle principal de animación
        const dibujar = (tiempo) => {
            ctx.clearRect(0, 0, ancho, alto)

            // Suavizar el movimiento del puntero
            if (mouse.activo) {
                mouse.x += (mouse.targetX - mouse.x) * 0.14
                mouse.y += (mouse.targetY - mouse.y) * 0.14
            }

            // 1. Resplandor ambiental en modo fijo y halo siguiendo al mouse
            if (isFixed) {
                const bgGrad = ctx.createRadialGradient(
                    ancho / 2,
                    alto / 2,
                    20,
                    ancho / 2,
                    alto / 2,
                    Math.max(ancho, alto) * 0.75
                )
                bgGrad.addColorStop(
                    0,
                    isLight ? 'rgba(224, 238, 255, 0.45)' : 'rgba(14, 25, 58, 0.45)'
                )
                bgGrad.addColorStop(1, 'transparent')
                ctx.fillStyle = bgGrad
                ctx.fillRect(0, 0, ancho, alto)

                if (mouse.activo) {
                    const haloCursor = ctx.createRadialGradient(
                        mouse.x,
                        mouse.y,
                        10,
                        mouse.x,
                        mouse.y,
                        210
                    )
                    haloCursor.addColorStop(
                        0,
                        isLight ? 'rgba(13, 110, 253, 0.13)' : 'rgba(0, 240, 255, 0.15)'
                    )
                    haloCursor.addColorStop(1, 'transparent')
                    ctx.fillStyle = haloCursor
                    ctx.fillRect(0, 0, ancho, alto)
                }
            }

            // 2. Dibujar el logo </> interactivo con perspectiva 3D y brillo hover (Contacto)
            if (showLogo) {
                const escala = Math.min(alto * 0.44, ancho * 0.28, 240)

                // Flotación lenta + inclinación 3D al mover el mouse
                const flotacionY = Math.sin(tiempo * 0.0012) * 6
                const tiltX = mouse.activo ? ((mouse.x - ancho / 2) / ancho) * 18 : 0
                const tiltY = mouse.activo ? ((mouse.y - alto / 2) / alto) * 14 : 0

                const cx = ancho / 2 + tiltX
                const cy = alto / 2 - 15 + flotacionY + tiltY
                const anchoPico = escala * 0.42
                const altoPico = escala * 0.52
                const separacion = escala * 0.38
                const inclinacionBarra = escala * 0.24

                const segmentosLogo = [
                    // Signo <
                    [
                        { x: cx - separacion - anchoPico * 0.05, y: cy - altoPico },
                        { x: cx - separacion - anchoPico * 1.05, y: cy },
                        { x: cx - separacion - anchoPico * 0.05, y: cy + altoPico }
                    ],
                    // Barra /
                    [
                        { x: cx - inclinacionBarra, y: cy + altoPico * 1.15 },
                        { x: cx + inclinacionBarra, y: cy - altoPico * 1.15 }
                    ],
                    // Signo >
                    [
                        { x: cx + separacion + anchoPico * 0.05, y: cy - altoPico },
                        { x: cx + separacion + anchoPico * 1.05, y: cy },
                        { x: cx + separacion + anchoPico * 0.05, y: cy + altoPico }
                    ]
                ]

                // Calcular qué tan cerca está el mouse del logo </> para encenderlo
                let distMinimaLogo = 9999
                if (mouse.activo) {
                    segmentosLogo.forEach((seg) => {
                        for (let i = 0; i < seg.length - 1; i++) {
                            const d = distanciaASegmento(mouse, seg[i], seg[i + 1])
                            if (d < distMinimaLogo) distMinimaLogo = d
                        }
                    })
                }
                const intensidadHover = mouse.activo
                    ? Math.max(0, 1 - distMinimaLogo / 165)
                    : 0

                // Aura luminosa detrás del logo
                const auraLogo = ctx.createRadialGradient(cx, cy, 10, cx, cy, escala * 1.45)
                auraLogo.addColorStop(
                    0,
                    isLight
                        ? `rgba(13, 110, 253, ${0.18 + intensidadHover * 0.12})`
                        : `rgba(6, 182, 212, ${0.22 + intensidadHover * 0.16})`
                )
                auraLogo.addColorStop(1, 'transparent')
                ctx.fillStyle = auraLogo
                ctx.fillRect(0, 0, ancho, alto)

                ctx.save()
                ctx.lineCap = 'round'
                ctx.lineJoin = 'round'

                // Capa 1: Resplandor exterior neón
                ctx.shadowColor = colores.logoBrillo
                ctx.shadowBlur = 18 + intensidadHover * 26
                ctx.lineWidth = 4 + intensidadHover * 3
                ctx.strokeStyle =
                    intensidadHover > 0.4 ? colores.logoActivo : colores.logoBrillo

                segmentosLogo.forEach((seg) => {
                    ctx.beginPath()
                    ctx.moveTo(seg[0].x, seg[0].y)
                    for (let i = 1; i < seg.length; i++) {
                        ctx.lineTo(seg[i].x, seg[i].y)
                    }
                    ctx.stroke()
                })

                // Capa 2: Núcleo interior nítido
                ctx.shadowBlur = 0
                ctx.lineWidth = 2 + intensidadHover * 1.5
                ctx.strokeStyle = intensidadHover > 0.2 ? '#ffffff' : colores.logoBase

                segmentosLogo.forEach((seg) => {
                    ctx.beginPath()
                    ctx.moveTo(seg[0].x, seg[0].y)
                    for (let i = 1; i < seg.length; i++) {
                        ctx.lineTo(seg[i].x, seg[i].y)
                    }
                    ctx.stroke()
                })

                // Nodos brillantes en cada vértice del </>
                segmentosLogo.forEach((seg) => {
                    seg.forEach((pt) => {
                        ctx.beginPath()
                        ctx.arc(pt.x, pt.y, 3.5 + intensidadHover * 2, 0, Math.PI * 2)
                        ctx.fillStyle =
                            intensidadHover > 0.3 ? '#ffffff' : colores.puntoColor
                        ctx.shadowColor = colores.logoBrillo
                        ctx.shadowBlur = 10
                        ctx.fill()
                    })
                })

                // Paquetes de datos corriendo por los trazos del </>
                puntosLogo.forEach((pkt) => {
                    pkt.progreso += pkt.velocidad * (1 + intensidadHover * 1.4)
                    if (pkt.progreso > 1) pkt.progreso = 0

                    const pos = obtenerPuntoEnSegmento(
                        segmentosLogo[pkt.segmento],
                        pkt.progreso
                    )
                    ctx.beginPath()
                    ctx.arc(pos.x, pos.y, 4 + intensidadHover * 2, 0, Math.PI * 2)
                    ctx.fillStyle = '#ffffff'
                    ctx.shadowColor = colores.puntoColor
                    ctx.shadowBlur = 12
                    ctx.fill()
                })

                ctx.restore()
            }

            // 3. Actualizar y dibujar ondas de clic, partículas con capas 3D, constelación y chispas
            // Actualizar y dibujar los pulsos de clic (doble onda expansiva + destello radial)
            for (let i = pulsosClick.length - 1; i >= 0; i--) {
                const pulso = pulsosClick[i]
                pulso.edad += 0.016
                const progreso = pulso.edad / pulso.duracion

                if (progreso >= 1) {
                    pulsosClick.splice(i, 1)
                    continue
                }

                const curva = 1 - Math.pow(1 - progreso, 2.5)
                const radioPrincipal = curva * pulso.radioMax
                const alphaOnda = Math.min(1, progreso / 0.07) * Math.pow(1 - progreso, 1.6)

                pulso.radioActual = radioPrincipal
                pulso.alphaActual = alphaOnda

                ctx.save()

                // Destello radial suave en el centro al presionar
                const radioHalo = Math.max(20, radioPrincipal * 0.85)
                const gradClick = ctx.createRadialGradient(
                    pulso.x,
                    pulso.y,
                    0,
                    pulso.x,
                    pulso.y,
                    radioHalo
                )
                gradClick.addColorStop(
                    0,
                    isLight
                        ? `rgba(13, 110, 253, ${alphaOnda * 0.16})`
                        : `rgba(0, 240, 255, ${alphaOnda * 0.18})`
                )
                gradClick.addColorStop(
                    0.6,
                    isLight
                        ? `rgba(56, 189, 248, ${alphaOnda * 0.08})`
                        : `rgba(13, 110, 253, ${alphaOnda * 0.1})`
                )
                gradClick.addColorStop(1, 'transparent')
                ctx.fillStyle = gradClick
                ctx.beginPath()
                ctx.arc(pulso.x, pulso.y, radioHalo, 0, Math.PI * 2)
                ctx.fill()

                // Anillo principal luminoso
                ctx.beginPath()
                ctx.arc(pulso.x, pulso.y, radioPrincipal, 0, Math.PI * 2)
                ctx.strokeStyle = colores.onda(alphaOnda * 0.85)
                ctx.lineWidth = 2.2
                ctx.shadowColor = colores.chispa(alphaOnda)
                ctx.shadowBlur = 14
                ctx.stroke()

                // Segundo anillo eco concéntrico
                if (progreso > 0.12) {
                    const progEco = (progreso - 0.12) / 0.88
                    const radioEco = (1 - Math.pow(1 - progEco, 2.3)) * (pulso.radioMax * 0.78)
                    ctx.beginPath()
                    ctx.arc(pulso.x, pulso.y, radioEco, 0, Math.PI * 2)
                    ctx.strokeStyle = colores.onda(alphaOnda * 0.48)
                    ctx.lineWidth = 1.2
                    ctx.shadowBlur = 8
                    ctx.stroke()
                }

                ctx.restore()
            }

            if (showParticles) {
                particulas.forEach((p) => {
                    p.pulso += p.velocidadPulso
                    p.brilloClick = Math.max(0, (p.brilloClick || 0) - 0.03)

                    // Deriva armónica lenta ponderada por su profundidad 3D (z)
                    p.x += p.vx + Math.cos(tiempo * 0.0009 + p.pulso) * 0.26 * p.z
                    p.y += p.vy + Math.sin(tiempo * 0.001 + p.pulso) * 0.26 * p.z

                    // Interacción con las ondas expansivas de clic (impulso + iluminación + decodificación de símbolo)
                    for (let i = 0; i < pulsosClick.length; i++) {
                        const pulso = pulsosClick[i]
                        const dxClick = p.x - pulso.x
                        const dyClick = p.y - pulso.y
                        const distClick = Math.hypot(dxClick, dyClick)
                        const distFrenteOnda = Math.abs(distClick - pulso.radioActual)

                        if (distFrenteOnda < 48 && distClick > 0) {
                            const intensidad =
                                (1 - distFrenteOnda / 48) * pulso.alphaActual
                            const angulo = Math.atan2(dyClick, dxClick)
                            p.vx += Math.cos(angulo) * intensidad * 0.55 * p.z
                            p.vy += Math.sin(angulo) * intensidad * 0.55 * p.z
                            p.brilloClick = Math.max(p.brilloClick, intensidad)

                            if (p.esSimbolo && intensidad > 0.35 && Math.random() < 0.22) {
                                p.simbolo =
                                    SIMBOLOS_CODIGO[
                                        Math.floor(Math.random() * SIMBOLOS_CODIGO.length)
                                    ]
                            }
                        }
                    }

                    // Interacción de repulsión suave con el mouse y emisión de chispas
                    if (mouse.activo) {
                        const dx = p.x - mouse.x
                        const dy = p.y - mouse.y
                        const dist = Math.hypot(dx, dy)
                        if (dist < mouse.radio && dist > 0) {
                            const fuerza = (1 - dist / mouse.radio) * 3.8 * p.z
                            const angulo = Math.atan2(dy, dx)
                            p.vx += Math.cos(angulo) * fuerza * 0.2
                            p.vy += Math.sin(angulo) * fuerza * 0.2

                            if (
                                mouse.velocidad > 8 &&
                                Math.random() < 0.1 &&
                                chispas.length < 60
                            ) {
                                chispas.push({
                                    x: p.x,
                                    y: p.y,
                                    vx: (Math.random() - 0.5) * 3.5,
                                    vy: (Math.random() - 0.5) * 3.5,
                                    vida: 1,
                                    desgaste: 0.025 + Math.random() * 0.025,
                                    tamano: Math.random() * 2 + 1
                                })
                            }
                        }
                    }

                    // Amortiguación suave hacia su velocidad base
                    p.vx = p.vx * 0.94 + p.baseVx * 0.06
                    p.vy = p.vy * 0.94 + p.baseVy * 0.06

                    // Reaparecer en el borde opuesto
                    if (p.x < -20) p.x = ancho + 20
                    if (p.x > ancho + 20) p.x = -20
                    if (p.y < -20) p.y = alto + 20
                    if (p.y > alto + 20) p.y = -20

                    // Dibujar símbolo o nodo circular (con realce al pasarle la onda de clic)
                    const opacidadActual = Math.max(
                        0.1,
                        Math.min(
                            1,
                            p.alpha + Math.sin(p.pulso) * 0.18 + (p.brilloClick || 0) * 0.65
                        )
                    )
                    if (p.esSimbolo) {
                        ctx.font = `${p.tamanoFuente + Math.round((p.brilloClick || 0) * 2)}px monospace`
                        ctx.fillStyle =
                            p.brilloClick > 0.2
                                ? colores.chispa(opacidadActual)
                                : colores.simbolo(opacidadActual)
                        ctx.fillText(p.simbolo, p.x, p.y)
                    } else {
                        ctx.beginPath()
                        ctx.arc(
                            p.x,
                            p.y,
                            p.radio + (p.brilloClick || 0) * 1.4,
                            0,
                            Math.PI * 2
                        )
                        ctx.fillStyle =
                            p.brilloClick > 0.2
                                ? colores.chispa(opacidadActual)
                                : colores.particula(opacidadActual)
                        ctx.fill()
                    }
                })

                // Conectar partículas cercanas y líneas interactivas al cursor
                ctx.lineWidth = 1
                for (let i = 0; i < particulas.length; i++) {
                    for (let j = i + 1; j < particulas.length; j++) {
                        const dx = particulas[i].x - particulas[j].x
                        const dy = particulas[i].y - particulas[j].y
                        const dist = Math.hypot(dx, dy)
                        if (dist < 82) {
                            const alphaLinea = (1 - dist / 82) * 0.32
                            ctx.strokeStyle = colores.linea(alphaLinea)
                            ctx.beginPath()
                            ctx.moveTo(particulas[i].x, particulas[i].y)
                            ctx.lineTo(particulas[j].x, particulas[j].y)
                            ctx.stroke()
                        }
                    }

                    if (mouse.activo) {
                        const distMouse = Math.hypot(
                            particulas[i].x - mouse.x,
                            particulas[i].y - mouse.y
                        )
                        if (distMouse < 130) {
                            ctx.strokeStyle = colores.laserMouse(1 - distMouse / 130)
                            ctx.lineWidth = 1.2
                            ctx.beginPath()
                            ctx.moveTo(particulas[i].x, particulas[i].y)
                            ctx.lineTo(mouse.x, mouse.y)
                            ctx.stroke()
                        }
                    }
                }

                // Dibujar ondas expansivas generadas por el movimiento del cursor
                for (let i = ondasMouse.length - 1; i >= 0; i--) {
                    const r = ondasMouse[i]
                    r.radio += r.velocidad
                    r.alpha -= 0.015

                    if (r.alpha <= 0 || r.radio >= r.radioMax) {
                        ondasMouse.splice(i, 1)
                        continue
                    }

                    ctx.save()
                    ctx.beginPath()
                    ctx.arc(r.x, r.y, r.radio, 0, Math.PI * 2)
                    ctx.strokeStyle = colores.onda(r.alpha)
                    ctx.lineWidth = 1.5
                    ctx.shadowColor = colores.onda(r.alpha)
                    ctx.shadowBlur = 8
                    ctx.stroke()
                    ctx.restore()
                }

                // Dibujar chispas luminosas
                for (let i = chispas.length - 1; i >= 0; i--) {
                    const s = chispas[i]
                    s.x += s.vx
                    s.y += s.vy
                    s.vida -= s.desgaste

                    if (s.vida <= 0) {
                        chispas.splice(i, 1)
                        continue
                    }

                    ctx.save()
                    ctx.beginPath()
                    ctx.arc(s.x, s.y, s.tamano * s.vida, 0, Math.PI * 2)
                    ctx.fillStyle = colores.chispa(s.vida)
                    ctx.shadowColor = colores.chispa(s.vida)
                    ctx.shadowBlur = 6
                    ctx.fill()
                    ctx.restore()
                }
            }

            animacionId = requestAnimationFrame(dibujar)
        }

        animacionId = requestAnimationFrame(dibujar)

        return () => {
            if (animacionId) cancelAnimationFrame(animacionId)
            if (resizeObserver) resizeObserver.disconnect()
            if (isFixed) window.removeEventListener('resize', actualizarTamano)
            window.removeEventListener('pointermove', handlePointerMove)
            window.removeEventListener('pointerdown', handlePointerDown)
            document.removeEventListener('mouseleave', handlePointerLeave)
        }
    }, [isLight, showLogo, showParticles, isFixed, particleCount])

    const wrapperClass = isFixed
        ? `code-waves-canvas-fixed ${className}`
        : `code-waves-canvas-wrapper ${className}`

    return (
        <div
            ref={containerRef}
            className={wrapperClass}
            style={{ opacity, transition: 'opacity 0.4s ease' }}
            aria-hidden="true"
        >
            <canvas ref={canvasRef} className="code-waves-canvas" />
            {isFixed && <div className="code-waves-vignette" />}
        </div>
    )
}

export default CodeWavesCanvas
