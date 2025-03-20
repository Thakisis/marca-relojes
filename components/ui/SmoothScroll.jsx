'use client';

import { useEffect } from 'react';

import { ReactLenis, useLenis } from 'lenis/react';

function SmoothScrolling({ children }) {
    const lenis = useLenis(({ scroll }) => {

    });
    useEffect(() => {
        if (!lenis) return;
        lenis.stop();
        return lenis.start();
    }, [lenis]);
    return (
        <ReactLenis root options={{ lerp: 0.1, duration: 1.5, smoothTouch: true }}>
            {children}
        </ReactLenis>
    );
}

export default SmoothScrolling;
