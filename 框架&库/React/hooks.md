## useMemo 与 useCallback
- react中，性能的优化点在于：
  - 调用setState，就会触发组件的重新渲染，无论前后的state是否不同
  - 父组件更新，子组件也会自动的更新

- `useMemo` 和 `useCallback`都会在组件第一次渲染的时候执行，之后会在其依赖的变量发生改变时再次执行；
- 这两个hooks都返回缓存的值，useMemo返回缓存的`变量`（类似vue中的计算属性），useCallback返回缓存的`函数`。

- useMemo使用场景 组件更新时，一些计算量很大的值也有可能被重新计算，这个时候就可以使用 useMemo 直接使用上一次缓存的值
```js

export default function WithMemo() {
    const [count, setCount] = useState(1);
    const [val, setValue] = useState('');
    const expensive = useMemo(() => {  // 修改val的时候不会触发expensive
        console.log('compute');
        let sum = 0;
        for (let i = 0; i < count * 100; i++) {
            sum += i;
        }
        return sum;
    }, [count]);
 
    return <div>
        <h4>{count}-{expensive}</h4>
        {val}
        <div>
            <button onClick={() => setCount(count + 1)}>+c1</button>
            <input value={val} onChange={event => setValue(event.target.value)}/>
        </div>
    </div>;
}
```
- useCallBack使用场景 父组件更新时，通过props传递给子组件的函数也会重新创建，然后这个时候使用 useCallBack 就可以缓存函数不使它重新创建
```js
import React, { useCallback, useEffect, useState } from "react";
export default function App() {
  const [count, setCount] = useState(0);

  // 使用 useCallBack 缓存
  const handleCountAddByCallBack = useCallback(() => {
    setCount((count) => count + 1);
  }, []);

  // 不缓存，每次 count 更新时都会重新创建
  const handleCountAdd = () => {
    setCount((count) => count + 1);
  };

  return (
    <div className="App">
      <h3>CountAddByChild1: {count}</h3>
      <Child1 addByCallBack={handleCountAddByCallBack} add={handleCountAdd} />
    </div>
  );
}

const Child1 = React.memo(function (props) {
  const { add, addByCallBack } = props;
  
  // 没有缓存，由于每次都创建，memo 认为两次地址都不同，属于不同的函数，所以会触发 useEffect
  useEffect(() => {
    console.log("Child1----addFcUpdate", props);
  }, [add]);

  // 有缓存，memo 判定两次地址都相同，所以不触发 useEffect
  useEffect(() => {
    console.log("Child1----addByCallBackFcUpdate", props);
  }, [addByCallBack]);

  return (
    <div>
      <button onClick={props.add}>+1</button>
      <br />
      <button onClick={props.addByCallBack}>+1(addByCallBack)</button>
    </div>
  );
});
```
