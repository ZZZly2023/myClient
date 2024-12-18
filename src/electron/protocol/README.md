## protocol模块
通过协议模块，可以实现在网页输入指定协议的链接，打开客户端，并在链接中传递参数。对于mac和linux必须在打包后才能生效
如果没有指定协议的会话，则协议将应用于Electron使用的默认会话。

## 方法
1. protocol.registerSchemesAsPrivileged(customSchemes)
  * customSchemes: 自定义协议内容数组
该方法只能在read事件之前使用，且智能调用一次。

2. protocol.handle(scheme, handler) // 使用此方案向 URL 发出的请求将委托给此处理程序来确定应发送什么响应。
  * scheme: 协议字符串。如https、my-app
  * handler Function`<GlobalResponse | Promise <GlobalResponse>>`
    * request: GlobalRequest

3. protocol.unhandle(scheme)
删除使用handle注册的协议处理程序

4. protocol.isProtocolHandled(scheme)
scheme是否已处理