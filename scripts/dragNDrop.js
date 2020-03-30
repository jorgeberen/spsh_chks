var dropzone = document.getElementById("inner-dropzone");
function dragMoveListener(event) {
  var target = event.target;
  // console.log(target);
  // keep the dragged position in the data-x/data-y attributes
  var x = (parseFloat(target.getAttribute("data-x")) || 0) + event.dx;
  var y = (parseFloat(target.getAttribute("data-y")) || 0) + event.dy;

  // translate the element
  target.style.webkitTransform = target.style.transform =
    "translate(" + x + "px, " + y + "px)";

  // update the posiion attributes
  target.setAttribute("data-x", x);
  target.setAttribute("data-y", y);
}

// Declare variables to be used to perform the data comparison between sentences and fillers
var sentences = [...document.querySelectorAll(".dropzone")];
var sentencesData = sentences.map(x => x.dataset.type); // get an array with all the data types of the sentences to be completed
var fillers = [...document.querySelectorAll(".filling")];
// get an array with all the data types of the sentence fillers to be dragged and dropped
var fillersData = fillers.map(x => x.dataset.type);
var arrayOfDrops = [];

// this function is used later in the resizing and gesture demos
window.dragMoveListener = dragMoveListener;
// enable draggables to be dropped into this
interact(".dropzone").dropzone({
  // only accept elements matching this CSS selector
  accept: ".yes-drop",
  // Require a x % element overlap for a drop to be possible
  overlap: 0.3,

  // listen for drop related events:

  ondropactivate: function(event) {
    // add active dropzone feedback
    console.log("activate");
    event.target.classList.add("drop-active");
  },
  ondragenter: function(event) {
    var draggableElement = event.relatedTarget;
    console.log("enter");
    var dropzoneElement = event.target;
    // if (event.relatedTarget.dataset.type != event.target.dataset.type) {
    //   return;
    // }
    // feedback the possibility of a drop
    dropzoneElement.classList.add("drop-target");
    draggableElement.classList.add("can-drop");

    // draggableElement.textContent = "Dragged in";
  },

  ondragleave: function(event) {
    // remove the drop feedback style
    console.log("leaving");
    event.target.classList.remove("drop-target");
    event.relatedTarget.classList.remove("can-drop");
    event.relatedTarget.classList.remove("has-dropped");
    event.relatedTarget.classList.remove("dropped");
  },
  ondrop: function(event) {
    // fillers[0] = console.log(event.relatedTarget.dataset.type);
    console.log(event.target.dataset.type);
    event.relatedTarget.classList.add("has-dropped");

    // const y = sentencesData.indexOf(event.target.dataset.type);
    arrayOfDrops[sentencesData.indexOf(event.target.dataset.type)] =
      event.relatedTarget.dataset.type;
  },
  ondropdeactivate: function(event) {
    // remove active dropzone feedback
    event.target.classList.remove("drop-active");
    event.target.classList.remove("drop-target");
  }
});

// function toggleDragDrop(event) {
//   event.target.parentElement.classList.toggle("drag-drop");
//   event.target.classList.toggle("pinned");
//   console.log(event.target.parentElement);
// }

function checkAnswers() {
  var allDropped = [...document.querySelectorAll(".has-dropped")];
  let count = 0;
  if (allDropped.length != 4)
    return alert("Fill all the sentences to check the answers"); // this prevents the function from running if not all the fillers are inside the sentences
  for (x of sentencesData) {
    if (arrayOfDrops[sentencesData.indexOf(x)] === x) {
      count += 1;
      fillers[sentencesData.indexOf(x)].classList.remove("dropped-wrong");
      fillers[sentencesData.indexOf(x)].classList.add("dropped");
      fillers[sentencesData.indexOf(x)].classList.remove("can-drop");
    } else {
      fillers[sentencesData.indexOf(x)].classList.add("dropped-wrong");
      fillers[sentencesData.indexOf(x)].classList.remove("can-drop");
    }
  }
  if (count === 4) return setTimeout(() => alert("Well done!"), 1000);
}

interact(".drag-drop").draggable({
  inertia: true,
  modifiers: [
    interact.modifiers.restrictRect({
      restriction: ".main-container",
      endOnly: true
    })
  ],
  autoScroll: true,
  // dragMoveListener from the dragging demo above
  listeners: { move: dragMoveListener }
});
