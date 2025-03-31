import React from 'react';
import useAsteriumStore from '@/store';
import { MeshTransmissionMaterial } from '@react-three/drei';

const params = {
    color: 0xffffff,
    transmission: 1,
    opacity: 1,
    metalness: 0,
    roughness: 0,
    ior: 1.5,
    thickness: 0.01,
    specularIntensity: 1,
    specularColor: 0xffffff,
    envMapIntensity: 1,
    lightIntensity: 1,
    exposure: 1,
    transmissionResolutionScale: 1
};


export function Daytona(props) {
    const isComplete = useAsteriumStore((state) => state.preloading.isComplete);
    const models = useAsteriumStore((state) => state.models);
    const materials = useAsteriumStore((state) => state.materials);
    const glassRef = React.useRef(null);
    const nodes = models["daytona"]?.nodes;





    return (
        <group {...props} dispose={null}  >
            <group scale={1.2} rotation={[Math.PI / 2, Math.PI, Math.PI / 2]}>
                <mesh name="DialsInnerWave" castShadow receiveShadow geometry={nodes.DialsInnerWave.geometry} material={materials['Gold Rose 18K']} />
                <group name="SphereBase">
                    <mesh name="SphereBase_1" castShadow receiveShadow geometry={nodes.SphereBase_1.geometry} material={materials.SpherBase} />
                    <mesh name="SphereBase_2" castShadow receiveShadow geometry={nodes.SphereBase_2.geometry} material={materials.SphereCarved} />
                </group>

                <mesh name="SphereLines" castShadow receiveShadow geometry={nodes.SphereLines.geometry} material={materials.BLack_Not} />
                <mesh name="DialNumbers" castShadow receiveShadow geometry={nodes.DialNumbers.geometry} material={materials.NumbersMaterial} />
                <mesh name="Logo" castShadow receiveShadow geometry={nodes.Logo.geometry} material={materials.Gold} />
                <mesh name="SphereFluor" castShadow receiveShadow geometry={nodes.SphereFluor.geometry} material={materials.plastic_glossy_white} />
                <mesh name="SphereMarkers" castShadow receiveShadow geometry={nodes.SphereMarkers.geometry} material={materials['Gold Rose 18K']} />
                <mesh name="DialsRings" castShadow receiveShadow geometry={nodes.DialsRings.geometry} material={materials.plastic_glossy_white} />
                <group name="PointHour">
                    <mesh name="PointHour_1" castShadow receiveShadow geometry={nodes.PointHour_1.geometry} material={materials.plastic_glossy_white} />
                    <mesh name="PointHour_2" castShadow receiveShadow geometry={nodes.PointHour_2.geometry} material={materials.plastic_glossy_white} />
                    <mesh name="PointHour_3" castShadow receiveShadow geometry={nodes.PointHour_3.geometry} material={materials.plastic_glossy_white} />
                </group>
                <mesh name="DialsMarkers" castShadow receiveShadow geometry={nodes.DialsMarkers.geometry} material={materials.plastic_glossy_white} />
                <mesh name="DialsOuterWaves" castShadow receiveShadow geometry={nodes.DialsOuterWaves.geometry} material={materials.plastic_glossy_white} />
                <mesh name="DialInnerCircle" castShadow receiveShadow geometry={nodes.DialInnerCircle.geometry} material={materials.DialsInnerCircle} />
                <group name="PointerBase">
                    <mesh name="PointerBase_1" castShadow receiveShadow geometry={nodes.PointerBase_1.geometry} material={materials.plastic_glossy_white} />
                    <mesh name="PointerBase_2" castShadow receiveShadow geometry={nodes.PointerBase_2.geometry} material={materials.plastic_glossy_white} />
                </group>
                <group name="PointMin">
                    <mesh name="PointMin_1" castShadow receiveShadow geometry={nodes.PointMin_1.geometry} material={materials.plastic_glossy_white} />
                    <mesh name="PointMin_2" castShadow receiveShadow geometry={nodes.PointMin_2.geometry} material={materials.plastic_glossy_white} />
                    <mesh name="PointMin_3" castShadow receiveShadow geometry={nodes.PointMin_3.geometry} material={materials.plastic_glossy_white} />
                </group>
                <mesh name="PointSec" castShadow receiveShadow geometry={nodes.PointSec.geometry} material={materials.plastic_glossy_white} />
                <mesh name="DialPointerLeft" castShadow receiveShadow geometry={nodes.DialPointerLeft.geometry} material={materials.plastic_glossy_white} position={[1.927, -0.522, 0.065]} />
                <mesh name="DialPointerRight" castShadow receiveShadow geometry={nodes.DialPointerRight.geometry} material={materials.plastic_glossy_white} position={[1.927, 0.527, 0.065]} />
                <mesh name="DialCenter" castShadow receiveShadow geometry={nodes.DialCenter.geometry} material={materials.plastic_glossy_white} />
                <mesh name="DialPointerDown" castShadow receiveShadow geometry={nodes.DialPointerDown.geometry} material={materials.plastic_glossy_white} position={[1.927, 0.001, -0.525]} />
                <mesh name="LogoText" castShadow receiveShadow geometry={nodes.LogoText.geometry} material={materials.logoTextMat} />
                <mesh name="base" castShadow receiveShadow geometry={nodes.base.geometry} material={materials.Socle} />
                <mesh name="BackPlate" castShadow receiveShadow geometry={nodes.BackPlate.geometry} material={materials['Gold Rose 18K']} />
                <mesh name="InnerRing" castShadow receiveShadow geometry={nodes.InnerRing.geometry} material={materials['Gold Rose 18K']} />
                <mesh name="KnobCenter" castShadow receiveShadow geometry={nodes.KnobCenter.geometry} material={materials['Gold Rose 18K']} position={[1.643, 1.888, 0.015]} scale={[0.725, 0.264, 0.264]} />
                <mesh name="LockMiddleIn" castShadow receiveShadow geometry={nodes.LockMiddleIn.geometry} material={materials['Gold Rose 18K']} />
                <mesh name="LockMiddleOut" castShadow receiveShadow geometry={nodes.LockMiddleOut.geometry} material={materials['Gold Rose 18K']} />
                <mesh name="LockOuter" castShadow receiveShadow geometry={nodes.LockOuter.geometry} material={materials['Gold Rose 18K']} />
                <mesh name="MainBody" castShadow receiveShadow geometry={nodes.MainBody.geometry} material={materials['Gold Rose 18K']} />
                <mesh name="OuterRing" castShadow receiveShadow geometry={nodes.OuterRing.geometry} material={materials.plastic_glossy_white} />
                <mesh name="WristBodyExterior" castShadow receiveShadow geometry={nodes.WristBodyExterior.geometry} material={materials['Platinum polished']} />
                <mesh name="WristBodyInterior" castShadow receiveShadow geometry={nodes.WristBodyInterior.geometry} material={materials['Gold Rose 18K']} />
                <mesh name="WristExterior" castShadow receiveShadow geometry={nodes.WristExterior.geometry} material={materials['Platinum polished']} />
                <mesh name="WristInterior" castShadow receiveShadow geometry={nodes.WristInterior.geometry} material={materials['Gold Rose 18K']} />
                <mesh name="knobDown" castShadow receiveShadow geometry={nodes.knobDown.geometry} material={materials['Gold Rose 18K']} position={[1.651, 1.277, -0.655]} rotation={[1.075, 0, -Math.PI / 2]} />
                <mesh name="knobUp" castShadow receiveShadow geometry={nodes.knobUp.geometry} material={materials['Gold Rose 18K']} position={[1.651, 1.308, 0.667]} rotation={[2.122, 0, -Math.PI / 2]} />
                <mesh ref={glassRef} name="glass" castShadow receiveShadow geometry={nodes.glass.geometry}   >
                    <MeshTransmissionMaterial
                        ref={glassRef}
                        resolution={2048}
                        transmission={1}
                        thickness={0}
                        roughness={0}
                        backside={true}
                        ior={1}
                        clearcoat={1}
                        clearcoatRoughness={0}


                        distortion={0}

                        temporalDistortion={0.0} />
                </mesh>
            </group>
        </group>
    );
}
/*
*/





