import { defaultOptions } from "./config.js";
import { getTerms } from "../services/terms.js";
import { getSearchRoots, collectTextNodes } from "../utils/dom.js";
import { highlightTextNodes } from "../features/highlighting/highlight.js";
import { buildKeywordMap, buildKeywordPattern } from "../features/highlighting/keywords.js";

export async function initGlossary(opt = {}) {
    const options = Object.assign({}, defaultOptions, opt || {});
    const terms = await getTerms();

    const keywordMap = buildKeywordMap(terms);
    if (keywordMap.size === 0) return { applied: 0 };

    const pattern = buildKeywordPattern(keywordMap);

    const ignoreTags = new Set(options.ignoreTags.map(t => t.toUpperCase()));
    const ignoreClasses = options.ignoreClasses || [];
    const includeClasses = options.includeClasses || [];

    let applied = 0;
    const roots = getSearchRoots(includeClasses);

    for (const root of roots) {
        const textNodes = collectTextNodes(root, ignoreTags, ignoreClasses);
        applied += highlightTextNodes(textNodes, pattern, keywordMap, options);
    }

    return { applied };
}
