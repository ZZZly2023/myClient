## webContents 模块
webContents负责渲染和控制网页，是BrowserWindow对象的属性

## 导航事件
### 导航文档
当webContents导航到另一个页面（与页内导航相对）时，将触发以下事件。
1. 'did-start-navigation'
2. 'will-frame-navigate'
3. 'will-navigate' // 仅在主框架导航时触发
4. 'will-redirect' // 仅在当行期间发生重定向时触发
5. 'did-redirect-navigation' // 导航期间重定向触发
6. 'did-frame-navigate'
7. 'did-navigate' // 仅在主框架导航时触发
调用event.preventDefault()可以阻止导航, 后续的导航事件不会触发

### 页内导航
页内导航不会导致页面重新加载，而是导航到当前页面内的某个位置。这些活动不可取消。对于页内导航，将按此顺序触发以下事件：
1. 'did-start-navigation'
2. 'did-navigate-in-page'

### frame导航
will-navigate、did-navigate 仅在 mainFrame 导航时触发。如果想观察iframe中的导航，使用
will-frame-navigate、did-frame-navigate 事件。

## 模块方法 
`const { webContents } = require(electron/main)`
1. webContents.getAllWebContents()
用途：获取所有WebContents实例数组。包括所有窗口、web视图、打开的devTools 和 devTools扩展背景页面的Web内容
返回值 WebContents[]
2. webContents.getFocusedWebContents()
用途：获取当前聚焦的WebContents实例
返回值 WebContents | null
3. webContents.fromId(id)
参数：id Number
用途：根据id获取WebContents实例，如果没有找到，则返回undefined
返回值 WebContents | undefined
4. webContents.fromFrame(frame)
参数：frame WebFrameMain
用途：根据frame获取WebContents实例。如果没有找到，则返回undefined
返回值 WebContents | undefined
5. webContents.fromDevToolsTargetId(targetId)
参数：targetId String 与webContents 实例关联的Chrome DevTools协议targetID
用途：根据targetId获取WebContents实例。如果没有找到，则返回undefined

## WebContents 类
该类不是从electorn模块导出，而是其他api中获取
### 实例事件 包括页面生命周期、webview、devTools、iframe加载等
1. wc.on('did-finish-loading')
导航完成时发出。即选项卡的旋转器停止旋转，并且调度onload事件。
2. wc.on('did-fail-load', (event, errorCode, errorDescription, validatedURL, isMainFrame, frameProcessId, frameRoutingId) => {})
选项卡的旋转器停止旋转，但是导航失败时发出。
3. wc.on('did-fail-provisional-load', (event, errorCode, errorDescription, validatedURL, isMainFrame, frameProcessId, frameRoutingId) => {})
该事件与did-fail-load事件类似，但在取消加载时发出，如调用window.stop()
4. wc.on('did-frame-finish-load', (event, isMainFrame, frameProcessId, frameRoutingId) => {})
当frame完成导航时发出
5. wc.on('did-start-loading')
导航开始时发出。即选项卡的旋转器开始旋转
6. wc.on('did-stop-loading')
导航完成时发出。即选项卡的旋转器停止旋转
7. wc.on('dom-ready')
当文档（document）（从顶层frame中）加载完成时发出
8. wc.on('page-title-updated', (event, title, explicitSet) => {})
在导航期间设置页面标题时发出。当标题从文件url中获取时，explicitSet为false
9. wc.on('page-favicon-updated', (event, favicons)=>{})
当页面的favicon更新时发出。favicons是一个包含所有favicon的URL的数组
10. wc.on('content-bounds-updated', (event, bounds)=>{})
当页面调用window.moveTo、window.resizeTo或相关API时发出。
默认情况下，这将移动窗口。使用event.preventDefault()可以阻止此行为。
bounds Rectangle 新的内容范围
11. wc.on('did-create-window', (window, details)=>{})
在渲染器中调用window.open()成功创建窗口后发出
  * window BrowserWindow
  * details Object
    * url String 创建窗口的url
    * frameName String 在window.open()调用中为创建的窗口指定的名称
    * options BrowserWindowConstructorOptions 创建窗口的选项
    * referrer Referrer 
    * postBody PostBody 可选 将发送到新窗口的数据，并设置合适的标头。如果没有post data要发送，这个值是null
    * disposition String 可以是default、foreground-tab、background-tab、new-window或ohther。
