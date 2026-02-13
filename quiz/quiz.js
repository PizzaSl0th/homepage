/**
 * Quiz Application
 * Supports Daily Quiz (same questions for everyone) and Custom Quiz (category/length selection)
 */

// ==================== CONFIGURATION ====================
const DAILY_QUESTIONS_COUNT = 10;
const STORAGE_KEY = 'quizScores';

// ==================== STATE ====================
let currentQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let playerName = '';
let quizMode = null; // 'daily' or 'custom'
let customCategory = 'all';
let customLength = 10;

// ==================== DOM ELEMENTS ====================
const pages = {
    home: document.getElementById('homepage'),
    quiz: document.getElementById('quiz-page'),
    results: document.getElementById('results-page')
};

const elements = {
    playerNameInput: document.getElementById('player-name'),
    startButton: document.getElementById('start-quiz'),
    dailyDate: document.getElementById('daily-date'),
    categorySelect: document.getElementById('category-select'),
    lengthSelect: document.getElementById('length-select'),
    availableQuestions: document.getElementById('available-questions'),
    playerDisplay: document.getElementById('player-display'),
    questionCounter: document.getElementById('question-counter'),
    scoreDisplay: document.getElementById('score-display'),
    quizModeBadge: document.getElementById('quiz-mode-badge'),
    questionText: document.getElementById('question-text'),
    answersContainer: document.getElementById('answers'),
    nextButton: document.getElementById('next-btn'),
    resultName: document.getElementById('result-name'),
    finalScore: document.getElementById('final-score'),
    scoreTotal: document.getElementById('score-total'),
    scoreMessage: document.getElementById('score-message'),
    quizTypeResult: document.getElementById('quiz-type-result'),
    playAgainButton: document.getElementById('play-again'),
    backHomeButton: document.getElementById('back-home'),
    dailyScores: document.getElementById('daily-scores'),
    monthlyScores: document.getElementById('monthly-scores'),
    yearlyScores: document.getElementById('yearly-scores'),
    dailyTitle: document.getElementById('daily-title'),
    monthlyTitle: document.getElementById('monthly-title'),
    yearlyTitle: document.getElementById('yearly-title')
};

// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

function initializeApp() {
    // Set daily date display
    const today = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    elements.dailyDate.textContent = today.toLocaleDateString('en-US', options);

    // Set leaderboard titles
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                        'July', 'August', 'September', 'October', 'November', 'December'];
    elements.dailyTitle.textContent = today.toLocaleDateString('en-US', options);
    elements.monthlyTitle.textContent = `${monthNames[today.getMonth()]} ${today.getFullYear()}`;
    elements.yearlyTitle.textContent = `${today.getFullYear()}`;

    // Update available questions count
    updateAvailableCount();

    // Load leaderboards
    updateLeaderboards();

    // Event Listeners
    elements.playerNameInput.addEventListener('input', validateForm);
    elements.startButton.addEventListener('click', startQuiz);
    elements.nextButton.addEventListener('click', nextQuestion);
    elements.playAgainButton.addEventListener('click', () => {
        if (quizMode === 'daily') {
            startQuiz();
        } else {
            goHome();
        }
    });
    elements.backHomeButton.addEventListener('click', goHome);

    // Mode card selection
    document.querySelectorAll('.mode-card').forEach(card => {
        card.addEventListener('click', () => selectMode(card.dataset.mode));
    });

    // Custom options change
    elements.categorySelect.addEventListener('change', () => {
        customCategory = elements.categorySelect.value;
        updateAvailableCount();
        validateForm();
    });

    elements.lengthSelect.addEventListener('change', () => {
        customLength = parseInt(elements.lengthSelect.value);
        validateForm();
    });

    // Tab switching
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => switchTab(btn.dataset.tab));
    });

    // Prevent clicks inside custom options from bubbling to mode card
    document.getElementById('custom-options').addEventListener('click', (e) => {
        e.stopPropagation();
    });
}

