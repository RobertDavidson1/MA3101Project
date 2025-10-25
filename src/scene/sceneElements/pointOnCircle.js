import { createLabelSprite } from './labels.js';

export function create_p_t_point(planeHeight, visible, t) {
    const circumferencePointGeometry = new THREE.SphereGeometry(
        0.025, // radius
        32, // width segments
        32, // height segments
    );

    const material = new THREE.MeshBasicMaterial({
        color: getColor('--violet'),
        depthTest: true,
    });

    const sphere = new THREE.Mesh(circumferencePointGeometry, material);
    sphere.visible = visible;

    const position = calculateCirclePoint(planeHeight, t);
    sphere.position.copy(position);

    // Create label for the point
    const label = createLabelSprite('p(t)', getColor('--violet'));
    label.position.copy(position).add(new THREE.Vector3(0, 0.1, 0)); // Offset label slightly above the point

    // Create a group to contain both the sphere and label
    const group = new THREE.Group();
    group.add(sphere, label);
    group.visible = visible;
    
    return group;
}

export function create_p_t_vector(t, planeHeight, visible) {
    const C = calculateCircleCenter(planeHeight);
    const r = calculateRadius(planeHeight);

    const position = calculateCirclePoint(planeHeight, t);

    const direction = position.clone().sub(C).normalize();
    const p_tVector = new THREE.ArrowHelper(
        direction,
        C,
        r,
        getColor('--violet'),
        r * 0.1,
        r * 0.1,
    );

    

    p_tVector.visible = visible;
    return p_tVector;
}
