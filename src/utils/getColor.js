function getColor(cssVar) {
    return getComputedStyle(document.documentElement)
        .getPropertyValue(cssVar)
        .trim();
}
