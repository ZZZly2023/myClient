## utilityProcess 模块
创建一个启动nodejs和消息端口的子进程。utilityProcess使用chromium的 Services API来启动子进程。
属于主进程模块

## 方法
utilityProcess.fork(moudelPath, args, options)
 * moudlePath string 要启动的模块的路径
 * args string[] 可选 将在子进程中用作process.argv的字符串参数列表
 * options object 可选
   1. env object 可选 环境键值对 默认为process.env
   2. execArgv string[] 可选 传递给子进程的额外参数
   3. cwd string 可选 子进程的当前工作目录
   4. stdio string[] 可选 子进程的标准输入输出配置。默认为inherit。值可以是pipe|ignore|inherit之一。
   5. serviceName string 可选 将出现在app.getAppMetrics()和app的child-process-gone事件返回的ProcessMetric的name属性中的名称。
      默认为Node Utility Process。
   6. allowLoadingUnsignedLibraries boolean 可选 macOS。允许加载未签名的库。默认值为false。如果为true，则子进程通过macOS上的Electron Helper （Plugin）.app 辅助程序可执行文件启动，该可执行文件可以使用com.apple.security.cs.disable-library-validation 和com.apple.security.cs.allow-unsigned-executable-memory权利进行联合签名。这将允许子进程加载未签名的库。
   7. respondToAutoRequestsFromMainProcess boolean 可选。 设置为true，通过net模块创建的所有http 401和407网络请求都将允许通过主进程的app模块的login事件

   示例：
  ```javascript
  // main.js
  const { utilityProcess, MessageChannelMain } = require('electron')
  const { port1, port2 } = new MessageChannelMain()
  const child = utilityProcess.fork('./child.js', ['启动参数'])
  child.postMessage('hello my child', [port2])
  // 通过端口监听子进程消息
  port1.on('message', (msg) => {
    console.log(msg)
  })
  port1.start()
  ```

  ```javascript
  // child.js
  process.parentPort.once('message', ({data, ports}) => {
    console.log(data) // 父进程初次发送的消息
    const port = ports[0]
    // 子进程通过父进程传递的端口，与父进程通信
    port.postMessage('hello my parent')
    port.on('message', (msg) => {
      console.log(msg)
    })
    port.start()
  })
  ```

  ## 实例方法
  1. child.postMessage(message, transfer)
    * message any 要发送的消息
    * transfer MessagePortMain[] 可选。
  向子进程发送消息，可以选择转让零个或多个MessagePortMain对象所有权。
  2. child.kill()
  返回boolean 优雅地终止进程。成功为true，失败为false。

  ## 实例属性
  1. child.pid 子进程的pid
  2. child.stdout 子进程的标准输出流 NodeJS.ReadableStream | null。如果子进程是在options.stdio[1]中配置的pipe以外的任何值，则为null。当子进程退出时，发出exit事件后该值为null
  ```javascript
  child.stdout.on('data', (data) => {
    console.log(data.toString())
  })
  ```
  3. child.stderr 子进程的stderr的 NodeJS.ReadableStream | null。如果子进程是在options.stdio[2]中配置的pipe以外的任何值，则为null。当子进程退出时，发出exit事件后该值为null

  ## 实例事件
  'spawn': 子进程成功启动后发出

  'exit': 子进程退出后发出
  'message': 返回message（任意值） 当子进程使用process.parentPort.postMessage()发送消息时发出。