const quotes = [
    "When you have eliminated the impossible, whatever remains, however improbable, must be the truth.",
    "There is nothing more deceptive than an obvious fact.",
    "I ought to know by this time that when a fact appears to be opposed to a long train of deductions it invariably proves to be capable of bearing some other interpretation.",
    "I never make exceptions. An exception disproves the rule.",
    "What one man can invent another can discover.",
    "Nothing clears up a case so much as stating it to another person.",
    "Education never ends, Watson. It is a series of lessons, with the greatest for the last."
];

let words = [];
let wordIndex = 0;
let startTime;
const quoteElement = document.getElementById('quote');
const messageElement = document.getElementById('message');
const typedValueElement = document.getElementById('typed-value');
const modal = document.getElementById('modal');
const resultMessage = document.getElementById('result-message');
const closeModal = document.getElementById('close-modal');
const scoreList = document.getElementById('score-list');

const inputField = document.getElementById('typed-value');
let typingTimer;
const TYPING_INTERVAL = 1000;

document.getElementById('start').addEventListener('click', startGame);

function startGame() {
    const quoteIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[quoteIndex];
    words = quote.split(" ");
    wordIndex = 0;
    quoteElement.innerHTML = words.map(word => `<span>${word}&nbsp;</span>`).join('');
    quoteElement.childNodes[0].className = 'highlight';
    typedValueElement.value = '';
    typedValueElement.disabled = false;
    typedValueElement.focus();
    startTime = new Date().getTime();
    document.getElementById('start').disabled = true;
    messageElement.innerText = '';
}

typedValueElement.addEventListener('input', () => {
    const currentWord = words[wordIndex];
    const typedValue = typedValueElement.value;

    if (typedValue === currentWord && wordIndex === words.length - 1) {
        const elapsedTime = new Date().getTime() - startTime;
        const resultText = `CONGRATULATIONS! You finished in ${(elapsedTime / 1000).toFixed(2)} seconds.`;
        resultMessage.innerText = resultText;
        saveScore(elapsedTime);
        displayScores();
        modal.style.display = 'flex';
        typedValueElement.disabled = true;
        document.getElementById('start').disabled = false;
    } else if (typedValue.endsWith(' ') && typedValue.trim() === currentWord) {
        typedValueElement.value = '';
        wordIndex++;
        Array.from(quoteElement.childNodes).forEach(word => word.className = '');
        quoteElement.childNodes[wordIndex].className = 'highlight';
    } else {
        updateInputColor(currentWord, typedValue);
    }
});

closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
    resetGame();
});

function resetGame() {
    quoteElement.innerHTML = '';
    messageElement.innerText = '';
    typedValueElement.value = '';
    typedValueElement.disabled = true;
    document.getElementById('start').disabled = false;
}

function updateInputColor(currentWord, typedValue) {
    let isCorrect = true;
    for (let i = 0; i < typedValue.length; i++) {
        if (typedValue[i] !== currentWord[i]) {
            isCorrect = false;
            break;
        }
    }
    typedValueElement.classList.toggle('error', !isCorrect);
}

function saveScore(time) {
    let scores = JSON.parse(localStorage.getItem('scores')) || [];
    scores.push(time);
    scores.sort((a, b) => a - b);
    if (scores.length > 5) scores = scores.slice(0, 5); // Keep only top 5 scores
    localStorage.setItem('scores', JSON.stringify(scores));
}

function displayScores() {
    const scores = JSON.parse(localStorage.getItem('scores')) || [];
    scoreList.innerHTML = scores
        .map((score, index) => `<li>${index + 1}. ${(score / 1000).toFixed(3)} seconds</li>`)
        .join('');
}

inputField.addEventListener('input', () => {
    inputField.classList.add('typing');
    
    clearTimeout(typingTimer);
    
    typingTimer = setTimeout(() => {
        inputField.classList.remove('typing');
    }, TYPING_INTERVAL);
});
