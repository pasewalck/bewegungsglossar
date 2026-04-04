import axios from "axios";
import env from "../../utils/env.js";
import { parseMarkdown } from "../../utils/markdown.js";

const getTermArray = async () => {
    const result = await axios.get(
        `${env.LEGACY_MARKDOWN_URL}`
    );
    return parseMarkdown(result.data)
}

export default {
    getTermArray
}