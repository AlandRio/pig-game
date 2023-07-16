"use strict";

let player1 = {
  score: 0,
  currentScore: 0,
  active: true,
};
let player2 = {
  score: 0,
  currentScore: 0,
  active: false,
};

let diceRoll = 0;
let playing = true;

const dice = document.querySelector(".dice");
const playerGround1 = document.querySelector(".playerground.one");
const playerGround2 = document.querySelector(".playerground.two");
const currentScore1 = document.querySelector(".current-score.one");
const currentScore2 = document.querySelector(".current-score.two");

document.querySelector(".roll-dice").addEventListener("click", function () {
  diceRoll = Math.trunc(Math.random() * 6) + 1;
  dice.src = `dice/dice-${diceRoll}.png`;
  dice.classList.remove("hidden");
  if (diceRoll > 1 && playing) {
    console.log(`The dice roll is: ${diceRoll}`);
    if (player1.active) {
      player1.currentScore += diceRoll;
      console.log(`Player 1 current score is ${player1.currentScore}`);
      currentScore1.textContent = player1.currentScore;
    } else if (player2.active) {
      player2.currentScore += diceRoll;
      console.log(`Player 2 current score is ${player2.currentScore}`);
      currentScore2.textContent = player2.currentScore;
    }
  } else {
    if (player1.active && playing) {
      console.log(`Player 1 has lost their streak.`);
      player1.currentScore = 0;
      currentScore1.textContent = 0;
      playerGround1.classList.remove("active");
      playerGround2.classList.add("active");
      player1.active = false;
      player2.active = true;
    } else if (player2.active && playing) {
      console.log(`Player 2 has lost their streak.`);
      player2.currentScore = 0;
      currentScore2.textContent = 0;
      playerGround2.classList.remove("active");
      playerGround1.classList.add("active");
      player2.active = false;
      player1.active = true;
    } else console.log("Both player 1 and 2 are inactive");
  }
});

document.querySelector(".hold").addEventListener("click", function () {
  if (player1.active && playing) {
    player1.score += player1.currentScore;
    player1.currentScore = 0;
    currentScore1.textContent = 0;
    document.querySelector(".score.one").textContent = player1.score;
    if (player1.score >= 100) {
      playing = false;
      playerGround1.style.backgroundColor = "green";
      playerGround2.style.backgroundColor = "darkred";
      document.querySelector(".player-label.one").textContent = "Winner!";
      document.querySelector(".player-label.two").textContent = "Loser!";
    } else {
      player1.active = false;
      player2.active = true;
      playerGround1.classList.remove("active");
      playerGround2.classList.add("active");
    }
  } else if (player2.active && playing) {
    player2.score += player2.currentScore;
    player2.currentScore = 0;
    currentScore2.textContent = 0;
    document.querySelector(".score.two").textContent = player2.score;
    if (player2.score >= 100) {
      playing = false;
      playerGround2.style.backgroundColor = "green";
      playerGround1.style.backgroundColor = "darkred";
      document.querySelector(".player-label.two").textContent = "Winner!";
      document.querySelector(".player-label.one").textContent = "Loser!";
    } else {
      player2.active = false;
      player1.active = true;
      playerGround2.classList.remove("active");
      playerGround1.classList.add("active");
    }
  } else console.log("Both player 1 and 2 are inactive");
});

document.querySelector(".new-game").addEventListener("click", function () {
  playerGround1.style.backgroundColor = "rgb(227, 234, 235)";
  playerGround2.style.backgroundColor = "rgb(227, 234, 235)";
  player1.score = 0;
  player2.score = 0;
  player1.currentScore = 0;
  player2.currentScore = 0;
  document.querySelector(".score.one").textContent = 0;
  document.querySelector(".score.two").textContent = 0;
  document.querySelector(".dice").classList.add("hidden");
  document.querySelector(".player-label.one").textContent = "Player 1";
  document.querySelector(".player-label.two").textContent = "Player 2";
  playing = true;
  player1.active = true;
  player2.active = false;
  playerGround1.classList.add("active");
  playerGround2.classList.remove("active");
});

document.querySelector(".help-open").addEventListener("click", function () {
  document.querySelector(".help-block").classList.remove("hidden-complete");
});

document.querySelector(".help-close").addEventListener("click", function () {
  document.querySelector(".help-block").classList.add("hidden-complete");
});
