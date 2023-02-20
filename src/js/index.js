// ============================== Variables ==============================

const fs = require("fs");
const { loadJSON, restorePage } = require('../js/functions');
var generatePasswordBtn = document.querySelector("#generatePasswordBtn");
var parametersBtn = document.querySelector("#parameters-page");
var password = document.querySelector("#password");
var pageIndex = document.querySelector("#pageIndex");
var pageParameters = document.querySelector("#pageParameters");
var checkBoxNumbers = document.querySelector("#numbers");
var checkBoxLowercaseLetters = document.querySelector("#lowercase-letters");
var checkBoxCapitalLetters = document.querySelector("#capital-letters");
var checkboxSpecialLetters = document.querySelector("#special-letters");
var passwordLength = document.querySelector("#length");
let timeoutId = null;
var colorPage1 = document.querySelector("#color1");
var colorPage2 = document.querySelector("#color2");
var colorPage1b = document.querySelector("#color1b");
var colorPage2b = document.querySelector("#color2b");
var resetColorPageButton = document.querySelector(".reset-color-page");
var resetColorBackgroundButton = document.querySelector(".reset-color-background");
var checkboxAutoCopy = document.querySelector("#auto-copy");
var elements = document.querySelectorAll(".article");
var passwordGenerated = document.querySelector("#passwordGenerated");
var maxResBtn = document.getElementById("maximize-app");
var maximizeImage = document.querySelector("#image-maximize");

// ============================== Load all parameters ==============================

pageParameters.style.display = 'none';
document.body.style.transition = "opacity 2s ease-in";
document.body.style.opacity= "1";
restorePage(elements, passwordGenerated, maxResBtn, maximizeImage);

// ============================== Generate Password Button ==============================

parametersBtn.addEventListener("click", () => {
    if(pageIndex.style.display == 'none'){
        restorePage(elements, passwordGenerated, maxResBtn, maximizeImage);
        pageIndex.style.display = 'block';
        pageParameters.style.display = 'none';
        parametersBtn.innerHTML = "Parameters";
        parametersBtn.title = "Parameters";
    } else {
        restorePage(elements, passwordGenerated, maxResBtn, maximizeImage);
        pageIndex.style.display = 'none';
        pageParameters.style.display = 'block';
        parametersBtn.innerHTML = "Homepage";
        parametersBtn.title = "Homepage";
    }
});

// ============================== Generate Password Button ==============================

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
            loadJSON(function(data) {
                data.others.passwordGenerated = data.others.passwordGenerated + 1;
                writeJSON(data);    
                if(data.checkboxes.autoCopy === true){
                    message.style.display = "contents";
                    setTimeout(function() {
                        navigator.clipboard.writeText(password.value);
                    }, 100);
                    setTimeout(function() { 
                        message.style.display = "none";
                    }, 700);
                }
                return password.value = result.join('');
            })
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

password.addEventListener("click", () => {
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
    loadJSON(function(data) {
        if(checkBoxNumbers.checked) data.checkboxes.numbers = true;
        else data.checkboxes.numbers = false;
        writeJSON(data);
    });
});

checkBoxLowercaseLetters.addEventListener("click", () => {
    loadJSON(function(data) {
        if(checkBoxLowercaseLetters.checked) data.checkboxes.lowercase = true;
        else data.checkboxes.lowercase = false;
        writeJSON(data);
    });
});

checkBoxCapitalLetters.addEventListener("click", () => {
    loadJSON(function(data) {
        if(checkBoxCapitalLetters.checked) data.checkboxes.capitalLetters = true;
        else data.checkboxes.capitalLetters = false;
        writeJSON(data);
    });
});

checkboxSpecialLetters.addEventListener("click", () => {
    loadJSON(function(data) {
        if(checkboxSpecialLetters.checked) data.checkboxes.specialCharacters = true;
        else data.checkboxes.specialCharacters = false;
        writeJSON(data);
    });
});

// ============================== Save password length into user-preferences ==============================

passwordLength.addEventListener("input", () => {
    loadJSON(function(data) {
        data.others.passwordLength = passwordLength.value;
        writeJSON(data);
    });
});

passwordLength.addEventListener("wheel", () => {
    loadJSON(function(data) {
        data.others.passwordLength = passwordLength.value;
        writeJSON(data);
    });
});

// ============================== Save page colors into user-preferences ==============================

colorPage1.addEventListener("input", () => {
    loadJSON(function(data) {
        document.body.style.background = 'linear-gradient(to right,'+(colorPage1.value)+','+(data.appColors.backgroundColor2)+')';
        if(timeoutId) clearTimeout(timeoutId);
        timeoutId = setTimeout(function() {
            data.appColors.backgroundColor1 = colorPage1.value;
            writeJSON(data);
        }, 100);
    });
});

colorPage2.addEventListener("input", () => {
    loadJSON(function(data) {
        document.body.style.background = 'linear-gradient(to right,'+(data.appColors.backgroundColor1)+','+(colorPage2.value)+')';
        if(timeoutId) clearTimeout(timeoutId);
        timeoutId = setTimeout(function() {
            data.appColors.backgroundColor2 = colorPage2.value;
            writeJSON(data);
        }, 100);
    });
});

// ============================== Reset color page ==============================

resetColorPageButton.addEventListener("click", () => {
    loadJSON(function(data) {
        document.body.style.background = 'linear-gradient(to right, #393E46, #171b21)';
        data.appColors.backgroundColor1 = "#393E46";
        data.appColors.backgroundColor2 = "#171b21";
        colorPage1.value = "#393E46";
        colorPage2.value = "#171b21";
        writeJSON(data);
    });
});

// ============================== Save background colors into user-preferences ==============================

function check() {
    loadJSON(function(data) {
        var elements = document.querySelectorAll(".article");
        for (var i = 0 ; i < elements.length ; i++) {
            elements[i].style.background = 'linear-gradient(to right,'+(colorPage1b.value)+','+(colorPage2b.value)+')';
        }
        if(data.windowBounds.isMaximized){
            maximizeImage.src = "../images/minimize.png";
        } else {
            maximizeImage.src = "../images/resize.png";
        }
    });
}

colorPage1b.addEventListener("input", () => {
    loadJSON(function(data) {
        check();
        if(timeoutId) clearTimeout(timeoutId);
        timeoutId = setTimeout(function() {
            data.appColors.backgroundColor1b = colorPage1b.value;
            writeJSON(data);
        }, 100);
    });
});

colorPage2b.addEventListener("input", () => {
    loadJSON(function(data) {
        check();
        if(timeoutId) clearTimeout(timeoutId);
        timeoutId = setTimeout(function() {
            data.appColors.backgroundColor2b = colorPage2b.value;
            writeJSON(data);
        }, 100);
    });
});

// ============================== Reset color background ==============================

resetColorBackgroundButton.addEventListener("click", () => {
    loadJSON(function(data) {
        var elements = document.querySelectorAll(".article");
        for (var i = 0 ; i < elements.length ; i++) {
            elements[i].style.background = 'linear-gradient(to right, #6fa5fb, #3e1bee)';
        }
        data.appColors.backgroundColor1b = "#6fa5fb";
        data.appColors.backgroundColor2b = "#3e1bee";
        colorPage1b.value = "#6fa5fb";
        colorPage2b.value = "#3e1bee";
        writeJSON(data);
    })
});

// ============================== Auto Copy ==============================

checkboxAutoCopy.addEventListener("click", () => {
    loadJSON(function(data) {
        if(checkboxAutoCopy.checked) data.checkboxes.autoCopy = true;
        else data.checkboxes.autoCopy = false;
        writeJSON(data);
    });
});