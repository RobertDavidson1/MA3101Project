// Basic three.js setup
const container = document.getElementById('app');
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    55, // FOV
    window.innerWidth / window.innerHeight, // Aspect ratio
    0.1, // Near plane
    100, // Far plane
);
camera.up.set(0, 0, 1); // make Z the up-axis
camera.position.set(3, 3, 3);

// Redraw scene on window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Renderer setup
renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio(window.devicePixelRatio); // Render at full native screen resolution
renderer.setSize(window.innerWidth, window.innerHeight); // Use the full window size
renderer.setClearColor(getColor('--neutral-800')); // Set background color to gray-900
container.appendChild(renderer.domElement);

renderer.antialias = true; // Enable antialiasing

// Camera controls
const controls = new THREE.OrbitControls(camera, renderer.domElement); // Enable orbit controls
controls.enableDamping = true; // Enable damping for smoother movement
controls.maxDistance = Math.sqrt(30 * 30 + 30 * 30 + 30 * 30); // Limit max camera distance to (30,30,30)

// Scene elements
axes = createAxes(p.showAxes);
stars = createStars(p.starCount);
plane = createPlane(p.showPlane);

sphere = createSphere(p.showSphere);
circleCenter = createCircleCenter(p.planeHeight, p.showCircleCenter);
cosVector = createCosVector(p.t, p.planeHeight, p.showCosSinVectors);
sinVector = createSinVector(p.t, p.planeHeight, p.showCosSinVectors);
cosVectorTip = createCosVectorTip(p.t, p.planeHeight, p.showCosSinVectors);
sinVectorTip = createSinVectorTip(p.t, p.planeHeight, p.showCosSinVectors);
p_t_vector = create_p_t_vector(p.t, p.planeHeight, p.show_p_t_vector);

circle = createCircle(p.planeHeight, p.showCircle);
p_t = create_p_t_point(p.planeHeight, p.show_p_t, p.t);

// Add scene elements to the scene

scene.add(axes);
scene.add(stars);
scene.add(plane);
scene.add(sphere);
scene.add(circleCenter);
scene.add(cosVector);
scene.add(sinVector);
scene.add(cosVectorTip);
scene.add(sinVectorTip);
scene.add(p_t_vector);
scene.add(circle);
scene.add(p_t);

// Animation loop
function animate() {
    controls.update(); // smooth camera movement
    renderer.render(scene, camera); // draw scene from camera
    requestAnimationFrame(animate); // repeat each frame
}
animate();
