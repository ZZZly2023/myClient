const { app, BrowserWindow, desktopCapturer, session, utilityProcess, MessageChannelMain } = require('electron')
const { registerAppEvents } = require('./app/index.js')
const { createWindow } = require('./BrowserWindow/index.js')
const path = require('path')

require('./ipcMain.js')

// 当electron 完成初始化时触发一次。
app.on('ready', (event, launchInfo) => {
  console.log('app is ready')
})


app.whenReady().then(() => {
 session.defaultSession.setDisplayMediaRequestHandler((request, callback) => {
  desktopCapturer.getSources({types: ['screen'], thumbnailSize: { width: 0, height: 0 }}).then((sources) => {
    callback({video: sources[0], audio: 'loopback'})
  })
  // callback({video: request.frame, audio: 'loopback'})
 }, {
  useSystemPicker: true
 })

 const { port1, port2 } = new MessageChannelMain()
 const childProcess = utilityProcess.fork(path.resolve(__dirname, 'child.js'), ['you are my child'])
 // 发送其中一个端口给子进程
 childProcess.postMessage('give you phone', [port1]) // 只能通过postMessage发送端口
 
// 父子进程可以不用port进行通信
//  childProcess.on('message', (data) => {
//   console.log('parent receive', data)
//  })

 // 父进程通过端口监听子进程消息
 port2.on('message', ({data, ports}) => {
  console.log('parent receive', data)
})
// 父进程通过端口给子进程发送消息
port2.postMessage('hello child')

// 启动端口
port2.start()
 
 

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
