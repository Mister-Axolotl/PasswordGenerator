const fs = require("fs");

function loadJSON(callback) {
    var json = new XMLHttpRequest();
    json.overrideMimeType("application/json");
    json.open('GET', '../user-preferences.json', true);
    json.onreadystatechange = function () {
        if (json.readyState == 4) {
            if (json.status == 200) {
                try {
                    const data = JSON.parse(json.responseText);
                    callback(data);
                } catch (e) {
                    console.error('Error parsing JSON data:', e);
                }
            } else {
                console.error('Error loading JSON data: ' + json.status);
            }
        }
    };
    json.send(null);
};

function writeJSON(data) {
    var json = JSON.stringify(data, null, 2);
    fs.writeFile("src/user-preferences.json", json, "utf8", (err) => { if (err) console.log(err); });
};

function restorePage(elements, passwordGenerated, maxResBtn, maximizeImage){
    loadJSON(function(data) {
        if(data.windowBounds.isMaximized == false){
            maxResBtn.title = 'Maximize';
            maximizeImage.src = "../images/resize.png";
        } else {
            maxResBtn.title = 'Restore';
            maximizeImage.src = "../images/minimize.png";
        }
        document.body.style.background = 'linear-gradient(to right,'+(data.appColors.backgroundColor1)+','+(data.appColors.backgroundColor2)+')';
        checkBoxNumbers.checked = data.checkboxes.numbers;
        checkBoxLowercaseLetters.checked = data.checkboxes.lowercase;
        checkBoxCapitalLetters.checked = data.checkboxes.capitalLetters;
        checkboxSpecialLetters.checked = data.checkboxes.specialCharacters;
        passwordLength.value = data.others.passwordLength;
        color1.value = data.appColors.backgroundColor1;
        color2.value = data.appColors.backgroundColor2;
        color1b.value = data.appColors.backgroundColor1b;
        color2b.value = data.appColors.backgroundColor2b;
        checkboxAutoCopy.checked = data.checkboxes.autoCopy;
        passwordGenerated.innerHTML = ": " + data.others.passwordGenerated;
        for (var i = 0 ; i < elements.length ; i++) {
            elements[i].style.background = 'linear-gradient(to right, '+(data.appColors.backgroundColor1b)+','+(data.appColors.backgroundColor2b)+')';
        }
    });
};

function maximizeButton(maxResBtn, maximizeImage){
    loadJSON(function(data) {
        if(data.windowBounds.isMaximized == true){
            maxResBtn.title = 'Maximize';
            maximizeImage.src = "../images/resize.png";
            data.windowBounds.isMaximized = false;
        } else {
            maxResBtn.title = 'Restore';
            maximizeImage.src = "../images/minimize.png";
            data.windowBounds.isMaximized = true;
        }
        writeJSON(data)
    });
};

module.exports = { loadJSON, writeJSON, restorePage, maximizeButton, ...module.exports };