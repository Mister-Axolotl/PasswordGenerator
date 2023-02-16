const { ipcRenderer } = require('electron');
const ipc = ipcRenderer;

var minimizeBtn = document.getElementById("minimize-app");
var maxResBtn = document.getElementById("maximize-app");
var closeBtn = document.getElementById("close-app");
var maximizeImage = document.querySelector("#image-maximize");

function loadJSON(callback) {   
    var json = new XMLHttpRequest();
    json.overrideMimeType("application/json");
    json.open('GET', '../user-preferences.json', true);
    json.onreadystatechange = function () {
      if (json.readyState == 4 && json.status == "200") {
        callback(JSON.parse(json.responseText));
      }
    };
    json.send(null);
}

function changeMaxResBtn(){
    loadJSON(function(data) {
        if(data.windowBounds.isMaximized == true){
            maxResBtn.title = 'Maximize';
            maximizeImage.src = "../images/minimize.png";
        } else {
            maxResBtn.title = 'Minimize';
            maximizeImage.src = "../images/resize.png";
        }
    });
}

ipc.on('isMaximized', () => { changeMaxResBtn(); });
ipc.on('isRestored', () => { changeMaxResBtn(); });

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