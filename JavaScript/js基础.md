## 作用域
- `作用域`指代码当前上下文，控制着变量和函数的可见性和生命周期。最大的作用是隔离变量，不同作用域下同名变量不会冲突
- `作用域链`指如果在当前作用域中没有查到值，就会向上级作用域查询，直到全局作用域，这样一个查找过程所形成的链条就被称之为作用域链。
- `全局作用域`：代码在程序的任何地方都能被访问，例如 window 对象。但全局变量会污染全局命名空间，容易引起命名冲突。
- `模块作用域` 早期 js 语法中没有模块的定义，因为最初的脚本小而简单。后来随着脚本越来越复杂，就出现了模块化方案（AMD、CommonJS、UMD、ES6模块等）。通常一个模块就是一个文件或者一段脚本，而这个模块拥有自己独立的作用域。
- `函数作用域` 顾名思义由函数创建的作用域。闭包就是在该作用域下产生，后面我们会单独介绍。
- `块级作用域` 由于 js 变量提升存在变量覆盖、变量污染等设计缺陷，所以 ES6 引入了块级作用域关键字来解决这些问题。典型的案例就是 let 的 for 循环和 var 的 for 循环。


## 闭包
- 闭包是指有权访问另一个函数作用域中变量的函数
- 形成闭包的原因：内部的函数存在外部作用域的引用就会导致闭包
- 闭包的作用：1.保护函数的私有变量不受外部的干扰。形成不销毁的栈内存。2.保存，把一些函数内的值保存下来。闭包可以实现方法和属性的私有化
- 使用场景：
  - return 回一个函数
  - 函数作为参数
  - IIFE（自执行函数）
  - 循环赋值
  - 使用回调函数就是在使用闭包
  - 节流防抖
  - 柯里化实现
- `注意`：容易导致内存泄漏。闭包会携带包含其它的函数作用域，因此会比其他函数占用更多的内存。过度使用闭包会导致内存占用过多，所以要谨慎使用闭包


## 原型和原型链
- 有对象的地方就有`原型`，每个对象都会在其内部初始化一个属性，就是prototype(原型)，原型中存储共享的属性和方法。当我们访问一个对象的属性时，js引擎会先看当前对象中是否有这个属性，如果没有的就会查找他的prototype对象是否有这个属性，如此递推下去，一直检索到 Object 内建对象。这么一个寻找的过程就形成了`原型链`的概念。
```js
const arr = [1, 2, 3];
arr.__proto__ === Array.prototype; // true
arr.__proto__.__proto__ === Object.prototype; // true
Array.__proto__ === Function.prototype; // true
```

## 事件循环
- js单线程的特性，非阻塞：通过 event loop 实现
- 执行栈: 同步代码的执行，按照顺序添加到执行栈中
- 事件队列: 异步代码的执行，遇到异步事件不会等待它返回结果，而是将这个`事件挂起`，继续执行执行栈中的其他任务。当异步事件返回结果，将它放到事件队列中，被放入事件队列不会立刻执行起回调，而是等待当前执行栈中所有任务都执行完毕，主线程空闲状态，主线程会去查找事件队列中是否有任务，如果有，则取出排在第一位的事件，并把这个事件对应的回调放到执行栈中，然后执行其中的同步代码。
- `事件挂起`:浏览器是多线程的，挂到浏览器的其他线程，如定时器触发线程、 异步HTTP 请求线程等线程、事件触发线程、gui渲染线程，这些线程主要不是来执行 JS 代码的
- 宏任务：script( 整体代码)、setTimeout、setInterval、I/O、UI 交互事件、setImmediate(Node.js 环境)
- 微任务： Promise、MutaionObserver、process.nextTick(Node.js 环境)；
- js会先从宏任务队列中取出第一个宏任务，执行完毕后，执行微任务队列中的所有微任务，其中产生的微任务也会一起执行，直到微任务队列为空，才会从宏任务队列取出下一个宏任务（一次 Eventloop 循环会处理一个宏任务和所有这次循环中产生的微任务。）
- 宏任务和微任务的本质区别：微任务：不需要特定的异步线程去执行，没有明确的异步任务去执行，只有回调；宏任务：需要特定的异步线程去执行，有明确的异步任务去执行，有回调；

