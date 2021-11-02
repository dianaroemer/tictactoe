
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


    return {
        getInfo,
        updateGameBoard,
        
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



    return {
        getInfo,
        updateDOMBoard,

        toggleGameBoard,
        clearBoard,
        cycleBoard,
        randomizedBoard,
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
        
        displayController.clearBoard();

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

        
        toggleInitMenuActive();

        _intervalID = setInterval( () => {
            if (!_initMenuActive) {
                displayController.cycleBoard();
                toggleInitMenuActive();
                clearInterval(_intervalID);
            } else {
                displayController.randomizedBoard()
            }
        }, 500);

        console.log('generateInitMenu has been completed');
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
        menuButton.setAttribute("onclick", "initMenu.onePlayerGame();");

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

    const onePlayerGame = () => {

        let _parentReference = _menuReference.parentNode;
        _parentReference.removeChild(_menuReference);

        console.log(`You've reached the logic to start a 1 player game!`);

    }

    const twoPlayerGame = () => {

        let _parentReference = _menuReference.parentNode;
        _parentReference.removeChild(_menuReference);

        console.log(`You've reached the logic to start a 2 player game!`)
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



    return {
        getInfo,
        generateInitMenu,
        toggleInitMenuActive,
        visitWarGames,
        visitPortfolio,
        visitEndgame,
        playersMenu,
        onePlayerGame,
        twoPlayerGame,
    }
})();


init();

function init() {

    // let intervalID = setInterval(displayController.randomizedBoard, 1000);

    initMenu.generateInitMenu();

    console.log("Init has completed successfully");
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