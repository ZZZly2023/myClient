const { systemPreferences } = require('electron');

function registSystemPerferencesEventInWindows() {
  // 主题颜色改变 windows
  systemPreferences.on('accent-color-changed' , (event, newColor) => {
    console.log('accent-color-changed', newColor)
  })
  systemPreferences.on('color-changed' , (event) => {
    console.log('color-changed')
  })
}

const systemPreferencesHandler = {
  // 返回当前系统范围的强调色偏好（RGBA十六进制）
  'get-accent-color': () => {
    return systemPreferences.getAccentColor()
  },
  // 返回系统颜色设置
  /**
   * 
   * @param {*} color 
   *  windows上，color可以是以下值之一：
   * - 3d-dark-shadow 三维显示元素的深色阴影
   * - 3d-face 三维显示元素和对话框背景的表面颜色
   * - 3d-highlight 三维显示元素的高亮色
   * - 3d-light 三维显示元素的亮色
   * - 3d-shadow 三维显示元素的阴影色
   * - active-border 活动窗口的边框颜色
   * - active-caption 活动窗口标题栏的颜色。如果启用了渐变效果，则指定活动窗口标题栏颜色渐变中的左侧颜色。
   * - active-caption-gradient 指定活动窗口标题栏颜色渐变中的右侧颜色。
   * - app-workspace 应用程序工作区的背景色
   * - button-text 按钮文本的颜色
   * - caption-text 标题、大小框、滚动条箭头框中的文本颜色
   * - desktop 桌面的背景色
   * - disabled-text 禁用的文本颜色
   * - highlight 在控件中选择的项目
   * - highlight-text 在控件中选择的项目的文本
   * - hotlight 超链接或热跟踪项目的颜色。
   * - inactive-border 非活动窗口的边框颜色
   * - inactive-caption 非活动窗口标题栏的颜色。如果启用了渐变效果，则指定非活动窗口标题栏颜色渐变中的左侧颜色。
   * - inactive-caption-gradient 指定非活动窗口标题栏颜色渐变中的右侧颜色。
   * - inactive-caption-text 非活动窗口标题栏中的文本颜色
   * - info-background 提供帮助的工具提示的背景色
   * - info-text 提供帮助的工具提示的文本颜色
   * - menu 菜单的背景色
   * - menu-text 菜单的文本颜色
   * - menu-highlight 菜单中选择的项目的背景色
   * - menubar 菜单栏的背景色
   * - scrollbar 滚动条的背景色
   * - window 框架窗口的背景色
   * - window-frame 框架窗口的背景色
   * - window-text 框架窗口中的文本颜色
   * macOS 上，查文档
   * @returns 
   */
  'get-color': (color) => {
    return systemPreferences.getColor(color)
  },
  // mediaType: 'microphone' | 'camera' | 'screen'
  // 返回string  not-determined | denied | granted | restricted | unknown
  'get-media-access-status': (mediaType) => {
    return systemPreferences.getMediaAccessStatus(mediaType)
  },
  /**
   * 返回具有系统动画设置的对象
   * @returns Object 
   *  - shouldRenderRichAnimation boolean 如果应渲染丰富的动画，则为true。
   *  - scrollAnimationsEnabledBySystem boolean 根据每个平台确定是否启用滚动动画。
   *  - prefersReducedMotion boolean 根据平台API确定用户是否希望减少运动
   */
  'get-animation-settings': () => {
    return systemPreferences.getAnimationSettings()
  }
}

