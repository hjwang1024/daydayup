## this指向
- this 是执行上下文中的一个属性，它指向最后一次调用这个方法的对象 
1. 作为对象的方法调用，this 指向该对象
```js
var obj = { a: 1,
    getA: function(){
       alert ( this === obj ); // 输出:true alert ( this.a ); // 输出: 1
    } 
};
obj.getA();
```

2. 作为普通函数调用,this 总是指向全局对象。在浏览器的 JavaScript 里，这个全局对象是 window 对象
```js
window.name = 'globalName';
var getName = function(){ 
    return this.name;
};
console.log( getName() );// 输出:globalName


window.name = 'globalName';
var myObject = { 
    name: 'sven',
    getName: function(){ 
        return this.name;
    } 
};
var getName = myObject.getName; 
console.log( getName() ); // globalName
```

3. 构造器调用
- 当用 new 运算符调用函数时，该函数总 会返回一个对象，通常情况下，构造器里的 this 就指向返回的这个对象
```js
var MyClass = function(){ 
    this.name = 'sven';
};
var obj = new MyClass();
alert ( obj.name ); // 输出:sven
```
- 如果构造器显式地返回了一个 object 类型的对象，那么此次运算结果最终会返回这个对象，而不是我们之前期待的 this

```js
var MyClass = function(){
    this.name = 'sven';
    return { // 显式地返回一个对象
      name: 'anne' }
    };
var obj = new MyClass();
alert ( obj.name ); // 输出:anne
```

4. Function.prototype.call 或 Function.prototype.apply 调用,可以动态地 改变传入函数的 this: