# 🧠 TypeScript Mental Model (for JavaScript Developers)

---

## ⚙️ What TypeScript Actually *Is*

Think of TypeScript as a **"static mirror"** of your JavaScript code.

- JavaScript **runs**.
- TypeScript **analyzes**.
- When you run your code, the types are gone — it’s all erased.  
  TS’s job is to *simulate* your runtime logic at compile-time.

So TypeScript is just the **type layer** sitting on top of your JS mental model, letting you say:

> “I expect this to behave like *this*, and the compiler will yell if I’m wrong.”

---

## 🧩 1. Interface vs Type — What’s the *Actual* Difference?

### 💡 Both describe the *shape* of data

```ts
interface User {
  id: number;
  name: string;
}
type UserAlias = {
  id: number;
  name: string;
};
```

They’re functionally the same most of the time.  
But they diverge in a few ways:

| Concept | `interface` | `type` |
|----------|--------------|--------|
| Extend another | ✅ `extends` keyword | ✅ with intersections (`&`) |
| Merge declarations | ✅ automatic merging | ❌ redefinition error |
| Unions / primitives | ❌ only object shapes | ✅ can represent anything |
| Literal unions | ❌ | ✅ |
| Mapped types / composition | ✅ (limited) | ✅ (preferred) |

### 🧠 Rule of thumb:
- **Use `interface`** for *object shapes* you want to extend (like React props, domain models).  
- **Use `type`** when *combining*, *composing*, or *transforming* types (data utilities).

---

## 🔨 2. Manipulating Types — The Real Power Move

This is where TS shines: you can **combine**, **omit**, **extract**, and **remix** existing types.  
It’s not about declaring types — it’s about *transforming* them.

### Combine types (Intersection `&`)
```ts
type HasId = { id: number };
type HasName = { name: string };
type User = HasId & HasName;
// => { id: number; name: string }
```

### Choose one of many (Union `|`)
```ts
type Status = 'pending' | 'success' | 'error';
```

### Extend or modify types
```ts
interface User {
  id: number;
  name: string;
  email?: string;
}

type Admin = User & { role: 'admin' };
type UserPreview = Omit<User, 'email'>;
type UserID = Pick<User, 'id'>;
```

These `Pick` / `Omit` / `Partial` / `Required` helpers are called **utility types** — they let you reshape existing types instead of redefining.

---

## 🎯 3. Picking, Removing, and Combining

Here’s a visual mental model:

| Task | Think | Syntax |
|------|--------|--------|
| Combine types | Add fields | `A & B` |
| Choose one | Either/or | `A | B` |
| Pick keys | Subset | `Pick<A, 'x' | 'y'>` |
| Remove keys | Omit fields | `Omit<A, 'z'>` |
| Make optional | Add `?` | `Partial<A>` |
| Make required | Remove `?` | `Required<A>` |
| Read-only | Lock fields | `Readonly<A>` |

So, you can literally treat types as *data transformations*.

---

## 🧠 4. Type Guards — Runtime Checks That Narrow Types

A **type guard** is just a *runtime* check that *narrows* a *compile-time* union.

You’re telling TS:  
> “If this branch runs, I know what type this variable must be.”

```ts
function padLeft(value: string, padding: string | number) {
  if (typeof padding === 'number') {
    // TS now *knows* padding is a number in this block
    return ' '.repeat(padding) + value;
  }
  // else, it's a string
  return padding + value;
}
```

That `typeof` check doesn’t just help your logic —  
it *informs TypeScript’s inference engine*.

Other examples:
```ts
if (Array.isArray(value)) { /* narrowed to array */ }
if ('id' in user) { /* narrowed to type with id */ }
if (value instanceof Error) { /* narrowed to Error */ }
```

**Custom guards:**
```ts
function isUser(obj: any): obj is User {
  return typeof obj.id === 'number' && typeof obj.name === 'string';
}
```

The magic is `obj is User` — that’s how TS knows the branch narrows the type.

---

## 🧬 5. Generics — The Missing Mental Model

Generics are **type functions**.

If a function is data → data,  
a generic is **type → type**.

It lets you make reusable functions *that remember what type you passed in.*

### Example: The Identity Function
```ts
function identity<T>(value: T): T {
  return value;
}
```
- `T` is a *placeholder* for the type you pass in.
- When you call it with a number, TS *infers* `T = number`.
```ts
const a = identity(123);   // a: number
const b = identity('hey'); // b: string
```

You could say:  
> Generics let TypeScript *mirror your input types into your output types.*

### Constraining Generics

```ts
function merge<T extends object, U extends object>(a: T, b: U) {
  return { ...a, ...b };
}

merge({ id: 1 }, { name: 'Ada' });
// inferred as { id: number; name: string }
```

Without `extends object`, TS would let you pass in numbers, which makes no sense here.

### Real-world frontend example (React)

```tsx
function List<T>({ items, render }: {
  items: T[];
  render: (item: T) => JSX.Element;
}) {
  return <ul>{items.map(render)}</ul>;
}

<List
  items={[{ id: 1, name: 'Ada' }]}
  render={(user) => <li>{user.name}</li>}
/>
```

TS automatically infers `T` as `{ id: number; name: string }`.  
No annotation needed — the generic lets the `render` prop *share the inferred type*.

---

## 💥 6. Real Mental Model Recap

| Concept | Analogy | Think of it as... |
|----------|----------|------------------|
| `interface` | Blueprint | Extensible object shape |
| `type` | Lego bricks | Combos, unions, and remixes |
| `&` | Add fields | Combine multiple shapes |
| `|` | Either/or | Multiple possible shapes |
| `Pick` / `Omit` | Select fields | Crop or trim an object shape |
| `Partial` / `Required` | Optionality toggles | Flip switches on keys |
| `T extends` | Type boundary | “Only allow T that fits this” |
| `T` in Generics | Type variable | “Whatever type you give me, I’ll preserve it” |
| Type guard | Runtime truth → compile-time safety | Branch = narrower type |

---

## 🚀 Big Picture

TypeScript is **not** about types — it’s about **relationships between types**.

You’re not writing “this is a string,”  
you’re writing “this is the *same kind of thing* that comes out of here.”

It’s like building contracts that evolve with your code.

---

🧩 *Think of it like CSS variables for data shapes: declare once, reuse everywhere.*
