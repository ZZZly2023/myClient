const { dialog } = require('electron/main');

const dialogHandlers = {
  /**
   * 弹出系统对话框（同步）
   * @param {*} win 
   * @param {*} options 
   *   1.title 
   *   2.defaultPath
   *   3.buttonLabel 确定按钮的自定义标签，为空时使用默认标签
   *   4.filters Filters数组
   *   5.properties  对话框的特性 string
   *      5.1 openFile 允许选择文件
   *      5.2 openDirectory 允许选择目录
   *      5.3 multiSelections 允许多选
   *      5.4 showHiddenFiles 显示隐藏文件
   *      5.5 createDirectory 允许在对话框中创建新目录（MacOS）
   *      5.6 promptToCreate 如果对话框中输入的文件路径不存在，则提示创建。（windows）
   *      5.7 noResolveAliases 禁用自动别名（符号链接）路径解析。（MacOS）
   *      5.8 treatPackageAsDirectory 将.app文件视为目录而不是文件。（MacOS）
   *      5.9 dontAddToRecent 不将文件添加到最近打开的文件列表中。（windwos）
   *   6.message 显示在输入框上方的消息（MacOS）
   *   7.securityScopedBookmarks 安全范围书签(MacOS) 为Mac App Store打包时创建安全范围书签
   * @returns string[] | undefined 返回用户选择的路径；如果对话框取消，则返回undefined
   * 注意： filters 可以指定用户选择的文件类型，如：{ name: 'Images', extensions: ['jpg', 'png', 'gif'] }（不要带.的后缀）
   * 所有文件：{ name: 'All Files', extensions: ['*'] }
   */
  'dialog-show-open-dialog-sync': (win, options) => {
    return dialog.showOpenDialogSync(win, options)
  },
  /**
   * 异步返回文件路径
   * @param {*} win 
   * @param {*} options 
   * @returns Promise<{canceled: boolean, filePaths: string[]}>
   */
  'dialog-show-open-dialog': (win, options) => {
    return dialog.showOpenDialog(win, options)
  },
  'dialog-show-save-dialog-sync': (win, options) => {
    return dialog.showSaveDialogSync(win, options)
  },
  'dialog-show-save-dialog': (win, options) => {
    return dialog.showSaveDialog(win, options)
  },
  /**
   * 显示一个消息框，它将阻塞进程，直到消息框关闭。它返回被单击按钮的索引。
   * @param {*} win 
   * @param {*} options 
   *  1.message 消息框的内容
   *  2.title 消息框的标题
   *  3.type 消息框的类型
   *     3.1 none 不显示任何按钮
   *     3.2 info 信息
   *     3.3 error 错误
   *     3.4 question 问题
   *     3.5 warning 警告
   * 4.buttons 按钮数组，在windows上，空数组会有一个OK的按钮
   * 5.defaultId 默认按钮的索引, 消息框打开时默认选中该按钮
   * 6.detail 详细信息
   * 7.icon 图标
   * 8.textWidth 文本的宽度(MacOS)
   * 9.noLink 不显示链接
   * 10.normalizeAccessKeys 将&符号解释为访问键
   * @returns number 点击的按钮的索引
   */
  'dialog-show-message-box-sync': (win, options) => {
    return dialog.showMessageBoxSync(win, options)
  },
  /**
   * 
   * @param {*} win 
   * @param {*} options 
   * @returns Promise<{response: number, checkboxChecked: boolean}>
   */
  'dialog-show-message-box': (win, options) => {
    return dialog.showMessageBox(win, options)
  },
  'dialog-show-error-box': (win, title, content) => {
    return dialog.showErrorBox(title, content)
  },
  'dialog-show-certificate-trust-dialog': (win, options) => {
    return dialog.showCertificateTrustDialog(win, options)
  }
}

module.exports = {
  dialogHandlers
}