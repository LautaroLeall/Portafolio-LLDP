/**
 * languageTypingTransition.js — Motor de Transición de Tipeo Suave, Natural y Sin Saltos (Zero-CLS)
 * Anima con cadencia humana y limpia los textos visibles en el viewport al cambiar de idioma (ES <-> EN).
 */

let activeCleanup = null;
let prevTextNodesMap = new WeakMap();
let prevPlaceholdersMap = new WeakMap();

/**
 * Limpia inmediatamente cualquier animación de tipeo activa y restaura los nodos de texto nativos de React.
 */
export function cancelLanguageTypingTransition() {
  if (typeof activeCleanup === 'function') {
    activeCleanup();
    activeCleanup = null;
  }
}

/**
 * Captura el estado previo de los nodos de texto visibles antes de cambiar el estado de idioma en React.
 */
export function capturePreLanguageSnapshot() {
  if (typeof document === 'undefined') return;

  cancelLanguageTypingTransition();

  const root = document.getElementById('root');
  if (!root) return;

  const textMap = new WeakMap();
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  let currentNode = walker.nextNode();

  while (currentNode) {
    textMap.set(currentNode, currentNode.nodeValue);
    currentNode = walker.nextNode();
  }
  prevTextNodesMap = textMap;

  const placeholderMap = new WeakMap();
  const inputs = root.querySelectorAll('input[placeholder], textarea[placeholder]');
  inputs.forEach((el) => {
    placeholderMap.set(el, el.getAttribute('placeholder') || '');
  });
  prevPlaceholdersMap = placeholderMap;
}

/**
 * Curva de tipeo natural: arranque suave, ritmo constante de escritura en el medio y cierre delicado.
 */
function naturalTypingEase(t) {
  if (t <= 0) return 0;
  if (t >= 1) return 1;
  // Combinación 70% lineal (cadencia constante de tipeo) + 30% smoothstep (sin tirón inicial ni final)
  const smoothstep = t * t * (3 - 2 * t);
  return t * 0.7 + smoothstep * 0.3;
}

/**
 * Ejecuta el efecto de máquina de escribir (typewriter) sobre los textos traducidos visibles en pantalla.
 */
