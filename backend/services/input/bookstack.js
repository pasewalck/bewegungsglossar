import axios from "axios";
import env from "../../utils/env.js";
import { parseMarkdown } from "../../utils/markdown.js";
import Term from "../../models/term.js"

const getRequestConfig = (
    additionalRequestData = {},
    additionalHeaders = { "Content-Type": "application/json" }
) => {
    return {
        ...additionalRequestData,
        headers: {
            Authorization: `Token ${env.BOOKSTACK_TOKEN_ID}:${env.BOOKSTACK_TOKEN_SECRET}`,
            ...additionalHeaders,
        },
    };
};

/**
 * Fetch markdown for glossary book from the configured bookstack API URL and parse it into Term instances.
 * @returns {Promise<Term[]>} Array of Term instances.
 */
const getTermArray = async () => {
    const pageIds = await getPageIds(env.BOOKSTACK_GLOSSAR_BOOK)

    const terms = []

    for (let i = 0; i < pageIds.length; i++) {
        const pageId = pageIds[i];
        const markdown = await getPageAsMarkdown(pageId)
        terms.push(...parseMarkdown(markdown))
    }
    return terms
}

const getPageAsMarkdown = async (pageId) => {
    const { data } = await axios.get(
        `${env.BOOKSTACK_BASE_URL}/api/pages/${pageId}/export/markdown/`,
        getRequestConfig()
    );
    return data
}

const getPageIds = async (bookId) => {

    const { data } = await axios.get(
        `${env.BOOKSTACK_BASE_URL}/api/books/${bookId}`,
        getRequestConfig()
    );
    const pageIds = []
    for (let i = 0; i < data.contents.length; i++) {
        const content = data.contents[i];
        if (content.type == "page")
            pageIds.push(content.id)
        else if (content.type == "chapter")
            for (let y = 0; y < content.pages.length; y++) {
                const page = content.pages[i]
                pageIds.push(page.id)
            }
    }
    return pageIds
};

export default {
    getTermArray
}