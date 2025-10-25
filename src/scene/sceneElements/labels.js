const labelSprites = new Set();
let labelsVisible = true;

export function setLabelsVisible(visible) {
    labelsVisible = Boolean(visible);
    labelSprites.forEach((sprite) => {
        sprite.visible = labelsVisible;
    });
}

export function unregisterLabelSprite(sprite) {
    if (labelSprites.has(sprite)) {
        labelSprites.delete(sprite);
    }
}

export function createLabelSprite(text, color = '#fff', height = 0.5) {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const c = document.createElement('canvas');
    const ctx = c.getContext('2d');
  
    const fontSize = 64;
    const padX = 20;
    const padY = 20 * 20;                
    const font = `800 ${fontSize}px JetBrains Mono`;
  
    ctx.font = font;
    const w = Math.ceil(ctx.measureText(text).width) + padX * 2;
    const h = fontSize + padY;
  
    c.width = Math.max(2, Math.round(w * dpr));
    c.height = Math.max(2, Math.round(h * dpr));
  
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.font = font;
    ctx.clearRect(0, 0, w, h);           
    ctx.fillStyle = color;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, w / 2, h / 2);
  
    const tex = new THREE.CanvasTexture(c);
    tex.premultiplyAlpha = true;          
    tex.minFilter = THREE.LinearFilter;
    tex.magFilter = THREE.LinearFilter;
    tex.generateMipmaps = false;
  
    const material = new THREE.SpriteMaterial({
      map: tex,
      transparent: true,
      alphaTest: 0.01,                    
      depthWrite: false,                  
      depthTest: true
    });
  
    const sprite = new THREE.Sprite(material);
    const aspect = w / h;
    sprite.scale.set(height * aspect, height, 1);
    sprite.userData.isLabelSprite = true;
    sprite.visible = labelsVisible;
    labelSprites.add(sprite);
    return sprite;
}