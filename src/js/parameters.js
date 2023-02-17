// ============================== Variables ==============================

const fs = require("fs");
const { loadJSON } = require('../js/functions');
let timeoutId = null;
var colorPage1 = document.querySelector("#color1");
var colorPage2 = document.querySelector("#color2");
var colorPage1b = document.querySelector("#color1b");
var colorPage2b = document.querySelector("#color2b");
var resetColorPageButton = document.querySelector(".reset-color-page");
var resetColorBackgroundButton = document.querySelector(".reset-color-background");
var checkboxAutoCopy = document.querySelector("#auto-copy");
var elements = document.querySelectorAll(".password-options");
var passwordGenerated = document.querySelector("#passwordGenerated");
var maximizeImage = document.querySelector("#image-maximize");
var currentPage = "parameters";

// ============================== Load all parameters ==============================

restorePage(maximizeImage, elements, currentPage, passwordGenerated);

// ============================== Save page colors into user-preferences ==============================

colorPage1.addEventListener("input", () => {
    let dt = fs.readFileSync("src/user-preferences.json");
    let data = JSON.parse(dt);
    document.body.style.background = 'linear-gradient(to right,'+(colorPage1.value)+','+(data.appColors.backgroundColor2)+')';
    if(timeoutId) {
        clearTimeout(timeoutId);
    }
    
    timeoutId = setTimeout(function() {
        data.appColors.backgroundColor1 = colorPage1.value;
        var json = JSON.stringify(data, null, 2);
        fs.writeFile("src/user-preferences.json", json, "utf8", (err) => { if (err) console.log(err); });
    }, 100);
});

colorPage2.addEventListener("input", () => {
    let dt = fs.readFileSync("src/user-preferences.json");
    let data = JSON.parse(dt);
    document.body.style.background = 'linear-gradient(to right,'+(data.appColors.backgroundColor1)+','+(colorPage2.value)+')';
    if(timeoutId) {
        clearTimeout(timeoutId);
    }
    
    timeoutId = setTimeout(function() {
        data.appColors.backgroundColor2 = colorPage2.value;
        var json = JSON.stringify(data, null, 2);
        fs.writeFile("src/user-preferences.json", json, "utf8", (err) => { if (err) console.log(err); });
    }, 100);
});

// ============================== Reset color page ==============================

resetColorPageButton.addEventListener("click", () => {
    let dt = fs.readFileSync("src/user-preferences.json");
    let data = JSON.parse(dt);
    document.body.style.background = 'linear-gradient(to right, #393E46, #171b21)';
    data.appColors.backgroundColor1 = "#393E46";
    data.appColors.backgroundColor2 = "#171b21";
    colorPage1.value = "#393E46";
    colorPage2.value = "#171b21";
    var json = JSON.stringify(data, null, 2);
    fs.writeFile("src/user-preferences.json", json, "utf8", (err) => { if (err) console.log(err); });
});

// ============================== Save background colors into user-preferences ==============================

function check() {
    var elements = document.querySelectorAll(".password-options");
    let dt = fs.readFileSync("src/user-preferences.json");
    let data = JSON.parse(dt);
    for (var i = 0 ; i < elements.length ; i++) {
        elements[i].style.background = 'linear-gradient(to right,'+(colorPage1b.value)+','+(colorPage2b.value)+')';
    }
    if(data.windowBounds.isMaximized){
        maximizeImage.src = "../images/minimize.png";
    } else {
        maximizeImage.src = "../images/resize.png";
    }
}

colorPage1b.addEventListener("input", () => {
    let dt = fs.readFileSync("src/user-preferences.json");
    let data = JSON.parse(dt);
    check();
    if(timeoutId) {
        clearTimeout(timeoutId);
    }
    
    timeoutId = setTimeout(function() {
        data.appColors.backgroundColor1b = colorPage1b.value;
        var json = JSON.stringify(data, null, 2);
        fs.writeFile("src/user-preferences.json", json, "utf8", (err) => { if (err) console.log(err); });
    }, 100);
});

colorPage2b.addEventListener("input", () => {
    let dt = fs.readFileSync("src/user-preferences.json");
    let data = JSON.parse(dt);
    check();
    if(timeoutId) {
        clearTimeout(timeoutId);
    }
    
    timeoutId = setTimeout(function() {
        data.appColors.backgroundColor2b = colorPage2b.value;
        var json = JSON.stringify(data, null, 2);
        fs.writeFile("src/user-preferences.json", json, "utf8", (err) => { if (err) console.log(err); });
    }, 100);
});

// ============================== Reset color background ==============================

resetColorBackgroundButton.addEventListener("click", () => {
    let dt = fs.readFileSync("src/user-preferences.json");
    let data = JSON.parse(dt);
    var elements = document.querySelectorAll(".password-options");
    for (var i = 0 ; i < elements.length ; i++) {
        elements[i].style.background = 'linear-gradient(to right, #6fa5fb, #3e1bee)';
    }
    data.appColors.backgroundColor1b = "#6fa5fb";
    data.appColors.backgroundColor2b = "#3e1bee";
    colorPage1b.value = "#6fa5fb";
    colorPage2b.value = "#3e1bee";
    var json = JSON.stringify(data, null, 2);
    fs.writeFile("src/user-preferences.json", json, "utf8", (err) => { if (err) console.log(err); });
});

checkboxAutoCopy.addEventListener("click", () => {
    loadJSON(function(data) {
        if(checkboxAutoCopy.checked) data.checkboxes.autoCopy = true;
        else data.checkboxes.autoCopy = false;
        var json = JSON.stringify(data, null, 2);
        fs.writeFile("src/user-preferences.json", json, "utf8", (err) => { if (err) console.log(err); });
    })
});