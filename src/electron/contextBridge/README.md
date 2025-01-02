## contextBridge 渲染进程模块
在隔离的上下文之间创建安全、双向、同步的桥梁
在预加载脚本中，通过使用contextBridge可以向渲染器公开API。
```javaScript
// preload.js
const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld(
  'electron',
  {
    doThing: () => ipcRenderer.send('do-a-thing')
  }
)

// renderer(Main wrold)
window.electron.doThing()
```

### 词汇
* Main World
是主渲染器代码运行的JS上下文。
* Isolated World
当webPreferences 中启用contextIsolation时（electron 12.0.0版本开始默认行为）
preload脚本将在这个上下文隔离的环境中运行

### 模块方法
1. contextBridge.exposeInMainWorld(apiKey, api)
  * apiKey string - 将API注入到window的关键。通过window[apiKey]访问
  * api any 要暴露的api

2. contextBridge.exposeInIsolateWorld(worldId, apiKey, api)
  * worldId Number - 要注入API的世界ID, 0是默认世界，999是electron的contextIsolation功能使用的世界。使用999会公开预加载上下文的对象。所以建议在创建隔离世界时使用1000+
  * apiKey 通过window[apiKey]访问
  * api