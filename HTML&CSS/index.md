## BFC
### bfc的效果
让处于BFC内部的元素与外部的元素相互隔离，使内外元素的定位不会相互影响
- 1.BFC内部的盒子会在垂直方向上一个接一个排列（bfc里面也有正常的文档流） 
- 2.解决外边距重叠 
- 3.BFC容器在计算高度的时候，会连浮动元素计算在内

### 创建bfc
- 浮动 float:left / right  可以将容器变为BFC
- 定位 position: absolute / fixed 可以将容器变为BFC
- 行内块 display: inline-block
- 表格单元  diaplay:table-cell，只要元素为table- ... 的形式都可以
- overflow:auto / hidden / overlay / scroll
- 弹性盒子 (display:flex/inline-flex)

### BFC容器 的范围
一个BFC包含该上下文的子元素，但不包含创建了新BFC的子元素的内部元素, 即:A>B>C>D ,当A为BFC容器，A能包含B C D ，但是当C为BFC容器时A就不能作用到D容器，那么就是说一个元素不能同时存在在两个BFC里面
