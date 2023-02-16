const fs = require("fs");
let dtStart = fs.readFileSync("src/user-preferences.json");
let dataStart = JSON.parse(dtStart);
let timeoutId = null;

// ============================== Save page colors into user-preferences ==============================

var color1 = document.querySelector("#color1");
var color2 = document.querySelector("#color2");
var color1b = document.querySelector("#color1b");
var color2b = document.querySelector("#color2b");
var passwordGenerated = document.querySelector("#passwordGenerated");
var maximizeImage = document.querySelector("#image-maximize");

color1.value = dataStart.appColors.backgroundColor1;
color2.value = dataStart.appColors.backgroundColor2;
color1b.value = dataStart.appColors.backgroundColor1b;
color2b.value = dataStart.appColors.backgroundColor2b;
passwordGenerated.innerHTML = ": " + dataStart.others.passwordGenerated;

document.body.style.background = 'linear-gradient(to right, '+(dataStart.appColors.backgroundColor1)+', '+(dataStart.appColors.backgroundColor2)+')';
check();

color1.addEventListener("input", () => {
    let dt = fs.readFileSync("src/user-preferences.json");
    let data = JSON.parse(dt);
    document.body.style.background = 'linear-gradient(to right,'+(color1.value)+','+(data.appColors.backgroundColor2)+')';
    if(timeoutId) {
        clearTimeout(timeoutId);
    }
    
    timeoutId = setTimeout(function() {
        data.appColors.backgroundColor1 = color1.value;
        var json = JSON.stringify(data, null, 2);
        fs.writeFile("src/user-preferences.json", json, "utf8", (err) => { if (err) console.log(err); });
    }, 100);
});

color2.addEventListener("input", () => {
    let dt = fs.readFileSync("src/user-preferences.json");
    let data = JSON.parse(dt);
    document.body.style.background = 'linear-gradient(to right,'+(data.appColors.backgroundColor1)+','+(color2.value)+')';
    if(timeoutId) {
        clearTimeout(timeoutId);
    }
    
    timeoutId = setTimeout(function() {
        data.appColors.backgroundColor2 = color2.value;
        var json = JSON.stringify(data, null, 2);
        fs.writeFile("src/user-preferences.json", json, "utf8", (err) => { if (err) console.log(err); });
    }, 100);
});

// ============================== Reset color page ==============================

var resetColorButton = document.querySelector(".reset-color-page");

resetColorButton.addEventListener("click", () => {
    let dt = fs.readFileSync("src/user-preferences.json");
    let data = JSON.parse(dt);
    document.body.style.background = 'linear-gradient(to right, #393E46, #171b21)';
    data.appColors.backgroundColor1 = "#393E46";
    data.appColors.backgroundColor2 = "#171b21";
    color1.value = "#393E46";
    color2.value = "#171b21";
    var json = JSON.stringify(data, null, 2);
    fs.writeFile("src/user-preferences.json", json, "utf8", (err) => { if (err) console.log(err); });
});

// ============================== Save background colors into user-preferences ==============================

function check() {
    var elements = document.querySelectorAll(".password-options");
    let dt = fs.readFileSync("src/user-preferences.json");
    let data = JSON.parse(dt);
    for (var i = 0 ; i < elements.length ; i++) {
        elements[i].style.background = 'linear-gradient(to right,'+(color1b.value)+','+(color2b.value)+')';
    }
    if(data.windowBounds.isMaximized){
        maximizeImage.src = "../images/minimize.png";
    } else {
        maximizeImage.src = "../images/resize.png";
    }
}

color1b.addEventListener("input", () => {
    let dt = fs.readFileSync("src/user-preferences.json");
    let data = JSON.parse(dt);
    check();
    if(timeoutId) {
        clearTimeout(timeoutId);
    }
    
    timeoutId = setTimeout(function() {
        data.appColors.backgroundColor1b = color1b.value;
        var json = JSON.stringify(data, null, 2);
        fs.writeFile("src/user-preferences.json", json, "utf8", (err) => { if (err) console.log(err); });
    }, 100);
});

color2b.addEventListener("input", () => {
    let dt = fs.readFileSync("src/user-preferences.json");
    let data = JSON.parse(dt);
    check();
    if(timeoutId) {
        clearTimeout(timeoutId);
    }
    
    timeoutId = setTimeout(function() {
        data.appColors.backgroundColor2b = color2b.value;
        var json = JSON.stringify(data, null, 2);
        fs.writeFile("src/user-preferences.json", json, "utf8", (err) => { if (err) console.log(err); });
    }, 100);
});

// ============================== Reset color background ==============================

var resetColorButton = document.querySelector(".reset-color-background");

resetColorButton.addEventListener("click", () => {
    let dt = fs.readFileSync("src/user-preferences.json");
    let data = JSON.parse(dt);
    var elements = document.querySelectorAll(".password-options");
    for (var i = 0 ; i < elements.length ; i++) {
        elements[i].style.background = 'linear-gradient(to right, #6fa5fb, #3e1bee)';
    }
    data.appColors.backgroundColor1b = "#6fa5fb";
    data.appColors.backgroundColor2b = "#3e1bee";
    color1b.value = "#6fa5fb";
    color2b.value = "#3e1bee";
    var json = JSON.stringify(data, null, 2);
    fs.writeFile("src/user-preferences.json", json, "utf8", (err) => { if (err) console.log(err); });
});