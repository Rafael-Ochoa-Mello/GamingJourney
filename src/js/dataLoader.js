const fs = require('fs');

function dataLoader(){
    const data = JSON.parse(fs.readFileSync('src/gameData/data.json'));
    const title = document.getElementById('gameTitle');
     title.innerHTML = data[0].title;
     console.log(data);
}