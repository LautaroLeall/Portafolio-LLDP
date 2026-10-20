// GRILLA DE TEXTO Y EVALUACIÓN DE CARACTERES ASCII

import { limitar, pasoSuave, mezclar } from './asciiColorMath';
import { hash12 } from './asciiFieldMath';

export const CARACTERES_POR_DEFECTO = ' =+xX0S8#@';
export const FUENTE_POR_DEFECTO =
    '"Geist Mono", ui-monospace, SFMono-Regular, Menlo, Consolas, monospace';

export const FRASES_POR_DEFECTO = [
    'LAUTARO LEAL DEL PRETE',
    'FULL STACK DEVELOPER',
    'INNOVATION & DESIGN',
    'REACT • NODE.JS • ARCHITECTURE',
    'CREATIVE CODE & EXPERIENCES',
    'BUILDING SCALABLE WEB PRODUCTS',
    'PROBLEM SOLVER • CLEAN CODE',
    'FRONTEND & BACKEND ENGINEERING'
];

export const PROPORCION_CELDA = 55 / 100; // 0.6 (ancho / alto de cada celda)
export const ESCALA_FUENTE = 0.80;

// Construye la lista única de caracteres (símbolos base + letras de las frases)
export const construirCatalogoCaracteres = (
    caracteres = CARACTERES_POR_DEFECTO,
    frases = FRASES_POR_DEFECTO
) => {
    const listaBase = [...new Set((caracteres || CARACTERES_POR_DEFECTO).split(''))];
    const textoFrases = (Array.isArray(frases) ? frases.join(' ') : String(frases || '')).toUpperCase();
    const listaExtra = [...new Set(textoFrases.split(''))].filter(
        (c) => !listaBase.includes(c) && c !== '\n' && c !== '\r'
    );

    const lista = [...listaBase, ...listaExtra];
    if (!lista.length) lista.push(' ');

    const mapaIndices = new Map(lista.map((c, i) => [c, i]));
    return { lista, cantidad: lista.length, mapaIndices };
};

// Construye la matriz (Uint8Array) que indica qué letra va en cada celda de las filas de frases
export const construirMapaTexto = (columnas, filas, frases, catalogo) => {
    const datosTexto = new Uint8Array(columnas * filas);
    const listaFrases =
        Array.isArray(frases) && frases.length ? frases : FRASES_POR_DEFECTO;

    for (let r = 0; r < filas; r++) {
        // Coloca una fila de frase cada 4 filas (filas 2, 6, 10, 14...)
        const esFilaDeFrase = r % 4 === 2;
        if (esFilaDeFrase) {
            const indiceFrase = Math.floor(r / 4) % listaFrases.length;
            const frase = listaFrases[indiceFrase].toUpperCase();
            const conEspacios = '        ' + frase + '        ';

            for (let c = 0; c < columnas; c++) {
                const caracter = conEspacios[c % conEspacios.length];
                const idx = catalogo.mapaIndices.get(caracter) ?? 0;
                datosTexto[r * columnas + c] = idx;
            }
        } else {
            // Filas de relleno ambiental (255 = usar símbolo por luminancia)
            for (let c = 0; c < columnas; c++) {
                datosTexto[r * columnas + c] = 255;
            }
        }
    }

    return datosTexto;
};

