### 浏览器通过`file://`访问文件和`http://`访问文件的区别
1. file协议用于访问本地计算机中的文件，好比通过资源管理器中打开文件一样，需要主要的是它是针对本地的，即file协议是访问你本机的文件资源。

2. http访问本地的html文件，相当于将本机作为了一台http服务器，然后通过localhost访问的是你自己电脑上的本地服务器，再通过http服务器去访问你本机的文件资源。

3. 再简单点就是file只是简单请求了本地文件，将其作为一个服务器未解析的静态文件打开。而http是在本地搭建了一个服务器再通过服务器去动态解析拿到文件。

4. file协议只能在本地访问,本地搭建http服务器开放端口后他人也可以通过http访问到你电脑中的文件，但是file协议做不到,file协议对应有一个类似http的远程访问，就是ftp协议，即文件传输协议。file协议无法实现跨域。

### http-server
- http-server 是一个简单的零配置的命令行，可用于本地起http服务
- npm i -g http-server 全局安装

### 使用方法
```js
http-server [path] [options]
```
- [path]默认./public，如果不存在，则使用./
- [options]可选项
    1. -p 指定端口（默认 8080）
    2. -a 指定地址（默认 0.0.0.0）
    3. -d 显示目录（默认 true）
    4. -i 显示自动索引（默认 True）
    5. -g或者--gzip 开启gzip压缩
    6. -e或者-ext 设置默认文件扩展名（默认 html）
    7. -s或者-slient 禁止输出日志
    8. --cors 允许 Access-Control-Allow-Origin 头部方式跨域
    9. -o 开启服务之后自动打开浏览器
    10. -c 设置缓存时间。例如-c10,为10秒缓存（默认‘3600’）。禁止缓存使用-c-1
    11. -U 或者 --utc 在日志中使用utc时间戳
    12. -P 或者 --proxy 使用代理
    13. -S 或者 --ssl 启用ssl
    14. -C 或者 --cert ssl证书的路径
    15. -K 或者 --key ssl密匙的路径
    16. -r 或者 --robots 设置robots.txt，禁止爬虫访问
    17. -h 或者 --help 打印以上列表并退出

### 启动https服务
- 直接使用 `http-server -S` 会报错，因为缺少证书
- 生成 cert.pem 和 key.pem,再运行`http-server -S`
    ```sh
    # 私钥和公钥证书一起生成
    openssl req -newkey rsa:2048 -new -nodes -x509 -days 3650 -keyout key.pem -out cert.pem

    #生成私钥
    openssl genrsa 1024 > key.pem

    #生成证书
    openssl req -x509 -new -key key.pem > cert.pem
    ```