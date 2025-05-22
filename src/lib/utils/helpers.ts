// Utility functions

// Function to copy text to clipboard
export async function copyToClipboard(text: string): Promise<boolean> {
    try {
        await navigator.clipboard.writeText(text);
        return true;
    } catch (err) {
        console.error('Failed to copy text: ', err);
        return false;
    }
}

// Function to download a file
export function downloadFile(filename: string, content: string) {
    const element = document.createElement('a');
    element.setAttribute(
        'href',
        'data:text/plain;charset=utf-8,' + encodeURIComponent(content)
    );
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}

// Function to generate a filename from a script title
export function generateFilename(title: string): string {
    return title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '_')
        .replace(/^_+|_+$/g, '') + '.py';
}

// Function to format date in a readable format
export function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }).format(date);
}

// Function to create a shortened description with ellipsis
export function truncateText(text: string, maxLength: number = 100): string {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
}

// Function to validate code
export function validatePythonCode(code: string): boolean {
    // Basic validation - check for some Python syntax
    const hasDefOrClass = /def\s+|class\s+/.test(code);
    const hasImport = /import\s+|from\s+\w+\s+import/.test(code);
    
    // Not perfect but a basic heuristic
    return code.length > 50 && (hasDefOrClass || hasImport);
}
