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

var generatePasswordBtn = document.querySelector("#generatePasswordBtn");
var password = document.querySelector("#password");
var checkBoxNumbers = document.querySelector("#numbers");
var checkBoxLowercaseLetters = document.querySelector("#lowercase-letters");
var checkBoxCapitalLetters = document.querySelector("#capital-letters");
var passwordLength = document.querySelector("#length");

function generatePassword(length) {
	var result = []; 
	var characters = [];
    if(passwordLength.value <= 1000) {
        if(checkBoxNumbers.checked === true){
            characters.push('0','1','2','3','4','5','6','7','8','9');
        }
        if(checkBoxLowercaseLetters.checked === true){
            characters.push('a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z');
        }
        if(checkBoxCapitalLetters.checked === true){
            characters.push('A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z');
        }
        for( var i = 0 ; i < length ; i++ ) { 
            result.push(characters.at(Math.floor(Math.random() * characters.length)));
        }
        if(checkBoxNumbers.checked === false && checkBoxLowercaseLetters.checked === false && checkBoxCapitalLetters.checked === false){
            return password.value = 'You must check something!';
        } else return password.value = result.join('');
    } else {
        return password.value = 'Number is too big! Maximum is 1000.'
    }
}

generatePasswordBtn.addEventListener('click', () =>{
	generatePassword(passwordLength.value);
});

//============================== Options Button ==============================

/*const optionsBtn = document.getElementById("parameters-page");

optionsBtn.addEventListener('click', () =>{
    const win = new BrowserWindow({ backgroundColor: '#2e2c29' })
    win.loadURL('https://github.com') 
});*/
