class GreenFish extends MoveableObject{
    height = 50;
    width = 100;
    speed = Math.random()*2;
    currentImage = 0;
    id;
    world;
    endpoint = -400;
    blow = false;

    Images_Swim =[
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim2.png',        
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim3.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim4.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim5.png',
    ]

    Images_Dead =[
        'img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/1.Dead 1 (can animate by going up).png',
        'img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/1.Dead 2 (can animate by going down to the floor after the Fin Slap attack).png',
        'img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/1.Dead 3 (can animate by going down to the floor after the Fin Slap attack).png',
    ]

    Images_Attacking =[
        'img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/1.bubbleswim1.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/1.bubbleswim2.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/1.bubbleswim3.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/1.bubbleswim4.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/1.bubbleswim5.png',
    ]

    Images_Blowing =[
        'img/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition1.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition2.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition3.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition4.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition5.png',
    ]

    Images_Blowing_End =[
        'img/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition5.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition4.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition3.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition2.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition1.png',
    ]

    /**
     * Constructor for initializing the PufferFish enemy object.
     * @param {type} id - description of the id parameter
     * @param {type} characterX - description of the characterX parameter
     * @return {type} description of what the constructor returns
     */
    constructor(id,characterX){
        super().loadImage('img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png');
        this.loadImages(this.Images_Swim);
        this.loadImages(this.Images_Dead);
        this.loadImages(this.Images_Blowing);
        this.loadImages(this.Images_Attacking);
        this.x = characterX+700+Math.random()*2000;
        this.y = Math.random()*450;
        this.speed = 1+Math.random()* 4;
        this.id = id
        this.enemieAnimate();
        this.offsetX = 5;
        this.offsetY = 5;
        this.offsetXMinus = 16;
        this.offsetYMinus = 20;
    }


    /**
     * A description of the entire function.
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
     * Animate the enemy character based on its state.
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


    /**
     * Check the action and trigger corresponding animations based on certain conditions.
     */
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
     * Animates the dead action by moving the object up, then left, and playing the dead animation.
     */
    animateDead(){
        this.swimUp = true;
        this.movementUp(this.speed)
        this.movementLeft(0);
        this.swimLeft = false;
        this.deadAnimation(this.Images_Dead);
    }


    /**
     * Animate the start of the attack sequence.
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
     * Animates the attack based on the distanceX and distanceY, and plays the attacking animation if within range.
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
     * A description of the entire function.
     */
    animateStandartMove(){
        if (this.distanceX<350 &&this.distanceY>-100&& this.distanceY<100){
            this.blow = true;
        }
        this.swimLeft = true;
        this.playAnimation(this.Images_Swim)
        this.destroyObject();        
    }


    /**
     * Animation function for ending an attack sequence.
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
}