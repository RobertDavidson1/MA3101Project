export function create_p_t_point(planeHeight, visible, t) {
    const circumferencePointGeometry = new THREE.SphereGeometry(
        0.025, // radius
        32, // width segments
        32, // height segments
    );

    const material = new THREE.MeshBasicMaterial({
        color: getColor('--violet'),
        depthTest: true,
    });

    const sphere = new THREE.Mesh(circumferencePointGeometry, material);
    sphere.visible = visible;

    const position = calculateCirclePoint(planeHeight, t);
    sphere.position.copy(position);
    return sphere;
}

export function create_p_t_vector(t, planeHeight, visible) {
    const C = calculateCircleCenter(planeHeight);
    const r = calculateRadius(planeHeight);

    const position = calculateCirclePoint(planeHeight, t);

    const direction = position.clone().sub(C).normalize();
    const p_tVector = new THREE.ArrowHelper(
        direction,
        C,
        r,
        getColor('--violet'),
        r * 0.1,
        r * 0.1,
    );

    p_tVector.visible = visible;
    return p_tVector;
}
