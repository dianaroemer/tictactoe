
// Needed objects
/* 
    1. Gameboard - Module
    2. DisplayController - Module
    3. GameState - Module???
    3. Player 1 - Factory Object
    4. Player 2 - Factory Object
    5. AI - Factory Object

*/

const gameBoard = (() => {

    let _gameBoard = ["", "", "", "", "", "", "", "", ""];


    // Returns current gameBoard
    const getInfo = () => {
        return _gameBoard;
    }

    // updateGameBoard takes the index of _gameBoard to be updated, and a new incomingValue, type checks index and incomingValue to be legal moves, then passes them into _gameBoard before updating the displayController.
    const updateGameBoard = (index, incomingValue) => {
        
        if(index > 8 || index < 0) {
            console.log(`ERROR: updateGameBoard failed because index was out of bounds! index of: "${index}"`)
            return false;
        };
        switch (incomingValue) {
            case "X":
            case "O":
            case "":
                _gameBoard[index] = incomingValue;
                displayController.updateDOMBoard(_gameBoard);
                return true;
            default:
                console.log(`ERROR: updateGameBoard's incomingValue was invalid! incomingValue of: "${incomingValue}"`);
                return false;
        }


    }

    const resetGameBoard = () => {
        for (let i = 0; i < 9; i++) {
            updateGameBoard(i, "");
        }
    }

    const logBoard = () => {
        console.log(getInfo());
        let board = getInfo();
        console.log(`---------
${(board[0] == '') ? " " : board[0]} | ${(board[1] == '') ? " " : board[1]} | ${(board[2] == '') ? " " : board[2]}
${(board[3] == '') ? " " : board[3]} | ${(board[4] == '') ? " " : board[4]} | ${(board[5] == '') ? " " : board[5]}
${(board[6] == '') ? " " : board[6]} | ${(board[7] == '') ? " " : board[7]} | ${(board[8] == '') ? " " : board[8]}
---------`)
    }

    return {
        getInfo,
        updateGameBoard,
        resetGameBoard,
        logBoard, 
    }

})();

const Player = (playerName, playerInput) => {

    let name = "Player 1";
    let input = "X"

    const getInfo = () => {
        return `I am a Player object, my information is as follows
        name: ${name}
        input: ${input}`
    }

    const getName = () => {
        return name;
    }

    const setName = (newName) => {
        if ((typeof newName) == "string") {
            name = newName;
        }
    }

    const getInput = () => {
        return input;
    }

    const setInput = (newInput) => {
        if( newInput === "X" || newInput == "O") {
            input = newInput;
        }
    }

    setName(playerName);
    setInput(playerInput);

    
    return {
        getInfo,
        getName,
        setName,
        getInput,
        setInput,



    }
}

