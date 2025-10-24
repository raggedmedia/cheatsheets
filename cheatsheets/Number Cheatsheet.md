# JavaScript Number Cheatsheet

⚡ **Numbers are 64-bit floating point (IEEE-754)**  
- One type for integers & floats.  
- Max safe integer: `2^53 - 1` (≈ 9 quadrillion).  
- For larger, use **BigInt** (`123n`).  
- Numbers are **immutable primitives** (ops return a new number).  

---

## 🔍 Checking / Validation
- `Number.isNaN(x)` — true only if x is **NaN**  
- `isNaN(x)` — true if coerced value is NaN (`isNaN("foo")` → true)  
- `Number.isFinite(x)` — true if finite number  
- `isFinite(x)` — true if coerced value is finite  
- `Number.isInteger(x)` — true if integer  
- `Number.isSafeInteger(x)` — true if within ±`2^53 - 1`  

---

## 🔢 Conversion & Parsing
- `Number(value)` — strict conversion to number  
- `parseInt(str, radix)` — parse integer from string  
- `parseFloat(str)` — parse float from string  
- `num.toString(radix)` — convert number to string (binary, hex, etc.)  

---

## 🧮 Formatting for Display
- `num.toFixed(digits)` — fixed decimal places → **string**  
- `num.toPrecision(digits)` — total significant digits → **string**  
- `num.toExponential(digits?)` — exponential notation → **string**  

---

## 📐 Math Helpers (from `Math`)
- `Math.round(x)` — nearest integer  
- `Math.floor(x)` — round down  
- `Math.ceil(x)` — round up  
- `Math.trunc(x)` — remove decimals  
- `Math.abs(x)` — absolute value  
- `Math.pow(x, y)` / `x ** y` — exponent  
- `Math.sqrt(x)` / `Math.cbrt(x)` — roots  
- `Math.max(...nums)` / `Math.min(...nums)` — extremes  
- `Math.random()` — random float [0,1)  

---

## ❗ Gotchas (real-world pain points)
- **Floating point precision**  
  ```js
  0.1 + 0.2 === 0.3 // false (0.30000000000000004)
  ```
- **NaN weirdness**  
  - `NaN !== NaN`  
  - Only `Number.isNaN(NaN)` → true  
- **Infinity**  
  - `1/0 === Infinity`  
  - `Infinity + 1 === Infinity`  
- **Safe integer limit**  
  ```js
  Number.MAX_SAFE_INTEGER + 1 === Number.MAX_SAFE_INTEGER + 2 // true
  ```
- **Numbers have no `.length`**  
  ```js
  (12345).length // undefined
  String(12345).length // 5
  ```
- **Parsing quirks**  
  - `parseInt("42px")` → 42  
  - `parseFloat("3.14abc")` → 3.14  
  - `Number("3.14abc")` → NaN  
- **Type coercion traps**  
  - `Number(null)` → 0  
  - `Number(undefined)` → NaN  
  - `Number(true)` → 1, `Number(false)` → 0  
  - `Number("   ")` → 0  

---

## 🧠 Memory Hacks
- For reliable checks: use `Number.isNaN` and `Number.isFinite`.  
- For decimals: `toFixed` for display, never for math.  
- Always pass a radix to `parseInt` → `parseInt("101", 2)`.  
- Convert to string for digit counts: `String(n).length`.  
- Use **BigInt** for integers beyond ±`2^53 - 1`.  
