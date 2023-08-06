// Global variables:

var player1;
var player2;
var gameObject;

// DOM Query Selectors 👇
var classicButton = document.querySelector(".classic-game-button");
var difficultButton = document.querySelector(".difficult-game-button");

var chooseGameMessage = document.querySelector("h2.choose-game-message");
var chooseGameMode = document.querySelector(".choose-game-mode");
var classicButtonContainer = document.querySelector(".classic-icon-container")

var player1Emoji = document.querySelector(".player-1-emoji")
var player2Emoji = document.querySelector(".player-2-emoji")
var player1Name = document.querySelector(".player1-name")
var player2Name = document.querySelector(".player2-name")
var player1Score = document.querySelector(".player1-score")
var player2Score = document.querySelector(".player2-score")

var rockButton = document.querySelector(".rock-button")
var paperButton = document.querySelector(".paper-button")
var scissorsButton = document.querySelector(".scissors-button")

// Event Listeners 👇
window.addEventListener("load", function () {
    gameObject = createGame();
    updatePlayerInfo();
});

classicButton.addEventListener("click", function () {
    loadClassicGame()
});



console.log("gameObject", gameObject)
console.log("gameObject.player1", player1)
console.log("gameObject.player2", player2)

//Functions 👇
function createGame() {
    player1 = createPlayer("player1", "👩🏻", 5);
    player2 = createPlayer("player2", "💻", 6);

    var game = {
        player1: player1,
        player2: player2,
        classicModeActive: false,
        difficultModeActive: false
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

function updatePlayerInfo() {
    player1Score.innerHTML = "Wins: " + gameObject.player1.wins;
    player2Score.innerHTML = "Wins: " + gameObject.player2.wins;

    player1Emoji.innerHTML = gameObject.player1.token;
    player2Emoji.innerHTML = gameObject.player2.token;

    player1Name.innerHTML = gameObject.player1.name;
    player2Name.innerHTML = gameObject.player2.name;
}

function loadClassicGame() {
    chooseGameMessage.innerText = "Choose your fighter!"
    chooseGameMode.style.display = "none"
    classicButtonContainer.style.display = "block"
}




