class Water extends MoveableObject{
    x = 0;
    y = 0;
    height = 480;
    width = 2000;
    

    /**
     * Constructor for creating an object with the given image path, coordinates, height, width, and speed.
     *
     * @param {string} imagePath - the path to the image
     * @param {number} x - the x-coordinate
     * @param {number} y - the y-coordinate
     * @param {number} height - the height of the object
     * @param {number} width - the width of the object
     * @param {number} speed - the speed of movement
     * @return {void}
     */
    constructor(imagePath, x, y,height,width,speed){
        super().loadImage(imagePath, x, y)
        this.x = x;
        this.y = 480 - this.height;
        this.height = height;
        this.width = width;
        this.movementLeft(speed);
        this.animate();
        this.checkPosition();
    }


    /**
     * Animate the element.
     */
    animate(){
        this.swimLeft = true;
    }


    /**
     * A function to periodically check and update the position.
     */
    checkPosition(){
        setInterval(() =>{
            if (this.x==-998){
                this.x = 998*3
            }
        }, 1000/35)
    }
}