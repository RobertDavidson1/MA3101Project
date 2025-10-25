import { SceneManager } from './core/SceneManager.js';
import { p } from './TweakPane/parameters.js';
import { setLabelsVisible } from './scene/sceneElements/labels.js';
// Make camera, controls, and targetPosition globally available
window.camera = camera;
window.controls = controls;
window.targetPosition = targetPosition;

// Setup SceneManager
const manager = new SceneManager(scene);
window.manager = manager;

setLabelsVisible(p.showLabels);

manager.addElement('axes', createAxes(p.showAxes));
manager.addElement('stars', createStars(p.starCount));

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
manager.addElement('plane', createPlane(p.planeHeight, p.showPlane));

// Make create functions globally available for gui.js
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

// Camera intro animation state
const startPosition = new THREE.Vector3(-70, -70, 70);
const endPosition = new THREE.Vector3(
    targetPosition.x,
    targetPosition.y,
    targetPosition.z,
);
const lookAtTarget = new THREE.Vector3(0, 0, 0);

// Ensure camera starts at the expected location and orientation
camera.position.copy(startPosition);
controls.target.copy(lookAtTarget);
controls.enabled = false; // prevent user interaction during intro
camera.lookAt(lookAtTarget);

// Animation setup
const animationDuration = 2500; // 2 seconds
const startTime = Date.now();
let animationComplete = false;


// Code from https://easings.net/#easeInOutExpo
function easeInOutExpo(x) {
    if (x === 0) return 0;
    if (x === 1) return 1;
    if (x < 0.5) {
        return Math.pow(2, 20 * x - 10) / 2;
    }
    return (2 - Math.pow(2, -20 * x + 10)) / 2;
}

// Animation loop
function animate() {
    // Camera intro animation
    if (!animationComplete) {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / animationDuration, 1);
        const easeProgress = easeInOutExpo(progress);

        camera.position.lerpVectors(startPosition, endPosition, easeProgress);
        camera.lookAt(lookAtTarget);

        if (progress >= 1) {
            animationComplete = true;
            // Reset controls to match camera position
            controls.target.copy(lookAtTarget);
            controls.enabled = true;
            controls.update();
        }
    }

    if (animationComplete) {
        controls.update(); // smooth camera movement
    }
    
    renderer.render(scene, camera); // draw scene from camera
    requestAnimationFrame(animate); // repeat each frame
}
animate();
