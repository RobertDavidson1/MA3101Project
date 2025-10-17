function createPlane(visible) {
    // Create a plane with a width and height of 1
    const planeGeometry = new THREE.PlaneGeometry(3, 3);

    // Create a material for the plane
    const material = new THREE.MeshBasicMaterial({
        color: getColor('--red-500'),
        side: THREE.DoubleSide, // Render both sides of the plane
        transparent: true, // Allow the plane to be transparent
        opacity: 0.25,
        depthTest: false,
    });

    // Take the geometry and material and form a mesh
    const plane = new THREE.Mesh(planeGeometry, material);

    // Set initial visibility
    plane.visible = visible;

    return plane;
}
