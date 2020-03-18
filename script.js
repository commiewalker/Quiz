var startContainerEl = document.querySelector(".startContainer");
var questionContainerEl = document.querySelector(".questionContainer");
var saveScoreEl = document.querySelector(".saveScore");
var answerEl = document.querySelector(".answer");
var startBtn = document.querySelector("#startBtn");
var countDownEl = document.querySelector("#countDown");
var questionEl = document.querySelector("#question");
var disPlayScore = document.querySelector("#yourScore");
var submitBtn = document.querySelector("#saveRecord");

var secondsLeft = 50;
var indexQ = 0;
var score = 0;

const questions = [
    {
        question : 'Inside which HTML element do we put the JavaScript?',
        answers : [
            { text: '<js>', correct: false },
            { text: '<javascript>', correct: false },
            { text: '<script>', correct: true },
            { text: '<scripting>', correct: false }            
        ]
    },
    {
        question : 'What is the correct JavaScript syntax to write "Hello World?',
        answers : [
            { text: 'response.write("Hello World")', correct: false},
            { text: "Hello World", correct: false },
            { text: 'document.write("Hello World")', correct: true },
            { text: '("Hello World")', correct: false}   
        ]
    },
    {
        question : 'How do you call a function named "myFunction"?',
        answers : [
            { text: 'call myFunction()', correct: false},
            { text: "myFunction()", correct: true },
            { text: 'call function myFunction', correct: false },
            { text: 'Call.myFunction()', correct: false}   
        ]
    },
    {
        question : 'How do you write a conditional statement for executing some statements only if "i" is equal to 5?',
        answers : [
            { text: 'if i==5 then', correct: false},
            { text: "if (i==5)", correct: true },
            { text: 'if i=5 then', correct: false },
            { text: 'if i=5', correct: false}   
        ]
    },
    {
        question : 'What is the correct syntax for referring to an external script called "xxx.js"?',
        answers : [
            { text: '<script src="xxx.js">', correct: true},
            { text: '<script name="xxx.js">', correct: false },
            { text: '<script href="xxx.js">', correct: false },
            { text: '<script value="xxx.js">', correct: false}   
        ]
    },
]


function gameStart() {
    // hide and show session
    startContainerEl.classList.add("hide");
    questionContainerEl.classList.remove("hide");
    
    setTime();
    disPlay(indexQ);
}

function setTime() {
    //set the clock whenever user press start button
    var timerInterval = setInterval(function () {
        secondsLeft--;
        countDownEl.textContent = secondsLeft + " seconds left.";
        
        if (secondsLeft <= 0) {
            clearInterval(timerInterval);   // stop times and skip the quiz to result
            gameOver();
        }
        
    }, 1000);
}

function disPlay(index) {

    questionEl.textContent = questions[index].question;     // display question
    
    for (var i = 0; i < questions[index].answers.length; i++){
        
        var ansBtn = document.createElement("button");              // create button
        
        ansBtn.textContent =  (i+1) + ") " + questions[index].answers[i].text;  // initilize button
                
        ansBtn.classList.add("answerBtn");                      // add class

        if (questions[index].answers[i].correct){                   // add an attribute to mark the correct answer
            ansBtn.setAttribute("result","correct")
        }
        
        answerEl.appendChild(ansBtn);                       // display its
    }
    
}

function selectAns(e){

    var selectBtn = e.target;       // get the button that user selected

    if (indexQ < 4) {           // user be able to choose answer only 5 times
        
        if (selectBtn.matches("button") && selectBtn.getAttribute("result") === "correct"){
            score += 10;        // add score
            indexQ ++;          // increase index
            reSetBtn();         // remove buttons
            disPlay(indexQ);    // generate next question with answer
        } else { 
            secondsLeft -= 10;  // subtract the time
            indexQ ++;          // increase index
            reSetBtn();         // remove buttons
            disPlay(indexQ);    // generate next question with answer
        }
    } else { gameOver(); }      // go to result
        
}

function gameOver(){
    questionContainerEl.classList.add("hide");          
    saveScoreEl.classList.remove("hide");
    disPlayScore.textContent = "Score : " + score ;
}

function reSetBtn(){

        for (var i = 0 ; i < 4 ; i++){              // remove all 4 answer
            answerEl.removeChild(answerEl.lastChild);
        }    
    
}

function saveRecord(event){
    event.preventDefault();
    var inputNameEl = document.querySelector("#inputName").value;
    if (inputNameEl != ""){
        var user = { 
            name: inputNameEl.trim(),
            score: score };

        localStorage.setItem("user", JSON.stringify(user)); // serialization and save object to local storage
        alert("Saved successfully");

    } else { alert("Name can't be blank");}
}

startBtn.addEventListener("click", gameStart);
answerEl.addEventListener("click", selectAns);
submitBtn.addEventListener("click", saveRecord);

/*
```
GIVEN I am taking a code quiz
WHEN I click the start button
THEN a timer starts and I am presented with a question
WHEN I answer a question
THEN I am presented with another question
WHEN I answer a question incorrectly
THEN time is subtracted from the clock
WHEN all questions are answered or the timer reaches 0
THEN the game is over
WHEN the game is over
THEN I can save my initials and score
```
*/