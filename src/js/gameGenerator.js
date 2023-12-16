//Recebe os dados e retornar um novo objeto JSON

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
    console.log(dq);
})


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

function storeData(gameData, newGame){
    gameData.push(newGame);
    return true;
}


