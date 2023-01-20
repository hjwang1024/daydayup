## 序列化和反序列化
```py
d = {'name'：'jod'} # 字典
j = json.dumps(d)  # 转换成字符串

d = json.loads(j) #转化成字典

```
- 在requests库中，不用json.loads方法进行反序列化，而是提供了响应对象的json方法，用来对json格式的响应体进行反序列化
```py
r = requests.get(url)
r.json() # 或 r.content
```

## 列表字符转换
```py
# 使用 ','.join(list)转换为列表时
list1 = [1,2,3,4]
str = ','.join(list1)
print(str) #1,2,3,4

# 如果想输出 '1','2','3','4'
list1 = [1,2,3,4]
str = ','.join("'{0}'".format(x) for x in list1)
print(str)

# "1","2","3","4"
list1 = [1,2,3,4]
str = ','.join('"{0}"'.format(x) for x in list1)
print(str)
```

## dict合并
```py
d1 = {
    'user':'root',
    'pwd':'1234                                                                '
}
d2 = {
    'ip':'123',
    'port':'8080'
}
# 1. d1.items()获取字典的键值对的列表  2. d1.items() + d2.items()拼成一个新的列表  3. dict(d1.items()+d2.items())将合并成的列表转变成新的字典
d3 = dict(d1.items() + d2.items)

# update 方法
d3 = {}
d3.update(d1)
d3.update(d2)
# 或
d3 = d1.copy()
d3.update(d2)

# dict方法
d3 = dict(d1,**d2)

# 遍历
d3 = {}
for k,v in d1.items():
    d3[k] = v
for k,v in d2.items():
    d3[k] = v

```