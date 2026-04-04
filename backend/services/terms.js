import env from "../utils/env.js"
import bookstackInput from "./input/bookstack.js"
import legacyInput from "./input/legacy.js"

const termMap = new Map()

const populateTermMap = async () => {
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
    termMap.clear()
    for (let index = 0; index < terms.length; index++) {
        const term = terms[index];
        termMap.set(term.getHeaderSlug(), term)
    }
}

const getTerms = async () => {
    const values = Array.from(termMap.values())
    return values
}

const getTerm = async (header) => {
    return termMap.get(header)
}

await populateTermMap()
setInterval(populateTermMap, 1000 * 60 * 60)

export default {
    getTerm, getTerms
}