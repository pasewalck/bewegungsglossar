export const parseMarkdown = (markdown, titlePrefix = '### ') => {
    const lines = markdown.split('\n');
    const terms = [];
    let currentTerm = null;

    const parseInlineStyles = (text) => {
        return text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')  // Bold
            .replace(/\*(.*?)\*/g, '<em>$1</em>')              // Italic
            .replace(/`(.*?)`/g, '<code>$1</code>');           // Code
    };

    lines.forEach(line => {
        line = line.trim();
        if (line.startsWith(titlePrefix)) {
            if (currentTerm) {
                terms.push(currentTerm);
            }
            currentTerm = { header: parseInlineStyles(line.slice(4)), definition: '' };
        } else if (currentTerm && line.startsWith('> ')) {
            currentTerm.definition += (currentTerm.definition ? ' ' : '') + parseInlineStyles(line.slice(2));
        }
    });

    if (currentTerm) {
        terms.push(currentTerm);
    }

    return terms;
};