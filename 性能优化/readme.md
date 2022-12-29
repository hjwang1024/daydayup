前端性能优化
页面渲染优化
Webkit 渲染引擎流程：

处理 HTML 并构建 DOM 树
处理 CSS 构建 CSS 规则树(CSSOM)
DOM Tree 和 CSSOM Tree 合成一棵渲染树 Render Tree。
根据渲染树来布局，计算每个节点的位置
调用 GPU 绘制，合成图层，显示在屏幕上



避免css阻塞：css影响renderTree的构建，会阻塞页面的渲染，因此应该尽早（将 CSS 放在 head 标签里）和尽快（启用 CDN 实现静态资源加载速度的优化)的将css资源加载


避免js阻塞：js可以修改CSSOM和DOM，因此js会阻塞页面的解析和渲染，并且会等待css资源的加载。也就是说js会抢走渲染引擎的控制权。所以我们需要给js资源添加defer或者async，延迟js脚本的执行。


使用字体图标 iconfont 代替图片图标：

图片会增加网络请求次数，从而拖慢页面加载时间
iconfont可以很好的缩放并且不会添加额外的请求



降低css选择器的复杂度：浏览器读取选择器，遵循的原则是从选择器的右边到左边读取。

减少嵌套：最多不要超过三层，并且后代选择器的开销较高，慎重使用
避免使用通配符，对用到的元素进行匹配即可
利用继承，避免重复匹配和定义
正确使用类选择器和id选择器



减少重绘和回流:
CSS

避免使用table布局。
尽可能在DOM树的最末端改变class。
避免设置多层内联样式。
将动画效果应用到position属性为absolute或fixed的元素上。
避免使用CSS表达式（例如：calc()）。

JavaScript

避免频繁操作样式，最好一次性重写style属性，或者将样式列表定义为class并一次性更改class属性。
避免频繁操作DOM，创建一个documentFragment，在它上面应用所有DOM操作，最后再把它添加到文档中。
为元素设置display: none，操作结束后再把它显示出来。因为在display属性为none的元素上进行的DOM操作不会引发回流和重绘。用一次回流替代多次回流
避免频繁读取会引发回流/重绘的属性，如果确实需要多次使用，就用一个变量缓存起来。
对具有复杂动画的元素生成一个新图层



JS中的性能优化

使用事件委托
防抖和节流
尽量不要使用JS动画，css3动画和canvas动画都比JS动画性能好

图片的优化

雪碧图：借助减少http请求次数来进行优化
图片懒加载：在图片即将进入可视区域的时候进行加载（后边有判断即将进入可视区域的方法）
使用CSS3代替图片：有很多图片使用 CSS 效果（渐变、阴影等）就能画出来，这种情况选择 CSS3 效果更好

webpack优化

代码压缩：html,css,js文件压缩
Tree shaking 去除死代码
babel-plugin-transform-runtime减少ES6转化ES5的冗余
提升打包速度

vue

路由懒加载
合理使用computed和watch
v-for添加key
v-for的同时避免使用v-if
destory时销毁事件：比如addEventListener添加的事件、setTimeout、setInterval、bus.$on绑定的监听事件等
第三方插件按需引入

react

map循环展示添加key
路由懒加载
使用scu，memo或者pureComponent避免不必要的渲染