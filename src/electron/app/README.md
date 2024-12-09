## app模块实例属性

app.accessibilitySupportEnabled
* 如果启用了 Chrome 的辅助功能支持，则 boolean 属性为 true，否则为 false

app.applicationMenu
* 如果已经设置，返回Menu对象，否则null

app.badgeCount linux macOS
* 当前应用的徽章计数

app.commandLine
* 返回CommandLine对象， 允许读取和操作chromium使用的命令行参数

app.dock macos
* 返回Dock对象， 允许对dock中的应用图标执行操作

app.isPackaged
* 如果应用已打包，则返回true，否则返回false，此属性可用于区分开发和生产环境

app.name
* 返回应用的名称

app.userAgentFallback
* string 是用户代理字符串

app.runningUnderARM64Translation 只读 macOS Windows
* boolean 为 true 表示应用当前正在 ARM64 转换器下运行
* 可以使用此属性提示用户下载你的应用的arm64版本