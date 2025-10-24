import { SceneManager } from './core/SceneManager.js';
import { p } from './TweakPane/parameters.js';
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

// Animation loop
function animate() {
    controls.update(); // smooth camera movement
    renderer.render(scene, camera); // draw scene from camera
    requestAnimationFrame(animate); // repeat each frame
}
animate();
