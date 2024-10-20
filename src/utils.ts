/**
 * Removes all illegal characters from a string.
 * Illegal characters are those that can't be present in a filename.
 * @param input - The input string to sanitize.
 * @returns The sanitized string.
 */
function sanitizeFilename(input: string): string {
    // Define a regex pattern for illegal characters in filenames
    const illegalChars = /[\/\?<>\\:\*\|":]/g;
    // Replace illegal characters with an empty string
    return input.replace(illegalChars, '');
}

export { sanitizeFilename };