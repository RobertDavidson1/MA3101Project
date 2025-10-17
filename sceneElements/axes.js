function createAxes(visible) {
    const axes = new THREE.AxesHelper(2);

    // Set initial visibility
    axes.visible = visible;
    return axes;
}
