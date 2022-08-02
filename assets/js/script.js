//Declare variables
//"var" is used to declare variables
//The "window" object is a built-in representation of the open window in a browser.
//And, "document" is a property of the "window" object.
//Here, I am getting the document by an id.
//I am using "getElementID" on the document object and passing in a child's id as a selector.
var quizContent = document.getElementById("coding_quiz");
var resultsEl = document.getElementById("result");
var total_scoreEl = document.getElementById("total_score");
var game_finishedDiv = document.getElementById("game_finished"); //gameover
var questionsEl = document.getElementById("questions");
var quizTimer = document.getElementById("timer");
var startQuizButton = document.getElementById("starting_button");
var startQuizDiv = document.getElementById("starting_page");
var bestscoreContainer = document.getElementById("bestscoreContainer");
var bestscoreDiv = document.getElementById("best-scorePage");
var bestscoreInputName = document.getElementById("players_name");
var bestscoreDisplayName = document.getElementById("bestscore-player");
var gameover_buttons = document.getElementById("gameover_buttons");
var submitScoreBtn = document.getElementById("submitScore");
var bestscoreDisplayScore = document.getElementById("bestscore-score");
var buttonA = document.getElementById("a");
var buttonB = document.getElementById("b");
var buttonC = document.getElementById("c");
var buttonD = document.getElementById("d");

//Here I am declaring the "quizQuestions" variable and assigning it to an an array of 5 objects, 
//with each object containing 6 key-value pairs of the following content:
//the question, 4 answer choices, and the correct answer to use to determine if the user answered the question correctly.
var quizQuestions = [{
    question: "Commonly used data types do not include?",
    choiceA: "strings",
    choiceB: "booleans",
    choiceC: "alerts",
    choiceD: "numbers",
    correctAnswer: "c"}, 
    {
    question: "The condition in an if / else statement is enclosed with _____.",
    choiceA: "quotes",
    choiceB: "curly brackets",
    choiceC: "parenthesis",
    choiceD: "square brackets",
    correctAnswer: "b"},
    {
    question: "Arrays in JavaScript can be used to store _____.",
    choiceA: "numbers and strings",
    choiceB: "other arrays",
    choiceC: "booleans",
    choiceD: "all of the above",
    correctAnswer: "d"},
    {
    question: "String values must be enclosed within _____.",
    choiceA: "commas",
    choiceB: "curly brackets",
    choiceC: "quotes",
    choiceD: "parenthesis",
    correctAnswer: "c"},
    {
    question: "A very useful tool used during development and debugging for printing content to the debugger is:",
    choiceA: "JavaScript",
    choiceB: "terminal/bash",
    choiceC: "for loops",
    choiceD: "console.log",
    correctAnswer: "d"},
];

//global variables
var finalQuestionIndex = quizQuestions.length;
var currentQuestionIndex = 0;
var timeLeft = 30;
var timerInterval;
var score = 0;
var correct;

//This functions run through the array of objects containing the questions and answers.
//It uses the "finalQuestionIndex" variable to determine the length of my array and then uses that length in an IF statement to determine when to stop asking questions and instead show the score.
//If the currentQuestion variable (which starts off at 0) is equal to the number of questions/objects in the array, then the score is returned.
//Otherwise, the next question in the array is displayed in a paragraph followed by buttons for each of the 4 answer choices.
//"innerHTML" is a property of the DOM which sets the contents of the <p> element.
function generateQuizQuestion(){
    game_finishedDiv.style.display = "none";
    if (currentQuestionIndex === finalQuestionIndex){
        return showScore();
    }
    var currentQuestion = quizQuestions[currentQuestionIndex];
    questionsEl.innerHTML = "<p>" + currentQuestion.question + "</p>";
    buttonA.innerHTML = currentQuestion.choiceA;
    buttonB.innerHTML = currentQuestion.choiceB;
    buttonC.innerHTML = currentQuestion.choiceC;
    buttonD.innerHTML = currentQuestion.choiceD;
};

//start quiz function starts the TimeRanges, hides the start button, and displays the first quize question.

//The "startQuiz" function calls the "generateQuizQuestion" function and starts a decrementing timer functionw which counts down the amount of time allowed to answer each question.
//This is being driven by the setInterval method which is a function that accepts another function as a parameter.
//I am passing it a function and a number, 500.
//The “- -“ is decrementing by 1. 
//Each time, I am taking textcontent and setting it to the new seconds left. That’s why the number is counting down.  
//Then, I am using an IF statement which says if this time interval is set to 0, then I want to clear the timer interval and I want to send message with the amount of time left. 
//500 is the delay for the timeout in milliseconds 
//If "timeLeft" is not greater than 0, then I call the clearInterval method which stops the timer and displays the score using the "showScore" function. 
function startQuiz(){
    game_finishedDiv.style.display = "none";
    startQuizDiv.style.display = "none";
    generateQuizQuestion();
    timerInterval = setInterval(function() {
        timeLeft--;
        quizTimer.textContent = "Time left: " + timeLeft;

        if(timeLeft === 0) {
            clearInterval(timerInterval);
            showScore();
        }
        }, 500);
    quizContent.style.display = "block";
}

