export function createCircleCenter(planeHeight, visible) {
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
