import { showTooltip } from "../tooltip/tooltip.js";
import Term from "../../models/term.js"

/**
 * Scan text nodes for keyword matches and wrap them in highlight + tooltip elements.
 * @param {Text[]}              textNodes
 * @param {RegExp}              pattern
 * @param {Map<string, Term>} keywordMap
 * @returns {number} number of highlights applied
 */
export function highlightTextNodes(textNodes, pattern, keywordMap) {
    let applied = 0;

    for (const textNode of textNodes) {
        const text = textNode.textContent;
        pattern.lastIndex = 0;

        const parts = [];
        let tailIndex = 0;
        let match;

        while ((match = pattern.exec(text)) !== null) {
            const matchStart = match.index;
            const matchText = match[0];
            const term = keywordMap.get(matchText.toLowerCase());

            if (!term) continue;

            if (matchStart < tailIndex) continue;

            parts.push(document.createTextNode(text.slice(tailIndex, matchStart)));

            const highlight = document.createElement("span");
            highlight.className = "glossary-highlight";
            highlight.textContent = matchText;

            highlight.addEventListener("click", () => showTooltip(term));
            parts.push(highlight);
            tailIndex = matchStart + matchText.length;
            applied++;
        }

        // Only modify DOM if we found matches
        if (parts.length > 0) {
            if (tailIndex < text.length) {
                parts.push(document.createTextNode(text.slice(tailIndex)));
            }

            const fragment = document.createDocumentFragment();
            for (const part of parts) {
                fragment.appendChild(part);
            }
            textNode.parentNode.replaceChild(fragment, textNode);
        }
    }

    return applied;
}
