class Coins extends MoveableObject{
    height = 50;
    width = 50;
    x= 0;
    y=0;  
    collected = false;
    intervalId;
    currentImage = 0;
    Images_Standart =[
        'img/4. Marcadores/1. Coins/1.png',
        'img/4. Marcadores/1. Coins/2.png',
        'img/4. Marcadores/1. Coins/3.png',
        'img/4. Marcadores/1. Coins/4.png',
    ];
    
    
    /**
     * Constructor for creating a new instance of the class.
     * @param {string} image - the image to be loaded
     * @param {number} x - the x coordinate
     * @param {number} y - the y coordinate
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
        this.coinAnimation();
        this.checkItemCollisions();
    }


    /**
     * Function for animating the coin.
     * No parameters
     * No return value
     */
    coinAnimation(){
        setInterval(() => {
            this.playAnimation(this.Images_Standart)
        }, 200);
    }


    /**
     * Checks for collisions with items at regular intervals.
     * @param None
     * @return None
     */
    checkItemCollisions(){
        this.intervalId= setInterval(() => {
            if(world){
                if (this.isColliding(world.character)){
                    this.collectCoin();
                }
                if (world.gameFinished){
                    this.finalyDestroy();
                    clearInterval(this.intervalId)    
                }
            }
        }, 1000/30);
    }


    /**
     * Collects coins if the character has less than 100 and the coins haven't been collected yet.
     * @return {void} 
     */
    collectCoin(){
        if (world.character.coins < 100){
            if(!this.collected){
                if (!mute)
                    collectCoin_sound.play();
                world.character.coins = world.character.coins+10;
                world.coinbar.setPercentage(world.character.coins);
                this.finalyDestroy();
                clearInterval(this.intervalId)
            }
        }
    }
}
