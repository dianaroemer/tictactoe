
// Needed objects
/* 
    1. Gameboard - Module
    2. DisplayController - Module
    3. GameState - Module???
    3. Player 1 - Factory Object
    4. Player 2 - Factory Object
    5. AI - Factory Object

*/



const displayController = (() => {

    const _boardContainer = document.querySelector('.boardContainer');
    
    const boardNL = document.querySelectorAll('.boardSlot');
    
    const _boardList = [];
    for(var i = boardNL.length; i--; _boardList.unshift(boardNL[i]));

    let _currDisplay;
    // The following is an init line that creates a JS reference to boardContainer's visible styling
    if (_boardContainer.style.display === "") _currDisplay = "grid";

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

    }

    const clearBoard = () => {
        _boardList.forEach( e => {
            e.innerText = "";
        })
    }

    const randomizedBoard = () => {

        clearBoard();

        let randomBoardState = []

        // Randomly determine a legal number of turns to "have played, from 0 to 9"
        let newBoardLen = Math.floor(Math.random() * 10);

        // Populate array based on number of legal turns to "have played", and fill out rest of array
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
        // clearInter(intervalID); // Ends the randomized cycling

    }

    // Populate the board given a specific boardState
    const populateBoard = (incomingBoardState) => {

        clearBoard();



    }



    const toggleGameBoard = () => {
        if (_currDisplay === "grid") {
            _boardContainer.style.display = "none";
            _currDisplay = "none";
        } else {
            _boardContainer.style.display = "grid";
            _currDisplay = "grid";
        }
    }

    const getInfo = () => {
        console.log(_boardContainer);
        console.log(_boardList);
    }



    return {
        getInfo,
        toggleGameBoard,
        clearBoard,
        cycleBoard,
        randomizedBoard,
    };

})();



init();

function init() {

    let intervalID = setInterval(displayController.randomizedBoard, 750);

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