export function runLanguageTypingTransition() {
  if (typeof document === 'undefined' || typeof window === 'undefined') return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  cancelLanguageTypingTransition();

  const root = document.getElementById('root');
  if (!root) return;

  const viewportHeight = window.innerHeight;
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const candidates = [];

  const ignoredTags = new Set([
    'SCRIPT',
    'STYLE',
    'NOSCRIPT',
    'TEXTAREA',
    'INPUT',
    'SVG',
    'PATH',
    'CODE'
  ]);

  const caretEligibleTags = new Set(['H1', 'H2', 'H3', 'P']);

  let node = walker.nextNode();
  while (node) {
    const fullText = node.nodeValue || '';
    const trimmed = fullText.trim();

    if (trimmed.length > 1) {
      const parent = node.parentElement;
      if (
        parent &&
        !ignoredTags.has(parent.tagName) &&
        !parent.closest('[data-no-typing], [data-lldp-typing]')
      ) {
        const prevText = prevTextNodesMap.get(node);
        // Solo animar los textos que efectivamente cambiaron al traducirse
        if (prevText !== fullText) {
          const rect = parent.getBoundingClientRect();
          const isVisible =
            rect.width > 0 &&
            rect.height > 0 &&
            rect.bottom >= -20 &&
            rect.top <= viewportHeight + 40;

          if (isVisible) {
            const computed = window.getComputedStyle(parent);
            const isGradientText =
              parent.classList.contains('bg-clip-text') ||
              computed.webkitBackgroundClip === 'text' ||
              computed.backgroundClip === 'text';

            // Mostrar el cursor solo en títulos y párrafos principales para mantener limpieza visual
            const blockParent = parent.closest('h1, h2, h3, p');
            const showCaret = Boolean(blockParent && caretEligibleTags.has(blockParent.tagName) && trimmed.length >= 6);

            candidates.push({
              node,
              parent,
              fullText,
              top: rect.top,
              left: rect.left,
              width: rect.width,
              isGradientText,
              showCaret
            });
          }
        }
      }
    }
    node = walker.nextNode();
  }

  // Capturar inputs con placeholder traducido visibles en pantalla
  const placeholderTargets = [];
  const inputs = root.querySelectorAll('input[placeholder], textarea[placeholder]');
  inputs.forEach((el) => {
    const fullPlaceholder = el.getAttribute('placeholder') || '';
    const prevPlaceholder = prevPlaceholdersMap.get(el);
    if (fullPlaceholder && prevPlaceholder !== fullPlaceholder) {
      const rect = el.getBoundingClientRect();
      if (rect.width > 0 && rect.bottom >= 0 && rect.top <= viewportHeight) {
        placeholderTargets.push({
          el,
          fullPlaceholder,
          top: rect.top
        });
      }
    }
  });

  if (candidates.length === 0 && placeholderTargets.length === 0) return;

  // Ordenar de arriba hacia abajo para lograr una cascada visual orgánica y pausada
  candidates.sort((a, b) => a.top - b.top || a.left - b.left);

  const activeItems = [];

  for (const item of candidates) {
    const { node: textNode, parent, fullText, top, width, isGradientText, showCaret } = item;
    // Cascada suave desde arriba hacia abajo (0ms a 260ms)
    const delay = Math.min(260, Math.max(0, (Math.max(0, top) / viewportHeight) * 240));
    // Duración pausada, lenta y natural: entre 850ms (textos cortos) y 1450ms (párrafos largos)
    const duration = Math.min(1450, Math.max(850, 720 + fullText.length * 5.8));

    if (isGradientText) {
      const prevMinWidth = parent.style.minWidth;
      const prevDisplay = parent.style.display;
      parent.style.minWidth = `${Math.ceil(width)}px`;
      if (window.getComputedStyle(parent).display === 'inline') {
        parent.style.display = 'inline-block';
      }
      textNode.nodeValue = '';

      activeItems.push({
        type: 'gradient',
        textNode,
        parent,
        fullText,
        prevMinWidth,
        prevDisplay,
        delay,
        duration
      });
    } else {
      const wrapper = document.createElement('span');
      wrapper.setAttribute('data-lldp-typing', 'true');
      wrapper.className = 'lldp-typing-wrapper';

      const typedSpan = document.createElement('span');
      typedSpan.className = 'lldp-typed-prefix';
      typedSpan.textContent = '';

      const caretSpan = document.createElement('span');
      caretSpan.className = showCaret ? 'lldp-typing-caret' : 'lldp-typing-caret-hidden';

      const untypedSpan = document.createElement('span');
      untypedSpan.className = 'lldp-untyped-suffix';
      untypedSpan.textContent = fullText;

      wrapper.appendChild(typedSpan);
      wrapper.appendChild(caretSpan);
      wrapper.appendChild(untypedSpan);

      textNode.nodeValue = '';
      if (textNode.parentNode) {
        textNode.parentNode.insertBefore(wrapper, textNode.nextSibling);
      }

      activeItems.push({
        type: 'standard',
        textNode,
        wrapper,
        typedSpan,
        caretSpan,
        untypedSpan,
        fullText,
        delay,
        duration
      });
    }
  }

  placeholderTargets.forEach((pt) => {
    pt.el.setAttribute('placeholder', '');
  });

  let rafId = null;
  let cleaned = false;
  const startTime = performance.now();

  const cleanup = () => {
    if (cleaned) return;
    cleaned = true;
    if (rafId) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }

    for (const item of activeItems) {
      if (item.type === 'gradient') {
        item.textNode.nodeValue = item.fullText;
        item.parent.style.minWidth = item.prevMinWidth;
        item.parent.style.display = item.prevDisplay;
      } else {
        item.textNode.nodeValue = item.fullText;
        if (item.wrapper && item.wrapper.parentNode) {
          item.wrapper.parentNode.removeChild(item.wrapper);
        }
      }
    }

    for (const pt of placeholderTargets) {
      pt.el.setAttribute('placeholder', pt.fullPlaceholder);
    }
  };

  activeCleanup = cleanup;

  const tick = (now) => {
    if (cleaned) return;
    const elapsed = now - startTime;
    let allDone = true;

    for (const item of activeItems) {
      const localTime = elapsed - item.delay;
      if (localTime <= 0) {
        allDone = false;
        continue;
      }

      const rawProgress = Math.min(1, localTime / item.duration);
      const eased = naturalTypingEase(rawProgress);
      const charCount = Math.floor(eased * item.fullText.length);

      if (rawProgress < 1) {
        allDone = false;
      }

      if (item.type === 'gradient') {
        item.textNode.nodeValue = item.fullText.slice(0, charCount);
      } else {
        item.typedSpan.textContent = item.fullText.slice(0, charCount);
        item.untypedSpan.textContent = item.fullText.slice(charCount);
        if (rawProgress >= 1 && item.caretSpan) {
          item.caretSpan.style.opacity = '0';
        }
      }
    }

    for (const pt of placeholderTargets) {
      const rawProgress = Math.min(1, elapsed / 780);
      const eased = naturalTypingEase(rawProgress);
      const charCount = Math.floor(eased * pt.fullPlaceholder.length);
      pt.el.setAttribute('placeholder', pt.fullPlaceholder.slice(0, charCount));
      if (rawProgress < 1) {
        allDone = false;
      }
    }

    if (!allDone) {
      rafId = requestAnimationFrame(tick);
    } else {
      cleanup();
      if (activeCleanup === cleanup) {
        activeCleanup = null;
      }
    }
  };

  rafId = requestAnimationFrame(tick);
}
