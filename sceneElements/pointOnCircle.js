function create_p_t_point(planeHeight, visible, t) {
    const circumferencePointGeometry = new THREE.SphereGeometry(
        0.025, // radius
        32, // width segments
        32, // height segments
    );

    const material = new THREE.MeshBasicMaterial({
        color: getColor('--violet'),
        depthTest: false,
    });

    const sphere = new THREE.Mesh(circumferencePointGeometry, material);
    sphere.visible = visible;

    position = calculateCirclePoint(planeHeight, t);
    sphere.position.copy(position);
    return sphere;
}

function create_p_t_vector(t, planeHeight, visible) {
    const cos_T = cosT(t);
    const C = calculateCircleCenter(planeHeight);
    const r = calculateRadius(planeHeight);

    const x = C.x + r * Math.cos(t);
    const y = C.y + r * Math.sin(t);
    const z = planeHeight;

    const p_t = new THREE.Vector3(x, y, z);

    const geometry = new THREE.BufferGeometry().setFromPoints([C, p_t]);
    const material = new THREE.LineBasicMaterial({
        color: getColor('--violet'),
    });

    const p_tVector = new THREE.Line(geometry, material);
    p_tVector.visible = visible;
    return p_tVector;
}
