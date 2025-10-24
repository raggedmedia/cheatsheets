# ECMAScript Language Schema Cheatsheet  
⚡ **A high-level blueprint of the entire JavaScript language structure (per ECMAScript spec).**  

---

## 🧩 1. Language Layers (Conceptual)
| Layer | Description | Examples |
|-------|--------------|-----------|
| **Syntax Layer** | Keywords, operators, grammar | `if`, `for`, `import`, `class`, `function`, `await`, `{}`, `[]` |
| **Type System Layer** | Primitives and reference types | Numbers, Strings, Objects, Arrays, Functions |
| **Standard Library Layer** | Built-in global objects & methods | `Math`, `JSON`, `Date`, `Promise`, `Intl`, `Reflect` |
| **Host Environment Layer** | APIs provided by browsers or Node.js | `document`, `window`, `fetch`, `process`, `Buffer` |

---

## 🧱 2. Data Types (Built-in ECMAScript Types)

### 🔹 Primitive Types (Immutable, passed by value)
| Type | Example | Notes |
|-------|----------|------|
| `Undefined` | `undefined` | Default uninitialized value |
| `Null` | `null` | Intentional “no value” |
| `Boolean` | `true`, `false` | Logical state |
| `Number` | `42`, `NaN`, `Infinity` | IEEE 754 double |
| `BigInt` | `123n` | Arbitrary-precision integers |
| `String` | `'abc'`, `"abc"`, `` `abc` `` | Immutable text |
| `Symbol` | `Symbol('id')` | Unique property key |

### 🔸 Structural / Reference Types (Mutable)
| Type | Example | Notes |
|-------|----------|------|
| `Object` | `{}`, arrays, functions, maps | Key-value pairs |
| `Function` | `function() {}` | Callable object |
| `Array` | `[1,2,3]` | Ordered list |

---

## 🧰 3. Built-in Global Objects (Core Library)
Exist in every ECMAScript environment.

### Fundamental Objects
`Object`, `Function`, `Boolean`, `Symbol`

### Numbers & Dates
`Number`, `BigInt`, `Math`, `Date`

### Text Processing
`String`, `RegExp`

### Indexed Collections
`Array`, `Int8Array`, `Uint8Array`, `Float64Array`, etc.

### Keyed Collections
`Map`, `Set`, `WeakMap`, `WeakSet`

### Structured Data
`JSON`, `ArrayBuffer`, `DataView`, `Atomics`

### Control Abstraction
`Promise`, `Generator`, `AsyncGenerator`

### Reflection & Meta
`Reflect`, `Proxy`

### Internationalization
`Intl` and sub-APIs (`Intl.DateTimeFormat`, `Intl.NumberFormat`, etc.)

---

## ⚙️ 4. Global Functions (Top-level Utilities)
| Function | Purpose |
|-----------|----------|
| `eval()` | (Avoid) Execute JS string |
| `isFinite()` / `isNaN()` | Number checks |
| `parseInt()`, `parseFloat()` | String → Number |
| `decodeURI()`, `encodeURI()` | URI encoding |
| `setTimeout()`, `setInterval()` | Async timers (host-defined) |

---

## 🧬 5. Prototype Chain Hierarchy
```
Object.prototype
  ├── Function.prototype
  ├── Array.prototype
  ├── String.prototype
  ├── Number.prototype
  ├── Boolean.prototype
  ├── Map.prototype
  ├── Set.prototype
  └── ...
```
All built-in objects inherit from **`Object.prototype`** unless created with `Object.create(null)`.

---

## 🧠 6. Execution Model

| Concept | Description |
|----------|--------------|
| **Lexical Environment** | Each block/function has its own scope. |
| **Hoisting** | Declarations moved to top of scope before run. |
| **Closures** | Functions capture variables from parent scope. |
| **Event Loop** | Executes synchronous code → microtasks (Promises) → macrotasks (timers, IO). |
| **Call Stack** | Tracks execution context order. |
| **Garbage Collection** | Memory cleaned automatically by reachability. |

---

## 🧩 7. Syntax Constructs
| Construct | Examples |
|------------|-----------|
| **Declarations** | `let`, `const`, `function`, `class`, `import` |
| **Statements** | `if`, `for`, `while`, `switch`, `return`, `throw`, `try/catch` |
| **Expressions** | `x + y`, `arr.map()`, `() => {}` |
| **Modules** | `import`, `export`, top-level `await` |
| **Classes** | `class X extends Y { constructor(){} }` |

---

## 🔒 8. Strict Mode & Modules
- `"use strict"` or ES Modules enable strict semantics by default.  
- Prevents silent bugs, implicit globals, and unsafe assignments.  
- Safer `this` handling, cleaner scoping rules.  

---

## 🧠 9. ECMAScript Evolution (Highlights)

| Edition | Major Features |
|----------|----------------|
| **ES3 (1999)** | Core JS features standardized |
| **ES5 (2009)** | Strict mode, JSON, getters/setters |
| **ES6 / ES2015** | `let/const`, classes, promises, modules, arrow functions |
| **ES2017+** | async/await, spread/rest, optional chaining, nullish coalescing, `BigInt`, `Array.prototype.at`, top-level await |

Modern JS = ES2015+ features (now baseline in browsers).

---

## 🌍 10. Host-Defined Additions (Not ECMAScript Core)
| Environment | Examples |
|--------------|-----------|
| **Browser** | DOM, Fetch, History, Storage, Canvas, WebCrypto |
| **Node.js** | `fs`, `path`, `Buffer`, `process`, `global` |

These APIs build on ECMAScript but aren’t part of the spec.

---

## 🧭 TL;DR Mental Model
```
ECMAScript = The language specification (syntax, types, built-ins)
JavaScript = ECMAScript + Host APIs
Browser JS = ECMAScript + Web APIs
Node.js = ECMAScript + Node APIs
```
