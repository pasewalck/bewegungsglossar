/**
 * Represents a glossary term with a header and an definition.
 */
export class Term {
    /**
     * Create a Term.
     * @param {string} header - The header value (term title).
     * @param {string} [definition] - The optional definition or value associated with the header.
     */
    constructor(header, definition = undefined) {
        this.header = header
        this.definition = definition
    }

    /**
     * Set the header for this Term.
     * @param {string} header - The header value to set.
     * @returns {void}
     */
    setHeader(header) {
        this.header = header
    }

    /**
     * Get the header of this Term in lowercase.
     * @returns {string} The current header.
     */
    getHeaderLower() {
        return this.header.toLocaleLowerCase()
    }

    /**
     * Get the header of this Term as a slug.
     * @returns {string} The current header.
     */
    getHeaderSlug() {
        return this.getHeaderLower().replaceAll(" ", "-")
    }

    /**
     * Get the header of this Term.
     * @returns {string} The current header.
     */
    getHeader() {
        return this.header
    }

    /**
     * Set the definition for this Term.
     * @param {string} definition - The definition value to set.
     * @returns {void}
     */
    setDefinition(definition) {
        this.definition = definition
    }

    /**
     * Get the definition of this Term.
     * @returns {string|undefined} The current definition, or undefined if none is set.
     */
    getDefinition() {
        return this.definition
    }

    /**
     * Determine whether this Term has a definition.
     * @returns {boolean} True if a definition is set; otherwise false.
     */
    hasDefinition() {
        return this.getDefinition() != undefined
    }
}