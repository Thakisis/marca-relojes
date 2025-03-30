import * as THREE from "three";
import { MeshTransmissionMaterial } from "@pmndrs/vanilla";
export function createDiscardMaterial(scene) {
	// Material descartado que mueve el objeto fuera del campo de visión
	return new THREE.ShaderMaterial({
		vertexShader: `
    void main() {
      // Desplazamos el objeto fuera del campo de visión
      vec4 newPosition = modelViewMatrix * vec4(position, 1.0);
      newPosition.y += 10000.0; // Mueve el objeto fuera del campo de visión
      gl_Position = projectionMatrix * newPosition;
    }
  `,
		fragmentShader: `
    void main() {
      discard; // Descartamos el fragmento
    }
  `,
		transparent: true,
	});
}

export function prepareModels({ models, materials, textures,scene,gl,camera }) {
	
	prepareDaytona(models["daytona"],textures,materials);
	const model=	models["daytona"].scene;

	scene.add(model)
	gl.compile(scene,camera);
	scene.remove(model);
	/*
	disableMaterials(
		models["daytona"].nodes,
		materials.discardMaterial,
		textures
	);*/
}

function disableMaterials(nodes, discardMaterial,scene) {
	Object.keys(nodes).forEach((nodeName) => {
		return (nodes[nodeName].material = discardMaterial);
	});
	

	//model.traverse((node) => {
	/*
		if (node.material) {
			//node.material = disableMaterials;
			if (node.name === "glass") {
				node.material = discardMaterial;
			}
			if (node.name === "Dial") {
				node.material.map = textures["TexturesDaytona"];
			}
		}
      */
	//});
}

function prepareDaytona(model,textures,materials){
	const materialProps ={
		thickness:  5,
		roughness:  0,
		clearcoat:  1,
		clearcoatRoughness:  0,
		transmission:  1,
		ior:  1.25,
		envMapIntensity:  25,
		color: '#ffffff',
		attenuationTint: '#000000',
		attenuationDistance:  100,
	  }
	console.log(model,materials);
	const glassMaterial =  new THREE.MeshPhysicalMaterial({
		color: 0x000000,
		
		metalness: 1,
		roughness: 0,
		blending: THREE.CustomBlending,
		blendEquation: THREE.AddEquation,
		blendSrc: THREE.OneMinusSrcColorFactor,
		blendDst: THREE.OneFactor
	
	  });
	  
	const nodes=model.nodes;
	const glass=nodes["glass"];
	glass.material=glassMaterial;

	
	
	
}

function prepareMaterials(materials, textures) {}