const gameEngine = (() => {
    let _turnCounter = 0;
    let playingGame = false;
    const playerOne = Player("Player 1", "X");
    const playerTwo = Player("Player 2", "O");
    let _gameAgainstEasyAI = false;
    let playerMove = false;
    let botViableMoves = [0,1,2,3,3,4,5,6,7,8];
    let mostRecentGame = "";

    const getInfo = () => {
        console.log(`I am gameEngine.getInfo, this is my information
        _turnCounter: ${_turnCounter}
        playingGame: ${playingGame} 
        _gameAgainstEasyAI: ${_gameAgainstEasyAI}
        playerMove: ${playerMove} 
        playerOne: ${playerOne.getInfo()}
        playerTwo: ${playerTwo.getInfo()}
        botViableMoves: ${botViableMoves}
        mostRecentGame: ${mostRecentGame}`);
    }

    const startGame = () => {
        _resetTurns();
        _togglePlayingGame();
        _setMostRecentGame("player");

        if(_gameAgainstEasyAI) {
            _toggleGameAgainstEasyAI();
        }

        playerOne.setName("Player 1");
        playerTwo.setName("Player 2");

    }

    const startGameEasy = () => {

        // console.log(`You've reached the place to start a game agaist an EASY AI`);
        _resetTurns();
        if( !_gameAgainstEasyAI) {
            _toggleGameAgainstEasyAI();
        }
        _togglePlayingGame();
        _initBotViableMoves();
        _setMostRecentGame("easy");


        if( Math.floor(Math.random() * 2) ) {
        // if (false) {
            // Player is going first
            playerOne.setName("Player 1")
            playerTwo.setName("AI");
            // console.log(`You're going first!`);
        } else {
            // Player is going second
            playerOne.setName("AI");
            playerTwo.setName("Player 2")
            // console.log(`You're going second!`);
            // togglePlayerMove();
            playRound(_makeEasyMoveAI());
        }

    }

    // XXXUPDATEXXX Change this to work with a strikeout system instead of constantly randomized, a la, can't get 9 9 9 9 9 9 over and over
    const _makeEasyMoveAI = () => {
    
        // const currentBoard = gameBoard.getInfo();

        // console.log(botViableMoves);
        let tempBoard = botViableMoves.filter( element => {
            return element !== null;
        })

        // console.log(tempBoard);

        let pos = Math.floor(Math.random() * (tempBoard.length));

        // let val = botViableMoves.splice(pos, 1);

        return tempBoard[pos];



        // if (currentBoard[pos] !== "" ) {
        //     return _makeEasyMoveAI();
        // } else {
        //     console.log(pos);
        //     return pos;
        // }


    }

    const startGameHard = () => {

        console.log(`You've reached the place to start a game agaist an HARD AI`);
        _resetTurns();
        _togglePlayingGame();

        // Returns a random number between 0 and 1
        if( Math.floor(Math.random() * 2) ) {
            // Player is going first
        } else {
            // Player is going second
        }

    }

    const _initBotViableMoves = () => {
        botViableMoves = [0,1,2,3,4,5,6,7,8];
    }

    const playRound = (position) => {
        // Check if playing an active game
        if(!playingGame) {
            console.log(`Error thrown by playRound!
            playinGame: ${playingGame}`);
            return `Not playing active game! Error thrown by playRound`
        }

        console.log(`hit playRound with input ${position}`);

        // if( _turnCounter >= 9 ) {
        //     console.log(`Reached maximum number of turns! Turn is invalid! 
        //     _turnCounter: ${_turnCounter}
            
        //     Does that mean this game is a draw? Is there a place to put this so it triggers on round 9's input? `);
        //     return false;
        // }

        // Check if move is legal
        if (!_isMoveLegal(position)) {
            return false; // Selected position is an illegal move! 
        }

        if (_turnCounter % 2 == 0) {
            gameBoard.updateGameBoard(position, "X");
        } else {
            gameBoard.updateGameBoard(position, "O");
        }


        // Trims botViableMoves board to prevent chance of unlimited recursion with randomized numbers
        botViableMoves[position] = null;

        _turnCounter++;


        if(_turnCounter >= 4) {
            _checkWinCondition();
        }

        // End game in draw if no winning condition as been met
        if(_turnCounter > 8) {
           _endGameDraw();
        }

        if(_gameAgainstEasyAI && playerMove) {
            // playRound(_makeEasyMoveAI());
            togglePlayerMove();
            setTimeout(playRound, 1000, _makeEasyMoveAI());
        }

        // console.log('You have completed a runtime of playRound');
    }

    const _isMoveLegal = (position) => {
        let tempGameBoard = gameBoard.getInfo();
        if (tempGameBoard[position] == "X" || tempGameBoard[position] == "O") {
            return false;
        } else {
            return true;
        }
    }

    const _resetTurns = () => {
        _turnCounter = 0;
    }

    const _togglePlayingGame = () => {
        if (playingGame) {
            playingGame = false;
        } else {
            playingGame = true;
        }
    }

    const isPlayingGame = () => {
        return playingGame;
    }

    const _checkWinCondition = () => {

        // console.log("I am checking if a win condition has been reached");

        const winBoard = gameBoard.getInfo();
        let keyPiece;

        // Vertical Winning positions 
        /* 
        X | O | O     O | X | O     O | O | x     
        X | O | O     O | X | O     O | O | X     
        X | O | O     O | X | O     O | O | X     
        */
        keyPiece = winBoard[0];
        if(keyPiece !== "") {
            if( winBoard[3] === keyPiece && winBoard[6] === keyPiece) {
                // console.log(`WIN CONDITION HAS BEEN FOUND WITH ${keyPiece} in a vertical winning position, slots 0,3,6`)
                _endGameWinner(0, 3, 6, keyPiece);
            }
        }
        keyPiece = winBoard[1];
        if(keyPiece !== "") {
            if( winBoard[4] === keyPiece && winBoard[7] === keyPiece) {
                // console.log(`WIN CONDITION HAS BEEN FOUND WITH ${keyPiece} in a vertical winning position, slots 1,4,7`)
                _endGameWinner(1, 4, 7, keyPiece);
            }
        }
        keyPiece = winBoard[2];
        if(keyPiece !== "") {
            if( winBoard[5] === keyPiece && winBoard[8] === keyPiece) {
                // console.log(`WIN CONDITION HAS BEEN FOUND WITH ${keyPiece} in a vertical winning position, slots 2,5,8`)
                _endGameWinner(2, 5, 8, keyPiece);
            }
        }

        // Horizontal Winning positions 
        /* 
        X | X | X     O | O | O     O | O | O     
        O | O | O     X | X | X     O | O | O     
        O | O | O     O | O | O     X | X | X     
        */
        keyPiece = winBoard[0];
        if(keyPiece !== "") {
            if( winBoard[1] === keyPiece && winBoard[2] === keyPiece) {
                // console.log(`WIN CONDITION HAS BEEN FOUND WITH ${keyPiece} in a Horizontal winning position, slots 0,1,2`)
                _endGameWinner(0, 1, 2, keyPiece);
            }
        }
        keyPiece = winBoard[3];
        if(keyPiece !== "") {
            if( winBoard[4] === keyPiece && winBoard[5] === keyPiece) {
                // console.log(`WIN CONDITION HAS BEEN FOUND WITH ${keyPiece} in a Horizontal winning position, slots 3,4,5`)
                _endGameWinner(3, 4, 5, keyPiece);
            }
        }
        keyPiece = winBoard[6];
        if(keyPiece !== "") {
            if( winBoard[7] === keyPiece && winBoard[8] === keyPiece) {
                // console.log(`WIN CONDITION HAS BEEN FOUND WITH ${keyPiece} in a Horizontal winning position, slots 6,7,8`)
                _endGameWinner(6, 7, 8, keyPiece);

            }
        }

        // Diagonal Winning Positions
        /* 
        X | O | O     O | O | X     
        O | X | O     O | X | O     
        O | O | X     X | O | O    
        */
        keyPiece = winBoard[0];
        if(keyPiece !== "") {
            if( winBoard[4] === keyPiece && winBoard[8] === keyPiece) {
                // console.log(`WIN CONDITION HAS BEEN FOUND WITH ${keyPiece} in a Diagonal winning position, slots 0,4,8`)
                _endGameWinner(0, 4, 8, keyPiece);
            }
        }
        keyPiece = winBoard[2];
        if(keyPiece !== "") {
            if( winBoard[4] === keyPiece && winBoard[6] === keyPiece) {
                // console.log(`WIN CONDITION HAS BEEN FOUND WITH ${keyPiece} in a Diagonal winning position, slots 2,4,6`)
                _endGameWinner(2, 4, 6, keyPiece);
            }
        }


        // console.log("_checkWinCondition() has completed its runtime");

    };

    const _endGameWinner = (pos1, pos2, pos3, winningPiece) => {

        const tempPlayers = _getPlayers();
        let winningPlayer;


        // Doing winningPiece conversion to determine which player owns the piece that won the game
        if( tempPlayers[0].getInput() === winningPiece ) {
            winningPlayer = tempPlayers[0].getName();
        } else {
            winningPlayer = tempPlayers[1].getName();
        }

        // console.log(`WIN Condition has been found! ${winningPiece} is the winner
        // in slots:
        // ${pos1}
        // ${pos2}
        // ${pos3}
        // and the winning player is ${winningPlayer}`);
        
        _togglePlayingGame();
        if(_gameAgainstEasyAI) {
            _toggleGameAgainstEasyAI();
        }
        if(playerMove) {
            togglePlayerMove();
        };
        displayController.createWinnerMenu(pos1, pos2, pos3, winningPlayer);


    }

    const _endGameDraw = () => {
        _togglePlayingGame();
        if(_gameAgainstEasyAI) {
            _toggleGameAgainstEasyAI();
        }
        if(playerMove) {
            togglePlayerMove();
        };

        initMenu.generateDrawMenu();

    }

    const _getPlayers = () => {
        return [ playerOne, playerTwo ];
    }

    const _toggleGameAgainstEasyAI = () => {
        if(_gameAgainstEasyAI) {
            _gameAgainstEasyAI = false;
        } else {
            _gameAgainstEasyAI = true;
        }
    }

    const togglePlayerMove = () => {
        if( playerMove ) {
            playerMove = false;
        } else {
            playerMove = true;
        }
    }

    const getGameAgainstEasy = () => {
        return _gameAgainstEasyAI;
    }

    const getMostRecentGame = () => {
        return mostRecentGame;
    }

    const _setMostRecentGame = (argument) => {
        mostRecentGame = argument;
    }

    const resetMostRecentGame = () => {
        mostRecentGame = "";
    }
    

    return {
        getInfo,
        isPlayingGame,
        playRound,
        startGame,
        startGameEasy,
        startGameHard,
        togglePlayerMove,
        getGameAgainstEasy,
        getMostRecentGame,
        resetMostRecentGame,

    }

})();

