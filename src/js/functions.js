const loadJSON = function(callback) {
    var json = new XMLHttpRequest();
    json.overrideMimeType("application/json");
    json.open('GET', '../user-preferences.json', true);
    json.onreadystatechange = function () {
        if (json.readyState == 4 && json.status == 200) {
            try {
                const data = JSON.parse(json.responseText);
                callback(data);
            } catch (e) {
                console.error('Error parsing JSON data:', e);
            }
        }
    };
    json.send(null);
}

function restorePage(maximizeImage, elements, currentPage, passwordGenerated){
    loadJSON(function(data) {
        document.body.style.transition = "opacity 0.5s ease-in-out";
        document.body.style.opacity= "1";
        if(data.windowBounds.isMaximized == true){
            maxResBtn.title = 'Restore';
            maximizeImage.src = "../images/minimize.png";
        } else {
            maxResBtn.title = 'Maximize';
            maximizeImage.src = "../images/resize.png";
        }
        if(currentPage == "index"){
            document.body.style.background = 'linear-gradient(to right,'+(data.appColors.backgroundColor1)+','+(data.appColors.backgroundColor2)+')';
            checkBoxNumbers.checked = data.checkboxes.numbers;
            checkBoxLowercaseLetters.checked = data.checkboxes.lowercase;
            checkBoxCapitalLetters.checked = data.checkboxes.capitalLetters;
            checkboxSpecialLetters.checked = data.checkboxes.specialCharacters;
            passwordLength.value = data.others.passwordLength;
            for (var i = 0 ; i < elements.length ; i++) {
                elements[i].style.background = 'linear-gradient(to right, '+(data.appColors.backgroundColor1b)+','+(data.appColors.backgroundColor2b)+')';
            }
        } else if(currentPage == "parameters"){
            document.body.style.background = 'linear-gradient(to right, '+(data.appColors.backgroundColor1)+', '+(data.appColors.backgroundColor2)+')';
            color1.value = data.appColors.backgroundColor1;
            color2.value = data.appColors.backgroundColor2;
            color1b.value = data.appColors.backgroundColor1b;
            color2b.value = data.appColors.backgroundColor2b;
            checkboxAutoCopy.checked = data.checkboxes.autoCopy;
            passwordGenerated.innerHTML = ": " + data.others.passwordGenerated;
            for (var i = 0 ; i < elements.length ; i++) {
                elements[i].style.background = 'linear-gradient(to right, '+(data.appColors.backgroundColor1b)+','+(data.appColors.backgroundColor2b)+')';
            }
        }
    });
}

module.exports = { loadJSON, restorePage, ...module.exports };