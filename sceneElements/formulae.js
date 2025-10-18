function getColor(cssVar) {
    return getComputedStyle(document.documentElement)
        .getPropertyValue(cssVar)
        .trim();
}

function cosT(t) {
    return Math.cos(t);
}

function sinT(t) {
    return Math.sin(t);
}

function calculateRadius(planeHeight) {
    return Math.sqrt(Math.max(0, 1 - planeHeight * planeHeight));
}

function calculateCircleCenter(planeHeight) {
    // C = (0,0,h)
    return new THREE.Vector3(0, 0, 1).multiplyScalar(planeHeight);
}
