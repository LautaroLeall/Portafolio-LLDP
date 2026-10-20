// MATEMÁTICA DEL CAMPO Y FORMAS DEL HORIZONTE (Ruido 2D y Geometría)

import { limitar, pasoSuave, mezclar, evaluarTono, labARgb } from './asciiColorMath';

const fraccionPositiva = (v) => {
    const f = v - Math.floor(v);
    return f < 0 ? f + 1 : f;
};

// Función hash determinista 2D -> 1D (0..1), idéntica a hash12 en GLSL
export const hash12 = (px, py) => {
    let qx = fraccionPositiva(px * 0.1031);
    let qy = fraccionPositiva(py * 0.1031);
    let qz = qx;

    const dot = qx * (qy + 33.33) + qy * (qz + 33.33) + qz * (qx + 33.33);
    qx += dot;
    qy += dot;
    qz += dot;

    return fraccionPositiva((qx + qy) * qz);
};

// Función hash determinista 2D -> 2D (-1..1), idéntica a hash22 en GLSL
const hash22 = (px, py) => {
    let qx = fraccionPositiva(px * 0.1031);
    let qy = fraccionPositiva(py * 0.103);
    let qz = fraccionPositiva(px * 0.0973);

    const dot = qx * (qy + 33.33) + qy * (qz + 33.33) + qz * (qx + 33.33);
    qx += dot;
    qy += dot;
    qz += dot;

    const rx = fraccionPositiva((qx + qy) * qz) * 2.0 - 1.0;
    const ry = fraccionPositiva((qx + qz) * qy) * 2.0 - 1.0;
    return [rx, ry];
};

// Ruido de gradiente 2D suave (Perlin quintic), idéntico a noise(vec2 p) en GLSL
export const ruidoPerlin2D = (px, py) => {
    const ix = Math.floor(px);
    const iy = Math.floor(py);
    const fx = px - ix;
    const fy = py - iy;

    const ux = fx * fx * fx * (fx * (fx * 6.0 - 15.0) + 10.0);
    const uy = fy * fy * fy * (fy * (fy * 6.0 - 15.0) + 10.0);

    const [ax, ay] = hash22(ix, iy);
    const [bx, by] = hash22(ix + 1.0, iy);
    const [cx, cy] = hash22(ix, iy + 1.0);
    const [dx, dy] = hash22(ix + 1.0, iy + 1.0);

    const a = ax * fx + ay * fy;
    const b = bx * (fx - 1.0) + by * fy;
    const c = cx * fx + cy * (fy - 1.0);
    const d = dx * (fx - 1.0) + dy * (fy - 1.0);

    const mezclaAb = mezclar(a, b, ux);
    const mezclaCd = mezclar(c, d, ux);
    return 0.5 + 0.5 * mezclar(mezclaAb, mezclaCd, uy);
};

// Forma 0: Arco de horizonte luminoso (la forma principal del Hero)
export const calcularHorizonte = (px, py, tiempo, suavidad, aspecto) => {
    const span = 0.5 * Math.max(aspecto, 1.0);
    const x = px / span;
    const arch = -0.17 - 0.2 * x * x + 0.02 * Math.sin(tiempo * 0.6);
    const soft = mezclar(0.05, 0.22, suavidad);
    const edge = py - arch;
    const rim = 0.38 * pasoSuave(-soft, 0.42, edge);

    const sunX = 0.08 * Math.sin(tiempo * 0.31) * span;
    const sunY = 0.58;
    const spread = Math.hypot((px - sunX) / (0.95 * span), (py - sunY) / 0.75);
    const sky = mezclar(0.55, 1.0, pasoSuave(0.2, 0.95, spread));
    const order = limitar(edge * 1.3, 0.0, 1.0);

    return { x: rim, y: sky, z: pasoSuave(0.18, 0.62, edge), order };
};

