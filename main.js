// Global variables:

var player1;
var player2;
var gameObject;

// DOM Query Selectors 👇
var classicButtonContainer = document.querySelector(".classic-button");
var difficultButtonContainer = document.querySelector("difficult-button")

var player1Emoji = document.querySelector(".player-1-emoji")
var player2Emoji = document.querySelector(".player-2-emoji")
var player1Name = document.querySelector(".player1-name")
var player2Name = document.querySelector(".player2-name")
var player1Score = document.querySelector(".player1-score")
var player2Score = document.querySelector(".player2-score")

// Event Listeners 👇
window.addEventListener("load", function () {
    gameObject = createGame();
});

//Functions 👇
function createGame() {
    player1 = createPlayer("player1", "👩🏻", 0);
    player2 = createPlayer("player2", "💻", 0);

    var game = {
        player1: player1,
        player2: player2
    }
    return game;
}

function createPlayer(name, token, wins) {
    var player = {
        name: name,
        token: token, 
        wins: wins
    }
    return player;
}




