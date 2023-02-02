const questions = [{
    question: "1. How old is the javascript coding language?",
    choices: ["10 years old", "5 years old", "28 years old", "17 years old"],
    correctAnswer: '28 years old'
}, {
    question: "2. How do you log to a console in Javascript?",
    choices: ["document.console", "console.log()", "log.document(console)", "console..."],
    correctAnswer: "console.log()"
}, {
    question: "3. What stores multiple values in one variable?",
    choices: ["Array", "Boolean", "String", "Function"],
    correctAnswer: "Array"
}, {
    question: "4. What is a set of statements that performs a task?",
    choices: ["Loop", "Array", "Object", "Function"],
    correctAnswer: "Function"
}, {
    question: "5. Which is not a type of Javascript loop?",
    choices:  ["For", "While", "For/In", "While/Of"],
    correctAnswer: "While/Of"
}

];
var container = document.querySelector("#container");
var quiz = document.querySelector("#quiz");

var timer = document.getElementById("timer");
var timeLeft = document.getElementById("timeLeft");
var timesUp = document.getElementById("timesUp");
var viewHighScore = document.getElementById("viewHighScore");

var startButton = document.querySelector("#startGame");

var introPage = document.getElementById("introPage");
var questionPage = document.getElementById("questions");
var finalPage = document.getElementById("finished");
var highScores = document.getElementById("highScores");

var finalScore = document.getElementById("score");
var initials = document.querySelector("#initials");
var scoreListEl = document.querySelector("#listOfHighScores");


var questionTitle = document.getElementById("questionTitle");
var allBtns = document.querySelectorAll("#btn");
var answerBtn1 = document.querySelector("#answer1");
var answerBtn2 = document.querySelector("#answer2");
var answerBtn3 = document.querySelector("#answer3");
var answerBtn4 = document.querySelector("#answer4");

var answerCheck = document.querySelector("#answerCheck");

var finished = document.querySelector("#finished");


var prevBtn = document.querySelector("#preButton");
var nextBtn = document.querySelector("#nextButton");
var submitBtn = document.querySelector("#submitBtn");

var correctChoice = 0;
var questionNum = 0;

var questionCount = 0;
var totalTime = 40;


function newQuiz() {
    questionCount = 0;
    totalTime = 40;
    timeLeft.textContent = totalTime;
    initials.textContent = "";


    introPage.style.display = "none";
    questionPage.style.display = "block";
    timer.style.display = "block";
    timesUp.style.display = "none";

    var startTimer = setInterval(function() {
      totalTime--;
      timeLeft.textContent = totalTime;
  
      if(totalTime <= 0){
        clearInterval(startTimer);
        if (questionCount < questions.length - 1){
          gameOver();
        }
      }
    },1000);
    
    showQuiz();
  };


  function showQuiz(){
    nextQuestion();
  }

  function nextQuestion(){
        questionTitle.textContent = questions[questionCount].question;
        answerBtn1.textContent = questions[questionCount].choices[0];
        answerBtn2.textContent = questions[questionCount].choices[1];
        answerBtn3.textContent = questions[questionCount].choices[2];
        answerBtn4.textContent = questions[questionCount].choices[3];
    
  }

  function checkAnswer(correctAnswer){
    
    if(questions[questionCount].correctAnswer === questions[questionCount].choices[correctAnswer]){
      correctChoice++;
      answerCheck.textContent = "Correct!";
    }else{
      totalTime -= 10;
      timeLeft.textContent = timeLeft;
      answerCheck.textContent = "Wrong"
    }
      
    questionCount++;
    if(questionCount < questions.length){
      nextQuestion();
    }else{
      gameOver();
    }
      
  }

  function choiceA(){
    checkAnswer(0);
  }
  function choiceB(){
    checkAnswer(1);
  }
  function choiceC(){
    checkAnswer(2);
  }
  function choiceD(){
    checkAnswer(3);
  }

  

function gameOver(){
  introPage.style.display = "none";
  finalPage.style.display = "block";
  
  questionPage.style.display = "none";
  highScores.style.display = "none";
  timer.style.display = "none";
  timesUp.style.display = "block";

  finalScore.textContent = correctChoice;
}

function storeHighScores(event){
  event.preventDefault();

  if (initials.value === ""){
    alert("Please Enter Initails");
    return;
  }

  introPage.style.display = "none";
  timer.style.display = "none";
  timesUp.style.display = "none";
  questionPage.style.display = "none";
  finalPage.style.display = "none";
  highScores.style.display = "block";

  var savedHighScores = localStorage.getItem("High Scores");
  var scoresArray;

  if(savedHighScores === null){
    scoresArray=[];
  } else{
    scoresArray = JSON.parse(savedHighScores);
  }

  var userScore = {
    initial: initials.value,
    score: finalScore.textContent
  };

  console.log(userScore);
  scoresArray.push(userScore);

  var scoresArrayString = JSON.stringify(scoresArray);
  window.localStorage.setItem("High Scores", scoresArrayString);

  showHighScores();

}


function showHighScores(){
  introPage.style.display = "none";
  questionPage.style.display = "none";
  timer.style.display = "none";
  finalPage.style.display = "none";
  timesUp.style.display = "none";
  highScores.style.display = "block";

  var savedHighScores = localStorage.getItem("High Scores");

  if(savedHighScores === null){
    return;
  }
  console.log(savedHighScores);

  var storeHighScores = JSON.parse(savedHighScores);

  for(var i = 0; i<storeHighScores.length; i++){
    var newHighScore = document.createElement("p");
    newHighScore.innerHTML = storeHighScores[i].initial + ": " + storeHighScores[i].score;
    scoreListEl.appendChild(newHighScore);
  }

}


startButton.addEventListener("click", newQuiz);

answerBtn1.addEventListener("click", choiceA);
answerBtn2.addEventListener("click", choiceB);
answerBtn3.addEventListener("click", choiceC);
answerBtn4.addEventListener("click", choiceD);

submitBtn.addEventListener("click", function(event){
  storeHighScores(event);
});








