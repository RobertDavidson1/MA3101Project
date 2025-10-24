export class SceneManager {
    constructor(scene) {
        this.scene = scene;
        this.elements = new Map(); // A map to store all scene elements
    }

    // Add a new element (throw if already exists)
    addElement(name, element) {
        // If element already exists throw an error
        if (this.elements.has(name)) {
            throw new Error(
                `Element '${name}' already exists. Use updateElement() instead.`,
            );
        }

        // Else, set and add the element to the scene
        this.elements.set(name, element);
        this.scene.add(element);
    }

    // Update an existing element
    updateElement(name, newElement) {
        if (!this.elements.has(name)) {
            throw new Error(
                `Element '${name}' does not exist. Use addElement() instead.`,
            );
        }

        // Remove the old element
        const oldElement = this.elements.get(name);
        this.scene.remove(oldElement);

        // Dispose of old element to prevent memory leaks
        if (oldElement.geometry) oldElement.geometry.dispose();
        if (oldElement.material) oldElement.material.dispose();

        // Add new element
        this.elements.set(name, newElement);
        this.scene.add(newElement);
    }

    // Remove an element
    removeElement(name) {
        const element = this.elements.get(name);
        if (element) {
            this.scene.remove(element);
            this.elements.delete(name);

            // Properly dispose of Three.js objects to prevent memory leaks
            if (element.geometry) element.geometry.dispose();
            if (element.material) element.material.dispose();
        }
    }

    // Update element visibility
    setVisibility(name, visible) {
        const element = this.elements.get(name);
        if (element) {
            element.visible = visible;
        }
    }

    // Get element by name
    getElement(name) {
        return this.elements.get(name);
    }
}
