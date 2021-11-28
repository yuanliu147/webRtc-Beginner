if(!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    console.error('浏览器不支持~')
}

let mediaDataStream
let mediaRecorder
let buffer // 字节数组
const constraints = {
    audio: {
        volume: 1,
        sampleRate: 46000,
        echoCancellation: true,
        noiseSuppression: true,
        latency: 30,
        channelCount: 2
    },
    video: {
        frameRate: 60,
        facingMode: 'resizeMode',
        resizeMode: 'crop-and-scale',
    }
}

const promise = navigator.mediaDevices.getUserMedia(constraints)
// const promise = navigator.mediaDevices.getDisplayMedia(constraints)
const videoElem = document.getElementById('video')
promise.then(stream => {
    console.log(stream.getVideoTracks()[0].getSettings())
    // console.log(stream.getVideoTracks())
    mediaDataStream = stream // 将媒体流数据保存到mediaDataStream
    videoElem.srcObject = stream
})

// 开始录制
function start() {
    buffer = []
    mediaRecorder = new MediaRecorder(mediaDataStream, { mimeType: 'video/webm;codecs=vp8'})
    mediaRecorder.ondataavailable = function (e) {
        if(e && e.data && e.data.size > 0) {
            buffer.push(e.data)
        }
    }
    mediaRecorder.start(1) // 10为时间片，每隔10ms将数据接收
}
// 停止录制
function stop() {
    mediaRecorder.stop()
}
// 回放
function rePlay() {
    const blob = new Blob(buffer, { type: 'video/webm'})
    const rePlayVideo = document.getElementById('rePlayVideo')
    const fileReader = new FileReader()
    console.log('fileReader: ', fileReader)
    fileReader.readAsDataURL(blob)
    fileReader.onload = function () {
        rePlayVideo.src = fileReader.result // 读取二进制文件并不会返回，而是保存在result
        // rePlayVideo.src = window.URL.createObjectURL(blob) // 将二进制数据转为url
        rePlayVideo.controls = true
        rePlayVideo.play()
    }
}