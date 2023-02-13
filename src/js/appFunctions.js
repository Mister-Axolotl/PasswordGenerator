const { ipcRenderer } = require('electron');
const ipc = ipcRenderer;

const minimizeBtn = document.getElementById("minimize-app");
const maxResBtn = document.getElementById("maximize-app");
const closeBtn = document.getElementById("close-app");

function changeMaxResBtn(isMaximizedApp){
    if(isMaximizedApp){
        maxResBtn.title = 'Rétrécir';
    } else {
        maxResBtn.title = 'Agrandir';
    }
}

ipc.on('isMaximized', () => { changeMaxResBtn(true) });
ipc.on('isRestored', () => { changeMaxResBtn(false) });

minimizeBtn.addEventListener('click', () =>{
    ipc.send('minimizeApp');
});

maxResBtn.addEventListener('click', () =>{
    ipc.send('maximizeRestoreApp');
});

closeBtn.addEventListener('click', () =>{
    ipc.send('closeApp');
});