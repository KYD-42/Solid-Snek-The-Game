window.onload = function () {
  const startButton = document.getElementById("start-button");
  const restartButton = document.getElementById("restart-button");
  let game;
  // Begin the game when the start button is clicked.
  startButton.addEventListener("click", function () {
    startGame();
    document.getElementById('stats-container').style.display = 'block';
    document.getElementById('stats').style.display = 'block';
  });
  // Restart the game when the restart button is clicked (when you lose).
  restartButton.addEventListener("click", function () {
    location.reload();
  });

  function startGame() {
    game = new Game();
    game.start();
  }
  // Arrow keys to move the player in the game-screen.
  function handleKeydown(event) {
    const key = event.key;
    const possibleKeys = ["ArrowLeft", "ArrowUp", "ArrowRight", "ArrowDown"];

    if (possibleKeys.includes(key)) {
      event.preventDefault();
      if (game) {
        switch (key) {
          case "ArrowLeft":
            game.player.directionY =  0;
            game.player.directionX = -7;
            break;
          case "ArrowUp":
            game.player.directionX = 0;
            game.player.directionY = -7;
            break;
          case "ArrowRight":
            game.player.directionY = 0;
            game.player.directionX = 7;
            break;
          case "ArrowDown":
            game.player.directionX = 0;
            game.player.directionY = 7;
            break;
        }
      }
    }
  }

window.addEventListener("keydown", handleKeydown);

};
