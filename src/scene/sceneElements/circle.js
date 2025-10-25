export function createCircle(planeHeight, visibile) {
    const color = getColor(planeHeight === 0 ? '--green' : '--neutral-100');
    
    const segments = 128;
    const points = [];
    for (let k = 0; k < segments; k++) {
        const t = (k / segments) * 2 * Math.PI;
        const curr_point = calculateCirclePoint(planeHeight, t);
        points.push(curr_point);
    }
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({
        color: color,
    });
    const circle = new THREE.LineLoop(geometry, material);

    circle.visible = visibile;
    return circle;
}
