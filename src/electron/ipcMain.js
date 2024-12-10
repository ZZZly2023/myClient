// 主进程处理渲染进程传递的事件
const { ipcMain }  = require('electron/main');
const { appHandler } = require('./app/index.js')
const { BrowserWindowHandler } = require('./BrowserWindow/index.js')
// 主进程接收到来自渲染进程事件请求
const mainHandlers = {
  ...appHandler,
  ...BrowserWindowHandler
}



// 监听渲染进程的消息
ipcMain.on('message-to-main', (event, ...args) => {})
ipcMain.once('message-to-main', (event,...args) => {})

// 主进程发送消息到渲染进程
ipcMain.handle('message-to-main', async (event,...args) => {})
ipcMain.handleOnce('message-to-main', (event,...args) => {})