const displayController = (() => {

    const _boardContainer = document.querySelector('.boardContainer');
    const _boardNL = document.querySelectorAll('.boardSlot');
    
    const _boardList = [];
    for(let i = _boardNL.length; i--; _boardList.unshift(_boardNL[i]));

        // The following is an init line that creates a JS reference to boardContainer's visible styling
    let _currDisplay;
    if (_boardContainer.style.display === "") _currDisplay = "grid";

    // updateDOMBoard takes an incoming gameBoard [] and passes it to the _boardList, updating _boardList's innerText to match the incomingBoard's state
    const updateDOMBoard = (incomingBoard) => {

        for( let i = 0; i < _boardList.length; i++) {
            _boardList[i].innerText = incomingBoard[i];
        }

        return true;
    }

    // Clear board sets the current _boardList's innerText of all elements to an empty string, while updating each point of _gameBoard to match the empty  string
    const clearBoard = () => {
        
        let tempBoard = [];

        let i = 0;

        _boardList.forEach( e => {
            e.innerText = "";
            gameBoard.updateGameBoard(i, "");
            i++;
        })

    }

    // Cycle board is simply a fun animation that runs before doing clearBoard()
    const cycleBoard = () => {

        let iter = 0;
        let intervalID = setInterval( () => {

            if (iter < _boardList.length){
                _boardList[iter].innerHTML = "X";
            }
            
            if(iter > 3 && iter < _boardList.length + 4 ) {
                _boardList[iter - 4].innerHTML = "O";
            }

            if( iter > 7 && iter < _boardList.length + 8) {
                _boardList[iter-8].innerHTML = "X";
            }

            if( iter > 11 && iter < _boardList.length + 12) {
                _boardList[iter-12].innerHTML = "";
            }

            iter++;

            // console.log('still running');
            if (iter >= _boardList.length + 12) {
                clearInterval(intervalID);
            }
        }, 70);

        clearBoard();

    }

    // randomizedBoard generates a random 'legal length' board state and passes it to the _boardList. When paired with setInterval, this function creates a fun animation that cycles random board states while the application is idling
        // XXXUPDATEXXX Make sure when this function is finished cycling on setInterval that clearBoard() is called correctly to re-pair the DOM to the empty _gameBoard[].
    const randomizedBoard = () => {

        clearBoard();

        let randomBoardState = []

        // Randomly determine a legal number of turns to "have played, from 0 to 9"
        let newBoardLen = Math.floor(Math.random() * 10);

        // Populate array based on number of legal turns to "have randomly played", and fill out rest of array
        for ( let i = 0; i < 9; i++) {
            if (newBoardLen == 0){
                randomBoardState.push("");
            } else {
                if ( i % 2 == 0) {
                    randomBoardState.push("X");
                } else {
                    randomBoardState.push("O");
                }
                newBoardLen--;
            }
        }

        // Populate _boardList with random ordered elements from randomBoardState
        _boardList.forEach( element => {
            element.innerHTML = randomBoardState.splice(Math.floor(Math.random() * randomBoardState.length), 1);

        })

        // To call randomizedBoard
        // let intervalID = setInterval(displayController.randomizedBoard, 750);
         // To end the randomized cycling
        // clearInter(intervalID);
        // displayController.clearBoard() // Be sure to call this to reinstantiate empty gameBoard and DOM
        

    }

    // Toggles the visibility of the DOM's gameBoard.
    const toggleGameBoard = () => {
        if (_currDisplay === "grid") {
            _boardContainer.style.display = "none";
            _currDisplay = "none";
        } else {
            _boardContainer.style.display = "grid";
            _currDisplay = "grid";
        }
    }

    // Getter function that returns current private variables for reference
    const getInfo = () => {
        console.log(_boardContainer);
        console.log(_boardList);
    }

    const createWinnerMenu = (pos1, pos2, pos3, winner) => {

        // Generate tacos
        _boardList[pos1].innerHTML += `<img src="media/taco.png" alt="A photo of a taco" class="taco">`;
        _boardList[pos2].innerHTML += `<img src="media/taco.png" alt="A photo of a taco" class="taco">`;
        _boardList[pos3].innerHTML += `<img src="media/taco.png" alt="A photo of a taco" class="taco">`;

        initMenu.generateWinnerMenu(winner);

    }

    _boardNL.forEach(element => {
        element.addEventListener('click', () => {
            // console.log('you have clicked a div')
            // console.log(`You have clicked this ${element.dataset.position}`)
            gameEngine.togglePlayerMove();
            gameEngine.playRound(element.dataset.position);
        })
    });

    return {
        getInfo,
        updateDOMBoard,

        toggleGameBoard,
        clearBoard,
        cycleBoard,
        randomizedBoard,
        createWinnerMenu,

    };

})();


