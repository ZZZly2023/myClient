## WebContentsView 主进程模块
在app模块ready事件之和使用。用于显示WebContents的视图
窗口中包含view，views中设置webContents
```javascript
const { BaseWindow, webContentsView } = require('electron/main')
const win = new BaseWindow({
    width: 800,
    height: 600
})
const view = new webContentsView()

// 添加视图到窗口中
win.contentView.addChildView(view)

wiew.webContents.loadURL('https://electron.nodejs.cn')

// 设置子视图的位置和大小
view.setBounds({
    x: 0,
    y: 0,
    width: 400,
    height: 600
})
```
### 类 WebContentsView继承自View
new webContentsView([options])
* options
    * webPreferences WebPreferences 可选 网页功能设置
    * webContents WebContents 可选 如果存在，给定的WebContents将由WebContentsView采用。WebContents一次只能在一个WebContentsView中显示。
创建WebContentsView实例
### 实例属性
1. view.webContents 只读

## 类 View
new View()
创建一个新的View
### 实例事件
1. 'bounds-changed'
当视图的边界因为布局而发生变化时发出。可以使用view.getBounds()获取视图的新边界。
### 实例方法
1. view.addChildView(view[, index])
  * view 要添加的子视图
  * index Number 可选 插入子视图的索引。默认将子项添加到子项列表的末尾
如果将相同的视图添加到已包含它的父视图中，它将重新排序，使其成为最顶层的视图。
2. view.removeChildView(view)
  * view 要删除的子视图
必须是视图的子视图才可以删除
3. view.setBounds(bounds)
  * bounds Rect 设置新的边界
4. view.getBounds()
return Rect 此视图相对于其父级的边界
5. view.setBackgroundColor(color)
  * color 字符串 颜色格式或名称
6. view.setVisible(visible)
  * visible boolean 如果为false 则视图将隐藏

### 实例属性
1. view.children 只读
代表该视图的子视图的View[]属性

  