import axios from "axios";
import env from "../../utils/env.js";
import { parseMarkdown } from "../../utils/markdown.js";
import Term from "../../models/term.js"

/**
 * Fetch the legacy markdown glossary from the configured URL and parse it into Term instances.
 * @returns {Promise<Term[]>} Array of Term instances.
 */
const getTermArray = async () => {
    const result = await axios.get(
        `${env.LEGACY_MARKDOWN_URL}`
    );
    return parseMarkdown(result.data)
}

export default {
    getTermArray
}