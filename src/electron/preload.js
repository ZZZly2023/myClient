export { renderer } from './ipcRenderer.js'
const { contextBridge } = require('electron')
contextBridge.exposeInMainWorld('versions', {
  node: () => process.versions.node,
  Chrome: () => process.versions.chrome,
  electron: () => process.versions.electron
})

contextBridge.exposeInMainWorld('renderer', renderer)
