const { session } = require('electron/main')

const sessionHandlers = {
  /**
   * 返回Session实例，当存在于partition相同的session时，将返回；否则将使用options创建新的session
   * 如果patition以'persist:' 开头，所有具有相同partition的页面，将使用同一个session
   * 如果没有'persist:'前缀, 该页面将使用内存会话
   * 如果partition为空，则使用默认会话
   * @param {*} partition 
   * @param {*} options 
   *  cache boolean 是否启用缓存
   * @returns 
   */
  'form-partition': (partition, options) => {
    return session.fromPartition(partition, options)
  },
  /**
   * 返回Session实例，使用绝对路径生成。如果不是绝对路径或者未空串，则会抛出异常
   * @param {*} path 
   * @param {*} options 
   * @returns 
   */
  'from-path': (path, options) => {
    return session.fromPartition(path, options)
  },
  'get-default-session': () => {
    return session.defaultSession
  },
  //-------------实例方法start----------------
  // Promise<Integer> 当前会话的缓存大小 字节数
  'get-cache-size': (session) => {
    return session.getCacheSize()
  },
  'clear-cache': (session) => {
    return session.clearCache() // Promise<void>
  },
  /**
   * 清除会话的所有缓存数据
   * @param {*} session 
   * @param {*} options 
   *  origin string 类似window.location.origin
   *  storages string[] 清除的存储类型, 可以是cookies、filesystem、indexdb、
   *      localstorage、shadercache、websql、serviceworkers、cachestorage。如果未指定，则清除所有存储
   *  quotas string[] 清除的配额类型，可以是temporary、syncable。如果未指定，则清除所有配额
   * @returns 
   */
  'clear-storage-data': (session, options) => {
    return session.clearStorageData(options) // Promise<void>
  },
  // 将任何未写入的DOMStorages数据写入磁盘
  'flush-storage-data': (session) => {
    return session.flushStorageData() // Promise<void>
  },
  //----------------------代理start---------------------
  // 设置代理，代理设置多种代理规则和绕过规则，方便灵活控制请求
  // 代理认证：如果代理需要认证，key通过webRequest.onBeforeRequest来添加认证头
  // config：ProxyConfig 代理配置
  'set-proxy': (session, config) => {
    return session.setProxy(config) // Promise<void>
  },
  'resolve-proxy': (session, url) => {
    return session.resolveProxy(url) // Promise<string>
  },
  // 返回Promise<void> 当重置代理服务的内部状态并重新应用最新的代理配置时
  'force-reload-proxy-config': (session) => {
    return session.forceReloadProxyConfig() // Promise<void>
  },
  //----------------------代理end---------------------

  // 设置下载保存目录。默认情况下，下载目录将是对应文件夹下的Downloads文件夹
  'set-download-path': (session, path) => {
    session.setDownloadPath(path)
  },
  // 使用session的给定配置模拟网络
  'enable-network-emulation': (session, options) => {
    session.enableNetworkEmulation(options)
  },
  // options: { url, numSockets }
  'preconnect': (session, options) => {
    session.preconnect(options)
  },
  // 关闭所有连接
  'close-all-connections': (session) => {
    session.closeAllConnections()
  },
  // input: string | GlobalRequest
  // init: RequestInit
  // 返回Promise<GlobalResponse>
  // 使用Chrome的网络堆栈发送请求。与node中的fetch不同，后者使用Node.js的HTTP堆栈
  // net.fetch 发出的请求可以发送到定制协议以及file：并将触发webRequest处理程序。
  // net.fetch 不支持data: 或 blob: 方案
  'fetch': (session, input, init) => {
    return session.fetch(input, init)
  },
  /**
   * 设置证书的认证proc 
   * @param {*} session 
   * @param {*} proc Function(request, callback) | null
   *  request
   *     1. hostname
   *     2. certificate 证书
   *     3. validatedCertificate 证书
   *     4. isIssuedByKnownRoot 布尔值，如果Chromium 将CA识别为标准根，则为true
   *     5. verificationResult 证书验证结果。可信则为OK，否则类似CERT_REVOKED的错误
   *     6. errorCode 错误代码
   *   callback
   *     1. verificationResult 证书验证结果, 整数。
   *          0: 表示成功并禁用证书透明度验证。
   *          -2: 表示失败。
   *          -3: 使用来自Chromium的验证结果
   *  设置session的证书验证proc。每当请求服务器证书验证时，将调用proc(request, callback)。调用callback(0)
   *  接受整数，调用callback(-2)拒绝证书。
   */ 
  'set-certificate-verify-proc': (session, proc) => { 
    session.setCertificateVerifyProc(proc)
  },
  /**
   * 设置可用于响应session权限请求的处理程序。调用callback(true)允许请求，callback(false)拒绝请求
   * 大多数webApi都会进行权限检查，然后在检查被拒绝时发出权限请求。
   * @param {*} session 
   * @param {*} handler function(webContents, permission, callback, details)
   * webContents WebContents 请求许可的WebContents。如果请求来自subframe，应该是用requestUrl检查请求源
   * permission string 请求的权限类型
   *  1. clipboard-read 请求从粘贴板中读取内容的权限
   *  2. clipboard-sanitized-write 请求写入粘贴板的权限
   *  3. display-capture 请求通过Screen Capture API捕获屏幕的权限
   *  4. fullscreen 请求进入全屏模式的权限
   *  5. geolocation 请求通过Geolocation API 获取用户地理位置的权限
   *  6. idel-detection 请求通过Idle Detector API 获取用户空闲状态的权限
   *  7. media 请求访问媒体设备，如摄像头、麦克风和扬声器。
   *  8. mediaKeySystem 请求访问受DRM保护的内容
   *  9. midi 请求MIDI权限通过web MIDI API访问
   *  10. midiSysex
   *  11. notifications 请求创建通知并能使用Notification API在用户的系统托盘中显示它们
   *  12. pointerLock 请求通过Pointer Lock API直接将鼠标移动解释为输入法
   *  13. keyboardLock 请求通过Keyboard Lock API捕获物理键盘上任意或所有按键的按键操作。
   *  14. openExternal 请求通过openExternal API打开外部链接的权限
   *  15. speaker-selection 请求通过speaker-selection permissions policy 枚举和选择音频输出设备
   *  16. storage-acccess 允许在第三方上下文中加载的内容使用Storage Access API访问第三方上下文cookie。
   *  17. top-level-storage-access
   *  18. window-management 使用getScreenDetails Api请求访问枚举屏幕
   *  19. unknown 无法识别的权限请求
   *  20. fileSystem 通过文件系统API 请求访问读、写和文件管理功能。
   * callback
   *  permissionGranted boolean 允许或拒绝该权限
   *  details PermissionRequest | FileSystemPermissionRequest | MediaAccessPermissionRequest | OpenExternalPermissionRequest
   * 
   * 
   */
  'set-permission-request-handler': (session, handler) => {
    session.setPermissionRequestHandler(handler)
  },
  /**
   * 设置可用于响应session权限检查的处理程序。返回true将允许该权限，false将拒绝。
   * @param {*} session 
   * @param {*} handler function(webContents, permission, requestingOrigin, details)
   *  webContents WebContents 发出请求的WebContents。
   *  permission string 请求的权限类型
   *     1. clipboard-read
   *     2. clipboard-sanitized-write
   *     3. geolocation
   *     4. fullscreen
   *     5. hid
   *     6. idle-detection
   *     7. media
   *     8. mediaKeySystem
   *     9. midi
   *     10. midiSysex
   *     11. notifications
   *     12. openExternal
   *     13. pointerLock
   *     14. serial
   *     15. storage-access
   *     16. top-level-storage-access
   *     17. usb
   *  requestingOrigin string 权限检查的原始URL
   *  details 某些属性仅适用于某些权限类型
   *     1. embeddingOrigin string
   *     2. securityOrigin string
   *     3. mediaType
   *     4. rquestingUrl
   *     5. isMainFrame boolean
   * 
   * setPermissionCheckHandler 与 setPermissionRequestHandler 的区别和联系
   * 联系：两者都是权限管理，前者更多的是判断权限是否满足，后者是实际的权限请求和响应。
   * 在某些情况下，可以先使用前者进行权限检查，如果没有权限，可以通过后者请求权限
   * 区别：setPermissionCheckHandler是检查权限是否允许，在执行某个操作执行之前判断是否可以进行
   * setPermissionRequestHandler 是处理权限请求的回调函数。用与响应具体的权限请求并执行响应的操作
   * 
   */
  'set-permission-check-handler': (session, handler) => {
    session.setPermissionCheckHandler(handler)
  },
  /**
   * 
   * @param {*} session 
   * @param {*} handler  function(webContents, request, callback) | null
   *    webContents WebContents 发出请求的WebContents。
   *    request
   *     1. frame webFrameMain 请求访问media的frame
   *     2. securityOrigin string 发出请求的页面的来源
   *     3. videoRequested Boolean 如果是web内容请求视频流， 则为true
   *     4. audioRequested Boolean 如果是web内容请求音频流，则为true
   *     5. userGesture Boolean 触发此请求时用户手势是否处于活动态
   *    callback
   *     1. streams 
   *         video Object | webFrameMain(可以从request.frame中获取) 视频流
   *           id string 视频流的ID 通常来自桌面捕获源对象
   *           name string 视频流的名称
   *         audio 可以是 loopback或者loopbackWithMute。指定环回设备将捕获系统音频。目前仅在windows上支持。如果指定了webFrameMain，将从该frame中捕获音频。
   *         enableLocalEcho boolean 如果audio是webFrameMain并且设置为true，则音频的本地播放将不会静音。
   * @param {*} options macOS 实验版
   *   useSystemPicker boolean 使用可用的原生系统选择器，为true。默认为false。
   *  
   * 传递null而不是函数将会重置为默认状态
   */
  'set-display-media-request-handler': (session, handler, options) => {
    session.setDisplayMediaRequestHandler(handler, options)
  },
  /**
   * 设置可用于响应session的设备权限检查的处理程序。返回true将允许设备被允许，false建个拒绝。要清除处理程序，传递null
   * @param {*} session 
   * @param {*} handler function(details) | null
   *  details
   *     1. devicetype string 请求权限的设备类型可以是hid、serial、usb
   *     2. origin string 设备权限检查的原始URL
   *     3. device HID 设备 | SerialPort | USB 设备 正在请求权限的设备
   */
  'set-device-permission-handler': (session, handler) => {
    session.setDevicePermissionHandler(handler)
  },
  /**
   * 设置可用于覆盖哪个USB类受到保护。处理程序的返回值是USB类的字符串数组，将其视为受保护的。如果返回一个空数组，则将允许所有的USB类
   * @param {*} session 
   * @param {*} handler function(details) | null
   *   details
   *     1. protectedClasses string[] 受保护的USB类的列表. 可能包括：
   *        1. audio
   *        2. audio-video
   *        3. hid
   *        4. mass-storage
   *        5. smart-card
   *        6. video
   *        7. wireless
   * 
   */
  'set-usb-protected-classes-handler': (session, handler) => {
    session.setUsbProtectedClassesHandler(handler)
  },
  /**
   * 设置处理程序，以响应蓝牙配对请求，可以在配对前需要额外验证的设备。
   * 仅windows和linux支持。macOS不需要处理程序，因为macOS会自动处理配对请求
   * @param {*} session 
   * @param {*} handler function(details, callback) | null
   *  details
   *   1. deviceId string 
   *   2. pairingKind string 请求的配对提示类型：confirm | confirmPin | providePin
   *   3. frame WebMainFrame
   *   4. pin string  用于验证pairingKind是否为confirmPin的pin值
   *  callback
   *   response Object
   *    1. confirmed boolean 如果取消对话框，则应传入false。如果pairingKind为confirm或confirmPin，则该值应指示配对是否已确认。
   *    如果paringKind为providePin，则该值应为true.
   */
  'set-bluetooth-pairing-handler': (session, handler) => {
    session.setBluetoothPairingHandler(handler)
  },
  // 清除主机解析器缓存
  'clear-host-resolver-cache': (session) => {
    session.clearHostResolverCache()
  },
  // 动态设置是否始终发送HTTP NTLM 或协商身份验证的凭据
  // domains string 启用集成身份验证的服务器的逗号分割串
  'allow-ntlm-credentials-for-domain': (session, domains) => {
    session.allowNTLMCredentialsForDomain(domains)
  },
  // 覆盖此会话的用户代理字符串和接受语言
  // acceptLanguages 必须是逗号分隔的语言代码有序列表，例如 "en-US,fr,de,ko,zh-CN,ja"
  'set-user-agent': (session, userAgent, acceptLanguages) => {
    session.setUserAgent(userAgent, acceptLanguages)
  },
  // 会话是否是持久会话
  // BrowserWindow的默认webContents会话时持久的。从partition创建会话时，前缀为persist:会话时持久的，其他会话将是临时的。
  'is-persistent': (session) => {
    return session.isPersistent()
  },
  'get-user-agent': (session) => {
    return session.getUserAgent()
  },
  // 设置会话的ssl配置。
  // config { minVersion, maxVersion, disabledCipherSuites }
  // minVersion: 连接到远程服务器时允许的最低SSL版本，默认为tls1 可以是tls1、tls1.1、tls1.2、tls1.3
  // maxVersion: 连接到远程服务器时允许的最高SSL版本，默认为tls1.3 可以是tls1.2、tls1.3
  // disabledCipherSuites: 禁用的cipherSuites，默认为空数组。
  'set-ssl-config': (session, config) => { 
    session.setSSLConfig(config)
  },
  // identifier string 有效的UUID
  'get-blob-data': (session, identifier) => {
    return session.getBlobData(identifier)
  },
  // options headers HTTP请求头
  // 启动url处资源的下载。API将生成可通过will-download时间访问的downloadItem对象
  // 与webContents.downloadURL 不同，这不会执行与页面来源相关的任何安全检查
  'download-url': (session, url, options) => {
    return session.downloadURL(url, options)
  },
  // 允许从之前的session恢复cancelled或interrupted的下载。仅当在downloadItem上调用resumeAPI才会开始下载。
  'create-interrupted-download': (session, options) => {
    return session.createInterruptedDownload(options)
  },
  // Promise<void> 清除会话的身份验证缓存
  'clear-auth-cache': (session) => {
    return session.clearAuthCache()
  },
  // 添加预加载脚本 preloads string[] 预加载脚本的绝对路径数组
  'set-preloads': (session, preloads) => {
    session.setPreloads(preloads)
  },
  'get-preloads': (session) => {
    return session.getPreloads()
  },
  // path string 存储渲染器生成的v8 JS代码缓存的绝对路径
  // 设置存储本地会话生成的JS 代码缓存的目录。如果无法创建目录，则不会使用代码缓存，且与代码缓存相关的所有操作都将在运行时失败。
  // 默认情况下，该目录将为相应用户数据文件夹的code cache
  'set-code-cache-path': (session, path) => {
    session.setCodeCachePath(path)
  },
  // 删除代码缓存
  // options { urls: string[] } 需要删除生成代码缓存的资源对应的url数组。如果列表为空，则缓存目录中的所有条目都将被删除。
  'clear-code-caches': (session, options) => { 
    session.clearCodeCaches(options)
  },
  // 设置是否启用内置拼写检查器
  'set-spell-checker-enabled': (session, enabled) => {
    session.setSpellCheckerEnabled(enabled)
  },
  'is-spell-checker-enabled': (session) => {
    return session.isSpellCheckerEnabled() // 是否启用内置拼写检查器
  },
  'set-spell-checker-languages': (session, languages) => {
    session.setSpellCheckerLanguages(languages) // 用于启用拼写检查器的语言代码数组，在macos上，此API无效，系统自动检查。
  },
  'get-spell-checker-languages': (session) => {
    return session.getSpellCheckerLanguages() // 返回用于启用拼写检查器的语言代码数组
  },
  // 默认情况下，electron从chromiumCDN下载hunspell词典。mac上，使用系统拼写检查器，因此不下载任何字典文件，在macos上无操作。
  'set-spell-checker-dictionary-download-url': (session, url) => {
    session.setSpellCheckerDictionaryDownloadURL(url) // 设置拼写检查器字典下载URL
  },
  'add-word-to-spell-checker-dictionary': (session, word) => {
    session.addWordToSpellCheckerDictionary(word) // 添加单词到拼写检查器字典
  },
  'list-word-in-spell-checker-dictionary': (session) => {
    return session.listWordsInSpellCheckerDictionary() // 返回拼写检查器字典中的单词数组
  },
  'remove-word-from-spell-checker-dictionary': (session, word) => {
    session.removeWordFromSpellCheckerDictionary(word) // 从拼写检查器字典中删除单词
  },
  // path string 包含解压的Chrome扩展程序的目录路径
  // options { allowFileAccess: boolean } 是否允许扩展访问文件系统
  // Electron 不支持所有Chrome扩展API，不支持将扩展加载到内存中（非持久）会话中，并且会引发错误
  'load-extension': (session, path, options) => {
    return session.loadExtension(path, options) // Promise<Extension>
  },
  // 卸载扩展
  'remove-extension': (session, extensionId) => {
    return session.removeExtension(extensionId) // Promise<void>
  },
  'get-extension': (session, extensionId) => {
    return session.getExtension(extensionId) // Extension 具有给定ID的已加载扩展
  },
  'get-all-extensions': (session) => {
    return session.getAllExtensions() // Extension[] 返回所有已加载的扩展
  },
  'get-storage-path': (session) => {
    return session.getStoragePath() // string|null 返回会话在磁盘中存储的数据的绝对路径。如果是内存会话，则为null
  },
  /**
   * 清除各种类型数据
   * @param {*} session 
   * @param {*} options Object
   *  dataTypes: string[] 要清除的数据类型数组，默认删除所有
   *   1. backgroudFetch 后台获取
   *   2. cache 缓存
   *   3. cookies cookies
   *   4. downloads 下载
   *   5. fileSystems 文件系统
   *   6. indexedDB indexdb
   *   7. localStorage localstorage
   *   8. serviceWorkers serviceworkers
   *   9. webSQl websql 
   *  origins string[] 仅从这些源清除数据。不能与excludeOrigins一起使用
   *  excludeOrigins string[] 从这些源中排除数据。不能与origins一起使用
   *  avoidClosingConnections boolean 跳过删除会关闭当前网络连接的cookie。默认为false
   *  originMatchingMode string 匹配模式，将数据与源匹配的行为
   *    1. third-parties-included （默认）在第一方上下文中，存储与源匹配；在第三方上下文中，存储与顶层站点匹配。
   *    2. origin-in-all-contexts 在所有上下文中，存储仅与源匹配
   * @returns 
   */
  'clear-data': (session, options) => {
    return session.clearData(options) // Promise<void> 清除会话的所有数据
  },
  // -----------------实例方法end----------------
}
function registeSessionEvents(session) {
  /**
   * item: DownloadItem
   * 当Electron即将下载webContents中的item时发出
   */
  session.on('will-download', (event, item, webContents) => {
    console.log('will-download', item, webContents)
  })

  //---------------扩展start------------------
  // 加载扩展后发出 Session.loadExtension 加载扩展会发出
  session.on('extension-loaded', (event, extension) => {
    console.log('extension-loaded', extension)
  })
  // 卸载扩展后发出, 当调用 Session.removeExtension 时会发生这种情况。
  session.on('extension-unloaded', (event, extension) => {
    console.log('extension-unloaded', extension)
  })

  // 加载扩展程序并初始化所有必要的浏览器状态以支持扩展程序后台页面的启动后发出
  session.on('extension-ready', (event, extension) => {
    console.log('extension-ready', extension)
  })
  // -----------------扩展end----------------

  /**
   * 当访问用户的敏感区域（如系统文件夹）等，os可能会要求用户授权访问
   * details
   *  origin string 访问源
   *  isDirectory boolean 是否为目录
   *  path 试图访问的被阻止的路径
   * callback
   *  action string 由于限制路径访问而采取的操作
   *   allow 允许访问path
   *   deny 拒绝访问path，并触发AbortError
   *   tryAgain 打开一个新的文件选择器并允许用户选择另一个路径
   */
  session.on('file-system-access-restricted', (event, details, callback) => {
    console.log('file-system-access-restricted', details)
     // callback('deny')
  })
  // 当渲染进程请求预连接到某个URL时发出，通常是资源提示
  session.on('preconnect', (event, preconnectUrl, allowCredentials) => {
    console.log('preconnect', preconnectUrl, allowCredentials)
  })

  // -------------------spellcheck start-----------------------
  // 当hunspell字典文件成功初始化时发出
  session.on('spellcheck-dictionary-initialized', (event, languageCode) => {
    console.log('spellcheck-dictionary-initialized', languageCode)
  })
  // 当hunspell字典文件开始下载时发出
  session.on('spellcheck-dictionary-download-begin', (event, languageCode) => {
    console.log('spellcheck-dictionary-download-begin', languageCode)
  })
  // 当hunspell字典文件下载成功时发出
  session.on('spellcheck-dictionary-download-success', (event, languageCode) => {
    console.log('spellcheck-dictionary-download-success', languageCode)
  })
  // 当hunspell字典文件下载失败时发出
  session.on('spellcheck-dictionary-download-failure', (event, languageCode) => {
    console.log('spellcheck-dictionary-download-failure', languageCode)
  })
  // -------------------spellcheck end-----------------------

  /**
   * 当调用navigator.hid.requestDevice()时需要选择HID设备时发出。应当调用callback并选择deviceId。
   * 不向callback传递deviceId将取消请求。
   * 可以使用ses.setPermissionCheckHandler(handler)和ses.setDevicePermissionHandler(handler)进一步管理hid的权限
   * details
   *    deviceList HIDDevice数组
   *    frame WebFrameMain
   * callback
   *  deviceId string 选择的设备ID
   * 
   */
  session.on('select-hid-device', (event, details, callback) => {
    console.log('select-hid-device', details)
  })

  // 在select-hid-device中的回调之前有新设备可用，则在navigator.hid.requestDevice()后发出
  session.on('hid-device-added', (event, details) => {
    console.log('hid-device-added', details)
  })

  // 在select-hid-device中的回调之前有设备被移除，则在navigator.hid.requestDevice()后发出
  session.on('hid-device-removed', (event, details) => {
    console.log('hid-device-removed', details)
  })

  // 调用HIDDevice.forget()后发出。 当使用setDevicePermissionHandler(handler)时，此事件可用于帮助维护权限的持久存储
  session.on('hid-device-revoked' , (event, details) => {
    console.log('hid-device-revoked', details)
  })

  // 当调用navigator.serial.requestPort()时需要选择串口时发出。应当调用callback并选择portId。
  session.on('select-serial-port', (event, portList, webContents, callback) => {
    console.log('select-serial-port', portList)
  })

  // 在select-serial-port中的回调之前有新串口可用，则在navigator.serial.requestPort()后发出
  session.on('serial-port-added', (event, port, webContents) => {
    console.log('serial-port-added', port)
  })

  // 在select-serial-port中的回调之前有串口被移除，则在navigator.serial.requestPort()后发出
  session.on('serial-port-removed', (event, port, webContents) => {
    console.log('serial-port-removed', port)
  })

  // 调用SerialPort.forget()后发出。 当使用setDevicePermissionHandler(handler)时，此事件可用于帮助维护权限的持久存储
  // details { port, frame, origin } 
  session.on('serial-port-revoked', (event, details) => {
    console.log('serial-port-revoked', details)
  })

  // 当调用navigator.usb.requestDevice()时需要选择USB设备时发出。应当调用callback并选择deviceId。
  session.on('select-usb-device', (event, details, callback) => { 
    console.log('select-usb-device', details)
  })
  // 在select-usb-device中的回调之前有新USB设备可用，则在navigator.usb.requestDevice()后发出
  session.on('usb-device-added', (event, device, webContents) => {
    console.log('usb-device-added', device)
  })
  // 在select-usb-device中的回调之前有USB设备被移除，则在navigator.usb.requestDevice()后发出
  session.on('usb-device-removed', (event, device, webContents) => {
    console.log('usb-device-removed', device)
  })
  // 调用USBDevice.forget()后发出。 当使用setDevicePermissionHandler(handler)时，此事件可用于帮助维护权限的持久存储
  session.on('usb-device-revoked', (event, details) => {
    console.log('usb-device-revoked', details)
  })
}