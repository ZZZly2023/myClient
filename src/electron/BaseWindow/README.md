## BaseWindow说明
BaseWindow是electron主进程模块，它提供了单窗口中组合多个web视图的方式。对于只有一个全尺寸web视图，使用BrowserWindow更合适。

示例1. 
```javascript
// In the main process.
const { BaseWindow, WebContentsView } = require('electron')

const win = new BaseWindow({ width: 800, height: 600 })

// 通过WebContentsView类创建一个web视图
const leftView = new WebContentsView()
// 子视图通过webContents属性，加载一个网页
leftView.webContents.loadURL('https://electron.nodejs.cn')
// 添加到主窗口中
win.contentView.addChildView(leftView)

const rightView = new WebContentsView()
rightView.webContents.loadURL('https://github.com/electron/electron')
win.contentView.addChildView(rightView)

// 设置子视图的位置和大小
leftView.setBounds({ x: 0, y: 0, width: 400, height: 600 })
rightView.setBounds({ x: 400, y: 0, width: 400, height: 600 })

```
示例2. 父窗口和子窗口
通过parent选项，设置子窗口的父窗口。
```javascript
const { BaseWindow } = require('electron')
const parentWin = new BaseWindow({ width: 800, height: 600 })
const childWin = new BaseWindow({ width: 400, height: 300, parent: parentWin })
```

模态窗口：禁用父窗口的子窗口（父窗口是禁用态）使用modal选项
```javascript
const { BaseWindow } = require('electron')
const parentWin = new BaseWindow({ width: 800, height: 600 })
const childWin = new BaseWindow({ width: 400, height: 300, parent: parentWin， modal: true })
```

## 注意
在macos上，当父窗口移动时，子窗口将保持与父窗口的相对位置；而在windows和linux上，子窗口不会移动。

## 构造函数参数new BaseWindow(options)
options参数说明：
1. width
2. height
3. x
4. y
5. useContentSize 
6. center
7. minWidth
8. minHeight
9. maxWidth
10. maxHeight
11. resizable
12. movable
13. minimizable
14. maximizable
15. closeable
16. focusable
17. alwaysOnTop
18. fullscreen
19. fllscreenable
20. simpleFullscreen
21. skipTaskbar
22. hiddenInMissionControl
23. kiosk 窗口是否处于kiosk模式
24. title
25. icon
26. show
27. frame
28. parent
29. modal
30. acceptFirstMouse
31. disableAutoHideCursor
32. autoHideMenuBar
33. enableLargerThanScreen
34. backgroundColor
35. hasShadow
36. opacity
37. darkTheme
38. transparent
39. type
40. visualEffectState 与 vibrancy 属性一起使用
41. titleBarStyle
42. titleBarOverlay
43. trafficLightPosition
44. roundedCorners
45. thickFrame
46. vibrancy
47. backgroundMaterial
48. zoomToPageWidth
49. tabbingIdentifier


## 实例事件名
1. close
2. closed
3. session-end
4. blur
5. focus
6. show
7. hide
8. maximize
9. unmaximize
10. minimize
11. restore
12. will-resize
13. resize
14. will-move
15. move
16. moved
17. enter-full-screen
18. leave-full-screen
19. always-on-top-changed
20. app-command
21. swipe
22. rotate-gesture
23. sheet-begin
24. sheet-end
25. new-window-for-tab
26. system-context-menu

##  静态方法
1. getAllWindows()
2. getFocusedWindow()
3. fromId(id)

## 实例属性
1. id
2. contentView
3. tabbingIdentifier
4. autoHideMenuBar
5. simpleFullscreen
6. fullscreen
7. focusable
8. visibleOnAllWorkspaces
9. shadow
10. menuBarVisible
11. kiosk
12. documentEdited  
13. representedFilename
15. title
16. minimizable
17. maximizable
18. fullscreenable
19. resizable
20. closable
21. movable
22. excludedFromWindowsMenu
23. accessibleTitle

