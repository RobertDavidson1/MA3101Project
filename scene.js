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
renderer.setClearColor(getColor('--gray-900')); // Set background color to gray-900
container.appendChild(renderer.domElement);

renderer.antialias = true; // Enable antialiasing

// Camera controls
const controls = new THREE.OrbitControls(camera, renderer.domElement); // Enable orbit controls
controls.enableDamping = true; // Enable damping for smoother movement
controls.maxDistance = Math.sqrt(30 * 30 + 30 * 30 + 30 * 30); // Limit max camera distance to (30,30,30)

// Scene elements
axes = createAxes(params.showAxes);
stars = createStars(params.starCount);
plane = createPlane(params.showPlane);
sphere = createSphere(params.showSphere);
circleCenter = createCircleCenter(params.showCircleCenter);
circle = createCircle(params.planeHeight, params.showCircle);

// Add scene elements to the scene
scene.add(axes);
scene.add(stars);
scene.add(plane);
scene.add(sphere);
scene.add(circleCenter);
scene.add(circle);

// Animation loop
function animate() {
    controls.update(); // smooth camera movement
    renderer.render(scene, camera); // draw scene from camera
    requestAnimationFrame(animate); // repeat each frame
}
animate();
