const { app, Menu, Tray } = require('electron/main')

let tray = null

app.whenReady().then(() => {
  tray = new Tray('src/assets/tray.png')
  const contextMenu = Menu.buildFromTemplate([
    { label: 'Item1', type: 'radio' },
    { label: 'Item2', type: 'radio' },
    { label: 'Item3', type: 'radio', checked: true },
    { label: 'Item4', type: 'radio' },
  ])
  tray.setPressedImage('src/assets/trayPresed.png')
  tray.setToolTip('This is my application.')
  tray.setContextMenu(contextMenu)
  subscribeEvent()
})

app.on('quit', () => {
  tray.destroy()
  tray = null
})

function subscribeEvent() {
  // 点击托盘图标
  tray.on('click', (event, bounds, position) => {
    console.log('tray click')
  })
  // 双击托盘图标
  tray.on('double-click', (event, bounds) => {
    console.log('tray double-click')
  })
  // 右键点击托盘图标
  tray.on('right-click', (event, bounds) => {
    console.log('tray right-click') 
  })
  tray.on('mouse-enter', (event, position) => { 
    console.log('tray mouse-enter')
  }) 
  tray.on('mouse-leave', (event, position) => {
    console.log('tray mouse-leave')
  })
  tray.on('mouse-move', (event, position) => {
    console.log('tray mouse-move')
  })
  if (process.platform === 'darwin') {
    subscribeEventInMac()
  } else if (process.platform === 'win32') {
    subscribeEventInWindows()
  }
  
}

function subscribeEventInMac() {
  // 任何拖动的项目放到托盘图标上时发出
  tray.on('drop', () => {
    console.log('tray drop')
  })
  // 当拖动的文件放入托盘图标时发出
  tray.on('drop-files', (event, files) => {
    console.log('tray drop-files', files)
  })

  // 当拖动的文本放入托盘图标时发出
  tray.on('drop-text', (event, text) => {
    console.log('tray drop-text', text)
  })

  // 当拖动操作进入托盘时发出
  tray.on('drag-enter', () => {
    console.log('tray drag-enter')
  })
  // 当拖动操作退出托盘图标时发出
  tray.on('drag-leave', () => {
    console.log('tray drag-leave')
  })
  // 当拖动操作在托盘图标上时发出
  tray.on('drag-end', () => {
    console.log('tray drag-end')
  })
  // 当单击托盘图标释放鼠标时发出
  tray.on('mouse-up', (evnt, position) => {
    console.log('tray mouse-up')
  })
  tray.on('mouse-down', (event, position) => {
    console.log('tray mouse-down')
  })

}

function subscribeEventInWindows(){
  // 鼠标中键点击托盘图标
  tray.on('middle-click', (event, bounds) => {
    console.log('tray middle-click')
  })
  // 当托盘气球显示时发出。
  tray.on('balloon-show', () => {
    console.log('balloon-show')
  })
  // 当托盘气球关闭时发出。
  tray.on('balloon-closed', () => {
    console.log('balloon-closed') 
  })
  // 当托盘气球点击时发出。
  tray.on('balloon-click', () => {
    console.log('balloon-click')
  })
}

