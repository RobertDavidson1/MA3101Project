import { unregisterLabelSprite } from '../scene/sceneElements/labels.js';

function disposeMaterial(material) {
    if (!material) return;

    if (Array.isArray(material)) {
        material.forEach((mat) => disposeMaterial(mat));
        return;
    }

    if (material.map) {
        material.map.dispose();
    }

    material.dispose();
}

function disposeObject(object) {
    if (!object) return;

    object.traverse((child) => {
        if (child.userData?.isLabelSprite) {
            unregisterLabelSprite(child);
        }

        if (child.geometry) {
            child.geometry.dispose();
        }

        if (child.material) {
            disposeMaterial(child.material);
        }
    });
}

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
        disposeObject(oldElement);

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
            disposeObject(element);
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
