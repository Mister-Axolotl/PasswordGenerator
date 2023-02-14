// ============================== Variables ==============================

const fs = require("fs");
var generatePasswordBtn = document.querySelector("#generatePasswordBtn");
var password = document.querySelector("#password");
var checkBoxNumbers = document.querySelector("#numbers");
var checkBoxLowercaseLetters = document.querySelector("#lowercase-letters");
var checkBoxCapitalLetters = document.querySelector("#capital-letters");
var checkboxSpecialLetters = document.querySelector("#special-letters");
var passwordLength = document.querySelector("#length");

let dtStart = fs.readFileSync("src/user-preferences.json");
let dataStart = JSON.parse(dtStart);
checkBoxNumbers.checked = dataStart.checkboxes.numbers;
checkBoxLowercaseLetters.checked = dataStart.checkboxes.lowercase;
checkBoxCapitalLetters.checked = dataStart.checkboxes.capitalLetters;
checkboxSpecialLetters.checked = dataStart.checkboxes.specialCharacters;
passwordLength.value = dataStart.others.passwordLength;
document.body.style.background = 'linear-gradient(to right,'+(dataStart.appColors.backgroundColor1)+','+(dataStart.appColors.backgroundColor2)+')';

//============================== Generate Password Button ==============================

function generatePassword(length) {
	var result = []; 
	var characters = [];
    password.style.color = "black";

    if(passwordLength.value <= 1000 && passwordLength.value > 0) {
        if(checkBoxNumbers.checked === true){
            characters.push('0','1','2','3','4','5','6','7','8','9');
        }
        if(checkBoxLowercaseLetters.checked === true){
            characters.push('a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z');
        }
        if(checkBoxCapitalLetters.checked === true){
            characters.push('A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z');
        }
        if(checkboxSpecialLetters.checked === true){
            characters.push('!','@','#','$','%','^','&','*','(',')','_','+')
        }
        for ( var i = 0; i < length; i++ ) { 
            result.push(characters.at(Math.floor(Math.random() * characters.length))); 
        }
        if(checkBoxNumbers.checked === false && checkBoxLowercaseLetters.checked === false && checkBoxCapitalLetters.checked === false && checkboxSpecialLetters.checked === false){
            password.style.color = "red";
            return password.value = 'You must check something!';
        } else {
            let dt = fs.readFileSync("src/user-preferences.json");
            let data = JSON.parse(dt);
            data.others.passwordGenerated = data.others.passwordGenerated + 1;
            var json = JSON.stringify(data, null, 2);
            fs.writeFile("src/user-preferences.json", json, "utf8", (err) => { if (err) console.log(err); });
            return password.value = result.join('');
        }
    } else if(passwordLength.value > 1000) {
        password.style.color = "red";
        return password.value = 'Number is too big! Maximum is 1000.'  
    } else if(passwordLength.value <= 0) {
        password.style.color = "red";
        return password.value = 'Number is too short! Minimum is 1.'
    }
}

generatePasswordBtn.addEventListener('click', () =>{
	generatePassword(passwordLength.value);
});

// ============================== Increment with wheel ==============================

passwordLength.addEventListener("wheel", function(event) {
    event.preventDefault();
    if(passwordLength.value == "" || passwordLength.value < 1){
        passwordLength.value = 1;
    } else if (event.deltaY > 0) {
        if(passwordLength.value > 1) {
            passwordLength.value = parseInt(passwordLength.value) - 1;
        }
    } else {
        if(passwordLength.value < 1000) {
            passwordLength.value = parseInt(passwordLength.value) + 1;
        }
    }
});

// ============================== Copy Button ==============================

var copyButton = document.querySelector("#copy");
var message = document.getElementById("message");
var messageFail = document.getElementById("messageFail");

copyButton.addEventListener("click", () => {
    if(password.value != ""){
        if(password.style.color == "red"){
            messageFail.style.display = "contents";
            setTimeout(function() {
            messageFail.style.display = "none";
            }, 700);
        } else {
            navigator.clipboard.writeText(password.value);
            message.style.display = "contents";
            setTimeout(function() {
            message.style.display = "none";
            }, 700);
        }
    } else {
        messageFail.style.display = "contents";
        setTimeout(function() {
        messageFail.style.display = "none";
        }, 700);
    }
});

// ============================== Save checkbox into user-preferences ==============================

checkBoxNumbers.addEventListener("click", () => {
    let dt = fs.readFileSync("src/user-preferences.json");
    let data = JSON.parse(dt);
    if(checkBoxNumbers.checked) data.checkboxes.numbers = true;
    else data.checkboxes.numbers = false;
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

// ============================== Save password length into user-preferences ==============================

passwordLength.addEventListener("input", () => {
    let dt = fs.readFileSync("src/user-preferences.json");
    let data = JSON.parse(dt);
    data.others.passwordLength = passwordLength.value;
    var json = JSON.stringify(data, null, 2);
    fs.writeFile("src/user-preferences.json", json, "utf8", (err) => { if (err) console.log(err); });
});

passwordLength.addEventListener("wheel", () => {
    let dt = fs.readFileSync("src/user-preferences.json");
    let data = JSON.parse(dt);
    data.others.passwordLength = passwordLength.value;
    var json = JSON.stringify(data, null, 2);
    fs.writeFile("src/user-preferences.json", json, "utf8", (err) => { if (err) console.log(err); });
});