## 路由懒加载
- SPA 项目，一个路由对应一个页面，如果不做处理，项目打包后，会把所有页面打包成一个文件，当用户打开首页时，会一次性加载所有的资源，造成首页加载很慢，降低用户体验
- 实现原理：ES6的动态地加载模块——import(),调用 import() 之处，被作为分离的模块起点，意思是，被请求的模块和它引用的所有子模块，会分离到一个单独的 chunk 中
- `const Home = () => import(/* webpackChunkName: "home" */ "@/views/home/index.vue")`

## 组件懒加载
- 页面的 JS 文件体积大，导致页面打开慢，可以通过组件懒加载进行资源拆分，利用浏览器并行下载资源，提升下载速度（比如首页）；需要一定条件下才触发（比如弹框组件）；复用性高，很多页面都有引入，利用组件懒加载抽离出该组件，一方面可以很好利用缓存，同时也可以减少页面的 JS 文件大小

## 合理使用 Tree shaking
- tree-shaking 依赖于ES6的模块特性，ES6模块依赖关系是确定的，和运行时的状态无关，可以进行可靠的静态分析，这就是 tree-shaking 的基础 
- 但如果 export default 导出的是一个对象，无法通过静态分析判断出一个对象的哪些变量未被使用，所以 tree-shaking 只对使用 export 导出的变量生效

## 骨架屏优化白屏时长
- vue-skeleton-webpack-plugin
```js
// vue.config.js
// 骨架屏
const SkeletonWebpackPlugin = require("vue-skeleton-webpack-plugin");
module.exports = {
   configureWebpack: {
      plugins: [
       new SkeletonWebpackPlugin({
        // 实例化插件对象
        webpackConfig: {
          entry: {
            app: path.join(__dirname, './src/skeleton.js') // 引入骨架屏入口文件
          }
        },
        minimize: true, // SPA 下是否需要压缩注入 HTML 的 JS 代码
        quiet: true, // 在服务端渲染时是否需要输出信息到控制台
        router: {
          mode: 'hash', // 路由模式
          routes: [
            // 不同页面可以配置不同骨架屏
            // 对应路径所需要的骨架屏组件id，id的定义在入口文件内
            { path: /^\/home(?:\/)?/i, skeletonId: 'homeSkeleton' },
            { path: /^\/detail(?:\/)?/i, skeletonId: 'detailSkeleton' }
          ]
        }
        })        
      ]
   }
}

// skeleton.js 
import Vue from "vue";
// 引入对应的骨架屏页面
import homeSkeleton from "./views/homeSkeleton";
import detailSkeleton from "./views/detailSkeleton";

export default new Vue({
    components: {
        homeSkeleton,
        detailSkeleton,
    },
    template: `
    <div>
      <homeSkeleton id="homeSkeleton" style="display:none;" />
      <detailSkeleton id="detailSkeleton" style="display:none;" />
    </div>
  `,
});
```
## 虚拟滚动
- 虚拟滚动的插件有很多，比如 vue-virtual-scroller、vue-virtual-scroll-list、react-tiny-virtual-list、react-virtualized 等

```js
// 安装插件
npm install vue-virtual-scroller

// main.js
import VueVirtualScroller from 'vue-virtual-scroller'
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'

Vue.use(VueVirtualScroller)

// 使用
<template> 
  <RecycleScroller 
    class="scroller" 
    :items="list" 
    :item-size="32" 
    key-field="id" 
    v-slot="{ item }"> 
      <div class="user"> {{ item.name }} </div>
  </RecycleScroller> 
</template>

```


## Web Worker 优化长任务
- 由于浏览器 GUI 渲染线程与 JS 引擎线程是互斥的关系，当页面中有很多长任务时，会造成页面 UI 阻塞，出现界面卡顿、掉帧等情况
- 当任务的运算时长 - 通信时长 > 50ms，推荐使用Web Worker （通信时长：新建一个 web worker, 浏览器会加载对应的 worker.js 资源，也叫加载时长）


## requestAnimationFrame 制作动画
setTimeout/setInterval、requestAnimationFrame 三者的区别：
- 引擎层面
setTimeout/setInterval 属于 JS引擎，requestAnimationFrame 属于 GUI引擎
JS引擎与GUI引擎是互斥的，也就是说 GUI 引擎在渲染时会阻塞 JS 引擎的计算
- 时间是否准确
requestAnimationFrame 刷新频率是固定且准确的，但 setTimeout/setInterval 是宏任务，根据事件轮询机制，其他任务会阻塞或延迟js任务的执行，会出现定时器不准的情况
- 性能层面
当页面被隐藏或最小化时，setTimeout/setInterval 定时器仍会在后台执行动画任务，而使用 requestAnimationFrame 当页面处于未激活的状态下，屏幕刷新任务会被系统暂停
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

## 图片优化
- 图片的动态裁剪，使图片变小
- 图片懒加载，data-xxx 属性，vue-lazyload
- 使用字体图标,iconfont,一个图标字体要比一系列的图像要小。一旦字体加载了，图标就会马上渲染出来，减少了 http 请求,可以随意的改变颜色、产生阴影、透明效果、旋转,几乎支持所有的浏览器
- 图片转 base64 格式，减少 http 请求,处理小图片，url-loader
  ```js
  // 安装
  npm install url-loader --save-dev
      
  // 配置
  module.exports = {
    module: {
      rules: [{
          test: /.(png|jpg|gif)$/i,
          use: [{
              loader: 'url-loader',
              options: {
                // 小于 10kb 的图片转化为 base64
                limit: 1024 * 10
              }
          }]
       }]
    }
  };
  ```