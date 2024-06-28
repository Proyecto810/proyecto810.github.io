const colors = document.querySelectorAll('.color');
const startButton = document.getElementById('start');
const restartButton = document.getElementById('restart');
let gameSequence = [];
let playerSequence = [];
let round = 0;
let isPlayerTurn = false;

startButton.addEventListener('click', startGame);
restartButton.addEventListener('click', restartGame);
colors.forEach(color => color.addEventListener('click', handleColorClick));

function startGame() {
    gameSequence = [];
    playerSequence = [];
    round = 0;
    isPlayerTurn = false;
    nextRound();
}

function nextRound() {
    playerSequence = [];
    round++;
    const nextColor = Math.floor(Math.random() * 9);
    gameSequence.push(nextColor);
    showSequence();
}

function showSequence() {
    let delay = 500;
    isPlayerTurn = false;

    gameSequence.forEach((colorIndex, index) => {
        setTimeout(() => {
            const colorElement = colors[colorIndex];
            colorElement.classList.add('active');
            setTimeout(() => {
                colorElement.classList.remove('active');
                if (index === gameSequence.length - 1) {
                    isPlayerTurn = true;
                }
            }, 500);
        }, delay * (index + 1));
    });
}

function handleColorClick(event) {
    if (!isPlayerTurn) return;

    const colorIndex = Array.from(colors).indexOf(event.target);
    playerSequence.push(colorIndex);
    const colorElement = colors[colorIndex];

    // Visual feedback on click
    colorElement.classList.add('clicked');
    setTimeout(() => colorElement.classList.remove('clicked'), 300);

    checkSequence();
}

function checkSequence() {
    const currentStep = playerSequence.length - 1;
    if (playerSequence[currentStep] !== gameSequence[currentStep]) {
        alert(`¡Perdiste! Llegaste a la ronda ${round}.`);
        restartGame();
        return;
    }

    if (playerSequence.length === gameSequence.length) {
        setTimeout(nextRound, 1000);
    }
}

function restartGame() {
    gameSequence = [];
    playerSequence = [];
    round = 0;
    isPlayerTurn = false;
}
