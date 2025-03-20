import { create } from "zustand";

import { LoadModels, createLoaders } from "@/lib/three";

import { modelslist } from "./models";

const useAsteriumStore = create((set, get) => ({
	isInitialized: false,
	isCanvasReady: false,
	isCanvasLoaded: false,

	isModelloaded: false,
	preloading: {
		isLoading: false,
		sizeToLoad: 0,
		sizeLoaded: 0,
		filesToLoad: 0,
		filesLoaded: 0,
	},
	preloadModels: {},
	models: {},
	router: {
		pathname: null,
		params: null,
	},

	Actions: {
		initialize() {
			set({ isInitialized: true });
		},
		setCanvasReady(threeParams) {
			set({ threeParams });
			set({ isCanvasReady: true });
			const loaders = createLoaders(threeParams.gl);
			set({ loaders });
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
				},
			});

			const { onProgressLoad, onCompleteLoad } = get().Actions;
			await LoadModels({
				loaders,
				models: modelsToLoad,
				onProgressLoad,
				onCompleteLoad,
			});
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
			console.log(newPreloadModels);
			set({ preloadModels: newPreloadModels });
			console.log(sizeLoaded);
			set(({ preloading }) => ({ preloading: { ...preloading, sizeLoaded } }));
		},
		onCompleteLoad({ scene, nodes, name }) {
			set(({ models }) => ({
				models: { ...models, [name]: { scene, nodes } },
			}));
		},
		setPathname({ pathname }) {
			set(({ router }) => ({ router: { ...router, pathname: pathname } }));
			//console.log(get().router);
		},
	},
}));

export default useAsteriumStore;
