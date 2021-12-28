var canvas = document.querySelector('canvas');

var game = new Game(canvas.getContext('2d'), CANVAS_WIDTH, CANVAS_HEIGHT);
game.play();

//prevent scroll down when pressing space
window.addEventListener('keydown', function (e) {
  if (e.key === ' ') {
    e.preventDefault();
  }
});