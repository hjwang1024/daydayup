<center>Linux 常用命令</center>

## 进程

### ps -aux 
- `ps` 是`Process Status`的缩写,列出的是当前那些进程的快照
- `a`显示所有用户的进程
- `u`显示用户
- `x`显示无控制终端的进程
- 字段
  1. UID：程序被该 UID 所拥有
  2. PID：就是这个程序的 ID 
  3. PPID：则是其上级父程序的ID
  4. C：CPU使用的资源百分比
  5. STIME：系统启动时间
  6. TTY：登入者的终端机位置
  7. TIME：使用掉的CPU时间。
  8. CMD：所下达的是什么指令

### grep 查找命令
- 它能使用正则表达式搜索文本，并把匹配的行打印出来
- eg: ps aux | grep python

### kill 关闭进程
- kill PID
- kill -KILL PID 强制杀死进程 


## 查看日志
`tail -f`