const { Notification } = require('electron/main')
let notification = null
const notifyHandlers = {
    'notify-create': (options) => {
        if (Notification.isSupported()) {
            if (!notification) {
                notification = new Notification({
                    title: '新消息提醒',
                    body: options?.bodyText,
                    silent: options?.silent || false,
                })
            }
            notification.show()
        }
    }
}

module.exports = {
    notifyHandlers
}