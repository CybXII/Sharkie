class Ground extends MoveableObject{
    x = 0;
    y = 0;
    height = 480;
    width = 2000;
    
    /**
     * Constructor for initializing an object with an image at a specific position and size.
     *
     * @param {string} imagePath - the path to the image
     * @param {number} x - the x-coordinate
     * @param {number} y - the y-coordinate
     * @param {number} height - the height of the object
     * @param {number} width - the width of the object
     */
    constructor(imagePath, x, y,height,width){
        super().loadImage(imagePath, x, y)
        this.x = x;
        this.y = 480 - this.height;
        this.height = height;
        this.width = width;
    }    
}