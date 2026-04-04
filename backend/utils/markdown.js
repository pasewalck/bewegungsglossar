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
     * Convert a subset of Markdown inline styles in a text string to HTML.
     * @param {string} text - The input text containing markdown inline styles.
     * @returns {string} Text with markdown inline styles replaced by HTML tags.
     */
    const parseInlineStyles = (text) => {

        const escapeMap = new Map([
            ['*', 'ESCAPED_SR_ESCAPED'],   // For `*`
            ['_', 'ESCAPED_LL_ESCAPED'],   // For `_`
            ['`', 'ESCAPED_AP_ESCAPED'],   // For backticks
            ['[', 'ESCAPED_LB_ESCAPED'],   // For `[`
            [']', 'ESCAPED_RB_ESCAPED'],   // For `]`
        ]);

        const decodeMap = new Map(
            [...escapeMap.entries()].map(([key, value]) => [value, key])
        );

        text = text.replace(/\\([*_`\[\]\\])/g, (match, p1) => escapeMap.get(p1));

        text = text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')  // Bold
            .replace(/\*(.*?)\*/g, '<em>$1</em>')              // Italic
            .replace(/`(.*?)`/g, '<code>$1</code>')           // Code
            .replace(/\[(.*?)\]/g, '<a href="$1">$1</a>');     // Links (optional)

        // Unescape the temporarily replaced characters and remove the leading backslash
        text = text.replace(/ESCAPED_[A-Za-z0-9_]+_ESCAPED/g, (match) => decodeMap.get(match));

        return text;
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