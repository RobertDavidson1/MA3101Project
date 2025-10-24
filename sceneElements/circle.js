function createCircleCenter(planeHeight, visible) {
    // Create geometry with this single point
    const circleCenterGeometry = new THREE.SphereGeometry(
        0.025, // radius
        32, // width segments
        32, // height segments
    );

    // Create the material for the point
    const material = new THREE.MeshBasicMaterial({
        color: getColor('--red-500'),
        depthTest: false,
    });

    // Create the point
    const sphere = new THREE.Mesh(circleCenterGeometry, material);
    sphere.position.copy(calculateCircleCenter(planeHeight));
    sphere.visible = visible;
    return sphere;
}

// Creats a point on the circle formed by the intersection of the plane and the sphere
// planeHeight: The height of the plane
// t: The angle around the circle
function createPointOnIntersectionCircle(planeHeight, t) {
    // i and j hat vectors
    const i = new THREE.Vector3(1, 0, 0);
    const j = new THREE.Vector3(0, 1, 0);

    const cos_T = cosT(t);
    const sin_T = sinT(t);

    // h = planeHeight
    const h = planeHeight;
    const r = calculateRadius(h);

    // C = (0,0,h)
    const C = calculateCircleCenter(planeHeight);

    // p(t) = C + r[cos(t)i + sin(t)j]
    const x = C.x + r * (cos_T * i.x + sin_T * j.x);
    const y = C.y + r * (cos_T * i.y + sin_T * j.y);
    const z = C.z + r * (cos_T * i.z + sin_T * j.z);

    // Return the point as a THREE.Vector3
    return new THREE.Vector3(x, y, z);
}

function createCircle(planeHeight, visibile) {
    const segments = 32;
    const points = [];
    for (let k = 0; k < segments; k++) {
        const t = (k / segments) * 2 * Math.PI;
        curr_point = createPointOnIntersectionCircle(planeHeight, t);
        points.push(curr_point);
    }
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({
        color: getColor('--gray-50'),
    });
    const circle = new THREE.LineLoop(geometry, material);

    circle.visible = visibile;
    return circle;
}

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

    position = createPointOnIntersectionCircle(planeHeight, t);
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
