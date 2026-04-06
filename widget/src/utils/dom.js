/**
 * Check whether an element should be skipped during DOM traversal.
 *
 * @param {Element} el
 * @param {Set<string>} ignoreTags  - uppercase tag names to skip
 * @param {string[]}    ignoreClasses - CSS classes to skip
 * @returns {boolean}
 */
export function shouldIgnoreElement(el, ignoreTags, ignoreClasses) {
    if (ignoreTags.has(el.tagName)) return true;
    if (el.classList) {
        for (const cls of ignoreClasses) {
            if (el.classList.contains(cls)) return true;
        }
    }
    // Skip elements we already processed
    if (el.classList && el.classList.contains("glossary-highlight")) return true;
    return false;
}

/**
 * Determine the root elements to scan for keywords.
 *
 * @param {string[]} includeClasses - if non-empty, only elements with these classes are scanned
 * @returns {Element[]}
 */
export function getSearchRoots(includeClasses) {
    if (includeClasses.length > 0) {
        const selector = includeClasses.map(c => "." + CSS.escape(c)).join(", ");
        return [...document.querySelectorAll(selector)];
    }
    return [document.body];
}

/**
 * Collect all non-empty text nodes under `root`, skipping ignored elements.
 *
 * @param {Element}     root
 * @param {Set<string>} ignoreTags
 * @param {string[]}    ignoreClasses
 * @returns {Text[]}
 */
export function collectTextNodes(root, ignoreTags, ignoreClasses) {
    const textNodes = [];
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
        acceptNode(node) {
            let parent = node.parentElement;
            while (parent && parent !== root) {
                if (shouldIgnoreElement(parent, ignoreTags, ignoreClasses)) {
                    return NodeFilter.FILTER_REJECT;
                }
                parent = parent.parentElement;
            }
            if (node.textContent.trim() === "") return NodeFilter.FILTER_REJECT;
            return NodeFilter.FILTER_ACCEPT;
        }
    });

    while (walker.nextNode()) {
        textNodes.push(walker.currentNode);
    }
    return textNodes;
}
