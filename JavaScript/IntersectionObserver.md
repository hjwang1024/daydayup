## API
```js
var io = new IntersectionObserver(callback, option);

// 开始观察
io.observe(document.getElementById('example'));

// 停止观察
io.unobserve(element);

// 关闭观察器
io.disconnect();
```

- callback 可见性变化时的回调函数
  ```js
    var io = new IntersectionObserver(
      entries => {
        console.log(entries); // entries 是一个数组，每项都表示被监听的对象
      }
    );
    // entrie
    {
      time: 3893.92,
      rootBounds: ClientRect {
        bottom: 920,
        height: 1024,
        left: 0,
        right: 1024,
        top: 0,
        width: 920
      },
      boundingClientRect: ClientRect {
         // ...
      },
      intersectionRect: ClientRect {
        // ...
      },
      intersectionRatio: 0.54,
      target: element
    }
  ```
  - time：可见性发生变化的时间，是一个高精度时间戳，单位为毫秒
  - target：被观察的目标元素，是一个 DOM 节点对象
  - rootBounds：根元素的矩形区域的信息，getBoundingClientRect()方法的返回值，如果没有根元素（即直接相对于视口滚动），则返回null
  - boundingClientRect：目标元素的矩形区域的信息
  - intersectionRect：目标元素与视口（或根元素）的交叉区域的信息
  - intersectionRatio：目标元素的可见比例，即intersectionRect占boundingClientRect的比例，完全可见时为1，完全不可见时小于等于0


- option是配置对象（该参数可选)
  - `threshold`属性决定了什么时候触发回调函数。它是一个数组，每个成员都是一个门槛值，默认为[0]，即交叉比例（intersectionRatio）达到0时触发回调函数。
  - `root`指定目标元素所在的容器节点（即根元素）, `rootMargin`定义根元素的margin，用来扩展或缩小rootBounds这个矩形的大小，从而影响intersectionRect交叉区域的大小
- 构造函数的返回值是一个观察器实例
- 实例的observe方法可以指定观察哪个 DOM 节点,如果要观察多个节点，就要多次调用这个方法。

## 兼容插件
- [intersection-observer](https://www.npmjs.com/package/intersection-observer)