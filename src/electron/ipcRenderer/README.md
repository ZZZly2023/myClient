## ipcRenderer 渲染器模块 从渲染器进程到主进程异步通信

### 模块方法
1. ipcRenderer.on(channel, listener)
  * channel string
  * listener function
    * event IPC渲染事件
    * ...args any[]
监听channel 当有新消息到达时，listener将会执行
ipcRenderer.addListener的别名

2. ipcRenderer.off(channel, listener)
  * channel
  * listener
ipcRenderer.removeListener的别名

3. ipcRenderer.once(channel, listener)
为channel事件添加一次性listener。

4. ipcRenderer.addListener(channel, listener)

5. ipcRenderer.removeListener(channel, listener)
从指定channel的监听器数组中移除指定的listener

6. ipcRenderer.removeAllListeners(channel)
移除所有监听器或指定channel的监听器

7. ipcRenderer.send(channel, ...args)
通过channel向主进程发送异步消息。
如果想从主进程接收单个响应，如方法调用的结果，可以使用invoke

8. ipcRenderer.invoke(channel, ...args)
返回Promise<any> 通过主进程的响应来resolve
主进程通过handle方法监听并处理channel

9. ipcRenderer.sendSync(channel, ...args)
返回 any
通过channel发送同步消息到主进程，并等待结果。主进程通过ipcMain监听channel来处理。
并通过设置event.returnValue来同步响应值

10. ipcRenderer.postMessage(channel, message, [transfer])
  * message any
  * transfer MessagePort[] 可选
向主进程发送消息，可以选择移交0个或多个MessagePort对象的所有权
```javaScript
// Renderer precess
const { port1, port2 } = new MessageChannel()
ipcRenderer.postMessage('port', { message: 'hello' }, [port1])

// Main process
ipcMain.on('port', (e, msg) => {
  const [port] = e.ports
  //
})
```

11. ipcRenderer.sendToHost(channel, ...args)
与send类似，但事件将被发送到页面中的<webview>元素而不是主进程