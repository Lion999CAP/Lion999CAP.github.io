const canvas = document.getElementById('snakeGame');
const ctx = canvas.getContext('2d');
const box = 20;
let snake = [];
let direction = 'RIGHT';
let food = {};
let game;
let isGameRunning = false;
let firstStart = true; // Controla si es la primera vez que se inicia el juego

// Botón de inicio
const startButton = document.getElementById('startButton');

// Inicialización de la serpiente
function initializeGame() {
    snake = [{ x: 4 * box, y: 4 * box }];
    direction = 'RIGHT';
    food = {
        x: Math.floor(Math.random() * (canvas.width / box)) * box,
        y: Math.floor(Math.random() * (canvas.height / box)) * box
    };
}

// Control de la dirección de la serpiente
document.addEventListener('keydown', event => {
    if (event.key === 'ArrowUp' && direction !== 'DOWN') direction = 'UP';
    if (event.key === 'ArrowDown' && direction !== 'UP') direction = 'DOWN';
    if (event.key === 'ArrowLeft' && direction !== 'RIGHT') direction = 'LEFT';
    if (event.key === 'ArrowRight' && direction !== 'LEFT') direction = 'RIGHT';
    
    // Prevenir el desplazamiento de la página
    if (event.key === "ArrowUp" || event.key === "ArrowDown" || event.key === "ArrowLeft" || event.key === "ArrowRight") {
        event.preventDefault();
    }
});

// Dibuja el juego
function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Dibujar comida
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, box, box);

    // Dibujar serpiente
    ctx.fillStyle = 'green';
    snake.forEach(part => ctx.fillRect(part.x, part.y, box, box));

    // Mover serpiente
    const head = { ...snake[0] };
    if (direction === 'UP') head.y -= box;
    if (direction === 'DOWN') head.y += box;
    if (direction === 'LEFT') head.x -= box;
    if (direction === 'RIGHT') head.x += box;

    // Teletransportar cuando cruza paredes
    head.x = (head.x + canvas.width) % canvas.width;
    head.y = (head.y + canvas.height) % canvas.height;

    // Verificar si la serpiente come la comida
    if (head.x === food.x && head.y === food.y) {
        food = {
            x: Math.floor(Math.random() * (canvas.width / box)) * box,
            y: Math.floor(Math.random() * (canvas.height / box)) * box
        };
    } else {
        // Remover la última parte de la serpiente
        snake.pop();
    }

    // Revisar colisión con el cuerpo
    if (snake.some(part => part.x === head.x && part.y === head.y)) {
        clearInterval(game);
        isGameRunning = false;

        // Mostrar mensaje visual de finalización en el canvas
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'white';
        ctx.font = '20px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Fin del Juego', canvas.width / 2, canvas.height / 2 - 10);
        ctx.fillText('Presiona "Iniciar Juego" para jugar de nuevo', canvas.width / 2, canvas.height / 2 + 20);
        return;
    }

    // Agregar nueva cabeza
    snake.unshift(head);
}

// Iniciar o reiniciar el juego
function startGame() {
    clearInterval(game); // Detiene cualquier juego previo
    initializeGame();

    if (firstStart) {
        // Mostrar mensaje inicial solo la primera vez
        firstStart = false;
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpia el canvas
        ctx.fillStyle = 'black';
        ctx.font = '16px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('¡Puedes jugar con las flechas!', canvas.width / 2, canvas.height / 2);

        // Espera 5 segundos antes de iniciar el juego
        setTimeout(() => {
            game = setInterval(drawGame, 100);
        }, 3000);
    } else {
        // Inicia el juego inmediatamente si no es la primera vez
        game = setInterval(drawGame, 100);
    }
}

// Event listener para el botón de inicio
startButton.addEventListener('click', startGame);

// Detectar el desplazamiento de la página
let lastScrollTop = 0;
const footer = document.querySelector('footer');

// Función que se ejecuta cuando se hace scroll
window.addEventListener('scroll', function () {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop) {
        // Si se está bajando, minimizamos el pie de página
        footer.classList.add('minimized');
    } else {
        // Si se está subiendo, restauramos el tamaño original
        footer.classList.remove('minimized');
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // Evitar valores negativos
});

        // Lista de artículos con enlaces a las páginas correspondientes
        const articles = [
            { title: "Artículo 1", link: "articles/article1.html" },
            { title: "Artículo 2", link: "articles/article2.html" },
            // Puedes seguir agregando artículos de la misma forma
        ];

        // Obtén el contenedor de la lista
        const articleList = document.getElementById("article-list");

        // Itera sobre los artículos y agréguelos a la lista
        articles.forEach(article => {
            const li = document.createElement("li");
            const a = document.createElement("a");
            a.href = article.link;
            a.textContent = article.title;
            li.appendChild(a);
            articleList.appendChild(li);
        });