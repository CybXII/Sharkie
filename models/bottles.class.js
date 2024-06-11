class Bottles extends MoveableObject{
    height = 50;
    width = 50;
    x= 0;
    y=0;  
    intervalId;
    collected;
    currentImage = 0;
    Images_Standart =[
        'img/4. Marcadores/Posión/Animada/1.png',
        'img/4. Marcadores/Posión/Animada/2.png',
        'img/4. Marcadores/Posión/Animada/3.png',
        'img/4. Marcadores/Posión/Animada/4.png',
        'img/4. Marcadores/Posión/Animada/5.png',
        'img/4. Marcadores/Posión/Animada/6.png',
        'img/4. Marcadores/Posión/Animada/7.png',
        'img/4. Marcadores/Posión/Animada/8.png',
    ];
    

    /**
     * Constructor for setting up the object with an image at specific coordinates.
     * @param {type} image - the image to load
     * @param {type} x - the x-coordinate
     * @param {type} y - the y-coordinate
     */
    constructor(image,x,y){
        super().loadImage(image);
        this.loadImages(this.Images_Standart);
        this.x = x;
        this.y = y;
        this.offsetX = 10;
        this.offsetY = 10;
        this.offsetXMinus = 20;
        this.offsetYMinus = 20;
        this.bottleAnimation();
        this.checkItemCollisions()
    }


    /**
     * A description of the entire function.
     * @param {type} paramName - description of parameter
     * @return {type} description of return value
     */
    bottleAnimation(){
        setInterval(() => {
            this.playAnimation(this.Images_Standart)
        }, 200);
    }


    /**
     * Check for collisions with items on a regular interval.
     */
    checkItemCollisions(){
        this.intervalId= setInterval(() => {
            if(world){
                if (this.isColliding(world.character)){
                    this.collectBottle();
                }
                if (world.gameFinished){
                    this.finalyDestroy();
                    clearInterval(this.intervalId)    
                }
            }
        }, 1000/30);
    }


    /**
     * Collects the bottle.
     */
    collectBottle(){
        if(!this.collected){
            if (!mute)
                collectBottle_sound.play();
            if (world.character.poisonEnergy < 100);
                world.character.poisonEnergy = world.character.poisonEnergy+10;
            world.poisonbar.setPercentage(world.character.poisonEnergy);
            this.finalyDestroy();
            clearInterval(this.intervalId)
        }
    }
}
