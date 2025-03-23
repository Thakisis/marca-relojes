import * as THREE from "three";
export function createDiscardMaterial() {
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

export function prepareModels({ models, materials, textures }) {
	disableMaterials(
		models["daytona"].nodes,
		materials.discardMaterial,
		textures
	);
}

function disableMaterials(nodes, discardMaterial, textures) {
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

function prepareMaterials(materials, textures) {}
