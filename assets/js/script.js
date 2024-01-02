// Variables
let timerEl = document.getElementById("time");
let startScreen = document.getElementById("start-screen");
let startBtn = document.getElementById("start");
let questionsEl = document.getElementById("questions");
let questionTitle = document.getElementById("question-title");
let choicesEl = document.getElementById("choices");
let endScreen = document.getElementById("end-screen");
let finalScore = document.getElementById("final-score");
let initials = document.getElementById("initials");
let submitBtn = document.getElementById("submit");
let feedbackEl = document.getElementById("feedback");
let highscores = document.getElementById('highscores');


// Five quiz questions, potential answers and the correct answer
let questions = [
  {
    title: "What was Angel's human name?",
    choices: ['Liam', 'Mark', 'Angelo', 'Keith'],
    answer: 'Liam'
  },
  {
    title: "What was Buffy's Mom called?",
    choices: ['Sharon', 'Mary', 'Angela', 'Joyce'],
    answer: 'Joyce'
  },
  {
    title: "What was the big bad in season 3?",
    choices: ['Mayor Wilkins', 'Angel', 'Master', 'Riley'],
    answer: 'Mayor Wilkins'
  },
  {
    title: "What was Anya most afraid of?",
    choices: ['Cats', 'Mutants', 'Bunnies', 'Commitment'],
    answer: 'Bunnies'
  },
  {
    title: "Who sired Spike?",
    choices: ['Angel', 'Darla', 'Drusilla'],
    answer: 'Drusilla'
  }
]

// variables 
let timer = questions.length * 10
let timerInterval;
let questionIndex = 0
let score = 0

// start quiz function, setting timer and getting questions
function startQuiz() {
  startScreen.setAttribute("class", "hide")
  questionsEl.removeAttribute('class')
  getQuestions();
  timerInterval = setInterval(function () {
    timer--;
    timerEl.textContent = timer;
    if (timer <= 0) {
      endQuiz()
    }
  }, 1000)
}

// on click, start quiz
startBtn.addEventListener("click", startQuiz);

function getQuestions() {
  let currentQuestion = questions[questionIndex];
  questionTitle.textContent = currentQuestion.title;
  choicesEl.innerHTML = "";

  currentQuestion.choices.forEach(choice => {
    const button = document.createElement('button');
    button.textContent = choice;
    button.addEventListener('click', selectAnswer);
    choicesEl.appendChild(button);
  });
}


function selectAnswer(event) {
  const selectedAnswer = event.target.textContent;
  const correctAnswer = questions[questionIndex].answer;

  // if answer is wrong, reduce time by 10
  if (selectedAnswer !== correctAnswer) {
    timer -= 10;
    // code to stop number dropping below 0
    if (timer < 0) {
      timer = 0;
    }
    timerEl.textContent = timer;
    feedbackEl.textContent = 'Wrong!'
  } else {
    feedbackEl.textContent = 'Correct!';
  }
  feedbackEl.setAttribute('class', 'feedback');
  setTimeout(function () {
    feedbackEl.setAttribute('class', 'feedback hide');
  }, 1500)

  questionIndex++
  // if current question = final question
  if (questionIndex === questions.length) {
    endQuiz();
  } else {
    getQuestions();
  }

}
//  function to end the quiz
function endQuiz() {
  clearInterval(timerInterval)
  questionsEl.setAttribute('class', 'hide')
  endScreen.removeAttribute('class')
  finalScore.textContent = timer;
}


submitBtn.addEventListener("click", () => {
  const initialsValue = initials.value.trim();
  // If initials are empty
  if (initialsValue !== '') {
    const highscore = JSON.parse(localStorage.getItem('highscores')) || [];
    // newScore variable with score and initials
    let newScore = {
      score: timer,
      initials: initialsValue,
    }
    highscore.push(newScore);
    // Store score in local storage
    localStorage.setItem('highscores', JSON.stringify(highscore));

    // Redirect to highscores page
    window.location.href = "highscores.html";

  } else {
    alert('Please enter your initials!');
  }
})



startBtn.addEventListener('click', startQuiz)