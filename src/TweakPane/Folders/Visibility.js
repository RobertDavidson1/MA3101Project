import { p } from '../parameters.js';

//////////////////////////////////////////
//           Visibility Folder          //
//////////////////////////////////////////

export function createVisibilityFolder(pane) {
    const VisibilityFolder = pane.addFolder({
        title: 'Visibility',
        expanded: true,
    });

    ////////////////////////////////
    //       axes visibility      //
    ////////////////////////////////

    VisibilityFolder.addInput(p, 'showAxes', {
        label: 'Axes',
    }).on('change', (ev) => {
        manager.setVisibility('axes', ev.value);
    });

    ////////////////////////////////
    //       sphere center        //
    ////////////////////////////////

    VisibilityFolder.addInput(p, 'showSphereCenter', {
        label: 'Sphere Center',
    }).on('change', (ev) => {
        manager.setVisibility('sphereCenter', ev.value);
    });

    ////////////////////////////////
    //  acceleration  visibility  //
    ////////////////////////////////

    VisibilityFolder.addInput(p, 'showAcceleration', {
        label: 'Acceleration Vector',
    }).on('change', (ev) => {
        manager.setVisibility('accelerationVector', ev.value);
    });

    VisibilityFolder.addInput(p, 'showNormal', {
        label: 'Normal Vector',
    }).on('change', (ev) => {
        manager.setVisibility('sphereNormal', ev.value);
    });

    VisibilityFolder.addInput(p, 'showAcceleration', {
        label: 'Acceleration Vector',
    }).on('change', (ev) => {
        manager.setVisibility('accelerationVector', ev.value);
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
                createCosineCompletion(p.t, p.planeHeight, p.showCosSinVectors),
            );
            manager.updateElement(
                'sinVectorTip',
                createSinCompletion(p.t, p.planeHeight, p.showCosSinVectors),
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

    return VisibilityFolder;
}
