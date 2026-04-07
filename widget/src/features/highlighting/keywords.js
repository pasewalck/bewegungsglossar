import Term from "../../models/term.js";

/**
 * Build a map of lowercase keyword -> term object.
 * @param {Term[]} terms - terms from the API
 * @param {number} minLength - min length of keywords mapped
 * @returns {Map<string, Term>}
 */
export function buildKeywordMap(terms, minLength) {
    const keywordMap = new Map();
    for (const term of terms) {
        if (!term.keywords || !term.definition) continue; // must have `keywords` and `definition`
        for (const kw of term.keywords) {
            if (kw.length < minLength) continue; // keyword needs to be longer than min length
            const lower = kw.toLowerCase().trim();
            if (lower && !keywordMap.has(lower)) {
                keywordMap.set(lower, term);
            }
        }
    }
    return keywordMap;
}

/**
 * Build a single regex that matches any keyword (longest first).
 * @param {Map<string, object>} keywordMap
 * @returns {RegExp}
 */
export function buildKeywordPattern(keywordMap) {
    const sortedKeywords = [...keywordMap.keys()].sort((a, b) => b.length - a.length);
    const escaped = sortedKeywords.map(k => k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
    return new RegExp(`(?<!\\p{L})(${escaped.join("|")})(?!\\p{L})`, "giu");
}
