// Global variables:
var player1;
var player2;
var gameObject;
var player1Choice; 
var player2Choice;

var classicGameArray = ["rock", "paper", "scissors"]
var difficultGameArray = ["rock", "paper", "scissors", "lizard", "alien"]

var rockIcon = '<img src="assets/happy-rocks.png" class="fighter-icon" id="rock">';
var paperIcon = '<img src="assets/happy-paper.png" class="fighter-icon" id="paper">';
var scissorsIcon = '<img src="assets/happy-scissors.png" class="fighter-icon" id="scissors">';
var lizardIcon = '<img src="assets/lizard.png" class="difficult-fighter-icon" id="difficult-lizard">';
var alienIcon = '<img src="assets/happy-alien.png" class="difficult-fighter-icon" id="difficult-alien">';

// DOM Query Selectors 👇
var player1Emoji = document.querySelector(".player-1-emoji");
var player2Emoji = document.querySelector(".player-2-emoji");
var player1Name = document.querySelector(".player1-name");
var player2Name = document.querySelector(".player2-name");
var player1Score = document.querySelector(".player1-score");
var player2Score = document.querySelector(".player2-score");
var classicButton = document.querySelector(".classic-game-button");
var difficultButton = document.querySelector(".difficult-game-button");
var changeGameButton = document.querySelector(".change-game-button");
var chooseGameMessage = document.querySelector("h2.choose-game-message");
var classicButtonContainer = document.querySelector(".classic-icon-container");
var difficultButtonContainer = document.querySelector(".difficult-icon-container");
var chooseGameMode = document.querySelector(".choose-game-mode");
var rockButton = document.querySelector("#rock-button");
var paperButton = document.querySelector("#paper-button");
var scissorsButton = document.querySelector("#scissors-button");
var difficultRockButton = document.querySelector("#difficult-rock-button");
var difficultPaperButton = document.querySelector("#difficult-paper-button");
var difficultScissorsButton = document.querySelector("#difficult-scissors-button");
var lizardButton = document.querySelector("#difficult-lizard-button");
var alienButton = document.querySelector("#difficult-alien-button");
var resultsIcons = document.querySelector(".results-icons");

// Event Listeners 👇
window.addEventListener("load", function () {
    gameObject = createGame();
    updatePlayerInfo();
});
classicButton.addEventListener("click", function () {
    loadClassicGame();
});
difficultButton.addEventListener("click", function(){
    loadDifficultGame();
})
changeGameButton.addEventListener("click", function() {
    loadHomePage();
});
rockButton.addEventListener("click", function() {
    player1ChoosesRock();
});
paperButton.addEventListener("click", function() {
    player1ChoosesPaper();
});
scissorsButton.addEventListener("click", function() {
    player1ChoosesScissors();
});
difficultRockButton.addEventListener("click", function() {
    player1ChoosesRock();
});
difficultPaperButton.addEventListener("click", function() {
    player1ChoosesPaper();
});
difficultScissorsButton.addEventListener("click", function() {
    player1ChoosesScissors();
});
lizardButton.addEventListener("click", function() {
    player1ChoosesDifficultLizard();
});
alienButton.addEventListener("click", function() {
    player1ChoosesDifficultAlien();
});

//Functions 👇
function createGame() {
    player1 = createPlayer("Player 1", "🧝🏼‍♀️", 0);
    player2 = createPlayer("Computer", "💻", 0);
    
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
    player1Name.innerHTML = gameObject.player1.name;
    player2Name.innerHTML = gameObject.player2.name;
    player1Emoji.innerHTML = gameObject.player1.token;
    player2Emoji.innerHTML = gameObject.player2.token;
    player1Score.innerHTML = "Wins: " + gameObject.player1.wins;
    player2Score.innerHTML = "Wins: " + gameObject.player2.wins;
}

