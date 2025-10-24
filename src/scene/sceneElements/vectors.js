function createSphereNormal(t, planeHeight, visible) {
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

    normalVector.visible = visible;

    return normalVector; // Return the actual vector
}

function createAcclerationVector(t, planeHeight, visible) {
    const position = calculateCirclePoint(planeHeight, t);
    const acceleration = calculateAcceleration(position, planeHeight, true);

    const accelerationVector = new THREE.ArrowHelper(
        acceleration,
        position,
        1,
        getColor('--rose'),
        0.1,
        0.1,
    );

    accelerationVector.visible = visible;
    return accelerationVector;
}
