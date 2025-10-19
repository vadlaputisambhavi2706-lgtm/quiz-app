const questions = [
  {
    question: "Which programming language is known as the 'mother of all languages'?",
    answers: [
      { text: "C", correct: true },
      { text: "Java", correct: false },
      { text: "Python", correct: false },
      { text: "C++", correct: false }
    ]
  },
  {
    question: "Which HTML tag is used to create a hyperlink?",
    answers: [
      { text: "<a>", correct: true },
      { text: "<link>", correct: false },
      { text: "<href>", correct: false },
      { text: "<p>", correct: false }
    ]
  },
  {
    question: "Which CSS property changes the text color?",
    answers: [
      { text: "font-color", correct: false },
      { text: "color", correct: true },
      { text: "text-color", correct: false },
      { text: "font-style", correct: false }
    ]
  },
  {
    question: "Which company developed Java?",
    answers: [
      { text: "Microsoft", correct: false },
      { text: "Sun Microsystems", correct: true },
      { text: "Google", correct: false },
      { text: "Apple", correct: false }
    ]
  }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.textContent = "Next ➡️";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.textContent = `${questionNo}. ${currentQuestion.question}`;

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.textContent = answer.text; // ✅ safer than innerHTML
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if (answer.correct) button.dataset.correct = answer.correct;
    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.style.backgroundColor = "#2ebf91";
    score++;
  } else {
    selectedBtn.style.backgroundColor = "#e74c3c";
  }

  Array.from(answerButtons.children).forEach(button => {
    if (button.dataset.correct === "true") {
      button.style.backgroundColor = "#2ebf91";
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}

function showScore() {
  resetState();
  questionElement.innerHTML = `🎉 You scored <span style="color:#8e2de2;font-weight:bold;">${score}</span> out of <span style="color:#4a00e0;">${questions.length}</span>!`;
  nextButton.textContent = "Play Again 🔁";
  nextButton.style.display = "block";
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) showQuestion();
  else showScore();
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) handleNextButton();
  else startQuiz();
});

startQuiz();
