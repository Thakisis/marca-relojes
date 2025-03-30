"use client";
import dynamic from 'next/dynamic';
const Canvas = dynamic(() => import('./canvas'), { ssr: false });

function CanvasContainer(props) {
    return (
        <div className='absolute inset-0 w-full h-full z-50'>
            <Canvas />
        </div>
    );
}

export default CanvasContainer;