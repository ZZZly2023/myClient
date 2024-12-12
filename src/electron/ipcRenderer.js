/**
 * 定义渲染器进程和主进程之间的通信接口
 */ 
const { ipcRenderer } = require('electron')

// 渲染进程可处理的事件
const rendererHandlers = {}

async function cmdAsync(event, ...args) {
  if (rendererHandlers[event]) {
    return await rendererHandlers[event](...args)
  } else {
    console.log('event', event)
    const res = await ipcRenderer.invoke('message-to-main', event, ...args)
    return res
  }
}

function sync(event, ...args) {
  if (rendererHandlers[event]) {
    return rendererHandlers[event](...args)
  } else {
    return ipcRenderer.sendSync('sync-message', event,...args)
  }
}

function async(event,...args) {
  if (rendererHandlers[event]) {
    return rendererHandlers[event](...args)
  } else {
    ipcRenderer.send('async-message', event,...args)
  }
}

// 监听主进程的消息
ipcRenderer.on('async-message-reply', (event, ...args) => {
  console.log('async-message-reply', event,...args)
})

module.exports = { cmdAsync, sync, async }
