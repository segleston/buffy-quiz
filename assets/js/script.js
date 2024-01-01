let timerEl = document.getElementById('time')
let startScreen = document.getElementById('start-screen')
let startBtn = document.getElementById('start')
let questionsEl = document.getElementById('questions')
let questionTitle = document.getElementById('question-title')
let questionchoices = document.getElementById('choices')
let endScreen = document.getElementById('end-screen')
let finalScore = document.getElementById('final-score')
let initials = document.getElementById('initials')
let submitBtn = document.getElementsByID('submit')
let feedbackEl = document.getElementsByID('feedback')


// Set of questions: Question text, set of answers, which answer is true (array of objects with boolean)
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

let timer = 10
// let timerInterval 


let questions = [
  {
    title: "What was Angel's human name?",
    choices: ['Liam', 'Mark', 'Angelo', 'Keith'],
    answer: 'Liam'
  },
  {
    title: "What was Angel's human name?",
    choices: ['Liam', 'Mark', 'Angelo', 'Keith'],
    answer: 'Liam'
  },
  {
    title: "What was Angel's human name?",
    choices: ['Liam', 'Mark', 'Angelo', 'Keith'],
    answer: 'Liam'
  },
  {
    title: "What was Angel's human name?",
    choices: ['Liam', 'Mark', 'Angelo', 'Keith'],
    answer: 'Liam'
  },
  {
    title: "What was Angel's human name?",
    choices: ['Liam', 'Mark', 'Angelo', 'Keith'],
    answer: 'Liam'
  }
]


function startQuiz() {
  startScreen.setAttribute("class", "hide")
  questionsEl.removeAttribute('class')
  timerInterval = setInterval(function () {
      timer--
      timerEl.textContent = timer
      if (timer <= 0 {
        endQuiz()
      })
  }, 1000)
}

startBtn.addEventListener('click', startQuiz)

function selectAnswer(event) {
  if (event,target.value !== questions
    [questionIndex].answer) {
      time -= 15

      if (timer < 0) {
        timer = 0
      }

      timerEl.textContent = timer
      feedbackEl.textContent = "Wrong!"

    } else {
      feedbackEl.textContent = "Correct!"
    }

    feedbackEl.setAttribute("class", "feedback")
    setTimeout(function () {
      feedbackEl.setAttribute("class", "feedback hide")
    }, 1000)

    questionIndex++
}

function endQuiz() {
  clearInterval(timerInterval)
  questionsEl.setAttribute('class', 'hide')
  endScreen.removeAttribute('class')
}

startBtn.addEventListener('click', startQuiz)