export function toUrlFriendlyFormat(input: string): string {
    return input
        .trim() // Remove leading and trailing spaces
        .toLowerCase() // Convert to lowercase
        .replace(/[^a-z0-9\s-]/g, '') // Remove special characters except spaces and hyphens
        .replace(/\s+/g, '-') // Replace spaces with hyphens
        .replace(/-+/g, '-'); // Remove multiple hyphens
}

export function toUrlFriendlyFormatWithId(productName: string, productId: string): string {
    const urlFriendlyName = productName
        .trim() 
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '') 
        .replace(/\s+/g, '-') 
        .replace(/-+/g, '-');
        
    return `${urlFriendlyName}-${productId}`;
}

export function fromUrlFriendlyFormatWithId(productUrl: string): { productName: string, productId: string } {
    const lastHyphenIndex = productUrl.lastIndexOf('-');
    
    const productId = productUrl.slice(lastHyphenIndex + 1);
    const urlFriendlyName = productUrl.slice(0, lastHyphenIndex);

    const productName = urlFriendlyName
        .replace(/-/g, ' ') // Replace hyphens with spaces
        .replace(/\b\w/g, char => char.toUpperCase()); // Capitalize the first letter of each word

    return { productName, productId };
}