const initMenu = (() => {

    let _menuReference;
    let _initMenuActive = false;
    let _intervalID;
    const _container = document.querySelector('.container');;

    const getInfo = () => {
        console.log(`I am initMenu! I run at the beginning of the application to start the menu which drives the initial setup before gameplay occurs.`)
        console.log(`My current states are: 
        _menuReference: ${_menuReference}
        _initMenuActive: ${_initMenuActive}
        _intervalID: ${_intervalID}
        _container: ${_container}`);


    }

    // In a perfect world, any objects or DOM elements that run out of initMenu are passed to the displayController - but that's a paradigm for me to practice and learn on my next project, rather than on this one. Refactoring ain't great.
    const generateInitMenu = () => {
        
        gameBoard.resetGameBoard();
        gameEngine.resetMostRecentGame();

        if(!_initMenuActive) {
            toggleInitMenuActive();
        }
        
        if(_menuReference) {
            let _parentReference = _menuReference.parentNode;
            _parentReference.removeChild(_menuReference);
        }

        const menuContainer = document.createElement('div');
        _menuReference = menuContainer;
        menuContainer.classList.add('menuContainer');
        const menuDiv = document.createElement('div');
        menuDiv.classList.add('menuDiv');
        menuDiv.innerHTML = `Greetings Professor Falken. <br>`
        menuDiv.innerHTML += `Shall we play a game? <br>`

        const menuButton = document.createElement('button');
        menuButton.classList.add('menuButton');
        _menuButtonReference = menuButton;
        menuButton.innerText = "Tic-Tac-Taco";
        menuButton.setAttribute("onclick", "initMenu.playersMenu();");

        const menuButton1 = document.createElement('button');
        menuButton1.classList.add('menuButton');
        menuButton1.innerText = "Chess";
        menuButton1.setAttribute("onclick", "initMenu.visitPortfolio();");
        
        const menuButton2 = document.createElement('button');
        menuButton2.classList.add('menuButton');
        menuButton2.innerText = "Checkers";
        menuButton2.setAttribute("onclick", "initMenu.visitPortfolio();");

        const menuButton3 = document.createElement('button');
        menuButton3.classList.add('menuButton');
        menuButton3.innerText = "Global Thermonuclear War";
        menuButton3.setAttribute("onclick", "initMenu.visitWarGames();");


        menuDiv.appendChild(menuButton);
        menuDiv.innerHTML += "<br>";
        menuDiv.appendChild(menuButton1);
        menuDiv.innerHTML += "<br>";
        menuDiv.appendChild(menuButton2);
        menuDiv.innerHTML += "<br>";
        menuDiv.appendChild(menuButton3);


        menuContainer.appendChild(menuDiv);
        _container.appendChild(menuContainer);

        
        _intervalID = setInterval( () => {
            // if (!_initMenuActive) {
            //     displayController.cycleBoard();
            //     toggleInitMenuActive();
            //     clearInterval(_intervalID);
            //     console.log('Here I am you dingus');
            // } else {
                displayController.randomizedBoard()
            // }
        }, 500);

        // console.log('generateInitMenu has been completed');
        return 'generateInitMenu has successfully been completed - initMenu has been created!';
    }

    const toggleInitMenuActive = () => {

        if(_initMenuActive) {
            _initMenuActive = false;
        } else {
            _initMenuActive = true;
        }

    }

    const playersMenu = () => {

        let _parentReference = _menuReference.parentNode;
        _parentReference.removeChild(_menuReference);

        const playersContainer = document.createElement('div');
        _menuReference = playersContainer;
        playersContainer.classList.add('playersContainer');
        const playersDiv = document.createElement('playersDiv');
        playersDiv.classList.add('playersDiv');
        playersDiv.innerHTML = `One or two players? <br>`
        playersDiv.innerHTML += `Please select number of players:`

        const menuButton = document.createElement('button');
        menuButton.classList.add('menuButton');
        _menuButtonReference = menuButton;
        menuButton.innerText = "1 (vs AI)";
        menuButton.setAttribute("onclick", "initMenu.onePlayerGameMenu();");

        const menuButton1 = document.createElement('button');
        menuButton1.classList.add('menuButton');
        menuButton1.innerText = "2 (Player vs Player)";
        menuButton1.setAttribute("onclick", "initMenu.twoPlayerGame();");
        
        const menuButton2 = document.createElement('button');
        menuButton2.classList.add('menuButton');
        menuButton2.innerText = "0 (AI vs AI)";
        menuButton2.setAttribute("onclick", "initMenu.visitEndgame();");

        _container.appendChild(playersContainer);
        playersContainer.appendChild(playersDiv);

        playersDiv.appendChild(menuButton);
        playersDiv.innerHTML += "<br>";
        playersDiv.appendChild(menuButton1);
        playersDiv.innerHTML += "<br>";
        playersDiv.appendChild(menuButton2);
        
        

        // console.log('here');
        return "You've made it to the playersMenu";
    }

    const onePlayerGameMenu = () => {

        let _parentReference = _menuReference.parentNode;
        _parentReference.removeChild(_menuReference);

        const onePlayerContainer = document.createElement('div');
        _menuReference = onePlayerContainer;
        onePlayerContainer.classList.add('onePlayerContainer');
        const onePlayerDiv = document.createElement('onePlayerDiv');
        onePlayerDiv.classList.add('onePlayerDiv');
        onePlayerDiv.innerHTML = `Please select a difficulty <br>`

        const menuButton = document.createElement('button');
        menuButton.classList.add('menuButton');
        _menuButtonReference = menuButton;
        menuButton.innerText = "Easy";
        menuButton.setAttribute("onclick", "initMenu.onePlayerEasy();");

        const menuButton1 = document.createElement('button');
        menuButton1.classList.add('menuButton');
        menuButton1.innerText = "Hard";
        menuButton1.setAttribute("onclick", "initMenu.onePlayerHard();");

        _container.appendChild(onePlayerContainer);
        onePlayerContainer.appendChild(onePlayerDiv);

        onePlayerDiv.appendChild(menuButton);
        onePlayerDiv.innerHTML += "<br>"
        onePlayerDiv.appendChild(menuButton1);

    }

    const onePlayerEasy = () => {

        let _parentReference = _menuReference.parentNode;
        if (_menuReference != null) {
            _parentReference.removeChild(_menuReference);
        }

        toggleInitMenuActive();

        clearInterval(_intervalID);
        displayController.cycleBoard();

        // This is the code to start the game
        setTimeout(gameEngine.startGameEasy, 1600);

    }

    const onePlayerHard = () => {

        let _parentReference = _menuReference.parentNode;
        if (_menuReference != null) {
            _parentReference.removeChild(_menuReference);
        }

        toggleInitMenuActive();

        clearInterval(_intervalID);
        displayController.cycleBoard();

        // This is the code to start the game
        setTimeout(gameEngine.startGameHard, 1600);

    }    


    const twoPlayerGame = () => {

        let _parentReference = _menuReference.parentNode;
        if (_menuReference != null) {
            _parentReference.removeChild(_menuReference);
        }

        toggleInitMenuActive();

        clearInterval(_intervalID);
        displayController.cycleBoard();

        // XXXUPDATEXXX This toggle decides whether or not to play again against an AI, however this should be changed to function off an independant playAgainAgainstEasy, instead of tying into actively playing against Easy,
            // There is a case in which playAgainstEasy != playAgainAgainstEasy, a la, ending a game and being in the menu
        if( gameEngine.getMostRecentGame() === "easy" ) {
            setTimeout(gameEngine.startGameEasy, 1600);

        // } else if () {
            // setTimeout(gameEngine.startGameHard, 1600);

        } else {
            // This is init function for gameEngine, the setTimeout coincides with the delay created by displayController.cycleBoard()
            setTimeout(gameEngine.startGame, 1600);
        }


        // console.log(`You've reached the logic to start a 2 player game!`)
    }

    const visitWarGames = () => {
        window.location = `https://www.youtube.com/watch?v=KXzNo0vR_dU&ab_channel=Movieclips`;
    }

    const visitPortfolio = () => {
        window.location = `https://github.com/dominicroemer`;
    }

    const visitEndgame = () => {
        console.log("An interesting move...");
        setTimeout( () => {window.location = `https://www.youtube.com/watch?v=s93KC4AGKnY&ab_channel=Techno947`;}, 2500);
    }

    const generateWinnerMenu = (winningPlayer) => {

        toggleInitMenuActive();

        const winnerContainer = document.createElement('div');
        _menuReference = winnerContainer;
        winnerContainer.classList.add('winnerContainer');

        const winnerDiv = document.createElement('div')
        winnerDiv.classList.add('winnerDiv');
        if(winningPlayer === "AI" ) {
            winnerDiv.innerHTML = `Congratulations developer, you beat a human player!`;
        } else {
            winnerDiv.innerHTML = `Congratulations ${winningPlayer}! <br>
            You are the winner!`;
        }

        const playAgain = document.createElement('button');
        playAgain.classList.add('winnerButton');
        playAgain.innerHTML = "Play Again?";
        playAgain.setAttribute("onclick", "initMenu.twoPlayerGame();");

        const returnToMenu = document.createElement('button');
        returnToMenu.classList.add('winnerButton');
        returnToMenu.innerHTML = "Return to Main Menu";
        returnToMenu.setAttribute("onclick", "initMenu.generateInitMenu();");

        _container.appendChild(winnerContainer);
        winnerContainer.appendChild(winnerDiv);
        winnerDiv.innerHTML += "<br>";
        winnerDiv.appendChild(playAgain);
        winnerDiv.innerHTML += "<br>";
        winnerDiv.appendChild(returnToMenu);

    }

    const generateDrawMenu = () => {

        toggleInitMenuActive();

        const drawContainer = document.createElement('div');
        _menuReference = drawContainer;
        drawContainer.classList.add('drawContainer');

        const drawDiv = document.createElement('div')
        drawDiv.classList.add('drawDiv');
        drawDiv.innerHTML = `Good try, but you have reached a draw!`;

        const playAgain = document.createElement('button');
        playAgain.classList.add('winnerButton');
        playAgain.innerHTML = "Play Again?";
        playAgain.setAttribute("onclick", "initMenu.twoPlayerGame();");

        const returnToMenu = document.createElement('button');
        returnToMenu.classList.add('winnerButton');
        returnToMenu.innerHTML = "Return to Main Menu";
        returnToMenu.setAttribute("onclick", "initMenu.generateInitMenu();");

        _container.appendChild(drawContainer);
        drawContainer.appendChild(drawDiv);
        drawDiv.innerHTML += "<br>";
        drawDiv.appendChild(playAgain);
        drawDiv.innerHTML += "<br>";
        drawDiv.appendChild(returnToMenu);

    }



    return {
        getInfo,
        generateInitMenu,
        toggleInitMenuActive,
        visitWarGames,
        visitPortfolio,
        visitEndgame,
        playersMenu,
        onePlayerEasy,
        onePlayerHard,
        onePlayerGameMenu,
        twoPlayerGame,
        generateWinnerMenu,
        generateDrawMenu,

    }
})();



