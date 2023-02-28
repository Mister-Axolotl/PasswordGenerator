const { ipcRenderer } = require('electron');
const ipc = ipcRenderer;
const { maximizeButton, writeJSON } = require('../js/functions.js');

var minimizeBtn = document.getElementById("minimize-app");
var maxResBtn = document.getElementById("maximize-app");
var closeBtn = document.getElementById("close-app");
var maximizeImage = document.querySelector("#image-maximize");

ipc.on('isMaximized', () => { maximizeButton(maxResBtn, maximizeImage) });

ipc.on('isRestored', () => { maximizeButton(maxResBtn, maximizeImage) });

ipc.on('maxTrue', () => {
    loadJSON(function(data) { 
        data.app.windowBounds.isMaximized = false;
        writeJSON(data);
    });
});

ipc.on('maxFalse', () => {
    loadJSON(function(data) { 
        data.app.windowBounds.isMaximized = true;
        writeJSON(data);
    });
});


minimizeBtn.addEventListener('click', () =>{
    ipc.send('minimizeApp');
});

maxResBtn.addEventListener('click', () =>{
    ipc.send('maximizeRestoreApp');
});

closeBtn.addEventListener('click', () =>{
    ipc.send('closeApp');
});