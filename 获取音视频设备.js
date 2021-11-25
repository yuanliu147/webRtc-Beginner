if(!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
    console.error('浏览器不支持')
}

const ePromise = navigator.mediaDevices.enumerateDevices()

ePromise.then(mediaDeviceInfos => {
    mediaDeviceInfos.forEach(itemInfo => {
        console.log(itemInfo)
    })
})
