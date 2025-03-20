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
	console.log(models);

	const loadPromises = Object.values(models).map((model) =>
		loadModel({
			loaders,
			model,
			...loaderEvents,
		})
	);
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
				gltf.scene.traverse((node) => {
					nodes[node.name] = node;
					if (node.isMesh) {
						node.castShadow = true;
						node.receiveShadow = true;
					}
				});

				onCompleteLoad({ scene: gltf.scene, nodes: nodes, name });
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
