let quiz = [];
let index = 0;
let started = false;

const questionDiv = document.querySelector('.question');
const optionsDiv = document.querySelector('.options');
const answerDiv = document.querySelector('.answer');
const progressFill = document.querySelector('.progress-fill');
const timerFill = document.querySelector('.timer-fill');
const timerDiv = document.querySelector('.timer');
const startBtn = document.querySelector('.start-btn');

const startSound = document.getElementById('startSound');
const questionSound = document.getElementById('questionSound');
const answerSound = document.getElementById('answerSound');

fetch('quiz.txt')
  .then(response => response.text())
  .then(data => {
    const blocks = data.replace(/\r\n/g, '\n').trim().split('\n\n');
    quiz = blocks.map(block => {
      const lines = block.split('\n');
      return {
        question: lines[0].slice(3).trim(),
        options: lines.slice(1, 5).map(line => line.slice(3).trim()),
        answer: lines[5].slice(5).trim()
      };
    });
  });

function startQuiz() {
  if (started) return;
  started = true;
  startBtn.style.display = 'none';
  startSound.play();
  setTimeout(showNext, 1000);
}

function showNext() {
  if (index >= quiz.length) {
    questionDiv.textContent = "✅ Quiz Finished!";
    optionsDiv.textContent = "";
    answerDiv.style.display = "none";
    timerDiv.textContent = "";
    progressFill.style.width = "100%";
    timerFill.style.width = "0%";
    questionSound.pause();
    return;
  }

  const q = quiz[index];
  questionDiv.textContent = `Q${index + 1}: ${q.question}`;
  optionsDiv.innerHTML = q.options.map((opt, i) => `<div>${String.fromCharCode(65 + i)}. ${opt}</div>`).join('');
  answerDiv.style.display = "none";
  progressFill.style.width = `${(index / quiz.length) * 100}%`;
  timerFill.style.width = "0%";

  let timeLeft = 5;
  timerDiv.textContent = `⏳ ${timeLeft} seconds`;
  questionSound.currentTime = 0;
  questionSound.play();

  const countdown = setInterval(() => {
    timeLeft--;
    timerDiv.textContent = `⏳ ${timeLeft} seconds`;
    timerFill.style.width = `${((5 - timeLeft) / 5) * 100}%`;
    if (timeLeft <= 0) clearInterval(countdown);
  }, 1000);

  setTimeout(() => {
    questionSound.pause();
    answerSound.play();
    answerDiv.textContent = `🟩 Answer: ${q.answer}`;
    answerDiv.style.display = "block";
    progressFill.style.width = `${((index + 1) / quiz.length) * 100}%`;
    index++;
    setTimeout(showNext, 3000);
  }, 5000);
}