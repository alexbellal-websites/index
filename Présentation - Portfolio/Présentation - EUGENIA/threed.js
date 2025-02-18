import * as THREE from './three/build/three.module.js';
import { GLTFLoader } from './three/examples/jsm/loaders/GLTFLoader.js';


let scene, camera, renderer, letters = [];

function init() {
    // Create Scene
    scene = new THREE.Scene();
    
    // Camera Setup
    camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 5);
    
    // Renderer Setup
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    
    // Lighting for better reflections
    const light = new THREE.DirectionalLight(0xffffff, 1.5);
    light.position.set(5, 5, 5);
    scene.add(light);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // Load 3D Model
    const loader = new GLTFLoader();
    loader.load('ciel-de-cristal.glb', (gltf) => {
        let model = gltf.scene;
        model.scale.set(1, 1, 1);
        model.position.set(0, -0.5, 0);
        scene.add(model);

        // Store each letter separately for independent rotation
        model.traverse((child) => {
            if (child.isMesh) {
                letters.push(child);
            }
        });
    });

    // Rotate letters on mouse movement
    document.addEventListener("mousemove", (event) => {
        let rotationFactor = (event.clientX / window.innerWidth - 0.5) * 2;
        letters.forEach((letter, index) => {
            letter.rotation.x = rotationFactor * (index % 2 === 0 ? 1 : -1);
        });
    });

    animate();
}

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

// Adjust on window resize
window.addEventListener("resize", () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

init();
