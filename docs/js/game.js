class Game {
    // Get all Game Screens
    // gameScreen and gameEndScreen are initialy not displayed
    constructor() {
        this.startScreen = document.getElementById("game-intro");
        this.gameScreen = document.getElementById("game-screen");
        this.gameEndScreen = document.getElementById("game-end");

        // I am going to create a player in the future
        this.player = new Player(this.gameScreen, 500, 300, 60, 48, "docs/images/snake-body.svg", 60, 48, 1);

        // Style for the Game Board
        this.height = 600;
        this.width = 1000;

        //Obstacles
        this.obstacles = [];

        //Score
        this.score = 0;
        this.lives = 3;

        // Variable to check if im in the process of creating an obstacle
        this.isPushingObstacle = false;

        //Variable to check if the game is over
        this.gameIsOver = false;

        this.soundtrack = null; //Soundtrack

    }

    start() {
        //Sets the height and width of the game screen.
        this.gameScreen.style.height = `${this.height}px`;
        this.gameScreen.style.width = `${this.width}px`;
        //Hides the start screen.
        this.startScreen.style.display = "none";
        //Shows the game screen.
        this.gameScreen.style.display = "block";

        this.soundtrack = document.getElementById("soundtrack"); // specific element soundtrack
        this.soundtrack.play("soundtrack");

        //Starts the game loop 
        this.gameLoop();
    }

    gameLoop() {
        if (this.gameIsOver) {
            return;
        }
        this.update();
        window.requestAnimationFrame(() => this.gameLoop());
    }
    update() {
        // Score, lives, scoreboard
        let score = document.getElementById("score");
        let lives = document.getElementById("lives");

        /* Every Frame of the game, i want to check if the car is moving*/
        this.player.move();

        if(this.player.didCollideWithWalls()){
            this.lives--;
        }


        // Iterate over the obstacles array and make them move
        for (let i = 0; i < this.obstacles.length; i++) {
            const obstacle = this.obstacles[i];
            obstacle.move();

            if (this.player.didCollide(obstacle)) {
                obstacle.element.remove();

                this.obstacles.splice(i, 1);

                this.player.grow();

                this.score = this.score + 10;
            }

        }

        if (this.lives === 0) {
            this.endGame();
        }

        // If there are no obstacles, push a new one afer 1second and a half.
        else if (!this.obstacles.length && !this.isPushingObstacle) {
            this.isPushingObstacle = true;
            setTimeout(() => {
                this.obstacles.push(new Obstacle(this.gameScreen));
                this.isPushingObstacle = false;
            }, 500)
        }

        score.innerHTML = this.score;
        if (this.lives < 3){
            if(this.lives === 2){
                let thirdHeart = document.querySelector("#heart-3");
                thirdHeart.style.display = "none";
            }
            else if(this.lives === 1){
                let secondHeart = document.querySelector("#heart-2");
                secondHeart.style.display = "none";
            }
            else if(this.lives === 0){
                let firstHeart = document.querySelector("#heart-1");
                firstHeart.style.display = "none";
            }
        }
    //Increase the player speed every 50 points.
    if(this.score % 50 === 0) {
        this.player.speed += 0.002;
    }
    
    }

    endGame() {
        // Change the gameIsOver status. If its true, remember that this is going to break the animation loop.
        this.gameIsOver = true;
        // Remove my player from the HTML
        this.player.head.remove();
        // Remove all obstacles
        this.obstacles.forEach((obstacle, index) => {
            // Remove the obstacle from JS
            this.obstacles.splice(index, 1);
            // Remove the obstacle from HTML
            obstacle.element.remove();
        });
        // Hide the current game screen...
        this.gameScreen.style.display = "none";
        // In order, to display the game end screen
        this.gameEndScreen.style.display = "block";
        this.soundtrack.pause("soundtrack");

        this.soundtrack = document.getElementById("game-over"); // specific element soundtrack
        this.soundtrack.play("game-over");

        document.getElementById('stats-container').style.display = 'none';
        document.getElementById('stats').style.display = 'none';
    }
}