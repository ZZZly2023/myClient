const { BrowserWindow } = require('electron/main')
const path = require('path')
const baseConfig = {
  width: 800,
  height: 600,
  minWidth: 800,
  minHeight: 600,
  title: 'youzone', // 如果没有，则取自index.html的title
  icon: '', // 图标
  frame: true, // 显示为无框窗口
  show: false, // 创建后是否显示
}

const windowsMap = new Map()

/**
 * 创建窗口
 * @param {*} config 
 * @param {*} options 
 * @returns 
 */
function createWindow(params = {}, options = {}) {
  const config = Object.assign({}, baseConfig, params)
  if (config.webPreferences) {
    config.webPreferences.preload = path.join(__dirname, '../preload.js')
  }
  if (!options || !options.url) {
    return null
  }
  if (windowsMap.has(options.url)) {
    const win = windowsMap.get(options.url)
    win.show()
    return win
  }
  console.log('创建窗口', config)
  const win = new BrowserWindow(config)
  if (options.type === 'url') {
    win.loadURL(options.url)
  } else if (options.type === 'file') {
    win.loadFile(options.url)
  }
  windowsMap.set(options.url, win)
  registerWindowEvents(win)
  return win
}

function registerWindowEvents(win) {

  // 当网页已渲染（但未显示）并且窗口可以在没有视觉闪烁的情况下显示时发出
  win.once('ready-to-show', () => {
    console.log('窗口准备好显示')
    win.show()
  })
  // 窗口文档的标题更改时触发
  win.on('page-title-updated', (event, title, explicitSet) => {
    win.setTitle(title)
  })

  // 窗口将要关闭时触发
  // 可以根据系统，确定是否要销毁窗口
  win.on('close', (event) => {
    destroyWindow(win)
  })

  // 监听到关闭时触发
  win.on('closed', () => {

  })

  // 当窗口会话由于强制关闭或计算机重启会话注销而结束时发出
  win.on('session-end', () => {
    destroyWindow(win)
  })

  // 当窗口不再响应时触发
  win.on('unresponsive', () => {
    console.log('窗口不再响应')
  })

  // 当窗口重新响应时触发
  win.on('responsive', () => {
    console.log('窗口重新响应')
  })

  win.on('blur', () => {
    console.log('窗口失去焦点')
  })

  win.on('focus', () => {
    console.log('窗口获得焦点')
  })

  win.on('show', () => {
    console.log('窗口显示')
  })

  win.on('hide', () => {
    console.log('窗口隐藏')
  })

  win.on('maximize', () => {
    console.log('窗口最大化')
  })

  win.on('minimize', () => {
    console.log('窗口最小化')
  })

  win.on('restore', () => {
    console.log('窗口恢复')
  })

  win.on('unmaximize', () => {
    console.log('窗口取消最大化')
  })

  win.on('will-resize', (event, newBounds, details) => {
    console.log('窗口即将调整大小')
  })

  win.on('resize', () => {
    console.log('窗口调整大小')
  })

  win.on('resized', () => {
    console.log('窗口调整大小完成后发出一次')
  })
  win.on('move', () => {
    console.log('窗口移动')
  })
  win.on('moved', () => {
    console.log('窗口移动完成后发出一次')
  })
  win.on('will-move', (event, newBounds) => {
    console.log('窗口即将移动')
  })
  win.on('enter-full-screen', () => {
    console.log('窗口进入全屏模式')
  })
  win.on('leave-full-screen', () => {
    console.log('窗口退出全屏模式')
  })
  win.on('enter-html-full-screen', () => {
    console.log('窗口进入HTML全屏模式')
  })
  win.on('leave-html-full-screen', () => {
    console.log('窗口退出HTML全屏模式')
  })
  win.on('always-on-top-changed', (event, isAlwaysOnTop) => {
    console.log('窗口始终在顶部更改')
  })
  win.on('app-command', (event, command) => {
    console.log('应用程序命令')
  })
  if (process.platform === 'win32') {
    registerBrowserWindowEventsInWin(win)
  } else if (process.platform === 'darwin') {
    registerBrowserWindowEventsInMacOS(win)
  }
}


