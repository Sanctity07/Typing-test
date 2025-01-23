let typingStarted = false;
let charCount = 0;
let timeLeft = 60; // Initial time
const inputBox = document.getElementById('inputBox');
const timerElement = document.getElementById('timer');
const resultElement = document.getElementById('result');
const sentenceElement = document.getElementById('sentence'); // Add this line

let sentences = [];
let currentSentence = '';

inputBox.disabled = false;

async function fetchSentences() {
    try {
        const response = await fetch('https://linguatools-sentence-generating.p.rapidapi.com/realise', {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'abcdef12345', // Replace with your RapidAPI key
                'X-RapidAPI-Host': 'linguatools-sentence-generating.p.rapidapi.com'
            }
        });
        const data = await response.json();
        sentences = data.sentences; // Adjust based on the API response structure
        setRandomSentence();
    } catch (error) {
        console.error('Error fetching sentences:', error);
    }
}

function startTyping(event) {
    if (!typingStarted) {
        typingStarted = true;
        charCount = 0;
        startTimer();
    }
    // Increment character count
    charCount++;
}

function startTimer() {
    const countdown = setInterval(() => {
        timeLeft--;
        timerElement.textContent = `Time Left: ${timeLeft}s`;

        if (timeLeft <= 0) {
            clearInterval(countdown);
            inputBox.disabled = true;
            calculateResults();
        }
    }, 1000);
}

function calculateResults() {
    const userInput = inputBox.value.trim();
    const userWords = userInput.split(' ');
    const wordsPerMinute = (userWords.length / 60) * 60;
    resultElement.textContent = `Time's up! Words per minute: ${wordsPerMinute.toFixed(2)}.`;
}

function restartTyping() {
    typingStarted = false;
    charCount = 0;
    timeLeft = 60; // reset to initial time
    inputBox.disabled = false;
    inputBox.value = '';
    timerElement.textContent = `Time Left: ${timeLeft}s`;
    resultElement.textContent = '';
    setRandomSentence();
}

function setRandomSentence() {
    if (sentences.length > 0) {
        currentSentence = sentences[Math.floor(Math.random() * sentences.length)];
        sentenceElement.textContent = currentSentence;
    } else {
        sentenceElement.textContent = 'Loading sentences...';
    }
}

// Add an event listener to the restart button
document.getElementById('restartButton').addEventListener('click', restartTyping);

// Fetch sentences from the API when the page loads
fetchSentences();
