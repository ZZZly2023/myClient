## ipcMain 主进程模块
处理从渲染器进程（网页）发送的异步和同步消息。

### 发送消息
也可以从主进程向渲染进程发送消息，如通过webContents（.send方法）
* 发送消息时，事件名称为channel
* 要响应同步消息，需要设置event.returnValue
* 要将异步消息发送回发送者，可以使用event.reply(...), 而event.sender.send(...)将始终发送到main frame

### 模块方法
1. ipcMain.on(channel, listener)
  * channel string
  * listener function
    * event ipcMainEvent
    * ...args any[]
监听channel，当有新消息到达时，listener被调用。

2. ipcMain.once(channel, listener)
只监听channel一次，触发之后就会移除listener

3. ipcMain.removelistener(channel, listener)
从指定channel的监听器数组中删除指定的listener

4. ipcMain.removeAllListeners([channel])
  * channel string 可选
删除指定channel的监听器

5. ipcMain.handle(channel, listener)
监听并处理channel, return为返回值

6. ipcMain.handleOnce(channel, listener)

7. ipcMain.removeHandler(channel)
如果channel的监听存在，则删除其所有处理程序