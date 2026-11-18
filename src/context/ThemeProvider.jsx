import { useState, useEffect } from 'react';
import { flushSync } from 'react-dom';
import { ThemeContext } from './ThemeContext';

const applyThemeToDOM = (targetTheme) => {
  const root = document.documentElement;
  const body = document.body;

  root.classList.remove('light', 'dark');
  root.classList.add(targetTheme);

  body.classList.remove('light', 'dark');
  body.classList.add(targetTheme);

  localStorage.setItem('theme', targetTheme);
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'dark';
  });

  useEffect(() => {
    applyThemeToDOM(theme);
  }, [theme]);

  const toggleTheme = (event) => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';

    if (
      typeof document === 'undefined' ||
      typeof window === 'undefined' ||
      !document.startViewTransition ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      applyThemeToDOM(nextTheme);
      setTheme(nextTheme);
      return;
    }

    // Origen arriba a la derecha: toma el botón del Navbar superior derecho o la esquina superior derecha
    let originX = window.innerWidth - 44;
    let originY = 36;

    if (event && event.currentTarget && typeof event.currentTarget.getBoundingClientRect === 'function') {
      const rect = event.currentTarget.getBoundingClientRect();
      if (rect.width > 0 && rect.top < 120 && rect.left > window.innerWidth * 0.45) {
        originX = rect.left + rect.width / 2;
        originY = rect.top + rect.height / 2;
      }
    }

    const maxRadius = Math.hypot(
      Math.max(originX, window.innerWidth - originX),
      Math.max(originY, window.innerHeight - originY)
    );

    const root = document.documentElement;
    root.classList.add('theme-transitioning');

    try {
      const transition = document.startViewTransition(() => {
        flushSync(() => {
          applyThemeToDOM(nextTheme);
          setTheme(nextTheme);
        });
      });

      transition.ready
        .then(() => {
          root.animate(
            {
              clipPath: [
                `circle(0px at ${originX}px ${originY}px)`,
                `circle(${maxRadius}px at ${originX}px ${originY}px)`
              ]
            },
            {
              duration: 1150,
              easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
              pseudoElement: '::view-transition-new(root)'
            }
          );
        })
        .catch(() => { });

      transition.finished.finally(() => {
        root.classList.remove('theme-transitioning');
      });
    } catch {
      root.classList.remove('theme-transitioning');
      applyThemeToDOM(nextTheme);
      setTheme(nextTheme);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
