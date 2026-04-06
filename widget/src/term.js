export default class Term {

    constructor(header, headerLower, headerSlug, keywords, definition = undefined) {
        this.header = header
        this.headerSlug = headerSlug
        this.headerLower = headerLower
        this.keywords = keywords
        this.definition = definition
    }
}