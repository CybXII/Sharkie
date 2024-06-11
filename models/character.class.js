class Character extends MoveableObject{
    height= 200;
    width= 160;
    keyChecker = keyboard;
    attackDelayActive = false;
    attackAnimationEnd = true;
    slapActive = false;
    bubbleActive = false;
    speed = 10;
    world;
    currentImage=0;
    currentAttckingImage = 0;
    currentBubbleImage = 0;
    isPoisoned;
    isShocked;
    currentImageWalking=0;


    /**
     * Constructor for initializing Sharkie character properties and animations.
     */
    constructor(){
        super().loadImage('img/1.Sharkie/1.IDLE/1.png');
        this.loadCharImages()
        this.x = 100;
        this.y = (440-200)*Math.random();
        this.sharkieAnimate();
        this.sharkieMove();
        this.offsetX = 35;
        this.offsetY = 100;
        this.offsetXMinus = 65;
        this.offsetYMinus = 145;
    }


    /**
     * Load character images for various actions.
     */
    loadCharImages(){
        this.loadImages(this.Images_Swim);
        this.loadImages(this.Images_IDLE);
        this.loadImages(this.Images_Slap);
        this.loadImages(this.Images_Standart_attack);
        this.loadImages(this.Images_Poison);
        this.loadImages(this.Images_Shocked_Hurt);
        this.loadImages(this.Images_Poison_Hurt);
        this.loadImages(this.Images_Dead_Shocked);
        this.loadImages(this.Images_Dead_Standard);
    }


    /**
     * sharkieMove function moves the sharkie at a regular interval.
     */
    sharkieMove(){
        setInterval(() => {
            this.checkAction()
        }, 1000/30);
    }


    /**
     * A description of the entire function.
     */
    sharkieDeadAnimation(){
        if (!this.isPoisoned && this.isShocked || this.isPoisoned && this.isShocked){
            this.deadAnimation(this.Images_Dead_Shocked);
            if (this.y<290)
            this.moveDown(10)
        }
        else {
            this.deadAnimation(this.Images_Dead_Standard);
            if (this.y>-90)
            this.moveUp(4)
        }
    }


    /**
     * A function to handle the hurt animation for the sharkie object.
     * @return {void} No return value
     */
    sharkieHurtAnimation(){
        if (this.hitpoints<=0){
            this.isDead = true
        } else{
            if (this.isPoisoned && !this.isShocked){
                damageSound.pause();
                this.hurtAnimation(this.Images_Poison_Hurt,1);                        
            } if (this.isShocked && !this.isPoisoned || this.isShocked && this.isPoisoned){
                damageSound.pause();
                this.hurtAnimation(this.Images_Shocked_Hurt,3);
            }
            this.hitpoints = this.hitpoints-2;
            world.statusbar.setPercentage(this.hitpoints)
        }
    }


    /**
     * Perform attack animations if bubble or slap is active.
     * @param {type} images - description of parameter
     * @return {type} description of return value
     */
    sharkieAttackAnimations(images){
        if (this.bubbleActive)
            this.attackAnimation(images);
        if (this.slapActive ){
            this.attackAnimation(images);
        }
    }


    /**
     * Reset the attack animation and set related flags.
     */
    resetAttackAnimation(){
        this.attackAnimationEnd = true;
        this.sharkieMoveAnimations();
        this.slapActive = false;
        this.bubbleActive = false; 
    }


    /**
     * A function that animates the sharkie based on its current state.
     */
    sharkieAnimate(){
        setInterval(() =>{ 
            if(this.isDead) 
                this.sharkieDeadAnimation(); 
            else {
                if(this.isHurt)
                this.sharkieHurtAnimation();
                if(this.slap() && !this.isHurt)
                    this.sharkieAttackAnimations(this.Images_Slap);
                if (this.bubble() && !this.isHurt)
                    this.sharkieAttackAnimations(this.Images_Standart_attack);
                if (!this.isHurt && this.attackAnimationEnd)
                    this.resetAttackAnimation();
            }
        }, 100)
    }


    /**
     * Check the action based on certain conditions.
     */
    checkAction(){
        if (!world.boss.isDead){
        if(this.sink()&& !this.isDead)
            if (this.y<329 &&this.attackAnimationEnd) 
                this.y +=this.speed/6;
        if(this.down()&& !this.isDead)
            if (this.y<329) this.y +=this.speed/2;    
        if(this.right()&& !this.isDead)
            this.sharkieSwimRight();
        if(this.left()&& !this.isDead)
            this.sharkieSwimLeft();
        if(this.up()&& !this.isDead)
            if (this.y>-94)this.y -=this.speed;
        if(!this.slapActive && !this.bubbleActive && !this.attackDelayActive)
            this.checkAttacks();
        }
    }


    /**
     * Check for available attacks and set attack flags if conditions are met.
     */
    checkAttacks(){
        if (!this.coins<10){
            if(this.startSlap()&& !this.isHurt&& !this.isDead){
                this.setAttackTrue();
            }
        }
        if (!this.poisonEnergy<10){
            if(this.startBubble() && !this.isHurt&& !this.isDead){
                this.setBubbleTrue();
            }
        }
    }


    /**
     * Perform attack animation based on active states.
     * @param {Attack_Images} Attack_Images - Images for the attack animation
     */
    attackAnimation(Attack_Images){
        if (this.bubbleActive){
            this.playBubbleAnimation(Attack_Images);
        }
        if (this.slapActive) {
            this.playSlapAnimation(Attack_Images);
        }
        else if (this.attackDelayActive){
            this.playAnimation(this.Images_Swim);
        }
    }


    /**
     * Function to play a bubble animation using the provided Attack_Images.
    * @param {Array} Attack_Images - an array of image paths for the bubble animation
    * @return {void} this function does not return anything
    */
    playBubbleAnimation(Attack_Images){
        let i = this.currentBubbleImage % Attack_Images.length;
        let path = Attack_Images[i];
        this.img = this.imageCache[path];  
        this.currentBubbleImage++;
        if(this.currentBubbleImage == Attack_Images.length-1){
            this.bubbleActive = false
            this.currentBubbleImage = 0
            this.checkAttacDelay();
        }    
    }


    /**
     * Checks the attack delay and generates a bubble if necessary.s
     */
    checkAttacDelay(){
        if (!this.attackDelayActive){
            if (this.otherDirection){
                this.generateBubble(-20,-25,true);
                if(!mute)
                    attack_Sound.play();
            } else {
                this.generateBubble(130,25,true);
                if(!mute)
                    attack_Sound.play();
            }    
        }
    }


    /**
     * A function to generate a new bubble at the specified position with an option to make it poisonous.
     *
     * @param {number} bubbleX - the x-coordinate of the bubble
     * @param {number} bubbleY - the y-coordinate of the bubble
     * @param {boolean} poison - indicates whether the bubble is poisonous or not
     */
    generateBubble(bubbleX,bubbleY,poison){
        this.world.bubbels.push(new Bubble(bubbleX,bubbleY,poison))
        this.attackAnimationEnd = true;
        this.setDelay();
        this.poisonEnergy = this.poisonEnergy -10;
        world.poisonbar.setPercentage(this.poisonEnergy);
    }


    /**
     * A function to play a slap animation.
     *
     * @param {array} Attack_Images - an array of images for the slap animation
     */
    playSlapAnimation(Attack_Images){
        let i = this.currentAttckingImage % Attack_Images.length;
        let path = Attack_Images[i];
        this.img = this.imageCache[path];  
        this.currentAttckingImage++; 
        if(this.currentAttckingImage == Attack_Images.length-1){
            this.currentAttckingImage = 0;
            if (!this.attackDelayActive){        
                if (this.otherDirection) 
                        this.createBubble(-20,-25,false)              
                else 
                    this.createBubble(130,25,false)              
            }    
        }
    }


    /**
     * Creates a new bubble at the specified position with the option to make it poisonous.
     *
     * @param {type} posX - the x-coordinate of the bubble
     * @param {type} posY - the y-coordinate of the bubble
     * @param {type} poison - flag to indicate if the bubble is poisonous
     */
    createBubble(posX,posY,poison){
        this.world.bubbels.push(new Bubble(posX,posY,poison))
        this.attackAnimationEnd = true;
        this.setDelay();
        this.coins = this.coins -10;
        world.coinbar.setPercentage(this.coins);
        if(!mute)
            attack_Sound.play();
    }


    /**
     * Moves the sharkie with animations based on its actions.
     *
     * @param {type} paramName - description of parameter
     * @return {type} description of return value
     */
    sharkieMoveAnimations(){
    if (this.swimAnimation()){
        if(!world.boss.isDead){
            this.playAnimation(this.Images_Swim);
            if (!mute)
                swim_sound.play();
            }
        }
        else if(this.sharkieIdle())
            this.playAnimation(this.Images_IDLE);
    }


    /**
     * Sets the slapActive flag to true and attackAnimationEnd flag to false if the coins are greater than or equal to 10.
     */
    setAttackTrue(){
        if (this.coins>=10){
            this.slapActive = true;
            this.attackAnimationEnd = false;
        }
    }


    /**
     * Set bubble to true if poison energy is greater than or equal to 10.
     */
    setBubbleTrue(){
        if (this.poisonEnergy>=10){
            this.bubbleActive = true;
            this.attackAnimationEnd = false;
        }
    }


    /**
     * A function that controls the movement of the character to the right based on specific conditions.
     *
     * @param None
     * @return None
     */
    sharkieSwimRight(){
        this.otherDirection = false;
        if (this.bossStage){
            if (this.x<2490)this.x +=this.speed;
        } else {
            if (this.x<2000){
                this.x +=this.speed;
                this.world.camera_x = -this.x+100;
                this.world.characterSwimRight();
            }else{
                if(!world.bossStage){
                    if(!mute)
                        bossStage_sound.play();
                    this.world.bossStage = true;
                    this.bossStage = true;
                }
            }
        }
    }


    /**
     * A function that controls the left movement of sharkie.
     */
    sharkieSwimLeft(){
        this.otherDirection = true;
        if (this.bossStage){
            if (this.x >1870 && !this.x<1870 && !this.x <2490)
                this.x -=this.speed;
        }else{
            if (this.x>100&& this.x <=2000){
                this.x -=this.speed;
                this.world.camera_x = -this.x+100;
                this.world.characterSwimLeft();
            } else if (this.x>10&& this.x >2000)
                this.x -=this.speed;
        }
    }
}