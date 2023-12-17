const fs = require('fs');
const path = require('path');

let tempData = [];

//Load a JSON file
function dataLoader(){
    tempData = JSON.parse(fs.readFileSync('src/gameData/data.json'));

    if(!tempData)
        tempData = [];

    console.log(`Loaded games...\n${tempData}`);
    contentGenerator(tempData);
}

//Generate all the HTML data loaded from JSON
function contentGenerator(data){
    const container = document.getElementById('gamesContainer');
    
    if(container){
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
}

//Generate a new game object
function generateGame(
    title = 'No Title data',
    console = 'No Console data',
    genre = 'No Genre data',
    finished = false,
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
    //Capturing form data
    const gTitle = document.getElementById('gameTitle').value;
    const gConsole = document.getElementById('console').value;
    const gGenre = document.getElementById('genero').value;
    const pA = document.getElementById('playerA').value;
    const pB = document.getElementById('playerB').value;
    const pC = document.getElementById('playerC').value;
    const pD = document.getElementById('playerD').value;
    const finished = document.querySelector('input[name=finished]:checked')
        .value == 'sim' ? true:false;

    //A adição é assim
    if(!inputValidation(gTitle, pA)){
        console.log('Falta titulo e nome do jogador...');
    }
    else {
        const dq = generateGame(
            gTitle,
            gConsole,
            gGenre,
            finished,
            stringValidation(pA),
            stringValidation(pB),
            stringValidation(pC),
            stringValidation(pD)
        );
        console.log(`New game created! \n${dq}`);
        storeData(dq)
        alert('Jogo Adicionado!');
    }
})

//Store new game on array, and array on external json file
function storeData(newGame){
    tempData.push(newGame);
    // const savePath = path.join(__dirname+'/gameData/data.json');
    const savePath = path.join('src/gameData/data.json');
    
    fs.writeFileSync(savePath, JSON.stringify(tempData), (err)=>{
        if (err) { throw err; }
        else
            console.log("JSON salvo com sucesso");
    });

    return true;
}

function stringValidation(name){
    if(name.length>0)
        return name;
    return null;
}

function inputValidation(title, pA ){
    const titleVal = stringValidation(title);
    const paVal = stringValidation(pA);

    return titleVal && paVal ? true : false;
}
