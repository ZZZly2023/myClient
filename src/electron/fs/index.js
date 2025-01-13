const { writeFile } = require('node:fs/promises')
const { Buffer } = require('node:buffer');
const handlers = {
  'save-file': async ({buffer, path} = args) => {
    if (buffer && path) {

      const res = await writeFile(path, Buffer.from(buffer))
      return res
    }
  },
}

module.exports = {
  fileHandlers: handlers
}