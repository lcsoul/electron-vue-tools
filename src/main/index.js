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
    nodeIntegration: false,
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

ipcMain.on('win',(e, rs)=> {
  console.log(rs)
  if (rs == 'minimize') {
    mainWindow.minimize()
  }
  if (rs == 'maximize') {
    mainWindow.maximize()
  }
  if (rs == 'unmaximize') {
    mainWindow.unmaximize()
  }
  if (rs == 'full') {
    mainWindow.setFullScreen(true)
  }
  if (rs == 'noFull') {
    mainWindow.setFullScreen(false)
  }
  if (rs == 'closed') {
    // mainWindow.closed()
    app.quit()
  }
  e.sender.send('winres', '666');
  
})