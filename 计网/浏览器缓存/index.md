## 强缓存
- 如果资源没过期，就取缓存，如果过期了，则请求服务器，一般用于JS、CSS、图片等资源,文件名带上hash
- 第一次进入页面，请求服务器，然后服务器进行应答，浏览器会根据response Header来判断是否对资源进行缓存，如果响应头中expires、pragma或者cache-control字段，代表这是强缓存，浏览器就会把资源缓存在memory cache 或 disk cache中。
- 第二次请求时，浏览器判断请求参数，如果符合强缓存条件就直接返回状态码200，从本地缓存中拿数据。否则把响应参数存在request header请求头中，看是否符合协商缓存，符合则返回状态码304，不符合则服务器会返回全新资源。
- `expires` 是HTTP1.0控制网页缓存的字段，值为一个时间戳，准确来讲是格林尼治时间，服务器返回该请求结果缓存的到期时间，意思是，再次发送请求时，如果未超过过期时间，直接使用该缓存，如果过期了则重新请求。
**缺点**就是它判断是否过期是用本地时间来判断的，本地时间是可以自己修改的。
- `Cache-Control`是HTTP1.1中控制网页缓存的字段，当Cache-Control都存在时，Cache-Control优先级更高，主要取值为：
  - public：资源客户端和服务器都可以缓存。
  - privite：资源只有客户端可以缓存。
  - no-cache：客户端缓存资源，但是是否缓存需要经过**协商缓存**来验证。
  - no-store：不使用缓存。
  - max-age：缓存保质期。相对时间，解决了expires的问题。
- `pragma` 是HTTP1.0中禁用网页缓存的字段，其取值为no-cache，和Cache-Control的no-cache效果一样。


## memory cache 与 disk cache 的区别
- 两者都属于强缓存
- memory cache 表示缓存来自内存， disk cache 表示缓存来自硬盘
- memory cache 要比 disk cache 快的多！从磁盘访问可能需要5-20毫秒，而内存访问只需要100纳秒甚至更快
- 当前tab页关闭后，数据将不存在（资源被释放掉了），再次打开相同的页面时，原来的 memory cache 会变成 disk cache

## 协商缓存
- 浏览器携带缓存标识向服务器发送请求，服务器根据缓存标识来决定该资源是否过期，一般用于html资源，验证版本是否更新
- 触发条件：Cache-Control 的值为 no-cache （协商缓存）或者 Cache-Control: max-age=0
- 缓存标识
  - Last-Modified：文件在服务器最后被修改的时间，从服务器 Respnse Headers 上获取
    - Last-Modified 的验证流程：
      1. 第一次访问页面时，服务器的响应头会返回 Last-Modified 字段
      2. 客户端再次发起该请求时，请求头 If-Modified-Since 字段会携带上次请求返回的 Last-Modified 值
      3. 服务器根据 if-modified-since 的值，与该资源在服务器最后被修改时间做对比，若服务器上的时间大于 Last-Modified 的值，则重新返回资源，返回200，表示资源已更新；反之则返回304，代表资源未更新，可继续使用缓存
  - ETag：当前资源文件的一个唯一标识(由服务器生成)，若文件内容发生变化该值就会改变
    - ETag 的验证流程：
      1. 第一次访问页面时，服务器的响应头会返回 etag 字段
      2. 客户端再次发起该请求时，请求头 If-None-Match 字段会携带上次请求返回的 etag 值
      3. 服务器根据 If-None-Match 的值，与该资源在服务器的Etag值做对比，若值发生变化，状态码为200，表示资源已更新；反之则返回304，代表资源无更新，可继续使用缓存
- 为什么要有 Etag ？
  - Etag 的出现主要是为了解决一些 Last-Modified 难处理的问题：
    1. 一些文件也许会周期性的更改，但是内容并不改变(仅仅改变的修改时间)，这时候并不希望客户端认为这个文件被修改了而重新去请求；
    2. 某些文件修改非常频繁，比如在秒以下的时间内进行修改，(比方说 1s 内修改了 N 次)，If-Modified-Since 能检查到的粒度是秒级的，使用 Etag 就能够保证这种需求下客户端在 1 秒内能刷新 N 次 cache
   
    **注意**:Etag 优先级高于 Last-Modified，若 Etag 与 Last-Modified 两者同时存在，服务器优先校验 Etag

    
## 强缓存和协商缓存
- 强缓存： 不会向服务器发送请求，直接从缓存中读取资源，在chrome控制台的Network选项中可以看到该请求返回200的状态码，并且size显示from disk cache或from memory cache两种（灰色表示缓存）。
- 协商缓存： 向服务器发送请求，服务器会根据这个请求的request header的一些参数来判断是否命中协商缓存，如果命中，则返回304状态码并带上新的response header通知浏览器从缓存中读取资源；
- 共同点：都是从客户端缓存中读取资源； 区别是强缓存不会发请求，协商缓存会发请求。
![浏览器缓存](./%E6%B5%8F%E8%A7%88%E5%99%A8%E7%BC%93%E5%AD%98.jpg)