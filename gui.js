// Tweakpane setup
const pane = new Tweakpane.Pane();

// Parameters
const params = {
    showAxes: false, // Loads invisible for now for devlopment
    showWireframe: true, // Loads visible
    starCount: 1000, // Number of stars
    showPlane: true, // Loads visible for now for development
    showCircleCenter: true, // Loads visible for now for development
    planeHeight: 0.0, // Height of the plane
};

// Scene Options folder
VisbilityFolder = pane.addFolder({ title: 'Visibility', expanded: false });

VisbilityFolder.addInput(params, 'showAxes', {
    label: 'Axes',
}).on('change', (ev) => {
    axes.visible = ev.value;
});

VisbilityFolder.addInput(params, 'showWireframe', {
    label: 'Sphere',
}).on('change', (ev) => {
    sphere.visible = ev.value;
});
VisbilityFolder.addInput(params, 'showCircleCenter', {
    label: 'Circle Center',
}).on('change', (ev) => {
    circleCenter.visible = ev.value;
});

VisbilityFolder.addInput(params, 'starCount', {
    label: 'Num Stars',
    min: 0,
    max: 20000,
    step: 1000,
}).on('change', (ev) => {
    // Remove the old star field
    scene.remove(stars);

    // Create new star field with updated count
    stars = createStars(ev.value);
    scene.add(stars);
});

VisbilityFolder.addInput(params, 'showPlane', {
    label: 'Plane',
}).on('change', (ev) => {
    plane.visible = ev.value;
});

ControlsFolder = pane.addFolder({ title: 'Controls', expanded: true });
ControlsFolder.addInput(params, 'planeHeight', {
    label: 'Plane Height',
    min: -1.0,
    max: 1.0,
    step: 0.1,
}).on('change', (ev) => {
    plane.position.z = ev.value;
    circleCenter.position.z = ev.value;
});
