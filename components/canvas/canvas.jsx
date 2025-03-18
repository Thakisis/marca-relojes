import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { CameraControls, OrthographicCamera, PerspectiveCamera } from '@react-three/drei';
import { Environment } from '@react-three/drei';
import { Daytona } from './Daytona';
import * as THREE from 'three';
function Canvas3d({ }) {



    return (
        <Canvas flat={THREE.ACESFilmicToneMapping} dpr={[1, 2]}>

            <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={50} />



            <Suspense fallback={null}>
                <Daytona scale={1.4} position={[15, 0, -20]} rotation={[Math.PI / 2, 0, Math.PI / 4.5]} />
                <Environment files='/grey1.exr' environmentRotation={[0, Math.PI, Math.PI / 2]}
                    environmentIntensity={5}
                />
            </Suspense>
            <CameraControls />

        </Canvas>
    );
}

export default Canvas3d;