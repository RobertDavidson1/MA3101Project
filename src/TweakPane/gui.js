import { p } from './parameters.js';
import { createVisibilityFolder } from './Folders/Visibility.js';
import { createControlsFolder } from './Folders/Controls.js';
import { setLabelsVisible } from '../scene/sceneElements/labels.js';

const pane = new Tweakpane.Pane();

// Create the visibility folder
const VisibilityFolder = createVisibilityFolder(pane);
const ControlsFolder = createControlsFolder(pane);

setLabelsVisible(p.showLabels);
