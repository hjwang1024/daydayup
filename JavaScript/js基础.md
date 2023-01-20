# 字符串模版渲染
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