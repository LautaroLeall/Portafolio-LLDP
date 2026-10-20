// UTILIDADES DE COLOR (Espacio perceptual OKLab y conversión RGB / Hex)

export const limitar = (valor, min, max) => Math.min(max, Math.max(min, valor));

export const pasoSuave = (borde0, borde1, x) => {
    const t = limitar((x - borde0) / (borde1 - borde0), 0, 1);
    return t * t * (3 - 2 * t);
};

export const mezclar = (a, b, t) => a + (b - a) * t;

// Convierte un canal sRGB (0..1) a luz lineal
const aLineal = (valor) =>
    valor <= 0.04045 ? valor / 12.92 : Math.pow((valor + 0.055) / 1.055, 2.4);

// Convierte luz lineal (0..1) de vuelta a sRGB (0..1)
export const codificarSrgb = (canal) => {
    const c = limitar(canal, 0, 1);
    return c >= 0.0031308 ? 1.055 * Math.pow(c, 1 / 2.4) - 0.055 : c * 12.92;
};

// Convierte un color [R, G, B] (0..1) al espacio de color perceptual OKLab [L, a, b]
export const rgbALab = ([r, g, b]) => {
    const lr = aLineal(r);
    const lg = aLineal(g);
    const lb = aLineal(b);

    const l = Math.cbrt(0.4122214708 * lr + 0.5363325363 * lg + 0.0514459929 * lb);
    const m = Math.cbrt(0.2119034982 * lr + 0.6806995451 * lg + 0.1073969566 * lb);
    const s = Math.cbrt(0.0883024619 * lr + 0.2817188376 * lg + 0.6299787005 * lb);

    return [
        0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s,
        1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s,
        0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s
    ];
};

// Convierte un color OKLab [L, a, b] de vuelta a RGB [R, G, B] (0..1)
export const labARgb = (labL, labA, labB) => {
    let l = labL + 0.3963377774 * labA + 0.2158037573 * labB;
    let m = labL - 0.1055613458 * labA - 0.0638541728 * labB;
    let s = labL - 0.0894841775 * labA - 1.291485548 * labB;

    l = l * l * l;
    m = m * m * m;
    s = s * s * s;

    const r = 4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s;
    const g = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s;
    const b = -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s;

    return [codificarSrgb(r), codificarSrgb(g), codificarSrgb(b)];
};

// Interpola un valor t (0..1) dentro de la paleta de colores en espacio OKLab
export const evaluarTono = (t, rampaLab) => {
    const cantidad = rampaLab.length;
    const x = pasoSuave(0.3, 1.0, t) * (cantidad - 1);
    const indice = Math.min(Math.floor(x), cantidad - 1);
    const siguiente = Math.min(indice + 1, cantidad - 1);
    const fraccion = x - indice;

    const colorA = rampaLab[indice];
    const colorB = rampaLab[siguiente];

    return {
        l: mezclar(colorA[0], colorB[0], fraccion),
        a: mezclar(colorA[1], colorB[1], fraccion),
        b: mezclar(colorA[2], colorB[2], fraccion),
        alpha: pasoSuave(0.0, 0.38, t)
    };
};

// Convierte cualquier color CSS (#hex, rgb, etc.) a [r, g, b] normalizado (0..1)
const cacheColores = new Map();
let contextoSonda = null;

export const parsearColorCss = (valorColor) => {
    const clave = String(valorColor);
    if (cacheColores.has(clave)) return cacheColores.get(clave);

    // Atajo directo para colores hexadecimales de 6 dígitos (#rrggbb)
    if (/^#[0-9a-fA-F]{6}$/.test(clave)) {
        const r = parseInt(clave.slice(1, 3), 16) / 255;
        const g = parseInt(clave.slice(3, 5), 16) / 255;
        const b = parseInt(clave.slice(5, 7), 16) / 255;
        const rgb = [r, g, b];
        cacheColores.set(clave, rgb);
        return rgb;
    }

    if (!contextoSonda && typeof document !== 'undefined') {
        contextoSonda = document
            .createElement('canvas')
            .getContext('2d', { willReadFrequently: true });
    }

    let rgb = [0, 0, 0];
    if (contextoSonda) {
        contextoSonda.clearRect(0, 0, 1, 1);
        contextoSonda.fillStyle = '#000000';
        contextoSonda.fillStyle = clave;
        contextoSonda.fillRect(0, 0, 1, 1);
        const [r, g, b] = contextoSonda.getImageData(0, 0, 1, 1).data;
        rgb = [r / 255, g / 255, b / 255];
    }

    cacheColores.set(clave, rgb);
    return rgb;
};