init();

function init() {

    // let intervalID = setInterval(displayController.randomizedBoard, 1000);

    initMenu.generateInitMenu();

    // console.log("Init has completed successfully");
    return;

}





                // Sample Module Function and Code
// const calculator = (() => {
//     const add = (a, b) => a + b;
//     const sub = (a, b) => a - b;
//     const mul = (a, b) => a * b;
//     const div = (a, b) => a / b;
//     return {
//       add,
//       sub,
//       mul,
//       div,
//     };
//   })();
  
//   calculator.add(3,5) // 8
//   calculator.sub(6,2) // 4
//   calculator.mul(14,5534) // 77476


                // Sample Factory Function code for reference
// const Player = (name, level) => {
//     let health = level * 2;
//     const getLevel = () => level;
//     const getName  = () => name;
//     const die = () => {
//       // uh oh
//     };
//     const damage = x => {
//       health -= x;
//       if (health <= 0) {
//         die();
//       }
//     };
//     const attack = enemy => {
//       if (level < enemy.getLevel()) {
//         damage(1);
//         console.log(`${enemy.getName()} has damaged ${name}`);
//       }
//       if (level >= enemy.getLevel()) {
//         enemy.damage(1);
//         console.log(`${name} has damaged ${enemy.getName()}`);
//       }
//     };
//     return {attack, damage, getLevel, getName}
//   };
  
