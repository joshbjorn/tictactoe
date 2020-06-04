const player = (name, marker) => {
    const setMarker = () => {
        return marker; 
    }; 

    let score = 0; 

    return {name, setMarker, score};
}

const gameboard = (() => {

    const table = document.querySelector('table');

    const array = {
        a1: "",
        a2: "", 
        a3: "",
        b1: "",
        b2: "", 
        b3: "",
        c1: "",
        c2: "",
        c3: "",
    } 

    const resetBoard = () => {
        for (let key in gameboard.array){
            gameboard.array[key] = "";
        }

        let table = document.querySelectorAll('td'); 

        for (let cell of table){
            cell.innerHTML = "";
            cell.classList.remove('naughts', 'crosses', 'naught-mousover', 'cross-mouseover');
        }
    }
    
    const renderGameboard = () => {
    
        let data = gameboard.array; 

        for (let element in data){
            if (element === "a1" || element === "b1"|| element === "c1") {
                var row = table.insertRow();
            }

            let cell = row.insertCell(); 
            let marker = document.createTextNode(data[element])

            cell.appendChild(marker);
            cell.addEventListener('click', (event) => {
                if (data[element] == "x" || data[element] == "o"){
                } else if (gameboard.turn === "o"){
                    data[element] = naughts.setMarker();
                    cell.innerText = naughts.setMarker();
                    cell.classList.add('naughts');
                    gameboard.turn = "x"
                } else if (gameboard.turn === "x"){
                    data[element] = crosses.setMarker();
                    cell.innerText = crosses.setMarker();
                    cell.classList.add('crosses');
                    gameboard.turn = "o"
                } 
                gameboard.gameWon();
                gameboard.gameDraw(); 
            });

            cell.addEventListener('mouseover', (e) => {
                if (cell.innerText == ""){
                    cell.innerText = gameboard.turn;
                    if (gameboard.turn == "x"){
                        cell.classList.add('cross-mouseover');
                    } else if (gameboard.turn == "o") {
                        cell.classList.add('naught-mouseover');
                    }
                }
            })

            cell.addEventListener('mouseout', (e) => {
                if (data[element] == "x" || data[element] == "o"){
                } else {
                    cell.innerText = "";
                    if (gameboard.turn == "x"){
                        cell.classList.remove('cross-mouseover');
                    } else if (gameboard.turn == "o") {
                        cell.classList.remove('naught-mouseover');
                    }
                }
            })               
        } 
    }

    let turn = "o";

    const gameWon = () => {

        let data = gameboard.array;
        
        switch (true){
            case data['a1'] === "x" && data['a2'] === "x" && data['a3'] === "x":
            case data['a1'] === "x" && data['b1'] === "x" && data['c1'] === "x":
            case data['a2'] === "x" && data['b2'] === "x" && data['c2'] === "x":
            case data['a3'] === "x" && data['b3'] === "x" && data['c3'] === "x":
            case data['b1'] === "x" && data['b2'] === "x" && data['b3'] === "x":
            case data['c1'] === "x" && data['c2'] === "x" && data['c3'] === "x":
            case data['a1'] === "x" && data['b2'] === "x" && data['c3'] === "x":
            case data['a3'] === "x" && data['b2'] === "x" && data['c1'] === "x":
                scoreboard.winner.innerText = `${crosses.name} wins!`;
                crosses.score += 1; 
                scoreboard.displayWinner();
                scoreboard.displayScore();  
                gameboard.resetBoard();
                break; 
            case data['a1'] === "o" && data['a2'] === "o" && data['a3'] === "o":
            case data['a1'] === "o" && data['b1'] === "o" && data['c1'] === "o":
            case data['a2'] === "o" && data['b2'] === "o" && data['c2'] === "o":
            case data['a3'] === "o" && data['b3'] === "o" && data['c3'] === "o":
            case data['b1'] === "o" && data['b2'] === "o" && data['b3'] === "o":
            case data['c1'] === "o" && data['c2'] === "o" && data['c3'] === "o":
            case data['a1'] === "o" && data['b2'] === "o" && data['c3'] === "o":
            case data['a3'] === "o" && data['b2'] === "o" && data['c1'] === "o":
                scoreboard.winner.innerText = `${naughts.name} wins!`;
                naughts.score += 1;
                scoreboard.displayWinner();
                scoreboard.displayScore(); 
                gameboard.resetBoard();
                break; 
        }
    }

    const gameDraw = () => {
        let data = gameboard.array;
        let dataArray = [];

        for (let key in data){
            dataArray.push(data[key]);
        }

        if (dataArray.indexOf("") == -1){
            scoreboard.displayWinner();
            scoreboard.winner.innerText = "Draw!"
            gameboard.resetBoard();
        }


    }

    return {table, array, resetBoard, renderGameboard, turn, gameWon, gameDraw};
})(); 

