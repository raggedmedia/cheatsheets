/** True when a method name or signature is code (`split()`, `new Promise()`) rather than a prose label. */
export const looksLikeCode = (s: string) =>
    /^([a-z$_.{\[]|[A-Za-z]+[.(])/.test(s) && !/^[A-Za-z]+ [a-z]+ [a-z]+/.test(s);
