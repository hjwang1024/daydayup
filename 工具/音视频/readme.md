# <center>音视频</center>

## 媒体流

#### 1.[navigator.mediaDevices.getUserMedia(constraints)](https://developer.mozilla.org/zh-CN/docs/Web/API/MediaDevices/getUserMedia)

通过这个API可以获取媒体流权限，方法的参数是一个配置对象，可以配置媒体流类型以及分辨率等信息。可以通过`navigator.mediaDevices.getSupportedConstraints()` 获取 `constraints` 参数中具体支持的配置项 

```js
// 可配置 audio video为true 获取麦克风和摄像头的权限
// 默认constraints参数
let constraints = { 
    audio:true,
    video:true
}
// 获取本地音视频流
async function getLocalStream(constraints: MediaStreamConstraints) {
  // 获取媒体流
  const stream = await navigator.mediaDevices.getUserMedia(constraints)
  return stream
}
// video 中也可以设置设备 id、前后置摄像头以及获取视频的宽高
navigator.mediaDevices.getUserMedia({
  audio: false,
  video: {
    width: 1280,
    height: 720,
  },
})
```

#### 2.结合video和canvas可实现的拍照功能

通过获取已经在播放媒体流的 video 标签，然后将其绘制到 canvas 上，再通过 `toDataURL` 方法将 canvas 转换为 base64 图片。

#### 3.navigator.mediaDevices.enumerateDevices

通过这个API可以获取到设备列表(移动设备的后置摄像等)，并且可以通过`deviceId`来切换设备,`kind`字段表示设备类型，eg:`videoinput`表示视频输入设备
```js
// 获取所有视频输入设备
async function getDevices() {
  const devices = await navigator.mediaDevices.enumerateDevices()
  console.log('devices', devices)
  let videoDevices = devices.filter((device) => device.kind === 'videoinput')
}
// 切换设备
function handleDeviceChange(deviceId: string) {
  const stream = await navigator.mediaDevices.getUserMedia({
    audio: false,
    video: {
      deviceId: { exact: deviceId },
    },
  })
}
// 切换前后摄像头
// 通过指定 facingMode 来实现，facingMode 有 4 个值，分别是 user(前)、environment(后) 和 left、right
function switchCamera() {
  let constraints = {
    video: true, // 开启默认摄像头
    audio: true,
  }
  constraints.video = {
    // 强制切换前后摄像头时，当摄像头不支持时，会报一个OverconstrainedError［无法满足要求的错误］
    // facingMode: { exact: 'environment' },
    // 也可以这样当前后摄像头不支持切换时，会继续使用当前摄像头，好处是不会报错
    facingMode:  'environment',
  }
}
```

#### 4.[navigator.mediaDevices.getDisplayMedia(constraints)](https://developer.mozilla.org/zh-CN/docs/Web/API/MediaDevices/getDisplayMedia)

使用方法与`getUserMedia`类似，可以获取屏幕的媒体流(屏幕共享)
```js
// 获取屏幕共享的媒体流
async function shareScreen() {
  let localStream = await navigator.mediaDevices.getDisplayMedia({
    audio: true,
    video: true,
  })
  // 播放本地视频流
  playStream(localStream)
}

// 在视频标签中播放视频流
function playStream(stream: MediaStream) {
  const video = document.querySelector('#localVideo')
  video.srcObject = stream
}
```

#### 5.[MediaRecorder](https://developer.mozilla.org/zh-CN/docs/Web/API/MediaRecorder)
`MediaRecorder`是录制媒体流的 API
但是 `MediaRecorder` 对mimeType 参数的支持是有限的。所以我们需要通过 `MediaRecorder.isTypeSupported` 来判断当前浏览器是否支持我们需要的 mimeType。

- chrome 中 MediaRecorder 支持的 mimeType 如下：
    ```js
    "video/webm"
    "video/webm;codecs=vp8"
    "video/webm;codecs=vp9"
    "video/webm;codecs=h264"
    "video/x-matroska;codecs=avc1"
    ```
- 常用的视频编码 ```['vp9', 'vp9.0', 'vp8', 'vp8.0', 'avc1', 'av1', 'h265', 'h264']```
- 常用的视频格式 ```['webm','mp4','ogg','mov','avi','wmv','flv','mkv','ts','x-matroska']```
```js
const options = {
    audioBitsPerSecond: 128000,
    videoBitsPerSecond: 2500000,//返回视频采用的编码比率
    mimeType: 'video/webm; codecs="vp8,opus"',
}
const mediaRecorder = new MediaRecorder(localStream, options)
// 录制开始
mediaRecorder.start()

mediaRecorder.ondataavailable = (e) => {
    // 收集录制的媒体流
}
// 停止录制 同时触发dataavailable事件
mediaRecorder.onstop = (e: Event) => {
    // 生成blob后可供下载（URL.createObjectURL + a标签）
    const blob = new Blob([e.data], { type: 'video/mp4' })
}

```


## (WebRTC)[https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API]

- WebRTC (Web Real-Time Communications) 是一项实时通讯技术，它允许网络应用或者站点，在不借助中间媒介的情况下，建立浏览器之间点对点（Peer-to-Peer）的连接
- WebRTC可以实现视频流和（或）音频流或者其他任意数据的传输。
- WebRTC 包含的这些标准可以使用户在无需安装任何插件或者第三方的软件的情况下，创建点对点（Peer-to-Peer）的数据分享和电话会议。
- WebRTC 只能在 HTTPS 协议或者 localhost 下使用，如果是 HTTP 协议，会报错。
- 引入 adpater.js 来适配各浏览器

### 优势
- 跨平台(Web、Windows、MacOS、Linux、iOS、Android)
- 实时传输
- 音视频引擎
- 免费、免插件、免安装
- 主流浏览器支持
- 强大的打洞能力

### 应用场景
- 在线教育
- 音视频会议
- 即时通讯工具
- 直播
- 共享远程桌面
- P2P网络加速
- 游戏

### 相关API
- RTCPeerConnection 接口代表一个由本地计算机到远端的 WebRTC 连接。该接口提供了创建、保持、监控、关闭连接的方法的实现。
- PC.createOffer 创建提议 Offer 方法，此方法会返回 SDP Offer 信息。
- PC.setLocalDescription 设置本地 SDP 描述信息。
- PC.setRemoteDescription 设置远端 SDP 描述信息，即对方发过来的 SDP 数据。
- PC.createAnswer 创建应答 Answer 方法，此方法会返回 SDP Answer 信息。
- RTCIceCandidate WebRTC 网络信息(IP、端口等)
- PC.addIceCandidate PC 连接添加对方的 IceCandidate 信息，即添加对方的网络信息。

### WebRTC 建立连接步骤
1. 为连接的两端创建一个 RTCPeerConnection 对象，并且给 RTCPeerConnection 对象添加本地流。
2. 获取本地媒体描述信息(SDP)，并与对端进行交换。
3. 获取网络信息(Candidate，IP 地址和端口)，并与远端进行交换。

![流程图](./WebRTC.jpeg)




## 相关文章
- [前端音视频WebRTC实时通讯的核心](https://juejin.cn/post/6884851075887661070)
- [WebRTC：会话描述协议SDP](https://zhuanlan.zhihu.com/p/75492311)
- [WebRTC 从实战到未来！迎接风口，前端必学的技术](https://juejin.cn/post/7151932832041058340#comment)

