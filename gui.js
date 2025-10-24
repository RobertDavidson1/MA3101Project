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

VisibilityFolder = pane.addFolder({ title: 'Visibility', expanded: false });

////////////////////////////////
//       axes visibility      //
////////////////////////////////

VisibilityFolder.addInput(p, 'showAxes', {
    label: 'Axes',
}).on('change', (ev) => {
    manager.setVisibility('axes', ev.value);
});

////////////////////////////////
//      sphere visibility     //
////////////////////////////////

VisibilityFolder.addInput(p, 'showWireframe', {
    label: 'Sphere',
}).on('change', (ev) => {
    manager.setVisibility('sphere', ev.value);
});
////////////////////////////////
//   circle center visibility //
////////////////////////////////

VisibilityFolder.addInput(p, 'showCircleCenter', {
    label: 'Circle Center',
}).on('change', (ev) => {
    manager.setVisibility('circleCenter', ev.value);

    if (ev.value === true) {
        manager.updateElement(
            'circleCenter',
            createCircleCenter(p.planeHeight, p.showCircleCenter),
        );
    }
});

////////////////////////////////
//      stars visibility      //
////////////////////////////////

VisibilityFolder.addInput(p, 'starCount', {
    label: 'Num Stars',
    min: 0,
    max: 20000,
    step: 1000,
}).on('change', (ev) => {
    // Update star field with new count
    manager.updateElement('stars', createStars(ev.value));
});

////////////////////////////////
//      plane visibility      //
////////////////////////////////

VisibilityFolder.addInput(p, 'showPlane', {
    label: 'Plane',
}).on('change', (ev) => {
    manager.setVisibility('plane', ev.value);
});

////////////////////////////////
//   cos/sin vectors visibility //
////////////////////////////////

VisibilityFolder.addInput(p, 'showCosSinVectors', {
    label: 'Cos & Sin Vectors',
}).on('change', (ev) => {
    manager.setVisibility('cosVector', ev.value);
    manager.setVisibility('sinVector', ev.value);
    manager.setVisibility('cosVectorTip', ev.value);
    manager.setVisibility('sinVectorTip', ev.value);

    if (ev.value === true) {
        manager.updateElement(
            'cosVector',
            createCosVector(p.t, p.planeHeight, p.showCosSinVectors),
        );
        manager.updateElement(
            'sinVector',
            createSinVector(p.t, p.planeHeight, p.showCosSinVectors),
        );
        manager.updateElement(
            'cosVectorTip',
            createCosVectorTip(p.t, p.planeHeight, p.showCosSinVectors),
        );
        manager.updateElement(
            'sinVectorTip',
            createSinVectorTip(p.t, p.planeHeight, p.showCosSinVectors),
        );
    }
});

////////////////////////////////
//      circle visibility      //
////////////////////////////////

VisibilityFolder.addInput(p, 'showCircle', {
    label: 'Circle',
}).on('change', (ev) => {
    manager.setVisibility('circle', ev.value);

    // If turned back on, re-create the circle with the new plane height
    if (ev.value === true) {
        manager.updateElement(
            'circle',
            createCircle(p.planeHeight, p.showCircle),
        );
    }
});

////////////////////////////////
//      p_t point visibility   //
////////////////////////////////

VisibilityFolder.addInput(p, 'show_p_t', {
    label: 'p_t (point)',
}).on('change', (ev) => {
    manager.setVisibility('p_t', ev.value);

    if (ev.value === true) {
        manager.updateElement(
            'p_t',
            create_p_t_point(p.planeHeight, p.show_p_t, p.t),
        );
    }
});

////////////////////////////////
//     p_t vector visibility   //
////////////////////////////////

VisibilityFolder.addInput(p, 'show_p_t_vector', {
    label: 'p_t (vector)',
}).on('change', (ev) => {
    manager.setVisibility('p_t_vector', ev.value);

    if (ev.value === true) {
        manager.updateElement(
            'p_t_vector',
            create_p_t_vector(p.t, p.planeHeight, p.show_p_t_vector),
        );
    }
});

//////////////////////////////////////////
//           Controls Folder            //
//////////////////////////////////////////

ControlsFolder = pane.addFolder({ title: 'Controls', expanded: true });

////////////////////////////////
//          h controls        //
////////////////////////////////

ControlsFolder.addInput(p, 'planeHeight', {
    label: 'h (plane height)',
    min: -1.0,
    max: 1.0,
    step: 0.01,
}).on('change', (ev) => {
    // Update plane position
    const planeElement = manager.getElement('plane');
    if (planeElement) {
        planeElement.position.z = ev.value;
    }

    // Only update elements if they're visible - avoids unnecessary re-rendering
    if (manager.getElement('circle')?.visible) {
        manager.updateElement('circle', createCircle(ev.value, p.showCircle));
    }

    if (manager.getElement('p_t')?.visible) {
        manager.updateElement(
            'p_t',
            create_p_t_point(ev.value, p.show_p_t, p.t),
        );
    }

    if (manager.getElement('circleCenter')?.visible) {
        manager.updateElement(
            'circleCenter',
            createCircleCenter(ev.value, p.showCircleCenter),
        );
    }

    if (p.showCosSinVectors) {
        manager.updateElement(
            'cosVector',
            createCosVector(p.t, ev.value, p.showCosSinVectors),
        );
        manager.updateElement(
            'sinVector',
            createSinVector(p.t, ev.value, p.showCosSinVectors),
        );
        manager.updateElement(
            'cosVectorTip',
            createCosVectorTip(p.t, ev.value, p.showCosSinVectors),
        );
        manager.updateElement(
            'sinVectorTip',
            createSinVectorTip(p.t, ev.value, p.showCosSinVectors),
        );
    }

    if (p.show_p_t_vector) {
        manager.updateElement(
            'p_t_vector',
            create_p_t_vector(p.t, ev.value, p.show_p_t_vector),
        );
    }
});

////////////////////////////////
//          t controls        //
////////////////////////////////

ControlsFolder.addInput(p, 't', {
    label: 't (angle around circle)',
    min: 0.0,
    max: 2 * Math.PI,
    step: 0.01,
}).on('change', (ev) => {
    if (manager.getElement('p_t')?.visible) {
        manager.updateElement(
            'p_t',
            create_p_t_point(p.planeHeight, p.show_p_t, ev.value),
        );
    }

    if (p.showCosSinVectors) {
        manager.updateElement(
            'cosVector',
            createCosVector(ev.value, p.planeHeight, p.showCosSinVectors),
        );
        manager.updateElement(
            'sinVector',
            createSinVector(ev.value, p.planeHeight, p.showCosSinVectors),
        );
        manager.updateElement(
            'cosVectorTip',
            createCosVectorTip(ev.value, p.planeHeight, p.showCosSinVectors),
        );
        manager.updateElement(
            'sinVectorTip',
            createSinVectorTip(ev.value, p.planeHeight, p.showCosSinVectors),
        );
    }

    if (p.show_p_t_vector) {
        manager.updateElement(
            'p_t_vector',
            create_p_t_vector(ev.value, p.planeHeight, p.show_p_t_vector),
        );
    }
});
