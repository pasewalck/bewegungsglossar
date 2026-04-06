/**
 * Represents a glossary term with a header and an definition.
 */
export default class Term {
    /**
     * Create a Term.
     * @param {string} header - The header value (term title).
     * @param {string} [definition] - The optional definition or value associated with the header.
     */
    constructor(header, definition = undefined) {
        this.header = header
        this.keywords = definition.split(",").map(v => v.trim().toLowerCase())
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
     * Get the keywords of this term.
     * @returns {string[]} The current keywords.
     */
    getKeywords() {
        return this.keywords
    }

    /**
     * Get the header of this Term in lowercase.
     * @returns {string} The current header.
     */
    getHeaderLower() {
        return this.header.toLowerCase()
    }


    /**
     * Get the header of this Term as a slug.
     * @returns {string} The current header.
     */
    getHeaderSlug() {
        return this.getHeaderLower().trim().replace(/[^a-z0-9 -]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-')
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

    /**
     * Return a plain object representation of this Term.
     * Includes header, headerLower, headerSlug, and definition (only if set).
     * @returns {{header: string, headerLower: string, headerSlug: string, definition?: string}} Plain object representation.
     */
    toObject() {
        const obj = {
            header: this.header,
            headerLower: this.getHeaderLower(),
            headerSlug: this.getHeaderSlug(),
            keywords: this.keywords
        };
        if (this.hasDefinition()) obj.definition = this.definition;
        return obj;
    }

    /**
     * Return a JSON string representation of this Term.
     * @returns {string} JSON string.
     */
    toJson() {
        return JSON.stringify(this.toObject());
    }



}