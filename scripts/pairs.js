let cards = document.querySelectorAll(".memory-card");
const resetBtn = document.querySelector(".reset");

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
var countClicks = 0;
let countPairs = 0;
var moves = document.querySelector(".moves");
var firstTimeClick = 0; // variable to control the trigger of timer, decoupled from countClicks
var timer = document.querySelector(".timer");
timer.innerHTML = "0 mins 0 secs";
moves.innerHTML = "0";

//  Just Javascript exercises
// console.log(typeof lockBoard);
// console.log(typeof cards);
// console.log(typeof resetBtn);
// console.log(typeof countClicks);

//

function flipCard() {
  firstTimeClick++;
  console.log(firstTimeClick);
  if (firstTimeClick === 1) startTimer();
  if (lockBoard) return;
  if (this === firstCard) return;
  this.classList.toggle("flip");
  countClicks++;
  moves.innerHTML = countClicks;

  if (!hasFlippedCard) {
    // first click
    hasFlippedCard = true;
    firstCard = this;
    return;
  }
  hasFlippedCard = false;
  secondCard = this;
  // do cards match?
  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  countPairs++;
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);

  resetBoard();
}

function unflipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");

    resetBoard();
  }, 1500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
}

// Game timer

var second = 0,
  minute = 0;

var interval;
function startTimer() {
  interval = setInterval(function() {
    let allFlipped = document.querySelectorAll(".flip");
    if (allFlipped.length == 12) return;
    timer.innerHTML = " " + minute + " mins " + second + " secs";
    second++;
    if (second == 60) {
      minute++;
      second = 0;
    }
    if (minute == 60) {
      hour++;
      minute = 0;
    }
  }, 1000);
}

function reset() {
  // if (countPairs == 6) {
  firstTimeClick = 0;
  countClicks = 0;
  second = 0;
  minute = 0;
  moves.innerHTML = 0;
  window.clearInterval(interval);
  timer.innerHTML = "0 mins 0 secs";
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
  cards.forEach(card => {
    if (card.classList.contains("flip")) card.classList.toggle("flip");
  });

  cards.forEach(card => card.addEventListener("click", flipCard));

  countPairs = 0;
  shuffle();
  // }
}

cards.forEach(card => card.addEventListener("click", flipCard));
resetBtn.addEventListener("click", reset);
shuffle();
