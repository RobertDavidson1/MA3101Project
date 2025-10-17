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