const systemPreferencesHandlerInMac = {
  /**
   * 页面之间滑动设置是否打开
   * @returns {boolean} 
   */
  'is-swipe-tracking-from-scroll-events-enabled': () => {
    return systemPreferences.isSwipeTrackingFromScrollEventsEnabled()
  },
  // 将event作为macOS的原生通知发布。userInfo是一个对象，包含通知一起发送的用户字典。
  // 当deliverImmediately为true时，即使订阅的应用处于非活动状态，也会立即发布通知。
  'post-notification': (event, userInfo, deliverImmediately) => {
    systemPreferences.postNotification(event, userInfo, deliverImmediately)
  },
  'post-local-notification': (event, userInfo) => {
    systemPreferences.postLocalNotification(event, userInfo)
  },
  'post-workspace-notification': (event, userInfo) => {
    systemPreferences.postWorkspaceNotification(event, userInfo)
  },
  /**
   * 订阅macOS原生通知。当对应的event发生时，调用callback
   * @param {*} event 
   * @param {*} callback 
   *   event string 通知的名称
   *   userInfo Record<string,unknown>是一个对象，包含与通知一起发送的用户信息字典。
   *   object 是通知的发送者，目前仅支持NSString值。
   * @returns 订阅者的id，可用于取消订阅
   */
  'subscribe-notification': (event, callback) => {
    return systemPreferences.subscribeNotification(event, callback)
  },
  /**
   * 
   * @param {*} event 
   * @param {*} callback 
   * @returns number 本次订阅的id
   */
  'suybscribe-local-notification': (event, callback) => {
    return systemPreferences.subscribeLocalNotification(event, callback)
  },
  'subscribe-workspace-notification': (event, callback) => {
    return systemPreferences.subscribeWorkspaceNotification(event, callback)
  },
  'unsubscribe-notification': (id) => {
    systemPreferences.unsubscribeNotification(id)
  },
  'unsubscribe-local-notification': (id) => {
    systemPreferences.unsubscribeLocalNotification(id)
  },
  'unsubscribe-workspace-notification': (id) => {
    systemPreferences.unsubscribeWorkspaceNotification(id)
  },
  'register-defaults': (defaults) => {
    systemPreferences.registerDefaults(defaults)
  },
  'get-user-default': (key, type) => {
    return systemPreferences.getUserDefault(key, type)
  },
  'set-user-default': (key, type, value) => {
    systemPreferences.setUserDefault(key, type, value)
  },
  'remove-user-default': (key) => {
    systemPreferences.removeUserDefault(key) // 删除NSUserDefaults中的key。可用于恢复先前使用setUserDefault设置的key的默认值或全局值。
  },
  // color: blue, brown, gray, green, orange, pink, purple, red, yellow。返回string，标准系统颜色格式
  'get-system-color': (color) => {
    return systemPreferences.getSystemColor(color)
  },
  // 获取应用的macOS外观
  'get-effective-appearance': () => {
    return systemPreferences.getEffectiveAppearance()
  },
  // 判断该设备是否能够使用Touch ID
  'can-prompt-touchID': () => {
    return systemPreferences.canPromptTouchID()
  },
  // 要求Touch ID身份验证的原因
  'prompt-touchID': (reason) => {
    return systemPreferences.promptTouchID(reason)
  },
  // 如果当前进程是受信任的可访问性客户端，则为true。
  'is-trusted-accessibility-client': (prompt) => {
    return systemPreferences.isTrustedAccessibilityClient(prompt)
  },
  /**
   * 
   * @param {*} mediaType 
   * microphone | camera
   * @returns Promise<boolean> 如果同意则true。
   */
  'ask-for-media-access': (mediaType) => {
    return systemPreferences.askForMediaAccess(mediaType) 
  },
  // 只读
  'get-effective-appearances': () => {
    return systemPreferences.effectiveAppearance
  }
}

const systemPreferencesHandlerInWindows = {
  // 确定是否应该创建透明窗口的示例。禁用DWM合成时，透明窗口将无法正常工作
  'is-Aero-Glass-enabled': () => {
    return systemPreferences.isAeroGlassEnabled()
  },
}

if (process.platform === 'darwin') {
  Object.assign(systemPreferencesHandler, systemPreferencesHandlerInMac)
} else if (process.platform === 'win32') {
  Object.assign(systemPreferencesHandler, systemPreferencesHandlerInWindows)
}


function registSystemPerferencesEvent() {
  if (process.platform === 'win32') {
    registSystemPerferencesEventInWindows()
  }
}

module.exports = {
  registSystemPerferencesEvent,
  systemPreferencesHandler
}

