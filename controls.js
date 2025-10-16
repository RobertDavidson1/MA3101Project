// Tweakpane setup
const pane = new Tweakpane.Pane({ title: 'Scene Options' });

// Parameters
const params = {
    showAxes: true,
};

// Add axes toggle
pane.addInput(params, 'showAxes', {
    label: 'Show Axes',
}).on('change', (ev) => {
    axes.visible = ev.value;
});
