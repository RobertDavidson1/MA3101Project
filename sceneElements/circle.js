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
