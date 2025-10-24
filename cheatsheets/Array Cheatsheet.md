⚡ **Reminder**: Array indexes start at `0` (first item is `arr[0]`).

## Converting string or number into Array
### 🧩 Turn a String into an Array

#### **a. Split into characters**
```js
const str = "hello";
const arr = str.split('');
console.log(arr); // ["h", "e", "l", "l", "o"]
```

#### **b. Split by spaces or commas**
```js
const sentence = "one two three";
const arr = sentence.split(' ');
console.log(arr); // ["one", "two", "three"]
```

#### **c. Using `Array.from()`**
```js
const str = "abc";
const arr = Array.from(str);
console.log(arr); // ["a", "b", "c"]
```

#### **d. Using spread syntax**
```js
const str = "hello";
const arr = [...str];
console.log(arr); // ["h", "e", "l", "l", "o"]
```

---

### Turn a Number into an Array

#### **a. Split into digits**
```js
const num = 12345;
const arr = Array.from(String(num), Number);
console.log(arr); // [1, 2, 3, 4, 5]
```

#### **b. Using spread syntax**
```js
const num = 9876;
const arr = [...String(num)].map(Number);
console.log(arr); // [9, 8, 7, 6]
```

---

## 🛠 Mutates the Array

### Insert / Remove
- `push(...items)` — add to end → returns **new length**  
- `pop()` — remove last → returns **removed item**  
- `unshift(...items)` — add to front → returns **new length**  
- `shift()` — remove first → returns **removed item**  
- `splice(start, deleteCount?, ...items)` — cut/jam → returns **removed items**

### Reorder
- `sort(compareFn?)` — sort in place → returns **same array**  
	- `blah.sort((a, b) =>  a - b )` = **ascending** order
	- `blah.sort((a, b) => b - a)` = **descending** order
	- Or default `.sort()` does ascending order, `.sort().reverse()` will give you descending.
- `reverse()` — flip order → returns **same array**

### Overwrite / Move
- `fill(value, start?, end?)` — overwrite section → returns **same array**  
- `copyWithin(target, start, end?)` — copy chunk internally → returns **same array**

---

## 🚫 Does Not Mutate (returns new value)

### Build New Arrays
- `map(fn)` — transform each item → returns **new array**  
- `flatMap(fn)` — transform + flatten → returns **new array**  
- `filter(fn)` — keep passing items → returns **new array**  
- `slice(start?, end?)` — copy section → returns **new array**  
	- `slice(1, -1)` will return a new array without the first and last item.
- `concat(...items)` — glue arrays/items → returns **new array**  
- `flat(depth=1)` — flatten → returns **new array**  
- `with(index, value)` — copy+replace one → returns **new array**  
- `toSpliced(...)` — immutable splice → returns **new array**  
- `toSorted(compareFn?)` — immutable sort → returns **new array**  
- `toReversed()` — immutable reverse → returns **new array**

### Find / Test
- `some(fn)` — any pass? → returns **boolean**  
- `every(fn)` — all pass? → returns **boolean**  
- `includes(value)` — present? → returns **boolean**  
- `indexOf(value)` — first position → returns **number**  
- `lastIndexOf(value)` — last position → returns **number**  
- `find(fn)` — first passing item → returns **item | undefined**  
- `findLast(fn)` — last passing item → returns **item | undefined**  
- `findIndex(fn)` — index of first passing → returns **number | -1**  
- `findLastIndex(fn)` — index of last passing → returns **number | -1**  
- `at(index)` — item at index (supports negative) → returns **item | undefined**

### Reduce
- `reduce(fn, init?)` — takes an array and **“reduces” it to a single value** by repeatedly applying a function to each element — carrying forward an **accumulator** → returns **single value**  
- `reduceRight(fn, init?)` — fold right → returns **single value**

### Iterate / Inspect
- `forEach(fn)` — run fn on each → returns **undefined**  
	- `index` also starts at `0`
- `entries()` — [index, value] pairs → returns **iterator**  
- `keys()` — indexes → returns **iterator**  
- `values()` — values → returns **iterator**
- `at(index)` - array -> returns value at that index 

### Stringify
- `join(sep?)` — join into string → returns **string**  
- `toString()` — default string dump → returns **string**  
- `toLocaleString()` — locale-aware string dump → returns **string**

---

## 📦 Static Methods (rarely used)
- `Array.isArray(value)` — check if value is array → returns **boolean**  
- `Array.from(iterable, mapFn?)` — turn iterable into array → returns **new array**  
- `Array.of(...items)` — create array from args → returns **new array**

---

## ❗ Gotchas
- `Array(5)` → makes `[empty × 5]`, not `[5]`; use Array.of(5) or Array.from({ length: 5 })`  
- `Array.from(5)` → ❌ TypeError (5 is not iterable); use Array.of(5) instead  
- Array holes are weird: `[,,,]` has length 3 but no values; many methods skip holes  
- `forEach()` returns `undefined` (don’t chain it)  
- `sort()` mutates AND sorts as strings by default (`[10,2]` → `[10,2]` not `[2,10]`)  
- `indexOf(NaN)` fails (`-1`), but `includes(NaN)` works  

---

## 🧠 Memory Hacks
- If it sounds destructive (`push`, `pop`, `shift`, `unshift`, `splice`, `sort`, `reverse`, `fill`, `copyWithin`) → **mutates**  
- Anything starting with `to` (`toSorted`, `toReversed`, `toSpliced`) or `with` → **safe copy**  
- Find/test methods never mutate, just return info  
- `forEach` always returns **undefined**
