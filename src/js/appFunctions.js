const { ipcRenderer } = require('electron');
const ipc = ipcRenderer;
const fs = require("fs");

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
var checkboxSpecialLetters = document.querySelector("#special-letters");
var passwordLength = document.querySelector("#length");

let dt = fs.readFileSync("src/user-preferences.json");
let data = JSON.parse(dt);
checkBoxNumbers.checked = data.checkboxes.numbers;
checkBoxLowercaseLetters.checked = data.checkboxes.lowercase;
checkBoxCapitalLetters.checked = data.checkboxes.capitalLetters;
checkboxSpecialLetters.checked = data.checkboxes.specialCharacters;

function generatePassword(length) {
	var result = []; 
	var characters = [];
    password.style.color = "black";
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
        for ( var i = 0; i < length; i++ ) { 
            result.push(characters.at(Math.floor(Math.random() * characters.length))); 
        }
        if(checkBoxNumbers.checked === false && checkBoxLowercaseLetters.checked === false && checkBoxCapitalLetters.checked === false){
            return password.value = 'You must check something!';
        } else return password.value = result.join('');
    } else {
        password.style.color = "red";
        return password.value = 'Number is too big! Maximum is 1000.'
    }
}

generatePasswordBtn.addEventListener('click', () =>{
	generatePassword(passwordLength.value);
});

passwordLength.addEventListener("wheel", function(event) {
    event.preventDefault();
    if (event.deltaY > 0) {
        if(passwordLength.value > 1) {
            passwordLength.value = parseInt(passwordLength.value) - 1;
        }
    } else {
        if(passwordLength.value < 1000) {
            passwordLength.value = parseInt(passwordLength.value) + 1;
        }
    }
});

var copyButton = document.querySelector("#copy");
var message = document.getElementById("message");
var messageFail = document.getElementById("messageFail");

copyButton.addEventListener("click", () => {
    if(password.value != ""){
        navigator.clipboard.writeText(password.value);
        message.style.display = "contents";
          setTimeout(function() {
            message.style.display = "none";
          }, 700);
    } else {
        messageFail.style.display = "contents";
          setTimeout(function() {
            messageFail.style.display = "none";
          }, 700);
    }
});

checkBoxNumbers.addEventListener("click", () => {
    let dt = fs.readFileSync("src/user-preferences.json");
    let data = JSON.parse(dt);
    if(checkBoxNumbers.checked) data.checkboxes.number = true;
    else data.checkboxes.number = false;
    var json = JSON.stringify(data, null, 2);
    fs.writeFile("src/user-preferences.json", json, "utf8", (err) => { if (err) console.log(err); });
});

checkBoxLowercaseLetters.addEventListener("click", () => {
    let dt = fs.readFileSync("src/user-preferences.json");
    let data = JSON.parse(dt);
    if(checkBoxLowercaseLetters.checked) data.checkboxes.lowercase = true;
    else data.checkboxes.lowercase = false;
    var json = JSON.stringify(data, null, 2);
    fs.writeFile("src/user-preferences.json", json, "utf8", (err) => { if (err) console.log(err); });
});

checkBoxCapitalLetters.addEventListener("click", () => {
    let dt = fs.readFileSync("src/user-preferences.json");
    let data = JSON.parse(dt);
    if(checkBoxCapitalLetters.checked) data.checkboxes.capitalLetters = true;
    else data.checkboxes.capitalLetters = false;
    var json = JSON.stringify(data, null, 2);
    fs.writeFile("src/user-preferences.json", json, "utf8", (err) => { if (err) console.log(err); });
});

checkboxSpecialLetters.addEventListener("click", () => {
    let dt = fs.readFileSync("src/user-preferences.json");
    let data = JSON.parse(dt);
    if(checkboxSpecialLetters.checked) data.checkboxes.specialCharacters = true;
    else data.checkboxes.specialCharacters = false;
    var json = JSON.stringify(data, null, 2);
    fs.writeFile("src/user-preferences.json", json, "utf8", (err) => { if (err) console.log(err); });
});