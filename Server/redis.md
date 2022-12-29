## Mac下安装
- `brew install redis`

- Homebrew安装的软件会默认在`/usr/local/Cellar/`路径下

- redis的配置文件`redis.conf`存放在`/usr/local/etc`路径下

## 使用
- 启动redis服务
```js
// 方式一：使用brew帮助我们启动软件
brew services start redis
// 方式二
redis-server /usr/local/etc/redis.conf

```

- 查看进程
`ps axu | grep redis`

- 强制终止进程
`sudo pkill redis-server`

- 后台运行,可以在redis.conf中将daemonize no,修改成yes