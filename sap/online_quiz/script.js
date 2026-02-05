const quizData = [
    {
        question: "Which language runs in a web browser?",
        options: ["Java", "C", "Python", "JavaScript"],
        answer: "JavaScript"
    },
    {
        question: "What does CSS stand for?",
        options: ["Central Style Sheets", "Cascading Style Sheets", "Computer Style Sheets", "Creative Style Sheets"],
        answer: "Cascading Style Sheets"
    },
    {
        question: "What does HTML stand for?",
        options: ["Hypertext Markup Language", "Hypertext Markdown Language", "Hyperloop Machine Language", "None of the above"],
        answer: "Hypertext Markup Language"
    }
];

let currentQuestion = 0;
let score = 0;

function loadQuestion() {
    const quiz = document.getElementById("quiz");
    quiz.innerHTML = `
        <div class="question">${quizData[currentQuestion].question}</div>
        <ul class="options">
          ${quizData[currentQuestion].options.map(opt =>
        `<li>
              <input type="radio" id="${opt}" name="option" value="${opt}">
              <label for="${opt}">${opt}</label>
            </li>`
    ).join("")}
        </ul>
      `;
}

function nextQuestion() {
    const selected = document.querySelector('input[name="option"]:checked');
    if (selected) {
        if (selected.value === quizData[currentQuestion].answer) {
            score++;
        }
        currentQuestion++;
        if (currentQuestion < quizData.length) {
            loadQuestion();
        } else {
            document.getElementById("quiz").innerHTML = "";
            document.getElementById("result").innerHTML =
                `🎉 Quiz finished! Your score: ${score}/${quizData.length}`;
            const nextBtn = document.getElementById("nextBtn");
            nextBtn.innerText = "Play Again";
            nextBtn.onclick = restartQuiz;
        }
    } else {
        alert("Please select an option!");
    }
}

function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    document.getElementById("result").innerHTML = "";
    const nextBtn = document.getElementById("nextBtn");
    nextBtn.innerText = "Next";
    nextBtn.onclick = nextQuestion;
    loadQuestion();
}

loadQuestion();