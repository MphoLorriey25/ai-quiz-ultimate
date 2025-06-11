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
    options: ["Teaching computers manually", "Coding everything by hand", "Training computers to learn from data", "Hardcoding decisions"],
    answer: "Training computers to learn from data",
    hint: "It involves data, patterns, and learning."
  },
  {
    question: "Which AI model can generate images?",
    options: ["Whisper", "ChatGPT", "DALL·E", "Copilot"],
    answer: "DALL·E",
    hint: "It sounds like a famous artist's name."
  },
  {
    question: "What does NLP stand for?",
    options: ["Natural Language Processing", "New Learning Program", "Neural Logic Path", "Next Level Programming"],
    answer: "Natural Language Processing",
    hint: "It's used to understand human language."
  },
  {
    question: "Which of these is NOT a type of AI?",
    options: ["Narrow AI", "General AI", "Super AI", "Street AI"],
    answer: "Street AI",
    hint: "It's not real, just sounds cool."
  },
  {
    question: "Which programming language is most used for AI?",
    options: ["Python", "C++", "Java", "HTML"],
    answer: "Python",
    hint: "It's named after a snake 🐍."
  },
  {
    question: "Which of the following is an AI voice assistant?",
    options: ["Siri", "Netflix", "Slack", "Chrome"],
    answer: "Siri",
    hint: "It lives on Apple devices."
  },
  {
    question: "What is OpenAI's chatbot called?",
    options: ["Siri", "Cortana", "ChatGPT", "Google Now"],
    answer: "ChatGPT",
    hint: "You're using it now 😉"
  },
  {
    question: "Which of these uses AI for recommendations?",
    options: ["YouTube", "Google Docs", "Notepad", "MS Paint"],
    answer: "YouTube",
    hint: "It recommends videos based on what you watch."
  },
  {
    question: "What is the goal of Artificial General Intelligence (AGI)?",
    options: ["Play chess", "Solve one task", "Perform any intellectual task", "Draw pictures"],
    answer: "Perform any intellectual task",
    hint: "Basically human-level AI."
  },
  {
    question: "Which AI tech helps self-driving cars?",
    options: ["Photoshop", "Computer Vision", "File Compression", "Game Engines"],
    answer: "Computer Vision",
    hint: "It's how AI sees."
  },
  {
    question: "AI that improves as it gets more data is called?",
    options: ["Static AI", "Rule-based AI", "Learning AI", "Predictive AI"],
    answer: "Learning AI",
    hint: "It evolves with more training."
  },
  {
    question: "What is a neural network?",
    options: ["A brain implant", "A social app", "A machine learning model", "A computer virus"],
    answer: "A machine learning model",
    hint: "It's inspired by how the brain works."
  },
  {
    question: "What does training AI mean?",
    options: ["Teaching it rules", "Giving it emotions", "Feeding it data to learn", "Installing software"],
    answer: "Feeding it data to learn",
    hint: "No data, no learning!"
  },
  {
    question: "Which of these is a text-to-speech AI?",
    options: ["DeepL", "Descript", "ChatGPT", "ElevenLabs"],
    answer: "ElevenLabs",
    hint: "They make voices sound human."
  },
  {
    question: "What makes AI 'biased'?",
    options: ["Too much logic", "Too much data", "Bad training data", "Too fast learning"],
    answer: "Bad training data",
    hint: "Garbage in, garbage out."
  },
  {
    question: "AI safety is important because?",
    options: ["AI can crash apps", "AI can be too slow", "AI might make harmful decisions", "AI needs energy"],
    answer: "AI might make harmful decisions",
    hint: "Like giving wrong medical advice."
  },
  {
    question: "Which company owns Gemini AI?",
    options: ["OpenAI", "Google", "Meta", "Amazon"],
    answer: "Google",
    hint: "It's a sibling to Bard."
  },
  {
    question: "Which is an AI image editing tool?",
    options: ["Snapseed", "Midjourney", "InDesign", "Excel"],
    answer: "Midjourney",
    hint: "It’s used in Discord."
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
  clearInterval(timerInterval);
  questionBox.innerText = "🎉 Quiz Complete!";
  optionsBox.innerHTML = "";
  hintBtn.classList.add("hidden");
  nextBtn.classList.add("hidden");
  scoreBox.classList.remove("hidden");
  scoreBox.innerHTML = `
    You scored <strong>${score}</strong> out of <strong>${questions.length}</strong>!<br><br>
    <button onclick="location.reload()">🔁 Retry</button>
    <a href="index.html"><button>⬅️ Back</button></a>
  `;
  document.getElementById("timer").classList.add("hidden");
}

showQuestion();
