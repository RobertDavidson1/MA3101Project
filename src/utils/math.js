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

// Gradient = (2x, 2y, 2z)
function calculateGradient(p, normalize = false) {
    const gradient = new THREE.Vector3(2 * p.x, 2 * p.y, 2 * p.z);
    if (normalize) {
        return gradient.normalize();
    }

    return gradient;
}

function calculateAcceleration(p, planeHeight, normalize = false) {
    const C = calculateCircleCenter(planeHeight);
    const acceleration = C.clone().sub(p); // C - p(t)

    if (normalize) {
        return acceleration.normalize();
    }

    return acceleration;
}
