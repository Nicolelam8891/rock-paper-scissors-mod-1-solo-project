// Global variables 👇
var classicGameArray = ["rock", "paper", "scissors"];
var difficultGameArray = ["rock", "paper", "scissors", "lizard", "alien"];

var iconLocations = {
    rock: 'assets/happy-rocks.png',
    paper: 'assets/happy-paper.png',
    scissors: 'assets/happy-scissors.png',
    lizard: 'assets/lizard.png',
    alien: 'assets/happy-alien.png'
}

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
        gameObject.classicModeActive = true;
        loadGame();
    } else if (e.target.classList.contains("difficult-game-button")) {
        gameObject.difficultModeActive = true;
        loadGame();  
    }
});

classicButtonContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("fighter-icon")) {
        choice = e.target.id
        icon = e.target.outerHTML
        player1Chooses(choice, icon);
     }
});

difficultButtonContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("difficult-fighter-icon")) {
        choice = e.target.id
        icon = e.target.outerHTML
        player1Chooses(choice, icon);
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

function loadGame() {
    if (gameObject.classicModeActive === true){
        classicButtonContainer.style.display = "flex";
    } else if (gameObject.difficultModeActive === true){
        difficultButtonContainer.style.display = "flex";
    }
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

    if (player1Choice.includes(player2Choice)) {
        calculateDraw();
    } else if (
        (player1Choice.includes("rock") && scissorsLizardCombo) ||
        (player1Choice.includes("paper") && rockAlienCombo) ||
        (player1Choice.includes("scissors") && paperLizardCombo) ||
        (player1Choice.includes("lizard") && paperAlienCombo) ||
        (player1Choice.includes("alien") && scissorsRockCombo) 
       ) {
        gameObject.player1.wins++;
        player1WinsMessage();
        updatePlayerInfo();
       } else {
        gameObject.player2.wins++;
        player2WinsMessage();
        updatePlayerInfo();
       }
}

function endsRound() {
    classicButtonContainer.style.display = "none";
    difficultButtonContainer.style.display = "none";
    resultsIcons.style.display = "flex";
    setTimeout(loadGame, 2000);
}

function displayIcons(player1Icon, player2Icon) {
    resultsIcons.innerHTML = player1Icon + player2Icon;
}

function player1Chooses(player1Choice, player1Icon) {
    var player2Choice = takeTurns();
    determineWinner(player1Choice, player2Choice);
    var computerIcon = getComputerIcon(player2Choice);
    displayIcons(player1Icon, computerIcon)
    endsRound();
}

function getRandomIndex(iconsArray) {
    var randomIndexNumber = Math.floor(Math.random() * iconsArray.length);
    return iconsArray[randomIndexNumber];
}

function getComputerIcon(computerChoice) {
    var computerIconURL = iconLocations[computerChoice];
    var computerIcon = `<img src="${computerIconURL}" class="fighter-icon" id="${computerChoice}">`
    return computerIcon;
}
