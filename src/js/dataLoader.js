const fs = require('fs');

//Load a JSON file
function dataLoader(){
    const data = JSON.parse(fs.readFileSync('src/gameData/data.json'));
    contentGenerator(data);
}

//Generate all the HTML data loaded from JSON
function contentGenerator(data){
    const container = document.getElementById('gamesContainer');
    
    for(let i = 0; i<data.length; i++){
        let gameCard = document.createElement('div');
        let title = document.createElement('h3');
        let console = document.createElement('p')
        
        //Elements styling
        gameCard.classList.add('gameCard');
        title.classList.add('gameText');
        console.classList.add('gameText');

        //Binding data (from JSON)
        title.textContent = data[i].title;
        console.textContent = data[i].console;

        //Binding data (to Card)
        gameCard.appendChild(title);
        gameCard.appendChild(console);
        
        //Binding to container
        container.appendChild(gameCard);        
    }
}

