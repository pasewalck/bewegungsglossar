import { initGlossary } from './glossary.js';
import { defaultOptions } from './options.js';
import './styles.css';

function parseAttr(value) {
    if (!value) return undefined;
    try { return JSON.parse(value); } catch { return value; }
}

function readConfigFromScript() {
    const script = document.currentScript;
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

const boot = () => initGlossary(readConfigFromScript());

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
} else {
    boot();
}