const buttons = (() => {

    const playButton = document.querySelector('.play-button-button'); 
    const playerScores = document.querySelector('.scoreboard-hidden');
    const gameButtons = document.querySelector('.game-buttons-hidden');
    const playerForm = document.querySelector('.player-form');
    const playerOne = document.querySelector('#player-one');
    const playerTwo = document.querySelector('#player-two');
    const resetButton = document.querySelector('.reset-button');
    const newMatchButton = document.querySelector(('.new-match-button'));

    const playButtonAction = () => {
        buttons.playButton.addEventListener('click', () => {

            if (buttons.playerOne.value == ""){
                buttons.playerOne.value = "Player 1"
            }

            naughts = player(buttons.playerOne.value, "o");
            
            if (buttons.playerTwo.value == ""){ 
                buttons.playerTwo.value = "Player 2"
            }

            crosses = player(buttons.playerTwo.value, "x");

            buttons.playerScores.classList.remove("scoreboard-hidden");
            buttons.playerScores.classList.add("scoreboard");

            buttons.gameButtons.classList.remove("game-buttons-hidden");
            buttons.gameButtons.classList.add("game-buttons");

            buttons.playButton.classList.remove("play-button-button");
            buttons.playButton.classList.add("play-button-hidden");

            buttons.playerForm.classList.remove("player-form");
            buttons.playerForm.classList.add("player-form-hidden");

           
            scoreboard.displayName();
            scoreboard.displayScore();
            gameboard.renderGameboard();
        });
    }

    const newMatchButtonAction = () => {
        buttons.newMatchButton.addEventListener('click', () => {
            buttons.playerScores.classList.add("scoreboard-hidden");
            buttons.playerScores.classList.remove("scoreboard");

            buttons.gameButtons.classList.add("game-buttons-hidden");
            buttons.gameButtons.classList.remove("game-buttons");

            buttons.playButton.classList.add("play-button-button");
            buttons.playButton.classList.remove("play-button-hidden");

            buttons.playerForm.classList.add("player-form");
            buttons.playerForm.classList.remove("player-form-hidden");

            gameboard.resetBoard();
            buttons.playerOne.value = ""; 
            buttons.playerTwo.value = ""; 
            naughts = null; 
            crosses = null; 
            gameboard.table.innerHTML = "";
        })
    }

    const resetButtonAction = () => {
        buttons.resetButton.addEventListener('click', () => {
            gameboard.resetBoard();
        })
    }

    return {playButton, playerScores, gameButtons, playerForm, playerOne, playerTwo, resetButton, newMatchButton, playButtonAction, resetButtonAction, newMatchButtonAction};
})();

const scoreboard = (() => {

    const winner = document.querySelector('.winner');

    const displayScore = function(){
        naughtsScore = document.querySelector('.naughts-score');
        crossesScore = document.querySelector('.crosses-score');

        naughtsScore.innerText = naughts.score; 
        crossesScore.innerText = crosses.score; 
    }

    const displayName = function(){
        naughtsPlayer = document.querySelector('.naughtsplayer');
        crossesPlayer = document.querySelector('.crossesplayer');

        naughtsPlayer.innerText = naughts.name;
        crossesPlayer.innerText = crosses.name;
    }

    const displayWinner = function(){
        const displayWinner = document.querySelector('.winner-container'); 
        const scoreBoard = document.querySelector('.scoreboard');
        
        displayWinner.classList.toggle('winner-container-hidden');
        scoreBoard.classList.toggle('scoreboard-hidden');

        setTimeout(() => {
            displayWinner.classList.toggle('winner-container-hidden');
            scoreBoard.classList.toggle('scoreboard-hidden');
        }, 1000);  
    }
    return {winner, displayScore, displayName, displayWinner};
})(); 



let naughts;
let crosses;

buttons.resetButtonAction();
buttons.playButtonAction();
buttons.newMatchButtonAction();