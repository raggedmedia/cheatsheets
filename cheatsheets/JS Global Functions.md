# JavaScript Global Utility Functions Cheatsheet

⚡ **Reminder**: These are **global functions** (not tied to arrays, numbers, etc.).  
Call them directly: `parseInt("42")`, `isNaN(123)`, etc.  

---

## 🔢 Parsing & Conversion
- `parseInt(string, radix?)` — parse string → **integer** (or `NaN`)  
- `parseFloat(string)` — parse string → **floating-point number** (or `NaN`)  
- `Number(value)` — convert value to number → **number or NaN**  
- `BigInt(value)` — convert value to **BigInt** (integer of arbitrary size)  

---

## 🔍 Checking Values
- `isNaN(value)` — true if value is **NaN** (after coercion to number)  
- `Number.isNaN(value)` — true if value is **exactly NaN** (no coercion)  
- `isFinite(value)` — true if value is a **finite number** (after coercion)  
- `Number.isFinite(value)` — true if value is **finite number** (no coercion)  
- `typeof value` — returns **string** describing type (e.g. `"string"`, `"object"`)  
- `instanceof` — test if object is an instance of a constructor → **boolean**

---

## 🔀 Encoding & Decoding
- `encodeURI(uri)` — escape characters in URI (keeps `: / ? & =`) → **string**  
- `decodeURI(uri)` — unescape → **string**  
- `encodeURIComponent(str)` — escape **everything** (good for query params) → **string**  
- `decodeURIComponent(str)` — unescape → **string**  

---

## 📏 Object Utilities
- `Object.keys(obj)` — list of property names → **array of strings**  
- `Object.values(obj)` — list of property values → **array**  
- `Object.entries(obj)` — key/value pairs → **array of [key, value]**  
- `Object.assign(target, ...sources)` — copy properties → **mutates target**  
- `Object.freeze(obj)` — make object immutable → **obj**  
- `Object.seal(obj)` — prevent new props, keep existing mutable → **obj**  

---

## 🕒 Timing
- `setTimeout(fn, delay, ...args)` — run fn after delay (ms) → **timeout ID**  
- `clearTimeout(id)` — cancel timeout  
- `setInterval(fn, delay, ...args)` — run fn repeatedly → **interval ID**  
- `clearInterval(id)` — cancel interval  

---

## 🧮 Math (via `Math` object)
- `Math.abs(x)` — absolute value  
- `Math.floor(x)` — round down  
- `Math.ceil(x)` — round up  
- `Math.round(x)` — round to nearest  
- `Math.max(...nums)` — largest number  
- `Math.min(...nums)` — smallest number  
- `Math.random()` — random float between 0 and 1  
- `Math.trunc(x)` — remove fractional part  

---

## 📦 JSON
- `JSON.stringify(value)` — object → **string**  
- `JSON.parse(string)` — string → **object**  

---

## ❗ Gotchas
- `parseInt("08")` → 8 (always base-10 in modern JS, but always pass radix to be safe).  
- `isNaN("foo")` → true (because `"foo"` coerces to NaN). Prefer `Number.isNaN`.  
- `parseInt("42px")` → 42 (parses until non-digit).  
- `parseFloat("3.14somejunk")` → 3.14.  
- `Math.random()` is **not cryptographically secure**. Use `crypto.getRandomValues()` if you need that.  

---

## 🧠 Memory Hacks
- Use **`Number.isNaN`** and **`Number.isFinite`** for reliable checks.  
- Always pass a radix to `parseInt` (`parseInt("101", 2)`).  
- Remember: `parseInt`/`parseFloat` read until junk, but `Number()` fails hard.  
- `Object.keys/values/entries` → arrays you can loop/map over.  
- `setTimeout(fn, 0)` = “next tick,” not instant.  
