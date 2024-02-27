const Score = document.querySelector("#Score")
const HighScore = document.querySelector("#HighScore");
const Time = document.querySelector("#Time")
var restart_button = document.getElementById('restart_button');

document.addEventListener('DOMContentLoaded', function () {
    // Récupérez l'élément du bouton "Jouer"
    var boutonJouer = document.getElementById('Jouer');

    // Ajoutez un gestionnaire d'événements pour le clic sur le bouton
    boutonJouer.addEventListener('click', function () {
        // Récupérez l'élément avec l'ID "ecran_accueil"
        var ecranAccueil = document.getElementById('ecran_accueil');
        var Game = document.getElementById('Game');
        // Vérifiez si l'élément existe avant de modifier le style
        if (ecranAccueil) {
            // Modifiez le style pour masquer l'élément
            ecranAccueil.style.display = 'none';
            Game.style.display = 'flex';
        }
    });
}); document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.getElementById("Screen");
    const ctx = canvas.getContext("2d");
    const tileSize = 30; // taille d'une tuile
    const gridSize = canvas.width / tileSize; //taille de la grille
    let snake = [{ x: 10, y: 10 }]; // définition du serpent position x et y
    let dx = 0; // déplacement du serpent
    let dy = 0; // déplacement du serpent
    let food = { x: 15, y: 15 }; // définition de la pomme position x et y
    let startTime = 0;
    let elapsedTime = 0;
    let timerInterval;

    const snakeImage = new Image();
    snakeImage.src = 'lezard_right.png';

    const foodImage = new Image();
    foodImage.src = 'cake.png';

    snakeImage.onload = function () {
        main();
    }

    function drawSnake() {
        snake.forEach((segment) => {
            ctx.drawImage(snakeImage, segment.x * tileSize, segment.y * tileSize, tileSize, tileSize);
        });
        drawStaticSquares();
    }


    const staticSquareImage = new Image();
    staticSquareImage.src = 'cactus.png'; // Chemin vers votre image

    function drawStaticSquares() {
        staticSquares.forEach(square => {
            ctx.drawImage(staticSquareImage, square.x * tileSize, square.y * tileSize, tileSize, tileSize);
        });
    }

    function drawFood() {
        // Dessiner la nourriture
        ctx.drawImage(foodImage, food.x * tileSize, food.y * tileSize, tileSize, tileSize);

        // Vérifier si la nourriture se trouve sur une case occupée par un cactus
        const isFoodOnCactus = staticSquares.some(square => square.x === food.x && square.y === food.y);

        // Si la nourriture est sur une case de cactus, générer une nouvelle position aléatoire
        while (isFoodOnCactus) {
            food = {
                x: Math.floor(Math.random() * gridSize),
                y: Math.floor(Math.random() * gridSize)
            };

            // Vérifier à nouveau si la nouvelle position est sur une case de cactus
            isFoodOnCactus = staticSquares.some(square => square.x === food.x && square.y === food.y);
        }

        // Définir les bordures de la nourriture
        const foodBorder = {
            left: food.x * tileSize,
            right: (food.x + 1) * tileSize,
            top: food.y * tileSize,
            bottom: (food.y + 1) * tileSize
        };

        // Vérifier la collision avec la tête du serpent
        const head = snake[0];
        const headBorder = {
            left: head.x * tileSize,
            right: (head.x + 1) * tileSize,
            top: head.y * tileSize,
            bottom: (head.y + 1) * tileSize
        };

        // Vérifier si les bordures se chevauchent
        if (headBorder.left < foodBorder.right &&
            headBorder.right > foodBorder.left &&
            headBorder.top < foodBorder.bottom &&
            headBorder.bottom > foodBorder.top) {
            // Collision détectée avec la nourriture
            console.log("Collision avec la nourriture détectée !");

            score++;
            vitesse += vitesse / 30;
            console.log("Score + 1");

            if (score >= 5) {
                staticSquares.push({ x: 5, y: 10 }, { x: 15, y: 5 });
            }
            if (score >= 10) {
                staticSquares.push({ x: 10, y: 10 }, { x: 15, y: 15 });
            }

            if (score >= 15) {
                staticSquares.push({ x: 10, y: 5 }, { x: 5, y: 15 });
            }

            // Mettre à jour l'affichage du score
            Score.textContent = "Score : " + score;
            // Générer une nouvelle position aléatoire pour la nourriture
            food = {
                x: Math.floor(Math.random() * gridSize),
                y: Math.floor(Math.random() * gridSize)
            };
            // Agrandir le serpent en ajoutant une nouvelle tête
            moveSnake();
        }
    }


    // Déclaration de la variable de score
    let score = 0;

    const staticSquares = [{ x: 5, y: 5 }, { x: 15, y: 10 }, { x: 10, y: 15 }]; // Coordonnées des carrés statiques

    function moveSnake() {
        const head = { x: snake[0].x + dx, y: snake[0].y + dy };

        // Si la tête du serpent touche la nourriture
        if (head.x === food.x && head.y === food.y) {
            food = {
                x: Math.floor(Math.random() * gridSize),
                y: Math.floor(Math.random() * gridSize)
            };
            // Augmenter légèrement la vitesse

        }

        // Ajouter la nouvelle tête du serpent
        snake.unshift(head);

        // Retirer la dernière partie du serpent si le serpent n'a pas mangé de nourriture
        if (head.x !== food.x || head.y !== food.y) {
            snake.pop();
        }
    }






    restart_button.addEventListener('click', function () {
        window.location.href = '/';
    });

    function clearCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    function checkCollision() {
        const head = snake[0];
        const headBorder = {
            left: head.x * tileSize,
            right: (head.x + 1) * tileSize,
            top: head.y * tileSize,
            bottom: (head.y + 1) * tileSize
        };

        // Vérifier la collision avec les bords de la grille
        if (headBorder.left < 0 || headBorder.right >= canvas.width || headBorder.top < 0 || headBorder.bottom >= canvas.height) {
            return true; // Collision avec les bords de la grille
        }

        // Vérifier la collision avec le corps du serpent
        for (let i = 1; i < snake.length; i++) {
            const segment = snake[i];
            const segmentBorder = {
                left: segment.x * tileSize,
                right: (segment.x + 1) * tileSize,
                top: segment.y * tileSize,
                bottom: (segment.y + 1) * tileSize
            };
            if (headBorder.left < segmentBorder.right &&
                headBorder.right > segmentBorder.left &&
                headBorder.top < segmentBorder.bottom &&
                headBorder.bottom > segmentBorder.top) {
                return true; // Collision avec le corps du serpent
            }
        }

        // Vérifier la collision avec les carrés statiques
        for (let i = 0; i < staticSquares.length; i++) {
            const staticSquare = staticSquares[i];
            const staticSquareBorder = {
                left: staticSquare.x * tileSize,
                right: (staticSquare.x + 1) * tileSize,
                top: staticSquare.y * tileSize,
                bottom: (staticSquare.y + 1) * tileSize
            };
            if (headBorder.left < staticSquareBorder.right &&
                headBorder.right > staticSquareBorder.left &&
                headBorder.top < staticSquareBorder.bottom &&
                headBorder.bottom > staticSquareBorder.top) {
                return true; // Collision avec un carré statique
            }
        }

        return false; // Pas de collision
    }



    function main() {
        if (checkCollision()) {
            Game.style.display = 'none';
            Game_Over.style.display = 'flex';
        }

        clearCanvas();
        drawSnake();
        drawFood();
        moveSnake();
        setTimeout(main, 10);
    }

    document.getElementById("Jouer").addEventListener("click", function () {
        document.getElementById("ecran_accueil").style.display = "none";
        document.getElementById("Game").style.display = "block";
        main();
    });

    let vitesse = 0.05; // Vitesse initiale

    document.addEventListener("keydown", (event) => {
        const key = event.key;
        if (key === "z" && dy === 0) {
            dx = 0;
            dy = -vitesse;
        } else if (key === "s" && dy === 0) {
            dx = 0;
            dy = vitesse;
        } else if (key === "q" && dx === 0) {
            dx = -vitesse;
            dy = 0;
        } else if (key === "d" && dx === 0) {
            dx = vitesse;
            dy = 0;
        }
        else if (key === " ") {
            vitesse = vitesse * 0.9;
        }
    });

    function startTimer() {
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(updateTime, 1000); // Mettre à jour le temps toutes les secondes
    }

    // Fonction pour arrêter le timer
    function stopTimer() {
        clearInterval(timerInterval);
    }

    // Fonction pour mettre à jour le temps
    function updateTime() {
        const elapsedTimeInSeconds = Math.floor((Date.now() - startTime) / 1000);
        Time.textContent = "Temps : " + elapsedTimeInSeconds + "s";
    }

    // Démarrer le timer lorsque le joueur appuie sur une touche pour la première fois
    document.addEventListener("keydown", function () {
        if (!startTime) {
            startTimer();
        }
    });

    // Arrêter le timer lorsque le jeu est terminé ou que la page est rechargée
    window.addEventListener("unload", function () {
        stopTimer();
    });
});