## 实例方法
1. win.setContentView(view)
2. win.getContentView()
3. win.destroy()
4. win.close()
5. win.focus()
6. win.blur()
7. win.isFocused()
8. win.isDestroyed()
9. win.show()
10. win.showInactive()
11. win.hide()
12. win.isVisible()
13. win.isModal()
14. win.maximize()
15. win.unmaximize()
16. win.isMaximized()
17. win.minimize()
18. win.restore()
19. win.isMinimized()
20. win.setFullScreen(flag)
21. win.isFullScreen()
22. win.setSimpleFullScreen(flag)
23. win.isSimpleFullScreen()
24. win.isNormal()
25. win.setAspectRatio(ratio)
26. win.setBackgroundColor(color)
27. win.previewFile(filePath)
28. win.closeFilePreview()
29. win.setBounds(bounds)
30. win.getBounds()
31. win.setContentBounds(bounds)
32. win.getContentBounds()
33. win.getNormalBounds()
34. win.setEnabled(flag)
35. win.isEnabled()
36. win.setSize(width, height)
37. win.getSize()
38. win.setContentSize(size)
39. win.getContentSize()
40. win.setMinimumSize(width, height)
41. win.getMinimumSize()
42. win.setMaximumSize(width, height)
43. win.getMaximumSize()
44. win.setResizable(flag)
45. win.isResizable()
46. win.setMovable(flag)
47. win.isMovable()
48. win.setMinimizable(flag)
49. win.isMinimizable()
50. win.setMaximizable(flag)
51. win.isMaximizable()
52. win.setFullScreenable(flag)
53. win.isFullScreenable()
54. win.setClosable(flag)
55. win.isClosable()
56. win.setHiddenInMissionControl(flag)
57. win.isHiddenInMissionControl()
58. win.setAlwaysOnTop(flag)
59. win.isAlwaysOnTop()
60. win.moveAbove(otherWindow)
61. win.moveTop()
62. win.center()
63. win.setPosition(x, y)
64. win.getPosition()
65. win.setTitle(title)
66. win.getTitle()
67. win.setSheetOffset(offset)
68. win.flashFrame(flag)
69. win.setSkipTaskbar(flag)
70. win.setKiosk(flag)
71. win.isKiosk()
72. win.isTabletMode()
73. win.getMediaSourceId()
74. win.getNativeWindowHandle()
75. win.hookWindowMessage(message, callback)
76. win.isWindowMessageHooked(message)
77. win.unhookWindowMessage(message)
78. win.setRepresentedFilename(filename)
79. win.getRepresentedFilename()
80. win.setDocumentEdited(flag)
81. win.isDocumentEdited()
82. win.setMenu(menu)
83. win.removeMenu()
84. win.setProgressBar(progress)
85. win.setOverlayIcon(icon, title)
86. win.isValidateShadow()
87. win.setHasShadow(flag)
88. win.hasShadow()
89. win.setOpacity(opacity)
90. win.getOpacity()
91. win.setShape(shape)
92. win.setThumbarButtons(buttons)
93. win.setThumbnailClip(region)
94. win.setThumbnailToolTip(toolTip)
95. win.setAppDetails(details)
96. win.setIcon(icon)
97. win.setWindowButtonVisibility(flag)
98. win.setAutoHideCursor(flag)
99. win.isMenuBarAutoHide()
100. win.setMenuBarVisibility(flag)
101. win.isMenuBarVisible()
102. win.setVisibleOnAllWorkspaces(flag)
103. win.setIgnoreMouseEvents(flag)
104. win.setContentProtection(protection)
105. win.setFocusable(flag)
106. win.isFocusable()
107. win.setParentWindow(parent)
108. win.getParentWindow()
109. win.getChildWindows()
110. win.setAutoHideCursor(flag)
111. win.selectPreviousTab()
112. win.selectNextTab()
113. win.showAllTabs()
114. win.mergeAllWindows()
115. win.moveTabToNewWindow()
116. win.toggleTabBar()
117. win.addTabbedWindow(baseWindow)
118. win.setVibrancy(type)
119. win.setBackgroundMaterial(type)
120. win.setWindowButtonPosition(position)
121. win.getWindowButtonPosition()
122. win.setTouchBar(touchBar)
123. win.setTitleBarOverlay(options)






