let questions = []; // Array of question objects
let currentIndex = 0;
let timer;
let isPaused = false;

// Shuffle questions using Fisher-Yates
function shuffleQuestions(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Load and start quiz
function startQuiz() {
  questions = shuffleQuestions(questions); // Randomize
  currentIndex = 0;
  showQuestion();
}

// Show question
function showQuestion() {
  if (currentIndex >= questions.length) {
    endQuiz();
    return;
  }

  const q = questions[currentIndex];
  document.getElementById("questionBox").innerText = q.question;

  timer = setTimeout(() => {
    showAnswer(q.answer);
  }, 8000); // 8 seconds for question
}

// Show answer briefly
function showAnswer(answer) {
  document.getElementById("answerBox").innerText = answer;

  timer = setTimeout(() => {
    document.getElementById("answerBox").innerText = "";
    if (!isPaused) {
      currentIndex++;
      showQuestion();
    }
  }, 2000); // 2 seconds for answer
}

// Pause quiz
function pauseQuiz() {
  clearTimeout(timer);
  isPaused = true;
}

// Resume quiz
function resumeQuiz() {
  isPaused = false;
  showQuestion();
}

// Stop quiz
function stopQuiz() {
  clearTimeout(timer);
  currentIndex = 0;
  isPaused = false;
  document.getElementById("questionBox").innerText = "Quiz stopped.";
  document.getElementById("answerBox").innerText = "";
}

// Event listeners
document.getElementById("startBtn").addEventListener("click", startQuiz);
document.getElementById("pauseBtn").addEventListener("click", pauseQuiz);
document.getElementById("resumeBtn").addEventListener("click", resumeQuiz);
document.getElementById("stopBtn").addEventListener("click", stopQuiz);
