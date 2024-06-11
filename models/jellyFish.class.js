class JellyFish extends MoveableObject{
    height = 50;
    width = 100;
    speed = Math.random()*2;
    currentImage = 0;
    id;
    world;
    endpoint = -400;
    Images_Swim =[
        'img/2.Enemy/2 Jelly fish/Regular damage/Yellow 1.png',
        'img/2.Enemy/2 Jelly fish/Regular damage/Yellow 2.png',
        'img/2.Enemy/2 Jelly fish/Regular damage/Yellow 3.png',
        'img/2.Enemy/2 Jelly fish/Regular damage/Yellow 4.png',
    ]

    Images_Dead =[
        'img/2.Enemy/2 Jelly fish/Dead/Yellow/y1.png',
        'img/2.Enemy/2 Jelly fish/Dead/Yellow/y2.png',
        'img/2.Enemy/2 Jelly fish/Dead/Yellow/y3.png',
        'img/2.Enemy/2 Jelly fish/Dead/Yellow/y4.png',
    ]

    Images_Attacking =[
        'img/2.Enemy/2 Jelly fish/Súper dangerous/Green 1.png',
        'img/2.Enemy/2 Jelly fish/Súper dangerous/Pink 2.png',
        'img/2.Enemy/2 Jelly fish/Súper dangerous/Green 3.png',
        'img/2.Enemy/2 Jelly fish/Súper dangerous/Pink 4.png',
        'img/2.Enemy/2 Jelly fish/Súper dangerous/Pink 1.png',
        'img/2.Enemy/2 Jelly fish/Súper dangerous/Green 2.png',
        'img/2.Enemy/2 Jelly fish/Súper dangerous/Pink 3.png',
        'img/2.Enemy/2 Jelly fish/Súper dangerous/Green 4.png',
    ]


    /**
     * Constructor for initializing an Enemy object.
     * @param {type} id - description of parameter
     * @param {type} characterX - description of parameter
     * @return {type} description of return value
     */
    constructor(id,characterX){
        super().loadImage('img/2.Enemy/2 Jelly fish/Regular damage/Yellow 1.png');
        this.loadImages(this.Images_Swim);
        this.loadImages(this.Images_Dead);
        this.loadImages(this.Images_Attacking);
        this.x = characterX+600+Math.random()*1200;
        this.y = Math.random() * 500;
        this.speed = 1+Math.random()* 6;
        this.id = id
        this.enemieAnimate();
        this.offsetX = 5;
        this.offsetY = 5;
        this.offsetXMinus = 16;
        this.offsetYMinus = 20;
        this.movementUp(this.speed/2);
        this.movementDown(this.speed/2);
        this.swimInterval();
    }


    /**
     * Generates a random move based on a randomly generated number and calls either movementLeft() or movementRight().
     */
    randomMove(){
        let number = 1*Math.random()*100;
        if (number>=0 && number<=20){
            movementLeft();
        }else if(number<20 && number>40){
            movementRight();
        }
    }


    /**
     * A function that animates the enemy character based on its current state and position.
     * @return {void} No return value
     */
    enemieAnimate(){
        this.intervalId = setInterval(() =>{
            this.distanceX =(this.x + this.width/2)- (world.character.x+world.character.width/2);  
            this.distanceY =(this.y - this.offsetY)- (world.character.y+world.character.offsetY);  
            if (this.isDead)
                this.animateDead();
            else if (!this.isDead){
                this.moveActions();
                if (world.gameFinished)
                    this.finalyDestroy(this.intervalId);
            }
        }, 200)    
    }


    /**
     * Function to handle the movement actions of the character.
     */
    moveActions(){
        if (this.y < 0){
            this.swimUp = false;
            this.swimDown=true;
        }
        if (this.y > 420){
            this.swimUp = true;
            this.swimDown=false;
        }
        if (this.isAttacking)
            this.animateAttack();
        if (!this.isAttacking)
            this.animateStandartMove()
    }


    /**
     * Animate the dead character by swimming up, moving left, and playing the dead animation.
     */
    animateDead(){
        this.swimUp = true;
        this.movementUp(this.speed)
        this.movementLeft(0);
        this.swimLeft = false;
        this.deadAnimation(this.Images_Dead);
    }


    /**
     * A description of the entire function.
     * @param {type} paramName - description of parameter
     * @return {type} description of return value
     */
    animateAttack(){
        if (this.distanceX<350 &&this.distanceY>-100&& this.distanceY<100)
            this.blow = true;
        else 
            this.isAttacking = false;
        this.playAnimation(this.Images_Attacking); 
    }


    /**
     * Animate standard move based on distance and state variables.
     */
    animateStandartMove(){
        if (this.distanceX<350 &&this.distanceY>-100&& this.distanceY<100){
            this.isAttacking = true;
        }
        this.swimLeft = true;
        this.playAnimation(this.Images_Swim)
        this.destroyObject();        
    }


    /**
     * Sets a swim interval that toggles between swimming up and down.
     */
    swimInterval(){
        this.swimDown = true;
        setInterval(() => {
            if(!this.swimUp){
                this.swimDown = false;
                this.swimUp = true;
            } else {
                this.swimUp = false;
                this.swimDown = true;
            }
        }, 10000);
    }
}
