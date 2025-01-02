## <webview>标签
Electron的webview标签基于Chromium的webview，后者正在经历巨大的架构变化，会影响webviews的稳定性。可以考虑替代方案：iframe、WebContentsView或完全避免嵌入内容的架构。

### 启用
在Electron>=5版本中，默认禁用。需要在构建BrowserWindow时通过设置webviewTag webPreferences选项来启用该标签。
注意，webview在不同的进程中运行。
### 内部实现 
webview本质是一个自定义元素。使用shadow DOM 将iframe元素封装在其中。
因此webview的行为与跨域iframe非常相似，如：
1. 单击webview时，页面焦点将从嵌入器框架移至webview
2. 无法向webview添加键盘、鼠标和滚动事件监听器。
3. 嵌入器框架和webview之间的所有反应都是异步的。

### 标签属性
1. src
代表可见URL的string
2. nodeintegration boolean
当此属性存在时， webview中的页面具有node集成，并且可以使用require和process等Node API来访问底层系统资源。默认情况下禁用
3. nodeintegrationinsubframes boolean
用于在子框架（如webview内的iframe）中启用NodeJS支持的实验选项，你的所有预加载将为每个iframe加载。默认情况下，此选项在访客页面中禁用。
4. plugins boolean
此属性存在时，webview中的访客页面将能够使用浏览器插件。默认情况下禁用插件。
5. preload string
指定将在访客页面中运行其他脚本之前加载的脚本。必须是file协议
6. httpreferrer string 用于设置页面的referrer地址
7. useragent string
用于在导航到访客页面之前设置访客页面的用户代理。页面加载后无法更改。
8. disablewebsecurity boolean
当此属性存在时，访客页面将禁用网络安全。默认情况下启用网络安全。
该值只能在第一次导航之前修改
9. partition string
设置页面使用的会话。 如果partition以persist:开头，则页面将使用应用中具有相同partition的所有页面的持久会话。
如果没有perisit: 前缀，该页面将使用内存会话。
通过分配相同的partition，多个页面可以共享同一个会话。如果未设置partition，将使用默认会话。
该值只能在第一次导航之前修改。
10. allowpopups boolean
当此属性存在时，访客页面将被允许打开新窗口。默认情况下禁用弹出窗口。
11. webpreferences string
是逗号分割的字符串列表，指定要再web视图上设置的Web首选项。
12. enablelinkfeatures string 指定要启用的闪烁功能，逗号分割
13. disablelinkfeatures string 指定由","分割的要禁用的闪烁功能