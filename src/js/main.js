const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const ipc = ipcMain;
const fs = require("fs");
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
    mainWindow.minimize()
  });

  // Maximize
  ipc.on('maximizeRestoreApp', () => {
    if(mainWindow.isMaximized()){
        mainWindow.restore()   
    } else {
        mainWindow.maximize()
    }
  });
  mainWindow.on('maximize', () => {
    mainWindow.webContents.send('isMaximized')
  });
  mainWindow.on('unmaximize', () => {
    mainWindow.webContents.send('isRestored')
  });

  // Close
  ipc.on('closeApp', () => {
    mainWindow.close()
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
      createWindow(width, height)
      
      
      // var checkBoxLowercaseLetters = document.querySelector("#lowercase-letters");
      // var checkBoxCapitalLetters = document.querySelector("#capital-letters");
      // var checkboxSpecialLetters = document.querySelector("#special-letters");
    }

    mainWindow.on('resize', () => {
      let { width, height } = mainWindow.getBounds();
      let dt = fs.readFileSync("src/user-preferences.json");
      let data = JSON.parse(dt);
      data.windowBounds.width = width;
      data.windowBounds.height = height;
      var json = JSON.stringify(data, null, 2);
      fs.writeFile("src/user-preferences.json", json, "utf8", (err) => { if (err) console.log(err); });
    })
});


app.on('mainWindowdow-all-closed', () => {
  if (process.platform !== 'darmainWindow') {
    app.quit()
  }
});