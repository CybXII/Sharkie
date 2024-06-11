class FarBackground extends MoveableObject{
    x = 0;
    y = 0;
    height = 480;
    width = 2000;
    speed = 2
    
    /**
     * Constructor for creating an object with an image.
     *
     * @param {string} imagePath - the path to the image
     * @param {number} x - the x-coordinate of the object
     * @param {number} y - the y-coordinate of the object
     * @param {number} height - the height of the object
     * @param {number} width - the width of the object
     * @return {void} 
     */
    constructor(imagePath, x, y,height,width){
        super().loadImage(imagePath, x, y)
        this.x = x;
        this.y = 480 - this.height;
        this.height = height;
        this.width = width;
    }
}