// Forma 1: Pinch
export const calcularPinch = (px, py, tiempo, suavidad, aspecto) => {
    const span = 0.5 * Math.max(aspecto, 0.75);
    const x = px / span;
    const sway = 0.02 * Math.sin(x * 1.7 + tiempo * 0.55);
    const breathe = 1.0 + 0.06 * Math.sin(tiempo * 0.8);
    const width = (0.13 + 0.22 * x * x) * breathe * mezclar(0.85, 1.2, suavidad);
    const y = Math.abs(py - sway) / width;
    const t = Math.exp(-Math.pow(y, 2.2)) * (0.42 + 0.58 * Math.exp(-x * x * 1.8));
    const order = limitar(Math.abs(py - sway) * 2.4 + Math.abs(x) * 0.3, 0.0, 1.0);
    return { x: t, y: t, z: 0.0, order };
};

// Forma 2: Rise
export const calcularRise = (px, py, tiempo, suavidad, aspecto) => {
    const wide = Math.max(aspecto, 0.9);
    const centerX = 0.05 * Math.sin(tiempo * 0.45) * wide;
    const centerY = -0.7;
    const radiusX = 0.82 * wide;
    const radiusY = 0.64 * (1.0 + 0.04 * Math.sin(tiempo * 0.8));
    const d = Math.hypot((px - centerX) / radiusX, (py - centerY) / radiusY);
    const soft = mezclar(0.6, 1.15, suavidad);
    const t = limitar(Math.pow(limitar(1.0 - d, 0.0, 1.0), soft) * 1.35, 0.0, 1.0);
    const order = limitar((d - 0.2) * 1.3, 0.0, 1.0);
    return { x: t, y: t, z: 0.0, order };
};

// Forma 3: Eclipse
export const calcularEclipse = (px, py, tiempo, suavidad, aspecto) => {
    const fit = Math.min(1.0, aspecto * 1.25);
    const r = 0.23 * fit * (1.0 + 0.015 * Math.sin(tiempo * 0.9));
    const angle = Math.atan2(py, px);
    const rays =
        ruidoPerlin2D(Math.cos(angle) * 2.2 + tiempo * 0.08, Math.sin(angle) * 2.2 + tiempo * 0.08) *
        0.8 +
        0.6;
    const d = Math.hypot(px, py) - r;
    const reach = mezclar(0.07, 0.15, suavidad) * rays * fit;
    const t = pasoSuave(-0.006, 0.006 + 0.02 * suavidad, d) * Math.exp(-Math.max(d, 0.0) / reach);
    const order = limitar(d * 2.0, 0.0, 1.0);
    return { x: t, y: t, z: 0.0, order };
};

