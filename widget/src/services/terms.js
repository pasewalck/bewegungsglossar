/**
 * Get list of terms.
 * @param {boolean} [filtered=true] - Whether or not the terms should be filtered for terms without a definition.
 * @returns {Term}
 */

export async function getTerms(filtered = true) {
    const result = await fetch("https://glossardev.aktivismus.org/api/terms");
    const terms = await result.json();
    const termsFiltered = terms.filter((t) => t.definition != null);
    return filtered ? termsFiltered : terms;
}
