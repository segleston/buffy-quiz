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


// Set of questions: Question text, set of answers, which answer is true 
// Landing page: explanation of quiz & start button. 
// Start button - when clicked, landing page goes away and a timer starts counting down (75 seconds) (event listener)
// and first question appears. 

// Question with options for each answer. 
// user clicks their answer, this is compared to question object. 
// Store answer in local storage.
// if correct, show message
// If answer wrong, show message and deduct time by 5 seconds
//question disappears after a few seconds and next question appears 

// X 5 questions

// If timer = 0 or all questions answered, display score above..
// form appears for user to save initials in highscores page.

//  initials and score get scored in local storage, user taken to high scores page, high scores are listed higher to lower.
// option to take quiz again.

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

let timer = questions.length * 10
let timerInterval;
let questionIndex = 0
let score = 0


function startQuiz() {
  startScreen.setAttribute("class", "hide")
  questionsEl.removeAttribute('class')
  showQuestion()
  timerInterval = setInterval(function () {
      timer--
      timerEl.textContent = timer
      if (timer <= 0) {
        endQuiz()
      }
  }, 1000)
}


startBtn.addEventListener("click", startQuiz);

function showQuestion() {
  const currentQuestion = questions[questionIndex];
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

  if (selectedAnswer !== correctAnswer) {
    timer -= 15;

    if (timer < 0) {
      timer = 0;
    }

    timerEl.textContent = timer;
    feedbackEl.textContent = "Wrong!";
  } else {
    feedbackEl.textContent = "Correct!";
  }

    feedbackEl.classList.add("feedback");
    setTimeout(function () {
      feedbackEl.classList.remove("feedback");
    }, 1000);

    questionIndex++;

    if (questionIndex >= questions.length) {
      endQuiz();
    } else {
      showQuestion()
    }
}

function endQuiz() {
  clearInterval(timerInterval)
  questionsEl.setAttribute('class', 'hide')
  endScreen.removeAttribute('class')
  finalScore.textContent = timer;
}

submitBtn.addEventListener("click", () => {
  const initialsValue = initials.value.trim();
  if (initialsValue !== '') {
    const highscores = JSON.parse(localStorage.getItem('highscores')) || [];
    highscores.push({ initials: initialsValue, score: timer});
    highscores.sort((a, b) => b.score - a.score);
    localStorage.setItem('highscores', JSON.stringify(highscores));

    // Redirect to highscores page
    window.location.href = "highscores.html";
  } else {
    alert('Please enter your initials!');
  }
});

// startBtn.addEventListener('click', startQuiz)