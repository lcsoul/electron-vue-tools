import { app, BrowserWindow, ipcMain } from 'electron'

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
    width: 1000
  })

  mainWindow.loadURL(winURL)

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
ipcMain.on('win', (e, rs) => {
  console.log(rs)
  if (rs == 'minimize') {
    mainWindow.minimize()
    e.sender.send('winres', '已执行最小化');
  }
  if (rs == 'maximize') {
    if (mainWindow.isMaximized()) {
      mainWindow.unmaximize()
    }else{
      mainWindow.maximize()
    }
    e.sender.send('winres', '已执行最大化');
  }
  if (rs == 'full') {
    if (mainWindow.isFullScreen()) {
      mainWindow.setFullScreen(false)
    }else{
      mainWindow.setFullScreen(true)
    }
    e.sender.send('winres', '已执行全屏');
  }
  if (rs == 'reload') {
    mainWindow.reload()
  }
  if (rs == 'closed') {
    // mainWindow.closed()
    app.quit()
  }
  

})