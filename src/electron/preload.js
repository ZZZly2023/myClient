// window.addEventListener('DOMContentLoaded', () => {
//   const replaceText = (selector, text) => {
//     const element = document.getElementById(selector)
//     if (element) element.innerText = text
//   }

//   for (const dependency of ['chrome', 'node', 'electron']) {
//     replaceText(`${dependency}-version`, process.versions[dependency])
//   }
// })

const { contextBridge } = require('electron')
contextBridge.exposeInMainWorld('versions', {
  node: () => process.versions.node,
  Chrome: () => process.versions.chrome,
  electron: () => process.versions.electron
})