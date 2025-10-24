function getColor(cssVar) {
    return getComputedStyle(document.documentElement)
        .getPropertyValue(cssVar)
        .trim();
}

function cosT(t) {
    return Math.cos(t);
}

function sinT(t) {
    return Math.sin(t);
}

function calculateRadius(planeHeight) {
    return Math.sqrt(Math.max(0, 1 - planeHeight * planeHeight));
}

function calculateCircleCenter(planeHeight) {
    return new THREE.Vector3(0, 0, 1).multiplyScalar(planeHeight);
}

// Creats a point on the circle formed by the intersection of the plane and the sphere
// planeHeight: The height of the plane
// t: The angle around the circle
function calculateCirclePoint(planeHeight, t) {
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
