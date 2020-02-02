let cards = document.querySelectorAll(".memory-card");
const resetBtn = document.querySelector(".reset");

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
var countClicks = 0;
let countPairs = 0;
var moves = document.querySelector(".moves");

function flipCard() {
  countClicks++;
  moves.innerHTML = countClicks;
  if (countClicks == 1) startTimer();
  if (lockBoard) return;
  if (this === firstCard) return;
  this.classList.toggle("flip");

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

(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();

// Game timer

var second = 0,
  minute = 0;
var timer = document.querySelector(".timer");
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
  if (countPairs == 6) {
    countClicks = 0;
    second = 0;
    minute = 0;
    moves.innerHTML = 0;
    window.clearInterval(interval);
    timer.innerHTML = "0 mins 0 secs";
    cards.forEach(card => card.classList.toggle("flip"));
    cards.forEach(card => card.addEventListener("click", flipCard));
    countPairs = 0;
  }
}

cards.forEach(card => card.addEventListener("click", flipCard));
resetBtn.addEventListener("click", reset);
