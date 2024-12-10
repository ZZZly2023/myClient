/**
 * 定义渲染器进程和主进程之间的通信接口
 */ 
const { ipcRenderer } = require('electron')

async function cmdAsync(cmd, ...args) {
  // return ipcRenderer.invoke(cmd,...args)
}

function sync(cmd, ...args) {
  // return ipcRenderer.sendSync(cmd,...args)
}
// 渲染进程可处理的事件
// const rendererHandlers = {}


// // 监听主进程的消息
// ipcRenderer.on('message-to-renderer', (event, ...args) => {})

// // 一次性监听主进程的消息
// ipcRenderer.once('message-to-renderer', (event, ...args) => {})



// // 向主进程发送异步消息
// ipcRenderer.send('message-to-main', async (event,...args) => {})

// // 向主进程发送同步消息
// ipcRenderer.sendSync('message-to-main:sync', (event,...args) => {})

// ipcRenderer.invoke('message-to-mian:invoke', (event,...args) => {})

// // 向网页中的webview发送消息
// ipcRenderer.sendToHost('message-to-host', ...args)

module.exports = { cmdAsync, sync }
