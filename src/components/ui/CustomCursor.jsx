import { useEffect, useState, useRef } from 'react';
import './customCursor.css';

export default function CustomCursor() {
  const [cursorState, setCursorState] = useState({
    active: false,
    hovered: false,
    hidden: false,
    text: '',
    variant: 'default', // 'default', 'pointer', 'view', 'link'
  });

  const dotRef = useRef(null);
  const ringRef = useRef(null);

  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });

  useEffect(() => {
    // Disable completely on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const handleMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!cursorState.active) {
        setCursorState((prev) => ({ ...prev, active: true }));
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }

      // Check if pointer is over a native-cursor zone (like sandbox iframe)
      const isNative = e.target && e.target.closest && e.target.closest('[data-cursor="native"], [data-sandbox-container], iframe');
      if (isNative) {
        if (!cursorState.hidden) {
          setCursorState((prev) => ({ ...prev, hidden: true }));
        }
      } else {
        if (cursorState.hidden) {
          setCursorState((prev) => ({ ...prev, hidden: false }));
        }
      }
    };

    const handleMouseOver = (e) => {
      const isNative = e.target && e.target.closest && e.target.closest('[data-cursor="native"], [data-sandbox-container], iframe');
      if (isNative) {
        setCursorState((prev) => ({
          ...prev,
          hidden: true,
          hovered: false,
          text: '',
          variant: 'default'
        }));
        return;
      }

      const target = e.target.closest('a, button, [data-cursor], .interactive-node, input, select, textarea');
      if (target) {
        const cursorAttr = target.getAttribute('data-cursor');
        const isClickable = target.tagName === 'A' || target.tagName === 'BUTTON' || target.getAttribute('role') === 'button';
        setCursorState((prev) => ({
          ...prev,
          hidden: false,
          hovered: true,
          variant: cursorAttr || (isClickable ? 'pointer' : 'default'),
          text: cursorAttr === 'view' ? 'VER' : cursorAttr === 'link' ? 'OPEN' : cursorAttr === 'copy' ? 'COPIAR' : ''
        }));
      } else {
        setCursorState((prev) => ({
          ...prev,
          hidden: false,
          hovered: false,
          variant: 'default',
          text: ''
        }));
      }
    };

    const handleMouseLeave = () => {
      setCursorState((prev) => ({ ...prev, active: false }));
    };

    const handleHide = () => {
      setCursorState((prev) => ({ ...prev, hidden: true }));
    };

    const handleShow = () => {
      setCursorState((prev) => ({ ...prev, hidden: false }));
    };

    const handleWindowBlur = () => {
      if (document.activeElement && document.activeElement.tagName === 'IFRAME') {
        setCursorState((prev) => ({ ...prev, hidden: true }));
      }
    };

    const handleWindowFocus = () => {
      setCursorState((prev) => ({ ...prev, hidden: false }));
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });
    window.addEventListener('lldp-cursor-hide', handleHide);
    window.addEventListener('lldp-cursor-show', handleShow);
    window.addEventListener('blur', handleWindowBlur);
    window.addEventListener('focus', handleWindowFocus);
    document.addEventListener('mouseleave', handleMouseLeave);

    // Smooth lerp loop for the trailing ring
    let rafId;
    const lerp = (start, end, factor) => start + (end - start) * factor;

    const animateRing = () => {
      ringPos.current.x = lerp(ringPos.current.x, mousePos.current.x, 0.18);
      ringPos.current.y = lerp(ringPos.current.y, mousePos.current.y, 0.18);

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`;
      }
      rafId = requestAnimationFrame(animateRing);
    };

    rafId = requestAnimationFrame(animateRing);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('lldp-cursor-hide', handleHide);
      window.removeEventListener('lldp-cursor-show', handleShow);
      window.removeEventListener('blur', handleWindowBlur);
      window.removeEventListener('focus', handleWindowFocus);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(rafId);
    };
  }, [cursorState.active, cursorState.hidden]);

  if (!cursorState.active) return null;

  return (
    <div className="custom-cursor-container" aria-hidden="true">
      {/* Precision center dot */}
      <div
        ref={dotRef}
        className={`custom-cursor-dot ${cursorState.hovered ? 'hovered' : ''} ${cursorState.hidden ? 'cursor-hidden' : ''}`}
      />
      {/* Smooth lagging ring with state labels */}
      <div
        ref={ringRef}
        className={`custom-cursor-ring ${cursorState.hovered ? 'hovered' : ''} ${cursorState.variant} ${cursorState.hidden ? 'cursor-hidden' : ''}`}
      >
        {cursorState.text && (
          <span className="cursor-label">{cursorState.text}</span>
        )}
      </div>
    </div>
  );
}