function registerBrowserWindowEventsInWin(win) {
  win.on('system-context-menu', (event, point) => {
    console.log('系统上下文菜单')
  })
}

function registerBrowserWindowEventsInMacOS(win) {
  win.on('swipe', (event, direction) => {
    console.log('滑动')
  })
  win.on('rotate-gesture', (event, rotation) => {
    console.log('旋转手势')
  })
  win.on('sheet-begin', () => {
    console.log('sheet开始')
  })
  win.on('sheet-end', () => {
    console.log('sheet结束')
  })
}

function destroyWindow(win) {
  if (win) {
    const url = win.webContents?.getURL?.()
    if (windowsMap.has(url)) {
      windowsMap.delete(url)
    }
  }
  win = null
}

const browserWindowHandler = {
  'get-focused-window': () => {
    return BrowserWindow.getFocusedWindow()
  },
  'get-all-windows': () => {
    return BrowserWindow.getAllWindows()
  },
  'from-web-contents': () => {
    return BrowserWindow.fromWebContents()
  },
  'from-id': () => {
    return BrowserWindow.fromId()
  },
  'get-web-contents': (win) => {
    if (win) {
      return win.webContents
    }
  },
  'get-win-id': (win) => {
    if (win) {
      return win.id
    }
  },
  'win-destroy': (win) => {
    if (win) {
      win.destroy() // 强制关闭窗口，网页不会发出unload和beforeunload事件,也不会发出close事件。但会发出closed事件
      destroyWindow(win)
    }
  },
  'win-is-destroyed': (win) => {
    if (win) {
      return win.isDestroyed() // 如果窗口已销毁，则返回true
    }
  },
  'win-close': (win) => {
    if (win) {
      win.close() // 尝试关闭窗口。与用户点击窗口的关闭按钮具有相同的效果。但网页可能会取消关闭。
    }
  },
  'win-focus': (win) => {
    if (win) {
      win.focus() // 将窗口置于最前
    }
  },
  'win-blur': (win) => {
    if (win) {
      win.blur() // 将窗口置于后台
    }
  },
  'win-is-focused': (win) => {
    if (win) {
      return win.isFocused() // 如果窗口是焦点窗口，则返回true
    }
  },
  'win-show': (win) => {
    if (win) {
      win.show() // 显示窗口
    }
  },
  'win-show-Inactive': (win) => {
    if (win) {
      win.showInactive() // 显示窗口，但不激活
    }
  },
  'win-hide': (win) => {
    if (win) {
      win.hide() // 隐藏窗口
    }
  },
  'win-is-visible': (win) => {
    if (win) {
      return win.isVisible() // 如果窗口可见，则返回true
    }
  },
  'win-is-modal': (win) => {
    if (win) {
      return win.isModal() // 如果窗口是模态的，则返回true
    }
  },
  'win-maximize': (win) => {
    if (win) {
      win.maximize() // 最大化窗口
    }
  },
  'win-unmaximize': (win) => {
    if (win) {
      win.unmaximize() // 取消最大化窗口
    }
  },
  'win-is-maximized': (win) => {
    if (win) {
      return win.isMaximized() // 如果窗口已最大化，则返回true
    }
  },
  'win-minimize': (win) => {
    if (win) {
      win.minimize() // 最小化窗口
    }
  },
  'win-is-minimized': (win) => {
    if (win) {
      return win.isMinimized() // 如果窗口已最小化，则返回true
    }
  },
  'win-restore': (win) => {
    if (win) {
      win.restore() // 恢复窗口
    }
  },
  'win-set-full-screen': (win, flag) => {
    if (win) {
      win.setFullScreen(flag) // 设置窗口全屏
    }
  },
  'win-is-full-screen': (win) => {
    if (win) {
      return win.isFullScreen() // 如果窗口已全屏，则返回true
    }
  },
  'win-is-normal': (win) => {
    if (win) {
      return win.isNormal() // 如果窗口是正常大小，则返回true
    }
  },
  'win-set-aspect-ratio': (win, aspectRatio, extraSize) => {
    if (win) {
      win.setAspectRatio(aspectRatio, extraSize) // 设置窗口的纵横比
    }
  },
  'win-set-background-color': (win, color) => {
    if (win) {
      win.setBackgroundColor(color) // 设置窗口的背景颜色
    }
  },
  'win-get-bounds': (win) => {
    if (win) {
      return win.getBounds() // 返回窗口的边界
    }
  },
  'win-get-background-color': (win) => {
    if (win) {
      return win.getBackgroundColor() // 返回窗口的背景颜色
    }
  },
  'win-get-content-bounds': (win) => {
    if (win) {
      return win.getContentBounds() // 返回窗口的内容边界
    }
  },
  'win-get-normal-bounds': (win) => {
    if (win) {
      return win.getNormalBounds() // 返回窗口的正常边界
    }
  },
  'win-set-enabled': (win, enable) => {
    if (win) {
      win.setEnabled(enable) // 设置窗口是否可用
    }
  },
  'win-is-enabled': (win) => {
    if (win) {
      return win.isEnabled() // 如果窗口可用，则返回true
    }
  },
  'win-get-size': (win) => {
    if (win) {
      return win.getSize() // 返回窗口的大小
    }
  },
  // animate: Boolean, macOS
  'win-set-bounds': (win, bounds, animate) => {
    if (win) {
      win.setBounds(bounds, animate) // 设置窗口的边界
    }
  },
  'win-set-content-bounds': (win, bounds, animate) => {
    if (win) {
      win.setContentBounds(bounds, animate) // 设置窗口的内容边界
    }
  },
  'win-set-size': (win, size, animate) => {
    if (win) {
      win.setSize(size, animate) // 设置窗口的大小
    }
  },
  'win-set-ContentSize': (win, size, animate) => {
    if (win) {
      win.setContentSize(size, animate) // 设置窗口的内容大小
    }
  },
  'win-get-content-size': (win) => {
    if (win) {
      return win.getContentSize() // 返回窗口的内容大小
    }
  },
  'win-set-minimum-size': (win, size) => {
    if (win) {
      win.setMinimumSize(size) // 设置窗口的最小大小
    }
  },
  'win-get-minimum-size': (win) => {
    if (win) {
      return win.getMinimumSize() // 返回窗口的最小大小
    }
  },
  'win-set-maximum-size': (win, size) => {
    if (win) {
      win.setMaximumSize(size) // 设置窗口的最大大小
    }
  },
  'win-get-maximum-size': (win) => {
    if (win) {
      return win.getMaximumSize() // 返回窗口的最大大小
    }
  },
  'win-is-resizable': (win) => {
    if (win) {
      return win.isResizable() // 如果窗口可调整大小，则返回true
    }
  },
  'win-set-movable': (win, movable) => {
    if (win) {
      win.setMovable(movable) // 设置窗口是否可移动
    }
  },
  'win-is-movable': (win) => {
    if (win) {
      return win.isMovable() // 如果窗口可移动，则返回true
    }
  },
  'win-set-minimizable': (win, minimizable) => {
    if (win) {
      win.setMinimizable(minimizable) // 设置窗口是否可最小化
    }
  },
  'win-is-minimizable': (win) => {
    if (win) {
      return win.isMinimizable() // 如果窗口可最小化，则返回true
    }
  },
  'win-set-maximizable': (win, maximizable) => {
    if (win) {
      win.setMaximizable(maximizable) // 设置窗口是否可最大化
    }
  },
  'win-is-maximizable': (win) => {
    if (win) {
      return win.isMaximizable() // 如果窗口可最大化，则返回true
    }
  },
  'win-set-fullscreenable': (win, fullscreenable) => {
    if (win) {
      win.setFullscreenable(fullscreenable) // 设置窗口是否可全屏
    }
  },
  'win-is-fullscreenable': (win) => {
    if (win) {
      return win.isFullscreenable() // 如果窗口可全屏，则返回true
    }
  },
  'win-set-closable': (win, closable) => {
    if (win) {
      win.setClosable(closable) // 设置窗口是否可关闭
    }
  },
  'win-is-closable': (win) => {
    if (win) {
      return win.isClosable() // 如果窗口可关闭，则返回true
    }
  },
  'win-set-always-on-top': (win, flag, leave, relativeLevel) => {
    if (win) {
      win.setAlwaysOnTop(flag) // 设置窗口是否始终在顶部
    }
  },
  'win-is-always-on-top': (win) => {
    if (win) {
      return win.isAlwaysOnTop() // 如果窗口始终在顶部，则返回true
    }
  },
  'win-move-above': (win, mediaSourceId) => {
    if (win && mediaSourceId) { // 窗口id
      win.moveAbove(mediaSourceId) // 将窗口置于另一个窗口之上
    }
  },
  'win-move-top': (win) => {
    if (win) {
      win.moveTop() // 将窗口置于最顶部
    }
  },
  'win-center': (win) => {
    if (win) {
      win.center() // 将窗口居中
    }
  },
  'win-set-position': (win, x, y, animate) => {
    if (win) {
      win.setPosition(x, y, animate) // 设置窗口的位置
    }
  },
  'win-get-position': (win) => {
    if (win) {
      return win.getPosition() // 返回窗口的位置
    }
  },
  'win-set-title': (win, title) => {
    if (win) {
      win.setTitle(title) // 设置窗口的标题
    }
  },
  'win-get-title': (win) => {
    if (win) {
      return win.getTitle() // 返回窗口的标题
    }
  },
  'win-flash-frame': (win, flag) => {
    if (win) {
      win.flashFrame(flag) // 闪烁窗口
    }
  },
  'win-set-skip-taskbar': (win, skip) => {
    if (win) {
      win.setSkipTaskbar(skip) // 使窗口是否显示在任务栏中
    }
  },
  'win-set-kiosk': (win, flag) => {
    if (win) {
      win.setKiosk(flag) // 设置窗口的Kiosk模式
    }
  },
  'win-is-kiosk': (win) => {
    if (win) {
      return win.isKiosk() // 如果窗口是Kiosk模式，则返回true
    }
  },
  'win-get-media-source-id': (win) => {
    if (win) {
      return win.getMediaSourceId() // 窗口 ID，格式为 DesktopCapturerSource 的 id
    }
  },
  'win-get-native-window-handle': (win) => {
    if (win) {
      return win.getNativeWindowHandle() // 返回 Buffer - 窗口的特定于平台的句柄
    }
  },
  'win-focus-on-webview': (win) => {
    if (win) {
      win.focusOnWebView() // 将焦点设置到窗口的webview中
    }
  },
  'win-blur-webview': (win) => {
    if (win) {
      win.blurWebView() // 从窗口的webview中移除焦点
    }
  },
  /**
   * 获取rect内页面的快照。
   * @param {*} win 
   * @param {*} rect 
   * @param {*} opts 
   *  stayHidden Boolean (可选) - 保持页面隐藏而不是可见。默认为false
   *  stayAwake Boolean (可选) - 保持系统清醒而不是让它休眠。默认为false
   * @returns Promise<NativeImage> - 一个NativeImage
   * 省略rect将捕获整个可见页面。如果页面不可见，则rect可能为空。
   * 
   */
  'win-capture-page': (win, rect, opts) => {
    if (win) {
      return win.capturePage(rect, opts) // 返回 Promise<NativeImage> - 一个 NativeImage
    }
  },
  'win-load-url': (win, url, options) => {
    if (win) {
      // webContents.loadURL(url, options)相同
      win.loadURL(url, options) // 加载url
    }
  },
  'win-load-file': (win, filePath, options) => {
    if (win) {
      // webContents.loadFile(filePath, options)相同
      win.loadFile(filePath, options) // 加载文件
    }
  },
  'win-reload': (win) => {
    if (win) {
      win.reload() // 重新加载窗口
    }
  },
  /**
   * 设置窗口的进度条值，有效范围是[0, 1.0]
   * @param {*} win 
   * @param {*} progress
   * @param {*} options 
   *    mode String (可选) - 进度条模式(windows, none、normal、indeterminate、error、paused)
   * 当进度 < 0 时移除进度条。当 进度 > 1 时，将切换进入indeterminate模式。
   */
  'win-set-progress-bar': (win, progress, options) => {
    if (win) {
      win.setProgressBar(progress, options) // 设置窗口的进度条
    }
  },
  'win-set-has-shadow': (win, hasShadow) => {
    if (win) {
      win.setHasShadow(hasShadow) // 设置窗口是否有阴影
    }
  },
  'win-set-opacity': (win, opacity) => {
    if (win) {
      win.setOpacity(opacity) // 设置窗口的不透明度
    }
  },
  'win-get-opacity': (win) => {
    if (win) {
      return win.getOpacity() // 返回窗口的不透明度
    }
  },
  // 使窗口忽略所有鼠标事件
  // 该窗口中发生的所有鼠标事件都会传递到该窗口下方的窗口，但如果该窗口具有焦点，则它仍将接收键盘事件。
  'win-set-ignore-mouse-events': (win, ignore, options) => {
    if (win) {
      win.setIgnoreMouseEvents(ignore, options) // 设置窗口是否忽略鼠标事件
    }
  },
  'win-set-content-protection': (win, enable) => {
    if (win) {
      win.setContentProtection(enable) // 设置窗口的内容保护
    }
  },
  'win-set-focusable': (win, focusable) => {
    if (win) {
      win.setFocusable(focusable) // 设置窗口是否可聚焦
    }
  },
  'win-is-focusable': (win) => {
    if (win) {
      return win.isFocusable() // 如果窗口可聚焦，则返回true
    }
  },
  // 设置parent为当前窗口的父窗口，传递null将会使当前窗口为顶层窗口
  'win-set-parent-window': (win, parent) => {
    if (win) {
      win.setParentWindow(parent) // 设置窗口的父窗口
    }
  },
  'win-get-parent-window': (win) => {
    if (win) {
      return win.getParentWindow() // 返回窗口的父窗口
    }
  },
  'win-get-child-windows': (win) => {
    if (win) {
      return win.getChildWindows() // 返回窗口的子窗口
    }
  },

}

