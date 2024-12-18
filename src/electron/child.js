// 子进程通过 parentPort 获得父进程传递的端口，注意就监听一次
process.parentPort.once('message', ({data, ports}) => {
  // 子进程通过父进程传递的端口，与父进程进行通信
  console.log('子进程收到父进程的消息', data)
  const port = ports[0]
  port.postMessage('hello parent')
  port.on('message', (msg) => {
    console.log('子进程收到消息', msg)
    console.log('child process', process.argv)
  })
  port.start()
})

// 子进程通过 parentPort 向父进程发送消息，可以不通过port
// process.parentPort.postMessage('hello parent')