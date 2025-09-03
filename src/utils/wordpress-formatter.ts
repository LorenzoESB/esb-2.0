export function formatWordPressContent(htmlContent: string): string {
    if (!htmlContent) return '';

    return htmlContent
        // Remove WordPress shortcodes like [caption], [gallery], etc.
        .replace(/\[([^\]]+)\]/g, '')

        // Remove inline styles that might break your design
        .replace(/style="[^"]*"/g, '')

        // Remove WordPress-specific classes that might conflict
        .replace(/class="wp-[^"]*"/g, '')

        // Clean up extra whitespace and line breaks
        .replace(/\s+/g, ' ')
        .replace(/>\s+</g, '><')
        .trim();
}

export function stripHtmlTags(htmlContent: string): string {
    if (!htmlContent) return '';

    return htmlContent
        .replace(/<[^>]*>/g, '') // Remove all HTML tags
        .replace(/&nbsp;/g, ' ') // Replace &nbsp; with regular space
        .replace(/&amp;/g, '&')  // Replace &amp; with &
        .replace(/&lt;/g, '<')   // Replace &lt; with <
        .replace(/&gt;/g, '>')   // Replace &gt; with >
        .replace(/&quot;/g, '"') // Replace &quot; with "
        .replace(/&#039;/g, "'") // Replace &#039; with '
        .replace(/\s+/g, ' ')    // Replace multiple spaces with single space
        .trim();
}

export function createExcerpt(content: string, maxLength: number = 150): string {
    const plainText = stripHtmlTags(content);

    if (plainText.length <= maxLength) {
        return plainText;
    }

    // Find the last complete word before the max length
    const truncated = plainText.substring(0, maxLength);
    const lastSpaceIndex = truncated.lastIndexOf(' ');

    return lastSpaceIndex > 0
        ? truncated.substring(0, lastSpaceIndex) + '...'
        : truncated + '...';
}

export function formatWordPressExcerpt(excerpt: string): string {
    if (!excerpt) return '';

    return excerpt
        // Remove WordPress's default [...] or [&hellip;]
        .replace(/\[&hellip;\]/g, '')
        .replace(/\[\.\.\.\]/g, '')

        // Remove common WordPress excerpt artifacts
        .replace(/<p>/g, '')
        .replace(/<\/p>/g, '')
        .replace(/&hellip;/g, '...')

        // Clean up and format
        .replace(/\s+/g, ' ')
        .trim();
}

export function calculateReadingTime(content: string, wordsPerMinute: number = 200): string {
    const plainText = stripHtmlTags(content);
    const wordCount = plainText.split(/\s+/).filter(word => word.length > 0).length;
    const minutes = Math.ceil(wordCount / wordsPerMinute);

    return `${minutes} min leitura`;
}

export function formatPostDate(dateString: string): string {
    const date = new Date(dateString);

    return date.toLocaleDateString('pt-BR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
}

export function formatPostDateShort(dateString: string): string {
    const date = new Date(dateString);

    return date.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
}

export function formatFullPostContent(content: string): string {
    if (!content) return '';

    return content
        .replace(/<!-- wp:paragraph -->/g, '')
        .replace(/<!-- \/wp:paragraph -->/g, '')
        .replace(/<!-- wp:heading {"level":([1-6])} -->/g, '')
        .replace(/<!-- \/wp:heading -->/g, '')

        .replace(/\[gallery ids="([^"]+)"\]/g, (match, ids) => {
            return `<div class="wp-gallery">${ids.split(',').map((id: string) =>
                `<img src="your-media-endpoint/${id.trim()}" alt="Gallery image" class="gallery-image" />`
            ).join('')}</div>`;
        })

        .replace(/class="wp-block-[^"]*"/g, '')
        .replace(/class="has-[^"]*"/g, '')

        .replace(/<\/p>\s*<p>/g, '</p>\n\n<p>')

        .replace(/\n\s*\n\s*\n/g, '\n\n')
        .trim();
}