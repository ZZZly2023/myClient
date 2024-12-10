const renderer  = require('./ipcRenderer.js')
const { contextBridge } = require('electron')
console.log('contextBridge')
contextBridge.exposeInMainWorld('renderer', 
  {
    cmdAsync: () => renderer.cmdAsync(),
    sync: () => renderer.sync()
  }
)