## Promise中的then第二个参数reject和catch的区别
- reject是用来抛出异常的，catch是用来处理异常的
- reject是Promise的方法，而then和catch是Promise实例的方法
- 在then的第一个函数里抛出了异常，后面的catch能捕获到，而reject捕获不到
- 如果是promise内部报错，reject抛出错误后，then的第二个参数和catch方法都存在的情况下，只有then的第二个参数能捕获到，如果then的第二个参数不存在，则catch方法会捕获到。


## JS 的6种加载方式
#### 正常模式
- `<script src="index.js"></script>`
- JS 会阻塞 dom 渲染，浏览器必须等待 index.js 加载和执行完成后才能去做其它事情

#### async 模式
- `<script async src="index.js"></script>`
- 加载是异步的，JS 不会阻塞 DOM 的渲染，async 加载是无顺序的，当它加载结束，JS 会立即执行
- 使用场景：若该 JS 资源与 DOM 元素没有依赖关系，也不会产生其他资源所需要的数据时，可以使用async 模式，比如埋点统计

#### defer 模式
- `<script defer src="index.js"></script>`
- JS 的加载也是异步的，defer 资源会在 DOMContentLoaded 执行之前，并且 defer 是`有顺序`的加载,按照引入的前后顺序执行

#### module 模式
- `<script type="module">import { a } from './a.js'</script>`
- script 标签的属性可以加上 type="module"，浏览器会对其内部的 import 引用发起 HTTP 请求，获取模块内容。这时 script 的行为会像是 defer 一样，在后台下载，并且等待 DOM 解析
- Vite 就是利用浏览器支持原生的 es module 模块，开发时跳过打包的过程，提升编译效率

#### preload
- `<link rel="preload" as="script" href="index.js">`
- 用于提前加载一些需要的依赖，这些资源会优先加载,`立即加载`
- preload 加载的资源是在浏览器渲染机制之前进行处理的，并且不会阻塞 onload 事件；
- preload 加载的 JS 脚本其加载和执行的过程是分离的，即 preload 会预加载相应的脚本代码，待到需要时自行调用

#### prefetch
- `<link rel="prefetch" as="script" href="index.js">`
- prefetch 是利用浏览器的`空闲时间`，加载页面将来可能用到的资源的一种机制；通常可以用于加载其他页面（非首页）所需要的资源，以便加快后续页面的打开速度,不会立即执行
- pretch 加载的资源可以获取非当前页面所需要的资源，并且将其放入缓存至少5分钟（无论资源是否可以缓存）
- 当页面跳转时，未完成的 prefetch 请求不会被中断
- 优先级高于preload