//   const jimmie = Player('jim', 10);
//   const badGuy = Player('jeff', 5);
//   jimmie.attack(badGuy);



//

let choice = -1;
let maxVal = 0;
let minVal = 0;
let miniMaxCaller = "X";

function miniMax(board, maximizingPlayer) {
    console.log('***')
    console.log(
    `     ---------
    ${(board[0] == '') ? " " : board[0]} | ${(board[1] == '') ? " " : board[1]} | ${(board[2] == '') ? " " : board[2]}
    ${(board[3] == '') ? " " : board[3]} | ${(board[4] == '') ? " " : board[4]} | ${(board[5] == '') ? " " : board[5]}
    ${(board[6] == '') ? " " : board[6]} | ${(board[7] == '') ? " " : board[7]} | ${(board[8] == '') ? " " : board[8]}
    ---------`);

    // XXXUPDATEXXX TERMINAL NODE TEST
    let boardTerminal = isBoardTerminal(board);
    if (boardTerminal) {

        console.log(`Hit terminal board, current values are
        maxVal: ${maxVal}
        minVal: ${minVal}
        choice: ${choice}`);

        let terminalBoard = board.filter( element => {
            return (element === "");
        });

        if(boardTerminal > 50) {
            console.log((boardTerminal - (9 - terminalBoard.length)) + ": Win State")
            return boardTerminal - (9 - terminalBoard.length);
        }
        else if (boardTerminal < -50){
            console.log(((terminalBoard.length) + boardTerminal) + ": Loss State")
            return (terminalBoard.length) + boardTerminal;
        }
        else {
            console.log(boardTerminal + ": Draw State")
            return boardTerminal;
        }

        // if(boardTerminal > 50) {
        //     console.log((boardTerminal) + ": Win State")
        //     return boardTerminal;
        // }
        // else if (boardTerminal < -50){
        //     console.log((boardTerminal) + ": Loss State")
        //     return boardTerminal;
        // }
        // else {
        //     console.log(boardTerminal + ": Draw State")
        //     return boardTerminal;
        // }


    }




    if (maximizingPlayer) {
        let value = -1000;
        
        let input = "";
        let inputBoard = board.filter( element => {
            return (element == "");
        });
        (inputBoard.length % 2) ? (input = "X") : (input = "O");

        board.forEach( (child, index) => {
            if ( child !== "") return;
            let passBoard = [...board];
            passBoard[index] = input;
            // let checkValue = value;
            value = Math.max(value, miniMax(passBoard, false));
            if ( value > maxVal ) {
                console.log('Old Choice ' + choice);
                choice = index;
                maxVal = value;
                console.log('New Choice ' + choice);
            }
            return value;
        })
               
    } else {
        let value = 1000;
        
        // Determine which input to use in passBoard
        let input = "";
        let inputBoard = board.filter( element => {
            return (element == "");
        });
        (inputBoard.length % 2) ? (input = "X") : (input = "O");

        board.forEach( (child, index) => {
            if ( child !== "") return;
            let passBoard = [...board];
            passBoard[index] = input;
            // let checkValue = value;
            value = Math.min(value, miniMax(passBoard, true));
            if ( value < minVal ) {
                console.log('Old Choice ' + choice);
                choice = index;
                minVal = value;
                console.log('New Choice ' + choice);
            }
            return value;
        })
    }

}

