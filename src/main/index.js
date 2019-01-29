'use strict'

/* eslint-disable */

import { app, BrowserWindow } from 'electron'
const path = require('path')
const {registEvents} = require('electron-tunnel')
// const events = require('./events.js')

console.log('is3 index.js')
/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 563,
    useContentSize: true,
    width: 1000,
    webPreferences: {
      preload: path.join(__dirname, './bridge.js'),
      plugins: true
    }
  })

    mainWindow.webContents.on('did-finish-load', function () {
        mainWindow.webContents.openDevTools()
    })
  // mainWindow.loadURL(winURL)

  registEvents({
    'SET_FULL_SCREEN': function setFullScreen(params, app, win) {
        return win.setFullScreen(true)
    },
    'ASYNC_EVENT': function asyncEvent(params, app, win) {
        return new Promise((resolve) => {
            setTimeout(() => {
            console.log(params.word)
            resolve()
            }, 3000)
        })
    }
  }, [app, mainWindow])

  // console.log('加载地址')
  mainWindow.loadURL('http://localhost:8082/about')

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
