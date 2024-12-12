const { powerSaveBlocker } = require('electron/main')
let sleepBlocker, suspenseBlocker
const powerSaveBlockerHandler = {
    // 更高优先级
    'block-sleep': () => {
        if (sleepBlocker) {
            powerSaveBlocker.stop(sleepBlocker)
            sleepBlocker = null
        }
        sleepBlocker = powerSaveBlocker.start('prevent-display-sleep')
    },
    // 较低优先级
    'block-suspense': () => {
        if (suspenseBlocker) {
            powerSaveBlocker.stop(suspenseBlocker)
            suspenseBlocker = null
        }
        suspenseBlocker = powerSaveBlocker.start('prevent-app-suspension')
    },
    'stop-block-sleep': () => {
        if (sleepBlocker) {
            powerSaveBlocker.stop(sleepBlocker)
            sleepBlocker = null
        }
    },
    'stop-block-suspense': () => {
        if (suspenseBlocker) {
            powerSaveBlocker.stop(suspenseBlocker)
            suspenseBlocker = null
        }
    }

}

module.exports = {
    powerSaveBlockerHandler
}