function isBoardTerminal (board) {

    //Is board winning board?

    const winBoard = board;
    let keyPiece;
    

    let remainingMovesBoard = board.filter( element => {
        return (element === "");
    });
    
    // Getting the remaining open slots to calculate who goes next, then subtracting 1 to get who went previously
    let mostRecentInput = ((remainingMovesBoard.length - 1) % 2) ? "X" : "O";

    let terminalBoardValue = 0;

    // Vertical Winning positions 
    /* 
    X | O | O     O | X | O     O | O | x     
    X | O | O     O | X | O     O | O | X     
    X | O | O     O | X | O     O | O | X     
    */
    keyPiece = winBoard[0];
    if(keyPiece !== "") {
        if( winBoard[3] === keyPiece && winBoard[6] === keyPiece) {
            // console.log(`WIN CONDITION HAS BEEN FOUND WITH ${keyPiece} in a vertical winning position, slots 0,3,6`)
            if(mostRecentInput === miniMaxCaller) {
                terminalBoardValue = 100;
            } else {
                terminalBoardValue = -100;
            }
            return terminalBoardValue;
        }
    }
    keyPiece = winBoard[1];
    if(keyPiece !== "") {
        if( winBoard[4] === keyPiece && winBoard[7] === keyPiece) {
            // console.log(`WIN CONDITION HAS BEEN FOUND WITH ${keyPiece} in a vertical winning position, slots 1,4,7`)
            if(mostRecentInput === miniMaxCaller) {
                terminalBoardValue = 100;
            } else {
                terminalBoardValue = -100;
            }
            return terminalBoardValue;
                }
    }
    keyPiece = winBoard[2];
    if(keyPiece !== "") {
        if( winBoard[5] === keyPiece && winBoard[8] === keyPiece) {
            // console.log(`WIN CONDITION HAS BEEN FOUND WITH ${keyPiece} in a vertical winning position, slots 2,5,8`)
            if(mostRecentInput === miniMaxCaller) {
                terminalBoardValue = 100;
            } else {
                terminalBoardValue = -100;
            }
            return terminalBoardValue;
                }
    }

    // Horizontal Winning positions 
    /* 
    X | X | X     O | O | O     O | O | O     
    O | O | O     X | X | X     O | O | O     
    O | O | O     O | O | O     X | X | X     
    */
    keyPiece = winBoard[0];
    if(keyPiece !== "") {
        if( winBoard[1] === keyPiece && winBoard[2] === keyPiece) {
            // console.log(`WIN CONDITION HAS BEEN FOUND WITH ${keyPiece} in a Horizontal winning position, slots 0,1,2`)
            if(mostRecentInput === miniMaxCaller) {
                terminalBoardValue = 100;
            } else {
                terminalBoardValue = -100;
            }
            return terminalBoardValue;
                }
    }
    keyPiece = winBoard[3];
    if(keyPiece !== "") {
        if( winBoard[4] === keyPiece && winBoard[5] === keyPiece) {
            // console.log(`WIN CONDITION HAS BEEN FOUND WITH ${keyPiece} in a Horizontal winning position, slots 3,4,5`)
            if(mostRecentInput === miniMaxCaller) {
                terminalBoardValue = 100;
            } else {
                terminalBoardValue = -100;
            }
            return terminalBoardValue;
                }
    }
    keyPiece = winBoard[6];
    if(keyPiece !== "") {
        if( winBoard[7] === keyPiece && winBoard[8] === keyPiece) {
            // console.log(`WIN CONDITION HAS BEEN FOUND WITH ${keyPiece} in a Horizontal winning position, slots 6,7,8`)
            if(mostRecentInput === miniMaxCaller) {
                terminalBoardValue = 100;
            } else {
                terminalBoardValue = -100;
            }
            return terminalBoardValue;
        }
    }

    // Diagonal Winning Positions
    /* 
    X | O | O     O | O | X     
    O | X | O     O | X | O     
    O | O | X     X | O | O    
    */
    keyPiece = winBoard[0];
    if(keyPiece !== "") {
        if( winBoard[4] === keyPiece && winBoard[8] === keyPiece) {
            // console.log(`WIN CONDITION HAS BEEN FOUND WITH ${keyPiece} in a Diagonal winning position, slots 0,4,8`)
            if(mostRecentInput === miniMaxCaller) {
                terminalBoardValue = 100;
            } else {
                terminalBoardValue = -100;
            }
            return terminalBoardValue;
        }
    }
    keyPiece = winBoard[2];
    if(keyPiece !== "") {
        if( winBoard[4] === keyPiece && winBoard[6] === keyPiece) {
            // console.log(`WIN CONDITION HAS BEEN FOUND WITH ${keyPiece} in a Diagonal winning position, slots 2,4,6`)
            if(mostRecentInput === miniMaxCaller) {
                terminalBoardValue = 100;
            } else {
                terminalBoardValue = -100;
            }
            return terminalBoardValue;
        }
    }

    let finBoard = winBoard.filter( element => {
        return (element === "");
    })
    // console.log(finBoard.length);
    if (finBoard.length === 0) {
        terminalBoardValue = 1;
        // console.log("Draw Board");
    }

    return terminalBoardValue;

}