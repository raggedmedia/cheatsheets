# Event Loop & Execution Flow Cheatsheet  
⚡ **JavaScript runs single-threaded** — one piece of code at a time.  
The **Event Loop** is what gives JS its asynchronous superpower.

---

## 🌀 What *Is* the Event Loop?
The **Event Loop** is the runtime’s scheduler — it decides *when* code, promises, and callbacks actually run.

```
┌──────────────────────────────────────────┐
│           JS Runtime Environment          │
│ ┌──────────────┐ ┌────────────────────┐  │
│ │ Call Stack   │ │ Task Queues        │  │
│ │ (current fn) │ │  - Microtasks      │  │
│ │              │ │  - Macrotasks      │  │
│ └──────────────┘ └────────────────────┘  │
│        ▲                  │              │
│        └────── Event Loop ─┘              │
└──────────────────────────────────────────┘
```

**The Event Loop’s job:**  
> When the call stack is empty, pick the next task (microtasks first, then macrotasks), run it, then repeat forever.

---

## 🧩 1. The Call Stack
- Tracks what’s currently executing.
- Each function call pushes a new frame; returns pop it.
- Only one stack — blocking code freezes everything.

```js
function a() { b(); }
function b() { c(); }
function c() { console.log('done'); }
a();
```
Stack sequence: `a → b → c → (empty)`

---

## 🪄 2. Microtasks (High Priority)
Run **immediately after** the call stack empties — before any rendering or timers.

**Examples:**
- `Promise.then()`
- `queueMicrotask()`
- `MutationObserver`
- `process.nextTick()` (Node)

```js
Promise.resolve().then(() => console.log('microtask'));
console.log('sync');
```
**Output:**
```
sync
microtask
```

---

## ⏱ 3. Macrotasks (Normal Priority)
Run **after** all microtasks are done.  
Scheduled by browser/host APIs.

**Examples:**
- `setTimeout`, `setInterval`
- `setImmediate` (Node)
- DOM events (`click`, `scroll`)
- `MessageChannel`, network I/O
- `requestAnimationFrame`

```js
setTimeout(() => console.log('timeout'));
Promise.resolve().then(() => console.log('promise'));
console.log('sync');
```
**Output:**
```
sync
promise
timeout
```

---

## 🎞 4. Rendering & Repaint Cycle
Each event loop iteration roughly goes:
```
Execute JS
→ Process microtasks
→ Render (recalculate layout & paint)
→ Process next macrotask
```

✅ Don’t block this cycle — long loops or heavy sync code cause UI jank.

---

## ⚙️ 5. Async / Await = Promise Scheduling
`await` splits your function into two parts:
- before `await`: runs immediately (sync)
- after `await`: queued as a **microtask**

```js
async function demo() {
  console.log('A');
  await null;
  console.log('B');
}
demo();
console.log('C');
```
**Output:**
```
A
C
B
```

---

## 🧮 6. Typical Event Loop Ordering
```js
setTimeout(() => console.log('timeout'));
Promise.resolve().then(() => console.log('promise'));
queueMicrotask(() => console.log('microtask'));
console.log('sync');
```
**Output:**
```
sync
promise
microtask
timeout
```

✅ Rule:  
> **Sync → Microtasks → Render → Macrotasks**

---

## 🧠 7. Why “Event” Loop?
Because external **events** (user input, timers, network)  
don’t interrupt JS — they **queue** callbacks for the loop to process later.

```js
button.addEventListener('click', () => console.log('clicked'));
```
→ The click handler is queued as a *macrotask* and runs only when the stack is free.

---

## 🔁 8. In Node.js
Phases of the loop:
```
Timers → Pending callbacks → Idle/Prepare → Poll → Check → Close callbacks
```
Microtasks (`process.nextTick`, Promises) run between phases.

**Differences:**
- `process.nextTick()` runs before Promises.
- `setImmediate()` runs after I/O callbacks.

---

## ⚠️ 9. Common Gotchas

| Issue | Why | Fix |
|-------|-----|-----|
| `await` in a loop = slow | Sequential awaits block others | Use `Promise.all()` |
| `setTimeout(fn, 0)` not instant | Queued as macrotask | Use `queueMicrotask()` |
| UI freezes | Long sync code blocks loop | Split work or use Web Workers |
| Promise errors swallowed | Unhandled rejections | Always `.catch()` or try/catch async |

---

## 🧭 10. Event Loop Mental Model (Simplified)
```
1️⃣ JS runs sync code on call stack
2️⃣ When stack empty:
    → Run all microtasks
    → (Browser) render frame
    → Run next macrotask
3️⃣ Repeat forever
```

---

## 🧩 TL;DR Summary

| Step | Description | Examples |
|------|--------------|-----------|
| **Call Stack** | Running functions | Current sync code |
| **Microtasks** | Run right after stack | Promises, queueMicrotask |
| **Render Phase** | Browser paints screen | DOM updates, layout |
| **Macrotasks** | Run after microtasks/render | setTimeout, events, I/O |

🧠 **The Event Loop is the orchestrator** — it coordinates these steps and keeps JS responsive.
