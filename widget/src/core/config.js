export const defaultOptions = {
    includeClasses: [],
    ignoreClasses: ['no-glossary'],
    ignoreTags: ['SCRIPT', 'STYLE', 'TEXTAREA', 'INPUT', 'CODE', 'PRE', 'A'],
};

/**
 * Parse attribute value as JSON or return as-is
 * @param {string} value
 * @returns {any}
 */
function parseAttr(value) {
    if (!value) return undefined;
    try { return JSON.parse(value); } catch { return value; }
}

/**
 * Read configuration from script tag attributes
 * @returns {object} Configuration object
 */
export function readConfigFromScript() {
    let script = document.currentScript;

    if (!script) {
        script = document.querySelector('script[data-id="movement-glossary"]');
    }

    if (!script) return {};

    const cfg = {};
    for (const key of Object.keys(defaultOptions)) {
        const kebab = key.replace(/([A-Z])/g, '-$1').toLowerCase();
        const val = script.getAttribute(key)
            || script.getAttribute('data-' + key)
            || script.getAttribute(kebab)
            || script.getAttribute('data-' + kebab);
        if (val != null) cfg[key] = parseAttr(val);
    }
    return cfg;
}
