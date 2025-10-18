function createSphere(visible) {
    // Create a sphere with 16 segments and 8 rings
    const sphereGeometry = new THREE.SphereGeometry(1, 32, 16);

    // Create a material for the sphere
    const sphereMaterial = new THREE.MeshBasicMaterial({
        color: getColor('--neutral-300'),
        wireframe: true,
        transparent: true,
        opacity: 0.1,
    });

    // Take the geometry and material and form a mesh
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

    sphere.rotation.x = Math.PI / 2;

    // Set initial visibility
    sphere.visible = visible;
    return sphere;
}
