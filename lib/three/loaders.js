import * as THREE from "three";
import { DRACOLoader, GLTFLoader, KTX2Loader } from "three-stdlib";
import { MeshoptDecoder } from "three-stdlib";

import { filetype } from "@/constants";

//create loader instances
export function createLoaders(gl) {
	const textureLoader = new THREE.TextureLoader();
	const gltfLoader = new GLTFLoader();
	const dracoLoader = new DRACOLoader();
	const ktx2Loader = new KTX2Loader();
	dracoLoader.setDecoderPath("/libs/draco/");
	gltfLoader.setDRACOLoader(dracoLoader);
	ktx2Loader.setTranscoderPath("/libs/basis/");
	ktx2Loader.detectSupport(gl);
	gltfLoader.setKTX2Loader(ktx2Loader);
	gltfLoader.setMeshoptDecoder(MeshoptDecoder);
	return { textureLoader, gltfLoader };
}

export async function LoadModels({ loaders, models, ...loaderEvents }) {
	const loadPromises = Object.values(models).map((model) =>
		loadModel({
			loaders,
			model,
			...loaderEvents,
		})
	);
	await Promise.all(loadPromises);
}

export async function loadModel({
	loaders,
	model,
	onProgressLoad,
	onCompleteLoad,
}) {
	const { name, file, size, type, pathname } = model;
	const gltfLoader = loaders.gltfLoader;
	return new Promise((resolve) => {
		gltfLoader
			.loadAsync(`/models${pathname}/${file}`, (xhr) => {
				onProgressLoad({ loaded: xhr.loaded, size: size, name });
			})
			.then((gltf) => {
				const nodes = {};
				let materials = {};
				let textures = {};
				let groups = {};
				gltf.scene.traverse((node) => {
					if (node.isMesh) {
						nodes[node.name] = node;
						node.castShadow = true;
						node.receiveShadow = true;
						const data = getDataNode(node, type);
						materials = { ...materials, ...data.materials };
						textures = { ...textures, ...data.textures };

						return;
					}
					if (node.isGroup) {
						groups[node.name] = node;
						return;
					}
				});
				//console.log(Object.keys(nodes));
				//console.log(Object.keys(groups));
				onCompleteLoad({
					name,
					scene: gltf.scene,
					nodes: nodes,
					groups: groups,
					materials,
					textures,
				});
				resolve();
				/*
            if (type === filetype.material) {
                let materials = getMaterials(gltf.scene)
                resolve({ filetype: filetype.material, materials: { [name]: materials } })
            }
            if (type === filetype.mesh) {

                const nodes = getNodes(gltf.scene)
                const animations = getAnimation(gltf)

                resolve({ filetype: filetype.mesh, name, model: gltf.scene, nodes, animations: animations, cameras: gltf.cameras })

            }
            if (type === filetype.animation) {
                //const animations = getAnimation(gltf)

                //resolve({ filetype: filetype.animation, name, animations })

            }*/
			});
	});
}

function getDataNode(node, type) {
	const iniObj = { geometry: null, materials: [], textures: [] };
	if (type === filetype.scene) {
		//console.log(node);
		//console.log(node.material);
		let material = {};
		if (!node.material.isArray) {
			material = { [node.material.name]: node.material };
		} else {
			node.material.forEach((mat) => {
				material = { ...material, [mat.name]: mat };
			});
		}

		return { ...iniObj, materials: material };
	}

	if (type === filetype.texture) {
		const textures = getTexturesFromMaterial(node.material);
		return { ...iniObj, textures };
	}

	return iniObj;
}

// Función para obtener las texturas de un material
function getTexturesFromMaterial(material) {
	const textureKeys = [
		"map",
		"alphaMap",
		"aoMap",
		"bumpMap",
		"displacementMap",
		"emissiveMap",
		"envMap",
		"lightMap",
		"metalnessMap",
		"normalMap",
		"roughnessMap",
		"specularMap",
		"clearcoatMap",
		"clearcoatNormalMap",
		"clearcoatRoughnessMap",
		"sheenColorMap",
		"sheenRoughnessMap",
		"transmissionMap",
		"thicknessMap",
		"iridescenceMap",
		"iridescenceThicknessMap",
	];

	const textures = {};
	if (!material) return textures;

	textureKeys.forEach((key) => {
		let texture = material[key];
		if (texture instanceof THREE.Texture) {
			textures[texture.name] = texture;
		}
	});

	return textures;
}
