/** Remove emoji (and stray U+FFFD) that lead any element in rendered HTML. */
export const stripLeadingEmoji = (html: string) =>
    html.replace(/(^|>)\s*[\p{Extended_Pictographic}️‍�]+\s*/gu, "$1");
