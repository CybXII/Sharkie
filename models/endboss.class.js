class Endboss extends MoveableObject{
    height = 400;
    width = 300;
    bossSequensPlayed = false;
    speed = 0;
    currentImage = 0;
    isHurt;
    soundPlayed;
    Images_Swim =[
        'img/2.Enemy/3 Final Enemy/2.floating/1.png',
        'img/2.Enemy/3 Final Enemy/2.floating/2.png',
        'img/2.Enemy/3 Final Enemy/2.floating/3.png',
        'img/2.Enemy/3 Final Enemy/2.floating/4.png',
        'img/2.Enemy/3 Final Enemy/2.floating/5.png',
        'img/2.Enemy/3 Final Enemy/2.floating/6.png',
        'img/2.Enemy/3 Final Enemy/2.floating/7.png',
        'img/2.Enemy/3 Final Enemy/2.floating/8.png',
        'img/2.Enemy/3 Final Enemy/2.floating/9.png',
        'img/2.Enemy/3 Final Enemy/2.floating/10.png',
        'img/2.Enemy/3 Final Enemy/2.floating/11.png',
        'img/2.Enemy/3 Final Enemy/2.floating/12.png',
        'img/2.Enemy/3 Final Enemy/2.floating/13.png',
    ]

    Images_Hurt =[
        'img/2.Enemy/3 Final Enemy/Hurt/1.png',
        'img/2.Enemy/3 Final Enemy/Hurt/2.png',
        'img/2.Enemy/3 Final Enemy/Hurt/3.png',
        'img/2.Enemy/3 Final Enemy/Hurt/4.png',
    ]

    Images_Dead =[
        'img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 6.png',
        'img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 7.png',
        'img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 8.png',
        'img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 9.png',
        'img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 10.png',
    ]

    Images_BossSequenz =[
        'img/2.Enemy/3 Final Enemy/1.Introduce/1.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/2.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/3.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/4.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/5.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/6.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/7.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/8.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/9.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/10.png',
    ]

    Images_Attack =[
        'img/2.Enemy/3 Final Enemy/1.Introduce/1.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/2.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/3.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/4.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/5.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/6.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/7.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/8.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/9.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/10.png',
    ]


    /**
     * Constructor for initializing the object and setting up initial values.
     * No parameters.
     * No return value.
     */
    constructor(){
        super().loadImage('');
        this.loadImages(this.Images_Swim);
        this.loadImages(this.Images_BossSequenz);
        this.loadImages(this.Images_Hurt);
        this.loadImages(this.Images_Attack);
        this.loadImages(this.Images_Dead);
        this.x = 2220;
        this.y = 0;
        this.enemieAnimate();
        this.randomMove();
        this.bossMovement();   
        this.offsetX = 20;
        this.offsetY = 205;
        this.offsetXMinus = 75;
        this.offsetYMinus = 280; 
    }


    /**
     * Animate enemies based on their state, such as dead, hurt, attacking, or boss stage.
     */
    enemieAnimate(){
        setInterval(() =>{
            if (this.isDead){
                this.animateDead();
            } else{
                if (this.isHurt)
                    this.animateHurt();
                if (this.isAttacking && !this.isHurt)
                    this.attackAnimation(this.Images_Attack);
                if (this.bossSequensPlayed&&world.character.bossStage && !this.isHurt)
                    this.playAnimation(this.Images_Swim);
                else if (!this.bossSequensPlayed&&world.character.bossStage)
                    this.bossSequenz();        
            }
        }, 200)   
    }


    /**
     * Perform animations when the entity is hurt. 
     */
    animateHurt(){
        if (this.hitpoints<=0){
            if(!this.soundPlayed){
                if (!mute)
                    bossDead_sound.play();
                this.soundPlayed = !this.soundPlayed;
            }
            this.isDead = true
        }else 
            this.hurtAnimation(this.Images_Hurt,1);
        world.bossbar.setPercentage(this.hitpoints);
    }


    /**
     * Function to animate the dead state of an object.
     */
    animateDead(){
        this.deadAnimation(this.Images_Dead);
        this.swimRight = this.swimRight = false;
        this.swimLeft = this.swimLeft = false;
        if (this.y >-100){
            this.speed = 2;
            this.upMovementChecker();    
        } else 
            this.speed = 0;
    }


    /**
     * Generate random movement for an entity at regular intervals.
     */
    randomMove(){
        setInterval(() =>{
            if (this.bossSequensPlayed && !this.isDead){
                let numberX = 10*Math.random()*10;
                let numberY = 10*Math.random()*10;
                if (numberX>=0 && numberX<=50)
                    this.leftMovementChecker();
                if(numberX>50 && numberX<100)
                    this.rightMovementChecker();
                if (numberY>=0 && numberY<=50)
                    this.upMovementChecker();
                if(numberY>50 && numberY<100)
                    this.downMovementChecker();
            }
        }, 1000);
    }


    /**
     * A method that plays the boss sequence animation and updates properties accordingly.
     */
    bossSequenz(){
        this.playAnimation(this.Images_BossSequenz);
        if (this.currentImage == this.Images_BossSequenz.length){
            this.bossSequensPlayed = true
            this.speed = 5;
        }
    }


    /**
     * Executes boss movement based on swim directions.
     */
    bossMovement(){
        setInterval(() =>{
            if (this.swimLeft)
                this.moveLeft();
            if (this.swimRight)
                this.moveRight();            
            if (this.swimUp)
                this.moveUp();
            if (this.swimDown)
                this.moveDown();
        }, 1000/35)
    }


    /**
     * Check if movement is towards the left and update swim direction variables accordingly.
     */
    leftMovementChecker(){
        if (this.x >2340){
            this.swimRight = this.swimRight = false;
            this.swimLeft = this.swimLeft = false;
        }else{
            if (this.speed>0){
                this.otherDirection = true;
            }
            this.swimRight = this.swimRight = true;
            this.swimLeft = this.swimLeft = false;    
        }
    }


    /**
     * Check if the movement to the right is allowed based on the current x position and speed.
     */
    rightMovementChecker(){
        if (this.x<1880){
            this.swimLeft = this.swimLeft = false;
            this.swimRight = this.swimRight = false;
        }else{
            if (this.speed>0){
                this.otherDirection = false;
            }
            this.swimLeft = this.swimLeft = true;
            this.swimRight = this.swimRight = false;    
        }
    }


    /**
     * A function to check if the entity should swim up or down based on the vertical position.
     */
    upMovementChecker(){
        if(this.y<-150){
            this.swimUp = this.swimUp = false;
            this.swimDown = this.swimDown = false;    
        } else{
            this.swimUp = this.swimUp = true;
            this.swimDown = this.swimDown = false;    
        }
    }


    /**
     * Checks if the y position is greater than 150 to determine the swimming direction.
     *
     */
    downMovementChecker(){
        if (this.y>150){
            this.swimDown = this.swimDown = false;
            this.swimUp = this.swimUp = false;
        }else{
            this.swimDown = this.swimDown = true;
            this.swimUp = this.swimUp = false;    
        }
    }


    /**
     * Move the object to the left if it is not already at the left boundary.
     * @return {undefined} 
     */
    moveLeft(){
        if (this.x<1880){}
        else {this.x -= this.speed;}
    }


    /**
     * Move the object to the right if x is less than or equal to 2340, otherwise do nothing.
     */
    moveRight(){
        if (this.x>2340){}
        else{this.x += this.speed;}
    }


    /**
     * Moves the object upwards if its current y position is greater than -150.
     */
    moveUp(){
        if(this.y<-150){}
        else{this.y -= this.speed;}
    }


    /**
     * Move the object down if its current y position is less than or equal to 150.
     */
    moveDown(){
        if(this.y>150){}
        else{this.y += this.speed;}
    }
}