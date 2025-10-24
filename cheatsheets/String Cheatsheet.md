# JavaScript String Cheatsheet

⚡ **Strings are immutable!**  
All string methods return a **new string** — the original never changes.  
👉 If you don’t assign the result (`const upper = str.toUpperCase()`), it’s lost.  

---
## Prepending or Appending
Can't do it with vanilla JS (lol fkn JS), instead use string concatenation.
`const result = ```#${str}`;`
`const result = `#${str}-suffix`;
## 🔍 Inspecting
- `charAt(index)` — get character at position → **string (length 1)**  
	- Index starts at 0
- `charCodeAt(index)` — get UTF-16 code unit → **number**  
- `codePointAt(index)` — get Unicode code point → **number**  
- `includes(sub, start?)` — check if substring exists → **boolean**  
- `indexOf(sub, start?)` — first occurrence index → **number | -1**  
- `lastIndexOf(sub, start?)` — last occurrence index → **number | -1**  
- `startsWith(sub, pos?)` — does it start with sub? → **boolean**  
- `endsWith(sub, length?)` — does it end with sub? → **boolean**  

---

## ✂️ Extracting Pieces
- `slice(start, end?)` — substring by indexes → **string**  
- `substring(start, end?)` — substring (swaps args if wrong order) → **string**  
- `substr(start, length?)` — substring by start + length (deprecated) → **string**  

---

## 🔁 Changing Case
- `toUpperCase()` — make all caps → **string**  
- `toLowerCase()` — make all lowercase → **string**  
- `toLocaleUpperCase(locale?)` — locale-aware uppercase → **string**  
- `toLocaleLowerCase(locale?)` — locale-aware lowercase → **string**  
* Capitalising words - can't do it without regex (urk)
	`str.replace(/\b\w/g, c => c.toUpperCase());
	- `\b` → word boundary
	- `\w` → first character of each word
	- `c => c.toUpperCase()` → capitalise it`

---
## 🧹 Trimming / Padding
- `trim()` — remove both ends → **string**  
- `trimStart()` / `trimLeft()` — remove left side → **string**  
- `trimEnd()` / `trimRight()` — remove right side → **string**  
- `padStart(targetLen, padStr?)` — left pad → **string**  
- `padEnd(targetLen, padStr?)` — right pad → **string**  

---

## 🔨 Manipulation
- `concat(...strings)` — join strings → **string**  
- `repeat(count)` — repeat string → **string**  
- `replace(search, replace)` — replace first match → **string**  
- `replaceAll(search, replace)` — replace all matches → **string**  

---

## 🔍 Pattern Matching
- `match(regex)` — array of matches (or `null`)  
- `matchAll(regex)` — iterator of all matches  
- `search(regex)` — index of first match (or -1)  
- `split(separator, limit?)` — break into array → **array of strings**  

---

## 📦 Static Methods
- `String.fromCharCode(...codes)` — build string from UTF-16 codes  
- `String.fromCodePoint(...points)` — build string from Unicode code points  
- `String.raw(template, ...subs)` — raw template literal strings (used with tagged templates)  

---

## ❗ Gotchas
- Strings never change — `"abc".toUpperCase()"` makes `"ABC"` but `"abc"` stays the same.  
- `substring(start, end)` vs `slice(start, end)` → `slice` allows negatives, `substring` does not.  
- `replace` only does the **first** match unless you use `replaceAll` or regex `/g`.  
- `split('')` gives array of characters, but `Array.from(str)` is better for full Unicode (handles emoji, surrogate pairs).  
- `"5" == 5` → true, but `"5" === 5` → false.  

---

## 🧠 Memory Hacks
- Always save the result: `const upper = str.toUpperCase()`.  
- Prefer `slice` over `substring` (more predictable).  
- For Unicode-safe iteration, use `for...of` or `Array.from(str)`.  
- `trim` + `pad` = whitespace alignment toolkit.  
