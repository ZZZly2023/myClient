
## 预加载脚本
/**
 * 1. 预加载脚本在web内容开始加载之前执行（在渲染进程中），可以访问node.js API
 * 2. 预加载脚本通过 browserWindow.webPreferences.preload 选项指定
 * 3. 由于contextIsolation默认为true，无法直接将node.js API或者变量暴露给window，
 *    需要使用contextBridge.exposeInMainWorld方法将变量暴露给window.
 * 4. 两个重要目的：
 *    1. 向渲染器公开ipcRenderer辅助程序，可以与主进程通信
 *       (可以访问electron模块的ipcRenderer模块，此模块可以与主进程通信，注意因为安全问题，不要直接将ipcRenderer暴露给window)
 *    2. 向window中暴露node.js等底层 API 或属性 添加到window中，使渲染器可以访问它们
 */

/**
 * 1. 从electron20开始，预加载脚本默认被沙箱化，并且不再能够访问完整的 Node.js 环境
 */