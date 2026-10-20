import { useEffect, useRef } from 'react';
import {
    limitar,
    rgbALab,
    parsearColorCss
} from './ascii/asciiColorMath';
import { evaluarCampoEnPunto } from './ascii/asciiFieldMath';
import {
    CARACTERES_POR_DEFECTO,
    FUENTE_POR_DEFECTO,
    FRASES_POR_DEFECTO,
    PROPORCION_CELDA,
    ESCALA_FUENTE,
    construirCatalogoCaracteres,
    construirMapaTexto,
    evaluarCeldaAscii
} from './ascii/asciiTextGrid';
import './GradientASCII.css';

const MAX_COLORES = 8;
const MAX_CLICKS = 6;
const MAX_ESTELA = 16;
const VIDA_CLICK = 1.55;
const VIDA_ESTELA = 0.55;
const PASO_ESTELA = 0.01;
const SEGUNDOS_INTRO = 2.4;

const COLORES_POR_DEFECTO = ['#1e3fd8', '#f6f8ff', '#a5d8ff', '#38bdf8'];
const FORMAS = { horizon: 0, pinch: 1, rise: 2, eclipse: 3 };
const EFECTOS_CLICK = { none: 0, wave: 1, burst: 2 };

const GradientASCII = ({
    colors = COLORES_POR_DEFECTO,
    shape = 'horizon',
    characters = CARACTERES_POR_DEFECTO,
    phrases = FRASES_POR_DEFECTO,
    cellSize = 18,
    density = 0.8,
    glyphOpacity = 0.85,
    glow = 0.2,
    depthOfField = 0,
    flicker = 0.2,
    softness = 0.5,
    scale = 1,
    flow = 0.5,
    speed = 1,
    gradientOpacity = 0.9,
    grain = 0.08,
    variation = 0,
    mouseInteraction = true,
    scrambleRadius = 0.045,
    clickEffect = 'wave',
    intro = true,
    lightMode = false,
    fontFamily = FUENTE_POR_DEFECTO,
    dpr,
    className = '',
    style,
    ...rest
}) => {
    const containerRef = useRef(null);
    const canvasRef = useRef(null);
    const wakeRef = useRef(null);

    const paleta = (Array.isArray(colors) && colors.length ? colors : COLORES_POR_DEFECTO).slice(
        0,
        MAX_COLORES
    );

    const configuracion = {
        colors: paleta.length > 1 ? paleta : [paleta[0], paleta[0]],
        shape: FORMAS[shape] ?? 0,
        characters: characters || CARACTERES_POR_DEFECTO,
        phrases: phrases || FRASES_POR_DEFECTO,
        cellSize: limitar(cellSize, 6, 64),
        density: limitar(density, 0, 1),
        glyphOpacity: limitar(glyphOpacity, 0, 1),
        glow: limitar(glow, 0, 2),
        depthOfField: limitar(depthOfField, 0, 1),
        flicker: limitar(flicker, 0, 1),
        softness: limitar(softness, 0, 1),
        scale: limitar(scale, 0.4, 2.5),
        flow: limitar(flow, 0, 2),
        speed: Math.max(0, speed),
        gradientOpacity: limitar(gradientOpacity, 0, 1),
        grain: limitar(grain, 0, 0.4),
        variation: Math.max(0, variation),
        mouseInteraction,
        scrambleRadius: limitar(scrambleRadius, 0.015, 0.4),
        clickEffect: EFECTOS_CLICK[clickEffect] ?? 1,
        intro,
        lightMode,
        fontFamily: fontFamily || FUENTE_POR_DEFECTO,
        dpr
    };

    const settingsRef = useRef(configuracion);
    settingsRef.current = configuracion;

    useEffect(() => {
        const container = containerRef.current;
        const canvas = canvasRef.current;
        if (!container || !canvas) return undefined;

        const ctx = canvas.getContext('2d');
        if (!ctx) return undefined;

        // Lienzos auxiliares en memoria para el campo de color, los glifos y el halo de brillo
        const canvasCampo = document.createElement('canvas');
        const ctxCampo = canvasCampo.getContext('2d');

        const canvasGlifos = document.createElement('canvas');
        const ctxGlifos = canvasGlifos.getContext('2d');

        const canvasHalo = document.createElement('canvas');
        const ctxHalo = canvasHalo.getContext('2d');

        const reduceMotion =
            window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;

        const vista = { width: 1, height: 1, ratio: 1 };
        const estela = [];
        const clicks = [];
        const puntero = { x: 0, y: 0, inside: false };

        let catalogo = null;
        let claveCatalogo = '';
        let mapaTexto = null;
        let colsMapa = 0;
        let rowsMapa = 0;
        let rampaLab = [];
        let clavePaleta = '';
        let datosCampo = null;
        let imagenCampo = null;

        let tiempo = 0;
        let tiempoGlifo = 0;
        let relojIntro = settingsRef.current.intro && !reduceMotion ? 0 : 1;
        let raf = 0;
        let ultimoTiempo = 0;
        let visible = true;
        let destruido = false;

        // Sincroniza el catálogo de caracteres y las frases
        const sincronizarCatalogo = (cols, rows) => {
            const s = settingsRef.current;
            const frasesStr = Array.isArray(s.phrases) ? s.phrases.join('|') : String(s.phrases || '');
            const clave = `${s.fontFamily}|${s.characters}|${frasesStr}`;

            if (clave !== claveCatalogo || !catalogo) {
                claveCatalogo = clave;
                catalogo = construirCatalogoCaracteres(s.characters, s.phrases);
                colsMapa = 0;
                rowsMapa = 0;
            }

            if (cols !== colsMapa || rows !== rowsMapa || !mapaTexto) {
                colsMapa = cols;
                rowsMapa = rows;
                mapaTexto = construirMapaTexto(cols, rows, s.phrases, catalogo);
            }
        };

        // Sincroniza la paleta de colores en espacio OKLab
        const sincronizarPaleta = () => {
            const s = settingsRef.current;
            const clave = s.colors.join(',');
            if (clave === clavePaleta && rampaLab.length) return;
            clavePaleta = clave;
            rampaLab = s.colors.map((color) => rgbALab(parsearColorCss(color)));
        };

        // Actualiza la edad de la estela del mouse y las ondas de clic
        const actualizarInteraccion = (dt) => {
            for (let i = 0; i < estela.length; i++) {
                estela[i].age += dt;
                const k = Math.max(0, 1 - estela[i].age / VIDA_ESTELA);
                estela[i].fuerza = k * k;
            }
            while (estela.length && estela[estela.length - 1].age > VIDA_ESTELA) {
                estela.pop();
            }

            for (let i = 0; i < clicks.length; i++) {
                clicks[i].age += dt;
                const k = clicks[i].age / VIDA_CLICK;
                clicks[i].envelope = Math.min(1, clicks[i].age / 0.08) * (1 - k) * (1 - k);
            }
            while (clicks.length && clicks[clicks.length - 1].age > VIDA_CLICK) {
                clicks.pop();
            }
        };

        // Dibuja el fotograma completo en Canvas 2D
        const dibujar = () => {
            const s = settingsRef.current;
            const ancho = canvas.width;
            const alto = canvas.height;
            if (ancho <= 0 || alto <= 0) return;

            const aspecto = vista.width / vista.height;
            const cellH = s.cellSize * vista.ratio;
            const cellW = cellH * PROPORCION_CELDA;
            const cols = Math.max(1, Math.ceil(ancho / cellW));
            const rows = Math.max(1, Math.ceil(alto / cellH));

            const offsetX = (ancho - cols * cellW) / 2;
            const offsetY = (alto - rows * cellH) / 2;

            sincronizarCatalogo(cols, rows);
            sincronizarPaleta();

            if (canvasCampo.width !== cols || canvasCampo.height !== rows || !imagenCampo) {
                canvasCampo.width = cols;
                canvasCampo.height = rows;
                imagenCampo = ctxCampo.createImageData(cols, rows);
                datosCampo = new Array(cols * rows);
            }

            const pixeles = imagenCampo.data;
            const semillaX = s.variation * 3.17;
            const semillaY = s.variation * 1.91;

            // 1. Evaluar el campo del horizonte para cada celda de la grilla
            for (let filaPantalla = 0; filaPantalla < rows; filaPantalla++) {
                const pyCentro = (filaPantalla + 0.5) * cellH + offsetY;
                // En el diseño original, uvY = 1 está arriba y uvY = 0 está abajo
                const uvY = limitar(1.0 - pyCentro / alto, 0.0, 1.0);

                for (let col = 0; col < cols; col++) {
                    const pxCentro = (col + 0.5) * cellW + offsetX;
                    const uvX = limitar(pxCentro / ancho, 0.0, 1.0);

                    const campo = evaluarCampoEnPunto({
                        uvX,
                        uvY,
                        aspecto,
                        tiempo,
                        forma: s.shape,
                        rampaLab,
                        escala: s.scale,
                        suavidad: s.softness,
                        flujo: s.flow,
                        semillaX,
                        semillaY,
                        estela,
                        radioScramble: s.scrambleRadius,
                        clicks,
                        efectoClick: s.clickEffect,
                        relojIntro
                    });

                    const idxCelda = filaPantalla * cols + col;
                    datosCampo[idxCelda] = campo;

                    // Guardar pixel des-premultiplicado para que drawImage interpole suavemente
                    const idxPixel = idxCelda * 4;
                    if (campo.a > 0.001) {
                        pixeles[idxPixel] = Math.min(255, Math.round((campo.r / campo.a) * 255));
                        pixeles[idxPixel + 1] = Math.min(255, Math.round((campo.g / campo.a) * 255));
                        pixeles[idxPixel + 2] = Math.min(255, Math.round((campo.b / campo.a) * 255));
                        pixeles[idxPixel + 3] = Math.min(255, Math.round(campo.a * 255));
                    } else {
                        pixeles[idxPixel] = 0;
                        pixeles[idxPixel + 1] = 0;
                        pixeles[idxPixel + 2] = 0;
                        pixeles[idxPixel + 3] = 0;
                    }
                }
            }

            ctxCampo.putImageData(imagenCampo, 0, 0);

            // 2. Dibujar los caracteres ASCII en el lienzo de glifos
            if (canvasGlifos.width !== ancho || canvasGlifos.height !== alto) {
                canvasGlifos.width = ancho;
                canvasGlifos.height = alto;
            } else {
                ctxGlifos.clearRect(0, 0, ancho, alto);
            }

            const tamanoFuente = Math.max(8, Math.round(cellH * ESCALA_FUENTE));
            ctxGlifos.font = `500 ${tamanoFuente}px ${s.fontFamily}`;
            ctxGlifos.textAlign = 'center';
            ctxGlifos.textBaseline = 'middle';

            for (let filaPantalla = 0; filaPantalla < rows; filaPantalla++) {
                const cellY = rows - 1 - filaPantalla;
                const yCentro = offsetY + filaPantalla * cellH + cellH * 0.52;

                for (let col = 0; col < cols; col++) {
                    const campo = datosCampo[filaPantalla * cols + col];
                    const infoGlifo = evaluarCeldaAscii({
                        cellX: col,
                        cellY,
                        filaTexto: filaPantalla,
                        columnas: cols,
                        campo,
                        catalogo,
                        mapaTexto,
                        densidad: s.density,
                        opacidadGlifo: s.glyphOpacity,
                        parpadeo: reduceMotion ? 0 : s.flicker,
                        profundidadCampo: s.depthOfField,
                        tiempoGlifo,
                        semillaVariacion: s.variation,
                        modoClaro: s.lightMode
                    });

                    if (!infoGlifo) continue;

                    const xCentro = offsetX + col * cellW + cellW * 0.5;
                    ctxGlifos.fillStyle = `rgba(${infoGlifo.r}, ${infoGlifo.g}, ${infoGlifo.b}, ${infoGlifo.alpha})`;
                    ctxGlifos.fillText(infoGlifo.caracter, xCentro, yCentro);
                }
            }

            // 3. Componer todas las capas sobre el canvas principal (Base + Halo + Glifos)
            ctx.clearRect(0, 0, ancho, alto);
            ctx.save();
            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = 'high';

            // Capa 1: Fondo degradado del horizonte
            ctx.globalCompositeOperation = 'source-over';
            ctx.globalAlpha = s.gradientOpacity;
            ctx.drawImage(canvasCampo, 0, 0, ancho, alto);

            // Capa 2: Halo de resplandor (Bloom suave de los caracteres)
            if (s.glow > 0.001 && ctxHalo) {
                const anchoHalo = Math.max(1, Math.round(ancho / 4));
                const altoHalo = Math.max(1, Math.round(alto / 4));
                if (canvasHalo.width !== anchoHalo || canvasHalo.height !== altoHalo) {
                    canvasHalo.width = anchoHalo;
                    canvasHalo.height = altoHalo;
                } else {
                    ctxHalo.clearRect(0, 0, anchoHalo, altoHalo);
                }

                ctxHalo.save();
                ctxHalo.filter = 'blur(3px)';
                ctxHalo.drawImage(canvasGlifos, 0, 0, anchoHalo, altoHalo);
                ctxHalo.restore();

                ctx.globalCompositeOperation = s.lightMode ? 'source-over' : 'lighter';
                ctx.globalAlpha = s.lightMode ? s.glow * 0.6 : s.glow;
                ctx.drawImage(canvasHalo, 0, 0, ancho, alto);
            }

            // Capa 3: Grilla nítida de caracteres ASCII y frases
            ctx.globalCompositeOperation = s.lightMode ? 'source-over' : 'lighter';
            ctx.globalAlpha = 1.0;
            ctx.drawImage(canvasGlifos, 0, 0);

            ctx.restore();
        };

        const redimensionar = () => {
            const s = settingsRef.current;
            vista.width = Math.max(1, container.clientWidth);
            vista.height = Math.max(1, container.clientHeight);
            vista.ratio = Math.min(s.dpr || window.devicePixelRatio || 1, 2);
            canvas.width = Math.max(1, Math.round(vista.width * vista.ratio));
            canvas.height = Math.max(1, Math.round(vista.height * vista.ratio));
            dibujar();
            despertar();
        };

        const bucleAnimacion = (ahora) => {
            raf = 0;
            if (destruido || !visible || document.hidden) return;

            const s = settingsRef.current;
            const dt = ultimoTiempo
                ? limitar((ahora - ultimoTiempo) / 1000, 0.001, 0.05)
                : 1 / 60;
            ultimoTiempo = ahora;

            if (!reduceMotion) {
                tiempo += dt * s.speed * 0.5;
                tiempoGlifo += dt * Math.max(s.speed, 0.15);
            }
            if (relojIntro < 1) {
                relojIntro = Math.min(1, relojIntro + dt / SEGUNDOS_INTRO);
            }

            actualizarInteraccion(dt);
            dibujar();

            const activo =
                !reduceMotion || relojIntro < 1 || clicks.length > 0 || estela.length > 0;
            if (activo) {
                raf = requestAnimationFrame(bucleAnimacion);
            } else {
                ultimoTiempo = 0;
            }
        };

        function despertar() {
            if (!raf && !destruido && visible && !document.hidden) {
                raf = requestAnimationFrame(bucleAnimacion);
            }
        }

        const localizarPuntero = (evento) => {
            const rect = container.getBoundingClientRect();
            const x = (evento.clientX - rect.left) / Math.max(1, rect.width);
            const y = 1 - (evento.clientY - rect.top) / Math.max(1, rect.height);
            const aspecto = rect.width / Math.max(1, rect.height);

            puntero.inside = x >= 0 && x <= 1 && y >= 0 && y <= 1;
            puntero.x = (x - 0.5) * aspecto;
            puntero.y = y - 0.5;
        };

        const alMoverMouse = (evento) => {
            localizarPuntero(evento);
            const s = settingsRef.current;
            if (!puntero.inside || !s.mouseInteraction || reduceMotion) return;

            const cabeza = estela[0];
            const distancia = cabeza
                ? Math.hypot(puntero.x - cabeza.x, puntero.y - cabeza.y)
                : Infinity;
            if (distancia < PASO_ESTELA) return;

            if (cabeza && cabeza.age < 0.1) {
                const pasos = Math.min(6, Math.floor(distancia / (PASO_ESTELA * 2)));
                for (let i = 1; i <= pasos; i++) {
                    const k = i / (pasos + 1);
                    estela.unshift({
                        x: cabeza.x + (puntero.x - cabeza.x) * k,
                        y: cabeza.y + (puntero.y - cabeza.y) * k,
                        age: 0,
                        fuerza: 1
                    });
                }
            }

            estela.unshift({ x: puntero.x, y: puntero.y, age: 0, fuerza: 1 });
            estela.length = Math.min(estela.length, MAX_ESTELA);
            despertar();
        };

        const alHacerClick = (evento) => {
            localizarPuntero(evento);
            const s = settingsRef.current;
            if (!puntero.inside || !s.clickEffect || reduceMotion) return;

            clicks.unshift({ x: puntero.x, y: puntero.y, age: 0, envelope: 0 });
            if (clicks.length > MAX_CLICKS) clicks.pop();
            despertar();
        };

        const alCambiarVisibilidad = () => {
            ultimoTiempo = 0;
            despertar();
        };

        const resizeObserver = new ResizeObserver(redimensionar);
        resizeObserver.observe(container);

        const intersectionObserver = new IntersectionObserver((entradas) => {
            visible = entradas.some((entrada) => entrada.isIntersecting);
            if (visible) {
                ultimoTiempo = 0;
                despertar();
            }
        });
        intersectionObserver.observe(container);

        window.addEventListener('pointermove', alMoverMouse, { passive: true });
        window.addEventListener('pointerdown', alHacerClick, { passive: true });
        document.addEventListener('visibilitychange', alCambiarVisibilidad);

        redimensionar();
        wakeRef.current = despertar;

        return () => {
            destruido = true;
            cancelAnimationFrame(raf);
            wakeRef.current = null;
            resizeObserver.disconnect();
            intersectionObserver.disconnect();
            window.removeEventListener('pointermove', alMoverMouse);
            window.removeEventListener('pointerdown', alHacerClick);
            document.removeEventListener('visibilitychange', alCambiarVisibilidad);
        };
    }, []);

    useEffect(() => {
        wakeRef.current?.();
    });

    return (
        <div
            ref={containerRef}
            className={`gradient-ascii-container${className ? ` ${className}` : ''}`}
            style={style}
            {...rest}
        >
            <canvas ref={canvasRef} className="gradient-ascii-canvas" aria-hidden="true" />
        </div>
    );
};

export default GradientASCII;
