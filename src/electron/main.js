const { app, BrowserWindow, desktopCapturer, session, utilityProcess, MessageChannelMain } = require('electron')
const { registerAppEvents } = require('./app/index.js')
const { createWindow } = require('./BrowserWindow/index.js')
const os = require('os')
// const { installExtension, REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS } = require('electron-devtools-installer')
const path = require('path')
const reactDevToolsPath = path.join(os.homedir(), '/Library/Application Support/Google/Chrome/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi/6.0.1_0')
const reactReduxDevToolsPath = path.join(os.homedir(), '/Library/Application Support/Google/Chrome/Default/Extensions/lmhkpmbekcpmknklioeibfkpmmfibljd/2.17.0_0')

require('./ipcMain.js')
// app.disableHardwareAcceleration()
// 当electron 完成初始化时触发一次。
app.on('ready', (event, launchInfo) => {
  console.log('app is ready')
})


app.whenReady().then(() => {
//  installExtension([REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS])
//   .then(ext => console.log(`Added Extension:  ${ext.name}`))
//   .catch(err => console.log('An error occurred: ', err))
 session.defaultSession.setDisplayMediaRequestHandler((request, callback) => {
  desktopCapturer.getSources({types: ['screen'], thumbnailSize: { width: 0, height: 0 }}).then((sources) => {
    callback({video: sources[0], audio: 'loopback'})
  })
 }, {
  useSystemPicker: true
 })
 session.defaultSession.loadExtension(reactDevToolsPath)
 session.defaultSession.loadExtension(reactReduxDevToolsPath)

  createWindow({
    width: 1200,
    height: 662,
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
