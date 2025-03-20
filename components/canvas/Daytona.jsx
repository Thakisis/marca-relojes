

import React, { useMemo, useRef } from 'react'
import { MeshTransmissionMaterial, useGLTF } from '@react-three/drei'
import { createMaterials } from './materials'
import { useFrame } from '@react-three/fiber'
export function Daytona(props) {
  const { nodes, materials: originMaterial } = useGLTF('/models/Daytona.glb')
  const materials = useMemo(() => createMaterials(originMaterial), [originMaterial])


  const refMin = useRef(null)
  const refSec = useRef(null)
  const refHour = useRef(null)

  useFrame(() => {

    if (!refMin.current || !refSec.current || !refHour.current) return
    //refSec.current.rotation.y += .01
    moveRolex(0, { hor: refHour.current, min: refMin.current, sec: refSec.current })

  })


  return (
    <group {...props} dispose={null}>
      <group position={[4.338, 10.175, -2.327]} rotation={[0, Math.PI / 6, 0]}>
        <mesh geometry={nodes.knobUp.geometry} material={materials['Gold Rose 18K']} rotation={[Math.PI / 2, 0, 0]} />
      </group>
      <group position={[4.338, 10.175, 2.376]} rotation={[0, -Math.PI / 6, 0]}>
        <mesh geometry={nodes.knobDown.geometry} material={materials['Gold Rose 18K']} rotation={[Math.PI / 2, 0, 0]} />
      </group>
      <group position={[-1.739, 10.003, -0.058]}>
        <mesh geometry={nodes.DialPointerSeconds.geometry} material={materials['Gold Rose 18K']} position={[3.509, 1.018, -0.031]} />
      </group>
      <group position={[-1.739, 10.003, -0.058]}>
        <mesh geometry={nodes.DialPointerMinutes.geometry} material={materials['Gold Rose 18K']} position={[1.749, 1.018, 1.929]} />
      </group>
      <group position={[-1.739, 10.003, -0.058]}>
        <mesh geometry={nodes.DialPointerHours.geometry} material={materials['Gold Rose 18K']} position={[0.001, 1.018, 0]} />
      </group>
      <group position={[0, 10.147, -0.021]}>
        <mesh geometry={nodes.KnobDots.geometry} material={materials['Gold Rose 18K']} position={[0, -10.147, 0.021]} />
        <mesh geometry={nodes.KnobMiddle.geometry} material={materials['Gold Rose 18K']} position={[5.817, 0, 0]} />
      </group>
      <mesh geometry={nodes.OuterRing.geometry} material={materials.OuterRing} />

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
      <group ref={refHour}>
        <mesh geometry={nodes.PointerHourColor.geometry} material={materials.backsphere} />
        <mesh geometry={nodes.PointerHours.geometry} material={materials['Gold Rose 18K']} />
      </group>
      <group ref={refMin}>
        <mesh geometry={nodes.PointerMinutes.geometry} material={materials['Gold Rose 18K']} position={[0, 0, 0.005]} />
        <mesh geometry={nodes.PointerMinutesColor.geometry} material={materials.backsphere} position={[0, 0, 0.005]} />
      </group>
      <mesh geometry={nodes.PointerSeconds.geometry} ref={refSec} material={materials['Gold Rose 18K']} rotation={[0, -0.619, 0]} />
      <mesh geometry={nodes.glass.geometry} material={materials.glass} >
        <MeshTransmissionMaterial clearcoat={1} clearcoatRoughness={0} />

      </mesh>
    </group>


  )
}

useGLTF.preload('/models/Daytona.glb')


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
