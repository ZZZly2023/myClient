const { app, BrowserWindow } = require('electron')
const { registerAppEvents } = require('./app/index.js')
const { createWindow } = require('./BrowserWindow/index.js')

// 当electron 完成初始化时触发一次。
app.on('ready', (event, launchInfo) => {
  console.log('app is ready')
})

app.whenReady().then(() => {
  createWindow({
    width: 800,
    height: 600,
    webPreferences: {
      devTools: true, // 启用DevTools
      nodeIntegration: true, // 启用Node.js集成
      // webSecurity: false, // 禁用Web安全
      webSecurity: true, // 启用Web安全
      contextIsolation: true, // 启用上下文隔离
      webviewTag: true, // 启用webview标签
    }
  }, { type: 'url', url: 'http://localhost:3000/' })
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

registerAppEvents()
