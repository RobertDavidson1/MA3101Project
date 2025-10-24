const container = document.getElementById('app');

function createScene() {
    return new THREE.Scene();
}

function createCamera() {
    const camera = new THREE.PerspectiveCamera(
        55, // FOV
        window.innerWidth / window.innerHeight, // Aspect ratio
        0.1, // Near plane
        100, // Far plane
    );
    camera.up.set(0, 0, 1); // make Z the up-axis
    camera.position.set(3, 3, 3);
    return camera;
}

function createRenderer(container) {
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(getColor('--neutral-800'));
    container.appendChild(renderer.domElement);
    return renderer;
}
// Redraw scene on window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

function createControls(camera, renderer) {
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.maxDistance = Math.sqrt(30 * 30 + 30 * 30 + 30 * 30);
    return controls;
}

function setupEventListeners(camera, renderer) {
    function handleResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }

    window.addEventListener('resize', handleResize);

    // Return cleanup function
    return () => {
        window.removeEventListener('resize', handleResize);
    };
}

// Initialize scene components
const scene = createScene();
const camera = createCamera();
const renderer = createRenderer(container);
const controls = createControls(camera, renderer);
