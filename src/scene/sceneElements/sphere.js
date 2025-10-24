// Adapted from:
// https://github.com/mrdoob/three.js/blob/master/examples/webgl_camera.html

export function createSphere(visible) {
    // Create a sphere with 16 segments and 8 rings
    const sphereGeometry = new THREE.SphereGeometry(1, 32, 16);

    // Create a material for the sphere
    const sphereMaterial = new THREE.MeshBasicMaterial({
        color: getColor('--nuetral-500'),
        wireframe: true,
        transparent: true,
        opacity: 0.05,
    });

    // Take the geometry and material and form a mesh
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

    sphere.rotation.x = Math.PI / 2;

    // Set initial visibility
    sphere.visible = visible;
    return sphere;
}

export function createSphereCenter(visible) {
    const circumferencePointGeometry = new THREE.SphereGeometry(
        0.025, // radius
        32, // width segments
        32, // height segments
    );

    const material = new THREE.MeshBasicMaterial({
        color: getColor('--nuetral-500'),
        depthTest: true,
    });

    const circleCenter = new THREE.Mesh(circumferencePointGeometry, material);
    circleCenter.visible = visible;

    return circleCenter;
}
