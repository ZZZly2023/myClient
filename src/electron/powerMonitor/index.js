const { powerMonitor } = require("electron/main")

function registerEvent() {
    powerMonitor.on('suspend',() => {
        console.log("系统挂起")
    })
    powerMonitor.on('resume', () => {
        console.log("系统恢复")
    })
    powerMonitor.on('on-ac', () => {
        console.log("系统插入电源")
    })
    powerMonitor.on('on-battery', () => {
        console.log("系统更改为电池")
    })
    powerMonitor.on('speed-limit-change', (limit) => {
        console.log("cpus 速度变化")
    })
    powerMonitor.on('lock-screen', () => {
        console.log("系统即将锁屏")
    })
    powerMonitor.on('unlock-screen', () => {
        console.log("系统屏幕即将解锁")
    })
}

function registerEventInMac() {
    powerMonitor.on('thermal-state-change', (state) => {
        console.log('监听到系统热状态变化')
    })
    powerMonitor.on('shutdown', (event) => {
        // 当系统即将重启或关机时触发
        console.log("系统即将重启或关机")
    })
    powerMonitor.on('user-did-become-active', () => {
        console.log("应用被激活")
    })
    powerMonitor.on("user-did-resign-active", () => {
        console.log("应用被激活")
    })
}

module.exports = {
    registerPowerEvent: registerEvent
}