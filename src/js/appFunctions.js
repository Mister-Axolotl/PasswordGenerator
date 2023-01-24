const { ipcRenderer } = require('electron');
const ipc = ipcRenderer;

//============================== Head Buttons ==============================

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

//============================== Generate Password Button ==============================

const generatePasswordBtn = document.getElementById("generatePasswordBtn");

function generatePassword(length) {
	var result = []; 
	var characters = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789&#@`;
	var charactersLength = characters.length; 
	for ( var i = 0; i < length; i++ ) { 
		result.push(characters.charAt(Math.floor(Math.random() * charactersLength))); 
	}
	return alert(result.join(''));
}

generatePasswordBtn.addEventListener('click', () =>{
	generatePassword(10);
});