## async await 输出顺序
- [async await 输出顺序](https://juejin.cn/post/7194744938276323384)
- async函数返回值, async函数在抛出返回值时，会根据返回值类型开启不同数目的微任务
    - return结果值：非thenable、非promise（不等待）
    - return结果值：thenable（等待 1个then的时间）
    - return结果值：promise（等待 2个then的时间）
- await右值类型区别
    - 接非 thenable 类型，会立即向微任务队列添加一个微任务then，但不需等待
    - 接 thenable 类型，需要等待一个 then 的时间之后执行
    - 接Promise类型(有确定的返回值)，会立即向微任务队列添加一个微任务then，但不需等待

## Proxy
- Proxy ：用于创建一个对象的代理，从而实现基本操作的拦截和自定义
```js
var proxy = new Proxy(target, handler)
// 取消代理
Proxy.revocable(target, handler);
```
- target表示所要拦截的目标对象（任何类型的对象，包括原生数组，函数，甚至另一个代理）
- handler通常以函数作为属性的对象，各属性中的函数分别定义了在执行各种操作时的代理行为
- handler拦截属性
  - `get`(target,propKey,receiver)：拦截对象属性的读取
  - `set`(target,propKey,value,receiver)：拦截对象属性的设置
  - has(target,propKey)：拦截propKey in proxy的操作，返回一个布尔值
  - `deleteProperty`(target,propKey)：拦截delete proxy[propKey]的操作，返回一个布尔值
  - ownKeys(target)：拦截Object.keys(proxy)、for...in等循环，返回一个数组
  - getOwnPropertyDescriptor(target, propKey)：拦截Object.getOwnPropertyDescriptor(proxy, propKey)，返回属性的描述对象
  - defineProperty(target, propKey, propDesc)：拦截Object.defineProperty(proxy, propKey, propDesc），返回一个布尔值
  - preventExtensions(target)：拦截Object.preventExtensions(proxy)，返回一个布尔值
  - getPrototypeOf(target)：拦截Object.getPrototypeOf(proxy)，返回一个对象
  - isExtensible(target)：拦截Object.isExtensible(proxy)，返回一个布尔值
  - setPrototypeOf(target, proto)：拦截Object.setPrototypeOf(proxy, proto)，返回一个布尔值
  - apply(target, object, args)：拦截 Proxy 实例作为函数调用的操作
  - construct(target, args)：拦截 Proxy 实例作为构造函数调用的操作


## Reflect
- Reflect对象与Proxy对象一样，也是 ES6 为了操作对象而提供的新 API
- 将Object对象的一些明显属于语言内部的方法（比如Object.defineProperty），放到Reflect对象上。现阶段，某些方法同时在Object和Reflect对象上部署，未来的新方法将只部署在Reflect对象上。也就是说，从Reflect对象上可以拿到语言内部的方法。
- 修改某些Object方法的返回结果，让其变得更合理。比如，Object.defineProperty(obj, name, desc)在无法定义属性时，会抛出一个错误，而Reflect.defineProperty(obj, name, desc)则会返回false。
  ```js
  // 老写法
  try {
    Object.defineProperty(target, property, attributes);
    // success
  } catch (e) {
    // failure
  }

  // 新写法
  if (Reflect.defineProperty(target, property, attributes)) {
    // success
  } else {
    // failure
  }
  ```
- 让Object操作都变成函数行为。某些Object操作是命令式，比如name in obj和delete obj[name]，而Reflect.has(obj, name)和Reflect.deleteProperty(obj, name)让它们变成了函数行为。
  ```js
    // 老写法
  'assign' in Object // true

  // 新写法
  Reflect.has(Object, 'assign') // true
  ```
- Reflect对象的方法与Proxy对象的方法一一对应，只要是Proxy对象的方法，就能在Reflect对象上找到对应的方法。

## 字符串模版渲染
```js
var greeting = 'My name is ${name}, age ${age}, I am a ${job.jobName}';
var employee = {
    name: 'XiaoMing',
    age: 11,
    job: {
        jobName: 'designer',
        jobLevel: 'senior'
    }
};
var result = greeting.render(employee);
console.log(result); //

// 方法一 正则
String.prototype.render  = function(obj){
    const str = this
    return str.replace(/\${([.\w]+)}/,(match,p1)=>{
        const keyArr = p1?.split('.')
        let val = obj
        keyArr.forEach(key=>{
            val = val[key]
        })
        return val
    })
}

// 方法二 eval
String.prototype.render = function(obj) {
    // 利用了ES6的解构、对象keys新方法，在函数内部解构并自动展开变量
    eval(`var {${Object.keys(obj).join(',')}} = obj`)
    // 利用eval使字符串直接作为ES6解析
    return eval('`' + this + '`')
}

// 方法三 with
// 代码由掘金大神@一口怪兽一口烟提供
String.prototype.render = function (obj) {
    with(obj) {
        return eval('`' + this + '`')
    }
}

```

