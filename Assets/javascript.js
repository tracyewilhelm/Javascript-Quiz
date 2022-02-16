//javascript for JavaScript Quiz
var startBtn = document.querySelector(".start-btn");
var timerText = document.querySelector(".timer");
var timer = 30;
var score = 0;
var falseBtn = document.querySelector("#falseButton");
var trueBtn = document.querySelector("#trueButton");
var quizBoxEl = document.querySelector(".quizBox");
var QuizText = document.querySelector("#quizQuestions");
var answerText = document.querySelector("#quizAnswers");
var ansBtn = document.querySelector(".answerButton");
var scoreBoxEL = document.querySelector(".scoreBox");
var scoresListEl = document.querySelector(".scoresList");
var userobj;
var questionList = [
  {
    Question:
      "The DOM, or Document Object Model is a programming interface for HTML documents",
    answer: true,
  },
  {
    Question:
      "Constructor is a technique to iterate over an operation by having a function call itself repeatedly until it arrives at a desired result.",
    answer: false,
  },
  {
    Question: "Recursion functions are used to create objects in javascript.",
    answer: false,
  },
  { Question: "A variable's scope can be global or local", answer: true },
  {
    Question:
      "'This' keyword refers to the object that the function that the function is a property of",
    answer: true,
  },
];
console.log(questionList[1]);

// pulls the scoresList out of stringify and puts the results in an array. If nothing currently there, show an empty array
var savedScores = JSON.parse(localStorage.getItem("scoresList")) || [];
// console.log(savedScores);

//the index that the questions and answers will roll through
var questionIndex = 0;
var answerIndex = 0;

//hide the quizbox
quizBoxEl.style.display = "none";

//to-do: when you click start: hide the start button; start the timer; show the true button; show the false button

//the initiation function. It hides the true/false buttons, and the quiz/answer text
function init() {
  trueBtn.style.display = "none";
  falseBtn.style.display = "none";
  QuizText.style.display = "none";
  answerText.style.display = "none";
}
//running the initiation function
init();

//this function rotates the question and answers through the question index so that both the question and answer objects match
function renderQuestions() {
  QuizText.textContent = questionList[questionIndex].Question;
  answerText.textContent = questionList[questionIndex].answer;
}

console.log(renderQuestions());
console.log(questionList); // shows the list of questions and paired answers

//this function creates a list item and in that list item you are adding the user initials and score you got from the endgame function
function renderScores() {
  for (let i = 0; i < savedScores.length; i++) {
    const element = savedScores[i];
    var newLi = document.createElement("li");

    scoresListEl.appendChild(newLi);
    newLi.textContent = element.userInits + " " + element.score;
    console.log(savedScores);
  }
}

//add a click event listener to the start button that runs the start game function
startBtn.addEventListener("click", startGame);

//when the start game function runs, the quiz box, quiz text, timer, and true/false buttons appear;
//the timer starts, and the render questions function is called
function startGame() {
  //show the quiz box
  quizBoxEl.style.display = "block";
  //show the questions
  QuizText.style.display = "block";
  //hide the start button
  startBtn.style.display = "none";
  //show the true and false buttons
  trueBtn.style.display = "block";
  falseBtn.style.display = "block";
  //start the timer
  if (timer === 30) {
    timerText.textContent = "30";
    timer--;
  }
  var gameTimer = setInterval(() => {
    timerText.textContent = timer;
    timer--;

    if (timer <= 0) {
      clearInterval(gameTimer);
      endGame();
      timerText.textContent = "";
    }
  }, 1000);

  renderQuestions();
}

//the endgame function pops a prompt for the user's initials and pushes the score and the initials into an object
//that object is then stringify'd and the render scores function is called
quizBoxEl.addEventListener("click", function (event) {
  if (event.target.matches(".answerButton")) {
    console.log("click");

    var currentAnswer = questionList[questionIndex].answer;
    if (event.target.matches("#trueButton") && currentAnswer === true) {
      score++;
    } else if (event.target.matches("#trueButton") && currentAnswer === false) {
      timer -= 5;
    } else if (
      event.target.matches("#falseButton") &&
      currentAnswer === false
    ) {
      score++;
    } else if (event.target.matches("#falseButton") && currentAnswer === true) {
      timer -= 5;
    }
    //       if (ansBtn === questionList[i].answers) {
    // renderScores()++//if they click the true button, add a point to score
    // }
    // else if (ansBtn !== questionList[i].answer) { // deduct time from timer count

    // }
    questionIndex++;
    if (questionIndex >= questionList.length) {
      timer = 0;
    } else {
      renderQuestions();
    }
  }
});
function endGame() {
  var userInits = window.prompt("what are your initials?");
  userobj = {
    userInits,
    score,
  };
  savedScores.push(userobj);
  console.log(userobj);
  localStorage.setItem("userobj", JSON.stringify(savedScores));
  alert("Here is your score, " + userInits + " " + score);
  renderScores();
  QuizText.style.display = "none";
  trueBtn.style.display = "none";
  falseBtn.style.display = "none";
}

// function renderAnswers() {
//     answerText.textContent = answerList[answerIndex = 0];
// }

// renderAnswers();

// if(ansBtn === questionList[i].answers){
// renderScores()++//if they click the true button, add a point to score
// }
// else if (ansBtn !== questionList[i].answer) { // deduct time from timer count

// }
