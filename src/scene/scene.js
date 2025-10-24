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
const renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio(window.devicePixelRatio); // Render at full native screen resolution
renderer.setSize(window.innerWidth, window.innerHeight); // Use the full window size
renderer.setClearColor(getColor('--neutral-800')); // Set background color to gray-900
container.appendChild(renderer.domElement);

renderer.antialias = true; // Enable antialiasing

// Camera controls
const controls = new THREE.OrbitControls(camera, renderer.domElement); // Enable orbit controls
controls.enableDamping = true; // Enable damping for smoother movement
controls.maxDistance = Math.sqrt(30 * 30 + 30 * 30 + 30 * 30); // Limit max camera distance to (30,30,30)
