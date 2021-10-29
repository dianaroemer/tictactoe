init();

// Needed objects
/* 
    1. Gameboard - Module
    2. DisplayController - Module
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
    };

})();




function init() {

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