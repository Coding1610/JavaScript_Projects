// math class
// Random number choice mate js ma Math.random() function je dar vakhate 0 to 1 na vache koi pn random number apse.
// Apse 0 to n ni range ma number jove to Math.random() * n-1 karvu.
// Aa random number always FLOAT avse so aene Int ma convert mate apde khali aeni floor value laishu
// Math.floor(Math.random()*n-1);


let userScore = 0;
let computerScore = 0;
const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");
const US = document.querySelector("#user-score");
const CS = document.querySelector("#comp-score");


// Computer Choice Function

const genCompChoice = () => {
    const options = ["rock" , "paper" , "scissors"];
    // Random Number Choice
    const randomIdx = Math.floor(Math.random()*3);
    // console.log("randdomIdx :" , randomIdx);
    return options[randomIdx];
};


// Draw Game Function

const drawGame = () =>{
    console.log("Game Was Draw");
    msg.classList.remove("win","lose");
    msg.classList.add("draw");
    msg.innerText = "Game was draw! play again";
}


// Who Win Function
const showWinner = (userWin, userChoice, compChoice) => {
    if ( userWin ){
        userScore++;
        US.innerText = userScore;
        msg.classList.remove("draw","lose");
        msg.classList.add("win");
        msg.innerText = `Yay you win, ${userChoice} beats ${compChoice}.`;
        console.log("User Score = ",userScore);
        // console.log("You Win");
    }
    else{
        computerScore++;
        CS.innerText = computerScore;
        msg.classList.remove("draw","win");
        msg.classList.add("lose");
        msg.innerText = `Oops you lose, ${compChoice} beats ${userChoice}.`;
        console.log("Computer Score = ",computerScore);
        // console.log("Computer Win");
    }
}


// How win Function

const playGame = (userChoice) => {
    // computerChoice
    const compChoice = genCompChoice();
    console.log("compChoice :" , compChoice);

    if( userChoice === compChoice ){
        drawGame();
    }

    else{
        let userWin = true;

        if( userChoice === "rock"){
            // compChoice = paper , scissors
            userWin = compChoice === "paper" ? false : true;
        }

        else if( userChoice === "paper"){
            // compChoice = rock , scissors
            userWin = compChoice === "rock" ? true : false;
        }

        else {
            // userChoice = scissors
            // compChoice = rock , paper
            userWin = compChoice === "rock" ? false : true;
        }
        showWinner(userWin,userChoice,compChoice);
    }

};


// User Choice Function

choices.forEach((choice) => {
    choice.addEventListener ("click" , () => {
        // userChoice
        const userChoice = choice.getAttribute("id");
        console.log("userChoice :" , userChoice);
        playGame(userChoice);
    });
});