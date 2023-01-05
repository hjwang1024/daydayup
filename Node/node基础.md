## Stream
- fs.createReadStream(path) 创建流
- Stream.pipe() 读取一个文件(ReadableStream)并把其中的内容写到另一个文件中(WritableStream),所有ReadableStream都能接入任何一个WritableStream。比如HTTP请求(req)对象就是ReadableStream，可以让其中的内容流动到文件中
  ```js
    var readStream = fs.createReadStream('./original.txt')
    var writeStream = fs.createWriteStream('./to.txt')
    readStream.pipe(writeStream);


    req.pipe(fs.createWriteStream('./req-body.txt'))

    var stream = fs.createReadStream(path)
    stream.pipe(res) // res.end()会在stream.pipe()内部调用
  ```


## 处理服务器错误
在Node中，所有继承了EventEmitter的类都可能会发出error事件。像fs.ReadStream这样的流只是专用的EventEmitter，有预先定义的data和end等事件，默认情况下，如果没有设置监听器，error事件会被抛出
- fs.stat() 调用获取文件的相关信息，如果文件不存在，fs.stat()会在err.code中放入ENOENT 作为响应，然后可以返回错误码404，向客户端表明文件未找到。如果fs.stat()返回了其他错误码，可以返回通用的错误码500。
  ```js
    fs.stat(path,function(err,stat){
        if(err){
            if(err.code == 'ENOENT'){
                res.statusCode == 404
                res.send('Not Found')
            }else{
                res.statusCode == 500
                res.send('Internal Server Error')
            }
        }else{
            res.setHeader('Contend-Length',stat.size)
            var stream = fs.createReadStream(path)
            stream.pipe(res)
            stream.on('error',function(err){
                res.statusCode = 500
                res.end('Internal Server Error')
            })
        }
    })
  ```

## process
- process.argv node执行命令行的参数
- process.cwd() 工作目录