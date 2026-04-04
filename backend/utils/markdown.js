import { marked } from 'marked';
import escapeHtml from 'escape-html';
import Term from "../models/term.js";

/**
 * Parse a markdown-formatted glossary into an array of Term instances.
 * @param {string} markdown - The markdown text to parse.
 * @param {string} [titlePrefix='### '] - The prefix that identifies term headers.
 * @returns {Term[]} Array of Term instances parsed from the markdown.
 */
export const parseMarkdown = (markdown, titlePrefix = '### ') => {
    const lines = markdown.split('\n');
    const terms = [];
    let currentTerm = null;

    /**
     * Convert markdown inline styles in a text string to safe HTML.
     * @param {string} text - The input text containing markdown inline styles.
     * @returns {string} Safe HTML string.
     */
    const parseInlineStyles = (text) => {
        // First escape dangerous HTML characters to treat them literally,
        // then parse markdown inline styles.
        return marked.parseInline(escapeHtml(text));
    };

    lines.forEach(line => {
        line = line.trim();
        if (line.startsWith(titlePrefix)) {
            if (currentTerm) {
                terms.push(currentTerm);
            }
            currentTerm = new Term(parseInlineStyles(line.slice(4)));
        } else if (currentTerm && line.startsWith('> ')) {
            const defText = parseInlineStyles(line.slice(2));
            const existing = currentTerm.getDefinition();
            currentTerm.setDefinition((existing ? existing + ' ' : '') + defText);
        }
    });

    if (currentTerm) {
        terms.push(currentTerm);
    }

    return terms;
};