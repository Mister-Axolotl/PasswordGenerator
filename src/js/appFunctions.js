const { ipcRenderer } = require('electron');
const ipc = ipcRenderer;

const minimizeBtn = document.getElementById("minimize-app");
const maxResBtn = document.getElementById("maximize-app");
const closeBtn = document.getElementById("close-app");

function changeMaxResBtn(){
    let dt = fs.readFileSync("src/user-preferences.json");
    let data = JSON.parse(dt);
    if(data.windowBounds.isMaximized){
        maxResBtn.title = 'Maximize';
    } else {
        maxResBtn.title = 'Minimize';
    }
}

ipc.on('isMaximized', () => { changeMaxResBtn(true) });
ipc.on('isRestored', () => { changeMaxResBtn(false) });

minimizeBtn.addEventListener('click', () =>{
    ipc.send('minimizeApp');
    changeMaxResBtn();
});

maxResBtn.addEventListener('click', () =>{
    ipc.send('maximizeRestoreApp');
    changeMaxResBtn();
});

closeBtn.addEventListener('click', () =>{
    ipc.send('closeApp');
});