const Score = document.querySelector("#Score")
const HighScore = document.querySelector("#Score")
const Time = document.querySelector("#Time")

let GameOver = false;
let velocityX = 0, velocityY = 0;
let score = 0;


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
});

function draw() {
    const canvas = document.getElementById("Screen");
    if (canvas.getContext) {
        const snake = canvas.getContext("2d");

        snake.fillStyle = "green";
        snake.fillRect(250, 250, 50, 50);

    }
}

