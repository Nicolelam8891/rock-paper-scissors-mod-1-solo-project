// Global variables 👇
var classicGameArray = ["rock", "paper", "scissors"];
var difficultGameArray = ["rock", "paper", "scissors", "lizard", "alien"];

var rockIcon = '<img src="assets/happy-rocks.png" class="fighter-icon" id="rock">';
var paperIcon = '<img src="assets/happy-paper.png" class="fighter-icon" id="paper">';
var scissorsIcon = '<img src="assets/happy-scissors.png" class="fighter-icon" id="scissors">';
var lizardIcon = '<img src="assets/lizard.png" class="difficult-fighter-icon" id="difficult-lizard">';
var alienIcon = '<img src="assets/happy-alien.png" class="difficult-fighter-icon" id="difficult-alien">';

// DOM Query Selectors 👇
var changeGameButton = document.querySelector(".change-game-button");
var chooseGameMode = document.querySelector(".choose-game-mode");
var chooseGameMessage = document.querySelector("h2.choose-game-message");
var classicButtonContainer = document.querySelector(".classic-icon-container");
var difficultButtonContainer = document.querySelector(".difficult-icon-container");
var resultsIcons = document.querySelector(".results-icons");

// Event Listeners 👇
window.addEventListener("load", function () {
    gameObject = createGame();
    updatePlayerInfo();
}); 

chooseGameMode.addEventListener("click", function (e) {
    if (e.target.classList.contains("classic-game-button")) {
        loadClassicGame();
    } else if (e.target.classList.contains("difficult-game-button")) {
        loadDifficultGame();    
    }
});

classicButtonContainer.addEventListener("click", function (e) {
    if (e.target.id === "rock" || e.target.id === "rock-button") {
        player1ChoosesRock();
    } else if (e.target.id === "paper" || e.target.id === "paper-button") {
        player1ChoosesPaper();
    } else if (e.target.id === "scissors" || e.target.id === "scissors-button") {
        player1ChoosesScissors();
    }
});

difficultButtonContainer.addEventListener("click", function (e) {
    if (e.target.id === "difficult-rock-button" || e.target.id === "difficult-rock") {
        player1ChoosesRock();
    } else if (e.target.id === "difficult-paper-button" || e.target.id === "difficult-paper") {
        player1ChoosesPaper();
    } else if (e.target.id === "difficult-scissors-button" || e.target.id === "difficult-scissors") {
        player1ChoosesScissors();
    } else if (e.target.id === "difficult-lizard-button" || e.target.id === "difficult-lizard") {
        player1ChoosesDifficultLizard();
    } else if (e.target.id === "difficult-alien-button" || e.target.id === "difficult-alien") {
        player1ChoosesDifficultAlien();
    }
});

changeGameButton.addEventListener("click", function() {
    resetGame();
});

//Functions 👇
function createGame() {
    var player1 = createPlayer("Human", "🧝🏼‍♀️", 0);
    var player2 = createPlayer("Computer", "💻", 0);
    
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
    var player1Emoji = document.querySelector(".player-1-emoji");
    var player2Emoji = document.querySelector(".player-2-emoji");
    var player1Name = document.querySelector(".player1-name");
    var player2Name = document.querySelector(".player2-name");
    var player1Score = document.querySelector(".player1-score");
    var player2Score = document.querySelector(".player2-score");
    player1Name.innerHTML = gameObject.player1.name;
    player2Name.innerHTML = gameObject.player2.name;
    player1Emoji.innerHTML = gameObject.player1.token;
    player2Emoji.innerHTML = gameObject.player2.token;
    player1Score.innerHTML = "Wins: " + gameObject.player1.wins;
    player2Score.innerHTML = "Wins: " + gameObject.player2.wins;
}

function startRound() {
    chooseGameMessage.innerHTML = "<em>Choose your fighter!</em>";
    chooseGameMode.style.display = "none";
    resultsIcons.style.display = "none";
    changeGameButton.style.display = "block";
}

function loadClassicGame() {
    classicButtonContainer.style.display = "flex";
    gameObject.classicModeActive = true;
    startRound();
}

function loadDifficultGame() {
    difficultButtonContainer.style.display = "flex";
    gameObject.difficultModeActive = true;
    startRound();
}

function resetGame() {
    chooseGameMessage.innerHTML = "<em>Choose your game!</em>";
    gameObject.classicModeActive = false;
    gameObject.difficultModeActive = false;
    chooseGameMode.style.display = "block";
    classicButtonContainer.style.display = "none";
    difficultButtonContainer.style.display = "none";
    resultsIcons.style.display = "none";
    changeGameButton.style.display = "none";
}

function loadCorrectGameMode() {
    if (gameObject.classicModeActive === true) {
        loadClassicGame();
    } else if (gameObject.difficultModeActive === true) {
        loadDifficultGame();
    }
}

