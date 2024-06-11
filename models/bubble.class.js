class Bubble extends MoveableObject{
    height = 50;
    width = 50;
    speed = 25;
    speedY = 0.1;
    poison;
    Images_Standart =['img/1.Sharkie/4.Attack/Bubble trap/Bubble.png',];
    Images_Poison =[
        'img/1.Sharkie/4.Attack/Bubble trap/Poisoned Bubble (for whale).png',
    ]


    /**
     * A constructor function to initialize a PoisonBubble object.
     * @param {number} x - The x-coordinate offset from the character's x-coordinate.
     * @param {number} speed - The speed of the PoisonBubble object.
     * @param {boolean} poison - Indicates if the PoisonBubble is poisonous.
     */
    constructor(x,speed,poison){
        super();
        this.poison = poison;
        if (poison)
            this.loadImage('img/1.Sharkie/4.Attack/Bubble trap/Poisoned Bubble (for whale).png');
        else
            this.loadImage('img/1.Sharkie/4.Attack/Bubble trap/Bubble.png');
        this.x= world.character.x+x;
        this.y= world.character.y+100;
        this.bubbleShot();
        this.applyAir();
        this.offsetX = 10;
        this.offsetY = 10;
        this.offsetXMinus = 20;
        this.offsetYMinus = 20;
        this.speed = speed
    }


    /**
     * A function that continuously updates the position and speed of an object 
     * on the screen at a regular interval and checks if it's out of the field.
     *
     * @param None
     * @return None
     */
    bubbleShot(){
        this.intervalId = setInterval(() => {
            this.x += this.speed;
            this.speed -= this.acceleration;
            this.outOfFieldChecker();
        }, 80);
    }
}
