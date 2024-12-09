const { app } = require('electron/main')
function registerAppEvents() {
  /**
   * 当所有窗口都关闭时触发。
   * 注意，如果是cmd+Q 或者app.quit()退出的话,electron会关闭所有窗口，发出will-quit事件，但不会触发这个事件。
   */
  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })

  /**
   * 在开始关闭窗口之前触发。
   * 注意：
   * 1. 如果是由autoUpdater.quitAndInstall()触发的退出，则在所有窗口上发出close事件并关闭他们之后，会发出before-quit事件。
   * 2. 在windows上，如果因为系统原因而关闭应用程序，不会触发这个事件。
   */
  app.on('before-quit', (event) => {
    console.log('before-quit')
  })

  /**
   * 当所有窗口都已关闭并且应用即将退出时触发。
   * 注意：
   * 1. 在windows上，如果因为系统原因而关闭应用程序，不会触发这个事件。
   */
  app.on('will-quit', (event) => {
    console.log('will-quit')
  })

  /**
   * 当应用退出时触发。
   * 1. 在windows上，如果因为系统原因而关闭应用程序，不会触发这个事件。
   */
  app.on('quit', (event, exitCode) => {
    console.log('quit')
  })
  /**
   * 当用户想要使用应用程序的文件打开时触发。
   * 注意：
   * 1. 当文件被拖放到扩展坞上并且应用尚未运行时，也会发出open-file事件，可能在read事件之前
   * 2. 在windows上，必须解析process.argv，才能获取文件路径
   */
  app.on('open-file', (event, path) => {
    console.log('open-file')
  })
  
  /**
   * 当browserWindow失去焦点时触发。
   */
  app.on('browser-window-blur', (event, window) => {
    console.log('browser-window-blur')
  })

  /**
   * 当browserWindow获得焦点时触发。
   */
  app.on('browser-window-focus', (event, window) => {
    console.log('browser-window-focus')
  })


  /**
   * 当browserWindow被创建时触发。
   */
  app.on('browser-window-created', (event, window) => {
    console.log('browser-window-created')
  })

  /**
   * 当webcontents被创建时触发。
   */
  app.on('web-contents-created', (event, contents) => {
    console.log('web-contents-created')
  })

  /**
   * 当无法验证 url 的 certificate 时发出，
   * 要信任该证书，应该阻止 event.preventDefault() 的默认行为并调用 callback(true)。
   */
  app.on('certificate-error', (event, webContents, url, error, certificate, callback, isMainFrame) => {
    console.log('certificate-error')
  })

  /**
   * 请求客户端证书时触发。
   * url 对应于请求客户端证书的导航条目，而 callback 可以使用从列表中筛选出的条目来调用。
   * 使用 event.preventDefault() 可防止应用使用存储中的第一个证书。
   */
  app.on('select-client-certificate', (event, webContents, url, list, callback) => {
    console.log('select-client-certificate')
  })

  /**
   * 当 webContents 或 实用程序流程 想要进行基本身份验证时发出。
   * 默认行为是取消所有身份验证。
   * 要覆盖此设置，你应该阻止 event.preventDefault() 的默认行为并使用凭据调用 callback(username, password)。
   */
  app.on('login', (event, webContents, authenticationResponseDetails, authInfo, callback) => {
    console.log('login')
  })

  /**
   * 每当GPU信息更新时触发
   */
  app.on('gpu-info-update', (event, updatedInfo) => {
    console.log('gpu-info-update')
  })

  /**
   * 当渲染进程意外消失时触发。通常是因为渲染进程崩溃或被杀死。
   */
  app.on('render-process-gone', (event, webContents, details) => {
    console.log('render-process-gone')
  })

  /**
   * 当子进程意外消失时触发。通常因为子进程崩溃或被杀死。不包括渲染进程。
   */
  app.on('child-process-gone', (event, details, reason, exitCode, serviceName, name) => {
    console.log('child-process-gone')
  })

  /**
   * 当chrome辅助功能支持状态更改时触发。比如启用或禁用屏幕阅读器时。
   */
  app.on('accessibility-support-changed', (event, accessibilitySupportEnabled) => {
    console.log('accessibility-support-changed')
  })

  /**
   * 当electron创建一个新的session时触发。
   */
  app.on('session-created', (event, session) => {
    console.log('session-created')
  })

  /**
   * 当执行第二个实例并调用 app.requestSingleInstanceLock() 时触发。
   */
  app.on('second-instance', (event, commandLine, workingDirectory, additionalData) => {
    console.log('second-instance')
  })
}

