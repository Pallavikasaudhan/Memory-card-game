const cardArray = [
    { id: 1, value: 'A' },
    { id: 2, value: 'B' },
    { id: 3, value: 'C' },
    { id: 4, value: 'D' },
    { id: 5, value: 'E' },
    { id: 6, value: 'F' },
    { id: 7, value: 'G' },
    { id: 8, value: 'H' },
    { id: 1, value: 'A' },
    { id: 2, value: 'B' },
    { id: 3, value: 'C' },
    { id: 4, value: 'D' },
    { id: 5, value: 'E' },
    { id: 6, value: 'F' },
    { id: 7, value: 'G' },
    { id: 8, value: 'H' }
];

let flippedCards = [];
let matchedCards = 0;
let moveCount = 0;
let startTime;
let timerInterval;

const gameBoard = document.getElementById('game-board');
const movesDisplay = document.getElementById('moves');
const timeDisplay = document.getElementById('time');
const resetButton = document.getElementById('reset-btn');

// Shuffle the cards
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Create the game board
function createBoard() {
    shuffle(cardArray);

    cardArray.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.dataset.id = card.id;
        
        const content = document.createElement('div');
        content.classList.add('content');
        content.textContent = card.value;
        
        cardElement.appendChild(content);
        gameBoard.appendChild(cardElement);

        cardElement.addEventListener('click', () => flipCard(cardElement));
    });
}

// Flip a card
function flipCard(card) {
    if (card.classList.contains('flipped') || flippedCards.length === 2 || card.classList.contains('matched')) {
        return;
    }

    card.classList.add('flipped');
    flippedCards.push(card);

    if (flippedCards.length === 2) {
        checkMatch();
        moveCount++;
        movesDisplay.textContent = moveCount;
    }
}

// Check if the two flipped cards match
function checkMatch() {
    const [firstCard, secondCard] = flippedCards;

    if (firstCard.dataset.id === secondCard.dataset.id) {
        firstCard.classList.add('matched');
        secondCard.classList.add('matched');
        matchedCards++;

        if (matchedCards === cardArray.length / 2) {
            clearInterval(timerInterval);
            alert('You Win! Game Over');
        }
    } else {
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
        }, 1000);
    }

    flippedCards = [];
}

// Timer function
function startTimer() {
    startTime = Date.now();
    timerInterval = setInterval(() => {
        const elapsedTime = Date.now() - startTime;
        const seconds = Math.floor(elapsedTime / 1000);
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        timeDisplay.textContent = `${minutes < 10 ? '0' + minutes : minutes}:${remainingSeconds < 10 ? '0' + remainingSeconds : remainingSeconds}`;
    }, 1000);
}

// Reset the game
function resetGame() {
    gameBoard.innerHTML = '';
    flippedCards = [];
    matchedCards = 0;
    moveCount = 0;
    movesDisplay.textContent = moveCount;
    timeDisplay.textContent = '00:00';
    clearInterval(timerInterval);
    createBoard();
    startTimer();
}

// Initialize the game
createBoard();
startTimer();

// Reset game button event
resetButton.addEventListener('click', resetGame);
