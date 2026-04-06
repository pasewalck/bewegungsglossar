/**
 * Get list of terms.
 * @param {boolean} [filtered=true] - Whether or not the terms should be filtered for terms without a definition.
 * @returns {Term}
 */

export async function getTerms(filtered = true) {
    const result = await fetch(`${import.meta.env.VITE_APP_BACKEND_URL}/api/terms`);
    const terms = await result.json();
    const termsFiltered = terms.filter((t) => t.definition != null);
    return filtered ? termsFiltered : terms;
}
