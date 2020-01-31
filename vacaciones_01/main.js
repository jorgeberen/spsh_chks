// Capture all li elements
function listen() {
  let lis = document.querySelectorAll("item");
  let clips = document.querySelectorAll("audio");

  let array = Object.entries(lis);

  array.map(object => {
    object[1].addEventListener("click", function() {
      clips[object[0]].play();
    });
  });
}

listen();
