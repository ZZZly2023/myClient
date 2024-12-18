## process模块说明
Electron 模块的 process 对象是Node.js process 对象扩展而来。同时添加了新的事件、属性和方法

在沙盒环境中，process 对象仅包含API的子集：
* 实例方法：
  * crash()
  * hang()
  * getCreationTime()
  * getHeapStatistics()
  * getBlinkMemoryInfo()
  * getSystemMemoryInfo()
  * getProcessMemoryInfo()
  * getSystemVersion()
  * getCPUUsage()
  * uptime()
* 实例属性
  * argv
  * env
  * execPath
  * pid
  * arch
  * platform
  * sandboxed
  * contextIsolated
  * type
  * versions
  * mas
  * windowsStore
  * contextId

### 实例属性：
1. process.defaultApp 只读 boolean
 * 处理命令行参数：在开发模式下，通过electron . 方式启动应用，defaultApp 为 true。而打包后，通过应用的图标启动，defaultApp 为 false。
可以根据这个特性，结合process.argv截取启动参数

2. process.isMainFrame 只读 boolean
 * 如果当前上下文环境是主渲染窗口，返回true。

3. process.mas 只读 boolean
 * mac app store 版本此属性为true，其他版本为undefined

4. process.noAsar
 * 用于控制是否其使用asar。true将禁用

5. process.noDeprecation
 * 用于控制是否启用弃用警告。true将禁用. 此属性可替代命令行参数--no-deprecation

6. process.resourcesPath 只读 string
 * 打包后，process.resourcesPath 指向打包后的resources目录。mac上是.app/Contents/Resources；windows上.resources目录

7. process.sandboxed 只读 boolean
 * 用于判断是否在沙盒环境中运行。true表示在沙盒环境中运行。否则值为undefined

8. process.contextIsolated 只读 boolean
 * 用于判断当前上下文是否启用了contextIsolation。 主进程中是undefined

9. process.throwDeprecation
 * 用于控制是否抛出弃用警告。true将抛出。此属性可替代命令行参数--throw-deprecation

10. process.traceDeprecation
 * 用于控制是否跟踪弃用警告。true将跟踪。此属性可替代命令行参数--trace-deprecation

11. process.traceProcessWarnings
 * 用于控制是否跟踪进程警告。true将跟踪。此属性可替代命令行参数--trace-warnings

12. process.type
  * 当前进程的类型:
    * browser 主进程
    * renderer 渲染进程
    * worker 工作进程
    * utility 工具进程
13. process.versions 
  * 版本信息
    * electron 版本
    * chrome 版本
    * node 版本
    * v8 版本
    * uv 版本
14. process.windowsStore
  * windows store 版本此属性为true，其他版本为undefined
15. process.contextId
  * 表示当前上下文的全局唯一ID。当启用contextIsolation时，隔离的环境中也会又一个单独的js上下文。

16. process.parentPort
  * 如果是UtilityProcess，则为Electron.ParentPort属性

### 实例方法
1. process.crash()
  * 使当前进程的主线程崩溃。
2. process.getCreatingTime()
  * 返回进程创建时间。毫秒
3. process.getCPUUsage()
  * 返回当前进程的CPU使用情况。
4. process.getHeapStatistics()
  * 返回当前进程的堆统计信息。
    * totalHeapSize 整数，字节；V8堆内存的总大小。已经分配和未分配的内存和。
    * totalHeapSizeExecutable 
    * totalPhysicalSize V8堆内存的物理使用量。表示实际占用的内存量
    * totalAvailableSize
    * usedHeapSize 已使用V8堆内存的大小。
    * heapSizeLimit V8堆内存的最大阈值，超过后将进行垃圾回收。
    * mallocedMemory 通过 malloc 分配的内存总量。这通常指的是 C++ 代码中通过 malloc 或其他低级内存分配函数分配的内存量。
    * peakMallocedMemory
    * doesZapMemory
5. process.getSystemMemoryInfo()
  * 返回系统内存信息。
    * total 系统物理内存总量 千字节
    * free 排除磁盘或应用缓存的可用内存量
6. process.getBlinkMemoryInfo() 单位：千字节
  * 返回一个带有 Blink 内存信息的对象。
    * allocated 所有已经分配对象的大小。
    * total 分配的总空间
7. process.getProcessMemoryInfo()
  * 返回Promise<ProcessMemoryInfo> 千字节
8. process.getSystemMemoryInfo()
  * 返回一个包含系统内存信息的对象。
    * total 系统物理内存总量 千字节
    * free 排除磁盘或应用缓存的可用内存量
    * swapTotal windwow|linux 系统可用的可交换内存总量 千字节
    * swapFree 系统可用的可交换内存量 千字节
9. process.getSystemVersion()
  * 返回系统版本字符串。
10. process.takeHeapSnapshot(filePath) 
  * 拍摄V8堆内存快照，并保存到filePath
11. process.hang()
  * 使当前进程的主线程挂起。
12. process.setFdLimit(limit)
  * 设置进程的文件描述符限制。 mac|linux


