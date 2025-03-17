import * as THREE from "three";
export function createMaterials(materials) {
	const rolexGolda = new THREE.MeshStandardMaterial({
		color: new THREE.Color(0xe0875e), // Warmer rose gold color to match Rolex Everose gold
		metalness: 1,
		roughness: 0.01,
		envMapIntensity: 1.2,
	});
	const rolexGold = new THREE.MeshPhysicalMaterial({
		color: new THREE.Color(0.944, 0.776, 0.373), // Warmer rose gold color to match Rolex Everose gold
		metalness: 1,
		roughness: 0.0,
		envMapIntensity: 1.2,
		specularColor: new THREE.Color(0.981, 0.979, 0.781),
	});
	const rolexGold2 = new THREE.MeshPhysicalMaterial({
		color: new THREE.Color(0xe0875e),
		iridescenceIOR: 1.5,
		iridescenceThicknessRange: [100, 1000],
		metalness: 1,
		roughness: 0.3,
		envMapIntensity: 1.0,
	});

	// Create steel material for contrast (like the Rolesor combination)
	const rolexSteel = new THREE.MeshPhysicalMaterial({
		color: new THREE.Color(0xe0875e),
		iridescenceIOR: 1.5,
		iridescenceThicknessRange: [100, 1000],
		metalness: 1,
		roughness: 0.3,
		envMapIntensity: 1.0,
	});

	const rolexFind = new THREE.MeshBasicMaterial({
		color: new THREE.Color(0x00ff00),
	});
	return materials;
}
