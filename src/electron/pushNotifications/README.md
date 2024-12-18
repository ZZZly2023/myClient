## pushNotifications
注册远程推送通知服务，并接收来自远程推送服务的通知

## 事件
1. 'received-apns-notification' macOS
返回：
 * event 事件
 * userInfo Record<String, any>
 当应用在运行时收到远程通知时发出。

 ## 方法
 1. pushNotifications.registerForAPNSNotifications() macOS
 返回Promise<string>
 向Apple推送通知服务APNS注册应用，以接收Badge、Sound、Alert通知。如果注册成功，返回设备令牌。

 2. pushNotifications.unregisterForAPNSNotifications() macOS
 从APNS中取消注册
