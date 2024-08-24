const URL = "https://opentdb.com/api.php?amount=1";

const startBtn = document.getElementById("start");
const finishBtn = document.getElementById("finishQuiz");
const titleDiv = document.getElementById("displayNoneTitle");
const quizDiv = document.getElementById("mainBox");
const nextBTN = document.getElementById("nextQues");
const question = document.getElementById("ques");
const optionA = document.getElementById("a");
const optionB = document.getElementById("b");
const optionC = document.getElementById("c");
const optionD = document.getElementById("d");
const options = document.querySelectorAll('.quizOption');
const ansPara1 = document.getElementById("answerPara");
const ansPara2 = document.getElementById("incorrectPara");
const ansDiv = document.getElementById("ansDiv");
const errorBox = document.getElementById("displayNoneBox");

function startQuiz(){
    startBtn.setAttribute('style','display:none;');
    titleDiv.setAttribute('style','display:block;');
    quizDiv.setAttribute('style','display:flex;');
}

startBtn.addEventListener("click",startQuiz);

function finishQuiz(){
    startBtn.setAttribute('style','display:flex;');
    titleDiv.setAttribute('style','display:none;');
    quizDiv.setAttribute('style','display:none;');
}

finishBtn.addEventListener('click',finishQuiz);

let ans

async function fetchQuestion(){

    question.setAttribute('style','color:black;');
    errorBox.setAttribute('style','display:flex;');
    nextBTN.setAttribute('style','display:none;');

    options.forEach(option => {
        option.disabled = false;
        option.classList.remove("correctOption", "incorrectOption");
        option.setAttribute('style', 'display:block;'); 
    });
    ansPara1.innerText = "";
    ansPara2.innerText = "";
    ansDiv.setAttribute('style', 'display:none;');

    try{
        const response = await fetch(URL);
        if( !response.ok ){
            throw new Error(`Unable to fetch data.`);
        }
        const data = await response.json();
        question.innerHTML = data.results[0].question;
        ans = data.results[0].correct_answer;
        optionB.innerHTML = data.results[0].correct_answer;
        const ansLength = data.results[0].incorrect_answers.length;

        if( ansLength == 1 ){
            optionA.innerHTML = data.results[0].incorrect_answers[0];
            optionC.setAttribute('style','display:none;');
            optionD.setAttribute('style','display:none;');
        }
        
        else{
            optionC.setAttribute('style','display:block;');
            optionD.setAttribute('style','display:block;');
            optionA.innerHTML = data.results[0].incorrect_answers[0];
            optionC.innerHTML = data.results[0].incorrect_answers[1];
            optionD.innerHTML = data.results[0].incorrect_answers[2];
        }

    }
    catch(error){
        console.log(error);
        question.innerHTML = error;
        question.setAttribute('style','color:red;');
        errorBox.setAttribute('style','display:none;');
        nextBTN.setAttribute('style','display:none;');
    }
}

nextBTN.addEventListener('click',fetchQuestion);
startBtn.addEventListener('click',fetchQuestion);

options.forEach(element => {
    element.addEventListener('click', () => {

        nextBTN.setAttribute('style','display:block;');
        
        if( element.innerHTML == ans ){
            element.classList.add("correctOption");
            ansPara1.innerText = "Correct Answer";
            ansPara1.classList.add("correctOptionPara");
            ansDiv.setAttribute('style','display:block;');
        }

        else{
            element.classList.add("incorrectOption");
            ansPara1.innerText = "Incorrect Answer";
            ansPara2.innerText = `Correct Answer : ${ans}`;
            ansPara2.classList.add("correctOptionPara");
            ansDiv.setAttribute('style','display:block;');
        }

        options.forEach( option => {
            option.disabled = true;
        });

    });
});