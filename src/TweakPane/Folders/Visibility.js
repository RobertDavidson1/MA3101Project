import { p } from '../parameters.js';
import { setLabelsVisible } from '../../scene/sceneElements/labels.js';





//////////////////////////////////////////
//           Visibility Folder          //
//////////////////////////////////////////

export function createVisibilityFolder(pane) {
    const VisibilityFolder = pane.addFolder({
        title: 'Visibility',
        expanded: false,
    });


    ////////////////////////////////
    //           All Labels       //
    ////////////////////////////////
        
    VisibilityFolder.addInput(p, 'showLabels', {
        label: 'All Labels',
    }).on('change', (ev) => {
        setLabelsVisible(ev.value);
    });
    
    ////////////////////////////////
    //      p_t point visibility  //
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
    //     simple controls        //
    ////////////////////////////////

    const controls = [
        { param: 'showSphereCenter', label: 'Sphere Center', element: 'sphereCenter' },
        { param: 'showAcceleration', label: 'Acceleration Vector', element: 'accelerationVector' },
        { param: 'showNormal', label: 'Normal Vector', element: 'sphereNormal' },
        { param: 'showWireframe', label: 'Sphere', element: 'sphere' },
        { param: 'showPlane', label: 'Plane', element: 'plane' },
        { param: 'showAxes', label: 'Axes', element: 'axes' },
    ];

     // Add all simple controls
     controls.forEach(({ param, label, element }) => {
        VisibilityFolder.addInput(p, param, { label }).on('change', (ev) => {
            manager.setVisibility(element, ev.value);
        });
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

    return VisibilityFolder;
}
