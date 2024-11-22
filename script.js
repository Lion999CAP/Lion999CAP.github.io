const canvas = document.getElementById('snakeGame');
const ctx = canvas.getContext('2d');
const box = 20;
const startButton = document.createElement('button');
const resetButton = document.createElement('button');

startButton.textContent = 'Start Game';
resetButton.textContent = 'Reset Game';

document.body.insertBefore(startButton, canvas.nextSibling);
document.body.insertBefore(resetButton, startButton.nextSibling);

let snake, direction, food, game;

function initializeGame() {
    snake = [{ x: 4 * box, y: 4 * box }];
    direction = 'RIGHT';
    food = {
        x: Math.floor(Math.random() * (canvas.width / box)) * box,
        y: Math.floor(Math.random() * (canvas.height / box)) * box,
    };
    if (game) clearInterval(game);
}

function startGame() {
    game = setInterval(drawGame, 100);
}

function resetGame() {
    initializeGame();
    drawGame();
}

function drawGame() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw food
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, box, box);

    // Draw snake
    ctx.fillStyle = 'green';
    snake.forEach((part) => ctx.fillRect(part.x, part.y, box, box));

    // Move snake
    const head = { ...snake[0] };
    if (direction === 'UP') head.y -= box;
    if (direction === 'DOWN') head.y += box;
    if (direction === 'LEFT') head.x -= box;
    if (direction === 'RIGHT') head.x += box;

    // Wrap around walls
    if (head.x < 0) head.x = canvas.width - box;
    if (head.x >= canvas.width) head.x = 0;
    if (head.y < 0) head.y = canvas.height - box;
    if (head.y >= canvas.height) head.y = 0;

    // Add new head
    snake.unshift(head);

    // Check for collision with food
    if (head.x === food.x && head.y === food.y) {
        food = {
            x: Math.floor(Math.random() * (canvas.width / box)) * box,
            y: Math.floor(Math.random() * (canvas.height / box)) * box,
        };
    } else {
        // Remove last part of snake
        snake.pop();
    }

    // Check collision with itself
    if (snake.slice(1).some((part) => part.x === head.x && part.y === head.y)) {
        clearInterval(game);
        alert('Game Over! Press "Reset Game" to play again.');
    }
}

// Control snake direction
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowUp' && direction !== 'DOWN') direction = 'UP';
    if (event.key === 'ArrowDown' && direction !== 'UP') direction = 'DOWN';
    if (event.key === 'ArrowLeft' && direction !== 'RIGHT') direction = 'LEFT';
    if (event.key === 'ArrowRight' && direction !== 'LEFT') direction = 'RIGHT';
});

// Button event listeners
startButton.addEventListener('click', startGame);
resetButton.addEventListener('click', resetGame);

// Initialize the game on load
initializeGame();
drawGame();
