## 简单请求
- 只要同时满足以下条件就属于简单请求
1. 请求方法是以下三种方法之一：GET、POST、HEAD
2. Http的头信息不超出以下几种字段：Accept、Accept-Language、Content-Language、Last-Event-ID、Content-Type。
3. Content-Type只限于三个值：application/x-www-form-urlencoded、multipart/form-data、text/plain

## 非简单请求
- 会预检请求 (preflight request)，即先预发送OPTIONS的请求
第一次是浏览器使用OPTIONS方法发起一个预检请求，第二次才是真正的异步请求
第一次的预检请求获知服务器是否允许该跨域请求：如果允许，才发起第二次真实的请求；如果不允许，则拦截第二次请求。
Access-Control-Max-Age用来指定本次预检请求的有效期，单位为秒，在此期间不用发出另一条预检请求。