const browserWindowHandlerInMacOS = {
  'win-set-simple-full-screen': (win, flag) => {
    if (win) {
      win.setSimpleFullScreen(flag) // 设置窗口简单全屏
    }
  },
  'win-is-simple-full-screen': (win) => {
    if (win) {
      return win.isSimpleFullScreen() // 如果窗口已简单全屏，则返回true
    }
  },
  'win-preview-file': (win, path, displayName) => {
    if (win) {
      win.previewFile(path, displayName) // 预览文件
    }
  },
  'win-close-file-preview': (win) => {
    if (win) {
      win.closeFilePreview() // 关闭文件预览
    }
  },
  'win-set-hidden-in-mission-control': (win, hide) => {
    if (win) {
      win.setHiddenInMisionControl(hide) // 设置窗口是否在Mission Control中隐藏
    }
  },
  'win-is-hidden-in-mission-control': (win) => {
    if (win) {
      return win.isHiddenInMissionControl() // 如果窗口在Mission Control中隐藏，则返回true
    }
  },
  'win-set-sheet-offset': (win, offsetX, offsetY) => {
    if (win) {
      win.setSheetOffset(offsetX, offsetY) // 设置窗口的偏移量
    }
  },
  'win-set-represented-filename': (win, filename) => {
    if (win) {
      win.setRepresentedFilename(filename) // 设置窗口代表的文件的路径名，文件的图标将显示在窗口的标题栏中。
    }
  },
  'win-get-represented-filename': (win) => {
    if (win) {
      return win.getRepresentedFilename() // 返回窗口代表的文件的路径名
    }
  },
  'win-set-document-edited': (win, edited) => {
    if (win) {
      win.setDocumentEdited(edited) // 设置窗口文档是否已编辑
    }
  },
  'win-is-document-edited': (win) => {
    if (win) {
      return win.isDocumentEdited() // 如果窗口文档已编辑，则返回true
    }
  },
  'win-invalidate-shadow': (win) => {
    if (win) {
      win.invalidateShadow() // 使窗口的阴影失效
    }
  },
  'win-show-definition-for-selection': (win) => {
    if (win) {
      win.showDefinitionForSelection() // 显示选中文本的字典
    }
  },
  'win-set-window-button-visibility': (win, button, visible) => { // 设置窗口交通灯的可见性
    if (win) {
      win.setWindowButtonVisibility(button, visible)
    }
  },
  'win-set-visible-on-all-workspaces': (win, visible) => {
    if (win) {
      win.setVisibleOnAllWorkspaces(visible) // 设置窗口是否在所有工作区可见
    }
  },
  'win-is-visible-on-all-workspaces': (win) => {
    if (win) {
      return win.isVisibleOnAllWorkspaces() // 如果窗口在所有工作区可见，则返回true
    }
  },
  'win-set-auto-hide-cursor': (win, autoHide) => {
    if (win) {
      win.setAutoHideCursor(autoHide) // 控制打字是是否隐藏光标
    }
  },
  'win-select-previous-tab': (win) => {
    if (win) {
      win.selectPreviousTab() // 选择前一个选项卡（如果有）
    }
  },
  'win-select-next-tab': (win) => {
    if (win) {
      win.selectNextTab() // 选择下一个选项卡（如果有）
    }
  },
  'win-show-all-tabs': (win) => {
    if (win) {
      win.showAllTabs() // 显示所有选项卡
    }
  },
  // 当启用原生选项卡并且有多个打开的窗口时，将所有窗口合并为具有多个选项卡的一个窗口。
  'win-merge-all-windows': (win) => {
    if (win) {
      win.mergeAllWindows() // 
    }
  },
  'win-move-tab-to-new-window': (win) => {
    if (win) {
      win.moveTabToNewWindow() // 将当前选项卡移动到新窗口
    }
  },
  'win-toggle-tab-bar': (win) => {
    if (win) {
      win.toggleTabBar() // 切换选项卡栏的可见性
    }
  },
  'win-add-tabbed-window': (win, otherWindow) => {
    if (win) {
      win.addTabbedWindow(otherWindow) // 将另一个窗口添加到当前窗口的选项卡中
    }
  },
  'win-set-vibrancy': (win, type) => {
    if (win) {
      win.setVibrancy(type) // 为浏览器窗口添加vibrancy效果
    }
  },
  // position Point|null 在无框窗口中设置交通灯按钮的自定义位置。通过null来重置为默认位置。
  'win-set-window-button-position': (win, position) => {
    if (win) {
      win.setWindowButtonPosition(position) // 设置窗口按钮的位置
    }
  },
  'win-get-window-button-position': (win) => {
    if (win) {
      return win.getWindowButtonPosition() // 返回窗口交通灯按钮的位置
    }
  }
}

