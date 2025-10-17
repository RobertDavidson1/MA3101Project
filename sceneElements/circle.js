function createCircleCenter(visible) {
    // Create geometry with this single point
    const circleCenterGeometry = new THREE.SphereGeometry(
        0.01, // radius
        32, // width segments
        32, // height segments
    );

    // Create the material for the point
    const material = new THREE.MeshBasicMaterial({
        color: getColor('--red-500'),
        depthTest: false,
    });

    // Create the point
    // 6. Create a mesh (3D object)
    const sphere = new THREE.Mesh(circleCenterGeometry, material);

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

    const cosT = Math.cos(t);
    const sinT = Math.sin(t);

    // h = planeHeight
    const h = Math.max(-1, Math.min(1, planeHeight));
    const r = Math.sqrt(Math.max(0, 1 - h * h));

    // C = (0,0,h)
    const C = new THREE.Vector3(0, 0, 1).multiplyScalar(planeHeight);

    // p(t) = C + r[cos(t)i + sin(t)j]
    const x = C.x + r * (cosT * i.x + sinT * j.x);
    const y = C.y + r * (cosT * i.y + sinT * j.y);
    const z = C.z + r * (cosT * i.z + sinT * j.z);

    // Return the point as a THREE.Vector3
    return new THREE.Vector3(x, y, z);
}

function createCircle(planeHeight, visibility) {
    const segments = 32;
    const points = [];
    for (let k = 0; k < segments; k++) {
        const t = (k / segments) * 2 * Math.PI;
        curr_point = createPointOnIntersectionCircle(planeHeight, t);
        points.push(curr_point);
    }
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({
        color: getColor('--red-500'),
    });
    const circle = new THREE.LineLoop(geometry, material);

    circle.visible = visibility;
    return circle;
}

function pointOnCircle(planeHeight, visible, t) {
    const circumferencePointGeometry = new THREE.SphereGeometry(
        0.025, // radius
        32, // width segments
        32, // height segments
    );

    const material = new THREE.MeshBasicMaterial({
        color: getColor('--red-500'),
        depthTest: false,
    });

    const sphere = new THREE.Mesh(circumferencePointGeometry, material);
    sphere.visible = visible;

    position = createPointOnIntersectionCircle(planeHeight, t);
    sphere.position.copy(position);
    return sphere;
}
