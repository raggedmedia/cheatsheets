# 🧠 JavaScript Operators and Precedence

This document lists **all JavaScript operators**, grouped by type and ordered by **precedence** — from highest (evaluated first) to lowest (evaluated last).

---

## 🧮 Arithmetic Operators

| Operator | Description         | Example                | Result |                                                |
| -------- | ------------------- | ---------------------- | ------ | ---------------------------------------------- |
| `+`      | Addition            | `5 + 2`                | `7`    |                                                |
| `-`      | Subtraction         | `5 - 2`                | `3`    |                                                |
| `*`      | Multiplication      | `5 * 2`                | `10`   |                                                |
| `/`      | Division            | `5 / 2`                | `2.5`  |                                                |
| `%`      | Modulus (remainder) | `5 % 2`                | `1`    | If there's no remainder, then it's a multiple! |
| `**`     | Exponentiation      | `2 ** 3`               | `8`    |                                                |
| `++`     | Increment           | `let a = 5; a++` → `6` |        |                                                |
| `--`     | Decrement           | `let a = 5; a--` → `4` |        |                                                |

---

## 🧩 Assignment Operators

| Operator | Description | Example | Equivalent |
|-----------|--------------|----------|-------------|
| `=` | Assign | `x = 5` | — |
| `+=` | Add and assign | `x += 2` | `x = x + 2` |
| `-=` | Subtract and assign | `x -= 2` | `x = x - 2` |
| `*=` | Multiply and assign | `x *= 2` | `x = x * 2` |
| `/=` | Divide and assign | `x /= 2` | `x = x / 2` |
| `%=` | Modulus and assign | `x %= 2` | `x = x % 2` |
| `**=` | Exponentiate and assign | `x **= 2` | `x = x ** 2` |
| `<<=` | Left shift and assign | `x <<= 1` | `x = x << 1` |
| `>>=` | Right shift and assign | `x >>= 1` | `x = x >> 1` |
| `>>>=` | Unsigned right shift assign | `x >>>= 1` | `x = x >>> 1` |
| `&=`, `^=`, `\|=` | Bitwise assign ops | — | — |
| `&&=`, `\|\|=`, `??=` | Logical assignment | — | — |

---

## ⚖️ Comparison Operators

| Operator | Description | Example | Result |
|-----------|--------------|----------|---------|
| `==` | Equal to (loose) | `5 == "5"` | `true` |
| `===` | Equal to (strict) | `5 === "5"` | `false` |
| `!=` | Not equal (loose) | `5 != "5"` | `false` |
| `!==` | Not equal (strict) | `5 !== "5"` | `true` |
| `>` | Greater than | `5 > 3` | `true` |
| `<` | Less than | `5 < 3` | `false` |
| `>=` | Greater or equal | `5 >= 5` | `true` |
| `<=` | Less or equal | `5 <= 2` | `false` |

---

## 🔀 Logical Operators

| Operator | Description        | Example              | Result       |
| -------- | ------------------ | -------------------- | ------------ |
| `&&`     | Logical AND        | `true && false`      | `false`      |
| `\|\|`   | Logical OR         | `true \|\| false`    | `true`       |
| `!`      | Logical NOT        | `!true`              | `false`      |
| `??`     | Nullish coalescing | `null ?? "fallback"` | `"fallback"` |

---


---

## 🧬 String Operators

| Operator | Description | Example | Result |
|-----------|--------------|----------|---------|
| `+` | Concatenation | `"Hi " + "there"` | `"Hi there"` |
| `+=` | Append and assign | `str += "!"` | `"Hello!"` |

---

## ❓ Conditional (Ternary) Operator

| Operator | Description | Example | Result |
|-----------|--------------|----------|---------|
| `? :` | Inline condition | `age >= 18 ? "Adult" : "Minor"` | `"Adult"` |

---

## 🧱 Optional Chaining & Nullish Coalescing

| Operator | Description | Example | Result |
|-----------|--------------|----------|---------|
| `?.` | Safe property access | `user?.profile?.name` | `undefined` (if no profile) |
| `??` | Default for null/undefined | `user.name ?? "Guest"` | `"Guest"` |

---

## ⚡ Comma Operator

| Operator | Description | Example | Result |
|-----------|--------------|----------|---------|
| `,` | Evaluates multiple expressions and returns the last one | `(a = 1, b = 2, a + b)` | `3` |

---

## 🧩 Spread and Rest Operators

| Operator | Description | Example | Result |
|-----------|--------------|----------|---------|
| `...` | Spread or rest syntax | `[...arr]` or `function(...args)` | Expands or collects items |

---

## 📚 Notes

- **Higher precedence** = evaluated earlier.  
  Example: `2 + 3 * 4` → `3 * 4` runs first → result is `14`.  
- Use parentheses `()` to override precedence.
- Logical and assignment operators can **short-circuit** depending on conditions.
- Operator precedence can differ slightly in edge cases (especially with `??`, `||`, and `&&`).

---
