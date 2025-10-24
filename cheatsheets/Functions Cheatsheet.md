# Functions in Modern JavaScript — Reference Sheet  
⚡ **Goal:** Write functions that behave predictably, avoid `this` confusion, and stay clean and reusable.

---

## 🧱 Declaring Functions

### Function Declaration  
```js
function greet(name) {
  return `Hello, ${name}`;
}
```
✅ Hoisted (can be called before definition)  
✅ Great for reusable helpers and named utilities  

### Function Expression  
```js
const greet = function(name) {
  return `Hello, ${name}`;
};
```
⚠️ Not hoisted — must be defined before use  
Useful when passing functions as arguments or closures  

### Arrow Function  
```js
const greet = name => `Hello, ${name}`;
```
✅ Concise syntax  
⚠️ Lexical `this`, no `arguments`, can’t be used with `new`  
Perfect for callbacks, array methods, and inline logic  

### Object / Class Methods  
```js
const obj = {
  sayHi() { console.log('hi'); }
};
```
✅ Proper `this` binding when called as a method

---

## ⚙️ When to Use What

| Purpose | Best Syntax | Why |
|----------|--------------|-----|
| Reusable top-level helper | `function foo() {}` | Hoisted, readable, debuggable |
| Inline callback / map/filter | `() => {}` | Compact, lexical `this` |
| Object or class method | `method() {}` | Binds correctly |
| Needs `this` (event handler, DOM) | `function() {}` | Arrows lose `this` |
| Async operation | `async function` or `const fn = async () => {}` | Clear intent, returns a Promise |

---

## 🧩 Parameters & Returns

### Default values  
```js
function hi(name = 'world') {
  return `Hello ${name}`;
}
```

### Rest / Spread  
```js
function sum(...nums) {
  return nums.reduce((a, b) => a + b, 0);
}
const arr = [1, 2, 3];
sum(...arr); // spread when calling
```

### Destructuring params  
```js
function show({ name, age }) {
  console.log(`${name} (${age})`);
}
```

### Returning objects  
Use parentheses in arrows:  
```js
const makeUser = name => ({ name });
```

---

## 🧭 `this` Rules

| Type | `this` Behavior |
|------|------------------|
| Function Declaration | Dynamic — depends on caller |
| Arrow Function | Lexical — inherits from outer scope |
| Object/Class Method | Bound to object/class instance |
| Event Listener | `this` = element (if not arrow) |

**Example:**  
```js
const obj = {
  name: 'Ada',
  arrow: () => console.log(this.name),  // ❌ undefined
  normal() { console.log(this.name); }  // ✅ Ada
};
```

---

## 🧠 Scoping & Closures

Functions “remember” the variables in their creation scope.  
```js
function outer() {
  let count = 0;
  return function inner() {
    return ++count;
  };
}
const next = outer();
next(); // 1
next(); // 2
```

✅ Avoid global variables — wrap logic in modules or closures.  

---

## 🔄 Function Utilities

`fn.call(thisArg, ...args)` — invoke with specific `this`  
`fn.apply(thisArg, argsArray)` — same but takes array  
`fn.bind(thisArg, ...args)` — returns permanently bound function  

**Example:**  
```js
function greet() { console.log(this.name); }
const user = { name: 'Ada' };
const bound = greet.bind(user);
bound(); // Ada
```

---

## ⚡ Common Gotchas

- Arrow functions have no own `this` or `arguments`.  
- Function expressions aren’t hoisted.  
- Returning object literals from arrows requires parentheses.  
- Async functions **always return a Promise**.  
- Losing `this` in callbacks (e.g., event listeners) — use `.bind()` or arrow in correct context.  
- Never declare functions inside loops unless scoped intentionally.  
- Default params are evaluated at call time.  

---

## 🧠 Best-Practice Defaults

✅ Use **`function`** declarations for reusable utilities.  
✅ Use **arrows** for callbacks and short functions.  
✅ Use **method syntax** in objects/classes.  
✅ Prefer **rest/spread** to `arguments`.  
✅ Always name reusable functions for better stack traces.  
✅ Don’t rely on `this` unless you mean to.  

---

## 🧩 Quick Patterns

**Immediately Invoked Function Expression (IIFE):**  
```js
(() => console.log('runs immediately'))();
```

**Higher-order function:**  
```js
const once = fn => {
  let done = false;
  return (...args) => !done && (done = true, fn(...args));
};
```

**Currying:**  
```js
const add = a => b => a + b;
```

**Composition:**  
```js
const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x);
```

---

## 🧩 Rule of Thumb Summary

- **Arrows** → short, inline, lexical `this`.  
- **Functions** → reusable, hoisted, named.  
- **Methods** → objects/classes, maintain `this`.  
- Keep them **pure** and **small**; pass state, don’t mutate.  

