## 黑白配色
- 若 filter 属性的值不是 none，会给「绝对和固定定位的后代」创建一个 containing block，除非它适用的元素是当前浏览上下文中的文档根元素（即<html>）。
- `filter: grayscale(1)`
- 兼容处理
  ```css
    .gray {
        -webkit-filter: grayscale(100%);
        -moz-filter: grayscale(100%);
        -ms-filter: grayscale(100%);
        -o-filter: grayscale(100%);
        filter: grayscale(100%);
        -webkit-filter: gray;
        filter: gray;
        -webkit-filter: progid:dximagetransform.microsoft.basicimage(grayscale=1);
        filter: progid:dximagetransform.microsoft.basicimage(grayscale=1);
    }
  ```

## 平滑滚动到指定元素
```js
document.getElementById("payment-title").scrollIntoView(alignToTop,{ // alignToTop 为true 与元素顶部对齐，false为底部对齐
  behavior: "smooth",
});
```


