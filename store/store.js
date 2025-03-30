import { create } from "zustand";

import { LoadModels, createLoaders } from "@/lib/three";
import { createDiscardMaterial, prepareModels } from "@/lib/three";
import { modelslist } from "@/constants/models";

const useAsteriumStore = create((set, get) => ({
	isInitialized: false,
	isCanvasReady: false,
	isCanvasLoaded: false,
	isScroll: false,
	isModelloaded: false,
	preloading: {
		isLoading: false,
		sizeToLoad: 0,
		sizeLoaded: 0,
		filesToLoad: 0,
		filesLoaded: 0,
		percent: 0,
		isComplete: false,
	},
	preloadModels: {},
	materials: {},
	models: {},
	nodes: {},
	router: {
		pathname: null,
		params: null,
	},

	Actions: {
		addMaterial(name, material) {
			set(({ materials }) => ({
				materials: { ...materials, [name]: material },
			}));
		},
		stopScroll() {
			set(({ isScroll }) => ({ isScroll: !isScroll }));
		},
		initialize() {
			set({ isInitialized: true });
		},
		setCanvasReady(threeParams) {
			set({ threeParams });
			set({ isCanvasReady: true });
			const loaders = createLoaders(threeParams.gl);
			const discardMaterial = createDiscardMaterial();
			set({ loaders });
			set({ materials: { discardMaterial } });
			get().Actions.loadModels();
		},
		async loadModels() {
			const loaders = get().loaders;
			const PageModels = modelslist["Home"];
			let totalFiles = 0;
			let totalSize = 0;
			const modelsToLoad = PageModels.models.reduce((models, model) => {
				totalFiles++;
				totalSize = totalSize + model.size;

				return {
					...models,
					[model.name]: {
						...model,
						loaded: 0,
						isComplete: false,
						pathname: PageModels.pathname,
					},
				};
			}, {});

			set({ preloadModels: modelsToLoad });
			set({
				preloading: {
					isLoading: true,
					sizeToLoad: totalSize,
					sizeLoaded: 0,
					filesToLoad: totalFiles,
					filesLoaded: 0,
					percent: 0,
					isComplete: false,
				},
			});

			const { onProgressLoad, onCompleteLoad } = get().Actions;
			await LoadModels({
				loaders,
				models: modelsToLoad,
				materials: get().materials,
				onProgressLoad,
				onCompleteLoad,
			});
			const { materials, textures, models } = get();
			const { scene, gl, camera } = get().threeParams;
			prepareModels({ models, materials, textures, scene, gl, camera });
			set(({ preloading }) => ({
				preloading: { ...preloading, isComplete: true },
			}));
		},
		onProgressLoad({ loaded, size, name }) {
			const preloadModels = get().preloadModels;

			const newPreloadModels = {
				...preloadModels,
				[name]: { ...preloadModels[name], loaded },
			};
			const sizeLoaded = Object.values(newPreloadModels).reduce(
				(total, { loaded }) => total + loaded,
				0
			);
			console.log(loaded, size, name, sizeLoaded);

			set({ preloadModels: newPreloadModels });

			set(({ preloading }) => ({
				preloading: {
					...preloading,
					sizeLoaded,
					percent: Math.floor((sizeLoaded / preloading.sizeToLoad) * 100),
				},
			}));
		},
		onCompleteLoad({
			name,
			scene,
			nodes,
			groups,
			textures: newTextures,
			materials: newMaterials,
		}) {
			set(({ preloadModels }) => ({
				preloadModels: {
					...preloadModels,
					[name]: { ...preloadModels[name], isComplete: true },
				},
			}));

			const preloadedModels = Object.values(get().preloadModels).reduce(
				(loaded, model) => {
					return model.isComplete ? loaded + 1 : loaded;
				},
				0
			);
			set(({ preloading }) => ({
				preloading: {
					...preloading,
					filesLoaded: preloadedModels,
					isComplete: preloadedModels === preloading.filesToLoad,
				},
			}));
			set(({ models, materials, textures }) => ({
				models: { ...models, [name]: { scene, nodes, groups } },
				materials: { ...materials, ...newMaterials },
				textures: { ...textures, ...newTextures },
			}));
		},
		setPathname({ pathname }) {
			set(({ router }) => ({ router: { ...router, pathname: pathname } }));
		},
	},
}));

export default useAsteriumStore;
