// const targetNode = document.createElement('div');
// targetNode.innerHTML = `react is working`;
// document.body.appendChild(targetNode);

// renderer.js
// const startButton = document.getElementById('startButton')
// const stopButton = document.getElementById('stopButton')
// const recordButton = document.getElementById('recordButton')
// const video = document.querySelector('video')
// let mediaRecorder, mediaStream, recordedChunks = []

// startButton.addEventListener('click', () => {
//   navigator.mediaDevices.getDisplayMedia({
//     audio: true,
//     video: true
//   }).then(stream => {
//     video.srcObject = stream
//     mediaStream = stream
//     video.onloadedmetadata = (e) => video.play()
//   }).catch(e => console.log(e))
// })

// stopButton.addEventListener('click', () => {
//   const tracks = mediaStream?.getTracks()
//   tracks?.forEach((track) => track.stop())
//   video.srcObject = null
//   video.pause()
//   mediaStream = null
//   mediaRecorder = null
//   recordedChunks.length = 0
// })

// recordButton.addEventListener('click', () => {
//   if (mediaStream) {
//     if (!mediaRecorder) {
//       recordButton.innerText = 'Recording'
//       mediaRecorder = new MediaRecorder(mediaStream, { mimeType: 'video/webm;codecs=vp9' })
//       mediaRecorder.ondataavailable = (e) => {
//         recordedChunks.push(e.data)
//       }
//       mediaRecorder.onstop = async () => {
//         const blob = new Blob(recordedChunks, {
//           type: 'video/webm'
//         })
//         const arrayBuffer = await blob.arrayBuffer()
//         // const buffer = Buffer.from(arrayBuffer)
//         const { filePath } = await renderer.cmdAsync('dialog-show-save-dialog', {
//           title: '保存视频',
//           filters: [
//             { name: '视频录制保存', extensions: ['webm'] }
//           ]
//         })
//         const res = await renderer.cmdAsync('save-file', { buffer: arrayBuffer, path: filePath })
//       }
//       mediaRecorder.start()
//     } else {
//       recordButton.innerText = 'Record'
//       mediaRecorder.stop()
//       mediaRecorder = null
//       recordedChunks.length = 0
//     }
//   }
// })
