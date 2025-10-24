# Promises & Async/Await Cheatsheet  
⚡ **Reminder:** Promises represent values that aren’t ready yet.  
They’re the foundation of async JavaScript — `fetch()`, timers, file APIs, etc.  

---

## 🧩 Creating Promises  

### Make your own  
```js
const p = new Promise((resolve, reject) => {
  // async work
  setTimeout(() => resolve('done'), 1000);
});
```
→ returns a **Promise** that settles when you call `resolve()` or `reject()`  

### Common wrappers  
`Promise.resolve(value)` — create resolved promise  
`Promise.reject(error)` — create rejected promise  
`Promise.all([p1, p2])` — wait for all → returns array of results  
`Promise.allSettled([p1, p2])` — wait for all → statuses + values/errors  
`Promise.any([p1, p2])` — first to resolve → value  
`Promise.race([p1, p2])` — first to settle (resolve or reject)  

---

## 🔁 Chaining & Flow Control  

### Then / Catch / Finally  
```js
doThing()
  .then(result => nextThing(result))
  .then(final => console.log(final))
  .catch(err => console.error(err))
  .finally(() => console.log('done'));
```

- Return a value → next `.then()` gets that value.  
- Return a promise → next `.then()` waits for it.  

Example:
```js
fetch('/data.json')
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.error('Error:', err));
```

---

## 💤 Async / Await  

### Basic usage  
```js
async function loadData() {
  try {
    const res = await fetch('/data.json');
    const data = await res.json();
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}
```

- `await` pauses inside an `async` function until resolved.  
- Returns resolved value or throws on rejection.  

### Parallel awaits  
```js
const [posts, users] = await Promise.all([
  fetch('/posts').then(r => r.json()),
  fetch('/users').then(r => r.json())
]);
```

### Sequential awaits  
```js
const a = await doA();
const b = await doB(a);
const c = await doC(b);
```

---

## 🧠 Common Patterns  

### Run multiple async tasks safely  
```js
const results = await Promise.allSettled([
  fetch('/a'),
  fetch('/b'),
  fetch('/c')
]);
results.forEach(r => console.log(r.status, r.value ?? r.reason));
```

### Timeout wrapper  
```js
function timeout(ms) {
  return new Promise((_, reject) => setTimeout(() => reject('Timeout'), ms));
}
await Promise.race([fetch('/slow'), timeout(2000)]);
```

### Retry pattern  
```js
async function retry(fn, attempts = 3) {
  for (let i = 0; i < attempts; i++) {
    try { return await fn(); } catch (e) {
      if (i === attempts - 1) throw e;
    }
  }
}
```

### Queue / sequential loop  
```js
for (const url of urls) {
  const data = await fetch(url).then(r => r.json());
  console.log(data);
}
```

---

## 🌀 Nested Async/Await Gotchas  

### 1️⃣ Returning the inner async call  
If you `await` inside a function but **don’t return or await** the result, the outer caller won’t wait.  
```js
async function outer() {
  inner(); // ❌ not awaited
  console.log('done');
}
async function inner() {
  await new Promise(r => setTimeout(r, 1000));
  console.log('inner done');
}
await outer();
// logs: "done" then "inner done"
```

✅ Fix: either `await` or `return` the inner call  
```js
async function outer() {
  await inner(); // ✅ waits correctly
}
```

---

### 2️⃣ Async `.map()` or `.forEach()` don't await  
```js
[1,2,3].forEach(async n => {
  await doSomething(n);
  console.log('done', n);
});
console.log('finished'); // runs first!
```
✅ Fix:  
Use `for...of` or `Promise.all`:  
```js
for (const n of [1,2,3]) await doSomething(n);
await Promise.all([1,2,3].map(doSomething));
```

---

### 3️⃣ Await inside loops = sequential  
```js
for (const url of urls) await fetch(url); // runs one by one
```
✅ Fix (parallel):  
```js
await Promise.all(urls.map(u => fetch(u)));
```

---

### 4️⃣ Async returns always Promises  
Nested async calls don't auto-unwrap.  
```js
async function a() { return 5; }
async function b() { return a(); }
const val = await b(); // ✅ 5
const wrong = b();     // ❌ Promise
```

---

### 5️⃣ Errors bubble only if awaited  
```js
async function inner() { throw new Error('boom'); }
async function outer() { inner(); } // ❌ unhandled rejection
```
✅ Fix:  
```js
async function outer() {
  try { await inner(); } catch (err) { console.error(err); }
}
```

---

### 6️⃣ Deeply nested awaits = slow + messy  
```js
const data = await fetchData();
const user = await fetchUser(data.id);
const profile = await fetchProfile(user.id);
```
✅ Fix: flatten or parallelize:  
```js
const [data, user, profile] = await Promise.all([
  fetchData(), fetchUser(1), fetchProfile(1)
]);
```

---

### 🧠 Nested Rules of Thumb  
- ✅ Always **return or await** async calls.  
- ❌ Don’t use `await` inside `.forEach()` or `.map()` without `Promise.all()`.  
- 🧩 For loops = sequential, `Promise.all` = parallel.  
- 🧱 If it returns a Promise, **await it at the boundary**.  

---

## ⚠️ Gotchas  
- `await` only works inside `async` functions.  
- `async` always returns a Promise, even for plain values.  
- `Promise.all()` fails fast (first reject stops all).  
- `Promise.allSettled()` handles mixed results.  
- `fetch()` rejects only on network errors, not HTTP status.  
- Top-level `await` only in ES modules.  
- `.then()` chain breaks if you forget `return`.  

---

## 🧠 Memory Hacks  
- One `await` at a time = sequential; use `Promise.all()` for parallel.  
- `.then()` = chain style; `await` = clean style.  
- `.finally()` runs always.  
- Wrap `fetch()` in `try/catch`.  
- Move heavy async work to Web Workers.  