function loadClassicGame() {
    chooseGameMessage.innerHTML = "<em>Choose your fighter!</em>"
    chooseGameMode.style.display = "none"
    classicButtonContainer.style.display = "flex"
    gameObject.classicModeActive = true;
    resultsIcons.style.display = "none";
    changeGameButton.style.display = "block";
}

function loadDifficultGame() {
    chooseGameMessage.innerHTML = "<em>Choose your fighter!</em>"
    chooseGameMode.style.display = "none"
    difficultButtonContainer.style.display = "flex"
    gameObject.difficultModeActive = true;
    resultsIcons.style.display = "none";
    changeGameButton.style.display = "block";
}

function loadHomePage() {
    gameObject.classicModeActive = false;
    gameObject.difficultModeActive = false;
    chooseGameMessage.innerHTML = "<em>Choose your game!</em>";
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
        gameObject.player1.wins++
        player1WinsMessage();
        updatePlayerInfo();
       } else if (
        (player1Choice === "rock" && paperAlienCombo) || 
        (player1Choice === "paper" && scissorsLizardCombo) || 
        (player1Choice === "scissors" && rockAlienCombo) || 
        (player1Choice === "lizard" && rockScissorsCombo) || 
        (player1Choice === "alien" && lizardPaperCombo)
       ) {
        gameObject.player2.wins++
        player2WinsMessage();
        updatePlayerInfo();
       }
}
function player1ChoosesRock() {
    player1Choice = "rock" 
    player2Choice = takeTurns();
    determineWinner(player1Choice, player2Choice);

    resultsIcons.innerHTML = rockIcon

    classicButtonContainer.style.display = "none"
    difficultButtonContainer.style.display = "none"
    resultsIcons.style.display = "flex";
    setTimeout(loadCorrectGameMode, 2000);
}

function player1ChoosesPaper() {
    player1Choice = "paper"
    player2Choice = takeTurns();
    determineWinner(player1Choice, player2Choice);

    classicButtonContainer.style.display = "none"
    difficultButtonContainer.style.display = "none"
    resultsIcons.style.display = "flex";
    setTimeout(loadCorrectGameMode, 2000);
}

function player1ChoosesScissors() {
    player1Choice = "scissors"
    player2Choice = takeTurns();
    determineWinner(player1Choice, player2Choice);
        
    classicButtonContainer.style.display = "none"
    difficultButtonContainer.style.display = "none"
    resultsIcons.style.display = "flex";
    setTimeout(loadCorrectGameMode, 2000);
}

function player1ChoosesDifficultLizard() {
    player1Choice = "lizard"
    player2Choice = takeTurns();
    determineWinner(player1Choice, player2Choice);

    classicButtonContainer.style.display = "none"
    difficultButtonContainer.style.display = "none"
    resultsIcons.style.display = "flex";
    setTimeout(loadCorrectGameMode, 2000);
}

function player1ChoosesDifficultAlien() {
    player1Choice = "alien"
    player2Choice = takeTurns();
    determineWinner(player1Choice, player2Choice);

    classicButtonContainer.style.display = "none"
    difficultButtonContainer.style.display = "none"
    resultsIcons.style.display = "flex";
    setTimeout(loadCorrectGameMode, 2000);
}

function getRandomIndex(iconsArray) {
    var randomIndexNumber = Math.floor(Math.random() * iconsArray.length);
    return iconsArray[randomIndexNumber];
}

function calculateDraw(choice) {
        chooseGameMessage.innerHTML = `😅It's a draw!😅`
        if (player1Choice === "rock") {
            resultsIcons.innerHTML = rockIcon + rockIcon
        } else if (player1Choice === "paper") {
            resultsIcons.innerHTML = paperIcon + paperIcon
        } else if (player1Choice === "scissors") {
            resultsIcons.innerHTML = scissorsIcon + scissorsIcon
        } else if (player1Choice === "lizard") {
            resultsIcons.innerHTML = lizardIcon + lizardIcon
        } else if (player1Choice === "alien") {
            resultsIcons.innerHTML = alienIcon + alienIcon
        }
    }