12. wc.on('will-navigate', (details)=>{})
当用户或页面想要在主框架上开始导航时发出。
当使用webContents.loadURL()或webContents.back等API以编程式启动导航时，不会触发此事件。
页面内导航也不会触发，如单击锚链接或更新window.location.hash。使用did-navigate-in-page事件来监听这些情况。
 * details Object
   * url String 要导航的url
   * isSameDocument Boolean 使用window.history api 和 reference fragment 导航不会触发此事件。
   这个事件中 isSameDocument 为false
   * isMainFrame Boolean 如果导航发生在main frame中，则为true
   * frame WebFrameMain 导航发生的frame
   * initiator WebFrameMain 发起导航的frame
13. wc.on('will-frame-navigate', (details)=>{})
当在frame中导航时发出。当window.location对象变更或用户单击页面中的连接时，可能触发。
与will-navigate事件主要区别，当 main frame 或其他子frame 尝试导航时， 会触发will-frame-navigate事件。
当导航事件来自main frame时，isMainFrame为true。
其他触发规则类似will-navigate事件。
 * details Object 同上
14. wc.on('did-start-navigation', (details)=>{})
当frame（或main frame）中导航开始是触发
 * details Object 同上
15. wc.on('will-redirect', (details)=>{})
当导航期间发生重定向时发出。如302等
 * details Object 同上
16. wc.on('did-redirect-navigation', (details)=>{})
导航重定向后发出
 * details Object 同上，此事件无法阻止