// Evalúa el color del campo, la opacidad y la intensidad de decodificación en (uvX, uvY)
export const evaluarCampoEnPunto = ({
    uvX,
    uvY,
    aspecto,
    tiempo,
    forma,
    rampaLab,
    escala,
    suavidad,
    flujo,
    semillaX,
    semillaY,
    estela,
    radioScramble,
    clicks,
    efectoClick,
    relojIntro
}) => {
    const px = (uvX - 0.5) * aspecto;
    const py = uvY - 0.5;

    let qx = px / escala;
    let qy = py / escala;

    // Deformación orgánica por ruido Perlin 2D (warp)
    const warpX = ruidoPerlin2D(qx * 1.6 + semillaX, qy * 1.6 + semillaY + tiempo * 0.3) - 0.5;
    const warpY =
        ruidoPerlin2D(qx * 1.6 + semillaY + 4.3, qy * 1.6 + semillaX - tiempo * 0.24) - 0.5;
    const factorWarp = flujo * (forma === 3 ? 0.04 : 0.18);

    qx += warpX * factorWarp;
    qy += warpY * factorWarp;

    let resultadoForma;
    if (forma === 0) resultadoForma = calcularHorizonte(qx, qy, tiempo, suavidad, aspecto);
    else if (forma === 1) resultadoForma = calcularPinch(qx, qy, tiempo, suavidad, aspecto);
    else if (forma === 2) resultadoForma = calcularRise(qx, qy, tiempo, suavidad, aspecto);
    else resultadoForma = calcularEclipse(qx, qy, tiempo, suavidad, aspecto);

    // Progreso de revelación de entrada (intro)
    let reveal = limitar((relojIntro * 1.45 - resultadoForma.order) / 0.45, 0.0, 1.0);
    reveal = reveal * reveal * (3.0 - 2.0 * reveal);

    // Efecto de decodificación e iluminación por estela del mouse y ondas de clic
    let scramble = 0.0;
    let impulsoLuz = 0.0;
    const r2 = Math.pow(radioScramble * 0.7, 2);

    for (let i = 0; i < estela.length; i++) {
        const punto = estela[i];
        if (punto.fuerza <= 0) continue;
        const dx = px - punto.x;
        const dy = py - punto.y;
        const dist2 = dx * dx + dy * dy;
        const s = punto.fuerza * Math.exp(-dist2 / r2);
        if (s > scramble) scramble = s;
        impulsoLuz = Math.max(impulsoLuz, s * 0.35);
    }

    for (let i = 0; i < clicks.length; i++) {
        const c = clicks[i];
        if (c.envelope <= 0) continue;
        const d = Math.hypot(px - c.x, py - c.y);
        if (efectoClick === 1) {
            // Onda principal + onda eco secundaria más limpia y visible
            const radioOnda = c.age * 0.72;
            const ondaPrincipal = Math.exp(-Math.pow((d - radioOnda) / 0.075, 2.0)) * c.envelope;
            const radioEco = Math.max(0, (c.age - 0.14) * 0.62);
            const ondaEco =
                c.age > 0.14
                    ? Math.exp(-Math.pow((d - radioEco) / 0.055, 2.0)) * c.envelope * 0.55
                    : 0;
            const destelloCentro = Math.exp(- (d * d) / 0.018) * Math.max(0, 1 - c.age * 3.2) * c.envelope;
            const ondaTotal = Math.min(1.0, ondaPrincipal + ondaEco + destelloCentro * 0.7);
            if (ondaTotal > scramble) scramble = ondaTotal;
            impulsoLuz = Math.max(impulsoLuz, ondaTotal * 0.65);
        } else if (efectoClick === 2) {
            const size = 0.08 + 0.26 * (1.0 - Math.exp(-c.age * 5.0));
            const burst = (1.0 - pasoSuave(size * 0.55, size, d)) * c.envelope;
            if (burst > scramble) scramble = burst;
            impulsoLuz = Math.max(impulsoLuz, burst * 0.6);
        }
    }

    const factorReveal = mezclar(0.7, 1.0, reveal);
    const tx = limitar(resultadoForma.x * factorReveal + impulsoLuz * 0.22, 0.0, 1.0);
    const ty = limitar(resultadoForma.y * factorReveal + impulsoLuz * 0.28, 0.0, 1.0);

    const tonoX = evaluarTono(tx, rampaLab);
    const tonoY = evaluarTono(ty, rampaLab);

    const mezclaZ = limitar(resultadoForma.z + impulsoLuz * 0.35, 0.0, 1.0);
    const labL = mezclar(tonoX.l, tonoY.l, mezclaZ);
    const labA = mezclar(tonoX.a, tonoY.a, mezclaZ);
    const labB = mezclar(tonoX.b, tonoY.b, mezclaZ);
    const mixedAlpha = limitar(
        mezclar(tonoX.alpha, tonoY.alpha, mezclaZ) + impulsoLuz * 0.28,
        0.0,
        1.0
    );

    const [r, g, b] = labARgb(labL, labA, labB);
    const alpha = limitar(mixedAlpha * reveal, 0.0, 1.0);

    // Color premultiplicado por alpha igual que en outColor del shader FIELD
    return {
        r: limitar(r * alpha, 0.0, 1.0),
        g: limitar(g * alpha, 0.0, 1.0),
        b: limitar(b * alpha, 0.0, 1.0),
        a: alpha,
        reveal,
        scramble
    };
};
