document.addEventListener('DOMContentLoaded', function () {
    const ecranAccueil = document.getElementById('ecran_accueil');
    const Game = document.getElementById('Game');
    const canvas = document.getElementById("Screen");
    const ctx = canvas.getContext("2d");
    const restartButton = document.getElementById('restart_button');
    const Score = document.getElementById("Score");
    const Time = document.getElementById("Time");
    const formulaireNom = document.getElementById('formulaire_nom');

    let snake, dx, dy, food, score;
    let timerInterval;
    let elapsedTime = 0;
    let lastRenderTime = 0;
    let SNAKE_SPEED = 7; // Nombre de fois que le serpent se déplace par seconde

    const snakeImage = new Image();
    snakeImage.src = 'lezard_right.png';
    const foodImage = new Image();
    foodImage.src = 'cake.png';
    const tileSize = 30;
    const gridSize = 20; // Défini par la taille du canvas / tileSize

    function resetGame() {
        snake = [{ x: Math.floor(gridSize / 2), y: Math.floor(gridSize / 2) }];
        dx = 1;
        dy = 0;
        food = { x: Math.floor(Math.random() * gridSize), y: Math.floor(Math.random() * gridSize) };
        score = 0;
        staticSquares = [{ x: 5, y: 5 }, { x: 15, y: 10 }, { x: 10, y: 15 }];
        vitesse = 100;
        elapsedTime = 0;

        if (timerInterval) clearInterval(timerInterval);
        timerInterval = setInterval(function () {
            elapsedTime++;
            Time.textContent = "Temps : " + elapsedTime + "s";
        }, 1000);

        Score.textContent = "Score : 0";
        Time.textContent = "Temps : 0s";

        window.requestAnimationFrame(gameLoop);
    }

    function gameLoop(currentTime) {
        window.requestAnimationFrame(gameLoop);
        const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
        if (secondsSinceLastRender < 1 / SNAKE_SPEED) return;

        lastRenderTime = currentTime;

        clearCanvas();
        drawFood();
        drawSnake();
        moveSnake();

        if (checkCollision()) {
            Game.style.display = 'none';
            clearInterval(timerInterval);
            document.getElementById("Game_Over").style.display = 'flex';
            return;
        }
    }

    function drawSnake() {
        snake.forEach(segment => ctx.drawImage(snakeImage, segment.x * tileSize, segment.y * tileSize, tileSize, tileSize));
    }

    function drawFood() {
        ctx.drawImage(foodImage, food.x * tileSize, food.y * tileSize, tileSize, tileSize);
    }

    function moveSnake() {
        const head = { x: snake[0].x + dx, y: snake[0].y + dy };
        snake.unshift(head);

        if (head.x === food.x && head.y === food.y) {
            score++;
            Score.textContent = "Score : " + score;
            SNAKE_SPEED += 0.3;

            placeFood();
        } else {
            snake.pop();
        }
    }

    function placeFood() {
        food = { x: Math.floor(Math.random() * gridSize), y: Math.floor(Math.random() * gridSize) };
    }

    function clearCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    function checkCollision() {
        const head = snake[0];
        if (head.x < 0 || head.x >= gridSize || head.y < 0 || head.y >= gridSize || snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y)) {
            SNAKE_SPEED = 0;
            console.log("loulou");
            return true;
        }
        return false;
    }

    formulaireNom.addEventListener('submit', function (e) {
        e.preventDefault();
        ecranAccueil.style.display = 'none';
        Game.style.display = 'flex';
        resetGame();
    });

    document.addEventListener("keydown", function (event) {
        switch (event.key) {
            case "z": if (dy === 0) { dx = 0; dy = -1; } break;
            case "s": if (dy === 0) { dx = 0; dy = 1; } break;
            case "q": if (dx === 0) { dx = -1; dy = 0; } break;
            case "d": if (dx === 0) { dx = 1; dy = 0; } break;
        }
    });

    restartButton.addEventListener('click', function () {
        console.log("coucou");
        // Masquer l'écran de Game Over
        document.getElementById("Game_Over").style.display = 'none !important';


        // Réinitialiser le score et le timer visuellement
        Score.textContent = "Score : 0";
        Time.textContent = "Temps : 0s";

        // Réinitialiser l'état interne du jeu, si nécessaire
        elapsedTime = 0;
        score = 0;
        if (timerInterval) {
            clearInterval(timerInterval);
            timerInterval = null;
        }

        // Réafficher l'écran d'accueil pour permettre à l'utilisateur de recommencer
        ecranAccueil.style.display = 'flex';

        // Masquer le canvas du jeu pour éviter tout affichage résiduel

        console.log("Style de #Game_Over après clic restart :", document.getElementById("Game_Over").style.display);
        // Nettoyer le canvas
        clearCanvas();
    });
});