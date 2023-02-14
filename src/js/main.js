const fs = require("fs");
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const ipc = ipcMain;
let mainWindow;

function createWindow(user_width, user_height) {
    mainWindow = new BrowserWindow({
    width: user_width,
    height: user_height,
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
    });

  mainWindow.loadFile('src/pages/index.html');

  // Minimize
  ipc.on('minimizeApp', () => {
    mainWindow.minimize();
  });

  // Maximize
  ipc.on('maximizeRestoreApp', () => {
    let dt = fs.readFileSync("src/user-preferences.json");
    let data = JSON.parse(dt);
    if(mainWindow.isMaximized()){
      data.windowBounds.isMaximized = false;
      mainWindow.restore();
    } else {
      data.windowBounds.isMaximized = true;
      mainWindow.maximize();
    }
    var json = JSON.stringify(data, null, 2);
    fs.writeFile("src/user-preferences.json", json, "utf8", (err) => { if (err) console.log(err); });
    
    mainWindow.on('maximize', () => {
      mainWindow.webContents.send('isMaximized')
      if(mainWindow.isMaximized()){
        data.windowBounds.isMaximized = false;
        mainWindow.restore();
      } else {
        data.windowBounds.isMaximized = true;
        mainWindow.maximize();
      }
    });
    mainWindow.on('unmaximize', () => {
      mainWindow.webContents.send('isRestored')
    });
  });

  // Close
  ipc.on('closeApp', () => {
    mainWindow.close();
  });
}

app.whenReady().then(() => {

    app.on("activate", function () {
      if (BrowserWindow.getAllWindows().length == 0) createWindow();
    });

    // Read the data
    let res = fs.existsSync("src/user-preferences.json");
    if(res) {
      let dt = fs.readFileSync("src/user-preferences.json");
      let data = JSON.parse(dt);
      let width = data.windowBounds.width;
      let height = data.windowBounds.height;
      createWindow(width, height);
      if(data.windowBounds.isMaximized){
        mainWindow.maximize();
      }
    }

    // mainWindow.on('resize', () => {
    //   let { width, height } = mainWindow.getBounds();
    //   let dt = fs.readFileSync("src/user-preferences.json");
    //   let data = JSON.parse(dt);
    //   data.windowBounds.width = width;
    //   data.windowBounds.height = height;
    //   var json = JSON.stringify(data, null, 2);
    //   fs.writeFile("src/user-preferences.json", json, "utf8", (err) => { if (err) console.log(err); });
    // })
});


app.on('mainWindowdow-all-closed', () => {
  if (process.platform !== 'darmainWindow') {
    app.quit();
  }
});