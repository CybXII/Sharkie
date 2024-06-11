class RedFish extends MoveableObject{
    height = 50;
    width = 100;
    speed = Math.random()*2;
    currentImage = 0;
    id;
    world;
    endpoint = -400;
    blow = false;
    Images_Swim =[
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim1.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim2.png',        
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim3.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim4.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim5.png',
    ]

    Images_Dead =[
        'img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/3.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/3.3.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/3.2.png',
    ]

    Images_Attacking =[
        'img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/3.bubbleswim1.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/3.bubbleswim2.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/3.bubbleswim3.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/3.bubbleswim4.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/3.bubbleswim5.png',
    ]

    Images_Blowing =[
        'img/2.Enemy/1.Puffer fish (3 color options)/2.transition/3.transition1.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/2.transition/3.transition2.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/2.transition/3.transition3.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/2.transition/3.transition4.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/2.transition/3.transition5.png',
    ]

    Images_Blowing_End=[
        'img/2.Enemy/1.Puffer fish (3 color options)/2.transition/3.transition5.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/2.transition/3.transition4.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/2.transition/3.transition3.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/2.transition/3.transition2.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/2.transition/3.transition1.png',
    ]


    /**
     * Constructor for setting up a puffer fish enemy with various attributes.
     * @param {type} id - the unique identifier for the enemy
     * @param {type} characterX - the x-coordinate of the character
     * @return {type} does not return anything
     */
    constructor(id,characterX){
        super().loadImage('img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png');
        this.loadImages(this.Images_Swim);
        this.loadImages(this.Images_Dead);
        this.loadImages(this.Images_Blowing);
        this.loadImages(this.Images_Attacking);
        this.x = characterX+700+Math.random()*2000;
        this.y = Math.random()*450;
        this.speed = 1+Math.random()* 3;
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
     * Generate a random move based on a random number and call movementLeft or movementRight accordingly.
     *
     * @return {void} 
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
     * Animates the movement and actions of the enemy character.
     */
    enemieAnimate(){
        this.movementLeft(this.speed);
        this.intervalId = setInterval(() =>{
            this.distanceX =(this.x + this.width/2)- (world.character.x+world.character.width/2);  
            this.distanceY =(this.y - this.offsetY)- (world.character.y+world.character.offsetY);  
            if (this.isDead)
                this.animateDead();
            else if (!this.isDead){
                this.checkAction();
            }
        }, 200)    
    }


    checkAction(){
        if (this.blow&&!this.isAttacking)
        this.animateStartAttack();
        if (this.isAttacking)
            this.animateAttack();
        if (!this.blow)
            this.animateStandartMove();
        if (world.gameFinished)
            this.finalyDestroy(this.intervalId);
    }


    /**
     * A function to animate the dead state of an object.
     */
    animateDead(){
        this.swimUp = true;
        this.movementUp(this.speed)
        this.movementLeft(0);
        this.swimLeft = false;
        this.deadAnimation(this.Images_Dead);
    }


    /**
     * A function to start the attack animation.
     *
     */
    animateStartAttack(){
        if (this.currentImage>this.Images_Blowing.length && !this.isAttacking){
            this.currentImage= 0;
        }
        this.playAnimation(this.Images_Blowing);
        if (this.currentImage >= this.Images_Blowing.length){
            this.offsetY = 0;
            this.offsetYMinus = 0;
            this.isAttacking = true;
        }    
    }


    /**
     * Animate the attack based on the distance conditions.
     */
    animateAttack(){
        if (this.distanceX<350 &&this.distanceY>-100&& this.distanceY<100){
            this.blow = true;
            this.playAnimation(this.Images_Attacking); 
        }
        else 
        this.animateEndAttack();
    }


    /**
     * Animate the standard move of the object.
     *
     * @param {type} paramName - description of parameter
     * @return {type} description of return value
     */
    animateStandartMove(){
        if (this.distanceX<350 &&this.distanceY>-100&& this.distanceY<100){
            this.blow = true;
        }        
        if (!this.isDead){
            this.moveActions();
        }
        this.swimLeft = true;
        this.playAnimation(this.Images_Swim)
        this.destroyObject();        
    }


    /**
     * A function to handle the movement actions of an object.
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
    }


    /**
     * A function to animate the end of an attack.
     */
    animateEndAttack(){
        if (this.currentImage>=this.Images_Blowing_End.length){
            this.currentImage= 0;
        }
        this.playAnimation(this.Images_Blowing_End);
        if (this.currentImage >= this.Images_Blowing_End.length){
            this.offsetY = 5;
            this.offsetYMinus = 20;
            this.isAttacking = false;
            this.blow = false;
        }    
    }


    /**
     * Sets an interval for swimming behavior, alternating between moving up and down.
     */
    swimInterval(){
        setInterval(() => {
            if(!this.swimUp){
                this.swimDown = false;
                this.swimUp = true;
            } else if (this.swimUp&& !this.isDead) {
                this.swimUp = false;
                this.swimDown = true;
            }
        }, 1500);
    }
}
