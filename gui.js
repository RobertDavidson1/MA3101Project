// Tweakpane setup
const pane = new Tweakpane.Pane();

// Parameters
const params = {
    showAxes: true, // Loads visible
    showWireframe: true, // Loads visible
    starCount: 1000, // Number of stars
    showPlane: true, // Loads visible for now for development
};

// Scene Options folder
SceneOptions = pane.addFolder({ title: 'Visibility', expanded: false });

SceneOptions.addInput(params, 'showAxes', {
    label: 'Show Axes',
}).on('change', (ev) => {
    axes.visible = ev.value;
});

SceneOptions.addInput(params, 'showWireframe', {
    label: 'Show Sphere',
}).on('change', (ev) => {
    sphere.visible = ev.value;
});

SceneOptions.addInput(params, 'starCount', {
    label: 'Star Count',
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

SceneOptions.addInput(params, 'showPlane', {
    label: 'Show Plane',
}).on('change', (ev) => {
    plane.visible = ev.value;
});
