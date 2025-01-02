## webFrameMain 控制网页和iframe
webFrameMain模块可以用于跨现webContents实例查找指定的frame，比如在导航事件中。
```javascript
const { BrowserWindow, webFrameMain } = require('electron/main')
const win = new BrowserWindow(somaeparams)
win.loadURL('//...')
win.webContents.on('did-frame-navigate', (
  event, url, httpResponseCode, httpStatusText, isMainFrame, frameProcessId, frameRoutingId
) => {
  const frame = webFrameMain.fromId(frameProcessId, frameRoutingId)
  if (frame) {
    const code = 'document.body.innerHTML = document.body.innerHTML.replaceAll("heck,"h*ck")'
    frame.executeJavaScript(code)
  }
})
```
也可以使用webContents.mainFrame属性访问现有页面的frame
### 方法
1. webFrameMain.fromId(processId, routingId)
  * processId number 表示该frame的进程ID
  * routingId number 表示当前渲染器进程中的唯一frameId。

## Class WebFrameMain
### 实例事件
1. 'dom-ready'
加载文档时发出

### 实例方法
1. frame.executeJavaScript(coe[, userGesture])
  * code 字符串
  * userGesture boolean 可选 默认为false
return Promise<unknown> 根据代码执行结果返回

2. frame.reload()
返回boolean，指示是否重载成功。仅当没有历史记录时，为false

3. frame.send(channel, ...args)
  * channel 字符串
  * ...args any[]
4. frame.postMessage(channel, message, [transfer])
  * transfer MessagePortMain[] 可选

### 实例属性
1. frame.ipc 只读
frame的ipcMain实例
2. frame.url 只读
string 代表frame的当前url
3. frame.origin 只读
返回当前frame的origin
4. frame.top 只读
WebFrameMain|null
返回该frame所属的frame结构的顶层frame
5. frame.parent 只读
rWebFrameMain|null 代表frame的父frame
6. frame.frames 只读
包含frame直系后代的WebFrameMain[]
7. frame。framesInSubtree 只读
WebFrameMain[] 
8. frame.frameTreeNodeId 只读
9. frame.name 只读
string frame的名称
10. frame.osProcessId 只读
Number 代表该frame进程的系统pid
11. frame.processId 只读
number 代表该frame的进程在chromium内部的pid，注意与系统进程ID不同。
12. frame.routingId 只读
Number 当前渲染器进程中的唯一frameID
13. frame.visibilityState 只读
string 表示该frame的可见性

