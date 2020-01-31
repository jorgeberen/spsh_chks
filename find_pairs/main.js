function listen() {
  console.log("running");
  let cards1 = document.querySelectorAll("item");
  // let cards2 = document.querySelectorAll("item1");

  let array1 = Object.entries(cards1);
  // let array2 = Object.entries(cards2);

  array1.map(object => {
    object[1].addEventListener("click", function() {
      object[1].classList.toggle("show");
      object[1].classList.toggle("disabled");
    });
  });
}

function shuffle(array) {
  var currentIndex = array.length,
    tempValue,
    randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    tempValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = tempValue;
  }
  return array;
}

const deck = document.querySelector(".deck");
function startGame() {
  var shuffledCards = shuffle(cards);
  for (var i = 0; i < shuffledCards.length; i++) {
    [].forEach.call(shuffledCards, function(item) {
      deck.appendChild(item);
    });
  }
}

window.onload = startGame();
// var displayCard = function(param) {
//   // object[1].classList.toggle("open");
//   param.classList.toggle("show");
//   param.classList.toggle("disabled");
// };

listen();

// function esto() {
//   let cards1 = document.querySelectorAll("item");
//   let cards2 = document.querySelectorAll("item1");
//   let array1 = Object.entries(cards1);
//   let array2 = Object.entries(cards2);
// }

// esto();
// array2.map(object => {
//   object[1].addEventListener("click", function() {
//     object[1].classList.toggle("hide");
//     comp2 = object[1];
//     if (comp1.innerHTML == comp2.innerHTML) {
//       console.log("Success");
//     }
//   });
// });

var shuffledCards = [1, 2, 3, 4, 6, 34, 54, 76];
function startGame() {
  for (var i = 0; i < shuffledCards.length; i++) {
    [].forEach.call(shuffledCards, function() {
      console.log("fuck");
    });
  }
}

shuffledCards.forEach(myFunc => {console.log("fuck");


function myFunc(item) {
  console.log(item);
}


var shuffledCards = [1, 2, 3, 4, 6, 34, 54, 76];
const deck = document.createElement("div");
function startGame(){
  var shuffledCards = [1, 2, 3, 4, 6, 34, 54, 76];
  for (var i= 0; i < shuffledCards.length; i++){
     [].forEach.call(shuffledCards, function(item){
        deck.appendChild(item);
     });
  }
}

startGame();