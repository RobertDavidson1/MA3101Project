function createCosVector(t, planeHeight, visible) {
    const cos_T = cosT(t);
    const C = calculateCircleCenter(planeHeight);
    const r = calculateRadius(planeHeight);

    //  C + r * cos_T * i

    const x = C.x + r * cos_T;
    const points = [
        new THREE.Vector3(C.x, C.y, planeHeight),
        new THREE.Vector3(x, C.y, planeHeight),
    ];

    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({
        color: getColor('--red'),
    });

    const cosVector = new THREE.Line(geometry, material);
    cosVector.visible = visible;
    return cosVector;
}

function createSinVector(t, planeHeight, visible) {
    const sin_T = sinT(t);
    const C = calculateCircleCenter(planeHeight);
    const r = calculateRadius(planeHeight);

    //  C + r * sin_T * j
    const y = C.y + r * sin_T;
    const points = [
        new THREE.Vector3(C.x, C.y, planeHeight),
        new THREE.Vector3(C.x, y, planeHeight),
    ];

    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({
        color: getColor('--blue'),
    });

    const sinVector = new THREE.Line(geometry, material);
    sinVector.visible = visible;
    return sinVector;
}

function createCosVectorTip(t, planeHeight, visible) {
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
        color: getColor('--red'),
        transparent: true,
        opacity: 0.5,
    });

    const line = new THREE.Line(geometry, material);
    line.visible = visible;
    return line;
}

function createSinVectorTip(t, planeHeight, visible) {
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