// Función para simular el movimiento estilo Rolex en Three.js
function moveRolex(tiempo, manecillas) {
    const { hor, min, sec } = manecillas;

    // Obtenemos la hora actual con milisegundos para mayor precisión
    const ahora = new Date();
    const ms = ahora.getMilliseconds();
    const s = ahora.getSeconds();
    const m = ahora.getMinutes();
    const h = ahora.getHours() % 12;

    // Calculamos los ángulos en radianes con precisión de milisegundos
    // El sec avanza 8 pasos por segundo (28,800 vph)
    const pasossec = 8; // 8 Hz típico de Rolex

    // Calculamos el tiempo fraccional dentro del actual 1/8 de segundo
    const fraccionSegundo = s + ms / 1000;

    // Discretizamos el movimiento en 8 pasos por segundo para el sec
    // Esto crea pequeños micro-saltos ocho veces por segundo
    const microPaso = Math.floor(fraccionSegundo * pasossec) / pasossec;

    // Calculamos los ángulos con alta precisión
    const anguloSegundos = microPaso * 6 * (Math.PI / 180);
    const anguloMinutos = (m + s / 60) * 6 * (Math.PI / 180);
    const anguloHoras = (h + m / 60) * 30 * (Math.PI / 180);

    // Aplicamos rotaciones
    hor.rotation.y = -anguloHoras;
    min.rotation.y = -anguloMinutos;
    sec.rotation.y = -anguloSegundos;
}