const browserWindowHandlerInWin = {
  'win-is-tablet-mode': (win) => {
    if (win) {
      return win.isTabletMode() // 如果窗口是平板模式，则返回true
    }
  },
  /**
   * 
   * @param {*} win 
   * @param {*} message 整数
   * @param {*} listener 
   *  wParam缓冲-提供给wndProc的wparam
   *  lParam缓冲-提供给wndProc的lparam
   *  当WndProc中接收到消息时，将调用listener
   * 
   */
  'win-hook-window-message': (win, message, listener) => {
    if (win) {
      win.hookWindowMessage(message, listener) // 监听窗口消息
    }
  },
  'win-is-window-message-hooked': (win, message) => {
    if (win) {
      return win.isWindowMessageHooked(message) // 如果窗口消息被钩住，则返回true
    }
  },
  'win-unhook-window-message': (win, message) => { // 取消监听窗口消息
    if (win) {
      win.unhookWindowMessage(message)
    }
  },
  'win-unhook-all-window-messages': (win) => {
    if (win) {
      win.unhookAllWindowMessages() // 取消监听所有窗口消息
    }
  },
  'win-set-menu': (win, menu) => {
    if (win) {
      win.setMenu(menu) // 设置窗口的菜单
    }
  },
  'win-get-menu': (win) => {
    if (win) {
      return win.getMenu() // 返回窗口的菜单
    }
  },
  /**
   * 设置任务栏左下角图标，如果为null，则清除图标
   * @param {*} win 
   * @param {*} overlay NativeImage || null
   * @param {*} description 
   */
  'win-set-overlay-icon': (win, overlay, description) => {
    if (win) {
      win.setOverlayIcon(overlay, description) // 设置窗口的覆盖图标
    }
  },
  /**
   * 将具有指定按钮集的缩略图工具栏添加到任务栏按钮布局窗口的缩略图中。
   * @param {*} win 
   * @param {*} buttons 
   *  Button对象
   *   icon NativeImage - 按钮的图标
   *   click Function - 当用户点击按钮时调用的函数
   *   tooltip String - 按钮的工具提示文本
   *   flags String[] (可选) - 按钮的附加行为和特定状态,默认为【'enabled'】
   *     'enabled' - 按钮可用态
   *     'disabled' - 按钮不可用态
   *     'dismissonclick' - 单击按钮后，缩略图窗口立即关闭
   *     'nobackground' - 不绘制按钮边框，仅使用图片
   *     'hidden' - 按钮不可见
   *     'noninteractive' - 按钮已启用但不可交互
   * 
   * @return boolean 是否设置成功
   * 
   */
  'win-set-thumbar-buttons': (win, buttons) => {
    if (win) {
      return win.setThumbarButtons(buttons) // 设置窗口的缩略图工具栏按钮
    }
  },
  // region 窗口区域
  // 设置将鼠标悬停在任务栏中的窗口上时显示的缩略图图片的窗口区域。
  'win-set-thumbnail-clip': (win, region) => {
    if (win) {
      return win.setThumbnailClip(region) // 设置窗口的缩略图工具栏进度条
    }
  },
  'win-set-thumbnail-tooltip': (win, tooltip) => {
    if (win) {
      return win.setThumbnailTooltip(tooltip) // 设置窗口的缩略图工具栏提示
    }
  },
  // 设置窗口的任务栏按钮属性
  'win-set-app-details': (win, options) => {
    if (win) {
      return win.setAppDetails(options)
    }
  },
  // icon NativeImage
  'win-set-icon': (win, icon) => {
    if (win) {
      return win.setIcon(icon) // 设置窗口的图标
    }
  },
  'set-auto-hide-menu-bar': (win, flag) => {
    if (win) {
      win.setAutoHideMenuBar(flag) // 设置窗口的自动隐藏菜单条
    }
  },
  'win-is-menu-bar-auto-hide': (win) => {
    if (win) {
      return win.isMenuBarAutoHide() // 如果窗口的菜单条自动隐藏，则返回true
    }
  },
  'win-set-menu-bar-visibility': (win, visible) => {
    if (win) {
      win.setMenuBarVisibility(visible) // 设置窗口的菜单条可见性
    }
  },
  'win-is-menu-bar-visible': (win) => {
    if (win) {
      return win.isMenuBarVisible() // 如果窗口的菜单条可见，则返回true
    }
  },
  'win-set-back-ground-matieral': (win, material) => {
    if (win) {
      win.setBackgroundMaterial(material) // 设置窗口的背景材质
    }
  },
  // 在已启用窗口空间覆盖的窗口上，此方法会更新标题栏覆盖的样式
  'win-set-title-bar-overlay': (win, options) => {
    if (win) {
      win.setTitleBarOverlay(options) // 设置窗口的标题栏覆盖
    }
  }
}

if(process.platform === 'darwin') {
  Object.assign(browserWindowHandler, browserWindowHandlerInMacOS) 
} else if(process.platform === 'win32') { 
  Object.assign(browserWindowHandler, browserWindowHandlerInWin) 
}


module.exports = {
  createWindow,
  browserWindowHandler,
  windowsMap
}