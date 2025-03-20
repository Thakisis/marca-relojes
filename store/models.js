// types:
// 0 geometry
// 1 material

import Home from "@/app/page";

// 2 enviroment
export const filetype = {
	scene: 0,
	material: 1,
	enviroment: 2,
	mesh: 3,
	default: 4,
	texture: 5,
};
export const modelslist = {
	Home: {
		pathname: "/home",
		totalSize: 5612072,
		models: [
			{
				name: "daytona",
				file: "Daytona.glb",
				size: 4805624,
				type: filetype.scene,
			},
			{
				name: "daytonaTextures",
				file: "DaytonaTex.glb",
				size: 806448,
				type: filetype.texture,
			},
		],
	},
};
