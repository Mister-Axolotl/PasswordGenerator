const fs = require("fs");
const { writeJSON } = require('../js/functions.js');
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const ipc = ipcMain;
let mainWindow;

function createMainWindow(user_width, user_height) {
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
            preload: path.join(__dirname, 'preload.js'),
        }
    });

    mainWindow.loadFile('src/pages/index.html');
    
    // Minimize
    ipc.on('minimizeApp', () => {
        mainWindow.minimize();
    });
    
    //Maximize
    ipc.on('maximizeRestoreApp', () => {
        if(mainWindow.isMaximized()){
            mainWindow.restore();
            mainWindow.webContents.send('maxTrue');
        }
        else {
            mainWindow.maximize();
            mainWindow.webContents.send('maxFalse');
        }
    });

    mainWindow.webContents.on('did-finish-load', () => {
        mainWindow.on('maximize', () => {
            mainWindow.webContents.send('isMaximized');
        });
      });
    
    mainWindow.on('unmaximize', () => {
        mainWindow.webContents.send('isRestored');
    });
    
    // Close
    ipc.on('closeApp', () => {
        mainWindow.close();
    });
}

app.whenReady().then(() => {
    let dt = fs.readFileSync("src/user-preferences.json");
    let data = JSON.parse(dt);
    let width = data.windowBounds.width;
    let height = data.windowBounds.height;
    createMainWindow(width, height);
    
    if(data.windowBounds.isMaximized){
        mainWindow.maximize();
    }
});
    
app.on('mainWindowdow-all-closed', () => {
    if (process.platform !== 'darmainWindow') {
        app.quit();
    }
});