import { createEl } from "../highlighting/keywords.js";

const tooltipMap = new Map()

const tooltipHolder = document.createElement("div");
tooltipHolder.className = "glossary-tooltip-holder";
document.body.append(tooltipHolder)

export function showTooltip(term) {
    const tooltip = createOrGetTooltip(term)
    tooltip.style.display = "flex";
}

export function hideTooltip(term) {
    const tooltip = createOrGetTooltip(term)
    tooltip.style.display = "none";
}

export function createTooltip(term) {

    const tooltip = createEl("div", {
        className: "glossary-tooltip-item",
        children: [
            createEl("div", {
                children: [
                    createEl("div", {
                        children: [createEl("h2", { text: term.header }), createEl("p", { text: term.definition }),
                        createEl("span", {
                            children: [
                                createEl("span", { text: "Powered by" }),
                                createEl("a", { text: "Movement Glossar", href: `${import.meta.env.VITE_APP_BACKEND_URL}` })
                            ]
                        }),]
                    }),
                    createEl("button", {
                        text: "", onInit: (el) => {
                            el.addEventListener("click", () => hideTooltip(term));
                        }
                    }),
                ]
            })
        ], onInit: (el) => {
            el.addEventListener("click", (event) => {
                if (el == (event.target))
                    hideTooltip(term)
            });
        }
    });

    tooltipMap.set(term.headerSlug, tooltip);
    tooltipHolder.appendChild(tooltip);

    return tooltip

}

export function createOrGetTooltip(term) {
    return tooltipMap.has(term.headerSlug) ? tooltipMap.get(term.headerSlug) : createTooltip(term)
}
