// node main.js
//  dir Fquih Ben Salah == 66
// Before Update dir 66 is empty and Fquih Ben Salah == 116

var fs = require('fs');
const axios = require('axios');
var numberOfFiles = 0;
var d = new Date();
var year = d.getFullYear().toString();


for (var i = 1; i <= 115; i++) {
    for (var j = 1; j <= 12; j++) {
        GetData(i, j)

    }
}

function GetData(i, j) {

    if (!fs.existsSync(year)) {
        fs.mkdirSync(year, {
            recursive: true
        });
    } else {
        const dir = './' + year + '/' + i;
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, {
                recursive: true
            });
        }
        else {
            const file = dir + '/' + j + '.json'
            if (!fs.existsSync(file)) {
                if (i == 66) {
                    axios.get('https://backend.menara.ma/api/prayers/116/' + j)
                        .then(response => {
                            fs.appendFile(file, JSON.stringify(response.data), function (err) {
                                if (err) throw err;

                                console.log('City: ' + i + ' | Month: ' + j + ' - Saved!');
                            });
                        })
                        .catch(error => {
                            GetData(i, j)
                        })

                }
                else {
                    axios.get('https://backend.menara.ma/api/prayers/' + i + '/' + j)
                        .then(response => {
                            fs.appendFile(file, JSON.stringify(response.data), function (err) {
                                if (err) throw err;

                                console.log('City: ' + i + ' | Month: ' + j + ' - Saved!');
                            });
                        })
                        .catch(error => {
                            GetData(i, j)
                        })
                }
            } else {
                ++numberOfFiles;
            }
        }
    }
}


if (numberOfFiles == 1380) {

    console.log("\x1b[32m", " All Saved : 100% :)")
} else {

    console.log("!! Please execute the \" node main.js \" command until all files are loaded !!");

}