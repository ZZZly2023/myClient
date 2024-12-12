const { globalShortcut } = require('electron/main');

const shortcuthandler = {
  // 注册快捷键，返回boolean。 是否注册成功
  // 当用户按下注册的快捷键时，会触发callback
  // 快捷键如果已被占用，则不会触发callback
  'global-shortcut-register': (accelerator, callback) => {
    return globalShortcut.register(accelerator, callback)
  },
  'global-shortcut-register-all': (accelerators , callback) => {
    return globalShortcut.registerAll(accelerators, callback)
  },
  'global-shortcut-is-registered': (accelerator) => {
    return globalShortcut.isRegistered(accelerator)
  },
  'global-shortcut-unregister': (accelerator) => {
    return globalShortcut.unregister(accelerator)
  },
  'global-shortcut-unregister-all': () => {
    return globalShortcut.unregisterAll()
  }
}

module.exports = {
  shortcuthandler
}