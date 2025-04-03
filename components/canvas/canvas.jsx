import React, { Suspense, useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Backdrop, CameraControls, ContactShadows, MeshTransmissionMaterial, OrthographicCamera, PerspectiveCamera } from '@react-three/drei';
import { Environment } from '@react-three/drei';
import useAsteriumStore from '@/store';
import * as THREE from 'three';
import { SceneIndex } from '@/components/scenes/sceneIndex';

function Canvas3d({ }) {

    //    const mouse = useRef(new THREE.Vector3());
    const setCanvasReady = useAsteriumStore((state) => state.Actions.setCanvasReady);
    const isComplete = useAsteriumStore((state) => state.preloading.isComplete);

    /*const onMouseMove = (event) => {
        const { clientX, clientY } = event;
        mouse.current.set(
            (clientX / window.innerWidth) * 2 - 1,
            -(clientY / window.innerHeight) * 2 + 1,
            0
        );
    };
    onMouseMove={onMouseMove}
*/



    return (
        <Canvas shadows dpr={[1, 1.5]} gl={{ antialias: true }} camera={{ position: [0, 0, 15], fov: 17.5, near: 1, far: 20 }}
            onCreated={setCanvasReady}

        >
            <ContactShadows position={[0, -0.485, 0]} scale={5} blur={1.5} far={1} />
            <Scenes />
            <Suspense fallback={null}>
            
                <Environment files='/grey1.exr' environmentRotation={[0, Math.PI, Math.PI / 2]}
                    environmentIntensity={1}
                />
                
            </Suspense>
        
            <CameraControls></CameraControls>
        </Canvas>
    );
}

export default Canvas3d;

function Scenes() {
    const isComplete = useAsteriumStore((state) => state.preloading.isComplete);
    if (!isComplete) return null;
    return (
        <>
            <SceneIndex />
        </>
    )

}







function Trail({ mouse }) {
    const trail = useRef();
    const points = useMemo(() => new Array(50).fill().map(() => new THREE.Vector3()), []);
    const sizes = useMemo(() => new Array(50).fill().map(() => 0), []);

    useFrame(() => {
        // Update current mouse position
        points[0].copy(mouse.current);
        sizes[0] = 0.1;

        // Update trail points
        for (let i = points.length - 1; i > 0; i--) {
            points[i].lerp(points[i - 1], 0.9);
            // Evolve thickness (starts small, grows, then fades)
            sizes[i] = sizes[i - 1] * 0.95 + (i / points.length) * 0.05;
        }

        // Update line geometry
        trail.current.geometry.setFromPoints(points);
        trail.current.geometry.attributes.size.array.set(sizes);
        trail.current.geometry.attributes.size.needsUpdate = true;
        trail.current.geometry.attributes.position.needsUpdate = true;
    });

    const sizesArray = useMemo(() => new Float32Array(sizes), []);

    return (
        <line>
            <bufferGeometry ref={trail}>
                <bufferAttribute
                    attach="attributes-position"
                    count={points.length}
                    array={new Float32Array(points.length * 3)}
                    itemSize={3}
                />
                <bufferAttribute
                    attach="attributes-size"
                    count={sizes.length}
                    array={sizesArray}
                    itemSize={1}
                />
            </bufferGeometry>
            <lineBasicMaterial
                color="#ffd700"
                linewidth={2}
                transparent
                opacity={0.8}
                vertexColors={false}
            />
        </line>
    );
}

