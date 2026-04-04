import dotenv from "dotenv";

dotenv.config();

export default {
    LEGACY_MARKDOWN_URL: process.env.LEGACY_MARKDOWN_URL || "https://pad.degrowth.net/s/Glossar/download",
    BOOKSTACK_BASE_URL: process.env.BOOKSTACK_BASE_URL,
    BOOKSTACK_TOKEN_ID: process.env.BOOKSTACK_TOKEN_ID,
    BOOKSTACK_TOKEN_SECRET: process.env.BOOKSTACK_TOKEN_SECRET,
    BOOKSTACK_GLOSSAR_BOOK: process.env.BOOKSTACK_GLOSSAR_BOOK || 2004,
    DATA_SOURCE: process.env.DATA_SOURCE || "legacy",
    ALLOWED_ORIGIN: process.env.ALLOWED_ORIGIN || "*",
};
