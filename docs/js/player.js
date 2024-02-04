class Player {
    constructor(gameScreen, left, top, width, height, imgSrc, segmentWidth, segmentHeight, speed) {
        // gameScreen HTML element
        this.gameScreen = gameScreen;
        // Position values
        this.left = left;
        this.top = top;
        // PLayer Dimension Values
        this.width = width;
        this.height = height;
        this.segments = [];
        this.segmentWidth = segmentWidth;
        this.segmentHeight = segmentHeight;
        //Initialize directions
        this.directionX = -5;
        this.directionY = 0;
        this.currentDirection = null;
        this.head = this.createSegment(this.left, this.top, imgSrc);
        this.segments.push(this.head);
        this.gameScreen.appendChild(this.head);
        // Speed property.
        this.speed = speed;
    }
    createSegment(left, top, imgSrc) {
        const element = document.createElement("img");
        element.src = imgSrc; // Set the image source
        element.style.position = "absolute";
        element.style.width = `${this.segmentWidth}px + 10px`; // Checking For Understanding
        element.style.height = `${this.segmentHeight}px`;
        element.style.left = `${left}px`;
        element.style.top = `${top}px`;
        this.gameScreen.appendChild(element);
        return element;
      }
    // function that changes the head image to a new one -> newImgSrc, the new svg.
    changeHeadImage(newImgSrc) {
        this.head.src = newImgSrc;
    }

    move() {
        for (let i = this.segments.length - 1; i > 0; i--) {
            const prevSegment = this.segments[i - 1];
            const segment = this.segments[i];
            segment.style.left = prevSegment.style.left;
            segment.style.top = prevSegment.style.top;
          }
          this.left += this.speed * this.directionX;
          this.top += this.speed * this.directionY;
        this.updatePosition();
    }
    updatePosition() {
        this.head.style.left = `${this.left}px`;
        this.head.style.top = `${this.top}px`;
    }
    didCollideWithWalls(){
        if (this.left + this.width > this.gameScreen.offsetWidth) {
            this.left = this.gameScreen.offsetWidth - this.width - 100;
            return true;
        }
        // Handle the left side of the screen : snek stops in the left border of the game screen
        else if (this.left < 0) {
            this.left = 0 + 100;
            return true;
        }
        // Handle the bottom side of the screen : snek stops in the bottom border of the game screen
        else if (this.top + this.height > this.gameScreen.offsetHeight) {
            this.top = this.gameScreen.offsetHeight - this.height - 100;
            return true;
        }
        // Handle the top side of the screen : snek stops in the top border of the game screen
        else if (this.top < 0) {
            this.top = 0 + 100;
           return true;
        }
        return false;
    }
    didCollide(obstacle) {
        const playerRect = this.head.getBoundingClientRect();
        const obstacleRect = obstacle.element.getBoundingClientRect();
        if (
            playerRect.left < obstacleRect.right &&
            playerRect.right > obstacleRect.left &&
            playerRect.top < obstacleRect.bottom &&
            playerRect.bottom > obstacleRect.top
        ) {
            return true;
        }
            return false;
    }
    
    grow(){
        const tail = this.segments[this.segments.length - 1];
        const left = parseInt(tail.style.left);
        const top = parseInt(tail.style.top);

        const newSegment = this.createSegment(left, top, "docs/images/body.svg")
        this.gameScreen.insertBefore(newSegment, this.head);
        this.segments.push(newSegment);
    }
}