
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

    // Sets the current _gameBoard based off incomingBoard array
    const setGameBoard = (incomingBoard) => {
        _gameBoard = incomingBoard;
    }

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
        setGameBoard,
        getInfo,
        updateGameBoard,
        
    }

})();

const displayController = (() => {

    const _boardContainer = document.querySelector('.boardContainer');
    const _boardNL = document.querySelectorAll('.boardSlot');
    
    const _boardList = [];
    for(var i = _boardNL.length; i--; _boardList.unshift(_boardNL[i]));

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



init();

function init() {

    // let intervalID = setInterval(displayController.randomizedBoard, 1000);

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