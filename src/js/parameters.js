const fs = require("fs");
let dtStart = fs.readFileSync("src/user-preferences.json");
let dataStart = JSON.parse(dtStart);
document.body.style.background = 'linear-gradient(to right, '+(dataStart.appColors.backgroundColor1)+', '+(dataStart.appColors.backgroundColor2)+')';

// ============================== Save background colors into user-preferences ==============================

var color1 = document.querySelector("#color1");
var color2 = document.querySelector("#color2");

color1.value = dataStart.appColors.backgroundColor1;
color2.value = dataStart.appColors.backgroundColor2;

color1.addEventListener("input", () => {
    let dt = fs.readFileSync("src/user-preferences.json");
    let data = JSON.parse(dt);
    data.appColors.backgroundColor1 = color1.value;
    var json = JSON.stringify(data, null, 2);
    fs.writeFile("src/user-preferences.json", json, "utf8", (err) => { if (err) console.log(err); });
    document.body.style.background = 'linear-gradient(to right,'+(data.appColors.backgroundColor1)+','+(data.appColors.backgroundColor2)+')';
});

color2.addEventListener("input", () => {
    let dt = fs.readFileSync("src/user-preferences.json");
    let data = JSON.parse(dt);
    data.appColors.backgroundColor2 = color2.value;
    var json = JSON.stringify(data, null, 2);
    fs.writeFile("src/user-preferences.json", json, "utf8", (err) => { if (err) console.log(err); });
    document.body.style.background = 'linear-gradient(to right,'+(data.appColors.backgroundColor1)+','+(data.appColors.backgroundColor2)+')';
});

// ============================== Reset color ==============================

var resetColorButton = document.querySelector("#reset-color");

resetColorButton.addEventListener("click", () => {
    let dt = fs.readFileSync("src/user-preferences.json");
    let data = JSON.parse(dt);
    document.body.style.background = 'linear-gradient(to right, #393E46, #222831)';
    data.appColors.backgroundColor1 = "#393E46";
    data.appColors.backgroundColor2 = "#222831";
    var json = JSON.stringify(data, null, 2);
    fs.writeFile("src/user-preferences.json", json, "utf8", (err) => { if (err) console.log(err); });
});