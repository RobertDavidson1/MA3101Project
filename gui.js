// Tweakpane setup
const pane = new Tweakpane.Pane();

// Parameters
const params = {
    showAxes: false,
    showWireframe: true,
    starCount: 1000,
    showPlane: true,
    showCircleCenter: false,
    showCircle: true,
    show_p_t: true,
    planeHeight: 0.0,
    t: 0.0,
};

//////////////////////////////////////////
//           Visibility Folder          //
//////////////////////////////////////////

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

VisbilityFolder.addInput(params, 'showCircle', {
    label: 'Circle',
}).on('change', (ev) => {
    circle.visible = ev.value;

    // If turned back on, re-create the circle with the new plane height
    if (ev.value === true) {
        scene.remove(circle);
        circle = createCircle(params.planeHeight, params.showCircle);
        scene.add(circle);
    }
});

VisbilityFolder.addInput(params, 'show_p_t', {
    label: 'p_t',
}).on('change', (ev) => {
    p_t.visible = ev.value;

    if (ev.value === true) {
        scene.remove(p_t);
        p_t = pointOnCircle(params.planeHeight, params.showCircle, params.t);
        scene.add(p_t);
    }
});

//////////////////////////////////////////
//           Controls Folder            //
//////////////////////////////////////////

ControlsFolder = pane.addFolder({ title: 'Controls', expanded: true });
ControlsFolder.addInput(params, 'planeHeight', {
    label: 'h (plane height)',
    min: -1.0,
    max: 1.0,
    step: 0.01,
}).on('change', (ev) => {
    plane.position.z = ev.value;
    circleCenter.position.z = ev.value;

    // Only update the circle if its visible - avoids uncessary re-rendering
    if (circle.visible == true) {
        scene.remove(circle);
        circle = createCircle(ev.value, params.showCircle);
        scene.add(circle);
    }

    if (p_t.visible == true) {
        scene.remove(p_t);
        p_t = pointOnCircle(ev.value, params.showCircle, params.t);
        scene.add(p_t);
    }
});

ControlsFolder.addInput(params, 't', {
    label: 't (angle around circle)',
    min: 0.0,
    max: 2 * Math.PI,
    step: 0.01,
}).on('change', (ev) => {
    if (p_t.visible == true) {
        scene.remove(p_t);
        p_t = pointOnCircle(params.planeHeight, params.showCircle, ev.value);
        scene.add(p_t);
    }
});