// Evalúa qué carácter, color y opacidad corresponde dibujar en la celda (cellX, cellY)
export const evaluarCeldaAscii = ({
    cellX,
    cellY,
    filaTexto,
    columnas,
    campo,
    catalogo,
    mapaTexto,
    densidad,
    opacidadGlifo,
    parpadeo,
    profundidadCampo,
    tiempoGlifo,
    semillaVariacion,
    modoClaro
}) => {
    const visibleR = modoClaro ? campo.r + (1.0 - campo.a) : campo.r;
    const visibleG = modoClaro ? campo.g + (1.0 - campo.a) : campo.g;
    const visibleB = modoClaro ? campo.b + (1.0 - campo.a) : campo.b;

    const luma = visibleR * 0.2126 + visibleG * 0.7152 + visibleB * 0.0722;
    const value = modoClaro ? limitar((1.0 - luma) * 1.5, 0.0, 1.0) : luma;

    const pick = hash12(cellX + semillaVariacion * 7.31, cellY + semillaVariacion * 7.31);
    const level = hash12(
        cellX * 1.73 + 4.1 + semillaVariacion,
        cellY * 1.73 + 4.1 + semillaVariacion
    );
    const tick = Math.floor(tiempoGlifo * 9.0 + level * 9.0);
    const wobble =
        (hash12(cellX * 2.31 + tick * 17.7, cellY * 2.31 + tick * 17.7) - 0.5) *
        parpadeo *
        0.4 +
        (level - 0.5) * 0.1;

    const tone = limitar(Math.pow(Math.max(0.0, value), 0.75) + wobble, 0.0, 1.0);

    // Índice base según la luminancia del horizonte
    let index = Math.floor(tone * (catalogo.cantidad - 1.0) + 0.5);
    let esLetraDeFrase = 0.0;

    if (mapaTexto) {
        const mappedChar = mapaTexto[filaTexto * columnas + cellX];
        if (mappedChar < 255) {
            index = mappedChar;
            if (mappedChar >= 10) {
                esLetraDeFrase = 1.0;
            }
        }
    }

    // Efecto de decodificación al pasar el mouse, hacer clic o durante la intro
    const intensidadMouse = campo.scramble || 0.0;
    const decode = Math.max(intensidadMouse, 1.0 - campo.reveal);
    if (decode > 0.02) {
        const frame = Math.floor(tiempoGlifo * 20.0);
        if (hash12(cellX * 3.7 + frame * 5.3, cellY * 3.7 + frame * 5.3) < decode * 1.45) {
            index = 1 + Math.floor(hash12(cellX + frame * 1.37, cellY + frame * 1.37) * 8.0);
        }
    }

    const caracter = catalogo.lista[limitar(index, 0, catalogo.cantidad - 1)] || ' ';
    if (caracter === ' ') return null;

    const umbralDensidad = densidad * mezclar(1.0, 0.3 + tone * 1.1, 0.55);
    const basePresent = pick <= umbralDensidad ? 1.0 : 0.0;
    const present = Math.max(
        mezclar(basePresent, 1.0, esLetraDeFrase * 0.96),
        intensidadMouse * 0.92
    );
    if (present <= 0.01) return null;

    const cutoff = Math.max(
        mezclar(pasoSuave(0.03, 0.1, value), 1.0, esLetraDeFrase * 0.82),
        intensidadMouse * 0.88
    );
    if (cutoff <= 0.01) return null;

    const focus =
        hash12(cellX * 0.71 + 9.2 + semillaVariacion, cellY * 0.71 + 9.2 + semillaVariacion) <=
            profundidadCampo
            ? 1.0
            : 0.0;

    const alphaBase =
        opacidadGlifo *
        present *
        cutoff *
        mezclar(1.0, 0.35 + 0.65 * level, 0.55) *
        (1.0 - focus * 0.5);

    const alpha = limitar(alphaBase + intensidadMouse * 0.52, 0, 1);

    if (alpha <= 0.01) return null;

    if (!modoClaro) {
        let r = campo.r * 0.65 + 0.04 * campo.a;
        let g = campo.g * 0.65 + 0.04 * campo.a;
        let b = campo.b * 0.65 + 0.04 * campo.a;

        if (esLetraDeFrase > 0.5) {
            r = r * 1.35 + 0.12;
            g = g * 1.35 + 0.12;
            b = b * 1.35 + 0.12;
        }

        // Realce luminoso limpio en tonos cian/azul hielo al pasar el mouse o hacer clic
        if (intensidadMouse > 0.01) {
            r = mezclar(r, 0.62, intensidadMouse * 0.75);
            g = mezclar(g, 0.86, intensidadMouse * 0.82);
            b = mezclar(b, 1.0, intensidadMouse * 0.9);
        }

        return {
            caracter,
            r: Math.min(255, Math.round(r * 255)),
            g: Math.min(255, Math.round(g * 255)),
            b: Math.min(255, Math.round(b * 255)),
            alpha
        };
    }

    let rClaro = visibleR * 0.85;
    let gClaro = visibleG * 0.85;
    let bClaro = visibleB * 0.85;

    if (intensidadMouse > 0.01) {
        rClaro = mezclar(rClaro, 0.05, intensidadMouse * 0.75);
        gClaro = mezclar(gClaro, 0.43, intensidadMouse * 0.75);
        bClaro = mezclar(bClaro, 0.99, intensidadMouse * 0.85);
    }

    return {
        caracter,
        r: Math.min(255, Math.round(rClaro * 255)),
        g: Math.min(255, Math.round(gClaro * 255)),
        b: Math.min(255, Math.round(bClaro * 255)),
        alpha
    };
};
