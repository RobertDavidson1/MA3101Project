import { createAxes } from './scene/sceneElements/axes.js';
import { createCircle } from './scene/sceneElements/circle.js';
import { createCircleCenter } from './scene/sceneElements/circleCenter.js';
import { createPlane } from './scene/sceneElements/plane.js';
import {
    create_p_t_point,
    create_p_t_vector,
} from './scene/sceneElements/pointOnCircle.js';
import { createSphere } from './scene/sceneElements/sphere.js';
import { createSphereCenter } from './scene/sceneElements/sphere.js';
import { createStars } from './scene/sceneElements/stars.js';
import {
    createCosVector,
    createSinVector,
    createCosineCompletion,
    createSinCompletion,
} from './scene/sceneElements/trigVectors.js';
import {
    createSphereNormal,
    createAcclerationVector,
} from './scene/sceneElements/vectors.js';
import { SceneManager } from './core/SceneManager.js';

const container = document.getElementById('app');
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    55, // FOV
    window.innerWidth / window.innerHeight, // Aspect ratio
    0.1, // Near plane
    100, // Far plane
);
camera.up.set(0, 0, 1); // make Z the up-axis
camera.position.set(3, 3, 3);

// Redraw scene on window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Renderer setup
const renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio(window.devicePixelRatio); // Render at full native screen resolution
renderer.setSize(window.innerWidth, window.innerHeight); // Use the full window size
renderer.setClearColor(getColor('--neutral-800')); // Set background color to gray-900
container.appendChild(renderer.domElement);

renderer.antialias = true; // Enable antialiasing

// Camera controls
const controls = new THREE.OrbitControls(camera, renderer.domElement); // Enable orbit controls
controls.enableDamping = true; // Enable damping for smoother movement
controls.maxDistance = Math.sqrt(30 * 30 + 30 * 30 + 30 * 30); // Limit max camera distance to (30,30,30)

// Make camera and controls globally available
window.camera = camera;
window.controls = controls;

// Setup SceneManager
const manager = new SceneManager(scene);
window.manager = manager;

manager.addElement('axes', createAxes(p.showAxes));
manager.addElement('stars', createStars(p.starCount));
manager.addElement('plane', createPlane(p.showPlane));
manager.addElement('sphere', createSphere(p.showSphere));
manager.addElement(
    'circleCenter',
    createCircleCenter(p.planeHeight, p.showCircleCenter),
);
manager.addElement(
    'sinVector',
    createSinVector(p.t, p.planeHeight, p.showCosSinVectors),
);
manager.addElement(
    'cosVector',
    createCosVector(p.t, p.planeHeight, p.showCosSinVectors),
);

manager.addElement(
    'cosVectorTip',
    createCosineCompletion(p.t, p.planeHeight, p.showCosSinVectors),
);
manager.addElement(
    'sinVectorTip',
    createSinCompletion(p.t, p.planeHeight, p.showCosSinVectors),
);
manager.addElement(
    'p_t_vector',
    create_p_t_vector(p.t, p.planeHeight, p.show_p_t_vector),
);
manager.addElement('circle', createCircle(p.planeHeight, p.showCircle));
manager.addElement('p_t', create_p_t_point(p.planeHeight, p.show_p_t, p.t));
manager.addElement(
    'sphereNormal',
    createSphereNormal(p.t, p.planeHeight, p.showNormal),
);
manager.addElement('sphereCenter', createSphereCenter(p.showSphereCenter));

manager.addElement(
    'accelerationVector',
    createAcclerationVector(p.t, p.planeHeight, p.showAcceleration),
);

// Animation loop
function animate() {
    controls.update(); // smooth camera movement
    renderer.render(scene, camera); // draw scene from camera
    requestAnimationFrame(animate); // repeat each frame
}
animate();

// Make all creation functions globally available
window.createAxes = createAxes;
window.createCircle = createCircle;
window.createCircleCenter = createCircleCenter;
window.createPlane = createPlane;
window.create_p_t_point = create_p_t_point;
window.create_p_t_vector = create_p_t_vector;
window.createSphere = createSphere;
window.createSphereCenter = createSphereCenter;
window.createStars = createStars;
window.createCosVector = createCosVector;
window.createSinVector = createSinVector;
window.createCosineCompletion = createCosineCompletion;
window.createSinCompletion = createSinCompletion;
window.createSphereNormal = createSphereNormal;
window.createAcclerationVector = createAcclerationVector;
