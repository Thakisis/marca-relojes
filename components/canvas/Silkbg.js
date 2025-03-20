import * as THREE from "three";
import { Canvas, useFrame, extend } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";
import { useRef } from "react";

const GoldSilkMaterial = shaderMaterial(
	{
		iTime: 0,
		iResolution: new THREE.Vector2(window.innerWidth, window.innerHeight),
		iMouse: new THREE.Vector3(0, 0, 0),
		darkGold: new THREE.Vector3(0.12, 0.08, 0.02),
		midGold: new THREE.Vector3(0.25, 0.18, 0.05),
		brightGold: new THREE.Vector3(1.0, 0.8, 0.2),
		fabricDensity: 0.0006,
		baseVariation: 0.3,
		highlightIntensity: 2.0,
		highlightSize: 0.1,
		highlightThreshold: 0.3,
		highlightContrast: 4.0,
		shineIntensity: 0.6,
		rippleFrequencyPrimary: 5.0,
		rippleFrequencySecondary: 12.0,
		rippleAmplitude: 0.03,
		rippleSpeed: 8.0,
		rippleDimension: 0.005,
	},
	// Vertex Shader
	`
  varying vec2 vUv;
  
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
  `,
	// Fragment Shader
	`
  varying vec2 vUv;
  uniform float iTime;
  uniform vec2 iResolution;
  uniform vec3 iMouse;
  uniform vec3 darkGold, midGold, brightGold;
  uniform float fabricDensity, baseVariation, highlightIntensity, highlightSize;
  uniform float highlightThreshold, highlightContrast, shineIntensity;
  uniform float rippleFrequencyPrimary, rippleFrequencySecondary;
  uniform float rippleAmplitude, rippleSpeed, rippleDimension;
  
  float noise(vec2 p) {
    return smoothstep(-0.5, 0.9, sin((p.x - p.y) * 555.0) * sin(p.y * 1444.0)) - 0.4;
  }
  
  float fabric(vec2 p) {
    const mat2 m = mat2(1.6, 1.2, -1.2, 1.6);
    float f = 0.4 * noise(p);
    f += 0.3 * noise(p = m * p);
    f += 0.2 * noise(p = m * p);
    return f + 0.1 * noise(m * p);
  }
  
  float silk(vec2 uv, float t) {
    float s = sin(rippleFrequencyPrimary * (uv.x + uv.y + cos(2.0 * uv.x + 5.0 * uv.y)) + 
               sin(rippleFrequencySecondary * (uv.x + uv.y)) - t);
    s = 0.7 + 0.3 * (s * s * 0.5 + s);
    s *= 0.9 + 0.6 * fabric(uv * min(iResolution.x, iResolution.y) * fabricDensity);
    return s * 0.9 + 0.1;
  }
  
  float highlight(vec2 uv, float t) {
    vec2 dir = vec2(0.5, 0.5);
    float pattern = silk(uv + dir * highlightSize, t) - silk(uv - dir * highlightSize, t);
    return pow(max(0.0, pattern + highlightThreshold), highlightContrast) * highlightIntensity; 
  }
  
  vec3 goldSilkColor(float base, float highlightFactor) {
    vec3 c = darkGold;
    c = mix(c, midGold, base * baseVariation);
    c = mix(c, brightGold, highlightFactor);
    return c;
  }
  
  void main() {
    vec2 uv = vUv;
    float t = iTime;
    uv.y += rippleAmplitude * sin(rippleSpeed * uv.x - t);
    
    if (iMouse.z > 1.0) {
      uv += smoothstep(0.5, 0.0, distance(iMouse.xy / iResolution, uv)) * 0.08;
    }
    
    float s = silk(uv, t);
    float h = highlight(uv, t);
    vec3 c = goldSilkColor(s, h);
    
    gl_FragColor = vec4(pow(c, vec3(0.95)), 1.0);
  }
  `
);

extend({ GoldSilkMaterial });

export const SilkPlane = () => {
	const materialRef = useRef();

	useFrame(({ clock }) => {
		if (materialRef.current) {
			materialRef.current.iTime = clock.getElapsedTime();
		}
	});

	return (
		<mesh
			scale={[(window.innerWidth / window.innerHeight) * 5, 5, 1]}
			drawOrder={0}
		>
			<planeGeometry args={[2, 2]} />
			<goldSilkMaterial
				ref={materialRef}
				attach="material"
				depthWrite={false}
			/>
		</mesh>
	);
};

export default function App() {
	return (
		<Canvas style={{ background: "#222" }}>
			<SilkPlane />
		</Canvas>
	);
}
