## ShareMenu 模块 MacOS
ShareMenu 类在macOS 上创建 共享菜单。

## 类 ShareMenu 主进程模块
new ShareMenu(sharingItem) 创建新的共享菜单。

## 实例方法：
1. shareMenu.popup([options])
弹出菜单
options：
  * browserWindow 可选 默认是聚焦窗口
  * x 默认为鼠标光标的位置，可选
  * y 默认为鼠标光标的位置，可选
  * positionItem number（可选）macOS 要定位在鼠标光标下方指定坐标处的菜单项的索引。默认值为-1.
  * callback 可选 菜单关闭时调用
2. shareMenu.closePopup([browserWindows])
关闭browserWindow中的上下文菜单。