function registerAppEventsInWin() {

}
function registerAppEventsInMac() {
    /**
   * 仅macOS
   * 当用户想要打开url时触发。
   * 这里需要用时，请进一步查阅相关文档。
   */
    app.on('open-url', (event, url) => {
      console.log('open-url') 
    })
  
    /**
     * 仅macOS
     * 当应用程序被激活时触发。
     * 比如：
     * 1. 首次启动应用
     * 2. 在应用已经运行时尝试重新启动应用
     * 3. 单击应用的停靠栏或者任务栏图标
     */
    app.on('activate', (event, hasVisibleWindows) => {
      console.log('activate')
    })
  
    /**
     * 仅macOS
     * 当应用程序被激活时触发。每次应用变为活动状态时都会发出此事件。
     * 不仅仅是点击docker图标，或者任务栏图标，或者点击应用的菜单; 当用户通过macOS应用切换器切换到应用时，也会发出此事件。
     */
    app.on('did-become-active', (event) => {
      console.log('did-become-active')
    })
  
    /**
     * 仅macOS
     * 当应用不再活动且没有焦点时触发。
     * 比如：
     * 1. 单击另一个应用
     * 2. 或使用macOS系统切换到其他应用
     */
    app.on('did-resign-active', (event) => {
      console.log('did-resign-active')
    })
  
    /**
     * 仅macOS
     * 当用户单击原生macOS新选项卡按钮时触发。仅当当前BrowserWindow具有tabbingIdentifier时,
     * 新选项卡按钮才可见。
     */
    app.on('new-window-for-tab', (event) => {
      console.log('new-window-for-tab')
    })
  
    /**
     * 仅macOS
     * 使用时，请进一步查阅相关文档。
     */
    app.on('continue-activity', (event, type, userInfo, details) => {
      console.log('continue-activity')
    })
  
    /**
     * 仅macOS
     * 使用时，请进一步查阅相关文档。
     */
    app.on('will-continue-activity', (event, type) => {
      console.log('will-continue-activity')
    })
  
    /**
     * 仅macOS
     * 使用时，请进一步查阅相关文档。
     */
    app.on('continue-activity-error', (event, type, error) => {
      console.log('continue-activity-error')
    })
  
    /**
     * 仅macOS
     * 使用时，请进一步查阅相关文档。
     */
    app.on('activity-was-continued', (event, type, userInfo) => {
      console.log('activity-was-continued')
    })
  
    /**
     * 仅macOS
     * 使用时，请进一步查阅相关文档。
     */
    app.on('update-activity-state', (event, type, userInfo) => {
      console.log('update-activity-state')
    })
}

