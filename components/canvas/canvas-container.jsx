"use client";
import dynamic from 'next/dynamic';
const Canvas = dynamic(() => import('./canvas'), { ssr: false });
import { A11yAnnouncer } from '@react-three/a11y';
function CanvasContainer(props) {
    return (
        <div className='absolute inset-0 w-full h-full z-50'>
            <Canvas />
            <A11yAnnouncer />
        </div>
    );
}

export default CanvasContainer;