function createSphere() {
    // Create a sphere with 16 segments and 8 rings
    const sphereGeometry = new THREE.SphereGeometry(1, 32, 16);

    // Create a material for the sphere
    const sphereMaterial = new THREE.MeshBasicMaterial({
        color: getColor(' --gray-100'),
        wireframe: true,
        transparent: true,
        opacity: 0.05,
    });

    // Take the geometry and material and form a mesh
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    return sphere;
}
