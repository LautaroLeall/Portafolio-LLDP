import { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';
import { useLocation } from 'react-router-dom';

const LoaderContext = createContext({
  isPageLoading: false,
  loadingMessage: '',
  showPageLoader: () => { },
  hidePageLoader: () => { }
});

/**
 * LoaderProvider — Proveedor de Estado de Carga entre Páginas y Procesos
 * Gestiona de forma automática la transición entre rutas y permite a cualquier
 * componente activar el loader cuando una acción o petición demore.
 */
export function LoaderProvider({ children }) {
  const [isRouteTransition, setIsRouteTransition] = useState(false);
  const [asyncCount, setAsyncCount] = useState(0);
  const [loadingMessage, setLoadingMessage] = useState('');
  const location = useLocation();
  const isFirstMount = useRef(true);
  const lastPathnameRef = useRef(location.pathname);

  // Detección sincrónica inmediata de cambio de ruta en tiempo de render
  const isPathChanged = !isFirstMount.current && lastPathnameRef.current !== location.pathname;

  // Transición suave automática al cambiar de ruta
  useEffect(() => {
    // Evitar disparar en el primer render para que no compita con el Preloader inicial
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }

    lastPathnameRef.current = location.pathname;
    setIsRouteTransition(true);
    const timer = setTimeout(() => {
      setIsRouteTransition(false);
      setLoadingMessage('');
    }, 280); // 280ms de transición fluida

    return () => clearTimeout(timer);
  }, [location.pathname]);

  const showPageLoader = useCallback((message = '') => {
    if (message) setLoadingMessage(message);
    setAsyncCount((c) => c + 1);
  }, []);

  const hidePageLoader = useCallback(() => {
    setAsyncCount((c) => Math.max(0, c - 1));
  }, []);

  const isPageLoading = isRouteTransition || isPathChanged || asyncCount > 0;

  return (
    <LoaderContext.Provider
      value={{
        isPageLoading,
        loadingMessage,
        showPageLoader,
        hidePageLoader
      }}
    >
      {children}
    </LoaderContext.Provider>
  );
}

// Hook de consumo
// eslint-disable-next-line react-refresh/only-export-components
export function usePageLoader() {
  return useContext(LoaderContext);
}
