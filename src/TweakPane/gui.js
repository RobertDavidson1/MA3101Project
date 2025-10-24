import { p } from './parameters.js';
import { createVisibilityFolder } from './Folders/Visibility.js';
import { createControlsFolder } from './Folders/Controls.js';

const pane = new Tweakpane.Pane();

// Create the visibility folder
const VisibilityFolder = createVisibilityFolder(pane);
const ControlsFolder = createControlsFolder(pane);
