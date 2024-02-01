class Obstacle {
    constructor(gameScreen) {
      this.gameScreen = gameScreen; 
      this.width = 50; // Width of the obstacle (food)
      this.height = 50; // Height of the obstacle (food)
  
  // Create an image element to represent the obstacle (food)
      this.element = document.createElement("img");
      
      this.element.src = "docs/images/food.svg"; // Set the image source (food)
      this.element.style.position = "absolute";
      this.element.style.width = `${this.width}px`;
      this.element.style.height = `${this.height}px`;
      this.left = Math.floor(Math.random() * (gameScreen.clientWidth - this.width));
      this.top = Math.floor(Math.random() * (gameScreen.clientHeight - this.height));
  
  // Add the obstacle (food) element to the game screen
      this.gameScreen.appendChild(this.element);
    }
  
  // Function to update the position of the obstacle
    updatePosition() {
      this.element.style.left = `${this.left}px`;
      this.element.style.top = `${this.top}px`;
    }
  
  // Function to move the obstacle
    move() {
  // Update the obstacle's position on the screen
      this.updatePosition();
    }
  }