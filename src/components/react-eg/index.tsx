import MyButton from './button';
import { useState } from 'react'

export default function ReactEg() {
    const [count, setCount] = useState(0);

    function handleCountIncrease() {
        console.log('handleCountIncrease called');

        setCount(count + 1);
    }

    function handleCountDecrease() {
        console.log('handleCountDecrease called');

        setCount(count - 1);
    }

  return (
    <div>
      <h1>This is the React Example componennt</h1>

      <div className="grid grid-cols-2 gap-4 mt-6">
        <div className="col-span-2 text-center text-2xl">Count: {count}</div>
        <MyButton btnText={`++ count`} onClick={handleCountIncrease} />
        <MyButton btnText={`-- count`} onClick={handleCountDecrease} />
      </div>
    </div>
  );
}
