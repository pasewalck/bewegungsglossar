import { defaultOptions } from "./options.js";
import { getTerms } from "./utils.js";

export async function initGlossary(opt = {}) {
    const options = Object.assign({}, defaultOptions, opt || {});
    const terms = await getTerms()

    //Todo ...

    return { applied: Object.keys(termsFiltered).length };
}
