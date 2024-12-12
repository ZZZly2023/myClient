const { clipboard } = require('electron/main');

const clipboardHandlers = {
  // 从粘贴版读取纯文本
  'clipboard-read-text': () => {
    clipboard.clear()
    return clipboard.readText()
  },
  // 纯文本存入粘贴板
  'clipboard-write-text': (text) => {
    return clipboard.writeText(text)
  },
  // 从粘贴板读取HTML
  'clipboard-read-html': () => {
    return clipboard.readHTML()
  },
  // HTML存入粘贴板
  'clipboard-write-html': (html) => {
    return clipboard.writeHTML(html)
  },
  'clipboard-read-image': () => {
    clipboard.clear()
    return clipboard.readImage()
  },
  'clipboard-write-image': (image) => {
    return clipboard.writeImage(image)
  },
  'clipboard-read-rtf': () => {
    clipboard.clear()
    return clipboard.readRTF()
  },
  'clipboard-write-rtf': (rtf) => {
    return clipboard.writeRTF(rtf)
  },
  'clipboard-read-bookmark': () => {
    clipboard.clear()
    return clipboard.readBookmark()
  },
  'clipboard-write-bookmark': (bookmark) => {
    return clipboard.writeBookmark(bookmark)
  },
  /**
   * 将data写入粘贴板
   * @param {*} data
   *  text  纯文本可选
   *  html  html可选
   *  rtf   rtf可选
   *  image image可选
   *  bookmark 书签可选
   * @returns 
   */
  'clipboard-write': (data) => {
    return clipboard.write(data)
  }
}

module.exports = {
  clipboardHandlers
}