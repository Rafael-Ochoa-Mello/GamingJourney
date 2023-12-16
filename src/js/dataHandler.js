const fs = require('fs');
const path = require('path');

let tempData = [];

//Load a JSON file
function dataLoader(){
    const data = JSON.parse(fs.readFileSync('src/gameData/data.json'));
    tempData = data;
    console.log(`Loaded games...\n${tempData}`);
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

//Generate a new game object
function generateGame(
    title = 'No Title data',
    console = 'No Console data',
    genre = 'No Genre data',
    finished = false,
    solo = false,
    p1 = null,
    p2 = null,
    p3 = null,
    p4 = null 
){
    return Object.seal({
        title,
        imgTitle:`img${title}.png`,
        console,
        genre, 
        finished,
        solo,
        players:{
            p1,
            p2,
            p3,
            p4
        }
    });
}

//Event handler to generate a new game and store on gamesArray
document.getElementById('addGame').addEventListener('click', function(){
    //Futuramente vamos capturar os dados
    //dos formulários aqui...

    //A adição é assim
    const dq = generateGame(
        'Dragon Quest',
        'NES',
        'RPG',
        true,
        true,
        'Rafael'
    );

    console.log(`New game created! \n${dq}`);
    storeData(dq)
})

//Store new game on array, and array on external json file
function storeData(newGame){
    tempData.push(newGame);
    
    const savePath = path.join(__dirname+'/gameData/data.json');
    
    fs.writeFileSync(savePath, JSON.stringify(tempData), (err)=>{
        if (err) { throw err; }
        else
            console.log("JSON salvo com sucesso");
    });


    return true;
}


