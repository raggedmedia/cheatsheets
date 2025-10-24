# Object Cheatsheet  
⚡ **Reminder:** Objects are **mutable** — you can change properties even if declared with `const`.  
Use spread (`{ ...obj }`) or `structuredClone()` for safe, immutable copies.

---

## 🛠 Mutates the Object  

### Add / Remove / Change  
`obj.key = value` — add or overwrite property → returns assigned value  
`delete obj.key` — remove property → returns true if deleted  
`Object.assign(target, ...sources)` — copy props into target → returns target  
`Object.defineProperty(obj, key, desc)` — define fine-grained property → returns object  

### Lock or Protect  
`Object.preventExtensions(obj)` — block new props → returns obj  
`Object.seal(obj)` — block add/remove, allow edits → returns obj  
`Object.freeze(obj)` — block all changes (shallow) → returns obj  

---

## 🚫 Does Not Mutate (returns new value)

### Clone / Merge  
`{ ...obj }` — shallow copy → returns new object  
`Object.assign({}, obj)` — shallow copy → returns new object  
`structuredClone(obj)` — deep copy (modern browsers) → returns new object  
`Object.fromEntries(pairs)` — build from `[key, value]` → returns new object  

### Inspect / Read  
`Object.keys(obj)` — property names → returns array  
`Object.values(obj)` — property values → returns array  
`Object.entries(obj)` — `[key, value]` pairs → returns array  
`Object.hasOwn(obj, key)` — own prop only → returns boolean  
`'key' in obj` — checks key (including prototype) → returns boolean  

### Prototype  
`Object.create(proto)` — make new with prototype → returns new object  
`Object.getPrototypeOf(obj)` — get prototype → returns object  
`Object.setPrototypeOf(obj, proto)` — change prototype → returns obj (slow, avoid)  

### Compare / Check  
`Object.is(a, b)` — like `===` but `NaN === NaN` → returns boolean  
`a === b` — same reference only → returns boolean  

---

## 🔁 Iterate

### Over keys / values  
```js
Object.keys(obj).forEach(k => console.log(k, obj[k]));
```

### Over entries  
```js
for (const [k, v] of Object.entries(obj)) console.log(k, v);
```

### Safe check inside loops  
```js
for (const k in obj) {
  if (Object.hasOwn(obj, k)) console.log(k, obj[k]);
}
```

### Nested iteration (deep walk)
```js
function walk(o) {
  for (const [k, v] of Object.entries(o)) {
    if (v && typeof v === 'object') walk(v);
    else console.log(k, v);
  }
}
```

---

## 🧩 Transform

`Object.fromEntries(Object.entries(obj).map(([k,v]) => [k, fn(v)]))` — map values  
`Object.fromEntries(Object.entries(obj).filter(([k,v]) => v != null))` — filter  
`Object.fromEntries(Object.entries(obj).map(([k,v]) => [rename(k), v]))` — rename keys  

---

## ❗ Gotchas

- `{}` === `{}` → false (compares by reference)  
- `typeof null === 'object'` 😬 historical bug  
- `for…in` iterates inherited props — guard with `Object.hasOwn()`  
- `Object.freeze()` is **shallow** — nested objects still mutable  
- `Object.assign()` / spread are **shallow** clones  
- JSON drops functions, `undefined`, and symbols  
- Key order: numeric keys first (ascending), then insertion order  

---

## 🧠 Memory Hacks

- Mutable by default → use `Object.freeze()` for config constants  
- Prefer spread over `assign()` for clarity  
- Use `structuredClone()` for deep copies  
- `Object.entries()` + `Object.fromEntries()` = map/filter/reduce playground  
- Want truly key-value storage? Use `Map` instead  
