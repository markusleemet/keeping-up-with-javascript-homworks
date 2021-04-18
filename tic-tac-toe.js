const gameBoard = {
    'box-1': '',
    'box-2': '',
    'box-3': '',
    'box-4': '',
    'box-5': '',
    'box-6': '',
    'box-7': '',
    'box-8': '',
    'box-9': ''
};

let turnCounter = 0;


document.addEventListener("click", (event) => {
    const clickedBoxId = event.target.id;
    const clickedBox = document.getElementById(clickedBoxId);

    //Check if box is clickable
    if (clickedBox && clickedBox.classList.contains('box') && !gameBoard[clickedBoxId]){
        if (turnCounter % 2 === 0) {
            clickedBox.appendChild(createSignX(clickedBoxId));
        } else {
            clickedBox.appendChild(createSignO(clickedBoxId));
        }
        turnCounter++;
        setTimeout(checkForWin, 200);
    }
});


const createSignX = (id) => {
    const X_SIGN = document.createElement('P');
    X_SIGN.classList.add('x-sign', 'sign');
    X_SIGN.innerText = 'X';
    gameBoard[id] = 'x';
    return X_SIGN;
};


const createSignO = (id) => {
    const O_SIGN = document.createElement('P');
    O_SIGN.classList.add('o-sign', 'sign');
    O_SIGN.innerText = 'O';
    gameBoard[id] = 'o';
    return O_SIGN;
};


const endGame = (winner) => {
    if (winner === 'draw') {
        window.alert('Cats game!');
    }else {
        window.alert(winner + ' has won!');
    }
    for (let field in gameBoard) {
        gameBoard[field] = '';
    }
    const gameFields = document.querySelectorAll('.sign');
    for (let field of gameFields) {
        field.remove();
    }
    turnCounter = 0;
};

const checkForWin = () => {
        if (gameBoard["box-1"] && gameBoard["box-1"] === gameBoard["box-2"] && gameBoard["box-2"] === gameBoard["box-3"]) {
            endGame(gameBoard["box-1"]);
        } else if(gameBoard["box-4"] && gameBoard["box-4"] === gameBoard["box-5"] && gameBoard["box-5"] === gameBoard["box-6"]) {
            endGame(gameBoard["box-4"]);
        } else if(gameBoard["box-7"] && gameBoard["box-7"] === gameBoard["box-8"] && gameBoard["box-8"] === gameBoard["box-9"]) {
            endGame(gameBoard["box-7"]);
        } else if(gameBoard["box-1"] && gameBoard["box-1"] === gameBoard["box-4"] && gameBoard["box-4"] === gameBoard["box-7"]) {
            endGame(gameBoard["box-1"]);
        } else if(gameBoard["box-2"] && gameBoard["box-2"] === gameBoard["box-5"] && gameBoard["box-5"] === gameBoard["box-8"]) {
            endGame(gameBoard["box-2"]);
        } else if(gameBoard["box-3"] && gameBoard["box-3"] === gameBoard["box-6"] && gameBoard["box-6"] === gameBoard["box-9"]) {
            endGame(gameBoard["box-3"]);
        } else if(gameBoard["box-1"] && gameBoard["box-1"] === gameBoard["box-5"] && gameBoard["box-5"] === gameBoard["box-9"]) {
            endGame(gameBoard["box-1"]);
        } else if(gameBoard["box-3"] && gameBoard["box-3"] === gameBoard["box-5"] && gameBoard["box-5"] === gameBoard["box-7"]) {
            endGame(gameBoard["box-3"]);
        } else if (turnCounter === 9) {
            endGame('draw');
        }
};
