// Adapted from:
// https://threejs.org/examples/?q=point#webgl_points_billboards
// https://github.com/mrdoob/three.js/blob/master/examples/webgl_points_billboards.html

function createStars(starCount) {
    const starGeometry = new THREE.BufferGeometry(); // Empty container for vertex data
    const starPositions = new Float32Array(starCount * 3); // Aray to store star positions

    // Generate random position for each star, and store in starPositions array
    for (let i = 0; i < starCount; i++) {
        const radius = 20 + Math.random() * 30; // random distance from center of scene (20 - 50 units)
        const theta = Math.random() * Math.PI * 2; // random angle around the scene (0 - 2π)
        const phi = Math.acos(2 * Math.random() - 1); // random angle from the polar axis (0 - π)

        // For each index i, set the x, y, and z coordinates of the star
        starPositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta); // x coordinate
        starPositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta); // y coordinate
        starPositions[i * 3 + 2] = radius * Math.cos(phi); // z coordinate
    }

    // Attach position data to the geometry
    starGeometry.setAttribute(
        'position',
        new THREE.BufferAttribute(starPositions, 3),
    );

    // Material for the stars
    const starMaterial = new THREE.PointsMaterial();
    starMaterial.color = new THREE.Color(getColor('--gray-200'));
    starMaterial.size = 0.1;
    starMaterial.sizeAttenuation = true;
    starMaterial.transparent = true;
    starMaterial.opacity = 1;

    // Take position and material and form a point cloud
    const starField = new THREE.Points(starGeometry, starMaterial);
    return starField;
}
