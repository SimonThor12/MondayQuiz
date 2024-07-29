import "./style.css";

let currentScore = 0;
let questionIndex = 0;
let correctAnswer = "correct";

const url =
  "https://opentdb.com/api.php?amount=8&category=0&difficulty=easy&type=multiple";
//fetch the data from the api

async function getData(url) {
  const response = await fetch(url);

  return response.json();
}

const data = await getData(url);

showCurrentQuestion(data, questionIndex);

// Starta quizzen
function showCurrentQuestion(questions, index) {
  if (index >= questions.results.length) {
    document.getElementById("question").innerHTML =
      "You have finished the quiz!";
    document.querySelectorAll(".answer").forEach((button) => {
      button.style.display = "none";
    });

    document.getElementById("score").innerHTML = "Final score: " + currentScore;

    //play again

    PlayAgain();
  }

  const question = questions.results[index].question;
  //add the question to the buttons
  const answers = questions.results[index].incorrect_answers;
  correctAnswer = questions.results[index].correct_answer;
  answers.push(correctAnswer);
  answers.sort(() => Math.random() - 0.5);
  var buttons = document.querySelectorAll(".answer");
  buttons.forEach((button, index) => {
    button.innerHTML = answers[index];
  });

  document.getElementById("question").innerHTML = question;

  document.getElementById("score").innerHTML = "Score: " + currentScore;
}

const buttons = document.querySelectorAll(".answer");
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    if (button.innerHTML == correctAnswer) {
      currentScore++;
      questionIndex++;
      console.log(currentScore);
      console.log(questionIndex);
      showCurrentQuestion(data, questionIndex);
    } else {
      questionIndex++;
      console.log(currentScore);
      console.log(questionIndex);
      showCurrentQuestion(data, questionIndex);
    }
  });
});

function PlayAgain() {
  let playBtn = document.getElementById("play-again");
  playBtn.style.display = "block";
  playBtn.innerHTML = "New Game +";
  playBtn.style.backgroundColor = "lightgreen";

  playBtn.addEventListener("click", () => {
    currentScore = 0;
    questionIndex = 0;
    playBtn.style.display = "none";
    showCurrentQuestion(data, questionIndex);
    document.querySelectorAll(".answer").forEach((button) => {
      button.style.display = "block";
    });
  });
}
