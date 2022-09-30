(function(){

    /////////////////////////////////////////////////////////////////////////////////////////////////
    //VARIABLE DECLARATION
    /////////////////////////////////////////////////////////////////////////////////////////////////
    
    "use strict";

    const 
        startBtn = document.getElementById("pickFirstPlayer"),
        diceResultText = document.getElementById("diceResultText"),
        diceResultDiv = document.getElementById("diceResultDiv"),
        endGameBtn = document.getElementById("endGame"),
        rollDiceBtn = document.getElementById("rollDice"),
        passTurn = document.getElementById("passTurn"),
        scorePlayer1 = document.getElementById("scorePlayer1"),
        scorePlayer2 = document.getElementById("scorePlayer2"),
        winnerResult = document.getElementById("winnerResult"),
        playerTurnIndicator = document.getElementById("playerTurnIndicator");

    let 
        gameOn = false,
        playerTurn = 1;
    
    const 
        P1 = { name: "p1", score: 0 },
        P2 = { name: "p2", score: 0 };
    

    /////////////////////////////////////////////////////////////////////////////////////////////////
    //FUNCTIONS
    /////////////////////////////////////////////////////////////////////////////////////////////////
    
    const newRandomRoll = () => {
        return Math.floor(Math.random() * 6) + 1
    }

    const rollDice = () => {
        return [newRandomRoll(), newRandomRoll()]
    }

    const pickFirstPlayer = () => {
        return Math.floor(Math.random() * 2) + 1;
    }

    const switchTurn = () => {
        playerTurn === 1 ? playerTurn = 2 : playerTurn = 1;
        playerTurnIndicator.innerHTML = `It's now player ${playerTurn}'s turn`;
    }

    const removeResult = () => {
        diceResultDiv.innerHTML = "";
        diceResultText.innerHTML = "";
        playerTurnIndicator.innerHTML = "";
    }

    const contentUpdateOnGameEnd = () => {
        if (!gameOn) {
            removeResult();
            endGameBtn.classList.remove("hidden");
            startBtn.classList.remove("hidden");
            rollDiceBtn.classList.add("hidden");
            passTurn.classList.add("hidden");
            resetScores();
        }
    }

    const contentUpdateOnGameStart = () => {
        winnerResult.innerHTML = "";
        playerTurnIndicator.innerHTML = `It's Player ${playerTurn}'s turn`;
        startBtn.classList.add("hidden");
        endGameBtn.classList.remove("hidden");
        rollDiceBtn.classList.remove("hidden");
        passTurn.classList.remove("hidden");
        gameOn = true;
    }

    const stopGame = () => {
        gameOn = false;
        contentUpdateOnGameEnd();
    }

    const resetScores = () => {
        P1.score = 0;
        P2.score = 0;
    }

    const evaluateScores = () => {
        if (P1.score >= 30) {
            winnerResult.innerHTML = `Player One Wins! Score: ${P1.score}`;
            gameOn = false;
        } else if (P2.score >= 30) {
            winnerResult.innerHTML = `Player Two Wins! Score: ${P2.score}`;
            gameOn = false;
        } else {
            gameOn = true;
        }
        contentUpdateOnGameEnd();
    }

    const updateScore = () => {
        scorePlayer1.innerHTML = P1.score;
        scorePlayer2.innerHTML = P2.score;
    }

    const insertDiceImg = (arr) => {
        diceResultDiv.innerHTML = `<img src="./imgs/Alea_${arr[0]}.png" alt="Dice ${arr[0]}">
        <img src="./imgs/Alea_${arr[1]}.png" alt="Dice ${arr[1]}">`
    }

    const evaluateRolls = (player, arr) => {
        if (arr.every(elem => elem === 1)) {
            player.score = 0;
            diceResultText.innerHTML = `SNAKE EYES: ${arr.join(" + ")}`
            switchTurn();
        } else if(arr.some(elem => elem === 1)) {
            player.score += arr.reduce((a,b) => a+b,0);
            diceResultText.innerHTML = `CONTAINS A ONE: ${arr.join(" + ")}`
            switchTurn();
        } else {
            player.score += arr.reduce((a,b) => a+b,0);
            diceResultText.innerHTML = `NICE: ${arr.join(" + ")}`
        }
        insertDiceImg(arr);
        updateScore();
        evaluateScores();
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////
    //EVENT LISTENERS
    /////////////////////////////////////////////////////////////////////////////////////////////////
    
    startBtn.addEventListener("click", () => {
        playerTurn = pickFirstPlayer();
        updateScore();
        contentUpdateOnGameStart();
    });

    rollDiceBtn.addEventListener("click", () => {
        let thisRoll = rollDice();
        let currentTurn;
        playerTurn === 1 ? currentTurn = P1 : currentTurn = P2;
        evaluateRolls(currentTurn, thisRoll);
    });

    passTurn.addEventListener("click", switchTurn);

    endGameBtn.addEventListener("click", () => {
        playerTurnIndicator.innerHTML = "You stopped the game!";
        resetScores();
        stopGame();
        updateScore();
    });

})()

