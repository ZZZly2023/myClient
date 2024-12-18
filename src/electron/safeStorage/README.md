## safeStorage
使用操作系统提供的加密系统未存储在磁盘上的数据进行保护。
## 方法
1. safeStorage.isEncryptionAvailable()
返回boolean 是否可以加密

2. safeStorage.encryptString(plainText)
返回Buffer 加密字符串的字节数组
如果加密失败，此函数将抛出异常

3. safeStorage.decryptString(encryptedData)
返回string 解密后的字符串。

4. 
