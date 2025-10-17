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

function createCircle(planeHeight, visibility) {
    // r = (1-h^2)^(1/2)
    const h = Math.max(-1, Math.min(1, planeHeight));
    const r = Math.sqrt(Math.max(0, 1 - h * h));

    // C = (0,0,h)
    const C = new THREE.Vector3(0, 0, 1).multiplyScalar(planeHeight);

    const i = new THREE.Vector3(1, 0, 0);
    const j = new THREE.Vector3(0, 1, 0);

    const segments = 256;
    const points = [];
    for (let k = 0; k < segments; k++) {
        const t = (k / segments) * 2 * Math.PI;
        const cosT = Math.cos(t);
        const sinT = Math.sin(t);

        // p(t) = C + r[cos(t)i + sin(t)j]
        const x = C.x + r * (cosT * i.x + sinT * j.x);
        const y = C.y + r * (cosT * i.y + sinT * j.y);
        const z = C.z + r * (cosT * i.z + sinT * j.z);
        points.push(new THREE.Vector3(x, y, z));
    }
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({
        color: getColor('--red-500'),
    });
    const circle = new THREE.LineLoop(geometry, material);

    circle.visible = visibility;
    return circle;
}
