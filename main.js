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
var classicButton = document.querySelector(".classic-game-button");
var difficultButton = document.querySelector(".difficult-game-button");
var changeGameButton = document.querySelector(".change-game-button");

var chooseGameMessage = document.querySelector("h2.choose-game-message");
var chooseGameMode = document.querySelector(".choose-game-mode");
var classicButtonContainer = document.querySelector(".classic-icon-container");
var difficultButtonContainer = document.querySelector(".difficult-icon-container");


var player1Emoji = document.querySelector(".player-1-emoji");
var player2Emoji = document.querySelector(".player-2-emoji");
var player1Name = document.querySelector(".player1-name");
var player2Name = document.querySelector(".player2-name");
var player1Score = document.querySelector(".player1-score");
var player2Score = document.querySelector(".player2-score");

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
    player2 = createPlayer("Player 2", "💻", 0);
    
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

function player2Selection() {
    if (gameObject.classicModeActive === true) {
        player2Choice = getRandomIndex(classicGameArray);
    } else if (gameObject.difficultModeActive === true) {
        player2Choice = getRandomIndex(difficultGameArray);
    }
    return player2Choice;
}

function player1ChoosesRock() {
    player1Choice = "rock"
    player2Choice = player2Selection();
    if (player2Choice === "paper") {
        chooseGameMessage.innerHTML = `${gameObject.player2.token}${gameObject.player2.name} wins this round!${gameObject.player2.token}`;
        resultsIcons.innerHTML = rockIcon + paperIcon; 
        gameObject.player2.wins++
        updatePlayerInfo();       
    } else if (player2Choice === "scissors") {
        chooseGameMessage.innerHTML = `${gameObject.player1.token}${gameObject.player1.name} wins this round!${gameObject.player1.token}`;
        resultsIcons.innerHTML = rockIcon + scissorsIcon;
        gameObject.player1.wins++
        updatePlayerInfo();     
    } else if (player2Choice === "lizard") {
       chooseGameMessage.innerHTML = `${gameObject.player1.token}${gameObject.player1.name} wins this round!${gameObject.player1.token}`;
       resultsIcons.innerHTML = rockIcon + lizardIcon;
       gameObject.player1.wins++
       updatePlayerInfo();
    } else if (player2Choice === "alien") {
        chooseGameMessage.innerHTML = `${gameObject.player2.token}${gameObject.player2.name} wins this round!${gameObject.player2.token}`;
        resultsIcons.innerHTML = rockIcon + alienIcon;
        gameObject.player2.wins++
        updatePlayerInfo();
    } else {
        calculateDraw(player1Choice);
    }
    classicButtonContainer.style.display = "none"
    difficultButtonContainer.style.display = "none"
    resultsIcons.style.display = "flex";
    setTimeout(loadClassicGame, 2000);
}

function player1ChoosesPaper() {
    player1Choice = "paper"
    player2Choice = player2Selection();
    if (player2Choice === "rock") {
        chooseGameMessage.innerHTML  = `${gameObject.player1.token}${gameObject.player1.name} wins this round!${gameObject.player1.token}`;
        resultsIcons.innerHTML = paperIcon + rockIcon;
        gameObject.player1.wins++
        updatePlayerInfo();
    } else if (player2Choice === "scissors") {
        chooseGameMessage.innerHTML  = `${gameObject.player2.token}${gameObject.player2.name} wins this round!${gameObject.player2.token}`;
        resultsIcons.innerHTML = paperIcon + scissorsIcon;
        gameObject.player2.wins++
        updatePlayerInfo();
    } else if (player2Choice === "lizard") {
        chooseGameMessage.innerHTML = `${gameObject.player2.token}${gameObject.player2.name} wins this round!${gameObject.player2.token}`;
        resultsIcons.innerHTML = paperIcon + lizardIcon;
        gameObject.player2.wins++
        updatePlayerInfo();
     } else if (player2Choice === "alien") {
         chooseGameMessage.innerHTML = `${gameObject.player1.token}${gameObject.player1.name} wins this round!${gameObject.player1.token}`;
         resultsIcons.innerHTML = paperIcon + alienIcon;
         gameObject.player1.wins++
         updatePlayerInfo();
     } else {
        calculateDraw(player1Choice);
    }
    classicButtonContainer.style.display = "none"
    difficultButtonContainer.style.display = "none"
    resultsIcons.style.display = "flex";
    setTimeout(loadClassicGame, 2000);
}

function player1ChoosesScissors() {
        player1Choice = "scissors"
        player2Choice = player2Selection();
        if (player2Choice === "rock") {
            chooseGameMessage.innerHTML  = `${gameObject.player2.token}${gameObject.player2.name} wins this round!${gameObject.player2.token}`;
            resultsIcons.innerHTML = scissorsIcon + rockIcon;
            gameObject.player2.wins++
            updatePlayerInfo();
        } else if (player2Choice === "paper") {
            chooseGameMessage.innerHTML  = `${gameObject.player1.token}${gameObject.player1.name} wins this round!${gameObject.player1.token}`;
            resultsIcons.innerHTML = scissorsIcon + paperIcon;
            gameObject.player1.wins++
            updatePlayerInfo();
        } else if (player2Choice === "lizard") {
            chooseGameMessage.innerHTML = `${gameObject.player1.token}${gameObject.player1.name} wins this round!${gameObject.player1.token}`;
            resultsIcons.innerHTML = scissorsIcon + lizardIcon;
            gameObject.player1.wins++
            updatePlayerInfo();
         } else if (player2Choice === "alien") {
             chooseGameMessage.innerHTML = `${gameObject.player2.token}${gameObject.player2.name} wins this round!${gameObject.player2.token}`;
             resultsIcons.innerHTML = scissorsIcon + alienIcon;
             gameObject.player2.wins++
             updatePlayerInfo(); 
         } else {
            calculateDraw(player1Choice);
        }
        classicButtonContainer.style.display = "none"
        difficultButtonContainer.style.display = "none"
        resultsIcons.style.display = "flex";
        setTimeout(loadClassicGame, 2000);
    }

    function player1ChoosesDifficultLizard() {
        player1Choice = "lizard"
        player2Choice = player2Selection();
        if (player2Choice === "rock") {
            chooseGameMessage.innerHTML = `${gameObject.player2.token}${gameObject.player2.name} wins this round!${gameObject.player2.token}`;
            resultsIcons.innerHTML = lizardIcon + rockIcon;
            gameObject.player2.wins++
            updatePlayerInfo();
        } else if (player2Choice === "paper") {
            chooseGameMessage.innerHTML  = `${gameObject.player1.token}${gameObject.player1.name} wins this round!${gameObject.player1.token}`;
            resultsIcons.innerHTML = lizardIcon + paperIcon;
            gameObject.player1.wins++
            updatePlayerInfo();
        } else if (player2Choice === "scissors") {
            chooseGameMessage.innerHTML  = `${gameObject.player2.token}${gameObject.player2.name} wins this round!${gameObject.player2.token}`;
            resultsIcons.innerHTML = lizardIcon + scissorsIcon;
            gameObject.player2.wins++
            updatePlayerInfo();
        } else {
            calculateDraw(player1Choice);
        }
        classicButtonContainer.style.display = "none"
        difficultButtonContainer.style.display = "none"
        resultsIcons.style.display = "flex";
        setTimeout(loadClassicGame, 2000);
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
        }
    }



