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
