import React from 'react';
import { Daytona } from '@/components/objects3d/daytona';
import { Backdrop, PerspectiveCamera, spotLight } from '@react-three/drei';
export function SceneIndex(props) {
    return (
        <>
            <Backdrop castShadow floor={2} position={[0, -4, -5]} scale={[50, 20, 4]} >
                <meshStandardMaterial color="#353540" envMapIntensity={0.1} />
            </Backdrop>

            <spotLight position={[5, 0, 5]} intensity={2.5} penumbra={1} angle={0.35} castShadow color="#0c8cbf" />
            <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={50} />
            <Daytona />
        </>
    );
}

