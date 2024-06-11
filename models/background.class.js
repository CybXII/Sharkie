class Background extends MoveableObject{
    x = 0;
    y = 0;
    height = 480;
    width = 2000;

    /**
     * Constructor for setting image path, position, height, and width.
     * @param {type} imagePath - description of parameter
     * @param {type} x - description of parameter
     * @param {type} y - description of parameter
     * @param {type} height - description of parameter
     * @param {type} width - description of parameter
     * @return {type} description of return value
     */
    constructor(imagePath, x, y,height,width){
        super().loadImage(imagePath, x, y)
        this.x = x;
        this.y = 480 - this.height;
        this.height = height;
        this.width = width;
    }
}