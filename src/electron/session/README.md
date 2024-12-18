## session 模块
管理会话、cookie、缓存、代理设置等
session模块可以创建新的Session对象，也可以使用webcontents的session属性访问现有页面的session

## 实例属性
1. ses.availableSpellCheckerLanguages 只读
包含所有已知的可用拼写检查语言。

2. ses.spellCheckerEnabled
指示是否启用内置拼写检查器

3. ses.storagePath 只读
指示此会话的数据保留在磁盘上的绝对路径。内存会话而言，返回null

4. ses.cookies 只读
此会话的Cookies对象

5. ses.serviceWorkers 只读
此会话的ServiceWorkers对象

6. ses.webRequest 只读
此会话的WebRequest对象

7. ses.protocol 只读
此会话的Protocol对象

8. ses.netLog 只读
此会话的NetLog对象