function takeTurns() {
    if (gameObject.classicModeActive === true) {
        player2Choice = getRandomIndex(classicGameArray);
    } else if (gameObject.difficultModeActive === true) {
        player2Choice = getRandomIndex(difficultGameArray);
    }
    return player2Choice;
}

function player2WinsMessage() {
    chooseGameMessage.innerHTML = `${gameObject.player2.token}${gameObject.player2.name} wins this round!${gameObject.player2.token}`;
}

function player1WinsMessage() {
    chooseGameMessage.innerHTML = `${gameObject.player1.token}${gameObject.player1.name} wins this round!${gameObject.player1.token}`;
}

function calculateDraw() {
    chooseGameMessage.innerHTML = `😅It's a draw!😅`;
}

function determineWinner(player1Choice, player2Choice) {
    var scissorsLizardCombo =  (player2Choice === "scissors" || player2Choice === "lizard");
    var rockAlienCombo = (player2Choice === "rock" || player2Choice === "alien");
    var paperLizardCombo = (player2Choice === "paper" || player2Choice === "lizard");
    var paperAlienCombo = (player2Choice === "paper" || player2Choice === "alien");
    var scissorsRockCombo = (player2Choice === "scissors" || player2Choice === "rock");

    if (player1Choice === player2Choice) {
        calculateDraw();
    } else if (
        (player1Choice === "rock" && scissorsLizardCombo) ||
        (player1Choice === "paper" && rockAlienCombo) ||
        (player1Choice === "scissors" && paperLizardCombo) ||
        (player1Choice === "lizard" && paperAlienCombo) ||
        (player1Choice === "alien" && scissorsRockCombo) 
       ) {
        gameObject.player1.wins++;
        player1WinsMessage();
        updatePlayerInfo();
       } else if (
        (player1Choice === "rock" && paperAlienCombo) || 
        (player1Choice === "paper" && scissorsLizardCombo) || 
        (player1Choice === "scissors" && rockAlienCombo) || 
        (player1Choice === "lizard" && scissorsRockCombo) || 
        (player1Choice === "alien" && paperLizardCombo)
       ) {
        gameObject.player2.wins++;
        player2WinsMessage();
        updatePlayerInfo();
       }
}

function endsRound() {
    classicButtonContainer.style.display = "none";
    difficultButtonContainer.style.display = "none";
    resultsIcons.style.display = "flex";
    setTimeout(loadCorrectGameMode, 2000);
}

function player1ChoosesRock() {
    var player1Choice = "rock";
    var player2Choice = takeTurns();
    determineWinner(player1Choice, player2Choice);
    var computerIcon = getComputerIcon(player2Choice);
    resultsIcons.innerHTML = rockIcon + computerIcon;
    endsRound();
}

function player1ChoosesPaper() {
    var player1Choice = "paper";
    var player2Choice = takeTurns();
    determineWinner(player1Choice, player2Choice);
    var computerIcon = getComputerIcon(player2Choice);
    resultsIcons.innerHTML = paperIcon + computerIcon;
    endsRound();
}

function player1ChoosesScissors() {
    var player1Choice = "scissors";
    var player2Choice = takeTurns();
    determineWinner(player1Choice, player2Choice);
    var computerIcon = getComputerIcon(player2Choice);
    resultsIcons.innerHTML = scissorsIcon + computerIcon;    
    endsRound();
}

function player1ChoosesDifficultLizard() {
    var player1Choice = "lizard";
    var player2Choice = takeTurns();
    determineWinner(player1Choice, player2Choice);
    var computerIcon = getComputerIcon(player2Choice);
    resultsIcons.innerHTML = lizardIcon + computerIcon;
    endsRound();
}

function player1ChoosesDifficultAlien() {
    var player1Choice = "alien";
    var player2Choice = takeTurns();
    determineWinner(player1Choice, player2Choice);
    var computerIcon = getComputerIcon(player2Choice);
    resultsIcons.innerHTML = alienIcon + computerIcon;
    endsRound();
}

function getRandomIndex(iconsArray) {
    var randomIndexNumber = Math.floor(Math.random() * iconsArray.length);
    return iconsArray[randomIndexNumber];
}

function getComputerIcon(computerChoice) {
    var computerIcon = '';
    if (computerChoice === "rock") {
       computerIcon = rockIcon;
    } else if (computerChoice === "paper") {
       computerIcon = paperIcon; 
    } else if (computerChoice === "scissors") {
        computerIcon = scissorsIcon; 
    } else if (computerChoice === "lizard") {
       computerIcon = lizardIcon;
    } else if (computerChoice === "alien") {
        computerIcon = alienIcon;
    }
    return computerIcon;
}