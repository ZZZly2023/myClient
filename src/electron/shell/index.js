const { shell }  = require('electron/main')

const shellHandlers = {
  // 在文件管理器中显示给懂的文件。如果可能，请选择该文件。
  'shell-show-item-in-folder': (fullpath) => {
    return shell.showItemInFolder(fullpath)
  },
  // 以桌面的默认方式打开给定文件
  'shell-open-path': (path) => {
    return shell.openPath(path)
  },

  /**
   *  // 以桌面默认方式打开给定的外部协议URL 
   * @param {*} url windows上最多2081个字符
   * @param {*} options 对象 可选
   *  1.active boolean macOS 将打开的应用带到前台。默认为true。
   *  2.workingDirectory string 可选 windows 工作目录
   *  3. logUsage boolean 可选 windows 是否记录使用情况
   * @returns Promise<void>
   */
  'shell-open-external': (url, options) => {
    return shell.openExternal(url, options) 
  },
  /**
   * 将路径移动到特定的系统的垃圾箱
   * @param {*} path string 要移至垃圾箱的项目的路径
   * @returns Promise<void>
   */
  'shell-trash-item': (path) => {
    return shell.moveItemToTrash(path)
  },
  // 播放嘟嘟声
  'shell-beep': () => {
    return shell.beep()
  },
}

const shellHandlersInWindows = {
  /**
   * 在shortcutPath 创建或更新快捷链接 
   * @param {*} shortcutPath string
   * @param {*} operation 字符串 默认值为create，可以是以下之一：
   *  create 创建一个新的快捷方式，如果已经存在，则覆盖它
   *  update 仅更新现有快捷方式的指定属性
   *  replace 覆盖现有快捷方式。如果快捷方式不存在，则失败
   * @param {*} options ShortcutDetails对象实例
   * ShortcutDetails:
   *  target string 要通过此快捷方式启动的目标
   *  cwd string 可选 要在其中启动目标的工作目录 默认为空
   *  args string 可选 启动此快捷方式时应用于目标的参数 默认为空
   *  description string 可选 快捷方式的描述 默认为空
   *  icon string 图标的路径， 可以是dll或exe文件。icon和iconIndex必须在一起设置。默认为空，此时使用target的图标
   *  iconIndex number 可选 当icon是dll或exe文件时，图标的资源ID。默认为0。
   *  appUserModelId string 可选 应用程序用户模型ID。默认为空
   *  toastActivatorClsid string 可选 应用程序Toast 激活器 CLSID。参与操作中心时需要此字段
   *  
   * @returns boolean 快捷方式是否创建成功
   */
  'shell-write-shortcut-link': (shortcutPath, operation, options) => {
    return shell.writeShortcutLink(shortcutPath, operation, options)
  },
  'shell-read-shortcut-link': (shortcutPath) => {
    return shell.readShortcutLink(shortcutPath)
  },
}

if (process.platform === 'win32') {
  Object.assign(shellHandlers, shellHandlersInWindows)
}

module.exports = {  shellHandlers }