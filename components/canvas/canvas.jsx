import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Environment } from '@react-three/drei';
import { Daytona } from './Daytona2';
function Canvas3d({ }) {
    return (
        <Canvas >
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <Suspense fallback={null}>
                <Daytona />
                <Environment files='/grey1.exr' environmentRotation={[0, Math.PI, Math.PI / 2]}
                    environmentIntensity={5}
                />
            </Suspense>
            <OrbitControls />

        </Canvas>
    );
}

export default Canvas3d;