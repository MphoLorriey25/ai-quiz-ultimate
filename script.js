const questions = [
  {
    question: "What does AI stand for?",
    options: ["Automated Input", "Artificial Intelligence", "Advanced Interface", "Autonomous Internet"],
    answer: "Artificial Intelligence",
    hint: "It's what gives machines the ability to think."
  },
  {
    question: "Which company created GPT models?",
    options: ["Meta", "Google", "Amazon", "OpenAI"],
    answer: "OpenAI",
    hint: "They also made DALL·E and Whisper."
  },
  {
    question: "What is Machine Learning?",
    options: [
      "Teaching computers manually",
      "Coding everything by hand",
      "Training computers to learn from data",
      "Hardcoding decisions"
    ],
    answer: "Training computers to learn from data",
    hint: "It involves data, patterns, and learning."
  }
];

let currentIndex = 0;
let score = 0;
let timeLeft = 15;
let timerInterval;

const questionBox = document.getElementById("question-box");
const optionsBox = document.getElementById("options-box");
const nextBtn = document.getElementById("next-btn");
const scoreBox = document.getElementById("score-box");
const hintBtn = document.getElementById("hint-btn");
const hintBox = document.getElementById("hint-box");
const hintText = document.getElementById("hint");
const timeDisplay = document.getElementById("time");

function showQuestion() {
  clearInterval(timerInterval);
  timeLeft = 15;
  updateTimer();
  timerInterval = setInterval(countDown, 1000);

  const current = questions[currentIndex];
  questionBox.innerText = current.question;
  optionsBox.innerHTML = "";
  hintBox.classList.add("hidden");

  current.options.forEach(opt => {
    const btn = document.createElement("button");
    btn.textContent = opt;
    btn.onclick = () => {
      if (opt === current.answer) score++;
      nextBtn.classList.remove("hidden");
    };
    optionsBox.appendChild(btn);
  });
}

function countDown() {
  timeLeft--;
  updateTimer();
  if (timeLeft === 0) {
    clearInterval(timerInterval);
    nextBtn.classList.remove("hidden");
  }
}

function updateTimer() {
  timeDisplay.innerText = timeLeft;
}

nextBtn.onclick = () => {
  currentIndex++;
  if (currentIndex < questions.length) {
    nextBtn.classList.add("hidden");
    showQuestion();
  } else {
    endQuiz();
  }
};

hintBtn.onclick = () => {
  hintBox.classList.remove("hidden");
  hintText.textContent = questions[currentIndex].hint;
};

function endQuiz() {
  questionBox.innerText = "Quiz Complete! 🎉";
  optionsBox.innerHTML = "";
  hintBtn.classList.add("hidden");
  nextBtn.classList.add("hidden");
  scoreBox.classList.remove("hidden");
  scoreBox.innerText = `You got ${score} out of ${questions.length} correct.`;
  document.getElementById("timer").classList.add("hidden");
}

showQuestion();
