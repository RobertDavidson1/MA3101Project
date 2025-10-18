// Tweakpane setup
const pane = new Tweakpane.Pane();

// Parameters
const p = {
    showAxes: false,
    showWireframe: true,
    starCount: 1000,
    showPlane: true,
    showCircleCenter: false,
    showCircle: true,
    show_p_t: true,
    showCosSinVectors: false,
    show_p_t_vector: true,
    planeHeight: 0.0,
    t: Math.PI / 4,
};

//////////////////////////////////////////
//           Visibility Folder          //
//////////////////////////////////////////

VisbilityFolder = pane.addFolder({ title: 'Visibility', expanded: false });

VisbilityFolder.addInput(p, 'showAxes', {
    label: 'Axes',
}).on('change', (ev) => {
    axes.visible = ev.value;
});

VisbilityFolder.addInput(p, 'showWireframe', {
    label: 'Sphere',
}).on('change', (ev) => {
    sphere.visible = ev.value;
});
VisbilityFolder.addInput(p, 'showCircleCenter', {
    label: 'Circle Center',
}).on('change', (ev) => {
    circleCenter.visible = ev.value;

    if (ev.value === true) {
        scene.remove(circleCenter);
        circleCenter = createCircleCenter(p.planeHeight, p.showCircleCenter);
        scene.add(circleCenter);
    }
});

VisbilityFolder.addInput(p, 'starCount', {
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

VisbilityFolder.addInput(p, 'showPlane', {
    label: 'Plane',
}).on('change', (ev) => {
    plane.visible = ev.value;
});

VisbilityFolder.addInput(p, 'showCosSinVectors', {
    label: 'Cos & Sin Vectors',
}).on('change', (ev) => {
    cosVector.visible = ev.value;
    sinVector.visible = ev.value;
    cosVectorTip.visible = ev.value;
    sinVectorTip.visible = ev.value;

    if (ev.value === true) {
        scene.remove(cosVector);
        cosVector = createCosVector(p.t, p.planeHeight, p.showCosSinVectors);
        scene.add(cosVector);

        scene.remove(sinVector);
        sinVector = createSinVector(p.t, p.planeHeight, p.showCosSinVectors);
        scene.add(sinVector);

        scene.remove(cosVectorTip);
        cosVectorTip = createCosVectorTip(
            p.t,
            p.planeHeight,
            p.showCosSinVectors,
        );
        scene.add(cosVectorTip);

        scene.remove(sinVectorTip);
        sinVectorTip = createSinVectorTip(
            p.t,
            p.planeHeight,
            p.showCosSinVectors,
        );
        scene.add(sinVectorTip);
    }
});

VisbilityFolder.addInput(p, 'showCircle', {
    label: 'Circle',
}).on('change', (ev) => {
    circle.visible = ev.value;

    // If turned back on, re-create the circle with the new plane height
    if (ev.value === true) {
        scene.remove(circle);
        circle = createCircle(p.planeHeight, p.showCircle);
        scene.add(circle);
    }
});

VisbilityFolder.addInput(p, 'show_p_t', {
    label: 'p_t (point)',
}).on('change', (ev) => {
    p_t.visible = ev.value;

    if (ev.value === true) {
        scene.remove(p_t);
        p_t = create_p_t_point(p.planeHeight, p.show_p_t, p.t);
        scene.add(p_t);
    }
});

VisbilityFolder.addInput(p, 'show_p_t_vector', {
    label: 'p_t (vector)',
}).on('change', (ev) => {
    p_t_vector.visible = ev.value;

    if (ev.value === true) {
        scene.remove(p_t_vector);
        p_t_vector = create_p_t_vector(p.t, p.planeHeight, p.show_p_t_vector);
        scene.add(p_t_vector);
    }
});

//////////////////////////////////////////
//           Controls Folder            //
//////////////////////////////////////////

ControlsFolder = pane.addFolder({ title: 'Controls', expanded: true });
ControlsFolder.addInput(p, 'planeHeight', {
    label: 'h (plane height)',
    min: -1.0,
    max: 1.0,
    step: 0.01,
}).on('change', (ev) => {
    plane.position.z = ev.value;

    // Only update the circle if its visible - avoids uncessary re-rendering
    if (circle.visible == true) {
        scene.remove(circle);
        circle = createCircle(ev.value, p.showCircle);
        scene.add(circle);
    }

    if (p_t.visible == true) {
        scene.remove(p_t);
        p_t = create_p_t_point(ev.value, p.show_p_t, p.t);
        scene.add(p_t);
    }

    if (circleCenter.visible == true) {
        scene.remove(circleCenter);
        circleCenter = createCircleCenter(ev.value, p.showCircleCenter);
        scene.add(circleCenter);
    }

    if (p.showCosSinVectors == true) {
        scene.remove(cosVector);
        cosVector = createCosVector(p.t, ev.value, p.showCosSinVectors);
        scene.add(cosVector);

        scene.remove(sinVector);
        sinVector = createSinVector(p.t, ev.value, p.showCosSinVectors);
        scene.add(sinVector);

        scene.remove(cosVectorTip);
        cosVectorTip = createCosVectorTip(p.t, ev.value, p.showCosSinVectors);
        scene.add(cosVectorTip);

        scene.remove(sinVectorTip);
        sinVectorTip = createSinVectorTip(p.t, ev.value, p.showCosSinVectors);
        scene.add(sinVectorTip);
    }

    if (p.show_p_t_vector == true) {
        scene.remove(p_t_vector);
        p_t_vector = create_p_t_vector(
            ev.value,
            p.planeHeight,
            p.show_p_t_vector,
        );
        scene.add(p_t_vector);
    }
});

ControlsFolder.addInput(p, 't', {
    label: 't (angle around circle)',
    min: 0.0,
    max: 2 * Math.PI,
    step: 0.01,
}).on('change', (ev) => {
    if (p_t.visible == true) {
        scene.remove(p_t);
        p_t = create_p_t_point(p.planeHeight, p.show_p_t, ev.value);
        scene.add(p_t);
    }
    if (p.showCosSinVectors == true) {
        scene.remove(cosVector);
        cosVector = createCosVector(
            ev.value,
            p.planeHeight,
            p.showCosSinVectors,
        );
        scene.add(cosVector);

        scene.remove(sinVector);
        sinVector = createSinVector(
            ev.value,
            p.planeHeight,
            p.showCosSinVectors,
        );
        scene.add(sinVector);

        scene.remove(cosVectorTip);
        cosVectorTip = createCosVectorTip(
            ev.value,
            p.planeHeight,
            p.showCosSinVectors,
        );
        scene.add(cosVectorTip);

        scene.remove(sinVectorTip);
        sinVectorTip = createSinVectorTip(
            ev.value,
            p.planeHeight,
            p.showCosSinVectors,
        );
        scene.add(sinVectorTip);
    }

    if (p.show_p_t_vector == true) {
        scene.remove(p_t_vector);
        p_t_vector = create_p_t_vector(
            ev.value,
            p.planeHeight,
            p.show_p_t_vector,
        );
        scene.add(p_t_vector);
    }
});
