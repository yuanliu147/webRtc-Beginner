if(!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    console.error('浏览器不支持~')
}

const constraints = {
    audio: true,
    video: true
}

const propmise = navigator.mediaDevices.getUserMedia(constraints)

const videoElem = document.getElementById('video')
propmise.then(stream => {
    videoElem.srcObject = stream
})
