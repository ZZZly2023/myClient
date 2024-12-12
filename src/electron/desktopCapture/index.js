const { desktopCapturer, session, app } = require('electron/main')
const modal = {
  WINDOW: 'window',
  SCREEN: 'screen'
}

let currentMode = 'window'

app.whenReady().then(() => {
  session.defaultSession.setDisplayMediaRequestHandler((request, callback) => {
    desktopCapturer.getSources({ types: [currentMode], thumbnailSize: { width: 0, height: 0 } }).then((sources) => {
      callback({ video: sources[0], audio: 'loopback' })
    })
  }, {
    useSystemPicker: true
  })
})
// session.defaultSession.setDisplayMediaRequestHandler((request, callback) => {
//   desktopCapturer.getSources({ types: [currentMode], thumbnailSize: { width: 0, height: 0 } }).then((sources) => {
//     callback({ video: sources[0], audio: 'loopback' })
//   })
// }, {
//   useSystemPicker: true
// })

const handler = {
  'desktop-capture-set-window-sources': () => {
    currentMode = modal.WINDOW
  },
  'desktop-capture-set-screen-sources': () => {
    currentMode = modal.SCREEN
  }
}

module.exports = {
  desktopCapturerHandler: handler
}