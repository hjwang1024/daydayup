## 连接 join

- Inner Join 内连接： 相当于A and B，代表两个集合(表)的交集，即表中某字段匹配上的条目。
- Full Outer Join 全连接：相当于A or B`，代表两个表的并集，即两表合并所有字段和数据为一个表，未匹配的数据中的空字段以null填充。
- Right Join 右连接：使用left表里所有数据，而right表中只保留匹配数据，且未匹配数据条目中的right表字段以null填充。
- Left Join 左连接：使用right表里所有数据，而left表中只保留匹配数据，且未匹配数据条目中的left表字段以null填充。
![join](./mysql%20join.png)

## 语句
#### 添加表字段
`ALTER TABLE adset_watch_record_v2 ADD COLUMN pred_res_7day VARCHAR(255) DEFAULT NULL COMMENT '七天是否回本' AFTER old_column`
- table_name ：表明；
- column_name：需要添加的字段名；
- VARCHAR(100)：字段类型为varchar，长度100；
- DEFAULT NULL：默认值NULL；
- AFTER old_column：新增字段添加在old_column字段后面。

#### 复制相同列
`update article set B=A`

#### 删除字段
`ALTER TABLE adset_watch_record_v2 DROP pred_res_7day`
