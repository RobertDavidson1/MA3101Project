import { createLabelSprite } from './labels.js';

export function createSphereNormal(t, planeHeight, visible) {
    const position = calculateCirclePoint(planeHeight, t);
    const normal = calculateGradient(position, true); // normalized

    const normalVector = new THREE.ArrowHelper(
        normal,
        position,
        1,
        getColor('--green'),
        0.1,
        0.1,
    );

    const label = createLabelSprite('Normal', getColor('--green'));
    label.position.copy(position).addScaledVector(normal, 1.1);


    const group = new THREE.Group();
    group.add(normalVector, label);
    group.visible = visible;
    return group;


}

export function createAcclerationVector(t, planeHeight, visible) {
    const position = calculateCirclePoint(planeHeight, t);
    const acceleration = calculateAcceleration(position, planeHeight, true);
    const color = getColor(planeHeight === 0 ? '--green' : '--red');

    const accelerationVector = new THREE.ArrowHelper(
        acceleration,
        position,
        1,
        color,
        0.1,
        0.1,
    );

    const label = createLabelSprite('Acceleration Vector', color);
    label.position.copy(position).addScaledVector(acceleration, 1.1);

    const group = new THREE.Group();
    group.add(accelerationVector, label);
    group.visible = visible;
    return group;
}


