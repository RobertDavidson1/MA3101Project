// Export all the functions
export { createAxes } from './axes.js';
export { createCircle } from './circle.js';
export { createCircleCenter } from './circleCenter.js';
export { createPlane } from './plane.js';
export { create_p_t_point, create_p_t_vector } from './pointOnCircle.js';
export { createSphere, createSphereCenter } from './sphere.js';
export { createStars } from './stars.js';
export {
    createCosVector,
    createSinVector,
    createCosineCompletion,
    createSinCompletion,
} from './trigVectors.js';
export { createSphereNormal, createAcclerationVector } from './vectors.js';

// Import the functions so we can use them
import { createAxes } from './axes.js';
import { createCircle } from './circle.js';
import { createCircleCenter } from './circleCenter.js';
import { createPlane } from './plane.js';
import { create_p_t_point, create_p_t_vector } from './pointOnCircle.js';
import { createSphere, createSphereCenter } from './sphere.js';
import { createStars } from './stars.js';
import {
    createCosVector,
    createSinVector,
    createCosineCompletion,
    createSinCompletion,
} from './trigVectors.js';
import { createSphereNormal, createAcclerationVector } from './vectors.js';

// Attach to window object
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
