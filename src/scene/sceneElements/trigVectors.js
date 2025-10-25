import { createLabelSprite } from './labels.js';

export function createCosVector(t, planeHeight, visible) {
    const cos_T = cosT(t);
    const C = calculateCircleCenter(planeHeight);
    const r = calculateRadius(planeHeight);

    //  C + r * cos_T * i
    const x = C.x + r * cos_T;

    // Tip of the Cos vector
    const endPoint = new THREE.Vector3(x, C.y, planeHeight);

    // Create direction vector from center to end point
    const direction = endPoint.clone().sub(C).normalize();

    // Create arrow helper
    const cosVector = new THREE.ArrowHelper(
        direction,
        C,
        r * Math.abs(cos_T), // Length is the magnitude of the cosine component
        getColor('--amber'),
        r * 0.05,
        r * 0.05,
    );

    // Create label for the cos vector
    const label = createLabelSprite('cos(t)', getColor('--amber'));
    label.position.copy(endPoint).add(new THREE.Vector3(0.2, 0, 0)); // Offset label to the right

    // Create a group to contain both the vector and label
    const group = new THREE.Group();
    group.add(cosVector, label);
    group.visible = visible;
    
    return group;
}

export function createSinVector(t, planeHeight, visible) {
    const sin_T = sinT(t);
    const C = calculateCircleCenter(planeHeight);
    const r = calculateRadius(planeHeight);

    //  C + r * sin_T * j
    const y = C.y + r * sin_T;

    // Tip of the Sin vector
    const endPoint = new THREE.Vector3(C.x, y, planeHeight);

    // Create direction vector from center to end point
    const direction = endPoint.clone().sub(C).normalize();

    // Create arrow helper
    const sinVector = new THREE.ArrowHelper(
        direction,
        C,
        r * Math.abs(sin_T), // Length is the magnitude of the sine component
        getColor('--blue'),
        r * 0.05,
        r * 0.05,
    );

    // Create label for the sin vector
    const label = createLabelSprite('sin(t)', getColor('--blue'));
    label.position.copy(endPoint).add(new THREE.Vector3(0.0, 0.2, 0)); // Offset label above

    // Create a group to contain both the vector and label
    const group = new THREE.Group();
    group.add(sinVector, label);
    group.visible = visible;
    
    return group;
}

export function createCosineCompletion(t, planeHeight, visible) {
    const cos_T = cosT(t);
    const sin_T = sinT(t);
    const C = calculateCircleCenter(planeHeight);
    const r = calculateRadius(planeHeight);

    const start = new THREE.Vector3(C.x, C.y + r * sin_T, planeHeight);

    const end = new THREE.Vector3(
        C.x + r * cos_T,
        C.y + r * sin_T,
        planeHeight,
    );
    const geometry = new THREE.BufferGeometry().setFromPoints([start, end]);
    const material = new THREE.LineBasicMaterial({
        color: getColor('--amber'),
        transparent: true,
        opacity: 0.5,
    });

    const line = new THREE.Line(geometry, material);
    line.visible = visible;
    return line;
}

export function createSinCompletion(t, planeHeight, visible) {
    const cos_T = cosT(t);
    const sin_T = sinT(t);
    const C = calculateCircleCenter(planeHeight);
    const r = calculateRadius(planeHeight);

    const start = new THREE.Vector3(C.x + r * cos_T, C.y, planeHeight);

    const end = new THREE.Vector3(
        C.x + r * cos_T,
        C.y + r * sin_T,
        planeHeight,
    );

    const geometry = new THREE.BufferGeometry().setFromPoints([start, end]);
    const material = new THREE.LineBasicMaterial({
        color: getColor('--blue'),
        transparent: true,
        opacity: 0.5,
    });

    const line = new THREE.Line(geometry, material);
    line.visible = visible;
    return line;
}
