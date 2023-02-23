/**
 * Canvas
 *
 * @format
 */

const canvas = document.querySelector('.webgl');

/**
 * Loaders
 */

gsap.from('.overlay h1 span', {
	duration: 1,
	y: '100%',
});

const overlay = document.querySelector('.overlay');
const loadingManager = new THREE.LoadingManager(
	() => {
		window.setTimeout(() => {
			gsap.to('.overlay h1 span', {
				duration: 1,
				y: '-100%',
			});

			gsap.to(overlay, {
				duration: 2,
				opacity: 0,
				delay: 1,
			});
			gsap.to(overlay, {
				duration: 1,
				display: 'none',
				delay: 2,
			});
		}, 2000);
	},
	() => {},
	() => {
		console.error('error');
	}
);

/**
 * Scene
 */
const scene = new THREE.Scene();
const loader = new THREE.TextureLoader();
scene.background = loader.load('./image/space1.jpg');

this.setupVR();

/**
 * GLTF Model
 */
let skull = null;
let base = new THREE.Object3D();
scene.add(base);
const gltfLoader = new THREE.GLTFLoader(loadingManager);
gltfLoader.load('./assets/gltf/world.gltf', (gltf) => {
	// gltf.scene.position.y = 0.5
	base.add(gltf.scene);
});

/**
 * Sizes
 */
const sizes = {
	width: window.innerWidth,
	height: window.innerHeight,
};

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(100, sizes.width / sizes.height);
camera.position.z = 12.5;
camera.position.x = 1;
camera.position.y = 12.5;

scene.add(camera);

/**
 * Lights
 */
const pointLight = new THREE.AmbientLight('#414a4c', 10);
// pointLight.position.z = 0.1
scene.add(pointLight);
le.visibility = 'visible';

const renderer = new THREE.WebGLRenderer({
	canvas: canvas,
	antiAlias: true,
	alpha: true,
});

function setupVR() {
	this.renderer.xr.enabled = true;
	document.body.appendChild(VRButton.createButton(this.renderer));
}

renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.render(scene, camera);

renderer.setAnimationLoop(() => {
	renderer.render(scene, camera);

	const easting = 8;
	// cursorBorderPos.x += (cursorPos.x - cursorBorderPos.x) / easting;
	// cursorBorderPos.y += (cursorPos.y - cursorBorderPos.y) / easting;

	// cursorBorder.style.transform = `translate(${cursorBorderPos.x}px, ${cursorBorderPos.y}px)`;
});