const appHandlers = {
  'app-quit': () => {
    app.quit()
  },
  'app-exit': (code = 0) => {
    app.exit(code) // 所有窗口将立即关闭，无需询问用户，且不会触发before-quit和will-quit事件
  },
  // 重新启动应用程序, 默认情况下新实例与原始实例具有相同的工作目录和命令行参数。
  // 当指定了args时, args将作为命令行参数传递。当指定 execPath 时，重新启动时将执行 execPath 而不是当前应用。
  // 注意：该方法执行时不会退出应用，必须调用后再调用app.quit()或app.exit()才能重启应用
  'app-relaunch': ({ args, execPath } = {}) => {
    app.relaunch() 
    app.exit(0)
  },
  'app-is-ready': () => {
    return app.isReady()
  },
  'app-when-ready': () => {
    return app.whenReady() // 返回一个Promise
  },
  'app-focus': ({ steal } = {}) => {
    // steal: Boolean macOS - 当为 true 时，使其成为活动应用。
    // 在linux和windows上，会使第一个窗口聚焦
    return app.focus()
  },
  /**
   * 设置或创建应用程序的日志文件夹的路径。路径是绝对路径。
   * 如果不带path, mac上默认是 ~/Library/Logs/{app name}，windows、linux上默认是userData目录
   * @param {*} path 
   */
  'app-setAppLogsPath': (path) => {
    app.setAppLogsPath(path)
  },
  'get-app-path': () => {
    return app.getAppPath() // 返回应用程序的目录
  },
  /**
   * @param {*} name 
   * name: String
   * 1. appData - 用户应用数据目录
   * 2. userData - 用户数据目录，用于存储应用配置文件的目录
   * 3. sessionData - 存放Session生成的数据的目录。如localStorage、cookies、磁盘缓存
   * 、网络状态、devtools等文件。默认情况下，指向userData目录, 建议将次目录设置到其他位置，防止污染userData目录
   * 4. temp - 临时文件目录
   * 5. exe - 当前的可执行文件
   * 6. module libchromiumcontent库
   * 7. desktop - 用户桌面目录
   * 8. documents - 用户"我的文档"目录
   * 9. downloads - 用户下载目录
   * 10. music - 用户音乐目录
   * 11. pictures - 用户图片目录
   * 12. videos - 用户视频目录
   * 13. recent - 用户最近访问的文件目录(仅windows)
   * 14. logs - 应用程序日志目录
   * 15. crashDumps - 应用程序崩溃转储目录
   * @returns 
   */
  'get-path': (name) => {
    return app.getPath(name) // 返回特定系统目录的路径
  },
  /**
   * 获取路径的关联图标
   * @param {*} app 
   * @param {*} path 
   * @param {*} options 
   * @returns Promise<NativeImage> - 包含图标的NativeImage实例
   * 在windows上，有2种图标
   * 1. 与某些文件扩展名关联的图标， 如.mp3、.png等
   * 2. 文件本身内的图标，如exe、dll、ico等
   * 在linux和macos上，图标取决于文件MIME类型关联的应用
   */
  'app-getFileIcon': (path, options) => {
    return app.getFileIcon(path, options) 
  },
  // 将path覆盖到与name关联的特定目录。如果路径不存在，则抛错，在这种情况下应该使用fs.mkdirSync创建目录
  // 只能覆盖app.getPath中定义的name的路径
  'app-setPath': (name, path) => {
    app.setPath(name, path)
  },
  'get-app-version': () => {
    return app.getVersion() // 返回应用程序的版本，从package.json中获取
  },
  // 返回应用程序的名称，从package.json中获取, 通常是一个小写名称
  // 还可以指定productName(全大写名称)，如果指定了productName，返回productName
  'get-app-name': () => {
    return app.getName() 
  },
  'app-getLocale': () => {
    return app.getLocale() // 返回当前用户的区域设置，必须在ready事件后调用
  },
  'app-get-locale-country-code': () => {
    return app.getLocaleCountryCode() // 返回当前用户的国家代码，必须在ready事件后调用
  },
  'get-system-locale': () => {
    return app.getSystemLocale() // 返回当前系统的区域设置
  },
  // 此 API 可用于确定应用以何种语言渲染等目的。
  // 返回当前系统的首选语言
  'get-preferred-system-languages': () => {
    return app.getPreferredSystemLanguages()
  },
  'app-add-recent-document': (path) => {
    app.addRecentDocument(path) // 将path添加到最近的文档列表中，该列表由系统管理。（windows:任务栏，mac：dock菜单）
  },
  'app-clear-recent-documents': () => {
    app.clearRecentDocuments() // 清除最近文档列表
  },
  /**
   * 将当前应用程序设置为URI协议的默认处理程序。
   * 注册后，所有带有 your-protocol:// 的链接都将使用当前可执行文件打开。
   * 整个链接（包括协议）将作为参数传递给你的应用。
   * 1. 在macOS上，只能注册已已添加到应用的info.plist文件中的协议，且不能再运行时修改，
   * 但可以在构建期间通过electron forge、electron packager或使用文本编辑器修改info.plist文件。
   * 2. 该api在在内部使用windows注册表
   * 
   * @param {*} app 
   * @param {*} protocol 
   * @param {*} path 
   * @param {*} args 
   * @returns 
   */
  'app-set-as-default-protocol-client': (protocol, path, args) => {
    return app.setAsDefaultProtocolClient(protocol, path, args) 
  },
  // 移除默认协议客户端
  'app-remove-as-default-protocol-client': (protocol, path, args) => {
    return app.removeAsDefaultProtocolClient(protocol, path, args)
  },
  // protocol: String 完整的协议路径
  'get-application-name-for-protocol': (protocol) => {
    return app.getApplicationNameForProtocol(protocol) // 返回注册为处理协议的应用程序的名称
  },
  // return Promise<Object> - 返回注册为处理协议的应用程序的信息
  'get-application-info-for-protocol': (protocol) => {
    return app.getApplicationInfoForProtocol(protocol) // 返回注册为处理协议的应用程序的信息
  },
  /**
   * 该api确保应用程序实例的唯一性
   * 使用：
   * 1. 在主进程中调用，将返回一个布尔值，表示应用程序是否获得了唯一实例锁
   * 2. 如果为true，表示该应用是唯一实例，其他尝试启动的应用将被传递给已经运行的实例。这会触发second-instance事件
   * 3. 如果为false，标识应用已经被其他实例占用，当前启动请求将被拒绝。
   * 注意:
   * 1. 在macOS上，用户通过finder中打开应用的第二个实例时，系统会自动强制执行单例，并且将为此发出open-file和open-url事件。
   * 但是当通过命令行启动应用时，系统不会自动强制执行单例，需要手动调用requestSingleInstanceLock
   * @param {*} app 
   * @param {*} additionalData 
   * @returns 
   */
  'app-request-single-instance-lock': (additionalData) => {
    return app.requestSingleInstanceLock(additionalData) // 返回Boolean - 如果另一个实例正在运行，则返回false
  },
  // 返回Boolean - 返回应用的实例是否持有单例锁
  'app-has-single-instance-lock': () => {
    return app.hasSingleInstanceLock()
  },
  // 释放单例锁, 这将允许多个实例同时运行
  'app-release-single-instance-lock': () => {
    app.releaseSingleInstanceLock()
  },
  // 配置主机解析器，以使用自定义的DNS解析器。 
  // 在ready时间后调用此api
  'app-configure-host-resolver': () => {
    app.configureHostResolver()
  },
  /**
   * 禁用硬件加速，所有的图形渲染将由cpu而非GPU来处理。
   * 使用：
   * 1. 某些设备GPU驱动程序可能不稳定或存在bug，使用硬件加速可能会导致崩溃、卡顿等问题。
   * 2. 低端或集成显卡，启动硬件加速可能会导致图形性能低下或应用卡顿。
   * 3. 在ready事件之前调用
   * @param {*} app 
   */
  'app-disable-hardware-acceleration': () => {
    app.disableHardwareAcceleration() // 禁用硬件加速
  },
  /**
   * 默认情况下，如果GPU进程崩溃过于频繁，chromium会禁用3D API（如webgl），直到在每个域上重启
   * 此函数禁用该行为。
   * 在ready事件之前调用。
   * @param {*} app 
   */
  'app-disable-domain-blocking-fro-3dapis': () => {
    app.disableDomainBlockingFor3DAPIs() // 禁用3D API的域阻塞
  },
  // 返回ProcessMetric对象数组，对应于与应用关联的又有进程的内存和CPU使用情况统计信息。
  'get-app-metrics': () => {
    return app.getAppMetrics()
  },
  // 此信息仅在gpu-info-update事件发出后可用
  // 返回 GPUFeaturesStatus 对象
  'get-gpu-features-status': () => {
    return app.getGPUFeaturesStatus()
  },
  // infoType: String basic|complete
  'get-gpu-info': (infoType) => {
    return app.getGPUInfo(infoType)
  },
  // config: ProxyConfig
  // 返回Promise代理设置完成后resolve， 在ready事件后调用
  'set-proxy': (config) => {
    app.setProxy(config)
  },
  // 返回 Promise 使用url的代理信息进行解析
  'reaolve-proxy': (url) => {
    app.resolveProxy(url)
  },
}

