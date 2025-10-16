// Helper function to get CSS root color variables
function getColor(cssVar) {
    return getComputedStyle(document.documentElement)
        .getPropertyValue(cssVar)
        .trim();
}
