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

    const nodes = models["daytona"]?.nodes;


    if (!isComplete) return null;

    return (

        <group {...props} dispose={null} scale={.3} rotation={[Math.PI / 2, 0, 0]}>
            <mesh geometry={nodes.OuterRing.geometry} material={materials.OuterRing} />
            <mesh geometry={nodes.PointerSeconds.geometry} material={materials['Gold Rose 18K']} />
            <mesh geometry={nodes.WristBodyExterior.geometry} material={materials['Platinum polished']} />
            <mesh geometry={nodes.LockMiddleIn.geometry} material={materials['Gold Rose 18K']} />
            <mesh geometry={nodes.WristBodyInterior.geometry} material={materials['Gold Rose 18K']} />
            <mesh geometry={nodes.MarkerGold.geometry} material={materials['Gold Rose 18K']} />
            <mesh geometry={nodes.InnerRing.geometry} material={materials['Gold Rose 18K']} />
            <mesh geometry={nodes.WristInterior.geometry} material={materials['Gold Rose 18K']} />
            <mesh geometry={nodes.LockOuter.geometry} material={materials['Gold Rose 18K']} />
            <mesh geometry={nodes.WristExterior.geometry} material={materials['Platinum polished']} />
            <mesh geometry={nodes.DialDigits.geometry} material={materials.DigitsMaterial} />
            <mesh geometry={nodes.DialsLines.geometry} material={materials['Gold Rose 18K']} />
            <mesh geometry={nodes.Dial.geometry} material={materials.Dial} />
            <mesh geometry={nodes.CoverInside.geometry} material={materials['Gold Rose 18K']} />
            <mesh geometry={nodes.MainBody.geometry} material={materials['Gold Rose 18K']} />
            <mesh geometry={nodes.LockMiddleOut.geometry} material={materials['Gold Rose 18K']} />
            <mesh geometry={nodes.BoxMarker.geometry} material={materials['Gold Rose 18K']} />
            <mesh geometry={nodes.PointerMiddles.geometry} material={materials['Gold Rose 18K']} />
            <mesh geometry={nodes.DialRipples.geometry} material={materials['Gold Rose 18K']} />
            <mesh geometry={nodes.bgesferas.geometry} material={materials.backsphere} />
            <mesh geometry={nodes.NightMarkers.geometry} material={materials.markerFluor} />
            <mesh geometry={nodes.LogoFront.geometry} material={materials.Gold} />

            <mesh geometry={nodes.knobUp.geometry} material={materials['Gold Rose 18K']} position={[4.338, 10.175, -2.327]} rotation={[Math.PI / 2, 0, -Math.PI / 6]} />
            <mesh geometry={nodes.knobDown.geometry} material={materials['Gold Rose 18K']} position={[4.338, 10.175, 2.376]} rotation={[Math.PI / 2, 0, Math.PI / 6]} />
            <mesh geometry={nodes.PointerHourColor.geometry} material={materials.backsphere} />
            <mesh geometry={nodes.PointerHours.geometry} material={materials['Gold Rose 18K']} />
            <mesh geometry={nodes.PointerMinutes.geometry} material={materials['Gold Rose 18K']} />
            <mesh geometry={nodes.PointerMinutesColor.geometry} material={materials.backsphere} />
            <mesh geometry={nodes.DialPointerSeconds.geometry} material={materials['Gold Rose 18K']} position={[1.77, 11.021, -0.089]} />
            <mesh geometry={nodes.DialPointerMinutes.geometry} material={materials['Gold Rose 18K']} position={[0.01, 11.021, 1.871]} />
            <mesh geometry={nodes.DialPointerHours.geometry} material={materials['Gold Rose 18K']} position={[-1.738, 11.021, -0.058]} />
            <mesh geometry={nodes.KnobDots.geometry} material={materials['Gold Rose 18K']} />
            <mesh geometry={nodes.KnobMiddle.geometry} material={materials['Gold Rose 18K']} position={[5.817, 10.147, -0.021]} />

        </group>
    );
}




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