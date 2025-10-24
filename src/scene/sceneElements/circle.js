export function createCircle(planeHeight, visibile) {
    const segments = 32;
    const points = [];
    for (let k = 0; k < segments; k++) {
        const t = (k / segments) * 2 * Math.PI;
        const curr_point = calculateCirclePoint(planeHeight, t);
        points.push(curr_point);
    }
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({
        color: getColor('--gray-50'),
    });
    const circle = new THREE.LineLoop(geometry, material);

    circle.visible = visibile;
    return circle;
}
