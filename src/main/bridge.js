console.log('hello')
console.log('window', window)

const {callEvent} = require('electron-tunnel')

window._app = {
    fullScreen() {
        callEvent('SET_FULL_SCREEN')
    },
    print() {
        callEvent('ASYNC_EVENT', {word: 'hello world'}).then(() => {
            console.log('done')
        })
    }
}