//This function displays the player's score after the player completes the quiz or the timer runs out.
function showScore(){
    quizContent.style.display = "none"
    game_finishedDiv.style.display = "flex";
    clearInterval(timerInterval);
    bestscoreInputName.value = "";
    total_scoreEl.innerHTML = "Your score is " + score + " divided by" + quizQuestions.length;
}

//On click of the submit button, we run the function highscore that saves and stringifies the array of high scores already saved in local stoage
//as well as pushing the new user name and score into the array we are saving in local storage. Then it runs the function to show high scores.

//I used the “addEventListener()” method to set up an element to listen for a the click of an event.
//Then, pass in the "highscore" function that I want it to execute when the button is clicked.
//If the name of the player is blank, then an alert is thrown.
//Else, the score is saved using setItem into local storage.
//getItem is being used to retrieve the scores.
//JSON.parse takes a string and turns it into an object. I do this before reading the scores from "savedHighScores".
//Then, I use JSON.stringify to convert my score objects into a string before saving them into local storage.
//After that, I call the "generateHighScores" function. 
submitScoreBtn.addEventListener("click", function highscore(){

    if(bestscoreInputName.value === "") {
        alert("Player's name cannot be blank");
        return false;

    }else{
        var savedHighscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
        var currentUser = bestscoreInputName.value.trim();
        var currentHighscore = {
            name : currentUser,
            score : score
        };

        game_finishedDiv.style.display = "none";
        bestscoreContainer.style.display = "flex";
        bestscoreDiv.style.display = "block";
        gameover_buttons.style.display = "flex";
        
        savedHighscores.push(currentHighscore);
        localStorage.setItem("savedHighscores", JSON.stringify(savedHighscores));
        generateHighscores();
    }

});

//The "generateHighscores" function clears the list for the high scores and generates a new high score list from local storage.
function generateHighscores(){
    bestscoreDisplayName.innerHTML = "";
    bestscoreDisplayScore.innerHTML = "";
    var highscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
    for (i=0; i<highscores.length; i++){
        var newNameSpan = document.createElement("li");
        var newScoreSpan = document.createElement("li");
        newNameSpan.textContent = highscores[i].name;
        newScoreSpan.textContent = highscores[i].score;
        bestscoreDisplayName.appendChild(newNameSpan);
        bestscoreDisplayScore.appendChild(newScoreSpan);
    }

}

//The "display_best_score" function displays the high scores page.
function display_best_score(){
    startQuizDiv.style.display = "none"
    game_finishedDiv.style.display = "none";
    bestscoreContainer.style.display = "flex";
    bestscoreDiv.style.display = "block";
    gameover_buttons.style.display = "flex";
    generateHighscores();
}

//The "clearScore" function clears the scores from local storage.
function clearScore(){
    window.localStorage.clear();
    bestscoreDisplayName.textContent = "";
    bestscoreDisplayScore.textContent = "";
}

//The "play_quiz_again" function sets all the variables back to their original values allowing for the user to play the game again.
function play_quiz_again(){
    bestscoreContainer.style.display = "none";
    game_finishedDiv.style.display = "none";
    startQuizDiv.style.display = "flex";
    timeLeft = 30;
    score = 0;
    currentQuestionIndex = 0;
}

//The compareAnswer function determines if a player's answer is correct or not.
//If the player's answer is equal to the pre-set correct answer in both value and data type, 
//and it is not the last question to be asked, then an alert is thrown stating that the player's answer was correct and the next question in the array is generated via the "generateQuickQuestion" function.
//Otherwise, if the player's answer is not correct, then an alert is thrown starting the player's answer was not correct and the next question is generated.
//Otherwise, if the player is at the end of the questions in the array, then the player's score is generated.

function compareAnswer(answer){
    correct = quizQuestions[currentQuestionIndex].correctAnswer;
    if (answer === correct && currentQuestionIndex !== finalQuestionIndex){
        score++;
        alert("That Is Correct!");
        currentQuestionIndex++;
        generateQuizQuestion();
    }else if (answer !== correct && currentQuestionIndex !== finalQuestionIndex){
        alert("That Is Incorrect.")
        currentQuestionIndex++;
        generateQuizQuestion();
    }else{
        showScore();
    }
}

//The "startQuizButton" button starts the quiz:
startQuizButton.addEventListener("click",startQuiz);