17. wc.on('did-navigate, (event, url, httpResponseCode, httpStatusText)=>{})
当main frame 导航完成时发出。页面内导航不会触发此事件。如单击锚链接或window.location.hash
18. wc.on('did-frame-navigate', (event, url, httpResponseCode, httpStatusText, isMainFrame, frameProcessId, frameRoutingId)=>{})
当任何frame导航完成时触发。
页面内导航不会触发此事件。
19. wc.on('did-navigate-in-page', (event, url, isMainFrame, frameProcessId, frameRoutingId)=>{})
在任何frame中发生页面内导航发出。
当发生页内导航时，页面URL发生变化，但不会导致页外导航。单击锚链接或者触发hashChange事件时，会触发此事件。
20. wc.on('will-prevent-unload', (event)=>{})
当beforeunload事件处理程序尝试取消页面卸载时发出。
21. wc.on('render-process-gone',(event, details)=>{})
当渲染器进程意外消失时发出。通常因为被crashed或killed。
details Object
 reaseon String
  * clean-exit Process exited code
  * abnormal-exit Process exited code
  * killed
  * crashed
  * oom
  * launch-failed
  * integrity-failure
exitCode Number 进程退出码
22. wc.on('unresponsive')
当网页变得无响应时发出
23. wc.on('responsive')
当无响应的网页再次响应时发出。
24. wc.on('plugin-crashed', (event, name, version)=>{})
当插件进程崩溃时发出
25. wc.on('destroyed')
当webContents被销毁时发出
26. wc.on('input-event', (event, inputEvent)=>{})
当输入事件发送到WebContents时发出。
27. wc.on('before-input-event', (event, input)=>{})
在页面dispatch 'keydown'和‘keyup’事件之前发出。调用event.preventDefault()可以阻止事件的默认处理。
28. wc.on('enter-html-full-screen')
当窗口进入由HTML API触发的全屏状态时发出
29. wc.on('leave-html-full-screen')
当窗口退出由HTML API触发的全屏状态时发出
30. wc.on('zoom-changed', event, zoomDirection)
当用户请求使用鼠标滚轮更改缩放级别时发出
zoomDirection string 'in' | 'out'
31. wc.on('blur')
当webContents失去焦点时发出
32. wc.on('focus')
当webContents获得焦点时发出
webContents的focus和blur事件只能用于检测同一窗口中不同webContents和browserView之间的焦点变化
33. wc.on('devtools-search-query', (event, query)=>{})
当在上下文菜单中搜索文本时发出。
34. wc.on('devtools-opened')
当打开DevTools时发出
35. wc.on('devtools-closed')
当关闭DevTools时发出
36. wc.on('devtools-focused')
当DevTools获得焦点时发出
37. wc.on('certificate-error', (event, url, error, certificate, callback, isMainFrame))
当无法验证certificate和url时发出。用法与app的certificate-error事件相同
38. wc.on('select-client-certificate', (event, url, certificateList, callback))
请求客户端证书时发出。
39. wc.on('login', (event, authenticationResponseDetails, authInfo, callback) => {})
当webContents想要进行基本身份验证时发出。用法与app的login事件相同
40. wc.on('found-in-page', (event, result)=>{})
request
  requestId 整数
  activeMatchOrdinal 整数
  matches 整数 对比次数
  selectionArea 长方形 第一个匹配区域的坐标
  finalUpdate Boolean 是否是最后一次更新
当webContents.findInPage 请求有结果可用时发出。
41. wc.on('media-started-playing')
当媒体开始播放时发出。
42. wc.on('media-paused')
当媒体暂停或播放完毕时发出。
43. wc.on('audio-state-changed', (event) => {})
当媒体变得可听见或不可见时发出。
44. wc.on('did-change-theme-color', (event, color) => {})
当页面的主题颜色更改时发出。通常是由于遇到原标签meta
45. wc.on('update-target-url', (event, url) => {})
当鼠标移动到链接上或键盘将焦点移动到链接时发出。
46. wc.on('curosr-changed', (event, type, image, scale, size, hotSpot) => {})
47. wc.on('context-menu', (event, params) => {})
48. wc.on('select-bluetooth-device', (event, deviceList, callback) => {})
当调用navigator.bluetooth.requestDevice()时发出。
49. wc.on('paint', (event, dirtyRects, image) => {})
生成新帧时发出。缓冲区中仅传递脏区域
50. wc.on('devtools-reload-page')
当devTools窗口重新加载webContents时发出。


51. wc.on('will-attach-webview', (event, webPreferences, params) => {})
当<webview>的网页内容附加到网页内容时发出。
此事件可用于加载webview之前，为webview的 webContents 配置webPreferences。并提供无法通过<webview>属性设置的设置功能
params record <string, string>，可以修改改对象来调整访客页面的参数。

52. wc.on('did-attach-webview', (event, webContents) => {})
当webview附加到此web内容时发出。 webContents为webview使用的访客web内容

53. wc.on('console-message', (event, level, message, line, sourceId) => {})
当关联的窗口记录控制台消息时发出。
 * level number 日志级别0~3: 匹配 verbose、info、warning、error
 * message string 实际的控制台消息
 * line number 触发此控制台消息的源的行号
 * sourceId string 

54. wc.on('preload-error', (event, preloadPath, error) => {})
当预加载脚本 preloadPath 抛出未处理的异常error时发出。

55. wc.on('ipc-message', (event, channel, ...args) => {})
当渲染器进程通过ipcRenderer.send()发送异步消息时发出。

56. wc.on('ipc-message-sync', (event, channel, ...args) => {})
当渲染器进程通过ipcRenderer.sendSync() 发送同步消息时发出。

57. wc.on('preferred-size-changed', (event, preferredSize) => {})
当webContents首选大小更改时发出。仅当webPreferences.enablePreferredSizeMode 设置为 true时才会发出此事件。

58. wc.on('frame-created', (event, details) => {})
当 mainFrame、<iframe>或嵌套<iframe>在页面内加载时发出。

### 实例方法
1. contents.loadURL(url[, options])
在窗口中加载指定url
  * url
  * options
    * httpReferrer
    * userAgent
    * extraHeaders
    * postData
    * baseURLForDataURL
return Promise<void> 

2. contents.loadFile(filePath[, options])
在窗口中加载指定文件
  * filePath string
  * options object
    * query Record<string, string> 可选 
    * search string 可选
    * hash string 可选

3. contents.downloadURL(url, options)
无需导航即可启动url处的资源下载。session的will-download事件将被触发。
4. contents.getURL()
return string 当前网页的URL
5. contents.getTitle()
return string 当前网页的标题
6. contents.isDestroyed()
return boolean 网页是否被销毁
7. contents.close(opts)
 * opts 对象 可选
  * waitForBeforeUnload 布尔值-如果为true，则在关闭页面之前触发beforeunload时间。
关闭页面，类似window.close()。如果页面关闭成功，则webContents将被销毁并且不再可用。将发出destroyed事件。
8. contents.focus()
聚焦网页
9. contents.isFocused()
判断网页是否获得聚焦
10. contents.isLoading()
网页是否仍在加载资源
11. contents.isLoadingMainFrame()
main frame （不仅仅是iframe或其中的frame）是否仍在加载。
12. contents.isWaitingForResponse()
网页是否正在等待页面主资源的第一响应。
13. contents.stop()
停止任何挂起的导航
14. contents.reload()
重新加载当前网页
15. contents.reloadIgnoringCache()
重新加载当前页面并忽略缓存
16. contents.isCrashed()
判断渲染器进程是否崩溃
17. contents.forcefullyCrashRenderer()
强制终止当前托管此webContents的渲染器进程。这会导致render-process-gone事件一起发出。
调用此方法后，立即调用reload()将强制在新进程中进行重新加载。当该进程不稳定或不可用时，应该用此方法。如为了从unresponsive状态恢复:
```javascript
const win = new BrowserWindow()
win.webContents.on('unresponsive', () => {
  const { response } = await dialog.showMessageBox({
    message: 'App X has become unresponsive',
    title: 'Do you want to try forcefully reloading it?',
    buttons: ['OK', 'Cancel'],
    cancelId: 1
  })
  if (response === 0) {
    // 强制终止此渲染器进程
    win.webContents.forcefullyCrashRenderer()
    // 重新加载页面
    win.webContents.reload()
  }
})
```
18. contents.setUserAgent(userAgent)
 * userAgent string 
覆盖此网页的用户代理

19. contents.getUserAgent()
返回该网页的用户代理

20. contents.insertCSS(css[, options])
 * css 字符串
 * options 可选
   * cssOrigin string 可选 可以是user或author。设置插入样式表的级联起源。默认为'author'。
将CSS注入当前网页并返回插入样式表的唯一键
```javascript
const win = new BrowserWindow()
win.webContents.on('did-finish-load', () => {
  const key = await win.webContents.insertCSS('html, body { background-color: red; }')
  win.webContents.removeInsertedCSS(key) // 移除样式表
})
```
21. contents.removeInsertedCSS(key)
 * key 字符串
 return Promise<void> 是删除成功
从当前网页中删除插入的css。样式表由其键表示。

22. contents.executeJavaScript(code[, userGesture])
 * code 字符串
 * userGesture 布尔值 可选 默认为false
 return promise<any> 根据执行代码的结果resolve。如果执行结果返回某个值，则将该值resolve。否则将undefined resolve。

23. contents.excuteJavaScriptInIsolatedWorld(worldId, scripts[, userGesture])
  * worldId 整数 运行js的world的id。0是默认world，999是electron的contextIsolation 功能使用的世界。可以在此处提供任何整数。
  * scripts 字符串 要执行的js代码
  * userGesture 布尔值 可选 默认为false
  return Promise<any> 根据执行代码的结果resolve。如果执行结果返回某个值，则将该值resolve。否则将undefined resolve。

24. contents.setIgnoreMenuShortcuts(ignore)
 * ignore 布尔值
当此Web内容获得焦点时，忽略应用菜单快捷方式。

25. contents.setWindowOpenHandler(handler)
 * handler 函数
   * details object
     * url string
     * frameName string window.open()中提供的窗口名称。
     * features string window.open()中提供的窗口功能。
     * disposition string 可以是default、foreground-tab、background-tab、new-window、other。
     * referer Referer
     * postBody PostBody

26. contents.setAudioMuted(muted)
 * muted 布尔值 将当前网页的音频静音

27. contents.isAudioMuted()
 return boolean 当前网页的音频是否静音

28. contents.isCurrentlyAudible()
 return boolean 当前网页是否正在播放音频

29. contents.setZoomFactor(factor)
* factor 缩放系数。默认值1.0
指定缩放系数。缩放系数是缩放百分比除以100，因此300% = 3.0
该系数必须大于0.0

30. contents.getZoomFactor()
返回当前缩放系数。

31. contents.setZoomLevel(level)
level 数字-缩放级别 

32. contents.getZoomLevel()
返回number 当前的缩放级别

33. contents.setVisualZoomLevelLimits(minimumLevel, maximumLevel)
返回Promise<void> 设置最大和最小缩放级别
注: Electron中默认禁用视觉缩放。要启动, 需要调用此方法

**文本编辑相关**
34. contents.undo()
在网页中执行命令undo
35. contents.redo()
在网页中执行编辑命令redo
36. contents.cut()
在网页中执行编辑命令cut
37. contents.copy()
在网页中执行编辑命令copy
38. contents.centerSelection()
将当前文本选择在网页中居中
39. contents.copyImageAt(x, y)
将给定位置的图片复制到剪贴板
40. contents.paste()
在网页中执行编辑命令paste
41. contents.pasteAndMatchStyle()
在网页中执行编辑命令pasteAndMatchStyle
在构建富文本编辑器时，用户粘贴内容时，不希望引入不必要的格式，而只希望内容符合当前编辑框的样式。
在文本编辑区中自动清理或转换从外部应用程序（例如 Word、Excel 等）复制的格式化文本。
42. contents.delete()
在网页中执行编辑命令delete
43. contents.selectAll()
在网页中执行编辑命令selectAll
44. contents.unselect()
在网页中执行编辑命令unselect

45. contents.scrollToTop()
滚动到当前webContents的顶部
46. contents.scrollToBottom()
滚动到当前webContents的底部
47. contents.adjustSelection(options)
 * options object
   * start number 可选 当前选区起始位置的偏移量
   * end number 可选 当前选区结束位置的偏移量
调整焦点框中当前文本选择的起点和终点。负值会将所选内容移向文档开头的位置，正值移动到文档尾部。

48. contents.replace(text)
 * text string
在网页中执行编辑命令replace
49. contents.replaceMisspelling(text)
 * text string
在网页中执行编辑命令replaceMisspelling 
50. contents.insertText(text)
 * text string
 return Promise<void>
将text插入到焦点元素中。
51. contents.findInPage(text[, options])
 * text string 要搜索的内容，不能为空
 * options object
   * forward boolean 可选 默认为true。向前或向后搜索
   * findNext boolean 可选 默认为false 是否使用此请求开始新的文本查找会话。对于初始请求应为true，对于后续请求应为false。
   * matchCase boolean 可选 默认为false 搜索是否区分大小写。
return Number 用于请求的ID
启动请求查找网页中text的所有匹配项。请求的结果可以通过订阅'found-in-page'事件来获取。
52. contents.stopFindInPage(action)
 * action string 指定结束查找请求要执行的操作
  * clearSelection 清除当前的文本选择
  * keepSelection 转换为普通选择
  * activateSelection 聚焦并单击选择节点
停止查找网页中text的所有匹配项。

53. contents.capturePage([rect, opts])
 * rect Rect 可选 要捕获的页面区域
 * opts Object 可选
   * stayHidden 布尔值 可选- 保持页面隐藏而不是可见。默认为false
   * stayAwake 布尔值 可选- 保持页面唤醒而不是休眠。默认为false
return Promise<NativeImage>
捕获rect内页面的快照，省略rect将捕获整个页面。
54. contents.isBeingCaptured()
return boolean 该页面是否正在被捕获。当捕获计数器大于0时，返回true。

55. contents.getPrintersAsync()
获取系统打印机列表。
返回Promise<PrinterInfo[]>

56. contents.print([options],[callback])
 * options object 可选
   * silent boolean 可选- 不询问用户打印设置。默认为false。
   * printBackground boolean 可选- 是否打印网页的背景颜色和图片。默认为false。
   * deviceName string 可选- 设置要使用的打印机设备名称。必须是系统定义的名称，而不是‘friendly’名称。比如例如 'Brother_QL_820NWB' 而不是 'Brother QL-820NWB'。
   * color boolean 可选 设置打印的网页是彩色还是灰度。默认为true。
   * margins object 可选
     * marginType string 可选 可以是default、custom、none、printableArea。如果是custom需要进一步指定top\bottom\left\right
     * top number 可选 默认为0。打印网页的上边距（以像素为单位）
     * bottom number 可选 默认为0。打印网页的下边距（以像素为单位）
     * left number 可选 默认为0。打印网页的左边距（以像素为单位）
     * right number 可选 默认为0。打印网页的右边距（以像素为单位）
   * landscape boolean 可选- 是否以横向模式打印。默认为false。
   * scaleFactor number 可选 网页的比例因子
   * pagesPerSheet number 可选 每页打印的纸张数量。
   * collate boolean 可选- 网页是否需要整理
   * copies number 可选- 要打印的份数
   * pageRanges Object[] 可选 打印的页面范围。在macOS上仅支持一个范围。
    * from 数字 要打印的第一页的索引 从0开始
    * to 数字 要打印的最后一页的索引（包含） 从0开始
  * duplexMode string 可选 设置打印网页的双面模式。可以是simplex、shortEdge、longEdge
  * dpi Record<string, number> 可选
    * horizontal number 可选 水平dpi
    * vertical number 可选 垂直dpi
  * header 字符串 可选 页眉的内容
  * footer 字符串 可选 页脚的内容
  * pageSize string|Size 可选 打印的纸张大小. 
    可以是 A0、A1、A2、A3、A4、A5、A6、Legal、Letter、Tabloid 或包含 height 和 width 的对象。
 * callback function 可选
   * success boolean 表面打印调用是否成功
   * error string 打印失败回调的错误描述

57. contents.printToPDF(options) 将网页打印为PDF
 * options object
   * landscape boolean 可选- 是否以横向模式打印。true为横向，false为纵向。默认为false。
   * displayHeaderFooter boolean 可选- 是否显示页眉和页脚。默认为false。
   * printBackground boolean 可选- 是否打印网页的背景颜色和图片。默认为false。
   * scale number 可选 网页的比例因子。默认为1.0。
   * pageSize string|Size 可选 打印的纸张大小.
    可以是 A0、A1、A2、A3、A4、A5、A6、Legal、Letter、Tabloid 或包含 height 和 width 的对象。默认为Letter。
   * margin object 可选
     * top number 可选 默认为0。打印网页的上边距（以英寸为单位），默认为0.4英寸约等于1厘米
     * bottom number 可选 默认为0。打印网页的下边距（以英寸为单位）
     * left number 可选 默认为0。打印网页的左边距（以英寸为单位）
     * right number 可选 默认为0。打印网页的右边距（以英寸为单位）
   * pageRanges string 可选 要打印的页面范围。例如 '1-5, 8, 11-13'。默认为空字符串，打印所有页面
   * headerTemplate string 可选 打印标题的HTML模板。应该是有效的HTML标记
   * footerTemplate string 可选 打印页脚的HTML模板。与headerTemplate格式相同
   * preferCSSPageSize boolean 可选- 优先使用CSS中指定的页面大小。默认为false, 这种情况下，内容将缩放以适合纸张尺寸。
   * generateTaggedPDF boolean 可选 实验性 是否生产带标签的可访问的PDF。
   * generateDocumentOutline boolean 可选 实验性 是否从内容标题生产PDF内容大纲。默认为false。
返回Promise<Buffer> 使用生成的PDF数据进行解析。
如果网页中使用了@page CSS at规则，则landscape将被忽略。
```javascript
const fs = require('node:fs')
const os = require('node:os')
const path = require('node:path')

const pdfPath = path.join(os.homedir(), 'temp.pdf')
win.webContents.printToPDF({}).then(data => {
  fs.writeFile(pdfPath, data, err => {
    if (err) throw err
    console.log(`PDF saved successfully at ${pdfPath}`)
  })
}).catch(error => {
  console.error('Failed to create PDF:', error)
})
```

58. contents.addWorkSpace(path)
 * path string 
将路径添加到DevTools工作区。必须在devTools创建后使用

59. contents.removeWorkSpace(path)
 * path string
从DevTools工作区中删除路径。

60. contents.setDevToolsWebContents(devToolsWebContents)
 * devToolsWebContents WebContents
 使用 devToolsWebContents 作为目标WebContents来显示开发工具,比如可以在<webview>标签中显示开发工具。
61. contents.openDevTools([options]) 打开开发者工具
 * options object
  * mode string 打开具有置顶停靠状态的开发工具。可以是left、right、bottom、undocked、detach。默认为上次使用的底座状态。
  * activate boolean 可选 是否将打开的devTools窗口带到前台。默认为true。
  * title string 可选 打开的devTools窗口的标题。仅在undocked或detach模式下有效。
62. contents.closeDevTools()
关闭开发者工具。
63. contents.isDevToolsOpened()
return boolean 开发者工具是否打开。
64. contents.isDevToolsFocused()
return boolean 开发者工具是否获得焦点。
65. contents.getDevToolsTitle()
return string 开发者工具窗口的标题。仅在undocked或detach模式下打开，此信息可见。
66. contents.setDevToolsTitle(title)
 * title string
设置开发者工具窗口的标题。仅在undocked或detach模式下打开，此信息可见。
67. contents.toggleDevTools()
切换开发者工具。
68. contents.inspectElement(x, y)
 * x number
 * y number
在指定位置打开元素检查器。
69. contents.inspectSharedWorker()
打开共享工作线程上下文的开发者工具。
70. contents.inspectSharedWorkerById(workerId)
 * workerId number
71. contents.getAllSharedWorkers()
return SharedWorkerInfo[] id和url
72. contents.inspectServiceWorker()
打开服务工作线程上下文的开发者工具。
73. contents.send(channel, ...args)
 * channel string
 * args any[]
通过channel将异步消息连同参数一起发送到渲染器进程。
74. contents.sendToFrame(frameId, channel, ...args)
 * frameId number 要发送到的frame的id, 如果该frame与main frame位于不同的进程中，则为一对[processId, frameId]
 * channel string
 * args any[]
 发送消息到渲染进程的特定frame中。
 如果想要获取渲染器进程上下文的frameId，可以使用webFrame.routingId: 
 `require('electron').webFrame.routingId`
 还可以从主进程中所传入的IPC消息中读取frameId
 ```JavaScript
 ipcMain.on('ping', (event) => {
  // event.frameId
 })
```
75. contents.postMessage(channel, message[, transfer])
 * channel string
 * message any
 * transfer MessagePortMain[] 可选
 向渲染器进程发送一个消息。
 可以使用transfer将消息的所有权转移到渲染器进程。

 76. contents.enableDeviceEmulation(parameters)
 * parameters Object
  * screenPosition string 指定要模拟的屏幕类型。
    * desktop 桌面屏幕
    * mobile 移动屏幕类型
  * screenSize Size 设置模拟屏幕尺寸
  * viewPosition Point 将视图定位在屏幕上。
  * deviceScaleFactor number 设置设备比例因子。默认为0
  * viewSize Size 设置模拟视图大小
  * scale number 可选 设置模拟屏幕缩放比例。默认为1
使用给定参数，启用设备模拟
77. contents.disableDeviceEmulation()
禁用设备模拟
78. contents.sendInputEvent(event)
 * event InputEvent
将输入事件发送到页面。注意需要聚焦
79. contents.beginFrameSubscription([onlyDirty, ], callback)
 * onlyDirty boolean 可选 默认为false
 * callback function
    * image NativeImage 存捕获的帧
    * dirtyRect Rect 用于描述页面的哪一部分被重新绘制。如果为onlyDirty为true，则image将紧包含重绘区域。
开始订阅presentation事件和捕获帧。当presentation事件触发时，将调用callback。
80. contents.endFrameSubscription()
停止订阅presentation事件和捕获帧。
81. contents.startDrag(item)
 * item Object
  * file string 正在拖动的文件路径
  * files string[] 可选 正在拖动的文件路径(files 将覆盖file字段)
  * icon NativeImage|string 可选 拖动时显示的图标, 在macOS上，该图片必须非空。
82. contents.savePage(fullPath, saveType)
* fullPath string 文件绝对路径
* saveType string 保存类型
    * HTTPOnly 仅保存页面的HTML
    * HTMLComplete 保存完整的html页面
    * MHTML 将完整的html页面保存为MHTML文件
return Promise<void>
83. contents.showDefinitionForSelection() macOS
显示搜索页面上所选单词的弹出词典。
84. contents.isOffscreen()
return boolean 指示是否启用离屏渲染。
85. contents.startPainting()
如果离屏渲染已开启，且还未绘制，则开始绘制。
86. contents.stopPainting()
如果启用了离屏渲染并进行了绘制，则停止绘制。
87. contents.isPainting()
return boolean 指示是否正在进行离屏渲染。
88. contents.setFrameRate(fps)
 * fps number
如果启用了离屏渲染，则将帧率设置为指定数字。仅接受1到240之间的值。
89. contents.getFrameRate()
return number 当前的帧率。
90. contents.invalidate()
对该网页内容所在的窗口进行完全重绘。
如果启用了离屏渲染，则该帧无效并通过‘paint’事件生成一个新帧。
91. contents.getWebRTCIPHandlingPolicy()
return string 获取WebRTC IP处理策略。
92. contents.setWebRTCIPHandlingPolicy(policy)
 * policy string 指定WebRTC IP处理策略。
  * default 默认策略 公开用户的公共和本地IP。WebRTC有权枚举所有接口并绑定它们以发现公共接口。
  * default_public_interface_only 暴露用户的公共IP，但不暴露用户的本地IP。
  * default_public_and_private_interfaces 公开用户的公共和本地IP
  * disable_non_proxied_udp 不暴露公共或本地IP
设置WebRTC IP处理策略允许你控制通过WebRTC公开哪些IP
93. contents.getWebRTCUDPPortRange()
return Object
  * min number webrtc 应使用的最小udp端口号
  * max number webrtc 应使用的最大udp端口号
默认情况下值为{min: 0, max: 0}, 这对udp端口范围没有限制
94. contents.setWebRTCUDPPortRange(min, max)
 * min number
 * max number
设置WebRTC应使用的最小和最大UDP端口号。
95. contents.getMediaSourceId(requestWebContents)
 * requestWebContents WebContents 将Id注册到webContents
return string webContents流的标识符。
该标识符可以与navigator.mediaDevices.getUserMedia一起使用, 使用chromeMediaSource或tab。该标识符仅限于其注册的网页内容，且有效期仅为10s。
96. contents.getOSProcessId()
return number 相关渲染进程的操作系统pid
97. contents.getProcessId()
return number 相关渲染器的Chromium内部的pid。
98. contents.takeHeapSnapshot(filePath)
 * filePath string 输出快照文件的路径
return Promise<void> 快照是否创建成功。
拍摄V8堆快照并将其保存到filePath
99. contents.getBackgroundThrottling()
return boolean 当页面变为后台时，此webContents是否会限制动画和计时器。这会影响页面可见性API。
100. contents.setBackgroundThrottling(allowed)
 * allowed boolean 控制页面变为后台时是否限制动画和计时器。
101. contents.getType()
return string 此webContents的类型: backgroundPage、browserView、webview或offscreen、remote、window。
102. contents.setImageAnimationPolicy(policy)
 * policy string 控制图像动画的策略。
  * animate
  * animateOnce
  * noAnimation
设置此webContents的图片动画策略。该策略仅影响新图片。

### 实例属性
1. contents.ipc 只读
2. contents.audioMuted
表示此页面是否静音的boolean属性
3. contents.userAgent
表示此网页的用户代理
4. contents.zoomLevel
此webContent的缩放级别
5. contents.zoomFactor
此webContent的缩放因子
6. contents.frameRate 
页面的帧率值 仅当离屏渲染时适用。
7. contents.id 只读
表示此webContents的唯一ID。在整个Electron应用内都是唯一的。
8. contents.session 只读
表示此webContents的Session实例。
9. contents.navigationHistory 只读
返回NavigationHistory实例。
10. contents.hostWebContents 只读
可能拥有此WebContents的WebContents实例
11. contents.devToolsWebContents 只读
开发者工具的WebContents实例 用户不应该存储此对象，当开发者工具关闭时，它可能变为null。
12. contents.debugger 只读
返回此WebContents的Debugger实例
13. contents.backgroundThrottling
一个 boolean 属性，用于确定当页面变为后台时此 WebContents 是否会限制动画和计时器。
这也会影响页面可见性API。
14. contents.mainFrame 只读
WebFrameMain实例,表示页面frame层次结构的顶层frame
15. contents.opener 只读
webFrameMain，表示使用open()或通过使用目标属性导航链接来打开此webContents的框架