const appHandlersInWin = {
  /**
   * 将tasks添加到windows的任务跳转列表中。任务类别通常用于列出程序提供的快捷操作，
   * 用户可以通过右键点击任务栏中的图标来快速访问这些任务
   * @param {*} app 
   * @param {*} tasks Task对象数组
   * 
   */
  'app-set-user-tasks': (tasks) => {
    app.setUserTasks(tasks) // 设置任务栏用户任务
  },
  'app-get-jump-list-settings': () => {
    return app.getJumpListSettings() // 获取任务栏用户任务
  },
  // 设置或删除应用的自定义跳转列表
  'app-set-jump-list': (categories) => {
    app.setJumpList(categories) // 设置任务栏用户任务
  },
  /**
   * 将应用用户模型ID更改为id
   * @param {*} app 
   * @param {*} id 
   */
  'app-set-app-user-model-id': (id) => {
    app.setAppUserModelId(id) // 设置应用程序的用户模型ID
  },
  'get-login-item-settings': (options) => {
    return app.getLoginItemSettings(options) // 获取登录项设置
  },
  'set-login-item-settings': (settings) => {
    app.setLoginItemSettings(settings) // 设置登录项设置
  },
  'is-accessibility-support-enabled': () => {
    return app.isAccessibilitySupportEnabled() // 检查辅助功能支持是否已启用
  },
  // 手动启动/禁用chrome的辅助功能支持。必须在ready事件后调用
  // 注意：开启后可能会影响性能，默认不启用。
  'set-accessibility-support-enabled': (enabled) => {
    app.setAccessibilitySupportEnabled(enabled)
  },
  // 设置关于面板选项
  'set-about-panel-options': (options) => {
    app.setAboutPanelOptions(options) 
  },
  // 当前操作系统版本是否允许原生表情符号选择器
  'is-emoji-panel-supported': () => {
    return app.isEmojiPanelSupported() 
  },
  // 显示平台的原生表情符号选择器
  'show-emoji-panel': () => {
    app.showEmojiPanel()
  },
  // 在应用上启用完整沙盒模式。即所有渲染器都将在沙盒中启动，无论webPreferences.sandbox如何设置
  // 此方法在ready之前调用
  'enable-sandbox': () => {
    app.enableSandbox()
  },
}
const appHandlersInMac = {
  'app-hide': () => {
    app.hide() // 隐藏所有应用窗口而不是最小化它们
  },
  'app-is-hidden': () => {
    return app.isHidden() // 检查应用(其所有窗口)是否隐藏
  },
  'app-show': () => {
    app.show() // 显示隐藏后的应用窗口。不会自动聚焦
  },
  // 当前正在运行的活动类型
  'app-get-current-activity-type': () => {
    return app.getCurrentActivityType() // 获取当前活动类型
  },
  /**
   * 使用：
   * 1. 退出某个任务或操作： 如果希望用户的当前活动不再被其他设备所接管或继续；
   * 2. 切换到新的任务：当用户切换到新的任务时，可能希望无效化当前的handoff用户活动。
   * 3. 清理活动状态：在应用关闭或用户退出当前任务前，你可能希望通过使用户活动失效来清理活动状态。
   * @param {*} app 
   */
  'app-invalidate-current-activity': () => {
    app.invalidateCurrentActivity()
  },
  // 将当前handoff用户标记为非活动状态，而不使其失效。
  'app-resign-current-activity': () => {
    app.resignCurrentActivity()
  },
  // 如果当前活动的类型与type匹配，则更新当前活动。将uuserInfo中的条目合并到其当前userInfo字典中。
  'app-update-current-activity': ({ type, userInfo }) => {
    app.updateCurrentActivity(type, userInfo)
  },
  'app-set-activation-policy': (policy) => {
    app.setActivationPolicy(policy) // 设置应用程序的激活策略
  },
  /**
   * 设置当前应用的计数器徽章。将计数器设置为0将隐藏徽章。
   * 它显示在DOCK图标上。且确保应用有权显示通知
   * @param {*} app 
   * @param {*} count 
   */
  'app-set-badge-count': (count) => {
    app.setBadgeCount(count) // 设置应用程序的徽章计数
  },
  'get-badge-count': () => {
    return app.getBadgeCount() // 获取应用程序的徽章计数
  },
  // 应用当前是否正在从系统应用文件夹运行。与moveToApplicationsFolder()结合使用
  'is-in-applications-folder': () => {
    return app.isInApplicationsFolder() 
  },
  // 将应用程序移动到应用程序文件夹
  'move-to-applications-folder': (options) => {
    return app.moveToApplicationsFolder(options) 
  },
  // Secure Keyboard Entry 是否启用
  'is-secure-keyboard-entry-enabled': () => {
    return app.isSecureKeyboardEntryEnabled() 
  },
  // 启用或禁用安全键盘输入。可以防止密码登重要信息被其他进程拦截
  'set-secure-keyboard-entry-enabled': (enabled) => {
    app.setSecureKeyboardEntryEnabled(enabled)
  },
}

if (process.env.platform === 'mac') {
  registerAppEventsInMac()
  Object.assign(appHandlers, appHandlersInMac)
} else if (process.env.platform === 'windows') {
  registerAppEventsInWin()
  Object.assign(appHandlers, appHandlersInWin)
}

module.exports = {
  registerAppEvents,
  appHandlers
}