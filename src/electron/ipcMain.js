// 主进程处理渲染进程传递的事件
const { ipcMain }  = require('electron/main');
const { appHandlers } = require('./app/index.js')
const { browserWindowHandler, windowsMap } = require('./BrowserWindow/index.js')
const { clipboardHandlers } = require('./clipboard/index.js')
const { desktopCapturerHandler } = require('./desktopCapture/index.js')
const { dialogHandlers } = require('./dialog/index.js')
const { shortcuthandler } = require('./globalShortcut/index.js')
const { nativeTheme } = require('electron/main')
// 主进程接收到来自渲染进程事件请求
const mainHandlers = {
  ...appHandlers, 
  ...clipboardHandlers,
  ...desktopCapturerHandler,
  ...dialogHandlers,
  ...shortcuthandler,
  'set-theme-color': (type) => {
    if ([ 'light', 'dark', 'system'].includes(type)) {
      nativeTheme.themeSource = type
    }
 }
}

// 监听渲染进程的消息, 同步返回-returnValue
ipcMain.on('sync-message', (event, ...args) => {
  const key = args[0]
  if (mainHandlers[key] || browserWindowHandler[key]) {
    if (browserWindowHandler[key]) {
      const win = windowsMap.get(event.sender.getURL())
     event.returnValue = browserWindowHandler[key](win,...args.slice(1))
    }
    event.returnValue = mainHandlers[key](...args.slice(1))
  } else {
    event.returnValue = 'event not found'
  }
})

// 监听渲染进程的消息, 异步返回-event.reply
ipcMain.on('async-message', (event,...args) => {
  const key = args[0]
  if (mainHandlers[key] || browserWindowHandler[key]) {
    if (browserWindowHandler[key]) {
      const win = windowsMap.get(event.sender.getURL())
      event.reply('async-message-reply', browserWindowHandler[key](win,...args.slice(1)))
    }
    event.reply('async-message-reply', mainHandlers[key](...args.slice(1)))
  } else {
    event.reply('event not found')
  }
})

// 主进程发送消息到渲染进程
ipcMain.handle('message-to-main', async (event,...args) => {
  const key = args[0]
  if (mainHandlers[key] || browserWindowHandler[key]) {
    if (browserWindowHandler[key]) {
      const win = windowsMap.get(event.sender.getURL())
      return await browserWindowHandler[key](win, ...args.slice(1))
    }
    return await mainHandlers[key](...args.slice(1))
  } else {
    console.log('event', event)
    return 'event not found'
  }
})

