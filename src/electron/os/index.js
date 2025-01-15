const os = require('node:os');
const handlers = {
  'get-os-platform': () => {
    return os.platform()
  },
  'get-os-type': () => {
    return os.type()
  }
}

module.exports = {
  osHandlers: handlers
}