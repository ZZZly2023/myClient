const { app, BrowserWindow } = require('electron')
const path = require('path')
const { registerAppEvents } = require('./app/index.js')

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })
  win.loadURL('http://localhost:3000/')
}

// 当electron 完成初始化时触发一次。
app.on('ready', (event, launchInfo) => {
  console.log('app is ready')
})

app.whenReady().then(() => {
  createWindow()
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

registerAppEvents()
