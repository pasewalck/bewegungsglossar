/**
 * Create a DOM element with the specified properties
 * @param {string} tag - HTML tag name
 * @param {object} props - Element properties
 * @returns {HTMLElement}
 */

export function createEl(tag, { text, className, children, href, html, onInit } = {}) {
    const el = document.createElement(tag);

    if (text != null) el.textContent = text;
    if (className) el.className = className;
    if (children) el.append(...children);
    if (href) el.href = href;
    if (html) el.innerHTML = html;
    if (onInit) onInit(el);

    return el;
}
