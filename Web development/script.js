const questions = [
    {
        question: "What is phishing?",
        options: [
            "Sending fake emails to trick users into sharing personal information",
            "Encrypting files to demand ransom",
            "Monitoring internet traffic to steal data",
            "A social media scam to gain followers"
        ],
        answer: 0
    },
    {
        question: "How can you recognize a suspicious email?",
        options: [
            "It comes from a trusted domain",
            "It asks for personal or financial information",
            "It has no attachments",
            "It is sent during work hours"
        ],
        answer: 1
    },
    {
        question: "What is baiting?",
        options: [
            "Using tempting offers to trick users into revealing sensitive data",
            "A denial-of-service attack",
            "A secure login process",
            "Sending unsolicited messages"
        ],
        answer: 0
    },
    {
        question: "How can you protect yourself from social engineering attacks?",
        options: [
            "Share passwords only with trusted people",
            "Avoid clicking on suspicious links or attachments",
            "Disable antivirus software",
            "Use unsecured public Wi-Fi"
        ],
        answer: 1
    },
    {
        question: "What is the goal of pretexting?",
        options: [
            "Encrypt user data",
            "Pretend to be someone else to gain sensitive information",
            "Hack into a database",
            "Monitor network traffic"
        ],
        answer: 1
    }
];

let currentQuestion = 0;
let score = 0;
let timeLeft = 20;
let timerInterval;
const leaderboardKey = "quizLeaderboard";

const quizContainer = document.getElementById("quiz-container");
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const timerEl = document.getElementById("timer");
const resultContainer = document.getElementById("result-container");
const scoreEl = document.getElementById("score");
const feedbackEl = document.getElementById("feedback");
const restartBtn = document.getElementById("restart-btn");
const leaderboardEl = document.getElementById("leaderboard");

// Load a question
function loadQuestion() {
    resetTimer();
    const question = questions[currentQuestion];
    questionEl.textContent = question.question;
    optionsEl.innerHTML = "";
    question.options.forEach((option, index) => {
        const li = document.createElement("li");
        li.className = "list-group-item";
        const button = document.createElement("button");
        button.textContent = option;
        button.className = "btn btn-outline-primary w-100";
        button.onclick = () => checkAnswer(index);
        li.appendChild(button);
        optionsEl.appendChild(li);
    });
    startTimer();
}

// Timer logic
function startTimer() {
    timeLeft = 20;
    timerEl.textContent = `Time Left: ${timeLeft}s`;
    timerInterval = setInterval(() => {
        timeLeft--;
        timerEl.textContent = `Time Left: ${timeLeft}s`;
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            currentQuestion++;
            if (currentQuestion < questions.length) {
                loadQuestion();
            } else {
                showResult();
            }
        }
    }, 1000);
}

function resetTimer() {
    clearInterval(timerInterval);
    timerEl.textContent = "";
}

// Check the answer
function checkAnswer(selectedIndex) {
    const question = questions[currentQuestion];
    if (selectedIndex === question.answer) {
        score++;
    }
    currentQuestion++;
    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
        showResult();
    }
}

// Show result
function showResult() {
    resetTimer();
    quizContainer.classList.add("hidden");
    resultContainer.classList.remove("hidden");
    scoreEl.textContent = score;
    if (score === questions.length) {
        feedbackEl.textContent = "Excellent! You are well aware of social engineering attacks.";
    } else if (score >= questions.length / 2) {
        feedbackEl.textContent = "Good job! But there's room for improvement.";
    } else {
        feedbackEl.textContent = "You need to learn more about social engineering attacks. Stay safe online!";
    }
    updateLeaderboard();
}

// Restart the quiz
restartBtn.onclick = () => {
    currentQuestion = 0;
    score = 0;
    resultContainer.classList.add("hidden");
    quizContainer.classList.remove("hidden");
    loadQuestion();
};

// Leaderboard logic
function updateLeaderboard() {
    const leaderboard = JSON.parse(localStorage.getItem(leaderboardKey)) || [];
    leaderboard.push({ score, date: new Date().toLocaleString() });
    leaderboard.sort((a, b) => b.score - a.score);
    localStorage.setItem(leaderboardKey, JSON.stringify(leaderboard));
    displayLeaderboard();
}

function displayLeaderboard() {
    const leaderboard = JSON.parse(localStorage.getItem(leaderboardKey)) || [];
    leaderboardEl.innerHTML = "";
    leaderboard.slice(0, 5).forEach(entry => {
        const li = document.createElement("li");
        li.className = "list-group-item";
        li.textContent = `Score: ${entry.score} - ${entry.date}`;
        leaderboardEl.appendChild(li);
    });
}

// Initialize the quiz
loadQuestion();
displayLeaderboard();

