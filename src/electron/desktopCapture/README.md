## desktopCapture 模块
desktopCapture.getSources(options).then((sources) => {})
* options
    * types: ['window', 'screen'] // 要捕获的桌面类型window: 窗口，screen: 屏幕
    * thumbnailSize: { width: 100, height: 100 } // 缩略图大小 如果不需要缩略图，将宽度或高度设置为0
    * fetchWindowIcons: true // 是否获取窗口图标 默认值为false