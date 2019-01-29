// params: passed by callEvent; [app, win]: passed by registEvent;
function setFullScreen(params, app, win) {
    return win.setFullScreen(true)
}

// should return Promise when doing async things
function asyncEvent(params, app, win) {
    return new Promise((resolve) => {
        setTimeout(() => {
        console.log(params.word)
        resolve()
        }, 3000)
    })
}

module.exports = {
    'SET_FULL_SCREEN': setFullScreen,
    'ASYNC_EVENT': asyncEvent
}
