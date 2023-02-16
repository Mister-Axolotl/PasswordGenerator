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

    function showMessage(message){
        console.log("showMessage trapped");
        console.log(message);
        this.window.webContents.send("updateMessage", message);
    }
    
    mainWindow.loadFile('src/pages/index.html');

    // Minimize
    ipc.on('minimizeApp', () => {
        mainWindow.minimize();
    });

    //Maximize
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
    })

    mainWindow.webContents.on('did-finish-load', () => {
        // const buttonPath = path.join(__dirname, 'button.html');
        // mainWindow.webContents.executeJavaScript(`fetch('${buttonPath}').then(response => response.text()).then(text => document.body.innerHTML += text);`);
    });

    mainWindow.on('maximize', () => {
        let dt = fs.readFileSync("src/user-preferences.json");
        let data = JSON.parse(dt);
        mainWindow.webContents.send('isMaximized');
        data.windowBounds.isMaximized = true;
        var json = JSON.stringify(data, null, 2);
        fs.writeFile("src/user-preferences.json", json, "utf8", (err) => { if (err) console.log(err); });
    })
    mainWindow.on('unmaximize', () => {
        let dt = fs.readFileSync("src/user-preferences.json");
        let data = JSON.parse(dt);
        mainWindow.webContents.send('isRestored');
        data.windowBounds.isMaximized = false;
        var json = JSON.stringify(data, null, 2);
        fs.writeFile("src/user-preferences.json", json, "utf8", (err) => { if (err) console.log(err); });
    })

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
    createWindow(width, height);
   
    if(data.windowBounds.isMaximized){
        mainWindow.maximize();
    }

    // mainWindow.on('resize', () => {
    //      let { width, height } = mainWindow.getBounds();
    //      let dt = fs.readFileSync("src/user-preferences.json");
    //      let data = JSON.parse(dt);
    //      data.windowBounds.width = width;
    //      data.windowBounds.height = height;
    //      var json = JSON.stringify(data, null, 2);
    //      fs.writeFile("src/user-preferences.json", json, "utf8", (err) => { if (err) console.log(err); });
    // })
});

app.on('mainWindowdow-all-closed', () => {
    if (process.platform !== 'darmainWindow') {
        app.quit();
    }
});