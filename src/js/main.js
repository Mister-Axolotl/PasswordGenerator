const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const ipc = ipcMain

function createWindow () {
    const win = new BrowserWindow({
    width: 1200,
    height: 600,
    minWidth: 940,
    minHeight: 560,
    icon: './src/images/password.png',
    frame: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            devTools: true,
            preload: path.join(__dirname, 'preload.js')
        }
    })

  win.loadFile('src/index.html')

  //Minimize
  ipc.on('minimizeApp', () => {
    win.minimize()
  })

  //Maximize
  ipc.on('maximizeRestoreApp', () => {
    if(win.isMaximized()){
        win.restore()   
    } else {
        win.maximize()
    }
  })
  win.on('maximize', () => {
    win.webContents.send('isMaximized')
  })
  win.on('unmaximize', () => {
    win.webContents.send('isRestored')
  })

  //Close
  ipc.on('closeApp', () => {
    win.close()
  })
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})