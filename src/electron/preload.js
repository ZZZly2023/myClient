const renderer  = require('./ipcRenderer.js')
const { contextBridge } = require('electron')
console.log('contextBridge')
contextBridge.exposeInMainWorld('renderer', 
  {
    cmdAsync: (...args) => renderer.cmdAsync(...args),
    sync: (...args) => renderer.sync( ...args),
    async: (...args) => renderer.async(...args)
  }
)
