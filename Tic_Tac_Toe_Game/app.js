let boxes = document.querySelectorAll(".box");
let reset = document.querySelector(".reset");
let New = document.querySelector(".new");
let winner = document.querySelector(".hide");
let count = 0;
let turnO = false;// player X & player O;

// 1D array
// let arr1 = [,,,];

// 2D array
// let arr2 = [[],[],[],[]];

let win_patterns = [[0,1,2],[0,3,6],[0,4,8],[1,4,7],[2,5,8],[2,4,6],[3,4,5],[6,7,8]];

const resetGame = () => {
    count = 0;
    turnO = false;
    newGame();
    winner.classList.add("hide");

};

const newGame = () => {
    for ( let box of boxes ){
        box.disabled = false;
        box.innerText = "";
    }
};

const gameOver = () =>{
    for ( let box of boxes ){
        box.disabled = true;
    }
};

const matchDraw = () => {
    winner.innerText = "You both are Loser 😂";
    winner.classList.remove("hide");
    count = 0;
};

const showWinner = () =>{
    // winner.classList.add("nothide");
    winner.classList.remove("hide");
    gameOver();
};

const checkWineer = () => {
    for( let pattern of win_patterns){
        let pos1val = boxes[pattern[0]].innerText;
        let pos2val = boxes[pattern[1]].innerText;
        let pos3val = boxes[pattern[2]].innerText;
        if( pos1val != "" && pos2val != "" && pos3val != "" ){
            if( pos1val === pos2val && pos2val === pos3val ){
                winner.innerText = `Yay ${pos1val} Is Winner 😀`;
                showWinner()
            }
        }
    }
};

boxes.forEach((box) => {
    box.addEventListener("click" , () => {
        count++;
        if( count === 9 ){
            matchDraw();
        }
        if( turnO === true ){
            box.innerText = "O";
            turnO = false;
            box.classList.add("textO");
        }
        else{
            box.innerText = "X";
            turnO = true;
            box.classList.add("textX");
        }
        box.disabled = true;
        checkWineer();
    });  
});

New.addEventListener("click" , resetGame);
reset.addEventListener("click" , resetGame);