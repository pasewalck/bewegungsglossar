export const defaultOptions = {
    includeClasses: [],
    ignoreClasses: ['no-glossary'],
    ignoreTags: ['SCRIPT', 'STYLE', 'TEXTAREA', 'INPUT', 'CODE', 'PRE', 'A'],
    styleWithUnderline: true,
    styleWithHighlight: true,
    onlyStyleFirst: false,
    minDetectLength: 2
};

/**
 * Parse attribute value
 * @param {string} value
 * @returns {any}
 */
function parseAttr(value, defaultVal) {
    if (!value) return undefined;
    switch (typeof defaultVal) {
        case "boolean":
            return value === "true"
        case "number":
            return Number.parseInt(value)
        default:
            if (Array.isArray(defaultVal))
                return value.split(",").map(v => v.trim())
            else
                return value
    }
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
        if (val != null) cfg[key] = parseAttr(val, defaultOptions[key]);

    }
    return cfg;
}
