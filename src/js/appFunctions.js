const { ipcRenderer } = require('electron');
const ipc = ipcRenderer;
const { restorePage } = require('../js/functions');

var minimizeBtn = document.getElementById("minimize-app");
var maxResBtn = document.getElementById("maximize-app");
var closeBtn = document.getElementById("close-app");
var maximizeImage = document.querySelector("#image-maximize");

ipc.on('isMaximized', () => { restorePage(maximizeImage, null, null, null); });
ipc.on('isRestored', () => { restorePage(maximizeImage, null, null, null); });

minimizeBtn.addEventListener('click', () =>{
    ipc.send('minimizeApp');
});

maxResBtn.addEventListener('click', () =>{
    ipc.send('maximizeRestoreApp');
});

closeBtn.addEventListener('click', () =>{
    ipc.send('closeApp');
});