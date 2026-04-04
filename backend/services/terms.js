import env from "../utils/env.js"
import bookstackInput from "./input/bookstack.js"
import legacyInput from "./input/legacy.js"
import Term from '../models/term.js'

const termMap = new Map()

/**
 * Fetch Term array from configured data source.
 * @returns {Promise<Term[]>} Array of Term instances.
 */
const fetchTerms = async () => {
    var terms = []
    switch (env.DATA_SOURCE) {
        case "bookstack":
            terms = await bookstackInput.getTermArray()
            break;
        case "legacy":
            terms = await legacyInput.getTermArray()
            break;
        default:
            terms = await legacyInput.getTermArray()
            break;
    }
    return terms
}

/**
 * Populate the internal termMap from the configured data source.
 * @returns {Promise<void>} Resolves when the map is populated.
 */
const populateTermMap = async () => {
    const terms = await fetchTerms()
    termMap.clear()
    for (let index = 0; index < terms.length; index++) {
        const term = terms[index];
        termMap.set(term.getHeaderSlug(), term)
    }
}

/**
 * Get all Term instances currently stored in the termMap.
 * @returns {Promise<Array<Term>>} Array of Term objects.
 */
const getTerms = async () => {
    const values = Array.from(termMap.values())
    return values
}

/**
 * Get a Term by its slug key.
 * @param {string} header - The slug or key used to look up the Term (usually term.getHeaderSlug()).
 * @returns {Promise<Term|undefined>} The Term if found, otherwise undefined.
 */
const getTerm = async (header) => {
    return termMap.get(header)
}

/* Initialize the term map immediately and refresh hourly */
await populateTermMap()
setInterval(populateTermMap, 1000 * 60 * 60)

export default {
    getTerm, getTerms
}
