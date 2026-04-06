import { initGlossary } from './glossary.js';
import { readConfigFromScript } from './config.js';
import '../styles/main.css';

const boot = () => initGlossary(readConfigFromScript());

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
} else {
    boot();
}
