// Setting h = z makes rendering the plane cheaper
export function createPlane(planeHeight, visible) {
    const color = getColor(planeHeight === 0 ? '--green-950' : '--neutral-950');
    // Create a plane with a width and height of 1
    const planeGeometry = new THREE.PlaneGeometry(3, 3);

    // Create a material for the plane
    const material = new THREE.MeshBasicMaterial({
        color: getColor('--neutral-950'),
        side: THREE.DoubleSide, // Render both sides of the plane
        transparent: true, // Allow the plane to be transparent
        opacity: 0.5,
        depthTest: false,
    });

    // Take the geometry and material and form a mesh
    const plane = new THREE.Mesh(planeGeometry, material);

    // Position the plane at the specified height
    plane.position.z = planeHeight;

    // Set initial visibility
    plane.visible = visible;

    return plane;
}