// ==================== SEEDED RANDOM (for Daily Quiz) ====================
function seededRandom(seed) {
    // Simple seeded random number generator (mulberry32)
    return function() {
        let t = seed += 0x6D2B79F5;
        t = Math.imul(t ^ t >>> 15, t | 1);
        t ^= t + Math.imul(t ^ t >>> 7, t | 61);
        return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
}

function getDailySeed() {
    // Create a seed based on today's date (same for everyone on the same day)
    const today = new Date();
    const dateString = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
    let seed = 0;
    for (let i = 0; i < dateString.length; i++) {
        seed = ((seed << 5) - seed) + dateString.charCodeAt(i);
        seed = seed & seed; // Convert to 32bit integer
    }
    return Math.abs(seed);
}

function shuffleWithSeed(array, seed) {
    const rng = seededRandom(seed);
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(rng() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// ==================== UTILITY FUNCTIONS ====================
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

function showPage(pageName) {
    Object.values(pages).forEach(page => page.classList.remove('active'));
    pages[pageName].classList.add('active');
}

function getQuestionsForCategory(category) {
    if (category === 'all') {
        return quizQuestions;
    }
    return quizQuestions.filter(q => q.category === category);
}

function updateAvailableCount() {
    const available = getQuestionsForCategory(customCategory).length;
    elements.availableQuestions.textContent = available;
}

// ==================== MODE SELECTION ====================
function selectMode(mode) {
    quizMode = mode;

    // Update UI
    document.querySelectorAll('.mode-card').forEach(card => {
        card.classList.toggle('selected', card.dataset.mode === mode);
    });

    validateForm();
}

function validateForm() {
    const nameValid = elements.playerNameInput.value.trim().length > 0;
    const modeSelected = quizMode !== null;

    let canStart = nameValid && modeSelected;

    // For custom mode, check if enough questions are available
    if (quizMode === 'custom') {
        const available = getQuestionsForCategory(customCategory).length;
        canStart = canStart && available >= customLength;
    }

    elements.startButton.disabled = !canStart;
}

// ==================== QUIZ LOGIC ====================
function startQuiz() {
    playerName = elements.playerNameInput.value.trim();
    if (!playerName || !quizMode) return;

    // Reset state
    currentQuestionIndex = 0;
    score = 0;

    // Select questions based on mode
    if (quizMode === 'daily') {
        // Daily quiz: same questions for everyone today
        const seed = getDailySeed();
        const shuffled = shuffleWithSeed(quizQuestions, seed);
        currentQuestions = shuffled.slice(0, DAILY_QUESTIONS_COUNT);

        // Also shuffle answer order with the same seed (but different offset)
        elements.quizModeBadge.textContent = `Daily Quiz - ${new Date().toLocaleDateString()}`;
    } else {
        // Custom quiz: random from selected category
        const categoryQuestions = getQuestionsForCategory(customCategory);
        currentQuestions = shuffleArray(categoryQuestions).slice(0, customLength);

        const categoryLabel = categoryNames[customCategory] || customCategory;
        elements.quizModeBadge.textContent = `Custom Quiz - ${categoryLabel}`;
    }

    // Update UI
    elements.playerDisplay.textContent = playerName;
    elements.scoreDisplay.textContent = 'Score: 0';

    showPage('quiz');
    displayQuestion();
}

function displayQuestion() {
    const question = currentQuestions[currentQuestionIndex];
    const totalQuestions = currentQuestions.length;

    // Update counter
    elements.questionCounter.textContent = `Question ${currentQuestionIndex + 1}/${totalQuestions}`;

    // Display question
    elements.questionText.textContent = question.question;

    // Clear and populate answers
    elements.answersContainer.innerHTML = '';
    elements.nextButton.style.display = 'none';

    // Shuffle answer options
    let answerIndices = [0, 1, 2, 3];

    if (quizMode === 'daily') {
        // For daily quiz, use seeded shuffle for consistent answer order
        const seed = getDailySeed() + currentQuestionIndex;
        answerIndices = shuffleWithSeed(answerIndices, seed);
    } else {
        answerIndices = shuffleArray(answerIndices);
    }

    answerIndices.forEach((originalIndex) => {
        const button = document.createElement('button');
        button.className = 'answer-btn';
        button.textContent = question.options[originalIndex];
        button.dataset.index = originalIndex;
        button.addEventListener('click', () => selectAnswer(button, originalIndex, question.correct));
        elements.answersContainer.appendChild(button);
    });
}

function selectAnswer(button, selectedIndex, correctIndex) {
    // Disable all buttons
    const buttons = elements.answersContainer.querySelectorAll('.answer-btn');
    buttons.forEach(btn => {
        btn.classList.add('disabled');
        btn.disabled = true;

        // Show correct answer
        if (parseInt(btn.dataset.index) === correctIndex) {
            btn.classList.add('correct');
        }
    });

    // Check if answer is correct
    if (selectedIndex === correctIndex) {
        score++;
        elements.scoreDisplay.textContent = `Score: ${score}`;
    } else {
        button.classList.add('incorrect');
    }

    // Show next button or finish
    if (currentQuestionIndex < currentQuestions.length - 1) {
        elements.nextButton.style.display = 'inline-block';
    } else {
        setTimeout(finishQuiz, 1500);
    }
}

function nextQuestion() {
    currentQuestionIndex++;
    displayQuestion();
}

function finishQuiz() {
    const totalQuestions = currentQuestions.length;

    // Save score (only for daily quiz for leaderboard)
    if (quizMode === 'daily') {
        saveScore(playerName, score, totalQuestions);
    }

    // Update UI
    elements.resultName.textContent = playerName;
    elements.finalScore.textContent = score;
    elements.scoreTotal.textContent = `/${totalQuestions}`;

    // Set message based on percentage
    const percentage = score / totalQuestions;
    let message = '';
    if (percentage === 1) {
        message = 'Perfect score! Amazing!';
    } else if (percentage >= 0.8) {
        message = 'Excellent work!';
    } else if (percentage >= 0.6) {
        message = 'Good job!';
    } else if (percentage >= 0.4) {
        message = 'Not bad, keep practicing!';
    } else {
        message = 'Better luck next time!';
    }
    elements.scoreMessage.textContent = message;

    // Show quiz type in results
    if (quizMode === 'daily') {
        elements.quizTypeResult.textContent = `Daily Quiz - ${new Date().toLocaleDateString()}`;
        elements.playAgainButton.textContent = 'Try Again';
    } else {
        const categoryLabel = categoryNames[customCategory] || customCategory;
        elements.quizTypeResult.textContent = `Custom Quiz - ${categoryLabel} (${totalQuestions} questions)`;
        elements.playAgainButton.textContent = 'New Quiz';
    }

    showPage('results');
}

function goHome() {
    updateLeaderboards();
    showPage('home');
}

// ==================== LEADERBOARD ====================
function getScores() {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
}

function saveScore(name, score, total) {
    const scores = getScores();
    const now = new Date();

    scores.push({
        name: name,
        score: score,
        total: total,
        date: now.toISOString(),
        day: now.toDateString(),
        month: now.getMonth(),
        year: now.getFullYear()
    });

    localStorage.setItem(STORAGE_KEY, JSON.stringify(scores));
    updateLeaderboards();
}

function getDailyScores() {
    const scores = getScores();
    const today = new Date().toDateString();

    // Filter scores for today
    const dailyScores = scores.filter(s => s.day === today);

    // Get best score per player
    return getBestScoresPerPlayer(dailyScores);
}

function getMonthlyScores() {
    const scores = getScores();
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    // Filter scores for current month
    const monthlyScores = scores.filter(s =>
        s.month === currentMonth && s.year === currentYear
    );

    // Get best score per player
    return getBestScoresPerPlayer(monthlyScores);
}

function getYearlyScores() {
    const scores = getScores();
    const now = new Date();
    const currentYear = now.getFullYear();

    // Filter scores for current year
    const yearlyScores = scores.filter(s => s.year === currentYear);

    // Get best score per player
    return getBestScoresPerPlayer(yearlyScores);
}

function getBestScoresPerPlayer(scores) {
    const playerBest = {};

    scores.forEach(entry => {
        const name = entry.name.toLowerCase();
        if (!playerBest[name] || entry.score > playerBest[name].score) {
            playerBest[name] = entry;
        }
    });

    // Convert to array and sort by score
    return Object.values(playerBest)
        .sort((a, b) => b.score - a.score)
        .slice(0, 10); // Top 10
}

function updateLeaderboards() {
    const dailyScores = getDailyScores();
    const monthlyScores = getMonthlyScores();
    const yearlyScores = getYearlyScores();

    renderLeaderboard(elements.dailyScores, dailyScores);
    renderLeaderboard(elements.monthlyScores, monthlyScores);
    renderLeaderboard(elements.yearlyScores, yearlyScores);
}

function renderLeaderboard(container, scores) {
    if (scores.length === 0) {
        container.innerHTML = '<li class="no-scores">No scores yet. Be the first!</li>';
        return;
    }

    container.innerHTML = scores.map((entry, index) => `
        <li>
            <span class="rank">#${index + 1}</span>
            <span class="player-name">${escapeHtml(entry.name)}</span>
            <span class="player-score">${entry.score}/${entry.total || DAILY_QUESTIONS_COUNT}</span>
        </li>
    `).join('');
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ==================== TAB SWITCHING ====================
function switchTab(tabName) {
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.tab === tabName);
    });

    document.querySelectorAll('.leaderboard').forEach(lb => {
        lb.classList.remove('active');
    });

    document.getElementById(`${tabName}-leaderboard`).classList.add('active');
}
