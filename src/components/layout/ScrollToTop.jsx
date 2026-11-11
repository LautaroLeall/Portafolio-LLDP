import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        const resetScroll = () => {
            if (window.__lenis) {
                window.__lenis.resize();
                window.__lenis.scrollTo(0, { immediate: true });
            }
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: 'instant'
            });
            document.documentElement.scrollTop = 0;
            document.body.scrollTop = 0;
        };

        // 1. Immediately on route trigger
        resetScroll();

        // 2. Next animation frame
        const rafId = requestAnimationFrame(resetScroll);

        // 3. Staggered checks during route transition and lazy chunk mounting
        const t1 = setTimeout(resetScroll, 80);
        const t2 = setTimeout(resetScroll, 200);
        const t3 = setTimeout(resetScroll, 400);
        const t4 = setTimeout(resetScroll, 800);

        return () => {
            cancelAnimationFrame(rafId);
            clearTimeout(t1);
            clearTimeout(t2);
            clearTimeout(t3);
            clearTimeout(t4);
        };
    }, [pathname]);

    return null;
}
